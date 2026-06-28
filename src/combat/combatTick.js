import { clamp } from "./combatFormula.js";
import { advanceTargetWeaknessState } from "./combatHitResults.js?v=530";

export function combatElapsedSeconds(now, lastFrameAt) {
  return Math.max(0.04, Math.min(0.25, (now - (lastFrameAt || now)) / 1000));
}

export function beginCombatFrame(combatRuntime, now = Date.now()) {
  const elapsedSeconds = combatElapsedSeconds(now, combatRuntime.lastFrameAt);
  combatRuntime.lastFrameAt = now;
  return elapsedSeconds;
}

export function regenerateCombatResources(state, player, enemy, elapsedSeconds) {
  state.player.mp = clamp((state.player.mp || 0) + player.mpRegen * elapsedSeconds, 0, player.maxMp);
  state.target.mp = clamp((state.target.mp ?? enemy.maxMp) + enemy.mpRegen * elapsedSeconds, 0, enemy.maxMp);
}

export function advanceActionGauge(current, attackSpeed, elapsedSeconds) {
  return clamp(current + attackSpeed * elapsedSeconds * 100, 0, 100);
}

export function advanceCombatActionGauges(combatRuntime, player, enemy, elapsedSeconds) {
  combatRuntime.playerAction = advanceActionGauge(combatRuntime.playerAction, player.attackSpeed, elapsedSeconds);
  combatRuntime.enemyAction = advanceActionGauge(combatRuntime.enemyAction, enemy.attackSpeed, elapsedSeconds);
}

export function shouldAdvanceAutoCombatActions(state, combatRuntime) {
  return Boolean(state?.autoHunt && combatRuntime && !combatRuntime.inputLocked);
}

export function advanceCombatFrameRuntime({ state, combatRuntime, player, enemy }) {
  const elapsedSeconds = beginCombatFrame(combatRuntime);

  regenerateCombatResources(state, player, enemy, elapsedSeconds);
  advanceActionCooldowns(combatRuntime);
  const weaknessEnded = advanceTargetWeaknessState(state.target);
  const playerHyperEnded = advancePlayerHyperState(state, elapsedSeconds) === "ended";
  const enemyHyperEnded = advanceEnemyHyperState(combatRuntime, elapsedSeconds) === "ended";
  if (shouldAdvanceAutoCombatActions(state, combatRuntime)) advanceCombatActionGauges(combatRuntime, player, enemy, elapsedSeconds);

  return {
    elapsedSeconds,
    weaknessEnded,
    playerHyperEnded,
    enemyHyperEnded,
  };
}

export function consumeReadyPlayerAction(combatRuntime) {
  if (combatRuntime.playerAction < 100) return false;
  combatRuntime.playerAction = 0;
  return true;
}

export function consumeReadyEnemyAction(combatRuntime) {
  if (combatRuntime.enemyAction < 100) return false;
  combatRuntime.enemyAction = 0;
  return true;
}

export function advanceActionCooldowns(combatRuntime, now = Date.now()) {
  const cooldowns = combatRuntime?.actionCooldowns;
  if (!cooldowns || typeof cooldowns !== "object") return;
  for (const [actionId, value] of Object.entries(cooldowns)) {
    if (Number(value || 0) <= now) delete cooldowns[actionId];
  }
}

export function advancePlayerHyperState(state, elapsedSeconds) {
  const wasActive = state.hyperActiveTicks > 0;
  if (state.hyperActiveTicks > 0) state.hyperActiveTicks = Math.max(0, state.hyperActiveTicks - elapsedSeconds);
  if (wasActive && state.hyperActiveTicks <= 0) return "ended";
  if (state.hyperCooldown > 0) state.hyperCooldown = Math.max(0, state.hyperCooldown - elapsedSeconds);
  return "running";
}

export function advanceEnemyHyperState(combatRuntime, elapsedSeconds) {
  const wasActive = combatRuntime.enemyHyperActiveTicks > 0;
  if (combatRuntime.enemyHyperActiveTicks > 0) {
    combatRuntime.enemyHyperActiveTicks = Math.max(0, combatRuntime.enemyHyperActiveTicks - elapsedSeconds);
  }
  if (wasActive && combatRuntime.enemyHyperActiveTicks <= 0) return "ended";
  if (combatRuntime.enemyHyperCooldown > 0) {
    combatRuntime.enemyHyperCooldown = Math.max(0, combatRuntime.enemyHyperCooldown - elapsedSeconds);
  }
  return "running";
}
