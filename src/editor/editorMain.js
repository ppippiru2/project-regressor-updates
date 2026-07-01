import { applyDomLocalization } from "../localization/domText.js?v=675";
import { getLocaleText, tf } from "../localization/index.js?v=675";
import { createMurimRetargetPreview } from "../ui/renderRetargetPreview.js?v=675";
import { createRetargetPreviewDetailRenderer } from "./retargetPreviewDetailAdapter.js?v=675";
import { createRetargetFilterStore } from "./retargetFilterStore.js?v=675";
import {
  createEditorAssetSectionsRenderer,
  createEditorBacklogCardsRenderer,
  createEditorPrototypeCardsRenderer,
  createEditorSaveKeyCardsRenderer,
} from "./editorOverviewListAdapter.js?v=675&cachebust=asset-section-collapse";
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
import { handleEditorSearchInputEvent } from "./editorSearchInputHandlers.js?v=675&cachebust=675";
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
  selectedBalanceTuningCandidate,
} from "./balanceFilterModel.js?v=675";
import { createBalanceDetailFilterStore } from "./balanceFilterStore.js?v=675";
import { createContentBulkPatchAutomationPlan } from "./contentBulkPatchAutomationPlan.js?v=675";
import { createContentBulkPatchAutomationPlanRenderer } from "./contentBulkPatchAutomationPlanAdapter.js?v=675";
import { createContentBulkPatchApplyGatePlanRenderer } from "./contentBulkPatchApplyGatePlanAdapter.js?v=675";
import { createContentBulkPatchBackupPlanRenderer } from "./contentBulkPatchBackupPlanAdapter.js?v=675";
import { createContentBulkPatchRestoreRehearsalRenderer } from "./contentBulkPatchRestoreRehearsalAdapter.js?v=675";
import { createContentBulkPatchDryRunPreview } from "./contentBulkPatchDryRunImporter.js?v=675";
import { createContentBulkPatchDryRunRenderer } from "./contentBulkPatchDryRunAdapter.js?v=675";
import { createContentBulkPatchIntakeContract } from "./contentBulkPatchIntakeContract.js?v=675";
import { createContentBulkPatchIntakeContractRenderer } from "./contentBulkPatchIntakeContractAdapter.js?v=675";
import { createContentBulkPatchPackageInputStore } from "./contentBulkPatchPackageInputStore.js?v=675";
import {
  CONTENT_BULK_PACKAGE_TEMPLATE_FILE_NAME,
  createContentBulkPatchPackageInputController,
  createContentBulkPatchPackageTemplatePayload,
} from "./contentBulkPatchPackageInputController.js?v=675&cachebust=675";
import { createContentBulkPatchReadinessPlanBundle } from "./contentBulkPatchReadinessPlanBundle.js?v=675&cachebust=675";
import { createContentBulkPatchPackageAdapterPreviewRenderer } from "./contentBulkPatchPackageAdapterPreviewAdapter.js?v=675";
import { createContentBulkPackageOverviewRenderer } from "./contentBulkPackageOverviewAdapter.js?v=675";
import { createContentBulkFilterControlsRenderer } from "./contentBulkFilterControlsAdapter.js?v=675";
import {
  CONTENT_BULK_DOMAIN_FILTERS,
  contentBulkActiveFilterSummary,
  contentBulkPatchDomainLabel,
  matchesContentBulkFilterRow,
} from "./contentBulkFilterModel.js?v=675";
import { createContentBulkFilterStore } from "./contentBulkFilterStore.js?v=675";
import { createContentBulkFilteredCandidatePreviewRenderer } from "./contentBulkFilteredCandidatePreviewAdapter.js?v=675";
import { createContentBulkRuntimePreviewBundle } from "./contentBulkRuntimePreviewBundle.js?v=675&cachebust=675";
import { createLootSkillBulkIntakeRenderer } from "./lootSkillBulkIntakeAdapter.js?v=675";
import { createContentBulkPatchDiffExport } from "./contentBulkPatchDiffExport.js?v=675";
import { createContentBulkPatchDiffExportRenderer } from "./contentBulkPatchDiffExportAdapter.js?v=675";
import { createContentBulkPatchFilePatchDraft } from "./contentBulkPatchFilePatchDraft.js?v=675";
import { createContentBulkPatchFilePatchDraftRenderer } from "./contentBulkPatchFilePatchDraftAdapter.js?v=675";
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
  formatCombatVfxPlacement,
} from "./combatVfxPlacementAdapter.js?v=675";
import { COMBAT_VFX_DETAIL_TEXT } from "./combatVfxPlacementText.js?v=675";
import { createEditorCombatVfxDetailRenderer } from "./editorCombatVfxDetailFactory.js?v=675&cachebust=675";
import { createCombatVfxFilterStore } from "./combatVfxFilterStore.js?v=675";
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
import { createEditorSaveSlotDiagnosticsRenderer } from "./editorSaveSlotDiagnosticsFactory.js?v=675&cachebust=675";
import { createEditorSaveSummary } from "./editorSaveSummaryFactory.js?v=675&cachebust=675";
import {
  clearContentBulkQueryFilter,
  createBalanceScopeFilter,
  createCombatVfxKindFilter,
  createContentBulkDomainFilter,
  createContentBulkStateFilter,
  createRetargetKindFilter,
} from "./editorFilterActionState.js?v=675&cachebust=675";
import {
  BALANCE_FILTER_STORAGE_KEY,
  COMBAT_VFX_FILTER_STORAGE_KEY,
  CONTENT_BULK_FILTER_STORAGE_KEY,
  CONTENT_BULK_PACKAGE_INPUT_STORAGE_KEY,
  EDITOR_SAVE_KEYS,
  RETARGET_FILTER_STORAGE_KEY,
} from "./saveSlotDiagnosticKeys.js?v=675";
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
const CONTENT_BULK_PATCH_PACKAGE_INPUT_CONTROLLER = createContentBulkPatchPackageInputController({
  store: CONTENT_BULK_PATCH_PACKAGE_INPUT_STORE,
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
const renderSaveSlotDiagnostics = createEditorSaveSlotDiagnosticsRenderer({
  text: EDITOR_TEXT,
  locale: EDITOR_TEXT.locale,
  translate: tf,
  metricCard: renderEditorMetricCard,
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
const renderCombatVfxPlacementDetail = createEditorCombatVfxDetailRenderer({
  baseText: COMBAT_VFX_DETAIL_TEXT,
  getText: () => EDITOR_TEXT.combatVfxPlacementDetail || {},
  getPreview: () => COMBAT_VFX_PLACEMENT_PREVIEW,
  getFilter: () => combatVfxDetailFilter,
});
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
let contentBulkPatchPackageInput = {};
let contentBulkPatchPackageParseError = "";
let contentBulkPatchPackageAdapterPreview = {};
let contentBulkPatchFilePatchDraftExport = {};
syncContentBulkPatchPackageInputState();
let contentBulkPatchReadinessPlanBundle = createContentBulkPatchReadinessPlanBundle({
  filePatchDraftExport: contentBulkPatchFilePatchDraftExport,
});
let contentBulkPatchApplyGatePlan = contentBulkPatchReadinessPlanBundle.applyGatePlan;
let contentBulkPatchBackupPlan = contentBulkPatchReadinessPlanBundle.backupPlan;
let contentBulkPatchRestoreRehearsal = contentBulkPatchReadinessPlanBundle.restoreRehearsal;
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
    if (handleEditorSearchInputEvent(event, {
      selector: "[data-retarget-search]",
      container: elements.panelDetail,
      render: renderPanelDetail,
      update: (value) => {
        retargetDetailFilter = {
          ...retargetDetailFilter,
          query: value
        };
        persistRetargetDetailFilter();
      }
    })) {
      return;
    }
    if (handleEditorSearchInputEvent(event, {
      selector: "[data-balance-search]",
      container: elements.panelDetail,
      render: renderPanelDetail,
      update: (value) => {
        balanceDetailFilter = {
          ...balanceDetailFilter,
          query: value,
          candidateId: "",
          candidateLabel: "",
          candidateGroups: []
        };
        persistBalanceDetailFilter();
      }
    })) {
      return;
    }
    if (handleEditorSearchInputEvent(event, {
      selector: "[data-combat-vfx-search]",
      container: elements.panelDetail,
      render: renderPanelDetail,
      update: (value) => {
        combatVfxDetailFilter = {
          ...combatVfxDetailFilter,
          query: value
        };
        persistCombatVfxDetailFilter();
      }
    })) {
      return;
    }
    if (handleEditorSearchInputEvent(event, {
      selector: "[data-content-bulk-search]",
      container: elements.panelDetail,
      render: renderPanelDetail,
      update: (value) => {
        contentBulkDetailFilter = {
          ...contentBulkDetailFilter,
          query: value
        };
        persistContentBulkDetailFilter();
      }
    })) {
      return;
    }
    const packageTextarea = event.target.closest("[data-content-bulk-package-json]");
    if (packageTextarea) {
      updateContentBulkPatchPackageDraft(packageTextarea.value);
    }
  });
  elements.panelDetail?.addEventListener("change", async (event) => {
    const fileInput = event.target.closest("[data-content-bulk-package-file]");
    if (!fileInput) return;
    const file = fileInput.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      applyContentBulkPatchPackageFile(text, file.name);
      renderPanelDetail();
      scrollContentBulkPackageIntoView();
    } catch (error) {
      applyContentBulkPatchPackageReadError(error);
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
      downloadJson(CONTENT_BULK_PACKAGE_TEMPLATE_FILE_NAME, createContentBulkPatchPackageTemplatePayload());
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
      contentBulkDetailFilter = createContentBulkStateFilter(contentBulkDetailFilter, contentBulkFilterButton.dataset.contentBulkFilter);
      persistContentBulkDetailFilter();
      renderPanelDetail();
      return;
    }
    const contentBulkDomainButton = event.target.closest("[data-content-bulk-domain]");
    if (contentBulkDomainButton) {
      contentBulkDetailFilter = createContentBulkDomainFilter(contentBulkDetailFilter, contentBulkDomainButton.dataset.contentBulkDomain);
      persistContentBulkDetailFilter();
      renderPanelDetail();
      return;
    }
    const contentBulkSearchResetButton = event.target.closest("[data-content-bulk-search-reset]");
    if (contentBulkSearchResetButton) {
      contentBulkDetailFilter = clearContentBulkQueryFilter(contentBulkDetailFilter);
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
      combatVfxDetailFilter = createCombatVfxKindFilter(combatVfxDetailFilter, combatVfxKindButton.dataset.combatVfxKind);
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
      balanceDetailFilter = createBalanceScopeFilter(balanceDetailFilter, balanceScopeButton.dataset.balanceScope);
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
      retargetDetailFilter = createRetargetKindFilter(retargetDetailFilter, filterButton.dataset.retargetKind);
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
  const contentBulkRuntimePreviewBundle = createContentBulkRuntimePreviewBundle({
    adapterPreview: contentBulkPatchPackageAdapterPreview,
    packageInput: contentBulkPatchPackageInput,
    monsterRuntimePreview: MONSTER_RUNTIME_BULK_INTAKE_PREVIEW,
    placementPreview: COMBAT_VFX_PLACEMENT_PREVIEW,
    filter: contentBulkDetailFilter,
    limit: 12,
  });
  const {
    lootSkillBulkIntakePreview,
    runtimeVfxBulkIntakePreview,
    contentBulkPackageOverview,
    contentBulkFilterCounts,
    contentBulkFilteredCandidatePreview,
  } = contentBulkRuntimePreviewBundle;
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

function applyContentBulkPatchPackageInput() {
  const textarea = elements.panelDetail?.querySelector("[data-content-bulk-package-json]");
  const draftText = textarea ? textarea.value : String(contentBulkPatchPackageInput.draftText || "");
  CONTENT_BULK_PATCH_PACKAGE_INPUT_CONTROLLER.applyDraft(draftText);
  syncContentBulkPatchPackageInputState();
  refreshContentBulkPatchReadinessPlans();
}

function applyContentBulkPatchPackageSample() {
  CONTENT_BULK_PATCH_PACKAGE_INPUT_CONTROLLER.applySample();
  syncContentBulkPatchPackageInputState();
  refreshContentBulkPatchReadinessPlans();
}

function resetContentBulkPatchPackageInput() {
  CONTENT_BULK_PATCH_PACKAGE_INPUT_CONTROLLER.reset();
  syncContentBulkPatchPackageInputState();
}

function refreshContentBulkPatchPackageAdapterPreview() {
  CONTENT_BULK_PATCH_PACKAGE_INPUT_CONTROLLER.refresh();
  syncContentBulkPatchPackageInputState();
  refreshContentBulkPatchReadinessPlans();
}

function updateContentBulkPatchPackageDraft(draftText) {
  CONTENT_BULK_PATCH_PACKAGE_INPUT_CONTROLLER.updateDraft(draftText);
  syncContentBulkPatchPackageInputState();
}

function applyContentBulkPatchPackageFile(text, fileName) {
  CONTENT_BULK_PATCH_PACKAGE_INPUT_CONTROLLER.applyFile(text, fileName);
  syncContentBulkPatchPackageInputState();
  refreshContentBulkPatchReadinessPlans();
}

function applyContentBulkPatchPackageReadError(error) {
  CONTENT_BULK_PATCH_PACKAGE_INPUT_CONTROLLER.applyReadError(error);
  syncContentBulkPatchPackageInputState();
}

function refreshContentBulkPatchReadinessPlans(filteredCandidatePreview = {}) {
  contentBulkPatchReadinessPlanBundle = createContentBulkPatchReadinessPlanBundle({
    filePatchDraftExport: contentBulkPatchFilePatchDraftExport,
    filteredCandidatePreview,
  });
  contentBulkPatchApplyGatePlan = contentBulkPatchReadinessPlanBundle.applyGatePlan;
  contentBulkPatchBackupPlan = contentBulkPatchReadinessPlanBundle.backupPlan;
  contentBulkPatchRestoreRehearsal = contentBulkPatchReadinessPlanBundle.restoreRehearsal;
}

function syncContentBulkPatchPackageInputState() {
  const state = CONTENT_BULK_PATCH_PACKAGE_INPUT_CONTROLLER.getState();
  contentBulkPatchPackageInput = state.input;
  contentBulkPatchPackageParseError = state.parseError;
  contentBulkPatchPackageAdapterPreview = state.adapterPreview;
  contentBulkPatchFilePatchDraftExport = state.filePatchDraftExport;
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
