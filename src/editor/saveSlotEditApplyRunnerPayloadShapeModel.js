export function createSaveSlotEditApplyRunnerPayloadShapePreviewModel(options = {}) {
  const handoff = options.handoff || {
    version: "",
    apply: "disabled",
    blockerCount: 0,
    blockers: [],
    payloadShape: { writer: "disabled" },
  };
  const gate = options.gate || { confirmationPhrase: "" };
  const text = options.text || {};
  const fields = [
    saveEditApplyRunnerPayloadField("payloadVersion", text.fieldLabels?.payloadVersion, "string", "ready", "save-edit-apply-runner-payload-shape-v1", ""),
    saveEditApplyRunnerPayloadField("handoffSource", text.fieldLabels?.handoffSource, "source-version", "ready", handoff.version, ""),
    saveEditApplyRunnerPayloadField("blockerList", text.fieldLabels?.blockerList, "string-list", handoff.blockerCount > 0 ? "ready" : "blocked", `${handoff.blockerCount}`, handoff.blockerCount > 0 ? "" : "blockers-missing"),
    saveEditApplyRunnerPayloadField("resultSource", text.fieldLabels?.resultSource, "source-selection", "blocked", "not-resolved", "result-source-not-selected"),
    saveEditApplyRunnerPayloadField("confirmationPhrase", text.fieldLabels?.confirmationPhrase, "readonly-text", gate.confirmationPhrase ? "ready" : "blocked", gate.confirmationPhrase || "not-defined", gate.confirmationPhrase ? "" : "confirmation-phrase-missing"),
    saveEditApplyRunnerPayloadField("confirmationInput", text.fieldLabels?.confirmationInput, "text-confirmation", "blocked", "not-created", "confirmation-input-missing"),
    saveEditApplyRunnerPayloadField("applyRunner", text.fieldLabels?.applyRunner, "runner", "blocked", "not-created", "apply-runner-not-created"),
    saveEditApplyRunnerPayloadField("writer", text.fieldLabels?.writer, "writer-state", "ready", "disabled", ""),
    saveEditApplyRunnerPayloadField("sideEffects", text.fieldLabels?.sideEffects, "side-effect-contract", "ready", "disabled", ""),
  ];
  const checks = [
    saveEditApplyRunnerPayloadCheck("handoff-readable", true, text.checkLabels?.handoffReadable, ""),
    saveEditApplyRunnerPayloadCheck("payload-versioned", true, text.checkLabels?.payloadVersioned, ""),
    saveEditApplyRunnerPayloadCheck("blockers-carried", handoff.blockerCount > 0, text.checkLabels?.blockersCarried, "blockers-missing"),
    saveEditApplyRunnerPayloadCheck("result-source-resolved", false, text.checkLabels?.resultSourceResolved, "result-source-not-selected"),
    saveEditApplyRunnerPayloadCheck("confirmation-input-created", false, text.checkLabels?.confirmationInputCreated, "confirmation-input-missing"),
    saveEditApplyRunnerPayloadCheck("apply-runner-created", false, text.checkLabels?.applyRunnerCreated, "apply-runner-not-created"),
    saveEditApplyRunnerPayloadCheck("apply-gate-held", handoff.apply === "disabled", text.checkLabels?.applyGateHeld, "apply-gate-open"),
    saveEditApplyRunnerPayloadCheck("writer-disabled", handoff.payloadShape.writer === "disabled", text.checkLabels?.writerDisabled, "writer-enabled"),
    saveEditApplyRunnerPayloadCheck("side-effects-disabled", true, text.checkLabels?.sideEffectsDisabled, ""),
  ];
  const blockers = Array.from(new Set([
    ...handoff.blockers,
    ...fields.map((field) => field.blocker).filter(Boolean),
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-apply-runner-payload-shape-v1",
    mode: "read-only-preview",
    apply: "disabled",
    applyRunner: "not-created",
    fieldCount: fields.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    blockerCount: blockers.length,
    fields,
    checks,
    blockers,
    payloadShape: {
      version: "save-edit-apply-runner-payload-shape-v1",
      mode: "read-only-preview",
      source: handoff.version,
      requiredPhrase: gate.confirmationPhrase,
      resultSource: "not-resolved",
      confirmationInput: "not-created",
      applyRunner: "not-created",
      apply: "disabled",
      writer: "disabled",
      sideEffects: "disabled",
      fields: fields.map((field) => ({
        id: field.id,
        kind: field.kind,
        status: field.status,
      })),
      blockers,
    },
  };
}

export function saveEditApplyRunnerPayloadField(id, label, kind, status, value, blocker) {
  return {
    id,
    label: label || id,
    kind,
    status,
    value,
    blocker,
  };
}

export function saveEditApplyRunnerPayloadCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}
