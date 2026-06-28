import { TUTORIAL_MONSTER_POOL_DATA, TUTORIAL_MONSTER_POOL_REGIONS, TUTORIAL_MONSTER_POOL_VERSION, candidateMonsterRewardLinkFor } from "../balance/monsterCandidatePool.js?v=508";
import { lootItems } from "../data/itemData.js?v=508";
import { monsters, regions } from "../data/worldData.js?v=508";
import { getLocaleText } from "../localization/index.js?v=508";

const DATA_TEXT = getLocaleText().data || {};
const MONSTER_NAMES = DATA_TEXT.monsters || {};

export function createMonsterCandidateRewardPreview() {
  const liveMonsterById = new Map(monsters.map((monster) => [monster.id, monster]));
  const candidateById = new Map(TUTORIAL_MONSTER_POOL_DATA.map((monster) => [monster.id, monster]));
  const regionById = new Map(regions.map((region) => [region.id, region]));
  const itemById = new Map(lootItems.map((item) => [item.id, item]));
  const unresolvedItemIds = new Set();

  const groups = TUTORIAL_MONSTER_POOL_REGIONS.map((pool) => {
    const region = regionById.get(pool.regionId);
    const rows = pool.monsterIds
      .map((monsterId) => candidateById.get(monsterId))
      .filter(Boolean)
      .map((candidate) => createCandidateRewardRow(candidate, pool, region, liveMonsterById, itemById, unresolvedItemIds));

    return {
      regionId: pool.regionId,
      regionName: region?.name || pool.regionId,
      representativeMonsterId: pool.representativeMonsterId,
      representativeMonsterName: monsterName(pool.representativeMonsterId),
      liveCount: rows.filter((row) => row.isLive).length,
      pendingCount: rows.filter((row) => !row.isLive).length,
      rows,
    };
  });

  const rows = groups.flatMap((group) => group.rows);
  const uniqueCodexItems = new Set(rows.map((row) => row.codexFragment?.id).filter(Boolean));
  const uniqueMaterialItems = new Set(rows.flatMap((row) => row.materialItems.map((item) => item.id)).filter(Boolean));
  const uniqueSkillItems = new Set(rows.flatMap((row) => row.skillItems.map((item) => item.id)).filter(Boolean));
  const uniqueSkillRunes = new Set(rows.flatMap((row) => row.skillItems.filter((item) => item.type === "skill_rune").map((item) => item.id)));
  const uniqueSkillFragments = new Set(rows.flatMap((row) => row.skillItems.filter((item) => item.type === "skill_fragment").map((item) => item.id)));

  return {
    version: TUTORIAL_MONSTER_POOL_VERSION,
    summary: {
      groupCount: groups.length,
      candidateCount: rows.length,
      liveCandidateCount: rows.filter((row) => row.isLive).length,
      pendingCandidateCount: rows.filter((row) => !row.isLive).length,
      codexFragmentCount: uniqueCodexItems.size,
      materialItemCount: uniqueMaterialItems.size,
      skillItemCount: uniqueSkillItems.size,
      skillFragmentCount: uniqueSkillFragments.size,
      skillRuneCount: uniqueSkillRunes.size,
      unresolvedItemCount: unresolvedItemIds.size,
    },
    unresolvedItemIds: [...unresolvedItemIds],
    groups,
    rows,
  };
}

function createCandidateRewardRow(candidate, pool, region, liveMonsterById, itemById, unresolvedItemIds) {
  const link = candidateMonsterRewardLinkFor(candidate.id);
  const liveMonster = liveMonsterById.get(candidate.id) || null;
  const liveDropItemIds = new Set((liveMonster?.dropTable || []).map((drop) => drop.itemId));
  const codexFragment = resolveRewardItem(link?.codexFragmentId, itemById, unresolvedItemIds);
  const materialItems = (link?.materialItemIds || []).map((itemId) => resolveRewardItem(itemId, itemById, unresolvedItemIds));
  const skillItems = (link?.skillItemIds || []).map((itemId) => resolveRewardItem(itemId, itemById, unresolvedItemIds));

  return {
    id: candidate.id,
    name: monsterName(candidate.id),
    regionId: candidate.regionId,
    regionName: region?.name || candidate.regionId,
    level: candidate.level,
    tags: candidate.tags || [],
    isLive: Boolean(liveMonster),
    isRepresentative: candidate.id === pool.representativeMonsterId,
    isBoss: Boolean(candidate.isBoss),
    sourceMonsterId: candidate.representativeMonsterId,
    sourceMonsterName: monsterName(candidate.representativeMonsterId),
    codexFragment,
    materialItems,
    skillItems,
    liveDropCoverage: {
      codex: Boolean(codexFragment?.id && liveDropItemIds.has(codexFragment.id)),
      materialCount: materialItems.filter((item) => liveDropItemIds.has(item.id)).length,
      skillCount: skillItems.filter((item) => liveDropItemIds.has(item.id)).length,
    },
  };
}

function resolveRewardItem(itemId, itemById, unresolvedItemIds) {
  if (!itemId) return null;
  const item = itemById.get(itemId);
  if (item) {
    return {
      id: item.id,
      name: item.name || item.id,
      type: item.type || "unknown",
      typeLabel: item.typeLabel || item.type || "unknown",
      recordTarget: Number.isFinite(item.recordTarget) ? item.recordTarget : null,
    };
  }
  unresolvedItemIds.add(itemId);
  return {
    id: itemId,
    name: itemId,
    type: "missing",
    typeLabel: "missing",
  };
}

function monsterName(monsterId) {
  return MONSTER_NAMES[monsterId] || monsterId;
}



