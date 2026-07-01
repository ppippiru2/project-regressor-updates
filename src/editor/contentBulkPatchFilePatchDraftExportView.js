import { tf } from "../localization/index.js?v=676";
import { contentBulkChipBlock } from "./contentBulkChipBlockView.js?v=676";
import { contentBulkIssueList } from "./contentBulkIssueSummaryView.js?v=676";
import { contentBulkPatchPreApplyReviewLabel } from "./contentBulkPatchPreApplyReview.js?v=676";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=676";

export const CONTENT_BULK_PATCH_FILE_PATCH_DRAFT_EXPORT_VIEW_VERSION = "content-bulk-patch-file-patch-draft-export-view-v1";

export function renderContentBulkPatchFilePatchDraftExport(exportPreview, detailText = {}, reviewContext = {}) {
  const text = detailText.contentBulkPatchFilePatchDraftExport || {};
  const summary = exportPreview.summary || {};
  const metrics = [
    [text.exportedFiles || "Exported files", `${summary.exportedFileCount || 0}`],
    [text.exportedBlocks || "Exported blocks", `${summary.exportedBlockCount || 0}`],
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount || 0}`],
    [text.updateDrafts || "Update drafts", `${summary.updateDraftCount || 0}`],
    [text.blockedDrafts || "Blocked drafts", `${summary.blockedDraftCount || 0}`],
    [text.preApplyReviewItems || "Pre-apply review", `${summary.preApplyReviewItemCount || 0}`],
    [text.preApplyBlockedItems || "Blocked pre-apply", `${summary.preApplyBlockedReviewItemCount || 0}`],
    [text.contractReadyRows || "Contract ready", `${summary.preApplyContractReadyRowCount || 0}`],
    [text.contractBlockedRows || "Contract blocked", `${summary.preApplyContractBlockedRowCount || 0}`],
    [text.contractWarningRows || "Contract review", `${summary.preApplyContractWarningRowCount || 0}`],
    [text.writes || "Writes", exportPreview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-patch-draft-export" data-readonly="${exportPreview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Draft Export")}">
      <div class="editor-content-bulk-patch-draft-export-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Draft Export")}</h4>
          <p class="muted">${escapeHtml(text.description || "Download a read-only file patch draft for review.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchFilePatchDraftExport.version", {
          version: exportPreview.version || "-"
        }, exportPreview.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-patch-draft-export-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      <div class="editor-content-bulk-patch-draft-export-grid">
        ${renderContentBulkPatchExportReviewStrip(exportPreview, reviewContext, text)}
        ${contentBulkChipBlock(text.preApplyReview || "Pre-apply review", contentBulkPatchPreApplyReviewChips(exportPreview.preApplyReview?.checklist, text), { chipClass: "editor-chip" })}
      </div>
      <div class="editor-content-bulk-patch-draft-export-actions">
        <div>
          <strong>${escapeHtml(text.source || "Source")}</strong>
          <span>${escapeHtml(summary.sourceName || "-")}</span>
        </div>
        <button type="button" data-content-bulk-file-patch-export>
          ${escapeHtml(text.download || "Download patch draft")}
        </button>
      </div>
    </section>
  `;
}

function renderContentBulkPatchExportReviewStrip(exportPreview = {}, reviewContext = {}, text = {}) {
  const preApplySummary = exportPreview.preApplyReview?.summary || {};
  const preApplyChecklist = Array.isArray(exportPreview.preApplyReview?.checklist) ? exportPreview.preApplyReview.checklist : [];
  const backupIssueSummary = reviewContext.backupPlan?.issueSummary || {};
  const restoreIssueSummary = reviewContext.restoreRehearsal?.issueSummary || {};
  const preApplyBlockers = preApplyChecklist.filter((item) => item.state === "blocked").map((item) => item.id);
  const preApplyWarnings = preApplyChecklist.filter((item) => item.state === "review").map((item) => item.id);
  const blockingIssues = Array.from(new Set([
    ...preApplyBlockers,
    ...(backupIssueSummary.blockingIssueCodes || []),
    ...(restoreIssueSummary.blockingIssueCodes || []),
  ]));
  const warningIssues = Array.from(new Set([
    ...preApplyWarnings,
    ...(backupIssueSummary.warningIssueCodes || []),
    ...(restoreIssueSummary.warningIssueCodes || []),
  ]));
  const state = blockingIssues.length > 0 ? "blocked" : "ready";
  const metrics = [
    [text.reviewStripPreApplyBlocked || "Pre-apply blocked", `${preApplySummary.blockedReviewItemCount || 0}`],
    [text.reviewStripContractBlocked || "Contract blocked", `${preApplySummary.contractBlockedRowCount || 0}`],
    [text.reviewStripContractWarnings || "Contract review", `${preApplySummary.contractWarningRowCount || 0}`],
    [text.reviewStripBackupIssues || "Backup issues", `${backupIssueSummary.blockingIssueCodes?.length || 0}`],
    [text.reviewStripRestoreIssues || "Restore issues", `${restoreIssueSummary.blockingIssueCodes?.length || 0}`],
    [text.reviewStripState || "State", state === "blocked" ? (text.reviewStripStateBlocked || "Blocked") : (text.reviewStripStateReady || "Ready")],
  ];

  return `
    <div class="editor-content-bulk-contract-summary editor-content-bulk-patch-draft-export-review-strip" data-state="${escapeAttribute(state)}">
      <div>
        <strong>${escapeHtml(text.reviewStripTitle || "Export review strip")}</strong>
        <p class="muted">${escapeHtml(text.reviewStripHint || "Pre-apply, backup, and restore blockers before download.")}</p>
      </div>
      <div class="editor-content-bulk-contract-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      <div class="editor-content-bulk-contract-issues">
        ${contentBulkChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(blockingIssues, text), { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(warningIssues, text), { chipClass: "editor-chip" })}
      </div>
    </div>
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
