import { tf } from "../localization/index.js?v=675";

export const CONTENT_BULK_PATCH_DIFF_EXPORT_VIEW_VERSION = "content-bulk-patch-diff-export-view-v1";

export function renderContentBulkPatchDiffExport(preview, detailText = {}) {
  const text = detailText.contentBulkPatchDiffExport || {};
  const summary = preview.summary || {};
  const metrics = [
    [text.targetFiles || "Target files", `${summary.targetFileCount || 0}`],
    [text.targetSurfaces || "Target surfaces", `${summary.targetSurfaceCount || 0}`],
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount || 0}`],
    [text.appendStages || "Append", `${summary.appendStageCount || 0}`],
    [text.updateStages || "Update", `${summary.updateStageCount || 0}`],
    [text.withheldRows || "Withheld", `${summary.withheldRowCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.applyMode || "Apply mode", preview.applyMode || "-"],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-diff" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Diff Export")}">
      <div class="editor-content-bulk-diff-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Diff Export")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only file and surface map before applying staged batch rows.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchDiffExport.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-diff-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-diff-list">
        ${(preview.fileTargets || []).map((target) => renderContentBulkPatchDiffTarget(target, text)).join("") || `<p class="muted">${escapeHtml(text.noTargets || "No diff targets.")}</p>`}
      </div>
      <div class="editor-content-bulk-diff-steps">
        <strong>${escapeHtml(text.reviewSteps || "Review steps")}</strong>
        <div class="editor-chip-list">
          ${chip(contentBulkPatchDiffStatusLabel(preview.status, text))}
          ${(preview.manualReviewSteps || []).map((step) => chip(contentBulkPatchDiffStepLabel(step, text))).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderContentBulkPatchDiffTarget(target, text = {}) {
  const surfaceLabels = (target.surfaces || []).map((surface) => {
    const name = surface.surface || surface.id || "-";
    return `${surface.domainId || "-"} · ${name} (${surface.stagedCandidateCount || 0})`;
  });
  return `
    <article class="editor-content-bulk-diff-target">
      <div class="editor-content-bulk-diff-target-head">
        <div>
          <h5>${escapeHtml(target.file || "-")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchDiffExport.targetMeta", {
            surfaces: target.surfaceCount || 0,
            staged: target.stagedRowCount || 0,
            append: target.appendStageCount || 0,
            update: target.updateStageCount || 0,
            withheld: target.withheldRowCount || 0,
          }, `${target.surfaceCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${(target.domainIds || []).map((domainId) => chip(contentBulkPatchDomainLabel(domainId, text))).join("")}
        </div>
      </div>
      <div class="editor-content-bulk-diff-grid">
        ${contentBulkPatchDiffChipBlock(text.domains || "Domains", target.domainIds || [])}
        ${contentBulkPatchDiffChipBlock(text.surfaces || "Surfaces", surfaceLabels)}
      </div>
    </article>
  `;
}

function contentBulkPatchDomainLabel(domainId, text = {}) {
  return text.domainLabels?.[domainId] || domainId || "unknown";
}

function contentBulkPatchDiffStatusLabel(statusId, text = {}) {
  return text.statusLabels?.[statusId] || statusId || "unknown";
}

function contentBulkPatchDiffStepLabel(stepId, text = {}) {
  return text.stepLabels?.[stepId] || stepId || "unknown";
}

function contentBulkPatchDiffChipBlock(title, values = []) {
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
