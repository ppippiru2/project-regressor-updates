export const MONSTER_STAT_FORMULA = {
  maxHp: { base: 4, vit: 1, level: 1, min: 1 },
  maxMp: { base: 3, wis: 0.8, int: 0.4, level: 0.8, min: 1 },
  mpRegen: { base: 0.02, wis: 0.01, level: 0.004, precision: 2 },
  attack: { base: 0.7, str: 0.25, int: 0.08, level: 0.25, precision: 1 },
  defense: { vit: 0.12, wis: 0.08, precision: 1 },
  critRate: { base: 3, luk: 0.35, max: 35 },
  attackSpeed: { base: 0.21, agi: 0.0045, level: 0.0018, min: 0.2, max: 1.45 },
};

export const MONSTER_POWER_WEIGHTS = {
  maxHp: 2,
  maxMp: 1.2,
  attack: 13,
  defense: 8,
  critRate: 4,
};
