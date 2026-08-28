# unused-assets

리메이크에서 **현재 사용하지 않는** 원작 애셋 보관소.
`public/` 밖에 있으므로 `vite build` 산출물(`docs/`)에 포함되지 않는다.

## 판정 기준

스프라이트의 유일한 로딩 경로는 다음 두 곳뿐이다.

- `src/engine/assets.ts` — `SPRITE_MANIFEST[name].file` 로 `assets/sprites/<file>` 요청
- `src/main.ts` — 부팅 시 `loadSprites(Object.keys(SPRITE_MANIFEST))` 로 매니페스트 전체 로드

따라서 **`src/data/generated/sprites.ts` 의 매니페스트가 참조하지 않는 파일 = 절대 로드되지 않는 파일**이다.
여기 있는 206개가 그에 해당한다. (CSS `url()`, `new Image()` 직접 호출, `<img>` 태그 참조 없음을 확인)

## 보관 내역 (206개, 약 452KB)

| 분류 | 내용 |
| --- | --- |
| 원작 UI 크롬 | `*_button*`, `arrow_*`, `title_logo`, `worldbuilder_title`, `gamelab_logo`, `*_bubble`, `*_border`, `right_panel_framing`, `new_bottom_panel` — 리메이크는 UI 를 HTML/CSS 로 그린다 |
| 월드맵 화면 | `worldmap*`, `world_one/two/three`, `flag*`, `bonus_flag*`, `ocean_*`, `question_mark*`, `landmass_2`, `OCEAN__1`, `PREHIS_1` |
| 미니맵 | `minimap.*` (미구현) |
| 커스텀 벡터로 대체됨 | `goal.goal`, `goal.bonus`, `goal.shadow.*`, `action_arrow_*` → `src/engine/customSprites.ts` 가 캔버스 드로잉으로 대체 |
| 유닛 미니 아이콘 | `*_mini`, `*.mini` (유닛 목록 UI 미사용) |
| 손상된 원본 | `vehicle.defender.{up,down,left,right}` — 팔레트 인덱스 손상으로 매니페스트가 `*.walk.1` 프레임을 별칭 사용 (`tools/gen-data.mjs`) |
| 기타 | `cursor_*`, `plan_*`/`plan.*`(제네릭), `icon.*`(charging/energy 외), `build_outline*`, `number_*`, `text_*`, `tutorial*`, `energy_bar_*`, `mountain`/`tree`(→ 실제로는 `terrain.mountain`/`terrain.tree` 사용) |

## 주의

`../extract`, `../extract2` 원본 추출 데이터가 현재 저장소에 없어 `npm run gen` 을 재실행할 수 없다.
**여기 있는 파일이 유일한 사본이므로 삭제하지 말 것.**

나중에 이 중 하나를 다시 쓰려면: 파일을 `public/assets/sprites/` 로 되돌리고
`tools/gen-data.mjs` 의 `USED_SPRITE_PATTERNS` 에 패턴을 추가한 뒤 매니페스트에 항목을 등록한다.
