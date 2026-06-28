import {
  createContentBulkPatchPackageAdapterPreview,
  createContentBulkPatchPackageAdapterTemplate,
} from "./contentBulkPatchPackageAdapter.js?v=475";
import { createContentBulkPatchFilePatchDraft } from "./contentBulkPatchFilePatchDraft.js?v=475";

export const CONTENT_BULK_PATCH_FILE_PATCH_DRAFT_EXPORT_VERSION = "content-bulk-patch-file-patch-draft-export-v1";

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
    },
  };
}

export function createContentBulkPatchFilePatchDraftExportFromText(text = "", options = {}) {
  const trimmed = String(text || "").trim();
  if (!trimmed) return createContentBulkPatchFilePatchDraftExport(createContentBulkPatchPackageAdapterTemplate(), options);
  return createContentBulkPatchFilePatchDraftExport(JSON.parse(trimmed), options);
}

function createPatchDraftPayload(draft, context) {
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
    globalSteps: draft.globalSteps,
    verificationSteps: draft.verificationSteps,
    files: (draft.fileDrafts || []).map((file) => ({
      file: file.file,
      order: file.order,
      status: file.status,
      operation: file.operation,
      domainIds: file.domainIds,
      anchorHints: file.anchorHints,
      patchSummaryLines: file.patchSummaryLines,
      patchBlocks: file.patchBlocks,
      postApplyChecks: file.postApplyChecks,
    })),
  };
}
