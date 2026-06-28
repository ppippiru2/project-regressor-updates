export const CONTENT_BULK_PACKAGE_OVERVIEW_VERSION = "content-bulk-package-overview-v5";

export const CONTENT_BULK_OVERVIEW_DRILLDOWN_TARGETS = Object.freeze({
  reviewSurface: Object.freeze({
    "package-contract": "content-bulk-package-adapter",
    "loot-skill": "loot-skill-bulk-intake",
    "monster-runtime": "monster-runtime-bulk-intake",
    "runtime-vfx": "runtime-vfx-bulk-intake",
  }),
  domain: Object.freeze({
    monster: "content-bulk-package-adapter",
    equipment_item: "content-bulk-package-adapter",
    loot_item: "loot-skill-bulk-intake",
    skill: "loot-skill-bulk-intake",
    reward_link: "content-bulk-package-adapter",
  }),
});

export const CONTENT_BULK_ROW_TARGET_SCOPES = Object.freeze({
  packageDomain: "content-bulk-package-domain",
  loot: "loot-skill-loot",
  skill: "loot-skill-skill",
  monsterRuntime: "monster-runtime-row",
  runtimeVfx: "runtime-vfx-row",
});

export function createContentBulkRowTargetId(scope, ...parts) {
  const normalizedParts = parts
    .flat()
    .map((part) => normalizeAnchorPart(part))
    .filter(Boolean);
  const suffix = normalizedParts.join("-") || "row";
  return `${scope}-${suffix}`;
}

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
    createPackageContractRow(adapterPreview),
    createLootSkillRow(lootSummary, lootSkillPreview),
    createMonsterRuntimeRow(monsterRuntimeSummary, monsterRuntimePreview),
    createRuntimeVfxRow(runtimeVfxSummary, runtimeVfxPreview),
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
      drilldownRowTargetCount: countDrilldownRowTargets({
        activeDomainRows,
        lootSkillPreview,
        monsterRuntimePreview,
        runtimeVfxPreview,
      }),
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
      drilldownAnchorsOnly: true,
      drilldownRowTargetsOnly: true,
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
    drilldownTargetId: CONTENT_BULK_OVERVIEW_DRILLDOWN_TARGETS.domain[mapping.domainId || ""] || "content-bulk-package-adapter",
    rowTargetId: Number(mapping.rowCount || 0) > 0
      ? createContentBulkRowTargetId(CONTENT_BULK_ROW_TARGET_SCOPES.packageDomain, mapping.domainId || mapping.batchKey)
      : "",
  }));
}

function createPackageContractRow(adapterPreview = {}) {
  const summary = adapterPreview.summary || {};
  const primaryRowTargetId = firstPackageMappingTargetId(adapterPreview);
  return {
    id: "package-contract",
    rowCount: Number(summary.normalizedRowCount || 0),
    readyCount: Number(summary.stagedRowCount || 0),
    warningCount: Number(summary.warningRowCount || 0),
    blockedCount: Number(summary.withheldRowCount || 0) + Number(summary.unmappedArrayKeyCount || 0),
    checkCount: Number(summary.requiredCheckCount || 0),
    state: rowState(Number(summary.withheldRowCount || 0) + Number(summary.unmappedArrayKeyCount || 0), Number(summary.warningRowCount || 0), Number(summary.normalizedRowCount || 0)),
    drilldownTargetId: CONTENT_BULK_OVERVIEW_DRILLDOWN_TARGETS.reviewSurface["package-contract"],
    primaryRowTargetId,
  };
}

function createLootSkillRow(summary = {}, lootSkillPreview = {}) {
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
    drilldownTargetId: CONTENT_BULK_OVERVIEW_DRILLDOWN_TARGETS.reviewSurface["loot-skill"],
    primaryRowTargetId: firstLootSkillRowTargetId(lootSkillPreview),
  };
}

function createMonsterRuntimeRow(summary = {}, monsterRuntimePreview = {}) {
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
    drilldownTargetId: CONTENT_BULK_OVERVIEW_DRILLDOWN_TARGETS.reviewSurface["monster-runtime"],
    primaryRowTargetId: firstMonsterRuntimeRowTargetId(monsterRuntimePreview),
  };
}

function createRuntimeVfxRow(summary = {}, runtimeVfxPreview = {}) {
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
    drilldownTargetId: CONTENT_BULK_OVERVIEW_DRILLDOWN_TARGETS.reviewSurface["runtime-vfx"],
    primaryRowTargetId: firstRuntimeVfxRowTargetId(runtimeVfxPreview),
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

function firstPackageMappingTargetId(adapterPreview = {}) {
  const mapping = (adapterPreview.mappings || []).find((row) => Number(row.rowCount || 0) > 0);
  if (!mapping) return "";
  return createContentBulkRowTargetId(CONTENT_BULK_ROW_TARGET_SCOPES.packageDomain, mapping.domainId || mapping.batchKey);
}

function firstLootSkillRowTargetId(lootSkillPreview = {}) {
  const blockedLoot = (lootSkillPreview.lootRows || []).find((row) => String(row.intakeState || "").startsWith("blocked-"));
  const lootRow = blockedLoot || (lootSkillPreview.lootRows || [])[0];
  if (lootRow) return createContentBulkRowTargetId(CONTENT_BULK_ROW_TARGET_SCOPES.loot, lootRow.id || lootRow.type);
  const skillRow = (lootSkillPreview.skillRows || [])[0];
  if (skillRow) return createContentBulkRowTargetId(CONTENT_BULK_ROW_TARGET_SCOPES.skill, skillRow.id || skillRow.type);
  return "";
}

function firstMonsterRuntimeRowTargetId(monsterRuntimePreview = {}) {
  const blockedRow = (monsterRuntimePreview.rows || []).find((row) => String(row.runtimeState || "").startsWith("blocked-"));
  const row = blockedRow || (monsterRuntimePreview.rows || [])[0];
  if (!row) return "";
  return createContentBulkRowTargetId(
    CONTENT_BULK_ROW_TARGET_SCOPES.monsterRuntime,
    row.liveMonsterId || row.externalMonsterId || row.packageIdentity,
  );
}

function firstRuntimeVfxRowTargetId(runtimeVfxPreview = {}) {
  const blockedRow = (runtimeVfxPreview.rows || []).find((row) => String(row.intakeState || "").startsWith("blocked-"));
  const reviewRow = (runtimeVfxPreview.rows || []).find((row) => String(row.intakeState || "").startsWith("review-"));
  const row = blockedRow || reviewRow || (runtimeVfxPreview.rows || [])[0];
  if (!row) return "";
  return createContentBulkRowTargetId(
    CONTENT_BULK_ROW_TARGET_SCOPES.runtimeVfx,
    row.rowIndex,
    row.motionProfile,
    row.effectType || row.kind,
  );
}

function countDrilldownRowTargets({
  activeDomainRows = [],
  lootSkillPreview = {},
  monsterRuntimePreview = {},
  runtimeVfxPreview = {},
}) {
  return activeDomainRows.length
    + (lootSkillPreview.lootRows || []).length
    + (lootSkillPreview.skillRows || []).length
    + (monsterRuntimePreview.rows || []).length
    + (runtimeVfxPreview.rows || []).length;
}

function normalizeAnchorPart(part) {
  return String(part ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
