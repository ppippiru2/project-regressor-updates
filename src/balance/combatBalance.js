export const PLAYER_HYPER_BASE_DURATION_SECONDS = 6;
export const PLAYER_HYPER_BASE_COOLDOWN_SECONDS = 5;
export const ENEMY_HYPER_BASE_DURATION_SECONDS = 4.5;
export const ENEMY_HYPER_BASE_COOLDOWN_SECONDS = 7;

export const HYPER_CHARGE_BALANCE = {
  playerSuccessfulHit: {
    normal: 3,
    critical: 6,
  },
  enemyFromPlayerHit: {
    normal: 2,
    normalCritical: 4,
    boss: 4,
    bossCritical: 6,
  },
  playerFromEnemyHit: {
    normal: 1,
    boss: 2,
  },
  enemyFromEnemyHit: {
    normal: 4,
    boss: 7,
  },
};

export const HYPER_SCALING_BALANCE = {
  playerCharge: {
    wis: 0.006,
    luk: 0.004,
    agi: 0.002,
    maxBonus: 0.55,
  },
  playerDuration: {
    wis: 0.04,
    agi: 0.02,
    maxBonusSeconds: 4,
  },
  playerCooldown: {
    minSeconds: 2,
    wis: 0.04,
    luk: 0.03,
    maxReductionSeconds: 2.5,
  },
  enemyCharge: {
    level: 0.01,
    agi: 0.004,
    wis: 0.005,
    luk: 0.006,
    bossBonus: 0.2,
    maxBonus: 0.45,
  },
  enemyDuration: {
    wis: 0.045,
    vit: 0.012,
    level: 0.025,
    bossBonus: 1.1,
    maxBonusSeconds: 3.2,
  },
  enemyCooldown: {
    minSeconds: 3.8,
    wis: 0.045,
    luk: 0.08,
    agi: 0.022,
    maxReductionSeconds: 3.2,
  },
};

export const BREAK_GAUGE_BALANCE = {
  normalInitialGauge: 24,
  bossInitialGauge: 100,
  skillGaugeDamagePerPower: 12,
};

export const WEAKNESS_BALANCE = {
  durationSeconds: 6.5,
  baseSkillDamageMultiplier: 1.18,
  skillMultiplierScale: 0.5,
  breakPowerScale: 0.08,
  strikeChainScale: 0.06,
  maxStrikeChainBonus: 0.24,
  maxSkillDamageMultiplier: 1.75,
};

export const COMBAT_RUNTIME_BALANCE = {
  frameMs: 100,
  autoRestartDelayMs: 900,
  hitResetMs: 3000,
  hyperMax: 100,
};

export const RANK_ORDER = ["F-", "F", "F+", "E", "D", "C", "B", "A", "S", "EX"];

export const RANK_POWER_THRESHOLDS = [
  { maxPower: 90, rank: "F-" },
  { maxPower: 140, rank: "F" },
  { maxPower: 210, rank: "F+" },
  { maxPower: 320, rank: "E" },
  { maxPower: 500, rank: "D" },
  { maxPower: 760, rank: "C" },
  { maxPower: 1120, rank: "B" },
  { maxPower: 1640, rank: "A" },
  { maxPower: 2350, rank: "S" },
  { maxPower: Infinity, rank: "EX" },
];

export const RANK_COMBAT_GAP_MIN = -5;
export const RANK_COMBAT_GAP_MAX = 5;
export const RANK_DAMAGE_MULTIPLIER_PER_GAP = 0.08;
export const RANK_DAMAGE_MULTIPLIER_MIN = 0.58;
export const RANK_DAMAGE_MULTIPLIER_MAX = 1.42;
export const RANK_ACCURACY_BONUS_PER_GAP = 2.5;
export const RANK_CRIT_BONUS_PER_GAP = 1.2;
