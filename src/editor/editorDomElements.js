export const EDITOR_ELEMENT_IDS = {
  nav: "editor-panel-nav",
  summaryTitle: "editor-summary-title",
  summaryCopy: "editor-summary-copy",
  metrics: "editor-metrics",
  panelDetail: "editor-panel-detail",
  assetGrid: "editor-asset-grid",
  saveGrid: "editor-save-grid",
  prototypeList: "editor-prototype-list",
  backlogList: "editor-backlog-list",
  exportSummary: "editor-export-summary",
  refreshSaves: "editor-refresh-saves",
  downloadManifest: "editor-download-manifest",
  downloadBacklog: "editor-download-backlog",
};

export function getEditorElements(documentRef = document) {
  return Object.fromEntries(
    Object.entries(EDITOR_ELEMENT_IDS).map(([key, id]) => [key, documentRef.getElementById(id)]),
  );
}
