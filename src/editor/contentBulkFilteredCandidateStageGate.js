export const CONTENT_BULK_FILTERED_CANDIDATE_STAGE_GATE_VERSION = "content-bulk-filtered-candidate-stage-gate-v1";

export function createFilteredCandidateStageGate(contractReview = {}, row = {}) {
  const blockingIssueCodes = normalizedList(row.blockingIssueCodes);
  const warningIssueCodes = normalizedList(row.warningIssueCodes);
  const blocked = contractReview.blocked === true || blockingIssueCodes.length > 0;
  const review = !blocked && (contractReview.warning === true || warningIssueCodes.length > 0);
  const readyForStage = contractReview.readyForStage === true && !blocked;
  const staged = contractReview.staged === true;
  const status = blocked
    ? "blocked"
    : review
      ? "review"
      : readyForStage
        ? "ready"
        : "not-staged";
  return {
    version: CONTENT_BULK_FILTERED_CANDIDATE_STAGE_GATE_VERSION,
    status,
    staged,
    readyForStage,
    blocked,
    review,
    requiresExplicitApply: true,
    writesGameData: false,
    reasonCodes: stageGateReasonCodes(status, {
      blockingIssueCodes,
      warningIssueCodes,
      staged,
    }),
  };
}

export function createContentBulkFilteredCandidateStageGateSummary(rows = []) {
  return rows.reduce((summary, row) => {
    const status = row.stageGate?.status || "not-staged";
    if (status === "ready") summary.readyCount += 1;
    else if (status === "blocked") summary.blockedCount += 1;
    else if (status === "review") summary.reviewCount += 1;
    else summary.notStagedCount += 1;
    return summary;
  }, {
    readyCount: 0,
    blockedCount: 0,
    reviewCount: 0,
    notStagedCount: 0,
  });
}

export function createContentBulkFilteredCandidateStageGateCountsFromPreview(filteredCandidatePreview = {}) {
  const summary = filteredCandidatePreview.summary || {};
  return {
    ready: Number(summary.stageGateReadyRowCount || 0),
    review: Number(summary.stageGateReviewRowCount || 0),
    blocked: Number(summary.stageGateBlockedRowCount || 0),
    notStaged: Number(summary.stageGateNotStagedRowCount || 0),
  };
}

export function createContentBulkFilteredCandidateStageGateReasonCodesFromPreview(filteredCandidatePreview = {}) {
  const rows = Array.isArray(filteredCandidatePreview.visibleRows) ? filteredCandidatePreview.visibleRows : [];
  return Array.from(new Set(rows.flatMap((row) => row.stageGate?.reasonCodes || []).filter(Boolean)));
}

function stageGateReasonCodes(status, { blockingIssueCodes = [], warningIssueCodes = [], staged = false } = {}) {
  if (status === "blocked") return blockingIssueCodes.length ? blockingIssueCodes : ["contract-blocked"];
  if (status === "review") return warningIssueCodes.length ? warningIssueCodes : ["contract-warning"];
  if (status === "not-staged") return [staged ? "stage-gate-pending" : "not-staged"];
  return ["ready"];
}

function normalizedList(value) {
  return []
    .concat(value || [])
    .map((entry) => String(entry || "").trim())
    .filter(Boolean);
}
