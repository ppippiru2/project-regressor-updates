export function getEditorPanels(manifest = {}) {
  return Array.isArray(manifest.panels) ? manifest.panels : [];
}

export function getInitialEditorPanelId(manifest = {}) {
  return getEditorPanels(manifest)[0]?.id || "";
}

export function findEditorPanelById(manifest = {}, panelId = "") {
  const panels = getEditorPanels(manifest);
  return panels.find((panel) => panel.id === panelId) || panels[0] || null;
}
