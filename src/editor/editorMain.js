import { applyDomLocalization } from "../localization/domText.js?v=675";
import { getLocaleText, t, tf } from "../localization/index.js?v=675";
import { createMurimRetargetPreview } from "../ui/renderRetargetPreview.js?v=675";
import { renderRetargetPreviewDetailView } from "./retargetPreviewDetailView.js?v=675";
import {
  renderEditorAssetSections,
  renderEditorBacklogCards,
  renderEditorPrototypeCards,
  renderEditorSaveKeyCards,
} from "./editorOverviewListView.js?v=675";
import { BALANCE_TUNING_DOMAIN_SUMMARIES, BALANCE_TUNING_GROUPS } from "../balance/balanceTuningRegistry.js?v=675";
import { createBalanceTuningPreviewRows } from "./balanceTuningPreview.js?v=675";
import { renderBalanceTuningDetailView } from "./balanceTuningDetailView.js?v=675";
import {
  renderActiveBalanceCandidateSummary,
  renderBalanceDomainSummaries,
  renderBalanceTuningCandidates,
} from "./balanceCandidateSummaryView.js?v=675";
import {
  renderBalanceGroupRow,
  renderBalancePacingSnapshot,
  renderBalanceRelatedChecks,
} from "./balanceRegistryDetailView.js?v=675";
import {
  renderBalanceFilterControls,
  renderEmptyBalanceRows,
} from "./balanceFilterControlsView.js?v=675";
import { createContentBulkPatchAutomationPlan } from "./contentBulkPatchAutomationPlan.js?v=675";
import { renderContentBulkPatchAutomationPlan } from "./contentBulkPatchAutomationPlanView.js?v=675";
import { createContentBulkPatchApplyGatePlan } from "./contentBulkPatchApplyGatePlan.js?v=675";
import { renderContentBulkPatchApplyGatePlan } from "./contentBulkPatchApplyGatePlanView.js?v=675";
import { createContentBulkPatchBackupPlan } from "./contentBulkPatchBackupPlan.js?v=675";
import { renderContentBulkPatchBackupPlan } from "./contentBulkPatchBackupPlanView.js?v=675";
import { createContentBulkPatchRestoreRehearsal } from "./contentBulkPatchRestoreRehearsal.js?v=675";
import { renderContentBulkPatchRestoreRehearsal } from "./contentBulkPatchRestoreRehearsalView.js?v=675";
import { createContentBulkPatchDryRunPreview } from "./contentBulkPatchDryRunImporter.js?v=675";
import { renderContentBulkPatchDryRunPreview } from "./contentBulkPatchDryRunView.js?v=675";
import { createContentBulkPatchIntakeContract } from "./contentBulkPatchIntakeContract.js?v=675";
import { renderContentBulkPatchIntakeContract } from "./contentBulkPatchIntakeContractView.js?v=675";
import {
  createContentBulkPatchPackageAdapterPreview,
  createContentBulkPatchPackageAdapterTemplate,
} from "./contentBulkPatchPackageAdapter.js?v=675";
import { renderContentBulkPatchPackageAdapterPreview } from "./contentBulkPatchPackageAdapterView.js?v=675";
import { createContentBulkPackageOverview } from "./contentBulkPackageOverview.js?v=675";
import { renderContentBulkPackageOverview } from "./contentBulkPackageOverviewView.js?v=675";
import { renderContentBulkFilterControls } from "./contentBulkFilterControlsView.js?v=675";
import { createLootSkillBulkIntakePreview } from "./lootSkillBulkIntakePreview.js?v=675";
import { renderLootSkillBulkIntakePreview } from "./lootSkillBulkIntakeView.js?v=675";
import { createContentBulkPatchDiffExport } from "./contentBulkPatchDiffExport.js?v=675";
import { renderContentBulkPatchDiffExport } from "./contentBulkPatchDiffExportView.js?v=675";
import { createContentBulkPatchFilePatchDraft } from "./contentBulkPatchFilePatchDraft.js?v=675";
import { renderContentBulkPatchFilePatchDraft } from "./contentBulkPatchFilePatchDraftView.js?v=675";
import { createContentBulkPatchFilePatchDraftExport } from "./contentBulkPatchFilePatchDraftExport.js?v=675";
import { renderContentBulkPatchFilePatchDraftExport } from "./contentBulkPatchFilePatchDraftExportView.js?v=675";
import { createContentBulkPatchManualApplyChecklist } from "./contentBulkPatchManualApplyChecklist.js?v=675";
import { renderContentBulkPatchManualApplyChecklist } from "./contentBulkPatchManualApplyChecklistView.js?v=675";
import { createContentBulkPatchStagedImportPreview } from "./contentBulkPatchStagedImportPreview.js?v=675";
import { renderContentBulkPatchStagedImportPreview } from "./contentBulkPatchStagedImportView.js?v=675";
import { renderContentBulkMassApplyReadiness } from "./contentBulkMassApplyReadinessView.js?v=675";
import { renderContentBulkStagedApplyRehearsal } from "./contentBulkStagedApplyRehearsalView.js?v=675";
import { renderContentBulkDomainApplyReadiness } from "./contentBulkDomainApplyReadinessView.js?v=675";
import { renderContentBulkStagedContractSummary } from "./contentBulkStagedContractSummaryView.js?v=675";
import { renderContentBulkRowContractReviewChip } from "./contentBulkRowContractReviewView.js?v=675";
import { createTutorialIslandPacingSnapshot } from "./tutorialIslandPacingPreview.js?v=675";
import { createCombatVfxPlacementPreview } from "./combatVfxPlacementPreview.js?v=675";
import {
  formatCombatVfxPlacement,
  renderCombatVfxPlacementDetailView,
} from "./combatVfxPlacementView.js?v=675";
import {
  createRuntimeVfxBulkIntakePreview,
  createRuntimeVfxBulkIntakeTemplate,
} from "./runtimeVfxBulkIntakePreview.js?v=675";
import { renderRuntimeVfxBulkIntakePreview } from "./runtimeVfxBulkIntakeView.js?v=675";
import { createMonsterCandidateRewardPreview } from "./monsterCandidateRewardPreview.js?v=675";
import { renderMonsterCandidateRewardPreview } from "./monsterCandidateRewardView.js?v=675";
import { createMonsterCandidatePromotionChecklist } from "./monsterCandidatePromotionChecklist.js?v=675";
import { renderMonsterCandidatePromotionChecklist } from "./monsterCandidatePromotionView.js?v=675";
import { createMonsterCandidateLivePromotionPlan } from "./monsterCandidateLivePromotionPlan.js?v=675";
import { renderMonsterCandidateLivePromotionPlan } from "./monsterCandidateLivePromotionView.js?v=675";
import { createMonsterCandidateLivePatchDraft } from "./monsterCandidateLivePatchDraft.js?v=675";
import { renderMonsterCandidateLivePatchDraft } from "./monsterCandidateLivePatchDraftView.js?v=675";
import { createMonsterCandidateBulkPatchAutomationPreview } from "./monsterCandidateBulkPatchAutomation.js?v=675";
import { renderMonsterCandidateBulkPatchAutomation } from "./monsterCandidateBulkPatchAutomationView.js?v=675";
import {
  createMonsterSpriteReadyConnectionPatchPlan,
  createMonsterSpriteReadyConnectionReview,
  createMonsterSpriteSlotReport,
} from "./monsterSpriteSlotReport.js?v=675";
import { renderMonsterSpriteSlotReportView } from "./monsterSpriteSlotReportView.js?v=675";
import { createMonsterRuntimeIntegrationPreview } from "./monsterRuntimeIntegrationPreview.js?v=675";
import { renderMonsterRuntimeIntegrationView } from "./monsterRuntimeIntegrationView.js?v=675";
import { createMonsterRuntimeBulkIntakePreview } from "./monsterRuntimeBulkIntakePreview.js?v=675";
import { renderMonsterRuntimeBulkIntakePreview } from "./monsterRuntimeBulkIntakeView.js?v=675";
import { renderSaveSlotDiagnosticsShell } from "./saveSlotDiagnosticsView.js?v=675";
import { renderSaveSlotValidationPlanView } from "./saveSlotValidationPlanView.js?v=675";
import { renderSaveSlotDraftPayloadView } from "./saveSlotDraftPayloadView.js?v=675";
import { renderSaveSlotDraftDiffSummaryView } from "./saveSlotDraftDiffSummaryView.js?v=675";
import { renderSaveSlotApplyGateChecklistView } from "./saveSlotApplyGateChecklistView.js?v=675";
import { renderSaveSlotRecoveryRehearsalView } from "./saveSlotRecoveryRehearsalView.js?v=675";
import { renderSaveSlotEditInputSchemaView } from "./saveSlotEditInputSchemaView.js?v=675";
import { renderSaveSlotEditValidationMatrixView } from "./saveSlotEditValidationMatrixView.js?v=675";
import { renderSaveSlotEditRuleDrilldownView } from "./saveSlotEditRuleDrilldownView.js?v=675";
import { renderSaveSlotEditSamplePayloadView } from "./saveSlotEditSamplePayloadView.js?v=675";
import { renderSaveSlotEditValidatorDryRunView } from "./saveSlotEditValidatorDryRunView.js?v=675";
import { renderSaveSlotEditValidatorRegistryView } from "./saveSlotEditValidatorRegistryView.js?v=675";
import { renderSaveSlotEditValidatorResultView } from "./saveSlotEditValidatorResultView.js?v=675";
import { renderSaveSlotEditValidatorExecutableDryRunView } from "./saveSlotEditValidatorExecutableDryRunView.js?v=675";
import { renderSaveSlotEditProposedValueInjectorView } from "./saveSlotEditProposedValueInjectorView.js?v=675";
import { renderSaveSlotEditDryRunSampleComparatorView } from "./saveSlotEditDryRunSampleComparatorView.js?v=675";
import { renderSaveSlotEditSampleBridgeBlockerView } from "./saveSlotEditSampleBridgeBlockerView.js?v=675";
import { renderSaveSlotEditProducedResultBridgeView } from "./saveSlotEditProducedResultBridgeView.js?v=675";
import { renderSaveSlotEditBridgeTransitionView } from "./saveSlotEditBridgeTransitionView.js?v=675";
import { renderSaveSlotEditValidatorResultSourceAdapterView } from "./saveSlotEditValidatorResultSourceAdapterView.js?v=675";
import { renderSaveSlotEditSelectedSourceHandoffView } from "./saveSlotEditSelectedSourceHandoffView.js?v=675";
import { renderSaveSlotEditAdapterRunnerPreflightView } from "./saveSlotEditAdapterRunnerPreflightView.js?v=675";
import { renderSaveSlotEditConfirmationSourceSelectionView } from "./saveSlotEditConfirmationSourceSelectionView.js?v=675";
import { renderSaveSlotEditConfirmationInputShellView } from "./saveSlotEditConfirmationInputShellView.js?v=675";
import { renderSaveSlotEditConfirmationMatchReviewView } from "./saveSlotEditConfirmationMatchReviewView.js?v=675";
import { renderSaveSlotEditSubmitRunnerBlockerView } from "./saveSlotEditSubmitRunnerBlockerView.js?v=675";
import { renderSaveSlotEditFinalApplyRunnerHandoffView } from "./saveSlotEditFinalApplyRunnerHandoffView.js?v=675";
import { renderSaveSlotEditApplyRunnerPayloadShapeView } from "./saveSlotEditApplyRunnerPayloadShapeView.js?v=675";
import { renderSaveSlotEditPayloadBridgeCompatibilityView } from "./saveSlotEditPayloadBridgeCompatibilityView.js?v=675";
import { renderSaveSlotEditValidatorApplyGateBridgeView } from "./saveSlotEditValidatorApplyGateBridgeView.js?v=675";
import { renderSaveSlotEditCompatibilityConfirmationRollupView } from "./saveSlotEditCompatibilityConfirmationRollupView.js?v=675";
import { renderSaveSlotEditValidatorConfirmationPreflightView } from "./saveSlotEditValidatorConfirmationPreflightView.js?v=675";
import { renderSaveSlotEditConfirmationInputContractView } from "./saveSlotEditConfirmationInputContractView.js?v=675";
import { renderSaveSlotEditConfirmationRunnerHandoffView } from "./saveSlotEditConfirmationRunnerHandoffView.js?v=675";
import { renderSaveSlotEditWriterPayloadCheckpointView } from "./saveSlotEditWriterPayloadCheckpointView.js?v=675";
import { renderSaveSlotEditPostWriteRestoreContractView } from "./saveSlotEditPostWriteRestoreContractView.js?v=675";
import { renderSaveSlotEditWriterEnablementRiskView } from "./saveSlotEditWriterEnablementRiskView.js?v=675";

const EDITOR_VERSION = "675";
const MANIFEST_URL = `data/editor-manifest.json?v=${EDITOR_VERSION}`;
const BACKLOG_URL = `data/editor-backlog.json?v=${EDITOR_VERSION}`;
const EDITOR_TEXT = getLocaleText().editorPrep;
const SAVE_EDIT_VALIDATOR_EXECUTORS = Object.freeze({
  "min:1": validateSaveEdit_min_1,
  "min:0": validateSaveEdit_min_0,
  "known-region-id": validateSaveEdit_known_region_id,
  "known-region-id-list": validateSaveEdit_known_region_id_list,
  "gate-map-shape": validateSaveEdit_gate_map_shape,
  "known-item-id-list": validateSaveEdit_known_item_id_list,
  "known-equipment-slot-map": validateSaveEdit_known_equipment_slot_map,
  "profile-text-limit": validateSaveEdit_profile_text_limit,
  "portrait-frame-shape": validateSaveEdit_portrait_frame_shape,
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
const MONSTER_RUNTIME_INTEGRATION_PREVIEW = createMonsterRuntimeIntegrationPreview();
const MONSTER_RUNTIME_BULK_INTAKE_PREVIEW = createMonsterRuntimeBulkIntakePreview(MONSTER_RUNTIME_INTEGRATION_PREVIEW);
const COMBAT_VFX_DETAIL_TEXT = Object.freeze({
  title: "Combat VFX Placement Preview",
  description: "Read-only placement summary for player and monster attack effects.",
  summary: "Players {playerRows} / Monsters {monsterRows} / Effects {effectTypes}",
  playerTitle: "Player Attack Effects",
  monsterTitle: "Monster Attack Effects",
  base: "Base",
  hyper: "Hyper",
  effects: "Effect Types",
  motion: "Motion",
  sfx: "SFX",
  placement: "Placement",
  sprite: "Sprite",
  playerMetric: "Player VFX",
  monsterMetric: "Monster VFX",
  profileMetric: "Motion Profiles",
  profileTuningMetric: "Profile Signals",
  effectMetric: "Effect Types",
  tuningMetric: "Tuning Signals",
  tuningTitle: "Tuning Signal Summary",
  tuningDescription: "Review wide or offset-heavy placements first before manual VFX tuning.",
  profileTitle: "Monster Motion Profile Summary",
  profileDescription: "Compare monster VFX ranges by runtime motion profile before editing placement values.",
  profileCount: "{count} profiles",
  profileMonsterCount: "{count} monsters",
  profileBaseRange: "Base range",
  profileHyperRange: "Hyper range",
  profileDefaultEffects: "Default effects",
  profileModifiers: "Profile modifiers",
  profileEffects: "Effect ranges",
  profileSignals: "Profile signals",
  noProfileSignals: "Stable range",
  candidateCount: "{count} candidates",
  candidatePriority: "Priority {priority}",
  candidateSignals: "Signals",
  candidatePlacement: "Placement",
  noTuningCandidates: "No tuning signals",
  metricLabel: "Combat VFX",
  metricValue: "Players {playerRows} ? Monsters {monsterRows}",
  metricHint: "Attack effect placement preview ready",
  classLabels: {},
  genderLabels: {},
  effectLabels: {},
  signalLabels: {}
});
const COMBAT_VFX_CLASS_LABELS = Object.freeze({
  warrior: "Warrior",
  assassin: "Assassin",
  fighter: "Fighter",
  archer: "Archer",
  mage_wandbook: "Wand-book Mage",
  mage_staff: "Staff Mage"
});
const COMBAT_VFX_GENDER_LABELS = Object.freeze({
  male: "Male",
  female: "Female"
});
const COMBAT_VFX_EFFECT_LABELS = Object.freeze({
  slash: "Slash",
  impact: "Impact",
  pierce: "Pierce",
  projectile: "Projectile",
  magic: "Magic",
  holy: "Holy",
  dark: "Dark",
  explosion: "Explosion"
});
const COMBAT_VFX_SIGNAL_LABELS = Object.freeze({
  "expanded-width-critical": "Expanded slash critical",
  "expanded-width-wide": "Expanded slash wide",
  "slash-width-wide": "Slash width wide",
  "vertical-offset-high": "Vertical offset high",
  "horizontal-offset-high": "Horizontal offset high",
  "text-offset-high": "Text offset high"
});
const MONSTER_SPRITE_REPORT_TEXT = Object.freeze({
  title: "Monster Battle Sprite Slot Readiness",
  description: "Read-only checklist for monster idle, attack, hit, and dead sprite files before final PNG/WebP production.",
  slotMetric: "Total Slots",
  assignedMetric: "Assigned",
  connectableMetric: "Connectable",
  missingMetric: "Missing",
  brokenMetric: "Broken",
  fileScanMetric: "File-ready",
  fallbackMetric: "CSS fallback",
  connectionPlanTitle: "Ready Connection Plan",
  connectionPlanDescription: "Only file-ready monster sprites become connection patch candidates.",
  readyPatchMetric: "Ready patches",
  readyManifestMetric: "Manifest entries",
  readyFileMetric: "Ready files",
  missingFileMetric: "Missing files",
  applyModeMetric: "Apply mode",
  reviewStatusMetric: "Review status",
  reviewChecklistTitle: "Review gate",
  reviewCheckPassed: "OK",
  reviewCheckPending: "Pending",
  handoffTitle: "Missing File Handoff",
  handoffDescription: "Output-only production handoff for the exact monster WebP files that are still missing.",
  handoffArtifactMetric: "Artifact",
  handoffScriptMetric: "Script",
  handoffMissingMetric: "Missing files",
  handoffGroupsMetric: "Monster groups",
  statusLabels: {
    "waiting-for-monster-files": "Waiting for monster files",
    "ready-for-manual-review": "Ready for manual review",
    "blocked-broken-slots": "Blocked by broken slots"
  },
  nextStepLabels: {
    "add-monster-files": "Add the expected WebP files before applying sprite slot patches.",
    "review-ready-patch": "Review art, manifest entries, and slot patches before applying.",
    "fix-broken-slots": "Fix broken assigned sprite slots before adding new ready patches."
  },
  reviewCheckLabels: {
    "file-ready-only": "Only file-ready rows can become patches",
    "has-ready-files": "At least one monster sprite file is ready",
    "no-broken-slots": "No broken assigned monster sprite slots",
    "ready-patches-match-connectable": "Ready patch count matches connectable rows"
  },
  expectedPath: "Expected file",
  assignedAsset: "Assigned asset",
  suggestedAsset: "Suggested asset",
  slotPatch: "Slot patch",
  fileStatus: "File scan",
  runtimePath: "Runtime path",
  runtimePreview: "Runtime preview",
  fallbackMode: "Fallback",
  fallbackSummaryTitle: "Fallback summary",
  fallbackSummaryDescription: "Runtime fallback distribution before final monster art is assigned.",
  monsterFallbackSummary: "Monster fallback states",
  defaultSlot: "Default slot",
  fallbackModeLabels: {
    "assigned-asset": "Assigned asset",
    "broken-asset": "Broken asset",
    "default-slot": "Default slot",
    "css-placeholder": "CSS placeholder"
  },
  statusLabels: {
    assigned: "Assigned",
    connectable: "Connectable",
    missing: "Missing",
    broken: "Broken"
  },
  fileStatusLabels: {
    "not-scanned": "Not scanned",
    "file-ready": "File ready",
    "file-missing": "File missing"
  }
});

const SAVE_KEYS = [
  "project_regressor_mvp_save",
  "project_regressor_save_slots",
  "project_regressor_active_save_slot",
  "project_regressor_ui_state",
  "project_regressor_editor_retarget_filter",
  "project_regressor_editor_balance_filter",
  "project_regressor_editor_combat_vfx_filter",
  "project_regressor_editor_content_bulk_filter",
  "project_regressor_editor_content_bulk_package_input"
];
const SAVE_SLOT_DIAGNOSTIC_KEYS = Object.freeze({
  activeSave: "project_regressor_mvp_save",
  slotStore: "project_regressor_save_slots",
  activeSlot: "project_regressor_active_save_slot",
  uiState: "project_regressor_ui_state"
});
const SAVE_SLOT_DIAGNOSTIC_SLOT_IDS = Object.freeze(["slot1", "slot2", "slot3", "slot4", "slot5"]);
const SAVE_SLOT_DIAGNOSTIC_NO_ACTIVE = "__none__";
const RETARGET_FILTER_STORAGE_KEY = "project_regressor_editor_retarget_filter";
const BALANCE_FILTER_STORAGE_KEY = "project_regressor_editor_balance_filter";
const COMBAT_VFX_FILTER_STORAGE_KEY = "project_regressor_editor_combat_vfx_filter";
const CONTENT_BULK_FILTER_STORAGE_KEY = "project_regressor_editor_content_bulk_filter";
const CONTENT_BULK_PACKAGE_INPUT_STORAGE_KEY = "project_regressor_editor_content_bulk_package_input";
const CONTENT_BULK_DOMAIN_FILTERS = Object.freeze([
  "all",
  "monster",
  "equipment_item",
  "loot_item",
  "skill",
  "reward_link",
  "monster_runtime",
  "runtime_vfx"
]);

let manifest = null;
let backlog = null;
let activePanelId = "";
const storedRetargetDetailFilter = loadRetargetDetailFilter();
let retargetDetailFilter = storedRetargetDetailFilter.filter;
const expandedRetargetRows = new Set(storedRetargetDetailFilter.expandedRows);
let balanceDetailFilter = loadBalanceDetailFilter();
let combatVfxDetailFilter = loadCombatVfxDetailFilter();
let contentBulkDetailFilter = loadContentBulkDetailFilter();
let contentBulkPatchPackageInput = loadContentBulkPatchPackageInput();
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

const elements = {
  nav: document.getElementById("editor-panel-nav"),
  summaryTitle: document.getElementById("editor-summary-title"),
  summaryCopy: document.getElementById("editor-summary-copy"),
  metrics: document.getElementById("editor-metrics"),
  panelDetail: document.getElementById("editor-panel-detail"),
  assetGrid: document.getElementById("editor-asset-grid"),
  saveGrid: document.getElementById("editor-save-grid"),
  prototypeList: document.getElementById("editor-prototype-list"),
  backlogList: document.getElementById("editor-backlog-list"),
  exportSummary: document.getElementById("editor-export-summary"),
  refreshSaves: document.getElementById("editor-refresh-saves"),
  downloadManifest: document.getElementById("editor-download-manifest"),
  downloadBacklog: document.getElementById("editor-download-backlog")
};

applyDomLocalization(document);
initEditor();

async function initEditor() {
  try {
    [manifest, backlog] = await Promise.all([
      fetchJson(MANIFEST_URL),
      fetchJson(BACKLOG_URL)
    ]);
    activePanelId = manifest.panels?.[0]?.id || "";
    renderEditor();
    bindEvents();
  } catch (error) {
    renderError(error);
  }
}

async function fetchJson(url) {
  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) throw new Error(tf("editorPrep.loadFailed", { url, status: response.status }));
  return response.json();
}

function bindEvents() {
  elements.nav?.addEventListener("click", (event) => {
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
  renderSummary();
  renderNav();
  renderPanelDetail();
  renderAssets();
  renderSaveKeys();
  renderPrototypeList();
  renderBacklog();
}

function renderSummary() {
  const panelCount = manifest.panels?.length || 0;
  const imageCount = manifest.assetSlots?.image?.length || 0;
  const audioCount = manifest.assetSlots?.audio?.length || 0;
  const backlogCount = backlog.items?.length || 0;
  const retargetPreview = createMurimRetargetPreview();

  setText(elements.summaryTitle, EDITOR_TEXT.summaryTitle);
  setText(elements.summaryCopy, EDITOR_TEXT.summaryCopy);

  elements.metrics.innerHTML = [
    localizedMetricCard("panel", panelCount),
    localizedMetricCard("imageSlot", imageCount),
    localizedMetricCard("audioSlot", audioCount),
    localizedMetricCard("backlog", backlogCount),
    retargetPreviewMetricCard(retargetPreview),
    balanceRegistryMetricCard(),
    combatVfxPlacementMetricCard()
  ].join("");
}

function renderNav() {
  const grouped = manifest.editorTheme?.navigationGroups || [];
  const panels = new Map((manifest.panels || []).map((panel) => [panel.id, panel]));
  const html = grouped.map((group) => {
    const buttons = (group.panels || [])
      .map((id) => panels.get(id))
      .filter(Boolean)
      .map((panel) => panelButton(panel))
      .join("");
    return `
      <section class="editor-nav-group">
        <h3>${escapeHtml(group.label)}</h3>
        ${buttons}
      </section>
    `;
  }).join("");
  elements.nav.innerHTML = html;
}

function panelButton(panel) {
  const activeClass = panel.id === activePanelId ? " is-active" : "";
  return `
    <button class="editor-panel-button${activeClass}" type="button" data-panel-id="${escapeAttribute(panel.id)}">
      <span>${escapeHtml(panel.label)}</span>
      <small>${escapeHtml(statusLabel(panel.status))}</small>
    </button>
  `;
}

function renderPanelDetail() {
  const panel = (manifest.panels || []).find((item) => item.id === activePanelId) || manifest.panels?.[0];
  if (!panel) {
    elements.panelDetail.innerHTML = `<p class="muted">${escapeHtml(EDITOR_TEXT.noPanel)}</p>`;
    return;
  }
  const retargetDetail = panel.id === "theme_retarget_preview" ? renderRetargetPreviewDetail() : "";
  const balanceDetail = panel.id === "balance_tuning_registry" ? renderBalanceTuningDetail() : "";
  const combatVfxDetail = panel.id === "combat_vfx_placement_preview" ? renderCombatVfxPlacementDetail() : "";
  const monsterSpriteReport = panel.id === "asset_registry" ? renderMonsterSpriteSlotReport() : "";
  const monsterRuntimePreview = panel.id === "asset_registry" ? renderMonsterRuntimeIntegrationPreview() : "";
  const saveSlotDiagnostics = panel.id === "save_data" ? renderSaveSlotDiagnostics() : "";

  elements.panelDetail.innerHTML = `
    <div class="editor-detail-header">
      <div>
        <h2>${escapeHtml(panel.label)}</h2>
        <p class="muted">${escapeHtml(panel.purpose || "")}</p>
      </div>
      <span class="editor-status-pill" data-status="${escapeAttribute(panel.status || "planned")}">${escapeHtml(statusLabel(panel.status))}</span>
    </div>
    <div class="editor-detail-grid">
      ${detailBlock(EDITOR_TEXT.detailTitles.dataTargets, panel.primaryDataTargets)}
      ${detailBlock(EDITOR_TEXT.detailTitles.assetSlots, panel.assetSlots)}
      ${detailBlock(EDITOR_TEXT.detailTitles.editorFields, panel.editorFields)}
      ${detailBlock(EDITOR_TEXT.detailTitles.futureControls, panel.futureControls)}
    </div>
    ${panel.nodeTypes ? `<div class="editor-chip-section"><strong>${escapeHtml(EDITOR_TEXT.detailTitles.nodeTypes)}</strong><div class="editor-chip-list">${panel.nodeTypes.map((type) => chip(type)).join("")}</div></div>` : ""}
    ${retargetDetail}
    ${balanceDetail}
    ${combatVfxDetail}
    ${monsterSpriteReport}
    ${monsterRuntimePreview}
    ${saveSlotDiagnostics}
  `;
}

function renderMonsterRuntimeIntegrationPreview() {
  const preview = MONSTER_RUNTIME_INTEGRATION_PREVIEW;
  const detailText = EDITOR_TEXT.monsterRuntimeIntegrationPreview || {};
  return renderMonsterRuntimeIntegrationView(preview, detailText);
}

function renderMonsterSpriteSlotReport() {
  const detailText = {
    ...MONSTER_SPRITE_REPORT_TEXT,
    ...(EDITOR_TEXT.monsterSpriteSlotReport || {})
  };
  const report = MONSTER_SPRITE_SLOT_REPORT;
  const readiness = manifest?.monsterSpriteSlotReadiness || {};
  return renderMonsterSpriteSlotReportView({
    report,
    readiness,
    plan: MONSTER_SPRITE_READY_CONNECTION_PLAN,
    review: MONSTER_SPRITE_READY_CONNECTION_REVIEW,
    detailText,
  });
}

function renderCombatVfxPlacementDetail() {
  const detailText = {
    ...COMBAT_VFX_DETAIL_TEXT,
    ...(EDITOR_TEXT.combatVfxPlacementDetail || {})
  };
  const preview = COMBAT_VFX_PLACEMENT_PREVIEW;
  const playerRows = preview.playerRows || [];
  const monsterRows = preview.monsterRows || [];
  const visiblePlayerRows = playerRows.filter((row) => matchesCombatVfxFilter("player", combatVfxPlayerSearchText(row)));
  const visibleMonsterRows = monsterRows.filter((row) => matchesCombatVfxFilter("monster", combatVfxMonsterSearchText(row)));
  return renderCombatVfxPlacementDetailView({
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

function matchesCombatVfxFilter(kind, searchText) {
  const filterKind = normalizeCombatVfxKind(combatVfxDetailFilter.kind);
  const query = normalizeSearchText(combatVfxDetailFilter.query);
  if (filterKind !== "all" && filterKind !== kind) return false;
  return !query || searchText.includes(query);
}

function combatVfxPlayerSearchText(row) {
  return [
    "player",
    row.id,
    row.classId,
    row.gender,
    row.spritePath,
    ...Object.keys(row.effects || {}),
    ...Object.values(row.effects || {}).map(formatCombatVfxPlacement)
  ].join(" ").toLowerCase();
}

function combatVfxMonsterSearchText(row) {
  return [
    "monster",
    row.id,
    row.name,
    row.classId,
    row.motionProfile,
    row.sfxProfile,
    row.effectType,
    ...(row.effectModifiers || []),
    formatCombatVfxPlacement(row.profilePlacement),
    formatCombatVfxPlacement(row.basePlacement),
    formatCombatVfxPlacement(row.hyperPlacement),
    ...Object.keys(row.effects || {}),
    ...Object.values(row.effects || {}).map(formatCombatVfxPlacement)
  ].join(" ").toLowerCase();
}

function renderBalanceTuningDetail() {
  const detailText = EDITOR_TEXT.balanceTuningDetail || {};
  const registryMeta = manifest.balanceTuningRegistry || {};
  const relatedChecks = Array.isArray(registryMeta.relatedChecks) ? registryMeta.relatedChecks : [];
  const tuningCandidates = Array.isArray(registryMeta.tuningCandidates) ? registryMeta.tuningCandidates : [];
  const pacingSnapshot = createTutorialIslandPacingSnapshot();
  const fileCount = new Set(BALANCE_TUNING_GROUPS.flatMap((group) => group.files)).size;
  const exportCount = BALANCE_TUNING_GROUPS.reduce((sum, group) => sum + group.exports.length, 0);
  const visibleGroups = BALANCE_TUNING_GROUPS.filter((group) => matchesBalanceDetailFilter(group));
  const rows = visibleGroups.map((group) => renderBalanceGroupRow(group, detailText, {
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
  });

  return renderBalanceTuningDetailView({
    detailText,
    groupCount: BALANCE_TUNING_GROUPS.length,
    fileCount,
    exportCount,
    sections: [
      renderBalanceFilterControls(detailText, visibleGroups.length, BALANCE_TUNING_GROUPS.length, {
        filter: balanceDetailFilter,
      }),
      renderActiveBalanceCandidateSummary(detailText, relatedChecks, tuningCandidates, visibleGroups, {
        activeCandidate: selectedBalanceTuningCandidate(),
        groups: BALANCE_TUNING_GROUPS,
        previewById: BALANCE_TUNING_PREVIEW_BY_ID,
      }),
      renderBalanceDomainSummaries(BALANCE_TUNING_DOMAIN_SUMMARIES, detailText, relatedChecks, {
        groups: BALANCE_TUNING_GROUPS,
        previewById: BALANCE_TUNING_PREVIEW_BY_ID,
      }),
      renderBalancePacingSnapshot(pacingSnapshot, detailText),
      renderMonsterCandidateRewardPreview(MONSTER_CANDIDATE_REWARD_PREVIEW, detailText),
      renderMonsterCandidatePromotionChecklist(MONSTER_CANDIDATE_PROMOTION_CHECKLIST, detailText),
      renderMonsterCandidateLivePromotionPlan(MONSTER_CANDIDATE_LIVE_PROMOTION_PLAN, detailText),
      renderMonsterCandidateLivePatchDraft(MONSTER_CANDIDATE_LIVE_PATCH_DRAFT, detailText),
      renderMonsterCandidateBulkPatchAutomation(MONSTER_CANDIDATE_BULK_PATCH_AUTOMATION, detailText),
      renderContentBulkPatchAutomationPlan(CONTENT_BULK_PATCH_AUTOMATION_PLAN, detailText),
      renderContentBulkPatchIntakeContract(CONTENT_BULK_PATCH_INTAKE_CONTRACT, detailText),
      renderContentBulkPackageOverview(contentBulkPackageOverview, detailText, contentBulkFilterCounts, {
        renderFilterControls: (text, counts) => renderContentBulkFilterControls(text, counts, {
          filter: contentBulkDetailFilter,
          domainFilters: CONTENT_BULK_DOMAIN_FILTERS,
        }),
      }),
      renderContentBulkPatchPackageAdapterPreview(contentBulkPatchPackageAdapterPreview, detailText, {
        input: contentBulkPatchPackageInput,
        parseError: contentBulkPatchPackageParseError,
        isMappingVisible: (mapping, text = {}) => matchesContentBulkFilterRow(Number(mapping.rowCount || 0) > 0 ? "active" : "empty", [
          mapping,
          contentBulkPatchDomainLabel(mapping.domainId, text),
        ], [mapping.domainId]),
      }),
      renderLootSkillBulkIntakePreview(lootSkillBulkIntakePreview, detailText, {
        matchesFilterRow: (state, values, domains) => matchesContentBulkFilterRow(state, values, domains),
      }),
      renderMonsterRuntimeBulkIntakePreview(MONSTER_RUNTIME_BULK_INTAKE_PREVIEW, detailText, {
        matchesFilterRow: (state, values, domains) => matchesContentBulkFilterRow(state, values, domains),
      }),
      renderRuntimeVfxBulkIntakePreview(runtimeVfxBulkIntakePreview, detailText, {
        matchesFilterRow: (state, values, domains) => matchesContentBulkFilterRow(state, values, domains),
        formatPlacement: (placement) => formatCombatVfxPlacement(placement),
      }),
      renderContentBulkMassApplyReadiness({
        dryRun: CONTENT_BULK_PATCH_DRY_RUN_PREVIEW,
        stagedImport: CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW,
        applyGate: contentBulkPatchApplyGatePlan,
        backupPlan: contentBulkPatchBackupPlan,
        restoreRehearsal: contentBulkPatchRestoreRehearsal,
      }, detailText),
      renderContentBulkStagedApplyRehearsal({
        stagedImport: CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW,
        filePatchDraftExport: contentBulkPatchFilePatchDraftExport,
        backupPlan: contentBulkPatchBackupPlan,
        restoreRehearsal: contentBulkPatchRestoreRehearsal,
      }, detailText),
      renderContentBulkDomainApplyReadiness({
        dryRun: CONTENT_BULK_PATCH_DRY_RUN_PREVIEW,
        stagedImport: CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW,
        filePatchDraftExport: contentBulkPatchFilePatchDraftExport,
        backupPlan: contentBulkPatchBackupPlan,
        restoreRehearsal: contentBulkPatchRestoreRehearsal,
        filterCounts: contentBulkFilterCounts,
      }, detailText, {
        activeFilter: (text) => contentBulkActiveFilterSummary(text),
        matchesFilterRow: (state, values, domains) => matchesContentBulkFilterRow(state, values, domains),
        domainLabel: (id, text) => contentBulkPatchDomainLabel(id, text),
      }),
      renderContentBulkPatchDryRunPreview(CONTENT_BULK_PATCH_DRY_RUN_PREVIEW, detailText),
      renderContentBulkPatchStagedImportPreview(CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW, detailText),
      renderContentBulkPatchDiffExport(CONTENT_BULK_PATCH_DIFF_EXPORT, detailText),
      renderContentBulkPatchManualApplyChecklist(CONTENT_BULK_PATCH_MANUAL_APPLY_CHECKLIST, detailText),
      renderContentBulkPatchFilePatchDraft(contentBulkPatchFilePatchDraftExport.draft || CONTENT_BULK_PATCH_FILE_PATCH_DRAFT, detailText, {
        backupPlan: contentBulkPatchBackupPlan,
        restoreRehearsal: contentBulkPatchRestoreRehearsal,
      }),
      renderContentBulkPatchFilePatchDraftExport(contentBulkPatchFilePatchDraftExport, detailText, {
        backupPlan: contentBulkPatchBackupPlan,
        restoreRehearsal: contentBulkPatchRestoreRehearsal,
      }),
      renderContentBulkPatchApplyGatePlan(contentBulkPatchApplyGatePlan, detailText),
      renderContentBulkPatchBackupPlan(contentBulkPatchBackupPlan, detailText),
      renderContentBulkPatchRestoreRehearsal(contentBulkPatchRestoreRehearsal, detailText),
      renderBalanceTuningCandidates(tuningCandidates, detailText, relatedChecks, {
        activeCandidateId: balanceDetailFilter.candidateId,
        groups: BALANCE_TUNING_GROUPS,
        previewById: BALANCE_TUNING_PREVIEW_BY_ID,
      }),
      renderBalanceRelatedChecks(relatedChecks, detailText),
    ],
    rowsHtml: rows || renderEmptyBalanceRows(detailText, {
      filter: balanceDetailFilter,
    }),
  });
}

function scrollBalanceCandidateSummaryIntoView() {
  window.requestAnimationFrame(() => {
    const summary = elements.panelDetail?.querySelector("[data-balance-active-summary]");
    summary?.scrollIntoView({ block: "start", behavior: "smooth" });
  });
}

function scrollContentBulkPackageIntoView() {
  window.requestAnimationFrame(() => {
    const packagePanel = elements.panelDetail?.querySelector(".editor-content-bulk-package");
    packagePanel?.scrollIntoView({ block: "start", behavior: "smooth" });
  });
}

function contentBulkPatchDomainLabel(domainId, text = {}) {
  return text.domainLabels?.[domainId] || domainId || "unknown";
}

function createContentBulkFilterCounts({
  adapterPreview = {},
  lootSkillPreview = {},
  monsterRuntimePreview = {},
  runtimeVfxPreview = {},
} = {}) {
  const counts = {
    states: {
      all: 0,
      blocked: 0,
      review: 0,
      ready: 0,
      active: 0,
      empty: 0,
    },
    domains: Object.fromEntries(CONTENT_BULK_DOMAIN_FILTERS.map((domain) => [domain, 0])),
    visibleRows: 0,
    visibleDomains: Object.fromEntries(CONTENT_BULK_DOMAIN_FILTERS.map((domain) => [domain, 0])),
  };
  const states = [
    ...(adapterPreview.mappings || []).map((mapping) => ({
      state: Number(mapping.rowCount || 0) > 0 ? "active" : "empty",
      values: mapping,
      domains: [mapping.domainId || ""],
    })),
    ...(lootSkillPreview.lootRows || []).map((row) => ({
      state: row.intakeState,
      values: row,
      domains: ["loot_item"],
    })),
    ...(lootSkillPreview.skillRows || []).map((row) => ({
      state: row.bulkState,
      values: row,
      domains: ["skill"],
    })),
    ...(monsterRuntimePreview.rows || []).map((row) => ({
      state: row.runtimeState,
      values: row,
      domains: ["monster", "monster_runtime"],
    })),
    ...(runtimeVfxPreview.rows || []).map((row) => ({
      state: row.intakeState,
      values: row,
      domains: ["runtime_vfx"],
    })),
  ];
  for (const { state, values, domains } of states) {
    if (!matchesContentBulkFilterQuery(values)) continue;
    const normalizedDomains = normalizeContentBulkRowDomains(domains);
    if (matchesContentBulkFilterDomain(normalizedDomains)) {
      const bucket = contentBulkStateBucket(state);
      counts.states.all += 1;
      counts.states[bucket] = Number(counts.states[bucket] || 0) + 1;
    }
    if (matchesContentBulkFilterState(state)) {
      counts.domains.all += 1;
      for (const domain of normalizedDomains) {
        if (Object.hasOwn(counts.domains, domain)) {
          counts.domains[domain] = Number(counts.domains[domain] || 0) + 1;
        }
      }
    }
    if (matchesContentBulkFilterRow(state, values, normalizedDomains)) {
      counts.visibleRows += 1;
      for (const domain of normalizedDomains) {
        if (Object.hasOwn(counts.visibleDomains, domain)) {
          counts.visibleDomains[domain] = Number(counts.visibleDomains[domain] || 0) + 1;
        }
      }
    }
  }
  return counts;
}

function contentBulkFilterLabel(state, labels = {}) {
  return labels?.[state] || state || "all";
}

function contentBulkDomainLabel(domain, labels = {}) {
  if (domain === "all") return labels?.all || "All";
  return labels?.[domain] || domain || "all";
}

function matchesContentBulkFilterState(state) {
  const filterState = normalizeContentBulkFilterState(contentBulkDetailFilter.state);
  if (filterState === "all") return true;
  return contentBulkStateBucket(state) === filterState;
}

function matchesContentBulkFilterRow(state, values = [], domains = []) {
  return matchesContentBulkFilterState(state)
    && matchesContentBulkFilterQuery(values)
    && matchesContentBulkFilterDomain(domains);
}

function matchesContentBulkFilterDomain(domains = []) {
  const filterDomain = normalizeContentBulkFilterDomain(contentBulkDetailFilter.domain);
  if (filterDomain === "all") return true;
  return normalizeContentBulkRowDomains(domains).includes(filterDomain);
}

function matchesContentBulkFilterQuery(values = []) {
  const query = normalizeContentBulkSearchQuery(contentBulkDetailFilter.query);
  if (!query) return true;
  return collectContentBulkSearchText(values).includes(query);
}

function collectContentBulkSearchText(values = []) {
  const parts = [];
  collectContentBulkSearchParts(values, parts);
  return parts.join(" ").toLowerCase();
}

function collectContentBulkSearchParts(value, parts) {
  if (value === null || value === undefined) return;
  if (Array.isArray(value)) {
    for (const entry of value) collectContentBulkSearchParts(entry, parts);
    return;
  }
  if (typeof value === "object") {
    for (const entry of Object.values(value)) collectContentBulkSearchParts(entry, parts);
    return;
  }
  parts.push(String(value));
}

function contentBulkStateBucket(state) {
  const value = String(state || "").trim();
  if (value === "empty") return "empty";
  if (value === "active") return "active";
  if (value.includes("blocked") || value.startsWith("withheld-")) return "blocked";
  if (value.startsWith("blocked-")) return "blocked";
  if (value.startsWith("review-")) return "review";
  if (value.includes("unlinked")) return "review";
  if (value === "ready-for-runtime-review") return "review";
  if (value.startsWith("ready-")) return "ready";
  if (value.startsWith("staged-")) return "ready";
  if (value.includes("linked")) return "ready";
  return "review";
}

function normalizeContentBulkFilterState(state) {
  return ["all", "blocked", "review", "ready", "active", "empty"].includes(state) ? state : "all";
}

function normalizeContentBulkFilterDomain(domain) {
  return CONTENT_BULK_DOMAIN_FILTERS.includes(domain) ? domain : "all";
}

function normalizeContentBulkSearchQuery(query) {
  return String(query || "").trim().toLowerCase();
}

function normalizeContentBulkRowDomains(domains = []) {
  return []
    .concat(domains || [])
    .map((domain) => String(domain || "").trim())
    .filter((domain) => domain && domain !== "all");
}

function contentBulkActiveFilterSummary(text = {}) {
  const state = normalizeContentBulkFilterState(contentBulkDetailFilter.state);
  const domain = normalizeContentBulkFilterDomain(contentBulkDetailFilter.domain);
  const query = normalizeContentBulkSearchQuery(contentBulkDetailFilter.query);
  return {
    state: contentBulkFilterLabel(state, text.filterLabels),
    domain: contentBulkDomainLabel(domain, text.domainLabels),
    query: query || (text.noQuery || "none"),
  };
}

function balanceDetailChipBlock(title, values = []) {
  return `
    <div class="editor-balance-chip-block">
      <span>${escapeHtml(title)}</span>
      <div class="editor-chip-list">${values.map((value) => chip(value)).join("")}</div>
    </div>
  `;
}

function matchesBalanceDetailFilter(group) {
  const scope = normalizeBalanceScope(balanceDetailFilter.scope);
  const query = normalizeSearchText(balanceDetailFilter.query);
  const candidateGroups = normalizeBalanceCandidateGroups(balanceDetailFilter.candidateGroups);
  if (scope !== "all" && group.scope !== scope) return false;
  if (candidateGroups.length && !candidateGroups.includes(group.id)) return false;
  return !query || balanceGroupSearchText(group).includes(query);
}

function balanceGroupSearchText(group) {
  return [
    group.id,
    group.scope,
    ...(group.files || []),
    ...(group.exports || []),
    ...(group.affects || [])
  ].join(" ").toLowerCase();
}

function renderRetargetPreviewDetail() {
  const preview = createMurimRetargetPreview();
  const detailText = EDITOR_TEXT.retargetDetail || {};
  return renderRetargetPreviewDetailView({
    preview,
    detailText,
    filter: retargetDetailFilter,
    expandedRows: expandedRetargetRows,
  });
}

function renderAssets() {
  const imageSlots = manifest.assetSlots?.image || [];
  const audioSlots = manifest.assetSlots?.audio || [];
  elements.assetGrid.innerHTML = renderEditorAssetSections({
    assetTypes: EDITOR_TEXT.assetTypes,
    imageSlots,
    audioSlots,
  });
}

function renderSaveKeys() {
  const summary = createSaveSummary();
  elements.saveGrid.innerHTML = renderEditorSaveKeyCards(summary.keys, EDITOR_TEXT.save);
}

function renderBacklog() {
  const items = backlog.items || [];
  elements.backlogList.innerHTML = renderEditorBacklogCards(items, {
    statusLabel,
  });
}

function renderPrototypeList() {
  const items = manifest.prototypeListMemory || [];
  elements.prototypeList.innerHTML = renderEditorPrototypeCards(items);
}

function detailBlock(title, values = []) {
  const list = Array.isArray(values) ? values : [];
  return `
    <section class="editor-detail-block">
      <h3>${escapeHtml(title)}</h3>
      <div class="editor-chip-list">${list.length ? list.map((value) => chip(value)).join("") : chip(EDITOR_TEXT.save.empty)}</div>
    </section>
  `;
}

function createSaveSummary() {
  const keys = SAVE_KEYS.map((key) => {
    const raw = window.localStorage.getItem(key);
    let detail = EDITOR_TEXT.save.noValue;
    if (raw) {
      detail = tf("editorPrep.save.chars", { count: raw.length.toLocaleString(EDITOR_TEXT.locale) });
      try {
        const parsed = JSON.parse(raw);
        detail = `${detail} · ${summarizeJson(parsed)}`;
      } catch {
        detail = `${detail} · ${EDITOR_TEXT.save.string}`;
      }
    }
    return { key, exists: Boolean(raw), detail };
  });
  return {
    exportedAt: new Date().toISOString(),
    editorVersion: EDITOR_VERSION,
    keys
  };
}

function summarizeJson(value) {
  if (!value || typeof value !== "object") return typeof value;
  if (Array.isArray(value)) return tf("editorPrep.save.array", { count: value.length });
  const keys = Object.keys(value);
  const details = [tf("editorPrep.save.fields", { count: keys.length })];
  if (keys.includes("player")) details.push(EDITOR_TEXT.save.includesPlayer);
  if (keys.includes("slots")) details.push(EDITOR_TEXT.save.includesSlots);
  return details.join(" · ");
}

function renderSaveSlotDiagnostics() {
  const diagnostics = createSaveSlotDiagnostics();
  const text = EDITOR_TEXT.saveDiagnostics || {};
  const activeSlotValue = diagnostics.activeSlot.raw || text.emptyValue || "";
  return renderSaveSlotDiagnosticsShell({
    diagnostics,
    text,
    keys: SAVE_SLOT_DIAGNOSTIC_KEYS,
    activeSlotValue,
    slotCountText: tf("editorPrep.saveDiagnostics.slotCountValue", {
      filled: diagnostics.slotCounts.filled,
      total: diagnostics.slotCounts.total,
      invalid: diagnostics.slotCounts.invalid,
    }, `${diagnostics.slotCounts.filled}/${diagnostics.slotCounts.total}`),
    renderMetricCard: metricCard,
    renderDiagnosticCard: renderSaveDiagnosticCard,
    statusLabel: saveDiagnosticStatusLabel,
    sections: [
      renderSaveSlotDiagnosticSection("validation-plan", () => renderSaveSlotValidationPlan(diagnostics)),
      renderSaveSlotDiagnosticSection("draft-payload", () => renderSaveSlotDraftPayloadPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("draft-diff", () => renderSaveSlotDraftDiffSummary(diagnostics)),
      renderSaveSlotDiagnosticSection("apply-gate", () => renderSaveSlotApplyGateChecklist(diagnostics)),
      renderSaveSlotDiagnosticSection("recovery-rehearsal", () => renderSaveSlotRecoveryRehearsalPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("edit-input-schema", () => renderSaveSlotEditInputSchemaPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("validation-matrix", () => renderSaveSlotEditValidationMatrix(diagnostics)),
      renderSaveSlotDiagnosticSection("rule-drilldown", () => renderSaveSlotEditValidationRuleDrilldown(diagnostics)),
      renderSaveSlotDiagnosticSection("sample-payload", () => renderSaveSlotEditSamplePayloadPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("validator-dry-run", () => renderSaveSlotEditValidatorDryRunPlan(diagnostics)),
      renderSaveSlotDiagnosticSection("validator-registry", () => renderSaveSlotEditValidatorRegistryContract(diagnostics)),
      renderSaveSlotDiagnosticSection("validator-result-schema", () => renderSaveSlotEditValidatorResultSchemaPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("validator-executable-dry-run", () => renderSaveSlotEditValidatorExecutableDryRunPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("proposed-value-injector", () => renderSaveSlotEditProposedValueInjectorPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("dry-run-sample-comparator", () => renderSaveSlotEditDryRunSampleComparatorPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("sample-bridge-blocker", () => renderSaveSlotEditSampleBridgeBlockerSummaryPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("produced-result-bridge", () => renderSaveSlotEditProducedResultBridgeContractPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("bridge-transition", () => renderSaveSlotEditBridgeTransitionChecklistPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("validator-source-adapter", () => renderSaveSlotEditValidatorResultSourceAdapterPlanPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("selected-source-handoff", () => renderSaveSlotEditSelectedSourceHandoffContractPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("adapter-runner-preflight", () => renderSaveSlotEditAdapterRunnerPreflightPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("confirmation-source-selection", () => renderSaveSlotEditConfirmationSourceSelectionContractPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("confirmation-input-shell", () => renderSaveSlotEditConfirmationInputShellContractPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("confirmation-match-review", () => renderSaveSlotEditConfirmationMatchReviewSummaryPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("submit-runner-blocker", () => renderSaveSlotEditSubmitRunnerBlockerContractPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("final-apply-runner-handoff", () => renderSaveSlotEditFinalApplyRunnerHandoffChecklistPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("apply-runner-payload", () => renderSaveSlotEditApplyRunnerPayloadShapePreview(diagnostics)),
      renderSaveSlotDiagnosticSection("payload-bridge-compatibility", () => renderSaveSlotEditPayloadBridgeCompatibilitySummaryPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("validator-apply-gate-bridge", () => renderSaveSlotEditValidatorApplyGateBridgePreview(diagnostics)),
      renderSaveSlotDiagnosticSection("compatibility-confirmation-rollup", () => renderSaveSlotEditCompatibilityConfirmationRollupPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("validator-confirmation-preflight", () => renderSaveSlotEditValidatorConfirmationPreflightPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("confirmation-input-contract", () => renderSaveSlotEditConfirmationInputContractPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("confirmation-runner-handoff", () => renderSaveSlotEditConfirmationRunnerHandoffSummaryPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("writer-payload-checkpoint", () => renderSaveSlotEditWriterPayloadCheckpointPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("postwrite-restore", () => renderSaveSlotEditPostWriteRestoreContractPreview(diagnostics)),
      renderSaveSlotDiagnosticSection("writer-enablement-risk", () => renderSaveSlotEditWriterEnablementRiskSummary(diagnostics)),
    ],
  });
}

function renderSaveSlotDiagnosticSection(id, renderSection) {
  try {
    return renderSection();
  } catch (error) {
    return `
      <section class="editor-save-diagnostics-error" data-save-diagnostics-error="${escapeAttribute(id)}" data-status="blocked">
        <h4>${escapeHtml(saveDiagnosticStatusLabel("blocked"))}</h4>
        <p>${escapeHtml(error?.message || id)}</p>
      </section>
    `;
  }
}

function renderSaveSlotValidationPlan(diagnostics) {
  const plan = createSaveSlotValidationPlan(diagnostics);
  const text = EDITOR_TEXT.saveValidation || {};
  return renderSaveSlotValidationPlanView({
    plan,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    readyCheckValue: tf("editorPrep.saveValidation.readyCheckValue", {
      ready: plan.readyChecks,
      total: plan.totalChecks,
    }, `${plan.readyChecks}/${plan.totalChecks}`),
  });
}

function createSaveSlotValidationPlan(diagnostics) {
  const text = EDITOR_TEXT.saveValidation || {};
  const activeSaveReady = diagnostics.activeSave.status === "ready";
  const slotStoreReady = diagnostics.slotStore.status === "ready";
  const activeSlotSafe = ["ready", "none", "empty"].includes(diagnostics.activeSlot.status);
  const rollbackReady = [diagnostics.activeSave, diagnostics.slotStore, diagnostics.uiState].every((entry) => entry.status !== "invalid") && activeSlotSafe;
  const checks = [
    saveValidationCheck("active-save-readable", activeSaveReady, text.checkLabels?.activeSaveReadable, diagnostics.activeSave.hint),
    saveValidationCheck("slot-store-readable", slotStoreReady, text.checkLabels?.slotStoreReadable, diagnostics.slotStore.hint),
    saveValidationCheck("active-slot-safe", activeSlotSafe, text.checkLabels?.activeSlotSafe, diagnostics.activeSlot.hint),
    saveValidationCheck("rollback-snapshot-ready", rollbackReady, text.checkLabels?.rollbackSnapshotReady, text.rollbackSnapshotDetail),
    saveValidationCheck("write-controls-blocked", true, text.checkLabels?.writeControlsBlocked, text.writeControlsBlockedDetail),
    saveValidationCheck("explicit-confirmation-required", false, text.checkLabels?.explicitConfirmationRequired, text.explicitConfirmationDetail),
    saveValidationCheck("apply-writer-disabled", false, text.checkLabels?.applyWriterDisabled, text.applyWriterDisabledDetail),
  ];
  return {
    checks,
    readyChecks: checks.filter((check) => check.status === "ready").length,
    totalChecks: checks.length,
    rollbackStatus: rollbackReady ? "ready" : "blocked",
    applyStatus: "blocked",
  };
}

function saveValidationCheck(id, isReady, label, detail) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
  };
}

function renderSaveSlotDraftPayloadPreview(diagnostics) {
  const preview = createSaveSlotDraftPayloadPreview(diagnostics);
  const text = EDITOR_TEXT.saveDraft || {};
  return renderSaveSlotDraftPayloadView({
    preview,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    targetValue: tf("editorPrep.saveDraft.targetValue", { count: preview.targetCount }, String(preview.targetCount)),
    fieldGroupValue: tf("editorPrep.saveDraft.fieldGroupValue", { count: preview.fieldGroups.length }, String(preview.fieldGroups.length)),
    operationValue: tf("editorPrep.saveDraft.operationValue", { count: preview.operationCount }, String(preview.operationCount)),
  });
}

function createSaveSlotDraftPayloadPreview(diagnostics) {
  const text = EDITOR_TEXT.saveDraft || {};
  const filledSlotIds = diagnostics.slots
    .filter((slot) => ["ready", "warning"].includes(slot.status))
    .map((slot) => slot.id);
  const fieldGroups = [
    saveDraftFieldGroup("player-core", text.fieldGroupLabels?.playerCore, [
      saveDraftField("player.level", "integer", "min:1"),
      saveDraftField("player.gold", "integer", "min:0"),
      saveDraftField("player.freePoints", "integer", "min:0"),
    ]),
    saveDraftFieldGroup("region", text.fieldGroupLabels?.region, [
      saveDraftField("regionId", "string", "known-region-id"),
      saveDraftField("completedRegions", "string[]", "known-region-id-list"),
      saveDraftField("gateProgress", "object", "gate-map-shape"),
    ]),
    saveDraftFieldGroup("inventory-equipment", text.fieldGroupLabels?.inventoryEquipment, [
      saveDraftField("inventory", "item-id[]", "known-item-id-list"),
      saveDraftField("equipment", "slot-map", "known-equipment-slot-map"),
    ]),
    saveDraftFieldGroup("profile", text.fieldGroupLabels?.profile, [
      saveDraftField("playerProfile.name", "string", "profile-text-limit"),
      saveDraftField("playerProfile.title", "string", "profile-text-limit"),
      saveDraftField("playerProfile.portraitFrame", "object", "portrait-frame-shape"),
    ]),
  ];
  const operationCount = fieldGroups.reduce((sum, group) => sum + group.fields.length, 0);
  const payloadShape = {
    version: "save-slot-edit-draft-v1",
    mode: "read-only-preview",
    target: {
      type: "activeSave|saveSlot",
      ids: ["activeSave", ...filledSlotIds],
    },
    operations: fieldGroups.flatMap((group) =>
      group.fields.map((field) => ({
        group: group.id,
        path: field.path,
        valueType: field.valueType,
        guard: field.guard,
      }))
    ),
    validationChecks: [
      "active-save-readable",
      "slot-store-readable",
      "active-slot-safe",
      "rollback-snapshot-ready",
      "explicit-confirmation-required",
    ],
    rollback: {
      strategy: "localStorage-snapshot",
      keys: Object.values(SAVE_SLOT_DIAGNOSTIC_KEYS),
    },
    apply: "disabled",
  };
  return {
    applyStatus: "blocked",
    targetCount: payloadShape.target.ids.length,
    fieldGroups,
    operationCount,
    payloadShape,
  };
}

function saveDraftFieldGroup(id, label, fields) {
  return {
    id,
    label: label || id,
    fields,
  };
}

function saveDraftField(path, valueType, guard) {
  return { path, valueType, guard };
}

function renderSaveSlotDraftDiffSummary(diagnostics) {
  const diff = createSaveSlotDraftDiffSummary(diagnostics);
  const text = EDITOR_TEXT.saveDraftDiff || {};
  const viewDiff = {
    ...diff,
    groups: diff.groups.map((group) => ({
      ...group,
      rowValue: tf("editorPrep.saveDraftDiff.groupRowValue", { count: group.rowCount }, `${group.rowCount}`),
      comparableValue: tf("editorPrep.saveDraftDiff.groupComparableValue", { count: group.comparableRows }, `${group.comparableRows}`),
      missingValue: tf("editorPrep.saveDraftDiff.groupMissingValue", { count: group.missingRows }, `${group.missingRows}`),
      blockedValue: tf("editorPrep.saveDraftDiff.groupBlockedValue", { count: group.blockedRows }, `${group.blockedRows}`),
    })),
  };

  return renderSaveSlotDraftDiffSummaryView({
    diff: viewDiff,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    targetValue: `${diff.targetCount}`,
    fieldValue: `${diff.fieldCount}`,
    comparableValue: `${diff.comparableRows}`,
    blockedValue: `${diff.blockedRows}`,
  });
}

function renderSaveSlotApplyGateChecklist(diagnostics) {
  const gate = createSaveSlotApplyGateChecklist(diagnostics);
  const text = EDITOR_TEXT.saveApplyGate || {};
  return renderSaveSlotApplyGateChecklistView({
    gate,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    readyValue: tf("editorPrep.saveApplyGate.readyValue", { ready: gate.readyChecks, total: gate.totalChecks }, `${gate.readyChecks}/${gate.totalChecks}`),
    blockedValue: tf("editorPrep.saveApplyGate.blockedValue", { count: gate.blockedChecks }, `${gate.blockedChecks}`),
    targetValue: tf("editorPrep.saveApplyGate.targetValue", { count: gate.targetCount }, `${gate.targetCount}`),
    diffRowValue: tf("editorPrep.saveApplyGate.diffRowValue", { count: gate.diffRowCount }, `${gate.diffRowCount}`),
    recoveryValue: tf("editorPrep.saveApplyGate.recoveryValue", { count: gate.recoveryBlockedSteps }, `${gate.recoveryBlockedSteps}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveApplyGate.blockerValue", { blocker }, `${text.blockerLabel || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotRecoveryRehearsalPreview(diagnostics) {
  const rehearsal = createSaveSlotRecoveryRehearsalPreview(diagnostics);
  const text = EDITOR_TEXT.saveRecovery || {};
  return renderSaveSlotRecoveryRehearsalView({
    rehearsal,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    keyValue: tf("editorPrep.saveRecovery.keyValue", { readable: rehearsal.readableKeys, total: rehearsal.snapshotKeys.length }, `${rehearsal.readableKeys}/${rehearsal.snapshotKeys.length}`),
    stepValue: tf("editorPrep.saveRecovery.stepValue", { count: rehearsal.steps.length }, `${rehearsal.steps.length}`),
    blockedValue: tf("editorPrep.saveRecovery.blockedValue", { count: rehearsal.blockedSteps }, `${rehearsal.blockedSteps}`),
    routeValue: tf("editorPrep.saveRecovery.routeValue", { count: rehearsal.failureRoutes.length }, `${rehearsal.failureRoutes.length}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveRecovery.blockerValue", { blocker }, `${text.blockerLabel || "Blocker"}: ${blocker}`),
    routeActionFormatter: (action) => tf("editorPrep.saveRecovery.routeActionValue", { action }, `${text.routeActionLabel || "Action"}: ${action}`),
  });
}

function renderSaveSlotEditInputSchemaPreview(diagnostics) {
  const schema = createSaveSlotEditInputSchemaPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditInput || {};
  return renderSaveSlotEditInputSchemaView({
    schema,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    groupValue: tf("editorPrep.saveEditInput.groupValue", { count: schema.groups.length }, `${schema.groups.length}`),
    fieldValue: tf("editorPrep.saveEditInput.fieldValue", { count: schema.fieldCount }, `${schema.fieldCount}`),
    validationValue: tf("editorPrep.saveEditInput.validationValue", { count: schema.validationRuleCount }, `${schema.validationRuleCount}`),
    blockedValue: tf("editorPrep.saveEditInput.blockedValue", { count: schema.blockedFieldCount }, `${schema.blockedFieldCount}`),
    groupFieldFormatter: (group) => tf("editorPrep.saveEditInput.groupFieldValue", { count: group.fieldCount }, `${group.fieldCount}`),
    groupComparableFormatter: (group) => tf("editorPrep.saveEditInput.groupComparableValue", { count: group.comparableRows }, `${group.comparableRows}`),
  });
}

function renderSaveSlotEditValidationMatrix(diagnostics) {
  const matrix = createSaveSlotEditValidationMatrix(diagnostics);
  const text = EDITOR_TEXT.saveEditMatrix || {};
  return renderSaveSlotEditValidationMatrixView({
    matrix,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    fieldValue: tf("editorPrep.saveEditMatrix.fieldValue", { count: matrix.fieldCount }, `${matrix.fieldCount}`),
    targetValue: tf("editorPrep.saveEditMatrix.targetValue", { count: matrix.targetCount }, `${matrix.targetCount}`),
    placeholderValue: tf("editorPrep.saveEditMatrix.placeholderValue", { count: matrix.placeholderCount }, `${matrix.placeholderCount}`),
    blockedValue: tf("editorPrep.saveEditMatrix.blockedValue", { count: matrix.blockedRows }, `${matrix.blockedRows}`),
  });
}

function renderSaveSlotEditValidationRuleDrilldown(diagnostics) {
  const drilldown = createSaveSlotEditValidationRuleDrilldown(diagnostics);
  const text = EDITOR_TEXT.saveEditRuleDrilldown || {};
  return renderSaveSlotEditRuleDrilldownView({
    drilldown,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    ruleValue: tf("editorPrep.saveEditRuleDrilldown.ruleValue", { count: drilldown.ruleCount }, `${drilldown.ruleCount}`),
    fieldValue: tf("editorPrep.saveEditRuleDrilldown.fieldValue", { count: drilldown.fieldCount }, `${drilldown.fieldCount}`),
    checkValue: tf("editorPrep.saveEditRuleDrilldown.checkValue", { count: drilldown.checkCount }, `${drilldown.checkCount}`),
    blockedValue: tf("editorPrep.saveEditRuleDrilldown.blockedValue", { count: drilldown.blockedCheckCount }, `${drilldown.blockedCheckCount}`),
  });
}

function renderSaveSlotEditSamplePayloadPreview(diagnostics) {
  const preview = createSaveSlotEditSamplePayloadPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditSamplePayload || {};
  return renderSaveSlotEditSamplePayloadView({
    preview,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    groupValue: tf("editorPrep.saveEditSamplePayload.groupValue", { count: preview.groupCount }, `${preview.groupCount}`),
    fieldValue: tf("editorPrep.saveEditSamplePayload.fieldValue", { count: preview.fieldCount }, `${preview.fieldCount}`),
    ruleValue: tf("editorPrep.saveEditSamplePayload.ruleValue", { count: preview.ruleCount }, `${preview.ruleCount}`),
    blockedValue: tf("editorPrep.saveEditSamplePayload.blockedValue", { count: preview.blockedFieldCount }, `${preview.blockedFieldCount}`),
    groupFieldFormatter: (group) => tf("editorPrep.saveEditSamplePayload.groupFieldValue", { count: group.fieldCount }, `${group.fieldCount}`),
    fieldChipFormatter: (field) => `${field.path} · ${field.inputKind} · ${text.pendingInput || field.proposedValue}`,
  });
}

function renderSaveSlotEditValidatorDryRunPlan(diagnostics) {
  const plan = createSaveSlotEditValidatorDryRunPlan(diagnostics);
  const text = EDITOR_TEXT.saveEditDryRun || {};
  return renderSaveSlotEditValidatorDryRunView({
    plan,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    stageValue: tf("editorPrep.saveEditDryRun.stageValue", { count: plan.stageCount }, `${plan.stageCount}`),
    ruleValue: tf("editorPrep.saveEditDryRun.ruleValue", { count: plan.ruleCount }, `${plan.ruleCount}`),
    blockedStageValue: tf("editorPrep.saveEditDryRun.blockedStageValue", { count: plan.blockedStageCount }, `${plan.blockedStageCount}`),
    blockedRuleValue: tf("editorPrep.saveEditDryRun.blockedRuleValue", { count: plan.blockedRuleCount }, `${plan.blockedRuleCount}`),
  });
}

function renderSaveSlotEditValidatorRegistryContract(diagnostics) {
  const contract = createSaveSlotEditValidatorRegistryContract(diagnostics);
  const text = EDITOR_TEXT.saveEditValidatorRegistry || {};
  return renderSaveSlotEditValidatorRegistryView({
    contract,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    ruleValue: tf("editorPrep.saveEditValidatorRegistry.ruleValue", { count: contract.ruleCount }, `${contract.ruleCount}`),
    validatorValue: tf("editorPrep.saveEditValidatorRegistry.validatorValue", { count: contract.validatorCount }, `${contract.validatorCount}`),
    missingValue: tf("editorPrep.saveEditValidatorRegistry.missingValue", { count: contract.missingValidatorCount }, `${contract.missingValidatorCount}`),
  });
}

function renderSaveSlotEditValidatorResultSchemaPreview(diagnostics) {
  const schema = createSaveSlotEditValidatorResultSchemaPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditValidatorResult || {};
  return renderSaveSlotEditValidatorResultView({
    schema,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    validatorValue: tf("editorPrep.saveEditValidatorResult.validatorValue", { count: schema.validatorCount }, `${schema.validatorCount}`),
    fieldValue: tf("editorPrep.saveEditValidatorResult.fieldValue", { count: schema.fieldCount }, `${schema.fieldCount}`),
    resultValue: tf("editorPrep.saveEditValidatorResult.resultValue", { count: schema.resultCount }, `${schema.resultCount}`),
    blockedValue: tf("editorPrep.saveEditValidatorResult.blockedValue", { count: schema.blockedResultCount }, `${schema.blockedResultCount}`),
  });
}

function renderSaveSlotEditValidatorExecutableDryRunPreview(diagnostics) {
  const preview = createSaveSlotEditValidatorExecutableDryRunPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditValidatorExecutableDryRun || {};
  return renderSaveSlotEditValidatorExecutableDryRunView({
    preview,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    validatorValue: tf("editorPrep.saveEditValidatorExecutableDryRun.validatorValue", { count: preview.validatorCount }, `${preview.validatorCount}`),
    implementedValue: tf("editorPrep.saveEditValidatorExecutableDryRun.implementedValue", { count: preview.implementedValidatorCount }, `${preview.implementedValidatorCount}`),
    resultValue: tf("editorPrep.saveEditValidatorExecutableDryRun.resultValue", { count: preview.resultCount }, `${preview.resultCount}`),
    blockedValue: tf("editorPrep.saveEditValidatorExecutableDryRun.blockedValue", { count: preview.blockedResultCount }, `${preview.blockedResultCount}`),
  });
}

function renderSaveSlotEditProposedValueInjectorPreview(diagnostics) {
  const preview = createSaveSlotEditProposedValueInjectorPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditProposedValueInjector || {};
  return renderSaveSlotEditProposedValueInjectorView({
    preview,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    fieldValue: tf("editorPrep.saveEditProposedValueInjector.fieldValue", { count: preview.fieldCount }, `${preview.fieldCount}`),
    validValue: tf("editorPrep.saveEditProposedValueInjector.validValue", { count: preview.validSampleCount }, `${preview.validSampleCount}`),
    invalidValue: tf("editorPrep.saveEditProposedValueInjector.invalidValue", { count: preview.invalidSampleCount }, `${preview.invalidSampleCount}`),
  });
}

function renderSaveSlotEditDryRunSampleComparatorPreview(diagnostics) {
  const preview = createSaveSlotEditDryRunSampleComparatorPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditDryRunSampleComparator || {};
  return renderSaveSlotEditDryRunSampleComparatorView({
    preview,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    fieldValue: tf("editorPrep.saveEditDryRunSampleComparator.fieldValue", { count: preview.fieldCount }, `${preview.fieldCount}`),
    comparableValue: tf("editorPrep.saveEditDryRunSampleComparator.comparableValue", { count: preview.comparableCount }, `${preview.comparableCount}`),
    readyValue: tf("editorPrep.saveEditDryRunSampleComparator.readyValue", { count: preview.readyComparisonCount }, `${preview.readyComparisonCount}`),
    blockerValue: tf("editorPrep.saveEditDryRunSampleComparator.blockerValue", { count: preview.blockerCount }, `${preview.blockerCount}`),
  });
}

function renderSaveSlotEditSampleBridgeBlockerSummaryPreview(diagnostics) {
  const summary = createSaveSlotEditSampleBridgeBlockerSummaryPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditSampleBridgeBlockerSummary || {};
  return renderSaveSlotEditSampleBridgeBlockerView({
    summary,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    readyValue: tf("editorPrep.saveEditSampleBridgeBlockerSummary.readyValue", { count: summary.readyComparisonCount }, `${summary.readyComparisonCount}`),
    blockerValue: tf("editorPrep.saveEditSampleBridgeBlockerSummary.blockerValue", { count: summary.blockerCount }, `${summary.blockerCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditSampleBridgeBlockerSummary.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditProducedResultBridgeContractPreview(diagnostics) {
  const contract = createSaveSlotEditProducedResultBridgeContractPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditProducedResultBridgeContract || {};
  return renderSaveSlotEditProducedResultBridgeView({
    contract,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    resultValue: tf("editorPrep.saveEditProducedResultBridgeContract.resultValue", { count: contract.resultCount }, `${contract.resultCount}`),
    routeValue: tf("editorPrep.saveEditProducedResultBridgeContract.routeValue", { count: contract.routeCount }, `${contract.routeCount}`),
    blockerValue: tf("editorPrep.saveEditProducedResultBridgeContract.blockerValue", { count: contract.blockerCount }, `${contract.blockerCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditProducedResultBridgeContract.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditBridgeTransitionChecklistPreview(diagnostics) {
  const checklist = createSaveSlotEditBridgeTransitionChecklistPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditProducedResultBridgeTransitionChecklist || {};
  return renderSaveSlotEditBridgeTransitionView({
    checklist,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    checkValue: tf("editorPrep.saveEditProducedResultBridgeTransitionChecklist.checkValue", { count: checklist.checkCount }, `${checklist.checkCount}`),
    blockedValue: tf("editorPrep.saveEditProducedResultBridgeTransitionChecklist.blockedValue", { count: checklist.blockedCheckCount }, `${checklist.blockedCheckCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditProducedResultBridgeTransitionChecklist.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditValidatorResultSourceAdapterPlanPreview(diagnostics) {
  const plan = createSaveSlotEditValidatorResultSourceAdapterPlanPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditValidatorResultSourceAdapterPlan || {};
  return renderSaveSlotEditValidatorResultSourceAdapterView({
    plan,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    candidateValue: tf("editorPrep.saveEditValidatorResultSourceAdapterPlan.candidateValue", { count: plan.candidateCount }, `${plan.candidateCount}`),
    readyValue: tf("editorPrep.saveEditValidatorResultSourceAdapterPlan.readyValue", { count: plan.readyCandidateCount }, `${plan.readyCandidateCount}`),
  });
}

function renderSaveSlotEditSelectedSourceHandoffContractPreview(diagnostics) {
  const contract = createSaveSlotEditSelectedSourceHandoffContractPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditSelectedSourceHandoffContract || {};
  return renderSaveSlotEditSelectedSourceHandoffView({
    contract,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    fieldValue: tf("editorPrep.saveEditSelectedSourceHandoffContract.fieldValue", { count: contract.fieldCount }, `${contract.fieldCount}`),
    checkValue: tf("editorPrep.saveEditSelectedSourceHandoffContract.checkValue", { count: contract.checkCount }, `${contract.checkCount}`),
    blockedValue: tf("editorPrep.saveEditSelectedSourceHandoffContract.blockedValue", { count: contract.blockedCheckCount }, `${contract.blockedCheckCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditSelectedSourceHandoffContract.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditAdapterRunnerPreflightPreview(diagnostics) {
  const preflight = createSaveSlotEditAdapterRunnerPreflightPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditAdapterRunnerPreflight || {};
  return renderSaveSlotEditAdapterRunnerPreflightView({
    preflight,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    payloadValue: tf("editorPrep.saveEditAdapterRunnerPreflight.payloadValue", { count: preflight.payloadFieldCount }, `${preflight.payloadFieldCount}`),
    gateValue: tf("editorPrep.saveEditAdapterRunnerPreflight.gateValue", { count: preflight.gateBlockerCount }, `${preflight.gateBlockerCount}`),
    checkValue: tf("editorPrep.saveEditAdapterRunnerPreflight.checkValue", { count: preflight.checkCount }, `${preflight.checkCount}`),
    blockedValue: tf("editorPrep.saveEditAdapterRunnerPreflight.blockedValue", { count: preflight.blockedCheckCount }, `${preflight.blockedCheckCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditAdapterRunnerPreflight.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditConfirmationSourceSelectionContractPreview(diagnostics) {
  const contract = createSaveSlotEditConfirmationSourceSelectionContractPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditConfirmationSourceSelectionContract || {};
  return renderSaveSlotEditConfirmationSourceSelectionView({
    contract,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    checkValue: tf("editorPrep.saveEditConfirmationSourceSelectionContract.checkValue", { count: contract.checkCount }, `${contract.checkCount}`),
    blockedValue: tf("editorPrep.saveEditConfirmationSourceSelectionContract.blockedValue", { count: contract.blockedCheckCount }, `${contract.blockedCheckCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditConfirmationSourceSelectionContract.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditConfirmationInputShellContractPreview(diagnostics) {
  const contract = createSaveSlotEditConfirmationInputShellContractPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditConfirmationInputShellContract || {};
  return renderSaveSlotEditConfirmationInputShellView({
    contract,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    fieldValue: tf("editorPrep.saveEditConfirmationInputShellContract.fieldValue", { count: contract.fieldCount }, `${contract.fieldCount}`),
    checkValue: tf("editorPrep.saveEditConfirmationInputShellContract.checkValue", { count: contract.checkCount }, `${contract.checkCount}`),
    blockedValue: tf("editorPrep.saveEditConfirmationInputShellContract.blockedValue", { count: contract.blockedCheckCount }, `${contract.blockedCheckCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditConfirmationInputShellContract.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
    fieldStatusLabel: (field) => saveDiagnosticStatusLabel(field.status === "not-created" || field.status === "disabled" || field.status === "not-evaluated" ? "blocked" : "ready"),
  });
}

function renderSaveSlotEditConfirmationMatchReviewSummaryPreview(diagnostics) {
  const summary = createSaveSlotEditConfirmationMatchReviewSummaryPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditConfirmationMatchReviewSummary || {};
  return renderSaveSlotEditConfirmationMatchReviewView({
    summary,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    reviewValue: tf("editorPrep.saveEditConfirmationMatchReviewSummary.reviewValue", { count: summary.reviewCount }, `${summary.reviewCount}`),
    checkValue: tf("editorPrep.saveEditConfirmationMatchReviewSummary.checkValue", { count: summary.checkCount }, `${summary.checkCount}`),
    blockedValue: tf("editorPrep.saveEditConfirmationMatchReviewSummary.blockedValue", { count: summary.blockedCheckCount }, `${summary.blockedCheckCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditConfirmationMatchReviewSummary.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditSubmitRunnerBlockerContractPreview(diagnostics) {
  const contract = createSaveSlotEditSubmitRunnerBlockerContractPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditSubmitRunnerBlockerContract || {};
  return renderSaveSlotEditSubmitRunnerBlockerView({
    contract,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    blockerValue: tf("editorPrep.saveEditSubmitRunnerBlockerContract.blockerValue", { count: contract.blockerCount }, `${contract.blockerCount}`),
    checkValue: tf("editorPrep.saveEditSubmitRunnerBlockerContract.checkValue", { count: contract.checkCount }, `${contract.checkCount}`),
    blockedValue: tf("editorPrep.saveEditSubmitRunnerBlockerContract.blockedValue", { count: contract.blockedCheckCount }, `${contract.blockedCheckCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditSubmitRunnerBlockerContract.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditFinalApplyRunnerHandoffChecklistPreview(diagnostics) {
  const checklist = createSaveSlotEditFinalApplyRunnerHandoffChecklistPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditFinalApplyRunnerHandoffChecklist || {};
  return renderSaveSlotEditFinalApplyRunnerHandoffView({
    checklist,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    blockerValue: tf("editorPrep.saveEditFinalApplyRunnerHandoffChecklist.blockerValue", { count: checklist.blockerCount }, `${checklist.blockerCount}`),
    checkValue: tf("editorPrep.saveEditFinalApplyRunnerHandoffChecklist.checkValue", { count: checklist.checkCount }, `${checklist.checkCount}`),
    blockedValue: tf("editorPrep.saveEditFinalApplyRunnerHandoffChecklist.blockedValue", { count: checklist.blockedCheckCount }, `${checklist.blockedCheckCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditFinalApplyRunnerHandoffChecklist.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditApplyRunnerPayloadShapePreview(diagnostics) {
  const preview = createSaveSlotEditApplyRunnerPayloadShapePreview(diagnostics);
  const text = EDITOR_TEXT.saveEditApplyRunnerPayloadShape || {};
  return renderSaveSlotEditApplyRunnerPayloadShapeView({
    preview,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    fieldValue: tf("editorPrep.saveEditApplyRunnerPayloadShape.fieldValue", { count: preview.fieldCount }, `${preview.fieldCount}`),
    checkValue: tf("editorPrep.saveEditApplyRunnerPayloadShape.checkValue", { count: preview.checkCount }, `${preview.checkCount}`),
    blockedValue: tf("editorPrep.saveEditApplyRunnerPayloadShape.blockedValue", { count: preview.blockedCheckCount }, `${preview.blockedCheckCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditApplyRunnerPayloadShape.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditPayloadBridgeCompatibilitySummaryPreview(diagnostics) {
  const summary = createSaveSlotEditPayloadBridgeCompatibilitySummaryPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditPayloadBridgeCompatibilitySummary || {};
  return renderSaveSlotEditPayloadBridgeCompatibilityView({
    summary,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    rowValue: tf("editorPrep.saveEditPayloadBridgeCompatibilitySummary.rowValue", { count: summary.rowCount }, `${summary.rowCount}`),
    readyValue: tf("editorPrep.saveEditPayloadBridgeCompatibilitySummary.readyValue", { count: summary.readyRowCount }, `${summary.readyRowCount}`),
    blockerValue: tf("editorPrep.saveEditPayloadBridgeCompatibilitySummary.blockerValue", { count: summary.blockerCount }, `${summary.blockerCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditPayloadBridgeCompatibilitySummary.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditValidatorApplyGateBridgePreview(diagnostics) {
  const bridge = createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics);
  const text = EDITOR_TEXT.saveEditValidatorApplyGateBridge || {};
  return renderSaveSlotEditValidatorApplyGateBridgeView({
    bridge,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    resultValue: tf("editorPrep.saveEditValidatorApplyGateBridge.resultValue", { count: bridge.resultCount }, `${bridge.resultCount}`),
    gateValue: tf("editorPrep.saveEditValidatorApplyGateBridge.gateValue", { count: bridge.gateBlockedChecks }, `${bridge.gateBlockedChecks}`),
    stepValue: tf("editorPrep.saveEditValidatorApplyGateBridge.stepValue", { count: bridge.stepCount }, `${bridge.stepCount}`),
    blockedValue: tf("editorPrep.saveEditValidatorApplyGateBridge.blockedValue", { count: bridge.blockedStepCount }, `${bridge.blockedStepCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditValidatorApplyGateBridge.blockerValue", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditCompatibilityConfirmationRollupPreview(diagnostics) {
  const rollup = createSaveSlotEditCompatibilityConfirmationRollupPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditCompatibilityConfirmationRollup || {};
  return renderSaveSlotEditCompatibilityConfirmationRollupView({
    rollup,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    laneValue: tf("editorPrep.saveEditCompatibilityConfirmationRollup.laneValue", { count: rollup.laneCount }, `${rollup.laneCount}`),
    blockerValue: tf("editorPrep.saveEditCompatibilityConfirmationRollup.blockerValue", { count: rollup.blockerCount }, `${rollup.blockerCount}`),
    checkValue: tf("editorPrep.saveEditCompatibilityConfirmationRollup.checkValue", { count: rollup.checkCount }, `${rollup.checkCount}`),
    blockedValue: tf("editorPrep.saveEditCompatibilityConfirmationRollup.blockedValue", { count: rollup.blockedCheckCount }, `${rollup.blockedCheckCount}`),
    laneBlockerValueFormatter: (count) => tf("editorPrep.saveEditCompatibilityConfirmationRollup.blockerValue", { count }, `${count}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditCompatibilityConfirmationRollup.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditValidatorConfirmationPreflightPreview(diagnostics) {
  const preflight = createSaveSlotEditValidatorConfirmationPreflightPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditValidatorConfirmationPreflight || {};
  return renderSaveSlotEditValidatorConfirmationPreflightView({
    preflight,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    blockerValue: tf("editorPrep.saveEditValidatorConfirmationPreflight.blockerValue", { count: preflight.blockerCount }, `${preflight.blockerCount}`),
    checkValue: tf("editorPrep.saveEditValidatorConfirmationPreflight.checkValue", { count: preflight.checkCount }, `${preflight.checkCount}`),
    blockedValue: tf("editorPrep.saveEditValidatorConfirmationPreflight.blockedValue", { count: preflight.blockedCheckCount }, `${preflight.blockedCheckCount}`),
    groupBlockerValueFormatter: (count) => tf("editorPrep.saveEditValidatorConfirmationPreflight.groupBlockerValue", { count }, `${count}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditValidatorConfirmationPreflight.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditConfirmationInputContractPreview(diagnostics) {
  const contract = createSaveSlotEditConfirmationInputContractPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditConfirmationInputContract || {};
  return renderSaveSlotEditConfirmationInputContractView({
    contract,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    fieldValue: tf("editorPrep.saveEditConfirmationInputContract.fieldValue", { count: contract.fieldCount }, `${contract.fieldCount}`),
    guardValue: tf("editorPrep.saveEditConfirmationInputContract.guardValue", { count: contract.guardCount }, `${contract.guardCount}`),
    blockerValue: tf("editorPrep.saveEditConfirmationInputContract.blockerValue", { count: contract.blockerCount }, `${contract.blockerCount}`),
  });
}

function renderSaveSlotEditConfirmationRunnerHandoffSummaryPreview(diagnostics) {
  const summary = createSaveSlotEditConfirmationRunnerHandoffSummaryPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditConfirmationRunnerHandoffSummary || {};
  return renderSaveSlotEditConfirmationRunnerHandoffView({
    summary,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    rowValue: tf("editorPrep.saveEditConfirmationRunnerHandoffSummary.rowValue", { count: summary.rowCount }, `${summary.rowCount}`),
    blockerValue: tf("editorPrep.saveEditConfirmationRunnerHandoffSummary.blockerValue", { count: summary.blockerCount }, `${summary.blockerCount}`),
    checkValue: tf("editorPrep.saveEditConfirmationRunnerHandoffSummary.checkValue", { count: summary.checkCount }, `${summary.checkCount}`),
    blockedValue: tf("editorPrep.saveEditConfirmationRunnerHandoffSummary.blockedValue", { count: summary.blockedCheckCount }, `${summary.blockedCheckCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditConfirmationRunnerHandoffSummary.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditWriterPayloadCheckpointPreview(diagnostics) {
  const review = createSaveSlotEditWriterPayloadCheckpointPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditWriterPayloadCheckpoint || {};
  return renderSaveSlotEditWriterPayloadCheckpointView({
    review,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    targetValue: tf("editorPrep.saveEditWriterPayloadCheckpoint.targetValue", { count: review.targetCount }, `${review.targetCount}`),
    checkValue: tf("editorPrep.saveEditWriterPayloadCheckpoint.checkValue", { count: review.checkCount }, `${review.checkCount}`),
    blockedValue: tf("editorPrep.saveEditWriterPayloadCheckpoint.blockedValue", { count: review.blockedCheckCount }, `${review.blockedCheckCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditWriterPayloadCheckpoint.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditPostWriteRestoreContractPreview(diagnostics) {
  const contract = createSaveSlotEditPostWriteRestoreContractPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditPostWriteRestoreContract || {};
  return renderSaveSlotEditPostWriteRestoreContractView({
    contract,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    routeValue: tf("editorPrep.saveEditPostWriteRestoreContract.routeValue", { count: contract.routeCount }, `${contract.routeCount}`),
    blockerValue: tf("editorPrep.saveEditPostWriteRestoreContract.blockerValue", { count: contract.blockerCount }, `${contract.blockerCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditPostWriteRestoreContract.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function renderSaveSlotEditWriterEnablementRiskSummary(diagnostics) {
  const summary = createSaveSlotEditWriterEnablementRiskSummary(diagnostics);
  const text = EDITOR_TEXT.saveEditWriterEnablementRisk || {};
  return renderSaveSlotEditWriterEnablementRiskView({
    summary,
    text,
    metricCard,
    statusLabel: saveDiagnosticStatusLabel,
    checkValue: tf("editorPrep.saveEditWriterEnablementRisk.checkValue", { count: summary.checkCount }, `${summary.checkCount}`),
    blockerValue: tf("editorPrep.saveEditWriterEnablementRisk.blockerValue", { count: summary.blockerCount }, `${summary.blockerCount}`),
    blockerFormatter: (blocker) => tf("editorPrep.saveEditWriterEnablementRisk.blockerText", { blocker }, `${text.blocker || "Blocker"}: ${blocker}`),
  });
}

function createSaveSlotDraftDiffSummary(diagnostics) {
  const draft = createSaveSlotDraftPayloadPreview(diagnostics);
  const targets = createSaveDraftDiffTargets(diagnostics)
    .filter((target) => draft.payloadShape.target.ids.includes(target.id));
  const fields = draft.fieldGroups.flatMap((group) => group.fields.map((field) => ({
    ...field,
    groupId: group.id,
    groupLabel: group.label,
  })));
  const rows = targets.flatMap((target) => fields.map((field) => createSaveDraftDiffRow(target, field)));
  const groups = draft.fieldGroups.map((group) => {
    const groupRows = rows.filter((row) => row.groupId === group.id);
    return {
      id: group.id,
      label: group.label,
      fieldCount: group.fields.length,
      rowCount: groupRows.length,
      comparableRows: groupRows.filter((row) => row.status === "waiting-input").length,
      missingRows: groupRows.filter((row) => row.status === "missing-current-path").length,
      blockedRows: groupRows.filter((row) => row.status === "target-blocked").length,
      paths: group.fields.map((field) => field.path),
    };
  });
  return {
    applyStatus: "blocked",
    targetCount: targets.length,
    fieldCount: fields.length,
    rowCount: rows.length,
    comparableRows: rows.filter((row) => row.status === "waiting-input").length,
    missingRows: rows.filter((row) => row.status === "missing-current-path").length,
    blockedRows: rows.filter((row) => row.status === "target-blocked").length,
    rows,
    groups,
  };
}

function createSaveSlotEditInputSchemaPreview(diagnostics) {
  const draft = createSaveSlotDraftPayloadPreview(diagnostics);
  const diff = createSaveSlotDraftDiffSummary(diagnostics);
  const gate = createSaveSlotApplyGateChecklist(diagnostics);
  const groups = draft.fieldGroups.map((group) => ({
    id: group.id,
    label: group.label,
    fieldCount: group.fields.length,
    comparableRows: diff.groups.find((item) => item.id === group.id)?.comparableRows ?? 0,
  }));
  const fields = draft.fieldGroups.flatMap((group) => group.fields.map((field) => saveEditInputSchemaField(group, field, gate)));
  return {
    status: "blocked",
    groups,
    fields,
    fieldCount: fields.length,
    validationRuleCount: new Set(fields.map((field) => field.validationRule)).size,
    blockedFieldCount: fields.filter((field) => field.status === "blocked").length,
  };
}

function createSaveSlotEditValidationMatrix(diagnostics) {
  const schema = createSaveSlotEditInputSchemaPreview(diagnostics);
  const diff = createSaveSlotDraftDiffSummary(diagnostics);
  const rows = schema.fields.map((field) => {
    const targetRows = diff.rows.filter((row) => row.path === field.path);
    return {
      path: field.path,
      inputKind: field.inputKind,
      validationRule: field.validationRule,
      targetCount: targetRows.length,
      currentStatus: targetRows.some((row) => row.status === "missing-current-path") ? "missing-current-path" : "ready",
      proposedValue: "pending-input",
      validationResult: "not-run",
      status: "blocked",
      blocker: field.blocker,
    };
  });
  return {
    status: "blocked",
    fieldCount: rows.length,
    targetCount: diff.targetCount,
    placeholderCount: rows.filter((row) => row.proposedValue === "pending-input").length,
    blockedRows: rows.filter((row) => row.status === "blocked").length,
    rows,
  };
}

function createSaveSlotEditValidationRuleDrilldown(diagnostics) {
  const matrix = createSaveSlotEditValidationMatrix(diagnostics);
  const diff = createSaveSlotDraftDiffSummary(diagnostics);
  const gate = createSaveSlotApplyGateChecklist(diagnostics);
  const text = EDITOR_TEXT.saveEditRuleDrilldown || {};
  const ruleIds = Array.from(new Set(matrix.rows.map((row) => row.validationRule)));
  const rules = ruleIds.map((ruleId) => {
    const rows = matrix.rows.filter((row) => row.validationRule === ruleId);
    const inputKinds = Array.from(new Set(rows.map((row) => row.inputKind)));
    const blockers = Array.from(new Set(rows.map((row) => row.blocker).filter(Boolean)));
    const currentPathReady = rows.every((row) => row.currentStatus === "ready");
    const checks = saveEditValidationRuleChecks(ruleId, {
      currentPathReady,
      hasPendingInput: rows.some((row) => row.proposedValue === "pending-input"),
      gate,
    }, text);
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

function createSaveSlotEditSamplePayloadPreview(diagnostics) {
  const draft = createSaveSlotDraftPayloadPreview(diagnostics);
  const matrix = createSaveSlotEditValidationMatrix(diagnostics);
  const ruleDrilldown = createSaveSlotEditValidationRuleDrilldown(diagnostics);
  const rowByPath = new Map(matrix.rows.map((row) => [row.path, row]));
  const groups = draft.fieldGroups.map((group) => {
    const fields = group.fields.map((field) => {
      const row = rowByPath.get(field.path) || {};
      return {
        path: field.path,
        valueType: field.valueType,
        inputKind: row.inputKind || saveEditInputKindForField(field),
        validationRule: field.guard,
        proposedValue: "pending-input",
        validationResult: "not-run",
        status: "blocked",
        blocker: row.blocker || "apply-gate-blocked",
      };
    });
    return {
      id: group.id,
      label: group.label,
      fieldCount: fields.length,
      fields,
    };
  });
  const fields = groups.flatMap((group) => group.fields);
  const payloadShape = {
    version: "save-slot-edit-proposed-values-sample-v1",
    mode: "read-only-preview",
    target: draft.payloadShape.target,
    sourceContracts: [
      "save-slot-edit-draft-v1",
      "save-edit-validation-matrix",
      "save-edit-validation-rule-drilldown",
      "save-apply-gate-blocked",
    ],
    groups: groups.map((group) => ({
      id: group.id,
      fields: group.fields.map((field) => ({
        path: field.path,
        inputKind: field.inputKind,
        valueType: field.valueType,
        validationRule: field.validationRule,
        proposedValue: field.proposedValue,
        validationResult: field.validationResult,
        status: field.status,
        blocker: field.blocker,
      })),
    })),
    apply: "disabled",
  };
  return {
    status: "blocked",
    groupCount: groups.length,
    fieldCount: fields.length,
    ruleCount: ruleDrilldown.ruleCount,
    blockedFieldCount: fields.filter((field) => field.status === "blocked").length,
    groups,
    payloadShape,
  };
}

function createSaveSlotEditValidatorDryRunPlan(diagnostics) {
  const sample = createSaveSlotEditSamplePayloadPreview(diagnostics);
  const drilldown = createSaveSlotEditValidationRuleDrilldown(diagnostics);
  const gate = createSaveSlotApplyGateChecklist(diagnostics);
  const text = EDITOR_TEXT.saveEditDryRun || {};
  const stages = [
    saveEditDryRunStage("sample-payload-readable", sample.fieldCount > 0, text.stageLabels?.samplePayloadReadable, text.stageDetails?.samplePayloadReadable),
    saveEditDryRunStage("proposed-values-present", false, text.stageLabels?.proposedValuesPresent, text.stageDetails?.proposedValuesPresent),
    saveEditDryRunStage("validator-registry-ready", false, text.stageLabels?.validatorRegistryReady, text.stageDetails?.validatorRegistryReady),
    saveEditDryRunStage("current-path-coverage", true, text.stageLabels?.currentPathCoverage, text.stageDetails?.currentPathCoverage),
    saveEditDryRunStage("apply-gate-held", gate.applyStatus === "blocked", text.stageLabels?.applyGateHeld, text.stageDetails?.applyGateHeld),
    saveEditDryRunStage("writer-side-effects-disabled", true, text.stageLabels?.writerSideEffectsDisabled, text.stageDetails?.writerSideEffectsDisabled),
  ];
  const rules = drilldown.rules.map((rule) => ({
    id: rule.id,
    label: rule.label,
    status: "blocked",
    fieldCount: rule.fieldCount,
    mode: "dry-run-only",
    blocker: "proposed-values-missing",
  }));
  return {
    status: "blocked",
    stageCount: stages.length,
    ruleCount: rules.length,
    blockedStageCount: stages.filter((stage) => stage.status === "blocked").length,
    blockedRuleCount: rules.filter((rule) => rule.status === "blocked").length,
    stages,
    rules,
  };
}

function createSaveSlotEditValidatorRegistryContract(diagnostics) {
  const drilldown = createSaveSlotEditValidationRuleDrilldown(diagnostics);
  const validators = drilldown.rules.map((rule) => ({
    ruleId: rule.id,
    label: rule.label,
    functionName: saveEditValidatorFunctionName(rule.id),
    status: "missing",
    mode: "contract-only",
    inputs: ["proposedValue", "currentValue", "saveTarget"],
    outputs: ["validationResult", "blocker"],
    fieldCount: rule.fieldCount,
  }));
  return {
    status: "blocked",
    contractVersion: "save-edit-validator-registry-contract-v1",
    ruleCount: drilldown.ruleCount,
    validatorCount: validators.length,
    missingValidatorCount: validators.filter((validator) => validator.status === "missing").length,
    validators,
  };
}

function createSaveSlotEditValidatorResultSchemaPreview(diagnostics) {
  const contract = createSaveSlotEditValidatorRegistryContract(diagnostics);
  const results = contract.validators.map((validator) => ({
    ruleId: validator.ruleId,
    functionName: validator.functionName,
    status: "blocked",
    resultStatus: "not-produced",
    fieldCount: validator.fieldCount,
    normalizedValue: "not-produced",
    blocker: "validator-missing",
    warnings: [],
  }));
  return {
    status: "blocked",
    validatorCount: contract.validatorCount,
    fieldCount: results.reduce((sum, result) => sum + result.fieldCount, 0),
    resultCount: results.length,
    blockedResultCount: results.filter((result) => result.status === "blocked").length,
    results,
    resultShape: {
      version: "save-edit-validator-result-schema-v1",
      mode: "read-only-preview",
      resultStatus: "not-produced",
      resultStatusEnum: ["valid", "invalid", "warning", "not-produced"],
      fields: ["ruleId", "functionName", "targetPath", "normalizedValue", "validationResult", "blocker", "warnings"],
      apply: "disabled",
    },
  };
}

function createSaveSlotEditValidatorExecutableRegistry(diagnostics) {
  const drilldown = createSaveSlotEditValidationRuleDrilldown(diagnostics);
  const validators = drilldown.rules.map((rule) => {
    const executor = SAVE_EDIT_VALIDATOR_EXECUTORS[rule.id];
    return {
      ruleId: rule.id,
      label: rule.label,
      functionName: saveEditValidatorFunctionName(rule.id),
      status: executor ? "implemented" : "missing",
      mode: "pure-function",
      sideEffects: "disabled",
      fieldCount: rule.fieldCount,
      executor,
    };
  });
  return {
    status: validators.every((validator) => validator.status === "implemented") ? "ready" : "blocked",
    version: "save-edit-validator-executable-registry-v1",
    validatorCount: validators.length,
    implementedValidatorCount: validators.filter((validator) => validator.status === "implemented").length,
    missingValidatorCount: validators.filter((validator) => validator.status === "missing").length,
    validators,
  };
}

function createSaveSlotEditValidatorExecutableDryRunPreview(diagnostics) {
  const sample = createSaveSlotEditSamplePayloadPreview(diagnostics);
  const registry = createSaveSlotEditValidatorExecutableRegistry(diagnostics);
  const validatorByRule = new Map(registry.validators.map((validator) => [validator.ruleId, validator]));
  const fields = sample.groups.flatMap((group) => group.fields.map((field) => ({
    ...field,
    groupId: group.id,
    groupLabel: group.label,
  })));
  const results = fields.map((field) => {
    const validator = validatorByRule.get(field.validationRule);
    const output = validator?.executor
      ? validator.executor({
          proposedValue: field.proposedValue,
          currentValue: undefined,
          targetPath: field.path,
          saveTarget: sample.payloadShape.target,
        })
      : saveEditValidatorDryRunResult(field.validationRule, field.path, "not-produced", "not-produced", "validator-missing", []);
    return {
      ruleId: field.validationRule,
      path: field.path,
      functionName: validator?.functionName || saveEditValidatorFunctionName(field.validationRule),
      status: output.blocker ? "blocked" : "ready",
      resultStatus: output.resultStatus,
      normalizedValue: output.normalizedValue,
      blocker: output.blocker,
      warnings: output.warnings,
    };
  });
  const blockers = Array.from(new Set(results.map((result) => result.blocker).filter(Boolean)));
  return {
    status: "blocked",
    version: "save-edit-validator-executable-dry-run-results-v1",
    mode: "non-mutating-dry-run",
    apply: "disabled",
    validatorRegistryVersion: registry.version,
    validatorCount: registry.validatorCount,
    implementedValidatorCount: registry.implementedValidatorCount,
    resultCount: results.length,
    blockedResultCount: results.filter((result) => result.status === "blocked").length,
    blockers,
    results,
    payloadShape: {
      version: "save-edit-validator-executable-dry-run-results-v1",
      mode: "non-mutating-dry-run",
      source: sample.payloadShape.version,
      validatorRegistry: registry.version,
      validators: "implemented",
      resultStatus: "blocked",
      writer: "disabled",
      apply: "disabled",
      blockers,
    },
  };
}

function createSaveSlotEditProposedValueInjectorPreview(diagnostics) {
  const sample = createSaveSlotEditSamplePayloadPreview(diagnostics);
  const registry = createSaveSlotEditValidatorExecutableRegistry(diagnostics);
  const validatorByRule = new Map(registry.validators.map((validator) => [validator.ruleId, validator]));
  const fields = sample.groups.flatMap((group) => group.fields.map((field) => {
    const validator = validatorByRule.get(field.validationRule);
    const sampleValues = saveEditProposedValueSamplesForField(field);
    const validResult = validator?.executor
      ? validator.executor({
          proposedValue: sampleValues.valid,
          currentValue: undefined,
          targetPath: field.path,
          saveTarget: sample.payloadShape.target,
        })
      : saveEditValidatorDryRunResult(field.validationRule, field.path, "not-produced", "not-produced", "validator-missing", []);
    const invalidResult = validator?.executor
      ? validator.executor({
          proposedValue: sampleValues.invalid,
          currentValue: undefined,
          targetPath: field.path,
          saveTarget: sample.payloadShape.target,
        })
      : saveEditValidatorDryRunResult(field.validationRule, field.path, "not-produced", "not-produced", "validator-missing", []);
    return {
      groupId: group.id,
      groupLabel: group.label,
      path: field.path,
      inputKind: field.inputKind,
      validationRule: field.validationRule,
      inputStatus: "not-created",
      injectorStatus: "disabled",
      validSample: saveEditSerializePreviewValue(sampleValues.valid),
      validResult: validResult.resultStatus,
      invalidSample: saveEditSerializePreviewValue(sampleValues.invalid),
      invalidResult: invalidResult.resultStatus,
      blocker: "input-shell-not-created",
    };
  }));
  return {
    status: "blocked",
    version: "save-edit-proposed-value-input-shell-sample-injector-v1",
    mode: "read-only-preview",
    injector: "disabled",
    apply: "disabled",
    fieldCount: fields.length,
    validSampleCount: fields.filter((field) => field.validResult === "valid").length,
    invalidSampleCount: fields.filter((field) => field.invalidResult === "invalid").length,
    fields,
    payloadShape: {
      version: "save-edit-proposed-value-input-shell-sample-injector-v1",
      mode: "read-only-preview",
      source: sample.payloadShape.version,
      validatorRegistry: registry.version,
      inputShell: "not-created",
      injector: "disabled",
      writer: "disabled",
      apply: "disabled",
      blockers: ["input-shell-not-created", "sample-injector-disabled", "writer-disabled"],
    },
  };
}

function createSaveSlotEditDryRunSampleComparatorPreview(diagnostics) {
  const dryRun = createSaveSlotEditValidatorExecutableDryRunPreview(diagnostics);
  const injector = createSaveSlotEditProposedValueInjectorPreview(diagnostics);
  const dryRunByPath = new Map(dryRun.results.map((result) => [result.path, result]));
  const comparisons = injector.fields.map((field) => {
    const missing = dryRunByPath.get(field.path);
    const missingReady = missing?.blocker === "proposed-values-missing";
    const validReady = field.validResult === "valid";
    const invalidReady = field.invalidResult === "invalid";
    const status = missingReady && validReady && invalidReady ? "ready" : "blocked";
    const blocker = status === "ready" ? "" : "sample-result-mismatch";
    return {
      path: field.path,
      ruleId: field.validationRule,
      status,
      missingResult: missing?.resultStatus || "not-produced",
      missingBlocker: missing?.blocker || "missing-result-not-found",
      validResult: field.validResult,
      invalidResult: field.invalidResult,
      blocker,
    };
  });
  const blockers = Array.from(new Set(comparisons.map((comparison) => comparison.blocker).filter(Boolean)));
  return {
    status: "blocked",
    version: "save-edit-dry-run-sample-result-comparator-v1",
    mode: "read-only-preview",
    apply: "disabled",
    fieldCount: comparisons.length,
    comparableCount: comparisons.filter((comparison) => comparison.missingBlocker === "proposed-values-missing").length,
    readyComparisonCount: comparisons.filter((comparison) => comparison.status === "ready").length,
    blockerCount: blockers.length,
    comparisons,
    payloadShape: {
      version: "save-edit-dry-run-sample-result-comparator-v1",
      mode: "read-only-preview",
      source: {
        missing: dryRun.version,
        samples: injector.version,
      },
      expectedStates: {
        missing: "not-produced/proposed-values-missing",
        validSample: "valid",
        invalidSample: "invalid",
      },
      bridge: "not-connected",
      writer: "disabled",
      apply: "disabled",
      blockers: ["comparator-read-only", "bridge-not-connected", "writer-disabled"],
    },
  };
}

function createSaveSlotEditSampleBridgeBlockerSummaryPreview(diagnostics) {
  const comparator = createSaveSlotEditDryRunSampleComparatorPreview(diagnostics);
  const gate = createSaveSlotApplyGateChecklist(diagnostics);
  const readyComparisonCount = comparator.readyComparisonCount;
  const blockers = [
    saveEditSampleBridgeBlocker("sample-results-produced", readyComparisonCount > 0 ? "ready" : "blocked", readyComparisonCount > 0 ? "" : "sample-results-missing"),
    saveEditSampleBridgeBlocker("sample-results-not-bridged", "blocked", "bridge-not-connected"),
    saveEditSampleBridgeBlocker("apply-gate-held", gate.applyStatus === "blocked" ? "blocked" : "ready", gate.applyStatus === "blocked" ? "apply-gate-blocked" : ""),
    saveEditSampleBridgeBlocker("confirmation-input-missing", "blocked", "confirmation-input-missing"),
    saveEditSampleBridgeBlocker("writer-disabled", "blocked", "writer-disabled"),
  ];
  return {
    status: "blocked",
    version: "save-edit-sample-result-bridge-blocker-summary-v1",
    mode: "read-only-preview",
    apply: "disabled",
    readyComparisonCount,
    blockerCount: blockers.filter((blocker) => blocker.status === "blocked").length,
    bridge: {
      status: "not-connected",
      source: comparator.version,
      target: "save-edit-validator-result-apply-gate-bridge-v1",
    },
    blockers,
    payloadShape: {
      version: "save-edit-sample-result-bridge-blocker-summary-v1",
      mode: "read-only-preview",
      source: comparator.version,
      bridge: "not-connected",
      applyGate: gate.applyStatus,
      confirmation: "missing",
      writer: "disabled",
      apply: "disabled",
      blockers: blockers.filter((blocker) => blocker.status === "blocked").map((blocker) => blocker.blocker),
    },
  };
}

function createSaveSlotEditProducedResultBridgeContractPreview(diagnostics) {
  const summary = createSaveSlotEditSampleBridgeBlockerSummaryPreview(diagnostics);
  const routes = [
    saveEditProducedResultBridgeRoute("read-produced-results", "ready", ""),
    saveEditProducedResultBridgeRoute("map-result-status", "ready", ""),
    saveEditProducedResultBridgeRoute("replace-legacy-result-schema", "blocked", "legacy-bridge-still-active"),
    saveEditProducedResultBridgeRoute("open-apply-gate", "blocked", "apply-gate-blocked"),
    saveEditProducedResultBridgeRoute("keep-writer-disabled", "blocked", "writer-disabled"),
  ];
  const blockers = Array.from(new Set(routes.map((route) => route.blocker).filter(Boolean)));
  return {
    status: "blocked",
    version: "save-edit-produced-result-bridge-contract-v1",
    mode: "read-only-preview",
    apply: "disabled",
    resultCount: summary.readyComparisonCount,
    routeCount: routes.length,
    blockerCount: blockers.length,
    adapter: {
      status: "not-connected",
      source: summary.version,
      target: "save-edit-validator-result-apply-gate-bridge-v1",
    },
    routes,
    payloadShape: {
      version: "save-edit-produced-result-bridge-contract-v1",
      mode: "read-only-preview",
      source: summary.version,
      adapter: "not-connected",
      maps: {
        missing: "blocked",
        valid: "ready",
        invalid: "blocked",
      },
      legacyBridge: "unchanged",
      writer: "disabled",
      apply: "disabled",
      blockers,
    },
  };
}

function createSaveSlotEditBridgeTransitionChecklistPreview(diagnostics) {
  const produced = createSaveSlotEditProducedResultBridgeContractPreview(diagnostics);
  const legacy = createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics);
  const text = EDITOR_TEXT.saveEditProducedResultBridgeTransitionChecklist || {};
  const producedReadyRoutes = produced.routes.filter((route) => route.status === "ready").length;
  const legacyBlockedSteps = legacy.steps.filter((step) => step.status === "blocked").length;
  const checks = [
    saveEditProducedResultBridgeTransitionCheck(
      "produced-contract-readable",
      produced.version === "save-edit-produced-result-bridge-contract-v1",
      text.checkLabels?.producedContractReadable,
      "produced-contract-missing",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "legacy-bridge-readable",
      legacy.bridgeVersion === "save-edit-validator-result-apply-gate-bridge-v1",
      text.checkLabels?.legacyBridgeReadable,
      "legacy-bridge-missing",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "route-statuses-visible",
      produced.routeCount > 0 && producedReadyRoutes > 0,
      text.checkLabels?.routeStatusesVisible,
      "produced-routes-missing",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "legacy-blockers-visible",
      legacy.blockedStepCount > 0 && legacyBlockedSteps > 0,
      text.checkLabels?.legacyBlockersVisible,
      "legacy-blockers-missing",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "adapter-connected",
      false,
      text.checkLabels?.adapterConnected,
      "adapter-not-connected",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "legacy-schema-not-replaced",
      produced.payloadShape.legacyBridge === "unchanged",
      text.checkLabels?.legacySchemaNotReplaced,
      "legacy-bridge-replaced",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "legacy-schema-replacement-approved",
      false,
      text.checkLabels?.legacySchemaReplacementApproved,
      "legacy-bridge-still-active",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "apply-gate-held",
      produced.apply === "disabled" && legacy.apply === "disabled",
      text.checkLabels?.applyGateHeld,
      "apply-gate-open",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "apply-runner-bound",
      false,
      text.checkLabels?.applyRunnerBound,
      "apply-runner-missing",
    ),
    saveEditProducedResultBridgeTransitionCheck(
      "writer-disabled",
      produced.payloadShape.writer === "disabled" && legacy.payloadShape.blockers.includes("writer-disabled"),
      text.checkLabels?.writerDisabled,
      "writer-enabled",
    ),
  ];
  const blockers = Array.from(new Set(checks.map((check) => check.blocker).filter(Boolean)));
  return {
    status: "blocked",
    version: "save-edit-produced-result-bridge-transition-checklist-v1",
    mode: "read-only-preview",
    apply: "disabled",
    producedVersion: produced.version,
    legacyBridgeVersion: legacy.bridgeVersion,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    checks,
    payloadShape: {
      version: "save-edit-produced-result-bridge-transition-checklist-v1",
      mode: "read-only-preview",
      producedSource: produced.version,
      legacyTarget: legacy.bridgeVersion,
      producedReadyRoutes,
      legacyBlockedSteps,
      adapter: produced.adapter.status,
      legacyBridge: produced.payloadShape.legacyBridge,
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

function createSaveSlotEditValidatorResultSourceAdapterPlanPreview(diagnostics) {
  const schema = createSaveSlotEditValidatorResultSchemaPreview(diagnostics);
  const executable = createSaveSlotEditValidatorExecutableDryRunPreview(diagnostics);
  const comparator = createSaveSlotEditDryRunSampleComparatorPreview(diagnostics);
  const produced = createSaveSlotEditProducedResultBridgeContractPreview(diagnostics);
  const transition = createSaveSlotEditBridgeTransitionChecklistPreview(diagnostics);
  const candidates = [
    saveEditValidatorResultSourceAdapterCandidate(
      "legacy-result-schema",
      schema.resultShape.version,
      "blocked",
      schema.blockedResultCount > 0 ? "result-not-produced" : "legacy-result-schema-only",
    ),
    saveEditValidatorResultSourceAdapterCandidate(
      "executable-dry-run-results",
      executable.version,
      "blocked",
      executable.blockers[0] || "proposed-values-missing",
    ),
    saveEditValidatorResultSourceAdapterCandidate(
      "dry-run-sample-comparator",
      comparator.version,
      comparator.readyComparisonCount > 0 ? "ready" : "blocked",
      comparator.readyComparisonCount > 0 ? "" : "sample-comparison-missing",
    ),
    saveEditValidatorResultSourceAdapterCandidate(
      "produced-result-bridge-contract",
      produced.version,
      produced.adapter.status === "not-connected" ? "blocked" : "ready",
      produced.adapter.status === "not-connected" ? "adapter-not-connected" : "",
    ),
    saveEditValidatorResultSourceAdapterCandidate(
      "future-live-validator-output",
      "future-live-validator-output-v1",
      "blocked",
      "edit-input-missing",
    ),
  ];
  const blockers = Array.from(new Set([
    ...candidates.map((candidate) => candidate.blocker).filter(Boolean),
    ...transition.payloadShape.blockers,
    "source-selector-not-created",
  ]));
  return {
    status: "blocked",
    version: "save-edit-validator-result-source-adapter-plan-v1",
    mode: "read-only-preview",
    apply: "disabled",
    selectedSource: "none",
    candidateCount: candidates.length,
    readyCandidateCount: candidates.filter((candidate) => candidate.status === "ready").length,
    blockedCandidateCount: candidates.filter((candidate) => candidate.status === "blocked").length,
    adapter: {
      status: "not-connected",
      source: "none",
      target: transition.legacyBridgeVersion,
    },
    candidates,
    payloadShape: {
      version: "save-edit-validator-result-source-adapter-plan-v1",
      mode: "read-only-preview",
      transitionSource: transition.version,
      selectedSource: "none",
      adapter: "not-connected",
      legacyBridge: "unchanged",
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

function createSaveSlotEditSelectedSourceHandoffContractPreview(diagnostics) {
  const plan = createSaveSlotEditValidatorResultSourceAdapterPlanPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditSelectedSourceHandoffContract || {};
  const payloadFields = [
    "sourceId",
    "sourceVersion",
    "resultStatus",
    "resultCount",
    "blockers",
    "adapterTarget",
    "confirmationRequired",
    "writer",
  ];
  const checks = [
    saveEditSelectedSourceHandoffCheck("adapter-plan-readable", true, text.checkLabels?.adapterPlanReadable, ""),
    saveEditSelectedSourceHandoffCheck("payload-shape-declared", true, text.checkLabels?.payloadShapeDeclared, ""),
    saveEditSelectedSourceHandoffCheck("result-status-map-declared", true, text.checkLabels?.resultStatusMapDeclared, ""),
    saveEditSelectedSourceHandoffCheck("legacy-bridge-unchanged", plan.payloadShape.legacyBridge === "unchanged", text.checkLabels?.legacyBridgeUnchanged, "legacy-bridge-replaced"),
    saveEditSelectedSourceHandoffCheck("source-selected", false, text.checkLabels?.sourceSelected, "source-selector-not-created"),
    saveEditSelectedSourceHandoffCheck("adapter-runner-bound", false, text.checkLabels?.adapterRunnerBound, "adapter-runner-missing"),
    saveEditSelectedSourceHandoffCheck("writer-disabled", plan.payloadShape.writer === "disabled", text.checkLabels?.writerDisabled, "writer-enabled"),
  ];
  const blockers = Array.from(new Set([
    ...plan.payloadShape.blockers,
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-selected-source-handoff-contract-v1",
    mode: "read-only-preview",
    apply: "disabled",
    selectedSource: plan.selectedSource,
    sourceAdapterPlanVersion: plan.version,
    fieldCount: payloadFields.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    checks,
    payloadShape: {
      version: "save-edit-selected-source-handoff-contract-v1",
      mode: "read-only-preview",
      sourceAdapterPlan: plan.version,
      selectedSource: plan.selectedSource,
      sourceVersion: "not-selected",
      resultStatusMap: {
        valid: "ready",
        invalid: "blocked",
        warning: "blocked",
        "not-produced": "blocked",
      },
      payloadFields,
      adapterTarget: plan.adapter.target,
      adapterRunner: "not-bound",
      legacyBridge: "unchanged",
      confirmationRequired: true,
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

function createSaveSlotEditAdapterRunnerPreflightPreview(diagnostics) {
  const handoff = createSaveSlotEditSelectedSourceHandoffContractPreview(diagnostics);
  const gate = createSaveSlotApplyGateChecklist(diagnostics);
  const text = EDITOR_TEXT.saveEditAdapterRunnerPreflight || {};
  const gateBlockers = gate.checks
    .filter((check) => check.status === "blocked")
    .map((check) => check.blocker || check.id)
    .filter(Boolean);
  const checks = [
    saveEditAdapterRunnerPreflightCheck("handoff-readable", true, text.checkLabels?.handoffReadable, ""),
    saveEditAdapterRunnerPreflightCheck("payload-fields-stable", handoff.fieldCount >= 8, text.checkLabels?.payloadFieldsStable, handoff.fieldCount >= 8 ? "" : "payload-fields-missing"),
    saveEditAdapterRunnerPreflightCheck("result-status-map-stable", Boolean(handoff.payloadShape.resultStatusMap?.valid), text.checkLabels?.resultStatusMapStable, "result-status-map-missing"),
    saveEditAdapterRunnerPreflightCheck("gate-blockers-visible", gateBlockers.length > 0, text.checkLabels?.gateBlockersVisible, gateBlockers.length > 0 ? "" : "gate-blockers-missing"),
    saveEditAdapterRunnerPreflightCheck("source-selected", false, text.checkLabels?.sourceSelected, "source-selector-not-created"),
    saveEditAdapterRunnerPreflightCheck("confirmation-input-ready", false, text.checkLabels?.confirmationInputReady, "confirmation-input-missing"),
    saveEditAdapterRunnerPreflightCheck("adapter-runner-bound", false, text.checkLabels?.adapterRunnerBound, "adapter-runner-missing"),
    saveEditAdapterRunnerPreflightCheck("writer-disabled", handoff.payloadShape.writer === "disabled", text.checkLabels?.writerDisabled, "writer-enabled"),
  ];
  const blockers = Array.from(new Set([
    ...handoff.payloadShape.blockers,
    ...gateBlockers,
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-adapter-runner-preflight-v1",
    mode: "read-only-preview",
    apply: "disabled",
    sourceHandoffVersion: handoff.version,
    payloadFieldCount: handoff.fieldCount,
    gateBlockerCount: gateBlockers.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    checks,
    payloadShape: {
      version: "save-edit-adapter-runner-preflight-v1",
      mode: "read-only-preview",
      source: handoff.version,
      selectedSource: handoff.selectedSource,
      payloadFields: handoff.payloadShape.payloadFields,
      gateBlockers,
      confirmationInput: "not-created",
      adapterRunner: "not-bound",
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

function createSaveSlotEditConfirmationSourceSelectionContractPreview(diagnostics) {
  const preflight = createSaveSlotEditAdapterRunnerPreflightPreview(diagnostics);
  const gate = createSaveSlotApplyGateChecklist(diagnostics);
  const text = EDITOR_TEXT.saveEditConfirmationSourceSelectionContract || {};
  const checks = [
    saveEditConfirmationSourceSelectionCheck("preflight-readable", true, text.checkLabels?.preflightReadable, ""),
    saveEditConfirmationSourceSelectionCheck("confirmation-phrase-visible", Boolean(gate.confirmationPhrase), text.checkLabels?.confirmationPhraseVisible, "confirmation-phrase-missing"),
    saveEditConfirmationSourceSelectionCheck("source-selection-contract-visible", true, text.checkLabels?.sourceSelectionContractVisible, ""),
    saveEditConfirmationSourceSelectionCheck("source-selection-created", false, text.checkLabels?.sourceSelectionCreated, "source-selector-not-created"),
    saveEditConfirmationSourceSelectionCheck("confirmation-input-created", false, text.checkLabels?.confirmationInputCreated, "confirmation-input-missing"),
    saveEditConfirmationSourceSelectionCheck("selection-confirmed", false, text.checkLabels?.selectionConfirmed, "source-selection-not-confirmed"),
    saveEditConfirmationSourceSelectionCheck("apply-gate-held", preflight.apply === "disabled", text.checkLabels?.applyGateHeld, "apply-gate-open"),
    saveEditConfirmationSourceSelectionCheck("writer-disabled", preflight.payloadShape.writer === "disabled", text.checkLabels?.writerDisabled, "writer-enabled"),
  ];
  const blockers = Array.from(new Set([
    ...preflight.payloadShape.blockers,
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-confirmation-source-selection-contract-v1",
    mode: "read-only-preview",
    apply: "disabled",
    requiredPhrase: gate.confirmationPhrase,
    adapterPreflightVersion: preflight.version,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    sourceSelection: {
      status: "not-created",
      selectedSource: "none",
      requiresPhrase: gate.confirmationPhrase,
    },
    checks,
    payloadShape: {
      version: "save-edit-confirmation-source-selection-contract-v1",
      mode: "read-only-preview",
      source: preflight.version,
      requiredPhrase: gate.confirmationPhrase,
      confirmationInput: "not-created",
      sourceSelection: "not-created",
      selectedSource: "none",
      adapterRunner: "not-bound",
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

function createSaveSlotEditConfirmationInputShellContractPreview(diagnostics) {
  const sourceContract = createSaveSlotEditConfirmationSourceSelectionContractPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditConfirmationInputShellContract || {};
  const fields = [
    saveEditConfirmationInputShellField("phraseDisplay", text.fieldLabels?.phraseDisplay, "readonly-text", "ready", sourceContract.requiredPhrase, ""),
    saveEditConfirmationInputShellField("typedConfirmation", text.fieldLabels?.typedConfirmation, "text-input", "not-created", "not-created", "confirmation-input-missing"),
    saveEditConfirmationInputShellField("sourceSelection", text.fieldLabels?.sourceSelection, "source-selector", "not-created", "none", "source-selector-not-created"),
    saveEditConfirmationInputShellField("selectionMatch", text.fieldLabels?.selectionMatch, "boolean-match", "not-evaluated", "not-evaluated", "source-selection-not-confirmed"),
    saveEditConfirmationInputShellField("submitControl", text.fieldLabels?.submitControl, "button", "disabled", "disabled", "apply-runner-missing"),
  ];
  const checks = [
    saveEditConfirmationInputShellCheck("source-contract-readable", true, text.checkLabels?.sourceContractReadable, ""),
    saveEditConfirmationInputShellCheck("phrase-display-ready", Boolean(sourceContract.requiredPhrase), text.checkLabels?.phraseDisplayReady, "confirmation-phrase-missing"),
    saveEditConfirmationInputShellCheck("typed-confirmation-created", false, text.checkLabels?.typedConfirmationCreated, "confirmation-input-missing"),
    saveEditConfirmationInputShellCheck("source-selection-created", false, text.checkLabels?.sourceSelectionCreated, "source-selector-not-created"),
    saveEditConfirmationInputShellCheck("submit-control-disabled", true, text.checkLabels?.submitControlDisabled, ""),
    saveEditConfirmationInputShellCheck("apply-path-held", sourceContract.apply === "disabled", text.checkLabels?.applyPathHeld, "apply-gate-open"),
    saveEditConfirmationInputShellCheck("writer-disabled", sourceContract.payloadShape.writer === "disabled", text.checkLabels?.writerDisabled, "writer-enabled"),
  ];
  const blockers = Array.from(new Set([
    ...sourceContract.payloadShape.blockers,
    ...fields.map((field) => field.blocker).filter(Boolean),
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-confirmation-input-shell-contract-v1",
    mode: "read-only-preview",
    apply: "disabled",
    requiredPhrase: sourceContract.requiredPhrase,
    fieldCount: fields.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    fields,
    checks,
    payloadShape: {
      version: "save-edit-confirmation-input-shell-contract-v1",
      mode: "read-only-preview",
      source: sourceContract.version,
      requiredPhrase: sourceContract.requiredPhrase,
      fields: fields.map((field) => ({
        id: field.id,
        kind: field.kind,
        status: field.status,
      })),
      confirmationInput: "not-created",
      sourceSelection: "not-created",
      submitControl: "disabled",
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

function createSaveSlotEditConfirmationMatchReviewSummaryPreview(diagnostics) {
  const inputShell = createSaveSlotEditConfirmationInputShellContractPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditConfirmationMatchReviewSummary || {};
  const reviews = [
    saveEditConfirmationMatchReviewRow("requiredPhrase", text.reviewLabels?.requiredPhrase, "ready", inputShell.requiredPhrase, ""),
    saveEditConfirmationMatchReviewRow("typedConfirmation", text.reviewLabels?.typedConfirmation, "blocked", "not-created", "confirmation-input-missing"),
    saveEditConfirmationMatchReviewRow("phraseMatch", text.reviewLabels?.phraseMatch, "blocked", "not-evaluated", "confirmation-phrase-not-matched"),
    saveEditConfirmationMatchReviewRow("selectedSource", text.reviewLabels?.selectedSource, "blocked", "none", "source-selector-not-created"),
    saveEditConfirmationMatchReviewRow("resultSource", text.reviewLabels?.resultSource, "blocked", "not-resolved", "result-source-not-selected"),
    saveEditConfirmationMatchReviewRow("submitControl", text.reviewLabels?.submitControl, "ready", "disabled", ""),
  ];
  const checks = [
    saveEditConfirmationMatchReviewCheck("input-shell-readable", true, text.checkLabels?.inputShellReadable, ""),
    saveEditConfirmationMatchReviewCheck("required-phrase-known", Boolean(inputShell.requiredPhrase), text.checkLabels?.requiredPhraseKnown, "confirmation-phrase-missing"),
    saveEditConfirmationMatchReviewCheck("typed-confirmation-present", false, text.checkLabels?.typedConfirmationPresent, "confirmation-input-missing"),
    saveEditConfirmationMatchReviewCheck("confirmation-phrase-matches", false, text.checkLabels?.confirmationPhraseMatches, "confirmation-phrase-not-matched"),
    saveEditConfirmationMatchReviewCheck("source-selection-present", false, text.checkLabels?.sourceSelectionPresent, "source-selector-not-created"),
    saveEditConfirmationMatchReviewCheck("result-source-resolved", false, text.checkLabels?.resultSourceResolved, "result-source-not-selected"),
    saveEditConfirmationMatchReviewCheck("submit-control-disabled", true, text.checkLabels?.submitControlDisabled, ""),
    saveEditConfirmationMatchReviewCheck("apply-path-held", inputShell.apply === "disabled", text.checkLabels?.applyPathHeld, "apply-gate-open"),
    saveEditConfirmationMatchReviewCheck("writer-disabled", inputShell.payloadShape.writer === "disabled", text.checkLabels?.writerDisabled, "writer-enabled"),
  ];
  const blockers = Array.from(new Set([
    ...inputShell.payloadShape.blockers,
    ...reviews.map((review) => review.blocker).filter(Boolean),
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-confirmation-match-result-source-review-v1",
    mode: "read-only-preview",
    apply: "disabled",
    resultSource: "not-resolved",
    requiredPhrase: inputShell.requiredPhrase,
    reviewCount: reviews.length,
    blockedReviewCount: reviews.filter((review) => review.status === "blocked").length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    reviews,
    checks,
    payloadShape: {
      version: "save-edit-confirmation-match-result-source-review-v1",
      mode: "read-only-preview",
      source: inputShell.version,
      requiredPhrase: inputShell.requiredPhrase,
      typedConfirmation: "not-created",
      phraseMatch: "not-evaluated",
      selectedSource: "none",
      resultSource: "not-resolved",
      submitControl: "disabled",
      apply: "disabled",
      writer: "disabled",
      blockers,
    },
  };
}

function createSaveSlotEditSubmitRunnerBlockerContractPreview(diagnostics) {
  const review = createSaveSlotEditConfirmationMatchReviewSummaryPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditSubmitRunnerBlockerContract || {};
  const runnerBlockers = [
    "submit-runner-not-created",
    "confirmation-input-missing",
    "confirmation-phrase-not-matched",
    "result-source-not-selected",
    "apply-gate-blocked",
  ];
  const checks = [
    saveEditSubmitRunnerBlockerCheck("review-summary-readable", true, text.checkLabels?.reviewSummaryReadable, ""),
    saveEditSubmitRunnerBlockerCheck("submit-runner-created", false, text.checkLabels?.submitRunnerCreated, "submit-runner-not-created"),
    saveEditSubmitRunnerBlockerCheck("typed-confirmation-present", false, text.checkLabels?.typedConfirmationPresent, "confirmation-input-missing"),
    saveEditSubmitRunnerBlockerCheck("confirmation-phrase-matched", false, text.checkLabels?.confirmationPhraseMatched, "confirmation-phrase-not-matched"),
    saveEditSubmitRunnerBlockerCheck("result-source-selected", false, text.checkLabels?.resultSourceSelected, "result-source-not-selected"),
    saveEditSubmitRunnerBlockerCheck("apply-gate-held", review.apply === "disabled", text.checkLabels?.applyGateHeld, "apply-gate-open"),
    saveEditSubmitRunnerBlockerCheck("writer-disabled", review.payloadShape.writer === "disabled", text.checkLabels?.writerDisabled, "writer-enabled"),
  ];
  const blockers = Array.from(new Set([
    ...review.payloadShape.blockers,
    ...runnerBlockers,
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-submit-runner-blocker-contract-v1",
    mode: "read-only-preview",
    apply: "disabled",
    submitRunner: "not-created",
    blockerCount: blockers.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    checks,
    blockers,
    payloadShape: {
      version: "save-edit-submit-runner-blocker-contract-v1",
      mode: "read-only-preview",
      source: review.version,
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

function createSaveSlotEditFinalApplyRunnerHandoffChecklistPreview(diagnostics) {
  const blockerContract = createSaveSlotEditSubmitRunnerBlockerContractPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditFinalApplyRunnerHandoffChecklist || {};
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

function createSaveSlotEditApplyRunnerPayloadShapePreview(diagnostics) {
  const handoff = createSaveSlotEditFinalApplyRunnerHandoffChecklistPreview(diagnostics);
  const gate = createSaveSlotApplyGateChecklist(diagnostics);
  const text = EDITOR_TEXT.saveEditApplyRunnerPayloadShape || {};
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

function createSaveSlotEditPayloadBridgeCompatibilitySummaryPreview(diagnostics) {
  const payload = createSaveSlotEditApplyRunnerPayloadShapePreview(diagnostics);
  const bridge = createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics);
  const text = EDITOR_TEXT.saveEditPayloadBridgeCompatibilitySummary || {};
  const rows = [
    saveEditPayloadBridgeCompatibilityRow("payload-readable", text.rowLabels?.payloadReadable, "ready", payload.version, bridge.bridgeVersion, ""),
    saveEditPayloadBridgeCompatibilityRow("blockers-forwarded", text.rowLabels?.blockersForwarded, payload.blockerCount > 0 ? "ready" : "blocked", `${payload.blockerCount}`, `${bridge.payloadShape.blockers.length}`, payload.blockerCount > 0 ? "" : "blockers-missing"),
    saveEditPayloadBridgeCompatibilityRow("result-source-compatible", text.rowLabels?.resultSourceCompatible, "blocked", payload.payloadShape.resultSource, bridge.payloadShape.resultStatus, "result-source-not-selected"),
    saveEditPayloadBridgeCompatibilityRow("confirmation-compatible", text.rowLabels?.confirmationCompatible, "blocked", payload.payloadShape.confirmationInput, "confirmation-not-implemented", "confirmation-input-missing"),
    saveEditPayloadBridgeCompatibilityRow("runner-compatible", text.rowLabels?.runnerCompatible, "blocked", payload.applyRunner, bridge.apply, "apply-runner-not-created"),
    saveEditPayloadBridgeCompatibilityRow("writer-compatible", text.rowLabels?.writerCompatible, "ready", payload.payloadShape.writer, "writer-disabled", ""),
    saveEditPayloadBridgeCompatibilityRow("side-effects-compatible", text.rowLabels?.sideEffectsCompatible, "ready", payload.payloadShape.sideEffects, "read-only-preview", ""),
  ];
  const blockers = Array.from(new Set([
    ...payload.blockers,
    ...bridge.payloadShape.blockers,
    ...rows.map((row) => row.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-apply-runner-payload-bridge-compatibility-v1",
    mode: "read-only-preview",
    apply: "disabled",
    payloadVersion: payload.version,
    bridgeVersion: bridge.bridgeVersion,
    rowCount: rows.length,
    readyRowCount: rows.filter((row) => row.status === "ready").length,
    blockedRowCount: rows.filter((row) => row.status === "blocked").length,
    blockerCount: blockers.length,
    rows,
    blockers,
    payloadShape: {
      version: "save-edit-apply-runner-payload-bridge-compatibility-v1",
      mode: "read-only-preview",
      source: payload.version,
      bridge: bridge.bridgeVersion,
      compatibility: "blocked",
      apply: "disabled",
      writer: "disabled",
      sideEffects: "disabled",
      rows: rows.map((row) => ({
        id: row.id,
        status: row.status,
        blocker: row.blocker,
      })),
      blockers,
    },
  };
}

function createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics) {
  const schema = createSaveSlotEditValidatorResultSchemaPreview(diagnostics);
  const gate = createSaveSlotApplyGateChecklist(diagnostics);
  const text = EDITOR_TEXT.saveEditValidatorApplyGateBridge || {};
  const gateBlockers = gate.checks
    .filter((check) => check.status === "blocked")
    .map((check) => ({
      id: check.id,
      blocker: check.blocker || "blocked",
    }));
  const resultSchemaReadable = schema.resultCount > 0 && schema.resultShape.apply === "disabled";
  const validatorResultsProduced = schema.resultCount > 0
    && schema.results.every((result) => result.resultStatus !== "not-produced");
  const validatorBlockersCleared = validatorResultsProduced
    && schema.results.every((result) => !result.blocker);
  const applyGateOpen = gate.applyStatus !== "blocked";
  const confirmationReady = gate.checks.find((check) => check.id === "explicit-confirmation-required")?.status === "ready";
  const writerReady = gate.checks.find((check) => check.id === "writer-disabled")?.status === "ready";
  const steps = [
    saveEditValidatorApplyBridgeStep("result-schema-readable", resultSchemaReadable, text.stepLabels?.resultSchemaReadable, text.stepDetails?.resultSchemaReadable, resultSchemaReadable ? "" : "result-schema-missing"),
    saveEditValidatorApplyBridgeStep("validator-results-produced", validatorResultsProduced, text.stepLabels?.validatorResultsProduced, text.stepDetails?.validatorResultsProduced, validatorResultsProduced ? "" : "result-not-produced"),
    saveEditValidatorApplyBridgeStep("validator-blockers-cleared", validatorBlockersCleared, text.stepLabels?.validatorBlockersCleared, text.stepDetails?.validatorBlockersCleared, validatorBlockersCleared ? "" : "validator-missing"),
    saveEditValidatorApplyBridgeStep("apply-gate-open", applyGateOpen, text.stepLabels?.applyGateOpen, text.stepDetails?.applyGateOpen, applyGateOpen ? "" : "apply-gate-blocked"),
    saveEditValidatorApplyBridgeStep("confirmation-ready", confirmationReady, text.stepLabels?.confirmationReady, text.stepDetails?.confirmationReady, confirmationReady ? "" : "confirmation-not-implemented"),
    saveEditValidatorApplyBridgeStep("writer-ready", writerReady, text.stepLabels?.writerReady, text.stepDetails?.writerReady, writerReady ? "" : "writer-disabled"),
  ];
  return {
    status: "blocked",
    bridgeVersion: "save-edit-validator-result-apply-gate-bridge-v1",
    mode: "read-only-preview",
    apply: "disabled",
    resultSchemaVersion: schema.resultShape.version,
    resultCount: schema.resultCount,
    blockedResultCount: schema.blockedResultCount,
    gateBlockedChecks: gate.blockedChecks,
    stepCount: steps.length,
    blockedStepCount: steps.filter((step) => step.status === "blocked").length,
    gateBlockers,
    steps,
    payloadShape: {
      version: "save-edit-validator-result-apply-gate-bridge-v1",
      mode: "read-only-preview",
      source: schema.resultShape.version,
      target: "save-slot-apply-gate-checklist",
      resultStatus: schema.resultShape.resultStatus,
      apply: "disabled",
      blockers: ["result-not-produced", "validator-missing", "apply-gate-blocked", "confirmation-not-implemented", "writer-disabled"],
    },
  };
}

function createSaveSlotEditCompatibilityConfirmationRollupPreview(diagnostics) {
  const compatibility = createSaveSlotEditPayloadBridgeCompatibilitySummaryPreview(diagnostics);
  const bridge = createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics);
  const preflight = createSaveSlotEditValidatorConfirmationPreflightPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditCompatibilityConfirmationRollup || {};
  const bridgeBlockers = Array.from(new Set([
    ...bridge.steps.map((step) => step.blocker).filter(Boolean),
    ...bridge.gateBlockers.map((item) => item.blocker).filter(Boolean),
  ]));
  const confirmationBlockers = preflight.groups.find((group) => group.id === "confirmation")?.blockers || [];
  const writerBlockers = preflight.groups.find((group) => group.id === "writer")?.blockers || [];
  const lanes = [
    saveEditCompatibilityConfirmationRollupLane("payload-compatibility", text.laneLabels?.payloadCompatibility, compatibility.status, compatibility.version, compatibility.blockers),
    saveEditCompatibilityConfirmationRollupLane("apply-bridge", text.laneLabels?.applyBridge, bridge.status, bridge.bridgeVersion, bridgeBlockers),
    saveEditCompatibilityConfirmationRollupLane("confirmation-preflight", text.laneLabels?.confirmationPreflight, preflight.status, preflight.version, confirmationBlockers),
    saveEditCompatibilityConfirmationRollupLane("writer-runner", text.laneLabels?.writerRunner, "blocked", preflight.version, writerBlockers),
  ];
  const checks = [
    saveEditCompatibilityConfirmationRollupCheck("payload-compatibility-readable", true, text.checkLabels?.payloadCompatibilityReadable, text.checkDetails?.payloadCompatibilityReadable, ""),
    saveEditCompatibilityConfirmationRollupCheck("apply-bridge-readable", true, text.checkLabels?.applyBridgeReadable, text.checkDetails?.applyBridgeReadable, ""),
    saveEditCompatibilityConfirmationRollupCheck("confirmation-preflight-readable", true, text.checkLabels?.confirmationPreflightReadable, text.checkDetails?.confirmationPreflightReadable, ""),
    saveEditCompatibilityConfirmationRollupCheck("result-source-resolved", !compatibility.blockers.includes("result-source-not-selected"), text.checkLabels?.resultSourceResolved, text.checkDetails?.resultSourceResolved, "result-source-not-selected"),
    saveEditCompatibilityConfirmationRollupCheck("confirmation-input-created", false, text.checkLabels?.confirmationInputCreated, text.checkDetails?.confirmationInputCreated, "confirmation-input-missing"),
    saveEditCompatibilityConfirmationRollupCheck("apply-runner-bound", false, text.checkLabels?.applyRunnerBound, text.checkDetails?.applyRunnerBound, "apply-runner-missing"),
    saveEditCompatibilityConfirmationRollupCheck("writer-enabled", false, text.checkLabels?.writerEnabled, text.checkDetails?.writerEnabled, "writer-disabled"),
  ];
  const blockers = Array.from(new Set([
    ...lanes.flatMap((lane) => lane.blockers),
    ...preflight.payloadShape.blockers,
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-compatibility-confirmation-rollup-v1",
    mode: "read-only-preview",
    apply: "disabled",
    writer: "disabled",
    sideEffects: "disabled",
    laneCount: lanes.length,
    blockerCount: blockers.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    lanes,
    checks,
    blockers,
    payloadShape: {
      version: "save-edit-compatibility-confirmation-rollup-v1",
      mode: "read-only-preview",
      sources: {
        compatibility: compatibility.version,
        bridge: bridge.bridgeVersion,
        preflight: preflight.version,
      },
      compatibility: "blocked",
      confirmationPreflight: "blocked",
      apply: "disabled",
      writer: "disabled",
      sideEffects: "disabled",
      lanes: lanes.map((lane) => ({
        id: lane.id,
        status: lane.status,
        blockerCount: lane.blockerCount,
      })),
      checks: checks.map((check) => ({
        id: check.id,
        status: check.status,
        blocker: check.blocker,
      })),
      blockers,
    },
  };
}

function createSaveSlotEditValidatorConfirmationPreflightPreview(diagnostics) {
  const bridge = createSaveSlotEditValidatorApplyGateBridgePreview(diagnostics);
  const gate = createSaveSlotApplyGateChecklist(diagnostics);
  const text = EDITOR_TEXT.saveEditValidatorConfirmationPreflight || {};
  const bridgeBlockers = bridge.steps
    .filter((step) => step.status === "blocked")
    .map((step) => step.blocker)
    .filter(Boolean);
  const gateBlockers = bridge.gateBlockers.map((item) => item.blocker).filter(Boolean);
  const blockers = Array.from(new Set([
    ...bridgeBlockers,
    ...gateBlockers,
    "confirmation-input-missing",
    "apply-runner-missing",
    "writer-disabled",
  ]));
  const groups = [
    saveEditValidatorConfirmationPreflightGroup("validator-results", text.groupLabels?.validatorResults, bridgeBlockers.filter((blocker) => ["result-not-produced", "validator-missing"].includes(blocker))),
    saveEditValidatorConfirmationPreflightGroup("apply-gate", text.groupLabels?.applyGate, gateBlockers),
    saveEditValidatorConfirmationPreflightGroup("confirmation", text.groupLabels?.confirmation, ["confirmation-input-missing", "confirmation-not-implemented"]),
    saveEditValidatorConfirmationPreflightGroup("writer", text.groupLabels?.writer, ["apply-runner-missing", "writer-disabled"]),
  ];
  const checks = [
    saveEditValidatorConfirmationPreflightCheck("bridge-readable", true, text.checkLabels?.bridgeReadable, text.checkDetails?.bridgeReadable, ""),
    saveEditValidatorConfirmationPreflightCheck("blocker-summary-readable", blockers.length > 0, text.checkLabels?.blockerSummaryReadable, text.checkDetails?.blockerSummaryReadable, blockers.length > 0 ? "" : "blocker-summary-empty"),
    saveEditValidatorConfirmationPreflightCheck("confirmation-phrase-visible", Boolean(gate.confirmationPhrase), text.checkLabels?.confirmationPhraseVisible, text.checkDetails?.confirmationPhraseVisible, Boolean(gate.confirmationPhrase) ? "" : "confirmation-phrase-missing"),
    saveEditValidatorConfirmationPreflightCheck("confirmation-input-created", false, text.checkLabels?.confirmationInputCreated, text.checkDetails?.confirmationInputCreated, "confirmation-input-missing"),
    saveEditValidatorConfirmationPreflightCheck("apply-runner-bound", false, text.checkLabels?.applyRunnerBound, text.checkDetails?.applyRunnerBound, "apply-runner-missing"),
    saveEditValidatorConfirmationPreflightCheck("writer-enabled", false, text.checkLabels?.writerEnabled, text.checkDetails?.writerEnabled, "writer-disabled"),
  ];
  return {
    status: "blocked",
    version: "save-edit-validator-confirmation-preflight-v1",
    mode: "read-only-preview",
    apply: "disabled",
    requiredPhrase: gate.confirmationPhrase,
    blockerCount: blockers.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    groups,
    checks,
    payloadShape: {
      version: "save-edit-validator-confirmation-preflight-v1",
      mode: "read-only-preview",
      source: bridge.bridgeVersion,
      requiredPhrase: gate.confirmationPhrase,
      confirmationInput: "not-created",
      applyRunner: "not-bound",
      writer: "disabled",
      apply: "disabled",
      blockers,
    },
  };
}

function createSaveSlotEditConfirmationInputContractPreview(diagnostics) {
  const preflight = createSaveSlotEditValidatorConfirmationPreflightPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditConfirmationInputContract || {};
  const fields = [
    saveEditConfirmationInputContractField(
      "confirmationPhrase",
      text.fieldLabels?.confirmationPhrase,
      "text-confirmation",
      "not-created",
      preflight.requiredPhrase,
      "confirmation-input-missing",
    ),
    saveEditConfirmationInputContractField(
      "confirmationMatch",
      text.fieldLabels?.confirmationMatch,
      "boolean-match-preview",
      "not-evaluated",
      "not-evaluated",
      "confirmation-input-missing",
    ),
    saveEditConfirmationInputContractField(
      "validatorResultState",
      text.fieldLabels?.validatorResultState,
      "readonly-result-state",
      "blocked",
      "not-produced",
      "result-not-produced",
    ),
    saveEditConfirmationInputContractField(
      "applyRunnerState",
      text.fieldLabels?.applyRunnerState,
      "readonly-runner-state",
      "not-bound",
      "not-bound",
      "apply-runner-missing",
    ),
  ];
  const guards = [
    "confirmation-phrase-visible",
    "confirmation-input-created",
    "confirmation-match-verified",
    "validator-results-valid",
    "apply-runner-bound",
    "writer-enabled",
  ];
  const blockers = Array.from(new Set([
    ...fields.map((field) => field.blocker),
    "confirmation-input-missing",
    "apply-runner-missing",
    "writer-disabled",
  ]));
  const applyRunner = {
    status: "not-bound",
    mode: "contract-only",
    requires: guards,
    blockers: ["apply-runner-missing", "writer-disabled"],
    sideEffects: "disabled",
  };
  return {
    status: "blocked",
    version: "save-edit-confirmation-input-apply-runner-contract-v1",
    mode: "read-only-preview",
    apply: "disabled",
    requiredPhrase: preflight.requiredPhrase,
    fieldCount: fields.length,
    guardCount: guards.length,
    blockerCount: blockers.length,
    fields,
    guards,
    blockers,
    applyRunner,
    payloadShape: {
      version: "save-edit-confirmation-input-apply-runner-contract-v1",
      mode: "read-only-preview",
      source: preflight.version,
      confirmationInput: {
        status: "not-created",
        inputKind: "text-confirmation",
        requiredPhrase: preflight.requiredPhrase,
        match: "not-evaluated",
      },
      applyRunner: {
        status: "not-bound",
        mode: "contract-only",
        requires: guards,
        sideEffects: "disabled",
      },
      writer: "disabled",
      apply: "disabled",
      blockers,
    },
  };
}

function createSaveSlotEditConfirmationRunnerHandoffSummaryPreview(diagnostics) {
  const contract = createSaveSlotEditConfirmationInputContractPreview(diagnostics);
  const checkpoint = createSaveSlotEditWriterPayloadCheckpointPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditConfirmationRunnerHandoffSummary || {};
  const rows = [
    saveEditConfirmationRunnerHandoffRow("contract-readable", text.rowLabels?.contractReadable, "ready", contract.version, contract.mode, ""),
    saveEditConfirmationRunnerHandoffRow("confirmation-input", text.rowLabels?.confirmationInput, "blocked", contract.payloadShape.confirmationInput.status, contract.payloadShape.confirmationInput.inputKind, "confirmation-input-missing"),
    saveEditConfirmationRunnerHandoffRow("confirmation-match", text.rowLabels?.confirmationMatch, "blocked", contract.payloadShape.confirmationInput.match, "match-required", "confirmation-input-missing"),
    saveEditConfirmationRunnerHandoffRow("validator-results", text.rowLabels?.validatorResults, "blocked", "not-produced", "valid-results-required", "result-not-produced"),
    saveEditConfirmationRunnerHandoffRow("apply-runner", text.rowLabels?.applyRunner, "blocked", contract.applyRunner.status, contract.applyRunner.mode, "apply-runner-missing"),
    saveEditConfirmationRunnerHandoffRow("writer-checkpoint", text.rowLabels?.writerCheckpoint, "blocked", checkpoint.version, checkpoint.rollbackCheckpoint.status, "writer-disabled"),
  ];
  const checks = [
    saveEditConfirmationRunnerHandoffCheck("contract-readable", true, text.checkLabels?.contractReadable, text.checkDetails?.contractReadable, ""),
    saveEditConfirmationRunnerHandoffCheck("blockers-forwarded", contract.blockerCount > 0, text.checkLabels?.blockersForwarded, text.checkDetails?.blockersForwarded, contract.blockerCount > 0 ? "" : "blockers-missing"),
    saveEditConfirmationRunnerHandoffCheck("confirmation-input-created", false, text.checkLabels?.confirmationInputCreated, text.checkDetails?.confirmationInputCreated, "confirmation-input-missing"),
    saveEditConfirmationRunnerHandoffCheck("confirmation-match-verified", false, text.checkLabels?.confirmationMatchVerified, text.checkDetails?.confirmationMatchVerified, "confirmation-input-missing"),
    saveEditConfirmationRunnerHandoffCheck("validator-results-valid", false, text.checkLabels?.validatorResultsValid, text.checkDetails?.validatorResultsValid, "result-not-produced"),
    saveEditConfirmationRunnerHandoffCheck("apply-runner-bound", false, text.checkLabels?.applyRunnerBound, text.checkDetails?.applyRunnerBound, "apply-runner-missing"),
    saveEditConfirmationRunnerHandoffCheck("writer-enabled", false, text.checkLabels?.writerEnabled, text.checkDetails?.writerEnabled, "writer-disabled"),
  ];
  const contractBlockers = Array.isArray(contract.blockers) ? contract.blockers : [];
  const checkpointBlockers = Array.isArray(checkpoint.blockers)
    ? checkpoint.blockers
    : (Array.isArray(checkpoint.rollbackCheckpoint?.blockers) ? checkpoint.rollbackCheckpoint.blockers : []);
  const blockers = Array.from(new Set([
    ...contractBlockers,
    ...checkpointBlockers,
    ...rows.map((row) => row.blocker).filter(Boolean),
    ...checks.map((check) => check.blocker).filter(Boolean),
  ]));
  return {
    status: "blocked",
    version: "save-edit-confirmation-runner-handoff-summary-v1",
    mode: "read-only-preview",
    handoff: "blocked",
    confirmationInput: "not-created",
    applyRunner: "not-bound",
    apply: "disabled",
    writer: "disabled",
    sideEffects: "disabled",
    rowCount: rows.length,
    blockedRowCount: rows.filter((row) => row.status === "blocked").length,
    blockerCount: blockers.length,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    rows,
    checks,
    blockers,
    payloadShape: {
      version: "save-edit-confirmation-runner-handoff-summary-v1",
      mode: "read-only-preview",
      source: contract.version,
      next: checkpoint.version,
      handoff: "blocked",
      confirmationInput: "not-created",
      confirmationMatch: "not-evaluated",
      applyRunner: "not-bound",
      apply: "disabled",
      writer: "disabled",
      sideEffects: "disabled",
      rows: rows.map((row) => ({
        id: row.id,
        status: row.status,
        blocker: row.blocker,
      })),
      checks: checks.map((check) => ({
        id: check.id,
        status: check.status,
        blocker: check.blocker,
      })),
      blockers,
    },
  };
}

function createSaveSlotEditWriterPayloadCheckpointPreview(diagnostics) {
  const contract = createSaveSlotEditConfirmationInputContractPreview(diagnostics);
  const draft = createSaveSlotDraftPayloadPreview(diagnostics);
  const recovery = createSaveSlotRecoveryRehearsalPreview(diagnostics, { skipApplyGate: true });
  const text = EDITOR_TEXT.saveEditWriterPayloadCheckpoint || {};
  const rollbackCheckpoint = {
    status: "not-created",
    mode: "contract-only",
    keys: recovery.snapshotKeys,
    blockers: ["rollback-checkpoint-not-created", "writer-disabled"],
  };
  const checks = [
    saveEditWriterPayloadCheckpointCheck("confirmation-contract-readable", true, text.checkLabels?.confirmationContractReadable, text.checkDetails?.confirmationContractReadable, ""),
    saveEditWriterPayloadCheckpointCheck("draft-payload-readable", draft.operationCount > 0, text.checkLabels?.draftPayloadReadable, text.checkDetails?.draftPayloadReadable, draft.operationCount > 0 ? "" : "draft-empty"),
    saveEditWriterPayloadCheckpointCheck("rollback-checkpoint-created", false, text.checkLabels?.rollbackCheckpointCreated, text.checkDetails?.rollbackCheckpointCreated, "rollback-checkpoint-not-created"),
    saveEditWriterPayloadCheckpointCheck("apply-runner-bound", false, text.checkLabels?.applyRunnerBound, text.checkDetails?.applyRunnerBound, "apply-runner-missing"),
    saveEditWriterPayloadCheckpointCheck("writer-enabled", false, text.checkLabels?.writerEnabled, text.checkDetails?.writerEnabled, "writer-disabled"),
    saveEditWriterPayloadCheckpointCheck("post-write-validation-ready", false, text.checkLabels?.postWriteValidationReady, text.checkDetails?.postWriteValidationReady, "post-write-validation-missing"),
  ];
  return {
    status: "blocked",
    version: "save-edit-writer-payload-rollback-checkpoint-v1",
    mode: "read-only-preview",
    apply: "disabled",
    targetCount: draft.targetCount,
    operationCount: draft.operationCount,
    checkCount: checks.length,
    blockedCheckCount: checks.filter((check) => check.status === "blocked").length,
    checks,
    rollbackCheckpoint,
    payloadShape: {
      version: "save-edit-writer-payload-rollback-checkpoint-v1",
      mode: "read-only-preview",
      source: contract.version,
      writerPayload: {
        status: "not-created",
        targetCount: draft.targetCount,
        operationCount: draft.operationCount,
        sourceDraft: draft.version,
      },
      rollbackCheckpoint: {
        status: "not-created",
        mode: "contract-only",
        keys: rollbackCheckpoint.keys,
      },
      applyRunner: "not-bound",
      writer: "disabled",
      apply: "disabled",
      blockers: ["rollback-checkpoint-not-created", "apply-runner-missing", "writer-disabled", "post-write-validation-missing"],
    },
  };
}

function createSaveSlotEditPostWriteRestoreContractPreview(diagnostics) {
  const checkpoint = createSaveSlotEditWriterPayloadCheckpointPreview(diagnostics);
  const recovery = createSaveSlotRecoveryRehearsalPreview(diagnostics, { skipApplyGate: true });
  const text = EDITOR_TEXT.saveEditPostWriteRestoreContract || {};
  const routes = [
    saveEditPostWriteRestoreRoute("post-write-validation", text.routeLabels?.postWriteValidation, "not-bound", "post-write-validation-missing"),
    saveEditPostWriteRestoreRoute("restore-from-checkpoint", text.routeLabels?.restoreFromCheckpoint, "not-bound", "restore-runner-missing"),
    saveEditPostWriteRestoreRoute("revalidate-after-restore", text.routeLabels?.revalidateAfterRestore, "not-bound", "restore-validation-missing"),
    saveEditPostWriteRestoreRoute("surface-failure-log", text.routeLabels?.surfaceFailureLog, "planned", "failure-log-not-connected"),
  ];
  const blockers = Array.from(new Set(routes.map((route) => route.blocker).concat(checkpoint.rollbackCheckpoint.blockers)));
  return {
    status: "blocked",
    version: "save-edit-post-write-validation-restore-route-v1",
    mode: "read-only-preview",
    apply: "disabled",
    postWriteValidation: {
      status: "not-bound",
      mode: "contract-only",
      requires: ["writer-result", "saved-state-readable", "schema-validation"],
    },
    restoreRunner: {
      status: "not-bound",
      mode: "contract-only",
      checkpointKeys: recovery.snapshotKeys,
    },
    routeCount: routes.length,
    blockerCount: blockers.length,
    routes,
    blockers,
    payloadShape: {
      version: "save-edit-post-write-validation-restore-route-v1",
      mode: "read-only-preview",
      source: checkpoint.version,
      postWriteValidation: "not-bound",
      restoreRunner: "not-bound",
      rollbackCheckpoint: checkpoint.rollbackCheckpoint.status,
      checkpointKeys: recovery.snapshotKeys,
      apply: "disabled",
      blockers,
    },
  };
}

function createSaveSlotEditWriterEnablementRiskSummary(diagnostics) {
  const restoreContract = createSaveSlotEditPostWriteRestoreContractPreview(diagnostics);
  const text = EDITOR_TEXT.saveEditWriterEnablementRisk || {};
  const checklist = [
    saveEditWriterEnablementRiskCheck("restore-contract-readable", true, text.checkLabels?.restoreContractReadable, text.checkDetails?.restoreContractReadable, ""),
    saveEditWriterEnablementRiskCheck("validator-results-produced", false, text.checkLabels?.validatorResultsProduced, text.checkDetails?.validatorResultsProduced, "validator-results-missing"),
    saveEditWriterEnablementRiskCheck("confirmation-input-bound", false, text.checkLabels?.confirmationInputBound, text.checkDetails?.confirmationInputBound, "confirmation-input-missing"),
    saveEditWriterEnablementRiskCheck("rollback-checkpoint-available", false, text.checkLabels?.rollbackCheckpointAvailable, text.checkDetails?.rollbackCheckpointAvailable, "rollback-checkpoint-not-created"),
    saveEditWriterEnablementRiskCheck("post-write-validation-bound", false, text.checkLabels?.postWriteValidationBound, text.checkDetails?.postWriteValidationBound, "post-write-validation-missing"),
    saveEditWriterEnablementRiskCheck("restore-runner-bound", false, text.checkLabels?.restoreRunnerBound, text.checkDetails?.restoreRunnerBound, "restore-runner-missing"),
    saveEditWriterEnablementRiskCheck("manual-unlock-approved", false, text.checkLabels?.manualUnlockApproved, text.checkDetails?.manualUnlockApproved, "manual-unlock-not-approved"),
  ];
  const blockers = Array.from(new Set(
    checklist
      .map((check) => check.blocker)
      .filter(Boolean)
      .concat(restoreContract.blockers),
  ));
  const manualUnlock = {
    status: "not-available",
    mode: "manual-review-only",
    requiredReview: [
      "validator-results",
      "rollback-checkpoint",
      "post-write-validation",
      "restore-runner",
      "failure-log",
    ],
    blockers: ["manual-unlock-not-approved", "writer-disabled"],
  };
  return {
    status: "blocked",
    version: "save-edit-final-writer-enablement-risk-manual-unlock-v1",
    mode: "read-only-preview",
    apply: "disabled",
    riskLevel: "high",
    checkCount: checklist.length,
    blockerCount: blockers.length,
    checklist,
    manualUnlock,
    payloadShape: {
      version: "save-edit-final-writer-enablement-risk-manual-unlock-v1",
      mode: "read-only-preview",
      source: restoreContract.version,
      riskLevel: "high",
      writer: "disabled",
      apply: "disabled",
      manualUnlock: {
        status: "not-available",
        mode: "manual-review-only",
        requiredReview: manualUnlock.requiredReview,
        blockers: manualUnlock.blockers,
      },
      blockers,
    },
  };
}

function saveEditPostWriteRestoreRoute(id, label, status, blocker) {
  return {
    id,
    label: label || id,
    status,
    blocker,
  };
}

function saveEditWriterEnablementRiskCheck(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: blocker || "",
  };
}

function saveEditWriterPayloadCheckpointCheck(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: blocker || "",
  };
}

function saveEditConfirmationRunnerHandoffRow(id, label, status, sourceValue, targetValue, blocker) {
  return {
    id,
    label: label || id,
    status,
    sourceValue,
    targetValue,
    blocker,
  };
}

function saveEditConfirmationRunnerHandoffCheck(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: isReady ? "" : blocker,
  };
}

function saveEditConfirmationInputContractField(id, label, inputKind, status, previewValue, blocker) {
  return {
    id,
    label: label || id,
    inputKind,
    status,
    previewValue,
    blocker,
  };
}

function saveEditValidatorConfirmationPreflightGroup(id, label, blockers) {
  const uniqueBlockers = Array.from(new Set(blockers.filter(Boolean)));
  return {
    id,
    label: label || id,
    blockerCount: uniqueBlockers.length,
    blockers: uniqueBlockers,
  };
}

function saveEditValidatorConfirmationPreflightCheck(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: blocker || "",
  };
}

function saveEditValidatorApplyBridgeStep(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: blocker || "",
  };
}

function saveEditValidatorFunctionName(ruleId) {
  return `validateSaveEdit_${ruleId.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "")}`;
}

function validateSaveEdit_min_1(context) {
  return validateSaveEditIntegerMinimum(context, 1);
}

function validateSaveEdit_min_0(context) {
  return validateSaveEditIntegerMinimum(context, 0);
}

function validateSaveEdit_known_region_id(context) {
  return validateSaveEditStringValue(context, { allowEmpty: false });
}

function validateSaveEdit_known_region_id_list(context) {
  return validateSaveEditArrayValue(context);
}

function validateSaveEdit_gate_map_shape(context) {
  return validateSaveEditObjectValue(context);
}

function validateSaveEdit_known_item_id_list(context) {
  return validateSaveEditArrayValue(context);
}

function validateSaveEdit_known_equipment_slot_map(context) {
  return validateSaveEditObjectValue(context);
}

function validateSaveEdit_profile_text_limit(context) {
  if (saveEditHasMissingProposedValue(context.proposedValue)) {
    return saveEditValidatorDryRunResult("profile-text-limit", context.targetPath, "not-produced", "not-produced", "proposed-values-missing", []);
  }
  if (typeof context.proposedValue !== "string") {
    return saveEditValidatorDryRunResult("profile-text-limit", context.targetPath, "invalid", String(context.proposedValue), "validation-failed", ["expected-string"]);
  }
  const normalizedValue = context.proposedValue.trim().slice(0, 32);
  const isValid = normalizedValue.length > 0 && context.proposedValue.length <= 32;
  return saveEditValidatorDryRunResult("profile-text-limit", context.targetPath, isValid ? "valid" : "invalid", normalizedValue, isValid ? "" : "validation-failed", isValid ? [] : ["profile-text-limit"]);
}

function validateSaveEdit_portrait_frame_shape(context) {
  return validateSaveEditObjectValue(context);
}

function validateSaveEditIntegerMinimum(context, minimum) {
  if (saveEditHasMissingProposedValue(context.proposedValue)) {
    return saveEditValidatorDryRunResult(`min:${minimum}`, context.targetPath, "not-produced", "not-produced", "proposed-values-missing", []);
  }
  const numericValue = Number(context.proposedValue);
  const isValid = Number.isInteger(numericValue) && numericValue >= minimum;
  return saveEditValidatorDryRunResult(`min:${minimum}`, context.targetPath, isValid ? "valid" : "invalid", Number.isFinite(numericValue) ? String(numericValue) : "invalid-number", isValid ? "" : "validation-failed", isValid ? [] : [`min:${minimum}`]);
}

function validateSaveEditStringValue(context, options = {}) {
  if (saveEditHasMissingProposedValue(context.proposedValue)) {
    return saveEditValidatorDryRunResult("string", context.targetPath, "not-produced", "not-produced", "proposed-values-missing", []);
  }
  const isString = typeof context.proposedValue === "string";
  const normalizedValue = isString ? context.proposedValue.trim() : String(context.proposedValue);
  const isValid = isString && (options.allowEmpty || normalizedValue.length > 0);
  return saveEditValidatorDryRunResult("string", context.targetPath, isValid ? "valid" : "invalid", normalizedValue, isValid ? "" : "validation-failed", isValid ? [] : ["expected-string"]);
}

function validateSaveEditArrayValue(context) {
  if (saveEditHasMissingProposedValue(context.proposedValue)) {
    return saveEditValidatorDryRunResult("array", context.targetPath, "not-produced", "not-produced", "proposed-values-missing", []);
  }
  const isValid = Array.isArray(context.proposedValue);
  return saveEditValidatorDryRunResult("array", context.targetPath, isValid ? "valid" : "invalid", isValid ? `${context.proposedValue.length} entries` : "not-array", isValid ? "" : "validation-failed", isValid ? [] : ["expected-array"]);
}

function validateSaveEditObjectValue(context) {
  if (saveEditHasMissingProposedValue(context.proposedValue)) {
    return saveEditValidatorDryRunResult("object", context.targetPath, "not-produced", "not-produced", "proposed-values-missing", []);
  }
  const isValid = Boolean(context.proposedValue) && typeof context.proposedValue === "object" && !Array.isArray(context.proposedValue);
  return saveEditValidatorDryRunResult("object", context.targetPath, isValid ? "valid" : "invalid", isValid ? "object" : "not-object", isValid ? "" : "validation-failed", isValid ? [] : ["expected-object"]);
}

function saveEditHasMissingProposedValue(value) {
  return value === "pending-input" || typeof value === "undefined";
}

function saveEditValidatorDryRunResult(ruleId, targetPath, resultStatus, normalizedValue, blocker, warnings) {
  return {
    ruleId,
    targetPath,
    resultStatus,
    normalizedValue,
    blocker,
    warnings,
  };
}

function saveEditSampleBridgeBlocker(id, status, blocker) {
  return {
    id,
    status,
    blocker,
  };
}

function saveEditProducedResultBridgeRoute(id, status, blocker) {
  return {
    id,
    status,
    blocker,
  };
}

function saveEditProducedResultBridgeTransitionCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}

function saveEditValidatorResultSourceAdapterCandidate(id, sourceVersion, status, blocker) {
  return {
    id,
    sourceVersion,
    status,
    blocker,
  };
}

function saveEditSelectedSourceHandoffCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}

function saveEditAdapterRunnerPreflightCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}

function saveEditConfirmationSourceSelectionCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}

function saveEditConfirmationInputShellField(id, label, kind, status, value, blocker) {
  return {
    id,
    label: label || id,
    kind,
    status,
    value,
    blocker,
  };
}

function saveEditConfirmationInputShellCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}

function saveEditConfirmationMatchReviewRow(id, label, status, value, blocker) {
  return {
    id,
    label: label || id,
    status,
    value,
    blocker,
  };
}

function saveEditConfirmationMatchReviewCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}

function saveEditSubmitRunnerBlockerCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}

function saveEditFinalApplyRunnerHandoffCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}

function saveEditApplyRunnerPayloadField(id, label, kind, status, value, blocker) {
  return {
    id,
    label: label || id,
    kind,
    status,
    value,
    blocker,
  };
}

function saveEditApplyRunnerPayloadCheck(id, ready, label, blocker) {
  return {
    id,
    label: label || id,
    status: ready ? "ready" : "blocked",
    blocker: ready ? "" : blocker,
  };
}

function saveEditPayloadBridgeCompatibilityRow(id, label, status, payloadValue, bridgeValue, blocker) {
  return {
    id,
    label: label || id,
    status,
    payloadValue,
    bridgeValue,
    blocker,
  };
}

function saveEditCompatibilityConfirmationRollupLane(id, label, status, source, blockers) {
  const uniqueBlockers = Array.from(new Set((blockers || []).filter(Boolean)));
  return {
    id,
    label: label || id,
    status,
    source,
    blockerCount: uniqueBlockers.length,
    blockers: uniqueBlockers,
  };
}

function saveEditCompatibilityConfirmationRollupCheck(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: isReady ? "" : blocker,
  };
}

function saveEditProposedValueSamplesForField(field) {
  switch (field.validationRule) {
    case "min:1":
      return { valid: 2, invalid: 0 };
    case "min:0":
      return { valid: 10, invalid: -1 };
    case "known-region-id":
      return { valid: "tutorial_island", invalid: "" };
    case "known-region-id-list":
      return { valid: ["tutorial_island"], invalid: "not-array" };
    case "gate-map-shape":
      return { valid: { tutorial_island: { currentNodeId: "start" } }, invalid: [] };
    case "known-item-id-list":
      return { valid: [], invalid: "not-array" };
    case "known-equipment-slot-map":
      return { valid: { weapon: null, armor: null }, invalid: [] };
    case "profile-text-limit":
      return { valid: "Regressor", invalid: "" };
    case "portrait-frame-shape":
      return { valid: { frameId: "default" }, invalid: [] };
    default:
      return saveEditDefaultSamplesForValueType(field.valueType);
  }
}

function saveEditDefaultSamplesForValueType(valueType) {
  if (valueType === "integer") return { valid: 1, invalid: "not-number" };
  if (valueType.endsWith("[]")) return { valid: [], invalid: "not-array" };
  if (valueType === "object" || valueType === "slot-map") return { valid: {}, invalid: [] };
  return { valid: "sample", invalid: "" };
}

function saveEditSerializePreviewValue(value) {
  if (typeof value === "string") return value || "\"\"";
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  return JSON.stringify(value);
}

function saveEditDryRunStage(id, isReady, label, detail) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
  };
}

function saveEditValidationRuleChecks(ruleId, context, text) {
  const labels = text.ruleCheckLabels || {};
  const details = text.ruleCheckDetails || {};
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
      tf("editorPrep.saveEditRuleDrilldown.validatorPendingDetail", { rule: ruleId }, details.validatorExecutable || ""),
    ),
    saveEditValidationRuleCheck(
      "apply-gate-open",
      context.gate.applyStatus !== "blocked",
      labels.applyGateOpen,
      details.applyGateOpen,
    ),
  ];
}

function saveEditValidationRuleCheck(id, isReady, label, detail) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
  };
}

function saveEditInputSchemaField(group, field, gate) {
  return {
    groupId: group.id,
    groupLabel: group.label,
    path: field.path,
    valueType: field.valueType,
    inputKind: saveEditInputKindForField(field),
    validationRule: field.guard,
    status: "blocked",
    blocker: gate.applyStatus === "blocked" ? "apply-gate-blocked" : "input-control-disabled",
  };
}

function saveEditInputKindForField(field) {
  if (field.valueType === "integer") return "number-stepper";
  if (field.valueType === "string") return "text-field";
  if (field.valueType.endsWith("[]")) return "readonly-list-editor";
  if (field.valueType === "slot-map") return "readonly-slot-map";
  if (field.valueType === "object") return "readonly-json-object";
  return "readonly-preview";
}

function createSaveSlotRecoveryRehearsalPreview(diagnostics, options = {}) {
  const text = EDITOR_TEXT.saveRecovery || {};
  const validation = createSaveSlotValidationPlan(diagnostics);
  const draft = createSaveSlotDraftPayloadPreview(diagnostics);
  const diff = createSaveSlotDraftDiffSummary(diagnostics);
  const gate = options.skipApplyGate ? { applyStatus: "blocked" } : createSaveSlotApplyGateChecklist(diagnostics, { skipRecovery: true });
  const snapshotKeys = [
    saveRecoverySnapshotKey(SAVE_SLOT_DIAGNOSTIC_KEYS.activeSave, text.keyLabels?.activeSave, diagnostics.activeSave),
    saveRecoverySnapshotKey(SAVE_SLOT_DIAGNOSTIC_KEYS.slotStore, text.keyLabels?.slotStore, diagnostics.slotStore),
    saveRecoverySnapshotKey(SAVE_SLOT_DIAGNOSTIC_KEYS.activeSlot, text.keyLabels?.activeSlot, diagnostics.activeSlot),
    saveRecoverySnapshotKey(SAVE_SLOT_DIAGNOSTIC_KEYS.uiState, text.keyLabels?.uiState, diagnostics.uiState),
  ];
  const keysReadable = snapshotKeys.every((item) => item.status === "ready");
  const rollbackReady = validation.rollbackStatus === "ready";
  const diffReady = diff.rowCount > 0;
  const gateBlocked = gate.applyStatus === "blocked";
  const steps = [
    saveRecoveryStep("snapshot-readiness", keysReadable, text.stepLabels?.snapshotReadiness, text.stepDetails?.snapshotReadiness, keysReadable ? "" : "snapshot-key-invalid"),
    saveRecoveryStep("rollback-contract", rollbackReady, text.stepLabels?.rollbackContract, text.stepDetails?.rollbackContract, rollbackReady ? "" : "rollback-contract-blocked"),
    saveRecoveryStep("draft-diff-boundary", draft.operationCount > 0 && diffReady, text.stepLabels?.draftDiffBoundary, text.stepDetails?.draftDiffBoundary, diffReady ? "" : "diff-preview-empty"),
    saveRecoveryStep("apply-gate-hold", gateBlocked, text.stepLabels?.applyGateHold, text.stepDetails?.applyGateHold, ""),
    saveRecoveryStep("writer-exception-restore", false, text.stepLabels?.writerExceptionRestore, text.stepDetails?.writerExceptionRestore, "writer-not-implemented"),
    saveRecoveryStep("post-apply-validation-restore", false, text.stepLabels?.postApplyValidationRestore, text.stepDetails?.postApplyValidationRestore, "post-apply-validation-missing"),
  ];
  const failureRoutes = [
    saveRecoveryRoute("parse-failure-before-apply", text.routeLabels?.parseFailure, text.routeDetails?.parseFailure, "stop-before-writer"),
    saveRecoveryRoute("missing-path-before-apply", text.routeLabels?.missingPath, text.routeDetails?.missingPath, diff.missingRows > 0 ? "block-on-missing-path" : "no-missing-path"),
    saveRecoveryRoute("writer-exception", text.routeLabels?.writerException, text.routeDetails?.writerException, "restore-snapshot-keys"),
    saveRecoveryRoute("post-apply-validation-failure", text.routeLabels?.postApplyValidationFailure, text.routeDetails?.postApplyValidationFailure, "restore-then-rerun-diagnostics"),
  ];
  return {
    status: "blocked",
    readableKeys: snapshotKeys.filter((item) => item.status === "ready").length,
    blockedSteps: steps.filter((step) => step.status === "blocked").length,
    snapshotKeys,
    steps,
    failureRoutes,
    previewShape: {
      version: "save-slot-recovery-rehearsal-v1",
      mode: "read-only-preview",
      snapshotKeys: snapshotKeys.map((item) => item.key),
      apply: "disabled",
    },
  };
}

function saveRecoverySnapshotKey(key, label, diagnostic) {
  const status = diagnostic?.status === "invalid" || diagnostic?.status === "unavailable" ? "blocked" : "ready";
  return {
    key,
    label: label || key,
    status,
    detail: diagnostic?.hint || "",
  };
}

function saveRecoveryStep(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: blocker || "",
  };
}

function saveRecoveryRoute(id, label, detail, action) {
  return {
    id,
    label: label || id,
    detail: detail || "",
    action,
  };
}

function createSaveSlotApplyGateChecklist(diagnostics, options = {}) {
  const validation = createSaveSlotValidationPlan(diagnostics);
  const draft = createSaveSlotDraftPayloadPreview(diagnostics);
  const diff = createSaveSlotDraftDiffSummary(diagnostics);
  const text = EDITOR_TEXT.saveApplyGate || {};
  const recovery = options.skipRecovery ? null : createSaveSlotRecoveryRehearsalPreview(diagnostics, { skipApplyGate: true });
  const recoveryReady = recovery ? recovery.blockedSteps === 0 : false;
  const validationChecks = new Map(validation.checks.map((check) => [check.id, check]));
  const diagnosticsReady = ["active-save-readable", "slot-store-readable", "active-slot-safe"]
    .every((id) => validationChecks.get(id)?.status === "ready");
  const rollbackReady = validationChecks.get("rollback-snapshot-ready")?.status === "ready";
  const draftScopeLocked = draft.payloadShape.mode === "read-only-preview"
    && draft.payloadShape.apply === "disabled"
    && draft.operationCount > 0;
  const diffReady = diff.rowCount > 0 && diff.groups.length > 0;
  const currentPathCoverage = diff.missingRows === 0;
  const checks = [
    saveApplyGateCheck("diagnostics-readable", diagnosticsReady, text.checkLabels?.diagnosticsReadable, text.details?.diagnosticsReadable, diagnosticsReady ? "" : "diagnostics-blocked"),
    saveApplyGateCheck("rollback-contract-ready", rollbackReady, text.checkLabels?.rollbackContractReady, text.details?.rollbackContractReady, rollbackReady ? "" : "rollback-blocked"),
    saveApplyGateCheck("draft-scope-locked", draftScopeLocked, text.checkLabels?.draftScopeLocked, text.details?.draftScopeLocked, draftScopeLocked ? "" : "draft-scope-blocked"),
    saveApplyGateCheck("diff-preview-ready", diffReady, text.checkLabels?.diffPreviewReady, text.details?.diffPreviewReady, diffReady ? "" : "diff-empty"),
    saveApplyGateCheck("current-paths-covered", currentPathCoverage, text.checkLabels?.currentPathsCovered, text.details?.currentPathsCovered, currentPathCoverage ? "" : "missing-current-path"),
    saveApplyGateCheck("explicit-confirmation-required", false, text.checkLabels?.explicitConfirmationRequired, text.details?.explicitConfirmationRequired, "confirmation-not-implemented"),
    saveApplyGateCheck("writer-disabled", false, text.checkLabels?.writerDisabled, text.details?.writerDisabled, "writer-disabled"),
    saveApplyGateCheck("recovery-rehearsal-required", recoveryReady, text.checkLabels?.recoveryRehearsalRequired, text.details?.recoveryRehearsalRequired, recoveryReady ? "" : `recovery-blocked:${recovery?.blockedSteps ?? "pending"}`),
  ];
  return {
    applyStatus: "blocked",
    recoveryStatus: recoveryReady ? "ready" : "blocked",
    recoveryBlockedSteps: recovery?.blockedSteps ?? 0,
    readyChecks: checks.filter((check) => check.status === "ready").length,
    blockedChecks: checks.filter((check) => check.status === "blocked").length,
    totalChecks: checks.length,
    targetCount: draft.targetCount,
    diffRowCount: diff.rowCount,
    confirmationPhrase: text.requiredPhrase || "SAVE-EDIT-v1-CONFIRM",
    checks,
  };
}

function saveApplyGateCheck(id, isReady, label, detail, blocker) {
  return {
    id,
    status: isReady ? "ready" : "blocked",
    label: label || id,
    detail: detail || "",
    blocker: blocker || "",
  };
}

function createSaveDraftDiffTargets(diagnostics) {
  const text = EDITOR_TEXT.saveDraftDiff || {};
  return [
    {
      id: "activeSave",
      label: text.activeSaveTarget || "Active save",
      status: diagnostics.activeSave.status,
      saveState: diagnostics.activeSave.value,
    },
    ...diagnostics.slots.map((slot) => ({
      id: slot.id,
      label: slot.label,
      status: slot.status,
      saveState: slot.saveState,
    })),
  ];
}

function createSaveDraftDiffRow(target, field) {
  const targetReady = ["ready", "warning"].includes(target.status) && isPlainObject(target.saveState);
  if (!targetReady) {
    return {
      ...field,
      targetId: target.id,
      targetLabel: target.label,
      status: "target-blocked",
      currentPreview: "-",
      proposedPreview: "pending-input",
      blocker: target.status || "unavailable",
    };
  }
  const current = readSaveDraftPath(target.saveState, field.path);
  return {
    ...field,
    targetId: target.id,
    targetLabel: target.label,
    status: current.exists ? "waiting-input" : "missing-current-path",
    currentPreview: current.exists ? formatSaveDraftDiffValue(current.value) : "-",
    proposedPreview: "pending-input",
    blocker: current.exists ? "writer-disabled" : "missing-current-path",
  };
}

function readSaveDraftPath(source, path) {
  const parts = String(path || "").split(".").filter(Boolean);
  let value = source;
  for (const part of parts) {
    if (!isPlainObject(value) && !Array.isArray(value)) return { exists: false, value: undefined };
    if (!Object.hasOwn(value, part)) return { exists: false, value: undefined };
    value = value[part];
  }
  return { exists: true, value };
}

function formatSaveDraftDiffValue(value) {
  if (value === null) return "null";
  if (value === undefined) return "-";
  if (Array.isArray(value)) return `array(${value.length})`;
  if (isPlainObject(value)) return `object(${Object.keys(value).length})`;
  const text = String(value);
  return text.length > 32 ? `${text.slice(0, 29)}...` : text;
}

function createSaveSlotDiagnostics() {
  const text = EDITOR_TEXT.saveDiagnostics || {};
  const activeSave = readEditorStorageJson(SAVE_SLOT_DIAGNOSTIC_KEYS.activeSave, { expectObject: true });
  activeSave.summary = activeSave.status === "ready" ? summarizeSaveStateForDiagnostics(activeSave.value) : null;
  activeSave.hint = saveDiagnosticStorageHint(activeSave);

  const slotStore = readEditorStorageJson(SAVE_SLOT_DIAGNOSTIC_KEYS.slotStore, { expectObject: true });
  slotStore.hint = saveDiagnosticStorageHint(slotStore);
  const slots = SAVE_SLOT_DIAGNOSTIC_SLOT_IDS.map((slotId, index) => createSaveSlotDiagnostic(slotId, index, slotStore));
  const slotCounts = {
    total: slots.length,
    filled: slots.filter((slot) => ["ready", "warning"].includes(slot.status)).length,
    invalid: slots.filter((slot) => ["invalid", "unavailable"].includes(slot.status)).length,
  };

  const activeSlot = readEditorStorageText(SAVE_SLOT_DIAGNOSTIC_KEYS.activeSlot);
  activeSlot.status = normalizeActiveSaveSlotDiagnosticStatus(activeSlot.raw);
  activeSlot.hint = text.activeSlotHint || "";

  const uiState = readEditorStorageJson(SAVE_SLOT_DIAGNOSTIC_KEYS.uiState, { expectObject: true });
  const writeMode = {
    status: "blocked",
    hint: text.writeModeHint || "",
  };

  return {
    activeSave,
    slotStore,
    activeSlot,
    uiState,
    writeMode,
    slotCounts,
    slots,
  };
}

function createSaveSlotDiagnostic(slotId, index, slotStore) {
  const text = EDITOR_TEXT.saveDiagnostics || {};
  const label = tf("editorPrep.saveDiagnostics.slotLabel", { number: index + 1 }, `Slot ${index + 1}`);
  const base = {
    id: slotId,
    key: slotId,
    label,
    rawLength: 0,
    summary: null,
    saveState: null,
    warnings: [],
  };
  if (slotStore.status !== "ready") {
    return {
      ...base,
      status: "unavailable",
      hint: text.slotStoreUnavailable || "",
    };
  }
  const snapshot = slotStore.value?.[slotId];
  if (!snapshot) {
    return {
      ...base,
      status: "empty",
      hint: text.emptySlotHint || "",
    };
  }
  const rawLength = safeJsonSize(snapshot);
  if (!isPlainObject(snapshot) || !isPlainObject(snapshot.state)) {
    return {
      ...base,
      rawLength,
      status: "invalid",
      hint: text.invalidSlotHint || "",
    };
  }

  const warnings = [];
  if (snapshot.slotId && snapshot.slotId !== slotId) {
    warnings.push(tf("editorPrep.saveDiagnostics.slotIdMismatch", {
      expected: slotId,
      actual: snapshot.slotId,
    }, `${slotId}/${snapshot.slotId}`));
  }
  const summary = {
    ...summarizeSaveStateForDiagnostics(snapshot.state),
    ...summarizeSaveSlotMeta(snapshot),
  };
  return {
    ...base,
    rawLength,
    status: warnings.length ? "warning" : "ready",
    summary,
    saveState: snapshot.state,
    warnings,
    hint: warnings.length ? warnings.join(" · ") : (text.readySlotHint || ""),
  };
}

function renderSaveDiagnosticCard(card) {
  const text = EDITOR_TEXT.saveDiagnostics || {};
  const labels = text.labels || {};
  const summary = card.summary || {};
  const fields = [
    [labels.key || "Key", card.key],
    [labels.status || "Status", saveDiagnosticStatusLabel(card.status)],
    [labels.name || "Name", summary.name],
    [labels.level || "Level", summary.level],
    [labels.gold || "Gold", summary.gold],
    [labels.region || "Region", summary.regionId],
    [labels.inventory || "Inventory", summary.inventoryCount],
    [labels.equipment || "Equipment", summary.equipmentCount],
    [labels.savedAt || "Saved at", summary.savedAt],
    [labels.bytes || "Bytes", saveDiagnosticNumber(card.rawLength)],
  ];
  return `
    <article class="editor-save-diagnostic-card" data-save-slot-id="${escapeAttribute(card.id)}" data-status="${escapeAttribute(card.status)}">
      <div class="editor-save-diagnostic-card-head">
        <strong>${escapeHtml(card.label)}</strong>
        <span>${escapeHtml(saveDiagnosticStatusLabel(card.status))}</span>
      </div>
      <dl>
        ${fields.map(([label, value]) => `
          <div>
            <dt>${escapeHtml(label)}</dt>
            <dd>${escapeHtml(saveDiagnosticValue(value))}</dd>
          </div>
        `).join("")}
      </dl>
      ${card.hint ? `<p>${escapeHtml(card.hint)}</p>` : ""}
    </article>
  `;
}

function summarizeSaveSlotMeta(snapshot) {
  const summary = isPlainObject(snapshot.summary) ? snapshot.summary : {};
  return {
    name: saveDiagnosticValue(summary.name),
    level: saveDiagnosticNumber(summary.level),
    gold: saveDiagnosticNumber(summary.gold),
    regionId: saveDiagnosticValue(summary.regionName || summary.regionId),
    savedAt: saveDiagnosticValue(snapshot.savedAt || summary.savedAt),
  };
}

function summarizeSaveStateForDiagnostics(state) {
  const player = isPlainObject(state?.player) ? state.player : {};
  const profile = isPlainObject(state?.playerProfile) ? state.playerProfile : {};
  const equipment = isPlainObject(state?.equipment) ? state.equipment : {};
  return {
    name: saveDiagnosticValue(profile.name || player.name),
    level: saveDiagnosticNumber(player.level),
    gold: saveDiagnosticNumber(player.gold),
    regionId: saveDiagnosticValue(state?.regionId),
    inventoryCount: Array.isArray(state?.inventory) ? saveDiagnosticNumber(state.inventory.length) : saveDiagnosticEmptyValue(),
    equipmentCount: saveDiagnosticNumber(Object.values(equipment).filter(Boolean).length),
  };
}

function readEditorStorageJson(key, { expectObject = false } = {}) {
  const entry = readEditorStorageText(key);
  if (entry.status !== "ready") return { ...entry, value: null };
  try {
    const parsed = JSON.parse(entry.raw);
    if (expectObject && !isPlainObject(parsed)) {
      return {
        ...entry,
        status: "invalid",
        value: parsed,
      };
    }
    return {
      ...entry,
      value: parsed,
    };
  } catch (error) {
    return {
      ...entry,
      status: "invalid",
      value: null,
      error: error?.message || "",
    };
  }
}

function readEditorStorageText(key) {
  try {
    const raw = window.localStorage.getItem(key);
    return {
      key,
      raw,
      rawLength: raw ? raw.length : 0,
      status: raw ? "ready" : "empty",
      error: "",
    };
  } catch (error) {
    return {
      key,
      raw: "",
      rawLength: 0,
      status: "invalid",
      error: error?.message || "",
    };
  }
}

function normalizeActiveSaveSlotDiagnosticStatus(value) {
  if (!value) return "empty";
  if (value === SAVE_SLOT_DIAGNOSTIC_NO_ACTIVE) return "none";
  return SAVE_SLOT_DIAGNOSTIC_SLOT_IDS.includes(value) ? "ready" : "invalid";
}

function saveDiagnosticStorageHint(entry) {
  const text = EDITOR_TEXT.saveDiagnostics || {};
  if (entry.status === "ready") {
    return tf("editorPrep.saveDiagnostics.storageHint", {
      chars: entry.rawLength.toLocaleString(EDITOR_TEXT.locale),
    }, `${entry.rawLength}`);
  }
  if (entry.status === "empty") return text.emptyStorageHint || "";
  return entry.error || text.invalidStorageHint || "";
}

function saveDiagnosticStatusLabel(status) {
  const labels = EDITOR_TEXT.saveDiagnostics?.statusLabels || {};
  return labels[status] || status;
}

function saveDiagnosticNumber(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return saveDiagnosticEmptyValue();
  return number.toLocaleString(EDITOR_TEXT.locale);
}

function saveDiagnosticValue(value) {
  const text = String(value ?? "").trim();
  return text || saveDiagnosticEmptyValue();
}

function saveDiagnosticEmptyValue() {
  return EDITOR_TEXT.saveDiagnostics?.emptyValue || "-";
}

function safeJsonSize(value) {
  try {
    return JSON.stringify(value).length;
  } catch {
    return 0;
  }
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function localizedMetricCard(key, count) {
  const metric = EDITOR_TEXT.metrics[key] || {};
  return metricCard(
    metric.label || key,
    tf(`editorPrep.metrics.${key}.value`, { count }, String(count)),
    metric.hint || ""
  );
}

function retargetPreviewMetricCard(preview) {
  const metric = EDITOR_TEXT.metrics.themeRetargetPreview || {};
  const manifestPreview = manifest.themeRetargetPreview || {};
  const expectedText = Number(manifestPreview.expectedTextOverrides || 0);
  const expectedAssets = Number(manifestPreview.expectedAssetOverrides || 0);
  const expectedMatches =
    (!expectedText || expectedText === preview.counts.textOverrides) &&
    (!expectedAssets || expectedAssets === preview.counts.assetOverrides);
  const ready = preview.isComplete && expectedMatches;
  return metricCard(
    metric.label || "Theme Preview",
    tf("editorPrep.metrics.themeRetargetPreview.value", {
      textCount: preview.counts.textOverrides,
      assetCount: preview.counts.assetOverrides
    }, `${preview.counts.textOverrides}/${preview.counts.assetOverrides}`),
    ready
      ? (metric.readyHint || "")
      : tf("editorPrep.metrics.themeRetargetPreview.reviewHint", {
          missingText: preview.counts.missingTextTargets,
          missingAssets: preview.counts.missingAssetTargets,
          mismatchedAssets: preview.counts.mismatchedAssetTargets
        }, metric.hint || "")
  );
}

function balanceRegistryMetricCard() {
  const metric = EDITOR_TEXT.metrics.balanceTuningRegistry || {};
  const manifestRegistry = manifest.balanceTuningRegistry || {};
  const groupCount = BALANCE_TUNING_GROUPS.length;
  const fileCount = new Set(BALANCE_TUNING_GROUPS.flatMap((group) => group.files)).size;
  const exportCount = BALANCE_TUNING_GROUPS.reduce((sum, group) => sum + group.exports.length, 0);
  const expectedMatches =
    (!manifestRegistry.expectedGroupCount || manifestRegistry.expectedGroupCount === groupCount) &&
    (!manifestRegistry.expectedFileCount || manifestRegistry.expectedFileCount === fileCount) &&
    (!manifestRegistry.expectedExportCount || manifestRegistry.expectedExportCount === exportCount);
  return metricCard(
    metric.label || "Balance Registry",
    tf("editorPrep.metrics.balanceTuningRegistry.value", {
      groupCount,
      fileCount
    }, `${groupCount}/${fileCount}`),
    expectedMatches
      ? tf("editorPrep.metrics.balanceTuningRegistry.readyHint", {
          exportCount
        }, metric.readyHint || "")
      : tf("editorPrep.metrics.balanceTuningRegistry.reviewHint", {
          exportCount
        }, metric.hint || "")
  );
}

function combatVfxPlacementMetricCard() {
  const metric = EDITOR_TEXT.metrics?.combatVfxPlacementPreview || {};
  const manifestPreview = manifest.combatVfxPlacementPreview || {};
  const totals = COMBAT_VFX_PLACEMENT_PREVIEW.totals || {};
  const playerRows = Number(totals.playerRows || 0);
  const monsterRows = Number(totals.monsterRows || 0);
  const effectTypes = Number(totals.effectTypes || 0);
  const monsterMotionProfiles = Number(totals.monsterMotionProfiles || 0);
  const expectedMatches =
    (!manifestPreview.expectedPlayerRows || manifestPreview.expectedPlayerRows === playerRows) &&
    (!manifestPreview.expectedMonsterRows || manifestPreview.expectedMonsterRows === monsterRows) &&
    (!manifestPreview.expectedEffectTypes || manifestPreview.expectedEffectTypes === effectTypes) &&
    (!manifestPreview.expectedMonsterMotionProfiles || manifestPreview.expectedMonsterMotionProfiles === monsterMotionProfiles);
  return metricCard(
    metric.label || COMBAT_VFX_DETAIL_TEXT.metricLabel,
    tf("editorPrep.metrics.combatVfxPlacementPreview.value", {
      playerRows,
      monsterRows
    }, COMBAT_VFX_DETAIL_TEXT.metricValue),
    expectedMatches
      ? (metric.readyHint || COMBAT_VFX_DETAIL_TEXT.metricHint)
      : tf("editorPrep.metrics.combatVfxPlacementPreview.reviewHint", {
          effectTypes
        }, metric.hint || "")
  );
}

function metricCard(label, value, hint) {
  return `
    <article class="editor-metric-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(hint)}</small>
    </article>
  `;
}

function chip(value) {
  return `<span class="editor-chip">${escapeHtml(String(value))}</span>`;
}

function statusLabel(status = "planned") {
  return EDITOR_TEXT.status[status] || status;
}

function normalizeSearchText(value) {
  return String(value || "").trim().toLowerCase();
}

function normalizeRetargetKind(value) {
  return ["all", "text", "asset"].includes(value) ? value : "all";
}

function normalizeBalanceScope(value) {
  return ["all", "engine-balance", "content-balance"].includes(value) ? value : "all";
}

function normalizeCombatVfxKind(value) {
  return ["all", "player", "monster"].includes(value) ? value : "all";
}

function normalizeBalanceCandidateGroups(value) {
  if (!Array.isArray(value)) return [];
  const groupIds = new Set(BALANCE_TUNING_GROUPS.map((group) => group.id));
  return value
    .filter((groupId) => typeof groupId === "string" && groupIds.has(groupId));
}

function findBalanceTuningCandidate(candidateId) {
  const registryMeta = manifest.balanceTuningRegistry || {};
  const candidates = Array.isArray(registryMeta.tuningCandidates) ? registryMeta.tuningCandidates : [];
  return candidates.find((candidate) => candidate.id === candidateId) || null;
}

function selectedBalanceTuningCandidate() {
  return findBalanceTuningCandidate(balanceDetailFilter.candidateId);
}

function applyBalanceCandidateFilter(candidateId) {
  const candidate = findBalanceTuningCandidate(candidateId);
  if (!candidate) return;
  balanceDetailFilter = {
    scope: "all",
    query: "",
    candidateId: candidate.id || "",
    candidateLabel: candidate.label || candidate.id || "",
    candidateGroups: normalizeBalanceCandidateGroups(candidate.groups)
  };
  persistBalanceDetailFilter();
}

function loadBalanceDetailFilter() {
  try {
    const raw = window.localStorage.getItem(BALANCE_FILTER_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      scope: normalizeBalanceScope(parsed?.scope),
      query: typeof parsed?.query === "string" ? parsed.query : "",
      candidateId: typeof parsed?.candidateId === "string" ? parsed.candidateId : "",
      candidateLabel: typeof parsed?.candidateLabel === "string" ? parsed.candidateLabel : "",
      candidateGroups: normalizeBalanceCandidateGroups(parsed?.candidateGroups)
    };
  } catch {
    return {
      scope: "all",
      query: "",
      candidateId: "",
      candidateLabel: "",
      candidateGroups: []
    };
  }
}

function persistBalanceDetailFilter() {
  try {
    window.localStorage.setItem(BALANCE_FILTER_STORAGE_KEY, JSON.stringify({
      scope: normalizeBalanceScope(balanceDetailFilter.scope),
      query: String(balanceDetailFilter.query || ""),
      candidateId: String(balanceDetailFilter.candidateId || ""),
      candidateLabel: String(balanceDetailFilter.candidateLabel || ""),
      candidateGroups: normalizeBalanceCandidateGroups(balanceDetailFilter.candidateGroups)
    }));
  } catch {
    // Editor convenience state is optional; failed persistence should not block the read-only screen.
  }
}

function resetBalanceDetailFilter() {
  balanceDetailFilter = {
    scope: "all",
    query: "",
    candidateId: "",
    candidateLabel: "",
    candidateGroups: []
  };
  try {
    window.localStorage.removeItem(BALANCE_FILTER_STORAGE_KEY);
  } catch {
    // Editor convenience state is optional; failed reset should not block the read-only screen.
  }
}

function loadContentBulkDetailFilter() {
  try {
    const raw = window.localStorage.getItem(CONTENT_BULK_FILTER_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      state: normalizeContentBulkFilterState(parsed?.state),
      domain: normalizeContentBulkFilterDomain(parsed?.domain),
      query: typeof parsed?.query === "string" ? parsed.query : ""
    };
  } catch {
    return {
      state: "all",
      domain: "all",
      query: ""
    };
  }
}

function persistContentBulkDetailFilter() {
  try {
    window.localStorage.setItem(CONTENT_BULK_FILTER_STORAGE_KEY, JSON.stringify({
      state: normalizeContentBulkFilterState(contentBulkDetailFilter.state),
      domain: normalizeContentBulkFilterDomain(contentBulkDetailFilter.domain),
      query: normalizeContentBulkSearchQuery(contentBulkDetailFilter.query)
    }));
  } catch {
    // Editor convenience state is optional; failed persistence should not block the read-only screen.
  }
}

function loadContentBulkPatchPackageInput() {
  try {
    const raw = window.localStorage.getItem(CONTENT_BULK_PACKAGE_INPUT_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      draftText: typeof parsed?.draftText === "string" ? parsed.draftText : "",
      appliedText: typeof parsed?.appliedText === "string" ? parsed.appliedText : "",
      sourceName: typeof parsed?.sourceName === "string" ? parsed.sourceName : "",
      parseError: typeof parsed?.parseError === "string" ? parsed.parseError : ""
    };
  } catch {
    return {
      draftText: "",
      appliedText: "",
      sourceName: "",
      parseError: ""
    };
  }
}

function persistContentBulkPatchPackageInput() {
  try {
    window.localStorage.setItem(CONTENT_BULK_PACKAGE_INPUT_STORAGE_KEY, JSON.stringify({
      draftText: String(contentBulkPatchPackageInput.draftText || ""),
      appliedText: String(contentBulkPatchPackageInput.appliedText || ""),
      sourceName: String(contentBulkPatchPackageInput.sourceName || ""),
      parseError: String(contentBulkPatchPackageInput.parseError || "")
    }));
  } catch {
    // Editor convenience state is optional; failed persistence should not block the read-only screen.
  }
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
  contentBulkPatchPackageInput = {
    draftText: "",
    appliedText: "",
    sourceName: "",
    parseError: ""
  };
  contentBulkPatchPackageParseError = "";
  try {
    window.localStorage.removeItem(CONTENT_BULK_PACKAGE_INPUT_STORAGE_KEY);
  } catch {
    // Editor convenience state is optional; failed reset should not block the read-only screen.
  }
}

function refreshContentBulkPatchPackageAdapterPreview() {
  contentBulkPatchPackageAdapterPreview = createContentBulkPatchPackageAdapterPreviewFromInput();
  contentBulkPatchFilePatchDraftExport = createContentBulkPatchFilePatchDraftExportFromInput();
  contentBulkPatchApplyGatePlan = createContentBulkPatchApplyGatePlan(contentBulkPatchFilePatchDraftExport);
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

function loadCombatVfxDetailFilter() {
  try {
    const raw = window.localStorage.getItem(COMBAT_VFX_FILTER_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      kind: normalizeCombatVfxKind(parsed?.kind),
      query: typeof parsed?.query === "string" ? parsed.query : ""
    };
  } catch {
    return {
      kind: "all",
      query: ""
    };
  }
}

function persistCombatVfxDetailFilter() {
  try {
    window.localStorage.setItem(COMBAT_VFX_FILTER_STORAGE_KEY, JSON.stringify({
      kind: normalizeCombatVfxKind(combatVfxDetailFilter.kind),
      query: String(combatVfxDetailFilter.query || "")
    }));
  } catch {
    // Editor convenience state is optional; failed persistence should not block the read-only screen.
  }
}

function resetCombatVfxDetailFilter() {
  combatVfxDetailFilter = {
    kind: "all",
    query: ""
  };
  try {
    window.localStorage.removeItem(COMBAT_VFX_FILTER_STORAGE_KEY);
  } catch {
    // Editor convenience state is optional; failed reset should not block the read-only screen.
  }
}

function loadRetargetDetailFilter() {
  try {
    const raw = window.localStorage.getItem(RETARGET_FILTER_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      filter: {
        kind: normalizeRetargetKind(parsed?.kind),
        query: typeof parsed?.query === "string" ? parsed.query : ""
      },
      expandedRows: Array.isArray(parsed?.expandedRows) ? parsed.expandedRows.filter((rowId) => typeof rowId === "string") : []
    };
  } catch {
    return {
      filter: {
        kind: "all",
        query: ""
      },
      expandedRows: []
    };
  }
}

function persistRetargetDetailFilter() {
  try {
    window.localStorage.setItem(RETARGET_FILTER_STORAGE_KEY, JSON.stringify({
      kind: normalizeRetargetKind(retargetDetailFilter.kind),
      query: String(retargetDetailFilter.query || ""),
      expandedRows: [...expandedRetargetRows].slice(0, 160)
    }));
  } catch {
    // Editor convenience state is optional; failed persistence should not block the read-only screen.
  }
}

function resetRetargetDetailFilter() {
  retargetDetailFilter = {
    kind: "all",
    query: ""
  };
  expandedRetargetRows.clear();
  try {
    window.localStorage.removeItem(RETARGET_FILTER_STORAGE_KEY);
  } catch {
    // Editor convenience state is optional; failed reset should not block the read-only screen.
  }
}

function downloadJson(fileName, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

function renderError(error) {
  setText(elements.summaryTitle, EDITOR_TEXT.errorTitle);
  setText(elements.summaryCopy, error?.message || EDITOR_TEXT.unknownError);
  if (elements.metrics) elements.metrics.innerHTML = "";
}

function setText(element, value) {
  if (element) element.textContent = value;
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
