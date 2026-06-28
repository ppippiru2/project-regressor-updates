import { PLAYER_BASE_STAT_VALUE, PLAYER_BASE_STAT_VALUES } from "../balance/playerGrowthBalance.js?v=499";
import { LEVEL_UP_AUTO_STATS } from "./rewards.js";

export function minimumPlayerStatValue(player, stat) {
  const autoLevelUps = Math.max(0, (player.level || 1) - 1);
  const baseValue = PLAYER_BASE_STAT_VALUES?.[stat] ?? PLAYER_BASE_STAT_VALUE;
  return baseValue + (LEVEL_UP_AUTO_STATS.includes(stat) ? autoLevelUps : 0);
}

export function allocatedFreeStatPoints(player, stat) {
  const pending = ensurePendingStatAllocations(player);
  const pendingValue = Number.isFinite(pending[stat]) ? pending[stat] : 0;
  const current = Number.isFinite(player.stats?.[stat]) ? player.stats[stat] : 0;
  const safeLimit = Math.max(0, current - minimumPlayerStatValue(player, stat));
  return Math.min(pendingValue, safeLimit);
}

export function allocatePlayerStat(player, stat) {
  if (player.freePoints <= 0) return false;
  const pending = ensurePendingStatAllocations(player);
  player.stats[stat] += 1;
  player.freePoints -= 1;
  pending[stat] = (pending[stat] || 0) + 1;
  return true;
}

export function deallocatePlayerStat(player, stat, amount = 1) {
  const pending = ensurePendingStatAllocations(player);
  const removable = allocatedFreeStatPoints(player, stat);
  const total = Math.min(Math.max(0, amount), removable);
  if (total <= 0) return { changed: false, total: 0 };

  player.stats[stat] -= total;
  player.freePoints += total;
  pending[stat] = Math.max(0, (pending[stat] || 0) - total);
  return { changed: true, total };
}

export function resetAllocatedStats(player, statOrder) {
  let total = 0;
  const pending = ensurePendingStatAllocations(player);

  for (const stat of statOrder) {
    const removable = allocatedFreeStatPoints(player, stat);
    if (removable > 0) {
      player.stats[stat] -= removable;
      player.freePoints += removable;
      total += removable;
    }
    pending[stat] = 0;
  }

  return { changed: total > 0, total };
}

export function confirmAllocatedStats(player, statOrder) {
  const pending = ensurePendingStatAllocations(player);
  const total = statOrder.reduce((sum, stat) => sum + allocatedFreeStatPoints(player, stat), 0);
  if (total <= 0) return { changed: false, total: 0 };

  for (const stat of statOrder) {
    pending[stat] = 0;
  }

  return { changed: true, total };
}

export function allocateRecommendedStats(player, statOrder) {
  const availableStats = statOrder.filter((stat) => Number.isFinite(player.stats[stat]));
  if (player.freePoints <= 0 || availableStats.length === 0) {
    return { changed: false, total: 0, allocated: {} };
  }

  const allocated = {};
  let total = 0;

  while (player.freePoints > 0) {
    const stat = availableStats[total % availableStats.length];
    allocatePlayerStat(player, stat);
    allocated[stat] = (allocated[stat] || 0) + 1;
    total += 1;
  }

  return { changed: total > 0, total, allocated };
}

function ensurePendingStatAllocations(player) {
  if (!player.pendingStatAllocations || typeof player.pendingStatAllocations !== "object") {
    player.pendingStatAllocations = {};
  }
  return player.pendingStatAllocations;
}



