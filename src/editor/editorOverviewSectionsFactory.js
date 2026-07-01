import {
  createEditorAssetSectionsRenderer,
  createEditorBacklogCardsRenderer,
  createEditorPrototypeCardsRenderer,
  createEditorSaveKeyCardsRenderer,
} from "./editorOverviewListAdapter.js?v=681&cachebust=asset-section-collapse";
import { createEditorSaveSummary } from "./editorSaveSummaryFactory.js?v=681&cachebust=681";
import { EDITOR_SAVE_KEYS } from "./saveSlotDiagnosticKeys.js?v=681";

export function createEditorOverviewSections({
  elements = {},
  getManifest = () => ({}),
  getBacklog = () => ({}),
  getText = () => ({}),
  statusLabel,
  translate,
  editorVersion = "",
} = {}) {
  const renderAssetSections = createEditorAssetSectionsRenderer();
  const renderSaveKeyCards = createEditorSaveKeyCardsRenderer();
  const renderBacklogCards = createEditorBacklogCardsRenderer();
  const renderPrototypeCards = createEditorPrototypeCardsRenderer();

  function createSaveSummary() {
    const text = getText() || {};
    return createEditorSaveSummary({
      keys: EDITOR_SAVE_KEYS,
      saveText: text.save,
      locale: text.locale,
      translate,
      editorVersion,
    });
  }

  function renderAssets() {
    const manifest = getManifest() || {};
    const text = getText() || {};
    elements.assetGrid.innerHTML = renderAssetSections({
      assetTypes: text.assetTypes,
      imageSlots: manifest.assetSlots?.image || [],
      audioSlots: manifest.assetSlots?.audio || [],
    });
  }

  function renderSaveKeys() {
    const text = getText() || {};
    const summary = createSaveSummary();
    elements.saveGrid.innerHTML = renderSaveKeyCards(summary.keys, text.save);
  }

  function renderBacklog() {
    const backlog = getBacklog() || {};
    elements.backlogList.innerHTML = renderBacklogCards(backlog.items || [], {
      statusLabel,
    });
  }

  function renderPrototypeList() {
    const manifest = getManifest() || {};
    elements.prototypeList.innerHTML = renderPrototypeCards(manifest.prototypeListMemory || []);
  }

  return {
    createSaveSummary,
    renderAssets,
    renderBacklog,
    renderPrototypeList,
    renderSaveKeys,
  };
}
