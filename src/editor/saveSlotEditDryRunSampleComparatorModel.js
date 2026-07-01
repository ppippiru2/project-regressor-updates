export function createSaveSlotEditDryRunSampleComparatorPreviewModel(options = {}) {
  const dryRun = options.dryRun || { results: [], version: "" };
  const injector = options.injector || { fields: [], version: "" };
  const dryRunByPath = new Map(dryRun.results.map((result) => [result.path, result]));
  const comparisons = injector.fields.map((field) => {
    const missing = dryRunByPath.get(field.path);
    const missingReady = missing?.blocker === "proposed-values-missing";
    const validReady = field.validResult === "valid";
    const invalidReady = field.invalidResult === "invalid";
    const status = missingReady && validReady && invalidReady ? "ready" : "blocked";
    const blocker = status === "ready" ? "" : "sample-result-mismatch";
    return {
      path: field.path,
      ruleId: field.validationRule,
      status,
      missingResult: missing?.resultStatus || "not-produced",
      missingBlocker: missing?.blocker || "missing-result-not-found",
      validResult: field.validResult,
      invalidResult: field.invalidResult,
      blocker,
    };
  });
  const blockers = Array.from(new Set(comparisons.map((comparison) => comparison.blocker).filter(Boolean)));
  return {
    status: "blocked",
    version: "save-edit-dry-run-sample-result-comparator-v1",
    mode: "read-only-preview",
    apply: "disabled",
    fieldCount: comparisons.length,
    comparableCount: comparisons.filter((comparison) => comparison.missingBlocker === "proposed-values-missing").length,
    readyComparisonCount: comparisons.filter((comparison) => comparison.status === "ready").length,
    blockerCount: blockers.length,
    comparisons,
    payloadShape: {
      version: "save-edit-dry-run-sample-result-comparator-v1",
      mode: "read-only-preview",
      source: {
        missing: dryRun.version,
        samples: injector.version,
      },
      expectedStates: {
        missing: "not-produced/proposed-values-missing",
        validSample: "valid",
        invalidSample: "invalid",
      },
      bridge: "not-connected",
      writer: "disabled",
      apply: "disabled",
      blockers: ["comparator-read-only", "bridge-not-connected", "writer-disabled"],
    },
  };
}
