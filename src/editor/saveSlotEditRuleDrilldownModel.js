export function createSaveSlotEditValidationRuleDrilldownModel(options = {}) {
  const matrix = options.matrix || { rows: [], fieldCount: 0 };
  const diff = options.diff || { targetCount: 0 };
  const gate = options.gate || { applyStatus: "blocked" };
  const text = options.text || {};
  const validatorPendingDetail = options.validatorPendingDetail || ((ruleId, fallback) => fallback || ruleId);
  const ruleIds = Array.from(new Set(matrix.rows.map((row) => row.validationRule)));
  const rules = ruleIds.map((ruleId) => {
    const rows = matrix.rows.filter((row) => row.validationRule === ruleId);
    const inputKinds = Array.from(new Set(rows.map((row) => row.inputKind)));
    const blockers = Array.from(new Set(rows.map((row) => row.blocker).filter(Boolean)));
    const currentPathReady = rows.every((row) => row.currentStatus === "ready");
    const checks = saveEditValidationRuleChecks(ruleId, {
      currentPathReady,
      gate,
    }, text, validatorPendingDetail);
    return {
      id: ruleId,
      label: text.ruleLabels?.[ruleId] || ruleId,
      status: checks.some((check) => check.status === "blocked") ? "blocked" : "ready",
      fieldCount: rows.length,
      targetCount: rows.reduce((sum, row) => sum + row.targetCount, 0),
      paths: rows.map((row) => row.path),
      inputKinds,
      blockers,
      checkCount: checks.length,
      blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
      checks,
    };
  });
  return {
    status: "blocked",
    ruleCount: rules.length,
    fieldCount: matrix.fieldCount,
    targetCount: diff.targetCount,
    checkCount: rules.reduce((sum, rule) => sum + rule.checkCount, 0),
    blockedCheckCount: rules.reduce((sum, rule) => sum + rule.blockedCheckCount, 0),
    rules,
  };
}

export function saveEditValidationRuleChecks(ruleId, context, text = {}, validatorPendingDetail = null) {
  const labels = text.ruleCheckLabels || {};
  const details = text.ruleCheckDetails || {};
  const validatorDetail = validatorPendingDetail || ((rule, fallback) => fallback || rule);
  return [
    saveEditValidationRuleCheck(
      "draft-scope-allowed",
      true,
      labels.draftScopeAllowed,
      details.draftScopeAllowed,
    ),
    saveEditValidationRuleCheck(
      "input-kind-mapped",
      true,
      labels.inputKindMapped,
      details.inputKindMapped,
    ),
    saveEditValidationRuleCheck(
      "current-path-readable",
      context.currentPathReady,
      labels.currentPathReadable,
      details.currentPathReadable,
    ),
    saveEditValidationRuleCheck(
      "proposed-value-present",
      false,
      labels.proposedValuePresent,
      details.proposedValuePresent,
    ),
    saveEditValidationRuleCheck(
      "validator-executable",
      false,
      labels.validatorExecutable,
      validatorDetail(ruleId, details.validatorExecutable || ""),
    ),
    saveEditValidationRuleCheck(
      "apply-gate-open",
      context.gate.applyStatus !== "blocked",
      labels.applyGateOpen,
      details.applyGateOpen,
    ),
  ];
}

export function saveEditValidationRuleCheck(id, isReady, label, detail) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
  };
}
