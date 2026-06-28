import { TUTORIAL_MONSTER_POOL_DATA, TUTORIAL_MONSTER_REWARD_LINKS } from "../balance/monsterCandidatePool.js?v=511";
import { createContentBulkPatchPackageAdapterPreview } from "./contentBulkPatchPackageAdapter.js?v=511";
import { createStagedContractSummary } from "./contentBulkStagedContractSummary.js?v=511";
import { createMonsterRuntimeIntegrationPreview } from "./monsterRuntimeIntegrationPreview.js?v=511";

export const MONSTER_RUNTIME_BULK_INTAKE_PREVIEW_VERSION = "monster-runtime-bulk-intake-preview-v1";

export function createMonsterRuntimeBulkIntakePreview(
  runtimePreview = createMonsterRuntimeIntegrationPreview(),
) {
  const packageData = createMonsterRuntimeBulkIntakePackage(runtimePreview);
  const adapterPreview = createContentBulkPatchPackageAdapterPreview(packageData);
  const monsterMapping = (adapterPreview.mappings || []).find((mapping) => mapping.domainId === "monster") || {};
  const stagedMonsterDomain = (adapterPreview.stagedImport?.domains || []).find((domain) => domain.id === "monster") || {};
  const stagedContract = createStagedContractSummary(adapterPreview, ["monster"]);
  const rows = (runtimePreview.rows || []).map((row, index) =>
    createRuntimeBulkIntakeRow(row, packageData.monsterRuntimePresets[index], stagedMonsterDomain),
  );

  return {
    version: MONSTER_RUNTIME_BULK_INTAKE_PREVIEW_VERSION,
    sourcePack: runtimePreview.sourcePack,
    sourceVersion: runtimePreview.sourcePack,
    writesGameData: false,
    requiresTransparentSprites: true,
    requiresManualReview: true,
    requiresExplicitApply: true,
    duplicateMonsterCreationBlocked: runtimePreview.duplicateMonsterCreationBlocked === true,
    packageKey: "monsterRuntimePresets",
    adapterPreview,
    packageData,
    summary: {
      runtimePresetCount: runtimePreview.summary?.runtimePresets || 0,
      packageRowCount: packageData.monsterRuntimePresets.length,
      recognizedRuntimeRows: monsterMapping.rowCount || 0,
      updateCandidateCount: adapterPreview.stagedImport?.summary?.updateStageCount || 0,
      appendCandidateCount: adapterPreview.stagedImport?.summary?.appendStageCount || 0,
      warningRowCount: adapterPreview.stagedImport?.summary?.warningRowCount || 0,
      contractStagedRowCount: stagedContract.summary.stagedRowCount,
      contractBlockedRowCount: stagedContract.summary.blockedRowCount,
      contractWarningRowCount: stagedContract.summary.warningRowCount,
      contractTargetSurfaceCount: stagedContract.summary.targetSurfaceCount,
      missingSpriteFileCount: rows.reduce((sum, row) => sum + row.missingSpriteFiles.length, 0),
      blockedRuntimeRowCount: rows.filter((row) => row.runtimeState === "blocked-waiting-transparent-sprites").length,
      requiredCheckCount: adapterPreview.summary?.requiredCheckCount || 0,
    },
    stagedContract,
    rows,
  };
}

export function createMonsterRuntimeBulkIntakePackage(runtimePreview = createMonsterRuntimeIntegrationPreview()) {
  return {
    version: MONSTER_RUNTIME_BULK_INTAKE_PREVIEW_VERSION,
    sourcePack: runtimePreview.sourcePack,
    monsterRuntimePresets: (runtimePreview.rows || []).map((row) => createMonsterRuntimePresetPackageRow(row)),
  };
}

function createRuntimeBulkIntakeRow(row, packageRow, stagedMonsterDomain) {
  const stagedRow = (stagedMonsterDomain.rows || []).find((candidate) => candidate.identity === row.liveMonsterId) || {};
  const missingSpriteFiles = Array.from(row.missingSpriteFiles || []);
  return {
    externalMonsterId: row.externalMonsterId,
    liveMonsterId: row.liveMonsterId,
    sourcePack: row.sourcePack,
    acceptedAliasKey: "monsterRuntimePresets",
    targetDomainId: "monster",
    packageIdentity: packageRow?.id || row.liveMonsterId,
    packageRegionId: packageRow?.regionId || "",
    packageLevel: packageRow?.level || 1,
    mappingStatus: row.mappingStatus,
    spriteStatus: row.spriteStatus,
    runtimeState: runtimeBulkState(row, missingSpriteFiles),
    bulkState: stagedRow.state || "not-staged",
    targetSurfaceCount: Number(stagedRow.targetSurfaceCount || 0),
    warningIssueCodes: Array.from(stagedRow.warningIssueCodes || []),
    blockingIssueCodes: Array.from(stagedRow.blockingIssueCodes || []),
    motions: Array.from(row.motions || []),
    actions: Array.from(row.actions || []),
    missingSpriteFiles,
    sourcePreviewFile: row.sourcePreviewFile,
    sourceImageIsComposite: row.sourceImageIsComposite === true,
  };
}

function runtimeBulkState(row, missingSpriteFiles) {
  if (missingSpriteFiles.length) return "blocked-waiting-transparent-sprites";
  if (row.spriteStatus === "transparent-sprites-connected") return "connected-transparent-sprites";
  return "ready-for-runtime-review";
}

function createMonsterRuntimePresetPackageRow(row) {
  const current = findCurrentMonsterRow(row.liveMonsterId);
  const reward = findCurrentRewardLink(row.liveMonsterId);
  return {
    id: row.liveMonsterId,
    regionId: current?.regionId || "tutorial_shore",
    level: current?.level || 1,
    stats: current?.stats || { STR: 1, AGI: 1, VIT: 1, INT: 0, WIS: 0, LUK: 0 },
    tags: Array.from(new Set([...(current?.tags || []), "runtime-package", row.externalMonsterId].filter(Boolean))),
    representativeMonsterId: current?.representativeMonsterId || row.liveMonsterId,
    rewardLink: {
      codexFragmentId: reward?.codexFragmentId || `${row.liveMonsterId}_codex_fragment`,
      materialItemIds: Array.from(reward?.materialItemIds || []),
      skillItemIds: Array.from(reward?.skillItemIds || []),
    },
    runtimeIntegration: {
      sourcePack: row.sourcePack,
      externalMonsterId: row.externalMonsterId,
      sourcePreviewFile: row.sourcePreviewFile,
      sourceImageIsComposite: row.sourceImageIsComposite === true,
      cardSlot: row.cardSlot,
      pivot: row.pivot,
      sourceInitialScale: row.sourceInitialScale,
      currentRuntimeScale: row.currentRuntimeScale,
      cutoffPolicy: row.cutoffPolicy,
      requiredTransparentSprites: Array.from(row.expectedSpriteFiles || []),
      missingTransparentSprites: Array.from(row.missingSpriteFiles || []),
      motions: Object.fromEntries((row.motions || []).map((motion) => [motion.phase, motion.runtimeMotionId])),
      actions: (row.actions || []).map((action) => ({
        id: action.id,
        type: action.type,
        motion: action.motion,
        damageType: action.damageType,
        optional: action.optional === true,
      })),
    },
  };
}

function findCurrentMonsterRow(monsterId) {
  return TUTORIAL_MONSTER_POOL_DATA.find((monster) => monster.id === monsterId) || null;
}

function findCurrentRewardLink(monsterId) {
  return TUTORIAL_MONSTER_REWARD_LINKS.find((link) => link.monsterId === monsterId) || null;
}


