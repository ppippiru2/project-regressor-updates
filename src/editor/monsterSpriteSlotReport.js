import { STATIC_ASSET_REGISTRY, resolveAssetPath } from "../assets/assetRegistry.js?v=412";
import { MONSTER_COMBAT_POSES } from "../config/monsterCombatDisplay.js?v=412";
import { monsters } from "../data/worldData.js?v=412";

const MONSTER_SPRITE_FOLDER = "assets/monsters/";
const MONSTER_SPRITE_DRAFT_CATEGORY = "monster-combat-sprite";

export function createMonsterSpriteSlotReport(registry = STATIC_ASSET_REGISTRY) {
  const assetsById = new Map((registry?.manifest?.assets || []).map((asset) => [asset.assetId, asset]));
  const monsterSlots = registry?.slots?.slots?.monster || {};
  const byMonsterId = monsterSlots.byMonsterId || {};
  const rows = monsters.flatMap((monster) =>
    MONSTER_COMBAT_POSES.map((pose) => createMonsterSpriteSlotRow(monster, pose, byMonsterId, assetsById, registry)),
  );
  const missingRows = rows.filter((row) => row.status === "missing");
  const assignedRows = rows.filter((row) => row.status === "assigned");
  const brokenRows = rows.filter((row) => row.status === "broken");
  const expectedPathMatches = rows.filter((row) => row.expectedPathMatch);
  const draftRows = rows.filter((row) => !row.assetId);

  return {
    version: 2,
    poses: [...MONSTER_COMBAT_POSES],
    totals: {
      monsters: monsters.length,
      poses: MONSTER_COMBAT_POSES.length,
      slots: rows.length,
      assignedSlots: assignedRows.length,
      missingSlots: missingRows.length,
      brokenSlots: brokenRows.length,
      expectedPathMatches: expectedPathMatches.length,
      draftAssetCandidates: draftRows.length,
    },
    rows,
    missingRows,
    assignedRows,
    brokenRows,
    draftRows,
    byMonster: groupRowsByMonster(rows),
  };
}

export function createMonsterSpriteAssignmentDrafts(report = createMonsterSpriteSlotReport()) {
  return (report.draftRows || []).map((row) => ({
    slotId: row.slotId,
    slotPatchPath: row.slotPatchPath,
    assetId: row.draftAssetId,
    assetEntry: row.draftAssetEntry,
  }));
}

function createMonsterSpriteSlotRow(monster, pose, byMonsterId, assetsById, registry) {
  const slotId = `monster.byMonsterId.${monster.id}.${pose}`;
  const expectedPath = `${MONSTER_SPRITE_FOLDER}${monster.id}_${pose}.webp`;
  const assetId = byMonsterId?.[monster.id]?.[pose] || "";
  const asset = assetId ? assetsById.get(assetId) : null;
  const resolvedPath = normalizeAssetPath(resolveAssetPath(assetId, registry));
  const status = assetId ? (resolvedPath ? "assigned" : "broken") : "missing";
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
    expectedPathMatch: Boolean(resolvedPath && resolvedPath === expectedPath),
    assetCategory: asset?.category || "",
  };
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
    missingSlots: group.rows.filter((row) => row.status === "missing").length,
    brokenSlots: group.rows.filter((row) => row.status === "broken").length,
  }));
}

function normalizeAssetPath(path) {
  return String(path || "").replaceAll("\\", "/").replace(/^\.\//, "");
}
