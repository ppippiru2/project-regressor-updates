import { createMonsterCandidateRewardPreview } from "./monsterCandidateRewardPreview.js?v=534";

export const MONSTER_CANDIDATE_PROMOTION_CHECKLIST_VERSION = "monster-candidate-promotion-checklist-v1";

export const MONSTER_CANDIDATE_PROMOTION_ACTIONS = Object.freeze([
  {
    id: "add-monster-balance-row",
    file: "src/balance/monsterBalanceData.js",
    guard: "monster-stats-and-reward-values",
  },
  {
    id: "choose-region-role",
    file: "src/data/worldData.js",
    guard: "representative-alternate-boss-role",
  },
  {
    id: "wire-drop-table",
    file: "src/balance/monsterBalanceData.js",
    guard: "codex-material-skill-drop-coverage",
  },
  {
    id: "check-codex-progress",
    file: "src/state/codexProgress.js",
    guard: "read-only-codex-progress-visibility",
  },
  {
    id: "run-balance-checks",
    file: "build-scripts/check-monster-candidate-pool.mjs",
    guard: "quick-check-and-pacing-guard",
  },
]);

export function createMonsterCandidatePromotionChecklist(preview = createMonsterCandidateRewardPreview()) {
  const actionIds = MONSTER_CANDIDATE_PROMOTION_ACTIONS.map((action) => action.id);
  const groups = (preview.groups || [])
    .map((group) => {
      const rows = (group.rows || [])
        .filter((row) => !row.isLive)
        .map((row) => createPromotionRow(row, actionIds));
      return {
        regionId: group.regionId,
        regionName: group.regionName,
        representativeMonsterId: group.representativeMonsterId,
        representativeMonsterName: group.representativeMonsterName,
        pendingCount: rows.length,
        readyReviewCount: rows.filter((row) => row.readyForReview).length,
        rows,
      };
    })
    .filter((group) => group.rows.length > 0);
  const rows = groups.flatMap((group) => group.rows);
  const uniqueCodexItems = new Set(rows.map((row) => row.codexFragmentId).filter(Boolean));
  const uniqueMaterialItems = new Set(rows.flatMap((row) => row.materialItemIds));
  const uniqueSkillItems = new Set(rows.flatMap((row) => row.skillItemIds));
  const uniqueRewardItems = new Set(rows.flatMap((row) => row.rewardItemIds));
  const codexRecordTargets = rows.filter((row) => row.codexRecord?.state === "read-only-target");
  const riskSignalIds = new Set(rows.flatMap((row) => row.riskSignalIds));
  const fullRewardLinkRows = rows.filter((row) => row.promotionStageId === "complete-reward-link");
  const partialRewardLinkRows = rows.filter((row) => row.promotionStageId === "needs-material-link" || row.promotionStageId === "needs-skill-link");

  return {
    version: MONSTER_CANDIDATE_PROMOTION_CHECKLIST_VERSION,
    sourceVersion: preview.version,
    writesGameData: false,
    summary: {
      groupCount: groups.length,
      pendingCandidateCount: rows.length,
      readyReviewCount: rows.filter((row) => row.readyForReview).length,
      blockedReviewCount: rows.filter((row) => !row.readyForReview).length,
      requiredActionCount: MONSTER_CANDIDATE_PROMOTION_ACTIONS.length,
      uniqueRewardItemCount: uniqueRewardItems.size,
      codexFragmentCount: uniqueCodexItems.size,
      codexRecordTargetCount: codexRecordTargets.length,
      materialLinkCount: uniqueMaterialItems.size,
      skillLinkCount: uniqueSkillItems.size,
      riskSignalCount: riskSignalIds.size,
      fullRewardLinkCount: fullRewardLinkRows.length,
      partialRewardLinkCount: partialRewardLinkRows.length,
    },
    requiredActions: MONSTER_CANDIDATE_PROMOTION_ACTIONS,
    groups,
    rows,
  };
}

function createPromotionRow(row, actionIds) {
  const materialItemIds = (row.materialItems || []).map((item) => item.id).filter(Boolean);
  const skillItemIds = (row.skillItems || []).map((item) => item.id).filter(Boolean);
  const rewardItemIds = [
    row.codexFragment?.id,
    ...materialItemIds,
    ...skillItemIds,
  ].filter(Boolean);
  const codexRecord = row.codexFragment?.id
    ? {
        itemId: row.codexFragment.id,
        itemName: row.codexFragment.name || row.codexFragment.id,
        target: Math.max(1, Number(row.codexFragment.recordTarget) || 5),
        state: "read-only-target",
      }
    : null;
  const riskSignalIds = [
    row.codexFragment?.id ? "" : "missing-codex-fragment",
    materialItemIds.length ? "" : "no-material-link",
    skillItemIds.length ? "" : "no-skill-link",
    row.isBoss ? "boss-role-review" : "",
  ].filter(Boolean);
  const blockingSignals = riskSignalIds.filter((signal) => signal === "missing-codex-fragment");
  const rewardCoverage = {
    codex: Boolean(row.codexFragment?.id),
    material: materialItemIds.length > 0,
    skill: skillItemIds.length > 0,
  };
  const promotionStageId = promotionStageForRewardCoverage(rewardCoverage);

  return {
    id: row.id,
    name: row.name,
    regionId: row.regionId,
    regionName: row.regionName,
    level: row.level,
    sourceMonsterId: row.sourceMonsterId,
    sourceMonsterName: row.sourceMonsterName,
    isBoss: row.isBoss,
    isRepresentative: row.isRepresentative,
    codexFragmentId: row.codexFragment?.id || "",
    codexRecord,
    materialItemIds,
    skillItemIds,
    rewardItemIds,
    rewardItemCount: rewardItemIds.length,
    rewardCoverage,
    promotionStageId,
    requiredActionIds: actionIds,
    riskSignalIds,
    readyForReview: blockingSignals.length === 0,
  };
}

function promotionStageForRewardCoverage(coverage) {
  if (!coverage.codex) return "blocked-codex-link";
  if (!coverage.material) return "needs-material-link";
  if (!coverage.skill) return "needs-skill-link";
  return "complete-reward-link";
}



