export function createEditorPanelContentSections(panel, renderers = {}) {
  if (!panel) return [];
  const panelId = panel.id || "";
  return [
    renderWhen(panelId === "theme_retarget_preview", renderers.retargetDetail),
    renderWhen(panelId === "balance_tuning_registry", renderers.balanceTuningDetail),
    renderWhen(panelId === "combat_vfx_placement_preview", renderers.combatVfxDetail),
    renderWhen(panelId === "initial_player", renderers.initialPlayerSetup),
    renderWhen(panelId === "asset_registry", renderers.monsterSpriteReport),
    renderWhen(panelId === "asset_registry", renderers.monsterRuntimePreview),
    renderWhen(panelId === "save_data", renderers.saveSlotDiagnostics),
  ];
}

function renderWhen(shouldRender, renderer) {
  if (!shouldRender || typeof renderer !== "function") return "";
  return renderer();
}
