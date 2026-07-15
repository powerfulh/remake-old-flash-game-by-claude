import type { Bricks, LevelDef } from '../data/types';
import { UNIT_DATA } from './../data/generated/units';
import { CONFIG } from './const';
import { brickTotal, Entity, LevelState, unitDefOf } from './level';
import type { Dir } from './level';
import { findPath, findPathAdjacent } from './path';
import { playSfxEvent, type SfxEvent } from './audio';

export type ActionMode =
  | { type: 'move' }
  | { type: 'pickup' } | { type: 'drop' }
  | { type: 'dig' } | { type: 'fill' }
  | { type: 'uproot' } | { type: 'plant' }
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
  private ev: GameEvents;

  constructor(def: LevelDef, ev: GameEvents) {
    this.level = new LevelState(def);
    this.ev = ev;
  }

  // ---------- 선택/명령 ----------

  select(e: Entity | null): void {
    if (e && (e.cls === 'monster' || e.dead)) return;
    this.selected = e;
    this.mode = { type: 'move' };
    if (e) {
      const k = e.def.kind;
      playSfxEvent(k === 'animal' ? 'unit_animal' : k === 'robot' ? 'unit_robot' : 'unit_vehicle');
    }
    this.ev.selectionChanged();
  }

  setMode(mode: ActionMode, sfx: SfxEvent = 'click_button'): void {
    this.mode = mode;
    playSfxEvent(sfx);
    this.ev.selectionChanged();
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
        if (target && target.cls !== 'monster') { this.select(target); return; }
        if (target && target.cls === 'monster' && sel?.def.attack) {
          sel.attackTarget = target.id;
          this.approach(sel, x, y);
          return;
        }
        if (sel && sel.cls === 'unit') this.commandMove(sel, x, y);
        else if (target) this.select(target);
        break;
      }
      case 'pickup': this.actAdjacent(sel, x, y, () => this.doPickup(sel!, x, y)); break;
      case 'drop': this.actAdjacent(sel, x, y, () => this.doDrop(sel!, x, y)); break;
      case 'dig': this.actAdjacent(sel, x, y, () => this.doDig(sel!, x, y)); break;
      case 'fill': this.actAdjacent(sel, x, y, () => this.doFill(sel!, x, y)); break;
      case 'uproot': this.actAdjacent(sel, x, y, () => this.doUproot(sel!, x, y)); break;
      case 'plant': this.actAdjacent(sel, x, y, () => this.doPlant(sel!, x, y)); break;
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

  /** 인접 필요 액션: 인접하면 즉시 실행, 아니면 안내 */
  private actAdjacent(sel: Entity | null, x: number, y: number, fn: () => void): void {
    if (!sel) return;
    const dist = Math.abs(sel.x - x) + Math.abs(sel.y - y);
    if (dist <= 1) {
      if (dist === 1) sel.dir = DIR_OF(x - sel.x, y - sel.y);
      fn();
    } else {
      this.ev.toast('유닛과 인접한 칸을 선택하세요');
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
  canActAt(e: Entity, action: 'pickup' | 'drop' | 'dig' | 'fill' | 'uproot' | 'plant', x: number, y: number): boolean {
    const lv = this.level;
    const t = lv.terrainAt(x, y);
    if (!t) return false;
    const k = lv.key(x, y);
    switch (action) {
      case 'pickup':
        return !!lv.piles.get(k) && e.def.carries > 0 && brickTotal(e.carrying) < e.def.carries;
      case 'drop':
        return brickTotal(e.carrying) > 0 && t !== 'mountain' && t !== 'tree' && t !== 'volcano';
      case 'dig':
        return e.def.dig && !e.hasDirt && (t === 'normal' || t === 'swamp')
          && !lv.entityAt(x, y) && !lv.piles.has(k) && e.energy >= (e.def.energy.dig ?? 1);
      case 'fill':
        return e.def.dig && (t === 'water' || t === 'whirl')
          && (!CONFIG.fillRequiresDirt || e.hasDirt)
          && !lv.entityAt(x, y) && e.energy >= (e.def.energy.fill ?? 1);
      case 'uproot':
        return e.def.transplant && !e.hasTree && t === 'tree' && e.energy >= (e.def.energy.uproot ?? 1);
      case 'plant':
        return e.def.transplant && e.hasTree && (t === 'normal' || t === 'swamp')
          && !lv.entityAt(x, y) && !lv.piles.has(k) && e.energy >= (e.def.energy.plant ?? 1);
    }
  }

  private spend(e: Entity, action: string): boolean {
    const cost = e.def.energy[action] ?? e.def.energy.move ?? 1;
    if (e.energy < cost) { this.ev.toast('에너지 부족!'); return false; }
    e.energy -= cost;
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
    if (!t || t === 'mountain' || t === 'tree' || t === 'volcano') { this.ev.toast('여기엔 내려놓을 수 없습니다'); return; }
    this.level.addBricks(x, y, e.carrying);
    e.carrying = {};
    playSfxEvent('drop');
    this.ev.selectionChanged();
  }

  private doDig(e: Entity, x: number, y: number): void {
    if (!e.def.dig) return;
    const lv = this.level;
    if (lv.terrainAt(x, y) !== 'normal' && lv.terrainAt(x, y) !== 'swamp') { this.ev.toast('팔 수 없는 지형입니다'); return; }
    if (e.hasDirt) { this.ev.toast('이미 흙을 싣고 있습니다 — 먼저 FILL 하세요'); return; }
    if (lv.entityAt(x, y) || lv.piles.has(lv.key(x, y))) { this.ev.toast('비어 있는 칸이어야 합니다'); return; }
    if (!this.spend(e, 'dig')) return;
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
    lv.terrain[y][x] = 'normal';
    e.hasDirt = false;
    playSfxEvent('fill_ground');
    this.ev.selectionChanged();
  }

  private doUproot(e: Entity, x: number, y: number): void {
    if (!e.def.transplant) return;
    const lv = this.level;
    if (lv.terrainAt(x, y) !== 'tree') { this.ev.toast('나무가 없습니다'); return; }
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

  takeApart(e: Entity): void {
    const lv = this.level;
    lv.addBricks(e.x, e.y, e.def.recipe);
    e.dead = true;
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
    // 소모
    for (const [c, needRaw] of Object.entries(def.recipe)) {
      let need = needRaw ?? 0;
      for (const k of cells) {
        if (need <= 0) break;
        const p = lv.piles.get(k);
        if (!p) continue;
        const have = p.bricks[c as keyof Bricks] ?? 0;
        const take = Math.min(have, need);
        if (take > 0) {
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
    playSfxEvent('assembly');
    this.ev.plansChanged();
    this.ev.selectionChanged();
    if (e) this.checkGoals(e);
  }

  // ---------- 진행/골 ----------

  private checkGoals(e: Entity): void {
    if (e.cls === 'monster') return;
    for (const g of this.level.goals) {
      if (g.done || g.x !== e.x || g.y !== e.y) continue;
      const match = g.target === 'anything' || g.target === e.type
        || (g.target === 'boulder' && e.type === 'boulder');
      if (!match) continue;
      g.done = true;
      if (g.bonus) {
        this.bonusDone = true;
        playSfxEvent('bonus_goal');
        this.ev.bonusGoal();
      } else {
        this.goalDone = true;
        playSfxEvent('mission_goal');
        this.ev.missionGoal();
      }
      this.ev.goalsChanged();
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
    }
  }

  // ---------- 시뮬레이션 ----------

  tick(dt: number): void {
    if (this.paused) return;
    this.time += dt;
    for (const e of this.level.entities) {
      if (e.dead) continue;
      if (e.cls === 'monster') this.tickMonster(e, dt);
      this.tickMove(e, dt);
      this.tickCombat(e, dt);
    }
  }

  private tickMove(e: Entity, dt: number): void {
    if (e.moving) {
      e.moveT += dt * e.def.speed;
      if (e.moveT >= 1) {
        e.moving = false;
        e.moveT = 1;
        this.onArrive(e);
        if (this.selected?.id === e.id) this.ev.selectionChanged();
      }
      return;
    }
    if (!e.path.length) return;
    if (e.energy <= 0) { e.path = []; return; }
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
    const cost = e.def.energy.move ?? 1;
    if (e.energy < cost) { e.path = []; return; }
    e.energy -= cost;
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
    }
    if (!target) {
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
  }

  private tickCombat(e: Entity, dt: number): void {
    const atk = e.def.attack;
    if (!atk) return;
    e.attackCd -= dt;
    if (e.attackCd > 0) return;
    if (e.cls === 'monster' && e.resting) return;

    // 대상 탐색: 몬스터 → 인접 플레이어 유닛 / 유닛·타워 → 사거리 내 몬스터
    let target: Entity | null = null;
    if (e.cls === 'monster') {
      for (const u of this.level.entities) {
        if (u.dead || u.cls === 'monster') continue;
        if (Math.max(Math.abs(u.x - e.x), Math.abs(u.y - e.y)) <= CONFIG.attackAdjacency) { target = u; break; }
      }
    } else {
      const explicit = e.attackTarget != null ? this.level.entities.find(t => t.id === e.attackTarget && !t.dead) : null;
      if (explicit && Math.max(Math.abs(explicit.x - e.x), Math.abs(explicit.y - e.y)) <= atk.searchRange) target = explicit;
      if (!target) {
        for (const mtr of this.level.entities) {
          if (mtr.dead || mtr.cls !== 'monster' || mtr.type === 'boulder') continue;
          if (Math.max(Math.abs(mtr.x - e.x), Math.abs(mtr.y - e.y)) <= atk.searchRange) { target = mtr; break; }
        }
      }
    }
    if (!target) return;

    e.attackCd = 60 / atk.hitsPerMinute;
    e.dir = DIR_OF(Math.sign(target.x - e.x), Math.sign(target.y - e.y));
    if (Math.random() * 100 > atk.chance) return; // 빗나감
    const [lo, hi] = atk.damage;
    const dmg = (lo + Math.random() * (hi - lo)) * target.def.shield;
    target.hp -= dmg;
    playSfxEvent(e.cls === 'monster' ? 'monster_attack' : 'damage');
    if (target.hp <= 0) this.destroy(target);
  }

  private destroy(e: Entity): void {
    e.dead = true;
    // 파괴 시 레시피 브릭 드랍 (원본: 몬스터가 유닛을 분해)
    this.level.addBricks(e.x, e.y, e.def.recipe);
    if (e.cls !== 'monster') this.ev.unitLost(e.def.name || e.type);
    if (this.selected?.id === e.id) this.select(null);
    playSfxEvent('disassembly');
  }
}

function UNITKIND(type: string): 'unit' | 'building' {
  return UNIT_DATA.buildings[type] ? 'building' : 'unit';
}
