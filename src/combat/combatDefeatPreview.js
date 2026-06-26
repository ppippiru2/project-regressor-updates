import { AUTO_RESTART_DELAY_MS } from "./combatState.js";
import { clamp } from "./combatFormula.js";
import { DEFEATED_TARGET_PREVIEW_MIN_VISIBLE_MS } from "./combatDisplayConfig.js?v=345";

export function createDefeatedTargetPreview({
  monster,
  stats,
  targetState,
  now = Date.now(),
  restartDelayMs = AUTO_RESTART_DELAY_MS,
  minVisibleMs = DEFEATED_TARGET_PREVIEW_MIN_VISIBLE_MS,
}) {
  return {
    monsterId: monster.id,
    hp: 0,
    mp: clamp(targetState?.mp ?? 0, 0, stats.maxMp),
    visibleUntil: now + Math.max(restartDelayMs, minVisibleMs),
  };
}
