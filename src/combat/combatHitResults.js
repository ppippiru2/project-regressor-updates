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
  return critical ? 6 : 3;
}

export function applySkillBreakDamage(targetState, skill, clampValue) {
  if (!skill?.breakPower || !targetState || targetState.breakGauge <= 0) {
    return { triggered: false };
  }

  const beforeBreak = targetState.breakGauge;
  targetState.breakGauge = clampValue(targetState.breakGauge - skill.breakPower * 12, 0, 100);
  return { triggered: beforeBreak > 0 && targetState.breakGauge === 0 };
}
