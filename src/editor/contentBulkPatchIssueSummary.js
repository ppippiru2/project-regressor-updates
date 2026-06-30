export const CONTENT_BULK_PATCH_ISSUE_SUMMARY_VERSION = "content-bulk-patch-issue-summary-v1";

export function createContentBulkPatchReviewIssueSummary({ blockedReasons = [], reviewItems = [] } = {}) {
  const blockingIssueCodes = new Set(uniqueStrings(blockedReasons));
  const warningIssueCodes = new Set();
  const affectedReviewItemCount = appendReviewItemIssues({
    reviewItems,
    blockingIssueCodes,
    warningIssueCodes,
  });

  return {
    blockingIssueCodes: [...blockingIssueCodes],
    warningIssueCodes: [...warningIssueCodes],
    affectedReviewItemCount,
  };
}

export function createContentBulkPatchFileIssueSummary({
  blockedReasons = [],
  fileItems = [],
  blockerCodeKey = "reviewBlockerCodes",
  preApplyReviewItems = [],
} = {}) {
  const blockingIssueCodes = new Set(uniqueStrings(blockedReasons));
  const warningIssueCodes = new Set();
  const affectedDomainIds = new Set();
  let affectedFileCount = 0;

  for (const file of Array.isArray(fileItems) ? fileItems : []) {
    const blockers = uniqueStrings(file?.[blockerCodeKey]);
    if (!blockers.length) continue;
    affectedFileCount += 1;
    for (const code of blockers) blockingIssueCodes.add(code);
    for (const domainId of uniqueStrings(file.domainIds)) affectedDomainIds.add(domainId);
  }

  const affectedReviewItemCount = appendReviewItemIssues({
    reviewItems: preApplyReviewItems,
    blockingIssueCodes,
    warningIssueCodes,
  });

  return {
    blockingIssueCodes: [...blockingIssueCodes],
    warningIssueCodes: [...warningIssueCodes],
    affectedDomainCount: affectedDomainIds.size,
    affectedRowCount: affectedFileCount,
    affectedFileCount,
    affectedReviewItemCount,
  };
}

export function createContentBulkPatchValidationIssueSummary(issues = []) {
  const blockingIssueCodes = new Set();
  const warningIssueCodes = new Set();
  const affectedDomains = new Set();
  const affectedRows = new Set();

  for (const issue of Array.isArray(issues) ? issues : []) {
    if (!issue?.code) continue;
    if (issue.severity === "error") blockingIssueCodes.add(issue.code);
    if (issue.severity === "warning") warningIssueCodes.add(issue.code);
    if (issue.domainId) affectedDomains.add(issue.domainId);
    if (issue.domainId && Number.isFinite(Number(issue.rowIndex))) affectedRows.add(`${issue.domainId}:${issue.rowIndex}`);
  }

  return {
    blockingIssueCodes: [...blockingIssueCodes],
    warningIssueCodes: [...warningIssueCodes],
    affectedDomainCount: affectedDomains.size,
    affectedRowCount: affectedRows.size,
  };
}

export function createContentBulkPatchRowIssueSummary(domains = []) {
  const blockingIssueCodes = new Set();
  const warningIssueCodes = new Set();
  const affectedDomains = new Set();
  const affectedRows = new Set();

  for (const domain of Array.isArray(domains) ? domains : []) {
    for (const row of domain.rows || []) {
      const rowBlocking = uniqueStrings(row.blockingIssueCodes);
      const rowWarnings = uniqueStrings(row.warningIssueCodes);
      for (const code of rowBlocking) blockingIssueCodes.add(code);
      for (const code of rowWarnings) warningIssueCodes.add(code);
      if (rowBlocking.length || rowWarnings.length) {
        affectedDomains.add(domain.id);
        affectedRows.add(`${domain.id}:${row.rowIndex}`);
      }
    }
  }

  return {
    blockingIssueCodes: [...blockingIssueCodes],
    warningIssueCodes: [...warningIssueCodes],
    affectedDomainCount: affectedDomains.size,
    affectedRowCount: affectedRows.size,
  };
}

function appendReviewItemIssues({ reviewItems = [], blockingIssueCodes, warningIssueCodes } = {}) {
  let affectedReviewItemCount = 0;
  for (const item of Array.isArray(reviewItems) ? reviewItems : []) {
    if (item.state === "blocked") {
      blockingIssueCodes.add(item.id);
      affectedReviewItemCount += 1;
    }
    if (item.state === "review") {
      warningIssueCodes.add(item.id);
      affectedReviewItemCount += 1;
    }
  }
  return affectedReviewItemCount;
}

function uniqueStrings(values = []) {
  return Array.from(new Set((Array.isArray(values) ? values : []).map((value) => String(value || "").trim()).filter(Boolean)));
}
