import { BGM, SFX } from '../data/generated/audio';

// 원본 캐스트의 사운드 이름 기반 오디오 매니저.
// BGM: m_intro_*, m_game_* (루프) / SFX: s_*
const cache = new Map<string, HTMLAudioElement>();
let bgmEl: HTMLAudioElement | null = null;
let bgmName = '';
export const audioState = { music: true, sfx: true };

function get(name: string): HTMLAudioElement | null {
  if (!BGM.includes(name) && !SFX.includes(name)) return null;
  let el = cache.get(name);
  if (!el) {
    el = new Audio(`/assets/audio/${name}.mp3`);
    cache.set(name, el);
  }
  return el;
}

export function playBgm(name: string): void {
  if (bgmName === name && bgmEl && !bgmEl.paused) return;
  stopBgm();
  if (!audioState.music) { bgmName = name; return; }
  const el = get(name);
  if (!el) return;
  el.loop = true;
  el.volume = 0.5;
  el.play().catch(() => {/* 사용자 입력 전 자동재생 차단 무시 */});
  bgmEl = el;
  bgmName = name;
}

export function stopBgm(): void {
  if (bgmEl) { bgmEl.pause(); bgmEl.currentTime = 0; }
  bgmEl = null;
  bgmName = '';
}

/** 월드별 게임 BGM 세트에서 랜덤 선택 */
export function playWorldBgm(world: number): void {
  const sets = ['m_game_6', 'm_game_8', 'm_game_a', 'm_game_i', 'm_game_6'];
  const prefix = sets[(world - 1) % sets.length];
  const pool = BGM.filter(b => b.startsWith(prefix));
  const pick = pool[Math.floor(Math.random() * pool.length)] ?? BGM[0];
  if (pick) playBgm(pick);
}

export function playSfx(name: string): void {
  if (!audioState.sfx) return;
  const el = get(name);
  if (!el) return;
  // 중첩 재생을 위해 클론
  const clone = el.cloneNode() as HTMLAudioElement;
  clone.volume = 0.7;
  clone.play().catch(() => {});
}
