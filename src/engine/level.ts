import type { Bricks, LevelDef, MapItem, TerrainId, UnitDef } from '../data/types';
import { terrainFamily } from '../data/types';
import { UNIT_DATA } from '../data/generated/units';
import { TERRAIN_CHARS } from '../data/generated/terrainChars';
import { CONFIG } from './const';

export type Dir = 'up' | 'down' | 'left' | 'right';
export type EntityClass = 'unit' | 'building' | 'monster';

export interface Entity {
  id: number;
  cls: EntityClass;
  type: string;
  def: UnitDef;
  x: number;
  y: number;
  dir: Dir;
  /** 이동 보간: 출발 셀 → (x,y), 0~1 */
  fromX: number;
  fromY: number;
  moveT: number;
  moving: boolean;
  path: { x: number; y: number }[];
  energy: number;
  /** 마지막 피격 시각 (game.time 기준, 피격 표시용) */
  lastHitAt: number;
  /** 마지막 충전 시각 (충전중 아이콘 표시용) */
  chargingAt: number;
  carrying: Bricks;
  /** 운반 중인 에너지 브릭의 충전량 (0~100) */
  carryCharge: number;
  hasDirt: boolean;
  /** 싣고 있는 흙이 늪에서 퍼 온 것인지 — 메우면 그 칸이 늪이 된다 (원작 동작) */
  dirtSwamp: boolean;
  hasTree: boolean;
  /** 공격 쿨다운(초) */
  attackCd: number;
  /** 공격 지시 대상 */
  attackTarget: number | null;
  /** 예약된 능력: 대상까지 자동 이동 후 도착 시 실행 */
  pendingAction: { action: string; x: number; y: number } | null;
  /** 빙결 해제 시각 (game.time 기준, WB2 freezebot) */
  frozenUntil: number;
  /** 생산 건물 사이클 타이머 (WB2) */
  prodCd: number;
  /** factory 출력 색상 (WB2) */
  factoryColor: 'red' | 'yellow' | 'green' | 'blue' | 'white';
  /** 몬스터 활동/휴식 */
  restTimer: number;
  resting: boolean;
  wanderCd: number;
  dead: boolean;
}

export interface Goal {
  x: number; y: number;
  target: string;
  bonus: boolean;
  done: boolean;
  /** WB2 포획 골: type 몬스터 count 마리를 존 안에 모으면 달성 */
  collect?: { count: number; type: string };
  /** collect 골의 존 영역 (골 위치에서 zone 지형으로 연결된 칸들) */
  zoneCells?: Set<string>;
}

export interface PlanInv { unit: string; uses: number; }

export interface Pile {
  bricks: Bricks;
  /** 더미 안 에너지 브릭의 충전량 (0~100, 없으면 의미 없음) */
  energyCharge: number;
}

let nextId = 1;

export function unitDefOf(type: string): UnitDef | undefined {
  return UNIT_DATA.vehicles[type] ?? UNIT_DATA.buildings[type] ?? UNIT_DATA.monsters[type];
}

export function brickTotal(b: Bricks): number {
  return Object.values(b).reduce((a, n) => a + (n ?? 0), 0);
}

export class LevelState {
  readonly def: LevelDef;
  readonly w: number;
  readonly h: number;
  terrain: TerrainId[][];
  entities: Entity[] = [];
  piles = new Map<string, Pile>();
  mapPlans = new Map<string, { unit: string; uses: number }>();
  goals: Goal[] = [];
  whirls: { x: number; y: number; channel: number }[] = [];
  planInv: PlanInv[] = [];

  constructor(def: LevelDef) {
    this.def = def;
    this.w = def.width;
    this.h = def.height;
    this.terrain = [];
    for (let y = 0; y < this.h; y++) {
      const row: TerrainId[] = [];
      for (let x = 0; x < this.w; x++) {
        const ch = def.grid[y][x] ?? '.';
        const t = TERRAIN_CHARS[ch];
        if (t) { row.push(t); continue; }
        // 아이템 칸: 아이템의 water 플래그로 바닥 지형 결정
        const item = def.items[ch] ?? def.items[ch.toLowerCase()];
        if (!item) { row.push('normal'); continue; }
        const isCollect = (item.kind === 'goal' || item.kind === 'bonusgoal') && !!item.collect;
        row.push(item.kind === 'whirlpool' ? 'whirl' : isCollect ? 'zone' : item.water ? 'water' : 'normal');
      }
      this.terrain.push(row);
    }
    // 아이템 배치
    for (let y = 0; y < this.h; y++) {
      for (let x = 0; x < this.w; x++) {
        const ch = def.grid[y][x] ?? '.';
        if (TERRAIN_CHARS[ch]) continue;
        const item = def.items[ch] ?? def.items[ch.toLowerCase()];
        if (item) this.placeItem(x, y, item);
      }
    }
    for (const [unit, uses] of Object.entries(def.inventory)) {
      if (uses > 0) this.planInv.push({ unit, uses });
    }
    // WB2 collect 골: 골 위치에서 zone 지형으로 연결된 영역을 플러드필로 수집
    for (const g of this.goals) {
      if (!g.collect) continue;
      const cells = new Set<string>();
      const stack = [[g.x, g.y]];
      while (stack.length) {
        const [cx, cy] = stack.pop()!;
        const k = this.key(cx, cy);
        if (cells.has(k) || this.terrainAt(cx, cy) !== 'zone') continue;
        cells.add(k);
        stack.push([cx + 1, cy], [cx - 1, cy], [cx, cy + 1], [cx, cy - 1]);
      }
      g.zoneCells = cells;
    }
  }

  private placeItem(x: number, y: number, item: MapItem): void {
    switch (item.kind) {
      case 'unit': case 'building': case 'monster': {
        const e = this.spawn(item.kind === 'unit' ? 'unit' : item.kind, item.type, x, y);
        if (!e) console.warn('unknown unit type', item.type);
        break;
      }
      case 'pile':
        this.addBricks(x, y, item.contents);
        break;
      case 'plan':
        this.mapPlans.set(this.key(x, y), { unit: item.unit, uses: item.uses });
        break;
      case 'goal':
        this.goals.push({ x, y, target: item.target, bonus: false, done: false, collect: item.collect });
        break;
      case 'bonusgoal':
        this.goals.push({ x, y, target: item.target, bonus: true, done: false, collect: item.collect });
        break;
      case 'whirlpool':
        this.whirls.push({ x, y, channel: item.channel });
        break;
    }
  }

  key(x: number, y: number): string { return `${x},${y}`; }

  terrainAt(x: number, y: number): TerrainId | null {
    if (x < 0 || y < 0 || x >= this.w || y >= this.h) return null;
    return this.terrain[y][x];
  }

  spawn(cls: EntityClass, type: string, x: number, y: number): Entity | null {
    const def = unitDefOf(type);
    if (!def) return null;
    const e: Entity = {
      id: nextId++, cls, type, def, x, y, dir: 'down',
      fromX: x, fromY: y, moveT: 1, moving: false, path: [],
      energy: CONFIG.maxEnergy, lastHitAt: -999, chargingAt: -999,
      carrying: {}, carryCharge: CONFIG.maxEnergy, hasDirt: false, dirtSwamp: false, hasTree: false,
      attackCd: 0, attackTarget: null, pendingAction: null,
      frozenUntil: -1, prodCd: 0, factoryColor: 'red',
      restTimer: 0, resting: false, wanderCd: Math.random() * 2, dead: false,
    };
    this.entities.push(e);
    return e;
  }

  entityAt(x: number, y: number): Entity | undefined {
    return this.entities.find(e => !e.dead && e.x === x && e.y === y);
  }

  /** 통행 가능 여부: 지형 + 점유 */
  passableFor(e: Entity, x: number, y: number, ignoreOccupancy = false): boolean {
    const t = this.terrainAt(x, y);
    if (!t) return false;
    // street 변형/시멘트/존/나무 변형을 기본형으로 정규화해 통행권 검사
    const fam = terrainFamily(t);
    if (!e.def.terrain.includes(fam as TerrainId)) {
      // whirl 은 water_whirlpool 통행권 필요 — water 통행 유닛도 소용돌이 진입은 명시 목록 기준
      return false;
    }
    if (!ignoreOccupancy) {
      const occ = this.entityAt(x, y);
      if (occ && occ.id !== e.id) return false;
    }
    return true;
  }

  moveCost(_e: Entity, x: number, y: number): number {
    return this.terrainAt(x, y) === 'swamp' ? 7 : 1; // 늪 경로 페널티 (config swamp_path_penalty=6)
  }

  /** 브릭 추가. energyCharge 는 추가되는 에너지 브릭의 충전량 — 기존 브릭과 수량 가중 평균으로 합산 */
  addBricks(x: number, y: number, bricks: Bricks, energyCharge = CONFIG.maxEnergy): void {
    const k = this.key(x, y);
    const pile = this.piles.get(k) ?? { bricks: {}, energyCharge: CONFIG.maxEnergy };
    const incomingE = bricks.energy ?? 0;
    if (incomingE > 0) {
      const existingE = pile.bricks.energy ?? 0;
      pile.energyCharge = (pile.energyCharge * existingE + energyCharge * incomingE) / (existingE + incomingE);
    }
    for (const [c, n] of Object.entries(bricks)) {
      if (!n) continue;
      pile.bricks[c as keyof Bricks] = (pile.bricks[c as keyof Bricks] ?? 0) + n;
    }
    if (brickTotal(pile.bricks) > 0) this.piles.set(k, pile);
  }

  whirlPair(x: number, y: number): { x: number; y: number } | null {
    const cur = this.whirls.find(wh => wh.x === x && wh.y === y);
    if (!cur) return null;
    const other = this.whirls.find(wh => wh.channel === cur.channel && (wh.x !== x || wh.y !== y));
    return other ? { x: other.x, y: other.y } : null;
  }
}
