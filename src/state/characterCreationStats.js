import { INITIAL_CREATION_STAT_BALANCE } from "../balance/playerGrowthBalance.js?v=675";

export const CREATION_STAT_KEYS = Object.freeze(["STR", "AGI", "VIT", "INT", "WIS", "LUK"]);

const INITIAL_STAT_TOTAL = INITIAL_CREATION_STAT_BALANCE.total;
const INITIAL_STAT_TOTAL_RANGE = INITIAL_CREATION_STAT_BALANCE.totalRange || {
  min: INITIAL_STAT_TOTAL,
  max: INITIAL_STAT_TOTAL,
};
const INITIAL_STAT_VALUES = INITIAL_CREATION_STAT_BALANCE.startingStats;
const MIN_STAT_VALUES = INITIAL_CREATION_STAT_BALANCE.minValues || INITIAL_STAT_VALUES;
const MAX_STAT_VALUE = 10;

export function createBalancedCreationStats() {
  return Object.fromEntries(CREATION_STAT_KEYS.map((stat) => [stat, INITIAL_STAT_VALUES?.[stat] ?? 1]));
}

export function rollInitialCreationStats() {
  const stats = Object.fromEntries(CREATION_STAT_KEYS.map((stat) => [stat, MIN_STAT_VALUES?.[stat] ?? 1]));
  const targetTotal = randomInitialStatTotal();
  let remaining = targetTotal - creationStatTotal(stats);
  while (remaining > 0) {
    const candidates = CREATION_STAT_KEYS.filter((stat) => stats[stat] < MAX_STAT_VALUE);
    if (!candidates.length) break;
    const stat = candidates[Math.floor(Math.random() * candidates.length)];
    stats[stat] += 1;
    remaining -= 1;
  }
  return stats;
}

export function creationStatTotal(stats) {
  return CREATION_STAT_KEYS.reduce((total, stat) => total + (Number(stats?.[stat]) || 0), 0);
}

function randomInitialStatTotal() {
  const min = Math.max(creationStatTotal(MIN_STAT_VALUES), Math.floor(Number(INITIAL_STAT_TOTAL_RANGE.min) || INITIAL_STAT_TOTAL));
  const max = Math.max(min, Math.floor(Number(INITIAL_STAT_TOTAL_RANGE.max) || INITIAL_STAT_TOTAL));
  return min + Math.floor(Math.random() * (max - min + 1));
}
