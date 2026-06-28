import { createContentBulkPatchDiffExport } from "./contentBulkPatchDiffExport.js?v=532";
import { createContentBulkPatchTemplate } from "./contentBulkPatchIntakeContract.js?v=532";
import { createContentBulkPatchManualApplyChecklist } from "./contentBulkPatchManualApplyChecklist.js?v=532";

export const CONTENT_BULK_PATCH_FILE_PATCH_DRAFT_VERSION = "content-bulk-patch-file-patch-draft-v1";

export function createContentBulkPatchFilePatchDraft(batch = createContentBulkPatchTemplate(), options = {}) {
  const diffExport = options.diffExport || createContentBulkPatchDiffExport(batch, options);
  const checklist = options.checklist || createContentBulkPatchManualApplyChecklist(batch, { ...options, diffExport });
  const targetsByFile = new Map((diffExport.fileTargets || []).map((target) => [target.file, target]));
  const fileDrafts = (checklist.fileChecklists || []).map((entry) => createFilePatchDraft(entry, targetsByFile.get(entry.file)));
  const domainIds = new Set(fileDrafts.flatMap((draft) => draft.domainIds || []));
  const summary = {
    draftFileCount: fileDrafts.length,
    patchBlockCount: fileDrafts.reduce((sum, draft) => sum + draft.patchBlocks.length, 0),
    targetSurfaceCount: checklist.summary?.targetSurfaceCount || 0,
    stagedRowCount: checklist.summary?.stagedRowCount || 0,
    appendStageCount: checklist.summary?.appendStageCount || 0,
    updateStageCount: checklist.summary?.updateStageCount || 0,
    withheldRowCount: checklist.summary?.withheldRowCount || 0,
    readyDraftCount: fileDrafts.filter((draft) => draft.status === "draft-ready").length,
    updateDraftCount: fileDrafts.filter((draft) => draft.status === "review-update").length,
    blockedDraftCount: fileDrafts.filter((draft) => draft.status === "review-withheld").length,
    domainCount: domainIds.size,
    verificationStepCount: checklist.summary?.verificationStepCount || 0,
  };

  return {
    version: CONTENT_BULK_PATCH_FILE_PATCH_DRAFT_VERSION,
    sourceVersion: checklist.version,
    diffExportVersion: diffExport.version,
    writesGameData: false,
    exportsPatchDraftOnly: true,
    requiresManualReview: true,
    requiresExplicitApply: true,
    applyMode: "patch-draft-only",
    status: patchDraftStatus(summary),
    summary,
    globalSteps: [
      "review-file-patch-drafts",
      "compare-with-diff-export",
      "apply-after-user-confirmation",
      "run-required-checks",
    ],
    verificationSteps: checklist.verificationSteps || [],
    fileDrafts,
  };
}

function createFilePatchDraft(entry, target = {}) {
  const patchBlocks = (entry.surfaceReviewItems || []).map((item) => createPatchBlock(item, entry, target));
  const operation = fileOperation(entry);
  return {
    order: entry.order,
    file: entry.file,
    status: filePatchDraftStatus(entry),
    operation,
    domainIds: entry.domainIds || target.domainIds || [],
    surfaceCount: entry.surfaceCount || target.surfaceCount || patchBlocks.length,
    stagedRowCount: entry.stagedRowCount || target.stagedRowCount || 0,
    appendStageCount: entry.appendStageCount || target.appendStageCount || 0,
    updateStageCount: entry.updateStageCount || target.updateStageCount || 0,
    withheldRowCount: entry.withheldRowCount || target.withheldRowCount || 0,
    anchorHints: Array.from(new Set(patchBlocks.map((block) => block.anchorHint).filter(Boolean))),
    patchSummaryLines: createPatchSummaryLines(entry.file, operation, patchBlocks),
    patchBlocks,
    postApplyChecks: createPostApplyChecks(entry),
  };
}

function createPatchBlock(item, entry) {
  const operation = blockOperation(item, entry);
  const anchorHint = anchorHintForSurface(item);
  return {
    id: item.id,
    domainId: item.domainId,
    surface: item.surface || item.id,
    state: item.state || "unknown",
    operation,
    candidateCount: item.stagedCandidateCount || 0,
    anchorHint,
    reviewAction: item.reviewAction || "verify-data-row",
    draftLine: `${operation} x${item.stagedCandidateCount || 0} @ ${anchorHint}`,
  };
}

function filePatchDraftStatus(entry) {
  if ((entry.withheldRowCount || 0) > 0) return "review-withheld";
  if ((entry.updateStageCount || 0) > 0) return "review-update";
  return "draft-ready";
}

function patchDraftStatus(summary) {
  if ((summary.withheldRowCount || 0) > 0) return "review-withheld-rows";
  if ((summary.updateStageCount || 0) > 0) return "review-update-candidates";
  if ((summary.stagedRowCount || 0) > 0) return "draft-ready";
  return "empty";
}

function fileOperation(entry) {
  const hasAppend = (entry.appendStageCount || 0) > 0;
  const hasUpdate = (entry.updateStageCount || 0) > 0;
  const hasWithheld = (entry.withheldRowCount || 0) > 0;
  if (hasWithheld) return "hold-blocked";
  if (hasAppend && hasUpdate) return "append-and-update";
  if (hasUpdate) return "update-existing";
  if (hasAppend) return "append-new";
  return "review-only";
}

function blockOperation(item, entry) {
  if ((entry.withheldRowCount || 0) > 0 || item.state === "withheld-blocked") return "hold-blocked";
  if ((entry.updateStageCount || 0) > 0 || item.state === "staged-update") return "update-existing";
  if ((entry.appendStageCount || 0) > 0 || item.state === "staged" || item.state === "staged-append") return "append-new";
  return "review-only";
}

function anchorHintForSurface(item) {
  const surface = `${item.surface || item.id || ""}`.toLowerCase();
  if (surface.includes("localization") || surface.includes("ko-kr")) return "visible-text-localization-block";
  if (surface.includes("drop") || surface.includes("reward")) return "drop-or-reward-link-table";
  if (surface.includes("asset") || surface.includes("slot")) return "asset-slot-or-manifest-section";
  if (surface.includes("shop")) return "shop-catalog-section";
  if (surface.includes("world") || surface.includes("region")) return "world-region-or-monster-section";
  if (item.domainId === "monster") return "monster-runtime-or-balance-section";
  if (item.domainId === "skill") return "skill-balance-or-runtime-section";
  if (item.domainId === "equipment_item") return "equipment-item-data-section";
  if (item.domainId === "loot_item") return "loot-item-data-section";
  return "target-data-section";
}

function createPatchSummaryLines(file, operation, patchBlocks) {
  return [
    `file: ${file || "-"}`,
    `operation: ${operation}`,
    ...patchBlocks.map((block) => `${block.surface}: ${block.draftLine}`),
  ];
}

function createPostApplyChecks(entry) {
  const checks = ["run-domain-checks", "verify-editor-summary"];
  if ((entry.domainIds || []).includes("monster")) checks.push("verify-monster-runtime");
  if ((entry.domainIds || []).includes("skill")) checks.push("verify-skill-runtime");
  if ((entry.domainIds || []).some((id) => id.includes("item"))) checks.push("verify-inventory-and-rewards");
  return Array.from(new Set(checks));
}


