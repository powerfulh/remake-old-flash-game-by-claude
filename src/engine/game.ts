import type { Bricks, LevelDef } from '../data/types';
import { terrainFamily } from '../data/types';
import { COMBAT_STATS, SWAMP_HAZARD } from '../data/combatStats';
import { UNIT_DATA } from './../data/generated/units';
import { CONFIG } from './const';
import { brickTotal, Entity, LevelState, unitDefOf } from './level';
import type { Dir, Goal } from './level';
import { findPath, findPathAdjacent } from './path';
import { playSfxEvent, type SfxEvent } from './audio';

export type ActionMode =
  | { type: 'move' }
  | { type: 'pickup' } | { type: 'drop' }
  | { type: 'dig' } | { type: 'fill' }
  | { type: 'uproot' } | { type: 'plant' }
  | { type: 'push' }
  | { type: 'attack' }
  | { type: 'build'; planIdx: number };

export interface GameEvents {
  toast(msg: string): void;
  selectionChanged(): void;
  goalsChanged(): void;
  plansChanged(): void;
  missionGoal(): void;      // 메인 골 달성 배너
  bonusGoal(): void;        // 보너스 골 달성
  unitLost(name: string): void;
}

const DIR_OF = (dx: number, dy: number): Dir =>
  dx > 0 ? 'right' : dx < 0 ? 'left' : dy > 0 ? 'down' : 'up';

export class Game {
  level: LevelState;
  selected: Entity | null = null;
  mode: ActionMode = { type: 'move' };
  goalDone = false;
  bonusDone = false;
  paused = false;
  time = 0;
  /** 커서가 올라간 셀 (조립 범위 표시용) */
  hover: { x: number; y: number } | null = null;
  /** 진행 중인 이펙트 (조립/분해 구름, 피격 버스트) */
  effects: { x: number; y: number; kind: 'build' | 'takeApart' | 'damage'; t: number }[] = [];
  /** 튜토리얼이 가리키는 셀 (렌더러가 마커 표시) */
  tutorialCell: [number, number] | null = null;
  private ev: GameEvents;

  constructor(def: LevelDef, ev: GameEvents) {
    this.level = new LevelState(def);
    this.ev = ev;
  }

  // ---------- 선택/명령 ----------

  select(e: Entity | null): void {
    if (e?.dead) return;
    this.selected = e;
    this.mode = { type: 'move' };
    if (e && e.cls !== 'monster') {
      const k = e.def.kind;
      playSfxEvent(k === 'animal' ? 'unit_animal' : k === 'robot' ? 'unit_robot' : 'unit_vehicle');
    }
    this.ev.selectionChanged();
  }

  setMode(mode: ActionMode, sfx: SfxEvent = 'click_button'): void {
    playSfxEvent(sfx);
    // 인접 액션은 맵 어디에도 유효 대상이 없으면 타일 선택을 생략하고 바로 안내.
    // (자동 접근이 가능하므로 "주변 5칸" 이 아니라 맵 전체를 검사해야 함)
    if (this.selected && isAdjacentAction(mode.type)) {
      const e = this.selected;
      const action = mode.type as AdjacentAction;
      if (!this.anyFeasibleTarget(e, action)) {
        this.ev.toast(noTargetMessage(e, action));
        this.mode = { type: 'move' };
        this.ev.selectionChanged();
        return;
      }
    }
    this.mode = mode;
    this.ev.selectionChanged();
  }

  /** 맵 전체에서 해당 능력을 쓸 수 있는 대상 칸이 하나라도 있는지 (위치 무관 조건) */
  private anyFeasibleTarget(e: Entity, action: AdjacentAction): boolean {
    const lv = this.level;
    for (let y = 0; y < lv.h; y++) {
      for (let x = 0; x < lv.w; x++) {
        if (action === 'push') {
          if (lv.entityAt(x, y)?.type === 'boulder' || lv.piles.has(lv.key(x, y))) return true;
        } else if (this.canActAt(e, action, x, y)) {
          return true;
        }
      }
    }
    return false;
  }

  /** 캔버스 셀 클릭 처리 */
  clickCell(x: number, y: number): void {
    const lv = this.level;
    if (x < 0 || y < 0 || x >= lv.w || y >= lv.h) return;

    if (this.mode.type === 'build') { this.tryBuild(this.mode.planIdx, x, y); return; }

    const target = lv.entityAt(x, y);
    const sel = this.selected;

    switch (this.mode.type) {
      case 'move': {
        // 기본(이동) 모드에서는 몬스터 포함 아무 엔티티나 클릭 = 선택.
        // 공격 지시는 공격 모드(공격 버튼/X)에서만 내린다.
        if (target) { this.select(target); return; }
        if (sel && sel.cls === 'unit') this.commandMove(sel, x, y);
        break;
      }
      case 'pickup': case 'drop': case 'dig': case 'fill': case 'uproot': case 'plant': case 'push':
        this.actAdjacent(sel, x, y, this.mode.type);
        break;
      case 'attack': {
        if (target && target.cls === 'monster' && sel?.def.attack) {
          sel.attackTarget = target.id;
          this.approach(sel, x, y);
        }
        this.mode = { type: 'move' };
        this.ev.selectionChanged();
        break;
      }
    }
  }

  /** 능력 실행 디스패처 (인접 상태 전제) */
  private performAction(e: Entity, action: AdjacentAction, x: number, y: number): void {
    const dist = Math.abs(e.x - x) + Math.abs(e.y - y);
    if (dist === 1) e.dir = DIR_OF(x - e.x, y - e.y);
    switch (action) {
      case 'pickup': this.doPickup(e, x, y); break;
      case 'drop': this.doDrop(e, x, y); break;
      case 'dig': this.doDig(e, x, y); break;
      case 'fill': this.doFill(e, x, y); break;
      case 'uproot': this.doUproot(e, x, y); break;
      case 'plant': this.doPlant(e, x, y); break;
      case 'push': this.doPush(e, x, y); break;
    }
  }

  /**
   * 인접 필요 액션: 인접하면 즉시 실행.
   * 멀면 대상과 인접한 칸까지 이동 가능한지 계산해 자동 이동 + 도착 시 실행을 예약,
   * 접근 불가면 토스트.
   */
  private actAdjacent(sel: Entity | null, x: number, y: number, action: AdjacentAction): void {
    if (!sel) return;
    const dist = Math.abs(sel.x - x) + Math.abs(sel.y - y);
    if (dist <= 1) {
      sel.pendingAction = null;
      this.performAction(sel, action, x, y);
    } else {
      // 위치 무관 조건 사전 검증 (push 는 방향 의존이라 대상 존재만 확인)
      const lv = this.level;
      const feasible = action === 'push'
        ? lv.entityAt(x, y)?.type === 'boulder' || lv.piles.has(lv.key(x, y))
        : this.canActAt(sel, action, x, y);
      if (!feasible) {
        this.ev.toast('그 칸에는 이 능력을 사용할 수 없습니다');
      } else {
        const path = findPathAdjacent(lv.w, lv.h, { x: sel.x, y: sel.y }, { x, y },
          (px, py) => lv.passableFor(sel, px, py),
          (px, py) => lv.moveCost(sel, px, py));
        if (!path) {
          this.ev.toast('그 위치까지 이동할 수 없습니다');
        } else {
          sel.path = path;
          sel.attackTarget = null;
          sel.pendingAction = { action, x, y };
          playSfxEvent('move');
        }
      }
    }
    this.mode = { type: 'move' };
    this.ev.selectionChanged();
  }

  commandMove(e: Entity, x: number, y: number): void {
    if (e.energy <= 0) { this.ev.toast('에너지가 없습니다!'); return; }
    const lv = this.level;
    const path = findPath(lv.w, lv.h, { x: e.x, y: e.y }, { x, y },
      (px, py) => lv.passableFor(e, px, py),
      (px, py) => lv.moveCost(e, px, py));
    if (!path) { this.ev.toast('갈 수 없는 곳입니다'); return; }
    e.path = path;
    e.attackTarget = null;
    e.pendingAction = null; // 새 이동 명령은 예약된 능력을 취소
    playSfxEvent('move');
  }

  private approach(e: Entity, x: number, y: number): void {
    const lv = this.level;
    const path = findPathAdjacent(lv.w, lv.h, { x: e.x, y: e.y }, { x, y },
      (px, py) => lv.passableFor(e, px, py),
      (px, py) => lv.moveCost(e, px, py));
    if (path) e.path = path;
  }

  // ---------- 액션 구현 ----------

  /**
   * 인접 액션이 해당 칸에서 실제로 실행 가능한지 판정 (부작용/토스트 없음).
   * 방향 화살표 표시와 do* 실행 전 검사에 공용.
   */
  canActAt(e: Entity, action: AdjacentAction, x: number, y: number): boolean {
    const lv = this.level;
    const t = lv.terrainAt(x, y);
    if (!t) return false;
    const k = lv.key(x, y);
    switch (action) {
      case 'push': {
        // dozer: 바위(boulder) 또는 브릭 더미를 유닛 반대 방향으로 한 칸 밀기.
        // 바위는 물로도 밀 수 있다 (가라앉음 — 물 위의 boulder 골 달성 수단)
        if (!e.def.push || e.energy <= 0) return false;
        const dx = x - e.x, dy = y - e.y;
        if (Math.abs(dx) + Math.abs(dy) !== 1) return false;
        const nx = x + dx, ny = y + dy;
        const target = lv.entityAt(x, y);
        if (target && target.type === 'boulder') {
          if (lv.entityAt(nx, ny) || lv.piles.has(lv.key(nx, ny))) return false;
          const nt = lv.terrainAt(nx, ny);
          return !!nt && (target.def.terrain.includes(nt) || nt === 'water' || nt === 'reef' || nt === 'whirl');
        }
        if (lv.piles.has(k)) {
          const nt = lv.terrainAt(nx, ny);
          return !!nt && isOpenGround(nt) && !lv.entityAt(nx, ny);
        }
        return false;
      }
      case 'pickup':
        return !!lv.piles.get(k) && e.def.carries > 0 && brickTotal(e.carrying) < e.def.carries;
      case 'drop':
        return brickTotal(e.carrying) > 0 && isOpenGround(t);
      case 'dig':
        // 브릭 더미가 있어도 굴착 가능 (더미는 물 위에 남는다)
        return e.def.dig && !e.hasDirt && (t === 'normal' || t === 'swamp')
          && !lv.entityAt(x, y) && e.energy > 0;
      case 'fill':
        return e.def.dig && (t === 'water' || t === 'whirl')
          && (!CONFIG.fillRequiresDirt || e.hasDirt)
          && !lv.entityAt(x, y) && e.energy > 0;
      case 'uproot':
        return e.def.transplant && !e.hasTree && terrainFamily(t) === 'tree' && e.energy > 0;
      case 'plant':
        return e.def.transplant && e.hasTree && (t === 'normal' || t === 'swamp')
          && !lv.entityAt(x, y) && !lv.piles.has(k) && e.energy > 0;
    }
  }

  private spend(e: Entity, action: string): boolean {
    const cost = e.def.energy[action] ?? e.def.energy.move ?? 1;
    // 잔량이 비용보다 적어도 0 이 아니면 마지막 한 번은 허용 — 확실히 방전시킨다
    if (e.energy <= 0) { this.ev.toast('에너지 부족!'); return false; }
    e.energy = Math.max(0, e.energy - cost);
    return true;
  }

  private doPickup(e: Entity, x: number, y: number): void {
    const lv = this.level;
    const pile = lv.piles.get(lv.key(x, y));
    if (!pile) { this.ev.toast('브릭 더미가 없습니다'); return; }
    if (e.def.carries <= 0) { this.ev.toast('이 유닛은 운반할 수 없습니다'); return; }
    let space = e.def.carries - brickTotal(e.carrying);
    if (space <= 0) { this.ev.toast('적재 공간이 없습니다'); return; }
    for (const [c, n] of Object.entries(pile.bricks)) {
      if (space <= 0) break;
      const take = Math.min(n ?? 0, space);
      if (take <= 0) continue;
      if (c === 'energy') {
        // 운반 중 에너지 브릭 충전량은 수량 가중 평균으로 합산
        const carriedE = e.carrying.energy ?? 0;
        e.carryCharge = (e.carryCharge * carriedE + pile.energyCharge * take) / (carriedE + take);
      }
      pile.bricks[c as keyof Bricks] = (n ?? 0) - take;
      e.carrying[c as keyof Bricks] = (e.carrying[c as keyof Bricks] ?? 0) + take;
      space -= take;
    }
    for (const [c, n] of Object.entries(pile.bricks)) if (!n) delete pile.bricks[c as keyof Bricks];
    if (brickTotal(pile.bricks) === 0) lv.piles.delete(lv.key(x, y));
    playSfxEvent('pick_up');
    this.ev.selectionChanged();
  }

  private doDrop(e: Entity, x: number, y: number): void {
    if (brickTotal(e.carrying) === 0) { this.ev.toast('운반 중인 브릭이 없습니다'); return; }
    const t = this.level.terrainAt(x, y);
    if (!t || !isOpenGround(t)) { this.ev.toast('여기엔 내려놓을 수 없습니다'); return; }
    this.level.addBricks(x, y, e.carrying, e.carryCharge);
    e.carrying = {};
    playSfxEvent('drop');
    this.ev.selectionChanged();
  }

  private doDig(e: Entity, x: number, y: number): void {
    if (!e.def.dig) return;
    const lv = this.level;
    if (lv.terrainAt(x, y) !== 'normal' && lv.terrainAt(x, y) !== 'swamp') { this.ev.toast('팔 수 없는 지형입니다'); return; }
    if (e.hasDirt) { this.ev.toast('이미 흙을 싣고 있습니다 — 먼저 FILL 하세요'); return; }
    if (lv.entityAt(x, y)) { this.ev.toast('유닛이 있는 칸은 팔 수 없습니다'); return; }
    if (!this.spend(e, 'dig')) return;
    e.dirtSwamp = lv.terrainAt(x, y) === 'swamp'; // 늪흙은 메운 곳을 늪으로 만든다
    lv.terrain[y][x] = 'water';
    e.hasDirt = true;
    playSfxEvent('dig_ground');
    this.ev.selectionChanged();
  }

  private doFill(e: Entity, x: number, y: number): void {
    if (!e.def.dig) return;
    const lv = this.level;
    if (lv.terrainAt(x, y) !== 'water' && lv.terrainAt(x, y) !== 'whirl') { this.ev.toast('메울 수 없는 지형입니다'); return; }
    if (CONFIG.fillRequiresDirt && !e.hasDirt) { this.ev.toast('먼저 DIG 로 흙을 퍼 오세요'); return; }
    if (lv.entityAt(x, y)) { this.ev.toast('유닛이 있는 칸은 메울 수 없습니다'); return; }
    if (!this.spend(e, 'fill')) return;
    // 퍼 온 흙의 속성을 따라간다: 늪흙으로 메우면 늪, 일반 흙이면 평지 (원작 동작)
    lv.terrain[y][x] = e.dirtSwamp ? 'swamp' : 'normal';
    e.hasDirt = false;
    e.dirtSwamp = false;
    playSfxEvent('fill_ground');
    this.ev.selectionChanged();
  }

  private doUproot(e: Entity, x: number, y: number): void {
    if (!e.def.transplant) return;
    const lv = this.level;
    if (terrainFamily(lv.terrainAt(x, y)!) !== 'tree') { this.ev.toast('나무가 없습니다'); return; }
    if (e.hasTree) { this.ev.toast('이미 나무를 들고 있습니다'); return; }
    if (!this.spend(e, 'uproot')) return;
    lv.terrain[y][x] = 'normal';
    e.hasTree = true;
    playSfxEvent('dig_tree');
    this.ev.selectionChanged();
  }

  private doPlant(e: Entity, x: number, y: number): void {
    if (!e.def.transplant) return;
    const lv = this.level;
    if (!e.hasTree) { this.ev.toast('심을 나무가 없습니다'); return; }
    if (lv.terrainAt(x, y) !== 'normal' && lv.terrainAt(x, y) !== 'swamp') { this.ev.toast('심을 수 없는 지형입니다'); return; }
    if (lv.entityAt(x, y) || lv.piles.has(lv.key(x, y))) { this.ev.toast('비어 있는 칸이어야 합니다'); return; }
    if (!this.spend(e, 'plant')) return;
    lv.terrain[y][x] = 'tree';
    e.hasTree = false;
    playSfxEvent('plant_tree');
    this.ev.selectionChanged();
  }

  private doPush(e: Entity, x: number, y: number): void {
    if (!this.canActAt(e, 'push', x, y)) { this.ev.toast('밀 수 없는 대상입니다'); return; }
    if (!this.spend(e, 'push')) return;
    const lv = this.level;
    const dx = x - e.x, dy = y - e.y;
    const nx = x + dx, ny = y + dy;
    const target = lv.entityAt(x, y);
    if (target && target.type === 'boulder') {
      target.fromX = target.x; target.fromY = target.y;
      target.x = nx; target.y = ny;
      target.moveT = 0; target.moving = true;
      // 바위를 골 지점에 밀어 넣는 목표 (boulder goal)
      for (const g of lv.goals) {
        if (!g.done && g.x === nx && g.y === ny && g.target === 'boulder') this.completeGoal(g);
      }
    } else {
      const pile = lv.piles.get(lv.key(x, y));
      if (pile) {
        lv.piles.delete(lv.key(x, y));
        lv.addBricks(nx, ny, pile.bricks);
      }
    }
    playSfxEvent('drop');
    this.ev.selectionChanged();
  }

  takeApart(e: Entity): void {
    const lv = this.level;
    // 분해된 에너지 브릭은 유닛의 현재 에너지를 그대로 유지
    lv.addBricks(e.x, e.y, e.def.recipe, e.energy);
    // 적재 중이던 브릭도 그 자리에 함께 드랍
    if (brickTotal(e.carrying) > 0) {
      lv.addBricks(e.x, e.y, e.carrying, e.carryCharge);
      e.carrying = {};
    }
    e.dead = true;
    this.effects.push({ x: e.x, y: e.y, kind: 'takeApart', t: 0 });
    if (this.selected?.id === e.id) this.select(null);
    playSfxEvent('disassembly');
    this.ev.selectionChanged();
  }

  /**
   * 3×3 조립 판정 — 원본 UX: 플랜 선택 시 커서 중심 3×3 범위 안에
   * 레시피 재료가 모두 있으면 중앙 칸에 조립 가능.
   */
  buildCheck(unit: string, x: number, y: number): { ok: boolean; reason: string | null } {
    const lv = this.level;
    const def = unitDefOf(unit);
    if (!def) return { ok: false, reason: '알 수 없는 유닛' };
    const t = lv.terrainAt(x, y);
    if (!t || !def.terrain.includes(t)) return { ok: false, reason: '이 유닛을 지을 수 없는 지형입니다' };
    if (lv.entityAt(x, y)) return { ok: false, reason: '이미 유닛이 있습니다' };
    const avail: Bricks = {};
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
      const p = lv.piles.get(lv.key(x + dx, y + dy));
      if (p) for (const [c, n] of Object.entries(p.bricks)) avail[c as keyof Bricks] = (avail[c as keyof Bricks] ?? 0) + (n ?? 0);
    }
    for (const [c, need] of Object.entries(def.recipe)) {
      if ((avail[c as keyof Bricks] ?? 0) < (need ?? 0)) {
        return { ok: false, reason: `브릭 부족: ${c} ${need}개 필요 (범위 안에 ${avail[c as keyof Bricks] ?? 0}개)` };
      }
    }
    return { ok: true, reason: null };
  }

  tryBuild(planIdx: number, x: number, y: number): void {
    const lv = this.level;
    const plan = lv.planInv[planIdx];
    this.mode = { type: 'move' };
    if (!plan || plan.uses <= 0) { this.ev.selectionChanged(); return; }
    const def = unitDefOf(plan.unit);
    if (!def) return;
    const check = this.buildCheck(plan.unit, x, y);
    if (!check.ok) {
      if (check.reason) this.ev.toast(check.reason);
      this.ev.selectionChanged();
      return;
    }
    const cells: string[] = [];
    for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) cells.push(lv.key(x + dx, y + dy));
    // 소모 — 사용한 에너지 브릭의 충전량이 새 유닛의 시작 에너지가 된다.
    // 에너지 브릭은 충전량이 가장 높은 더미부터 소모 (여러 개 있을 때 최선의 브릭 선택)
    let energyTaken = 0, energyChargeSum = 0;
    for (const [c, needRaw] of Object.entries(def.recipe)) {
      const order = c === 'energy'
        ? [...cells].sort((a, b) =>
          (lv.piles.get(b)?.energyCharge ?? -1) - (lv.piles.get(a)?.energyCharge ?? -1))
        : cells;
      let need = needRaw ?? 0;
      for (const k of order) {
        if (need <= 0) break;
        const p = lv.piles.get(k);
        if (!p) continue;
        const have = p.bricks[c as keyof Bricks] ?? 0;
        const take = Math.min(have, need);
        if (take > 0) {
          if (c === 'energy') { energyTaken += take; energyChargeSum += p.energyCharge * take; }
          p.bricks[c as keyof Bricks] = have - take;
          if (!p.bricks[c as keyof Bricks]) delete p.bricks[c as keyof Bricks];
          need -= take;
        }
        if (brickTotal(p.bricks) === 0) lv.piles.delete(k);
      }
    }
    plan.uses -= 1;
    if (plan.uses <= 0) lv.planInv.splice(planIdx, 1);
    const cls = UNITKIND(plan.unit);
    const e = lv.spawn(cls, plan.unit, x, y);
    if (e && energyTaken > 0) e.energy = energyChargeSum / energyTaken;
    this.effects.push({ x, y, kind: 'build', t: 0 });
    playSfxEvent('assembly');
    this.ev.plansChanged();
    this.ev.selectionChanged();
    // 이동 도착과 동일한 훅: 그 칸의 플랜 획득, 소용돌이 워프, 골 판정
    if (e) this.onArrive(e);
  }

  // ---------- 진행/골 ----------

  private completeGoal(g: Goal): void {
    g.done = true;
    // 다중 골 맵(WB2) 지원: 같은 종류의 골이 전부 달성돼야 완료로 취급
    const allMain = this.level.goals.filter(x => !x.bonus).every(x => x.done);
    const allBonus = this.level.goals.filter(x => x.bonus).every(x => x.done);
    if (g.bonus) {
      playSfxEvent('bonus_goal');
      if (allBonus && !this.bonusDone) { this.bonusDone = true; this.ev.bonusGoal(); }
      else this.ev.toast('⭐ 보너스 골 하나 달성!');
    } else {
      playSfxEvent('mission_goal');
      if (allMain && !this.goalDone) { this.goalDone = true; this.ev.missionGoal(); }
      else this.ev.toast('❗ 미션 골 하나 달성! 남은 골이 있습니다');
    }
    this.ev.goalsChanged();
  }

  private checkGoals(e: Entity): void {
    if (e.cls === 'monster') return;
    for (const g of this.level.goals) {
      if (g.done || g.x !== e.x || g.y !== e.y) continue;
      const match = g.target === 'anything' || g.target === e.type;
      if (match) this.completeGoal(g);
    }
  }

  /** 셀 도착 시 훅: 플랜 획득, 소용돌이, 골 판정 */
  private onArrive(e: Entity): void {
    const lv = this.level;
    if (e.cls !== 'monster') {
      const k = lv.key(e.x, e.y);
      const plan = lv.mapPlans.get(k);
      if (plan) {
        lv.mapPlans.delete(k);
        const inv = lv.planInv.find(p => p.unit === plan.unit);
        if (inv) inv.uses += plan.uses; else lv.planInv.push({ unit: plan.unit, uses: plan.uses });
        playSfxEvent('pick_up_plan');
        this.ev.toast(`${plan.unit} 플랜 획득!`);
        this.ev.plansChanged();
      }
      const pair = lv.whirlPair(e.x, e.y);
      if (pair && !lv.entityAt(pair.x, pair.y)) {
        e.x = pair.x; e.y = pair.y;
        e.fromX = pair.x; e.fromY = pair.y;
        e.path = [];
      }
      this.checkGoals(e);
      return;
    }
    // 몬스터 도착 훅
    // 1) 몬스터를 타깃으로 하는 골 (예: 4-6 gator 골 — 몬스터를 골 지점으로 유인)
    for (const g of lv.goals) {
      if (!g.done && g.x === e.x && g.y === e.y && g.target === e.type) this.completeGoal(g);
    }
    // 2) 물로 밀린 바위는 가라앉는다 (골 판정은 doPush 에서 이미 처리)
    if (e.type === 'boulder') {
      const t = lv.terrainAt(e.x, e.y);
      if (t === 'water' || t === 'reef' || t === 'whirl') {
        e.dead = true;
        this.effects.push({ x: e.x, y: e.y, kind: 'takeApart', t: 0 });
        playSfxEvent('fill_ground');
      }
    }
  }

  // ---------- 시뮬레이션 ----------

  tick(dt: number): void {
    if (this.paused) return;
    this.time += dt;
    for (const fx of this.effects) fx.t += dt;
    this.effects = this.effects.filter(fx => fx.t < EFFECT_DURATION[fx.kind]);
    // 1) 이동/도착 페이즈 — 골 판정이 같은 틱의 전투보다 항상 먼저 처리되도록 분리
    //    (크랩 공격이 배열 순서상 먼저 실행되어, 골을 밟는 도착이 사망으로 스킵되는 문제 방지)
    for (const e of this.level.entities) {
      if (e.dead) continue;
      if (e.cls === 'monster') this.tickMonster(e, dt);
      this.tickMove(e, dt);
    }
    // 2) 전투/충전 페이즈
    for (const e of this.level.entities) {
      if (e.dead) continue;
      this.tickCombat(e, dt);
      this.tickRecharge(e, dt);
      this.tickFreeze(e, dt);
      this.tickProduction(e, dt);
    }
    this.tickSwamp(dt);
    this.tickCollectGoals();
  }

  /** WB2 freezebot: 사거리 내 가장 가까운 몬스터를 자동 빙결 */
  private tickFreeze(e: Entity, dt: number): void {
    const fz = e.def.freeze;
    if (!fz) return;
    e.attackCd -= dt; // freezebot 은 attack 이 없어 attackCd 를 빙결 쿨다운으로 사용
    if (e.attackCd > 0) return;
    const cost = e.def.energy.freeze ?? 2;
    if (e.energy <= 0) return;
    let best: Entity | null = null, bd = Infinity;
    for (const m of this.level.entities) {
      if (m.dead || m.cls !== 'monster' || m.type === 'boulder') continue;
      if (m.frozenUntil > this.time) continue;
      const d = Math.abs(m.x - e.x) + Math.abs(m.y - e.y);
      if (d <= fz.range && d < bd) { bd = d; best = m; }
    }
    if (!best) return;
    e.attackCd = fz.recharge;
    e.energy = Math.max(0, e.energy - cost);
    e.dir = DIR_OF(Math.sign(best.x - e.x), Math.sign(best.y - e.y));
    best.frozenUntil = this.time + fz.duration;
    best.path = [];
    this.effects.push({ x: best.x, y: best.y, kind: 'damage', t: 0 });
    if (this.selected?.id === best.id || this.selected?.id === e.id) this.ev.selectionChanged();
  }

  /** WB2 생산 건물: factory(바위/나무→브릭), garage(바퀴), windmill(에너지), nursery(나무) */
  private tickProduction(e: Entity, dt: number): void {
    const cycle = e.def.howLongDoesItTake;
    if (!cycle || e.cls !== 'building') return;
    e.prodCd += dt;
    if (e.prodCd < cycle) return;
    e.prodCd = 0;
    const cost = e.def.energy.make ?? 7.5;
    if (e.energy <= 0) return;
    const lv = this.level;
    const DIRS = [[0, -1], [0, 1], [-1, 0], [1, 0]] as const;
    const adj = DIRS.map(([dx, dy]) => ({ x: e.x + dx, y: e.y + dy }))
      .filter(c => lv.terrainAt(c.x, c.y) != null);
    const emptyLand = (c: { x: number; y: number }) => {
      const fam = terrainFamily(lv.terrainAt(c.x, c.y)!);
      return (fam === 'normal' || fam === 'street') && !lv.entityAt(c.x, c.y) && !lv.piles.has(lv.key(c.x, c.y));
    };
    const produced = (c: { x: number; y: number }) => {
      this.effects.push({ x: c.x, y: c.y, kind: 'build', t: 0 });
      e.energy = Math.max(0, e.energy - cost);
    };
    switch (e.type) {
      case 'factory': {
        // 인접한 바위 또는 나무를 현재 색상 브릭으로 가공
        for (const c of adj) {
          const b = lv.entityAt(c.x, c.y);
          if (b && b.type === 'boulder') {
            b.dead = true;
            lv.addBricks(c.x, c.y, { [e.factoryColor]: e.def.makeHowManyBricks ?? 25 });
            produced(c);
            return;
          }
          if (terrainFamily(lv.terrainAt(c.x, c.y)!) === 'tree') {
            lv.terrain[c.y][c.x] = 'normal';
            lv.addBricks(c.x, c.y, { [e.factoryColor]: e.def.makeHowManyBricks ?? 25 });
            produced(c);
            return;
          }
        }
        return;
      }
      case 'garage': case 'windmill': {
        const color = e.type === 'garage' ? 'wheel' : 'energy';
        // 이미 인접에 해당 브릭이 있으면 생산하지 않음 (원작 규칙)
        if (adj.some(c => (lv.piles.get(lv.key(c.x, c.y))?.bricks[color] ?? 0) > 0)) return;
        const spot = adj.find(emptyLand);
        if (!spot) return;
        lv.addBricks(spot.x, spot.y, { [color]: e.def.makeHowManyBricks ?? 1 });
        produced(spot);
        return;
      }
      case 'nursery': {
        const spot = adj.find(c => lv.terrainAt(c.x, c.y) === 'normal' && !lv.entityAt(c.x, c.y) && !lv.piles.has(lv.key(c.x, c.y)));
        if (!spot) return;
        lv.terrain[spot.y][spot.x] = 'tree';
        produced(spot);
        return;
      }
    }
  }

  /** WB2 포획 골: 존 안의 해당 몬스터 수가 목표치 이상이면 달성 */
  private tickCollectGoals(): void {
    for (const g of this.level.goals) {
      if (g.done || !g.collect || !g.zoneCells) continue;
      let n = 0;
      for (const m of this.level.entities) {
        if (m.dead || m.cls !== 'monster' || m.type !== g.collect.type) continue;
        if (g.zoneCells.has(this.level.key(m.x, m.y))) n++;
      }
      if (n >= g.collect.count) this.completeGoal(g);
    }
  }

  /** WB2 factory 출력 색상 변경 (CHANGE COLOR) */
  cycleFactoryColor(e: Entity): void {
    const order = ['red', 'yellow', 'green', 'blue', 'white'] as const;
    e.factoryColor = order[(order.indexOf(e.factoryColor) + 1) % order.length];
    playSfxEvent('click_button');
    this.ev.selectionChanged();
  }

  private swampTimer = 0;

  /** 늪 지형 데미지 (원작 #swamp 정의) — period 마다 늪 위의 플레이어 유닛에 적용 */
  private tickSwamp(dt: number): void {
    this.swampTimer += dt;
    while (this.swampTimer >= SWAMP_HAZARD.period) {
      this.swampTimer -= SWAMP_HAZARD.period;
      for (const e of this.level.entities) {
        if (e.dead || e.cls === 'monster') continue;
        if (this.level.terrainAt(e.x, e.y) !== 'swamp') continue;
        const dmg = Math.max(0, SWAMP_HAZARD.damage - (COMBAT_STATS[e.type]?.defense ?? 0));
        if (dmg <= 0) continue;
        e.energy -= dmg;
        e.lastHitAt = this.time;
        this.effects.push({ x: e.x, y: e.y, kind: 'damage', t: 0 });
        if (this.selected?.id === e.id) this.ev.selectionChanged();
        if (e.energy <= 0) this.destroy(e);
      }
    }
  }

  /** 충전 건물/유닛: recharges 목록의 유닛이 인접해 있으면 에너지 회복 */
  private tickRecharge(e: Entity, dt: number): void {
    if (!e.def.recharges.length) return;
    for (const u of this.level.entities) {
      if (u.dead || u.id === e.id || !e.def.recharges.includes(u.type)) continue;
      if (Math.abs(u.x - e.x) + Math.abs(u.y - e.y) > 1) continue; // 맨해튼 1 (직교 인접)
      if (u.energy < CONFIG.maxEnergy) {
        u.energy = Math.min(CONFIG.maxEnergy, u.energy + RECHARGE_RATE * dt);
        u.chargingAt = this.time;
        if (this.selected?.id === u.id) this.ev.selectionChanged();
      }
    }
  }

  private tickMove(e: Entity, dt: number): void {
    // 예약된 능력: 이동이 끝났으면 실행 (경로가 막혀 중단된 경우 포함)
    if (!e.moving && e.path.length === 0 && e.pendingAction) {
      const pa = e.pendingAction;
      e.pendingAction = null;
      if (Math.abs(e.x - pa.x) + Math.abs(e.y - pa.y) <= 1) {
        this.performAction(e, pa.action as AdjacentAction, pa.x, pa.y);
      } else {
        this.ev.toast('접근 경로가 막혀 능력을 사용하지 못했습니다');
      }
      this.ev.selectionChanged();
    }
    if (e.moving) {
      // speed 0 엔티티(boulder)도 밀리는 애니메이션은 진행돼야 함
      e.moveT += dt * (e.def.speed > 0 ? e.def.speed : PUSH_ANIM_SPEED);
      if (e.moveT >= 1) {
        e.moving = false;
        e.moveT = 1;
        this.onArrive(e);
        if (this.selected?.id === e.id) this.ev.selectionChanged();
      }
      return;
    }
    if (!e.path.length) return;
    // 몬스터는 이동 에너지를 소모하지 않는다 (에너지 = 전투 자원 전용)
    const isMonster = e.cls === 'monster';
    if (!isMonster && e.energy <= 0) { e.path = []; return; }
    const next = e.path[0];
    if (!this.level.passableFor(e, next.x, next.y)) {
      // 막히면 재탐색
      const goal = e.path[e.path.length - 1];
      const p = findPath(this.level.w, this.level.h, { x: e.x, y: e.y }, goal,
        (px, py) => this.level.passableFor(e, px, py),
        (px, py) => this.level.moveCost(e, px, py));
      e.path = p ?? [];
      return;
    }
    e.path.shift();
    if (!isMonster) {
      const cost = e.def.energy.move ?? 1;
      e.energy = Math.max(0, e.energy - cost); // 잔량 부족이어도 마지막 한 걸음은 허용
    }
    e.fromX = e.x; e.fromY = e.y;
    e.dir = DIR_OF(next.x - e.x, next.y - e.y);
    e.x = next.x; e.y = next.y;
    e.moveT = 0;
    e.moving = true;
  }

  private tickMonster(m: Entity, dt: number): void {
    // 활동/휴식 사이클
    if (m.def.restEvery != null && m.def.restFor != null) {
      m.restTimer += dt;
      if (m.resting && m.restTimer >= m.def.restFor) { m.resting = false; m.restTimer = 0; }
      else if (!m.resting && m.restTimer >= m.def.restEvery) { m.resting = true; m.restTimer = 0; m.path = []; }
    }
    if (m.frozenUntil > this.time) return; // 빙결 (WB2)
    if (m.resting || m.def.speed <= 0) return;
    if (m.moving || m.path.length) return;

    const range = m.def.attack?.searchRange ?? 0;
    // 탐지 범위 내 플레이어 유닛 추적
    let target: Entity | null = null;
    let bd = Infinity;
    for (const u of this.level.entities) {
      if (u.dead || u.cls === 'monster') continue;
      const d = Math.abs(u.x - m.x) + Math.abs(u.y - m.y);
      if (d <= range && d < bd) { bd = d; target = u; }
    }
    if (target && bd > CONFIG.attackAdjacency) {
      const p = findPathAdjacent(this.level.w, this.level.h, { x: m.x, y: m.y }, { x: target.x, y: target.y },
        (px, py) => this.level.passableFor(m, px, py),
        (px, py) => this.level.terrainAt(px, py) === 'swamp' ? 2 : 1); // 추적 시 늪 페널티 1
      if (p) { m.path = p.slice(0, 2); return; }
      // 타깃까지 경로가 없으면(도달 불가) 배회로 폴백 — 제자리에 얼어붙지 않도록
    }
    // 배회
    m.wanderCd -= dt;
    if (m.wanderCd <= 0) {
      m.wanderCd = 1.5 + Math.random() * 3;
      const dirs = [[0, 1], [0, -1], [1, 0], [-1, 0]].sort(() => Math.random() - 0.5);
      for (const [dx, dy] of dirs) {
        if (this.level.passableFor(m, m.x + dx, m.y + dy)) { m.path = [{ x: m.x + dx, y: m.y + dy }]; break; }
      }
    }
  }

  /**
   * 에너지 기반 전투 (난수 없음):
   * - 피해 = max(0, 공격자 attack - 피격자 defense) 를 에너지에서 차감
   *   (비전투 유닛은 COMBAT_STATS 에 없으므로 방어력 0 으로 동일 로직)
   * - 에너지 0 이하 → 강제 분해
   */
  private tickCombat(e: Entity, dt: number): void {
    const atk = e.def.attack;
    if (!atk || !COMBAT_STATS[e.type]) return;
    e.attackCd -= dt;
    if (e.attackCd > 0) return;
    if (e.cls === 'monster' && (e.resting || e.frozenUntil > this.time)) return;

    // 대상 탐색: 몬스터 → 인접 플레이어 유닛 / 유닛·타워 → 사거리 내 몬스터
    let target: Entity | null = null;
    if (e.cls === 'monster') {
      for (const u of this.level.entities) {
        if (u.dead || u.cls === 'monster') continue;
        // 근접 공격은 상하좌우 인접만 (이동이 4방향이므로 "접촉" = 직교 인접)
        if (Math.abs(u.x - e.x) + Math.abs(u.y - e.y) <= CONFIG.attackAdjacency) { target = u; break; }
      }
    } else {
      // 원거리 사거리도 맨해튼 거리로 통일 (다이아몬드형 범위)
      const explicit = e.attackTarget != null ? this.level.entities.find(t => t.id === e.attackTarget && !t.dead) : null;
      if (explicit && Math.abs(explicit.x - e.x) + Math.abs(explicit.y - e.y) <= atk.searchRange) target = explicit;
      if (!target) {
        for (const mtr of this.level.entities) {
          if (mtr.dead || mtr.cls !== 'monster' || mtr.type === 'boulder') continue;
          if (Math.abs(mtr.x - e.x) + Math.abs(mtr.y - e.y) <= atk.searchRange) { target = mtr; break; }
        }
      }
    }
    if (!target) return;
    if (target.type === 'boulder') return; // 파괴 불가 장애물

    e.attackCd = 60 / atk.hitsPerMinute;
    e.dir = DIR_OF(Math.sign(target.x - e.x), Math.sign(target.y - e.y));
    const defense = COMBAT_STATS[target.type]?.defense ?? 0; // 비전투 유닛은 방어력 0
    const dmg = Math.max(0, COMBAT_STATS[e.type].attack - defense);
    if (dmg <= 0) return; // 방어력이 공격력 이상이면 무피해
    target.energy -= dmg;
    target.lastHitAt = this.time;
    this.effects.push({ x: target.x, y: target.y, kind: 'damage', t: 0 });
    playSfxEvent(e.cls === 'monster' ? 'monster_attack' : 'damage');
    if (this.selected?.id === target.id) this.ev.selectionChanged();
    if (target.energy <= 0) this.destroy(target);
  }

  /**
   * 강제 분해: 에너지 고갈로 파괴.
   * 플레이어 유닛의 에너지 브릭은 잔량(=0) 드랍, 몬스터는 예외적으로 풀충전 드랍.
   */
  private destroy(e: Entity): void {
    e.dead = true;
    const charge = e.cls === 'monster' ? CONFIG.maxEnergy : Math.max(0, e.energy);
    this.level.addBricks(e.x, e.y, e.def.recipe, charge);
    // 적재 중이던 브릭도 그 자리에 함께 드랍
    if (brickTotal(e.carrying) > 0) {
      this.level.addBricks(e.x, e.y, e.carrying, e.carryCharge);
      e.carrying = {};
    }
    this.effects.push({ x: e.x, y: e.y, kind: 'takeApart', t: 0 });
    if (e.cls !== 'monster') this.ev.unitLost(e.def.name || e.type);
    if (this.selected?.id === e.id) this.select(null);
    playSfxEvent('disassembly');
  }
}

function UNITKIND(type: string): 'unit' | 'building' {
  return UNIT_DATA.buildings[type] ? 'building' : 'unit';
}

/** 이펙트 재생 시간(초) — build 2프레임, takeApart 3프레임, damage 5프레임 */
export const EFFECT_DURATION = { build: 0.28, takeApart: 0.36, damage: 0.4 } as const;

/** 충전 건물의 초당 에너지 회복량 */
const RECHARGE_RATE = 34;

/** 밀리는 물체(boulder 등 speed 0)의 이동 애니메이션 속도 (칸/초) */
const PUSH_ANIM_SPEED = 2.5;

/** 브릭을 놓거나 밀어 넣을 수 있는 열린 지면인지 (장애물 지형 제외) */
function isOpenGround(t: import('../data/types').TerrainId): boolean {
  const fam = terrainFamily(t);
  return fam !== 'mountain' && fam !== 'tree' && fam !== 'volcano'
    && fam !== 'jungle' && fam !== 'roadblock' && fam !== 'hole' && fam !== 'billboard';
}

export type AdjacentAction = 'pickup' | 'drop' | 'dig' | 'fill' | 'uproot' | 'plant' | 'push';

function isAdjacentAction(t: string): t is AdjacentAction {
  return t === 'pickup' || t === 'drop' || t === 'dig' || t === 'fill'
    || t === 'uproot' || t === 'plant' || t === 'push';
}

/** 사용 가능한 대상이 맵에 하나도 없을 때의 원인별 안내 문구 */
function noTargetMessage(e: Entity, action: AdjacentAction): string {
  switch (action) {
    case 'pickup': return '집을 수 있는 브릭 더미가 없습니다';
    case 'drop': return '내려놓을 수 있는 칸이 없습니다';
    case 'dig':
      return e.hasDirt ? '이미 흙을 싣고 있습니다 — 먼저 FILL 하세요' : '팔 수 있는 땅이 없습니다';
    case 'fill':
      return e.hasDirt ? '메울 수 있는 물이 없습니다' : '먼저 DIG 로 흙을 퍼 와야 합니다';
    case 'uproot':
      return e.hasTree ? '이미 나무를 들고 있습니다 — 먼저 심으세요' : '뽑을 나무가 없습니다';
    case 'plant':
      return e.hasTree ? '심을 수 있는 칸이 없습니다' : '심을 나무가 없습니다 — 먼저 나무를 뽑으세요';
    case 'push':
      return '밀 수 있는 바위나 브릭 더미가 없습니다';
  }
}
