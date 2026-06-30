export const CONTENT_BULK_DOMAIN_FILTER_DRILLDOWN_VERSION = "content-bulk-domain-filter-drilldown-v1";

export function renderContentBulkDomainFilterDrilldown(rows = [], text = {}, helpers = {}) {
  const summary = createContentBulkDomainFilterDrilldownSummary(rows);
  const domainLabel = helpers.domainLabel || ((id) => id || "unknown");
  const state = summary.blockedDomainCount > 0 ? "blocked" : rows.length ? "ready" : "empty";
  const metrics = [
    [text.filteredDomains || "Filtered domains", `${rows.length}`],
    [text.dryRunBlockedDomains || "Dry-run blocked", `${summary.stageCounts.dryRun}`],
    [text.stagedBlockedDomains || "Staged blocked", `${summary.stageCounts.staged}`],
    [text.backupBlockedDomains || "Backup blocked", `${summary.stageCounts.backup}`],
    [text.restoreBlockedDomains || "Restore blocked", `${summary.stageCounts.restore}`],
  ];
  return `
    <div class="editor-content-bulk-contract-summary editor-content-bulk-domain-filter-drilldown" data-state="${escapeAttribute(state)}">
      <div>
        <strong>${escapeHtml(text.filterDrilldownTitle || "Current filter blocker drilldown")}</strong>
        <p class="muted">${escapeHtml(text.filterDrilldownHint || "Stage blockers only for domains matching the current filter.")}</p>
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
        ${balanceDetailChipBlock(text.filterDrilldownDomains || "Visible domains", rows.map((row) => domainLabel(row.id)))}
      </div>
    </div>
  `;
}

export function createContentBulkDomainFilterDrilldownSummary(rows = []) {
  const stageCounts = contentBulkDomainStageCounts(rows);
  return {
    filteredDomainCount: rows.length,
    blockedDomainCount: rows.filter((row) => row.state === "blocked").length,
    stageCounts,
    blockedStageCount: Object.values(stageCounts).reduce((sum, count) => sum + Number(count || 0), 0),
  };
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
