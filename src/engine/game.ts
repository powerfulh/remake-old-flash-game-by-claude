import type { Bricks, LevelDef } from '../data/types';
import { COMBAT_STATS } from '../data/combatStats';
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
    playSfxEvent(sfx);
    // 인접 액션은 사방+발밑이 전부 무효면 타일 선택을 생략하고 바로 안내
    if (this.selected && isAdjacentAction(mode.type)) {
      const e = this.selected;
      const any = [[0, 0], [0, -1], [0, 1], [-1, 0], [1, 0]]
        .some(([dx, dy]) => this.canActAt(e, mode.type as AdjacentAction, e.x + dx, e.y + dy));
      if (!any) {
        this.ev.toast(noTargetMessage(e, mode.type as AdjacentAction));
        this.mode = { type: 'move' };
        this.ev.selectionChanged();
        return;
      }
    }
    this.mode = mode;
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
      case 'push': this.actAdjacent(sel, x, y, () => this.doPush(sel!, x, y)); break;
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
  canActAt(e: Entity, action: AdjacentAction, x: number, y: number): boolean {
    const lv = this.level;
    const t = lv.terrainAt(x, y);
    if (!t) return false;
    const k = lv.key(x, y);
    switch (action) {
      case 'push': {
        // dozer: 바위(boulder) 또는 브릭 더미를 유닛 반대 방향으로 한 칸 밀기
        if (!e.def.push || e.energy < (e.def.energy.push ?? 1)) return false;
        const dx = x - e.x, dy = y - e.y;
        if (Math.abs(dx) + Math.abs(dy) !== 1) return false;
        const nx = x + dx, ny = y + dy;
        const target = lv.entityAt(x, y);
        if (target && target.type === 'boulder') {
          return lv.passableFor(target, nx, ny) && !lv.piles.has(lv.key(nx, ny));
        }
        if (lv.piles.has(k)) {
          const nt = lv.terrainAt(nx, ny);
          return !!nt && nt !== 'mountain' && nt !== 'tree' && nt !== 'volcano' && !lv.entityAt(nx, ny);
        }
        return false;
      }
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
    if (!t || t === 'mountain' || t === 'tree' || t === 'volcano') { this.ev.toast('여기엔 내려놓을 수 없습니다'); return; }
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
    if (e) this.checkGoals(e);
  }

  // ---------- 진행/골 ----------

  private completeGoal(g: Goal): void {
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
    }
  }

  /** 충전 건물/유닛: recharges 목록의 유닛이 인접해 있으면 에너지 회복 */
  private tickRecharge(e: Entity, dt: number): void {
    if (!e.def.recharges.length) return;
    for (const u of this.level.entities) {
      if (u.dead || u.id === e.id || !e.def.recharges.includes(u.type)) continue;
      if (Math.max(Math.abs(u.x - e.x), Math.abs(u.y - e.y)) > 1) continue;
      if (u.energy < CONFIG.maxEnergy) {
        u.energy = Math.min(CONFIG.maxEnergy, u.energy + RECHARGE_RATE * dt);
        if (this.selected?.id === u.id) this.ev.selectionChanged();
      }
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
    if (e.cls === 'monster' && e.resting) return;

    // 대상 탐색: 몬스터 → 인접 플레이어 유닛 / 유닛·타워 → 사거리 내 몬스터
    let target: Entity | null = null;
    if (e.cls === 'monster') {
      for (const u of this.level.entities) {
        if (u.dead || u.cls === 'monster') continue;
        // 근접 공격은 상하좌우 인접만 (이동이 4방향이므로 "접촉" = 직교 인접)
        if (Math.abs(u.x - e.x) + Math.abs(u.y - e.y) <= CONFIG.attackAdjacency) { target = u; break; }
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

export type AdjacentAction = 'pickup' | 'drop' | 'dig' | 'fill' | 'uproot' | 'plant' | 'push';

function isAdjacentAction(t: string): t is AdjacentAction {
  return t === 'pickup' || t === 'drop' || t === 'dig' || t === 'fill'
    || t === 'uproot' || t === 'plant' || t === 'push';
}

/** 사용 가능한 칸이 하나도 없을 때의 원인별 안내 문구 */
function noTargetMessage(e: Entity, action: AdjacentAction): string {
  switch (action) {
    case 'pickup': return '주변에 집을 수 있는 브릭 더미가 없습니다';
    case 'drop': return '주변에 내려놓을 수 있는 칸이 없습니다';
    case 'dig':
      return e.hasDirt ? '이미 흙을 싣고 있습니다 — 먼저 FILL 하세요' : '주변에 팔 수 있는 땅이 없습니다';
    case 'fill':
      return e.hasDirt ? '주변에 메울 수 있는 물이 없습니다' : '먼저 DIG 로 흙을 퍼 와야 합니다';
    case 'uproot':
      return e.hasTree ? '이미 나무를 들고 있습니다 — 먼저 심으세요' : '주변에 뽑을 나무가 없습니다';
    case 'plant':
      return e.hasTree ? '주변에 심을 수 있는 칸이 없습니다' : '심을 나무가 없습니다 — 먼저 나무를 뽑으세요';
    case 'push':
      return '주변에 밀 수 있는 바위나 브릭 더미가 없습니다 (밀려날 자리도 비어 있어야 합니다)';
  }
}
