export function canChargePlayerHyper(state) {
  return state.hyperActiveTicks <= 0 && state.hyperCooldown <= 0;
}

export function chargePlayerHyper(state, amount, multiplier, maxHyp) {
  if (!canChargePlayerHyper(state)) return;
  state.hyp = Math.min(Math.max(state.hyp + amount * multiplier, 0), maxHyp);
}

export function chargeEnemyHyper(combatRuntime, amount, multiplier, maxHyp) {
  if (combatRuntime.enemyHyperActiveTicks > 0 || combatRuntime.enemyHyperCooldown > 0) return false;
  combatRuntime.enemyHyp = Math.min(Math.max(combatRuntime.enemyHyp + amount * multiplier, 0), maxHyp);
  return combatRuntime.enemyHyp >= maxHyp;
}

export function endPlayerHyperState(state, combatRuntime, cooldownSeconds) {
  state.hyperActiveTicks = 0;
  state.hyperDuration = 0;
  state.hyp = 0;
  state.hyperCooldown = cooldownSeconds;
  combatRuntime.hyperEndFlashUntil = Date.now() + 620;
}

export function activateEnemyHyperState(combatRuntime, durationSeconds, maxHyp) {
  combatRuntime.enemyHyperDuration = durationSeconds;
  combatRuntime.enemyHyperActiveTicks = durationSeconds;
  combatRuntime.enemyHyp = maxHyp;
}

export function endEnemyHyperState(combatRuntime, cooldownSeconds) {
  combatRuntime.enemyHyperActiveTicks = 0;
  combatRuntime.enemyHyperDuration = 0;
  combatRuntime.enemyHyp = 0;
  combatRuntime.enemyHyperCooldown = cooldownSeconds;
  combatRuntime.enemyHyperEndFlashUntil = Date.now() + 620;
}
