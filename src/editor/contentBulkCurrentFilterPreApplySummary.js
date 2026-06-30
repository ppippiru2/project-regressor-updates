import { tf } from "../localization/index.js?v=675";

export const CONTENT_BULK_CURRENT_FILTER_PRE_APPLY_SUMMARY_VERSION = "content-bulk-current-filter-pre-apply-summary-v1";

export function renderContentBulkCurrentFilterPreApplySummary(rows = [], filterCounts = {}, text = {}, helpers = {}) {
  const summary = createContentBulkCurrentFilterPreApplySummary(rows, filterCounts);
  const activeFilter = helpers.activeFilter || { state: text.all || "all", domain: text.all || "all", query: text.noQuery || "none" };
  const state = summary.filteredDomainCount <= 0
    ? "empty"
    : (summary.blockedDomainCount > 0 || summary.blockedStageCount > 0 ? "blocked" : (summary.reviewDomainCount > 0 ? "review" : "ready"));
  const metrics = [
    [text.currentFilterCandidates || "Current filter candidates", `${summary.filteredCandidateCount}`],
    [text.filteredDomains || "Filtered domains", `${summary.filteredDomainCount}`],
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount}`],
    [text.withheldRows || "Withheld rows", `${summary.withheldRowCount}`],
    [text.patchDraftFiles || "Patch draft files", `${summary.patchDraftFileCount}`],
    [text.readyPatchFiles || "Ready patch files", `${summary.readyPatchFileCount}`],
    [text.blockedFiles || "Blocked files", `${summary.blockedPatchFileCount}`],
    [text.blockedStageCount || "Blocked stages", `${summary.blockedStageCount}`],
    [text.domainBlockerPreviewCount || "Domain blocker previews", `${summary.domainBlockerPreviewCount}`],
    [text.requiredChecks || "Required checks", `${summary.requiredCheckCount}`],
  ];
  return `
    <div class="editor-content-bulk-contract-summary editor-content-bulk-current-filter-preapply" data-current-filter-preapply data-state="${escapeAttribute(state)}">
      <div>
        <strong>${escapeHtml(text.filterPreApplyTitle || "Current filter pre-apply summary")}</strong>
        <p class="muted">${escapeHtml(text.filterPreApplyHint || "Read-only summary of staged rows, patch draft files, and blockers for the current filter.")}</p>
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
        ${balanceDetailChipBlock(text.activeFilter || "Active filter", [
          tf("editorPrep.balanceTuningDetail.contentBulkDomainApplyReadiness.activeFilterSummary", activeFilter, `${activeFilter.state} / ${activeFilter.domain}`)
        ])}
        ${balanceDetailChipBlock(text.blockerStages || "Blocker stages", contentBulkCurrentFilterStageLabels(summary.stageCounts, text))}
        ${balanceDetailChipBlock(text.domainBlockerPreview || "Domain blockers", summary.domainBlockerPreviewCodes)}
        ${balanceDetailChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(summary.blockingIssueCodes, text))}
        ${balanceDetailChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(summary.warningIssueCodes, text))}
      </div>
      <div class="editor-content-bulk-current-filter-list">
        ${rows.map((row) => renderContentBulkCurrentFilterPreApplyDomain(row, text, helpers)).join("") || `<p class="muted">${escapeHtml(text.noFilteredPreApplyRows || "No current filter pre-apply rows.")}</p>`}
      </div>
    </div>
  `;
}

export function createContentBulkCurrentFilterPreApplySummary(rows = [], filterCounts = {}) {
  const stageCounts = contentBulkDomainStageCounts(rows);
  const checkScripts = new Set(rows.flatMap((row) => row.checkScripts || []).filter(Boolean));
  const domainBlockerPreviewCodes = Array.from(new Set(rows.flatMap((row) => contentBulkCurrentFilterDomainBlockerCodes(row))));
  return {
    filteredCandidateCount: Number(filterCounts.visibleRows || 0),
    filteredDomainCount: rows.length,
    readyDomainCount: rows.filter((row) => row.state === "ready").length,
    reviewDomainCount: rows.filter((row) => row.state === "review").length,
    blockedDomainCount: rows.filter((row) => row.state === "blocked").length,
    stagedRowCount: rows.reduce((sum, row) => sum + Number(row.stagedRowCount || 0), 0),
    withheldRowCount: rows.reduce((sum, row) => sum + Number(row.withheldRowCount || 0), 0),
    appendStageCount: rows.reduce((sum, row) => sum + Number(row.appendStageCount || 0), 0),
    updateStageCount: rows.reduce((sum, row) => sum + Number(row.updateStageCount || 0), 0),
    patchDraftFileCount: rows.reduce((sum, row) => sum + Number(row.draftFileCount || 0), 0),
    readyPatchFileCount: rows.reduce((sum, row) => sum + Number(row.readyFileCount || 0), 0),
    blockedPatchFileCount: rows.reduce((sum, row) => sum + Number(row.blockedFileCount || 0), 0),
    generatedSurfaceCount: rows.reduce((sum, row) => sum + Number(row.generatedSurfaceCount || 0), 0),
    blockedStageCount: Object.values(stageCounts).reduce((sum, count) => sum + Number(count || 0), 0),
    domainBlockerPreviewCount: domainBlockerPreviewCodes.length,
    domainBlockerPreviewCodes,
    requiredCheckCount: checkScripts.size,
    blockingIssueCodes: Array.from(new Set(rows.flatMap((row) => row.blockingIssueCodes || []).filter(Boolean))),
    warningIssueCodes: Array.from(new Set(rows.flatMap((row) => row.warningIssueCodes || []).filter(Boolean))),
    stageCounts,
  };
}

function renderContentBulkCurrentFilterPreApplyDomain(row = {}, text = {}, helpers = {}) {
  const domainLabel = helpers.domainLabel || ((id) => id || "unknown");
  const readinessLabel = helpers.readinessLabel || ((state) => state || "unknown");
  return `
    <article class="editor-content-bulk-current-filter-domain" data-state="${escapeAttribute(row.state || "unknown")}" data-blocked-stages="${escapeAttribute(contentBulkDomainBlockedStageIds(row.stageBlockerGroups).join(" "))}" data-current-filter-domain-blockers="${escapeAttribute(contentBulkCurrentFilterDomainBlockerCodes(row).join("|"))}">
      <div class="editor-content-bulk-patch-draft-file-head">
        <div>
          <h5>${escapeHtml(domainLabel(row.id))}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkDomainApplyReadiness.domainPreApplyMeta", {
            candidates: row.filterVisibleCandidateCount || 0,
            staged: row.stagedRowCount || 0,
            files: row.draftFileCount || 0,
            blocked: row.blockedFileCount || 0,
          }, `${row.stagedRowCount || 0} staged / ${row.draftFileCount || 0} files`))}</p>
        </div>
        <span>${escapeHtml(readinessLabel(row.state))}</span>
      </div>
      <div class="editor-content-bulk-patch-draft-grid">
        ${balanceDetailChipBlock(text.rows || "Rows", [
          tf("editorPrep.balanceTuningDetail.contentBulkDomainApplyReadiness.rowSummary", {
            rows: row.rowCount || 0,
            staged: row.stagedRowCount || 0,
            append: row.appendStageCount || 0,
            update: row.updateStageCount || 0,
            withheld: row.withheldRowCount || 0,
          }, `${row.stagedRowCount || 0}`)
        ])}
        ${balanceDetailChipBlock(text.files || "Files", [
          tf("editorPrep.balanceTuningDetail.contentBulkDomainApplyReadiness.fileSummary", {
            files: row.draftFileCount || 0,
            ready: row.readyFileCount || 0,
            blocked: row.blockedFileCount || 0,
          }, `${row.draftFileCount || 0}`)
        ])}
        ${balanceDetailChipBlock(text.blockerStages || "Blocker stages", contentBulkDomainStageBlockerLabels(row.stageBlockerGroups, text))}
        ${balanceDetailChipBlock(text.domainBlockerPreview || "Domain blockers", contentBulkCurrentFilterDomainBlockerLabels(row, text))}
        ${balanceDetailChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(row.blockingIssueCodes, text))}
        ${balanceDetailChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(row.warningIssueCodes, text))}
        ${balanceDetailChipBlock(text.guardChecks || "Guard checks", row.checkScripts || [])}
      </div>
    </article>
  `;
}

function contentBulkCurrentFilterStageLabels(stageCounts = {}, text = {}) {
  const labels = text.stageLabels || {};
  return ["dryRun", "staged", "backup", "restore"].map((stageId) => tf("editorPrep.balanceTuningDetail.contentBulkDomainApplyReadiness.filterPreApplyStageSummary", {
    stage: labels[stageId] || stageId,
    count: Number(stageCounts?.[stageId] || 0),
  }, `${labels[stageId] || stageId}: ${Number(stageCounts?.[stageId] || 0)}`));
}

function contentBulkCurrentFilterDomainBlockerCodes(row = {}) {
  const groups = row.stageBlockerGroups || {};
  return ["dryRun", "staged", "backup", "restore"].flatMap((stageId) =>
    (groups?.[stageId] || [])
      .filter(Boolean)
      .map((code) => `${stageId}:${code}`)
  );
}

function contentBulkCurrentFilterDomainBlockerLabels(row = {}, text = {}) {
  const labels = text.stageLabels || {};
  const codes = contentBulkCurrentFilterDomainBlockerCodes(row);
  if (!codes.length) return [text.noIssues || "None"];
  return codes.map((entry) => {
    const [stageId, ...codeParts] = entry.split(":");
    const code = codeParts.join(":");
    return tf("editorPrep.balanceTuningDetail.contentBulkDomainApplyReadiness.domainBlockerPreview", {
      stage: labels[stageId] || stageId,
      code,
    }, `${labels[stageId] || stageId}: ${code}`);
  });
}

function contentBulkDomainStageCounts(rows = []) {
  return rows.reduce((counts, row) => {
    for (const stageId of contentBulkDomainBlockedStageIds(row.stageBlockerGroups)) {
      counts[stageId] = Number(counts[stageId] || 0) + 1;
    }
    return counts;
  }, {
    dryRun: 0,
    staged: 0,
    backup: 0,
    restore: 0,
  });
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

function contentBulkIssueList(codes = [], text = {}) {
  const list = Array.isArray(codes) ? codes.filter(Boolean) : [];
  return list.length ? list : [text.noIssues || "None"];
}

function balanceDetailChipBlock(title, values = []) {
  const normalizedValues = Array.isArray(values) ? values.filter(Boolean) : [];
  return `
    <div>
      <small>${escapeHtml(title)}</small>
      <div class="editor-chip-list">
        ${normalizedValues.length ? normalizedValues.map((value) => `<span>${escapeHtml(value)}</span>`).join("") : `<span>${escapeHtml("-")}</span>`}
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

function escapeAttribute(value) {
  return escapeHtml(value);
}
