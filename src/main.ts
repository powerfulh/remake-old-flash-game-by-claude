import { LEVELS } from './data/generated/levels';
import { LEVELS2 } from './data/generated/levels2';
import { SPRITE_MANIFEST } from './data/generated/sprites';
import type { LevelDef } from './data/types';
import { loadSprites } from './engine/assets';
import { playMenuBgm, playSfxEvent, playStageBgm, preloadAudio } from './engine/audio';
import { Game } from './engine/game';
import { brickTotal } from './engine/level';
import { Camera, pickCell, render } from './engine/render';
import { Hud } from './ui/hud';
import { createVolumeControls, loadVolumes } from './ui/volumeControl';
import { Tutorial } from './ui/tutorial';

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T;

// ---------- 진행 저장 ----------
interface Progress {
  /** "w.m" → { goal, bonus } — 클리어 기록 표시 전용 (해금 게이트 없음) */
  done: Record<string, { goal: boolean; bonus: boolean }>;
}
const PKEY = 'wb-remake-progress';
function loadProgress(): Progress {
  try { return { done: {}, ...JSON.parse(localStorage.getItem(PKEY) ?? '{}') }; }
  catch { return { done: {} }; }
}
function saveProgress(p: Progress): void {
  localStorage.setItem(PKEY, JSON.stringify(p));
}
let progress = loadProgress();

/** 게임별 데이터: 1 = WorldBuilder(월드 5개), 2 = WorldBuilder 2(월드 2개) */
const GAMES = {
  1: { title: 'LEGO WorldBuilder Remake', levels: LEVELS, worlds: 5 },
  2: { title: 'LEGO WorldBuilder 2 Remake', levels: LEVELS2, worlds: 2 },
} as const;
type GameId = keyof typeof GAMES;

/** 진행 저장 키 — WB1 은 기존 키 유지, WB2 는 "2:" 접두사 */
function pKey(game: GameId, world: number, mission: number): string {
  return game === 2 ? `2:${world}.${mission}` : `${world}.${mission}`;
}

// ---------- 메뉴 ----------
let currentGame: GameId = 1;
let currentWorld = 1;

function showMenu(): void {
  // 메뉴 재렌더(게임/월드 탭 전환)에도 인트로 BGM 이 끊기지 않도록 stop 없이 호출 —
  // playMenuBgm 내부 가드가 같은 세트면 이어 재생, 미션에서 돌아온 경우에만 곡 전환
  playMenuBgm();
  $('game').classList.add('hidden');
  const menu = $('menu');
  menu.classList.remove('hidden');
  menu.innerHTML = `<h1>${GAMES[currentGame].title}</h1>`;

  // 게임 선택 (WB1 / WB2)
  const gameTabs = document.createElement('div');
  gameTabs.className = 'world-tabs game-tabs';
  for (const gid of [1, 2] as GameId[]) {
    const b = document.createElement('button');
    b.textContent = gid === 1 ? 'WorldBuilder' : 'WorldBuilder 2';
    if (gid === currentGame) b.style.background = '#ff8f00';
    b.onclick = () => { currentGame = gid; currentWorld = 1; showMenu(); };
    gameTabs.appendChild(b);
  }
  menu.appendChild(gameTabs);

  const tabs = document.createElement('div');
  tabs.className = 'world-tabs';
  for (let w = 1; w <= GAMES[currentGame].worlds; w++) {
    const b = document.createElement('button');
    b.textContent = `월드 ${w}`;
    if (w === currentWorld) b.style.background = '#ff8f00';
    b.onclick = () => { currentWorld = w; showMenu(); };
    tabs.appendChild(b);
  }
  menu.appendChild(tabs);

  const grid = document.createElement('div');
  grid.className = 'missions';
  for (const lv of GAMES[currentGame].levels.filter(l => l.world === currentWorld)) {
    const b = document.createElement('button');
    const st = progress.done[pKey(currentGame, lv.world, lv.mission)];
    b.innerHTML = `<span class="num">${lv.mission}${st?.goal ? ' ✅' : ''}${st?.bonus ? '⭐' : ''}</span>${lv.name}`;
    b.onclick = () => { playSfxEvent('click_mission'); startMission(lv); };
    grid.appendChild(b);
  }
  menu.appendChild(grid);

  menu.appendChild(createVolumeControls());

  // 클리어 기록(✅/⭐) 초기화
  const reset = document.createElement('button');
  reset.id = 'btn-reset-progress';
  reset.textContent = '진행 기록 초기화';
  reset.onclick = () => {
    if (!confirm('모든 클리어 기록(✅/⭐)을 초기화할까요?')) return;
    progress = { done: {} };
    saveProgress(progress);
    showMenu();
  };
  menu.appendChild(reset);
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
  tutorial = def.game !== 2 && def.world === 1 && def.mission === 1 ? new Tutorial(g, cam, canvas) : null;

  // 월드 5 미션 3: 늪지 경로 회피 규칙 안내
  if (def.game !== 2 && def.world === 5 && def.mission === 3) {
    hud.banner('🐊 늪지 이동 안내',
      '모든 유닛은 이동할 때 늪지를 지나지 않고 목표 지점으로 가는 경로가 존재하면 그 경로를 우선합니다.',
      [['확인', () => {}]]);
  }

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
  const k = pKey((def.game ?? 1) as GameId, def.world, def.mission);
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
  loadVolumes();
  await loadSprites(Object.keys(SPRITE_MANIFEST));
  preloadAudio();
  showMenu();
}
boot();
