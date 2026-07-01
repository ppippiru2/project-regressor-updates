import { applyDomLocalization } from "../localization/domText.js?v=676";
import { getLocaleText, tf } from "../localization/index.js?v=676";
import { createMurimRetargetPreview } from "../ui/renderRetargetPreview.js?v=676";
import { createRetargetPreviewDetailRenderer } from "./retargetPreviewDetailAdapter.js?v=676";
import { createRetargetFilterStore } from "./retargetFilterStore.js?v=676";
import {
  createEditorAssetSectionsRenderer,
  createEditorBacklogCardsRenderer,
  createEditorPrototypeCardsRenderer,
  createEditorSaveKeyCardsRenderer,
} from "./editorOverviewListAdapter.js?v=676&cachebust=asset-section-collapse";
import {
  createEditorNavigationGroupsRenderer,
  createEditorPanelDetailShellRenderer,
} from "./editorShellAdapter.js?v=676&cachebust=676";
import { createEditorStatusLabelFormatter } from "./editorStatusLabels.js?v=676";
import { downloadJson } from "./editorDownload.js?v=676";
import { getEditorElements } from "./editorDomElements.js?v=676";
import { setElementText } from "./editorDomText.js?v=676";
import { renderEditorErrorPanel } from "./editorErrorPanel.js?v=676";
import { fetchEditorJson } from "./editorJsonLoader.js?v=676";
import { renderEditorMetricCard } from "./editorMetricView.js?v=676";
import {
  createInitialCollapsedEditorNavGroupIds,
  toggleEditorNavGroupCollapsed,
} from "./editorNavGroupState.js?v=676&cachebust=676";
import { createEditorPanelContentSections } from "./editorPanelContentSections.js?v=676";
import { findEditorPanelById, getEditorPanels, getInitialEditorPanelId } from "./editorPanelSelection.js?v=676";
import {
  scrollEditorBalanceCandidateSummaryIntoView,
  scrollEditorContentBulkPackageIntoView,
} from "./editorScrollTargets.js?v=676&cachebust=676";
import { bindEditorEvents } from "./editorEventBindings.js?v=676";
import { renderEditorSummaryPanel } from "./editorSummaryPanel.js?v=676";
import { BALANCE_TUNING_GROUPS } from "../balance/balanceTuningRegistry.js?v=676";
import { createBalanceTuningDetailRenderer } from "./balanceTuningDetailAdapter.js?v=676";
import {
  createActiveBalanceCandidateSummaryRenderer,
  createBalanceDomainSummariesRenderer,
  createBalanceTuningCandidatesRenderer,
} from "./balanceCandidateSummaryAdapter.js?v=676";
import {
  createBalanceGroupRowRenderer,
  createBalancePacingSnapshotRenderer,
  createBalanceRelatedChecksRenderer,
} from "./balanceRegistryDetailAdapter.js?v=676";
import {
  createBalanceFilterControlsRenderer,
  createEmptyBalanceRowsRenderer,
} from "./balanceFilterControlsAdapter.js?v=676";
import {
  createBalanceCandidateFilter,
  findBalanceTuningCandidate,
} from "./balanceFilterModel.js?v=676";
import { createBalanceDetailFilterStore } from "./balanceFilterStore.js?v=676";
import { createEditorBalanceTuningDetailRenderer } from "./editorBalanceTuningDetailFactory.js?v=676";
import { createContentBulkPatchAutomationPlan } from "./contentBulkPatchAutomationPlan.js?v=676";
import { createContentBulkPatchAutomationPlanRenderer } from "./contentBulkPatchAutomationPlanAdapter.js?v=676";
import { createContentBulkPatchApplyGatePlanRenderer } from "./contentBulkPatchApplyGatePlanAdapter.js?v=676";
import { createContentBulkPatchBackupPlanRenderer } from "./contentBulkPatchBackupPlanAdapter.js?v=676";
import { createContentBulkPatchRestoreRehearsalRenderer } from "./contentBulkPatchRestoreRehearsalAdapter.js?v=676";
import { createContentBulkPatchDryRunPreview } from "./contentBulkPatchDryRunImporter.js?v=676";
import { createContentBulkPatchDryRunRenderer } from "./contentBulkPatchDryRunAdapter.js?v=676";
import { createContentBulkPatchIntakeContract } from "./contentBulkPatchIntakeContract.js?v=676";
import { createContentBulkPatchIntakeContractRenderer } from "./contentBulkPatchIntakeContractAdapter.js?v=676";
import { createContentBulkPatchPackageInputStore } from "./contentBulkPatchPackageInputStore.js?v=676";
import {
  CONTENT_BULK_PACKAGE_TEMPLATE_FILE_NAME,
  createContentBulkPatchPackageInputController,
  createContentBulkPatchPackageTemplatePayload,
} from "./contentBulkPatchPackageInputController.js?v=676&cachebust=676";
import { createContentBulkPatchPackageRuntimeState } from "./contentBulkPatchPackageRuntimeState.js?v=676";
import { createEditorContentBulkPackageActions } from "./editorContentBulkPackageActions.js?v=676";
import { createContentBulkPatchPackageAdapterPreviewRenderer } from "./contentBulkPatchPackageAdapterPreviewAdapter.js?v=676";
import { createContentBulkPackageOverviewRenderer } from "./contentBulkPackageOverviewAdapter.js?v=676";
import { createContentBulkFilterControlsRenderer } from "./contentBulkFilterControlsAdapter.js?v=676";
import {
  CONTENT_BULK_DOMAIN_FILTERS,
  contentBulkActiveFilterSummary,
  contentBulkPatchDomainLabel,
  matchesContentBulkFilterRow,
} from "./contentBulkFilterModel.js?v=676";
import { createContentBulkFilterStore } from "./contentBulkFilterStore.js?v=676";
import { createContentBulkFilteredCandidatePreviewRenderer } from "./contentBulkFilteredCandidatePreviewAdapter.js?v=676";
import { createLootSkillBulkIntakeRenderer } from "./lootSkillBulkIntakeAdapter.js?v=676";
import { createContentBulkPatchDiffExport } from "./contentBulkPatchDiffExport.js?v=676";
import { createContentBulkPatchDiffExportRenderer } from "./contentBulkPatchDiffExportAdapter.js?v=676";
import { createContentBulkPatchFilePatchDraft } from "./contentBulkPatchFilePatchDraft.js?v=676";
import { createContentBulkPatchFilePatchDraftRenderer } from "./contentBulkPatchFilePatchDraftAdapter.js?v=676";
import { createContentBulkPatchFilePatchDraftExportRenderer } from "./contentBulkPatchFilePatchDraftExportAdapter.js?v=676";
import { createContentBulkPatchManualApplyChecklist } from "./contentBulkPatchManualApplyChecklist.js?v=676";
import { createContentBulkPatchManualApplyChecklistRenderer } from "./contentBulkPatchManualApplyChecklistAdapter.js?v=676";
import { createContentBulkPatchStagedImportPreview } from "./contentBulkPatchStagedImportPreview.js?v=676";
import { createContentBulkPatchStagedImportRenderer } from "./contentBulkPatchStagedImportAdapter.js?v=676";
import { createContentBulkMassApplyReadinessRenderer } from "./contentBulkMassApplyReadinessAdapter.js?v=676";
import { createContentBulkStagedApplyRehearsalRenderer } from "./contentBulkStagedApplyRehearsalAdapter.js?v=676";
import { createContentBulkDomainApplyReadinessRenderer } from "./contentBulkDomainApplyReadinessAdapter.js?v=676";
import { createCombatVfxPlacementPreview } from "./combatVfxPlacementPreview.js?v=676";
import {
  formatCombatVfxPlacement,
} from "./combatVfxPlacementAdapter.js?v=676";
import { COMBAT_VFX_DETAIL_TEXT } from "./combatVfxPlacementText.js?v=676";
import { createEditorCombatVfxDetailRenderer } from "./editorCombatVfxDetailFactory.js?v=676&cachebust=676";
import { createCombatVfxFilterStore } from "./combatVfxFilterStore.js?v=676";
import { createRuntimeVfxBulkIntakeRenderer } from "./runtimeVfxBulkIntakeAdapter.js?v=676";
import { createMonsterCandidateRewardPreview } from "./monsterCandidateRewardPreview.js?v=676";
import { createMonsterCandidateRewardRenderer } from "./monsterCandidateRewardAdapter.js?v=676";
import { createMonsterCandidatePromotionChecklist } from "./monsterCandidatePromotionChecklist.js?v=676";
import { createMonsterCandidateLivePromotionPlan } from "./monsterCandidateLivePromotionPlan.js?v=676";
import {
  createMonsterCandidateLivePromotionPlanRenderer,
  createMonsterCandidatePromotionChecklistRenderer,
} from "./monsterCandidatePromotionAdapter.js?v=676";
import { createMonsterCandidateLivePatchDraft } from "./monsterCandidateLivePatchDraft.js?v=676";
import { createMonsterCandidateBulkPatchAutomationPreview } from "./monsterCandidateBulkPatchAutomation.js?v=676";
import {
  createMonsterCandidateBulkPatchAutomationRenderer,
  createMonsterCandidateLivePatchDraftRenderer,
} from "./monsterCandidatePatchAdapter.js?v=676";
import {
  createMonsterSpriteReadyConnectionPatchPlan,
  createMonsterSpriteReadyConnectionReview,
  createMonsterSpriteSlotReport,
} from "./monsterSpriteSlotReport.js?v=676";
import { MONSTER_SPRITE_REPORT_TEXT } from "./monsterSpriteSlotReportText.js?v=676";
import { createMonsterSpriteSlotReportRenderer } from "./monsterSpriteSlotReportAdapter.js?v=676";
import { createMonsterRuntimeIntegrationPreview } from "./monsterRuntimeIntegrationPreview.js?v=676";
import { createMonsterRuntimeIntegrationRenderer } from "./monsterRuntimeIntegrationAdapter.js?v=676";
import { createMonsterRuntimeBulkIntakePreview } from "./monsterRuntimeBulkIntakePreview.js?v=676";
import { createMonsterRuntimeBulkIntakeRenderer } from "./monsterRuntimeBulkIntakeAdapter.js?v=676";
import { createInitialPlayerSetupPreview } from "./initialPlayerSetupPreview.js?v=676";
import { createInitialPlayerSetupPreviewRenderer } from "./initialPlayerSetupPreviewAdapter.js?v=676";
import { createEditorSaveSlotDiagnosticsRenderer } from "./editorSaveSlotDiagnosticsFactory.js?v=676&cachebust=676";
import { createEditorSaveSummary } from "./editorSaveSummaryFactory.js?v=676&cachebust=676";
import {
  clearContentBulkQueryFilter,
  createBalanceScopeFilter,
  createCombatVfxKindFilter,
  createContentBulkDomainFilter,
  createContentBulkStateFilter,
  createRetargetKindFilter,
} from "./editorFilterActionState.js?v=676&cachebust=676";
import {
  BALANCE_FILTER_STORAGE_KEY,
  COMBAT_VFX_FILTER_STORAGE_KEY,
  CONTENT_BULK_FILTER_STORAGE_KEY,
  CONTENT_BULK_PACKAGE_INPUT_STORAGE_KEY,
  EDITOR_SAVE_KEYS,
  RETARGET_FILTER_STORAGE_KEY,
} from "./saveSlotDiagnosticKeys.js?v=676";
import {
  readEditorLocalStorageJson,
  removeEditorLocalStorageItem,
  writeEditorLocalStorageJson,
} from "./editorLocalStorage.js?v=676";

const EDITOR_VERSION = "676";
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
const renderEditorAssetSectionsSection = createEditorAssetSectionsRenderer();
const renderEditorSaveKeyCardsSection = createEditorSaveKeyCardsRenderer();
const renderEditorBacklogCardsSection = createEditorBacklogCardsRenderer();
const renderEditorPrototypeCardsSection = createEditorPrototypeCardsRenderer();
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
const CONTENT_BULK_PATCH_PACKAGE_ACTIONS = createEditorContentBulkPackageActions({
  runtimeState: CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE,
  getPanelDetail: () => elements.panelDetail,
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
    renderEditor();
    bindEditorEvents({
      elements,
      actions: {
        toggleCollapsedNavGroup,
        selectPanel: (panelId) => {
          activePanelId = panelId;
        },
        renderNav,
        renderPanelDetail,
        renderSaveKeys,
        updateRetargetQuery: (value) => {
          retargetDetailFilter = {
            ...retargetDetailFilter,
            query: value,
          };
          persistRetargetDetailFilter();
        },
        updateBalanceQuery: (value) => {
          balanceDetailFilter = {
            ...balanceDetailFilter,
            query: value,
            candidateId: "",
            candidateLabel: "",
            candidateGroups: [],
          };
          persistBalanceDetailFilter();
        },
        updateCombatVfxQuery: (value) => {
          combatVfxDetailFilter = {
            ...combatVfxDetailFilter,
            query: value,
          };
          persistCombatVfxDetailFilter();
        },
        updateContentBulkQuery: (value) => {
          contentBulkDetailFilter = {
            ...contentBulkDetailFilter,
            query: value,
          };
          persistContentBulkDetailFilter();
        },
        updateContentBulkPatchPackageDraft: CONTENT_BULK_PATCH_PACKAGE_ACTIONS.updateDraft,
        applyContentBulkPatchPackageFile: CONTENT_BULK_PATCH_PACKAGE_ACTIONS.applyFile,
        applyContentBulkPatchPackageReadError: CONTENT_BULK_PATCH_PACKAGE_ACTIONS.applyReadError,
        applyContentBulkPatchPackageInput: CONTENT_BULK_PATCH_PACKAGE_ACTIONS.applyInput,
        applyContentBulkPatchPackageSample: CONTENT_BULK_PATCH_PACKAGE_ACTIONS.applySample,
        resetContentBulkPatchPackageInput: CONTENT_BULK_PATCH_PACKAGE_ACTIONS.resetInput,
        refreshContentBulkPatchPackageAdapterPreview: CONTENT_BULK_PATCH_PACKAGE_ACTIONS.refreshPreview,
        applyContentBulkStateFilter: (filterId) => {
          contentBulkDetailFilter = createContentBulkStateFilter(contentBulkDetailFilter, filterId);
          persistContentBulkDetailFilter();
        },
        applyContentBulkDomainFilter: (domainId) => {
          contentBulkDetailFilter = createContentBulkDomainFilter(contentBulkDetailFilter, domainId);
          persistContentBulkDetailFilter();
        },
        clearContentBulkQueryFilter: () => {
          contentBulkDetailFilter = clearContentBulkQueryFilter(contentBulkDetailFilter);
          persistContentBulkDetailFilter();
        },
        resetCombatVfxDetailFilter,
        applyCombatVfxKindFilter: (kind) => {
          combatVfxDetailFilter = createCombatVfxKindFilter(combatVfxDetailFilter, kind);
          persistCombatVfxDetailFilter();
        },
        applyBalanceCandidateFilter,
        scrollBalanceCandidateSummaryIntoView,
        resetBalanceDetailFilter,
        applyBalanceScopeFilter: (scope) => {
          balanceDetailFilter = createBalanceScopeFilter(balanceDetailFilter, scope);
          persistBalanceDetailFilter();
        },
        resetRetargetDetailFilter,
        applyRetargetKindFilter: (kind) => {
          retargetDetailFilter = createRetargetKindFilter(retargetDetailFilter, kind);
          persistRetargetDetailFilter();
        },
        toggleRetargetRow: (rowId) => {
          if (expandedRetargetRows.has(rowId)) {
            expandedRetargetRows.delete(rowId);
          } else {
            expandedRetargetRows.add(rowId);
          }
          persistRetargetDetailFilter();
        },
        scrollContentBulkPackageIntoView,
      },
      downloads: {
        downloadJson,
        createSaveSummary,
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

function renderBalanceTuningDetail() {
  return renderEditorBalanceTuningDetail();
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
