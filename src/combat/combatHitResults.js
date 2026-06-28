import { BREAK_GAUGE_BALANCE, HYPER_CHARGE_BALANCE } from "../balance/combatBalance.js?v=490";

export function advanceHitCombo(state, now = Date.now()) {
  state.hitCount += 1;
  state.lastHitAt = now;
}

export function resetHitComboState(state) {
  const hadCombo = state.hitCount !== 0 || state.lastHitAt !== 0;
  state.hitCount = 0;
  state.lastHitAt = 0;
  return hadCombo;
}

export function playerHyperChargeFromSuccessfulHit(critical) {
  return critical ? HYPER_CHARGE_BALANCE.playerSuccessfulHit.critical : HYPER_CHARGE_BALANCE.playerSuccessfulHit.normal;
}

export function applySkillBreakDamage(targetState, skill, clampValue) {
  if (!skill?.breakPower || !targetState || targetState.breakGauge <= 0) {
    return { triggered: false };
  }

  const beforeBreak = targetState.breakGauge;
  targetState.breakGauge = clampValue(
    targetState.breakGauge - skill.breakPower * BREAK_GAUGE_BALANCE.skillGaugeDamagePerPower,
    0,
    BREAK_GAUGE_BALANCE.bossInitialGauge
  );
  return { triggered: beforeBreak > 0 && targetState.breakGauge === 0 };
}



