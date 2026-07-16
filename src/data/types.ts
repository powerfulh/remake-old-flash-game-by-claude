// 원본 worldbuilder.dcr 데이터 구조의 TS 타입 정의

/** 지형 타입 — 원본 config 의 terrain 이름과 매핑됨 */
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
  | 'whirl';    // 소용돌이 (water_whirlpool — 맵에서는 아이템으로 배치됨)

export type BrickColor = 'red' | 'yellow' | 'blue' | 'green' | 'wheel' | 'energy';
export const BRICK_COLORS: BrickColor[] = ['red', 'yellow', 'blue', 'green', 'wheel', 'energy'];

export type Bricks = Partial<Record<BrickColor, number>>;

// ---------- 레벨 정의 ----------

export type MapItem =
  | { kind: 'unit'; water: boolean; type: string }
  | { kind: 'building'; water: boolean; type: string }
  | { kind: 'monster'; water: boolean; type: string }
  | { kind: 'pile'; water: boolean; contents: Bricks }
  | { kind: 'plan'; water: boolean; unit: string; uses: number }
  | { kind: 'goal'; water: boolean; target: string }
  | { kind: 'bonusgoal'; water: boolean; target: string }
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
