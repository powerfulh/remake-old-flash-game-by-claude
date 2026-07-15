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

/** 매니페스트의 스프라이트 이름 목록을 미리 로드 */
export async function loadSprites(names: Iterable<string>): Promise<void> {
  const jobs: Promise<void>[] = [];
  for (const name of names) {
    if (images.has(name)) continue;
    const info = SPRITE_MANIFEST[name];
    if (!info) continue;
    const img = new Image();
    img.src = `${import.meta.env.BASE_URL}assets/sprites/${info.file}`;
    jobs.push(new Promise(res => {
      img.onload = () => { images.set(name, applyMatte(img)); res(); };
      img.onerror = () => res();
    }));
  }
  await Promise.all(jobs);
}

export function spriteInfo(name: string): SpriteInfo | undefined {
  return SPRITE_MANIFEST[name];
}

export function hasSprite(name: string): boolean {
  return !!SPRITE_MANIFEST[name];
}

/** 등록점(regX/regY) 기준으로 앵커 좌표에 스프라이트를 그린다 */
export function drawSprite(ctx: CanvasRenderingContext2D, name: string, ax: number, ay: number): boolean {
  const info = SPRITE_MANIFEST[name];
  const img = images.get(name);
  if (!info || !img) return false;
  ctx.drawImage(img, Math.round(ax - info.regX), Math.round(ay - info.regY));
  return true;
}
