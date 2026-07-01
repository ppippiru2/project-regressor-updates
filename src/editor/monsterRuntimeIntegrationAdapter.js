import { renderMonsterRuntimeIntegrationView } from "./monsterRuntimeIntegrationView.js?v=678";

export function createMonsterRuntimeIntegrationRenderer(options = {}) {
  return function renderMonsterRuntimeIntegrationSection(detailText = {}) {
    const getPreview = typeof options.getPreview === "function" ? options.getPreview : () => ({});
    return renderMonsterRuntimeIntegrationView(getPreview(), detailText);
  };
}
