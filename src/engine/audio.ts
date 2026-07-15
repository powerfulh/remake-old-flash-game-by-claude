import { BGM, SFX } from './../data/generated/audio';

// Web Audio 기반 오디오 매니저.
// - BGM: AudioBuffer + loop 로 갭 없는 반복 재생 (HTMLAudio 루프의 공백 문제 해결)
//   mp3 인코더가 넣는 앞뒤 무음 패딩은 loopStart/loopEnd 로 잘라낸다.
// - SFX: 디코딩된 버퍼 재생 (중첩/저지연)
export const audioState = { music: true, sfx: true };

let ctx: AudioContext | null = null;
let bgmGain: GainNode | null = null;
let sfxGain: GainNode | null = null;

const buffers = new Map<string, Promise<AudioBuffer | null>>();
let bgmSrc: AudioBufferSourceNode | null = null;
let bgmName = '';
/** playBgm 호출 세대 — 비동기 디코딩 완료가 이후 명령을 덮어쓰지 않게 함 */
let bgmGen = 0;

function ensureCtx(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
    bgmGain = ctx.createGain();
    bgmGain.gain.value = 0.5;
    bgmGain.connect(ctx.destination);
    sfxGain = ctx.createGain();
    sfxGain.gain.value = 0.7;
    sfxGain.connect(ctx.destination);
    // 사용자 제스처 전 autoplay 차단 해제
    const resume = () => { ctx?.resume().catch(() => {}); };
    window.addEventListener('pointerdown', resume, { passive: true });
    window.addEventListener('keydown', resume);
  }
  return ctx;
}

function loadBuffer(name: string): Promise<AudioBuffer | null> {
  let p = buffers.get(name);
  if (!p) {
    p = fetch(`/assets/audio/${name}.mp3`)
      .then(r => r.arrayBuffer())
      .then(ab => ensureCtx().decodeAudioData(ab))
      .catch(() => null);
    buffers.set(name, p);
  }
  return p;
}

/** 버퍼 앞뒤의 무음(mp3 패딩) 경계를 찾아 루프 구간으로 사용 */
function loopBounds(buf: AudioBuffer): [number, number] {
  const ch = buf.getChannelData(0);
  const thr = 0.003;
  let s = 0, e = ch.length - 1;
  while (s < e && Math.abs(ch[s]) < thr) s++;
  while (e > s && Math.abs(ch[e]) < thr) e--;
  // 경계가 이상하면(전체 무음 등) 전체 구간 사용
  if (e - s < buf.sampleRate * 0.25) return [0, buf.duration];
  return [s / buf.sampleRate, (e + 1) / buf.sampleRate];
}

export function playBgm(name: string): void {
  const gen = ++bgmGen;
  bgmName = name;
  stopBgmSource();
  if (!audioState.music) return;
  if (!BGM.includes(name)) return;
  loadBuffer(name).then(buf => {
    if (gen !== bgmGen || !buf) return; // 그 사이 다른 곡/정지 명령이 들어옴
    const ac = ensureCtx();
    const src = ac.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    [src.loopStart, src.loopEnd] = loopBounds(buf);
    src.connect(bgmGain!);
    src.start(0, src.loopStart);
    bgmSrc = src;
    ac.resume().catch(() => {});
  });
}

function stopBgmSource(): void {
  if (bgmSrc) {
    try { bgmSrc.stop(); } catch { /* 이미 정지됨 */ }
    bgmSrc.disconnect();
    bgmSrc = null;
  }
}

export function stopBgm(): void {
  bgmGen++;
  bgmName = '';
  stopBgmSource();
}

/** 월드별 게임 BGM 세트에서 랜덤 선택 */
export function playWorldBgm(world: number): void {
  const sets = ['m_game_6', 'm_game_8', 'm_game_a', 'm_game_i', 'm_game_6'];
  const prefix = sets[(world - 1) % sets.length];
  const pool = BGM.filter(b => b.startsWith(prefix));
  const pick = pool[Math.floor(Math.random() * pool.length)] ?? BGM[0];
  if (pick && pick !== bgmName) playBgm(pick);
}

export function playSfx(name: string): void {
  if (!audioState.sfx || !SFX.includes(name)) return;
  loadBuffer(name).then(buf => {
    if (!buf || !audioState.sfx) return;
    const ac = ensureCtx();
    if (ac.state !== 'running') return; // 제스처 전이면 그냥 스킵
    const src = ac.createBufferSource();
    src.buffer = buf;
    src.connect(sfxGain!);
    src.start();
  });
}

/** 자주 쓰는 효과음 프리로드 (선택적) */
export function preloadAudio(): void {
  for (const s of SFX) loadBuffer(s);
}
