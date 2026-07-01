import { createContentBulkPatchStagedImportPreview } from "./contentBulkPatchStagedImportPreview.js?v=678";
import { createContentBulkPatchTemplate } from "./contentBulkPatchIntakeContract.js?v=678";

export const CONTENT_BULK_PATCH_DIFF_EXPORT_VERSION = "content-bulk-patch-diff-export-v1";

export function createContentBulkPatchDiffExport(batch = createContentBulkPatchTemplate(), options = {}) {
  const stagedPreview = options.stagedPreview || createContentBulkPatchStagedImportPreview(batch, options);
  const domains = (stagedPreview.domains || []).map(diffExportDomain);
  const activeDomains = domains.filter((domain) => domain.rowCount > 0);
  const fileTargets = createFileTargets(domains);
  const uniqueChecks = new Set(activeDomains.flatMap((domain) => domain.checkScripts || []));
  const summary = {
    domainCount: domains.length,
    activeDomainCount: activeDomains.length,
    targetFileCount: fileTargets.length,
    targetSurfaceCount: domains.reduce((sum, domain) => sum + domain.targetSurfaceCount, 0),
    stagedRowCount: domains.reduce((sum, domain) => sum + domain.stagedRowCount, 0),
    appendStageCount: domains.reduce((sum, domain) => sum + domain.appendStageCount, 0),
    updateStageCount: domains.reduce((sum, domain) => sum + domain.updateStageCount, 0),
    withheldRowCount: domains.reduce((sum, domain) => sum + domain.withheldRowCount, 0),
    requiredCheckCount: uniqueChecks.size,
  };

  return {
    version: CONTENT_BULK_PATCH_DIFF_EXPORT_VERSION,
    sourceVersion: stagedPreview.version,
    writesGameData: false,
    exportsDiffOnly: true,
    requiresManualReview: true,
    requiresExplicitApply: true,
    applyMode: "diff-export-only",
    status: diffExportStatus(summary),
    summary,
    domains,
    fileTargets,
    manualReviewSteps: [
      "export-diff-json",
      "review-target-files-and-surfaces",
      "apply-after-explicit-confirm",
      "run-required-checks",
      "verify-game-and-editor",
    ],
  };
}

function diffExportDomain(domain) {
  const targetSurfaces = (domain.surfaces || []).map((surface) => ({
    id: surface.id,
    file: surfaceFile(surface.id),
    surface: surfaceName(surface.id),
    stagedCandidateCount: surface.stagedCandidateCount || 0,
    state: surface.state || "empty",
  }));
  return {
    id: domain.id,
    batchKey: domain.batchKey,
    state: domain.state,
    rowCount: domain.rowCount || 0,
    stagedRowCount: domain.stagedRowCount || 0,
    appendStageCount: domain.appendStageCount || 0,
    updateStageCount: domain.updateStageCount || 0,
    withheldRowCount: domain.withheldRowCount || 0,
    targetSurfaceCount: targetSurfaces.length,
    checkScripts: domain.checkScripts || [],
    targetSurfaces,
  };
}

function createFileTargets(domains) {
  const targetMap = new Map();
  for (const domain of domains) {
    for (const surface of domain.targetSurfaces || []) {
      if (!surface.file) continue;
      if (!targetMap.has(surface.file)) {
        targetMap.set(surface.file, {
          file: surface.file,
          domainIds: new Set(),
          surfaces: [],
          stagedRowCount: 0,
          appendStageCount: 0,
          updateStageCount: 0,
          withheldRowCount: 0,
        });
      }
      const target = targetMap.get(surface.file);
      target.domainIds.add(domain.id);
      target.surfaces.push({
        id: surface.id,
        domainId: domain.id,
        surface: surface.surface,
        stagedCandidateCount: surface.stagedCandidateCount,
        state: surface.state,
      });
      target.stagedRowCount += domain.stagedRowCount || 0;
      target.appendStageCount += domain.appendStageCount || 0;
      target.updateStageCount += domain.updateStageCount || 0;
      target.withheldRowCount += domain.withheldRowCount || 0;
    }
  }

  return Array.from(targetMap.values())
    .map((target) => ({
      ...target,
      domainIds: Array.from(target.domainIds).sort(),
      surfaceCount: target.surfaces.length,
    }))
    .sort((left, right) => left.file.localeCompare(right.file));
}

function diffExportStatus(summary) {
  if ((summary.withheldRowCount || 0) > 0) return "review-withheld-rows";
  if ((summary.stagedRowCount || 0) > 0) return "ready-for-diff-review";
  return "empty";
}

function surfaceFile(surfaceId = "") {
  return String(surfaceId || "").split(":")[0] || "";
}

function surfaceName(surfaceId = "") {
  const parts = String(surfaceId || "").split(":");
  return parts.length > 1 ? parts.slice(1).join(":") : "";
}
