import { renderMonsterCandidateRewardPreview } from "./monsterCandidateRewardView.js?v=676";

export function createMonsterCandidateRewardRenderer(options = {}) {
  return function renderMonsterCandidateRewardSection(detailText = {}) {
    const getPreview = typeof options.getPreview === "function" ? options.getPreview : () => ({});
    return renderMonsterCandidateRewardPreview(getPreview(), detailText);
  };
}
