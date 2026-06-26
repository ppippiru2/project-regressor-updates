export function resolveActiveSkillLoadout(skillLoadouts = [], activeSkillLoadoutId = "") {
  return skillLoadouts.find((loadout) => loadout.id === activeSkillLoadoutId) || skillLoadouts[0] || null;
}

export function hasSkillLoadout(skillLoadouts = [], loadoutId = "") {
  return skillLoadouts.some((loadout) => loadout.id === loadoutId);
}

export function resolveActiveLoadoutActions(loadout, actions = [], fallbackAction = null) {
  const selected = (loadout?.actionIds || [])
    .map((actionId) => actions.find((action) => action.id === actionId))
    .filter((action, index, list) => action && list.findIndex((entry) => entry.id === action.id) === index);
  if (selected.length) return selected;
  return fallbackAction ? [fallbackAction] : [];
}

export function resolveActiveLoadoutSkills(loadoutActions = [], skillCatalog = []) {
  const actionIds = new Set(loadoutActions.map((action) => action.id));
  return skillCatalog.filter((skill) => actionIds.has(skill.id));
}
