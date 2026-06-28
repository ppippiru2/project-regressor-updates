import { createContentBulkPatchDryRunPreview } from "./contentBulkPatchDryRunImporter.js?v=494";
import { createContentBulkPatchTemplate } from "./contentBulkPatchIntakeContract.js?v=494";

export const CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW_VERSION = "content-bulk-patch-staged-import-preview-v1";

export function createContentBulkPatchStagedImportPreview(batch = createContentBulkPatchTemplate(), options = {}) {
  const dryRun = options.dryRun || createContentBulkPatchDryRunPreview(batch, options);
  const domains = (dryRun.domains || []).map((domain) => stagedDomain(domain, batch, dryRun.issues || []));
  const activeDomains = domains.filter((domain) => domain.rowCount > 0);
  const stagedDomains = activeDomains.filter((domain) => domain.stagedRowCount > 0);
  const uniqueChecks = new Set(stagedDomains.flatMap((domain) => domain.checkScripts || []));

  return {
    version: CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW_VERSION,
    sourceVersion: dryRun.version,
    writesGameData: false,
    requiresExplicitApply: true,
    applyMode: "validated-staged-batch",
    dryRun,
    summary: {
      domainCount: domains.length,
      activeDomainCount: activeDomains.length,
      inputRowCount: domains.reduce((sum, domain) => sum + domain.rowCount, 0),
      stagedRowCount: domains.reduce((sum, domain) => sum + domain.stagedRowCount, 0),
      appendStageCount: domains.reduce((sum, domain) => sum + domain.appendStageCount, 0),
      updateStageCount: domains.reduce((sum, domain) => sum + domain.updateStageCount, 0),
      withheldRowCount: domains.reduce((sum, domain) => sum + domain.withheldRowCount, 0),
      warningRowCount: domains.reduce((sum, domain) => sum + domain.warningRowCount, 0),
      generatedSurfaceCount: domains.reduce((sum, domain) => sum + domain.generatedSurfaceCount, 0),
      requiredCheckCount: uniqueChecks.size,
      readyDomainCount: activeDomains.filter((domain) => domain.state === "ready").length,
      warningDomainCount: activeDomains.filter((domain) => domain.state === "ready-with-warnings").length,
      partialDomainCount: activeDomains.filter((domain) => domain.state === "partial").length,
      blockedDomainCount: activeDomains.filter((domain) => domain.state === "blocked").length,
    },
    domains,
    applySteps: [
      "validate-batch-contract",
      "review-update-candidates",
      "stage-append-and-update-rows",
      "apply-generated-surfaces-after-explicit-confirm",
      "run-required-checks",
    ],
  };
}

function stagedDomain(domain, batch, issues) {
  const rows = Array.isArray(batch?.[domain.batchKey]) ? batch[domain.batchKey] : [];
  const stagedRows = rows.map((row, rowIndex) => stagedRow(domain, row, rowIndex, issues));
  const actionableRows = stagedRows.filter((row) => row.state === "staged-append" || row.state === "staged-update");
  const withheldRows = stagedRows.filter((row) => row.state === "withheld-blocked");
  const warningRows = stagedRows.filter((row) => row.warningIssueCodes.length > 0);
  const appendRows = actionableRows.filter((row) => row.state === "staged-append");
  const updateRows = actionableRows.filter((row) => row.state === "staged-update");

  return {
    id: domain.id,
    batchKey: domain.batchKey,
    state: stagedDomainState(rows.length, withheldRows.length, warningRows.length),
    rowCount: rows.length,
    stagedRowCount: actionableRows.length,
    appendStageCount: appendRows.length,
    updateStageCount: updateRows.length,
    withheldRowCount: withheldRows.length,
    warningRowCount: warningRows.length,
    generatedSurfaceCount: actionableRows.length * (domain.surfaces || []).length,
    checkScripts: domain.checkScripts || [],
    surfaces: (domain.surfaces || []).map((surface) => ({
      id: surface.id,
      stagedCandidateCount: actionableRows.length,
      state: actionableRows.length ? "staged" : "empty",
    })),
    rows: stagedRows,
  };
}

function stagedRow(domain, row, rowIndex, issues) {
  const rowIssues = issues.filter((issue) => issue.domainId === domain.id && issue.rowIndex === rowIndex);
  const blockingIssueCodes = rowIssues.filter((issue) => issue.severity === "error").map((issue) => issue.code);
  const warningIssueCodes = rowIssues.filter((issue) => issue.severity === "warning").map((issue) => issue.code);
  const isUpdate = warningIssueCodes.includes("already-exists-in-current-data");
  const state = blockingIssueCodes.length > 0 ? "withheld-blocked" : isUpdate ? "staged-update" : "staged-append";

  return {
    rowIndex,
    identity: identityFor(row, domain.identityFields),
    state,
    blockingIssueCodes,
    warningIssueCodes,
    targetSurfaceCount: state === "withheld-blocked" ? 0 : (domain.surfaces || []).length,
  };
}

function stagedDomainState(rowCount, withheldRowCount, warningRowCount) {
  if (rowCount <= 0) return "empty";
  if (withheldRowCount >= rowCount) return "blocked";
  if (withheldRowCount > 0) return "partial";
  if (warningRowCount > 0) return "ready-with-warnings";
  return "ready";
}

function identityFor(row, fields = []) {
  if (!row || typeof row !== "object") return "";
  const parts = fields.map((field) => row[field]).filter((value) => !isMissingValue(value));
  return parts.length === fields.length ? parts.map(String).join("|") : "";
}

function isMissingValue(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  return false;
}


