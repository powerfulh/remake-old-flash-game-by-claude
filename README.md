# WorldBuilder Remake (TypeScript)

LEGO WorldBuilder(2004, Shockwave)를 TS + Canvas 2D 웹 게임으로 리메이크.

## 실행

```bash
npm install
npm run gen    # ../extract 데이터 → src/data/generated + public/assets (재생성 시)
npm run dev    # http://localhost:5173
```

## 구조

```
tools/gen-data.mjs        # extract/ → TS 데이터 코드젠 + 애셋 복사
src/data/types.ts         # LevelDef, UnitDef 등 타입
src/data/generated/       # 자동 생성 (levels 60개, units, sprites, audio)
src/engine/
  const.ts                # 타일 지오메트리(51×54 사선 투영, shear 24) + 게임 상수
  assets.ts               # 스프라이트 로드 + Director "Matte" 잉크 재현(흰 배경 투명화)
  audio.ts                # BGM/SFX
  level.ts                # 런타임 레벨 상태 (지형/엔티티/더미/플랜/골)
  path.ts                 # A* (4방향, 늪 페널티)
  game.ts                 # 시뮬레이션 (이동/액션/조립/전투/골 판정)
  render.ts               # 캔버스 렌더 (페인터 순서, 스프라이트 상태 폴백)
  customSprites.ts        # ⚠️ 원작 애셋이 아닌 새로 그린 벡터 스프라이트 (골 마커 등)
src/ui/hud.ts             # DOM HUD (유닛 정보/액션/플랜/배너)
src/main.ts               # 메뉴, 진행 저장(localStorage), 게임 루프
```

## 원본 동작 재현 노트 (검토 필요 항목)

- **타일 지오메트리**: 원본 스프라이트 픽셀 분석으로 도출. 윗면 51×54 평행사변형,
  행마다 왼쪽 24px 시어. 등록점(regX/regY)은 추출 데이터 그대로 사용.
- **FILL 규칙**: DIG로 흙을 퍼 와야 FILL 가능 (`CONFIG.fillRequiresDirt`). [검토 확정: 유지]
- **전투 모델**: HP 100 고정, 피해 = damage_range 균등난수 × 대상 shield,
  공격 주기 = 60/hits_per_minute 초, 명중률 chance%. [검토: 우선 유지, 밸런스는 플레이로 재검]
- **파괴 시**: 유닛/몬스터 모두 레시피 브릭을 그 자리에 드랍 (원본의 "분해" 동작).
- **조립**: 원본 UX 재현 — 플랜 선택 시 커서 중심 3×3 점선 범위 표시(재료 충족 시 초록),
  클릭하면 중앙 칸에 조립. 재료는 3×3 범위 내 더미에서 소모, 유닛 근접 불필요. [검토 확정]
- **미구현 (월드 2+ 요소)**: dozer 바위 밀기, 건물 충전(gas_station 등), guard_tower 자동공격은
  데이터는 있으나 게임플레이 미검증. 소용돌이 워프는 구현됨.
