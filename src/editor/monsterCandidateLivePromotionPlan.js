import { createMonsterCandidatePromotionChecklist } from "./monsterCandidatePromotionChecklist.js?v=462";
import { createMonsterCandidateRewardPreview } from "./monsterCandidateRewardPreview.js?v=462";

export const MONSTER_CANDIDATE_LIVE_PROMOTION_PLAN_VERSION = "monster-candidate-live-promotion-plan-v1";

export const MONSTER_CANDIDATE_LIVE_PROMOTION_TARGET_FILES = Object.freeze([
  "src/balance/monsterBalanceData.js",
  "src/data/worldData.js",
]);

export const MONSTER_CANDIDATE_LIVE_PROMOTION_PHASES = Object.freeze([
  {
    id: "phase-1-shore-first",
    order: 1,
    regionIds: ["tutorial_shore"],
    priority: "low-risk-first-region",
  },
  {
    id: "phase-2-forest-ruins",
    order: 2,
    regionIds: ["tutorial_forest", "broken_ruins"],
    priority: "early-mid-region-alternates",
  },
  {
    id: "phase-3-mana-mine",
    order: 3,
    regionIds: ["mana_mine"],
    priority: "economy-material-check",
  },
  {
    id: "phase-4-rift-gate",
    order: 4,
    regionIds: ["rift_gate"],
    priority: "late-region-role-review",
  },
]);

export function createMonsterCandidateLivePromotionPlan(
  checklist = createMonsterCandidatePromotionChecklist(createMonsterCandidateRewardPreview())
) {
  const rows = (checklist.rows || []).filter((row) => row.promotionStageId === "complete-reward-link");
  const deferredRows = (checklist.rows || []).filter((row) => row.promotionStageId !== "complete-reward-link");
  const phases = MONSTER_CANDIDATE_LIVE_PROMOTION_PHASES
    .map((phase) => createLivePromotionPhase(phase, rows))
    .filter((phase) => phase.rows.length > 0);
  const regionIds = new Set(rows.map((row) => row.regionId).filter(Boolean));

  return {
    version: MONSTER_CANDIDATE_LIVE_PROMOTION_PLAN_VERSION,
    sourceVersion: checklist.version,
    writesGameData: false,
    summary: {
      candidateCount: rows.length,
      phaseCount: phases.length,
      regionCount: regionIds.size,
      deferredCandidateCount: deferredRows.length,
      targetFileCount: MONSTER_CANDIDATE_LIVE_PROMOTION_TARGET_FILES.length,
    },
    phases,
    rows: phases.flatMap((phase) => phase.rows),
    deferredRows: deferredRows.map(createDeferredLivePromotionRow),
  };
}

function createLivePromotionPhase(phase, rows) {
  const regionIds = new Set(phase.regionIds || []);
  const phaseRows = rows
    .filter((row) => regionIds.has(row.regionId))
    .sort(sortLivePromotionRows)
    .map((row) => createLivePromotionRow(row, phase));
  return {
    id: phase.id,
    order: phase.order,
    priority: phase.priority,
    regionIds: phase.regionIds,
    candidateCount: phaseRows.length,
    rows: phaseRows,
  };
}

function createLivePromotionRow(row, phase) {
  return {
    id: row.id,
    name: row.name,
    regionId: row.regionId,
    regionName: row.regionName,
    level: row.level,
    sourceMonsterId: row.sourceMonsterId,
    sourceMonsterName: row.sourceMonsterName,
    phaseId: phase.id,
    phaseOrder: phase.order,
    planState: "ready-for-live-data-plan",
    promotionStageId: row.promotionStageId,
    codexFragmentId: row.codexFragmentId,
    materialItemIds: row.materialItemIds || [],
    skillItemIds: row.skillItemIds || [],
    rewardItemIds: row.rewardItemIds || [],
    targetFiles: MONSTER_CANDIDATE_LIVE_PROMOTION_TARGET_FILES,
    nextActionIds: (row.requiredActionIds || []).filter((actionId) => actionId !== "check-codex-progress"),
  };
}

function createDeferredLivePromotionRow(row) {
  return {
    id: row.id,
    name: row.name,
    regionId: row.regionId,
    regionName: row.regionName,
    level: row.level,
    sourceMonsterId: row.sourceMonsterId,
    sourceMonsterName: row.sourceMonsterName,
    planState: "deferred-reward-link",
    promotionStageId: row.promotionStageId,
    codexFragmentId: row.codexFragmentId,
    materialItemIds: row.materialItemIds || [],
    skillItemIds: row.skillItemIds || [],
    rewardItemIds: row.rewardItemIds || [],
    missingRewardTypes: missingRewardTypesFor(row),
  };
}

function missingRewardTypesFor(row) {
  const missing = [];
  if (!row.rewardCoverage?.codex) missing.push("codex");
  if (!row.rewardCoverage?.material) missing.push("material");
  if (!row.rewardCoverage?.skill) missing.push("skill");
  return missing;
}

function sortLivePromotionRows(left, right) {
  const levelDiff = Number(left.level || 0) - Number(right.level || 0);
  if (levelDiff) return levelDiff;
  return String(left.id || "").localeCompare(String(right.id || ""));
}

