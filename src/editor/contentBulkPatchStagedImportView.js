import { tf } from "../localization/index.js?v=675";
import { contentBulkIssueList, renderContentBulkIssueSummary } from "./contentBulkIssueSummaryView.js?v=675";

export const CONTENT_BULK_PATCH_STAGED_IMPORT_VIEW_VERSION = "content-bulk-patch-staged-import-view-v1";

export function renderContentBulkPatchStagedImportPreview(preview, detailText = {}) {
  const text = detailText.contentBulkPatchStagedImportPreview || {};
  const summary = preview.summary || {};
  const metrics = [
    [text.inputRows || "Input rows", `${summary.inputRowCount || 0}`],
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount || 0}`],
    [text.appendStages || "Append", `${summary.appendStageCount || 0}`],
    [text.updateStages || "Update", `${summary.updateStageCount || 0}`],
    [text.withheldRows || "Withheld", `${summary.withheldRowCount || 0}`],
    [text.generatedSurfaces || "Generated surfaces", `${summary.generatedSurfaceCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.applyMode || "Apply mode", preview.applyMode || "-"],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-stage" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Staged Import Preview")}">
      <div class="editor-content-bulk-stage-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Staged Import Preview")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only staged apply preview for validated batch rows.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchStagedImportPreview.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-stage-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${renderContentBulkIssueSummary(preview.issueSummary, text)}
      <div class="editor-content-bulk-stage-list">
        ${(preview.domains || []).map((domain) => renderContentBulkPatchStagedImportDomain(domain, text)).join("") || `<p class="muted">${escapeHtml(text.noDomains || "No staged domains.")}</p>`}
      </div>
      <div class="editor-content-bulk-stage-steps">
        <strong>${escapeHtml(text.applySteps || "Apply steps")}</strong>
        <div class="editor-chip-list">
          ${(preview.applySteps || []).map((step) => chip(contentBulkPatchStageStepLabel(step, text))).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderContentBulkPatchStagedImportDomain(domain, text = {}) {
  const surfaceLabels = (domain.surfaces || []).map((surface) => `${surface.id} (${surface.stagedCandidateCount || 0})`);
  const contractReviewSummary = domain.contractReviewSummary || {};
  const contractReviewLabels = [
    tf("editorPrep.balanceTuningDetail.contentBulkPatchStagedImportPreview.contractReadyRows", {
      count: contractReviewSummary.readyForStageCount || 0,
    }, `${text.readyRows || "Ready"}: ${contractReviewSummary.readyForStageCount || 0}`),
    tf("editorPrep.balanceTuningDetail.contentBulkPatchStagedImportPreview.contractBlockedRows", {
      count: contractReviewSummary.blockedCount || 0,
    }, `${text.blockedRows || "Blocked"}: ${contractReviewSummary.blockedCount || 0}`),
    tf("editorPrep.balanceTuningDetail.contentBulkPatchStagedImportPreview.contractWarningRows", {
      count: contractReviewSummary.warningCount || 0,
    }, `${text.warningRows || "Warnings"}: ${contractReviewSummary.warningCount || 0}`),
    tf("editorPrep.balanceTuningDetail.contentBulkPatchStagedImportPreview.contractTargetSurfaces", {
      count: contractReviewSummary.targetSurfaceCount || 0,
    }, `${text.targetSurfaces || "Target surfaces"}: ${contractReviewSummary.targetSurfaceCount || 0}`),
  ];
  const rowLabels = (domain.rows || []).map((row) => tf("editorPrep.balanceTuningDetail.contentBulkPatchStagedImportPreview.rowMeta", {
    index: row.rowIndex + 1,
    identity: row.identity || "-",
    state: contentBulkPatchStageRowStateLabel(row.state, text),
    surfaces: row.targetSurfaceCount || 0,
  }, `#${row.rowIndex + 1} ${row.identity || "-"} ${row.state}`));
  return `
    <article class="editor-content-bulk-stage-domain" data-state="${escapeAttribute(domain.state || "unknown")}">
      <div class="editor-content-bulk-stage-domain-head">
        <div>
          <h5>${escapeHtml(contentBulkPatchDomainLabel(domain.id, text))}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchStagedImportPreview.domainMeta", {
            rows: domain.rowCount || 0,
            staged: domain.stagedRowCount || 0,
            append: domain.appendStageCount || 0,
            update: domain.updateStageCount || 0,
            withheld: domain.withheldRowCount || 0,
          }, `${domain.rowCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${chip(contentBulkPatchStageStateLabel(domain.state, text))}
        </div>
      </div>
      <div class="editor-content-bulk-stage-grid">
        ${contentBulkPatchStageChipBlock(text.batchKey || "Batch key", [domain.batchKey].filter(Boolean))}
        ${contentBulkPatchStageChipBlock(text.contractReview || "Contract review", contractReviewLabels)}
        ${contentBulkPatchStageChipBlock(text.stagedRows || "Staged rows", rowLabels)}
        ${contentBulkPatchStageChipBlock(text.targetSurfaces || "Target surfaces", surfaceLabels)}
        ${contentBulkPatchStageChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(domain.blockingIssueCodes, text))}
        ${contentBulkPatchStageChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(domain.warningIssueCodes, text))}
        ${contentBulkPatchStageChipBlock(text.guardChecks || "Guard checks", domain.checkScripts || [])}
      </div>
    </article>
  `;
}

function contentBulkPatchDomainLabel(domainId, text = {}) {
  return text.domainLabels?.[domainId] || domainId || "unknown";
}

function contentBulkPatchStageStateLabel(stateId, text = {}) {
  return text.stateLabels?.[stateId] || stateId || "unknown";
}

function contentBulkPatchStageRowStateLabel(stateId, text = {}) {
  return text.rowStateLabels?.[stateId] || stateId || "unknown";
}

function contentBulkPatchStageStepLabel(stepId, text = {}) {
  return text.stepLabels?.[stepId] || stepId || "unknown";
}

function contentBulkPatchStageChipBlock(title, values = []) {
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

function escapeAttribute(value) {
  return escapeHtml(value);
}
