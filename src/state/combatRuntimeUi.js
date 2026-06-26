export function triggerCombatActionFlash(combatRuntime, now = Date.now()) {
  combatRuntime.flashUntil = now + 260;
}

export function markCombatActionUsed(combatRuntime, skill, now = Date.now()) {
  combatRuntime.lastActionId = skill?.id || "basic_attack";
  combatRuntime.actionFlashUntil = now + 1800;
}

export function showCombatActionInfo(combatRuntime, actionId, now = Date.now()) {
  combatRuntime.visibleActionInfoId = actionId;
  combatRuntime.visibleCombatHelpId = null;
  combatRuntime.suppressCombatInfoHideUntil = now + 80;
}

export function showCombatHelpInfo(combatRuntime, helpId, now = Date.now()) {
  combatRuntime.visibleCombatHelpId = helpId;
  combatRuntime.visibleActionInfoId = null;
  combatRuntime.suppressCombatInfoHideUntil = now + 80;
}

export function hideCombatInfoIfAllowed(combatRuntime, now = Date.now()) {
  if (now < combatRuntime.suppressCombatInfoHideUntil) return false;
  if (!combatRuntime.visibleActionInfoId && !combatRuntime.visibleCombatHelpId) return false;

  combatRuntime.visibleActionInfoId = null;
  combatRuntime.visibleCombatHelpId = null;
  return true;
}
