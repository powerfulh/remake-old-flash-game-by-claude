import { SPRITE_MANIFEST } from '../data/generated/sprites';
import type { SpriteInfo } from '../data/types';

const images = new Map<string, CanvasImageSource>();

/**
 * Director "Matte" 잉크 재현: 이미지 가장자리에서 연결된 흰색 영역만 투명 처리.
 * (내부의 흰색 픽셀 — 별의 흰 면 등 — 은 유지)
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
  const isWhite = (i: number) => px[i] >= 248 && px[i + 1] >= 248 && px[i + 2] >= 248;
  const visited = new Uint8Array(w * h);
  const stack: number[] = [];
  for (let x = 0; x < w; x++) { stack.push(x, x + (h - 1) * w); }
  for (let y = 0; y < h; y++) { stack.push(y * w, y * w + w - 1); }
  while (stack.length) {
    const p = stack.pop()!;
    if (visited[p]) continue;
    visited[p] = 1;
    if (!isWhite(p * 4)) continue;
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
    img.src = `/assets/sprites/${info.file}`;
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
