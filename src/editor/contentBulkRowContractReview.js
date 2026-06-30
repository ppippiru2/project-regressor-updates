export const CONTENT_BULK_ROW_CONTRACT_REVIEW_VERSION = "content-bulk-row-contract-review-v1";

export function createContentBulkRowContractReview({
  domainId = "",
  state = "not-staged",
  targetSurface = "",
  targetSurfaceCount = 0,
  blockingIssueCodes = [],
  warningIssueCodes = [],
} = {}) {
  const normalizedState = state || "not-staged";
  const blockingIssues = uniqueStrings(blockingIssueCodes);
  const warningIssues = uniqueStrings(warningIssueCodes);
  return {
    version: CONTENT_BULK_ROW_CONTRACT_REVIEW_VERSION,
    domainId: domainId || "",
    state: normalizedState,
    targetSurface: targetSurface || "",
    targetSurfaceCount: Math.max(0, Number(targetSurfaceCount) || 0),
    blockingIssueCodes: blockingIssues,
    warningIssueCodes: warningIssues,
    staged: String(normalizedState).startsWith("staged-"),
    blocked: normalizedState === "withheld-blocked" || blockingIssues.length > 0,
    warning: warningIssues.length > 0,
    readyForStage: String(normalizedState).startsWith("staged-") && blockingIssues.length === 0,
  };
}

function uniqueStrings(values = []) {
  return Array.from(new Set((Array.isArray(values) ? values : []).map((value) => String(value || "")).filter(Boolean)));
}
