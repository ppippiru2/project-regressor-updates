export function buildCombatActionList(basicAttackAction, skills) {
  return [
    basicAttackAction,
    ...skills,
  ];
}

export function findCombatAction(actionId, actions) {
  return actions.find((action) => action.id === actionId) || actions[0];
}

export function combatActionTriggerText(action, { basicAttackAction, triggerText, stanceLabel }) {
  if (action.id === basicAttackAction.id) return triggerText.basicAttack;
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
