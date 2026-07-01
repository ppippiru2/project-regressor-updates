import { applyDomLocalization } from "../localization/domText.js?v=675";
import { getLocaleText, tf } from "../localization/index.js?v=675";
import { createMurimRetargetPreview } from "../ui/renderRetargetPreview.js?v=675";
import { createRetargetPreviewDetailRenderer } from "./retargetPreviewDetailAdapter.js?v=675";
import { normalizeRetargetKind } from "./retargetFilterModel.js?v=675";
import { createRetargetFilterStore } from "./retargetFilterStore.js?v=675";
import {
  createEditorAssetSectionsRenderer,
  createEditorBacklogCardsRenderer,
  createEditorPrototypeCardsRenderer,
  createEditorSaveKeyCardsRenderer,
} from "./editorOverviewListAdapter.js?v=675";
import {
  createEditorNavigationGroupsRenderer,
  createEditorPanelDetailShellRenderer,
} from "./editorShellAdapter.js?v=675&cachebust=675";
import { createEditorStatusLabelFormatter } from "./editorStatusLabels.js?v=675";
import { downloadJson } from "./editorDownload.js?v=675";
import { getEditorElements } from "./editorDomElements.js?v=675";
import { setElementText } from "./editorDomText.js?v=675";
import { renderEditorErrorPanel } from "./editorErrorPanel.js?v=675";
import { fetchEditorJson } from "./editorJsonLoader.js?v=675";
import { renderEditorMetricCard } from "./editorMetricView.js?v=675";
import {
  createInitialCollapsedEditorNavGroupIds,
  toggleEditorNavGroupCollapsed,
} from "./editorNavGroupState.js?v=675&cachebust=675";
import { createEditorPanelContentSections } from "./editorPanelContentSections.js?v=675";
import { findEditorPanelById, getEditorPanels, getInitialEditorPanelId } from "./editorPanelSelection.js?v=675";
import {
  scrollEditorBalanceCandidateSummaryIntoView,
  scrollEditorContentBulkPackageIntoView,
} from "./editorScrollTargets.js?v=675&cachebust=675";
import { renderEditorSummaryPanel } from "./editorSummaryPanel.js?v=675";
import { BALANCE_TUNING_DOMAIN_SUMMARIES, BALANCE_TUNING_GROUPS } from "../balance/balanceTuningRegistry.js?v=675";
import { createBalanceTuningPreviewRows } from "./balanceTuningPreview.js?v=675";
import { createBalanceTuningDetailRenderer } from "./balanceTuningDetailAdapter.js?v=675";
import {
  createActiveBalanceCandidateSummaryRenderer,
  createBalanceDomainSummariesRenderer,
  createBalanceTuningCandidatesRenderer,
} from "./balanceCandidateSummaryAdapter.js?v=675";
import {
  createBalanceGroupRowRenderer,
  createBalancePacingSnapshotRenderer,
  createBalanceRelatedChecksRenderer,
} from "./balanceRegistryDetailAdapter.js?v=675";
import {
  createBalanceFilterControlsRenderer,
  createEmptyBalanceRowsRenderer,
} from "./balanceFilterControlsAdapter.js?v=675";
import {
  createBalanceCandidateFilter,
  findBalanceTuningCandidate,
  matchesBalanceDetailFilter,
  normalizeBalanceScope,
  selectedBalanceTuningCandidate,
} from "./balanceFilterModel.js?v=675";
import { createBalanceDetailFilterStore } from "./balanceFilterStore.js?v=675";
import { createContentBulkPatchAutomationPlan } from "./contentBulkPatchAutomationPlan.js?v=675";
import { createContentBulkPatchAutomationPlanRenderer } from "./contentBulkPatchAutomationPlanAdapter.js?v=675";
import { createContentBulkPatchApplyGatePlan } from "./contentBulkPatchApplyGatePlan.js?v=675";
import { createContentBulkPatchApplyGatePlanRenderer } from "./contentBulkPatchApplyGatePlanAdapter.js?v=675";
import { createContentBulkPatchBackupPlan } from "./contentBulkPatchBackupPlan.js?v=675";
import { createContentBulkPatchBackupPlanRenderer } from "./contentBulkPatchBackupPlanAdapter.js?v=675";
import { createContentBulkPatchRestoreRehearsal } from "./contentBulkPatchRestoreRehearsal.js?v=675";
import { createContentBulkPatchRestoreRehearsalRenderer } from "./contentBulkPatchRestoreRehearsalAdapter.js?v=675";
import { createContentBulkPatchDryRunPreview } from "./contentBulkPatchDryRunImporter.js?v=675";
import { createContentBulkPatchDryRunRenderer } from "./contentBulkPatchDryRunAdapter.js?v=675";
import { createContentBulkPatchIntakeContract } from "./contentBulkPatchIntakeContract.js?v=675";
import { createContentBulkPatchIntakeContractRenderer } from "./contentBulkPatchIntakeContractAdapter.js?v=675";
import {
  createContentBulkPatchPackageAdapterPreview,
  createContentBulkPatchPackageAdapterTemplate,
} from "./contentBulkPatchPackageAdapter.js?v=675";
import { createContentBulkPatchPackageInputStore } from "./contentBulkPatchPackageInputStore.js?v=675";
import { createContentBulkPatchPackageAdapterPreviewRenderer } from "./contentBulkPatchPackageAdapterPreviewAdapter.js?v=675";
import { createContentBulkPackageOverview } from "./contentBulkPackageOverview.js?v=675";
import { createContentBulkPackageOverviewRenderer } from "./contentBulkPackageOverviewAdapter.js?v=675";
import { createContentBulkFilterControlsRenderer } from "./contentBulkFilterControlsAdapter.js?v=675";
import {
  CONTENT_BULK_DOMAIN_FILTERS,
  contentBulkActiveFilterSummary,
  contentBulkPatchDomainLabel,
  createContentBulkFilterCounts,
  matchesContentBulkFilterRow,
  normalizeContentBulkFilterDomain,
  normalizeContentBulkFilterState,
} from "./contentBulkFilterModel.js?v=675";
import { createContentBulkFilterStore } from "./contentBulkFilterStore.js?v=675";
import { createContentBulkFilteredCandidatePreview } from "./contentBulkFilteredCandidatePreview.js?v=675";
import { createContentBulkFilteredCandidatePreviewRenderer } from "./contentBulkFilteredCandidatePreviewAdapter.js?v=675";
import { createLootSkillBulkIntakePreview } from "./lootSkillBulkIntakePreview.js?v=675";
import { createLootSkillBulkIntakeRenderer } from "./lootSkillBulkIntakeAdapter.js?v=675";
import { createContentBulkPatchDiffExport } from "./contentBulkPatchDiffExport.js?v=675";
import { createContentBulkPatchDiffExportRenderer } from "./contentBulkPatchDiffExportAdapter.js?v=675";
import { createContentBulkPatchFilePatchDraft } from "./contentBulkPatchFilePatchDraft.js?v=675";
import { createContentBulkPatchFilePatchDraftRenderer } from "./contentBulkPatchFilePatchDraftAdapter.js?v=675";
import { createContentBulkPatchFilePatchDraftExport } from "./contentBulkPatchFilePatchDraftExport.js?v=675";
import { createContentBulkPatchFilePatchDraftExportRenderer } from "./contentBulkPatchFilePatchDraftExportAdapter.js?v=675";
import { createContentBulkPatchManualApplyChecklist } from "./contentBulkPatchManualApplyChecklist.js?v=675";
import { createContentBulkPatchManualApplyChecklistRenderer } from "./contentBulkPatchManualApplyChecklistAdapter.js?v=675";
import { createContentBulkPatchStagedImportPreview } from "./contentBulkPatchStagedImportPreview.js?v=675";
import { createContentBulkPatchStagedImportRenderer } from "./contentBulkPatchStagedImportAdapter.js?v=675";
import { createContentBulkMassApplyReadinessRenderer } from "./contentBulkMassApplyReadinessAdapter.js?v=675";
import { createContentBulkStagedApplyRehearsalRenderer } from "./contentBulkStagedApplyRehearsalAdapter.js?v=675";
import { createContentBulkDomainApplyReadinessRenderer } from "./contentBulkDomainApplyReadinessAdapter.js?v=675";
import { createTutorialIslandPacingSnapshot } from "./tutorialIslandPacingPreview.js?v=675";
import { createCombatVfxPlacementPreview } from "./combatVfxPlacementPreview.js?v=675";
import {
  createCombatVfxPlacementDetailRenderer,
  formatCombatVfxPlacement,
} from "./combatVfxPlacementAdapter.js?v=675";
import {
  COMBAT_VFX_CLASS_LABELS,
  COMBAT_VFX_DETAIL_TEXT,
  COMBAT_VFX_EFFECT_LABELS,
  COMBAT_VFX_GENDER_LABELS,
  COMBAT_VFX_SIGNAL_LABELS,
} from "./combatVfxPlacementText.js?v=675";
import {
  combatVfxMonsterSearchText,
  combatVfxPlayerSearchText,
  matchesCombatVfxFilter,
  normalizeCombatVfxKind,
} from "./combatVfxFilterModel.js?v=675";
import { createCombatVfxFilterStore } from "./combatVfxFilterStore.js?v=675";
import {
  createRuntimeVfxBulkIntakePreview,
  createRuntimeVfxBulkIntakeTemplate,
} from "./runtimeVfxBulkIntakePreview.js?v=675";
import { createRuntimeVfxBulkIntakeRenderer } from "./runtimeVfxBulkIntakeAdapter.js?v=675";
import { createMonsterCandidateRewardPreview } from "./monsterCandidateRewardPreview.js?v=675";
import { createMonsterCandidateRewardRenderer } from "./monsterCandidateRewardAdapter.js?v=675";
import { createMonsterCandidatePromotionChecklist } from "./monsterCandidatePromotionChecklist.js?v=675";
import { createMonsterCandidateLivePromotionPlan } from "./monsterCandidateLivePromotionPlan.js?v=675";
import {
  createMonsterCandidateLivePromotionPlanRenderer,
  createMonsterCandidatePromotionChecklistRenderer,
} from "./monsterCandidatePromotionAdapter.js?v=675";
import { createMonsterCandidateLivePatchDraft } from "./monsterCandidateLivePatchDraft.js?v=675";
import { createMonsterCandidateBulkPatchAutomationPreview } from "./monsterCandidateBulkPatchAutomation.js?v=675";
import {
  createMonsterCandidateBulkPatchAutomationRenderer,
  createMonsterCandidateLivePatchDraftRenderer,
} from "./monsterCandidatePatchAdapter.js?v=675";
import {
  createMonsterSpriteReadyConnectionPatchPlan,
  createMonsterSpriteReadyConnectionReview,
  createMonsterSpriteSlotReport,
} from "./monsterSpriteSlotReport.js?v=675";
import { MONSTER_SPRITE_REPORT_TEXT } from "./monsterSpriteSlotReportText.js?v=675";
import { createMonsterSpriteSlotReportRenderer } from "./monsterSpriteSlotReportAdapter.js?v=675";
import { createMonsterRuntimeIntegrationPreview } from "./monsterRuntimeIntegrationPreview.js?v=675";
import { createMonsterRuntimeIntegrationRenderer } from "./monsterRuntimeIntegrationAdapter.js?v=675";
import { createMonsterRuntimeBulkIntakePreview } from "./monsterRuntimeBulkIntakePreview.js?v=675";
import { createMonsterRuntimeBulkIntakeRenderer } from "./monsterRuntimeBulkIntakeAdapter.js?v=675";
import { createInitialPlayerSetupPreview } from "./initialPlayerSetupPreview.js?v=675";
import { createInitialPlayerSetupPreviewRenderer } from "./initialPlayerSetupPreviewAdapter.js?v=675";
import { createSaveSlotDiagnosticsPanelRenderer } from "./saveSlotDiagnosticsPanelAdapter.js?v=675";
import { createEditorSaveSummary } from "./editorSaveSummaryFactory.js?v=675&cachebust=675";
import {
  BALANCE_FILTER_STORAGE_KEY,
  COMBAT_VFX_FILTER_STORAGE_KEY,
  CONTENT_BULK_FILTER_STORAGE_KEY,
  CONTENT_BULK_PACKAGE_INPUT_STORAGE_KEY,
  EDITOR_SAVE_KEYS,
  RETARGET_FILTER_STORAGE_KEY,
  SAVE_SLOT_DIAGNOSTIC_KEYS,
  SAVE_SLOT_DIAGNOSTIC_NO_ACTIVE,
  SAVE_SLOT_DIAGNOSTIC_SLOT_IDS,
} from "./saveSlotDiagnosticKeys.js?v=675";
import { createSaveSlotDiagnosticFormatters } from "./saveSlotDiagnosticFormatters.js?v=675";
import { createSaveSlotDiagnosticsSectionRenderers } from "./saveSlotDiagnosticsSectionRendererRegistry.js?v=675";
import { createSaveSlotValidationPlan } from "./saveSlotValidationPlanModel.js?v=675";
import { createSaveSlotValidationPlanRenderer } from "./saveSlotValidationPlanAdapter.js?v=675";
import { createSaveSlotDraftPayloadPreview as createSaveSlotDraftPayloadPreviewModel } from "./saveSlotDraftPayloadModel.js?v=675";
import { createSaveSlotDraftPayloadRenderer } from "./saveSlotDraftPayloadAdapter.js?v=675";
import { createSaveSlotEditPreviewComposition } from "./saveSlotEditPreviewCompositionModel.js?v=675";
import { createSaveSlotDraftDiffSummaryRenderer } from "./saveSlotDraftDiffSummaryAdapter.js?v=675";
import { createSaveSlotApplyGateChecklistRenderer } from "./saveSlotApplyGateChecklistAdapter.js?v=675";
import { createSaveSlotRecoveryRehearsalRenderer } from "./saveSlotRecoveryRehearsalAdapter.js?v=675";
import { createSaveSlotEditInputSchemaRenderer } from "./saveSlotEditInputSchemaAdapter.js?v=675";
import { createSaveSlotEditValidationMatrixRenderer } from "./saveSlotEditValidationMatrixAdapter.js?v=675";
import { createSaveSlotEditRuleDrilldownRenderer } from "./saveSlotEditRuleDrilldownAdapter.js?v=675";
import { createSaveSlotEditSamplePayloadRenderer } from "./saveSlotEditSamplePayloadAdapter.js?v=675";
import { createSaveSlotEditValidatorDryRunRenderer } from "./saveSlotEditValidatorDryRunAdapter.js?v=675";
import { createSaveSlotEditValidatorRegistryRenderer } from "./saveSlotEditValidatorRegistryAdapter.js?v=675";
import { createSaveSlotEditValidatorResultRenderer } from "./saveSlotEditValidatorResultAdapter.js?v=675";
import { createSaveSlotEditValidatorExecutableDryRunRenderer } from "./saveSlotEditValidatorExecutableDryRunAdapter.js?v=675";
import { createSaveSlotEditProposedValueInjectorRenderer } from "./saveSlotEditProposedValueInjectorAdapter.js?v=675";
import { createSaveSlotEditDryRunSampleComparatorRenderer } from "./saveSlotEditDryRunSampleComparatorAdapter.js?v=675";
import { createSaveSlotEditSampleBridgeBlockerRenderer } from "./saveSlotEditSampleBridgeBlockerAdapter.js?v=675";
import { createSaveSlotEditProducedResultBridgeRenderer } from "./saveSlotEditProducedResultBridgeAdapter.js?v=675";
import { createSaveSlotEditBridgeTransitionRenderer } from "./saveSlotEditBridgeTransitionAdapter.js?v=675";
import { createSaveSlotEditValidatorResultSourceAdapterPlanRenderer } from "./saveSlotEditValidatorResultSourceAdapterPlanAdapter.js?v=675";
import { createSaveSlotEditSelectedSourceHandoffRenderer } from "./saveSlotEditSelectedSourceHandoffAdapter.js?v=675";
import { createSaveSlotEditAdapterRunnerPreflightRenderer } from "./saveSlotEditAdapterRunnerPreflightAdapter.js?v=675";
import { createSaveSlotEditConfirmationSourceSelectionRenderer } from "./saveSlotEditConfirmationSourceSelectionAdapter.js?v=675";
import { createSaveSlotEditConfirmationInputShellRenderer } from "./saveSlotEditConfirmationInputShellAdapter.js?v=675";
import { createSaveSlotEditConfirmationMatchReviewRenderer } from "./saveSlotEditConfirmationMatchReviewAdapter.js?v=675";
import { createSaveSlotEditSubmitRunnerBlockerRenderer } from "./saveSlotEditSubmitRunnerBlockerAdapter.js?v=675";
import { createSaveSlotEditFinalApplyRunnerHandoffRenderer } from "./saveSlotEditFinalApplyRunnerHandoffAdapter.js?v=675";
import { createSaveSlotEditApplyRunnerPayloadShapeRenderer } from "./saveSlotEditApplyRunnerPayloadShapeAdapter.js?v=675";
import { createSaveSlotEditPayloadBridgeCompatibilityRenderer } from "./saveSlotEditPayloadBridgeCompatibilityAdapter.js?v=675";
import { createSaveSlotEditValidatorApplyGateBridgeRenderer } from "./saveSlotEditValidatorApplyGateBridgeAdapter.js?v=675";
import { createSaveSlotEditCompatibilityConfirmationRollupRenderer } from "./saveSlotEditCompatibilityConfirmationRollupAdapter.js?v=675";
import { createSaveSlotEditValidatorConfirmationPreflightRenderer } from "./saveSlotEditValidatorConfirmationPreflightAdapter.js?v=675";
import { createSaveSlotEditConfirmationInputContractRenderer } from "./saveSlotEditConfirmationInputContractAdapter.js?v=675";
import { createSaveSlotEditConfirmationRunnerHandoffRenderer } from "./saveSlotEditConfirmationRunnerHandoffAdapter.js?v=675";
import { createSaveSlotEditWriterPayloadCheckpointRenderer } from "./saveSlotEditWriterPayloadCheckpointAdapter.js?v=675";
import { createSaveSlotEditPostWriteRestoreContractRenderer } from "./saveSlotEditPostWriteRestoreAdapter.js?v=675";
import { createSaveSlotEditWriterEnablementRiskRenderer } from "./saveSlotEditWriterEnablementRiskAdapter.js?v=675";
import {
  readEditorLocalStorageJson,
  removeEditorLocalStorageItem,
  writeEditorLocalStorageJson,
} from "./editorLocalStorage.js?v=675";

const EDITOR_VERSION = "675";
const MANIFEST_URL = `data/editor-manifest.json?v=${EDITOR_VERSION}`;
const BACKLOG_URL = `data/editor-backlog.json?v=${EDITOR_VERSION}`;
const LOCALE_TEXT = getLocaleText();
const EDITOR_TEXT = LOCALE_TEXT.editorPrep;
const EDITOR_PANEL_COLLAPSE_TEXT = LOCALE_TEXT.panels || {};
const EDITOR_STATUS_LABEL = createEditorStatusLabelFormatter({ labels: EDITOR_TEXT.status || {} });
const CONTENT_BULK_PATCH_PACKAGE_INPUT_STORE = createContentBulkPatchPackageInputStore({
  storageKey: CONTENT_BULK_PACKAGE_INPUT_STORAGE_KEY,
  readJson: readEditorLocalStorageJson,
  writeJson: writeEditorLocalStorageJson,
  removeItem: removeEditorLocalStorageItem,
});
const COMBAT_VFX_FILTER_STORE = createCombatVfxFilterStore({
  storageKey: COMBAT_VFX_FILTER_STORAGE_KEY,
  readJson: readEditorLocalStorageJson,
  writeJson: writeEditorLocalStorageJson,
  removeItem: removeEditorLocalStorageItem,
});
const CONTENT_BULK_FILTER_STORE = createContentBulkFilterStore({
  storageKey: CONTENT_BULK_FILTER_STORAGE_KEY,
  readJson: readEditorLocalStorageJson,
  writeJson: writeEditorLocalStorageJson,
  removeItem: removeEditorLocalStorageItem,
});
const renderLootSkillBulkIntakeSection = createLootSkillBulkIntakeRenderer({
  getFilter: () => contentBulkDetailFilter,
  matchesFilterRow: matchesContentBulkFilterRow,
});
const renderMonsterRuntimeBulkIntakeSection = createMonsterRuntimeBulkIntakeRenderer({
  getFilter: () => contentBulkDetailFilter,
  matchesFilterRow: matchesContentBulkFilterRow,
});
const renderRuntimeVfxBulkIntakeSection = createRuntimeVfxBulkIntakeRenderer({
  getFilter: () => contentBulkDetailFilter,
  matchesFilterRow: matchesContentBulkFilterRow,
  formatPlacement: (placement) => formatCombatVfxPlacement(placement),
});
const renderEditorAssetSectionsSection = createEditorAssetSectionsRenderer();
const renderEditorSaveKeyCardsSection = createEditorSaveKeyCardsRenderer();
const renderEditorBacklogCardsSection = createEditorBacklogCardsRenderer();
const renderEditorPrototypeCardsSection = createEditorPrototypeCardsRenderer();
const renderEditorNavigationGroupsSection = createEditorNavigationGroupsRenderer();
const renderEditorPanelDetailShellSection = createEditorPanelDetailShellRenderer();
const renderCombatVfxPlacementDetailSection = createCombatVfxPlacementDetailRenderer();
const renderBalanceTuningDetailSection = createBalanceTuningDetailRenderer();
const renderBalanceFilterControlsSection = createBalanceFilterControlsRenderer();
const renderEmptyBalanceRowsSection = createEmptyBalanceRowsRenderer();
const renderActiveBalanceCandidateSummarySection = createActiveBalanceCandidateSummaryRenderer();
const renderBalanceDomainSummariesSection = createBalanceDomainSummariesRenderer();
const renderBalanceTuningCandidatesSection = createBalanceTuningCandidatesRenderer();
const renderBalanceGroupRowSection = createBalanceGroupRowRenderer();
const renderBalancePacingSnapshotSection = createBalancePacingSnapshotRenderer();
const renderBalanceRelatedChecksSection = createBalanceRelatedChecksRenderer();
const renderRetargetPreviewDetailSection = createRetargetPreviewDetailRenderer({
  createPreview: createMurimRetargetPreview,
});
const renderContentBulkFilteredCandidatePreviewSection = createContentBulkFilteredCandidatePreviewRenderer();
const renderContentBulkPatchAutomationPlanSection = createContentBulkPatchAutomationPlanRenderer({
  getPlan: () => CONTENT_BULK_PATCH_AUTOMATION_PLAN,
});
const renderContentBulkPatchIntakeContractSection = createContentBulkPatchIntakeContractRenderer({
  getContract: () => CONTENT_BULK_PATCH_INTAKE_CONTRACT,
});
const renderContentBulkFilterControlsSection = createContentBulkFilterControlsRenderer({
  getFilter: () => contentBulkDetailFilter,
  getDomainFilters: () => CONTENT_BULK_DOMAIN_FILTERS,
});
const renderContentBulkPackageOverviewSection = createContentBulkPackageOverviewRenderer({
  renderFilterControls: (text, counts) => renderContentBulkFilterControlsSection(text, counts),
});
const renderContentBulkPatchPackageAdapterPreviewSection = createContentBulkPatchPackageAdapterPreviewRenderer({
  getInput: () => contentBulkPatchPackageInput,
  getParseError: () => contentBulkPatchPackageParseError,
  isMappingVisible: (mapping, text = {}) => matchesContentBulkFilterRow(contentBulkDetailFilter, Number(mapping.rowCount || 0) > 0 ? "active" : "empty", [
    mapping,
    contentBulkPatchDomainLabel(mapping.domainId, text),
  ], [mapping.domainId]),
});
const renderContentBulkMassApplyReadinessSection = createContentBulkMassApplyReadinessRenderer({
  dryRun: () => CONTENT_BULK_PATCH_DRY_RUN_PREVIEW,
  stagedImport: () => CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW,
  applyGate: () => contentBulkPatchApplyGatePlan,
  backupPlan: () => contentBulkPatchBackupPlan,
  restoreRehearsal: () => contentBulkPatchRestoreRehearsal,
});
const renderContentBulkStagedApplyRehearsalSection = createContentBulkStagedApplyRehearsalRenderer({
  stagedImport: () => CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW,
  filePatchDraftExport: () => contentBulkPatchFilePatchDraftExport,
  backupPlan: () => contentBulkPatchBackupPlan,
  restoreRehearsal: () => contentBulkPatchRestoreRehearsal,
});
const renderContentBulkDomainApplyReadinessSection = createContentBulkDomainApplyReadinessRenderer({
  dryRun: () => CONTENT_BULK_PATCH_DRY_RUN_PREVIEW,
  stagedImport: () => CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW,
  filePatchDraftExport: () => contentBulkPatchFilePatchDraftExport,
  backupPlan: () => contentBulkPatchBackupPlan,
  restoreRehearsal: () => contentBulkPatchRestoreRehearsal,
  getFilter: () => contentBulkDetailFilter,
  activeFilter: contentBulkActiveFilterSummary,
  matchesFilterRow: matchesContentBulkFilterRow,
  domainLabel: (id, text) => contentBulkPatchDomainLabel(id, text),
});
const renderContentBulkPatchApplyGatePlanSection = createContentBulkPatchApplyGatePlanRenderer({
  getPlan: () => contentBulkPatchApplyGatePlan,
});
const renderContentBulkPatchBackupPlanSection = createContentBulkPatchBackupPlanRenderer({
  getPlan: () => contentBulkPatchBackupPlan,
});
const renderContentBulkPatchRestoreRehearsalSection = createContentBulkPatchRestoreRehearsalRenderer({
  getRehearsal: () => contentBulkPatchRestoreRehearsal,
});
const renderMonsterCandidateRewardSection = createMonsterCandidateRewardRenderer({
  getPreview: () => MONSTER_CANDIDATE_REWARD_PREVIEW,
});
const renderMonsterCandidatePromotionChecklistSection = createMonsterCandidatePromotionChecklistRenderer({
  getChecklist: () => MONSTER_CANDIDATE_PROMOTION_CHECKLIST,
});
const renderMonsterCandidateLivePromotionPlanSection = createMonsterCandidateLivePromotionPlanRenderer({
  getPlan: () => MONSTER_CANDIDATE_LIVE_PROMOTION_PLAN,
});
const renderMonsterCandidateLivePatchDraftSection = createMonsterCandidateLivePatchDraftRenderer({
  getDraft: () => MONSTER_CANDIDATE_LIVE_PATCH_DRAFT,
});
const renderMonsterCandidateBulkPatchAutomationSection = createMonsterCandidateBulkPatchAutomationRenderer({
  getPreview: () => MONSTER_CANDIDATE_BULK_PATCH_AUTOMATION,
});
const renderMonsterSpriteSlotReportSection = createMonsterSpriteSlotReportRenderer({
  getReport: () => MONSTER_SPRITE_SLOT_REPORT,
  getReadiness: () => manifest?.monsterSpriteSlotReadiness || {},
  getPlan: () => MONSTER_SPRITE_READY_CONNECTION_PLAN,
  getReview: () => MONSTER_SPRITE_READY_CONNECTION_REVIEW,
});
const renderMonsterRuntimeIntegrationSection = createMonsterRuntimeIntegrationRenderer({
  getPreview: () => MONSTER_RUNTIME_INTEGRATION_PREVIEW,
});
const renderInitialPlayerSetupPreviewSection = createInitialPlayerSetupPreviewRenderer({
  getPreview: () => INITIAL_PLAYER_SETUP_PREVIEW,
});
const renderContentBulkPatchManualApplyChecklistSection = createContentBulkPatchManualApplyChecklistRenderer({
  getChecklist: () => CONTENT_BULK_PATCH_MANUAL_APPLY_CHECKLIST,
});
const renderContentBulkPatchDiffExportSection = createContentBulkPatchDiffExportRenderer({
  getPreview: () => CONTENT_BULK_PATCH_DIFF_EXPORT,
});
const renderContentBulkPatchStagedImportSection = createContentBulkPatchStagedImportRenderer({
  getPreview: () => CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW,
});
const renderContentBulkPatchDryRunSection = createContentBulkPatchDryRunRenderer({
  getPreview: () => CONTENT_BULK_PATCH_DRY_RUN_PREVIEW,
});
const renderContentBulkPatchFilePatchDraftSection = createContentBulkPatchFilePatchDraftRenderer({
  getDraft: () => contentBulkPatchFilePatchDraftExport.draft || CONTENT_BULK_PATCH_FILE_PATCH_DRAFT,
  backupPlan: () => contentBulkPatchBackupPlan,
  restoreRehearsal: () => contentBulkPatchRestoreRehearsal,
});
const renderContentBulkPatchFilePatchDraftExportSection = createContentBulkPatchFilePatchDraftExportRenderer({
  getExport: () => contentBulkPatchFilePatchDraftExport,
  backupPlan: () => contentBulkPatchBackupPlan,
  restoreRehearsal: () => contentBulkPatchRestoreRehearsal,
});
const BALANCE_DETAIL_FILTER_STORE = createBalanceDetailFilterStore({
  storageKey: BALANCE_FILTER_STORAGE_KEY,
  groups: BALANCE_TUNING_GROUPS,
  readJson: readEditorLocalStorageJson,
  writeJson: writeEditorLocalStorageJson,
  removeItem: removeEditorLocalStorageItem,
});
const SAVE_SLOT_DIAGNOSTIC_FORMATTERS = createSaveSlotDiagnosticFormatters({
  text: EDITOR_TEXT.saveDiagnostics || {},
  locale: EDITOR_TEXT.locale,
});
const SAVE_SLOT_EDIT_PREVIEW_COMPOSITION = createSaveSlotEditPreviewComposition({
  text: EDITOR_TEXT,
  translate: tf,
  diagnosticKeys: SAVE_SLOT_DIAGNOSTIC_KEYS,
  createDraftPayloadPreview: createSaveSlotDraftPayloadPreview,
  createValidationPlan: createSaveSlotValidationPlan,
});
const renderSaveSlotValidationPlanSection = createSaveSlotValidationPlanRenderer({
  text: EDITOR_TEXT.saveValidation || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createPlan: createSaveSlotValidationPlan,
});
const renderSaveSlotDraftPayloadSection = createSaveSlotDraftPayloadRenderer({
  text: EDITOR_TEXT.saveDraft || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createPreview: createSaveSlotDraftPayloadPreview,
});
const renderSaveSlotDraftDiffSummarySection = createSaveSlotDraftDiffSummaryRenderer({
  text: EDITOR_TEXT.saveDraftDiff || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createDiff: createSaveSlotDraftDiffSummary,
});
const renderSaveSlotApplyGateChecklistSection = createSaveSlotApplyGateChecklistRenderer({
  text: EDITOR_TEXT.saveApplyGate || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createGate: createSaveSlotApplyGateChecklist,
});
const renderSaveSlotRecoveryRehearsalSection = createSaveSlotRecoveryRehearsalRenderer({
  text: EDITOR_TEXT.saveRecovery || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createRehearsal: createSaveSlotRecoveryRehearsalPreview,
});
const renderSaveSlotEditSampleBridgeBlockerSection = createSaveSlotEditSampleBridgeBlockerRenderer({
  text: EDITOR_TEXT.saveEditSampleBridgeBlockerSummary || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createSummary: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditSampleBridgeBlockerSummaryPreview(diagnostics),
});
const renderSaveSlotEditProducedResultBridgeSection = createSaveSlotEditProducedResultBridgeRenderer({
  text: EDITOR_TEXT.saveEditProducedResultBridgeContract || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createContract: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditProducedResultBridgeContractPreview(diagnostics),
});
const renderSaveSlotEditBridgeTransitionSection = createSaveSlotEditBridgeTransitionRenderer({
  text: EDITOR_TEXT.saveEditProducedResultBridgeTransitionChecklist || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createChecklist: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditBridgeTransitionChecklistPreview(diagnostics),
});
const renderSaveSlotEditValidatorResultSourceAdapterSection = createSaveSlotEditValidatorResultSourceAdapterPlanRenderer({
  text: EDITOR_TEXT.saveEditValidatorResultSourceAdapterPlan || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createPlan: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditValidatorResultSourceAdapterPlanPreview(diagnostics),
});
const renderSaveSlotEditSelectedSourceHandoffSection = createSaveSlotEditSelectedSourceHandoffRenderer({
  text: EDITOR_TEXT.saveEditSelectedSourceHandoffContract || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createContract: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditSelectedSourceHandoffContractPreview(diagnostics),
});
const renderSaveSlotEditAdapterRunnerPreflightSection = createSaveSlotEditAdapterRunnerPreflightRenderer({
  text: EDITOR_TEXT.saveEditAdapterRunnerPreflight || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createPreflight: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditAdapterRunnerPreflightPreview(diagnostics),
});
const renderSaveSlotEditConfirmationSourceSelectionSection = createSaveSlotEditConfirmationSourceSelectionRenderer({
  text: EDITOR_TEXT.saveEditConfirmationSourceSelectionContract || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createContract: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditConfirmationSourceSelectionContractPreview(diagnostics),
});
const renderSaveSlotEditConfirmationInputShellSection = createSaveSlotEditConfirmationInputShellRenderer({
  text: EDITOR_TEXT.saveEditConfirmationInputShellContract || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createContract: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditConfirmationInputShellContractPreview(diagnostics),
});
const renderSaveSlotEditConfirmationMatchReviewSection = createSaveSlotEditConfirmationMatchReviewRenderer({
  text: EDITOR_TEXT.saveEditConfirmationMatchReviewSummary || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createSummary: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditConfirmationMatchReviewSummaryPreview(diagnostics),
});
const renderSaveSlotEditSubmitRunnerBlockerSection = createSaveSlotEditSubmitRunnerBlockerRenderer({
  text: EDITOR_TEXT.saveEditSubmitRunnerBlockerContract || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createContract: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditSubmitRunnerBlockerContractPreview(diagnostics),
});
const renderSaveSlotEditFinalApplyRunnerHandoffSection = createSaveSlotEditFinalApplyRunnerHandoffRenderer({
  text: EDITOR_TEXT.saveEditFinalApplyRunnerHandoffChecklist || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createChecklist: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditFinalApplyRunnerHandoffChecklistPreview(diagnostics),
});
const renderSaveSlotEditApplyRunnerPayloadShapeSection = createSaveSlotEditApplyRunnerPayloadShapeRenderer({
  text: EDITOR_TEXT.saveEditApplyRunnerPayloadShape || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createPreview: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditApplyRunnerPayloadShapePreview(diagnostics),
});
const renderSaveSlotEditPayloadBridgeCompatibilitySection = createSaveSlotEditPayloadBridgeCompatibilityRenderer({
  text: EDITOR_TEXT.saveEditPayloadBridgeCompatibilitySummary || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createSummary: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditPayloadBridgeCompatibilitySummaryPreview(diagnostics),
});
const renderSaveSlotEditValidatorApplyGateBridgeSection = createSaveSlotEditValidatorApplyGateBridgeRenderer({
  text: EDITOR_TEXT.saveEditValidatorApplyGateBridge || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createBridge: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics),
});
const renderSaveSlotEditInputSchemaSection = createSaveSlotEditInputSchemaRenderer({
  text: EDITOR_TEXT.saveEditInput || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createSchema: (diagnostics) => createSaveSlotEditInputSchemaPreview(diagnostics),
});
const renderSaveSlotEditValidationMatrixSection = createSaveSlotEditValidationMatrixRenderer({
  text: EDITOR_TEXT.saveEditMatrix || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createMatrix: (diagnostics) => createSaveSlotEditValidationMatrix(diagnostics),
});
const renderSaveSlotEditRuleDrilldownSection = createSaveSlotEditRuleDrilldownRenderer({
  text: EDITOR_TEXT.saveEditRuleDrilldown || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createDrilldown: (diagnostics) => createSaveSlotEditValidationRuleDrilldown(diagnostics),
});
const renderSaveSlotEditSamplePayloadSection = createSaveSlotEditSamplePayloadRenderer({
  text: EDITOR_TEXT.saveEditSamplePayload || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createPreview: (diagnostics) => createSaveSlotEditSamplePayloadPreview(diagnostics),
});
const renderSaveSlotEditValidatorDryRunSection = createSaveSlotEditValidatorDryRunRenderer({
  text: EDITOR_TEXT.saveEditDryRun || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createPlan: (diagnostics) => createSaveSlotEditValidatorDryRunPlan(diagnostics),
});
const renderSaveSlotEditValidatorRegistrySection = createSaveSlotEditValidatorRegistryRenderer({
  text: EDITOR_TEXT.saveEditValidatorRegistry || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createContract: (diagnostics) => createSaveSlotEditValidatorRegistryContract(diagnostics),
});
const renderSaveSlotEditValidatorResultSchemaSection = createSaveSlotEditValidatorResultRenderer({
  text: EDITOR_TEXT.saveEditValidatorResult || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createSchema: (diagnostics) => createSaveSlotEditValidatorResultSchemaPreview(diagnostics),
});
const renderSaveSlotEditValidatorExecutableDryRunSection = createSaveSlotEditValidatorExecutableDryRunRenderer({
  text: EDITOR_TEXT.saveEditValidatorExecutableDryRun || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createPreview: (diagnostics) => createSaveSlotEditValidatorExecutableDryRunPreview(diagnostics),
});
const renderSaveSlotEditProposedValueInjectorSection = createSaveSlotEditProposedValueInjectorRenderer({
  text: EDITOR_TEXT.saveEditProposedValueInjector || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createPreview: (diagnostics) => createSaveSlotEditProposedValueInjectorPreview(diagnostics),
});
const renderSaveSlotEditDryRunSampleComparatorSection = createSaveSlotEditDryRunSampleComparatorRenderer({
  text: EDITOR_TEXT.saveEditDryRunSampleComparator || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createPreview: (diagnostics) => createSaveSlotEditDryRunSampleComparatorPreview(diagnostics),
});
const renderSaveSlotEditCompatibilityConfirmationRollupPreview = createSaveSlotEditCompatibilityConfirmationRollupRenderer({
  text: EDITOR_TEXT.saveEditCompatibilityConfirmationRollup || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createRollup: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditCompatibilityConfirmationRollupPreview(diagnostics),
});
const renderSaveSlotEditValidatorConfirmationPreflightPreview = createSaveSlotEditValidatorConfirmationPreflightRenderer({
  text: EDITOR_TEXT.saveEditValidatorConfirmationPreflight || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createPreflight: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditValidatorConfirmationPreflightPreview(diagnostics),
});
const renderSaveSlotEditConfirmationInputContractPreview = createSaveSlotEditConfirmationInputContractRenderer({
  text: EDITOR_TEXT.saveEditConfirmationInputContract || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createContract: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditConfirmationInputContractPreview(diagnostics),
});
const renderSaveSlotEditConfirmationRunnerHandoffSummaryPreview = createSaveSlotEditConfirmationRunnerHandoffRenderer({
  text: EDITOR_TEXT.saveEditConfirmationRunnerHandoffSummary || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createSummary: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditConfirmationRunnerHandoffSummaryPreview(diagnostics),
});
const renderSaveSlotEditWriterPayloadCheckpointPreview = createSaveSlotEditWriterPayloadCheckpointRenderer({
  text: EDITOR_TEXT.saveEditWriterPayloadCheckpoint || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createReview: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditWriterPayloadCheckpointPreview(diagnostics),
});
const renderSaveSlotEditPostWriteRestoreContractPreview = createSaveSlotEditPostWriteRestoreContractRenderer({
  text: EDITOR_TEXT.saveEditPostWriteRestoreContract || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createContract: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditPostWriteRestoreContractPreview(diagnostics),
});
const renderSaveSlotEditWriterEnablementRiskSummary = createSaveSlotEditWriterEnablementRiskRenderer({
  text: EDITOR_TEXT.saveEditWriterEnablementRisk || {},
  translate: tf,
  metricCard: renderEditorMetricCard,
  statusLabel: SAVE_SLOT_DIAGNOSTIC_FORMATTERS.statusLabel,
  createSummary: (diagnostics) => SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditWriterEnablementRiskSummary(diagnostics),
});
const SAVE_SLOT_DIAGNOSTIC_SECTION_RENDERERS = createSaveSlotDiagnosticsSectionRenderers({
  validationPlan: renderSaveSlotValidationPlan,
  draftPayload: renderSaveSlotDraftPayloadPreview,
  draftDiff: renderSaveSlotDraftDiffSummary,
  applyGate: renderSaveSlotApplyGateChecklist,
  recoveryRehearsal: renderSaveSlotRecoveryRehearsalPreview,
  editInputSchema: renderSaveSlotEditInputSchemaPreview,
  validationMatrix: renderSaveSlotEditValidationMatrix,
  ruleDrilldown: renderSaveSlotEditValidationRuleDrilldown,
  samplePayload: renderSaveSlotEditSamplePayloadPreview,
  validatorDryRun: renderSaveSlotEditValidatorDryRunPlan,
  validatorRegistry: renderSaveSlotEditValidatorRegistryContract,
  validatorResultSchema: renderSaveSlotEditValidatorResultSchemaPreview,
  validatorExecutableDryRun: renderSaveSlotEditValidatorExecutableDryRunPreview,
  proposedValueInjector: renderSaveSlotEditProposedValueInjectorPreview,
  dryRunSampleComparator: renderSaveSlotEditDryRunSampleComparatorPreview,
  sampleBridgeBlocker: renderSaveSlotEditSampleBridgeBlockerSummaryPreview,
  producedResultBridge: renderSaveSlotEditProducedResultBridgeContractPreview,
  bridgeTransition: renderSaveSlotEditBridgeTransitionChecklistPreview,
  validatorSourceAdapter: renderSaveSlotEditValidatorResultSourceAdapterPlanPreview,
  selectedSourceHandoff: renderSaveSlotEditSelectedSourceHandoffContractPreview,
  adapterRunnerPreflight: renderSaveSlotEditAdapterRunnerPreflightPreview,
  confirmationSourceSelection: renderSaveSlotEditConfirmationSourceSelectionContractPreview,
  confirmationInputShell: renderSaveSlotEditConfirmationInputShellContractPreview,
  confirmationMatchReview: renderSaveSlotEditConfirmationMatchReviewSummaryPreview,
  submitRunnerBlocker: renderSaveSlotEditSubmitRunnerBlockerContractPreview,
  finalApplyRunnerHandoff: renderSaveSlotEditFinalApplyRunnerHandoffChecklistPreview,
  applyRunnerPayload: renderSaveSlotEditApplyRunnerPayloadShapePreview,
  payloadBridgeCompatibility: renderSaveSlotEditPayloadBridgeCompatibilitySummaryPreview,
  validatorApplyGateBridge: renderSaveSlotEditValidatorApplyGateBridgePreview,
  compatibilityConfirmationRollup: renderSaveSlotEditCompatibilityConfirmationRollupPreview,
  validatorConfirmationPreflight: renderSaveSlotEditValidatorConfirmationPreflightPreview,
  confirmationInputContract: renderSaveSlotEditConfirmationInputContractPreview,
  confirmationRunnerHandoff: renderSaveSlotEditConfirmationRunnerHandoffSummaryPreview,
  writerPayloadCheckpoint: renderSaveSlotEditWriterPayloadCheckpointPreview,
  postwriteRestore: renderSaveSlotEditPostWriteRestoreContractPreview,
  writerEnablementRisk: renderSaveSlotEditWriterEnablementRiskSummary,
});
const renderSaveSlotDiagnostics = createSaveSlotDiagnosticsPanelRenderer({
  keys: SAVE_SLOT_DIAGNOSTIC_KEYS,
  slotIds: SAVE_SLOT_DIAGNOSTIC_SLOT_IDS,
  noActiveSlot: SAVE_SLOT_DIAGNOSTIC_NO_ACTIVE,
  text: EDITOR_TEXT.saveDiagnostics || {},
  locale: EDITOR_TEXT.locale,
  translate: tf,
  renderMetricCard: renderEditorMetricCard,
  formatters: SAVE_SLOT_DIAGNOSTIC_FORMATTERS,
  sectionRenderers: SAVE_SLOT_DIAGNOSTIC_SECTION_RENDERERS,
});
const BALANCE_TUNING_PREVIEW_BY_ID = new Map(
  createBalanceTuningPreviewRows(BALANCE_TUNING_GROUPS).map((row) => [row.id, row])
);
const CONTENT_BULK_PATCH_AUTOMATION_PLAN = createContentBulkPatchAutomationPlan();
const CONTENT_BULK_PATCH_INTAKE_CONTRACT = createContentBulkPatchIntakeContract();
const CONTENT_BULK_PATCH_DRY_RUN_PREVIEW = createContentBulkPatchDryRunPreview();
const CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW = createContentBulkPatchStagedImportPreview();
const CONTENT_BULK_PATCH_DIFF_EXPORT = createContentBulkPatchDiffExport();
const CONTENT_BULK_PATCH_MANUAL_APPLY_CHECKLIST = createContentBulkPatchManualApplyChecklist();
const CONTENT_BULK_PATCH_FILE_PATCH_DRAFT = createContentBulkPatchFilePatchDraft();
const MONSTER_CANDIDATE_REWARD_PREVIEW = createMonsterCandidateRewardPreview();
const MONSTER_CANDIDATE_PROMOTION_CHECKLIST = createMonsterCandidatePromotionChecklist(MONSTER_CANDIDATE_REWARD_PREVIEW);
const MONSTER_CANDIDATE_LIVE_PROMOTION_PLAN = createMonsterCandidateLivePromotionPlan(MONSTER_CANDIDATE_PROMOTION_CHECKLIST);
const MONSTER_CANDIDATE_LIVE_PATCH_DRAFT = createMonsterCandidateLivePatchDraft(MONSTER_CANDIDATE_LIVE_PROMOTION_PLAN);
const MONSTER_CANDIDATE_BULK_PATCH_AUTOMATION = createMonsterCandidateBulkPatchAutomationPreview();
const COMBAT_VFX_PLACEMENT_PREVIEW = createCombatVfxPlacementPreview();
const INITIAL_PLAYER_SETUP_PREVIEW = createInitialPlayerSetupPreview();
const MONSTER_RUNTIME_INTEGRATION_PREVIEW = createMonsterRuntimeIntegrationPreview();
const MONSTER_RUNTIME_BULK_INTAKE_PREVIEW = createMonsterRuntimeBulkIntakePreview(MONSTER_RUNTIME_INTEGRATION_PREVIEW);
const RETARGET_FILTER_STORE = createRetargetFilterStore({
  storageKey: RETARGET_FILTER_STORAGE_KEY,
  readJson: readEditorLocalStorageJson,
  writeJson: writeEditorLocalStorageJson,
  removeItem: removeEditorLocalStorageItem,
  maxExpandedRows: 160,
});

let manifest = null;
let backlog = null;
let activePanelId = "";
let collapsedNavGroupIds = new Set();
const storedRetargetDetailFilter = RETARGET_FILTER_STORE.load();
let retargetDetailFilter = storedRetargetDetailFilter.filter;
const expandedRetargetRows = new Set(storedRetargetDetailFilter.expandedRows);
let balanceDetailFilter = BALANCE_DETAIL_FILTER_STORE.load();
let combatVfxDetailFilter = COMBAT_VFX_FILTER_STORE.load();
let contentBulkDetailFilter = CONTENT_BULK_FILTER_STORE.load();
let contentBulkPatchPackageInput = CONTENT_BULK_PATCH_PACKAGE_INPUT_STORE.load();
let contentBulkPatchPackageParseError = "";
let contentBulkPatchPackageAdapterPreview = createContentBulkPatchPackageAdapterPreviewFromInput();
let contentBulkPatchFilePatchDraftExport = createContentBulkPatchFilePatchDraftExportFromInput();
let contentBulkPatchApplyGatePlan = createContentBulkPatchApplyGatePlan(contentBulkPatchFilePatchDraftExport);
let contentBulkPatchBackupPlan = createContentBulkPatchBackupPlan(contentBulkPatchFilePatchDraftExport, contentBulkPatchApplyGatePlan);
let contentBulkPatchRestoreRehearsal = createContentBulkPatchRestoreRehearsal(contentBulkPatchBackupPlan);
const MONSTER_SPRITE_SLOT_REPORT = createMonsterSpriteSlotReport();
const MONSTER_SPRITE_READY_CONNECTION_PLAN = createMonsterSpriteReadyConnectionPatchPlan(MONSTER_SPRITE_SLOT_REPORT);
const MONSTER_SPRITE_READY_CONNECTION_REVIEW = createMonsterSpriteReadyConnectionReview(
  MONSTER_SPRITE_SLOT_REPORT,
  MONSTER_SPRITE_READY_CONNECTION_PLAN,
);

const elements = getEditorElements(document);

applyDomLocalization(document);
initEditor();

async function initEditor() {
  try {
    [manifest, backlog] = await Promise.all([
      fetchEditorJson(MANIFEST_URL),
      fetchEditorJson(BACKLOG_URL)
    ]);
    activePanelId = getInitialEditorPanelId(manifest);
    collapsedNavGroupIds = createInitialCollapsedEditorNavGroupIds(manifest.editorTheme?.navigationGroups || []);
    renderEditor();
    bindEvents();
  } catch (error) {
    renderEditorErrorPanel(elements, {
      text: EDITOR_TEXT,
      error,
    });
  }
}

function bindEvents() {
  elements.nav?.addEventListener("click", (event) => {
    const groupToggle = event.target.closest("[data-editor-nav-group-toggle]");
    if (groupToggle) {
      toggleCollapsedNavGroup(groupToggle.dataset.editorNavGroupToggle);
      renderNav();
      return;
    }
    const button = event.target.closest("[data-panel-id]");
    if (!button) return;
    activePanelId = button.dataset.panelId;
    renderNav();
    renderPanelDetail();
  });

  elements.refreshSaves?.addEventListener("click", renderSaveKeys);
  elements.exportSummary?.addEventListener("click", () => {
    downloadJson("project-regressor-save-summary.json", createSaveSummary());
  });
  elements.downloadManifest?.addEventListener("click", () => {
    downloadJson("project-regressor-editor-manifest.json", manifest);
  });
  elements.downloadBacklog?.addEventListener("click", () => {
    downloadJson("project-regressor-editor-backlog.json", backlog);
  });
  elements.panelDetail?.addEventListener("input", (event) => {
    const input = event.target.closest("[data-retarget-search]");
    if (input) {
      const cursor = input.selectionStart ?? input.value.length;
      retargetDetailFilter = {
        ...retargetDetailFilter,
        query: input.value
      };
      persistRetargetDetailFilter();
      renderPanelDetail();
      const nextInput = elements.panelDetail.querySelector("[data-retarget-search]");
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(cursor, cursor);
      }
      return;
    }
    const balanceInput = event.target.closest("[data-balance-search]");
    if (balanceInput) {
      const cursor = balanceInput.selectionStart ?? balanceInput.value.length;
      balanceDetailFilter = {
        ...balanceDetailFilter,
        query: balanceInput.value,
        candidateId: "",
        candidateLabel: "",
        candidateGroups: []
      };
      persistBalanceDetailFilter();
      renderPanelDetail();
      const nextInput = elements.panelDetail.querySelector("[data-balance-search]");
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(cursor, cursor);
      }
      return;
    }
    const combatVfxInput = event.target.closest("[data-combat-vfx-search]");
    if (combatVfxInput) {
      const cursor = combatVfxInput.selectionStart ?? combatVfxInput.value.length;
      combatVfxDetailFilter = {
        ...combatVfxDetailFilter,
        query: combatVfxInput.value
      };
      persistCombatVfxDetailFilter();
      renderPanelDetail();
      const nextInput = elements.panelDetail.querySelector("[data-combat-vfx-search]");
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(cursor, cursor);
      }
      return;
    }
    const contentBulkSearchInput = event.target.closest("[data-content-bulk-search]");
    if (contentBulkSearchInput) {
      const cursor = contentBulkSearchInput.selectionStart ?? contentBulkSearchInput.value.length;
      contentBulkDetailFilter = {
        ...contentBulkDetailFilter,
        query: contentBulkSearchInput.value
      };
      persistContentBulkDetailFilter();
      renderPanelDetail();
      const nextInput = elements.panelDetail.querySelector("[data-content-bulk-search]");
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(cursor, cursor);
      }
      return;
    }
    const packageTextarea = event.target.closest("[data-content-bulk-package-json]");
    if (packageTextarea) {
      contentBulkPatchPackageInput = {
        ...contentBulkPatchPackageInput,
        draftText: packageTextarea.value,
        parseError: ""
      };
      persistContentBulkPatchPackageInput();
    }
  });
  elements.panelDetail?.addEventListener("change", async (event) => {
    const fileInput = event.target.closest("[data-content-bulk-package-file]");
    if (!fileInput) return;
    const file = fileInput.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      contentBulkPatchPackageInput = {
        draftText: text,
        appliedText: text,
        sourceName: file.name,
        parseError: ""
      };
      persistContentBulkPatchPackageInput();
      refreshContentBulkPatchPackageAdapterPreview();
      renderPanelDetail();
      scrollContentBulkPackageIntoView();
    } catch (error) {
      contentBulkPatchPackageInput = {
        ...contentBulkPatchPackageInput,
        parseError: error?.message || "File read failed"
      };
      persistContentBulkPatchPackageInput();
      renderPanelDetail();
      scrollContentBulkPackageIntoView();
    }
  });
  elements.panelDetail?.addEventListener("click", (event) => {
    const packageApplyButton = event.target.closest("[data-content-bulk-package-apply]");
    if (packageApplyButton) {
      applyContentBulkPatchPackageInput();
      renderPanelDetail();
      scrollContentBulkPackageIntoView();
      return;
    }
    const packageSampleButton = event.target.closest("[data-content-bulk-package-sample]");
    if (packageSampleButton) {
      applyContentBulkPatchPackageSample();
      renderPanelDetail();
      scrollContentBulkPackageIntoView();
      return;
    }
    const packageResetButton = event.target.closest("[data-content-bulk-package-reset]");
    if (packageResetButton) {
      resetContentBulkPatchPackageInput();
      refreshContentBulkPatchPackageAdapterPreview();
      renderPanelDetail();
      scrollContentBulkPackageIntoView();
      return;
    }
    const packageTemplateButton = event.target.closest("[data-content-bulk-package-template]");
    if (packageTemplateButton) {
      downloadJson("project-regressor-content-bulk-package-template.json", createContentBulkPatchPackageAdapterTemplate());
      return;
    }
    const filePatchDraftExportButton = event.target.closest("[data-content-bulk-file-patch-export]");
    if (filePatchDraftExportButton) {
      downloadJson(
        contentBulkPatchFilePatchDraftExport.fileName || "project-regressor-content-bulk-file-patch-draft.json",
        contentBulkPatchFilePatchDraftExport.payload || {},
      );
      return;
    }
    const contentBulkFilterButton = event.target.closest("[data-content-bulk-filter]");
    if (contentBulkFilterButton) {
      contentBulkDetailFilter = {
        ...contentBulkDetailFilter,
        state: normalizeContentBulkFilterState(contentBulkFilterButton.dataset.contentBulkFilter)
      };
      persistContentBulkDetailFilter();
      renderPanelDetail();
      return;
    }
    const contentBulkDomainButton = event.target.closest("[data-content-bulk-domain]");
    if (contentBulkDomainButton) {
      contentBulkDetailFilter = {
        ...contentBulkDetailFilter,
        domain: normalizeContentBulkFilterDomain(contentBulkDomainButton.dataset.contentBulkDomain)
      };
      persistContentBulkDetailFilter();
      renderPanelDetail();
      return;
    }
    const contentBulkSearchResetButton = event.target.closest("[data-content-bulk-search-reset]");
    if (contentBulkSearchResetButton) {
      contentBulkDetailFilter = {
        ...contentBulkDetailFilter,
        query: ""
      };
      persistContentBulkDetailFilter();
      renderPanelDetail();
      return;
    }
    const combatVfxResetButton = event.target.closest("[data-combat-vfx-reset]");
    if (combatVfxResetButton) {
      resetCombatVfxDetailFilter();
      renderPanelDetail();
      return;
    }
    const combatVfxKindButton = event.target.closest("[data-combat-vfx-kind]");
    if (combatVfxKindButton) {
      combatVfxDetailFilter = {
        ...combatVfxDetailFilter,
        kind: normalizeCombatVfxKind(combatVfxKindButton.dataset.combatVfxKind)
      };
      persistCombatVfxDetailFilter();
      renderPanelDetail();
      return;
    }
    const balanceCandidateButton = event.target.closest("[data-balance-candidate]");
    if (balanceCandidateButton) {
      applyBalanceCandidateFilter(balanceCandidateButton.dataset.balanceCandidate);
      renderPanelDetail();
      scrollBalanceCandidateSummaryIntoView();
      return;
    }
    const balanceResetButton = event.target.closest("[data-balance-reset]");
    if (balanceResetButton) {
      resetBalanceDetailFilter();
      renderPanelDetail();
      return;
    }
    const balanceScopeButton = event.target.closest("[data-balance-scope]");
    if (balanceScopeButton) {
      balanceDetailFilter = {
        ...balanceDetailFilter,
        scope: normalizeBalanceScope(balanceScopeButton.dataset.balanceScope),
        candidateId: "",
        candidateLabel: "",
        candidateGroups: []
      };
      persistBalanceDetailFilter();
      renderPanelDetail();
      return;
    }
    const resetButton = event.target.closest("[data-retarget-reset]");
    if (resetButton) {
      resetRetargetDetailFilter();
      renderPanelDetail();
      return;
    }
    const filterButton = event.target.closest("[data-retarget-kind]");
    if (filterButton) {
      retargetDetailFilter = {
        ...retargetDetailFilter,
        kind: normalizeRetargetKind(filterButton.dataset.retargetKind)
      };
      persistRetargetDetailFilter();
      renderPanelDetail();
      return;
    }
    const toggleButton = event.target.closest("[data-retarget-toggle]");
    if (!toggleButton) return;
    const rowId = toggleButton.dataset.retargetToggle;
    if (!rowId) return;
    if (expandedRetargetRows.has(rowId)) {
      expandedRetargetRows.delete(rowId);
    } else {
      expandedRetargetRows.add(rowId);
    }
    persistRetargetDetailFilter();
    renderPanelDetail();
  });
}

function renderEditor() {
  renderEditorSummaryPanel(elements, {
    manifest,
    backlog,
    text: EDITOR_TEXT,
    translate: tf,
    balanceGroups: BALANCE_TUNING_GROUPS,
    combatVfxPreview: COMBAT_VFX_PLACEMENT_PREVIEW,
    combatVfxText: COMBAT_VFX_DETAIL_TEXT,
  });
  renderNav();
  renderPanelDetail();
  renderAssets();
  renderSaveKeys();
  renderPrototypeList();
  renderBacklog();
}

function renderNav() {
  elements.nav.innerHTML = renderEditorNavigationGroupsSection({
    groups: manifest.editorTheme?.navigationGroups || [],
    panels: getEditorPanels(manifest),
    activePanelId,
    collapsedGroupIds: collapsedNavGroupIds,
    collapseLabels: EDITOR_PANEL_COLLAPSE_TEXT,
    statusLabel: EDITOR_STATUS_LABEL,
  });
}

function toggleCollapsedNavGroup(groupId) {
  collapsedNavGroupIds = toggleEditorNavGroupCollapsed(collapsedNavGroupIds, groupId);
}

function renderPanelDetail() {
  const panel = findEditorPanelById(manifest, activePanelId);
  if (!panel) {
    elements.panelDetail.innerHTML = renderEditorPanelDetailShellSection({
      panel,
      noPanelText: EDITOR_TEXT.noPanel,
    });
    return;
  }
  elements.panelDetail.innerHTML = renderEditorPanelDetailShellSection({
    panel,
    noPanelText: EDITOR_TEXT.noPanel,
    detailTitles: EDITOR_TEXT.detailTitles || {},
    emptyValue: EDITOR_TEXT.save.empty,
    statusLabel: EDITOR_STATUS_LABEL,
    contentSections: createEditorPanelContentSections(panel, {
      retargetDetail: renderRetargetPreviewDetail,
      balanceTuningDetail: renderBalanceTuningDetail,
      combatVfxDetail: renderCombatVfxPlacementDetail,
      initialPlayerSetup: renderInitialPlayerSetupPreview,
      monsterSpriteReport: renderMonsterSpriteSlotReport,
      monsterRuntimePreview: renderMonsterRuntimeIntegrationPreview,
      saveSlotDiagnostics: renderSaveSlotDiagnostics,
    }),
  });
}

function renderInitialPlayerSetupPreview() {
  return renderInitialPlayerSetupPreviewSection(EDITOR_TEXT.initialPlayerSetup || {});
}

function renderMonsterRuntimeIntegrationPreview() {
  const detailText = EDITOR_TEXT.monsterRuntimeIntegrationPreview || {};
  return renderMonsterRuntimeIntegrationSection(detailText);
}

function renderMonsterSpriteSlotReport() {
  const detailText = {
    ...MONSTER_SPRITE_REPORT_TEXT,
    ...(EDITOR_TEXT.monsterSpriteSlotReport || {})
  };
  return renderMonsterSpriteSlotReportSection(detailText);
}

function renderCombatVfxPlacementDetail() {
  const detailText = {
    ...COMBAT_VFX_DETAIL_TEXT,
    ...(EDITOR_TEXT.combatVfxPlacementDetail || {})
  };
  const preview = COMBAT_VFX_PLACEMENT_PREVIEW;
  const playerRows = preview.playerRows || [];
  const monsterRows = preview.monsterRows || [];
  const searchContext = { formatPlacement: formatCombatVfxPlacement };
  const visiblePlayerRows = playerRows.filter((row) => matchesCombatVfxFilter(combatVfxDetailFilter, "player", combatVfxPlayerSearchText(row, searchContext)));
  const visibleMonsterRows = monsterRows.filter((row) => matchesCombatVfxFilter(combatVfxDetailFilter, "monster", combatVfxMonsterSearchText(row, searchContext)));
  return renderCombatVfxPlacementDetailSection({
    preview,
    visiblePlayerRows,
    visibleMonsterRows,
    detailText,
    filter: combatVfxDetailFilter,
    labels: {
      classLabels: {
        ...COMBAT_VFX_CLASS_LABELS,
        ...(detailText.classLabels || {})
      },
      genderLabels: {
        ...COMBAT_VFX_GENDER_LABELS,
        ...(detailText.genderLabels || {})
      },
      effectLabels: {
        ...COMBAT_VFX_EFFECT_LABELS,
        ...(detailText.effectLabels || {})
      },
      signalLabels: {
        ...COMBAT_VFX_SIGNAL_LABELS,
        ...(detailText.signalLabels || {})
      },
    },
  });
}

function renderBalanceTuningDetail() {
  const detailText = EDITOR_TEXT.balanceTuningDetail || {};
  const registryMeta = manifest.balanceTuningRegistry || {};
  const relatedChecks = Array.isArray(registryMeta.relatedChecks) ? registryMeta.relatedChecks : [];
  const tuningCandidates = Array.isArray(registryMeta.tuningCandidates) ? registryMeta.tuningCandidates : [];
  const pacingSnapshot = createTutorialIslandPacingSnapshot();
  const fileCount = new Set(BALANCE_TUNING_GROUPS.flatMap((group) => group.files)).size;
  const exportCount = BALANCE_TUNING_GROUPS.reduce((sum, group) => sum + group.exports.length, 0);
  const visibleGroups = BALANCE_TUNING_GROUPS.filter((group) => matchesBalanceDetailFilter(balanceDetailFilter, group, BALANCE_TUNING_GROUPS));
  const rows = visibleGroups.map((group) => renderBalanceGroupRowSection(group, detailText, {
    previewById: BALANCE_TUNING_PREVIEW_BY_ID,
  })).join("");
  const lootSkillBulkIntakePreview = createLootSkillBulkIntakePreview(contentBulkPatchPackageAdapterPreview);
  const runtimeVfxBulkIntakePreview = createRuntimeVfxBulkIntakePreviewFromInput();
  const contentBulkPackageOverview = createContentBulkPackageOverview({
    adapterPreview: contentBulkPatchPackageAdapterPreview,
    lootSkillPreview: lootSkillBulkIntakePreview,
    monsterRuntimePreview: MONSTER_RUNTIME_BULK_INTAKE_PREVIEW,
    runtimeVfxPreview: runtimeVfxBulkIntakePreview,
  });
  const contentBulkFilterCounts = createContentBulkFilterCounts({
    adapterPreview: contentBulkPatchPackageAdapterPreview,
    lootSkillPreview: lootSkillBulkIntakePreview,
    monsterRuntimePreview: MONSTER_RUNTIME_BULK_INTAKE_PREVIEW,
    runtimeVfxPreview: runtimeVfxBulkIntakePreview,
    filter: contentBulkDetailFilter,
  });
  const contentBulkFilteredCandidatePreview = createContentBulkFilteredCandidatePreview({
    adapterPreview: contentBulkPatchPackageAdapterPreview,
    lootSkillPreview: lootSkillBulkIntakePreview,
    monsterRuntimePreview: MONSTER_RUNTIME_BULK_INTAKE_PREVIEW,
    runtimeVfxPreview: runtimeVfxBulkIntakePreview,
    filter: contentBulkDetailFilter,
    limit: 12,
  });
  refreshContentBulkPatchReadinessPlans(contentBulkFilteredCandidatePreview);

  return renderBalanceTuningDetailSection({
    detailText,
    groupCount: BALANCE_TUNING_GROUPS.length,
    fileCount,
    exportCount,
    sections: [
      renderBalanceFilterControlsSection(detailText, visibleGroups.length, BALANCE_TUNING_GROUPS.length, {
        filter: balanceDetailFilter,
      }),
      renderActiveBalanceCandidateSummarySection(detailText, relatedChecks, tuningCandidates, visibleGroups, {
        activeCandidate: selectedBalanceTuningCandidate(balanceDetailFilter, tuningCandidates),
        groups: BALANCE_TUNING_GROUPS,
        previewById: BALANCE_TUNING_PREVIEW_BY_ID,
      }),
      renderBalanceDomainSummariesSection(BALANCE_TUNING_DOMAIN_SUMMARIES, detailText, relatedChecks, {
        groups: BALANCE_TUNING_GROUPS,
        previewById: BALANCE_TUNING_PREVIEW_BY_ID,
      }),
      renderBalancePacingSnapshotSection(pacingSnapshot, detailText),
      renderMonsterCandidateRewardSection(detailText),
      renderMonsterCandidatePromotionChecklistSection(detailText),
      renderMonsterCandidateLivePromotionPlanSection(detailText),
      renderMonsterCandidateLivePatchDraftSection(detailText),
      renderMonsterCandidateBulkPatchAutomationSection(detailText),
      renderContentBulkPatchAutomationPlanSection(detailText),
      renderContentBulkPatchIntakeContractSection(detailText),
      renderContentBulkPackageOverviewSection(contentBulkPackageOverview, detailText, contentBulkFilterCounts),
      renderContentBulkPatchPackageAdapterPreviewSection(contentBulkPatchPackageAdapterPreview, detailText),
      renderLootSkillBulkIntakeSection(lootSkillBulkIntakePreview, detailText),
      renderMonsterRuntimeBulkIntakeSection(MONSTER_RUNTIME_BULK_INTAKE_PREVIEW, detailText),
      renderRuntimeVfxBulkIntakeSection(runtimeVfxBulkIntakePreview, detailText),
      renderContentBulkMassApplyReadinessSection(contentBulkFilteredCandidatePreview, detailText),
      renderContentBulkStagedApplyRehearsalSection(contentBulkFilteredCandidatePreview, detailText),
      renderContentBulkDomainApplyReadinessSection({
        filterCounts: contentBulkFilterCounts,
        filteredCandidatePreview: contentBulkFilteredCandidatePreview,
      }),
      renderContentBulkFilteredCandidatePreviewSection(contentBulkFilteredCandidatePreview, detailText),
      renderContentBulkPatchDryRunSection(detailText),
      renderContentBulkPatchStagedImportSection(detailText),
      renderContentBulkPatchDiffExportSection(detailText),
      renderContentBulkPatchManualApplyChecklistSection(detailText),
      renderContentBulkPatchFilePatchDraftSection(detailText),
      renderContentBulkPatchFilePatchDraftExportSection(detailText),
      renderContentBulkPatchApplyGatePlanSection(contentBulkFilteredCandidatePreview, detailText),
      renderContentBulkPatchBackupPlanSection(detailText),
      renderContentBulkPatchRestoreRehearsalSection(detailText),
      renderBalanceTuningCandidatesSection(tuningCandidates, detailText, relatedChecks, {
        activeCandidateId: balanceDetailFilter.candidateId,
        groups: BALANCE_TUNING_GROUPS,
        previewById: BALANCE_TUNING_PREVIEW_BY_ID,
      }),
      renderBalanceRelatedChecksSection(relatedChecks, detailText),
    ],
    rowsHtml: rows || renderEmptyBalanceRowsSection(detailText, {
      filter: balanceDetailFilter,
    }),
  });
}

function scrollBalanceCandidateSummaryIntoView() {
  scrollEditorBalanceCandidateSummaryIntoView(elements.panelDetail);
}

function scrollContentBulkPackageIntoView() {
  scrollEditorContentBulkPackageIntoView(elements.panelDetail);
}

function renderRetargetPreviewDetail() {
  const detailText = EDITOR_TEXT.retargetDetail || {};
  return renderRetargetPreviewDetailSection({
    detailText,
    filter: retargetDetailFilter,
    expandedRows: expandedRetargetRows,
  });
}

function renderAssets() {
  const imageSlots = manifest.assetSlots?.image || [];
  const audioSlots = manifest.assetSlots?.audio || [];
  elements.assetGrid.innerHTML = renderEditorAssetSectionsSection({
    assetTypes: EDITOR_TEXT.assetTypes,
    imageSlots,
    audioSlots,
  });
}

function renderSaveKeys() {
  const summary = createSaveSummary();
  elements.saveGrid.innerHTML = renderEditorSaveKeyCardsSection(summary.keys, EDITOR_TEXT.save);
}

function renderBacklog() {
  const items = backlog.items || [];
  elements.backlogList.innerHTML = renderEditorBacklogCardsSection(items, {
    statusLabel: EDITOR_STATUS_LABEL,
  });
}

function renderPrototypeList() {
  const items = manifest.prototypeListMemory || [];
  elements.prototypeList.innerHTML = renderEditorPrototypeCardsSection(items);
}

function createSaveSummary() {
  return createEditorSaveSummary({
    keys: EDITOR_SAVE_KEYS,
    saveText: EDITOR_TEXT.save,
    locale: EDITOR_TEXT.locale,
    translate: tf,
    editorVersion: EDITOR_VERSION,
  });
}

function renderSaveSlotValidationPlan(diagnostics) {
  return renderSaveSlotValidationPlanSection(diagnostics);
}

function renderSaveSlotDraftPayloadPreview(diagnostics) {
  return renderSaveSlotDraftPayloadSection(diagnostics);
}

function createSaveSlotDraftPayloadPreview(diagnostics) {
  return createSaveSlotDraftPayloadPreviewModel(diagnostics, EDITOR_TEXT.saveDraft || {});
}

function renderSaveSlotDraftDiffSummary(diagnostics) {
  return renderSaveSlotDraftDiffSummarySection(diagnostics);
}

function renderSaveSlotApplyGateChecklist(diagnostics) {
  return renderSaveSlotApplyGateChecklistSection(diagnostics);
}

function renderSaveSlotRecoveryRehearsalPreview(diagnostics) {
  return renderSaveSlotRecoveryRehearsalSection(diagnostics);
}

function renderSaveSlotEditInputSchemaPreview(diagnostics) {
  return renderSaveSlotEditInputSchemaSection(diagnostics);
}

function renderSaveSlotEditValidationMatrix(diagnostics) {
  return renderSaveSlotEditValidationMatrixSection(diagnostics);
}

function renderSaveSlotEditValidationRuleDrilldown(diagnostics) {
  return renderSaveSlotEditRuleDrilldownSection(diagnostics);
}

function renderSaveSlotEditSamplePayloadPreview(diagnostics) {
  return renderSaveSlotEditSamplePayloadSection(diagnostics);
}

function renderSaveSlotEditValidatorDryRunPlan(diagnostics) {
  return renderSaveSlotEditValidatorDryRunSection(diagnostics);
}

function renderSaveSlotEditValidatorRegistryContract(diagnostics) {
  return renderSaveSlotEditValidatorRegistrySection(diagnostics);
}

function renderSaveSlotEditValidatorResultSchemaPreview(diagnostics) {
  return renderSaveSlotEditValidatorResultSchemaSection(diagnostics);
}

function renderSaveSlotEditValidatorExecutableDryRunPreview(diagnostics) {
  return renderSaveSlotEditValidatorExecutableDryRunSection(diagnostics);
}

function renderSaveSlotEditProposedValueInjectorPreview(diagnostics) {
  return renderSaveSlotEditProposedValueInjectorSection(diagnostics);
}

function renderSaveSlotEditDryRunSampleComparatorPreview(diagnostics) {
  return renderSaveSlotEditDryRunSampleComparatorSection(diagnostics);
}

function renderSaveSlotEditSampleBridgeBlockerSummaryPreview(diagnostics) {
  return renderSaveSlotEditSampleBridgeBlockerSection(diagnostics);
}

function renderSaveSlotEditProducedResultBridgeContractPreview(diagnostics) {
  return renderSaveSlotEditProducedResultBridgeSection(diagnostics);
}

function renderSaveSlotEditBridgeTransitionChecklistPreview(diagnostics) {
  return renderSaveSlotEditBridgeTransitionSection(diagnostics);
}

function renderSaveSlotEditValidatorResultSourceAdapterPlanPreview(diagnostics) {
  return renderSaveSlotEditValidatorResultSourceAdapterSection(diagnostics);
}

function renderSaveSlotEditSelectedSourceHandoffContractPreview(diagnostics) {
  return renderSaveSlotEditSelectedSourceHandoffSection(diagnostics);
}

function renderSaveSlotEditAdapterRunnerPreflightPreview(diagnostics) {
  return renderSaveSlotEditAdapterRunnerPreflightSection(diagnostics);
}

function renderSaveSlotEditConfirmationSourceSelectionContractPreview(diagnostics) {
  return renderSaveSlotEditConfirmationSourceSelectionSection(diagnostics);
}

function renderSaveSlotEditConfirmationInputShellContractPreview(diagnostics) {
  return renderSaveSlotEditConfirmationInputShellSection(diagnostics);
}

function renderSaveSlotEditConfirmationMatchReviewSummaryPreview(diagnostics) {
  return renderSaveSlotEditConfirmationMatchReviewSection(diagnostics);
}

function renderSaveSlotEditSubmitRunnerBlockerContractPreview(diagnostics) {
  return renderSaveSlotEditSubmitRunnerBlockerSection(diagnostics);
}

function renderSaveSlotEditFinalApplyRunnerHandoffChecklistPreview(diagnostics) {
  return renderSaveSlotEditFinalApplyRunnerHandoffSection(diagnostics);
}

function renderSaveSlotEditApplyRunnerPayloadShapePreview(diagnostics) {
  return renderSaveSlotEditApplyRunnerPayloadShapeSection(diagnostics);
}

function renderSaveSlotEditPayloadBridgeCompatibilitySummaryPreview(diagnostics) {
  return renderSaveSlotEditPayloadBridgeCompatibilitySection(diagnostics);
}

function renderSaveSlotEditValidatorApplyGateBridgePreview(diagnostics) {
  return renderSaveSlotEditValidatorApplyGateBridgeSection(diagnostics);
}

function createSaveSlotDraftDiffSummary(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotDraftDiffSummary(diagnostics);
}

function createSaveSlotEditInputSchemaPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditInputSchemaPreview(diagnostics);
}

function createSaveSlotEditValidationMatrix(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditValidationMatrix(diagnostics);
}

function createSaveSlotEditValidationRuleDrilldown(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditValidationRuleDrilldown(diagnostics);
}

function createSaveSlotEditSamplePayloadPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditSamplePayloadPreview(diagnostics);
}

function createSaveSlotEditValidatorDryRunPlan(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditValidatorDryRunPlan(diagnostics);
}

function createSaveSlotEditValidatorRegistryContract(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditValidatorRegistryContract(diagnostics);
}

function createSaveSlotEditValidatorResultSchemaPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditValidatorResultSchemaPreview(diagnostics);
}

function createSaveSlotEditValidatorExecutableRegistry(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditValidatorExecutableRegistry(diagnostics);
}

function createSaveSlotEditValidatorExecutableDryRunPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditValidatorExecutableDryRunPreview(diagnostics);
}

function createSaveSlotEditProposedValueInjectorPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditProposedValueInjectorPreview(diagnostics);
}

function createSaveSlotEditDryRunSampleComparatorPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditDryRunSampleComparatorPreview(diagnostics);
}

function createSaveSlotEditSampleBridgeBlockerSummaryPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditSampleBridgeBlockerSummaryPreview(diagnostics);
}

function createSaveSlotEditProducedResultBridgeContractPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditProducedResultBridgeContractPreview(diagnostics);
}

function createSaveSlotEditBridgeTransitionChecklistPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditBridgeTransitionChecklistPreview(diagnostics);
}

function createSaveSlotEditValidatorResultSourceAdapterPlanPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditValidatorResultSourceAdapterPlanPreview(diagnostics);
}

function createSaveSlotEditSelectedSourceHandoffContractPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditSelectedSourceHandoffContractPreview(diagnostics);
}

function createSaveSlotEditAdapterRunnerPreflightPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditAdapterRunnerPreflightPreview(diagnostics);
}

function createSaveSlotEditConfirmationSourceSelectionContractPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditConfirmationSourceSelectionContractPreview(diagnostics);
}

function createSaveSlotEditConfirmationInputShellContractPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditConfirmationInputShellContractPreview(diagnostics);
}

function createSaveSlotEditConfirmationMatchReviewSummaryPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditConfirmationMatchReviewSummaryPreview(diagnostics);
}

function createSaveSlotEditSubmitRunnerBlockerContractPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditSubmitRunnerBlockerContractPreview(diagnostics);
}

function createSaveSlotEditFinalApplyRunnerHandoffChecklistPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditFinalApplyRunnerHandoffChecklistPreview(diagnostics);
}

function createSaveSlotEditApplyRunnerPayloadShapePreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditApplyRunnerPayloadShapePreview(diagnostics);
}

function createSaveSlotEditPayloadBridgeCompatibilitySummaryPreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditPayloadBridgeCompatibilitySummaryPreview(diagnostics);
}

function createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics);
}

function createSaveSlotRecoveryRehearsalPreview(diagnostics, options = {}) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotRecoveryRehearsalPreview(diagnostics, options);
}

function createSaveSlotApplyGateChecklist(diagnostics, options = {}) {
  return SAVE_SLOT_EDIT_PREVIEW_COMPOSITION.createSaveSlotApplyGateChecklist(diagnostics, options);
}

function applyBalanceCandidateFilter(candidateId) {
  const registryMeta = manifest.balanceTuningRegistry || {};
  const candidates = Array.isArray(registryMeta.tuningCandidates) ? registryMeta.tuningCandidates : [];
  const candidate = findBalanceTuningCandidate(candidateId, candidates);
  if (!candidate) return;
  balanceDetailFilter = createBalanceCandidateFilter(candidate, BALANCE_TUNING_GROUPS);
  persistBalanceDetailFilter();
}

function persistBalanceDetailFilter() {
  BALANCE_DETAIL_FILTER_STORE.persist(balanceDetailFilter);
}

function resetBalanceDetailFilter() {
  balanceDetailFilter = BALANCE_DETAIL_FILTER_STORE.reset();
}

function persistContentBulkDetailFilter() {
  CONTENT_BULK_FILTER_STORE.persist(contentBulkDetailFilter);
}

function persistContentBulkPatchPackageInput() {
  CONTENT_BULK_PATCH_PACKAGE_INPUT_STORE.persist(contentBulkPatchPackageInput);
}

function applyContentBulkPatchPackageInput() {
  const textarea = elements.panelDetail?.querySelector("[data-content-bulk-package-json]");
  const draftText = textarea ? textarea.value : String(contentBulkPatchPackageInput.draftText || "");
  contentBulkPatchPackageInput = {
    draftText,
    appliedText: draftText,
    sourceName: draftText.trim() ? "pasted-package.json" : "",
    parseError: ""
  };
  persistContentBulkPatchPackageInput();
  refreshContentBulkPatchPackageAdapterPreview();
}

function applyContentBulkPatchPackageSample() {
  const sampleText = JSON.stringify(createContentBulkPatchPackageAdapterTemplate(), null, 2);
  contentBulkPatchPackageInput = {
    draftText: sampleText,
    appliedText: sampleText,
    sourceName: "project-regressor-content-bulk-package-template.json",
    parseError: ""
  };
  persistContentBulkPatchPackageInput();
  refreshContentBulkPatchPackageAdapterPreview();
}

function resetContentBulkPatchPackageInput() {
  contentBulkPatchPackageInput = CONTENT_BULK_PATCH_PACKAGE_INPUT_STORE.reset();
  contentBulkPatchPackageParseError = "";
}

function refreshContentBulkPatchPackageAdapterPreview() {
  contentBulkPatchPackageAdapterPreview = createContentBulkPatchPackageAdapterPreviewFromInput();
  contentBulkPatchFilePatchDraftExport = createContentBulkPatchFilePatchDraftExportFromInput();
  refreshContentBulkPatchReadinessPlans();
}

function refreshContentBulkPatchReadinessPlans(filteredCandidatePreview = {}) {
  contentBulkPatchApplyGatePlan = createContentBulkPatchApplyGatePlan(contentBulkPatchFilePatchDraftExport, {
    filteredCandidatePreview,
  });
  contentBulkPatchBackupPlan = createContentBulkPatchBackupPlan(contentBulkPatchFilePatchDraftExport, contentBulkPatchApplyGatePlan);
  contentBulkPatchRestoreRehearsal = createContentBulkPatchRestoreRehearsal(contentBulkPatchBackupPlan);
}

function createContentBulkPatchPackageAdapterPreviewFromInput() {
  contentBulkPatchPackageParseError = "";
  const appliedText = String(contentBulkPatchPackageInput.appliedText || "").trim();
  if (!appliedText) return createContentBulkPatchPackageAdapterPreview();
  try {
    return createContentBulkPatchPackageAdapterPreview(JSON.parse(appliedText));
  } catch (error) {
    contentBulkPatchPackageParseError = error?.message || "JSON parse error";
    return createContentBulkPatchPackageAdapterPreview();
  }
}

function createContentBulkPatchFilePatchDraftExportFromInput() {
  const appliedText = String(contentBulkPatchPackageInput.appliedText || "").trim();
  if (!appliedText) {
    return createContentBulkPatchFilePatchDraftExport(createContentBulkPatchPackageAdapterTemplate(), {
      sourceName: "project-regressor-content-bulk-package-template.json",
      adapterPreview: contentBulkPatchPackageAdapterPreview,
    });
  }
  try {
    return createContentBulkPatchFilePatchDraftExport(JSON.parse(appliedText), {
      sourceName: contentBulkPatchPackageInput.sourceName || "pasted-package.json",
      adapterPreview: contentBulkPatchPackageAdapterPreview,
    });
  } catch {
    return createContentBulkPatchFilePatchDraftExport(createContentBulkPatchPackageAdapterTemplate(), {
      sourceName: "project-regressor-content-bulk-package-template.json",
    });
  }
}

function createRuntimeVfxBulkIntakePreviewFromInput() {
  const appliedText = String(contentBulkPatchPackageInput.appliedText || "").trim();
  if (!appliedText) {
    return createRuntimeVfxBulkIntakePreview(createRuntimeVfxBulkIntakeTemplate(), COMBAT_VFX_PLACEMENT_PREVIEW);
  }
  try {
    return createRuntimeVfxBulkIntakePreview(JSON.parse(appliedText), COMBAT_VFX_PLACEMENT_PREVIEW);
  } catch {
    return createRuntimeVfxBulkIntakePreview(createRuntimeVfxBulkIntakeTemplate(), COMBAT_VFX_PLACEMENT_PREVIEW);
  }
}

function persistCombatVfxDetailFilter() {
  COMBAT_VFX_FILTER_STORE.persist(combatVfxDetailFilter);
}

function resetCombatVfxDetailFilter() {
  combatVfxDetailFilter = COMBAT_VFX_FILTER_STORE.reset();
}

function persistRetargetDetailFilter() {
  RETARGET_FILTER_STORE.persist(retargetDetailFilter, expandedRetargetRows);
}

function resetRetargetDetailFilter() {
  const resetState = RETARGET_FILTER_STORE.reset();
  retargetDetailFilter = resetState.filter;
  expandedRetargetRows.clear();
}
