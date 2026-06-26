function bindClick(id, handler) {
  const element = document.getElementById(id);
  if (element) element.addEventListener("click", handler);
}

export function bindCombatControlEvents({ onToggleCombat, onToggleAutoHunt, onRest, onStartBoss, onClearLog }) {
  bindClick("hunt-button", onToggleCombat);
  bindClick("auto-toggle-button", onToggleAutoHunt);
  bindClick("rest-button", onRest);
  bindClick("boss-button", onStartBoss);
  bindClick("clear-log-button", onClearLog);
}
