import type { Game, ActionMode } from '../engine/game';
import { brickTotal } from '../engine/level';

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
      actions.appendChild(b);
    };
    btn('이동 (기본)', { type: 'move' });
    if (e.def.carries > 0) btn('브릭 집기', { type: 'pickup' });
    if (carry > 0) btn('내려놓기', { type: 'drop' });
    if (e.def.dig) { btn('땅 파기 (DIG)', { type: 'dig' }); btn('메우기 (FILL)', { type: 'fill' }); }
    if (e.def.transplant) { btn('나무 뽑기', { type: 'uproot' }); btn('나무 심기', { type: 'plant' }); }
    if (e.def.attack) btn('공격', { type: 'attack' });
    btn('분해하기', null, () => this.game.takeApart(e));
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
      b.textContent = `${p.unit} ×${p.uses} 조립`;
      const mode = this.game.mode;
      if (mode.type === 'build' && mode.planIdx === i) b.classList.add('active');
      b.onclick = () => {
        const cur = this.game.mode;
        this.game.setMode(cur.type === 'build' && cur.planIdx === i ? { type: 'move' } : { type: 'build', planIdx: i });
        this.updatePlans();
      };
      wrap.appendChild(b);
    });
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
