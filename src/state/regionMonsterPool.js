export const REGION_MONSTER_POOL_SELECTION_VERSION = "region-monster-pool-runtime-v1";

export function normalizeRegionMonsterPool(region) {
  const ids = [];
  addMonsterId(ids, region?.monsterId);
  if (Array.isArray(region?.monsterPool)) {
    for (const monsterId of region.monsterPool) addMonsterId(ids, monsterId);
  }
  return ids;
}

export function selectRegionMonsterId(region, options = {}) {
  const pool = normalizeRegionMonsterPool(region);
  if (!pool.length) return "";
  if (options.mode === "representative") return pool[0];
  const seed = normalizeSeed(options.seed);
  return pool[seed % pool.length] || pool[0];
}

export function resolveRegionMonster(region, getMonster, options = {}) {
  const pool = normalizeRegionMonsterPool(region);
  const validPoolIds = pool.filter((monsterId) => Boolean(getMonster?.(monsterId)));
  const selectedId = selectRegionMonsterId(region, options);
  const selectedMonster = selectedId ? getMonster?.(selectedId) : null;
  const fallbackId = validPoolIds[0] || "";
  const monsterId = selectedMonster ? selectedId : fallbackId;

  return {
    monsterId,
    monster: monsterId ? getMonster?.(monsterId) || null : null,
    pool,
    validPoolIds,
    representativeMonsterId: pool[0] || "",
    usesAlternatePool: pool.length > 1,
  };
}

export function regionMonsterEncounterSeed(state, regionId) {
  const value = state?.regionEncounterCounts?.[regionId];
  return normalizeSeed(value);
}

export function advanceRegionMonsterEncounter(state, region) {
  if (!state || !region?.id) return 0;
  const pool = normalizeRegionMonsterPool(region);
  if (pool.length <= 1) return regionMonsterEncounterSeed(state, region.id);
  const current = regionMonsterEncounterSeed(state, region.id);
  state.regionEncounterCounts = {
    ...(state.regionEncounterCounts || {}),
    [region.id]: current + 1,
  };
  return current + 1;
}

export function normalizeRegionEncounterCounts(savedCounts = {}) {
  const source = savedCounts && typeof savedCounts === "object" && !Array.isArray(savedCounts)
    ? savedCounts
    : {};
  return Object.fromEntries(
    Object.entries(source)
      .filter(([regionId]) => typeof regionId === "string" && regionId)
      .map(([regionId, value]) => [regionId, normalizeSeed(value)])
  );
}

function addMonsterId(ids, monsterId) {
  if (typeof monsterId !== "string" || !monsterId) return;
  if (ids.includes(monsterId)) return;
  ids.push(monsterId);
}

function normalizeSeed(value) {
  const number = Number(value);
  if (!Number.isFinite(number) || number <= 0) return 0;
  return Math.floor(number);
}
