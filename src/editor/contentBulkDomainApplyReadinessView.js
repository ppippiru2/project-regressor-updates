import { tf } from "../localization/index.js?v=675";
import { contentBulkIssueList } from "./contentBulkIssueSummaryView.js?v=675";
import { renderContentBulkDomainFilterDrilldown } from "./contentBulkDomainFilterDrilldown.js?v=675";
import { renderContentBulkCurrentFilterPreApplySummary } from "./contentBulkCurrentFilterPreApplySummary.js?v=675";

export const CONTENT_BULK_DOMAIN_APPLY_READINESS_VIEW_VERSION = "content-bulk-domain-apply-readiness-view-v1";

export function renderContentBulkDomainApplyReadiness({
  dryRun = {},
  stagedImport = {},
  filePatchDraftExport = {},
  backupPlan = {},
  restoreRehearsal = {},
  filterCounts = {},
} = {}, detailText = {}, helpers = {}) {
  const text = detailText.contentBulkDomainApplyReadiness || {};
  const domainLabel = helpers.domainLabel || ((id) => id || "unknown");
  const matchesFilterRow = helpers.matchesFilterRow || (() => true);
  const activeFilter = typeof helpers.activeFilter === "function"
    ? helpers.activeFilter(text)
    : helpers.activeFilter || {
        state: text.all || "all",
        domain: text.all || "all",
        query: text.noQuery || "none",
      };
  const baseRows = contentBulkDomainApplyReadinessRows({
    dryRun,
    stagedImport,
    filePatchDraftExport,
    backupPlan,
    restoreRehearsal,
  });
  const rows = baseRows.map((row) => ({
    ...row,
    filterMatched: matchesFilterRow(
      row.state,
      contentBulkDomainApplyFilterValues(row, text, domainLabel),
      contentBulkDomainApplyFilterDomains(row),
    ),
    filterVisibleCandidateCount: contentBulkDomainFilterCandidateCount(row, filterCounts),
  }));
  const visibleRows = rows.filter((row) => row.filterMatched);
  const summary = {
    domainCount: rows.length,
    readyDomainCount: rows.filter((row) => row.state === "ready").length,
    reviewDomainCount: rows.filter((row) => row.state === "review").length,
    blockedDomainCount: rows.filter((row) => row.state === "blocked").length,
    emptyDomainCount: rows.filter((row) => row.state === "empty").length,
    dryRunBlockedDomainCount: rows.filter((row) => (row.stageBlockerGroups?.dryRun || []).length > 0).length,
    stagedBlockedDomainCount: rows.filter((row) => (row.stageBlockerGroups?.staged || []).length > 0).length,
    backupBlockedDomainCount: rows.filter((row) => (row.stageBlockerGroups?.backup || []).length > 0).length,
    restoreBlockedDomainCount: rows.filter((row) => (row.stageBlockerGroups?.restore || []).length > 0).length,
    filteredCandidateCount: Number(filterCounts.visibleRows || 0),
    filteredDomainCount: visibleRows.length,
    draftFileCount: rows.reduce((sum, row) => sum + row.draftFileCount, 0),
    blockedFileCount: rows.reduce((sum, row) => sum + row.blockedFileCount, 0),
  };
  const metrics = [
    [text.domains || "Domains", `${summary.domainCount}`],
    [text.readyDomains || "Ready", `${summary.readyDomainCount}`],
    [text.reviewDomains || "Review", `${summary.reviewDomainCount}`],
    [text.blockedDomains || "Blocked", `${summary.blockedDomainCount}`],
    [text.emptyDomains || "Empty", `${summary.emptyDomainCount}`],
    [text.dryRunBlockedDomains || "Dry-run blocked", `${summary.dryRunBlockedDomainCount}`],
    [text.stagedBlockedDomains || "Staged blocked", `${summary.stagedBlockedDomainCount}`],
    [text.backupBlockedDomains || "Backup blocked", `${summary.backupBlockedDomainCount}`],
    [text.restoreBlockedDomains || "Restore blocked", `${summary.restoreBlockedDomainCount}`],
    [text.filteredCandidates || "Filtered candidates", `${summary.filteredCandidateCount}`],
    [text.filteredDomains || "Filtered domains", `${summary.filteredDomainCount}`],
    [text.draftFiles || "Draft files", `${summary.draftFileCount}`],
    [text.blockedFiles || "Blocked files", `${summary.blockedFileCount}`],
  ];
  return `
    <section class="editor-content-bulk-contract-summary editor-content-bulk-domain-apply-readiness" aria-label="${escapeAttribute(text.title || "Domain apply readiness")}">
      <div>
        <strong>${escapeHtml(text.title || "Domain apply readiness")}</strong>
        <p class="muted">${escapeHtml(text.description || "Compares dry-run, staged rows, patch draft files, backup blockers, and restore blockers by domain.")}</p>
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
        ${contentBulkDomainChipBlock(text.activeFilter || "Active filter", [
          tf("editorPrep.balanceTuningDetail.contentBulkDomainApplyReadiness.activeFilterSummary", activeFilter, `${activeFilter.state} / ${activeFilter.domain}`)
        ])}
      </div>
      ${renderContentBulkDomainFilterDrilldown(visibleRows, text, {
        domainLabel: (id) => domainLabel(id, text),
      })}
      ${renderContentBulkCurrentFilterPreApplySummary(visibleRows, filterCounts, text, {
        activeFilter,
        domainLabel: (id) => domainLabel(id, text),
        readinessLabel: (state) => contentBulkDomainApplyReadinessLabel(state, text.stateLabels),
      })}
      <div class="editor-content-bulk-patch-draft-list">
        ${rows.map((row) => renderContentBulkDomainApplyReadinessRow(row, text, domainLabel)).join("") || `<p class="muted">${escapeHtml(text.noDomains || "No domains.")}</p>`}
      </div>
    </section>
  `;
}

function contentBulkDomainApplyFilterValues(row = {}, text = {}, domainLabel = (id) => id || "unknown") {
  return [
    row.id,
    row.batchKey,
    domainLabel(row.id, text),
    row.fileNames,
    row.blockingIssueCodes,
    row.warningIssueCodes,
    row.checkScripts,
  ];
}

function contentBulkDomainApplyFilterDomains(row = {}) {
  if (row.id === "monster") return ["monster", "monster_runtime"];
  return [row.id].filter(Boolean);
}

function contentBulkDomainFilterCandidateCount(row = {}, filterCounts = {}) {
  const visibleDomains = filterCounts.visibleDomains || {};
  return contentBulkDomainApplyFilterDomains(row)
    .reduce((sum, domain) => sum + Number(visibleDomains[domain] || 0), 0);
}

function contentBulkDomainApplyReadinessRows({
  dryRun = {},
  stagedImport = {},
  filePatchDraftExport = {},
  backupPlan = {},
  restoreRehearsal = {},
} = {}) {
  const files = Array.isArray(filePatchDraftExport.payload?.files) ? filePatchDraftExport.payload.files : [];
  const backupFiles = Array.isArray(backupPlan.fileBackups) ? backupPlan.fileBackups : [];
  const restoreActions = Array.isArray(restoreRehearsal.restoreActions) ? restoreRehearsal.restoreActions : [];
  const domainIds = new Set([
    ...(dryRun.domains || []).map((domain) => domain.id),
    ...(stagedImport.domains || []).map((domain) => domain.id),
    ...files.flatMap((file) => file.domainIds || []),
    ...backupFiles.flatMap((file) => file.domainIds || []),
    ...restoreActions.flatMap((action) => action.domainIds || []),
  ].filter(Boolean));

  return [...domainIds].map((domainId) => {
    const dryDomain = (dryRun.domains || []).find((domain) => domain.id === domainId) || {};
    const stagedDomain = (stagedImport.domains || []).find((domain) => domain.id === domainId) || {};
    const domainFiles = files.filter((file) => (file.domainIds || []).includes(domainId));
    const domainBackupFiles = backupFiles.filter((file) => (file.domainIds || []).includes(domainId));
    const domainRestoreActions = restoreActions.filter((action) => (action.domainIds || []).includes(domainId));
    const backupBlockerCodes = domainBackupFiles.flatMap((file) => file.reviewBlockerCodes || []).filter(Boolean);
    const restoreBlockerCodes = domainRestoreActions.flatMap((action) => action.rehearsalBlockerCodes || []).filter(Boolean);
    const stageBlockerGroups = {
      dryRun: Array.from(new Set(dryDomain.blockingIssueCodes || [])),
      staged: Array.from(new Set(stagedDomain.blockingIssueCodes || [])),
      backup: Array.from(new Set(backupBlockerCodes)),
      restore: Array.from(new Set(restoreBlockerCodes)),
    };
    const blockedFileNames = new Set([
      ...domainBackupFiles.filter((file) => (file.reviewBlockerCodes || []).filter(Boolean).length > 0).map((file) => file.file),
      ...domainRestoreActions.filter((action) => (action.rehearsalBlockerCodes || []).filter(Boolean).length > 0).map((action) => action.file),
    ].filter(Boolean));
    const blockingIssueCodes = Array.from(new Set([
      ...stageBlockerGroups.dryRun,
      ...stageBlockerGroups.staged,
      ...stageBlockerGroups.backup,
      ...stageBlockerGroups.restore,
    ]));
    const warningIssueCodes = Array.from(new Set([
      ...(dryDomain.warningIssueCodes || []),
      ...(stagedDomain.warningIssueCodes || []),
    ]));
    const draftFileCount = domainFiles.length;
    const blockedFileCount = blockedFileNames.size;
    const readyFileCount = Math.max(0, draftFileCount - blockedFileCount);
    const stagedRowCount = Number(stagedDomain.stagedRowCount || 0);
    const withheldRowCount = Number(stagedDomain.withheldRowCount || 0);
    const state = contentBulkDomainApplyReadinessState({
      rowCount: Number(stagedDomain.rowCount || dryDomain.rowCount || 0),
      stagedRowCount,
      withheldRowCount,
      draftFileCount,
      blockedFileCount,
      blockingIssueCodes,
      warningIssueCodes,
    });
    return {
      id: domainId,
      batchKey: stagedDomain.batchKey || dryDomain.batchKey || "",
      state,
      rowCount: Number(stagedDomain.rowCount || dryDomain.rowCount || 0),
      stagedRowCount,
      withheldRowCount,
      appendStageCount: Number(stagedDomain.appendStageCount || 0),
      updateStageCount: Number(stagedDomain.updateStageCount || 0),
      draftFileCount,
      readyFileCount,
      blockedFileCount,
      generatedSurfaceCount: Number(stagedDomain.generatedSurfaceCount || dryDomain.generatedSurfaceCount || 0),
      blockingIssueCodes,
      warningIssueCodes,
      stageBlockerGroups,
      fileNames: domainFiles.map((file) => file.file).filter(Boolean),
      checkScripts: Array.from(new Set([
        ...(stagedDomain.checkScripts || []),
        ...(dryDomain.checkScripts || []),
      ])),
    };
  });
}

function contentBulkDomainApplyReadinessState({
  rowCount = 0,
  stagedRowCount = 0,
  withheldRowCount = 0,
  draftFileCount = 0,
  blockedFileCount = 0,
  blockingIssueCodes = [],
  warningIssueCodes = [],
} = {}) {
  if (rowCount <= 0 && stagedRowCount <= 0 && draftFileCount <= 0) return "empty";
  if (withheldRowCount > 0 || blockedFileCount > 0 || blockingIssueCodes.length > 0) return "blocked";
  if (warningIssueCodes.length > 0) return "review";
  return "ready";
}

function renderContentBulkDomainApplyReadinessRow(row = {}, text = {}, domainLabel = (id) => id || "unknown") {
  return `
    <article class="editor-content-bulk-patch-draft-file" data-state="${escapeAttribute(row.state || "unknown")}" data-filter-visible="${row.filterMatched ? "true" : "false"}" data-blocked-stages="${escapeAttribute(contentBulkDomainBlockedStageIds(row.stageBlockerGroups).join(" "))}">
      <div class="editor-content-bulk-patch-draft-file-head">
        <div>
          <h5>${escapeHtml(domainLabel(row.id, text))}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkDomainApplyReadiness.domainMeta", {
            rows: row.rowCount || 0,
            staged: row.stagedRowCount || 0,
            withheld: row.withheldRowCount || 0,
            files: row.draftFileCount || 0,
            blocked: row.blockedFileCount || 0,
          }, `${row.stagedRowCount || 0} staged / ${row.draftFileCount || 0} files`))}</p>
        </div>
        <span>${escapeHtml(contentBulkDomainApplyReadinessLabel(row.state, text.stateLabels))}</span>
      </div>
      <div class="editor-content-bulk-patch-draft-grid">
        ${contentBulkDomainChipBlock(text.rows || "Rows", [
          tf("editorPrep.balanceTuningDetail.contentBulkDomainApplyReadiness.rowSummary", {
            rows: row.rowCount || 0,
            staged: row.stagedRowCount || 0,
            append: row.appendStageCount || 0,
            update: row.updateStageCount || 0,
            withheld: row.withheldRowCount || 0,
          }, `${row.stagedRowCount || 0}`)
        ])}
        ${contentBulkDomainChipBlock(text.files || "Files", [
          tf("editorPrep.balanceTuningDetail.contentBulkDomainApplyReadiness.fileSummary", {
            files: row.draftFileCount || 0,
            ready: row.readyFileCount || 0,
            blocked: row.blockedFileCount || 0,
          }, `${row.draftFileCount || 0}`)
        ])}
        ${contentBulkDomainChipBlock(text.filterScope || "Filter scope", [
          tf("editorPrep.balanceTuningDetail.contentBulkDomainApplyReadiness.filterScopeSummary", {
            candidates: row.filterVisibleCandidateCount || 0,
            state: row.filterMatched ? (text.filterMatched || "shown") : (text.filterHidden || "hidden"),
          }, `${row.filterVisibleCandidateCount || 0}`)
        ])}
        ${contentBulkDomainChipBlock(text.blockerStages || "Blocker stages", contentBulkDomainStageBlockerLabels(row.stageBlockerGroups, text))}
        ${contentBulkDomainChipBlock(text.patchFiles || "Patch files", contentBulkIssueList(row.fileNames, text))}
        ${contentBulkDomainChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(row.blockingIssueCodes, text))}
        ${contentBulkDomainChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(row.warningIssueCodes, text))}
        ${contentBulkDomainChipBlock(text.guardChecks || "Guard checks", row.checkScripts || [])}
      </div>
    </article>
  `;
}

function contentBulkDomainBlockedStageIds(groups = {}) {
  return ["dryRun", "staged", "backup", "restore"].filter((stageId) => (groups?.[stageId] || []).filter(Boolean).length > 0);
}

function contentBulkDomainStageBlockerLabels(groups = {}, text = {}) {
  const labels = text.stageLabels || {};
  return ["dryRun", "staged", "backup", "restore"].map((stageId) => tf("editorPrep.balanceTuningDetail.contentBulkDomainApplyReadiness.stageBlockerSummary", {
    stage: labels[stageId] || stageId,
    count: (groups?.[stageId] || []).filter(Boolean).length,
  }, `${labels[stageId] || stageId}: ${(groups?.[stageId] || []).filter(Boolean).length}`));
}

function contentBulkDomainApplyReadinessLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function contentBulkDomainChipBlock(title, values = []) {
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
