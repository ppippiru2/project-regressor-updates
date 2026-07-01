import { tf } from "../localization/index.js?v=676";

export const CONTENT_BULK_STAGE_GATE_PREVIEW_LABELS_VERSION = "content-bulk-stage-gate-preview-labels-v1";

export const CONTENT_BULK_DOMAIN_BLOCKER_STAGE_IDS = ["dryRun", "staged", "backup", "restore"];

export function contentBulkStageGateStatusLabels(stageGateCounts = {}, text = {}) {
  const labels = text.stageGateStatusLabels || {};
  return [
    ["ready", stageGateCounts.ready],
    ["review", stageGateCounts.review],
    ["blocked", stageGateCounts.blocked],
    ["not-staged", stageGateCounts.notStaged],
  ].map(([status, count]) => `${labels[status] || status}: ${Number(count || 0)}`);
}

export function contentBulkStageGateReasonLabels(codes = [], labels = {}, text = {}) {
  const list = Array.isArray(codes) ? codes.filter(Boolean) : [];
  return list.length ? list.map((code) => labels[code] || code) : [text.noIssues || "None"];
}

export function contentBulkDomainBlockedStageIds(groups = {}) {
  return CONTENT_BULK_DOMAIN_BLOCKER_STAGE_IDS.filter((stageId) => (groups?.[stageId] || []).filter(Boolean).length > 0);
}

export function contentBulkDomainStageBlockerLabels(groups = {}, text = {}) {
  const labels = text.stageLabels || {};
  return CONTENT_BULK_DOMAIN_BLOCKER_STAGE_IDS.map((stageId) => tf("editorPrep.balanceTuningDetail.contentBulkDomainApplyReadiness.stageBlockerSummary", {
    stage: labels[stageId] || stageId,
    count: (groups?.[stageId] || []).filter(Boolean).length,
  }, `${labels[stageId] || stageId}: ${(groups?.[stageId] || []).filter(Boolean).length}`));
}
