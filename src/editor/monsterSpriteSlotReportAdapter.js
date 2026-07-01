import { renderMonsterSpriteSlotReportView } from "./monsterSpriteSlotReportView.js?v=681";

export function createMonsterSpriteSlotReportRenderer(options = {}) {
  return function renderMonsterSpriteSlotReportSection(detailText = {}) {
    const getReport = typeof options.getReport === "function" ? options.getReport : () => ({});
    const getReadiness = typeof options.getReadiness === "function" ? options.getReadiness : () => ({});
    const getPlan = typeof options.getPlan === "function" ? options.getPlan : () => ({});
    const getReview = typeof options.getReview === "function" ? options.getReview : () => ({});
    return renderMonsterSpriteSlotReportView({
      report: getReport(),
      readiness: getReadiness(),
      plan: getPlan(),
      review: getReview(),
      detailText,
    });
  };
}
