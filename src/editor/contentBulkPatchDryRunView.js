import { tf } from "../localization/index.js?v=676";
import { contentBulkChipBlock } from "./contentBulkChipBlockView.js?v=676";
import { contentBulkFallbackLabel, contentBulkPatchDomainLabel } from "./contentBulkFilterModel.js?v=676";
import { contentBulkIssueList, renderContentBulkIssueSummary } from "./contentBulkIssueSummaryView.js?v=676";
import { editorChip } from "./editorChipBlockView.js?v=676";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=676";

export const CONTENT_BULK_PATCH_DRY_RUN_VIEW_VERSION = "content-bulk-patch-dry-run-view-v1";

export function renderContentBulkPatchDryRunPreview(preview, detailText = {}) {
  const text = detailText.contentBulkPatchDryRunImporter || {};
  const summary = preview.summary || {};
  const metrics = [
    [text.rows || "Rows", `${summary.rowCount || 0}`],
    [text.activeDomains || "Active domains", `${summary.activeDomainCount || 0}`],
    [text.appendCandidates || "Append", `${summary.appendCandidateCount || 0}`],
    [text.updateCandidates || "Update", `${summary.updateCandidateCount || 0}`],
    [text.generatedSurfaces || "Generated surfaces", `${summary.generatedSurfaceCount || 0}`],
    [text.blockers || "Blockers", `${summary.blockingIssueCount || 0}`],
    [text.warnings || "Warnings", `${summary.warningIssueCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-dry-run" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Dry-run Importer")}">
      <div class="editor-content-bulk-dry-run-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Dry-run Importer")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only dry-run preview for batch imports.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchDryRunImporter.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-dry-run-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      ${renderContentBulkIssueSummary(preview.issueSummary, text)}
      <div class="editor-content-bulk-dry-run-list">
        ${(preview.domains || []).map((domain) => renderContentBulkPatchDryRunDomain(domain, text)).join("") || `<p class="muted">${escapeHtml(text.noDomains || "No dry-run domains.")}</p>`}
      </div>
    </section>
  `;
}

function renderContentBulkPatchDryRunDomain(domain, text = {}) {
  const surfaceLabels = (domain.surfaces || []).map((surface) => `${surface.id} (${surface.candidateCount || 0})`);
  return `
    <article class="editor-content-bulk-dry-run-domain" data-state="${escapeAttribute(domain.state || "unknown")}">
      <div class="editor-content-bulk-dry-run-domain-head">
        <div>
          <h5>${escapeHtml(contentBulkPatchDomainLabel(domain.id, text))}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchDryRunImporter.domainMeta", {
            rows: domain.rowCount || 0,
            append: domain.appendCandidateCount || 0,
            update: domain.updateCandidateCount || 0,
            surfaces: domain.generatedSurfaceCount || 0,
          }, `${domain.rowCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${editorChip(contentBulkFallbackLabel(domain.state, text.stateLabels))}
        </div>
      </div>
      <div class="editor-content-bulk-dry-run-grid">
        ${contentBulkChipBlock(text.batchKey || "Batch key", [domain.batchKey].filter(Boolean))}
        ${contentBulkChipBlock(text.identityFields || "Identity", domain.identityFields || [])}
        ${contentBulkChipBlock(text.targetSurfaces || "Target surfaces", surfaceLabels)}
        ${contentBulkChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(domain.blockingIssueCodes, text))}
        ${contentBulkChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(domain.warningIssueCodes, text))}
        ${contentBulkChipBlock(text.guardChecks || "Guard checks", domain.checkScripts || [])}
      </div>
    </article>
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
