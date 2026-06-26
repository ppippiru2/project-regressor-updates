export const PLAYER_GEAR_BALANCE = {
  defenseScale: 0.35,
};

export const PLAYER_STAT_FORMULA = {
  maxHp: { base: 4, vit: 1, level: 1 },
  maxMp: { base: 2, wis: 0.35, int: 0.15, level: 1.25 },
  hpRegen: { base: 0.04, vit: 0.012, level: 0.006, precision: 2 },
  mpRegen: { base: 0.03, wis: 0.01, int: 0.004, level: 0.004, precision: 2 },
  attack: { base: 1, str: 0.35, int: 0.12, level: 0.4, precision: 1 },
  magicAttack: { base: 0.8, int: 0.36, wis: 0.08, level: 0.35, precision: 1 },
  defense: { vit: 0.15, wis: 0.08, precision: 1 },
  critRate: { base: 5, luk: 0.45, max: 45 },
  critDamage: { base: 150, luk: 1.4 },
  attackSpeed: { base: 0.25, agi: 0.0055, level: 0.0028, min: 0.23, max: 1.55 },
  evade: { base: 3, agi: 0.35, max: 45 },
  accuracy: { base: 86, agi: 0.42, luk: 0.15, max: 98 },
  statusResist: { wis: 0.6, vit: 0.15, max: 75 },
  dropRate: { base: 1, luk: 0.01 },
};

export const PLAYER_POWER_WEIGHTS = {
  maxHp: 2,
  maxMp: 1.5,
  attack: 12,
  magicAttack: 6,
  defense: 8,
  critRate: 4,
  evade: 3,
};
