import { expToNext, monsterStats, rankCombatModifier, clamp } from "../combat/combatFormula.js?v=387";
import { primaryStats, skills } from "../data/coreData.js?v=387";
import { equipment } from "../data/equipmentData.js?v=387";
import { regions, monsters } from "../data/worldData.js?v=387";
import { PLAYER_INITIAL_STATS } from "../balance/playerGrowthBalance.js?v=387";
import { playerStats } from "../state/progression.js?v=387";
import { regionExpMultiplier } from "../state/rewards.js?v=387";

export const TUTORIAL_ISLAND_PACING_LIMITS = {
  bossLevelTargetOffset: 3,
  targetWindowMinutes: 30,
  reservedBossMinutes: 3,
  expectedRegionCount: 5,
  minLevelingKills: 60,
  maxLevelingKills: 90,
  minRequiredKillSeconds: 18,
  maxRequiredKillSeconds: 28,
  minTotalGold: 1500,
  maxTotalGold: 2500,
  maxPowerSlashMinutes: 20,
  maxBasicAttackMinutes: 30,
  minMonsterDropCount: 3,
  minNonBossTotalDropChance: 0.1,
  minBossTotalDropChance: 0.25,
  minCommonDropChance: 0.04,
};

export function createTutorialIslandPacingSnapshot() {
  const errors = [];
  const equipmentIds = new Set(equipment.map((item) => item.id));
  const monsterById = new Map(monsters.map((monster) => [monster.id, monster]));
  const powerSlashMultiplier = skills.find((skill) => skill.id === "power_slash")?.multiplier || 1.35;

  collect(
    errors,
    regions.length === TUTORIAL_ISLAND_PACING_LIMITS.expectedRegionCount,
    `Expected ${TUTORIAL_ISLAND_PACING_LIMITS.expectedRegionCount} tutorial regions, found ${regions.length}.`,
  );

  const rows = regions.map((region, index) => {
    const monster = monsterById.get(region.monsterId);
    const nextRegion = regions[index + 1] || null;
    const targetLevel = nextRegion?.recommendedLevel || ((monster?.level || region.recommendedLevel) + TUTORIAL_ISLAND_PACING_LIMITS.bossLevelTargetOffset);
    const combatEstimate = monster ? estimateCombatTime(region.recommendedLevel, monster, powerSlashMultiplier) : null;
    const progress = monster
      ? measureKillsToLevel({
        startLevel: region.recommendedLevel,
        targetLevel,
        region,
        monster,
        errors,
      })
      : null;

    collect(errors, Boolean(monster), `Region ${region.id} references missing monster ${region.monsterId}.`);
    if (index > 0) {
      collect(
        errors,
        region.recommendedLevel > regions[index - 1].recommendedLevel,
        `Region ${region.id} recommended level must increase from previous region.`,
      );
    }

    return {
      regionId: region.id,
      recommendedLevel: region.recommendedLevel,
      targetLevel,
      monsterId: monster?.id || "",
      monsterLevel: monster?.level || 0,
      expPerKillAtStart: monster ? Math.floor(monster.exp * regionExpMultiplier(region.recommendedLevel, region.recommendedLevel)) : 0,
      killsToTarget: progress?.kills || 0,
      basicTtkSeconds: combatEstimate?.basicTtkSeconds || 0,
      powerSlashTtkSeconds: combatEstimate?.powerSlashTtkSeconds || 0,
      goldToTarget: progress?.gold || 0,
    };
  });

  const bossMonster = monsters.find((monster) => monster.isBoss);
  collect(errors, Boolean(bossMonster), "Tutorial island must include one boss monster.");

  for (const monster of monsters) {
    validateDropTable(monster, equipmentIds, errors);
  }

  const totalKills = rows.reduce((sum, row) => sum + row.killsToTarget, 0);
  const totalGold = rows.reduce((sum, row) => sum + row.goldToTarget, 0);
  const noGearBasicMinutes = sumEstimatedMinutes(rows, "basicTtkSeconds");
  const noGearPowerSlashMinutes = sumEstimatedMinutes(rows, "powerSlashTtkSeconds");
  const levelingSecondsBudget = Math.max(1, (TUTORIAL_ISLAND_PACING_LIMITS.targetWindowMinutes - TUTORIAL_ISLAND_PACING_LIMITS.reservedBossMinutes) * 60);
  const requiredAverageKillSeconds = Number((levelingSecondsBudget / Math.max(1, totalKills)).toFixed(2));

  collect(
    errors,
    totalKills >= TUTORIAL_ISLAND_PACING_LIMITS.minLevelingKills && totalKills <= TUTORIAL_ISLAND_PACING_LIMITS.maxLevelingKills,
    `Tutorial leveling kills should stay ${TUTORIAL_ISLAND_PACING_LIMITS.minLevelingKills}-${TUTORIAL_ISLAND_PACING_LIMITS.maxLevelingKills}, found ${totalKills}.`,
  );
  collect(
    errors,
    totalGold >= TUTORIAL_ISLAND_PACING_LIMITS.minTotalGold && totalGold <= TUTORIAL_ISLAND_PACING_LIMITS.maxTotalGold,
    `Tutorial leveling base gold should stay ${TUTORIAL_ISLAND_PACING_LIMITS.minTotalGold}-${TUTORIAL_ISLAND_PACING_LIMITS.maxTotalGold}, found ${totalGold}.`,
  );
  collect(
    errors,
    requiredAverageKillSeconds >= TUTORIAL_ISLAND_PACING_LIMITS.minRequiredKillSeconds && requiredAverageKillSeconds <= TUTORIAL_ISLAND_PACING_LIMITS.maxRequiredKillSeconds,
    `Required average kill time should stay ${TUTORIAL_ISLAND_PACING_LIMITS.minRequiredKillSeconds}-${TUTORIAL_ISLAND_PACING_LIMITS.maxRequiredKillSeconds}s, found ${requiredAverageKillSeconds}s.`,
  );
  collect(
    errors,
    noGearPowerSlashMinutes <= TUTORIAL_ISLAND_PACING_LIMITS.maxPowerSlashMinutes,
    `No-gear power slash estimate should stay under ${TUTORIAL_ISLAND_PACING_LIMITS.maxPowerSlashMinutes}min, found ${noGearPowerSlashMinutes}min.`,
  );
  collect(
    errors,
    noGearBasicMinutes >= noGearPowerSlashMinutes && noGearBasicMinutes <= TUTORIAL_ISLAND_PACING_LIMITS.maxBasicAttackMinutes,
    `No-gear basic estimate should stay between power slash and ${TUTORIAL_ISLAND_PACING_LIMITS.maxBasicAttackMinutes}min, found ${noGearBasicMinutes}min.`,
  );

  return {
    isValid: errors.length === 0,
    errors,
    rows,
    totalKills,
    totalGold,
    requiredAverageKillSeconds,
    noGearBasicMinutes,
    noGearPowerSlashMinutes,
  };
}

function validateDropTable(monster, equipmentIds, errors) {
  const dropTable = Array.isArray(monster.dropTable) ? monster.dropTable : [];
  const totalChance = Number(dropTable.reduce((sum, drop) => sum + Number(drop.chance || 0), 0).toFixed(3));
  const commonChance = dropTable.reduce((max, drop) => Math.max(max, Number(drop.chance || 0)), 0);

  collect(errors, dropTable.length >= TUTORIAL_ISLAND_PACING_LIMITS.minMonsterDropCount, `${monster.id} must have at least ${TUTORIAL_ISLAND_PACING_LIMITS.minMonsterDropCount} drops.`);
  collect(
    errors,
    totalChance >= (monster.isBoss ? TUTORIAL_ISLAND_PACING_LIMITS.minBossTotalDropChance : TUTORIAL_ISLAND_PACING_LIMITS.minNonBossTotalDropChance),
    `${monster.id} total drop chance is too low: ${totalChance}.`,
  );
  collect(errors, commonChance >= TUTORIAL_ISLAND_PACING_LIMITS.minCommonDropChance, `${monster.id} needs at least one common drop at ${TUTORIAL_ISLAND_PACING_LIMITS.minCommonDropChance} or higher.`);

  for (const drop of dropTable) {
    collect(errors, equipmentIds.has(drop.itemId), `${monster.id} drops unknown item ${drop.itemId}.`);
    collect(errors, Number(drop.chance) > 0 && Number(drop.chance) <= 1, `${monster.id} drop ${drop.itemId} has invalid chance ${drop.chance}.`);
  }
}

function measureKillsToLevel({ startLevel, targetLevel, region, monster, errors }) {
  const player = {
    level: startLevel,
    exp: 0,
    gold: 0,
  };
  let kills = 0;
  const guard = 10000;

  while (player.level < targetLevel && kills < guard) {
    const multiplier = regionExpMultiplier(player.level, region.recommendedLevel);
    player.exp += Math.max(0, Math.floor(monster.exp * multiplier));
    player.gold += monster.gold;
    kills += 1;
    while (player.exp >= expToNext(player.level)) {
      player.exp -= expToNext(player.level);
      player.level += 1;
    }
  }

  collect(errors, kills < guard, `Level pacing loop hit guard for ${region.id}.`);

  return {
    kills,
    level: player.level,
    exp: player.exp,
    gold: player.gold,
  };
}

function estimateCombatTime(playerLevel, monster, powerSlashMultiplier) {
  const player = createNoGearPlayer(playerLevel);
  const playerPower = playerStats(player, []);
  const enemyPower = monsterStats(monster);
  return {
    basicTtkSeconds: expectedTimeToKill(playerPower, enemyPower, {
      multiplier: 1,
    }),
    powerSlashTtkSeconds: expectedTimeToKill(playerPower, enemyPower, {
      multiplier: powerSlashMultiplier,
    }),
  };
}

function createNoGearPlayer(level) {
  const autoLevels = Math.max(0, level - 1);
  return {
    level,
    stats: Object.fromEntries(
      primaryStats.map((stat) => [stat, (PLAYER_INITIAL_STATS?.[stat] ?? 1) + (stat === "LUK" ? 0 : autoLevels)])
    ),
  };
}

function expectedTimeToKill(player, enemy, action) {
  const rankModifier = rankCombatModifier(player.power, enemy.power);
  const accuracy = clamp(player.accuracy + rankModifier.accuracyBonus, 55, 99) / 100;
  const critChance = clamp(player.critRate + rankModifier.critBonus, 0, 60) / 100;
  const normalDamage = Math.max(1, player.attack * action.multiplier * rankModifier.damageMultiplier - enemy.defense * 0.45);
  const critDamage = normalDamage * (player.critDamage / 100);
  const expectedDamage = accuracy * (normalDamage * (1 - critChance) + critDamage * critChance);
  const attackInterval = 1 / Math.max(0.01, player.attackSpeed);
  return Number(((enemy.maxHp / Math.max(0.1, expectedDamage)) * attackInterval).toFixed(2));
}

function sumEstimatedMinutes(targetRows, ttkKey) {
  const seconds = targetRows.reduce((sum, row) => sum + row.killsToTarget * row[ttkKey], 0);
  return Number((seconds / 60).toFixed(1));
}

function collect(errors, condition, message) {
  if (condition) return;
  errors.push(message);
}
