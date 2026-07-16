// 타일 지오메트리 — 원본 스프라이트 픽셀 분석으로 도출한 사선(oblique) 투영.
// terrain.normal 실측: 윗면(순수 초록)은 0~49행 = 높이 50px, 50~53행은 어두운 립(lip),
// 54행부터 앞면. 좌측 경사는 정확히 0.5px/행이므로 SHEAR = STEP_Y / 2 여야
// 행 사이 갭/어긋남 없이 맞물린다. (립 4px 는 다음 행 타일이 덮는다)
// 셀 (x,y) 의 앵커(윗면 좌상단 모서리) 화면 좌표:
//   px = x * STEP_X - y * SHEAR
//   py = y * STEP_Y
export const STEP_X = 51;
export const STEP_Y = 50;
export const SHEAR = 25;

// 윗면 꼭짓점 (0,0),(51,0),(26,50),(-25,50) 기준 중심 = (13,25)
export const CELL_CX = 13;
export const CELL_CY = 25;

export const CONFIG = {
  /** FILL 은 DIG 로 퍼 온 흙이 있어야 가능 (원본 동작 추정 — 검토 포인트) */
  fillRequiresDirt: true,
  /** 에너지 브릭 용량 (config energy 비용이 0~100 스케일). 전투도 에너지 기반 */
  maxEnergy: 100,
  /** 몬스터 인접 공격 판정 거리 (타일, 체비쇼프) */
  attackAdjacency: 1,
};
