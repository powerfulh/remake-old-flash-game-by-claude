import { SPRITE_MANIFEST } from '../data/generated/sprites';
import type { SpriteInfo } from '../data/types';

const images = new Map<string, CanvasImageSource>();

/**
 * Director "Matte" 잉크 재현: 이미지 가장자리에서 연결된 배경색 영역만 투명 처리.
 * 배경색은 네 모서리 픽셀에서 자동 감지한다 — 대부분 흰색이지만
 * 골 마커(goal.bonus, goal.goal 등)처럼 검정 배경인 스프라이트도 있다.
 * (배경과 연결되지 않은 내부 픽셀 — 별의 흰 면 등 — 은 유지)
 */
function applyMatte(img: HTMLImageElement): CanvasImageSource {
  const w = img.naturalWidth, h = img.naturalHeight;
  if (!w || !h) return img;
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const cx = cv.getContext('2d')!;
  cx.drawImage(img, 0, 0);
  const data = cx.getImageData(0, 0, w, h);
  const px = data.data;

  // 네 모서리 중 3개 이상이 같은 색이면 그 색을 배경으로 판정, 아니면 흰색 기본
  const corner = (p: number) => [px[p * 4], px[p * 4 + 1], px[p * 4 + 2]] as const;
  const corners = [corner(0), corner(w - 1), corner((h - 1) * w), corner(h * w - 1)];
  const same = (a: readonly number[], b: readonly number[]) =>
    Math.abs(a[0] - b[0]) + Math.abs(a[1] - b[1]) + Math.abs(a[2] - b[2]) <= 24;
  let bg: readonly number[] = [255, 255, 255];
  for (const c of corners) {
    if (corners.filter(o => same(c, o)).length >= 3) { bg = c; break; }
  }
  const isBg = (i: number) =>
    Math.abs(px[i] - bg[0]) + Math.abs(px[i + 1] - bg[1]) + Math.abs(px[i + 2] - bg[2]) <= 24;

  const visited = new Uint8Array(w * h);
  const stack: number[] = [];
  for (let x = 0; x < w; x++) { stack.push(x, x + (h - 1) * w); }
  for (let y = 0; y < h; y++) { stack.push(y * w, y * w + w - 1); }
  while (stack.length) {
    const p = stack.pop()!;
    if (visited[p]) continue;
    visited[p] = 1;
    if (!isBg(p * 4)) continue;
    px[p * 4 + 3] = 0;
    const x = p % w, y = (p / w) | 0;
    if (x > 0) stack.push(p - 1);
    if (x < w - 1) stack.push(p + 1);
    if (y > 0) stack.push(p - w);
    if (y < h - 1) stack.push(p + w);
  }
  cx.putImageData(data, 0, 0);
  return cv;
}

const pending = new Set<string>();
/** 최종 실패 횟수 (지연 재시도 상한 판단용) */
const failCount = new Map<string, number>();
const MAX_LAZY_RETRIES = 3;

/**
 * 스프라이트 1장 로드 — 실패 시 그 애셋만 최대 attempts 회 재시도 (지수 백오프,
 * 캐시된 오류 응답 회피용 쿼리 부착). 최종 실패는 failCount 에 기록.
 */
function loadOne(name: string, attempts = 3): Promise<void> {
  const info = SPRITE_MANIFEST[name];
  if (!info || images.has(name) || pending.has(name)) return Promise.resolve();
  pending.add(name);
  return new Promise(res => {
    const tryLoad = (left: number) => {
      const img = new Image();
      const bust = left < attempts ? `?r=${attempts - left}` : '';
      img.src = `${import.meta.env.BASE_URL}assets/sprites/${info.file}${bust}`;
      img.onload = () => { images.set(name, applyMatte(img)); pending.delete(name); res(); };
      img.onerror = () => {
        if (left > 1) {
          setTimeout(() => tryLoad(left - 1), 300 * (attempts - left + 1));
        } else {
          pending.delete(name);
          failCount.set(name, (failCount.get(name) ?? 0) + 1);
          res();
        }
      };
    };
    tryLoad(attempts);
  });
}

/** 매니페스트의 스프라이트 이름 목록을 미리 로드 (실패분만 자동 재시도) */
export async function loadSprites(names: Iterable<string>): Promise<void> {
  await Promise.all([...names].map(n => loadOne(n)));
  const failed = [...failCount.keys()];
  if (failed.length) {
    console.warn(`스프라이트 ${failed.length}개 로딩 실패 (게임 중 재시도됨):`, failed.join(', '));
  }
}

export function spriteInfo(name: string): SpriteInfo | undefined {
  return SPRITE_MANIFEST[name];
}

export function hasSprite(name: string): boolean {
  return !!SPRITE_MANIFEST[name];
}

/** 그리려는 스프라이트가 미등록이면 (부트 로딩 실패분) 지연 재시도 */
function lazyRetry(name: string): void {
  const fails = failCount.get(name) ?? 0;
  if (fails > 0 && fails <= MAX_LAZY_RETRIES && !pending.has(name)) {
    void loadOne(name);
  }
}

/** 등록점(regX/regY) 기준으로 앵커 좌표에 스프라이트를 그린다 */
export function drawSprite(ctx: CanvasRenderingContext2D, name: string, ax: number, ay: number): boolean {
  const info = SPRITE_MANIFEST[name];
  const img = images.get(name);
  if (!info || !img) { if (info) lazyRetry(name); return false; }
  ctx.drawImage(img, Math.round(ax - info.regX), Math.round(ay - info.regY));
  return true;
}

/** 등록점 무시하고 (cx, cy) 에 중앙 정렬로 그린다 — 이펙트/오버레이용 */
export function drawSpriteCentered(ctx: CanvasRenderingContext2D, name: string, cx: number, cy: number): boolean {
  const info = SPRITE_MANIFEST[name];
  const img = images.get(name);
  if (!info || !img) { if (info) lazyRetry(name); return false; }
  ctx.drawImage(img, Math.round(cx - info.w / 2), Math.round(cy - info.h / 2));
  return true;
}

/** 가로 중앙 + 하단 기준 정렬 — 등록점이 어긋난 건물 스프라이트용 */
export function drawSpriteBottomCentered(ctx: CanvasRenderingContext2D, name: string, cx: number, bottomY: number): boolean {
  const info = SPRITE_MANIFEST[name];
  const img = images.get(name);
  if (!info || !img) { if (info) lazyRetry(name); return false; }
  ctx.drawImage(img, Math.round(cx - info.w / 2), Math.round(bottomY - info.h));
  return true;
}
