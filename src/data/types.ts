// 원본 worldbuilder.dcr 데이터 구조의 TS 타입 정의

/** 지형 타입 — 원본 config 의 terrain 이름과 매핑됨. WB2 에서 street/정글 계열 추가 */
export type TerrainId =
  | 'normal'    // . 평지 (굴착 가능)
  | 'rocky'     // _ 암반 (normal_undiggable)
  | 'mountain'  // M 산 (통행 불가)
  | 'tree'      // T 나무 (통행 불가, treebot 이식 가능)
  | 'water'     // w 물 (매립 가능)
  | 'deep'      // x 깊은 물 (water_undiggable)
  | 'reef'      // r 암초 물 (water_reefs)
  | 'swamp'     // # 늪 (경로 페널티)
  | 'volcano'   // ^ 화산 (통행 불가)
  | 'hole'      // @ 구멍
  | 'billboard' // ~ 광고판
  | 'whirl'     // 소용돌이 (water_whirlpool — 맵에서는 아이템으로 배치됨)
  // ----- WB2 -----
  | 'zone'      // : 포획 존 (노란 존, 걷기는 평지 취급)
  | 'cement'    // ` 시멘트 (street 취급)
  | 'roadblock' // > 로드블록 (통행 불가)
  | 'street'    // 통행권 토큰 (config terrain 목록용 — 그리드에는 변형만 등장)
  | 'street1' | 'street2' | 'street3' | 'street4' | 'street5'
  | 'street6' | 'street7' | 'street8' | 'street9' | 'street10'
  | 'street_undiggable'
  | 'tree2' | 'tree3' | 'tree4'          // 나무 변형 (tree 취급)
  | 'jungle1' | 'jungle2' | 'jungle3' | 'jungle4'; // 정글 장애물 (통행·이식 불가)

/** 지형을 통행 판정용 기본형으로 정규화 (street 변형 → street, 나무 변형 → tree 등) */
export function terrainFamily(t: TerrainId): string {
  if (t === 'zone') return 'normal';
  // street_undiggable('-')은 구멍 뚫린 도로 — 원작 config 명명 규칙상 별도 통행 클래스이고
  // 어떤 유닛도 목록에 없으므로 통행 불가 (normal_undiggable 이 normal 과 구분되는 것과 동일)
  if (t === 'street_undiggable') return 'street_undiggable';
  if (t === 'cement' || t.startsWith('street')) return 'street';
  if (t === 'tree2' || t === 'tree3' || t === 'tree4') return 'tree';
  if (t.startsWith('jungle')) return 'jungle';
  return t;
}

export type BrickColor = 'red' | 'yellow' | 'blue' | 'green' | 'white' | 'wheel' | 'energy';
export const BRICK_COLORS: BrickColor[] = ['red', 'yellow', 'blue', 'green', 'white', 'wheel', 'energy'];

export type Bricks = Partial<Record<BrickColor, number>>;

// ---------- 레벨 정의 ----------

export type MapItem =
  | { kind: 'unit'; water: boolean; type: string }
  | { kind: 'building'; water: boolean; type: string }
  | { kind: 'monster'; water: boolean; type: string }
  | { kind: 'pile'; water: boolean; contents: Bricks }
  | { kind: 'plan'; water: boolean; unit: string; uses: number }
  | { kind: 'goal'; water: boolean; target: string; collect?: { count: number; type: string } }
  | { kind: 'bonusgoal'; water: boolean; target: string; collect?: { count: number; type: string } }
  | { kind: 'whirlpool'; water: boolean; channel: number };

export interface LevelDef {
  world: number;
  mission: number;
  /** 공식 미션명 (level names) */
  name: string;
  /** 맵 파일 내부 개발명 */
  devName: string;
  width: number;
  height: number;
  /** 원본 타일 문자 그리드 (아이템 키 문자 포함) */
  grid: string[];
  items: Record<string, MapItem>;
  /** 시작 보유 플랜: 유닛 id → 사용 횟수 */
  inventory: Record<string, number>;
  /** 시작 카메라 중심 (타일 좌표) */
  center: [number, number] | null;
  /** 클리어 시 해금되는 미션 번호 (13 = 다음 월드) */
  unlocks: number[];
  /** 어느 게임의 레벨인지 (1 = WorldBuilder, 2 = WorldBuilder 2). 생략 시 1 */
  game?: number;
}

// ---------- 유닛/건물/몬스터 정의 (config) ----------

export interface AttackDef {
  damage: [number, number];
  hitsPerMinute: number;
  /** 성공 확률 (%) */
  chance: number;
  searchRange: number;
}

export interface UnitDef {
  id: string;
  name: string;
  kind: 'vehicle' | 'robot' | 'animal' | 'building' | string;
  /** 타일/초 */
  speed: number;
  /** 행동별 에너지 소모 (move/dig/fill/uproot/plant/push) — 0~100 스케일 */
  energy: Record<string, number>;
  terrain: TerrainId[];
  recipe: Bricks;
  carries: number;
  /** 피해 배율 (낮을수록 단단함), 기본 1 */
  shield: number;
  dig: boolean;
  push: boolean;
  transplant: boolean;
  /** 물/뭍 양쪽 스프라이트 보유 (수륙 양용) */
  waterversion: boolean;
  attack: AttackDef | null;
  /** 이 건물/유닛이 충전해 주는 유닛 id 목록 */
  recharges: string[];
  /** 몬스터 활동/휴식 주기 (초 단위 틱) */
  restEvery: number | null;
  restFor: number | null;
  // ----- WB2 -----
  /** freezebot 빙결 능력 */
  freeze?: { duration: number; recharge: number; range: number } | null;
  /** 생산 건물: 한 사이클에 만드는 브릭 수 (factory 25 / garage 4 / windmill 1) */
  makeHowManyBricks?: number | null;
  /** 생산 사이클 간격 (초) */
  howLongDoesItTake?: number | null;
}

export interface UnitData {
  vehicles: Record<string, UnitDef>;
  buildings: Record<string, UnitDef>;
  monsters: Record<string, UnitDef>;
}

// ---------- 스프라이트 매니페스트 ----------

/** 원작 유닛 정보 카드 (unit info 텍스트 멤버 = wb_help_models 위키와 동일) */
export interface UnitDescription {
  text: string;
  terrain: string;
  speed: string;
  actions: string;
  capacity: string;
}
export type UnitDescriptions = Record<string, UnitDescription>;

export interface SpriteInfo {
  file: string;
  w: number;
  h: number;
  /** Director 등록점 — 스프라이트 앵커 기준 좌표 */
  regX: number;
  regY: number;
}
export type SpriteManifest = Record<string, SpriteInfo>;
