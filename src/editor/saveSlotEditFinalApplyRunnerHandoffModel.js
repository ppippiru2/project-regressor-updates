export function createSaveSlotEditFinalApplyRunnerHandoffChecklistPreviewModel(options = {}) {
  const blockerContract = options.blockerContract || {
    version: "",
    apply: "disabled",
    blockerCount: 0,
    blockers: [],
    payloadShape: { writer: "disabled" },
  };
  const text = options.text || {};
  const checks = [
    saveEditFinalApplyRunnerHandoffCheck("blocker-contract-readable", true, text.checkLabels?.blockerContractReadable, ""),
    saveEditFinalApplyRunnerHandoffCheck("blocker-list-exported", blockerContract.blockerCount > 0, text.checkLabels?.blockerListExported, "blockers-missing"),
    saveEditFinalApplyRunnerHandoffCheck("confirmation-input-ready", false, text.checkLabels?.confirmationInputReady, "confirmation-input-missing"),
    saveEditFinalApplyRunnerHandoffCheck("phrase-match-ready", false, text.checkLabels?.phraseMatchReady, "confirmation-phrase-not-matched"),
    saveEditFinalApplyRunnerHandoffCheck("result-source-ready", false, text.checkLabels?.resultSourceReady, "result-source-not-selected"),
    saveEditFinalApplyRunnerHandoffCheck("submit-runner-ready", false, text.checkLabels?.submitRunnerReady, "submit-runner-not-created"),
    saveEditFinalApplyRunnerHandoffCheck("apply-bridge-locked", blockerContract.apply === "disabled", text.checkLabels?.applyBridgeLocked, "apply-gate-open"),
    saveEditFinalApplyRunnerHandoffCheck("writer-disabled", blockerContract.payloadShape.writer === "disabled", text.checkLabels?.writerDisabled, "writer-enabled"),
    saveEditFinalApplyRunnerHandoffCheck("handoff-read-only", true, text.checkLabels?.handoffReadOnly, ""),
  ];
  const blockers = Array.from(new Set([
    ...blockerContract.blockers,
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-final-apply-runner-handoff-checklist-v1",
    mode: "read-only-preview",
    apply: "disabled",
    handoff: "read-only",
    blockerCount: blockers.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    checks,
    blockers,
    payloadShape: {
      version: "save-edit-final-apply-runner-handoff-checklist-v1",
      mode: "read-only-preview",
      source: blockerContract.version,
      handoff: "read-only",
      submitRunner: "not-created",
      submitControl: "disabled",
      confirmationInput: "not-created",
      phraseMatch: "not-evaluated",
      resultSource: "not-resolved",
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

export function saveEditFinalApplyRunnerHandoffCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}
