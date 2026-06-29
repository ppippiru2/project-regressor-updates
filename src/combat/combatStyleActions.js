export const COMBAT_STYLE_ACTION_IDS = Object.freeze(["preserve", "full_power", "rampage"]);

export function isCombatStyleAction(actionId) {
  return COMBAT_STYLE_ACTION_IDS.includes(String(actionId || ""));
}

export function combatStyleActiveBuffId(actionId) {
  if (actionId === "preserve") return "preserve_guard";
  if (actionId === "full_power") return "full_power";
  if (actionId === "rampage") return "rampage";
  return "";
}

export function activeCombatStyleBuffIds(combatRuntime) {
  return new Set(
    (combatRuntime?.playerBuffs || [])
      .filter((buff) => Math.max(0, Number(buff?.remainingTurns || 0)) > 0)
      .map((buff) => buff.id)
      .filter(Boolean),
  );
}

export function isCombatStyleActive(actionId, combatRuntime) {
  const buffId = combatStyleActiveBuffId(actionId);
  return Boolean(buffId && activeCombatStyleBuffIds(combatRuntime).has(buffId));
}
