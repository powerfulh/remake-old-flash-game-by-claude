import { LEVELS } from './data/generated/levels';
import { SPRITE_MANIFEST } from './data/generated/sprites';
import type { LevelDef } from './data/types';
import { loadSprites } from './engine/assets';
import { playMenuBgm, playSfxEvent, playStageBgm, preloadAudio, stopBgm } from './engine/audio';
import { Game } from './engine/game';
import { Camera, pickCell, render } from './engine/render';
import { Hud } from './ui/hud';

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
    b.textContent = `월드 ${w}`;
    b.disabled = w !== 1; // 1단계: 월드 1만 활성 (나머지는 5단계에서)
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
  hud = new Hud(g, { onExit: endMission, onEndMission: endMission });

  // 카메라 초기 위치
  const c = def.center ?? [Math.floor(def.width / 2), Math.floor(def.height / 2)];
  cam.centerOn(c[0], c[1], canvas.width, canvas.height);

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
    const rect = canvas.getBoundingClientRect();
    const [cx, cy] = pickCell(e.clientX - rect.left, e.clientY - rect.top, cam);
    g.clickCell(cx, cy);
  };
  canvas.oncontextmenu = e => e.preventDefault();

  const keys = new Set<string>();
  window.onkeydown = e => keys.add(e.key);
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
