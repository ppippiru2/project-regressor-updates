import {
  createContentBulkPatchPackageAdapterPreview,
  createContentBulkPatchPackageAdapterTemplate,
} from "./contentBulkPatchPackageAdapter.js?v=500";
import { createContentBulkPatchFilePatchDraft } from "./contentBulkPatchFilePatchDraft.js?v=500";

export const CONTENT_BULK_PATCH_FILE_PATCH_DRAFT_EXPORT_VERSION = "content-bulk-patch-file-patch-draft-export-v1";
export const CONTENT_BULK_PATCH_PRE_APPLY_REVIEW_VERSION = "content-bulk-patch-pre-apply-review-v1";

export function createContentBulkPatchFilePatchDraftExport(
  packageData = createContentBulkPatchPackageAdapterTemplate(),
  options = {},
) {
  const sourceName = options.sourceName || packageData.sourceInput || "content-bulk-package.json";
  const adapterPreview = options.adapterPreview || createContentBulkPatchPackageAdapterPreview(packageData);
  const batch = options.batch || adapterPreview.normalized?.batch || packageData;
  const draft = options.draft || createContentBulkPatchFilePatchDraft(batch, options);
  const payload = createPatchDraftPayload(draft, {
    sourceName,
    adapterPreview,
    packageData,
    generatedAt: options.generatedAt || "",
  });
  const preApplyReview = payload.preApplyReview;

  return {
    version: CONTENT_BULK_PATCH_FILE_PATCH_DRAFT_EXPORT_VERSION,
    sourceVersion: draft.version,
    adapterVersion: adapterPreview.version,
    writesGameData: false,
    exportsDownloadOnly: true,
    requiresManualReview: true,
    requiresExplicitApply: true,
    applyMode: "downloadable-patch-draft-only",
    fileName: options.fileName || "project-regressor-content-bulk-file-patch-draft.json",
    draft,
    preApplyReview,
    payload,
    summary: {
      sourceName,
      draftFileCount: draft.summary.draftFileCount,
      patchBlockCount: draft.summary.patchBlockCount,
      targetSurfaceCount: draft.summary.targetSurfaceCount,
      stagedRowCount: draft.summary.stagedRowCount,
      updateDraftCount: draft.summary.updateDraftCount,
      blockedDraftCount: draft.summary.blockedDraftCount,
      withheldRowCount: draft.summary.withheldRowCount,
      exportedFileCount: payload.files.length,
      exportedBlockCount: payload.files.reduce((sum, file) => sum + file.patchBlocks.length, 0),
      preApplyReviewItemCount: preApplyReview.summary.reviewItemCount,
      preApplyReadyReviewItemCount: preApplyReview.summary.readyReviewItemCount,
      preApplyWarningReviewItemCount: preApplyReview.summary.warningReviewItemCount,
      preApplyBlockedReviewItemCount: preApplyReview.summary.blockedReviewItemCount,
    },
  };
}

export function createContentBulkPatchFilePatchDraftExportFromText(text = "", options = {}) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return createContentBulkPatchFilePatchDraftExport(createContentBulkPatchPackageAdapterTemplate(), options);
  return createContentBulkPatchFilePatchDraftExport(JSON.parse(trimmed), options);
}

function createPatchDraftPayload(draft, context) {
  const files = (draft.fileDrafts || []).map((file) => ({
    file: file.file,
    order: file.order,
    status: file.status,
    operation: file.operation,
    domainIds: file.domainIds,
    anchorHints: file.anchorHints,
    patchSummaryLines: file.patchSummaryLines,
    patchBlocks: file.patchBlocks,
    postApplyChecks: file.postApplyChecks,
  }));
  const exportedSummary = {
    ...draft.summary,
    exportedFileCount: files.length,
    exportedBlockCount: files.reduce((sum, file) => sum + file.patchBlocks.length, 0),
  };
  const preApplyReview = createContentBulkPatchPreApplyReview(exportedSummary);

  return {
    version: CONTENT_BULK_PATCH_FILE_PATCH_DRAFT_EXPORT_VERSION,
    sourceDraftVersion: draft.version,
    sourceName: context.sourceName,
    generatedAt: context.generatedAt,
    writesGameData: false,
    requiresManualReview: true,
    requiresExplicitApply: true,
    applyMode: "downloadable-patch-draft-only",
    sourceSummary: {
      recognizedSourceKeyCount: context.adapterPreview.normalized?.summary?.recognizedSourceKeyCount || 0,
      normalizedRowCount: context.adapterPreview.normalized?.summary?.normalizedRowCount || 0,
      stagedRowCount: context.adapterPreview.summary?.stagedRowCount || 0,
      withheldRowCount: context.adapterPreview.summary?.withheldRowCount || 0,
      unmappedArrayKeyCount: context.adapterPreview.summary?.unmappedArrayKeyCount || 0,
    },
    summary: draft.summary,
    preApplyReview,
    globalSteps: draft.globalSteps,
    verificationSteps: draft.verificationSteps,
    files,
  };
}

export function createContentBulkPatchPreApplyReview(summary = {}) {
  const checklist = createContentBulkPatchPreApplyReviewChecklist(summary);
  return {
    version: CONTENT_BULK_PATCH_PRE_APPLY_REVIEW_VERSION,
    writesGameData: false,
    applyEnabled: false,
    requiresManualReview: true,
    requiresExplicitApply: true,
    requiresBackup: true,
    requiresRollbackPlan: true,
    checklist,
    summary: {
      reviewItemCount: checklist.length,
      readyReviewItemCount: checklist.filter((item) => item.state === "ready").length,
      warningReviewItemCount: checklist.filter((item) => item.state === "review").length,
      blockedReviewItemCount: checklist.filter((item) => item.state === "blocked").length,
    },
  };
}

export function createContentBulkPatchPreApplyReviewChecklist(summary = {}) {
  return [
    {
      id: "review-patch-draft-payload",
      state: (summary.exportedFileCount || 0) > 0 ? "ready" : "blocked",
      blocksApply: true,
      detail: `${summary.exportedFileCount || 0} files / ${summary.exportedBlockCount || 0} blocks`,
    },
    {
      id: "resolve-withheld-rows",
      state: (summary.withheldRowCount || 0) > 0 ? "blocked" : "ready",
      blocksApply: true,
      detail: `${summary.withheldRowCount || 0} withheld`,
    },
    {
      id: "review-update-candidates",
      state: (summary.updateDraftCount || 0) > 0 ? "review" : "ready",
      blocksApply: true,
      detail: `${summary.updateDraftCount || 0} updates`,
    },
    {
      id: "confirm-explicit-apply",
      state: "blocked",
      blocksApply: true,
      detail: "required",
    },
    {
      id: "prepare-backup-snapshot",
      state: "blocked",
      blocksApply: true,
      detail: `${summary.exportedFileCount || 0} target files`,
    },
    {
      id: "prepare-rollback-rehearsal",
      state: "blocked",
      blocksApply: true,
      detail: "required",
    },
    {
      id: "run-validation-suite",
      state: "waiting",
      blocksApply: true,
      detail: "after manual review",
    },
  ];
}


