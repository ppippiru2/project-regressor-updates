export const CONTENT_BULK_STAGED_CONTRACT_SUMMARY_VERSION = "content-bulk-staged-contract-summary-v1";

export function createStagedContractSummary(adapterPreview = {}, domainIds = []) {
  const stagedImport = adapterPreview?.stagedImport || {};
  const requestedDomains = new Set((domainIds || []).filter(Boolean));
  const domains = (stagedImport.domains || [])
    .filter((domain) => !requestedDomains.size || requestedDomains.has(domain.id))
    .map(summarizeDomain);
  const checkScripts = new Set(domains.flatMap((domain) => domain.checkScripts || []));
  const blockingIssueCodes = new Set(domains.flatMap((domain) => domain.blockingIssueCodes || []));
  const warningIssueCodes = new Set(domains.flatMap((domain) => domain.warningIssueCodes || []));

  return {
    version: CONTENT_BULK_STAGED_CONTRACT_SUMMARY_VERSION,
    sourceVersion: stagedImport.version || "",
    dryRunVersion: stagedImport.sourceVersion || stagedImport.dryRun?.version || "",
    writesGameData: false,
    requiresExplicitApply: stagedImport.requiresExplicitApply === true,
    domainIds: domains.map((domain) => domain.id),
    summary: {
      domainCount: domains.length,
      rowCount: domains.reduce((sum, domain) => sum + domain.rowCount, 0),
      stagedRowCount: domains.reduce((sum, domain) => sum + domain.stagedRowCount, 0),
      blockedRowCount: domains.reduce((sum, domain) => sum + domain.blockedRowCount, 0),
      warningRowCount: domains.reduce((sum, domain) => sum + domain.warningRowCount, 0),
      targetSurfaceCount: domains.reduce((sum, domain) => sum + domain.targetSurfaceCount, 0),
      generatedSurfaceCount: domains.reduce((sum, domain) => sum + domain.generatedSurfaceCount, 0),
      requiredCheckCount: checkScripts.size,
      readyDomainCount: domains.filter((domain) => domain.state === "ready").length,
      warningDomainCount: domains.filter((domain) => domain.state === "ready-with-warnings").length,
      partialDomainCount: domains.filter((domain) => domain.state === "partial").length,
      blockedDomainCount: domains.filter((domain) => domain.state === "blocked").length,
    },
    blockingIssueCodes: [...blockingIssueCodes],
    warningIssueCodes: [...warningIssueCodes],
    checkScripts: [...checkScripts],
    domains,
  };
}

function summarizeDomain(domain = {}) {
  const rows = Array.isArray(domain.rows) ? domain.rows : [];
  const blockingIssueCodes = new Set();
  const warningIssueCodes = new Set();
  const stateCounts = {};
  let targetSurfaceCount = 0;

  for (const row of rows) {
    stateCounts[row.state || "unknown"] = (stateCounts[row.state || "unknown"] || 0) + 1;
    targetSurfaceCount += Number(row.targetSurfaceCount || 0);
    for (const code of row.blockingIssueCodes || []) blockingIssueCodes.add(code);
    for (const code of row.warningIssueCodes || []) warningIssueCodes.add(code);
  }

  return {
    id: domain.id || "",
    batchKey: domain.batchKey || "",
    state: domain.state || "empty",
    rowCount: rows.length,
    stagedRowCount: rows.filter((row) => String(row.state || "").startsWith("staged-")).length,
    blockedRowCount: rows.filter((row) => row.state === "withheld-blocked" || (row.blockingIssueCodes || []).length).length,
    warningRowCount: rows.filter((row) => (row.warningIssueCodes || []).length).length,
    targetSurfaceCount,
    generatedSurfaceCount: Number(domain.generatedSurfaceCount || 0),
    checkScripts: Array.from(domain.checkScripts || []),
    blockingIssueCodes: [...blockingIssueCodes],
    warningIssueCodes: [...warningIssueCodes],
    stateCounts,
  };
}
