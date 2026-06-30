import { tf } from "../localization/index.js?v=675";

export const CONTENT_BULK_PATCH_FILE_PATCH_DRAFT_VIEW_VERSION = "content-bulk-patch-file-patch-draft-view-v1";

export function renderContentBulkPatchFilePatchDraft(draft, detailText = {}, reviewContext = {}) {
  const text = detailText.contentBulkPatchFilePatchDraft || {};
  const summary = draft.summary || {};
  const metrics = [
    [text.draftFiles || "Draft files", `${summary.draftFileCount || 0}`],
    [text.patchBlocks || "Patch blocks", `${summary.patchBlockCount || 0}`],
    [text.targetSurfaces || "Target surfaces", `${summary.targetSurfaceCount || 0}`],
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount || 0}`],
    [text.updateDrafts || "Update drafts", `${summary.updateDraftCount || 0}`],
    [text.blockedDrafts || "Blocked drafts", `${summary.blockedDraftCount || 0}`],
    [text.verificationSteps || "Verification", `${summary.verificationStepCount || 0}`],
    [text.applyMode || "Apply mode", draft.applyMode || "-"],
    [text.writes || "Writes", draft.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-patch-draft" data-readonly="${draft.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch File Draft")}">
      <div class="editor-content-bulk-patch-draft-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch File Draft")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only file patch draft from manual apply checklist.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchFilePatchDraft.version", {
          version: draft.version || "-"
        }, draft.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-patch-draft-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-patch-draft-steps">
        <strong>${escapeHtml(text.globalSteps || "Global steps")}</strong>
        <div class="editor-chip-list">
          ${chip(contentBulkPatchFilePatchStatusLabel(draft.status, text))}
          ${(draft.globalSteps || []).map((step) => chip(contentBulkPatchFilePatchStepLabel(step, text))).join("")}
        </div>
      </div>
      <div class="editor-content-bulk-patch-draft-list">
        ${(draft.fileDrafts || []).map((entry) => renderContentBulkPatchFilePatchDraftFile(entry, text, reviewContext)).join("") || `<p class="muted">${escapeHtml(text.noFiles || "No patch drafts.")}</p>`}
      </div>
    </section>
  `;
}

function renderContentBulkPatchFilePatchDraftFile(entry, text = {}, reviewContext = {}) {
  const blockLabels = (entry.patchBlocks || []).map((block) =>
    `${block.surface || block.id || "-"} - ${contentBulkPatchFilePatchOperationLabel(block.operation, text)} - ${block.anchorHint || "-"}`
  );
  const safetyReview = contentBulkPatchFileSafetyReview(entry, reviewContext, text);
  return `
    <article class="editor-content-bulk-patch-draft-file" data-state="${escapeAttribute(entry.status || "unknown")}">
      <div class="editor-content-bulk-patch-draft-file-head">
        <div>
          <h5>${escapeHtml(`${entry.order || "-"} - ${entry.file || "-"}`)}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchFilePatchDraft.fileMeta", {
            surfaces: entry.surfaceCount || 0,
            staged: entry.stagedRowCount || 0,
            blocks: entry.patchBlocks?.length || 0,
            operation: contentBulkPatchFilePatchOperationLabel(entry.operation, text),
          }, `${entry.surfaceCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${chip(contentBulkPatchFilePatchStatusLabel(entry.status, text))}
          ${chip(contentBulkPatchFilePatchOperationLabel(entry.operation, text))}
        </div>
      </div>
      <div class="editor-content-bulk-patch-draft-grid">
        ${contentBulkPatchFilePatchChipBlock(text.domains || "Domains", entry.domainIds || [])}
        ${contentBulkPatchFilePatchChipBlock(text.anchorHints || "Anchor hints", entry.anchorHints || [])}
        ${contentBulkPatchFilePatchChipBlock(text.patchBlocks || "Patch blocks", blockLabels)}
        ${contentBulkPatchFilePatchChipBlock(text.postApplyChecks || "Post apply checks", (entry.postApplyChecks || []).map((step) => contentBulkPatchFilePatchStepLabel(step, text)))}
        ${contentBulkPatchFilePatchChipBlock(text.fileSafetyReview || "File safety review", safetyReview)}
      </div>
    </article>
  `;
}

function contentBulkPatchFileSafetyReview(entry = {}, reviewContext = {}, text = {}) {
  const backupFile = (reviewContext.backupPlan?.fileBackups || []).find((file) => file.file === entry.file);
  const restoreAction = (reviewContext.restoreRehearsal?.restoreActions || []).find((action) => action.file === entry.file);
  const backupBlockers = Array.isArray(backupFile?.reviewBlockerCodes) ? backupFile.reviewBlockerCodes : [];
  const restoreBlockers = Array.isArray(restoreAction?.rehearsalBlockerCodes) ? restoreAction.rehearsalBlockerCodes : [];
  const labels = [];
  labels.push(tf("editorPrep.balanceTuningDetail.contentBulkPatchFilePatchDraft.backupBlockerSummary", {
    count: backupBlockers.length
  }, `${text.backupBlockers || "Backup blockers"} ${backupBlockers.length}`));
  labels.push(tf("editorPrep.balanceTuningDetail.contentBulkPatchFilePatchDraft.restoreBlockerSummary", {
    count: restoreBlockers.length
  }, `${text.restoreBlockers || "Restore blockers"} ${restoreBlockers.length}`));
  labels.push(...backupBlockers);
  labels.push(...restoreBlockers);
  return labels.length ? labels : [text.noSafetyBlockers || "No safety blockers"];
}

function contentBulkPatchFilePatchStatusLabel(statusId, text = {}) {
  return text.statusLabels?.[statusId] || statusId || "unknown";
}

function contentBulkPatchFilePatchStepLabel(stepId, text = {}) {
  return text.stepLabels?.[stepId] || stepId || "unknown";
}

function contentBulkPatchFilePatchOperationLabel(operationId, text = {}) {
  return text.operationLabels?.[operationId] || operationId || "unknown";
}

function contentBulkPatchFilePatchChipBlock(title, values = []) {
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
