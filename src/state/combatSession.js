import { createCombatTarget } from "../combat/combatState.js";
import { t } from "../localization/index.js?v=368";

export function startCombatSession(state, monster, stats) {
  if (state.inCombat) return false;

  state.resting = false;
  state.target = createCombatTarget(monster, stats);
  state.inCombat = true;
  if (state.autoHunt) markOfflineAutoHuntEngaged(state);
  return true;
}

export function stopCombatSession(state) {
  state.inCombat = false;
  state.target = null;
}

export function toggleAutoHuntState(state) {
  state.autoHunt = !state.autoHunt;
  if (state.autoHunt) {
    state.resting = false;
    if (state.inCombat) markOfflineAutoHuntEngaged(state);
  } else {
    state.offlineAutoHuntEligible = false;
    state.offlineAutoHuntEngagedAt = 0;
  }
  return {
    enabled: state.autoHunt,
    message: state.autoHunt ? t("stateMessages.autoHuntEnabled") : t("stateMessages.autoHuntDisabled"),
  };
}

export function shouldContinueAutoHunt(state, monster) {
  return Boolean(state.autoHunt && !monster?.isBoss);
}

export function shouldRestartAutoHunt(state) {
  return Boolean(state.autoHunt && !state.inCombat && !state.resting);
}

function markOfflineAutoHuntEngaged(state) {
  state.offlineAutoHuntEligible = true;
  state.offlineAutoHuntEngagedAt = Date.now();
}
