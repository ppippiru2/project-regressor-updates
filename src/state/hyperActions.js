import { activateEnemyHyperState, endEnemyHyperState, endPlayerHyperState } from "../combat/hyperState.js";
import { t, tf } from "../localization/index.js?v=467";

export function activatePlayerHyperMode(state, durationSeconds, maxHyp) {
  if (state.hyp < maxHyp || state.hyperActiveTicks > 0 || state.hyperCooldown > 0) {
    return { activated: false, message: "" };
  }

  state.hyperDuration = durationSeconds;
  state.hyperActiveTicks = durationSeconds;

  return {
    activated: true,
    message: t("hyperActions.playerActivated"),
  };
}

export function endPlayerHyperMode(state, combatRuntime, cooldownSeconds) {
  endPlayerHyperState(state, combatRuntime, cooldownSeconds);
  return t("hyperActions.playerEnded");
}

export function activateEnemyHyperMode(combatRuntime, monster, durationSeconds, maxHyp) {
  activateEnemyHyperState(combatRuntime, durationSeconds, maxHyp);
  return tf("hyperActions.enemyActivated", { monsterName: monster.name });
}

export function endEnemyHyperMode(combatRuntime, monster, cooldownSeconds) {
  endEnemyHyperState(combatRuntime, cooldownSeconds);
  return tf("hyperActions.enemyEnded", { monsterName: monster.name });
}

