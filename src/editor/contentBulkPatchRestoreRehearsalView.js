import { tf } from "../localization/index.js?v=676";
import { contentBulkChipBlock } from "./contentBulkChipBlockView.js?v=676";
import { contentBulkFallbackLabel } from "./contentBulkFilterModel.js?v=676";
import { editorChip } from "./editorChipBlockView.js?v=676";
import { contentBulkIssueList, renderContentBulkIssueSummary } from "./contentBulkIssueSummaryView.js?v=676";
import { contentBulkPatchPreApplyReviewLabel } from "./contentBulkPatchPreApplyReview.js?v=676";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=676";

export const CONTENT_BULK_PATCH_RESTORE_REHEARSAL_VIEW_VERSION = "content-bulk-patch-restore-rehearsal-view-v1";
const CONTENT_BULK_RESTORE_REHEARSAL_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderContentBulkPatchRestoreRehearsal(rehearsal, detailText = {}) {
  const text = detailText.contentBulkPatchRestoreRehearsal || {};
  const summary = rehearsal.summary || {};
  const metrics = [
    [text.targetFiles || "Target files", `${summary.targetFileCount || 0}`],
    [text.mappedRestores || "Mapped restores", `${summary.mappedRestoreCount || 0}`],
    [text.missingRestores || "Missing restores", `${summary.missingRestoreCount || 0}`],
    [text.restoreSteps || "Restore steps", `${summary.restoreStepCount || 0}`],
    [text.validationSteps || "Validation", `${summary.validationStepCount || 0}`],
    [text.preApplyReviewItems || "Pre-apply review", `${rehearsal.preApplyReviewSummary?.reviewItemCount || 0}`],
    [text.preApplyBlockedItems || "Blocked pre-apply", `${rehearsal.preApplyReviewSummary?.blockedReviewItemCount || 0}`],
    [text.restoreState || "Restore", rehearsal.restoreEnabled ? (text.enabled || "Enabled") : (text.disabled || "Disabled")],
  ];
  const restoreRows = (rehearsal.restoreActions || []).slice(0, 6).map((action) => `
    <article class="editor-content-bulk-restore-rehearsal-file">
      <div>
        <strong>${escapeHtml(action.file || "-")}</strong>
        <span>${escapeHtml((action.domainIds || []).join(", ") || "-")}</span>
      </div>
      <small>${escapeHtml(contentBulkFallbackLabel(action.restoreState, text.stateLabels))} / ${escapeHtml(contentBulkFallbackLabel(action.checkState, text.stateLabels))}</small>
      <div class="editor-chip-list">${(action.rehearsalBlockerCodes || []).map((code) => editorChip(contentBulkFallbackLabel(code, text.fileRehearsalBlockerLabels), CONTENT_BULK_RESTORE_REHEARSAL_CHIP_OPTIONS)).join("")}</div>
    </article>
  `).join("");

  return `
    <section class="editor-content-bulk-restore-rehearsal" data-state="${escapeAttribute(rehearsal.status || "unknown")}" aria-label="${escapeAttribute(text.title || "Content Bulk Restore Rehearsal")}">
      <div class="editor-content-bulk-restore-rehearsal-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Restore Rehearsal")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only restore rehearsal. Restore writer is disabled.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchRestoreRehearsal.version", {
          version: rehearsal.version || "-"
        }, rehearsal.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-restore-rehearsal-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      ${renderContentBulkIssueSummary(rehearsal.issueSummary, text)}
      <div class="editor-content-bulk-restore-rehearsal-grid">
        ${contentBulkChipBlock(text.preApplyReview || "Pre-apply review", contentBulkPatchPreApplyReviewChips(rehearsal.preApplyReviewItems, text), { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.blockedReasons || "Blocked reasons", (rehearsal.blockedReasons || []).map((reason) => contentBulkFallbackLabel(reason, text.blockedReasonLabels)), { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(rehearsal.issueSummary?.blockingIssueCodes, text), { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(rehearsal.issueSummary?.warningIssueCodes, text), { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.validationPlan || "Validation plan", (rehearsal.validationSteps || []).map((step) => contentBulkFallbackLabel(step, text.validationLabels)), { chipClass: "editor-chip" })}
      </div>
      <div class="editor-content-bulk-restore-rehearsal-files">
        <strong>${escapeHtml(text.restoreFilePreview || "Restore file preview")}</strong>
        ${restoreRows || `<p class="muted">${escapeHtml(text.emptyFiles || "No restore actions.")}</p>`}
      </div>
    </section>
  `;
}

function contentBulkPatchPreApplyReviewChips(items = [], text = {}) {
  return (items || []).map((item) =>
    `${contentBulkPatchPreApplyReviewLabel(item.id, text.preApplyReviewLabels)} - ${contentBulkPatchPreApplyReviewLabel(item.state, text.preApplyStateLabels)} - ${item.detail || "-"}`
  );
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
