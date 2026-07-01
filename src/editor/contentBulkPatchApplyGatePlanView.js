import { tf } from "../localization/index.js?v=681";
import { contentBulkChipBlock } from "./contentBulkChipBlockView.js?v=681";
import { contentBulkIssueList, renderContentBulkIssueSummary } from "./contentBulkIssueSummaryView.js?v=681";
import {
  createContentBulkFilteredCandidateStageGateCountsFromPreview,
  createContentBulkFilteredCandidateStageGateReasonCodesFromPreview,
} from "./contentBulkFilteredCandidateStageGate.js?v=681";
import {
  contentBulkStageGateReasonLabels,
  contentBulkStageGateStatusLabels,
} from "./contentBulkStageGatePreviewLabels.js?v=681";
import { contentBulkFallbackLabel } from "./contentBulkFilterModel.js?v=681";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=681";

export const CONTENT_BULK_PATCH_APPLY_GATE_PLAN_VIEW_VERSION = "content-bulk-patch-apply-gate-plan-view-v1";

const APPLY_GATE_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderContentBulkPatchApplyGatePlan(plan, detailText = {}, helpers = {}) {
  const text = detailText.contentBulkPatchApplyGatePlan || {};
  const candidateText = detailText.contentBulkFilteredCandidatePreview || {};
  const summary = plan.summary || {};
  const filteredCandidatePreview = helpers.filteredCandidatePreview || {};
  const hasFilteredCandidatePreview = Boolean(filteredCandidatePreview.summary || filteredCandidatePreview.visibleRows);
  const stageGateCounts = hasFilteredCandidatePreview
    ? createContentBulkFilteredCandidateStageGateCountsFromPreview(filteredCandidatePreview)
    : normalizeStageGateCounts(plan.filteredCandidateGate?.stageGateCounts);
  const stageGateReasonCodes = hasFilteredCandidatePreview
    ? createContentBulkFilteredCandidateStageGateReasonCodesFromPreview(filteredCandidatePreview)
    : normalizedList(plan.filteredCandidateGate?.reasonCodes);
  const stageGateReasonLabels = {
    ...(candidateText.stageGateReasonLabels || {}),
    ...(text.stageGateReasonLabels || {}),
  };
  const metrics = [
    [text.targetFiles || "Target files", `${summary.targetFileCount || 0}`],
    [text.patchBlocks || "Patch blocks", `${summary.patchBlockCount || 0}`],
    [text.gates || "Gates", `${summary.gateCount || 0}`],
    [text.rollbackSteps || "Rollback", `${summary.rollbackStepCount || 0}`],
    [text.validationSteps || "Validation", `${summary.validationStepCount || 0}`],
    [text.reviewItems || "Review items", `${summary.reviewItemCount || 0}`],
    [text.blockedReviewItems || "Blocked review", `${summary.blockedReviewItemCount || 0}`],
    [text.warningReviewItems || "Review warnings", `${summary.warningReviewItemCount || 0}`],
    [text.contractReadyRows || "Contract ready", `${summary.contractReadyRowCount || 0}`],
    [text.contractBlockedRows || "Contract blocked", `${summary.contractBlockedRowCount || 0}`],
    [text.contractWarningRows || "Contract review", `${summary.contractWarningRowCount || 0}`],
    [text.stageGateReadyRows || "Stage gate ready", `${stageGateCounts.ready}`],
    [text.stageGateReviewRows || "Stage gate review", `${stageGateCounts.review}`],
    [text.stageGateBlockedRows || "Stage gate blocked", `${stageGateCounts.blocked}`],
    [text.stageGateNotStagedRows || "Stage gate not staged", `${stageGateCounts.notStaged}`],
    [text.applyState || "Apply", plan.applyEnabled ? (text.enabled || "Enabled") : (text.disabled || "Disabled")],
  ];
  return `
    <section class="editor-content-bulk-apply-gate" data-state="${escapeAttribute(plan.status || "unknown")}" aria-label="${escapeAttribute(text.title || "Content Bulk Apply Gate")}">
      <div class="editor-content-bulk-apply-gate-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Apply Gate")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only apply gate plan. Live writer is disabled.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchApplyGatePlan.version", {
          version: plan.version || "-"
        }, plan.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-apply-gate-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      ${renderContentBulkIssueSummary(plan.issueSummary, text)}
      <div class="editor-content-bulk-apply-gate-grid">
        ${contentBulkChipBlock(text.stageGateStatus || "Stage gate status", contentBulkStageGateStatusLabels(stageGateCounts, text), APPLY_GATE_CHIP_OPTIONS)}
        ${contentBulkChipBlock(text.stageGateReasons || "Stage gate reasons", contentBulkStageGateReasonLabels(stageGateReasonCodes, stageGateReasonLabels, text), APPLY_GATE_CHIP_OPTIONS)}
        ${contentBulkChipBlock(text.reviewChecklist || "Review checklist", (plan.reviewChecklist || []).map((item) =>
          `${contentBulkFallbackLabel(item.id, text.reviewLabels)} - ${contentBulkFallbackLabel(item.state, text.stateLabels)} - ${item.detail || "-"}`
        ), APPLY_GATE_CHIP_OPTIONS)}
        ${contentBulkChipBlock(text.blockedReasons || "Blocked reasons", (plan.blockedReasons || []).map((reason) => contentBulkFallbackLabel(reason, text.blockedReasonLabels)), APPLY_GATE_CHIP_OPTIONS)}
        ${contentBulkChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(plan.issueSummary?.blockingIssueCodes, text), APPLY_GATE_CHIP_OPTIONS)}
        ${contentBulkChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(plan.issueSummary?.warningIssueCodes, text), APPLY_GATE_CHIP_OPTIONS)}
        ${contentBulkChipBlock(text.gateList || "Gate list", (plan.gates || []).map((gate) => `${contentBulkFallbackLabel(gate.id, text.gateLabels)} - ${contentBulkFallbackLabel(gate.state, text.stateLabels)}`), APPLY_GATE_CHIP_OPTIONS)}
        ${contentBulkChipBlock(text.rollbackPlan || "Rollback plan", (plan.rollbackSteps || []).map((step) => contentBulkFallbackLabel(step, text.rollbackLabels)), APPLY_GATE_CHIP_OPTIONS)}
        ${contentBulkChipBlock(text.validationPlan || "Validation plan", (plan.validationSteps || []).map((step) => contentBulkFallbackLabel(step, text.validationLabels)), APPLY_GATE_CHIP_OPTIONS)}
      </div>
    </section>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}

function normalizeStageGateCounts(counts = {}) {
  return {
    ready: Number(counts.ready || 0),
    review: Number(counts.review || 0),
    blocked: Number(counts.blocked || 0),
    notStaged: Number(counts.notStaged || 0),
  };
}

function normalizedList(value) {
  return []
    .concat(value || [])
    .map((entry) => String(entry || "").trim())
    .filter(Boolean);
}
