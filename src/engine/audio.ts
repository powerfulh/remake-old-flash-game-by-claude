import { BGM, SFX } from './../data/generated/audio';

// Web Audio 기반 오디오 매니저.
//
// BGM은 원본 방식 재현: 한 곡이 여러 패턴 조각(m_game_{곡}_{패턴})으로 쪼개져 있고,
// 스테이지마다 한 세트를 묶어 패턴을 이어붙여 완성곡처럼 재생한다.
// 원본 music_game_* 캐스트 멤버 정의는 "random 2" + 패턴 목록
// (= 패턴을 랜덤 순서로 각 2회 반복). 현재는 요청에 따라 순차 순서 사용.
// 조각 사이 갭 없이 AudioContext 클록으로 샘플 정확하게 예약 재생한다.
export const audioState = { music: true, sfx: true };

/** 한 패턴 반복 횟수 — 원본 정의 "random 2" 의 2 */
const BGM_REPEATS = 2;
/** 패턴 진행 순서: 'sequential'(요청 사양) | 'random'(원본 사양) */
const BGM_ORDER: 'sequential' | 'random' = 'sequential';
/** 스케줄 선행 예약 구간(초) */
const LOOKAHEAD = 1.2;

let ctx: AudioContext | null = null;
let bgmGain: GainNode | null = null;
let sfxGain: GainNode | null = null;

const buffers = new Map<string, Promise<AudioBuffer | null>>();

interface Segment { buf: AudioBuffer; offset: number; dur: number; }

let bgmGen = 0; // 재생 세대 — 늦게 끝난 디코딩이 이후 명령을 덮어쓰지 않게 함
let bgmTimer: number | null = null;
const bgmSources = new Set<AudioBufferSourceNode>();
let currentSetKey = '';

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

/** mp3 인코더 패딩(앞뒤 무음)을 잘라낸 실제 소리 구간 */
function trimBounds(buf: AudioBuffer): [number, number] {
  const ch = buf.getChannelData(0);
  const thr = 0.003;
  let s = 0, e = ch.length - 1;
  while (s < e && Math.abs(ch[s]) < thr) s++;
  while (e > s && Math.abs(ch[e]) < thr) e--;
  if (e - s < buf.sampleRate * 0.25) return [0, buf.duration];
  return [s / buf.sampleRate, (e + 1) / buf.sampleRate];
}

/** {곡} 프리픽스로 패턴 세트 구성 (패턴 번호 순 정렬) */
function bgmSet(prefix: string): string[] {
  return BGM
    .filter(n => n.startsWith(prefix + '_'))
    .sort((a, b) => Number(a.slice(prefix.length + 1)) - Number(b.slice(prefix.length + 1)));
}

/**
 * 패턴 세트 갭리스 재생:
 * 순차(또는 랜덤) 순서로 한 패턴을 BGM_REPEATS 회 반복 후 다음 패턴, 세트 전체를 무한 루프.
 */
function playBgmSetInternal(names: string[]): void {
  const gen = ++bgmGen;
  stopBgmPlayback();
  if (!audioState.music || names.length === 0) return;

  Promise.all(names.map(loadBuffer)).then(bufs => {
    if (gen !== bgmGen) return;
    const segs: Segment[] = [];
    for (const buf of bufs) {
      if (!buf) continue;
      const [start, end] = trimBounds(buf);
      segs.push({ buf, offset: start, dur: end - start });
    }
    if (!segs.length) return;

    const ac = ensureCtx();
    ac.resume().catch(() => {});

    // 재생 진행 상태: 패턴 인덱스 + 반복 카운트
    let patIdx = BGM_ORDER === 'random' ? Math.floor(Math.random() * segs.length) : 0;
    let repeat = 0;
    const nextSegment = (): Segment => {
      const seg = segs[patIdx];
      repeat++;
      if (repeat >= BGM_REPEATS) {
        repeat = 0;
        if (BGM_ORDER === 'random') {
          // 같은 패턴 즉시 재선택 방지 (2개 이상일 때)
          let n = patIdx;
          while (segs.length > 1 && n === patIdx) n = Math.floor(Math.random() * segs.length);
          patIdx = n;
        } else {
          patIdx = (patIdx + 1) % segs.length;
        }
      }
      return seg;
    };

    let nextTime = ac.currentTime + 0.08;
    const schedule = () => {
      if (gen !== bgmGen) return;
      while (nextTime < ac.currentTime + LOOKAHEAD) {
        const seg = nextSegment();
        const src = ac.createBufferSource();
        src.buffer = seg.buf;
        src.connect(bgmGain!);
        src.onended = () => bgmSources.delete(src);
        src.start(nextTime, seg.offset, seg.dur);
        bgmSources.add(src);
        nextTime += seg.dur;
      }
    };
    schedule();
    bgmTimer = window.setInterval(schedule, 250);
  });
}

function stopBgmPlayback(): void {
  if (bgmTimer != null) { clearInterval(bgmTimer); bgmTimer = null; }
  for (const src of bgmSources) {
    try { src.stop(); } catch { /* 이미 정지됨 */ }
    src.disconnect();
  }
  bgmSources.clear();
}

export function stopBgm(): void {
  bgmGen++;
  currentSetKey = '';
  stopBgmPlayback();
}

/** 메뉴 BGM: 원본 music_intro 세트 (m_intro_1, m_intro_2) */
export function playMenuBgm(): void {
  if (currentSetKey === 'm_intro') return;
  currentSetKey = 'm_intro';
  playBgmSetInternal(bgmSet('m_intro'));
}

/** 스테이지 BGM: 월드별 곡 세트 하나를 묶어서 재생 */
export function playWorldBgm(world: number): void {
  const songs = ['m_game_6', 'm_game_8', 'm_game_a', 'm_game_i', 'm_game_6'];
  const prefix = songs[(world - 1) % songs.length];
  if (currentSetKey === prefix) return; // 같은 세트면 이어 재생
  currentSetKey = prefix;
  playBgmSetInternal(bgmSet(prefix));
}

export function playSfx(name: string): void {
  if (!audioState.sfx || !SFX.includes(name)) return;
  loadBuffer(name).then(buf => {
    if (!buf || !audioState.sfx) return;
    const ac = ensureCtx();
    if (ac.state !== 'running') return; // 제스처 전이면 스킵
    const src = ac.createBufferSource();
    src.buffer = buf;
    src.connect(sfxGain!);
    src.start();
  });
}

/** 효과음 프리로드 */
export function preloadAudio(): void {
  for (const s of SFX) loadBuffer(s);
}
