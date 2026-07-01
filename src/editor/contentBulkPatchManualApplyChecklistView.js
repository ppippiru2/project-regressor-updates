import { tf } from "../localization/index.js?v=675";
import { contentBulkChipBlock } from "./contentBulkChipBlockView.js?v=675";
import { contentBulkFallbackLabel } from "./contentBulkFilterModel.js?v=675";
import { editorChip } from "./editorChipBlockView.js?v=675";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=675";

export const CONTENT_BULK_PATCH_MANUAL_APPLY_CHECKLIST_VIEW_VERSION = "content-bulk-patch-manual-apply-checklist-view-v1";

export function renderContentBulkPatchManualApplyChecklist(checklist, detailText = {}) {
  const text = detailText.contentBulkPatchManualApplyChecklist || {};
  const summary = checklist.summary || {};
  const metrics = [
    [text.targetFiles || "Target files", `${summary.targetFileCount || 0}`],
    [text.targetSurfaces || "Target surfaces", `${summary.targetSurfaceCount || 0}`],
    [text.manualItems || "Manual items", `${summary.manualItemCount || 0}`],
    [text.surfaceReviewItems || "Surface reviews", `${summary.surfaceReviewItemCount || 0}`],
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount || 0}`],
    [text.updateFiles || "Update files", `${summary.updateFileCount || 0}`],
    [text.verificationSteps || "Verification", `${summary.verificationStepCount || 0}`],
    [text.applyMode || "Apply mode", checklist.applyMode || "-"],
    [text.writes || "Writes", checklist.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-checklist" data-readonly="${checklist.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Manual Apply Checklist")}">
      <div class="editor-content-bulk-checklist-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Manual Apply Checklist")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only manual apply checklist from diff export targets.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchManualApplyChecklist.version", {
          version: checklist.version || "-"
        }, checklist.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-checklist-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      <div class="editor-content-bulk-checklist-steps">
        <strong>${escapeHtml(text.preflightSteps || "Preflight steps")}</strong>
        <div class="editor-chip-list">
          ${editorChip(contentBulkFallbackLabel(checklist.status, text.statusLabels))}
          ${(checklist.preflightSteps || []).map((step) => editorChip(contentBulkFallbackLabel(step, text.stepLabels))).join("")}
        </div>
      </div>
      <div class="editor-content-bulk-checklist-list">
        ${(checklist.fileChecklists || []).map((entry) => renderContentBulkPatchManualApplyFile(entry, text)).join("") || `<p class="muted">${escapeHtml(text.noFiles || "No checklist files.")}</p>`}
      </div>
      <div class="editor-content-bulk-checklist-steps">
        <strong>${escapeHtml(text.finalReviewSteps || "Final review steps")}</strong>
        <div class="editor-chip-list">
          ${(checklist.finalReviewSteps || []).map((step) => editorChip(contentBulkFallbackLabel(step, text.stepLabels))).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderContentBulkPatchManualApplyFile(entry, text = {}) {
  const surfaceLabels = (entry.surfaceReviewItems || []).map((item) => `${item.domainId || "-"} · ${item.surface || item.id || "-"} · ${contentBulkFallbackLabel(item.reviewAction, text.actionLabels)}`);
  return `
    <article class="editor-content-bulk-checklist-file" data-state="${escapeAttribute(entry.status || "unknown")}">
      <div class="editor-content-bulk-checklist-file-head">
        <div>
          <h5>${escapeHtml(`${entry.order || "-"} · ${entry.file || "-"}`)}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchManualApplyChecklist.fileMeta", {
            surfaces: entry.surfaceCount || 0,
            staged: entry.stagedRowCount || 0,
            append: entry.appendStageCount || 0,
            update: entry.updateStageCount || 0,
            withheld: entry.withheldRowCount || 0,
          }, `${entry.surfaceCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${editorChip(contentBulkFallbackLabel(entry.status, text.statusLabels))}
        </div>
      </div>
      <div class="editor-content-bulk-checklist-grid">
        ${contentBulkChipBlock(text.domains || "Domains", entry.domainIds || [])}
        ${contentBulkChipBlock(text.actions || "Actions", (entry.actions || []).map((action) => contentBulkFallbackLabel(action, text.actionLabels)))}
        ${contentBulkChipBlock(text.surfaceReviews || "Surface reviews", surfaceLabels)}
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
