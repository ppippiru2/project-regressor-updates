export const COMBAT_ACTION_ALIASES = Object.freeze({
  heavy_strike: "power_slash",
  magic_bolt: "mana_bolt",
  emergency_heal: "emergency_recovery",
});

export function buildCombatActionList(basicAttackAction, skills) {
  return [
    basicAttackAction,
    ...skills,
  ];
}

export function normalizeCombatActionId(actionId) {
  const id = String(actionId || "");
  return COMBAT_ACTION_ALIASES[id] || id;
}

export function findCombatAction(actionId, actions) {
  const normalizedActionId = normalizeCombatActionId(actionId);
  return actions.find((action) => (
    action.id === normalizedActionId ||
    action.actionAlias === actionId ||
    action.actionAlias === normalizedActionId
  )) || actions[0];
}

export function combatActionTriggerText(action, { basicAttackAction, triggerText, stanceLabel }) {
  if (action.id === basicAttackAction.id) return triggerText.basicAttack;
  if (action.triggerCondition === "playerHpBelow45") return triggerText.playerHpBelow45;
  if (action.triggerCondition === "playerHpBelow30") return triggerText.playerHpBelow30;
  return `${stanceLabel} ${triggerText.stanceAutoSuffix}`;
}

export function attackEffectType(skill, weapon) {
  return skill?.effectType || weapon?.defaultEffectType || "impact";
}

export function equippedWeapon(equipmentState, getItem) {
  const weaponEntry = equipmentState.Weapon;
  return weaponEntry ? getItem(weaponEntry.itemId) : null;
}
