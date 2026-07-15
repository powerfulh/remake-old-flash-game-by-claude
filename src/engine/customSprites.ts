// ⚠️ 원작 애셋이 아닌, 리메이크에서 새로 그리는 벡터 스프라이트 모음.
//
// 원본 스프라이트가 깨지거나(추출 시 투명도 소실 등) 대체가 필요할 때
// 여기에 캔버스 드로잉 함수로 추가한다. 원작 애셋 렌더링(render.ts 의
// drawSprite 경로)과 명확히 구분하기 위해 별도 파일로 관리.
//
// 현재 대체된 스프라이트:
//   - goal.goal              → drawGoalMark       (미션 골 느낌표)
//   - goal.bonus             → drawBonusStar      (보너스 골 별)
//   - action_arrow_up/down/left/right → drawActionArrow    (능력 사용 방향 화살표)
//   - action_arrow_negative  → drawActionNegative (사용 불가 방향 표시)
//   - action_arrow_middle    → drawActionMiddle   (발밑 칸 사용 가능 마커)

/**
 * 미션 골 마커 — 떠다니는 느낌표.
 * 원본 goal.goal 스프라이트의 배색(연두 본체 + 흰 하이라이트 + 어두운 테두리)을 벡터로 재현.
 * baseY = 마커 하단 기준점.
 */
export function drawGoalMark(ctx: CanvasRenderingContext2D, x: number, baseY: number): void {
  ctx.save();
  ctx.lineJoin = 'round';
  // 몸통(위가 넓고 아래로 갈수록 좁아지는 막대)
  const grad = ctx.createLinearGradient(x, baseY - 36, x, baseY - 12);
  grad.addColorStop(0, '#8dff2e');
  grad.addColorStop(1, '#4ec400');
  ctx.beginPath();
  ctx.moveTo(x - 5.5, baseY - 36);
  ctx.lineTo(x + 5.5, baseY - 36);
  ctx.lineTo(x + 2.5, baseY - 13);
  ctx.lineTo(x - 2.5, baseY - 13);
  ctx.closePath();
  ctx.fillStyle = grad;
  ctx.strokeStyle = '#1c5e00';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  // 점
  ctx.beginPath();
  ctx.arc(x, baseY - 4.5, 4.5, 0, Math.PI * 2);
  ctx.fillStyle = '#6fe310';
  ctx.fill();
  ctx.stroke();
  // 하이라이트
  ctx.beginPath();
  ctx.moveTo(x - 2.8, baseY - 33.5);
  ctx.lineTo(x - 1.2, baseY - 16);
  ctx.strokeStyle = 'rgba(255,255,255,.85)';
  ctx.lineWidth = 1.6;
  ctx.stroke();
  ctx.restore();
}

/**
 * 능력 사용 방향 화살표 — (cx, cy) 중심에서 angle(라디안) 방향을 가리키는 금색 화살표.
 * 사선 투영 그리드라 방향 벡터의 화면 각도를 그대로 넘겨 받는다.
 */
export function drawActionArrow(ctx: CanvasRenderingContext2D, cx: number, cy: number, angle: number): void {
  ctx.save();
  ctx.translate(cx, cy);
  ctx.rotate(angle);
  ctx.lineJoin = 'round';
  ctx.beginPath();
  // 몸통 + 화살촉 (오른쪽(+x)을 향하는 형태)
  ctx.moveTo(-13, -3.5);
  ctx.lineTo(2, -3.5);
  ctx.lineTo(2, -8);
  ctx.lineTo(15, 0);
  ctx.lineTo(2, 8);
  ctx.lineTo(2, 3.5);
  ctx.lineTo(-13, 3.5);
  ctx.closePath();
  ctx.fillStyle = '#ffd83d';
  ctx.strokeStyle = '#7a5200';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.restore();
}

/** 사용 불가 방향 표시 — 빨간 원 + 사선 */
export function drawActionNegative(ctx: CanvasRenderingContext2D, cx: number, cy: number): void {
  ctx.save();
  ctx.beginPath();
  ctx.arc(cx, cy, 8.5, 0, Math.PI * 2);
  ctx.fillStyle = 'rgba(211,47,47,.88)';
  ctx.strokeStyle = '#7d1010';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(cx - 5, cy + 5);
  ctx.lineTo(cx + 5, cy - 5);
  ctx.strokeStyle = '#fff';
  ctx.lineWidth = 2.5;
  ctx.stroke();
  ctx.restore();
}

/** 발밑 칸 사용 가능 마커 — 셀 윗면에 맞춘 금색 타원 링 */
export function drawActionMiddle(ctx: CanvasRenderingContext2D, cx: number, cy: number): void {
  ctx.save();
  ctx.beginPath();
  ctx.ellipse(cx, cy, 21, 10, 0, 0, Math.PI * 2);
  ctx.strokeStyle = '#7a5200';
  ctx.lineWidth = 4;
  ctx.stroke();
  ctx.beginPath();
  ctx.ellipse(cx, cy, 21, 10, 0, 0, Math.PI * 2);
  ctx.strokeStyle = '#ffd83d';
  ctx.lineWidth = 2;
  ctx.stroke();
  ctx.restore();
}

/**
 * 보너스 골 마커 — 흰 별 안에 빨간 별 (원본 goal.bonus 배색).
 * cy = 별 중심.
 */
export function drawBonusStar(ctx: CanvasRenderingContext2D, x: number, cy: number): void {
  const star = (r: number, ri: number) => {
    ctx.beginPath();
    for (let i = 0; i < 10; i++) {
      const ang = -Math.PI / 2 + i * Math.PI / 5;
      const rad = i % 2 === 0 ? r : ri;
      const px = x + Math.cos(ang) * rad;
      const py = cy + Math.sin(ang) * rad;
      if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
    }
    ctx.closePath();
  };
  ctx.save();
  ctx.lineJoin = 'round';
  // 바깥 흰 별
  star(15, 6.8);
  ctx.fillStyle = '#ffffff';
  ctx.strokeStyle = '#8a1230';
  ctx.lineWidth = 2;
  ctx.fill();
  ctx.stroke();
  // 안쪽 빨간 별
  star(8.5, 3.6);
  ctx.fillStyle = '#e8103c';
  ctx.fill();
  ctx.restore();
}
