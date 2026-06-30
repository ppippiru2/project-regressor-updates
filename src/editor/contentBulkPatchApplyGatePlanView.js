import { tf } from "../localization/index.js?v=675";
import { contentBulkIssueList, renderContentBulkIssueSummary } from "./contentBulkIssueSummaryView.js?v=675";

export const CONTENT_BULK_PATCH_APPLY_GATE_PLAN_VIEW_VERSION = "content-bulk-patch-apply-gate-plan-view-v1";

export function renderContentBulkPatchApplyGatePlan(plan, detailText = {}) {
  const text = detailText.contentBulkPatchApplyGatePlan || {};
  const summary = plan.summary || {};
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
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${renderContentBulkIssueSummary(plan.issueSummary, text)}
      <div class="editor-content-bulk-apply-gate-grid">
        ${contentBulkPatchApplyGateChipBlock(text.reviewChecklist || "Review checklist", (plan.reviewChecklist || []).map((item) =>
          `${contentBulkPatchApplyGateLabel(item.id, text.reviewLabels)} - ${contentBulkPatchApplyGateLabel(item.state, text.stateLabels)} - ${item.detail || "-"}`
        ))}
        ${contentBulkPatchApplyGateChipBlock(text.blockedReasons || "Blocked reasons", (plan.blockedReasons || []).map((reason) => contentBulkPatchApplyGateLabel(reason, text.blockedReasonLabels)))}
        ${contentBulkPatchApplyGateChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(plan.issueSummary?.blockingIssueCodes, text))}
        ${contentBulkPatchApplyGateChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(plan.issueSummary?.warningIssueCodes, text))}
        ${contentBulkPatchApplyGateChipBlock(text.gateList || "Gate list", (plan.gates || []).map((gate) => `${contentBulkPatchApplyGateLabel(gate.id, text.gateLabels)} - ${contentBulkPatchApplyGateLabel(gate.state, text.stateLabels)}`))}
        ${contentBulkPatchApplyGateChipBlock(text.rollbackPlan || "Rollback plan", (plan.rollbackSteps || []).map((step) => contentBulkPatchApplyGateLabel(step, text.rollbackLabels)))}
        ${contentBulkPatchApplyGateChipBlock(text.validationPlan || "Validation plan", (plan.validationSteps || []).map((step) => contentBulkPatchApplyGateLabel(step, text.validationLabels)))}
      </div>
    </section>
  `;
}

function contentBulkPatchApplyGateLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function contentBulkPatchApplyGateChipBlock(title, values = []) {
  return `
    <div class="editor-balance-chip-block">
      <span>${escapeHtml(title)}</span>
      <div class="editor-chip-list">${values.map((value) => chip(value)).join("")}</div>
    </div>
  `;
}

function chip(value) {
  return `<span class="editor-chip">${escapeHtml(String(value))}</span>`;
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
