import { renderMonsterCandidateLivePromotionPlan } from "./monsterCandidateLivePromotionView.js?v=676";
import { renderMonsterCandidatePromotionChecklist } from "./monsterCandidatePromotionView.js?v=676";

export function createMonsterCandidatePromotionChecklistRenderer(options = {}) {
  return function renderMonsterCandidatePromotionChecklistSection(detailText = {}) {
    const getChecklist = typeof options.getChecklist === "function" ? options.getChecklist : () => ({});
    return renderMonsterCandidatePromotionChecklist(getChecklist(), detailText);
  };
}

export function createMonsterCandidateLivePromotionPlanRenderer(options = {}) {
  return function renderMonsterCandidateLivePromotionPlanSection(detailText = {}) {
    const getPlan = typeof options.getPlan === "function" ? options.getPlan : () => ({});
    return renderMonsterCandidateLivePromotionPlan(getPlan(), detailText);
  };
}
