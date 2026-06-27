import { t, tf } from "../localization/index.js?v=416";

export function setupCollapsiblePanels(uiState, saveUiState) {
  ensurePanelUiState(uiState);
  document.querySelectorAll("[data-panel-id]").forEach((panel) => {
    if (panel.querySelector(".collapse-toggle")) {
      applyPanelCollapseState(panel, uiState);
      return;
    }

    const title = panel.dataset.panelTitle || t("panels.defaultTitle");
    const label = document.createElement("div");
    label.className = "collapsed-panel-label";
    label.textContent = title;

    const button = document.createElement("button");
    button.type = "button";
    button.className = "collapse-toggle";
    button.setAttribute("aria-label", tf("panels.collapseLabel", { title }));
    button.addEventListener("click", () => togglePanel(panel, uiState, saveUiState));

    panel.prepend(label);
    panel.prepend(button);
    applyPanelCollapseState(panel, uiState);
  });
}

function togglePanel(panel, uiState, saveUiState) {
  ensurePanelUiState(uiState);
  const panelId = panel.dataset.panelId;
  if (!panelId) return;

  const collapsed = new Set(uiState.collapsedPanels);
  const expandedDefault = new Set(uiState.expandedDefaultPanels);
  const isCollapsed = isPanelCollapsed(panel, uiState);

  if (isCollapsed) {
    collapsed.delete(panelId);
    if (isDefaultCollapsed(panel)) expandedDefault.add(panelId);
  } else {
    collapsed.add(panelId);
    if (isDefaultCollapsed(panel)) expandedDefault.delete(panelId);
  }

  uiState.collapsedPanels = [...collapsed];
  uiState.expandedDefaultPanels = [...expandedDefault];
  saveUiState();
  applyPanelCollapseState(panel, uiState);
}

function applyPanelCollapseState(panel, uiState) {
  ensurePanelUiState(uiState);
  const title = panel.dataset.panelTitle || t("panels.defaultTitle");
  const collapsed = isPanelCollapsed(panel, uiState);
  const button = panel.querySelector(".collapse-toggle");

  panel.classList.toggle("is-collapsed", collapsed);
  if (button) {
    button.textContent = collapsed ? "+" : "−";
    button.setAttribute("aria-expanded", String(!collapsed));
    button.setAttribute(
      "aria-label",
      collapsed ? tf("panels.expandLabel", { title }) : tf("panels.collapseLabel", { title }),
    );
  }
}

function isPanelCollapsed(panel, uiState) {
  const panelId = panel.dataset.panelId;
  if (!panelId) return false;
  if (uiState.collapsedPanels.includes(panelId)) return true;
  return isDefaultCollapsed(panel) && !uiState.expandedDefaultPanels.includes(panelId);
}

function isDefaultCollapsed(panel) {
  return panel.dataset.panelDefaultCollapsed === "true";
}

function ensurePanelUiState(uiState) {
  if (!Array.isArray(uiState.collapsedPanels)) uiState.collapsedPanels = [];
  if (!Array.isArray(uiState.expandedDefaultPanels)) uiState.expandedDefaultPanels = [];
}
