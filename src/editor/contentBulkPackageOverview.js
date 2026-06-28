export const CONTENT_BULK_PACKAGE_OVERVIEW_VERSION = "content-bulk-package-overview-v1";

export function createContentBulkPackageOverview({
  adapterPreview,
  lootSkillPreview,
  monsterRuntimePreview,
  runtimeVfxPreview,
} = {}) {
  const adapterSummary = adapterPreview?.summary || {};
  const lootSummary = lootSkillPreview?.summary || {};
  const monsterRuntimeSummary = monsterRuntimePreview?.summary || {};
  const runtimeVfxSummary = runtimeVfxPreview?.summary || {};
  const domainRows = createDomainRows(adapterPreview);
  const activeDomainRows = domainRows.filter((row) => row.rowCount > 0);
  const reviewRows = [
    createPackageContractRow(adapterSummary),
    createLootSkillRow(lootSummary),
    createMonsterRuntimeRow(monsterRuntimeSummary),
    createRuntimeVfxRow(runtimeVfxSummary),
  ];
  const activeReviewRows = reviewRows.filter((row) => row.rowCount > 0);
  const blockedRowCount = reviewRows.reduce((sum, row) => sum + row.blockedCount, 0);
  const warningRowCount = reviewRows.reduce((sum, row) => sum + row.warningCount, 0);
  const readyRowCount = reviewRows.reduce((sum, row) => sum + row.readyCount, 0);
  const packageRowCount = Number(adapterSummary.normalizedRowCount || 0)
    + Number(monsterRuntimeSummary.packageRowCount || 0)
    + Number(runtimeVfxSummary.packageRowCount || 0);

  return {
    version: CONTENT_BULK_PACKAGE_OVERVIEW_VERSION,
    writesGameData: false,
    requiresManualReview: true,
    requiresExplicitApply: true,
    scalableBatchReview: true,
    summary: {
      packageRowCount,
      normalizedRowCount: Number(adapterSummary.normalizedRowCount || 0),
      activeDomainCount: activeDomainRows.length,
      recognizedSourceKeyCount: Number(adapterSummary.recognizedSourceKeyCount || 0),
      unmappedSourceKeyCount: Number(adapterSummary.unmappedArrayKeyCount || 0),
      readyRowCount,
      warningRowCount,
      blockedRowCount,
      requiredCheckCount: uniqueRequiredCheckCount({
        adapterSummary,
        lootSummary,
        monsterRuntimeSummary,
        runtimeVfxSummary,
      }),
      reviewSurfaceCount: activeReviewRows.length,
    },
    status: blockedRowCount > 0
      ? "blocked"
      : (warningRowCount > 0 ? "review" : "ready"),
    domainRows,
    reviewRows,
    guard: {
      actualWritesDisabled: true,
      summarizesExistingPreviewsOnly: true,
      scalableForBulkMonsterItemSkillUpdates: true,
    },
  };
}

function createDomainRows(adapterPreview = {}) {
  return (adapterPreview.mappings || []).map((mapping) => ({
    id: mapping.domainId || "",
    batchKey: mapping.batchKey || "",
    rowCount: Number(mapping.rowCount || 0),
    sourceKeys: Array.from(mapping.sourceKeys || []),
    requiredInputFields: Array.from(mapping.requiredInputFields || []),
    state: Number(mapping.rowCount || 0) > 0 ? "active" : "empty",
  }));
}

function createPackageContractRow(summary = {}) {
  return {
    id: "package-contract",
    rowCount: Number(summary.normalizedRowCount || 0),
    readyCount: Number(summary.stagedRowCount || 0),
    warningCount: Number(summary.warningRowCount || 0),
    blockedCount: Number(summary.withheldRowCount || 0) + Number(summary.unmappedArrayKeyCount || 0),
    checkCount: Number(summary.requiredCheckCount || 0),
    state: rowState(Number(summary.withheldRowCount || 0) + Number(summary.unmappedArrayKeyCount || 0), Number(summary.warningRowCount || 0), Number(summary.normalizedRowCount || 0)),
  };
}

function createLootSkillRow(summary = {}) {
  const rowCount = Number(summary.lootRowCount || 0) + Number(summary.skillRowCount || 0);
  const blockedCount = Number(summary.missingSkillDefinitionCount || 0);
  return {
    id: "loot-skill",
    rowCount,
    readyCount: Math.max(0, rowCount - blockedCount),
    warningCount: 0,
    blockedCount,
    checkCount: Number(summary.requiredCheckCount || 0),
    state: rowState(blockedCount, 0, rowCount),
  };
}

function createMonsterRuntimeRow(summary = {}) {
  const rowCount = Number(summary.packageRowCount || 0);
  const blockedCount = Number(summary.blockedRuntimeRowCount || 0);
  const warningCount = Number(summary.warningRowCount || 0);
  return {
    id: "monster-runtime",
    rowCount,
    readyCount: Math.max(0, rowCount - blockedCount),
    warningCount,
    blockedCount,
    checkCount: Number(summary.requiredCheckCount || 0),
    state: rowState(blockedCount, warningCount, rowCount),
  };
}

function createRuntimeVfxRow(summary = {}) {
  const rowCount = Number(summary.packageRowCount || 0);
  const blockedCount = Number(summary.blockedRowCount || 0);
  const warningCount = Number(summary.warningRowCount || 0);
  return {
    id: "runtime-vfx",
    rowCount,
    readyCount: Number(summary.readyRowCount || 0),
    warningCount,
    blockedCount,
    checkCount: Number(summary.requiredCheckCount || 0),
    state: rowState(blockedCount, warningCount, rowCount),
  };
}

function uniqueRequiredCheckCount({ adapterSummary, lootSummary, monsterRuntimeSummary, runtimeVfxSummary }) {
  return Math.max(
    Number(adapterSummary.requiredCheckCount || 0),
    Number(lootSummary.requiredCheckCount || 0),
  )
    + Number(monsterRuntimeSummary.requiredCheckCount || 0)
    + Number(runtimeVfxSummary.requiredCheckCount || 0);
}

function rowState(blockedCount, warningCount, rowCount) {
  if (blockedCount > 0) return "blocked";
  if (warningCount > 0) return "review";
  if (rowCount > 0) return "ready";
  return "empty";
}
