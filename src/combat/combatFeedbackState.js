import { MAX_COMBAT_EFFECTS } from "./combatDisplayConfig.js?v=495";

export function shouldShowCombatText(feedbackSettings, type) {
  if (type === "damage" && !feedbackSettings.damage) return false;
  if (type === "critical" && !feedbackSettings.critical) return false;
  if (type === "miss" && !feedbackSettings.miss) return false;
  return true;
}

export function addCombatEffect(effects, { target, effectType, value, critical = false, type = "damage", hyper = false, placement = null }) {
  const now = Date.now();
  const id = `${now}_${Math.random().toString(16).slice(2)}`;
  return [
    {
      id,
      target,
      effectType,
      value,
      critical,
      type,
      hyper,
      placement,
      createdAt: now,
    },
    ...effects,
  ].slice(0, MAX_COMBAT_EFFECTS);
}

export function queueCombatTextEffect(
  effects,
  feedbackSettings,
  combatState,
  { type, value, target, effectType = "impact", critical = false, placement = null },
) {
  if (!shouldShowCombatText(feedbackSettings, type)) {
    return effects;
  }

  return addCombatEffect(effects, {
    target,
    effectType,
    value,
    critical,
    type,
    hyper: combatState.hyperActiveTicks > 0,
    placement,
  });
}



