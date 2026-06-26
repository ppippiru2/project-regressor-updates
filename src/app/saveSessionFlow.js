export function finalizeSaveSessionTransition({
  message = "",
  persist,
  setupPanels,
  render,
  afterRender,
  startObjectiveTicker,
  startRecoveryLoop,
  setSaveStatus,
  resumeSavedCombatLoop,
}) {
  persist?.();
  setupPanels?.();
  render?.();
  afterRender?.();
  startObjectiveTicker?.();
  startRecoveryLoop?.();
  if (message) setSaveStatus?.(message);
  resumeSavedCombatLoop?.();
}
