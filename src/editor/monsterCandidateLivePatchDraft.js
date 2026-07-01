import { MONSTER_BALANCE_DATA } from "../balance/monsterBalanceData.js?v=681";
import {
  candidateMonsterRewardLinkFor,
  TUTORIAL_MONSTER_POOL_DATA,
} from "../balance/monsterCandidatePool.js?v=681";
import { lootItems } from "../data/itemData.js?v=681";
import { regions } from "../data/worldData.js?v=681";
import { createMonsterCandidateLivePromotionPlan } from "./monsterCandidateLivePromotionPlan.js?v=681";

export const MONSTER_CANDIDATE_LIVE_PATCH_DRAFT_VERSION = "monster-candidate-live-patch-draft-v1";

export const MONSTER_CANDIDATE_LIVE_PATCH_DRAFT_TARGET_FILES = Object.freeze([
  "src/balance/monsterBalanceData.js",
  "src/data/worldData.js",
]);

export function createMonsterCandidateLivePatchDraft(plan = createMonsterCandidateLivePromotionPlan()) {
  const targetPhase = (plan.phases || []).find((phase) => (phase.rows || []).length > 0) || null;
  const candidateRows = targetPhase?.rows || [];
  const rows = candidateRows.map(createPatchDraftRow).filter(Boolean);

  return {
    version: MONSTER_CANDIDATE_LIVE_PATCH_DRAFT_VERSION,
    sourceVersion: plan.version,
    writesGameData: false,
    summary: {
      draftCount: rows.length,
      targetPhaseId: targetPhase?.id || "",
      targetRegionCount: new Set(rows.map((row) => row.regionId)).size,
      targetFileCount: MONSTER_CANDIDATE_LIVE_PATCH_DRAFT_TARGET_FILES.length,
      blockingSignalCount: rows.reduce((sum, row) => sum + row.blockingSignalIds.length, 0),
    },
    rows,
  };
}

function createPatchDraftRow(row) {
  const candidate = TUTORIAL_MONSTER_POOL_DATA.find((monster) => monster.id === row.id);
  const sourceMonster = MONSTER_BALANCE_DATA.find((monster) => monster.id === row.sourceMonsterId);
  const liveRegion = regions.find((region) => region.id === row.regionId);
  const rewardLink = candidateMonsterRewardLinkFor(row.id);
  if (!candidate || !sourceMonster || !liveRegion || !rewardLink) return null;
  const dropTable = createSuggestedDropTable(rewardLink, sourceMonster);
  const blockingSignalIds = patchDraftBlockingSignals({ row, candidate, sourceMonster, liveRegion, rewardLink, dropTable });

  return {
    id: row.id,
    name: row.name,
    regionId: row.regionId,
    regionName: row.regionName,
    sourceMonsterId: row.sourceMonsterId,
    sourceMonsterName: row.sourceMonsterName,
    planState: blockingSignalIds.length ? "draft-blocked" : "draft-ready",
    targetFiles: MONSTER_CANDIDATE_LIVE_PATCH_DRAFT_TARGET_FILES,
    monsterBalanceEntry: {
      id: candidate.id,
      regionId: candidate.regionId,
      level: candidate.level,
      stats: candidate.stats,
      exp: scaleReward(sourceMonster.exp, sourceMonster.level, candidate.level, 0.35),
      gold: scaleReward(sourceMonster.gold, sourceMonster.level, candidate.level, 0.25),
      dropTable,
    },
    worldDataPatch: {
      action: "add-alternate-encounter-pool",
      regionId: liveRegion.id,
      keepsRepresentativeMonsterId: liveRegion.monsterId,
      targetField: "regions[].monsterPool",
      proposedMonsterPool: proposedMonsterPoolFor(liveRegion, candidate.id),
    },
    rewardLink: {
      codexFragmentId: rewardLink.codexFragmentId,
      materialItemIds: rewardLink.materialItemIds || [],
      skillItemIds: rewardLink.skillItemIds || [],
    },
    blockingSignalIds,
  };
}

function proposedMonsterPoolFor(region, candidateId) {
  return [...new Set([
    region?.monsterId,
    ...(Array.isArray(region?.monsterPool) ? region.monsterPool : []),
    candidateId,
  ].filter((monsterId) => typeof monsterId === "string" && monsterId))];
}

function createSuggestedDropTable(rewardLink, sourceMonster) {
  const sourceDrops = sourceMonster.dropTable || [];
  const sourceCodexChance = sourceDrops.find((drop) => drop.itemId.endsWith("_codex_fragment"))?.chance || 0.1;
  const entries = [
    { itemId: rewardLink.codexFragmentId, chance: clampChance(sourceCodexChance * 0.85, 0.06, 0.12) },
  ];
  for (const itemId of rewardLink.materialItemIds || []) {
    const sourceChance = sourceDrops.find((drop) => drop.itemId === itemId)?.chance || 0.045;
    entries.push({ itemId, chance: clampChance(sourceChance * 0.9, 0.03, 0.08) });
  }
  for (const itemId of rewardLink.skillItemIds || []) {
    entries.push({ itemId, chance: clampChance(0.025, 0.015, 0.04) });
  }
  return entries;
}

function patchDraftBlockingSignals({ row, candidate, sourceMonster, liveRegion, rewardLink, dropTable }) {
  const liveIds = new Set(MONSTER_BALANCE_DATA.map((monster) => monster.id));
  const lootItemIds = new Set(lootItems.map((item) => item.id));
  return [
    liveIds.has(candidate.id) ? "monster-already-live" : "",
    candidate.regionId !== row.regionId ? "candidate-region-mismatch" : "",
    sourceMonster.regionId !== row.regionId ? "source-region-mismatch" : "",
    liveRegion.monsterId !== row.sourceMonsterId ? "representative-mismatch" : "",
    rewardLink.codexFragmentId && lootItemIds.has(rewardLink.codexFragmentId) ? "" : "missing-codex-item",
    dropTable.every((drop) => lootItemIds.has(drop.itemId)) ? "" : "missing-drop-item",
  ].filter(Boolean);
}

function scaleReward(value, sourceLevel, candidateLevel, weight) {
  const levelDelta = Math.max(0, Number(candidateLevel || 0) - Number(sourceLevel || 0));
  return Math.max(1, Math.round(Number(value || 0) * (1 + levelDelta * weight)));
}

function clampChance(value, min, max) {
  return Number(Math.min(max, Math.max(min, value)).toFixed(3));
}
