import type { Game, ActionMode } from '../engine/game';
import { playSfxEvent } from '../engine/audio';
import { brickTotal, unitDefOf } from '../engine/level';

const BRICK_KO: Record<string, string> = {
  red: '빨강', yellow: '노랑', blue: '파랑', green: '초록', wheel: '바퀴', energy: '에너지',
};
const BRICK_COLOR: Record<string, string> = {
  red: '#e53935', yellow: '#fdd835', blue: '#1e88e5', green: '#43a047', wheel: '#9e9e9e', energy: '#aeea00',
};

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

export interface HudCallbacks {
  onExit(): void;
  onEndMission(): void;
}

export class Hud {
  private game: Game;
  private cb: HudCallbacks;
  private toastTimer = 0;

  constructor(game: Game, cb: HudCallbacks) {
    this.game = game;
    this.cb = cb;
    $('btn-menu').onclick = () => this.cb.onExit();
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
    const goal = g.level.goals.find(x => !x.bonus);
    const bonus = g.level.goals.find(x => x.bonus);
    const parts: string[] = [];
    if (goal) parts.push(`❗ 미션 골(${goal.target}): ${g.goalDone ? '✅' : '…'}`);
    if (bonus) parts.push(`⭐ 보너스(${bonus.target}): ${g.bonusDone ? '✅' : '…'}`);
    $('goal-status').textContent = parts.join('   ');
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
    info.innerHTML = `
      <div class="name">${e.def.name || e.type}</div>
      <div>에너지</div>
      <div class="energy-bar"><div class="${e.energy < 25 ? 'low' : ''}" style="width:${Math.max(0, e.energy)}%"></div></div>
      ${e.hp < 100 ? `<div>내구도 ${Math.ceil(e.hp)}%</div>` : ''}
      ${carryTxt ? `<div class="carry">${carryTxt}</div>` : ''}
    `;
    if (e.cls === 'building') return;

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
    btn('이동 (기본)', { type: 'move' });
    if (e.def.carries > 0 && carry === 0) btn('브릭 집기 (Q)', { type: 'pickup' });
    if (carry > 0) btn('내려놓기 (Q)', { type: 'drop' });
    if (e.def.dig) { btn('땅 파기 (DIG)', { type: 'dig' }); btn('메우기 (FILL)', { type: 'fill' }); }
    if (e.def.transplant) { btn('나무 뽑기', { type: 'uproot' }); btn('나무 심기', { type: 'plant' }); }
    if (e.def.attack) btn('공격', { type: 'attack' });
    btn('분해하기 (E)', null, () => this.game.takeApart(e));
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
        const who = g.target === 'anything'
          ? '아무 유닛이나 도달'
          : `${unitDefOf(g.target)?.name ?? g.target} 도달 필요`;
        lines.push(`<b>${label}</b> — ${who}`);
      }
      const pile = lv.piles.get(lv.key(cell.x, cell.y));
      if (pile) {
        const parts = Object.entries(pile.bricks)
          .filter(([, n]) => (n ?? 0) > 0)
          .map(([c, n]) => `${BRICK_KO[c] ?? c}×${n}`);
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
