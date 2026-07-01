import { contentBulkChipBlock } from "./contentBulkChipBlockView.js?v=679";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=679";

export const CONTENT_BULK_ISSUE_SUMMARY_VIEW_VERSION = "content-bulk-issue-summary-view-v1";

export function contentBulkIssueList(codes = [], text = {}) {
  const list = Array.isArray(codes) ? codes.filter(Boolean) : [];
  const labels = contentBulkIssueLabels(text);
  return list.length ? list.map((code) => labels[code] || code) : [text.noIssues || "None"];
}

function contentBulkIssueLabels(text = {}) {
  return {
    ...(text.issueLabels || {}),
    ...(text.stageGateReasonLabels || {}),
    ...(text.blockedReasonLabels || {}),
    ...(text.warningReasonLabels || {}),
    ...(text.reviewLabels || {}),
    ...(text.gateLabels || {}),
    ...(text.fileReviewBlockerLabels || {}),
    ...(text.fileRehearsalBlockerLabels || {}),
    ...(text.preApplyReviewLabels || {}),
    ...(text.backupStepLabels || {}),
    ...(text.restoreStepLabels || {}),
    ...(text.validationLabels || {}),
  };
}

export function renderContentBulkIssueSummary(issueSummary, text = {}) {
  if (!issueSummary) return "";
  const metrics = [
    [text.affectedDomains || "Affected domains", `${issueSummary.affectedDomainCount || 0}`],
    [text.affectedRows || "Affected rows", `${issueSummary.affectedRowCount || 0}`],
  ];
  if (Number(issueSummary.affectedReviewItemCount || 0) > 0) {
    metrics.push([text.affectedReviewItems || "Affected review", `${issueSummary.affectedReviewItemCount || 0}`]);
  }
  if (Number(issueSummary.affectedFileCount || 0) > 0) {
    metrics.push([text.affectedFiles || "Affected files", `${issueSummary.affectedFileCount || 0}`]);
  }
  return `
    <div class="editor-content-bulk-contract-summary editor-content-bulk-issue-summary">
      <div>
        <strong>${escapeHtml(text.issueSummary || "Issue summary")}</strong>
        <p class="muted">${escapeHtml(text.issueSummaryHint || "Aggregated blockers and warnings before apply.")}</p>
      </div>
      <div class="editor-content-bulk-contract-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      <div class="editor-content-bulk-contract-issues">
        ${contentBulkChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(issueSummary.blockingIssueCodes, text))}
        ${contentBulkChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(issueSummary.warningIssueCodes, text))}
      </div>
    </div>
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
