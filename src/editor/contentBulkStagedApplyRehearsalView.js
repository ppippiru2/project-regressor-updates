import { tf } from "../localization/index.js?v=675";
import { contentBulkIssueList } from "./contentBulkIssueSummaryView.js?v=675";

export const CONTENT_BULK_STAGED_APPLY_REHEARSAL_VIEW_VERSION = "content-bulk-staged-apply-rehearsal-view-v1";

export function renderContentBulkStagedApplyRehearsal({
  stagedImport = {},
  filePatchDraftExport = {},
  backupPlan = {},
  restoreRehearsal = {},
} = {}, detailText = {}) {
  const text = detailText.contentBulkStagedApplyRehearsal || {};
  const stagedSummary = stagedImport.summary || {};
  const exportSummary = filePatchDraftExport.summary || {};
  const files = Array.isArray(filePatchDraftExport.payload?.files) ? filePatchDraftExport.payload.files : [];
  const backupFiles = Array.isArray(backupPlan.fileBackups) ? backupPlan.fileBackups : [];
  const restoreActions = Array.isArray(restoreRehearsal.restoreActions) ? restoreRehearsal.restoreActions : [];
  const backupBlockedFileNames = backupFiles
    .filter((file) => Array.isArray(file.reviewBlockerCodes) && file.reviewBlockerCodes.filter(Boolean).length > 0)
    .map((file) => file.file)
    .filter(Boolean);
  const restoreBlockedFileNames = restoreActions
    .filter((action) => Array.isArray(action.rehearsalBlockerCodes) && action.rehearsalBlockerCodes.filter(Boolean).length > 0)
    .map((action) => action.file)
    .filter(Boolean);
  const blockedFileNames = new Set([...backupBlockedFileNames, ...restoreBlockedFileNames]);
  const stagedRows = Number(stagedSummary.stagedRowCount ?? exportSummary.stagedRowCount ?? 0);
  const withheldRows = Number(stagedSummary.withheldRowCount ?? exportSummary.withheldRowCount ?? 0);
  const draftFiles = Number(exportSummary.exportedFileCount ?? files.length);
  const readyFiles = Math.max(0, draftFiles - blockedFileNames.size);
  const blockingCodes = Array.from(new Set([
    ...(stagedImport.issueSummary?.blockingIssueCodes || []),
    ...(filePatchDraftExport.preApplyReview?.checklist || [])
      .filter((item) => item.state === "blocked")
      .map((item) => item.id),
    ...(backupPlan.issueSummary?.blockingIssueCodes || []),
    ...(restoreRehearsal.issueSummary?.blockingIssueCodes || []),
  ]));
  const state = withheldRows > 0 || blockedFileNames.size > 0 || blockingCodes.length > 0 ? "blocked" : "ready";
  const metrics = [
    [text.stagedRows || "Staged rows", `${stagedRows}`],
    [text.withheldRows || "Withheld rows", `${withheldRows}`],
    [text.draftFiles || "Draft files", `${draftFiles}`],
    [text.readyFiles || "Ready files", `${readyFiles}`],
    [text.backupBlockedFiles || "Backup blocked files", `${backupBlockedFileNames.length}`],
    [text.restoreBlockedFiles || "Restore blocked files", `${restoreBlockedFileNames.length}`],
    [text.state || "State", contentBulkStagedApplyRehearsalLabel(state, text.stateLabels)],
  ];
  return `
    <section class="editor-content-bulk-contract-summary editor-content-bulk-staged-apply-rehearsal" data-state="${escapeAttribute(state)}" aria-label="${escapeAttribute(text.title || "Staged apply rehearsal")}">
      <div>
        <strong>${escapeHtml(text.title || "Staged apply rehearsal")}</strong>
        <p class="muted">${escapeHtml(text.description || "Compares staged rows, patch draft files, backup blockers, and restore rehearsal blockers before live apply.")}</p>
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
        ${contentBulkStagedChipBlock(text.blockingReasons || "Blocking reasons", contentBulkIssueList(blockingCodes, text))}
      </div>
      <div class="editor-content-bulk-patch-draft-list">
        ${files.slice(0, 6).map((file) => renderContentBulkStagedApplyRehearsalFile(file, {
          backupFiles,
          restoreActions,
        }, text)).join("") || `<p class="muted">${escapeHtml(text.noFiles || "No patch draft files.")}</p>`}
      </div>
    </section>
  `;
}

function renderContentBulkStagedApplyRehearsalFile(file = {}, reviewContext = {}, text = {}) {
  const backupFile = (reviewContext.backupFiles || []).find((entry) => entry.file === file.file);
  const restoreAction = (reviewContext.restoreActions || []).find((entry) => entry.file === file.file);
  const backupBlockers = Array.isArray(backupFile?.reviewBlockerCodes) ? backupFile.reviewBlockerCodes.filter(Boolean) : [];
  const restoreBlockers = Array.isArray(restoreAction?.rehearsalBlockerCodes) ? restoreAction.rehearsalBlockerCodes.filter(Boolean) : [];
  const state = backupBlockers.length > 0 || restoreBlockers.length > 0 ? "blocked" : "ready";
  return `
    <article class="editor-content-bulk-patch-draft-file" data-state="${escapeAttribute(state)}">
      <div class="editor-content-bulk-patch-draft-file-head">
        <div>
          <h5>${escapeHtml(file.file || "-")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkStagedApplyRehearsal.filePreview", {
            patchBlocks: Array.isArray(file.patchBlocks) ? file.patchBlocks.length : 0,
            domains: (file.domainIds || []).join(", ") || "-"
          }, `${Array.isArray(file.patchBlocks) ? file.patchBlocks.length : 0} blocks`))}</p>
        </div>
        <span>${escapeHtml(contentBulkStagedApplyRehearsalLabel(state, text.stateLabels))}</span>
      </div>
      <div class="editor-content-bulk-patch-draft-grid">
        ${contentBulkStagedChipBlock(text.domains || "Domains", file.domainIds || [])}
        ${contentBulkStagedChipBlock(text.patchBlocks || "Patch blocks", [`${Array.isArray(file.patchBlocks) ? file.patchBlocks.length : 0}`])}
        ${contentBulkStagedChipBlock(text.backupBlockers || "Backup blockers", contentBulkIssueList(backupBlockers, text))}
        ${contentBulkStagedChipBlock(text.restoreBlockers || "Restore blockers", contentBulkIssueList(restoreBlockers, text))}
      </div>
    </article>
  `;
}

function contentBulkStagedApplyRehearsalLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function contentBulkStagedChipBlock(title, values = []) {
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
