import {
  createContentBulkPatchIntakeContract,
  createContentBulkPatchTemplate,
  validateContentBulkPatchBatch,
} from "./contentBulkPatchIntakeContract.js?v=477";

export const CONTENT_BULK_PATCH_DRY_RUN_IMPORTER_VERSION = "content-bulk-patch-dry-run-importer-v1";

export function createContentBulkPatchDryRunPreview(batch = createContentBulkPatchTemplate(), options = {}) {
  const contract = options.contract || createContentBulkPatchIntakeContract();
  const validation = validateContentBulkPatchBatch(batch, {
    contract,
    warnOnExistingIds: true,
  });
  const domains = contract.domains.map((domain) => dryRunDomain(domain, batch, validation));
  const activeDomains = domains.filter((domain) => domain.rowCount > 0);
  const uniqueChecks = new Set(activeDomains.flatMap((domain) => domain.checkScripts));

  return {
    version: CONTENT_BULK_PATCH_DRY_RUN_IMPORTER_VERSION,
    sourceVersion: contract.version,
    writesGameData: false,
    acceptsBatchImport: true,
    validation,
    summary: {
      domainCount: domains.length,
      activeDomainCount: activeDomains.length,
      rowCount: domains.reduce((sum, domain) => sum + domain.rowCount, 0),
      appendCandidateCount: domains.reduce((sum, domain) => sum + domain.appendCandidateCount, 0),
      updateCandidateCount: domains.reduce((sum, domain) => sum + domain.updateCandidateCount, 0),
      generatedSurfaceCount: domains.reduce((sum, domain) => sum + domain.generatedSurfaceCount, 0),
      blockingIssueCount: validation.summary.blockingIssueCount,
      warningIssueCount: validation.summary.warningIssueCount,
      requiredCheckCount: uniqueChecks.size,
      readyDomainCount: activeDomains.filter((domain) => domain.state === "ready").length,
      warningDomainCount: activeDomains.filter((domain) => domain.state === "ready-with-warnings").length,
      blockedDomainCount: activeDomains.filter((domain) => domain.state === "blocked").length,
    },
    domains,
    issues: validation.issues,
  };
}

function dryRunDomain(domain, batch, validation) {
  const rows = Array.isArray(batch?.[domain.batchKey]) ? batch[domain.batchKey] : [];
  const domainResult = validation.domainResults.find((entry) => entry.domainId === domain.id) || {};
  const updateCandidateCount = validation.issues.filter((entry) =>
    entry.domainId === domain.id && entry.code === "already-exists-in-current-data"
  ).length;
  const appendCandidateCount = Math.max(0, rows.length - updateCandidateCount);
  const generatedSurfaceCount = rows.length * (domain.surfaces || []).length;

  return {
    id: domain.id,
    batchKey: domain.batchKey,
    state: dryRunState(rows.length, domainResult.blockingIssueCount || 0, domainResult.warningIssueCount || 0),
    rowCount: rows.length,
    appendCandidateCount,
    updateCandidateCount,
    generatedSurfaceCount,
    blockingIssueCount: domainResult.blockingIssueCount || 0,
    warningIssueCount: domainResult.warningIssueCount || 0,
    identityFields: domain.identityFields || [],
    requiredInputFields: domain.requiredInputFields || [],
    checkScripts: domain.checkScripts || [],
    surfaces: (domain.surfaces || []).map((surface) => ({
      id: surface,
      candidateCount: rows.length,
      state: rows.length ? "candidate" : "empty",
    })),
  };
}

function dryRunState(rowCount, blockingIssueCount, warningIssueCount) {
  if (rowCount <= 0) return "empty";
  if (blockingIssueCount > 0) return "blocked";
  if (warningIssueCount > 0) return "ready-with-warnings";
  return "ready";
}

