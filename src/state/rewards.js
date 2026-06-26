export const LEVEL_UP_AUTO_STATS = ["STR", "AGI", "VIT", "INT", "WIS"];

export function rollMonsterDrops(dropTable = [], dropRate = 1, random = Math.random) {
  return dropTable
    .filter((drop) => random() < drop.chance * dropRate)
    .map((drop) => drop.itemId);
}

export function applyLevelUps(player, expToNext, getResourceCaps, autoStats = LEVEL_UP_AUTO_STATS) {
  const gainedLevels = [];

  while (player.exp >= expToNext(player.level)) {
    player.exp -= expToNext(player.level);
    player.level += 1;
    player.freePoints += 5;
    for (const stat of autoStats) player.stats[stat] += 1;
    const caps = getResourceCaps();
    if (typeof caps === "number") {
      player.hp = caps;
    } else {
      player.hp = caps.maxHp;
      player.mp = caps.maxMp;
    }
    gainedLevels.push(player.level);
  }

  return gainedLevels;
}

export function applyMonsterRewards(player, monster, options = {}) {
  const multiplier = normalizeExpMultiplier(options.expMultiplier);
  const goldMultiplier = normalizeRewardMultiplier(options.goldMultiplier);
  const gainedExp = Math.max(0, Math.floor(monster.exp * multiplier));
  const gainedGold = Math.max(0, Math.floor(monster.gold * goldMultiplier));
  player.gold += gainedGold;
  player.exp += gainedExp;
  return {
    exp: gainedExp,
    baseExp: monster.exp,
    expMultiplier: multiplier,
    gold: gainedGold,
    baseGold: monster.gold,
    goldMultiplier,
  };
}

export function markRegionCompleted(completedRegions, regionId) {
  if (completedRegions.includes(regionId)) return false;
  completedRegions.push(regionId);
  return true;
}

export function regionExpMultiplier(playerLevel, recommendedLevel) {
  const overLevel = Number(playerLevel || 1) - Number(recommendedLevel || 1);
  if (overLevel <= 2) return 1;
  if (overLevel <= 4) return 0.55;
  if (overLevel <= 7) return 0.25;
  if (overLevel <= 11) return 0.1;
  return 0.03;
}

function normalizeExpMultiplier(value) {
  return normalizeRewardMultiplier(value);
}

function normalizeRewardMultiplier(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 1;
  return Math.max(0, Math.min(100, number));
}
