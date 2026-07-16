import { LEVELS } from './data/generated/levels';
import { SPRITE_MANIFEST } from './data/generated/sprites';
import type { LevelDef } from './data/types';
import { loadSprites } from './engine/assets';
import { playMenuBgm, playSfxEvent, playStageBgm, preloadAudio, stopBgm } from './engine/audio';
import { Game } from './engine/game';
import { brickTotal } from './engine/level';
import { Camera, pickCell, render } from './engine/render';
import { Hud } from './ui/hud';
import { Tutorial } from './ui/tutorial';

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

// ---------- 진행 저장 ----------
interface Progress {
  /** "w.m" → { goal, bonus } */
  done: Record<string, { goal: boolean; bonus: boolean }>;
  unlockAll: boolean;
}
const PKEY = 'wb-remake-progress';
function loadProgress(): Progress {
  try { return { done: {}, unlockAll: false, ...JSON.parse(localStorage.getItem(PKEY) ?? '{}') }; }
  catch { return { done: {}, unlockAll: false }; }
}
function saveProgress(p: Progress): void {
  localStorage.setItem(PKEY, JSON.stringify(p));
}
let progress = loadProgress();

function isUnlocked(world: number, mission: number): boolean {
  if (progress.unlockAll || mission === 1) return true;
  // 해당 미션 번호를 unlocks 에 포함한 선행 미션 중 하나라도 완료됐으면 해금
  return LEVELS.some(l => l.world === world && l.unlocks.includes(mission)
    && progress.done[`${world}.${l.mission}`]?.goal);
}

/** 월드 해금: 이전 월드 미션 12 클리어 (unlocks 의 13 = 다음 월드) */
function isWorldUnlocked(world: number): boolean {
  if (world === 1 || progress.unlockAll) return true;
  return !!progress.done[`${world - 1}.12`]?.goal;
}

/** 현재 구현 완료된 월드 (이후 월드는 다음 단계에서 개방) */
const IMPLEMENTED_WORLDS = 5;

// ---------- 메뉴 ----------
let currentWorld = 1;

function showMenu(): void {
  stopBgm();
  playMenuBgm();
  $('game').classList.add('hidden');
  const menu = $('menu');
  menu.classList.remove('hidden');
  menu.innerHTML = '<h1>LEGO WorldBuilder Remake</h1>';

  const tabs = document.createElement('div');
  tabs.className = 'world-tabs';
  for (let w = 1; w <= 5; w++) {
    const b = document.createElement('button');
    b.textContent = `월드 ${w}${w <= IMPLEMENTED_WORLDS && !isWorldUnlocked(w) ? ' 🔒' : ''}`;
    b.disabled = w > IMPLEMENTED_WORLDS || !isWorldUnlocked(w);
    if (w === currentWorld) b.style.background = '#ff8f00';
    b.onclick = () => { currentWorld = w; showMenu(); };
    tabs.appendChild(b);
  }
  menu.appendChild(tabs);

  const grid = document.createElement('div');
  grid.className = 'missions';
  for (const lv of LEVELS.filter(l => l.world === currentWorld)) {
    const b = document.createElement('button');
    const st = progress.done[`${lv.world}.${lv.mission}`];
    b.innerHTML = `<span class="num">${lv.mission}${st?.goal ? ' ✅' : ''}${st?.bonus ? '⭐' : ''}</span>${lv.name}`;
    b.disabled = !isUnlocked(lv.world, lv.mission);
    b.onclick = () => { playSfxEvent('click_mission'); startMission(lv); };
    grid.appendChild(b);
  }
  menu.appendChild(grid);

  const opt = document.createElement('label');
  opt.innerHTML = `<input type="checkbox" ${progress.unlockAll ? 'checked' : ''}/> 전체 미션 해금 (검토용)`;
  opt.querySelector('input')!.onchange = ev => {
    progress.unlockAll = (ev.target as HTMLInputElement).checked;
    saveProgress(progress);
    showMenu();
  };
  menu.appendChild(opt);
}

// ---------- 게임 루프 ----------
let hud: Hud | null = null;
let tutorial: Tutorial | null = null;
const cam = new Camera();
let rafId = 0;

function startMission(def: LevelDef): void {
  $('menu').classList.add('hidden');
  $('game').classList.remove('hidden');
  playStageBgm();

  const canvas = $('canvas') as unknown as HTMLCanvasElement;
  const ctx = canvas.getContext('2d')!;
  const resize = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
  };
  window.onresize = resize;
  resize();

  const g = new Game(def, {
    toast: msg => hud?.toast(msg),
    selectionChanged: () => { hud?.updateSelection(); hud?.updatePlans(); },
    goalsChanged: () => hud?.updateGoals(),
    plansChanged: () => hud?.updatePlans(),
    missionGoal: () => {
      markDone(def, 'goal');
      const hasBonus = g.level.goals.some(x => x.bonus && !x.done);
      hud?.banner('🎉 미션 목표 달성!', def.name,
        hasBonus
          ? [['보너스 골 도전', () => {}], ['미션 종료', endMission]]
          : [['미션 종료', endMission]]);
    },
    bonusGoal: () => {
      markDone(def, 'bonus');
      if (g.goalDone) {
        hud?.banner('⭐ 보너스 골까지 완벽 클리어!', def.name, [['미션 종료', endMission]]);
      } else {
        hud?.toast('⭐ 보너스 골 달성! 미션 골이 남았습니다');
      }
    },
    unitLost: name => hud?.toast(`💥 ${name} 이(가) 파괴되었습니다!`),
  });
  const restart = () => {
    cancelAnimationFrame(rafId);
    tutorial?.destroy();
    tutorial = null;
    startMission(def);
  };
  hud = new Hud(g, { onExit: endMission, onEndMission: endMission, onRetry: restart });

  // 카메라 초기 위치
  const c = def.center ?? [Math.floor(def.width / 2), Math.floor(def.height / 2)];
  cam.centerOn(c[0], c[1], canvas.width, canvas.height);

  // 월드 1 미션 1: 원작 튜토리얼 시퀀스
  tutorial?.destroy();
  tutorial = def.world === 1 && def.mission === 1 ? new Tutorial(g, cam, canvas) : null;

  // ----- 입력 -----
  let dragging = false, lastX = 0, lastY = 0, movedPx = 0;
  canvas.onmousedown = e => { dragging = true; movedPx = 0; lastX = e.clientX; lastY = e.clientY; };
  canvas.onmousemove = e => {
    const rect = canvas.getBoundingClientRect();
    const [hx, hy] = pickCell(e.clientX - rect.left, e.clientY - rect.top, cam);
    g.hover = { x: hx, y: hy };
    hud?.updateTileTooltip(g.hover, e.clientX, e.clientY);
    if (!dragging) return;
    cam.x -= e.clientX - lastX;
    cam.y -= e.clientY - lastY;
    movedPx += Math.abs(e.clientX - lastX) + Math.abs(e.clientY - lastY);
    lastX = e.clientX; lastY = e.clientY;
  };
  canvas.onmouseleave = () => {
    g.hover = null;
    hud?.updateTileTooltip(null, 0, 0);
  };
  canvas.onmouseup = e => {
    dragging = false;
    if (movedPx > 6) return; // 드래그였음
    if (g.paused) return;    // 일시정지 중에는 게임 명령 차단 (카메라 이동은 허용)
    const rect = canvas.getBoundingClientRect();
    const [cx, cy] = pickCell(e.clientX - rect.left, e.clientY - rect.top, cam);
    g.clickCell(cx, cy);
  };
  canvas.oncontextmenu = e => e.preventDefault();

  const keys = new Set<string>();
  window.onkeydown = e => {
    keys.add(e.key);
    // 능력 단축키 (원작과 같은 토글식)
    //   SPACE: 유닛의 주 능력 (집기/내려놓기 · 파기/메우기 · 나무 뽑기/심기 · 밀기 — 유닛당 1종)
    //   X: 공격, T: 분해하기, R: 미션 재시도
    if (!e.repeat) {
      const sel = g.selected;
      const key = e.key.toLowerCase();
      const toggle = (action: 'pickup' | 'drop' | 'dig' | 'fill' | 'uproot' | 'plant' | 'push' | 'attack') =>
        g.setMode(g.mode.type === action ? { type: 'move' } : { type: action });
      if (key === 'p') { hud?.togglePause(); return; }
      if (key === 'r') { restart(); return; }
      if (g.paused) return; // 일시정지 중에는 능력/플랜 단축키 차단
      if (sel && sel.cls === 'unit') {
        if (key === ' ') {
          e.preventDefault();
          if (sel.def.carries > 0) toggle(brickTotal(sel.carrying) > 0 ? 'drop' : 'pickup');
          else if (sel.def.dig) toggle(sel.hasDirt ? 'fill' : 'dig');
          else if (sel.def.transplant) toggle(sel.hasTree ? 'plant' : 'uproot');
          else if (sel.def.push) toggle('push');
        } else if (key === 'x' && sel.def.attack) toggle('attack');
        else if (key === 't') g.takeApart(sel);
      }
      // 버튼 포커스가 남아 스페이스가 버튼을 재클릭하지 않도록
      if (key === ' ') (document.activeElement as HTMLElement | null)?.blur?.();
    }
    // 단축키 1~9: 플랜 슬롯 조립 모드 토글 (10번째 이후 플랜은 클릭 전용)
    if (e.key >= '1' && e.key <= '9' && !e.repeat) {
      const idx = Number(e.key) - 1;
      if (g.level.planInv[idx]) {
        const cur = g.mode;
        g.setMode(
          cur.type === 'build' && cur.planIdx === idx ? { type: 'move' } : { type: 'build', planIdx: idx },
          'click_plan',
        );
      }
    }
  };
  window.onkeyup = e => keys.delete(e.key);

  // ----- 루프 -----
  let last = performance.now();
  cancelAnimationFrame(rafId);
  const loop = (now: number) => {
    const dt = Math.min(0.1, (now - last) / 1000);
    last = now;
    const sp = 420 * dt;
    if (keys.has('ArrowLeft') || keys.has('a')) cam.x -= sp;
    if (keys.has('ArrowRight') || keys.has('d')) cam.x += sp;
    if (keys.has('ArrowUp') || keys.has('w')) cam.y -= sp;
    if (keys.has('ArrowDown') || keys.has('s')) cam.y += sp;
    g.tick(dt);
    tutorial?.update();
    render(ctx, g, cam, g.time);
    rafId = requestAnimationFrame(loop);
  };
  rafId = requestAnimationFrame(loop);
}

function markDone(def: LevelDef, kind: 'goal' | 'bonus'): void {
  const k = `${def.world}.${def.mission}`;
  const cur = progress.done[k] ?? { goal: false, bonus: false };
  cur[kind] = true;
  progress.done[k] = cur;
  saveProgress(progress);
}

function endMission(): void {
  cancelAnimationFrame(rafId);
  tutorial?.destroy();
  tutorial = null;
  hud = null;
  showMenu();
}

// ---------- 부트 ----------
async function boot(): Promise<void> {
  const menu = $('menu');
  menu.innerHTML = '<h1>LEGO WorldBuilder Remake</h1><p>애셋 로딩 중…</p>';
  await loadSprites(Object.keys(SPRITE_MANIFEST));
  preloadAudio();
  showMenu();
}
boot();
