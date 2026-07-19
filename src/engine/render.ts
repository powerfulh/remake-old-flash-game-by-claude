import { CELL_CX, CELL_CY, SHEAR, STEP_X, STEP_Y } from './const';
import { drawSprite, drawSpriteBottomCentered, drawSpriteCentered, hasSprite } from './assets';
import {
  drawActionArrow, drawActionMiddle, drawActionNegative, drawBonusStar, drawGoalMark,
} from './customSprites';
import { EFFECT_DURATION } from './game';
import type { Game } from './game';
import type { Entity } from './level';
import { brickTotal } from './level';
import type { TerrainId } from '../data/types';

const TERRAIN_SPRITE: Record<TerrainId, string> = {
  normal: 'terrain.normal',
  rocky: 'terrain.normal_undiggable',
  mountain: 'terrain.mountain',
  tree: 'terrain.tree',
  water: 'terrain.water',
  deep: 'terrain.water_undiggable',
  reef: 'terrain.water_reefs',
  swamp: 'terrain.swamp',
  volcano: 'terrain.volcano',
  hole: '', // 원작에 hole 타일 스프라이트가 없음 — 배경이 뚫린 공동으로 렌더 (아래 특수 처리)
  billboard: 'terrain.billboard',
  whirl: 'terrain.water_whirlpool',
  // ----- WB2 -----
  zone: 'terrain.goal',
  cement: 'terrain.cement',
  roadblock: 'terrain.roadblock',
  street: 'terrain.street1', // 패밀리 토큰 (그리드 미등장)
  street1: 'terrain.street1', street2: 'terrain.street2', street3: 'terrain.street3',
  street4: 'terrain.street4', street5: 'terrain.street5', street6: 'terrain.street6',
  street7: 'terrain.street7', street8: 'terrain.street8', street9: 'terrain.street9',
  street10: 'terrain.street10', street_undiggable: 'terrain.street_undiggable',
  tree2: 'terrain.tree2', tree3: 'terrain.tree3', tree4: 'terrain.tree4',
  jungle1: 'terrain.jungle1', jungle2: 'terrain.jungle2',
  jungle3: 'terrain.jungle3', jungle4: 'terrain.jungle4',
};

const WATERY = new Set<TerrainId>(['water', 'deep', 'reef', 'whirl']);

export class Camera {
  x = 0;
  y = 0;
  centerOn(cx: number, cy: number, vw: number, vh: number): void {
    this.x = cx * STEP_X - cy * SHEAR + CELL_CX - vw / 2;
    this.y = cy * STEP_Y + CELL_CY - vh / 2;
  }
}

/** 셀 앵커(윗면 좌상단)의 월드 픽셀 좌표 */
export function cellAnchor(x: number, y: number): [number, number] {
  return [x * STEP_X - y * SHEAR, y * STEP_Y];
}

/**
 * 화면 좌표 → 셀 좌표.
 * 타일 좌우 경계는 행 내부에서도 연속적으로 기울어 있으므로(0.5px/px, SHEAR = STEP_Y/2),
 * 행별 고정 시어가 아니라 wy 전체에 비례한 시어를 적용해야
 * 그려지는 평행사변형과 판정 경계가 정확히 일치한다.
 */
export function pickCell(sx: number, sy: number, cam: Camera): [number, number] {
  const wx = sx + cam.x, wy = sy + cam.y;
  const y = Math.floor(wy / STEP_Y);
  const x = Math.floor((wx + wy * (SHEAR / STEP_Y)) / STEP_X);
  return [x, y];
}

function entPixel(e: Entity): [number, number] {
  const t = e.moving ? e.moveT : 1;
  const ix = e.fromX + (e.x - e.fromX) * t;
  const iy = e.fromY + (e.y - e.fromY) * t;
  return [ix * STEP_X - iy * SHEAR + CELL_CX, iy * STEP_Y + CELL_CY];
}

/** 유닛 스프라이트 이름 결정 — 상태 접미사에서 구체적 → 일반 순으로 폴백 */
function unitSpriteName(e: Entity, onWater: boolean, time: number, frozen = false): string {
  const base = e.cls === 'building' ? `building.${e.type}` : `${e.type === 'boulder' ? 'monster' : e.cls === 'monster' ? 'monster' : 'vehicle'}.${e.type}`;
  if (e.type === 'boulder') return hasSprite('monster.boulder') ? 'monster.boulder' : 'object.boulder';
  // WB2: 빙결된 몬스터
  if (frozen && hasSprite(`${base}.frozen`)) return `${base}.frozen`;
  // WB2: factory 는 현재 출력 색상, windmill 은 회전 애니메이션
  if (e.type === 'factory') return hasSprite(`building.factory.${e.factoryColor}`) ? `building.factory.${e.factoryColor}` : base;
  if (e.type === 'windmill') return `building.windmill.${Math.floor(time * 4) % 4 + 1}`;
  const parts: string[] = [];
  if (e.def.waterversion && onWater) parts.push('water');
  parts.push(e.dir);
  const full = brickTotal(e.carrying) > 0 || e.hasDirt || e.hasTree;
  const frame = Math.floor(time * 6) % 6 + 1;
  const candidates: string[] = [];
  const p = parts.join('.');
  if (full) {
    if (e.moving) candidates.push(`${base}.${p}.full.walk.${((frame - 1) % 4) + 1}`);
    candidates.push(`${base}.${p}.full`);
  }
  if (e.moving) {
    candidates.push(`${base}.${p}.walk.${((frame - 1) % 4) + 1}`, `${base}.${p}.walk.${((frame - 1) % 6) + 1}`);
  }
  candidates.push(`${base}.${p}`, `${base}.${e.dir}`, base, `${base}.down`);
  for (const c of candidates) if (hasSprite(c)) return c;
  return candidates[candidates.length - 1];
}

export function render(ctx: CanvasRenderingContext2D, game: Game, cam: Camera, time: number): void {
  const lv = game.level;
  const vw = ctx.canvas.width, vh = ctx.canvas.height;
  ctx.clearRect(0, 0, vw, vh);
  ctx.save();
  ctx.translate(-Math.round(cam.x), -Math.round(cam.y));

  // 행 단위 페인터 순서로 지형 → 오브젝트 → 엔티티
  const entByRow = new Map<number, Entity[]>();
  for (const e of lv.entities) {
    if (e.dead) continue;
    // 세로 이동 중에는 두 행에 걸쳐 있으므로 아래쪽 행에 묶는다 —
    // 아래 행 타일이 유닛보다 먼저 그려져 유닛이 가려지는 문제 방지
    const row = e.moving ? Math.max(e.fromY, e.y) : e.y;
    const arr = entByRow.get(row) ?? [];
    arr.push(e);
    entByRow.set(row, arr);
  }

  for (let y = 0; y < lv.h; y++) {
    // 1) 지형 타일
    for (let x = 0; x < lv.w; x++) {
      const [ax, ay] = cellAnchor(x, y);
      const t = lv.terrain[y][x];
      if (t === 'hole') {
        // 구멍: 타일 없이 검은 공동 (원작은 스테이지 배경이 그대로 보임)
        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(ax + STEP_X, ay);
        ctx.lineTo(ax + STEP_X - SHEAR, ay + STEP_Y);
        ctx.lineTo(ax - SHEAR, ay + STEP_Y);
        ctx.closePath();
        ctx.fill();
        continue;
      }
      let name = TERRAIN_SPRITE[t];
      if (t === 'whirl') {
        const f = Math.floor(time * 5) % 4 + 1;
        if (hasSprite(`whirlpool.generic.whirl.${f}`)) name = TERRAIN_SPRITE.water;
      }
      if (!drawSprite(ctx, name, ax, ay)) {
        // 폴백: 단색
        ctx.fillStyle = WATERY.has(t) ? '#3d85c8' : '#7ec850';
        ctx.fillRect(ax, ay, STEP_X, STEP_Y);
      }
      if (t === 'whirl') {
        // 등록점이 원작 스크립트 기준이라 그대로 쓰면 우하단으로 치우침 — 셀 중앙 정렬로 그림
        const f = Math.floor(time * 5) % 4 + 1;
        drawSpriteCentered(ctx, `whirlpool.generic.whirl.${f}`, ax + CELL_CX, ay + CELL_CY);
      }
    }
    // 2) 골 마커 / 플랜 / 브릭 더미
    for (const g of lv.goals) {
      if (g.y !== y || g.done) continue;
      const [ax, ay] = cellAnchor(g.x, g.y);
      const cx = ax + CELL_CX, cy = ay + CELL_CY;
      const bob = Math.sin(time * 3 + g.x) * 4;
      if (g.bonus) drawBonusStar(ctx, cx, cy + bob - 22);
      else drawGoalMark(ctx, cx, cy + bob - 10);
    }
    for (const [k, plan] of lv.mapPlans) {
      const [px, py] = k.split(',').map(Number);
      if (py !== y) continue;
      const [ax, ay] = cellAnchor(px, py);
      const bob = Math.sin(time * 3 + px) * 3;
      const name = `vehicle.${plan.unit}.plan`;
      const alt = `building.${plan.unit}.plan`;
      drawSprite(ctx, hasSprite(name) ? name : alt, ax + CELL_CX, ay + CELL_CY + bob - 6);
    }
    for (const [k, pile] of lv.piles) {
      const [px, py] = k.split(',').map(Number);
      if (py !== y) continue;
      const [ax, ay] = cellAnchor(px, py);
      drawPile(ctx, pile, ax + CELL_CX, ay + CELL_CY);
    }
    // 3) 엔티티
    const ents = entByRow.get(y);
    if (ents) {
      ents.sort((a, b) => a.x - b.x);
      for (const e of ents) {
        const [ex, ey] = entPixel(e);
        const onWater = WATERY.has(lv.terrain[e.y][e.x]);
        if (game.selected?.id === e.id) {
          ctx.strokeStyle = '#ffee58';
          ctx.lineWidth = 2;
          ctx.beginPath();
          ctx.ellipse(ex, ey + 6, 24, 11, 0, 0, Math.PI * 2);
          ctx.stroke();
        }
        const name = unitSpriteName(e, onWater, time, e.frozenUntil > game.time);
        // 건물 본체 스프라이트는 등록점이 어긋나 있어 바닥 중심 정렬로 그린다
        const drawn = e.cls === 'building'
          ? drawSpriteBottomCentered(ctx, name, ex, ey + 18)
          : drawSprite(ctx, name, ex, ey);
        if (!drawn) {
          ctx.fillStyle = e.cls === 'monster' ? '#e53935' : '#fff';
          ctx.fillRect(ex - 8, ey - 8, 16, 16);
        }
        if (e.cls !== 'monster') drawCarriedBricks(ctx, e, ex, ey);
        // 몬스터 휴식 표시
        if (e.cls === 'monster' && e.resting && e.type !== 'boulder') {
          ctx.fillStyle = 'rgba(255,255,255,.85)';
          ctx.font = 'bold 12px sans-serif';
          ctx.fillText('z z', ex + 10, ey - 18);
        }
        // 에너지 상태 아이콘 (원작 icon.charging / no_energy / low_energy)
        if (e.cls !== 'monster') {
          if (time - e.chargingAt < 0.25) {
            // 충전중: 3프레임 애니메이션
            drawSpriteCentered(ctx, `icon.charging.${Math.floor(time * 6) % 3}`, ex, ey - 32);
          } else if (e.energy <= 0) {
            if (Math.floor(time * 2) % 2 === 0) drawSpriteCentered(ctx, 'icon.no_energy', ex, ey - 32);
          } else if (e.energy < 20) {
            if (Math.floor(time * 2) % 2 === 0) drawSpriteCentered(ctx, 'icon.low_energy', ex, ey - 32);
          }
        }
        // 에너지 바 — 최근 피격된 엔티티에만 잠시 표시 (전투 피드백)
        if (time - e.lastHitAt < 3 && e.energy < 100) {
          ctx.fillStyle = '#222';
          ctx.fillRect(ex - 14, ey - 26, 28, 4);
          ctx.fillStyle = e.energy > 40 ? '#66bb6a' : '#ef5350';
          ctx.fillRect(ex - 14, ey - 26, 28 * Math.max(0, e.energy) / 100, 4);
        }
      }
    }
  }
  drawPlannedPaths(ctx, game);

  // 조립/분해 구름, 피격 버스트 이펙트 (원본 프레임 애니메이션)
  for (const fx of game.effects) {
    const [ax, ay] = cellAnchor(fx.x, fx.y);
    const progress = fx.t / EFFECT_DURATION[fx.kind];
    const frame = fx.kind === 'build'
      ? `build_cloud${Math.min(2, Math.floor(progress * 2) + 1)}`
      : fx.kind === 'takeApart'
        ? `take_apart_cloud${Math.min(3, Math.floor(progress * 3) + 1)}`
        : `damage.small.${Math.min(5, Math.floor(progress * 5) + 1)}`;
    drawSpriteCentered(ctx, frame, ax + CELL_CX, ay + CELL_CY - 8);
  }

  // 튜토리얼 대상 셀 마커 — 튀는 화살표 + 펄스 링
  if (game.tutorialCell) {
    const [tx, ty] = game.tutorialCell;
    const [ax, ay] = cellAnchor(tx, ty);
    const cx = ax + CELL_CX, cy = ay + CELL_CY;
    const bounce = Math.abs(Math.sin(time * 4)) * 8;
    ctx.save();
    ctx.strokeStyle = 'rgba(255,216,61,.9)';
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.ellipse(cx, cy, 24 + Math.sin(time * 4) * 3, 11 + Math.sin(time * 4) * 1.5, 0, 0, Math.PI * 2);
    ctx.stroke();
    // 아래로 향하는 화살표
    const base = cy - 34 - bounce;
    ctx.fillStyle = '#ffd83d';
    ctx.strokeStyle = '#7a5200';
    ctx.lineWidth = 2;
    ctx.lineJoin = 'round';
    ctx.beginPath();
    ctx.moveTo(cx - 5, base - 14);
    ctx.lineTo(cx + 5, base - 14);
    ctx.lineTo(cx + 5, base - 7);
    ctx.lineTo(cx + 10, base - 7);
    ctx.lineTo(cx, base + 3);
    ctx.lineTo(cx - 10, base - 7);
    ctx.lineTo(cx - 5, base - 7);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.restore();
  }

  drawActionArrows(ctx, game, time);

  if (game.hover) {
    const { x: hx, y: hy } = game.hover;
    if (hx >= 0 && hy >= 0 && hx < lv.w && hy < lv.h) {
      if (game.mode.type === 'build') {
        // 조립 모드: 커서 중심 3×3 범위 오버레이 (원본 UX 재현)
        const plan = lv.planInv[game.mode.planIdx];
        const ok = plan ? game.buildCheck(plan.unit, hx, hy).ok : false;
        drawBuildRange(ctx, hx, hy, ok, time);
      } else {
        drawHoverCell(ctx, hx, hy, time);
      }
    }
  }

  ctx.restore();
}

/**
 * 적재물 표시 (원본 carry.* 스프라이트) — 운반 중인 브릭을 유닛 위에 쌓아 그린다.
 * 3개씩 한 줄로 위로 쌓고, 6개까지만 표시 (초과분은 HUD 적재 표기로 확인).
 */
function drawCarriedBricks(ctx: CanvasRenderingContext2D, e: Entity, ex: number, ey: number): void {
  const items: string[] = [];
  for (const [c, n] of Object.entries(e.carrying)) {
    for (let i = 0; i < (n ?? 0) && items.length < 6; i++) items.push(c);
  }
  items.forEach((c, i) => {
    const dx = (i % 3 - 1) * 11;
    const dy = -20 - Math.floor(i / 3) * 8;
    const name = c === 'energy' ? `carry.energy${energyState(e.carryCharge)}` : `carry.${c}`;
    drawSprite(ctx, name, ex + dx, ey + dy);
  });
}

/** 이동 계획 표시 — 유닛의 현재 위치에서 남은 경로의 타일 중심을 잇는 반투명 선 */
function drawPlannedPaths(ctx: CanvasRenderingContext2D, game: Game): void {
  for (const e of game.level.entities) {
    if (e.dead || e.cls === 'monster') continue;
    if (!e.moving && e.path.length === 0) continue;
    const pts: [number, number][] = [entPixel(e)];
    if (e.moving) {
      const [ax, ay] = cellAnchor(e.x, e.y);
      pts.push([ax + CELL_CX, ay + CELL_CY]);
    }
    for (const c of e.path) {
      const [ax, ay] = cellAnchor(c.x, c.y);
      pts.push([ax + CELL_CX, ay + CELL_CY]);
    }
    if (pts.length < 2) continue;
    ctx.save();
    ctx.strokeStyle = 'rgba(255,255,255,.35)';
    ctx.lineWidth = 4;
    ctx.lineJoin = 'round';
    ctx.lineCap = 'round';
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length; i++) ctx.lineTo(pts[i][0], pts[i][1]);
    ctx.stroke();
    // 목적지 점
    const [dx, dy] = pts[pts.length - 1];
    ctx.beginPath();
    ctx.arc(dx, dy, 4.5, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(255,255,255,.5)';
    ctx.fill();
    ctx.restore();
  }
}

const ADJACENT_ACTIONS = new Set(['pickup', 'drop', 'dig', 'fill', 'uproot', 'plant', 'push']);
// 사선 투영에서 각 그리드 방향의 화면 벡터: +x=(51,0), +y=(-24,54)
const ARROW_DIRS = [
  { dx: 0, dy: -1, angle: Math.atan2(-STEP_Y, SHEAR) },
  { dx: 0, dy: 1, angle: Math.atan2(STEP_Y, -SHEAR) },
  { dx: -1, dy: 0, angle: Math.PI },
  { dx: 1, dy: 0, angle: 0 },
];

/**
 * 능력 사용 방향 표시 (커스텀 벡터 — 원본 action_arrow_* 대체):
 * 인접 대상 액션 모드일 때 유닛 사방에 화살표 표시 —
 * 실행 가능한 방향은 화살표, 불가능한 방향은 불가 마커.
 * 유닛 발밑 칸에서도 가능하면 타원 링 표시.
 */
function drawActionArrows(ctx: CanvasRenderingContext2D, game: Game, time: number): void {
  const sel = game.selected;
  const mode = game.mode.type;
  if (!sel || !ADJACENT_ACTIONS.has(mode)) return;
  const action = mode as import('./game').AdjacentAction;
  const lv = game.level;
  const bob = Math.sin(time * 5) * 2;
  for (const { dx, dy, angle } of ARROW_DIRS) {
    const x = sel.x + dx, y = sel.y + dy;
    if (x < 0 || y < 0 || x >= lv.w || y >= lv.h) continue;
    const [ax, ay] = cellAnchor(x, y);
    if (game.canActAt(sel, action, x, y)) drawActionArrow(ctx, ax + CELL_CX, ay + CELL_CY + bob, angle);
    else drawActionNegative(ctx, ax + CELL_CX, ay + CELL_CY);
  }
  if (game.canActAt(sel, action, sel.x, sel.y)) {
    const [ax, ay] = cellAnchor(sel.x, sel.y);
    drawActionMiddle(ctx, ax + CELL_CX, ay + CELL_CY + 8 + bob * 0.5);
  }
}

/** 호버 중인 타일 표시 — 셀 윗면 평행사변형 점선 테두리 */
function drawHoverCell(ctx: CanvasRenderingContext2D, cx: number, cy: number, time: number): void {
  const [ax, ay] = cellAnchor(cx, cy);
  ctx.save();
  ctx.lineWidth = 2;
  ctx.setLineDash([7, 5]);
  ctx.lineDashOffset = -time * 18;
  ctx.strokeStyle = 'rgba(255,255,255,.85)';
  ctx.beginPath();
  ctx.moveTo(ax, ay);
  ctx.lineTo(ax + STEP_X, ay);
  ctx.lineTo(ax + STEP_X - SHEAR, ay + STEP_Y);
  ctx.lineTo(ax - SHEAR, ay + STEP_Y);
  ctx.closePath();
  ctx.stroke();
  ctx.restore();
}

/** 3×3 조립 범위: 사선 투영 평행사변형 점선 테두리 + 중앙 칸 강조 */
function drawBuildRange(ctx: CanvasRenderingContext2D, cx: number, cy: number, ok: boolean, time: number): void {
  const [tlx, tly] = cellAnchor(cx - 1, cy - 1);
  const w3 = STEP_X * 3, h3 = STEP_Y * 3, sh3 = SHEAR * 3;
  ctx.save();
  ctx.lineWidth = 3;
  ctx.setLineDash([10, 7]);
  ctx.lineDashOffset = -time * 24; // 점선이 흐르는 애니메이션
  ctx.strokeStyle = ok ? 'rgba(120,255,120,.95)' : 'rgba(255,90,90,.95)';
  ctx.fillStyle = ok ? 'rgba(120,255,120,.12)' : 'rgba(255,90,90,.10)';
  const para = (x: number, y: number, w: number, h: number, sh: number) => {
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + w, y);
    ctx.lineTo(x + w - sh, y + h);
    ctx.lineTo(x - sh, y + h);
    ctx.closePath();
  };
  para(tlx, tly, w3, h3, sh3);
  ctx.fill();
  ctx.stroke();
  // 중앙 칸(조립 위치) 강조
  const [ax, ay] = cellAnchor(cx, cy);
  ctx.setLineDash([]);
  ctx.lineWidth = 2;
  para(ax, ay, STEP_X, STEP_Y, SHEAR);
  ctx.stroke();
  ctx.restore();
}

/** 에너지 브릭 상태 접미사 — 원작 config energy_bricks=1,80 임계값 */
export function energyState(charge: number): '' | '_low' | '_dead' {
  return charge < 1 ? '_dead' : charge < 80 ? '_low' : '';
}

function drawPile(ctx: CanvasRenderingContext2D, pile: import('./level').Pile, cx: number, cy: number): void {
  // 색상별로 작게 분산 배치, 수량에 따라 스프라이트 크기 단계 선택
  const bricks = pile.bricks as Record<string, number | undefined>;
  const entries = Object.entries(bricks).filter(([, n]) => (n ?? 0) > 0);
  let i = 0;
  for (const [color, n] of entries) {
    const count = n ?? 0;
    const off = entries.length > 1 ? [(i % 2) * 14 - 7, Math.floor(i / 2) * 8 - 4] : [0, 0];
    let name: string;
    if (color === 'wheel') name = 'resource.wheel';
    else if (color === 'energy') name = `resource.energy${energyState(pile.energyCharge)}`;
    else name = `resource.${color}.${count >= 10 ? 4 : count >= 6 ? 3 : count >= 3 ? 2 : 1}`;
    if (!drawSprite(ctx, name, cx + off[0], cy + off[1])) {
      ctx.fillStyle = { red: '#e53935', yellow: '#fdd835', blue: '#1e88e5', green: '#43a047', wheel: '#555', energy: '#8bc34a' }[color] ?? '#999';
      ctx.fillRect(cx + off[0] - 5, cy + off[1] - 5, 10, 10);
    }
    if (count > 1) {
      ctx.fillStyle = '#fff';
      ctx.strokeStyle = '#000';
      ctx.lineWidth = 2.5;
      ctx.font = 'bold 11px sans-serif';
      const label = String(count);
      ctx.strokeText(label, cx + off[0] + 8, cy + off[1] + 4);
      ctx.fillText(label, cx + off[0] + 8, cy + off[1] + 4);
    }
    i++;
  }
}
