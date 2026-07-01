import { renderMonsterCandidateBulkPatchAutomation } from "./monsterCandidateBulkPatchAutomationView.js?v=679";
import { renderMonsterCandidateLivePatchDraft } from "./monsterCandidateLivePatchDraftView.js?v=679";

export function createMonsterCandidateLivePatchDraftRenderer(options = {}) {
  return function renderMonsterCandidateLivePatchDraftSection(detailText = {}) {
    const getDraft = typeof options.getDraft === "function" ? options.getDraft : () => ({});
    return renderMonsterCandidateLivePatchDraft(getDraft(), detailText);
  };
}

export function createMonsterCandidateBulkPatchAutomationRenderer(options = {}) {
  return function renderMonsterCandidateBulkPatchAutomationSection(detailText = {}) {
    const getPreview = typeof options.getPreview === "function" ? options.getPreview : () => ({});
    return renderMonsterCandidateBulkPatchAutomation(getPreview(), detailText);
  };
}
