// 전투 유닛 공격력/방어력 정의 (수동 편집 파일 — 코드젠 대상 아님)
//
// 전투 규칙 (에너지 기반, 난수 없음):
//   - 피해 = max(0, 공격자의 attack - 피격자의 defense) 를 피격자의 에너지에서 차감
//   - 비전투 유닛(이 테이블에 없는 유닛)이 공격받으면 최대 에너지의 33% 차감
//   - 에너지가 0 이하가 되면 강제 분해 (드랍되는 에너지 브릭 충전량 0)
//   - boulder 는 전투 대상 아님 (파괴 불가 장애물)
//
// ⚠️ 아래 값은 자리표시자 — 밸런스 확정값으로 교체할 것.
//    참고: 원작 config 의 damage_range / shield
//      defender 150–250 (shield .05) · defender3 200–300 · speedboat 150–250 (shield .05)
//      guard_tower 200–300 (shield .02) · crab/water_crab/gator 100–200 (shield .1)
//      scorpion 200–400 (shield .045) · shark 300–500 (shield .05) · trex 400–600 (shield .02)

export interface CombatStat {
  attack: number;
  defense: number;
}

export const COMBAT_STATS: Record<string, CombatStat> = {
  // ----- 플레이어 전투 유닛 -----
  defender: { attack: 20, defense: 10 },
  defender2: { attack: 20, defense: 10 },
  defender3: { attack: 25, defense: 12 },
  speedboat: { attack: 20, defense: 8 },
  guard_tower: { attack: 25, defense: 15 },

  // ----- 몬스터 -----
  crab: { attack: 15, defense: 5 },
  water_crab: { attack: 15, defense: 5 },
  gator: { attack: 15, defense: 5 },
  scorpion: { attack: 30, defense: 8 },
  shark: { attack: 40, defense: 6 },
  trex: { attack: 50, defense: 12 },
};
