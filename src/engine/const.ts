// 타일 지오메트리 — 원본 스프라이트 픽셀 분석으로 도출한 사선(oblique) 투영.
// 타일 윗면은 51×54 평행사변형이고 행이 내려갈 때마다 왼쪽으로 24px 밀린다.
// 셀 (x,y) 의 앵커(윗면 좌상단 모서리) 화면 좌표:
//   px = x * STEP_X - y * SHEAR
//   py = y * STEP_Y
export const STEP_X = 51;
export const STEP_Y = 54;
export const SHEAR = 24;

/** 셀 앵커 → 윗면 중심 오프셋 */
export const CENTER_X = (STEP_X - SHEAR) / 2 + 0; // 평행사변형 중심 x = (51 - 24) / 2 + ... 보정
export const CENTER_Y = STEP_Y / 2;

// 실측: 윗면 꼭짓점 (24,0),(74,0),(50,53),(0,53) 기준 중심 = (37,26.5), 앵커 (24,0) 상대 (13,26.5)
export const CELL_CX = 13;
export const CELL_CY = 27;

export const CONFIG = {
  /** FILL 은 DIG 로 퍼 온 흙이 있어야 가능 (원본 동작 추정 — 검토 포인트) */
  fillRequiresDirt: true,
  /** 유닛/몬스터 공통 체력 */
  maxHp: 100,
  /** 에너지 브릭 용량 (config energy 비용이 0~100 스케일) */
  maxEnergy: 100,
  /** 몬스터 인접 공격 판정 거리 (타일, 체비쇼프) */
  attackAdjacency: 1,
};
