import { createSaveSlotDraftDiffSummary as createSaveSlotDraftDiffSummaryModel } from "./saveSlotDraftDiffSummaryModel.js?v=681";
import { createSaveSlotApplyGateChecklistModel } from "./saveSlotApplyGateChecklistModel.js?v=681";
import { createSaveSlotRecoveryRehearsalPreviewModel } from "./saveSlotRecoveryRehearsalModel.js?v=681";
import { createSaveSlotEditInputSchemaPreviewModel } from "./saveSlotEditInputSchemaModel.js?v=681";
import { createSaveSlotEditValidationMatrixModel } from "./saveSlotEditValidationMatrixModel.js?v=681";
import { createSaveSlotEditValidationRuleDrilldownModel } from "./saveSlotEditRuleDrilldownModel.js?v=681";
import { createSaveSlotEditSamplePayloadPreviewModel } from "./saveSlotEditSamplePayloadModel.js?v=681";
import { createSaveSlotEditValidatorDryRunPlanModel } from "./saveSlotEditValidatorDryRunModel.js?v=681";
import { createSaveSlotEditValidatorRegistryContractModel } from "./saveSlotEditValidatorRegistryModel.js?v=681";
import { createSaveSlotEditValidatorResultSchemaPreviewModel } from "./saveSlotEditValidatorResultModel.js?v=681";
import {
  createSaveSlotEditValidatorExecutableDryRunPreviewModel,
  createSaveSlotEditValidatorExecutableRegistryModel,
} from "./saveSlotEditValidatorExecutableDryRunModel.js?v=681";
import { createSaveSlotEditProposedValueInjectorPreviewModel } from "./saveSlotEditProposedValueInjectorModel.js?v=681";
import { createSaveSlotEditDryRunSampleComparatorPreviewModel } from "./saveSlotEditDryRunSampleComparatorModel.js?v=681";
import { createSaveSlotEditSampleBridgeBlockerSummaryPreviewModel } from "./saveSlotEditSampleBridgeBlockerModel.js?v=681";
import { createSaveSlotEditProducedResultBridgeContractPreviewModel } from "./saveSlotEditProducedResultBridgeModel.js?v=681";
import { createSaveSlotEditBridgeTransitionChecklistPreviewModel } from "./saveSlotEditBridgeTransitionModel.js?v=681";
import { createSaveSlotEditValidatorResultSourceAdapterPlanPreviewModel } from "./saveSlotEditValidatorResultSourceAdapterModel.js?v=681";
import { createSaveSlotEditSelectedSourceHandoffContractPreviewModel } from "./saveSlotEditSelectedSourceHandoffModel.js?v=681";
import { createSaveSlotEditAdapterRunnerPreflightPreviewModel } from "./saveSlotEditAdapterRunnerPreflightModel.js?v=681";
import { createSaveSlotEditConfirmationSourceSelectionContractPreviewModel } from "./saveSlotEditConfirmationSourceSelectionModel.js?v=681";
import { createSaveSlotEditConfirmationInputShellContractPreviewModel } from "./saveSlotEditConfirmationInputShellModel.js?v=681";
import { createSaveSlotEditConfirmationMatchReviewSummaryPreviewModel } from "./saveSlotEditConfirmationMatchReviewModel.js?v=681";
import { createSaveSlotEditSubmitRunnerBlockerContractPreviewModel } from "./saveSlotEditSubmitRunnerBlockerModel.js?v=681";
import { createSaveSlotEditFinalApplyRunnerHandoffChecklistPreviewModel } from "./saveSlotEditFinalApplyRunnerHandoffModel.js?v=681";
import { createSaveSlotEditApplyRunnerPayloadShapePreviewModel } from "./saveSlotEditApplyRunnerPayloadShapeModel.js?v=681";
import { createSaveSlotEditPayloadBridgeCompatibilitySummaryPreviewModel } from "./saveSlotEditPayloadBridgeCompatibilityModel.js?v=681";
import { createSaveSlotEditValidatorApplyGateBridgePreviewModel } from "./saveSlotEditValidatorApplyGateBridgeModel.js?v=681";
import { createSaveSlotEditCompatibilityConfirmationRollupPreviewModel } from "./saveSlotEditCompatibilityConfirmationRollupModel.js?v=681";
import { createSaveSlotEditValidatorConfirmationPreflightPreviewModel } from "./saveSlotEditValidatorConfirmationPreflightModel.js?v=681";
import { createSaveSlotEditConfirmationInputContractPreviewModel } from "./saveSlotEditConfirmationInputContractModel.js?v=681";
import { createSaveSlotEditConfirmationRunnerHandoffSummaryPreviewModel } from "./saveSlotEditConfirmationRunnerHandoffModel.js?v=681";
import { createSaveSlotEditWriterPayloadCheckpointPreviewModel } from "./saveSlotEditWriterPayloadCheckpointModel.js?v=681";
import { createSaveSlotEditPostWriteRestoreContractPreviewModel } from "./saveSlotEditPostWriteRestoreContractModel.js?v=681";
import { createSaveSlotEditWriterEnablementRiskSummaryModel } from "./saveSlotEditWriterEnablementRiskModel.js?v=681";

const DEFAULT_DRAFT_PREVIEW = Object.freeze({
  targetCount: 0,
  operationCount: 0,
  fieldGroups: [],
});

const DEFAULT_VALIDATION_PLAN = Object.freeze({
  status: "blocked",
  readyChecks: 0,
  blockedChecks: 0,
  totalChecks: 0,
  checks: [],
});

function defaultTranslate(key, _values, fallback) {
  return fallback || key || "";
}

export function createSaveSlotEditPreviewComposition(options = {}) {
  const text = options.text || {};
  const translate = typeof options.translate === "function" ? options.translate : defaultTranslate;
  const diagnosticKeys = options.diagnosticKeys || {};
  const createDraftPayloadPreview =
    typeof options.createDraftPayloadPreview === "function"
      ? options.createDraftPayloadPreview
      : () => DEFAULT_DRAFT_PREVIEW;
  const createValidationPlan =
    typeof options.createValidationPlan === "function"
      ? options.createValidationPlan
      : () => DEFAULT_VALIDATION_PLAN;

  function createSaveSlotDraftDiffSummary(diagnostics) {
    return createSaveSlotDraftDiffSummaryModel(diagnostics, {
      saveDraft: text.saveDraft || {},
      saveDraftDiff: text.saveDraftDiff || {},
    });
  }

  function createSaveSlotEditInputSchemaPreview(diagnostics) {
    const draft = createDraftPayloadPreview(diagnostics);
    const diff = createSaveSlotDraftDiffSummary(diagnostics);
    const gate = createSaveSlotApplyGateChecklist(diagnostics);
    return createSaveSlotEditInputSchemaPreviewModel({ draft, diff, gate });
  }

  function createSaveSlotEditValidationMatrix(diagnostics) {
    const schema = createSaveSlotEditInputSchemaPreview(diagnostics);
    const diff = createSaveSlotDraftDiffSummary(diagnostics);
    return createSaveSlotEditValidationMatrixModel({ schema, diff });
  }

  function createSaveSlotEditValidationRuleDrilldown(diagnostics) {
    const matrix = createSaveSlotEditValidationMatrix(diagnostics);
    const diff = createSaveSlotDraftDiffSummary(diagnostics);
    const gate = createSaveSlotApplyGateChecklist(diagnostics);
    const drilldownText = text.saveEditRuleDrilldown || {};
    return createSaveSlotEditValidationRuleDrilldownModel({
      matrix,
      diff,
      gate,
      text: drilldownText,
      validatorPendingDetail: (ruleId, fallback) =>
        translate("editorPrep.saveEditRuleDrilldown.validatorPendingDetail", { rule: ruleId }, fallback || ""),
    });
  }

  function createSaveSlotEditSamplePayloadPreview(diagnostics) {
    const draft = createDraftPayloadPreview(diagnostics);
    const matrix = createSaveSlotEditValidationMatrix(diagnostics);
    const ruleDrilldown = createSaveSlotEditValidationRuleDrilldown(diagnostics);
    return createSaveSlotEditSamplePayloadPreviewModel({ draft, matrix, ruleDrilldown });
  }

  function createSaveSlotEditValidatorDryRunPlan(diagnostics) {
    const sample = createSaveSlotEditSamplePayloadPreview(diagnostics);
    const drilldown = createSaveSlotEditValidationRuleDrilldown(diagnostics);
    const gate = createSaveSlotApplyGateChecklist(diagnostics);
    return createSaveSlotEditValidatorDryRunPlanModel({
      sample,
      drilldown,
      gate,
      text: text.saveEditDryRun || {},
    });
  }

  function createSaveSlotEditValidatorRegistryContract(diagnostics) {
    const drilldown = createSaveSlotEditValidationRuleDrilldown(diagnostics);
    return createSaveSlotEditValidatorRegistryContractModel({ drilldown });
  }

  function createSaveSlotEditValidatorResultSchemaPreview(diagnostics) {
    const contract = createSaveSlotEditValidatorRegistryContract(diagnostics);
    return createSaveSlotEditValidatorResultSchemaPreviewModel({ contract });
  }

  function createSaveSlotEditValidatorExecutableRegistry(diagnostics) {
    const drilldown = createSaveSlotEditValidationRuleDrilldown(diagnostics);
    return createSaveSlotEditValidatorExecutableRegistryModel({ drilldown });
  }

  function createSaveSlotEditValidatorExecutableDryRunPreview(diagnostics) {
    const sample = createSaveSlotEditSamplePayloadPreview(diagnostics);
    const registry = createSaveSlotEditValidatorExecutableRegistry(diagnostics);
    return createSaveSlotEditValidatorExecutableDryRunPreviewModel({ sample, registry });
  }

  function createSaveSlotEditProposedValueInjectorPreview(diagnostics) {
    const sample = createSaveSlotEditSamplePayloadPreview(diagnostics);
    const registry = createSaveSlotEditValidatorExecutableRegistry(diagnostics);
    return createSaveSlotEditProposedValueInjectorPreviewModel({ sample, registry });
  }

  function createSaveSlotEditDryRunSampleComparatorPreview(diagnostics) {
    const dryRun = createSaveSlotEditValidatorExecutableDryRunPreview(diagnostics);
    const injector = createSaveSlotEditProposedValueInjectorPreview(diagnostics);
    return createSaveSlotEditDryRunSampleComparatorPreviewModel({ dryRun, injector });
  }

  function createSaveSlotEditSampleBridgeBlockerSummaryPreview(diagnostics) {
    const comparator = createSaveSlotEditDryRunSampleComparatorPreview(diagnostics);
    const gate = createSaveSlotApplyGateChecklist(diagnostics);
    return createSaveSlotEditSampleBridgeBlockerSummaryPreviewModel({ comparator, gate });
  }

  function createSaveSlotEditProducedResultBridgeContractPreview(diagnostics) {
    const summary = createSaveSlotEditSampleBridgeBlockerSummaryPreview(diagnostics);
    return createSaveSlotEditProducedResultBridgeContractPreviewModel({ summary });
  }

  function createSaveSlotEditBridgeTransitionChecklistPreview(diagnostics) {
    const produced = createSaveSlotEditProducedResultBridgeContractPreview(diagnostics);
    const legacy = createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics);
    return createSaveSlotEditBridgeTransitionChecklistPreviewModel({
      produced,
      legacy,
      text: text.saveEditProducedResultBridgeTransitionChecklist || {},
    });
  }

  function createSaveSlotEditValidatorResultSourceAdapterPlanPreview(diagnostics) {
    const schema = createSaveSlotEditValidatorResultSchemaPreview(diagnostics);
    const executable = createSaveSlotEditValidatorExecutableDryRunPreview(diagnostics);
    const comparator = createSaveSlotEditDryRunSampleComparatorPreview(diagnostics);
    const produced = createSaveSlotEditProducedResultBridgeContractPreview(diagnostics);
    const transition = createSaveSlotEditBridgeTransitionChecklistPreview(diagnostics);
    return createSaveSlotEditValidatorResultSourceAdapterPlanPreviewModel({
      schema,
      executable,
      comparator,
      produced,
      transition,
    });
  }

  function createSaveSlotEditSelectedSourceHandoffContractPreview(diagnostics) {
    const plan = createSaveSlotEditValidatorResultSourceAdapterPlanPreview(diagnostics);
    return createSaveSlotEditSelectedSourceHandoffContractPreviewModel({
      plan,
      text: text.saveEditSelectedSourceHandoffContract || {},
    });
  }

  function createSaveSlotEditAdapterRunnerPreflightPreview(diagnostics) {
    const handoff = createSaveSlotEditSelectedSourceHandoffContractPreview(diagnostics);
    const gate = createSaveSlotApplyGateChecklist(diagnostics);
    return createSaveSlotEditAdapterRunnerPreflightPreviewModel({
      handoff,
      gate,
      text: text.saveEditAdapterRunnerPreflight || {},
    });
  }

  function createSaveSlotEditConfirmationSourceSelectionContractPreview(diagnostics) {
    const preflight = createSaveSlotEditAdapterRunnerPreflightPreview(diagnostics);
    const gate = createSaveSlotApplyGateChecklist(diagnostics);
    return createSaveSlotEditConfirmationSourceSelectionContractPreviewModel({
      preflight,
      gate,
      text: text.saveEditConfirmationSourceSelectionContract || {},
    });
  }

  function createSaveSlotEditConfirmationInputShellContractPreview(diagnostics) {
    const sourceContract = createSaveSlotEditConfirmationSourceSelectionContractPreview(diagnostics);
    return createSaveSlotEditConfirmationInputShellContractPreviewModel({
      sourceContract,
      text: text.saveEditConfirmationInputShellContract || {},
    });
  }

  function createSaveSlotEditConfirmationMatchReviewSummaryPreview(diagnostics) {
    const inputShell = createSaveSlotEditConfirmationInputShellContractPreview(diagnostics);
    return createSaveSlotEditConfirmationMatchReviewSummaryPreviewModel({
      inputShell,
      text: text.saveEditConfirmationMatchReviewSummary || {},
    });
  }

  function createSaveSlotEditSubmitRunnerBlockerContractPreview(diagnostics) {
    const review = createSaveSlotEditConfirmationMatchReviewSummaryPreview(diagnostics);
    return createSaveSlotEditSubmitRunnerBlockerContractPreviewModel({
      review,
      text: text.saveEditSubmitRunnerBlockerContract || {},
    });
  }

  function createSaveSlotEditFinalApplyRunnerHandoffChecklistPreview(diagnostics) {
    const blockerContract = createSaveSlotEditSubmitRunnerBlockerContractPreview(diagnostics);
    return createSaveSlotEditFinalApplyRunnerHandoffChecklistPreviewModel({
      blockerContract,
      text: text.saveEditFinalApplyRunnerHandoffChecklist || {},
    });
  }

  function createSaveSlotEditApplyRunnerPayloadShapePreview(diagnostics) {
    const handoff = createSaveSlotEditFinalApplyRunnerHandoffChecklistPreview(diagnostics);
    const gate = createSaveSlotApplyGateChecklist(diagnostics);
    return createSaveSlotEditApplyRunnerPayloadShapePreviewModel({
      handoff,
      gate,
      text: text.saveEditApplyRunnerPayloadShape || {},
    });
  }

  function createSaveSlotEditPayloadBridgeCompatibilitySummaryPreview(diagnostics) {
    const payload = createSaveSlotEditApplyRunnerPayloadShapePreview(diagnostics);
    const bridge = createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics);
    return createSaveSlotEditPayloadBridgeCompatibilitySummaryPreviewModel({
      payload,
      bridge,
      text: text.saveEditPayloadBridgeCompatibilitySummary || {},
    });
  }

  function createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics) {
    const schema = createSaveSlotEditValidatorResultSchemaPreview(diagnostics);
    const gate = createSaveSlotApplyGateChecklist(diagnostics);
    return createSaveSlotEditValidatorApplyGateBridgePreviewModel({
      schema,
      gate,
      text: text.saveEditValidatorApplyGateBridge || {},
    });
  }

  function createSaveSlotEditCompatibilityConfirmationRollupPreview(diagnostics) {
    const compatibility = createSaveSlotEditPayloadBridgeCompatibilitySummaryPreview(diagnostics);
    const bridge = createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics);
    const preflight = createSaveSlotEditValidatorConfirmationPreflightPreview(diagnostics);
    return createSaveSlotEditCompatibilityConfirmationRollupPreviewModel({
      compatibility,
      bridge,
      preflight,
      text: text.saveEditCompatibilityConfirmationRollup || {},
    });
  }

  function createSaveSlotEditValidatorConfirmationPreflightPreview(diagnostics) {
    const bridge = createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics);
    const gate = createSaveSlotApplyGateChecklist(diagnostics);
    return createSaveSlotEditValidatorConfirmationPreflightPreviewModel({
      bridge,
      gate,
      text: text.saveEditValidatorConfirmationPreflight || {},
    });
  }

  function createSaveSlotEditConfirmationInputContractPreview(diagnostics) {
    const preflight = createSaveSlotEditValidatorConfirmationPreflightPreview(diagnostics);
    return createSaveSlotEditConfirmationInputContractPreviewModel({
      preflight,
      text: text.saveEditConfirmationInputContract || {},
    });
  }

  function createSaveSlotEditConfirmationRunnerHandoffSummaryPreview(diagnostics) {
    const contract = createSaveSlotEditConfirmationInputContractPreview(diagnostics);
    const checkpoint = createSaveSlotEditWriterPayloadCheckpointPreview(diagnostics);
    return createSaveSlotEditConfirmationRunnerHandoffSummaryPreviewModel({
      contract,
      checkpoint,
      text: text.saveEditConfirmationRunnerHandoffSummary || {},
    });
  }

  function createSaveSlotEditWriterPayloadCheckpointPreview(diagnostics) {
    const contract = createSaveSlotEditConfirmationInputContractPreview(diagnostics);
    const draft = createDraftPayloadPreview(diagnostics);
    const recovery = createSaveSlotRecoveryRehearsalPreview(diagnostics, { skipApplyGate: true });
    return createSaveSlotEditWriterPayloadCheckpointPreviewModel({
      contract,
      draft,
      recovery,
      text: text.saveEditWriterPayloadCheckpoint || {},
    });
  }

  function createSaveSlotEditPostWriteRestoreContractPreview(diagnostics) {
    const checkpoint = createSaveSlotEditWriterPayloadCheckpointPreview(diagnostics);
    const recovery = createSaveSlotRecoveryRehearsalPreview(diagnostics, { skipApplyGate: true });
    return createSaveSlotEditPostWriteRestoreContractPreviewModel({
      checkpoint,
      recovery,
      text: text.saveEditPostWriteRestoreContract || {},
    });
  }

  function createSaveSlotEditWriterEnablementRiskSummary(diagnostics) {
    const restoreContract = createSaveSlotEditPostWriteRestoreContractPreview(diagnostics);
    return createSaveSlotEditWriterEnablementRiskSummaryModel({
      restoreContract,
      text: text.saveEditWriterEnablementRisk || {},
    });
  }

  function createSaveSlotRecoveryRehearsalPreview(diagnostics, previewOptions = {}) {
    const validation = createValidationPlan(diagnostics);
    const draft = createDraftPayloadPreview(diagnostics);
    const diff = createSaveSlotDraftDiffSummary(diagnostics);
    const gate = previewOptions.skipApplyGate
      ? { applyStatus: "blocked" }
      : createSaveSlotApplyGateChecklist(diagnostics, { skipRecovery: true });
    return createSaveSlotRecoveryRehearsalPreviewModel({
      diagnostics,
      keys: diagnosticKeys,
      validation,
      draft,
      diff,
      gate,
      text: text.saveRecovery || {},
    });
  }

  function createSaveSlotApplyGateChecklist(diagnostics, previewOptions = {}) {
    const validation = createValidationPlan(diagnostics);
    const draft = createDraftPayloadPreview(diagnostics);
    const diff = createSaveSlotDraftDiffSummary(diagnostics);
    const recovery = previewOptions.skipRecovery
      ? null
      : createSaveSlotRecoveryRehearsalPreview(diagnostics, { skipApplyGate: true });
    return createSaveSlotApplyGateChecklistModel({
      validation,
      draft,
      diff,
      recovery,
      text: text.saveApplyGate || {},
    });
  }

  return {
    createSaveSlotDraftDiffSummary,
    createSaveSlotEditInputSchemaPreview,
    createSaveSlotEditValidationMatrix,
    createSaveSlotEditValidationRuleDrilldown,
    createSaveSlotEditSamplePayloadPreview,
    createSaveSlotEditValidatorDryRunPlan,
    createSaveSlotEditValidatorRegistryContract,
    createSaveSlotEditValidatorResultSchemaPreview,
    createSaveSlotEditValidatorExecutableRegistry,
    createSaveSlotEditValidatorExecutableDryRunPreview,
    createSaveSlotEditProposedValueInjectorPreview,
    createSaveSlotEditDryRunSampleComparatorPreview,
    createSaveSlotEditSampleBridgeBlockerSummaryPreview,
    createSaveSlotEditProducedResultBridgeContractPreview,
    createSaveSlotEditBridgeTransitionChecklistPreview,
    createSaveSlotEditValidatorResultSourceAdapterPlanPreview,
    createSaveSlotEditSelectedSourceHandoffContractPreview,
    createSaveSlotEditAdapterRunnerPreflightPreview,
    createSaveSlotEditConfirmationSourceSelectionContractPreview,
    createSaveSlotEditConfirmationInputShellContractPreview,
    createSaveSlotEditConfirmationMatchReviewSummaryPreview,
    createSaveSlotEditSubmitRunnerBlockerContractPreview,
    createSaveSlotEditFinalApplyRunnerHandoffChecklistPreview,
    createSaveSlotEditApplyRunnerPayloadShapePreview,
    createSaveSlotEditPayloadBridgeCompatibilitySummaryPreview,
    createSaveSlotEditValidatorApplyGateBridgePreview,
    createSaveSlotEditCompatibilityConfirmationRollupPreview,
    createSaveSlotEditValidatorConfirmationPreflightPreview,
    createSaveSlotEditConfirmationInputContractPreview,
    createSaveSlotEditConfirmationRunnerHandoffSummaryPreview,
    createSaveSlotEditWriterPayloadCheckpointPreview,
    createSaveSlotEditPostWriteRestoreContractPreview,
    createSaveSlotEditWriterEnablementRiskSummary,
    createSaveSlotRecoveryRehearsalPreview,
    createSaveSlotApplyGateChecklist,
  };
}
