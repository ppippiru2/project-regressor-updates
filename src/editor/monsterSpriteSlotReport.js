import { STATIC_ASSET_REGISTRY, resolveAssetPath } from "../assets/assetRegistry.js?v=411";
import { MONSTER_COMBAT_POSES } from "../config/monsterCombatDisplay.js?v=411";
import { monsters } from "../data/worldData.js?v=411";

const MONSTER_SPRITE_FOLDER = "assets/monsters/";

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

  return {
    version: 1,
    poses: [...MONSTER_COMBAT_POSES],
    totals: {
      monsters: monsters.length,
      poses: MONSTER_COMBAT_POSES.length,
      slots: rows.length,
      assignedSlots: assignedRows.length,
      missingSlots: missingRows.length,
      brokenSlots: brokenRows.length,
      expectedPathMatches: expectedPathMatches.length,
    },
    rows,
    missingRows,
    assignedRows,
    brokenRows,
    byMonster: groupRowsByMonster(rows),
  };
}

function createMonsterSpriteSlotRow(monster, pose, byMonsterId, assetsById, registry) {
  const slotId = `monster.byMonsterId.${monster.id}.${pose}`;
  const expectedPath = `${MONSTER_SPRITE_FOLDER}${monster.id}_${pose}.webp`;
  const assetId = byMonsterId?.[monster.id]?.[pose] || "";
  const asset = assetId ? assetsById.get(assetId) : null;
  const resolvedPath = normalizeAssetPath(resolveAssetPath(assetId, registry));
  const status = assetId ? (resolvedPath ? "assigned" : "broken") : "missing";

  return {
    monsterId: monster.id,
    monsterName: monster.name || monster.id,
    pose,
    slotId,
    expectedPath,
    assetId,
    resolvedPath,
    status,
    expectedPathMatch: Boolean(resolvedPath && resolvedPath === expectedPath),
    assetCategory: asset?.category || "",
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
