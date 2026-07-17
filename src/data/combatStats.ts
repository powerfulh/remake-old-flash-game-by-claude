// 전투 유닛 공격력/방어력 정의 (수동 편집 파일 — 코드젠 대상 아님)
//
// 전투 규칙 (에너지 기반, 난수 없음):
//   - 피해 = max(0, 공격자의 attack - 피격자의 defense) 를 피격자의 에너지에서 차감
//   - 이 테이블에 없는 유닛(비전투 유닛)은 방어력 0 으로 동일한 로직을 탄다
//   - 에너지가 0 이하가 되면 강제 분해
//     · 플레이어 유닛: 드랍되는 에너지 브릭 충전량 = 잔량 (즉 0)
//     · 몬스터: 예외적으로 풀충전 에너지 브릭 드랍
//   - boulder 는 전투 대상 아님 (파괴 불가 장애물)

export interface CombatStat {
  attack: number;
  defense: number;
}

/**
 * 늪 지형 데미지 — 원작 config `#swamp=[#damage:50.0, #period:0.7]` 를
 * 에너지 전투 체계 비율로 환산 (원작 늪 DPS ≈ 원작 크랩 DPS 였으므로 크랩 기준 스케일).
 * 방어력이 적용되므로 defender류(방20)는 면역 — 원작의 "로봇만 늪을 잘 건넌다" 설계 재현.
 * 플레이어 유닛에게만 적용 (몬스터는 늪 서식이라 면역).
 */
export const SWAMP_HAZARD = { damage: 9, period: 0.7 };

export const COMBAT_STATS: Record<string, CombatStat> = {
  // ----- 플레이어 전투 유닛 -----
  defender: { attack: 24, defense: 20 },
  defender2: { attack: 24, defense: 20 },
  defender3: { attack: 24, defense: 20 },
  speedboat: { attack: 40, defense: 20 },
  guard_tower: { attack: 20, defense: 32 },

  // ----- 몬스터 -----
  crab: { attack: 32, defense: 0 },
  water_crab: { attack: 32, defense: 0 },
  gator: { attack: 36, defense: 4 },
  scorpion: { attack: 40, defense: 4 },
  shark: { attack: 40, defense: 0 },
  trex: { attack: 48, defense: 8 },
  // WB2 — ⚠️ placeholder (원작: damage 200–400 / shield 0.03 / 속도 4·공격주기 2초로 빠름)
  lion: { attack: 40, defense: 4 },
};
