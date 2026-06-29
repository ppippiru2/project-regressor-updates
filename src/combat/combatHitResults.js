import { BREAK_GAUGE_BALANCE, HYPER_CHARGE_BALANCE, WEAKNESS_BALANCE } from "../balance/combatBalance.js?v=573";

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
  if (!skill?.breakPower || !targetState || targetState.breakGauge <= 0 || isTargetWeak(targetState)) {
    return { triggered: false };
  }

  const beforeBreak = targetState.breakGauge;
  const maxBreakGauge = Number(targetState.breakGaugeMax || BREAK_GAUGE_BALANCE.bossInitialGauge);
  targetState.breakGauge = clampValue(
    targetState.breakGauge - skill.breakPower * BREAK_GAUGE_BALANCE.skillGaugeDamagePerPower,
    0,
    maxBreakGauge
  );
  return { triggered: beforeBreak > 0 && targetState.breakGauge === 0 };
}

export function activateTargetWeakness(targetState, now = Date.now()) {
  if (!targetState) return false;
  targetState.weaknessUntil = Math.max(
    Number(targetState.weaknessUntil || 0),
    now + WEAKNESS_BALANCE.durationSeconds * 1000,
  );
  targetState.weaknessStrikeCount = 0;
  return true;
}

export function advanceTargetWeaknessState(targetState, now = Date.now()) {
  if (!targetState?.weaknessUntil || targetState.weaknessUntil > now) return false;
  targetState.weaknessUntil = 0;
  targetState.weaknessStrikeCount = 0;
  if (Number(targetState.breakGaugeMax || 0) > 0 && targetState.breakGauge <= 0) {
    targetState.breakGauge = targetState.breakGaugeMax;
  }
  return true;
}

export function isTargetWeak(targetState, now = Date.now()) {
  return Boolean(targetState?.weaknessUntil && targetState.weaknessUntil > now);
}

export function calculateWeaknessSkillDamageMultiplier(skill, targetState, now = Date.now()) {
  if (!skill || skill.damageType === "support" || !isTargetWeak(targetState, now)) {
    return {
      active: false,
      multiplier: 1,
      strikeChainBonus: 0,
      strikeIndex: 0,
    };
  }

  const skillMultiplier = Number(skill.multiplier || 1);
  const breakPower = Number(skill.breakPower || 0);
  const strikeIndex = Number(targetState.weaknessStrikeCount || 0) + 1;
  const strikeChainBonus = Math.min(
    WEAKNESS_BALANCE.maxStrikeChainBonus,
    Math.max(0, strikeIndex - 1) * WEAKNESS_BALANCE.strikeChainScale,
  );
  const rawMultiplier =
    WEAKNESS_BALANCE.baseSkillDamageMultiplier +
    Math.max(0, skillMultiplier - 1) * WEAKNESS_BALANCE.skillMultiplierScale +
    Math.max(0, breakPower) * WEAKNESS_BALANCE.breakPowerScale +
    strikeChainBonus;
  const multiplier = Math.min(WEAKNESS_BALANCE.maxSkillDamageMultiplier, rawMultiplier);
  return {
    active: true,
    multiplier,
    strikeChainBonus,
    strikeIndex,
  };
}

export function applyWeaknessSkillDamageBonus(result, skill, targetState, now = Date.now()) {
  if (!result || result.missed) {
    return {
      result,
      applied: false,
      multiplier: 1,
    };
  }

  const weaknessMultiplier = calculateWeaknessSkillDamageMultiplier(skill, targetState, now);
  if (!weaknessMultiplier.active) {
    return {
      result,
      applied: false,
      multiplier: 1,
    };
  }

  const multiplier = weaknessMultiplier.multiplier;
  const damage = Math.max(1, Math.floor(result.damage * multiplier));
  targetState.weaknessStrikeCount = weaknessMultiplier.strikeIndex;

  return {
    result: {
      ...result,
      damage,
      weakness: true,
      weaknessMultiplier: multiplier,
      weaknessStrikeChainBonus: weaknessMultiplier.strikeChainBonus,
      weaknessStrikeCount: targetState.weaknessStrikeCount,
    },
    applied: true,
    multiplier,
  };
}



