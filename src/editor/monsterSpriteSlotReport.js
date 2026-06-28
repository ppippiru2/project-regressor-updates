import { STATIC_ASSET_REGISTRY, resolveAssetPath } from "../assets/assetRegistry.js?v=494";
import { MONSTER_COMBAT_POSES, monsterSpriteSlotKeyForPose } from "../config/monsterCombatDisplay.js?v=494";
import { monsters } from "../data/worldData.js?v=494";

const MONSTER_SPRITE_FOLDER = "assets/monsters/";
const MONSTER_SPRITE_DRAFT_CATEGORY = "monster-combat-sprite";
const FILE_STATUS = Object.freeze({
  notScanned: "not-scanned",
  ready: "file-ready",
  missing: "file-missing",
});
const RUNTIME_FALLBACK_MODES = Object.freeze(["assigned-asset", "broken-asset", "default-slot", "css-placeholder"]);

export function createMonsterSpriteSlotReport(registry = STATIC_ASSET_REGISTRY, options = {}) {
  const assetsById = new Map((registry?.manifest?.assets || []).map((asset) => [asset.assetId, asset]));
  const monsterSlots = registry?.slots?.slots?.monster || {};
  const byMonsterId = monsterSlots.byMonsterId || {};
  const existingFilePaths = normalizeExistingFilePaths(options.existingFilePaths);
  const rows = monsters.flatMap((monster) =>
    MONSTER_COMBAT_POSES.map((pose) =>
      createMonsterSpriteSlotRow(monster, pose, byMonsterId, assetsById, registry, existingFilePaths),
    ),
  );
  const connectableRows = rows.filter((row) => row.status === "connectable");
  const missingRows = rows.filter((row) => row.status === "missing");
  const assignedRows = rows.filter((row) => row.status === "assigned");
  const brokenRows = rows.filter((row) => row.status === "broken");
  const fileReadyRows = rows.filter((row) => row.fileStatus === FILE_STATUS.ready);
  const fileMissingRows = rows.filter((row) => row.fileStatus === FILE_STATUS.missing);
  const expectedPathMatches = rows.filter((row) => row.expectedPathMatch);
  const defaultFallbackRows = rows.filter((row) => row.runtimeFallbackMode === "default-slot");
  const cssPlaceholderRows = rows.filter((row) => row.runtimeFallbackMode === "css-placeholder");
  const draftRows = rows.filter((row) => !row.assetId);

  const runtimeFallbackModeCounts = countRowsByValue(rows, "runtimeFallbackMode", RUNTIME_FALLBACK_MODES);

  return {
    version: 3,
    poses: [...MONSTER_COMBAT_POSES],
    totals: {
      monsters: monsters.length,
      poses: MONSTER_COMBAT_POSES.length,
      slots: rows.length,
      assignedSlots: assignedRows.length,
      connectableSlots: connectableRows.length,
      missingSlots: missingRows.length,
      brokenSlots: brokenRows.length,
      fileScannedSlots: existingFilePaths ? rows.length : 0,
      fileReadySlots: fileReadyRows.length,
      fileMissingSlots: fileMissingRows.length,
      defaultFallbackSlots: defaultFallbackRows.length,
      cssPlaceholderSlots: cssPlaceholderRows.length,
      expectedPathMatches: expectedPathMatches.length,
      draftAssetCandidates: draftRows.length,
      runtimeFallbackModeCounts,
    },
    runtimeFallbackModeCounts,
    fallbackModeSummary: createFallbackModeSummary(rows),
    rows,
    connectableRows,
    missingRows,
    assignedRows,
    brokenRows,
    fileReadyRows,
    fileMissingRows,
    defaultFallbackRows,
    cssPlaceholderRows,
    draftRows,
    byMonster: groupRowsByMonster(rows),
  };
}

export function createMonsterSpriteAssignmentDrafts(report = createMonsterSpriteSlotReport()) {
  return (report.draftRows || []).map((row) => ({
    monsterId: row.monsterId,
    pose: row.pose,
    slotId: row.slotId,
    slotPatchPath: row.slotPatchPath,
    assetId: row.draftAssetId,
    assetEntry: row.draftAssetEntry,
  }));
}

export function createMonsterSpriteAssignmentPatchDraft(report = createMonsterSpriteSlotReport()) {
  const drafts = createMonsterSpriteAssignmentDrafts(report);
  return {
    version: 1,
    summary: {
      slots: report.totals?.slots || 0,
      draftAssetCandidates: drafts.length,
      connectableSlots: report.totals?.connectableSlots || 0,
      fileReadySlots: report.totals?.fileReadySlots || 0,
      fileMissingSlots: report.totals?.fileMissingSlots || 0,
    },
    assetManifestEntries: drafts.map((draft) => draft.assetEntry),
    assetSlotPatches: drafts.map((draft) => ({
      path: draft.slotPatchPath,
      value: draft.assetId,
    })),
    assetSlotPatchObject: {
      slots: {
        monster: {
          byMonsterId: createMonsterSpriteSlotPatchObject(drafts),
        },
      },
    },
  };
}

export function createMonsterSpriteReadyConnectionPatchPlan(report = createMonsterSpriteSlotReport()) {
  const drafts = createMonsterSpriteAssignmentDrafts({
    ...report,
    draftRows: report.connectableRows || [],
  });
  const plan = {
    version: 1,
    applyMode: "file-ready-only",
    summary: {
      slots: report.totals?.slots || 0,
      connectableSlots: report.totals?.connectableSlots || 0,
      fileReadySlots: report.totals?.fileReadySlots || 0,
      fileMissingSlots: report.totals?.fileMissingSlots || 0,
      readyPatchCandidates: drafts.length,
    },
    assetManifestEntries: drafts.map((draft) => draft.assetEntry),
    assetSlotPatches: drafts.map((draft) => ({
      path: draft.slotPatchPath,
      value: draft.assetId,
    })),
    assetSlotPatchObject: {
      slots: {
        monster: {
          byMonsterId: createMonsterSpriteSlotPatchObject(drafts),
        },
      },
    },
  };
  return {
    ...plan,
    reviewGate: createMonsterSpriteReadyConnectionReview(report, plan),
  };
}

export function createMonsterSpriteReadyConnectionReview(report = createMonsterSpriteSlotReport(), plan = null) {
  const readyPlan = plan || createMonsterSpriteReadyConnectionPatchPlan(report);
  const readyPatchCount = readyPlan.assetSlotPatches?.length || 0;
  const brokenSlotCount = report.totals?.brokenSlots || 0;
  const missingFileCount = report.totals?.fileMissingSlots || 0;
  const status = monsterSpriteReadyReviewStatus({ readyPatchCount, brokenSlotCount });
  const checks = [
    {
      id: "file-ready-only",
      passed: readyPlan.applyMode === "file-ready-only",
      blocking: true,
    },
    {
      id: "has-ready-files",
      passed: readyPatchCount > 0,
      blocking: false,
    },
    {
      id: "no-broken-slots",
      passed: brokenSlotCount === 0,
      blocking: true,
    },
    {
      id: "ready-patches-match-connectable",
      passed: readyPatchCount === (report.connectableRows || []).length,
      blocking: true,
    },
  ];

  return {
    version: 1,
    status,
    canApplyAfterReview: status === "ready-for-manual-review",
    readyPatchCount,
    missingFileCount,
    brokenSlotCount,
    nextStep: monsterSpriteReadyReviewNextStep(status),
    checks,
  };
}

function createMonsterSpriteSlotRow(monster, pose, byMonsterId, assetsById, registry, existingFilePaths) {
  const slotId = `monster.byMonsterId.${monster.id}.${pose}`;
  const expectedPath = `${MONSTER_SPRITE_FOLDER}${monster.id}_${pose}.webp`;
  const assetId = byMonsterId?.[monster.id]?.[pose] || "";
  const defaultSlotKey = monsterSpriteSlotKeyForPose(pose);
  const defaultAssetId = registry?.slots?.slots?.monster?.[defaultSlotKey] || "";
  const asset = assetId ? assetsById.get(assetId) : null;
  const resolvedPath = normalizeAssetPath(resolveAssetPath(assetId, registry));
  const defaultResolvedPath = normalizeAssetPath(resolveAssetPath(defaultAssetId, registry));
  const fileStatus = expectedFileStatus(expectedPath, existingFilePaths);
  const status = monsterSpriteSlotStatus(assetId, resolvedPath, fileStatus);
  const draftAssetId = monsterSpriteDraftAssetId(monster.id, pose);
  const slotPatchPath = `slots.monster.byMonsterId.${monster.id}.${pose}`;
  const runtimePreviewPath = resolvedPath || defaultResolvedPath || "";
  const runtimeFallbackMode = monsterSpriteRuntimeFallbackMode(assetId, resolvedPath, defaultResolvedPath);

  return {
    monsterId: monster.id,
    monsterName: monster.name || monster.id,
    pose,
    slotId,
    expectedPath,
    assetId,
    defaultAssetId,
    defaultSlotKey,
    draftAssetId,
    slotPatchPath,
    draftAssetEntry: createMonsterSpriteDraftAssetEntry(monster, pose, expectedPath, draftAssetId),
    resolvedPath,
    defaultResolvedPath,
    runtimePreviewPath,
    runtimeFallbackMode,
    status,
    fileStatus,
    fileExists: fileStatus === FILE_STATUS.ready,
    expectedPathMatch: Boolean(resolvedPath && resolvedPath === expectedPath),
    assetCategory: asset?.category || "",
  };
}

function monsterSpriteSlotStatus(assetId, resolvedPath, fileStatus) {
  if (assetId) return resolvedPath ? "assigned" : "broken";
  if (fileStatus === FILE_STATUS.ready) return "connectable";
  return "missing";
}

function monsterSpriteRuntimeFallbackMode(assetId, resolvedPath, defaultResolvedPath) {
  if (assetId && resolvedPath) return "assigned-asset";
  if (assetId && !resolvedPath) return "broken-asset";
  if (defaultResolvedPath) return "default-slot";
  return "css-placeholder";
}

function monsterSpriteDraftAssetId(monsterId, pose) {
  return `monster_${monsterId}_${pose}_v1`;
}

function monsterSpriteReadyReviewStatus({ readyPatchCount, brokenSlotCount }) {
  if (brokenSlotCount > 0) return "blocked-broken-slots";
  if (readyPatchCount > 0) return "ready-for-manual-review";
  return "waiting-for-monster-files";
}

function monsterSpriteReadyReviewNextStep(status) {
  if (status === "ready-for-manual-review") return "review-ready-patch";
  if (status === "blocked-broken-slots") return "fix-broken-slots";
  return "add-monster-files";
}

function createMonsterSpriteDraftAssetEntry(monster, pose, expectedPath, draftAssetId) {
  return {
    assetId: draftAssetId,
    category: MONSTER_SPRITE_DRAFT_CATEGORY,
    sourceFile: expectedPath,
    cleanFile: expectedPath,
    webpFile: expectedPath,
    approved: false,
    useInGame: false,
    tags: ["monster", "combat-sprite", monster.id, pose, "draft"],
    notes: `Draft monster combat sprite entry for ${monster.id} ${pose}. Approve and connect it after the final file is added.`,
  };
}

function createMonsterSpriteSlotPatchObject(drafts) {
  const byMonsterId = {};
  for (const draft of drafts) {
    if (!byMonsterId[draft.monsterId]) byMonsterId[draft.monsterId] = {};
    byMonsterId[draft.monsterId][draft.pose] = draft.assetId;
  }
  return byMonsterId;
}

function groupRowsByMonster(rows) {
  const grouped = new Map();
  for (const row of rows) {
    if (!grouped.has(row.monsterId)) {
      grouped.set(row.monsterId, {
        monsterId: row.monsterId,
        monsterName: row.monsterName,
        rows: [],
      });
    }
    grouped.get(row.monsterId).rows.push(row);
  }
  return Array.from(grouped.values()).map((group) => {
    const fallbackModeSummary = createFallbackModeSummary(group.rows);
    return {
      ...group,
      assignedSlots: group.rows.filter((row) => row.status === "assigned").length,
      connectableSlots: group.rows.filter((row) => row.status === "connectable").length,
      missingSlots: group.rows.filter((row) => row.status === "missing").length,
      brokenSlots: group.rows.filter((row) => row.status === "broken").length,
      runtimeFallbackModeCounts: countRowsByValue(group.rows, "runtimeFallbackMode", RUNTIME_FALLBACK_MODES),
      fallbackModeSummary,
      dominantFallbackMode: fallbackModeSummary.find((entry) => entry.count > 0)?.mode || "css-placeholder",
    };
  });
}

function createFallbackModeSummary(rows) {
  const counts = countRowsByValue(rows, "runtimeFallbackMode", RUNTIME_FALLBACK_MODES);
  return RUNTIME_FALLBACK_MODES.map((mode) => ({
    mode,
    count: counts[mode] || 0,
  }));
}

function countRowsByValue(rows, field, values) {
  const counts = Object.fromEntries(values.map((value) => [value, 0]));
  for (const row of rows) {
    const value = row?.[field];
    if (Object.hasOwn(counts, value)) counts[value] += 1;
  }
  return counts;
}

function expectedFileStatus(expectedPath, existingFilePaths) {
  if (!existingFilePaths) return FILE_STATUS.notScanned;
  return existingFilePaths.has(expectedPath) ? FILE_STATUS.ready : FILE_STATUS.missing;
}

function normalizeExistingFilePaths(paths) {
  if (!paths) return null;
  return new Set(Array.from(paths, normalizeAssetPath).filter(Boolean));
}

function normalizeAssetPath(path) {
  return String(path || "").replaceAll("\\", "/").replace(/^\.\//, "");
}



