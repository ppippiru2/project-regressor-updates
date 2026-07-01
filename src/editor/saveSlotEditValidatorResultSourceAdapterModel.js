export function createSaveSlotEditValidatorResultSourceAdapterPlanPreviewModel(options = {}) {
  const schema = options.schema || { resultShape: {}, blockedResultCount: 0 };
  const executable = options.executable || { blockers: [], version: "" };
  const comparator = options.comparator || { readyComparisonCount: 0, version: "" };
  const produced = options.produced || { adapter: { status: "not-connected" }, version: "" };
  const transition = options.transition || { payloadShape: { blockers: [] }, legacyBridgeVersion: "" };
  const candidates = [
    saveEditValidatorResultSourceAdapterCandidate(
      "legacy-result-schema",
      schema.resultShape.version,
      "blocked",
      schema.blockedResultCount > 0 ? "result-not-produced" : "legacy-result-schema-only",
    ),
    saveEditValidatorResultSourceAdapterCandidate(
      "executable-dry-run-results",
      executable.version,
      "blocked",
      executable.blockers[0] || "proposed-values-missing",
    ),
    saveEditValidatorResultSourceAdapterCandidate(
      "dry-run-sample-comparator",
      comparator.version,
      comparator.readyComparisonCount > 0 ? "ready" : "blocked",
      comparator.readyComparisonCount > 0 ? "" : "sample-comparison-missing",
    ),
    saveEditValidatorResultSourceAdapterCandidate(
      "produced-result-bridge-contract",
      produced.version,
      produced.adapter.status === "not-connected" ? "blocked" : "ready",
      produced.adapter.status === "not-connected" ? "adapter-not-connected" : "",
    ),
    saveEditValidatorResultSourceAdapterCandidate(
      "future-live-validator-output",
      "future-live-validator-output-v1",
      "blocked",
      "edit-input-missing",
    ),
  ];
  const blockers = Array.from(new Set([
    ...candidates.map((candidate) => candidate.blocker).filter(Boolean),
    ...transition.payloadShape.blockers,
    "source-selector-not-created",
  ]));
  return {
    status: "blocked",
    version: "save-edit-validator-result-source-adapter-plan-v1",
    mode: "read-only-preview",
    apply: "disabled",
    selectedSource: "none",
    candidateCount: candidates.length,
    readyCandidateCount: candidates.filter((candidate) => candidate.status === "ready").length,
    blockedCandidateCount: candidates.filter((candidate) => candidate.status === "blocked").length,
    adapter: {
      status: "not-connected",
      source: "none",
      target: transition.legacyBridgeVersion,
    },
    candidates,
    payloadShape: {
      version: "save-edit-validator-result-source-adapter-plan-v1",
      mode: "read-only-preview",
      transitionSource: transition.version,
      selectedSource: "none",
      adapter: "not-connected",
      legacyBridge: "unchanged",
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

export function saveEditValidatorResultSourceAdapterCandidate(id, sourceVersion, status, blocker) {
  return {
    id,
    sourceVersion,
    status,
    blocker,
  };
}
