import { tf } from "../localization/index.js?v=675";
import { contentBulkChipBlock } from "./contentBulkChipBlockView.js?v=675";
import { contentBulkFallbackLabel } from "./contentBulkFilterModel.js?v=675";
import { contentBulkIssueList, renderContentBulkIssueSummary } from "./contentBulkIssueSummaryView.js?v=675";
import { contentBulkPatchPreApplyReviewLabel } from "./contentBulkPatchPreApplyReview.js?v=675";
import { editorChip } from "./editorChipBlockView.js?v=675";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=675";

export const CONTENT_BULK_PATCH_BACKUP_PLAN_VIEW_VERSION = "content-bulk-patch-backup-plan-view-v1";
const CONTENT_BULK_BACKUP_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderContentBulkPatchBackupPlan(plan, detailText = {}) {
  const text = detailText.contentBulkPatchBackupPlan || {};
  const summary = plan.summary || {};
  const artifacts = plan.artifactNames || {};
  const metrics = [
    [text.targetFiles || "Target files", `${summary.targetFileCount || 0}`],
    [text.patchBlocks || "Patch blocks", `${summary.patchBlockCount || 0}`],
    [text.pendingBackups || "Pending backups", `${summary.pendingBackupCount || 0}`],
    [text.backupSteps || "Backup steps", `${summary.backupStepCount || 0}`],
    [text.restoreSteps || "Restore steps", `${summary.restoreStepCount || 0}`],
    [text.preApplyReviewItems || "Pre-apply review", `${summary.preApplyReviewItemCount || 0}`],
    [text.preApplyBlockedItems || "Blocked pre-apply", `${summary.preApplyBlockedReviewItemCount || 0}`],
    [text.backupState || "Backup", plan.backupEnabled ? (text.enabled || "Enabled") : (text.disabled || "Disabled")],
  ];
  const fileRows = (plan.fileBackups || []).slice(0, 6).map((file) => `
    <article class="editor-content-bulk-backup-plan-file">
      <div>
        <strong>${escapeHtml(file.file || "-")}</strong>
        <span>${escapeHtml((file.domainIds || []).join(", ") || "-")}</span>
      </div>
      <small>${escapeHtml(contentBulkFallbackLabel(file.backupState, text.stateLabels))} / ${escapeHtml(contentBulkFallbackLabel(file.restoreState, text.stateLabels))}</small>
      <div class="editor-chip-list">${(file.reviewBlockerCodes || []).map((code) => editorChip(contentBulkFallbackLabel(code, text.fileReviewBlockerLabels), CONTENT_BULK_BACKUP_CHIP_OPTIONS)).join("")}</div>
    </article>
  `).join("");

  return `
    <section class="editor-content-bulk-backup-plan" data-state="${escapeAttribute(plan.status || "unknown")}" aria-label="${escapeAttribute(text.title || "Content Bulk Backup Plan")}">
      <div class="editor-content-bulk-backup-plan-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Backup Plan")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only backup snapshot plan. Backup writer is disabled.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchBackupPlan.version", {
          version: plan.version || "-"
        }, plan.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-backup-plan-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      <div class="editor-content-bulk-backup-plan-artifacts">
        ${renderEditorSummaryCard(text.backupArchive || "Backup archive", artifacts.backupArchive || "-")}
        ${renderEditorSummaryCard(text.snapshotManifest || "Snapshot manifest", artifacts.snapshotManifest || "-")}
        ${renderEditorSummaryCard(text.restoreReport || "Restore report", artifacts.restoreReport || "-")}
      </div>
      ${renderContentBulkIssueSummary(plan.issueSummary, text)}
      <div class="editor-content-bulk-backup-plan-grid">
        ${contentBulkChipBlock(text.preApplyReview || "Pre-apply review", contentBulkPatchPreApplyReviewChips(plan.preApplyReviewItems, text), { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.blockedReasons || "Blocked reasons", (plan.blockedReasons || []).map((reason) => contentBulkFallbackLabel(reason, text.blockedReasonLabels)), { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(plan.issueSummary?.blockingIssueCodes, text), { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(plan.issueSummary?.warningIssueCodes, text), { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.backupPlan || "Backup plan", (plan.backupSteps || []).map((step) => contentBulkFallbackLabel(step, text.backupStepLabels)), { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.restorePlan || "Restore plan", (plan.restoreSteps || []).map((step) => contentBulkFallbackLabel(step, text.restoreStepLabels)), { chipClass: "editor-chip" })}
      </div>
      <div class="editor-content-bulk-backup-plan-files">
        <strong>${escapeHtml(text.targetFilePreview || "Target file preview")}</strong>
        ${fileRows || `<p class="muted">${escapeHtml(text.emptyFiles || "No target files.")}</p>`}
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
