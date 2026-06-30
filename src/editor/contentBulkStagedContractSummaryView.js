import { contentBulkIssueList } from "./contentBulkIssueSummaryView.js?v=675";

export const CONTENT_BULK_STAGED_CONTRACT_SUMMARY_VIEW_VERSION = "content-bulk-staged-contract-summary-view-v1";

export function renderContentBulkStagedContractSummary(contract, text = {}) {
  if (!contract?.summary) return "";
  const summary = contract.summary;
  const metrics = [
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount || 0}`],
    [text.blockedRows || "Blocked rows", `${summary.blockedRowCount || 0}`],
    [text.warningRows || "Warnings", `${summary.warningRowCount || 0}`],
    [text.targetSurfaces || "Target surfaces", `${summary.targetSurfaceCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
  ];
  return `
    <div class="editor-content-bulk-contract-summary" data-staged-contract-version="${escapeAttribute(contract.version || "")}">
      <div>
        <strong>${escapeHtml(text.stagedContract || "Staged contract")}</strong>
        <p class="muted">${escapeHtml((contract.domainIds || []).join(" / ") || "-")}</p>
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
        ${contentBulkStagedContractChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(contract.blockingIssueCodes, text))}
        ${contentBulkStagedContractChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(contract.warningIssueCodes, text))}
      </div>
    </div>
  `;
}

function contentBulkStagedContractChipBlock(title, values = []) {
  return `
    <div class="editor-balance-chip-block">
      <span>${escapeHtml(title)}</span>
      <div class="editor-chip-list">${values.map((value) => `<span>${escapeHtml(value)}</span>`).join("")}</div>
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

function escapeAttribute(value) {
  return escapeHtml(value);
}
