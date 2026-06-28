import { STATIC_ASSET_REGISTRY, resolveAssetPath } from "../assets/assetRegistry.js?v=467";
import {
  MONSTER_RUNTIME_ID_ALIASES,
  MONSTER_RUNTIME_INTEGRATION_PACK_VERSION,
  MONSTER_RUNTIME_INTEGRATION_PRESETS,
  MONSTER_RUNTIME_MOTION_ID_MAP,
  resolveMonsterRuntimeIntegrationPreset,
} from "../config/monsterRuntimeIntegrationPresets.js?v=467";
import { MONSTER_BATTLE_SPRITE_PRESETS } from "../config/monsterBattleSpritePresets.js?v=467";
import { MONSTER_COMBAT_POSES } from "../config/monsterCombatDisplay.js?v=467";
import { monsters } from "../data/worldData.js?v=467";

export function createMonsterRuntimeIntegrationPreview(registry = STATIC_ASSET_REGISTRY, options = {}) {
  const monsterById = new Map(monsters.map((monster) => [monster.id, monster]));
  const knownAssetFiles = new Set(normalizePathList(options.existingFilePaths));
  const rows = Object.values(MONSTER_RUNTIME_INTEGRATION_PRESETS).map((preset) =>
    createRuntimeIntegrationRow(preset, monsterById, registry, knownAssetFiles),
  );
  const mappedRows = rows.filter((row) => row.mappingStatus === "mapped-to-live-monster");
  const waitingRows = rows.filter((row) => row.spriteStatus === "waiting-for-transparent-png");

  return {
    schemaVersion: 1,
    sourcePack: MONSTER_RUNTIME_INTEGRATION_PACK_VERSION,
    currentImplementationWins: true,
    duplicateMonsterCreationBlocked: true,
    externalAliasCount: Object.keys(MONSTER_RUNTIME_ID_ALIASES).length,
    summary: {
      runtimePresets: rows.length,
      mappedMonsters: mappedRows.length,
      waitingSpriteFiles: waitingRows.reduce((total, row) => total + row.missingSpriteFiles.length, 0),
      actionPatterns: rows.reduce((total, row) => total + row.actions.length, 0),
    },
    motionMap: MONSTER_RUNTIME_MOTION_ID_MAP,
    rows,
  };
}

function createRuntimeIntegrationRow(preset, monsterById, registry, knownAssetFiles) {
  const liveMonster = monsterById.get(preset.monsterId) || null;
  const runtimeBattlePreset = MONSTER_BATTLE_SPRITE_PRESETS[preset.monsterId] || null;
  const resolvedAlias = resolveMonsterRuntimeIntegrationPreset(preset.externalMonsterId)?.monsterId || "";
  const expectedFiles = Array.from(preset.spritePolicy?.expectedFiles || expectedSpriteFiles(preset.monsterId));
  const resolvedSpriteFiles = expectedFiles.map((filePath) => ({
    filePath,
    assetId: findAssetIdByPath(registry, filePath),
    fileKnownAtBuildTime: knownAssetFiles.has(filePath),
  }));
  const missingSpriteFiles = resolvedSpriteFiles
    .filter((entry) => !entry.assetId && !entry.fileKnownAtBuildTime)
    .map((entry) => entry.filePath);
  const connectedSpriteFiles = resolvedSpriteFiles.filter((entry) => entry.assetId || entry.fileKnownAtBuildTime);

  return {
    sourcePack: preset.sourcePack,
    externalMonsterId: preset.externalMonsterId,
    liveMonsterId: preset.monsterId,
    liveMonsterName: liveMonster?.name || preset.displayNameKey || preset.monsterId,
    mappingStatus: liveMonster && resolvedAlias === preset.monsterId ? "mapped-to-live-monster" : "blocked-unmapped",
    duplicateMonsterCreationBlocked: true,
    runtimeClass: runtimeBattlePreset?.classId || preset.placement?.expectedRuntimeClass || "",
    cardSlot: preset.placement?.cardSlot || "enemy",
    pivot: preset.placement?.pivot || "foot_center",
    sourceInitialScale: preset.placement?.initialScale ?? null,
    currentRuntimeScale: runtimeBattlePreset?.defaultScale ?? null,
    cutoffPolicy: preset.placement?.cutoffPolicy || "",
    motions: Object.entries(preset.motions || {}).map(([phase, externalMotionId]) => ({
      phase,
      externalMotionId,
      runtimeMotionId: MONSTER_RUNTIME_MOTION_ID_MAP[externalMotionId] || "",
    })),
    actions: Array.from(preset.actions || []).map((action) => ({
      id: action.id,
      nameKey: action.nameKey,
      type: action.type,
      motion: action.motion,
      damageType: action.damageType,
      effectType: action.effectType,
      optional: Boolean(action.optional),
    })),
    spriteStatus: missingSpriteFiles.length ? "waiting-for-transparent-png" : "sprite-files-connectable",
    sourcePreviewAssetId: preset.spritePolicy?.sourcePreviewAssetId || "",
    sourcePreviewFile: preset.spritePolicy?.sourcePreviewFile || "",
    sourcePreviewAssetPath: preset.spritePolicy?.sourcePreviewAssetId
      ? resolveAssetPath(preset.spritePolicy.sourcePreviewAssetId, registry)
      : "",
    sourceImageIsComposite: preset.spritePolicy?.sourceImageIsComposite === true,
    sourcePackageFile: preset.spritePolicy?.sourcePackageFile || "",
    expectedSpriteFiles: expectedFiles,
    connectedSpriteFiles,
    missingSpriteFiles,
    qaChecklist: Array.from(preset.qaChecklist || []),
  };
}

function expectedSpriteFiles(monsterId) {
  return MONSTER_COMBAT_POSES.map((pose) => `assets/monsters/${monsterId}_${pose}.webp`);
}

function findAssetIdByPath(registry, filePath) {
  const normalizedFilePath = normalizePath(filePath);
  const asset = (registry?.manifest?.assets || []).find((entry) =>
    [entry.webpFile, entry.cleanFile, entry.sourceFile].some((path) => normalizePath(path) === normalizedFilePath),
  );
  if (asset?.assetId && normalizePath(resolveAssetPath(asset.assetId, registry)) === normalizedFilePath) return asset.assetId;
  return asset?.assetId || "";
}

function normalizePathList(paths = []) {
  return Array.from(paths, normalizePath).filter(Boolean);
}

function normalizePath(path = "") {
  return String(path || "").replaceAll("\\", "/").replace(/^\.\//, "");
}
