import { applyLevelUps } from "./rewards.js";
import { newlyUnlockedRegions } from "./regionSelection.js?v=452";
import { tf } from "../localization/index.js?v=452";

export function applyPendingLevelUps(player, context) {
  const { expToNext, getResourceCaps } = context;
  return applyLevelUps(player, expToNext, getResourceCaps).map(formatLevelUpMessage);
}

export function applyPendingLevelProgression({ player, regions, expToNext, getResourceCaps }) {
  const beforeLevel = player.level;
  const messages = applyPendingLevelUps(player, { expToNext, getResourceCaps });
  return [
    ...messages,
    ...newlyUnlockedRegions(regions, beforeLevel, player.level).map((region) =>
      tf("gameLog.newRegionUnlocked", { regionName: region.name })
    ),
  ];
}

export function formatLevelUpMessage(level) {
  return tf("stateMessages.levelReached", { level });
}

