import { createEditorPanelContentSections } from "./editorPanelContentSections.js?v=681";
import { findEditorPanelById } from "./editorPanelSelection.js?v=681";

export function createEditorPanelDetailRenderer({
  getManifest = () => ({}),
  getActivePanelId = () => "",
  getPanelDetailElement = () => null,
  getText = () => ({}),
  renderPanelDetailShell = () => "",
  statusLabel,
  contentRenderers = {},
} = {}) {
  return function renderEditorPanelDetail() {
    const manifest = getManifest() || {};
    const text = getText() || {};
    const panel = findEditorPanelById(manifest, getActivePanelId());
    const panelDetail = getPanelDetailElement();
    const options = panel
      ? {
          panel,
          noPanelText: text.noPanel,
          detailTitles: text.detailTitles || {},
          emptyValue: text.save?.empty,
          statusLabel,
          contentSections: createEditorPanelContentSections(panel, contentRenderers),
        }
      : {
          panel,
          noPanelText: text.noPanel,
        };
    const html = renderPanelDetailShell(options);
    if (panelDetail) panelDetail.innerHTML = html;
    return html;
  };
}
