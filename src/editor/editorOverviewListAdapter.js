import {
  renderEditorAssetSections,
  renderEditorBacklogCards,
  renderEditorPrototypeCards,
  renderEditorSaveKeyCards,
} from "./editorOverviewListView.js?v=675&cachebust=asset-section-collapse";

export function createEditorAssetSectionsRenderer() {
  return function renderEditorAssetSectionsSection(options = {}) {
    return renderEditorAssetSections(options);
  };
}

export function createEditorSaveKeyCardsRenderer() {
  return function renderEditorSaveKeyCardsSection(keys = [], text = {}) {
    return renderEditorSaveKeyCards(keys, text);
  };
}

export function createEditorBacklogCardsRenderer() {
  return function renderEditorBacklogCardsSection(items = [], options = {}) {
    return renderEditorBacklogCards(items, options);
  };
}

export function createEditorPrototypeCardsRenderer() {
  return function renderEditorPrototypeCardsSection(items = []) {
    return renderEditorPrototypeCards(items);
  };
}
