# WorldBuilder Remake (TypeScript)

레고 WorldBuilder(2004, Shockwave)를 TS + Canvas 2D 웹 게임으로 리메이크.

## 링크
https://powerfulh.github.io/remake-old-flash-game-by-claude

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
