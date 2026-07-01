import {
  renderActiveBalanceCandidateSummary,
  renderBalanceDomainSummaries,
  renderBalanceTuningCandidates,
} from "./balanceCandidateSummaryView.js?v=676";

export function createActiveBalanceCandidateSummaryRenderer() {
  return function renderActiveBalanceCandidateSummarySection(
    detailText = {},
    relatedChecks = [],
    candidates = [],
    visibleGroups = [],
    options = {},
  ) {
    return renderActiveBalanceCandidateSummary(detailText, relatedChecks, candidates, visibleGroups, options);
  };
}

export function createBalanceDomainSummariesRenderer() {
  return function renderBalanceDomainSummariesSection(domains = [], detailText = {}, relatedChecks = [], options = {}) {
    return renderBalanceDomainSummaries(domains, detailText, relatedChecks, options);
  };
}

export function createBalanceTuningCandidatesRenderer() {
  return function renderBalanceTuningCandidatesSection(candidates = [], detailText = {}, relatedChecks = [], options = {}) {
    return renderBalanceTuningCandidates(candidates, detailText, relatedChecks, options);
  };
}
