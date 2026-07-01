import {
  contentBulkStateBucket,
  matchesContentBulkFilterRow,
  normalizeContentBulkFilterDomain,
  normalizeContentBulkFilterState,
  normalizeContentBulkRowDomains,
  normalizeContentBulkSearchQuery,
} from "./contentBulkFilterModel.js?v=679";
import { createContentBulkRowContractReview } from "./contentBulkRowContractReview.js?v=679";
import {
  createContentBulkFilteredCandidateStageGateSummary,
  createFilteredCandidateStageGate,
} from "./contentBulkFilteredCandidateStageGate.js?v=679";

export const CONTENT_BULK_FILTERED_CANDIDATE_PREVIEW_VERSION = "content-bulk-filtered-candidate-preview-v1";

export function createContentBulkFilteredCandidatePreview({
  adapterPreview = {},
  lootSkillPreview = {},
  monsterRuntimePreview = {},
  runtimeVfxPreview = {},
  filter = {},
  limit = 12,
} = {}) {
  const rows = [
    ...createPackageMappingCandidates(adapterPreview),
    ...createLootSkillCandidates(lootSkillPreview),
    ...createMonsterRuntimeCandidates(monsterRuntimePreview),
    ...createRuntimeVfxCandidates(runtimeVfxPreview),
  ].map((candidate, index) => finalizeCandidate(candidate, index, filter));
  const visibleRows = rows.filter((row) => row.filterMatched);
  const limitedRows = visibleRows.slice(0, Math.max(0, Number(limit) || 0));
  const visibleBuckets = bucketCounts(visibleRows);
  const visibleContractReviewSummary = contractReviewSummary(visibleRows);
  const visibleStageGateSummary = createContentBulkFilteredCandidateStageGateSummary(visibleRows);
  return {
    version: CONTENT_BULK_FILTERED_CANDIDATE_PREVIEW_VERSION,
    writesGameData: false,
    requiresExplicitApply: true,
    activeFilter: {
      state: normalizeContentBulkFilterState(filter?.state),
      domain: normalizeContentBulkFilterDomain(filter?.domain),
      query: normalizeContentBulkSearchQuery(filter?.query),
    },
    summary: {
      totalRowCount: rows.length,
      visibleRowCount: visibleRows.length,
      shownRowCount: limitedRows.length,
      hiddenByLimitCount: Math.max(0, visibleRows.length - limitedRows.length),
      blockingRowCount: visibleRows.filter((row) => row.blockingIssueCodes.length > 0 || row.bucket === "blocked").length,
      warningRowCount: visibleRows.filter((row) => row.warningIssueCodes.length > 0 || row.bucket === "review").length,
      readyRowCount: visibleBuckets.ready,
      activeRowCount: visibleBuckets.active,
      emptyRowCount: visibleBuckets.empty,
      targetSurfaceCount: visibleRows.reduce((sum, row) => sum + Number(row.targetSurfaceCount || 0), 0),
      contractReadyRowCount: visibleContractReviewSummary.readyForStageCount,
      contractBlockedRowCount: visibleContractReviewSummary.blockedCount,
      contractWarningRowCount: visibleContractReviewSummary.warningCount,
      contractTargetSurfaceCount: visibleContractReviewSummary.targetSurfaceCount,
      stageGateReadyRowCount: visibleStageGateSummary.readyCount,
      stageGateBlockedRowCount: visibleStageGateSummary.blockedCount,
      stageGateReviewRowCount: visibleStageGateSummary.reviewCount,
      stageGateNotStagedRowCount: visibleStageGateSummary.notStagedCount,
      sourceCount: new Set(visibleRows.map((row) => row.source)).size,
      limit: Math.max(0, Number(limit) || 0),
    },
    rows,
    visibleRows,
    limitedRows,
  };
}

function createPackageMappingCandidates(adapterPreview = {}) {
  return (adapterPreview.mappings || []).map((mapping) => ({
    id: `package:${mapping.domainId || "unknown"}`,
    source: "package_adapter",
    sourceLabel: "package",
    title: mapping.domainId || "unknown",
    state: Number(mapping.rowCount || 0) > 0 ? "active" : "empty",
    domains: [mapping.domainId || ""],
    targetSurfaceCount: Number(mapping.rowCount || 0),
    summaryParts: [
      mapping.batchKey,
      `${Number(mapping.rowCount || 0)} rows`,
      ...(mapping.sourceKeys || []),
    ],
    values: mapping,
  }));
}

function createLootSkillCandidates(preview = {}) {
  return [
    ...(preview.lootRows || []).map((row) => ({
      id: `loot:${row.id || row.packageIdentity || "unknown"}`,
      source: "loot_item",
      sourceLabel: "loot",
      title: row.id || row.packageIdentity || "loot_item",
      state: row.intakeState || row.bulkState,
      domains: ["loot_item"],
      targetSurfaceCount: Number(row.targetSurfaceCount || 0),
      blockingIssueCodes: row.blockingIssueCodes,
      warningIssueCodes: row.warningIssueCodes,
      contractReview: row.contractReview,
      summaryParts: [
        row.type,
        row.rarity,
        row.bulkState,
        row.skillId,
        row.rewardLinked ? "reward-linked" : "reward-unlinked",
      ],
      values: row,
    })),
    ...(preview.skillRows || []).map((row) => ({
      id: `skill:${row.id || row.packageIdentity || "unknown"}`,
      source: "skill",
      sourceLabel: "skill",
      title: row.id || row.packageIdentity || "skill",
      state: row.bulkState,
      domains: ["skill"],
      targetSurfaceCount: Number(row.targetSurfaceCount || 0),
      blockingIssueCodes: row.blockingIssueCodes,
      warningIssueCodes: row.warningIssueCodes,
      contractReview: row.contractReview,
      summaryParts: [
        row.type,
        row.damageType,
        row.effectType,
        row.cooldown ? `cooldown:${row.cooldown}` : "",
      ],
      values: row,
    })),
  ];
}

function createMonsterRuntimeCandidates(preview = {}) {
  return (preview.rows || []).map((row) => ({
    id: `monster-runtime:${row.liveMonsterId || row.externalMonsterId || "unknown"}`,
    source: "monster_runtime",
    sourceLabel: "monster runtime",
    title: row.liveMonsterId || row.externalMonsterId || "monster",
    state: row.runtimeState || row.bulkState,
    domains: ["monster", "monster_runtime"],
    targetSurfaceCount: Number(row.targetSurfaceCount || 0),
    blockingIssueCodes: row.blockingIssueCodes,
    warningIssueCodes: row.warningIssueCodes,
    contractReview: row.contractReview,
    summaryParts: [
      row.externalMonsterId,
      row.packageRegionId,
      row.spriteStatus,
      row.bulkState,
      (row.missingSpriteFiles || []).length ? `missing:${(row.missingSpriteFiles || []).length}` : "",
    ],
    values: row,
  }));
}

function createRuntimeVfxCandidates(preview = {}) {
  return (preview.rows || []).map((row) => ({
    id: `runtime-vfx:${row.motionProfile || "unknown"}:${row.effectType || row.kind || "placement"}`,
    source: "runtime_vfx",
    sourceLabel: "runtime VFX",
    title: [row.motionProfile, row.effectType || row.kind].filter(Boolean).join(" / ") || "runtime_vfx",
    state: row.intakeState || row.bulkState,
    domains: ["runtime_vfx"],
    targetSurfaceCount: Number(row.targetSurfaceCount || 0),
    blockingIssueCodes: row.blockingIssueCodes,
    warningIssueCodes: row.warningIssueCodes,
    contractReview: row.contractReview,
    summaryParts: [
      row.kind,
      row.effectType,
      row.bulkState,
      row.sourceKey,
      row.targetSurface,
    ],
    values: row,
  }));
}

function finalizeCandidate(candidate = {}, index = 0, filter = {}) {
  const domains = normalizeContentBulkRowDomains(candidate.domains);
  const blockingIssueCodes = normalizedList(candidate.blockingIssueCodes);
  const warningIssueCodes = normalizedList(candidate.warningIssueCodes);
  const state = candidate.state || "empty";
  const summaryParts = normalizedList(candidate.summaryParts);
  const sourceReview = candidate.contractReview || candidate.values?.contractReview || null;
  const contractReview = sourceReview?.version
    ? sourceReview
    : createContentBulkRowContractReview({
        domainId: domains[0] || candidate.source || "",
        state,
        targetSurface: candidate.values?.targetSurface || candidate.source || "",
        targetSurfaceCount: candidate.targetSurfaceCount,
        blockingIssueCodes,
        warningIssueCodes,
      });
  const stageGate = createFilteredCandidateStageGate(contractReview, {
    blockingIssueCodes,
    warningIssueCodes,
  });
  const filterValues = [
    candidate.title,
    candidate.source,
    candidate.sourceLabel,
    state,
    domains,
    summaryParts,
    blockingIssueCodes,
    warningIssueCodes,
    candidate.values,
    contractReview,
    stageGate,
  ];
  return {
    ...candidate,
    id: candidate.id || `candidate:${index}`,
    domains,
    state,
    bucket: contentBulkStateBucket(state),
    blockingIssueCodes,
    warningIssueCodes,
    contractReview,
    stageGate,
    summaryParts,
    filterMatched: matchesContentBulkFilterRow(filter, state, filterValues, domains),
  };
}

function contractReviewSummary(rows = []) {
  const reviews = rows.map((row) => row.contractReview).filter((review) => review?.version);
  return {
    readyForStageCount: reviews.filter((review) => review.readyForStage).length,
    blockedCount: reviews.filter((review) => review.blocked).length,
    warningCount: reviews.filter((review) => review.warning).length,
    targetSurfaceCount: reviews.reduce((sum, review) => sum + Number(review.targetSurfaceCount || 0), 0),
  };
}

function bucketCounts(rows = []) {
  return rows.reduce((counts, row) => {
    counts[row.bucket] = Number(counts[row.bucket] || 0) + 1;
    return counts;
  }, {
    blocked: 0,
    review: 0,
    ready: 0,
    active: 0,
    empty: 0,
  });
}

function normalizedList(value) {
  return []
    .concat(value || [])
    .map((entry) => String(entry || "").trim())
    .filter(Boolean);
}
