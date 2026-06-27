import { STATIC_ASSET_REGISTRY, resolveAssetPath } from "../assets/assetRegistry.js?v=415";
import { MONSTER_COMBAT_POSES } from "../config/monsterCombatDisplay.js?v=415";
import { monsters } from "../data/worldData.js?v=415";

const MONSTER_SPRITE_FOLDER = "assets/monsters/";
const MONSTER_SPRITE_DRAFT_CATEGORY = "monster-combat-sprite";
const FILE_STATUS = Object.freeze({
  notScanned: "not-scanned",
  ready: "file-ready",
  missing: "file-missing",
});

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
  const draftRows = rows.filter((row) => !row.assetId);

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
      expectedPathMatches: expectedPathMatches.length,
      draftAssetCandidates: draftRows.length,
    },
    rows,
    connectableRows,
    missingRows,
    assignedRows,
    brokenRows,
    fileReadyRows,
    fileMissingRows,
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
  return {
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
}

function createMonsterSpriteSlotRow(monster, pose, byMonsterId, assetsById, registry, existingFilePaths) {
  const slotId = `monster.byMonsterId.${monster.id}.${pose}`;
  const expectedPath = `${MONSTER_SPRITE_FOLDER}${monster.id}_${pose}.webp`;
  const assetId = byMonsterId?.[monster.id]?.[pose] || "";
  const asset = assetId ? assetsById.get(assetId) : null;
  const resolvedPath = normalizeAssetPath(resolveAssetPath(assetId, registry));
  const fileStatus = expectedFileStatus(expectedPath, existingFilePaths);
  const status = monsterSpriteSlotStatus(assetId, resolvedPath, fileStatus);
  const draftAssetId = monsterSpriteDraftAssetId(monster.id, pose);
  const slotPatchPath = `slots.monster.byMonsterId.${monster.id}.${pose}`;

  return {
    monsterId: monster.id,
    monsterName: monster.name || monster.id,
    pose,
    slotId,
    expectedPath,
    assetId,
    draftAssetId,
    slotPatchPath,
    draftAssetEntry: createMonsterSpriteDraftAssetEntry(monster, pose, expectedPath, draftAssetId),
    resolvedPath,
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

function monsterSpriteDraftAssetId(monsterId, pose) {
  return `monster_${monsterId}_${pose}_v1`;
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
  return Array.from(grouped.values()).map((group) => ({
    ...group,
    assignedSlots: group.rows.filter((row) => row.status === "assigned").length,
    connectableSlots: group.rows.filter((row) => row.status === "connectable").length,
    missingSlots: group.rows.filter((row) => row.status === "missing").length,
    brokenSlots: group.rows.filter((row) => row.status === "broken").length,
  }));
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
