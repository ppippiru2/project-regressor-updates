import {
  createContentBulkPatchPackageAdapterPreview,
  createContentBulkPatchPackageAdapterTemplate,
} from "./contentBulkPatchPackageAdapter.js?v=678";
import { createContentBulkPatchFilePatchDraft } from "./contentBulkPatchFilePatchDraft.js?v=678";
import {
  CONTENT_BULK_PATCH_PRE_APPLY_REVIEW_VERSION,
  createContentBulkPatchPreApplyReview,
  createPreApplyContractReviewSummary,
} from "./contentBulkPatchPreApplyReview.js?v=678";

export const CONTENT_BULK_PATCH_FILE_PATCH_DRAFT_EXPORT_VERSION = "content-bulk-patch-file-patch-draft-export-v1";
export {
  CONTENT_BULK_PATCH_PRE_APPLY_REVIEW_VERSION,
  createContentBulkPatchPreApplyReview,
  createContentBulkPatchPreApplyReviewChecklist,
  createPreApplyContractReviewSummary,
  normalizePreApplyContractReviewSummary,
} from "./contentBulkPatchPreApplyReview.js?v=678";

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
      preApplyContractReadyRowCount: preApplyReview.summary.contractReadyRowCount,
      preApplyContractBlockedRowCount: preApplyReview.summary.contractBlockedRowCount,
      preApplyContractWarningRowCount: preApplyReview.summary.contractWarningRowCount,
      preApplyContractTargetSurfaceCount: preApplyReview.summary.contractTargetSurfaceCount,
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
    contractReviewSummary: createPreApplyContractReviewSummary(context.adapterPreview?.stagedImport?.domains),
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
      contractReadyRowCount: preApplyReview.contractReviewSummary.readyForStageCount,
      contractBlockedRowCount: preApplyReview.contractReviewSummary.blockedCount,
      contractWarningRowCount: preApplyReview.contractReviewSummary.warningCount,
    },
    summary: draft.summary,
    contractReviewSummary: preApplyReview.contractReviewSummary,
    preApplyReview,
    globalSteps: draft.globalSteps,
    verificationSteps: draft.verificationSteps,
    files,
  };
}
