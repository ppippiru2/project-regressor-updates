import { applyLevelUps } from "./rewards.js";
import { tf } from "../localization/index.js?v=280";

export function applyPendingLevelUps(player, context) {
  const { expToNext, getResourceCaps } = context;
  return applyLevelUps(player, expToNext, getResourceCaps).map(formatLevelUpMessage);
}

export function formatLevelUpMessage(level) {
  return tf("stateMessages.levelReached", { level });
}
