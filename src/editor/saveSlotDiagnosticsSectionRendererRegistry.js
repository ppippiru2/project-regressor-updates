const SAVE_SLOT_DIAGNOSTIC_RENDERER_SPECS = Object.freeze([
  ["validation-plan", "validationPlan"],
  ["draft-payload", "draftPayload"],
  ["draft-diff", "draftDiff"],
  ["apply-gate", "applyGate"],
  ["recovery-rehearsal", "recoveryRehearsal"],
  ["edit-input-schema", "editInputSchema"],
  ["validation-matrix", "validationMatrix"],
  ["rule-drilldown", "ruleDrilldown"],
  ["sample-payload", "samplePayload"],
  ["validator-dry-run", "validatorDryRun"],
  ["validator-registry", "validatorRegistry"],
  ["validator-result-schema", "validatorResultSchema"],
  ["validator-executable-dry-run", "validatorExecutableDryRun"],
  ["proposed-value-injector", "proposedValueInjector"],
  ["dry-run-sample-comparator", "dryRunSampleComparator"],
  ["sample-bridge-blocker", "sampleBridgeBlocker"],
  ["produced-result-bridge", "producedResultBridge"],
  ["bridge-transition", "bridgeTransition"],
  ["validator-source-adapter", "validatorSourceAdapter"],
  ["selected-source-handoff", "selectedSourceHandoff"],
  ["adapter-runner-preflight", "adapterRunnerPreflight"],
  ["confirmation-source-selection", "confirmationSourceSelection"],
  ["confirmation-input-shell", "confirmationInputShell"],
  ["confirmation-match-review", "confirmationMatchReview"],
  ["submit-runner-blocker", "submitRunnerBlocker"],
  ["final-apply-runner-handoff", "finalApplyRunnerHandoff"],
  ["apply-runner-payload", "applyRunnerPayload"],
  ["payload-bridge-compatibility", "payloadBridgeCompatibility"],
  ["validator-apply-gate-bridge", "validatorApplyGateBridge"],
  ["compatibility-confirmation-rollup", "compatibilityConfirmationRollup"],
  ["validator-confirmation-preflight", "validatorConfirmationPreflight"],
  ["confirmation-input-contract", "confirmationInputContract"],
  ["confirmation-runner-handoff", "confirmationRunnerHandoff"],
  ["writer-payload-checkpoint", "writerPayloadCheckpoint"],
  ["postwrite-restore", "postwriteRestore"],
  ["writer-enablement-risk", "writerEnablementRisk"],
]);

export function createSaveSlotDiagnosticsSectionRenderers(renderers = {}) {
  return Object.freeze(Object.fromEntries(
    SAVE_SLOT_DIAGNOSTIC_RENDERER_SPECS.map(([sectionId, rendererKey]) => [
      sectionId,
      requireSaveSlotSectionRenderer(renderers, rendererKey, sectionId),
    ])
  ));
}

export function listSaveSlotDiagnosticsSectionRendererSpecs() {
  return SAVE_SLOT_DIAGNOSTIC_RENDERER_SPECS.map(([sectionId, rendererKey]) => ({
    sectionId,
    rendererKey,
  }));
}

function requireSaveSlotSectionRenderer(renderers, rendererKey, sectionId) {
  const renderer = renderers?.[rendererKey];
  if (typeof renderer === "function") return renderer;
  return () => {
    throw new Error(`Missing save diagnostics section renderer: ${rendererKey} (${sectionId})`);
  };
}
