export const CONTENT_BULK_ISSUE_SUMMARY_VIEW_VERSION = "content-bulk-issue-summary-view-v1";

export function contentBulkIssueList(codes = [], text = {}) {
  const list = Array.isArray(codes) ? codes.filter(Boolean) : [];
  return list.length ? list : [text.noIssues || "None"];
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
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-contract-issues">
        ${contentBulkIssueChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(issueSummary.blockingIssueCodes, text))}
        ${contentBulkIssueChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(issueSummary.warningIssueCodes, text))}
      </div>
    </div>
  `;
}

function contentBulkIssueChipBlock(title, values = []) {
  return `
    <div class="editor-balance-chip-block">
      <span>${escapeHtml(title)}</span>
      <div class="editor-chip-list">${values.map((value) => chip(value)).join("")}</div>
    </div>
  `;
}

function chip(value) {
  return `<span>${escapeHtml(value)}</span>`;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
