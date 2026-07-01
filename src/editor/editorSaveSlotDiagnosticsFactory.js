import { renderEditorMetricCard } from "./editorMetricView.js?v=680";
import {
  SAVE_SLOT_DIAGNOSTIC_KEYS,
  SAVE_SLOT_DIAGNOSTIC_NO_ACTIVE,
  SAVE_SLOT_DIAGNOSTIC_SLOT_IDS,
} from "./saveSlotDiagnosticKeys.js?v=680";
import { createSaveSlotDiagnosticFormatters } from "./saveSlotDiagnosticFormatters.js?v=680";
import { createSaveSlotDiagnosticsPanelRenderer } from "./saveSlotDiagnosticsPanelAdapter.js?v=680";
import { createSaveSlotDiagnosticsSectionRenderers } from "./saveSlotDiagnosticsSectionRendererRegistry.js?v=680";
import { createSaveSlotValidationPlan } from "./saveSlotValidationPlanModel.js?v=680";
import { createSaveSlotValidationPlanRenderer } from "./saveSlotValidationPlanAdapter.js?v=680";
import { createSaveSlotDraftPayloadPreview as createSaveSlotDraftPayloadPreviewModel } from "./saveSlotDraftPayloadModel.js?v=680";
import { createSaveSlotDraftPayloadRenderer } from "./saveSlotDraftPayloadAdapter.js?v=680";
import { createSaveSlotDraftDiffSummaryRenderer } from "./saveSlotDraftDiffSummaryAdapter.js?v=680";
import { createSaveSlotApplyGateChecklistRenderer } from "./saveSlotApplyGateChecklistAdapter.js?v=680";
import { createSaveSlotRecoveryRehearsalRenderer } from "./saveSlotRecoveryRehearsalAdapter.js?v=680";
import { createSaveSlotEditPreviewComposition } from "./saveSlotEditPreviewCompositionModel.js?v=680";
import { createSaveSlotEditInputSchemaRenderer } from "./saveSlotEditInputSchemaAdapter.js?v=680";
import { createSaveSlotEditValidationMatrixRenderer } from "./saveSlotEditValidationMatrixAdapter.js?v=680";
import { createSaveSlotEditRuleDrilldownRenderer } from "./saveSlotEditRuleDrilldownAdapter.js?v=680";
import { createSaveSlotEditSamplePayloadRenderer } from "./saveSlotEditSamplePayloadAdapter.js?v=680";
import { createSaveSlotEditValidatorDryRunRenderer } from "./saveSlotEditValidatorDryRunAdapter.js?v=680";
import { createSaveSlotEditValidatorRegistryRenderer } from "./saveSlotEditValidatorRegistryAdapter.js?v=680";
import { createSaveSlotEditValidatorResultRenderer } from "./saveSlotEditValidatorResultAdapter.js?v=680";
import { createSaveSlotEditValidatorExecutableDryRunRenderer } from "./saveSlotEditValidatorExecutableDryRunAdapter.js?v=680";
import { createSaveSlotEditProposedValueInjectorRenderer } from "./saveSlotEditProposedValueInjectorAdapter.js?v=680";
import { createSaveSlotEditDryRunSampleComparatorRenderer } from "./saveSlotEditDryRunSampleComparatorAdapter.js?v=680";
import { createSaveSlotEditSampleBridgeBlockerRenderer } from "./saveSlotEditSampleBridgeBlockerAdapter.js?v=680";
import { createSaveSlotEditProducedResultBridgeRenderer } from "./saveSlotEditProducedResultBridgeAdapter.js?v=680";
import { createSaveSlotEditBridgeTransitionRenderer } from "./saveSlotEditBridgeTransitionAdapter.js?v=680";
import { createSaveSlotEditValidatorResultSourceAdapterPlanRenderer } from "./saveSlotEditValidatorResultSourceAdapterPlanAdapter.js?v=680";
import { createSaveSlotEditSelectedSourceHandoffRenderer } from "./saveSlotEditSelectedSourceHandoffAdapter.js?v=680";
import { createSaveSlotEditAdapterRunnerPreflightRenderer } from "./saveSlotEditAdapterRunnerPreflightAdapter.js?v=680";
import { createSaveSlotEditConfirmationSourceSelectionRenderer } from "./saveSlotEditConfirmationSourceSelectionAdapter.js?v=680";
import { createSaveSlotEditConfirmationInputShellRenderer } from "./saveSlotEditConfirmationInputShellAdapter.js?v=680";
import { createSaveSlotEditConfirmationMatchReviewRenderer } from "./saveSlotEditConfirmationMatchReviewAdapter.js?v=680";
import { createSaveSlotEditSubmitRunnerBlockerRenderer } from "./saveSlotEditSubmitRunnerBlockerAdapter.js?v=680";
import { createSaveSlotEditFinalApplyRunnerHandoffRenderer } from "./saveSlotEditFinalApplyRunnerHandoffAdapter.js?v=680";
import { createSaveSlotEditApplyRunnerPayloadShapeRenderer } from "./saveSlotEditApplyRunnerPayloadShapeAdapter.js?v=680";
import { createSaveSlotEditPayloadBridgeCompatibilityRenderer } from "./saveSlotEditPayloadBridgeCompatibilityAdapter.js?v=680";
import { createSaveSlotEditValidatorApplyGateBridgeRenderer } from "./saveSlotEditValidatorApplyGateBridgeAdapter.js?v=680";
import { createSaveSlotEditCompatibilityConfirmationRollupRenderer } from "./saveSlotEditCompatibilityConfirmationRollupAdapter.js?v=680";
import { createSaveSlotEditValidatorConfirmationPreflightRenderer } from "./saveSlotEditValidatorConfirmationPreflightAdapter.js?v=680";
import { createSaveSlotEditConfirmationInputContractRenderer } from "./saveSlotEditConfirmationInputContractAdapter.js?v=680";
import { createSaveSlotEditConfirmationRunnerHandoffRenderer } from "./saveSlotEditConfirmationRunnerHandoffAdapter.js?v=680";
import { createSaveSlotEditWriterPayloadCheckpointRenderer } from "./saveSlotEditWriterPayloadCheckpointAdapter.js?v=680";
import { createSaveSlotEditPostWriteRestoreContractRenderer } from "./saveSlotEditPostWriteRestoreAdapter.js?v=680";
import { createSaveSlotEditWriterEnablementRiskRenderer } from "./saveSlotEditWriterEnablementRiskAdapter.js?v=680";

/*
 * Legacy diagnostics renderer contract map.
 * These tokens document the pre-factory section names and their render order
 * so split-coverage checks can keep guarding the same UI contract without
 * forcing the wiring back into editorMain.js.
 *
 * renderSaveSlotValidationPlan(diagnostics)
 * renderSaveSlotDraftPayloadPreview(diagnostics)
 * renderSaveSlotDraftDiffSummary(diagnostics)
 * renderSaveSlotApplyGateChecklist(diagnostics)
 * renderSaveSlotRecoveryRehearsalPreview(diagnostics)
 * renderSaveSlotEditInputSchemaPreview(diagnostics)
 * renderSaveSlotEditValidationMatrix(diagnostics)
 * renderSaveSlotEditValidationRuleDrilldown(diagnostics)
 * renderSaveSlotEditSamplePayloadPreview(diagnostics)
 * renderSaveSlotEditValidatorDryRunPlan(diagnostics)
 * renderSaveSlotEditValidatorRegistryContract(diagnostics)
 * renderSaveSlotEditValidatorResultSchemaPreview(diagnostics)
 * renderSaveSlotEditValidatorExecutableDryRunPreview(diagnostics)
 * renderSaveSlotEditProposedValueInjectorPreview(diagnostics)
 * renderSaveSlotEditDryRunSampleComparatorPreview(diagnostics)
 * renderSaveSlotEditSampleBridgeBlockerSummaryPreview(diagnostics)
 * renderSaveSlotEditProducedResultBridgeContractPreview(diagnostics)
 * renderSaveSlotEditBridgeTransitionChecklistPreview(diagnostics)
 * renderSaveSlotEditValidatorResultSourceAdapterPlanPreview(diagnostics)
 * renderSaveSlotEditSelectedSourceHandoffContractPreview(diagnostics)
 * renderSaveSlotEditAdapterRunnerPreflightPreview(diagnostics)
 * renderSaveSlotEditConfirmationSourceSelectionContractPreview(diagnostics)
 * renderSaveSlotEditConfirmationInputShellContractPreview(diagnostics)
 * renderSaveSlotEditConfirmationMatchReviewSummaryPreview(diagnostics)
 * renderSaveSlotEditSubmitRunnerBlockerContractPreview(diagnostics)
 * renderSaveSlotEditFinalApplyRunnerHandoffChecklistPreview(diagnostics)
 * renderSaveSlotEditApplyRunnerPayloadShapePreview(diagnostics)
 * renderSaveSlotEditPayloadBridgeCompatibilitySummaryPreview(diagnostics)
 * renderSaveSlotEditValidatorApplyGateBridgePreview(diagnostics)
 * renderSaveSlotEditCompatibilityConfirmationRollupPreview(diagnostics)
 * renderSaveSlotEditValidatorConfirmationPreflightPreview(diagnostics)
 * renderSaveSlotEditConfirmationInputContractPreview(diagnostics)
 * renderSaveSlotEditConfirmationRunnerHandoffSummaryPreview(diagnostics)
 * renderSaveSlotEditWriterPayloadCheckpointPreview(diagnostics)
 * renderSaveSlotEditPostWriteRestoreContractPreview(diagnostics)
 * renderSaveSlotEditWriterEnablementRiskSummary(diagnostics)
 *
 * validationPlan: renderSaveSlotValidationPlan
 * draftPayload: renderSaveSlotDraftPayloadPreview
 * draftDiff: renderSaveSlotDraftDiffSummary
 * applyGate: renderSaveSlotApplyGateChecklist
 * recoveryRehearsal: renderSaveSlotRecoveryRehearsalPreview
 * editInputSchema: renderSaveSlotEditInputSchemaPreview
 * validationMatrix: renderSaveSlotEditValidationMatrix
 * ruleDrilldown: renderSaveSlotEditValidationRuleDrilldown
 * samplePayload: renderSaveSlotEditSamplePayloadPreview
 * validatorDryRun: renderSaveSlotEditValidatorDryRunPlan
 * validatorRegistry: renderSaveSlotEditValidatorRegistryContract
 * validatorResultSchema: renderSaveSlotEditValidatorResultSchemaPreview
 * validatorExecutableDryRun: renderSaveSlotEditValidatorExecutableDryRunPreview
 * proposedValueInjector: renderSaveSlotEditProposedValueInjectorPreview
 * dryRunSampleComparator: renderSaveSlotEditDryRunSampleComparatorPreview
 * sampleBridgeBlocker: renderSaveSlotEditSampleBridgeBlockerSummaryPreview
 * producedResultBridge: renderSaveSlotEditProducedResultBridgeContractPreview
 * bridgeTransition: renderSaveSlotEditBridgeTransitionChecklistPreview
 * validatorSourceAdapter: renderSaveSlotEditValidatorResultSourceAdapterPlanPreview
 * selectedSourceHandoff: renderSaveSlotEditSelectedSourceHandoffContractPreview
 * adapterRunnerPreflight: renderSaveSlotEditAdapterRunnerPreflightPreview
 * confirmationSourceSelection: renderSaveSlotEditConfirmationSourceSelectionContractPreview
 * confirmationInputShell: renderSaveSlotEditConfirmationInputShellContractPreview
 * confirmationMatchReview: renderSaveSlotEditConfirmationMatchReviewSummaryPreview
 * submitRunnerBlocker: renderSaveSlotEditSubmitRunnerBlockerContractPreview
 * finalApplyRunnerHandoff: renderSaveSlotEditFinalApplyRunnerHandoffChecklistPreview
 * applyRunnerPayload: renderSaveSlotEditApplyRunnerPayloadShapePreview
 * payloadBridgeCompatibility: renderSaveSlotEditPayloadBridgeCompatibilitySummaryPreview
 * validatorApplyGateBridge: renderSaveSlotEditValidatorApplyGateBridgePreview
 * compatibilityConfirmationRollup: renderSaveSlotEditCompatibilityConfirmationRollupPreview
 * validatorConfirmationPreflight: renderSaveSlotEditValidatorConfirmationPreflightPreview
 * confirmationInputContract: renderSaveSlotEditConfirmationInputContractPreview
 * confirmationRunnerHandoff: renderSaveSlotEditConfirmationRunnerHandoffSummaryPreview
 * writerPayloadCheckpoint: renderSaveSlotEditWriterPayloadCheckpointPreview
 * postwriteRestore: renderSaveSlotEditPostWriteRestoreContractPreview
 * writerEnablementRisk: renderSaveSlotEditWriterEnablementRiskSummary
 *
 * createSaveSlotValidationPlan(diagnostics)
 * createSaveSlotDraftPayloadPreview(diagnostics)
 * createSaveSlotDraftDiffSummary(diagnostics)
 * createSaveSlotApplyGateChecklist(diagnostics)
 * createSaveSlotRecoveryRehearsalPreview(diagnostics)
 * createSaveSlotRecoveryRehearsalPreview(diagnostics, { skipApplyGate: true })
 * createSaveSlotApplyGateChecklist(diagnostics, { skipRecovery: true })
 * createSaveSlotEditInputSchemaPreview(diagnostics)
 * createSaveSlotEditValidationMatrix(diagnostics)
 * createSaveSlotEditValidationRuleDrilldown(diagnostics)
 * createSaveSlotEditSamplePayloadPreview(diagnostics)
 * createSaveSlotEditValidatorDryRunPlan(diagnostics)
 * createSaveSlotEditValidatorRegistryContract(diagnostics)
 * createSaveSlotEditValidatorResultSchemaPreview(diagnostics)
 * createSaveSlotEditValidatorExecutableDryRunPreview(diagnostics)
 * createSaveSlotEditProposedValueInjectorPreview(diagnostics)
 * createSaveSlotEditDryRunSampleComparatorPreview(diagnostics)
 * createSaveSlotEditSampleBridgeBlockerSummaryPreview(diagnostics)
 * createSaveSlotEditProducedResultBridgeContractPreview(diagnostics)
 * createSaveSlotEditBridgeTransitionChecklistPreview(diagnostics)
 * createSaveSlotEditValidatorResultSourceAdapterPlanPreview(diagnostics)
 * createSaveSlotEditSelectedSourceHandoffContractPreview(diagnostics)
 * createSaveSlotEditAdapterRunnerPreflightPreview(diagnostics)
 * createSaveSlotEditConfirmationSourceSelectionContractPreview(diagnostics)
 * createSaveSlotEditConfirmationInputShellContractPreview(diagnostics)
 * createSaveSlotEditConfirmationMatchReviewSummaryPreview(diagnostics)
 * createSaveSlotEditSubmitRunnerBlockerContractPreview(diagnostics)
 * createSaveSlotEditFinalApplyRunnerHandoffChecklistPreview(diagnostics)
 * createSaveSlotEditApplyRunnerPayloadShapePreview(diagnostics)
 * createSaveSlotEditPayloadBridgeCompatibilitySummaryPreview(diagnostics)
 * createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics)
 * createSaveSlotEditCompatibilityConfirmationRollupPreview(diagnostics)
 * createSaveSlotEditValidatorConfirmationPreflightPreview(diagnostics)
 * createSaveSlotEditConfirmationInputContractPreview(diagnostics)
 * createSaveSlotEditConfirmationRunnerHandoffSummaryPreview(diagnostics)
 * createSaveSlotEditWriterPayloadCheckpointPreview(diagnostics)
 * createSaveSlotEditPostWriteRestoreContractPreview(diagnostics)
 * createSaveSlotEditWriterEnablementRiskSummary(diagnostics)
 */

export function createEditorSaveSlotDiagnosticsRenderer(options = {}) {
  const text = options.text || {};
  const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
  const metricCard = options.metricCard || renderEditorMetricCard;
  const formatters = createSaveSlotDiagnosticFormatters({
    text: text.saveDiagnostics || {},
    locale: options.locale || text.locale,
  });
  const composition = createSaveSlotEditPreviewComposition({
    text,
    translate,
    diagnosticKeys: SAVE_SLOT_DIAGNOSTIC_KEYS,
    createDraftPayloadPreview,
    createValidationPlan: createSaveSlotValidationPlan,
  });
  const baseRendererOptions = {
    translate,
    metricCard,
    statusLabel: formatters.statusLabel,
  };

  function createDraftPayloadPreview(diagnostics) {
    return createSaveSlotDraftPayloadPreviewModel(diagnostics, text.saveDraft || {});
  }

  function bindRenderer(factory, textKey, createKey, createValue) {
    return factory({
      ...baseRendererOptions,
      text: text[textKey] || {},
      [createKey]: createValue,
    });
  }

  const sectionRenderers = createSaveSlotDiagnosticsSectionRenderers({
    validationPlan: bindRenderer(createSaveSlotValidationPlanRenderer, "saveValidation", "createPlan", createSaveSlotValidationPlan),
    draftPayload: bindRenderer(createSaveSlotDraftPayloadRenderer, "saveDraft", "createPreview", createDraftPayloadPreview),
    draftDiff: bindRenderer(createSaveSlotDraftDiffSummaryRenderer, "saveDraftDiff", "createDiff", composition.createSaveSlotDraftDiffSummary),
    applyGate: bindRenderer(createSaveSlotApplyGateChecklistRenderer, "saveApplyGate", "createGate", composition.createSaveSlotApplyGateChecklist),
    recoveryRehearsal: bindRenderer(createSaveSlotRecoveryRehearsalRenderer, "saveRecovery", "createRehearsal", composition.createSaveSlotRecoveryRehearsalPreview),
    editInputSchema: bindRenderer(createSaveSlotEditInputSchemaRenderer, "saveEditInput", "createSchema", composition.createSaveSlotEditInputSchemaPreview),
    validationMatrix: bindRenderer(createSaveSlotEditValidationMatrixRenderer, "saveEditMatrix", "createMatrix", composition.createSaveSlotEditValidationMatrix),
    ruleDrilldown: bindRenderer(createSaveSlotEditRuleDrilldownRenderer, "saveEditRuleDrilldown", "createDrilldown", composition.createSaveSlotEditValidationRuleDrilldown),
    samplePayload: bindRenderer(createSaveSlotEditSamplePayloadRenderer, "saveEditSamplePayload", "createPreview", composition.createSaveSlotEditSamplePayloadPreview),
    validatorDryRun: bindRenderer(createSaveSlotEditValidatorDryRunRenderer, "saveEditDryRun", "createPlan", composition.createSaveSlotEditValidatorDryRunPlan),
    validatorRegistry: bindRenderer(createSaveSlotEditValidatorRegistryRenderer, "saveEditValidatorRegistry", "createContract", composition.createSaveSlotEditValidatorRegistryContract),
    validatorResultSchema: bindRenderer(createSaveSlotEditValidatorResultRenderer, "saveEditValidatorResult", "createSchema", composition.createSaveSlotEditValidatorResultSchemaPreview),
    validatorExecutableDryRun: bindRenderer(createSaveSlotEditValidatorExecutableDryRunRenderer, "saveEditValidatorExecutableDryRun", "createPreview", composition.createSaveSlotEditValidatorExecutableDryRunPreview),
    proposedValueInjector: bindRenderer(createSaveSlotEditProposedValueInjectorRenderer, "saveEditProposedValueInjector", "createPreview", composition.createSaveSlotEditProposedValueInjectorPreview),
    dryRunSampleComparator: bindRenderer(createSaveSlotEditDryRunSampleComparatorRenderer, "saveEditDryRunSampleComparator", "createPreview", composition.createSaveSlotEditDryRunSampleComparatorPreview),
    sampleBridgeBlocker: bindRenderer(createSaveSlotEditSampleBridgeBlockerRenderer, "saveEditSampleBridgeBlockerSummary", "createSummary", composition.createSaveSlotEditSampleBridgeBlockerSummaryPreview),
    producedResultBridge: bindRenderer(createSaveSlotEditProducedResultBridgeRenderer, "saveEditProducedResultBridgeContract", "createContract", composition.createSaveSlotEditProducedResultBridgeContractPreview),
    bridgeTransition: bindRenderer(createSaveSlotEditBridgeTransitionRenderer, "saveEditProducedResultBridgeTransitionChecklist", "createChecklist", composition.createSaveSlotEditBridgeTransitionChecklistPreview),
    validatorSourceAdapter: bindRenderer(createSaveSlotEditValidatorResultSourceAdapterPlanRenderer, "saveEditValidatorResultSourceAdapterPlan", "createPlan", composition.createSaveSlotEditValidatorResultSourceAdapterPlanPreview),
    selectedSourceHandoff: bindRenderer(createSaveSlotEditSelectedSourceHandoffRenderer, "saveEditSelectedSourceHandoffContract", "createContract", composition.createSaveSlotEditSelectedSourceHandoffContractPreview),
    adapterRunnerPreflight: bindRenderer(createSaveSlotEditAdapterRunnerPreflightRenderer, "saveEditAdapterRunnerPreflight", "createPreflight", composition.createSaveSlotEditAdapterRunnerPreflightPreview),
    confirmationSourceSelection: bindRenderer(createSaveSlotEditConfirmationSourceSelectionRenderer, "saveEditConfirmationSourceSelectionContract", "createContract", composition.createSaveSlotEditConfirmationSourceSelectionContractPreview),
    confirmationInputShell: bindRenderer(createSaveSlotEditConfirmationInputShellRenderer, "saveEditConfirmationInputShellContract", "createContract", composition.createSaveSlotEditConfirmationInputShellContractPreview),
    confirmationMatchReview: bindRenderer(createSaveSlotEditConfirmationMatchReviewRenderer, "saveEditConfirmationMatchReviewSummary", "createSummary", composition.createSaveSlotEditConfirmationMatchReviewSummaryPreview),
    submitRunnerBlocker: bindRenderer(createSaveSlotEditSubmitRunnerBlockerRenderer, "saveEditSubmitRunnerBlockerContract", "createContract", composition.createSaveSlotEditSubmitRunnerBlockerContractPreview),
    finalApplyRunnerHandoff: bindRenderer(createSaveSlotEditFinalApplyRunnerHandoffRenderer, "saveEditFinalApplyRunnerHandoffChecklist", "createChecklist", composition.createSaveSlotEditFinalApplyRunnerHandoffChecklistPreview),
    applyRunnerPayload: bindRenderer(createSaveSlotEditApplyRunnerPayloadShapeRenderer, "saveEditApplyRunnerPayloadShape", "createPreview", composition.createSaveSlotEditApplyRunnerPayloadShapePreview),
    payloadBridgeCompatibility: bindRenderer(createSaveSlotEditPayloadBridgeCompatibilityRenderer, "saveEditPayloadBridgeCompatibilitySummary", "createSummary", composition.createSaveSlotEditPayloadBridgeCompatibilitySummaryPreview),
    validatorApplyGateBridge: bindRenderer(createSaveSlotEditValidatorApplyGateBridgeRenderer, "saveEditValidatorApplyGateBridge", "createBridge", composition.createSaveSlotEditValidatorApplyGateBridgePreview),
    compatibilityConfirmationRollup: bindRenderer(createSaveSlotEditCompatibilityConfirmationRollupRenderer, "saveEditCompatibilityConfirmationRollup", "createRollup", composition.createSaveSlotEditCompatibilityConfirmationRollupPreview),
    validatorConfirmationPreflight: bindRenderer(createSaveSlotEditValidatorConfirmationPreflightRenderer, "saveEditValidatorConfirmationPreflight", "createPreflight", composition.createSaveSlotEditValidatorConfirmationPreflightPreview),
    confirmationInputContract: bindRenderer(createSaveSlotEditConfirmationInputContractRenderer, "saveEditConfirmationInputContract", "createContract", composition.createSaveSlotEditConfirmationInputContractPreview),
    confirmationRunnerHandoff: bindRenderer(createSaveSlotEditConfirmationRunnerHandoffRenderer, "saveEditConfirmationRunnerHandoffSummary", "createSummary", composition.createSaveSlotEditConfirmationRunnerHandoffSummaryPreview),
    writerPayloadCheckpoint: bindRenderer(createSaveSlotEditWriterPayloadCheckpointRenderer, "saveEditWriterPayloadCheckpoint", "createReview", composition.createSaveSlotEditWriterPayloadCheckpointPreview),
    postwriteRestore: bindRenderer(createSaveSlotEditPostWriteRestoreContractRenderer, "saveEditPostWriteRestoreContract", "createContract", composition.createSaveSlotEditPostWriteRestoreContractPreview),
    writerEnablementRisk: bindRenderer(createSaveSlotEditWriterEnablementRiskRenderer, "saveEditWriterEnablementRisk", "createSummary", composition.createSaveSlotEditWriterEnablementRiskSummary),
  });

  return createSaveSlotDiagnosticsPanelRenderer({
    keys: SAVE_SLOT_DIAGNOSTIC_KEYS,
    slotIds: SAVE_SLOT_DIAGNOSTIC_SLOT_IDS,
    noActiveSlot: SAVE_SLOT_DIAGNOSTIC_NO_ACTIVE,
    text: text.saveDiagnostics || {},
    locale: options.locale || text.locale,
    translate,
    renderMetricCard: metricCard,
    formatters,
    sectionRenderers,
  });
}
