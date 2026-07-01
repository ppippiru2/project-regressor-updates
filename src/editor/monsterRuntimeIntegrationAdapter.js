import { renderMonsterRuntimeIntegrationView } from "./monsterRuntimeIntegrationView.js?v=680";

export function createMonsterRuntimeIntegrationRenderer(options = {}) {
  return function renderMonsterRuntimeIntegrationSection(detailText = {}) {
    const getPreview = typeof options.getPreview === "function" ? options.getPreview : () => ({});
    return renderMonsterRuntimeIntegrationView(getPreview(), detailText);
  };
}
