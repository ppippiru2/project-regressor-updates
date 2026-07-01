export const BALANCE_FILTER_SCOPES = Object.freeze(["all", "engine-balance", "content-balance"]);

export function normalizeBalanceSearchQuery(value) {
  return String(value || "").trim().toLowerCase();
}

export function normalizeBalanceScope(value) {
  return BALANCE_FILTER_SCOPES.includes(value) ? value : "all";
}

export function normalizeBalanceCandidateGroups(value, groups = []) {
  if (!Array.isArray(value)) return [];
  const knownGroupIds = new Set(
    (groups || [])
      .map((group) => group?.id)
      .filter((id) => typeof id === "string" && id),
  );
  return value.filter((groupId) => {
    if (typeof groupId !== "string" || !groupId) return false;
    return knownGroupIds.size ? knownGroupIds.has(groupId) : true;
  });
}

export function matchesBalanceDetailFilter(filter = {}, group = {}, groups = []) {
  const scope = normalizeBalanceScope(filter?.scope);
  const query = normalizeBalanceSearchQuery(filter?.query);
  const candidateGroups = normalizeBalanceCandidateGroups(filter?.candidateGroups, groups);
  if (scope !== "all" && group.scope !== scope) return false;
  if (candidateGroups.length && !candidateGroups.includes(group.id)) return false;
  return !query || balanceGroupSearchText(group).includes(query);
}

export function balanceGroupSearchText(group = {}) {
  return [
    group.id,
    group.scope,
    ...(group.files || []),
    ...(group.exports || []),
    ...(group.affects || []),
  ].join(" ").toLowerCase();
}

export function findBalanceTuningCandidate(candidateId, candidates = []) {
  return (candidates || []).find((candidate) => candidate?.id === candidateId) || null;
}

export function selectedBalanceTuningCandidate(filter = {}, candidates = []) {
  return findBalanceTuningCandidate(filter?.candidateId, candidates);
}

export function createBalanceCandidateFilter(candidate = {}, groups = []) {
  return {
    scope: "all",
    query: "",
    candidateId: candidate.id || "",
    candidateLabel: candidate.label || candidate.id || "",
    candidateGroups: normalizeBalanceCandidateGroups(candidate.groups, groups),
  };
}
