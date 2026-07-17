import type { Game, ActionMode } from '../engine/game';
import { COMBAT_STATS } from '../data/combatStats';
import { UNIT_DESCRIPTIONS } from '../data/generated/descriptions';
import { playSfxEvent } from '../engine/audio';
import { brickTotal, unitDefOf } from '../engine/level';

const BRICK_KO: Record<string, string> = {
  red: '빨강', yellow: '노랑', blue: '파랑', green: '초록', white: '하양', wheel: '바퀴', energy: '에너지',
};
const BRICK_COLOR: Record<string, string> = {
  red: '#e53935', yellow: '#fdd835', blue: '#1e88e5', green: '#43a047', white: '#f5f5f5', wheel: '#9e9e9e', energy: '#aeea00',
};
/** TerrainId → 위키 표기와 같은 영문 라벨 (몬스터 패널용) */
const TERRAIN_LABEL: Record<string, string> = {
  normal: 'Normal', rocky: 'Rocky', water: 'Water', deep: 'Deep Water',
  reef: 'Reefs', swamp: 'Swamp', whirl: 'Whirlpool', street: 'Street',
};

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

export interface HudCallbacks {
  onExit(): void;
  onEndMission(): void;
  onRetry(): void;
}

export class Hud {
  private game: Game;
  private cb: HudCallbacks;
  private toastTimer = 0;

  constructor(game: Game, cb: HudCallbacks) {
    this.game = game;
    this.cb = cb;
    $('btn-menu').onclick = () => this.cb.onExit();
    $('btn-retry').onclick = () => { playSfxEvent('click_button'); this.cb.onRetry(); };
    $('btn-pause').onclick = () => this.togglePause();
    this.updatePauseUi();
    this.refreshAll();
  }

  refreshAll(): void {
    this.updateMissionLabel();
    this.updateGoals();
    this.updateSelection();
    this.updatePlans();
  }

  updateMissionLabel(): void {
    const d = this.game.level.def;
    $('mission-label').textContent = `월드 ${d.world} — 미션 ${d.mission}: ${d.name}`;
  }

  updateGoals(): void {
    const g = this.game;
    const label = (x: import('../engine/level').Goal) =>
      x.collect ? `${unitDefOf(x.collect.type)?.name ?? x.collect.type} ${x.collect.count}마리 포획` : x.target;
    const summarize = (bonus: boolean, icon: string, name: string, allDone: boolean) => {
      const list = g.level.goals.filter(x => x.bonus === bonus);
      if (!list.length) return null;
      const done = list.filter(x => x.done).length;
      const desc = list.length > 1 ? `${done}/${list.length}` : label(list[0]);
      return `${icon} ${name}(${desc}): ${allDone ? '✅' : '…'}`;
    };
    $('goal-status').textContent = [
      summarize(false, '❗', '미션 골', g.goalDone),
      summarize(true, '⭐', '보너스', g.bonusDone),
    ].filter(Boolean).join('   ');
  }

  updateSelection(): void {
    const e = this.game.selected;
    const info = $('unit-info');
    const actions = $('actions');
    actions.innerHTML = '';
    if (!e) { info.classList.add('hidden'); return; }
    info.classList.remove('hidden');
    const carry = brickTotal(e.carrying);
    const carryTxt = carry > 0
      ? `적재: ${Object.entries(e.carrying).filter(([, n]) => n).map(([c, n]) => `${c}×${n}`).join(', ')}`
      : e.hasDirt ? '적재: 흙 1' : e.hasTree ? '적재: 나무 1' : '';
    // 원작 위키(wb_help_models / unit info 텍스트) 기반 유닛 정보 카드
    const desc = UNIT_DESCRIPTIONS[e.type];
    const combat = COMBAT_STATS[e.type];
    // 연비: 칸당 이동 에너지 (몬스터는 이동 에너지 미소모라 제외)
    const moveCost = e.cls === 'unit' ? e.def.energy.move : undefined;
    // 적재량: 항상 config carries 기준으로 표시.
    // (원작 위키 텍스트는 dumptruck 누락, tugboat 5→10 오기 등 실제 값과 어긋나는 곳이 있음)
    const capacity = e.def.carries > 0 ? `${e.def.carries} Bricks` : '';
    const wiki = desc ? `
      <div class="desc">${desc.text}</div>
      <div class="stats">
        ${desc.terrain ? `<div><span>지형</span>${desc.terrain}</div>` : ''}
        ${desc.speed ? `<div><span>속도</span>${desc.speed}</div>` : ''}
        ${moveCost != null ? `<div><span>연비</span>에너지 ${moveCost}/칸</div>` : ''}
        ${desc.actions ? `<div><span>능력</span>${desc.actions}</div>` : ''}
        ${capacity ? `<div><span>적재</span>${capacity}</div>` : ''}
      </div>` : '';
    // 몬스터는 위키 카드가 없으므로 config terrain 으로 이동 가능 지형 표시
    const monsterStats = !desc && e.cls === 'monster' && e.def.terrain.length
      ? `<div class="stats"><div><span>지형</span>${e.def.terrain.map(t => TERRAIN_LABEL[t] ?? t).join(', ')}</div></div>`
      : '';
    // 사거리: 전투 유닛은 공격 사거리, 몬스터는 근접(1) + 탐지 범위
    const range = e.def.attack
      ? (e.cls === 'monster' ? `1 (탐지 ${e.def.attack.searchRange})` : `${e.def.attack.searchRange}`)
      : null;
    const combatRow = combat
      ? `<div class="stats combat"><div><span>공격</span>${combat.attack}</div><div><span>방어</span>${combat.defense}</div>${range ? `<div><span>사거리</span>${range}</div>` : ''}</div>`
      : e.type === 'boulder' ? '<div class="stats combat"><div>파괴 불가 장애물</div></div>' : '';
    info.innerHTML = `
      <div class="name">${e.cls === 'monster' ? '⚠️ ' : ''}${e.def.name || e.type}</div>
      ${wiki}
      ${monsterStats}
      ${combatRow}
      <div>에너지</div>
      <div class="energy-bar"><div class="${e.energy < 25 ? 'low' : ''}" style="width:${Math.max(0, e.energy)}%"></div></div>
      ${carryTxt ? `<div class="carry">${carryTxt}</div>` : ''}
    `;
    if (e.cls === 'building') {
      // WB2 factory: 출력 색상 변경 (원작 CHANGE COLOR)
      if (e.type === 'factory') {
        const b = document.createElement('button');
        b.textContent = `색 변경 — 현재: ${BRICK_KO[e.factoryColor] ?? e.factoryColor}`;
        b.onclick = () => this.game.cycleFactoryColor(e);
        b.onmouseenter = () => playSfxEvent('rollover');
        actions.appendChild(b);
      }
      return;
    }
    if (e.cls === 'monster') return; // 액션 버튼 없음

    const mode = this.game.mode;
    const btn = (label: string, m: ActionMode | null, extra?: () => void) => {
      const b = document.createElement('button');
      b.textContent = label;
      if (m && mode.type === m.type) b.classList.add('active');
      b.onclick = () => {
        if (extra) { extra(); return; }
        if (m) this.game.setMode(mode.type === m.type ? { type: 'move' } : m);
      };
      b.onmouseenter = () => playSfxEvent('rollover');
      actions.appendChild(b);
    };
    // 원작과 동일한 토글식 능력 버튼: 유닛 상태에 따라 같은 슬롯의 라벨/동작이 바뀐다.
    // 주 능력(집기·파기·이식·밀기)은 모두 SPACE 하나로 통합 (유닛당 주 능력은 1종)
    btn('이동 (기본)', { type: 'move' });
    if (e.def.carries > 0) {
      btn(carry > 0 ? '내려놓기 (SPACE)' : '브릭 집기 (SPACE)', { type: carry > 0 ? 'drop' : 'pickup' });
    }
    if (e.def.dig) {
      btn(e.hasDirt ? '메우기 (SPACE)' : '땅 파기 (SPACE)', { type: e.hasDirt ? 'fill' : 'dig' });
    }
    if (e.def.transplant) {
      btn(e.hasTree ? '나무 심기 (SPACE)' : '나무 뽑기 (SPACE)', { type: e.hasTree ? 'plant' : 'uproot' });
    }
    if (e.def.push) btn('밀기 (SPACE)', { type: 'push' });
    if (e.def.attack) btn('공격 (X)', { type: 'attack' });
    btn('분해하기 (T)', null, () => this.game.takeApart(e));
  }

  updatePlans(): void {
    const wrap = $('plans');
    wrap.innerHTML = '<span class="label">플랜:</span>';
    const inv = this.game.level.planInv;
    if (!inv.length) {
      wrap.insertAdjacentHTML('beforeend', '<span class="label">없음</span>');
      return;
    }
    inv.forEach((p, i) => {
      const b = document.createElement('button');
      // 1~9번 슬롯은 숫자키 단축키 표시
      b.textContent = `${i < 9 ? `${i + 1}. ` : ''}${p.unit} ×${p.uses} 조립`;
      const mode = this.game.mode;
      if (mode.type === 'build' && mode.planIdx === i) b.classList.add('active');
      b.onclick = () => {
        const cur = this.game.mode;
        this.game.setMode(
          cur.type === 'build' && cur.planIdx === i ? { type: 'move' } : { type: 'build', planIdx: i },
          'click_plan',
        );
        this.updatePlans();
      };
      b.onmouseenter = () => playSfxEvent('rollover');
      wrap.appendChild(b);
    });
    // 조립 모드일 때 선택된 플랜의 필요 재료 표시
    const mode = this.game.mode;
    if (mode.type === 'build') {
      const plan = inv[mode.planIdx];
      const def = plan ? unitDefOf(plan.unit) : undefined;
      if (def) {
        const recipe = document.createElement('div');
        recipe.id = 'plan-recipe';
        recipe.innerHTML = '<span class="label">필요 재료:</span>' +
          Object.entries(def.recipe)
            .filter(([, n]) => (n ?? 0) > 0)
            .map(([c, n]) =>
              `<span class="chip"><i style="background:${BRICK_COLOR[c] ?? '#999'}"></i>${BRICK_KO[c] ?? c}×${n}</span>`)
            .join('');
        wrap.appendChild(recipe);
      }
    }
  }

  togglePause(): void {
    this.game.paused = !this.game.paused;
    playSfxEvent('click_button');
    this.updatePauseUi();
  }

  private updatePauseUi(): void {
    $('btn-pause').textContent = this.game.paused ? '계속 (P)' : '일시정지 (P)';
    let overlay = document.getElementById('pause-overlay');
    if (!overlay) {
      overlay = document.createElement('div');
      overlay.id = 'pause-overlay';
      overlay.innerHTML = '<div>⏸ 일시정지</div>';
      $('hud').appendChild(overlay);
    }
    overlay.classList.toggle('hidden', !this.game.paused);
  }

  /** 호버 타일 툴팁: 골 → 도달 유닛, 자원 더미 → 구성 */
  updateTileTooltip(cell: { x: number; y: number } | null, mouseX: number, mouseY: number): void {
    let el = document.getElementById('tile-tooltip');
    if (!el) {
      el = document.createElement('div');
      el.id = 'tile-tooltip';
      $('hud').appendChild(el);
    }
    const lines: string[] = [];
    if (cell) {
      const lv = this.game.level;
      for (const g of lv.goals) {
        if (g.x !== cell.x || g.y !== cell.y || g.done) continue;
        const label = g.bonus ? '⭐ 보너스 골' : '❗ 미션 골';
        const who = g.collect
          ? `${unitDefOf(g.collect.type)?.name ?? g.collect.type} ${g.collect.count}마리를 노란 존 안으로 유인`
          : g.target === 'anything'
            ? '아무 유닛이나 도달'
            : `${unitDefOf(g.target)?.name ?? g.target} 도달 필요`;
        lines.push(`<b>${label}</b> — ${who}`);
      }
      const pile = lv.piles.get(lv.key(cell.x, cell.y));
      if (pile) {
        const parts = Object.entries(pile.bricks)
          .filter(([, n]) => (n ?? 0) > 0)
          .map(([c, n]) => c === 'energy' && pile.energyCharge < 100
            ? `${BRICK_KO[c]}×${n} (충전 ${Math.round(pile.energyCharge)}%)`
            : `${BRICK_KO[c] ?? c}×${n}`);
        if (parts.length) lines.push(`<b>🧱 브릭 더미</b> — ${parts.join(', ')}`);
      }
    }
    if (!lines.length) { el.style.display = 'none'; return; }
    el.innerHTML = lines.join('<br>');
    el.style.display = 'block';
    // 화면 오른쪽/아래 경계에서 넘치지 않게 배치
    const pad = 14;
    const w = el.offsetWidth, h = el.offsetHeight;
    let x = mouseX + pad, y = mouseY + pad;
    if (x + w > window.innerWidth - 4) x = mouseX - w - pad;
    if (y + h > window.innerHeight - 4) y = mouseY - h - pad;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
  }

  toast(msg: string): void {
    let el = document.getElementById('toast');
    if (!el) {
      el = document.createElement('div');
      el.id = 'toast';
      $('hud').appendChild(el);
    }
    el.textContent = msg;
    el.style.opacity = '1';
    clearTimeout(this.toastTimer);
    this.toastTimer = window.setTimeout(() => { el!.style.opacity = '0'; }, 2200);
  }

  banner(title: string, body: string, buttons: [string, () => void][]): void {
    const el = $('banner');
    el.classList.remove('hidden');
    el.innerHTML = `<div class="title">${title}</div><div>${body}</div>`;
    const btns = document.createElement('div');
    btns.className = 'buttons';
    for (const [label, fn] of buttons) {
      const b = document.createElement('button');
      b.textContent = label;
      b.onclick = () => { el.classList.add('hidden'); fn(); };
      btns.appendChild(b);
    }
    el.appendChild(btns);
  }

  hideBanner(): void { $('banner').classList.add('hidden'); }
}
