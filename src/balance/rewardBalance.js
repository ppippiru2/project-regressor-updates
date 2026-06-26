export const LEVEL_UP_AUTO_STATS = ["STR", "AGI", "VIT", "INT", "WIS"];

export const REWARD_MULTIPLIER_MIN = 0;
export const REWARD_MULTIPLIER_MAX = 100;

export const REGION_EXP_MULTIPLIER_BY_OVERLEVEL = [
  { maxOverLevel: 2, multiplier: 1 },
  { maxOverLevel: 4, multiplier: 0.55 },
  { maxOverLevel: 7, multiplier: 0.25 },
  { maxOverLevel: 11, multiplier: 0.1 },
  { maxOverLevel: Infinity, multiplier: 0.03 },
];

export const OFFLINE_REWARD_BALANCE = {
  minOfflineMs: 60 * 1000,
  maxOfflineMs: 30 * 60 * 1000,
  killMs: 45 * 1000,
  dropRateMultiplier: 0.35,
};
