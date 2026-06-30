import { contentBulkIssueList } from "./contentBulkIssueSummaryView.js?v=675";

export const CONTENT_BULK_MASS_APPLY_READINESS_VIEW_VERSION = "content-bulk-mass-apply-readiness-view-v1";

export function renderContentBulkMassApplyReadiness({
  dryRun = {},
  stagedImport = {},
  applyGate = {},
  backupPlan = {},
  restoreRehearsal = {},
} = {}, detailText = {}) {
  const text = detailText.contentBulkMassApplyReadiness || {};
  const dryRunBlockers = Number(dryRun.summary?.blockingIssueCount || 0);
  const stagedWithheld = Number(stagedImport.summary?.withheldRowCount || 0);
  const applyBlocked = Number(applyGate.summary?.blockedReviewItemCount || 0);
  const backupBlocked = Number(backupPlan.summary?.preApplyBlockedReviewItemCount || 0);
  const restoreBlocked = Number(restoreRehearsal.preApplyReviewSummary?.blockedReviewItemCount || 0);
  const blockedReasonCodes = [
    ...(dryRun.issueSummary?.blockingIssueCodes || []),
    ...(stagedImport.issueSummary?.blockingIssueCodes || []),
    ...(applyGate.issueSummary?.blockingIssueCodes || []),
    ...(backupPlan.issueSummary?.blockingIssueCodes || backupPlan.blockedReasons || []),
    ...(restoreRehearsal.issueSummary?.blockingIssueCodes || restoreRehearsal.blockedReasons || []),
  ];
  const warningCodes = [
    ...(dryRun.issueSummary?.warningIssueCodes || []),
    ...(stagedImport.issueSummary?.warningIssueCodes || []),
    ...(applyGate.issueSummary?.warningIssueCodes || []),
    ...(backupPlan.issueSummary?.warningIssueCodes || []),
    ...(restoreRehearsal.issueSummary?.warningIssueCodes || []),
  ];
  const blockedCount = dryRunBlockers + stagedWithheld + applyBlocked + backupBlocked + restoreBlocked;
  const state = blockedCount > 0 || applyGate.applyEnabled === false || backupPlan.backupEnabled === false || restoreRehearsal.restoreEnabled === false
    ? "blocked"
    : "ready";
  const metrics = [
    [text.dryRunBlockers || "Dry-run blockers", `${dryRunBlockers}`],
    [text.stagedWithheld || "Staged withheld", `${stagedWithheld}`],
    [text.applyBlocked || "Apply blocked", `${applyBlocked}`],
    [text.backupBlocked || "Backup blocked", `${backupBlocked}`],
    [text.restoreBlocked || "Restore blocked", `${restoreBlocked}`],
    [text.state || "State", contentBulkMassReadinessLabel(state, text.stateLabels)],
  ];
  return `
    <div class="editor-content-bulk-contract-summary editor-content-bulk-mass-readiness" data-state="${escapeAttribute(state)}">
      <div>
        <strong>${escapeHtml(text.title || "Mass apply readiness")}</strong>
        <p class="muted">${escapeHtml(text.description || "Combined read-only readiness across dry-run, staged import, apply gate, backup, and restore rehearsal.")}</p>
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
        ${contentBulkMassChipBlock(text.blockedReasons || "Blocked reasons", contentBulkIssueList(Array.from(new Set(blockedReasonCodes)), text))}
        ${contentBulkMassChipBlock(text.warningReasons || "Warning reasons", contentBulkIssueList(Array.from(new Set(warningCodes)), text))}
      </div>
    </div>
  `;
}

function contentBulkMassReadinessLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function contentBulkMassChipBlock(title, values = []) {
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
