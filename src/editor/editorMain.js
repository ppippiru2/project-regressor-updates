import { applyDomLocalization } from "../localization/domText.js?v=679";
import { getLocaleText, tf } from "../localization/index.js?v=679";
import { createMurimRetargetPreview } from "../ui/renderRetargetPreview.js?v=679";
import { createRetargetPreviewDetailRenderer } from "./retargetPreviewDetailAdapter.js?v=679";
import { createRetargetFilterStore } from "./retargetFilterStore.js?v=679";
import { createEditorOverviewSections } from "./editorOverviewSectionsFactory.js?v=679";
import {
  createEditorNavigationGroupsRenderer,
  createEditorPanelDetailShellRenderer,
} from "./editorShellAdapter.js?v=679&cachebust=679";
import { createEditorStatusLabelFormatter } from "./editorStatusLabels.js?v=679";
import { downloadJson } from "./editorDownload.js?v=679";
import { getEditorElements } from "./editorDomElements.js?v=679";
import { setElementText } from "./editorDomText.js?v=679";
import { renderEditorErrorPanel } from "./editorErrorPanel.js?v=679";
import { fetchEditorJson } from "./editorJsonLoader.js?v=679";
import { renderEditorMetricCard } from "./editorMetricView.js?v=679";
import { createInitialCollapsedEditorNavGroupIds } from "./editorNavGroupState.js?v=679&cachebust=679";
import { createEditorPanelDetailRenderer } from "./editorPanelDetailFactory.js?v=679";
import { getInitialEditorPanelId } from "./editorPanelSelection.js?v=679";
import { bindEditorEvents } from "./editorEventBindings.js?v=679";
import { createEditorRenderLoop } from "./editorRenderLoopFactory.js?v=679";
import { BALANCE_TUNING_GROUPS } from "../balance/balanceTuningRegistry.js?v=679";
import { createBalanceTuningDetailRenderer } from "./balanceTuningDetailAdapter.js?v=679";
import {
  createActiveBalanceCandidateSummaryRenderer,
  createBalanceDomainSummariesRenderer,
  createBalanceTuningCandidatesRenderer,
} from "./balanceCandidateSummaryAdapter.js?v=679";
import {
  createBalanceGroupRowRenderer,
  createBalancePacingSnapshotRenderer,
  createBalanceRelatedChecksRenderer,
} from "./balanceRegistryDetailAdapter.js?v=679";
import {
  createBalanceFilterControlsRenderer,
  createEmptyBalanceRowsRenderer,
} from "./balanceFilterControlsAdapter.js?v=679";
import { createBalanceDetailFilterStore } from "./balanceFilterStore.js?v=679";
import { createEditorBalanceTuningDetailRenderer } from "./editorBalanceTuningDetailFactory.js?v=679";
import { createContentBulkPatchAutomationPlan } from "./contentBulkPatchAutomationPlan.js?v=679";
import { createContentBulkPatchAutomationPlanRenderer } from "./contentBulkPatchAutomationPlanAdapter.js?v=679";
import { createContentBulkPatchApplyGatePlanRenderer } from "./contentBulkPatchApplyGatePlanAdapter.js?v=679";
import { createContentBulkPatchBackupPlanRenderer } from "./contentBulkPatchBackupPlanAdapter.js?v=679";
import { createContentBulkPatchRestoreRehearsalRenderer } from "./contentBulkPatchRestoreRehearsalAdapter.js?v=679";
import { createContentBulkPatchDryRunPreview } from "./contentBulkPatchDryRunImporter.js?v=679";
import { createContentBulkPatchDryRunRenderer } from "./contentBulkPatchDryRunAdapter.js?v=679";
import { createContentBulkPatchIntakeContract } from "./contentBulkPatchIntakeContract.js?v=679";
import { createContentBulkPatchIntakeContractRenderer } from "./contentBulkPatchIntakeContractAdapter.js?v=679";
import { createContentBulkPatchPackageInputStore } from "./contentBulkPatchPackageInputStore.js?v=679";
import {
  CONTENT_BULK_PACKAGE_TEMPLATE_FILE_NAME,
  createContentBulkPatchPackageInputController,
  createContentBulkPatchPackageTemplatePayload,
} from "./contentBulkPatchPackageInputController.js?v=679&cachebust=679";
import { createContentBulkPatchPackageRuntimeState } from "./contentBulkPatchPackageRuntimeState.js?v=679";
import { createEditorContentBulkPackageActions } from "./editorContentBulkPackageActions.js?v=679";
import { createContentBulkPatchPackageAdapterPreviewRenderer } from "./contentBulkPatchPackageAdapterPreviewAdapter.js?v=679";
import { createContentBulkPackageOverviewRenderer } from "./contentBulkPackageOverviewAdapter.js?v=679";
import { createContentBulkFilterControlsRenderer } from "./contentBulkFilterControlsAdapter.js?v=679";
import {
  CONTENT_BULK_DOMAIN_FILTERS,
  contentBulkActiveFilterSummary,
  contentBulkPatchDomainLabel,
  matchesContentBulkFilterRow,
} from "./contentBulkFilterModel.js?v=679";
import { createContentBulkFilterStore } from "./contentBulkFilterStore.js?v=679";
import { createContentBulkFilteredCandidatePreviewRenderer } from "./contentBulkFilteredCandidatePreviewAdapter.js?v=679";
import { createLootSkillBulkIntakeRenderer } from "./lootSkillBulkIntakeAdapter.js?v=679";
import { createContentBulkPatchDiffExport } from "./contentBulkPatchDiffExport.js?v=679";
import { createContentBulkPatchDiffExportRenderer } from "./contentBulkPatchDiffExportAdapter.js?v=679";
import { createContentBulkPatchFilePatchDraft } from "./contentBulkPatchFilePatchDraft.js?v=679";
import { createContentBulkPatchFilePatchDraftRenderer } from "./contentBulkPatchFilePatchDraftAdapter.js?v=679";
import { createContentBulkPatchFilePatchDraftExportRenderer } from "./contentBulkPatchFilePatchDraftExportAdapter.js?v=679";
import { createContentBulkPatchManualApplyChecklist } from "./contentBulkPatchManualApplyChecklist.js?v=679";
import { createContentBulkPatchManualApplyChecklistRenderer } from "./contentBulkPatchManualApplyChecklistAdapter.js?v=679";
import { createContentBulkPatchStagedImportPreview } from "./contentBulkPatchStagedImportPreview.js?v=679";
import { createContentBulkPatchStagedImportRenderer } from "./contentBulkPatchStagedImportAdapter.js?v=679";
import { createContentBulkMassApplyReadinessRenderer } from "./contentBulkMassApplyReadinessAdapter.js?v=679";
import { createContentBulkStagedApplyRehearsalRenderer } from "./contentBulkStagedApplyRehearsalAdapter.js?v=679";
import { createContentBulkDomainApplyReadinessRenderer } from "./contentBulkDomainApplyReadinessAdapter.js?v=679";
import { createCombatVfxPlacementPreview } from "./combatVfxPlacementPreview.js?v=679";
import {
  formatCombatVfxPlacement,
} from "./combatVfxPlacementAdapter.js?v=679";
import { COMBAT_VFX_DETAIL_TEXT } from "./combatVfxPlacementText.js?v=679";
import { createEditorCombatVfxDetailRenderer } from "./editorCombatVfxDetailFactory.js?v=679&cachebust=679";
import { createCombatVfxFilterStore } from "./combatVfxFilterStore.js?v=679";
import { createRuntimeVfxBulkIntakeRenderer } from "./runtimeVfxBulkIntakeAdapter.js?v=679";
import { createMonsterCandidateRewardPreview } from "./monsterCandidateRewardPreview.js?v=679";
import { createMonsterCandidateRewardRenderer } from "./monsterCandidateRewardAdapter.js?v=679";
import { createMonsterCandidatePromotionChecklist } from "./monsterCandidatePromotionChecklist.js?v=679";
import { createMonsterCandidateLivePromotionPlan } from "./monsterCandidateLivePromotionPlan.js?v=679";
import {
  createMonsterCandidateLivePromotionPlanRenderer,
  createMonsterCandidatePromotionChecklistRenderer,
} from "./monsterCandidatePromotionAdapter.js?v=679";
import { createMonsterCandidateLivePatchDraft } from "./monsterCandidateLivePatchDraft.js?v=679";
import { createMonsterCandidateBulkPatchAutomationPreview } from "./monsterCandidateBulkPatchAutomation.js?v=679";
import {
  createMonsterCandidateBulkPatchAutomationRenderer,
  createMonsterCandidateLivePatchDraftRenderer,
} from "./monsterCandidatePatchAdapter.js?v=679";
import {
  createMonsterSpriteReadyConnectionPatchPlan,
  createMonsterSpriteReadyConnectionReview,
  createMonsterSpriteSlotReport,
} from "./monsterSpriteSlotReport.js?v=679";
import { MONSTER_SPRITE_REPORT_TEXT } from "./monsterSpriteSlotReportText.js?v=679";
import { createMonsterSpriteSlotReportRenderer } from "./monsterSpriteSlotReportAdapter.js?v=679";
import { createMonsterRuntimeIntegrationPreview } from "./monsterRuntimeIntegrationPreview.js?v=679";
import { createMonsterRuntimeIntegrationRenderer } from "./monsterRuntimeIntegrationAdapter.js?v=679";
import { createMonsterRuntimeBulkIntakePreview } from "./monsterRuntimeBulkIntakePreview.js?v=679";
import { createMonsterRuntimeBulkIntakeRenderer } from "./monsterRuntimeBulkIntakeAdapter.js?v=679";
import { createInitialPlayerSetupPreview } from "./initialPlayerSetupPreview.js?v=679";
import { createInitialPlayerSetupPreviewRenderer } from "./initialPlayerSetupPreviewAdapter.js?v=679";
import { createEditorSaveSlotDiagnosticsRenderer } from "./editorSaveSlotDiagnosticsFactory.js?v=679&cachebust=679";
import { createEditorFilterActions } from "./editorFilterActionsFactory.js?v=679";
import {
  BALANCE_FILTER_STORAGE_KEY,
  COMBAT_VFX_FILTER_STORAGE_KEY,
  CONTENT_BULK_FILTER_STORAGE_KEY,
  CONTENT_BULK_PACKAGE_INPUT_STORAGE_KEY,
  RETARGET_FILTER_STORAGE_KEY,
} from "./saveSlotDiagnosticKeys.js?v=679";
import {
  readEditorLocalStorageJson,
  removeEditorLocalStorageItem,
  writeEditorLocalStorageJson,
} from "./editorLocalStorage.js?v=679";

const EDITOR_VERSION = "679";
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
const CONTENT_BULK_PATCH_PACKAGE_INPUT_CONTROLLER = createContentBulkPatchPackageInputController({
  store: CONTENT_BULK_PATCH_PACKAGE_INPUT_STORE,
});
const CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE = createContentBulkPatchPackageRuntimeState({
  controller: CONTENT_BULK_PATCH_PACKAGE_INPUT_CONTROLLER,
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
const renderEditorNavigationGroupsSection = createEditorNavigationGroupsRenderer();
const renderEditorPanelDetailShellSection = createEditorPanelDetailShellRenderer();
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
  getInput: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getInput(),
  getParseError: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getParseError(),
  isMappingVisible: (mapping, text = {}) => matchesContentBulkFilterRow(contentBulkDetailFilter, Number(mapping.rowCount || 0) > 0 ? "active" : "empty", [
    mapping,
    contentBulkPatchDomainLabel(mapping.domainId, text),
  ], [mapping.domainId]),
});
const renderContentBulkMassApplyReadinessSection = createContentBulkMassApplyReadinessRenderer({
  dryRun: () => CONTENT_BULK_PATCH_DRY_RUN_PREVIEW,
  stagedImport: () => CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW,
  applyGate: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getApplyGatePlan(),
  backupPlan: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getBackupPlan(),
  restoreRehearsal: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getRestoreRehearsal(),
});
const renderContentBulkStagedApplyRehearsalSection = createContentBulkStagedApplyRehearsalRenderer({
  stagedImport: () => CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW,
  filePatchDraftExport: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getFilePatchDraftExport(),
  backupPlan: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getBackupPlan(),
  restoreRehearsal: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getRestoreRehearsal(),
});
const renderContentBulkDomainApplyReadinessSection = createContentBulkDomainApplyReadinessRenderer({
  dryRun: () => CONTENT_BULK_PATCH_DRY_RUN_PREVIEW,
  stagedImport: () => CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW,
  filePatchDraftExport: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getFilePatchDraftExport(),
  backupPlan: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getBackupPlan(),
  restoreRehearsal: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getRestoreRehearsal(),
  getFilter: () => contentBulkDetailFilter,
  activeFilter: contentBulkActiveFilterSummary,
  matchesFilterRow: matchesContentBulkFilterRow,
  domainLabel: (id, text) => contentBulkPatchDomainLabel(id, text),
});
const renderContentBulkPatchApplyGatePlanSection = createContentBulkPatchApplyGatePlanRenderer({
  getPlan: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getApplyGatePlan(),
});
const renderContentBulkPatchBackupPlanSection = createContentBulkPatchBackupPlanRenderer({
  getPlan: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getBackupPlan(),
});
const renderContentBulkPatchRestoreRehearsalSection = createContentBulkPatchRestoreRehearsalRenderer({
  getRehearsal: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getRestoreRehearsal(),
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
  getDraft: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getFilePatchDraftExport().draft || CONTENT_BULK_PATCH_FILE_PATCH_DRAFT,
  backupPlan: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getBackupPlan(),
  restoreRehearsal: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getRestoreRehearsal(),
});
const renderContentBulkPatchFilePatchDraftExportSection = createContentBulkPatchFilePatchDraftExportRenderer({
  getExport: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getFilePatchDraftExport(),
  backupPlan: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getBackupPlan(),
  restoreRehearsal: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getRestoreRehearsal(),
});
const BALANCE_DETAIL_FILTER_STORE = createBalanceDetailFilterStore({
  storageKey: BALANCE_FILTER_STORAGE_KEY,
  groups: BALANCE_TUNING_GROUPS,
  readJson: readEditorLocalStorageJson,
  writeJson: writeEditorLocalStorageJson,
  removeItem: removeEditorLocalStorageItem,
});
const renderSaveSlotDiagnostics = createEditorSaveSlotDiagnosticsRenderer({
  text: EDITOR_TEXT,
  locale: EDITOR_TEXT.locale,
  translate: tf,
  metricCard: renderEditorMetricCard,
});
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
const renderCombatVfxPlacementDetail = createEditorCombatVfxDetailRenderer({
  baseText: COMBAT_VFX_DETAIL_TEXT,
  getText: () => EDITOR_TEXT.combatVfxPlacementDetail || {},
  getPreview: () => COMBAT_VFX_PLACEMENT_PREVIEW,
  getFilter: () => combatVfxDetailFilter,
});
const INITIAL_PLAYER_SETUP_PREVIEW = createInitialPlayerSetupPreview();
const MONSTER_RUNTIME_INTEGRATION_PREVIEW = createMonsterRuntimeIntegrationPreview();
const MONSTER_RUNTIME_BULK_INTAKE_PREVIEW = createMonsterRuntimeBulkIntakePreview(MONSTER_RUNTIME_INTEGRATION_PREVIEW);
const renderEditorBalanceTuningDetail = createEditorBalanceTuningDetailRenderer({
  getManifest: () => manifest,
  getDetailText: () => EDITOR_TEXT.balanceTuningDetail || {},
  getBalanceDetailFilter: () => balanceDetailFilter,
  getContentBulkDetailFilter: () => contentBulkDetailFilter,
  packageRuntimeState: CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE,
  monsterRuntimePreview: () => MONSTER_RUNTIME_BULK_INTAKE_PREVIEW,
  placementPreview: () => COMBAT_VFX_PLACEMENT_PREVIEW,
  renderers: {
    balanceTuningDetail: renderBalanceTuningDetailSection,
    balanceFilterControls: renderBalanceFilterControlsSection,
    emptyBalanceRows: renderEmptyBalanceRowsSection,
    activeBalanceCandidateSummary: renderActiveBalanceCandidateSummarySection,
    balanceDomainSummaries: renderBalanceDomainSummariesSection,
    balanceTuningCandidates: renderBalanceTuningCandidatesSection,
    balanceGroupRow: renderBalanceGroupRowSection,
    balancePacingSnapshot: renderBalancePacingSnapshotSection,
    balanceRelatedChecks: renderBalanceRelatedChecksSection,
    monsterCandidateReward: renderMonsterCandidateRewardSection,
    monsterCandidatePromotionChecklist: renderMonsterCandidatePromotionChecklistSection,
    monsterCandidateLivePromotionPlan: renderMonsterCandidateLivePromotionPlanSection,
    monsterCandidateLivePatchDraft: renderMonsterCandidateLivePatchDraftSection,
    monsterCandidateBulkPatchAutomation: renderMonsterCandidateBulkPatchAutomationSection,
    contentBulkPatchAutomationPlan: renderContentBulkPatchAutomationPlanSection,
    contentBulkPatchIntakeContract: renderContentBulkPatchIntakeContractSection,
    contentBulkPackageOverview: renderContentBulkPackageOverviewSection,
    contentBulkPatchPackageAdapterPreview: renderContentBulkPatchPackageAdapterPreviewSection,
    lootSkillBulkIntake: renderLootSkillBulkIntakeSection,
    monsterRuntimeBulkIntake: renderMonsterRuntimeBulkIntakeSection,
    runtimeVfxBulkIntake: renderRuntimeVfxBulkIntakeSection,
    contentBulkMassApplyReadiness: renderContentBulkMassApplyReadinessSection,
    contentBulkStagedApplyRehearsal: renderContentBulkStagedApplyRehearsalSection,
    contentBulkDomainApplyReadiness: renderContentBulkDomainApplyReadinessSection,
    contentBulkFilteredCandidatePreview: renderContentBulkFilteredCandidatePreviewSection,
    contentBulkPatchDryRun: renderContentBulkPatchDryRunSection,
    contentBulkPatchStagedImport: renderContentBulkPatchStagedImportSection,
    contentBulkPatchDiffExport: renderContentBulkPatchDiffExportSection,
    contentBulkPatchManualApplyChecklist: renderContentBulkPatchManualApplyChecklistSection,
    contentBulkPatchFilePatchDraft: renderContentBulkPatchFilePatchDraftSection,
    contentBulkPatchFilePatchDraftExport: renderContentBulkPatchFilePatchDraftExportSection,
    contentBulkPatchApplyGatePlan: renderContentBulkPatchApplyGatePlanSection,
    contentBulkPatchBackupPlan: renderContentBulkPatchBackupPlanSection,
    contentBulkPatchRestoreRehearsal: renderContentBulkPatchRestoreRehearsalSection,
  },
});
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
const MONSTER_SPRITE_SLOT_REPORT = createMonsterSpriteSlotReport();
const MONSTER_SPRITE_READY_CONNECTION_PLAN = createMonsterSpriteReadyConnectionPatchPlan(MONSTER_SPRITE_SLOT_REPORT);
const MONSTER_SPRITE_READY_CONNECTION_REVIEW = createMonsterSpriteReadyConnectionReview(
  MONSTER_SPRITE_SLOT_REPORT,
  MONSTER_SPRITE_READY_CONNECTION_PLAN,
);

const elements = getEditorElements(document);
const EDITOR_OVERVIEW_SECTIONS = createEditorOverviewSections({
  elements,
  getManifest: () => manifest,
  getBacklog: () => backlog,
  getText: () => EDITOR_TEXT,
  statusLabel: EDITOR_STATUS_LABEL,
  translate: tf,
  editorVersion: EDITOR_VERSION,
});
const EDITOR_FILTER_ACTIONS = createEditorFilterActions({
  balanceGroups: BALANCE_TUNING_GROUPS,
  elements,
  getManifest: () => manifest,
  getBalanceDetailFilter: () => balanceDetailFilter,
  setBalanceDetailFilter: (filter) => {
    balanceDetailFilter = filter;
  },
  balanceDetailFilterStore: BALANCE_DETAIL_FILTER_STORE,
  getContentBulkDetailFilter: () => contentBulkDetailFilter,
  setContentBulkDetailFilter: (filter) => {
    contentBulkDetailFilter = filter;
  },
  contentBulkFilterStore: CONTENT_BULK_FILTER_STORE,
  getCombatVfxDetailFilter: () => combatVfxDetailFilter,
  setCombatVfxDetailFilter: (filter) => {
    combatVfxDetailFilter = filter;
  },
  combatVfxFilterStore: COMBAT_VFX_FILTER_STORE,
  getRetargetDetailFilter: () => retargetDetailFilter,
  setRetargetDetailFilter: (filter) => {
    retargetDetailFilter = filter;
  },
  getExpandedRetargetRows: () => expandedRetargetRows,
  retargetFilterStore: RETARGET_FILTER_STORE,
});
const CONTENT_BULK_PATCH_PACKAGE_ACTIONS = createEditorContentBulkPackageActions({
  runtimeState: CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE,
  getPanelDetail: () => elements.panelDetail,
});
const renderPanelDetail = createEditorPanelDetailRenderer({
  getManifest: () => manifest,
  getActivePanelId: () => activePanelId,
  getPanelDetailElement: () => elements.panelDetail,
  getText: () => EDITOR_TEXT,
  renderPanelDetailShell: renderEditorPanelDetailShellSection,
  statusLabel: EDITOR_STATUS_LABEL,
  contentRenderers: {
    retargetDetail: renderRetargetPreviewDetail,
    balanceTuningDetail: renderBalanceTuningDetail,
    combatVfxDetail: renderCombatVfxPlacementDetail,
    initialPlayerSetup: renderInitialPlayerSetupPreview,
    monsterSpriteReport: renderMonsterSpriteSlotReport,
    monsterRuntimePreview: renderMonsterRuntimeIntegrationPreview,
    saveSlotDiagnostics: renderSaveSlotDiagnostics,
  },
});
const EDITOR_RENDER_LOOP = createEditorRenderLoop({
  elements,
  getManifest: () => manifest,
  getBacklog: () => backlog,
  getActivePanelId: () => activePanelId,
  getCollapsedNavGroupIds: () => collapsedNavGroupIds,
  setCollapsedNavGroupIds: (nextCollapsedNavGroupIds) => {
    collapsedNavGroupIds = nextCollapsedNavGroupIds;
  },
  getText: () => EDITOR_TEXT,
  translate: tf,
  balanceGroups: BALANCE_TUNING_GROUPS,
  getCombatVfxPreview: () => COMBAT_VFX_PLACEMENT_PREVIEW,
  combatVfxText: COMBAT_VFX_DETAIL_TEXT,
  collapseLabels: EDITOR_PANEL_COLLAPSE_TEXT,
  statusLabel: EDITOR_STATUS_LABEL,
  renderNavigationGroups: renderEditorNavigationGroupsSection,
  renderPanelDetail,
  overviewSections: EDITOR_OVERVIEW_SECTIONS,
});

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
    EDITOR_RENDER_LOOP.renderEditor();
    bindEditorEvents({
      elements,
      actions: {
        toggleCollapsedNavGroup: EDITOR_RENDER_LOOP.toggleCollapsedNavGroup,
        selectPanel: (panelId) => {
          activePanelId = panelId;
        },
        renderNav: EDITOR_RENDER_LOOP.renderNav,
        renderPanelDetail,
        renderSaveKeys: EDITOR_OVERVIEW_SECTIONS.renderSaveKeys,
        updateRetargetQuery: EDITOR_FILTER_ACTIONS.updateRetargetQuery,
        updateBalanceQuery: EDITOR_FILTER_ACTIONS.updateBalanceQuery,
        updateCombatVfxQuery: EDITOR_FILTER_ACTIONS.updateCombatVfxQuery,
        updateContentBulkQuery: EDITOR_FILTER_ACTIONS.updateContentBulkQuery,
        updateContentBulkPatchPackageDraft: CONTENT_BULK_PATCH_PACKAGE_ACTIONS.updateDraft,
        applyContentBulkPatchPackageFile: CONTENT_BULK_PATCH_PACKAGE_ACTIONS.applyFile,
        applyContentBulkPatchPackageReadError: CONTENT_BULK_PATCH_PACKAGE_ACTIONS.applyReadError,
        applyContentBulkPatchPackageInput: CONTENT_BULK_PATCH_PACKAGE_ACTIONS.applyInput,
        applyContentBulkPatchPackageSample: CONTENT_BULK_PATCH_PACKAGE_ACTIONS.applySample,
        resetContentBulkPatchPackageInput: CONTENT_BULK_PATCH_PACKAGE_ACTIONS.resetInput,
        refreshContentBulkPatchPackageAdapterPreview: CONTENT_BULK_PATCH_PACKAGE_ACTIONS.refreshPreview,
        applyContentBulkStateFilter: EDITOR_FILTER_ACTIONS.applyContentBulkStateFilter,
        applyContentBulkDomainFilter: EDITOR_FILTER_ACTIONS.applyContentBulkDomainFilter,
        clearContentBulkQueryFilter: EDITOR_FILTER_ACTIONS.clearContentBulkQueryFilter,
        resetCombatVfxDetailFilter: EDITOR_FILTER_ACTIONS.resetCombatVfxDetailFilter,
        applyCombatVfxKindFilter: EDITOR_FILTER_ACTIONS.applyCombatVfxKindFilter,
        applyBalanceCandidateFilter: EDITOR_FILTER_ACTIONS.applyBalanceCandidateFilter,
        scrollBalanceCandidateSummaryIntoView: EDITOR_FILTER_ACTIONS.scrollBalanceCandidateSummaryIntoView,
        resetBalanceDetailFilter: EDITOR_FILTER_ACTIONS.resetBalanceDetailFilter,
        applyBalanceScopeFilter: EDITOR_FILTER_ACTIONS.applyBalanceScopeFilter,
        resetRetargetDetailFilter: EDITOR_FILTER_ACTIONS.resetRetargetDetailFilter,
        applyRetargetKindFilter: EDITOR_FILTER_ACTIONS.applyRetargetKindFilter,
        toggleRetargetRow: EDITOR_FILTER_ACTIONS.toggleRetargetRow,
        scrollContentBulkPackageIntoView: EDITOR_FILTER_ACTIONS.scrollContentBulkPackageIntoView,
      },
      downloads: {
        downloadJson,
        createSaveSummary: EDITOR_OVERVIEW_SECTIONS.createSaveSummary,
        getManifest: () => manifest,
        getBacklog: () => backlog,
        contentBulkPackageTemplateFileName: CONTENT_BULK_PACKAGE_TEMPLATE_FILE_NAME,
        createContentBulkPatchPackageTemplatePayload,
        getContentBulkPatchFilePatchDraftExport: () => CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getFilePatchDraftExport(),
      },
    });
  } catch (error) {
    renderEditorErrorPanel(elements, {
      text: EDITOR_TEXT,
      error,
    });
  }
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

function renderBalanceTuningDetail() {
  return renderEditorBalanceTuningDetail();
}

function renderRetargetPreviewDetail() {
  const detailText = EDITOR_TEXT.retargetDetail || {};
  return renderRetargetPreviewDetailSection({
    detailText,
    filter: retargetDetailFilter,
    expandedRows: expandedRetargetRows,
  });
}
