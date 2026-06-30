import { tf } from "../localization/index.js?v=675";
import { contentBulkIssueList, renderContentBulkIssueSummary } from "./contentBulkIssueSummaryView.js?v=675";

export const CONTENT_BULK_PATCH_BACKUP_PLAN_VIEW_VERSION = "content-bulk-patch-backup-plan-view-v1";

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
      <small>${escapeHtml(contentBulkPatchBackupPlanLabel(file.backupState, text.stateLabels))} / ${escapeHtml(contentBulkPatchBackupPlanLabel(file.restoreState, text.stateLabels))}</small>
      <div class="editor-chip-list">${(file.reviewBlockerCodes || []).map((code) => chip(contentBulkPatchBackupPlanLabel(code, text.fileReviewBlockerLabels))).join("")}</div>
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
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-backup-plan-artifacts">
        <span><small>${escapeHtml(text.backupArchive || "Backup archive")}</small><b>${escapeHtml(artifacts.backupArchive || "-")}</b></span>
        <span><small>${escapeHtml(text.snapshotManifest || "Snapshot manifest")}</small><b>${escapeHtml(artifacts.snapshotManifest || "-")}</b></span>
        <span><small>${escapeHtml(text.restoreReport || "Restore report")}</small><b>${escapeHtml(artifacts.restoreReport || "-")}</b></span>
      </div>
      ${renderContentBulkIssueSummary(plan.issueSummary, text)}
      <div class="editor-content-bulk-backup-plan-grid">
        ${contentBulkPatchBackupPlanChipBlock(text.preApplyReview || "Pre-apply review", contentBulkPatchPreApplyReviewChips(plan.preApplyReviewItems, text))}
        ${contentBulkPatchBackupPlanChipBlock(text.blockedReasons || "Blocked reasons", (plan.blockedReasons || []).map((reason) => contentBulkPatchBackupPlanLabel(reason, text.blockedReasonLabels)))}
        ${contentBulkPatchBackupPlanChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(plan.issueSummary?.blockingIssueCodes, text))}
        ${contentBulkPatchBackupPlanChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(plan.issueSummary?.warningIssueCodes, text))}
        ${contentBulkPatchBackupPlanChipBlock(text.backupPlan || "Backup plan", (plan.backupSteps || []).map((step) => contentBulkPatchBackupPlanLabel(step, text.backupStepLabels)))}
        ${contentBulkPatchBackupPlanChipBlock(text.restorePlan || "Restore plan", (plan.restoreSteps || []).map((step) => contentBulkPatchBackupPlanLabel(step, text.restoreStepLabels)))}
      </div>
      <div class="editor-content-bulk-backup-plan-files">
        <strong>${escapeHtml(text.targetFilePreview || "Target file preview")}</strong>
        ${fileRows || `<p class="muted">${escapeHtml(text.emptyFiles || "No target files.")}</p>`}
      </div>
    </section>
  `;
}

function contentBulkPatchBackupPlanLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function contentBulkPatchPreApplyReviewChips(items = [], text = {}) {
  return (items || []).map((item) =>
    `${contentBulkPatchPreApplyReviewLabel(item.id, text.preApplyReviewLabels)} - ${contentBulkPatchPreApplyReviewLabel(item.state, text.preApplyStateLabels)} - ${item.detail || "-"}`
  );
}

function contentBulkPatchPreApplyReviewLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function contentBulkPatchBackupPlanChipBlock(title, values = []) {
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
