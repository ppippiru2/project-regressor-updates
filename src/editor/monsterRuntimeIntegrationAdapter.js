import { renderMonsterRuntimeIntegrationView } from "./monsterRuntimeIntegrationView.js?v=676";

export function createMonsterRuntimeIntegrationRenderer(options = {}) {
  return function renderMonsterRuntimeIntegrationSection(detailText = {}) {
    const getPreview = typeof options.getPreview === "function" ? options.getPreview : () => ({});
    return renderMonsterRuntimeIntegrationView(getPreview(), detailText);
  };
}
