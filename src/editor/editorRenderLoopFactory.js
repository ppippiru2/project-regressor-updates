import { renderEditorSummaryPanel } from "./editorSummaryPanel.js?v=679";
import { toggleEditorNavGroupCollapsed } from "./editorNavGroupState.js?v=679";
import { getEditorPanels } from "./editorPanelSelection.js?v=679";

export function createEditorRenderLoop({
  elements,
  getManifest,
  getBacklog,
  getActivePanelId,
  getCollapsedNavGroupIds,
  setCollapsedNavGroupIds,
  getText,
  translate,
  balanceGroups,
  getCombatVfxPreview,
  combatVfxText,
  collapseLabels,
  statusLabel,
  renderNavigationGroups,
  renderPanelDetail,
  overviewSections,
}) {
  function renderEditor() {
    const manifest = getManifest();
    const backlog = getBacklog();
    renderEditorSummaryPanel(elements, {
      manifest,
      backlog,
      text: getText(),
      translate,
      balanceGroups,
      combatVfxPreview: getCombatVfxPreview(),
      combatVfxText,
    });
    renderNav();
    renderPanelDetail();
    overviewSections.renderAssets();
    overviewSections.renderSaveKeys();
    overviewSections.renderPrototypeList();
    overviewSections.renderBacklog();
  }

  function renderNav() {
    const manifest = getManifest();
    elements.nav.innerHTML = renderNavigationGroups({
      groups: manifest?.editorTheme?.navigationGroups || [],
      panels: getEditorPanels(manifest),
      activePanelId: getActivePanelId(),
      collapsedGroupIds: getCollapsedNavGroupIds(),
      collapseLabels,
      statusLabel,
    });
  }

  function toggleCollapsedNavGroup(groupId) {
    setCollapsedNavGroupIds(toggleEditorNavGroupCollapsed(getCollapsedNavGroupIds(), groupId));
  }

  return {
    renderEditor,
    renderNav,
    toggleCollapsedNavGroup,
  };
}
