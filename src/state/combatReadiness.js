import { COMBAT_READINESS_THRESHOLDS } from "./growthObjectiveConfig.js?v=531";
import { t, tf } from "../localization/index.js?v=531";

export function createCombatReadiness({
  region,
  regions,
  playerState,
  player,
  bossMonster,
  bossStats,
  expToNext,
  rankFromPower,
}) {
  if (bossMonster && bossStats) {
    const damageThresholdPercent = Number(region?.bossDamageThresholdPercent || 0);
    const isDamageThresholdBoss = damageThresholdPercent > 0;
    const levelGap = bossMonster.level - playerState.level;
    const powerRatio = bossStats.power > 0 ? player.power / bossStats.power : 1;
    const progress = clampPercent(powerRatio * 100);
    const ready = levelGap <= 0 && powerRatio >= COMBAT_READINESS_THRESHOLDS.readyPowerRatio;
    const caution =
      levelGap <= COMBAT_READINESS_THRESHOLDS.cautionLevelGap ||
      powerRatio >= COMBAT_READINESS_THRESHOLDS.cautionPowerRatio;
    const state = ready ? "ready" : caution ? "caution" : "locked";

    return {
      state,
      kind: "boss",
      hidden: false,
      eyebrow: t("combatReadiness.eyebrow"),
      title: isDamageThresholdBoss
        ? t("combatReadiness.damageThresholdBossTitle")
        : t("combatReadiness.bossTitle"),
      detail: isDamageThresholdBoss
        ? tf(ready ? "combatReadiness.damageThresholdReadyDetail" : "combatReadiness.damageThresholdLockedDetail", {
            percent: damageThresholdPercent,
          })
        : ready
          ? t("combatReadiness.bossReadyDetail")
          : t("combatReadiness.bossLockedDetail"),
      progress,
      meta: [
        ...(isDamageThresholdBoss
          ? [tf("combatReadiness.damageThreshold", { percent: damageThresholdPercent })]
          : []),
        tf("combatReadiness.recommendedLevel", { level: bossMonster.level }),
        tf("combatReadiness.recommendedRank", { rank: rankFromPower(bossStats.power) }),
        tf("combatReadiness.powerPercent", { percent: progress }),
      ],
    };
  }

  const nextRegion = [...regions]
    .filter((candidate) => candidate.recommendedLevel > playerState.level)
    .sort((left, right) => left.recommendedLevel - right.recommendedLevel)[0];

  if (!nextRegion) {
    return {
      state: "ready",
      kind: "final",
      hidden: true,
      eyebrow: t("combatReadiness.eyebrow"),
      title: t("combatReadiness.finalTitle"),
      detail: tf("combatReadiness.finalDetail", { regionName: region.name }),
      progress: 100,
      meta: [t("combatReadiness.levelReady"), tf("combatReadiness.rank", { rank: rankFromPower(player.power) })],
    };
  }

  const remainingExp = expNeededToReachLevel(playerState.level, playerState.exp, nextRegion.recommendedLevel, expToNext);
  const totalExp = expNeededToReachLevel(playerState.level, 0, nextRegion.recommendedLevel, expToNext);
  const progress = totalExp > 0 ? clampPercent(((totalExp - remainingExp) / totalExp) * 100) : 100;
  const hasEarlyProgress = progress > 0 || playerState.level > (region?.recommendedLevel || 1);

  return {
    state: progress >= 100 ? "ready" : "locked",
    kind: "next-region",
    hidden: !hasEarlyProgress,
    eyebrow: t("combatReadiness.eyebrow"),
    title: t("combatReadiness.nextRegionProgressTitle"),
    detail: tf("combatReadiness.nextRegionDetail", {
      regionName: nextRegion.name,
      exp: remainingExp.toLocaleString(),
    }),
    progress,
    meta: [
      tf("combatReadiness.targetLevel", { level: nextRegion.recommendedLevel }),
      tf("combatReadiness.progress", { percent: progress }),
    ],
  };
}

function expNeededToReachLevel(currentLevel, currentExp, targetLevel, expToNext) {
  if (targetLevel <= currentLevel) return 0;
  let needed = Math.max(0, expToNext(currentLevel) - currentExp);
  for (let level = currentLevel + 1; level < targetLevel; level += 1) {
    needed += expToNext(level);
  }
  return needed;
}

function clampPercent(value) {
  return Math.max(0, Math.min(100, Math.round(value)));
}



