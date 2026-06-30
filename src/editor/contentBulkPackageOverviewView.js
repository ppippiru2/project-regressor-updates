import { tf } from "../localization/index.js?v=675";

export const CONTENT_BULK_PACKAGE_OVERVIEW_VIEW_VERSION = "content-bulk-package-overview-view-v1";

export function renderContentBulkPackageOverview(preview, detailText = {}, filterCounts = {}, helpers = {}) {
  const text = detailText.contentBulkPackageOverview || {};
  const summary = preview.summary || {};
  const filterControls = typeof helpers.renderFilterControls === "function"
    ? helpers.renderFilterControls(text, filterCounts)
    : "";
  const metrics = [
    [text.packageRows || "Package rows", `${summary.packageRowCount || 0}`],
    [text.activeDomains || "Active domains", `${summary.activeDomainCount || 0}`],
    [text.readyRows || "Ready", `${summary.readyRowCount || 0}`],
    [text.warningRows || "Review", `${summary.warningRowCount || 0}`],
    [text.blockedRows || "Blocked", `${summary.blockedRowCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section id="content-bulk-package-overview" class="editor-content-bulk-overview" data-state="${escapeAttribute(preview.status || "ready")}" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Package Overview")}">
      <div class="editor-content-bulk-overview-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Package Overview")}</h4>
          <p class="muted">${escapeHtml(text.description || "Summarizes the current bulk package before reviewing each specialized card.")}</p>
        </div>
        <strong>${escapeHtml(contentBulkOverviewLabel(preview.status || "ready", text.statusLabels))}</strong>
      </div>
      <div class="editor-content-bulk-overview-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${filterControls}
      <div class="editor-content-bulk-overview-grid">
        ${contentBulkOverviewChipBlock(text.recognizedSourceKeys || "Recognized source keys", [`${summary.recognizedSourceKeyCount || 0}`])}
        ${contentBulkOverviewChipBlock(text.unmappedSourceKeys || "Unmapped source keys", [`${summary.unmappedSourceKeyCount || 0}`])}
        ${contentBulkOverviewChipBlock(text.reviewSurfaces || "Review surfaces", [`${summary.reviewSurfaceCount || 0}`])}
      </div>
      <div class="editor-content-bulk-overview-list">
        ${(preview.reviewRows || []).map((row) => renderContentBulkOverviewRow(row, text)).join("")}
      </div>
      <div class="editor-content-bulk-overview-domains">
        ${(preview.domainRows || []).map((row) => renderContentBulkOverviewDomain(row, text)).join("")}
      </div>
    </section>
  `;
}

function renderContentBulkOverviewRow(row, text = {}) {
  return `
    <article class="editor-content-bulk-overview-row" data-state="${escapeAttribute(row.state || "empty")}">
      <div>
        <h5>${escapeHtml(contentBulkOverviewLabel(row.id, text.surfaceLabels))}</h5>
        <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPackageOverview.rowMeta", {
          rows: row.rowCount || 0,
          ready: row.readyCount || 0,
          blocked: row.blockedCount || 0,
        }, `${row.rowCount || 0}`))}</p>
      </div>
      <div class="editor-content-bulk-overview-actions">
        <span>${escapeHtml(contentBulkOverviewLabel(row.state, text.statusLabels))}</span>
        ${contentBulkOverviewJumpLink(row.primaryRowTargetId || row.drilldownTargetId, text)}
      </div>
    </article>
  `;
}

function renderContentBulkOverviewDomain(row, text = {}) {
  return `
    <article class="editor-content-bulk-overview-domain" data-state="${escapeAttribute(row.state || "empty")}">
      <div>
        <strong>${escapeHtml(contentBulkPackageDomainLabel(row.id, text))}</strong>
        <span>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPackageOverview.domainMeta", {
          batchKey: row.batchKey || "-",
          rows: row.rowCount || 0,
        }, `${row.batchKey || "-"} / ${row.rowCount || 0}`))}</span>
      </div>
      ${contentBulkOverviewJumpLink(row.rowTargetId || row.drilldownTargetId, text)}
    </article>
  `;
}

function contentBulkOverviewLabel(id, labels = {}) {
  return labels?.[id] || id || "-";
}

function contentBulkPackageDomainLabel(domainId, text = {}) {
  return text.domainLabels?.[domainId] || domainId || "unknown";
}

function contentBulkOverviewJumpLink(targetId, text = {}) {
  if (!targetId) return "";
  return `
    <a class="editor-content-bulk-overview-jump" href="#${escapeAttribute(targetId)}">${escapeHtml(text.jumpToDetail || "Jump")}</a>
  `;
}

function contentBulkOverviewChipBlock(title, values = []) {
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
