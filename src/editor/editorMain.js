import { applyDomLocalization } from "../localization/domText.js?v=501";
import { getLocaleText, t, tf } from "../localization/index.js?v=501";
import { createMurimRetargetPreview } from "../ui/renderRetargetPreview.js?v=501";
import { BALANCE_TUNING_DOMAIN_SUMMARIES, BALANCE_TUNING_GROUPS } from "../balance/balanceTuningRegistry.js?v=501";
import { createBalanceTuningPreviewRows } from "./balanceTuningPreview.js?v=501";
import { createContentBulkPatchAutomationPlan } from "./contentBulkPatchAutomationPlan.js?v=501";
import { createContentBulkPatchApplyGatePlan } from "./contentBulkPatchApplyGatePlan.js?v=501";
import { createContentBulkPatchBackupPlan } from "./contentBulkPatchBackupPlan.js?v=501";
import { createContentBulkPatchRestoreRehearsal } from "./contentBulkPatchRestoreRehearsal.js?v=501";
import { createContentBulkPatchDryRunPreview } from "./contentBulkPatchDryRunImporter.js?v=501";
import { createContentBulkPatchIntakeContract } from "./contentBulkPatchIntakeContract.js?v=501";
import {
  createContentBulkPatchPackageAdapterPreview,
  createContentBulkPatchPackageAdapterTemplate,
} from "./contentBulkPatchPackageAdapter.js?v=501";
import {
  CONTENT_BULK_ROW_TARGET_SCOPES,
  createContentBulkPackageOverview,
  createContentBulkRowTargetId,
} from "./contentBulkPackageOverview.js?v=501";
import { createLootSkillBulkIntakePreview } from "./lootSkillBulkIntakePreview.js?v=501";
import { createContentBulkPatchDiffExport } from "./contentBulkPatchDiffExport.js?v=501";
import { createContentBulkPatchFilePatchDraft } from "./contentBulkPatchFilePatchDraft.js?v=501";
import { createContentBulkPatchFilePatchDraftExport } from "./contentBulkPatchFilePatchDraftExport.js?v=501";
import { createContentBulkPatchManualApplyChecklist } from "./contentBulkPatchManualApplyChecklist.js?v=501";
import { createContentBulkPatchStagedImportPreview } from "./contentBulkPatchStagedImportPreview.js?v=501";
import { createTutorialIslandPacingSnapshot } from "./tutorialIslandPacingPreview.js?v=501";
import { createCombatVfxPlacementPreview } from "./combatVfxPlacementPreview.js?v=501";
import {
  createRuntimeVfxBulkIntakePreview,
  createRuntimeVfxBulkIntakeTemplate,
} from "./runtimeVfxBulkIntakePreview.js?v=501";
import { createMonsterCandidateRewardPreview } from "./monsterCandidateRewardPreview.js?v=501";
import { createMonsterCandidatePromotionChecklist } from "./monsterCandidatePromotionChecklist.js?v=501";
import { createMonsterCandidateLivePromotionPlan } from "./monsterCandidateLivePromotionPlan.js?v=501";
import { createMonsterCandidateLivePatchDraft } from "./monsterCandidateLivePatchDraft.js?v=501";
import { createMonsterCandidateBulkPatchAutomationPreview } from "./monsterCandidateBulkPatchAutomation.js?v=501";
import {
  createMonsterSpriteReadyConnectionPatchPlan,
  createMonsterSpriteReadyConnectionReview,
  createMonsterSpriteSlotReport,
} from "./monsterSpriteSlotReport.js?v=501";
import { createMonsterRuntimeIntegrationPreview } from "./monsterRuntimeIntegrationPreview.js?v=501";
import { createMonsterRuntimeBulkIntakePreview } from "./monsterRuntimeBulkIntakePreview.js?v=501";

const EDITOR_VERSION = "501";
const MANIFEST_URL = `data/editor-manifest.json?v=${EDITOR_VERSION}`;
const BACKLOG_URL = `data/editor-backlog.json?v=${EDITOR_VERSION}`;
const EDITOR_TEXT = getLocaleText().editorPrep;
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
  `;
}

function renderMonsterRuntimeIntegrationPreview() {
  const preview = MONSTER_RUNTIME_INTEGRATION_PREVIEW;
  const summary = preview.summary || {};
  const detailText = EDITOR_TEXT.monsterRuntimeIntegrationPreview || {};
  return `
    <section class="editor-monster-runtime-preview" aria-label="${escapeAttribute(detailText.title || "Monster runtime integration")}">
      <div class="editor-monster-runtime-head">
        <div>
          <h3>${escapeHtml(detailText.title || "Monster runtime integration")}</h3>
          <p class="muted">${escapeHtml(detailText.description || "")}</p>
        </div>
        <span>${escapeHtml(preview.sourcePack || "")}</span>
      </div>
      <div class="editor-monster-sprite-summary">
        ${combatVfxSummaryCard(detailText.presetMetric || "Runtime presets", String(summary.runtimePresets || 0))}
        ${combatVfxSummaryCard(detailText.mappedMetric || "Mapped monsters", String(summary.mappedMonsters || 0))}
        ${combatVfxSummaryCard(detailText.actionMetric || "Action patterns", String(summary.actionPatterns || 0))}
        ${combatVfxSummaryCard(detailText.waitingFileMetric || "Waiting files", String(summary.waitingSpriteFiles || 0))}
      </div>
      <div class="editor-monster-runtime-list">
        ${(preview.rows || []).map((row) => renderMonsterRuntimeIntegrationRow(row, detailText)).join("")}
      </div>
    </section>
  `;
}

function renderMonsterRuntimeIntegrationRow(row, detailText = {}) {
  const noMissingLabel = detailText.noMissingFiles || "Transparent sprite files connectable";
  return `
    <article class="editor-monster-runtime-row" data-status="${escapeAttribute(row.mappingStatus)}" data-sprite-status="${escapeAttribute(row.spriteStatus)}">
      <div>
        <strong>${escapeHtml(row.liveMonsterName)}</strong>
        <span>${escapeHtml(row.externalMonsterId)} -> ${escapeHtml(row.liveMonsterId)}</span>
      </div>
      <div class="editor-monster-runtime-grid">
        ${combatVfxFieldBlock(detailText.cardMetric || "Battle card", [row.cardSlot, row.runtimeClass, row.pivot])}
        ${combatVfxFieldBlock(detailText.scaleMetric || "Scale", [
          `${detailText.packScaleLabel || "Pack"} ${row.sourceInitialScale}`,
          `${detailText.currentScaleLabel || "Current"} ${row.currentRuntimeScale}`,
        ])}
        ${combatVfxFieldBlock(detailText.motionMetric || "Motion", (row.motions || []).map((motion) => `${motion.phase}: ${motion.externalMotionId} -> ${motion.runtimeMotionId}`))}
        ${combatVfxFieldBlock(detailText.actionListMetric || "Actions", (row.actions || []).map((action) => {
          const label = action.nameKey ? t(action.nameKey, action.id) : action.id;
          const optionalLabel = action.optional ? ` ${detailText.optionalTag || "optional"}` : "";
          return `${label} · ${action.effectType}${optionalLabel}`;
        }))}
        ${combatVfxFieldBlock(detailText.waitingFileListMetric || "Waiting files", row.missingSpriteFiles?.length ? row.missingSpriteFiles : [noMissingLabel])}
      </div>
    </article>
  `;
}

function renderMonsterSpriteSlotReport() {
  const detailText = {
    ...MONSTER_SPRITE_REPORT_TEXT,
    ...(EDITOR_TEXT.monsterSpriteSlotReport || {})
  };
  const report = MONSTER_SPRITE_SLOT_REPORT;
  const totals = report.totals || {};
  const statusLabels = {
    ...MONSTER_SPRITE_REPORT_TEXT.statusLabels,
    ...(detailText.statusLabels || {})
  };
  const fileStatusLabels = {
    ...MONSTER_SPRITE_REPORT_TEXT.fileStatusLabels,
    ...(detailText.fileStatusLabels || {})
  };
  const readiness = manifest?.monsterSpriteSlotReadiness || {};

  return `
    <section class="editor-monster-sprite-report" aria-label="${escapeAttribute(detailText.title)}">
      <div class="editor-monster-sprite-head">
        <div>
          <h3>${escapeHtml(detailText.title)}</h3>
          <p class="muted">${escapeHtml(detailText.description)}</p>
        </div>
        <span>${escapeHtml(`${totals.monsters || 0} monsters / ${totals.poses || 0} poses`)}</span>
      </div>
      <div class="editor-monster-sprite-summary">
        ${combatVfxSummaryCard(detailText.slotMetric, String(totals.slots || 0))}
        ${combatVfxSummaryCard(detailText.assignedMetric, String(totals.assignedSlots || 0))}
        ${combatVfxSummaryCard(detailText.connectableMetric, String(totals.connectableSlots || 0))}
        ${combatVfxSummaryCard(detailText.missingMetric, String(totals.missingSlots || 0))}
        ${combatVfxSummaryCard(detailText.fileScanMetric, String(totals.fileReadySlots || 0))}
        ${combatVfxSummaryCard(detailText.fallbackMetric, String(totals.cssPlaceholderSlots || 0))}
        ${combatVfxSummaryCard(detailText.brokenMetric, String(totals.brokenSlots || 0))}
      </div>
      ${renderMonsterSpriteConnectionPlan(readiness, detailText)}
      ${renderMonsterSpriteFallbackSummary(report, detailText)}
      <div class="editor-monster-sprite-list">
        ${(report.byMonster || []).map((group) => renderMonsterSpriteSlotGroup(group, detailText, statusLabels, fileStatusLabels)).join("")}
      </div>
    </section>
  `;
}

function renderMonsterSpriteConnectionPlan(readiness = {}, detailText = {}) {
  const plan = MONSTER_SPRITE_READY_CONNECTION_PLAN;
  const review = MONSTER_SPRITE_READY_CONNECTION_REVIEW;
  const readySlotPatches = numberOrFallback(readiness.readyAssetSlotPatchEntries, plan.assetSlotPatches.length);
  const readyManifestEntries = numberOrFallback(readiness.readyAssetManifestPatchEntries, plan.assetManifestEntries.length);
  const readyFiles = numberOrFallback(readiness.fileReadySlots, plan.summary?.fileReadySlots || 0);
  const missingFiles = numberOrFallback(readiness.fileMissingSlots, plan.summary?.fileMissingSlots || 0);
  const applyMode = readiness.readyConnectionApplyMode || plan.applyMode || "file-ready-only";
  const status = readiness.readyConnectionReviewStatus || review.status || "waiting-for-monster-files";
  const statusLabel = detailText.statusLabels?.[status] || status;
  const nextStepKey = review.nextStep || "add-monster-files";
  const nextStepLabel = detailText.nextStepLabels?.[nextStepKey] || nextStepKey;

  return `
    <div class="editor-monster-sprite-plan" data-ready-patches="${escapeAttribute(String(readySlotPatches))}" data-review-status="${escapeAttribute(status)}">
      <div class="editor-monster-sprite-plan-copy">
        <strong>${escapeHtml(detailText.connectionPlanTitle || "Ready Connection Plan")}</strong>
        <span>${escapeHtml(detailText.connectionPlanDescription || "")}</span>
      </div>
      <div class="editor-monster-sprite-plan-state">
        <span>${escapeHtml(detailText.reviewStatusMetric || "Review status")}</span>
        <strong>${escapeHtml(statusLabel)}</strong>
      </div>
      <p class="editor-monster-sprite-plan-next">${escapeHtml(nextStepLabel)}</p>
      <div class="editor-monster-sprite-plan-grid">
        ${combatVfxSummaryCard(detailText.readyPatchMetric || "Ready patches", String(readySlotPatches))}
        ${combatVfxSummaryCard(detailText.readyManifestMetric || "Manifest entries", String(readyManifestEntries))}
        ${combatVfxSummaryCard(detailText.readyFileMetric || "Ready files", String(readyFiles))}
        ${combatVfxSummaryCard(detailText.missingFileMetric || "Missing files", String(missingFiles))}
        ${combatVfxSummaryCard(detailText.applyModeMetric || "Apply mode", applyMode)}
      </div>
      ${renderMonsterSpriteReviewChecks(review, detailText)}
      ${renderMonsterSpriteApplyPreview(readiness, detailText)}
      ${renderMonsterSpriteMissingFileHandoff(readiness, detailText)}
    </div>
  `;
}

function numberOrFallback(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function renderMonsterSpriteReviewChecks(review = {}, detailText = {}) {
  const checks = Array.isArray(review.checks) ? review.checks : [];
  if (!checks.length) return "";
  const passedLabel = detailText.reviewCheckPassed || "OK";
  const pendingLabel = detailText.reviewCheckPending || "Pending";

  return `
    <div class="editor-monster-sprite-review">
      <strong>${escapeHtml(detailText.reviewChecklistTitle || "Review gate")}</strong>
      <div class="editor-monster-sprite-review-list">
        ${checks.map((check) => {
          const label = detailText.reviewCheckLabels?.[check.id] || check.id;
          return `
            <span data-passed="${escapeAttribute(check.passed ? "true" : "false")}">
              ${escapeHtml(label)}
              <b>${escapeHtml(check.passed ? passedLabel : pendingLabel)}</b>
            </span>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function renderMonsterSpriteMissingFileHandoff(readiness = {}, detailText = {}) {
  if (!readiness.missingFileHandoffArtifact) return "";
  return `
    <div class="editor-monster-sprite-handoff">
      <div class="editor-monster-sprite-handoff-copy">
        <strong>${escapeHtml(detailText.handoffTitle || "Missing File Handoff")}</strong>
        <span>${escapeHtml(detailText.handoffDescription || "")}</span>
      </div>
      <div class="editor-monster-sprite-handoff-grid">
        ${combatVfxFieldBlock(detailText.handoffArtifactMetric || "Artifact", [readiness.missingFileHandoffArtifact])}
        ${combatVfxFieldBlock(detailText.handoffScriptMetric || "Script", [readiness.missingFileHandoffExportScript || "-"])}
        ${combatVfxFieldBlock(detailText.handoffMissingMetric || "Missing files", [String(readiness.missingFileHandoffMissingFiles ?? "-")])}
        ${combatVfxFieldBlock(detailText.handoffGroupsMetric || "Monster groups", [String(readiness.missingFileHandoffMonsterGroups ?? "-")])}
      </div>
    </div>
  `;
}

function renderMonsterSpriteApplyPreview(readiness = {}, detailText = {}) {
  if (!readiness.applyPreviewArtifact) return "";
  const status = readiness.applyPreviewStatus || "waiting-for-monster-files";
  const statusLabel = detailText.statusLabels?.[status] || status;
  const manualReviewLabel = readiness.applyPreviewManualReviewRequired
    ? detailText.applyPreviewManualReviewRequired || "Manual review"
    : detailText.applyPreviewManualReviewOptional || "Optional";
  const compareLabel = readiness.applyPreviewComparesMissingFileHandoff
    ? detailText.applyPreviewCompareEnabled || "Compared"
    : detailText.applyPreviewCompareDisabled || "Not compared";

  return `
    <div class="editor-monster-sprite-apply-preview" data-apply-preview-status="${escapeAttribute(status)}">
      <div class="editor-monster-sprite-apply-preview-copy">
        <strong>${escapeHtml(detailText.applyPreviewTitle || "Apply Preview")}</strong>
        <span>${escapeHtml(detailText.applyPreviewDescription || "")}</span>
      </div>
      <div class="editor-monster-sprite-apply-preview-grid">
        ${combatVfxFieldBlock(detailText.applyPreviewArtifactMetric || "Artifact", [readiness.applyPreviewArtifact])}
        ${combatVfxFieldBlock(detailText.applyPreviewScriptMetric || "Script", [readiness.applyPreviewExportScript || "-"])}
        ${combatVfxFieldBlock(detailText.applyPreviewStatusMetric || "Status", [statusLabel])}
        ${combatVfxFieldBlock(detailText.applyPreviewReadyPatchMetric || "Ready patches", [String(readiness.applyPreviewReadyPatchCount ?? "-")])}
        ${combatVfxFieldBlock(detailText.applyPreviewPolicyMetric || "Policy", [manualReviewLabel, compareLabel])}
      </div>
    </div>
  `;
}

function renderMonsterSpriteSlotGroup(group, detailText, statusLabels, fileStatusLabels) {
  return `
    <article class="editor-monster-sprite-group" data-fallback-mode="${escapeAttribute(group.dominantFallbackMode || "")}">
      <div class="editor-monster-sprite-group-head">
        <div>
          <h4>${escapeHtml(group.monsterName || group.monsterId)}</h4>
          <span>${escapeHtml(group.monsterId)}</span>
        </div>
        <strong>${escapeHtml(`${group.assignedSlots}/${group.rows.length}`)}</strong>
      </div>
      ${renderMonsterSpriteFallbackChips(group.fallbackModeSummary, detailText, "editor-monster-sprite-group-modes")}
      <div class="editor-monster-sprite-pose-grid">
        ${group.rows.map((row) => renderMonsterSpriteSlotPose(row, detailText, statusLabels, fileStatusLabels)).join("")}
      </div>
    </article>
  `;
}

function renderMonsterSpriteFallbackSummary(report = {}, detailText = {}) {
  const summary = report.fallbackModeSummary || [];
  if (!summary.length) return "";
  return `
    <div class="editor-monster-sprite-fallback-summary">
      <div>
        <strong>${escapeHtml(detailText.fallbackSummaryTitle || "Fallback summary")}</strong>
        <span>${escapeHtml(detailText.fallbackSummaryDescription || "")}</span>
      </div>
      ${renderMonsterSpriteFallbackChips(summary, detailText, "editor-monster-sprite-fallback-chips")}
    </div>
  `;
}

function renderMonsterSpriteFallbackChips(summary = [], detailText = {}, className = "editor-monster-sprite-fallback-chips") {
  const labels = detailText.fallbackModeLabels || {};
  return `
    <div class="${escapeAttribute(className)}">
      ${summary.map((entry) => `
        <span data-fallback-mode="${escapeAttribute(entry.mode)}" data-count="${escapeAttribute(String(entry.count || 0))}">
          <b>${escapeHtml(labels[entry.mode] || entry.mode)}</b>
          <em>${escapeHtml(String(entry.count || 0))}</em>
        </span>
      `).join("")}
    </div>
  `;
}

function renderMonsterSpriteSlotPose(row, detailText, statusLabels, fileStatusLabels) {
  const status = statusLabels[row.status] || row.status;
  const fileStatus = fileStatusLabels[row.fileStatus] || row.fileStatus;
  const fallbackMode = detailText.fallbackModeLabels?.[row.runtimeFallbackMode] || row.runtimeFallbackMode;
  const assetValue = row.assetId || "-";
  const runtimePath = row.resolvedPath || "-";
  const runtimePreviewPath = row.runtimePreviewPath || "-";
  return `
    <div class="editor-monster-sprite-pose" data-status="${escapeAttribute(row.status)}">
      <div>
        <strong>${escapeHtml(row.pose)}</strong>
        <span>${escapeHtml(status)}</span>
      </div>
      ${combatVfxFieldBlock(detailText.expectedPath, [row.expectedPath])}
      ${combatVfxFieldBlock(detailText.fileStatus, [fileStatus])}
      ${combatVfxFieldBlock(detailText.fallbackMode || "Fallback", [fallbackMode])}
      ${combatVfxFieldBlock(detailText.assignedAsset, [assetValue])}
      ${!row.assetId ? combatVfxFieldBlock(detailText.suggestedAsset, [row.draftAssetId]) : ""}
      ${!row.assetId ? combatVfxFieldBlock(detailText.defaultSlot || "Default slot", [row.defaultSlotKey || "-"]) : ""}
      ${!row.assetId ? combatVfxFieldBlock(detailText.slotPatch, [row.slotPatchPath]) : ""}
      ${row.runtimePreviewPath ? combatVfxFieldBlock(detailText.runtimePreview || "Runtime preview", [runtimePreviewPath]) : ""}
      ${row.resolvedPath ? combatVfxFieldBlock(detailText.runtimePath, [runtimePath]) : ""}
    </div>
  `;
}

function renderCombatVfxPlacementDetail() {
  const detailText = {
    ...COMBAT_VFX_DETAIL_TEXT,
    ...(EDITOR_TEXT.combatVfxPlacementDetail || {})
  };
  const preview = COMBAT_VFX_PLACEMENT_PREVIEW;
  const totals = preview.totals || {};
  const playerRows = preview.playerRows || [];
  const monsterRows = preview.monsterRows || [];
  const monsterMotionProfileRows = preview.monsterMotionProfileRows || [];
  const visiblePlayerRows = playerRows.filter((row) => matchesCombatVfxFilter("player", combatVfxPlayerSearchText(row)));
  const visibleMonsterRows = monsterRows.filter((row) => matchesCombatVfxFilter("monster", combatVfxMonsterSearchText(row)));
  const visibleCount = visiblePlayerRows.length + visibleMonsterRows.length;
  const totalCount = playerRows.length + monsterRows.length;
  const tuningCandidates = preview.tuningCandidates || [];

  return `
    <section class="editor-combat-vfx-detail" aria-label="${escapeAttribute(detailText.title)}">
      <div class="editor-combat-vfx-head">
        <div>
          <h3>${escapeHtml(detailText.title)}</h3>
          <p class="muted">${escapeHtml(detailText.description)}</p>
        </div>
        <span>${escapeHtml(tf("editorPrep.combatVfxPlacementDetail.summary", {
          playerRows: totals.playerRows || playerRows.length,
          monsterRows: totals.monsterRows || monsterRows.length,
          effectTypes: totals.effectTypes || 0
        }, detailText.summary))}</span>
      </div>
      <div class="editor-combat-vfx-summary">
        ${combatVfxSummaryCard(detailText.playerMetric, String(totals.playerRows || playerRows.length))}
        ${combatVfxSummaryCard(detailText.monsterMetric, String(totals.monsterRows || monsterRows.length))}
        ${combatVfxSummaryCard(detailText.profileMetric || "Motion Profiles", String(totals.monsterMotionProfiles || monsterMotionProfileRows.length))}
        ${combatVfxSummaryCard(detailText.profileTuningMetric || "Profile Signals", String(totals.monsterProfileTuningRows || 0))}
        ${combatVfxSummaryCard(detailText.effectMetric, String(totals.effectTypes || 0))}
        ${combatVfxSummaryCard(detailText.tuningMetric, String(totals.tuningCandidates || tuningCandidates.length))}
      </div>
      ${renderCombatVfxTuningSignals(tuningCandidates, detailText)}
      ${renderMonsterMotionProfileSummary(monsterMotionProfileRows, detailText)}
      ${renderCombatVfxFilterControls(detailText, visibleCount, totalCount)}
      <div class="editor-combat-vfx-grid">
        <section>
          <h4>${escapeHtml(detailText.playerTitle)}</h4>
          <div class="editor-combat-vfx-list">
            ${visiblePlayerRows.map((row) => renderPlayerVfxPreviewRow(row, detailText)).join("") || emptyCombatVfxRows(detailText, "player")}
          </div>
        </section>
        <section>
          <h4>${escapeHtml(detailText.monsterTitle)}</h4>
          <div class="editor-combat-vfx-list">
            ${visibleMonsterRows.map((row) => renderMonsterVfxPreviewRow(row, detailText)).join("") || emptyCombatVfxRows(detailText, "monster")}
          </div>
        </section>
      </div>
    </section>
  `;
}

function renderCombatVfxTuningSignals(candidates = [], detailText = {}) {
  const signalLabels = {
    ...COMBAT_VFX_SIGNAL_LABELS,
    ...(detailText.signalLabels || {})
  };
  return `
    <section class="editor-combat-vfx-tuning" aria-label="${escapeAttribute(detailText.tuningTitle || "Tuning Signals")}">
      <div class="editor-combat-vfx-tuning-head">
        <div>
          <h4>${escapeHtml(detailText.tuningTitle || "Tuning Signals")}</h4>
          <p class="muted">${escapeHtml(detailText.tuningDescription || "")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.combatVfxPlacementDetail.candidateCount", {
          count: candidates.length
        }, `${candidates.length}`))}</strong>
      </div>
      <div class="editor-combat-vfx-tuning-list">
        ${candidates.map((candidate) => renderCombatVfxTuningCandidate(candidate, detailText, signalLabels)).join("") || `<p class="editor-combat-vfx-empty"><span>${escapeHtml(detailText.noTuningCandidates || "No tuning signals")}</span></p>`}
      </div>
    </section>
  `;
}

function renderCombatVfxTuningCandidate(candidate = {}, detailText = {}, signalLabels = COMBAT_VFX_SIGNAL_LABELS) {
  const kindLabel = candidate.kind === "monster" ? (detailText.monsterOnly || "Monster") : (detailText.playerOnly || "Player");
  const signalChips = (candidate.signals || []).map((signal) => chip(signalLabels[signal] || signal)).join("");
  return `
    <article class="editor-combat-vfx-tuning-card" data-priority="${escapeAttribute(String(candidate.priority || 3))}">
      <div>
        <strong>${escapeHtml(`${kindLabel} · ${candidate.label || candidate.targetId || ""}`)}</strong>
        <span>${escapeHtml(tf("editorPrep.combatVfxPlacementDetail.candidatePriority", {
          priority: candidate.priority || "-"
        }, `Priority ${candidate.priority || "-"}`))}</span>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.candidateSignals || "Signals")}</span>
        <div class="editor-chip-list">${signalChips}</div>
      </div>
      ${combatVfxFieldBlock(detailText.candidatePlacement || "Placement", [formatCombatVfxPlacement(candidate.placement)])}
    </article>
  `;
}

function renderMonsterMotionProfileSummary(rows = [], detailText = {}) {
  const signalLabels = {
    ...COMBAT_VFX_SIGNAL_LABELS,
    ...(detailText.signalLabels || {})
  };
  return `
    <section class="editor-combat-vfx-profile-summary" aria-label="${escapeAttribute(detailText.profileTitle || "Monster Motion Profile Summary")}">
      <div class="editor-combat-vfx-profile-head">
        <div>
          <h4>${escapeHtml(detailText.profileTitle || "Monster Motion Profile Summary")}</h4>
          <p class="muted">${escapeHtml(detailText.profileDescription || "")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.combatVfxPlacementDetail.profileCount", {
          count: rows.length
        }, `${rows.length}`))}</strong>
      </div>
      <div class="editor-combat-vfx-profile-list">
        ${rows.map((row) => renderMonsterMotionProfileCard(row, detailText, signalLabels)).join("") || `<p class="editor-combat-vfx-empty"><span>${escapeHtml(detailText.empty || "No rows")}</span></p>`}
      </div>
    </section>
  `;
}

function renderMonsterMotionProfileCard(row = {}, detailText = {}, signalLabels = COMBAT_VFX_SIGNAL_LABELS) {
  const effectLabels = {
    ...COMBAT_VFX_EFFECT_LABELS,
    ...(detailText.effectLabels || {})
  };
  const monsterChips = (row.monsterNames || []).map((name) => chip(name)).join("");
  const classChips = (row.classIds || []).map((classId) => chip(classId)).join("");
  const sfxChips = (row.sfxProfiles || []).map((sfxProfile) => chip(sfxProfile)).join("");
  const defaultEffectChips = (row.defaultEffectTypes || []).map((effectType) => chip(effectLabels[effectType] || effectType)).join("");
  const modifierChips = (row.effectModifiers || []).map((effectType) => chip(effectLabels[effectType] || effectType)).join("");
  const signalChips = (row.signals || []).length
    ? row.signals.map((signal) => chip(signalLabels[signal] || signal)).join("")
    : chip(detailText.noProfileSignals || "Stable range");
  const effectRangeChips = Object.entries(row.effectRanges || {})
    .map(([effectType, range]) => chip(`${effectLabels[effectType] || effectType}: ${formatCombatVfxPlacementRange(range)}`))
    .join("");
  return `
    <article class="editor-combat-vfx-profile-card" data-priority="${escapeAttribute(String(row.priority || 0))}">
      <div class="editor-combat-vfx-profile-card-head">
        <div>
          <h4>${escapeHtml(row.motionProfile || row.id || "")}</h4>
          <span>${escapeHtml(tf("editorPrep.combatVfxPlacementDetail.profileMonsterCount", {
            count: row.monsterCount || 0
          }, `${row.monsterCount || 0}`))}</span>
        </div>
        <strong>${escapeHtml(row.id || "")}</strong>
      </div>
      ${combatVfxFieldBlock(detailText.profileBaseRange || "Base range", [formatCombatVfxPlacementRange(row.baseRange)])}
      ${combatVfxFieldBlock(detailText.profileHyperRange || "Hyper range", [formatCombatVfxPlacementRange(row.hyperRange)])}
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.monsterOnly || "Monster")}</span>
        <div class="editor-chip-list">${monsterChips}</div>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.sprite || "Sprite")}</span>
        <div class="editor-chip-list">${classChips}</div>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.sfx || "SFX")}</span>
        <div class="editor-chip-list">${sfxChips}</div>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.profileDefaultEffects || "Default effects")}</span>
        <div class="editor-chip-list">${defaultEffectChips}</div>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.profileModifiers || "Profile modifiers")}</span>
        <div class="editor-chip-list">${modifierChips}</div>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.profileSignals || "Profile signals")}</span>
        <div class="editor-chip-list">${signalChips}</div>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.profileEffects || "Effect ranges")}</span>
        <div class="editor-chip-list">${effectRangeChips}</div>
      </div>
    </article>
  `;
}

function renderCombatVfxFilterControls(detailText = {}, visibleCount = 0, totalCount = 0) {
  const filterSummary = combatVfxFilterSummary(detailText);
  return `
    <div class="editor-combat-vfx-controls">
      <label class="editor-combat-vfx-search">
        <span>${escapeHtml(detailText.searchLabel || "Search")}</span>
        <input type="search" data-combat-vfx-search value="${escapeAttribute(combatVfxDetailFilter.query)}" placeholder="${escapeAttribute(detailText.searchPlaceholder || "")}" />
      </label>
      <div class="editor-combat-vfx-filter-buttons" role="group" aria-label="${escapeAttribute(detailText.kindFilter || "Kind Filter")}">
        ${combatVfxKindButton("all", detailText.all || "All")}
        ${combatVfxKindButton("player", detailText.playerOnly || "Player")}
        ${combatVfxKindButton("monster", detailText.monsterOnly || "Monster")}
      </div>
      <button class="editor-combat-vfx-reset" type="button" data-combat-vfx-reset>
        ${escapeHtml(detailText.reset || "Reset")}
      </button>
      <span class="editor-combat-vfx-count">
        <strong>${escapeHtml(tf("editorPrep.combatVfxPlacementDetail.visibleCount", {
          visible: visibleCount,
          total: totalCount
        }, `${visibleCount}/${totalCount}`))}</strong>
        ${filterSummary ? `<small>${escapeHtml(filterSummary)}</small>` : ""}
      </span>
    </div>
  `;
}

function combatVfxKindButton(kind, label) {
  const active = normalizeCombatVfxKind(combatVfxDetailFilter.kind) === kind;
  return `
    <button class="editor-combat-vfx-filter${active ? " is-active" : ""}" type="button" data-combat-vfx-kind="${escapeAttribute(kind)}" aria-pressed="${active ? "true" : "false"}">
      ${escapeHtml(label)}
    </button>
  `;
}

function combatVfxFilterSummary(detailText = {}) {
  const kind = normalizeCombatVfxKind(combatVfxDetailFilter.kind);
  const query = String(combatVfxDetailFilter.query || "").trim();
  const filterLabel = kind === "player"
    ? (detailText.playerOnly || "Player")
    : kind === "monster"
      ? (detailText.monsterOnly || "Monster")
      : "";

  if (kind !== "all" && query) {
    return tf("editorPrep.combatVfxPlacementDetail.activeFilterAndSearch", {
      filter: filterLabel,
      query
    }, `${filterLabel} / ${query}`);
  }
  if (kind !== "all") {
    return tf("editorPrep.combatVfxPlacementDetail.activeFilter", {
      filter: filterLabel
    }, filterLabel);
  }
  if (query) {
    return tf("editorPrep.combatVfxPlacementDetail.activeSearch", {
      query
    }, query);
  }
  return "";
}

function combatVfxSummaryCard(label, value) {
  return `
    <span>
      <small>${escapeHtml(label)}</small>
      <b>${escapeHtml(value)}</b>
    </span>
  `;
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

function emptyCombatVfxRows(detailText = {}, sectionKind = "player") {
  const kind = normalizeCombatVfxKind(combatVfxDetailFilter.kind);
  const query = String(combatVfxDetailFilter.query || "").trim();
  const sectionLabel = sectionKind === "monster" ? (detailText.monsterOnly || "Monster") : (detailText.playerOnly || "Player");
  const filterLabel = kind === "monster" ? (detailText.monsterOnly || "Monster") : (detailText.playerOnly || "Player");
  let message = detailText.empty || "No rows";
  let showResetHint = false;
  if (kind !== "all" && kind !== sectionKind) {
    message = tf("editorPrep.combatVfxPlacementDetail.emptyByType", {
      filter: filterLabel,
      section: sectionLabel
    }, message);
    showResetHint = true;
  } else if (query) {
    message = tf("editorPrep.combatVfxPlacementDetail.emptyBySearch", {
      query
    }, message);
    showResetHint = true;
  }
  return `
    <p class="editor-combat-vfx-empty">
      <span>${escapeHtml(message)}</span>
      ${showResetHint ? `<small>${escapeHtml(detailText.emptyResetHint || "")}</small>` : ""}
    </p>
  `;
}

function renderPlayerVfxPreviewRow(row, detailText = COMBAT_VFX_DETAIL_TEXT) {
  const classLabels = {
    ...COMBAT_VFX_CLASS_LABELS,
    ...(detailText.classLabels || {})
  };
  const genderLabels = {
    ...COMBAT_VFX_GENDER_LABELS,
    ...(detailText.genderLabels || {})
  };
  const effectLabels = {
    ...COMBAT_VFX_EFFECT_LABELS,
    ...(detailText.effectLabels || {})
  };
  const classLabel = classLabels[row.classId] || row.classId;
  const genderLabel = genderLabels[row.gender] || row.gender;
  const effectChips = Object.entries(row.effects || {})
    .map(([effectType, placement]) => chip(`${effectLabels[effectType] || effectType}: ${formatCombatVfxPlacement(placement)}`))
    .join("");
  return `
    <article class="editor-combat-vfx-row">
      <div class="editor-combat-vfx-row-head">
        <div>
          <h4>${escapeHtml(`${classLabel} / ${genderLabel}`)}</h4>
          <span>${escapeHtml(row.spritePath || "")}</span>
        </div>
        <strong>${escapeHtml(row.id)}</strong>
      </div>
      ${combatVfxFieldBlock(detailText.base, [formatCombatVfxPlacement(row.basePlacement)])}
      ${combatVfxFieldBlock(detailText.hyper, [formatCombatVfxPlacement(row.hyperPlacement)])}
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.effects)}</span>
        <div class="editor-chip-list">${effectChips}</div>
      </div>
    </article>
  `;
}

function renderMonsterVfxPreviewRow(row, detailText = COMBAT_VFX_DETAIL_TEXT) {
  const effectLabels = {
    ...COMBAT_VFX_EFFECT_LABELS,
    ...(detailText.effectLabels || {})
  };
  const effectLabel = effectLabels[row.effectType] || row.effectType || "";
  const effectChips = Object.entries(row.effects || {})
    .map(([effectType, placement]) => chip(`${effectLabels[effectType] || effectType}: ${formatCombatVfxPlacement(placement)}`))
    .join("");
  const modifierChips = (row.effectModifiers || []).map((effectType) => chip(effectLabels[effectType] || effectType)).join("");
  return `
    <article class="editor-combat-vfx-row">
      <div class="editor-combat-vfx-row-head">
        <div>
          <h4>${escapeHtml(row.name || row.id)}</h4>
          <span>${escapeHtml(`${row.classId || ""} / ${effectLabel}`)}</span>
        </div>
        <strong>${escapeHtml(row.id)}</strong>
      </div>
      ${combatVfxFieldBlock(detailText.motion, [row.motionProfile])}
      ${combatVfxFieldBlock(detailText.sfx, [row.sfxProfile])}
      ${combatVfxFieldBlock(detailText.motionBase || "Motion base", [formatCombatVfxPlacement(row.profilePlacement)])}
      ${combatVfxFieldBlock(detailText.base, [formatCombatVfxPlacement(row.basePlacement)])}
      ${combatVfxFieldBlock(detailText.hyper, [formatCombatVfxPlacement(row.hyperPlacement)])}
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.motionModifiers || "Motion modifiers")}</span>
        <div class="editor-chip-list">${modifierChips}</div>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.effects)}</span>
        <div class="editor-chip-list">${effectChips}</div>
      </div>
    </article>
  `;
}

function combatVfxFieldBlock(title, values = []) {
  return `
    <div class="editor-combat-vfx-chip-block">
      <span>${escapeHtml(title)}</span>
      <div class="editor-chip-list">${values.filter(Boolean).map((value) => chip(value)).join("")}</div>
    </div>
  `;
}

function formatCombatVfxPlacement(placement = {}) {
  return `x ${Number(placement.offsetX || 0)} / y ${Number(placement.offsetY || 0)} / txt ${Number(placement.textOffsetY || 0)} / slash ${Number(placement.slashWidth || 0)}/${Number(placement.expandedSlashWidth || 0)}`;
}

function formatCombatVfxPlacementRange(range = {}) {
  const rangeValue = (entry = {}) => {
    const min = Number(entry.min || 0);
    const max = Number(entry.max || 0);
    return min === max ? String(min) : `${min}..${max}`;
  };
  return `x ${rangeValue(range.offsetX)} / y ${rangeValue(range.offsetY)} / txt ${rangeValue(range.textOffsetY)} / slash ${rangeValue(range.slashWidth)}/${rangeValue(range.expandedSlashWidth)}`;
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
  const rows = visibleGroups.map((group) => renderBalanceGroupRow(group, detailText)).join("");
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

  return `
    <section class="editor-balance-detail" aria-label="${escapeAttribute(detailText.title || "Balance Tuning Detail")}">
      <div class="editor-balance-head">
        <div>
          <h3>${escapeHtml(detailText.title || "")}</h3>
          <p class="muted">${escapeHtml(detailText.description || "")}</p>
        </div>
        <span>${escapeHtml(tf("editorPrep.balanceTuningDetail.summary", {
          groupCount: BALANCE_TUNING_GROUPS.length,
          fileCount,
          exportCount
        }, ""))}</span>
      </div>
      ${renderBalanceFilterControls(detailText, visibleGroups.length, BALANCE_TUNING_GROUPS.length)}
      ${renderActiveBalanceCandidateSummary(detailText, relatedChecks, tuningCandidates)}
      ${renderBalanceDomainSummaries(BALANCE_TUNING_DOMAIN_SUMMARIES, detailText, relatedChecks)}
      ${renderBalancePacingSnapshot(pacingSnapshot, detailText)}
      ${renderMonsterCandidateRewardPreview(MONSTER_CANDIDATE_REWARD_PREVIEW, detailText)}
      ${renderMonsterCandidatePromotionChecklist(MONSTER_CANDIDATE_PROMOTION_CHECKLIST, detailText)}
      ${renderMonsterCandidateLivePromotionPlan(MONSTER_CANDIDATE_LIVE_PROMOTION_PLAN, detailText)}
      ${renderMonsterCandidateLivePatchDraft(MONSTER_CANDIDATE_LIVE_PATCH_DRAFT, detailText)}
      ${renderMonsterCandidateBulkPatchAutomation(MONSTER_CANDIDATE_BULK_PATCH_AUTOMATION, detailText)}
      ${renderContentBulkPatchAutomationPlan(CONTENT_BULK_PATCH_AUTOMATION_PLAN, detailText)}
      ${renderContentBulkPatchIntakeContract(CONTENT_BULK_PATCH_INTAKE_CONTRACT, detailText)}
      ${renderContentBulkPackageOverview(contentBulkPackageOverview, detailText, contentBulkFilterCounts)}
      ${renderContentBulkPatchPackageAdapterPreview(contentBulkPatchPackageAdapterPreview, detailText)}
      ${renderLootSkillBulkIntakePreview(lootSkillBulkIntakePreview, detailText)}
      ${renderMonsterRuntimeBulkIntakePreview(MONSTER_RUNTIME_BULK_INTAKE_PREVIEW, detailText)}
      ${renderRuntimeVfxBulkIntakePreview(runtimeVfxBulkIntakePreview, detailText)}
      ${renderContentBulkMassApplyReadiness({
        dryRun: CONTENT_BULK_PATCH_DRY_RUN_PREVIEW,
        stagedImport: CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW,
        applyGate: contentBulkPatchApplyGatePlan,
        backupPlan: contentBulkPatchBackupPlan,
        restoreRehearsal: contentBulkPatchRestoreRehearsal,
      }, detailText)}
      ${renderContentBulkPatchDryRunPreview(CONTENT_BULK_PATCH_DRY_RUN_PREVIEW, detailText)}
      ${renderContentBulkPatchStagedImportPreview(CONTENT_BULK_PATCH_STAGED_IMPORT_PREVIEW, detailText)}
      ${renderContentBulkPatchDiffExport(CONTENT_BULK_PATCH_DIFF_EXPORT, detailText)}
      ${renderContentBulkPatchManualApplyChecklist(CONTENT_BULK_PATCH_MANUAL_APPLY_CHECKLIST, detailText)}
      ${renderContentBulkPatchFilePatchDraft(contentBulkPatchFilePatchDraftExport.draft || CONTENT_BULK_PATCH_FILE_PATCH_DRAFT, detailText)}
      ${renderContentBulkPatchFilePatchDraftExport(contentBulkPatchFilePatchDraftExport, detailText)}
      ${renderContentBulkPatchApplyGatePlan(contentBulkPatchApplyGatePlan, detailText)}
      ${renderContentBulkPatchBackupPlan(contentBulkPatchBackupPlan, detailText)}
      ${renderContentBulkPatchRestoreRehearsal(contentBulkPatchRestoreRehearsal, detailText)}
      ${renderBalanceTuningCandidates(tuningCandidates, detailText, relatedChecks)}
      ${renderBalanceRelatedChecks(relatedChecks, detailText)}
      <div class="editor-balance-list">
        ${rows || emptyBalanceRows(detailText)}
      </div>
    </section>
  `;
}

function renderActiveBalanceCandidateSummary(detailText = {}, relatedChecks = [], candidates = []) {
  const candidate = selectedBalanceTuningCandidate();
  if (!candidate) {
    const overview = balanceCandidateOverviewSummary(candidates, relatedChecks);
    return `
      <section class="editor-balance-active-candidate" data-balance-active-summary data-state="overview" aria-label="${escapeAttribute(detailText.candidatePinnedOverview || "Tuning candidate summary")}">
        <div class="editor-balance-active-candidate-head">
          <div>
            <span>${escapeHtml(detailText.candidatePinnedOverview || "")}</span>
            <h4>${escapeHtml(tf("editorPrep.balanceTuningDetail.candidateOverviewCount", {
              count: overview.candidateCount
            }, `${overview.candidateCount}`))}</h4>
            <p>${escapeHtml(detailText.candidatePinnedOverviewDescription || "")}</p>
          </div>
          <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.candidatePriorityValue", {
            priority: overview.topPriority || "-"
          }, `#${overview.topPriority || "-"}`))}</strong>
        </div>
        <div class="editor-balance-active-candidate-metrics">
          ${balanceActiveCandidateMetric(detailText.candidatePriority || "Priority", tf("editorPrep.balanceTuningDetail.candidateOverviewPriority", {
            priority: overview.topPriority || "-"
          }, `#${overview.topPriority || "-"}`))}
          ${balanceActiveCandidateMetric(detailText.candidateGroups || "Groups", tf("editorPrep.balanceTuningDetail.candidateOverviewGroups", {
            count: overview.groupCount
          }, `${overview.groupCount}`))}
          ${balanceActiveCandidateMetric(detailText.candidateChecks || "Checks", tf("editorPrep.balanceTuningDetail.candidateOverviewChecks", {
            count: overview.checkCount
          }, `${overview.checkCount}`))}
        </div>
        ${balanceDetailChipBlock(detailText.candidateSignals || "Signals", overview.signals)}
      </section>
    `;
  }
  const impact = balanceCandidateImpactSummary(candidate);
  const valueRanges = balanceCandidateValueRangeLabels(candidate, detailText);
  const checkLabels = balanceCandidateCheckLabels(candidate, relatedChecks);
  return `
    <section class="editor-balance-active-candidate" data-balance-active-summary data-state="selected" aria-label="${escapeAttribute(detailText.activeCandidateSummary || "Selected tuning candidate")}">
      <div class="editor-balance-active-candidate-head">
        <div>
          <span>${escapeHtml(detailText.activeCandidateSummary || "")}</span>
          <h4>${escapeHtml(candidate.label || candidate.id || "")}</h4>
          <p>${escapeHtml(candidate.purpose || "")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.candidatePriorityValue", {
          priority: candidate.priority || "-"
        }, `#${candidate.priority || "-"}`))}</strong>
      </div>
      <div class="editor-balance-active-candidate-metrics">
        ${balanceActiveCandidateMetric(detailText.candidateImpact || "Impact", tf("editorPrep.balanceTuningDetail.candidateImpactSummary", {
          groups: impact.groupCount,
          files: impact.fileCount,
          exports: impact.exportCount
        }, `${impact.groupCount} · ${impact.fileCount} · ${impact.exportCount}`))}
        ${balanceActiveCandidateMetric(detailText.candidateValueRanges || "Value Ranges", valueRanges.join(" / "))}
        ${balanceActiveCandidateMetric(detailText.candidateChecks || "Checks", checkLabels.join(" / ") || "-")}
      </div>
      ${balanceDetailChipBlock(detailText.candidateSignals || "Signals", candidate.signals || [])}
      ${balanceDetailChipBlock(detailText.candidateGroups || "Groups", candidate.groups || [])}
    </section>
  `;
}

function balanceCandidateOverviewSummary(candidates = [], relatedChecks = []) {
  const candidateList = Array.isArray(candidates) ? candidates : [];
  const groups = new Set(candidateList.flatMap((candidate) => normalizeBalanceCandidateGroups(candidate.groups)));
  const checkIds = new Set((relatedChecks || []).map((check) => check.id));
  const checks = new Set();
  const signals = new Set();
  const priorities = [];
  for (const candidate of candidateList) {
    if (Number.isFinite(Number(candidate.priority))) priorities.push(Number(candidate.priority));
    for (const checkId of candidate.checks || []) {
      if (!checkIds.size || checkIds.has(checkId)) checks.add(checkId);
    }
    for (const signal of candidate.signals || []) {
      signals.add(signal);
    }
  }
  return {
    candidateCount: candidateList.length,
    groupCount: groups.size,
    checkCount: checks.size,
    signalCount: signals.size,
    topPriority: priorities.length ? Math.min(...priorities) : 0,
    signals: [...signals].slice(0, 6)
  };
}

function balanceActiveCandidateMetric(label, value) {
  return `
    <span>
      <small>${escapeHtml(label)}</small>
      <b>${escapeHtml(value || "-")}</b>
    </span>
  `;
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

function renderBalanceDomainSummaries(domains = [], detailText = {}, relatedChecks = []) {
  if (!domains.length) return "";
  const labels = detailText.domainLabels || {};
  const descriptions = detailText.domainDescriptions || {};
  return `
    <section class="editor-balance-domain-list" aria-label="${escapeAttribute(detailText.domainSummaries || "Balance domains")}">
      <strong>${escapeHtml(detailText.domainSummaries || "")}</strong>
      ${domains.map((domain) => {
        const summary = balanceDomainImpactSummary(domain);
        return `
          <article class="editor-balance-domain">
            <div class="editor-balance-domain-head">
              <div>
                <h4>${escapeHtml(labels[domain.id] || domain.id || "")}</h4>
                <p>${escapeHtml(descriptions[domain.id] || "")}</p>
              </div>
              <span>${escapeHtml(domain.scope || "")}</span>
            </div>
            <div class="editor-balance-domain-impact">
              <span>${escapeHtml(detailText.domainImpact || "Impact")}</span>
              <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.domainImpactSummary", {
                groups: summary.groupCount,
                files: summary.fileCount,
                exports: summary.exportCount
              }, `${summary.groupCount} · ${summary.fileCount} · ${summary.exportCount}`))}</strong>
            </div>
            <div class="editor-balance-domain-impact">
              <span>${escapeHtml(detailText.domainPriority || "Priority")}</span>
              <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.domainPriorityValue", {
                priority: domain.priority || "-"
              }, `#${domain.priority || "-"}`))}</strong>
            </div>
            ${balanceDetailChipBlock(detailText.domainGroups || "Groups", domain.groups || [])}
            ${balanceDetailChipBlock(detailText.domainExports || "Exports", balanceDomainExportNames(domain))}
            ${balanceDetailChipBlock(detailText.domainValueShapes || "Value Shapes", balanceDomainValueShapeLabels(domain, detailText))}
            ${balanceDetailChipBlock(detailText.domainValueRanges || "Value Ranges", balanceDomainValueRangeLabels(domain, detailText))}
            ${balanceDetailChipBlock(detailText.domainChecks || "Checks", balanceDomainCheckLabels(domain, relatedChecks))}
            ${balanceDetailChipBlock(detailText.domainSignals || "Signals", balanceDomainSignalLabels(domain, detailText))}
            ${balanceDetailChipBlock(detailText.domainWatch || "Watch", domain.watch || [])}
          </article>
        `;
      }).join("")}
    </section>
  `;
}

function balanceDomainImpactSummary(domain = {}) {
  return balanceLinkedGroupSummary(domain.groups || []);
}

function balanceDomainExportNames(domain = {}) {
  const groupIds = new Set(domain.groups || []);
  return [...new Set(BALANCE_TUNING_GROUPS
    .filter((group) => groupIds.has(group.id))
    .flatMap((group) => group.exports || []))];
}

function balanceDomainValueShapeLabels(domain = {}, detailText = {}) {
  const groupIds = new Set(domain.groups || []);
  const counts = new Map();
  for (const group of BALANCE_TUNING_GROUPS.filter((entry) => groupIds.has(entry.id))) {
    const preview = BALANCE_TUNING_PREVIEW_BY_ID.get(group.id);
    for (const item of preview?.items || []) {
      const type = item.type || "unknown";
      counts.set(type, (counts.get(type) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort(([leftType], [rightType]) => leftType.localeCompare(rightType))
    .map(([type, count]) => tf("editorPrep.balanceTuningDetail.domainValueShapeItem", {
      type: balanceValueTypeLabel(type, detailText),
      count
    }, `${type} ${count}`));
}

function balanceDomainValueRangeLabels(domain = {}, detailText = {}) {
  return balanceGroupValueRangeLabels(domain.groups || [], detailText);
}

function balanceGroupValueRangeLabels(groupLinks = [], detailText = {}) {
  const groupIds = new Set(groupLinks || []);
  const numericValues = [];
  let objectFieldCount = 0;
  let arrayItemCount = 0;
  for (const group of BALANCE_TUNING_GROUPS.filter((entry) => groupIds.has(entry.id))) {
    const preview = BALANCE_TUNING_PREVIEW_BY_ID.get(group.id);
    for (const item of preview?.items || []) {
      if (item.type === "number") {
        const value = Number(item.value);
        if (Number.isFinite(value)) numericValues.push(value);
      }
      if (item.type === "object") objectFieldCount += Number(item.count || 0);
      if (item.type === "array") arrayItemCount += Number(item.count || 0);
    }
  }
  const labels = [];
  if (numericValues.length) {
    labels.push(tf("editorPrep.balanceTuningDetail.domainValueRangeNumber", {
      min: Math.min(...numericValues),
      max: Math.max(...numericValues)
    }, `${Math.min(...numericValues)}~${Math.max(...numericValues)}`));
  }
  if (objectFieldCount) {
    labels.push(tf("editorPrep.balanceTuningDetail.domainValueRangeObject", { count: objectFieldCount }, `${objectFieldCount} fields`));
  }
  if (arrayItemCount) {
    labels.push(tf("editorPrep.balanceTuningDetail.domainValueRangeArray", { count: arrayItemCount }, `${arrayItemCount} items`));
  }
  return labels.length ? labels : [detailText.domainValueRangeEmpty || "No range"];
}

function balanceDomainCheckLabels(domain = {}, relatedChecks = []) {
  return balanceCheckLabels(domain.checks || [], relatedChecks);
}

function balanceDomainSignalLabels(domain = {}, detailText = {}) {
  const labels = detailText.domainSignalLabels || {};
  return (domain.signals || []).map((signal) => labels[signal] || signal);
}

function balanceValueTypeLabel(type, detailText = {}) {
  return detailText.valueTypeLabels?.[type] || type;
}

function renderBalanceTuningCandidates(candidates = [], detailText = {}, relatedChecks = []) {
  if (!candidates.length) return "";
  return `
    <section class="editor-balance-candidate-list" aria-label="${escapeAttribute(detailText.tuningCandidates || "Tuning candidates")}">
      <strong>${escapeHtml(detailText.tuningCandidates || "")}</strong>
      ${candidates.map((candidate) => `
        <button class="editor-balance-candidate${balanceDetailFilter.candidateId === candidate.id ? " is-active" : ""}" type="button" data-balance-candidate="${escapeAttribute(candidate.id || "")}" aria-pressed="${balanceDetailFilter.candidateId === candidate.id ? "true" : "false"}">
          <div>
            <h4>${escapeHtml(candidate.label || candidate.id || "")}</h4>
            <p>${escapeHtml(candidate.purpose || "")}</p>
          </div>
          ${balanceCandidatePriorityBlock(candidate, detailText)}
          ${balanceCandidateImpactBlock(balanceCandidateImpactSummary(candidate), detailText)}
          ${balanceDetailChipBlock(detailText.candidateSignals || "Signals", candidate.signals || [])}
          ${balanceDetailChipBlock(detailText.candidateValueRanges || "Value Ranges", balanceCandidateValueRangeLabels(candidate, detailText))}
          ${balanceDetailChipBlock(detailText.candidateGroups || "Groups", candidate.groups || [])}
          ${balanceDetailChipBlock(detailText.candidateChecks || "Checks", balanceCandidateCheckLabels(candidate, relatedChecks))}
        </button>
      `).join("")}
    </section>
  `;
}

function balanceCandidatePriorityBlock(candidate = {}, detailText = {}) {
  return `
    <div class="editor-balance-candidate-impact">
      <span>${escapeHtml(detailText.candidatePriority || "Priority")}</span>
      <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.candidatePriorityValue", {
        priority: candidate.priority || "-"
      }, `#${candidate.priority || "-"}`))}</strong>
    </div>
  `;
}

function balanceCandidateCheckLabels(candidate = {}, relatedChecks = []) {
  return balanceCheckLabels(candidate.checks || [], relatedChecks);
}

function balanceCandidateValueRangeLabels(candidate = {}, detailText = {}) {
  return balanceGroupValueRangeLabels(normalizeBalanceCandidateGroups(candidate.groups), detailText);
}

function balanceCheckLabels(checkIds = [], relatedChecks = []) {
  const checkLabels = new Map((relatedChecks || []).map((check) => [check.id, check.label || check.id]));
  return (checkIds || []).map((checkId) => checkLabels.get(checkId) || checkId);
}

function balanceCandidateImpactBlock(summary, detailText = {}) {
  return `
    <div class="editor-balance-candidate-impact">
      <span>${escapeHtml(detailText.candidateImpact || "Impact")}</span>
      <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.candidateImpactSummary", {
        groups: summary.groupCount,
        files: summary.fileCount,
        exports: summary.exportCount
      }, `${summary.groupCount} · ${summary.fileCount} · ${summary.exportCount}`))}</strong>
    </div>
  `;
}

function balanceCandidateImpactSummary(candidate = {}) {
  return balanceLinkedGroupSummary(normalizeBalanceCandidateGroups(candidate.groups));
}

function balanceLinkedGroupSummary(groupLinks = []) {
  const groupIds = new Set(groupLinks);
  const linkedGroups = BALANCE_TUNING_GROUPS.filter((group) => groupIds.has(group.id));
  const files = new Set(linkedGroups.flatMap((group) => group.files || []));
  const exports = new Set(linkedGroups.flatMap((group) => group.exports || []));
  return {
    groupCount: linkedGroups.length,
    fileCount: files.size,
    exportCount: exports.size
  };
}

function renderBalancePacingSnapshot(snapshot, detailText = {}) {
  const metrics = [
    [detailText.pacingKills || "Kills", `${snapshot.totalKills}`],
    [detailText.pacingRequiredKillSeconds || "Required Avg", `${snapshot.requiredAverageKillSeconds}s`],
    [detailText.pacingPowerSlashMinutes || "Power Slash", `${snapshot.noGearPowerSlashMinutes}min`],
    [detailText.pacingGold || "Gold", `${snapshot.totalGold} G`],
  ];
  return `
    <section class="editor-balance-pacing" data-valid="${snapshot.isValid ? "true" : "false"}" aria-label="${escapeAttribute(detailText.pacingTitle || "Tutorial pacing")}">
      <div class="editor-balance-pacing-head">
        <div>
          <h4>${escapeHtml(detailText.pacingTitle || "")}</h4>
          <p class="muted">${escapeHtml(detailText.pacingDescription || "")}</p>
        </div>
        <strong>${escapeHtml(snapshot.isValid ? (detailText.pacingStatusOk || "") : (detailText.pacingStatusReview || ""))}</strong>
      </div>
      <div class="editor-balance-pacing-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${snapshot.isValid ? "" : `<p class="editor-balance-pacing-error">${escapeHtml(snapshot.errors.slice(0, 2).join(" / "))}</p>`}
    </section>
  `;
}

function renderMonsterCandidateRewardPreview(preview, detailText = {}) {
  const text = detailText.monsterCandidateRewards || {};
  const summary = preview.summary || {};
  const metrics = [
    [text.candidates || "Candidates", `${summary.candidateCount || 0}`],
    [text.livePending || "Live/Pending", `${summary.liveCandidateCount || 0}/${summary.pendingCandidateCount || 0}`],
    [text.codex || "Codex", `${summary.codexFragmentCount || 0}`],
    [text.materials || "Materials", `${summary.materialItemCount || 0}`],
    [text.skills || "Skills/Runes", `${summary.skillFragmentCount || 0}/${summary.skillRuneCount || 0}`],
  ];
  const unresolved = Array.isArray(preview.unresolvedItemIds) ? preview.unresolvedItemIds : [];

  return `
    <section class="editor-monster-candidate-rewards" data-valid="${unresolved.length ? "false" : "true"}" aria-label="${escapeAttribute(text.title || "Monster Candidate Reward Preview")}">
      <div class="editor-monster-candidate-rewards-head">
        <div>
          <h4>${escapeHtml(text.title || "Monster Candidate Reward Preview")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only reward links for candidate monsters.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateRewards.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-monster-candidate-reward-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${unresolved.length ? `<p class="editor-monster-candidate-reward-warning">${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateRewards.unresolved", {
        items: unresolved.join(", ")
      }, `Missing items ${unresolved.join(", ")}`))}</p>` : ""}
      <div class="editor-monster-candidate-reward-groups">
        ${(preview.groups || []).map((group) => renderMonsterCandidateRewardGroup(group, text)).join("")}
      </div>
    </section>
  `;
}

function renderMonsterCandidateRewardGroup(group, text = {}) {
  return `
    <article class="editor-monster-candidate-reward-group">
      <div class="editor-monster-candidate-reward-group-head">
        <div>
          <h5>${escapeHtml(group.regionName || group.regionId || "")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateRewards.representative", {
            monster: group.representativeMonsterName || group.representativeMonsterId || "-"
          }, `Representative ${group.representativeMonsterName || group.representativeMonsterId || "-"}`))}</p>
        </div>
        <span>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateRewards.groupSummary", {
          live: group.liveCount || 0,
          pending: group.pendingCount || 0
        }, `${group.liveCount || 0}/${group.pendingCount || 0}`))}</span>
      </div>
      <div class="editor-monster-candidate-reward-row-list">
        ${(group.rows || []).map((row) => renderMonsterCandidateRewardRow(row, text)).join("")}
      </div>
    </article>
  `;
}

function renderMonsterCandidateRewardRow(row, text = {}) {
  const roles = [
    row.isLive ? (text.live || "Live") : (text.pending || "Pending"),
    row.isRepresentative ? (text.representativeRole || "Representative") : "",
    row.isBoss ? (text.boss || "Boss") : "",
  ].filter(Boolean);
  const materialItems = row.materialItems?.length ? row.materialItems : [];
  const skillItems = row.skillItems?.length ? row.skillItems : [];

  return `
    <article class="editor-monster-candidate-reward-row" data-state="${row.isLive ? "live" : "pending"}">
      <div class="editor-monster-candidate-reward-row-head">
        <div>
          <h6>${escapeHtml(row.name || row.id || "")}</h6>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateRewards.rowMeta", {
            level: row.level || 0,
            source: row.sourceMonsterName || row.sourceMonsterId || "-"
          }, `Level ${row.level || 0} / source ${row.sourceMonsterName || row.sourceMonsterId || "-"}`))}</p>
        </div>
        <div class="editor-chip-list">${roles.map((role) => chip(role)).join("")}</div>
      </div>
      <div class="editor-monster-candidate-reward-item-grid">
        ${renderMonsterCandidateRewardItemBlock(text.codex || "Codex", [row.codexFragment].filter(Boolean), text)}
        ${renderMonsterCandidateRewardItemBlock(text.materials || "Materials", materialItems, text)}
        ${renderMonsterCandidateRewardItemBlock(text.skills || "Skills/Runes", skillItems, text)}
      </div>
      <div class="editor-monster-candidate-reward-coverage">
        <span>${escapeHtml(text.dropCoverage || "Live drops")}</span>
        <strong>${escapeHtml(monsterCandidateDropCoverageLabel(row, text))}</strong>
      </div>
    </article>
  `;
}

function renderMonsterCandidateRewardItemBlock(label, items = [], text = {}) {
  const values = items.length
    ? items.map((item) => `${item.typeLabel || item.type || "-"} · ${item.name || item.id || "-"}`)
    : [text.emptyReward || "None"];
  return balanceDetailChipBlock(label, values);
}

function monsterCandidateDropCoverageLabel(row, text = {}) {
  if (!row.isLive) return text.pendingDropCoverage || "Candidate rewards only";
  const materialTotal = row.materialItems?.length || 0;
  const skillTotal = row.skillItems?.length || 0;
  return tf("editorPrep.balanceTuningDetail.monsterCandidateRewards.dropCoverageValue", {
    codex: row.liveDropCoverage?.codex ? (text.connected || "Connected") : (text.candidateOnly || "Candidate"),
    material: `${row.liveDropCoverage?.materialCount || 0}/${materialTotal}`,
    skill: `${row.liveDropCoverage?.skillCount || 0}/${skillTotal}`,
  }, `${row.liveDropCoverage?.codex ? "Connected" : "Candidate"} / ${row.liveDropCoverage?.materialCount || 0}/${materialTotal} / ${row.liveDropCoverage?.skillCount || 0}/${skillTotal}`);
}

function renderMonsterCandidatePromotionChecklist(checklist, detailText = {}) {
  const text = detailText.monsterCandidatePromotion || {};
  const summary = checklist.summary || {};
  const metrics = [
    [text.pending || "Pending", `${summary.pendingCandidateCount || 0}`],
    [text.ready || "Ready", `${summary.readyReviewCount || 0}`],
    [text.actions || "Actions", `${summary.requiredActionCount || 0}`],
    [text.rewardLinks || "Reward links", `${summary.uniqueRewardItemCount || 0}`],
    [text.codexRecord || "Codex record", `${summary.codexRecordTargetCount || 0}`],
    [text.fullRewardLinks || "Full links", `${summary.fullRewardLinkCount || 0}`],
    [text.partialRewardLinks || "Partial links", `${summary.partialRewardLinkCount || 0}`],
    [text.risks || "Signals", `${summary.riskSignalCount || 0}`],
  ];

  return `
    <section class="editor-monster-candidate-promotion" data-readonly="${checklist.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Monster Candidate Promotion Checklist")}">
      <div class="editor-monster-candidate-promotion-head">
        <div>
          <h4>${escapeHtml(text.title || "Monster Candidate Promotion Checklist")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only checklist before moving pending candidates into live drops.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidatePromotion.version", {
          version: checklist.version || "-"
        }, checklist.version || "-"))}</strong>
      </div>
      <div class="editor-monster-candidate-promotion-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${renderMonsterCandidatePromotionActions(checklist.requiredActions || [], text)}
      <div class="editor-monster-candidate-promotion-groups">
        ${(checklist.groups || []).map((group) => renderMonsterCandidatePromotionGroup(group, text)).join("") || `<p class="muted">${escapeHtml(text.empty || "No pending candidates.")}</p>`}
      </div>
    </section>
  `;
}

function renderMonsterCandidatePromotionActions(actions = [], text = {}) {
  if (!actions.length) return "";
  return `
    <div class="editor-monster-candidate-promotion-actions">
      <strong>${escapeHtml(text.actionPlan || "Promotion action plan")}</strong>
      <div>
        ${actions.map((action) => `
          <span>
            <b>${escapeHtml(monsterCandidatePromotionActionLabel(action.id, text))}</b>
            <small>${escapeHtml(action.file || "")}</small>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function renderMonsterCandidatePromotionGroup(group, text = {}) {
  return `
    <article class="editor-monster-candidate-promotion-group">
      <div class="editor-monster-candidate-promotion-group-head">
        <div>
          <h5>${escapeHtml(group.regionName || group.regionId || "")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidatePromotion.representative", {
            monster: group.representativeMonsterName || group.representativeMonsterId || "-"
          }, `Representative ${group.representativeMonsterName || group.representativeMonsterId || "-"}`))}</p>
        </div>
        <span>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidatePromotion.groupSummary", {
          pending: group.pendingCount || 0,
          ready: group.readyReviewCount || 0
        }, `${group.readyReviewCount || 0}/${group.pendingCount || 0}`))}</span>
      </div>
      <div class="editor-monster-candidate-promotion-row-list">
        ${(group.rows || []).map((row) => renderMonsterCandidatePromotionRow(row, text)).join("")}
      </div>
    </article>
  `;
}

function renderMonsterCandidatePromotionRow(row, text = {}) {
  const roles = [
    row.readyForReview ? (text.readyForReview || "Ready for review") : (text.blocked || "Blocked"),
    monsterCandidatePromotionStageLabel(row.promotionStageId, text),
    row.isBoss ? (text.boss || "Boss") : "",
  ].filter(Boolean);
  const actionLabels = (row.requiredActionIds || []).map((actionId) => monsterCandidatePromotionActionLabel(actionId, text));
  const riskLabels = (row.riskSignalIds || []).map((signalId) => monsterCandidatePromotionRiskLabel(signalId, text));

  return `
    <article class="editor-monster-candidate-promotion-row" data-state="${row.readyForReview ? "ready" : "blocked"}" data-stage="${escapeAttribute(row.promotionStageId || "unknown")}">
      <div class="editor-monster-candidate-promotion-row-head">
        <div>
          <h6>${escapeHtml(row.name || row.id || "")}</h6>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidatePromotion.rowMeta", {
            level: row.level || 0,
            source: row.sourceMonsterName || row.sourceMonsterId || "-"
          }, `Level ${row.level || 0} / source ${row.sourceMonsterName || row.sourceMonsterId || "-"}`))}</p>
        </div>
        <div class="editor-chip-list">${roles.map((role) => chip(role)).join("")}</div>
      </div>
      <div class="editor-monster-candidate-promotion-grid">
        ${balanceDetailChipBlock(text.promotionStage || "Promotion stage", [monsterCandidatePromotionStageLabel(row.promotionStageId, text)])}
        ${balanceDetailChipBlock(text.actionPlan || "Actions", actionLabels)}
        ${balanceDetailChipBlock(text.rewardLinks || "Reward links", row.rewardItemIds?.length ? row.rewardItemIds : [text.emptyReward || "None"])}
        ${balanceDetailChipBlock(text.rewardCoverage || "Reward coverage", monsterCandidatePromotionRewardCoverageValues(row, text))}
        ${balanceDetailChipBlock(text.codexRecord || "Codex record", monsterCandidatePromotionCodexRecordValues(row, text))}
        ${balanceDetailChipBlock(text.risks || "Signals", riskLabels.length ? riskLabels : [text.noRisks || "No blocking signals"])}
      </div>
    </article>
  `;
}

function monsterCandidatePromotionActionLabel(actionId, text = {}) {
  return text.actionLabels?.[actionId] || actionId;
}

function monsterCandidatePromotionRiskLabel(signalId, text = {}) {
  return text.riskLabels?.[signalId] || signalId;
}

function monsterCandidatePromotionCodexRecordValues(row, text = {}) {
  if (!row.codexRecord) return [text.codexRecordMissing || "No codex record target"];
  return [
    tf("editorPrep.balanceTuningDetail.monsterCandidatePromotion.codexRecordTarget", {
      item: row.codexRecord.itemName || row.codexRecord.itemId || "-",
      target: row.codexRecord.target || 0
    }, `${row.codexRecord.itemName || row.codexRecord.itemId || "-"} / ${row.codexRecord.target || 0}`),
  ];
}

function monsterCandidatePromotionRewardCoverageValues(row, text = {}) {
  const coverage = row.rewardCoverage || {};
  const labels = text.coverageLabels || {};
  return [
    `${labels.codex || "Codex"}: ${coverage.codex ? (labels.connected || "Connected") : (labels.missing || "Missing")}`,
    `${labels.material || "Material"}: ${coverage.material ? (labels.connected || "Connected") : (labels.missing || "Missing")}`,
    `${labels.skill || "Skill"}: ${coverage.skill ? (labels.connected || "Connected") : (labels.missing || "Missing")}`,
  ];
}

function monsterCandidatePromotionStageLabel(stageId, text = {}) {
  return text.stageLabels?.[stageId] || stageId || "unknown";
}

function renderMonsterCandidateLivePromotionPlan(plan, detailText = {}) {
  const text = detailText.monsterCandidateLivePromotion || {};
  const summary = plan.summary || {};
  const metrics = [
    [text.candidates || "Candidates", `${summary.candidateCount || 0}`],
    [text.phases || "Phases", `${summary.phaseCount || 0}`],
    [text.regions || "Regions", `${summary.regionCount || 0}`],
    [text.deferred || "Deferred", `${summary.deferredCandidateCount || 0}`],
    [text.writes || "Writes", plan.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];

  return `
    <section class="editor-monster-candidate-live-promotion" data-readonly="${plan.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Monster Candidate Live Promotion Plan")}">
      <div class="editor-monster-candidate-live-promotion-head">
        <div>
          <h4>${escapeHtml(text.title || "Monster Candidate Live Promotion Plan")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only live-data promotion phases for complete reward candidates.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateLivePromotion.version", {
          version: plan.version || "-"
        }, plan.version || "-"))}</strong>
      </div>
      <div class="editor-monster-candidate-live-promotion-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-monster-candidate-live-promotion-phases">
        ${(plan.phases || []).map((phase) => renderMonsterCandidateLivePromotionPhase(phase, text)).join("") || `<p class="muted">${escapeHtml(text.noRows || "No promotion-ready candidates.")}</p>`}
      </div>
      ${renderMonsterCandidateLivePromotionDeferred(plan.deferredRows || [], text)}
    </section>
  `;
}

function renderMonsterCandidateLivePromotionPhase(phase, text = {}) {
  return `
    <article class="editor-monster-candidate-live-promotion-phase" data-phase="${escapeAttribute(phase.id || "")}">
      <div class="editor-monster-candidate-live-promotion-phase-head">
        <div>
          <h5>${escapeHtml(monsterCandidateLivePromotionPhaseTitle(phase, text))}</h5>
          <p>${escapeHtml(monsterCandidateLivePromotionPriorityLabel(phase.priority, text))}</p>
        </div>
        <span>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateLivePromotion.phaseCandidateCount", {
          count: phase.candidateCount || 0
        }, `${phase.candidateCount || 0}`))}</span>
      </div>
      <div class="editor-monster-candidate-live-promotion-row-list">
        ${(phase.rows || []).map((row) => renderMonsterCandidateLivePromotionRow(row, text)).join("")}
      </div>
    </article>
  `;
}

function renderMonsterCandidateLivePromotionRow(row, text = {}) {
  const roles = [
    monsterCandidateLivePromotionStateLabel(row.planState, text),
    monsterCandidatePromotionStageLabel(row.promotionStageId, detailTextForPromotion(text)),
    row.regionName || row.regionId || "",
  ].filter(Boolean);
  const actionLabels = (row.nextActionIds || []).map((actionId) => monsterCandidatePromotionActionLabel(actionId, detailTextForPromotion(text)));

  return `
    <article class="editor-monster-candidate-live-promotion-row" data-state="${escapeAttribute(row.planState || "unknown")}">
      <div class="editor-monster-candidate-live-promotion-row-head">
        <div>
          <h6>${escapeHtml(row.name || row.id || "")}</h6>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateLivePromotion.rowMeta", {
            level: row.level || 0,
            source: row.sourceMonsterName || row.sourceMonsterId || "-"
          }, `Level ${row.level || 0} / source ${row.sourceMonsterName || row.sourceMonsterId || "-"}`))}</p>
        </div>
        <div class="editor-chip-list">${roles.map((role) => chip(role)).join("")}</div>
      </div>
      <div class="editor-monster-candidate-live-promotion-grid">
        ${balanceDetailChipBlock(text.rewardLinks || "Reward links", row.rewardItemIds?.length ? row.rewardItemIds : [text.emptyReward || "None"])}
        ${balanceDetailChipBlock(text.targetFiles || "Target files", row.targetFiles || [])}
        ${balanceDetailChipBlock(text.nextActions || "Next actions", actionLabels)}
      </div>
    </article>
  `;
}

function renderMonsterCandidateLivePromotionDeferred(rows = [], text = {}) {
  if (!rows.length) {
    return `<p class="muted">${escapeHtml(text.noDeferred || "No deferred candidates.")}</p>`;
  }
  return `
    <div class="editor-monster-candidate-live-promotion-deferred">
      <div>
        <strong>${escapeHtml(text.deferredTitle || "Deferred candidates")}</strong>
        <p>${escapeHtml(text.deferredDescription || "Candidates with partial reward links stay outside live-data promotion.")}</p>
      </div>
      <div class="editor-monster-candidate-live-promotion-row-list">
        ${rows.map((row) => renderMonsterCandidateLivePromotionDeferredRow(row, text)).join("")}
      </div>
    </div>
  `;
}

function renderMonsterCandidateLivePromotionDeferredRow(row, text = {}) {
  const promotionText = detailTextForPromotion(text);
  const roles = [
    monsterCandidateLivePromotionStateLabel(row.planState, text),
    monsterCandidatePromotionStageLabel(row.promotionStageId, promotionText),
  ].filter(Boolean);
  const missingLabels = (row.missingRewardTypes || []).map((type) => text.rewardTypeLabels?.[type] || type);

  return `
    <article class="editor-monster-candidate-live-promotion-row" data-state="${escapeAttribute(row.planState || "deferred")}">
      <div class="editor-monster-candidate-live-promotion-row-head">
        <div>
          <h6>${escapeHtml(row.name || row.id || "")}</h6>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateLivePromotion.rowMeta", {
            level: row.level || 0,
            source: row.sourceMonsterName || row.sourceMonsterId || "-"
          }, `Level ${row.level || 0} / source ${row.sourceMonsterName || row.sourceMonsterId || "-"}`))}</p>
        </div>
        <div class="editor-chip-list">${roles.map((role) => chip(role)).join("")}</div>
      </div>
      <div class="editor-monster-candidate-live-promotion-grid">
        ${balanceDetailChipBlock(text.rewardLinks || "Reward links", row.rewardItemIds?.length ? row.rewardItemIds : [text.emptyReward || "None"])}
        ${balanceDetailChipBlock(text.deferredMissing || "Missing reward links", missingLabels.length ? missingLabels : [text.noMissing || "None"])}
      </div>
    </article>
  `;
}

function monsterCandidateLivePromotionPhaseTitle(phase, text = {}) {
  return text.phaseLabels?.[phase.id] || tf("editorPrep.balanceTuningDetail.monsterCandidateLivePromotion.phaseLabel", {
    order: phase.order || 0
  }, `Phase ${phase.order || 0}`);
}

function monsterCandidateLivePromotionPriorityLabel(priorityId, text = {}) {
  return text.priorityLabels?.[priorityId] || priorityId || "";
}

function monsterCandidateLivePromotionStateLabel(stateId, text = {}) {
  return text.stateLabels?.[stateId] || stateId || "unknown";
}

function detailTextForPromotion(text = {}) {
  return {
    ...(EDITOR_TEXT.balanceTuningDetail?.monsterCandidatePromotion || {}),
    ...(text.promotionLabels || {}),
  };
}

function renderMonsterCandidateLivePatchDraft(draft, detailText = {}) {
  const text = detailText.monsterCandidateLivePatchDraft || {};
  const summary = draft.summary || {};
  const metrics = [
    [text.drafts || "Drafts", `${summary.draftCount || 0}`],
    [text.phase || "Phase", summary.targetPhaseId || "-"],
    [text.regions || "Regions", `${summary.targetRegionCount || 0}`],
    [text.files || "Files", `${summary.targetFileCount || 0}`],
    [text.writes || "Writes", draft.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];

  return `
    <section class="editor-monster-candidate-live-patch-draft" data-readonly="${draft.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Monster Candidate Live Patch Draft")}">
      <div class="editor-monster-candidate-live-patch-draft-head">
        <div>
          <h4>${escapeHtml(text.title || "Monster Candidate Live Patch Draft")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only patch draft before writing live monster data.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateLivePatchDraft.version", {
          version: draft.version || "-"
        }, draft.version || "-"))}</strong>
      </div>
      <div class="editor-monster-candidate-live-patch-draft-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-monster-candidate-live-patch-draft-list">
        ${(draft.rows || []).map((row) => renderMonsterCandidateLivePatchDraftRow(row, text)).join("") || `<p class="muted">${escapeHtml(text.noRows || "No patch draft rows.")}</p>`}
      </div>
    </section>
  `;
}

function renderMonsterCandidateLivePatchDraftRow(row, text = {}) {
  const entry = row.monsterBalanceEntry || {};
  const worldPatch = row.worldDataPatch || {};
  const roles = [
    monsterCandidatePatchDraftStateLabel(row.planState, text),
    row.regionName || row.regionId || "",
  ].filter(Boolean);
  const statValues = entry.stats
    ? Object.entries(entry.stats).map(([key, value]) => `${key} ${value}`)
    : [];
  const dropValues = (entry.dropTable || []).map((drop) => `${drop.itemId} ${formatPatchDraftChance(drop.chance)}`);
  const worldValues = [
    `${text.worldPatchAction || "Action"}: ${monsterCandidatePatchDraftActionLabel(worldPatch.action, text)}`,
    `${text.representative || "Representative"}: ${worldPatch.keepsRepresentativeMonsterId || "-"}`,
    `${text.proposedPool || "Pool"}: ${(worldPatch.proposedMonsterPool || []).join(" / ") || "-"}`,
  ];
  const blockingSignals = (row.blockingSignalIds || []).map((signalId) => monsterCandidatePatchDraftSignalLabel(signalId, text));

  return `
    <article class="editor-monster-candidate-live-patch-draft-row" data-state="${escapeAttribute(row.planState || "unknown")}">
      <div class="editor-monster-candidate-live-patch-draft-row-head">
        <div>
          <h5>${escapeHtml(row.name || row.id || "")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateLivePatchDraft.rowMeta", {
            source: row.sourceMonsterName || row.sourceMonsterId || "-",
            level: entry.level || 0,
            exp: entry.exp || 0,
            gold: entry.gold || 0
          }, `Level ${entry.level || 0} / exp ${entry.exp || 0} / gold ${entry.gold || 0}`))}</p>
        </div>
        <div class="editor-chip-list">${roles.map((role) => chip(role)).join("")}</div>
      </div>
      <div class="editor-monster-candidate-live-patch-draft-grid">
        ${balanceDetailChipBlock(text.stats || "Stats", statValues)}
        ${balanceDetailChipBlock(text.dropTable || "Drop table", dropValues)}
        ${balanceDetailChipBlock(text.worldPatch || "World patch", worldValues)}
        ${balanceDetailChipBlock(text.targetFiles || "Target files", row.targetFiles || [])}
        ${balanceDetailChipBlock(text.rewardLinks || "Reward links", patchDraftRewardValues(row))}
        ${balanceDetailChipBlock(text.blockingSignals || "Blocking signals", blockingSignals.length ? blockingSignals : [text.noBlockingSignals || "No blocking signals"])}
      </div>
    </article>
  `;
}

function patchDraftRewardValues(row) {
  const link = row.rewardLink || {};
  return [
    link.codexFragmentId,
    ...(link.materialItemIds || []),
    ...(link.skillItemIds || []),
  ].filter(Boolean);
}

function monsterCandidatePatchDraftStateLabel(stateId, text = {}) {
  return text.stateLabels?.[stateId] || stateId || "unknown";
}

function monsterCandidatePatchDraftActionLabel(actionId, text = {}) {
  return text.actionLabels?.[actionId] || actionId || "unknown";
}

function monsterCandidatePatchDraftSignalLabel(signalId, text = {}) {
  return text.signalLabels?.[signalId] || signalId;
}

function formatPatchDraftChance(chance) {
  const value = Number(chance || 0) * 100;
  return `${Number(value.toFixed(1))}%`;
}

function renderMonsterCandidateBulkPatchAutomation(preview, detailText = {}) {
  const text = detailText.monsterCandidateBulkPatchAutomation || {};
  const summary = preview.summary || {};
  const metrics = [
    [text.candidates || "Candidates", `${summary.candidateCount || 0}`],
    [text.liveCovered || "Live covered", `${summary.liveCoveredCount || 0}`],
    [text.surfaces || "Surfaces", `${summary.surfaceCount || 0}`],
    [text.coveredSurfaces || "Covered", `${summary.coveredSurfaceCount || 0}/${summary.generatedSurfaceCount || 0}`],
    [text.needsDraft || "Needs draft", `${summary.needsDraftCount || 0}`],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-monster-candidate-bulk-automation" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Monster Candidate Bulk Patch Automation")}">
      <div class="editor-monster-candidate-bulk-automation-head">
        <div>
          <h4>${escapeHtml(text.title || "Monster Candidate Bulk Patch Automation")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only automation surface for bulk monster live promotion.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateBulkPatchAutomation.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-monster-candidate-bulk-automation-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${balanceDetailChipBlock(text.inputFields || "Input fields", preview.templateInputFields || [])}
      ${balanceDetailChipBlock(text.targetSurfaces || "Target surfaces", (preview.surfaces || []).map((surface) => `${surface.output}: ${surface.file}`))}
      <div class="editor-monster-candidate-bulk-automation-list">
        ${(preview.rows || []).map((row) => renderMonsterCandidateBulkPatchAutomationRow(row, text)).join("") || `<p class="muted">${escapeHtml(text.noRows || "No automation rows.")}</p>`}
      </div>
    </section>
  `;
}

function renderMonsterCandidateBulkPatchAutomationRow(row, text = {}) {
  const surfaceLabels = (row.surfaces || []).map((surface) => `${bulkPatchAutomationSurfaceLabel(surface.id, text)}: ${bulkPatchAutomationStateLabel(surface.state, text)}`);
  const patchValues = [
    `${text.balance || "Balance"}: ${row.monsterBalanceEntry?.id || row.id}`,
    `${text.world || "World"}: ${row.worldDataPatch?.action || "-"}`,
    `${text.spriteSlots || "Sprite slots"}: ${(row.spriteSlotBucketPatch?.poseKeys || []).join(" / ") || "-"}`,
    `${text.runtimePreset || "Runtime preset"}: ${row.battleSpritePresetDraft?.classId || "-"}`,
    `${text.cssSelector || "CSS selector"}: ${row.runtimeCssSelector || "-"}`,
  ];
  return `
    <article class="editor-monster-candidate-bulk-automation-row" data-state="${escapeAttribute(row.coverageState || "unknown")}">
      <div class="editor-monster-candidate-bulk-automation-row-head">
        <div>
          <h5>${escapeHtml(row.name || row.id || "")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateBulkPatchAutomation.rowMeta", {
            region: row.regionId || "-",
            representative: row.representativeMonsterId || "-"
          }, `${row.regionId || "-"} / ${row.representativeMonsterId || "-"}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${chip(bulkPatchAutomationStateLabel(row.coverageState, text))}
          ${row.isLive ? chip(text.live || "Live") : chip(text.pending || "Pending")}
        </div>
      </div>
      <div class="editor-monster-candidate-bulk-automation-grid">
        ${balanceDetailChipBlock(text.inputSummary || "Input summary", [
          `${text.level || "Level"} ${row.input?.level || 0}`,
          ...(row.input?.tags || []),
          row.input?.rewardLink?.codexFragmentId || "",
        ].filter(Boolean))}
        ${balanceDetailChipBlock(text.surfaceStates || "Surface states", surfaceLabels)}
        ${balanceDetailChipBlock(text.generatedPatches || "Generated patches", patchValues)}
      </div>
    </article>
  `;
}

function bulkPatchAutomationSurfaceLabel(surfaceId, text = {}) {
  return text.surfaceLabels?.[surfaceId] || surfaceId || "unknown";
}

function bulkPatchAutomationStateLabel(stateId, text = {}) {
  return text.stateLabels?.[stateId] || stateId || "unknown";
}

function renderContentBulkPatchAutomationPlan(plan, detailText = {}) {
  const text = detailText.contentBulkPatchAutomationPlan || {};
  const summary = plan.summary || {};
  const metrics = [
    [text.domains || "Domains", `${summary.domainCount || 0}`],
    [text.currentRows || "Current rows", `${summary.currentRowCount || 0}`],
    [text.surfaceTemplates || "Surface templates", `${summary.surfaceTemplateCount || 0}`],
    [text.generatedSurfaces || "Generated surfaces", `${summary.generatedSurfaceCount || 0}`],
    [text.contractReady || "Contract ready", `${summary.contractReadyDomainCount || 0}`],
    [text.writes || "Writes", plan.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-automation" data-readonly="${plan.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Automation Plan")}">
      <div class="editor-content-bulk-automation-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Automation Plan")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only content batch expansion contract.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchAutomationPlan.version", {
          version: plan.version || "-"
        }, plan.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-automation-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-automation-list">
        ${(plan.domains || []).map((domain) => renderContentBulkPatchAutomationDomain(domain, text)).join("") || `<p class="muted">${escapeHtml(text.noDomains || "No domains.")}</p>`}
      </div>
    </section>
  `;
}

function renderContentBulkPatchAutomationDomain(domain, text = {}) {
  return `
    <article class="editor-content-bulk-automation-domain" data-state="${escapeAttribute(domain.coverageState || "unknown")}">
      <div class="editor-content-bulk-automation-domain-head">
        <div>
          <h5>${escapeHtml(contentBulkPatchDomainLabel(domain.id, text))}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchAutomationPlan.domainMeta", {
            rows: domain.currentRowCount || 0,
            surfaces: domain.surfaceTemplateCount || 0,
            generated: domain.generatedSurfaceCount || 0
          }, `${domain.currentRowCount || 0} / ${domain.surfaceTemplateCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${chip(contentBulkPatchStateLabel(domain.coverageState, text))}
        </div>
      </div>
      <div class="editor-content-bulk-automation-grid">
        ${balanceDetailChipBlock(text.requiredInputs || "Required inputs", domain.requiredInputFields || [])}
        ${balanceDetailChipBlock(text.batchIdentity || "Batch identity", [domain.batchKey, ...(domain.identityFields || [])].filter(Boolean))}
        ${balanceDetailChipBlock(text.targetSurfaces || "Target surfaces", domain.surfaces || [])}
        ${balanceDetailChipBlock(text.guardChecks || "Guard checks", domain.checkScripts || [])}
      </div>
    </article>
  `;
}

function contentBulkPatchDomainLabel(domainId, text = {}) {
  return text.domainLabels?.[domainId] || domainId || "unknown";
}

function contentBulkPatchStateLabel(stateId, text = {}) {
  return text.stateLabels?.[stateId] || stateId || "unknown";
}

function renderContentBulkPatchIntakeContract(contract, detailText = {}) {
  const text = detailText.contentBulkPatchIntakeContract || {};
  const summary = contract.summary || {};
  const metrics = [
    [text.domains || "Domains", `${summary.domainCount || 0}`],
    [text.batchKeys || "Batch keys", `${summary.batchKeyCount || 0}`],
    [text.requiredFields || "Required fields", `${summary.requiredFieldCount || 0}`],
    [text.uniqueChecks || "Checks", `${summary.uniqueCheckCount || 0}`],
    [text.currentRows || "Current rows", `${summary.currentRowCount || 0}`],
    [text.writes || "Writes", contract.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-intake" data-readonly="${contract.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Intake Contract")}">
      <div class="editor-content-bulk-intake-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Intake Contract")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only batch input contract.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchIntakeContract.version", {
          version: contract.version || "-"
        }, contract.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-intake-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-intake-list">
        ${(contract.domains || []).map((domain) => renderContentBulkPatchIntakeDomain(domain, text)).join("") || `<p class="muted">${escapeHtml(text.noDomains || "No domains.")}</p>`}
      </div>
    </section>
  `;
}

function renderContentBulkPatchIntakeDomain(domain, text = {}) {
  return `
    <article class="editor-content-bulk-intake-domain">
      <div class="editor-content-bulk-intake-domain-head">
        <div>
          <h5>${escapeHtml(contentBulkPatchDomainLabel(domain.id, text))}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchIntakeContract.domainMeta", {
            batchKey: domain.batchKey || "-",
            rows: domain.currentRowCount || 0,
            fields: (domain.requiredInputFields || []).length
          }, `${domain.batchKey || "-"} / ${domain.currentRowCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${chip(text.appendOrUpdate || "Append/update")}
        </div>
      </div>
      <div class="editor-content-bulk-intake-grid">
        ${balanceDetailChipBlock(text.batchKey || "Batch key", [domain.batchKey].filter(Boolean))}
        ${balanceDetailChipBlock(text.identityFields || "Identity", domain.identityFields || [])}
        ${balanceDetailChipBlock(text.requiredInputs || "Required inputs", domain.requiredInputFields || [])}
        ${balanceDetailChipBlock(text.guardChecks || "Guard checks", domain.checkScripts || [])}
      </div>
    </article>
  `;
}

function renderContentBulkPackageOverview(preview, detailText = {}, filterCounts = {}) {
  const text = detailText.contentBulkPackageOverview || {};
  const summary = preview.summary || {};
  const metrics = [
    [text.packageRows || "Package rows", `${summary.packageRowCount || 0}`],
    [text.activeDomains || "Active domains", `${summary.activeDomainCount || 0}`],
    [text.readyRows || "Ready", `${summary.readyRowCount || 0}`],
    [text.warningRows || "Review", `${summary.warningRowCount || 0}`],
    [text.blockedRows || "Blocked", `${summary.blockedRowCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section id="content-bulk-package-overview" class="editor-content-bulk-overview" data-state="${escapeAttribute(preview.status || "ready")}" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Package Overview")}">
      <div class="editor-content-bulk-overview-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Package Overview")}</h4>
          <p class="muted">${escapeHtml(text.description || "Summarizes the current bulk package before reviewing each specialized card.")}</p>
        </div>
        <strong>${escapeHtml(contentBulkOverviewLabel(preview.status || "ready", text.statusLabels))}</strong>
      </div>
      <div class="editor-content-bulk-overview-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${renderContentBulkFilterControls(text, filterCounts)}
      <div class="editor-content-bulk-overview-grid">
        ${balanceDetailChipBlock(text.recognizedSourceKeys || "Recognized source keys", [`${summary.recognizedSourceKeyCount || 0}`])}
        ${balanceDetailChipBlock(text.unmappedSourceKeys || "Unmapped source keys", [`${summary.unmappedSourceKeyCount || 0}`])}
        ${balanceDetailChipBlock(text.reviewSurfaces || "Review surfaces", [`${summary.reviewSurfaceCount || 0}`])}
      </div>
      <div class="editor-content-bulk-overview-list">
        ${(preview.reviewRows || []).map((row) => renderContentBulkOverviewRow(row, text)).join("")}
      </div>
      <div class="editor-content-bulk-overview-domains">
        ${(preview.domainRows || []).map((row) => renderContentBulkOverviewDomain(row, text)).join("")}
      </div>
    </section>
  `;
}

function renderContentBulkOverviewRow(row, text = {}) {
  return `
    <article class="editor-content-bulk-overview-row" data-state="${escapeAttribute(row.state || "empty")}">
      <div>
        <h5>${escapeHtml(contentBulkOverviewLabel(row.id, text.surfaceLabels))}</h5>
        <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPackageOverview.rowMeta", {
          rows: row.rowCount || 0,
          ready: row.readyCount || 0,
          blocked: row.blockedCount || 0,
        }, `${row.rowCount || 0}`))}</p>
      </div>
      <div class="editor-content-bulk-overview-actions">
        <span>${escapeHtml(contentBulkOverviewLabel(row.state, text.statusLabels))}</span>
        ${contentBulkOverviewJumpLink(row.primaryRowTargetId || row.drilldownTargetId, text)}
      </div>
    </article>
  `;
}

function renderContentBulkOverviewDomain(row, text = {}) {
  return `
    <article class="editor-content-bulk-overview-domain" data-state="${escapeAttribute(row.state || "empty")}">
      <div>
        <strong>${escapeHtml(contentBulkPatchDomainLabel(row.id, text))}</strong>
        <span>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPackageOverview.domainMeta", {
          batchKey: row.batchKey || "-",
          rows: row.rowCount || 0,
        }, `${row.batchKey || "-"} / ${row.rowCount || 0}`))}</span>
      </div>
      ${contentBulkOverviewJumpLink(row.rowTargetId || row.drilldownTargetId, text)}
    </article>
  `;
}

function contentBulkOverviewLabel(id, labels = {}) {
  return labels?.[id] || id || "-";
}

function contentBulkOverviewJumpLink(targetId, text = {}) {
  if (!targetId) return "";
  return `
    <a class="editor-content-bulk-overview-jump" href="#${escapeAttribute(targetId)}">${escapeHtml(text.jumpToDetail || "Jump")}</a>
  `;
}

function renderContentBulkFilterControls(text = {}, counts = {}) {
  const filters = ["all", "blocked", "review", "ready", "active", "empty"];
  const activeState = normalizeContentBulkFilterState(contentBulkDetailFilter.state);
  const activeDomain = normalizeContentBulkFilterDomain(contentBulkDetailFilter.domain);
  const query = normalizeContentBulkSearchQuery(contentBulkDetailFilter.query);
  const stateCounts = counts.states || counts;
  const domainCounts = counts.domains || {};
  return `
    <div class="editor-content-bulk-filter" role="group" aria-label="${escapeAttribute(text.stateFilter || "Bulk row filter")}">
      <label class="editor-content-bulk-search">
        <span>${escapeHtml(text.searchLabel || "Search")}</span>
        <input type="search" data-content-bulk-search value="${escapeAttribute(query)}" placeholder="${escapeAttribute(text.searchPlaceholder || "Monster, item, skill, file")}" />
      </label>
      <button class="editor-content-bulk-search-reset" type="button" data-content-bulk-search-reset ${query ? "" : "disabled"}>
        ${escapeHtml(text.resetSearch || "Reset")}
      </button>
      <div class="editor-content-bulk-filter-buttons">
        ${filters.map((state) => {
          const active = activeState === state;
          const label = contentBulkFilterLabel(state, text.filterLabels);
          const count = state === "all" ? stateCounts.all : stateCounts[state];
          return `
            <button class="editor-content-bulk-filter-button${active ? " is-active" : ""}" type="button" data-content-bulk-filter="${escapeAttribute(state)}" aria-pressed="${active ? "true" : "false"}">
              <span>${escapeHtml(label)}</span>
              <b>${escapeHtml(String(count || 0))}</b>
            </button>
          `;
        }).join("")}
      </div>
      <div class="editor-content-bulk-domain-filter" role="group" aria-label="${escapeAttribute(text.domainFilter || "Bulk domain filter")}">
        ${CONTENT_BULK_DOMAIN_FILTERS.map((domain) => {
          const active = activeDomain === domain;
          const label = contentBulkDomainLabel(domain, text.domainLabels);
          const count = domain === "all" ? domainCounts.all : domainCounts[domain];
          return `
            <button class="editor-content-bulk-filter-button${active ? " is-active" : ""}" type="button" data-content-bulk-domain="${escapeAttribute(domain)}" aria-pressed="${active ? "true" : "false"}">
              <span>${escapeHtml(label)}</span>
              <b>${escapeHtml(String(count || 0))}</b>
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;
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

function renderContentBulkPatchPackageAdapterPreview(preview, detailText = {}) {
  const text = detailText.contentBulkPatchPackageAdapter || {};
  const summary = preview.summary || {};
  const visibleMappings = (preview.mappings || []).filter((mapping) =>
    matchesContentBulkFilterRow(Number(mapping.rowCount || 0) > 0 ? "active" : "empty", [
      mapping,
      contentBulkPatchDomainLabel(mapping.domainId, text),
    ], [mapping.domainId])
  );
  const draftText = contentBulkPatchPackageInput.draftText || "";
  const hasAppliedInput = Boolean(String(contentBulkPatchPackageInput.appliedText || "").trim());
  const message = contentBulkPatchPackageParseError || contentBulkPatchPackageInput.parseError || "";
  const inputState = message ? "error" : (hasAppliedInput ? "ready" : "template");
  const sourceName = contentBulkPatchPackageInput.sourceName
    || (hasAppliedInput ? (text.pasteSource || "Pasted JSON") : (text.templateSource || "Template preview"));
  const statusLabel = message
    ? (text.errorStatus || "JSON error")
    : (hasAppliedInput ? (text.readyStatus || "Preview ready") : (text.templateStatus || "Template preview"));
  const metrics = [
    [text.sourceKeys || "Source keys", `${summary.sourceKeyCount || 0}`],
    [text.recognizedKeys || "Recognized", `${summary.recognizedSourceKeyCount || 0}`],
    [text.unmappedKeys || "Unmapped", `${summary.unmappedArrayKeyCount || 0}`],
    [text.normalizedRows || "Normalized rows", `${summary.normalizedRowCount || 0}`],
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount || 0}`],
    [text.withheldRows || "Withheld", `${summary.withheldRowCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section id="content-bulk-package-adapter" class="editor-content-bulk-package" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Package Adapter")}">
      <div class="editor-content-bulk-package-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Package Adapter")}</h4>
          <p class="muted">${escapeHtml(text.description || "Normalizes external package aliases into the shared batch contract.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchPackageAdapter.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-package-input" data-state="${escapeAttribute(inputState)}">
        <div class="editor-content-bulk-package-input-head">
          <div>
            <h5>${escapeHtml(text.inputTitle || "Package JSON input")}</h5>
            <p>${escapeHtml(text.inputDescription || "Paste or load one external package JSON, then preview normalized rows before applying anything.")}</p>
          </div>
          <span>${escapeHtml(statusLabel)}</span>
        </div>
        <textarea data-content-bulk-package-json spellcheck="false" placeholder="${escapeAttribute(text.inputPlaceholder || "")}">${escapeHtml(draftText)}</textarea>
        <div class="editor-content-bulk-package-actions">
          <label class="editor-content-bulk-package-file">
            <span>${escapeHtml(text.loadFile || "Load file")}</span>
            <input type="file" accept=".json,application/json" data-content-bulk-package-file />
          </label>
          <button type="button" data-content-bulk-package-apply>${escapeHtml(text.applyPreview || "Preview input")}</button>
          <button type="button" data-content-bulk-package-sample>${escapeHtml(text.useSample || "Use sample")}</button>
          <button type="button" data-content-bulk-package-template>${escapeHtml(text.downloadTemplate || "Download template")}</button>
          <button type="button" data-content-bulk-package-reset>${escapeHtml(text.resetInput || "Reset")}</button>
        </div>
        <p class="editor-content-bulk-package-message">
          ${escapeHtml(message || tf("editorPrep.balanceTuningDetail.contentBulkPatchPackageAdapter.inputSource", {
            source: sourceName
          }, sourceName))}
        </p>
      </div>
      <div class="editor-content-bulk-package-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-package-list">
        ${visibleMappings.map((mapping) => renderContentBulkPatchPackageMapping(mapping, text)).join("") || `<p class="muted">${escapeHtml(text.noFilteredRows || text.noMappings || "No package mappings.")}</p>`}
      </div>
      <div class="editor-content-bulk-package-grid">
        ${balanceDetailChipBlock(text.unmappedArrayKeys || "Unmapped array keys", preview.normalized?.unmappedArrayKeys || [])}
      </div>
    </section>
  `;
}

function renderContentBulkPatchPackageMapping(mapping, text = {}) {
  return `
    <article id="${escapeAttribute(createContentBulkRowTargetId(CONTENT_BULK_ROW_TARGET_SCOPES.packageDomain, mapping.domainId || mapping.batchKey))}" class="editor-content-bulk-package-domain" data-active="${mapping.rowCount > 0 ? "true" : "false"}">
      <div class="editor-content-bulk-package-domain-head">
        <div>
          <h5>${escapeHtml(contentBulkPatchDomainLabel(mapping.domainId, text))}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchPackageAdapter.domainMeta", {
            batchKey: mapping.batchKey || "-",
            rows: mapping.rowCount || 0,
            aliases: (mapping.aliases || []).length,
          }, `${mapping.batchKey || "-"} / ${mapping.rowCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${chip(mapping.rowCount > 0 ? (text.active || "Active") : (text.empty || "Empty"))}
        </div>
      </div>
      <div class="editor-content-bulk-package-grid">
        ${balanceDetailChipBlock(text.sourceKeysForDomain || "Source keys", mapping.sourceKeys || [])}
        ${balanceDetailChipBlock(text.acceptedAliases || "Accepted aliases", mapping.aliases || [])}
        ${balanceDetailChipBlock(text.requiredInputs || "Required inputs", mapping.requiredInputFields || [])}
        ${balanceDetailChipBlock(text.identityFields || "Identity", mapping.identityFields || [])}
      </div>
    </article>
  `;
}

function renderLootSkillBulkIntakePreview(preview, detailText = {}) {
  const text = detailText.lootSkillBulkIntakePreview || {};
  const summary = preview.summary || {};
  const typeLabels = text.typeLabels || {};
  const visibleLootRows = (preview.lootRows || []).filter((row) => matchesContentBulkFilterRow(row.intakeState, [
    row,
    lootSkillBulkLabel(row.type, typeLabels),
  ], ["loot_item"]));
  const visibleSkillRows = (preview.skillRows || []).filter((row) => matchesContentBulkFilterRow(row.bulkState, row, ["skill"]));
  const metrics = [
    [text.lootRows || "Loot rows", `${summary.lootRowCount || 0}`],
    [text.skillRows || "Skill rows", `${summary.skillRowCount || 0}`],
    [text.codexFragments || "Codex fragments", `${summary.codexFragmentCount || 0}`],
    [text.manaCrystals || "Mana crystals", `${summary.manaCrystalCount || 0}`],
    [text.skillFragments || "Skill fragments", `${summary.skillFragmentCount || 0}`],
    [text.skillRunes || "Skill runes", `${summary.skillRuneCount || 0}`],
    [text.rewardLinked || "Reward linked", `${summary.rewardLinkedLootCount || 0}`],
    [text.missingSkillDefinitions || "Missing skill defs", `${summary.missingSkillDefinitionCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section id="loot-skill-bulk-intake" class="editor-loot-skill-bulk-intake" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Loot and skill bulk intake")}">
      <div class="editor-loot-skill-bulk-intake-head">
        <div>
          <h4>${escapeHtml(text.title || "Loot and skill bulk intake")}</h4>
          <p class="muted">${escapeHtml(text.description || "Classifies non-equipment loot and skill rows from the shared bulk package preview.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.lootSkillBulkIntakePreview.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-loot-skill-bulk-intake-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${renderContentBulkStagedContractSummary(preview.stagedContract, text)}
      <div class="editor-loot-skill-bulk-intake-list">
        ${visibleLootRows.map((row) => renderLootSkillBulkLootRow(row, text)).join("") || `<p class="muted">${escapeHtml(text.noFilteredRows || text.noLootRows || "No loot rows.")}</p>`}
      </div>
      <div class="editor-loot-skill-bulk-intake-list">
        ${visibleSkillRows.map((row) => renderLootSkillBulkSkillRow(row, text)).join("") || `<p class="muted">${escapeHtml(text.noFilteredRows || text.noSkillRows || "No skill rows.")}</p>`}
      </div>
    </section>
  `;
}

function renderLootSkillBulkLootRow(row, text = {}) {
  const stateLabels = text.stateLabels || {};
  const typeLabels = text.typeLabels || {};
  const bulkLabels = text.bulkStateLabels || {};
  return `
    <article id="${escapeAttribute(createContentBulkRowTargetId(CONTENT_BULK_ROW_TARGET_SCOPES.loot, row.id || row.type))}" class="editor-loot-skill-bulk-intake-row" data-state="${escapeAttribute(row.intakeState || "unknown")}">
      <div class="editor-loot-skill-bulk-intake-row-head">
        <div>
          <h5>${escapeHtml(row.id || "-")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.lootSkillBulkIntakePreview.lootMeta", {
            type: lootSkillBulkLabel(row.type, typeLabels),
            rarity: row.rarity || "-",
            state: lootSkillBulkLabel(row.bulkState, bulkLabels),
          }, `${row.type || "-"} / ${row.rarity || "-"}`))}</p>
        </div>
        <span>${escapeHtml(lootSkillBulkLabel(row.intakeState, stateLabels))}</span>
      </div>
      <div class="editor-loot-skill-bulk-intake-grid">
        ${balanceDetailChipBlock(text.skillLink || "Skill link", [row.skillId || (text.none || "None")])}
        ${balanceDetailChipBlock(text.dropSource || "Drop source", [row.dropSource || (text.globalSource || "Global")])}
        ${balanceDetailChipBlock(text.codexRecordTarget || "Codex target", row.recordTarget > 0 ? [`${row.recordTarget}`] : [])}
        ${balanceDetailChipBlock(text.rewardLink || "Reward link", [row.rewardLinked ? (text.linked || "Linked") : (text.unlinked || "Unlinked")])}
        ${balanceDetailChipBlock(text.targetSurfaces || "Target surfaces", [`${row.targetSurfaceCount || 0}`])}
        ${balanceDetailChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(row.blockingIssueCodes, text))}
        ${balanceDetailChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(row.warningIssueCodes, text))}
      </div>
    </article>
  `;
}

function renderLootSkillBulkSkillRow(row, text = {}) {
  const bulkLabels = text.bulkStateLabels || {};
  return `
    <article id="${escapeAttribute(createContentBulkRowTargetId(CONTENT_BULK_ROW_TARGET_SCOPES.skill, row.id || row.type))}" class="editor-loot-skill-bulk-intake-row" data-state="${escapeAttribute(row.bulkState || "unknown")}">
      <div class="editor-loot-skill-bulk-intake-row-head">
        <div>
          <h5>${escapeHtml(row.id || "-")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.lootSkillBulkIntakePreview.skillMeta", {
            type: row.type || "-",
            mp: row.mpCost || 0,
            cooldown: row.cooldown || 0,
            state: lootSkillBulkLabel(row.bulkState, bulkLabels),
          }, `${row.type || "-"} / ${row.mpCost || 0}`))}</p>
        </div>
        <span>${escapeHtml(lootSkillBulkLabel(row.bulkState, bulkLabels))}</span>
      </div>
      <div class="editor-loot-skill-bulk-intake-grid">
        ${balanceDetailChipBlock(text.damageType || "Damage", [row.damageType || "-"])}
        ${balanceDetailChipBlock(text.effectType || "Effect", [row.effectType || "-"])}
        ${balanceDetailChipBlock(text.stances || "Stances", row.stanceAllowed || [])}
        ${balanceDetailChipBlock(text.targetSurfaces || "Target surfaces", [`${row.targetSurfaceCount || 0}`])}
        ${balanceDetailChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(row.blockingIssueCodes, text))}
        ${balanceDetailChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(row.warningIssueCodes, text))}
      </div>
    </article>
  `;
}

function lootSkillBulkLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function renderMonsterRuntimeBulkIntakePreview(preview, detailText = {}) {
  const text = detailText.monsterRuntimeBulkIntakePreview || {};
  const summary = preview.summary || {};
  const stateLabels = text.stateLabels || {};
  const visibleRows = (preview.rows || []).filter((row) => matchesContentBulkFilterRow(row.runtimeState, [
    row,
    monsterRuntimeBulkIntakeLabel(row.runtimeState, stateLabels),
    monsterRuntimeBulkIntakeLabel(row.bulkState, stateLabels),
  ], ["monster", "monster_runtime"]));
  const metrics = [
    [text.runtimePresets || "Runtime presets", `${summary.runtimePresetCount || 0}`],
    [text.packageRows || "Package rows", `${summary.packageRowCount || 0}`],
    [text.recognizedRows || "Recognized rows", `${summary.recognizedRuntimeRows || 0}`],
    [text.updateCandidates || "Update candidates", `${summary.updateCandidateCount || 0}`],
    [text.missingSprites || "Missing sprites", `${summary.missingSpriteFileCount || 0}`],
    [text.blockedRows || "Blocked rows", `${summary.blockedRuntimeRowCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section id="monster-runtime-bulk-intake" class="editor-monster-runtime-bulk-intake" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Monster runtime bulk intake")}">
      <div class="editor-monster-runtime-bulk-intake-head">
        <div>
          <h4>${escapeHtml(text.title || "Monster runtime bulk intake")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only bridge from monster runtime package presets into the bulk intake contract.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterRuntimeBulkIntakePreview.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-monster-runtime-bulk-intake-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${renderContentBulkStagedContractSummary(preview.stagedContract, text)}
      <div class="editor-monster-runtime-bulk-intake-list">
        ${visibleRows.map((row) => renderMonsterRuntimeBulkIntakeRow(row, text)).join("") || `<p class="muted">${escapeHtml(text.noFilteredRows || text.noRows || "No runtime package rows.")}</p>`}
      </div>
    </section>
  `;
}

function renderMonsterRuntimeBulkIntakeRow(row, text = {}) {
  const stateLabels = text.stateLabels || {};
  const motionLabels = (row.motions || []).map((motion) => `${motion.phase}: ${motion.runtimeMotionId || motion.externalMotionId}`);
  const actionLabels = (row.actions || []).map((action) => `${action.id}${action.optional ? ` (${text.optional || "optional"})` : ""}`);
  return `
    <article id="${escapeAttribute(createContentBulkRowTargetId(CONTENT_BULK_ROW_TARGET_SCOPES.monsterRuntime, row.liveMonsterId || row.externalMonsterId || row.packageIdentity))}" class="editor-monster-runtime-bulk-intake-row" data-state="${escapeAttribute(row.runtimeState || "unknown")}">
      <div class="editor-monster-runtime-bulk-intake-row-head">
        <div>
          <h5>${escapeHtml(row.externalMonsterId || "-")} → ${escapeHtml(row.liveMonsterId || "-")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterRuntimeBulkIntakePreview.rowMeta", {
            key: row.acceptedAliasKey || "-",
            domain: row.targetDomainId || "-",
            state: monsterRuntimeBulkIntakeLabel(row.bulkState, stateLabels),
          }, `${row.acceptedAliasKey || "-"} / ${row.targetDomainId || "-"}`))}</p>
        </div>
        <span>${escapeHtml(monsterRuntimeBulkIntakeLabel(row.runtimeState, stateLabels))}</span>
      </div>
      <div class="editor-monster-runtime-bulk-intake-grid">
        ${balanceDetailChipBlock(text.motions || "Motions", motionLabels)}
        ${balanceDetailChipBlock(text.actions || "Actions", actionLabels)}
        ${balanceDetailChipBlock(text.missingSpriteFiles || "Missing sprite files", row.missingSpriteFiles || [])}
        ${balanceDetailChipBlock(text.sourcePreview || "Source preview", [row.sourcePreviewFile].filter(Boolean))}
        ${balanceDetailChipBlock(text.targetSurfaces || "Target surfaces", [`${row.targetSurfaceCount || 0}`])}
        ${balanceDetailChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(row.blockingIssueCodes, text))}
        ${balanceDetailChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(row.warningIssueCodes, text))}
      </div>
    </article>
  `;
}

function monsterRuntimeBulkIntakeLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function contentBulkIssueList(codes = [], text = {}) {
  const list = Array.isArray(codes) ? codes.filter(Boolean) : [];
  return list.length ? list : [text.noIssues || "None"];
}

function renderContentBulkIssueSummary(issueSummary, text = {}) {
  if (!issueSummary) return "";
  const metrics = [
    [text.affectedDomains || "Affected domains", `${issueSummary.affectedDomainCount || 0}`],
    [text.affectedRows || "Affected rows", `${issueSummary.affectedRowCount || 0}`],
  ];
  if (Number(issueSummary.affectedReviewItemCount || 0) > 0) {
    metrics.push([text.affectedReviewItems || "Affected review", `${issueSummary.affectedReviewItemCount || 0}`]);
  }
  return `
    <div class="editor-content-bulk-contract-summary editor-content-bulk-issue-summary">
      <div>
        <strong>${escapeHtml(text.issueSummary || "Issue summary")}</strong>
        <p class="muted">${escapeHtml(text.issueSummaryHint || "Aggregated blockers and warnings before apply.")}</p>
      </div>
      <div class="editor-content-bulk-contract-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-contract-issues">
        ${balanceDetailChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(issueSummary.blockingIssueCodes, text))}
        ${balanceDetailChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(issueSummary.warningIssueCodes, text))}
      </div>
    </div>
  `;
}

function renderContentBulkMassApplyReadiness({
  dryRun = {},
  stagedImport = {},
  applyGate = {},
  backupPlan = {},
  restoreRehearsal = {},
} = {}, detailText = {}) {
  const text = detailText.contentBulkMassApplyReadiness || {};
  const dryRunBlockers = Number(dryRun.summary?.blockingIssueCount || 0);
  const stagedWithheld = Number(stagedImport.summary?.withheldRowCount || 0);
  const applyBlocked = Number(applyGate.summary?.blockedReviewItemCount || 0);
  const backupBlocked = Number(backupPlan.summary?.preApplyBlockedReviewItemCount || 0);
  const restoreBlocked = Number(restoreRehearsal.preApplyReviewSummary?.blockedReviewItemCount || 0);
  const blockedReasonCodes = [
    ...(dryRun.issueSummary?.blockingIssueCodes || []),
    ...(stagedImport.issueSummary?.blockingIssueCodes || []),
    ...(applyGate.issueSummary?.blockingIssueCodes || []),
    ...(backupPlan.blockedReasons || []),
    ...(restoreRehearsal.blockedReasons || []),
  ];
  const warningCodes = [
    ...(dryRun.issueSummary?.warningIssueCodes || []),
    ...(stagedImport.issueSummary?.warningIssueCodes || []),
    ...(applyGate.issueSummary?.warningIssueCodes || []),
  ];
  const blockedCount = dryRunBlockers + stagedWithheld + applyBlocked + backupBlocked + restoreBlocked;
  const state = blockedCount > 0 || applyGate.applyEnabled === false || backupPlan.backupEnabled === false || restoreRehearsal.restoreEnabled === false
    ? "blocked"
    : "ready";
  const metrics = [
    [text.dryRunBlockers || "Dry-run blockers", `${dryRunBlockers}`],
    [text.stagedWithheld || "Staged withheld", `${stagedWithheld}`],
    [text.applyBlocked || "Apply blocked", `${applyBlocked}`],
    [text.backupBlocked || "Backup blocked", `${backupBlocked}`],
    [text.restoreBlocked || "Restore blocked", `${restoreBlocked}`],
    [text.state || "State", contentBulkMassReadinessLabel(state, text.stateLabels)],
  ];
  return `
    <div class="editor-content-bulk-contract-summary editor-content-bulk-mass-readiness" data-state="${escapeAttribute(state)}">
      <div>
        <strong>${escapeHtml(text.title || "Mass apply readiness")}</strong>
        <p class="muted">${escapeHtml(text.description || "Combined read-only readiness across dry-run, staged import, apply gate, backup, and restore rehearsal.")}</p>
      </div>
      <div class="editor-content-bulk-contract-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-contract-issues">
        ${balanceDetailChipBlock(text.blockedReasons || "Blocked reasons", contentBulkIssueList(Array.from(new Set(blockedReasonCodes)), text))}
        ${balanceDetailChipBlock(text.warningReasons || "Warning reasons", contentBulkIssueList(Array.from(new Set(warningCodes)), text))}
      </div>
    </div>
  `;
}

function contentBulkMassReadinessLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function renderContentBulkStagedContractSummary(contract, text = {}) {
  if (!contract?.summary) return "";
  const summary = contract.summary;
  const metrics = [
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount || 0}`],
    [text.blockedRows || "Blocked rows", `${summary.blockedRowCount || 0}`],
    [text.warningRows || "Warnings", `${summary.warningRowCount || 0}`],
    [text.targetSurfaces || "Target surfaces", `${summary.targetSurfaceCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
  ];
  return `
    <div class="editor-content-bulk-contract-summary" data-staged-contract-version="${escapeAttribute(contract.version || "")}">
      <div>
        <strong>${escapeHtml(text.stagedContract || "Staged contract")}</strong>
        <p class="muted">${escapeHtml((contract.domainIds || []).join(" / ") || "-")}</p>
      </div>
      <div class="editor-content-bulk-contract-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-contract-issues">
        ${balanceDetailChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(contract.blockingIssueCodes, text))}
        ${balanceDetailChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(contract.warningIssueCodes, text))}
      </div>
    </div>
  `;
}

function renderRuntimeVfxBulkIntakePreview(preview, detailText = {}) {
  const text = detailText.runtimeVfxBulkIntakePreview || {};
  const summary = preview.summary || {};
  const stateLabels = text.stateLabels || {};
  const kindLabels = text.kindLabels || {};
  const bulkLabels = text.bulkStateLabels || {};
  const visibleRows = (preview.rows || []).filter((row) => matchesContentBulkFilterRow(row.intakeState, [
    row,
    runtimeVfxBulkLabel(row.intakeState, stateLabels),
    runtimeVfxBulkLabel(row.kind, kindLabels),
    runtimeVfxBulkLabel(row.bulkState, bulkLabels),
  ], ["runtime_vfx"]));
  const metrics = [
    [text.packageRows || "Package rows", `${summary.packageRowCount || 0}`],
    [text.profileRows || "Profile rows", `${summary.profilePlacementRowCount || 0}`],
    [text.modifierRows || "Modifier rows", `${summary.effectModifierRowCount || 0}`],
    [text.updateCandidates || "Updates", `${summary.updateCandidateCount || 0}`],
    [text.appendCandidates || "Append", `${summary.appendCandidateCount || 0}`],
    [text.readyRows || "Ready", `${summary.readyRowCount || 0}`],
    [text.warningRows || "Review", `${summary.warningRowCount || 0}`],
    [text.blockedRows || "Blocked", `${summary.blockedRowCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section id="runtime-vfx-bulk-intake" class="editor-runtime-vfx-bulk-intake" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Runtime VFX bulk intake")}">
      <div class="editor-runtime-vfx-bulk-intake-head">
        <div>
          <h4>${escapeHtml(text.title || "Runtime VFX bulk intake")}</h4>
          <p class="muted">${escapeHtml(text.description || "Reviews monster motion-profile VFX placement rows before any live patch.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.runtimeVfxBulkIntakePreview.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-runtime-vfx-bulk-intake-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${renderContentBulkStagedContractSummary(preview.stagedContract, text)}
      <div class="editor-runtime-vfx-bulk-intake-list">
        ${visibleRows.map((row) => renderRuntimeVfxBulkIntakeRow(row, text)).join("") || `<p class="muted">${escapeHtml(text.noFilteredRows || text.noRows || "No runtime VFX rows.")}</p>`}
      </div>
    </section>
  `;
}

function renderRuntimeVfxBulkIntakeRow(row, text = {}) {
  const stateLabels = text.stateLabels || {};
  const kindLabels = text.kindLabels || {};
  const bulkLabels = text.bulkStateLabels || {};
  return `
    <article id="${escapeAttribute(createContentBulkRowTargetId(CONTENT_BULK_ROW_TARGET_SCOPES.runtimeVfx, row.rowIndex, row.motionProfile, row.effectType || row.kind))}" class="editor-runtime-vfx-bulk-intake-row" data-state="${escapeAttribute(row.intakeState || "unknown")}">
      <div class="editor-runtime-vfx-bulk-intake-row-head">
        <div>
          <h5>${escapeHtml(row.motionProfile || "-")}${row.effectType ? ` · ${escapeHtml(row.effectType)}` : ""}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.runtimeVfxBulkIntakePreview.rowMeta", {
            key: row.sourceKey || "-",
            kind: runtimeVfxBulkLabel(row.kind, kindLabels),
            state: runtimeVfxBulkLabel(row.bulkState, bulkLabels),
          }, `${row.sourceKey || "-"} / ${row.kind || "-"}`))}</p>
        </div>
        <span>${escapeHtml(runtimeVfxBulkLabel(row.intakeState, stateLabels))}</span>
      </div>
      <div class="editor-runtime-vfx-bulk-intake-grid">
        ${balanceDetailChipBlock(text.targetSurface || "Target", [row.targetSurface || "-"])}
        ${balanceDetailChipBlock(text.sourceMonster || "Source monster", [row.sourceMonsterId || (text.none || "None")])}
        ${balanceDetailChipBlock(text.profileMonsterCount || "Current monsters", [`${row.profileMonsterCount || 0}`])}
        ${balanceDetailChipBlock(text.targetSurfaces || "Target surfaces", [`${row.targetSurfaceCount || 0}`])}
        ${balanceDetailChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(row.blockingIssueCodes, text))}
        ${balanceDetailChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(row.warningIssueCodes, text))}
        ${balanceDetailChipBlock(text.signals || "Signals", row.signals || [])}
        ${balanceDetailChipBlock(text.issues || "Issues", row.issues || [])}
        ${balanceDetailChipBlock(text.placement || "Placement", [row.placement ? formatCombatVfxPlacement(row.placement) : runtimeVfxModifierSummary(row.modifier)])}
      </div>
    </article>
  `;
}

function runtimeVfxModifierSummary(modifier = {}) {
  if (!modifier) return "-";
  return `x ${Number(modifier.offsetX || 0)} / y ${Number(modifier.offsetY || 0)} / txt ${Number(modifier.textOffsetY || 0)} / mul ${Number(modifier.slashWidthMultiplier || 1)}/${Number(modifier.expandedSlashWidthMultiplier || 1)}`;
}

function runtimeVfxBulkLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function renderContentBulkPatchDryRunPreview(preview, detailText = {}) {
  const text = detailText.contentBulkPatchDryRunImporter || {};
  const summary = preview.summary || {};
  const metrics = [
    [text.rows || "Rows", `${summary.rowCount || 0}`],
    [text.activeDomains || "Active domains", `${summary.activeDomainCount || 0}`],
    [text.appendCandidates || "Append", `${summary.appendCandidateCount || 0}`],
    [text.updateCandidates || "Update", `${summary.updateCandidateCount || 0}`],
    [text.generatedSurfaces || "Generated surfaces", `${summary.generatedSurfaceCount || 0}`],
    [text.blockers || "Blockers", `${summary.blockingIssueCount || 0}`],
    [text.warnings || "Warnings", `${summary.warningIssueCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-dry-run" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Dry-run Importer")}">
      <div class="editor-content-bulk-dry-run-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Dry-run Importer")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only dry-run preview for batch imports.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchDryRunImporter.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-dry-run-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${renderContentBulkIssueSummary(preview.issueSummary, text)}
      <div class="editor-content-bulk-dry-run-list">
        ${(preview.domains || []).map((domain) => renderContentBulkPatchDryRunDomain(domain, text)).join("") || `<p class="muted">${escapeHtml(text.noDomains || "No dry-run domains.")}</p>`}
      </div>
    </section>
  `;
}

function renderContentBulkPatchDryRunDomain(domain, text = {}) {
  const surfaceLabels = (domain.surfaces || []).map((surface) => `${surface.id} (${surface.candidateCount || 0})`);
  return `
    <article class="editor-content-bulk-dry-run-domain" data-state="${escapeAttribute(domain.state || "unknown")}">
      <div class="editor-content-bulk-dry-run-domain-head">
        <div>
          <h5>${escapeHtml(contentBulkPatchDomainLabel(domain.id, text))}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchDryRunImporter.domainMeta", {
            rows: domain.rowCount || 0,
            append: domain.appendCandidateCount || 0,
            update: domain.updateCandidateCount || 0,
            surfaces: domain.generatedSurfaceCount || 0,
          }, `${domain.rowCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${chip(contentBulkPatchDryRunStateLabel(domain.state, text))}
        </div>
      </div>
      <div class="editor-content-bulk-dry-run-grid">
        ${balanceDetailChipBlock(text.batchKey || "Batch key", [domain.batchKey].filter(Boolean))}
        ${balanceDetailChipBlock(text.identityFields || "Identity", domain.identityFields || [])}
        ${balanceDetailChipBlock(text.targetSurfaces || "Target surfaces", surfaceLabels)}
        ${balanceDetailChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(domain.blockingIssueCodes, text))}
        ${balanceDetailChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(domain.warningIssueCodes, text))}
        ${balanceDetailChipBlock(text.guardChecks || "Guard checks", domain.checkScripts || [])}
      </div>
    </article>
  `;
}

function contentBulkPatchDryRunStateLabel(stateId, text = {}) {
  return text.stateLabels?.[stateId] || stateId || "unknown";
}

function renderContentBulkPatchStagedImportPreview(preview, detailText = {}) {
  const text = detailText.contentBulkPatchStagedImportPreview || {};
  const summary = preview.summary || {};
  const metrics = [
    [text.inputRows || "Input rows", `${summary.inputRowCount || 0}`],
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount || 0}`],
    [text.appendStages || "Append", `${summary.appendStageCount || 0}`],
    [text.updateStages || "Update", `${summary.updateStageCount || 0}`],
    [text.withheldRows || "Withheld", `${summary.withheldRowCount || 0}`],
    [text.generatedSurfaces || "Generated surfaces", `${summary.generatedSurfaceCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.applyMode || "Apply mode", preview.applyMode || "-"],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-stage" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Staged Import Preview")}">
      <div class="editor-content-bulk-stage-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Staged Import Preview")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only staged apply preview for validated batch rows.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchStagedImportPreview.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-stage-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${renderContentBulkIssueSummary(preview.issueSummary, text)}
      <div class="editor-content-bulk-stage-list">
        ${(preview.domains || []).map((domain) => renderContentBulkPatchStagedImportDomain(domain, text)).join("") || `<p class="muted">${escapeHtml(text.noDomains || "No staged domains.")}</p>`}
      </div>
      <div class="editor-content-bulk-stage-steps">
        <strong>${escapeHtml(text.applySteps || "Apply steps")}</strong>
        <div class="editor-chip-list">
          ${(preview.applySteps || []).map((step) => chip(contentBulkPatchStageStepLabel(step, text))).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderContentBulkPatchStagedImportDomain(domain, text = {}) {
  const surfaceLabels = (domain.surfaces || []).map((surface) => `${surface.id} (${surface.stagedCandidateCount || 0})`);
  const rowLabels = (domain.rows || []).map((row) => tf("editorPrep.balanceTuningDetail.contentBulkPatchStagedImportPreview.rowMeta", {
    index: row.rowIndex + 1,
    identity: row.identity || "-",
    state: contentBulkPatchStageRowStateLabel(row.state, text),
    surfaces: row.targetSurfaceCount || 0,
  }, `#${row.rowIndex + 1} ${row.identity || "-"} ${row.state}`));
  return `
    <article class="editor-content-bulk-stage-domain" data-state="${escapeAttribute(domain.state || "unknown")}">
      <div class="editor-content-bulk-stage-domain-head">
        <div>
          <h5>${escapeHtml(contentBulkPatchDomainLabel(domain.id, text))}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchStagedImportPreview.domainMeta", {
            rows: domain.rowCount || 0,
            staged: domain.stagedRowCount || 0,
            append: domain.appendStageCount || 0,
            update: domain.updateStageCount || 0,
            withheld: domain.withheldRowCount || 0,
          }, `${domain.rowCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${chip(contentBulkPatchStageStateLabel(domain.state, text))}
        </div>
      </div>
      <div class="editor-content-bulk-stage-grid">
        ${balanceDetailChipBlock(text.batchKey || "Batch key", [domain.batchKey].filter(Boolean))}
        ${balanceDetailChipBlock(text.stagedRows || "Staged rows", rowLabels)}
        ${balanceDetailChipBlock(text.targetSurfaces || "Target surfaces", surfaceLabels)}
        ${balanceDetailChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(domain.blockingIssueCodes, text))}
        ${balanceDetailChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(domain.warningIssueCodes, text))}
        ${balanceDetailChipBlock(text.guardChecks || "Guard checks", domain.checkScripts || [])}
      </div>
    </article>
  `;
}

function contentBulkPatchStageStateLabel(stateId, text = {}) {
  return text.stateLabels?.[stateId] || stateId || "unknown";
}

function contentBulkPatchStageRowStateLabel(stateId, text = {}) {
  return text.rowStateLabels?.[stateId] || stateId || "unknown";
}

function contentBulkPatchStageStepLabel(stepId, text = {}) {
  return text.stepLabels?.[stepId] || stepId || "unknown";
}

function renderContentBulkPatchDiffExport(preview, detailText = {}) {
  const text = detailText.contentBulkPatchDiffExport || {};
  const summary = preview.summary || {};
  const metrics = [
    [text.targetFiles || "Target files", `${summary.targetFileCount || 0}`],
    [text.targetSurfaces || "Target surfaces", `${summary.targetSurfaceCount || 0}`],
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount || 0}`],
    [text.appendStages || "Append", `${summary.appendStageCount || 0}`],
    [text.updateStages || "Update", `${summary.updateStageCount || 0}`],
    [text.withheldRows || "Withheld", `${summary.withheldRowCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.applyMode || "Apply mode", preview.applyMode || "-"],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-diff" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Diff Export")}">
      <div class="editor-content-bulk-diff-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Diff Export")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only file and surface map before applying staged batch rows.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchDiffExport.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-diff-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-diff-list">
        ${(preview.fileTargets || []).map((target) => renderContentBulkPatchDiffTarget(target, text)).join("") || `<p class="muted">${escapeHtml(text.noTargets || "No diff targets.")}</p>`}
      </div>
      <div class="editor-content-bulk-diff-steps">
        <strong>${escapeHtml(text.reviewSteps || "Review steps")}</strong>
        <div class="editor-chip-list">
          ${chip(contentBulkPatchDiffStatusLabel(preview.status, text))}
          ${(preview.manualReviewSteps || []).map((step) => chip(contentBulkPatchDiffStepLabel(step, text))).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderContentBulkPatchDiffTarget(target, text = {}) {
  const surfaceLabels = (target.surfaces || []).map((surface) => {
    const name = surface.surface || surface.id || "-";
    return `${surface.domainId || "-"} · ${name} (${surface.stagedCandidateCount || 0})`;
  });
  return `
    <article class="editor-content-bulk-diff-target">
      <div class="editor-content-bulk-diff-target-head">
        <div>
          <h5>${escapeHtml(target.file || "-")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchDiffExport.targetMeta", {
            surfaces: target.surfaceCount || 0,
            staged: target.stagedRowCount || 0,
            append: target.appendStageCount || 0,
            update: target.updateStageCount || 0,
            withheld: target.withheldRowCount || 0,
          }, `${target.surfaceCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${(target.domainIds || []).map((domainId) => chip(contentBulkPatchDomainLabel(domainId, text))).join("")}
        </div>
      </div>
      <div class="editor-content-bulk-diff-grid">
        ${balanceDetailChipBlock(text.domains || "Domains", target.domainIds || [])}
        ${balanceDetailChipBlock(text.surfaces || "Surfaces", surfaceLabels)}
      </div>
    </article>
  `;
}

function contentBulkPatchDiffStatusLabel(statusId, text = {}) {
  return text.statusLabels?.[statusId] || statusId || "unknown";
}

function contentBulkPatchDiffStepLabel(stepId, text = {}) {
  return text.stepLabels?.[stepId] || stepId || "unknown";
}

function renderContentBulkPatchManualApplyChecklist(checklist, detailText = {}) {
  const text = detailText.contentBulkPatchManualApplyChecklist || {};
  const summary = checklist.summary || {};
  const metrics = [
    [text.targetFiles || "Target files", `${summary.targetFileCount || 0}`],
    [text.targetSurfaces || "Target surfaces", `${summary.targetSurfaceCount || 0}`],
    [text.manualItems || "Manual items", `${summary.manualItemCount || 0}`],
    [text.surfaceReviewItems || "Surface reviews", `${summary.surfaceReviewItemCount || 0}`],
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount || 0}`],
    [text.updateFiles || "Update files", `${summary.updateFileCount || 0}`],
    [text.verificationSteps || "Verification", `${summary.verificationStepCount || 0}`],
    [text.applyMode || "Apply mode", checklist.applyMode || "-"],
    [text.writes || "Writes", checklist.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-checklist" data-readonly="${checklist.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Manual Apply Checklist")}">
      <div class="editor-content-bulk-checklist-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Manual Apply Checklist")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only manual apply checklist from diff export targets.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchManualApplyChecklist.version", {
          version: checklist.version || "-"
        }, checklist.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-checklist-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-checklist-steps">
        <strong>${escapeHtml(text.preflightSteps || "Preflight steps")}</strong>
        <div class="editor-chip-list">
          ${chip(contentBulkPatchChecklistStatusLabel(checklist.status, text))}
          ${(checklist.preflightSteps || []).map((step) => chip(contentBulkPatchChecklistStepLabel(step, text))).join("")}
        </div>
      </div>
      <div class="editor-content-bulk-checklist-list">
        ${(checklist.fileChecklists || []).map((entry) => renderContentBulkPatchManualApplyFile(entry, text)).join("") || `<p class="muted">${escapeHtml(text.noFiles || "No checklist files.")}</p>`}
      </div>
      <div class="editor-content-bulk-checklist-steps">
        <strong>${escapeHtml(text.finalReviewSteps || "Final review steps")}</strong>
        <div class="editor-chip-list">
          ${(checklist.finalReviewSteps || []).map((step) => chip(contentBulkPatchChecklistStepLabel(step, text))).join("")}
        </div>
      </div>
    </section>
  `;
}

function renderContentBulkPatchManualApplyFile(entry, text = {}) {
  const surfaceLabels = (entry.surfaceReviewItems || []).map((item) => `${item.domainId || "-"} · ${item.surface || item.id || "-"} · ${contentBulkPatchChecklistActionLabel(item.reviewAction, text)}`);
  return `
    <article class="editor-content-bulk-checklist-file" data-state="${escapeAttribute(entry.status || "unknown")}">
      <div class="editor-content-bulk-checklist-file-head">
        <div>
          <h5>${escapeHtml(`${entry.order || "-"} · ${entry.file || "-"}`)}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchManualApplyChecklist.fileMeta", {
            surfaces: entry.surfaceCount || 0,
            staged: entry.stagedRowCount || 0,
            append: entry.appendStageCount || 0,
            update: entry.updateStageCount || 0,
            withheld: entry.withheldRowCount || 0,
          }, `${entry.surfaceCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${chip(contentBulkPatchChecklistStatusLabel(entry.status, text))}
        </div>
      </div>
      <div class="editor-content-bulk-checklist-grid">
        ${balanceDetailChipBlock(text.domains || "Domains", entry.domainIds || [])}
        ${balanceDetailChipBlock(text.actions || "Actions", (entry.actions || []).map((action) => contentBulkPatchChecklistActionLabel(action, text)))}
        ${balanceDetailChipBlock(text.surfaceReviews || "Surface reviews", surfaceLabels)}
      </div>
    </article>
  `;
}

function contentBulkPatchChecklistStatusLabel(statusId, text = {}) {
  return text.statusLabels?.[statusId] || statusId || "unknown";
}

function contentBulkPatchChecklistStepLabel(stepId, text = {}) {
  return text.stepLabels?.[stepId] || stepId || "unknown";
}

function contentBulkPatchChecklistActionLabel(actionId, text = {}) {
  return text.actionLabels?.[actionId] || actionId || "unknown";
}

function renderContentBulkPatchFilePatchDraft(draft, detailText = {}) {
  const text = detailText.contentBulkPatchFilePatchDraft || {};
  const summary = draft.summary || {};
  const metrics = [
    [text.draftFiles || "Draft files", `${summary.draftFileCount || 0}`],
    [text.patchBlocks || "Patch blocks", `${summary.patchBlockCount || 0}`],
    [text.targetSurfaces || "Target surfaces", `${summary.targetSurfaceCount || 0}`],
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount || 0}`],
    [text.updateDrafts || "Update drafts", `${summary.updateDraftCount || 0}`],
    [text.blockedDrafts || "Blocked drafts", `${summary.blockedDraftCount || 0}`],
    [text.verificationSteps || "Verification", `${summary.verificationStepCount || 0}`],
    [text.applyMode || "Apply mode", draft.applyMode || "-"],
    [text.writes || "Writes", draft.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-patch-draft" data-readonly="${draft.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch File Draft")}">
      <div class="editor-content-bulk-patch-draft-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch File Draft")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only file patch draft from manual apply checklist.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchFilePatchDraft.version", {
          version: draft.version || "-"
        }, draft.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-patch-draft-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-patch-draft-steps">
        <strong>${escapeHtml(text.globalSteps || "Global steps")}</strong>
        <div class="editor-chip-list">
          ${chip(contentBulkPatchFilePatchStatusLabel(draft.status, text))}
          ${(draft.globalSteps || []).map((step) => chip(contentBulkPatchFilePatchStepLabel(step, text))).join("")}
        </div>
      </div>
      <div class="editor-content-bulk-patch-draft-list">
        ${(draft.fileDrafts || []).map((entry) => renderContentBulkPatchFilePatchDraftFile(entry, text)).join("") || `<p class="muted">${escapeHtml(text.noFiles || "No patch drafts.")}</p>`}
      </div>
    </section>
  `;
}

function renderContentBulkPatchFilePatchDraftFile(entry, text = {}) {
  const blockLabels = (entry.patchBlocks || []).map((block) =>
    `${block.surface || block.id || "-"} - ${contentBulkPatchFilePatchOperationLabel(block.operation, text)} - ${block.anchorHint || "-"}`
  );
  return `
    <article class="editor-content-bulk-patch-draft-file" data-state="${escapeAttribute(entry.status || "unknown")}">
      <div class="editor-content-bulk-patch-draft-file-head">
        <div>
          <h5>${escapeHtml(`${entry.order || "-"} - ${entry.file || "-"}`)}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchFilePatchDraft.fileMeta", {
            surfaces: entry.surfaceCount || 0,
            staged: entry.stagedRowCount || 0,
            blocks: entry.patchBlocks?.length || 0,
            operation: contentBulkPatchFilePatchOperationLabel(entry.operation, text),
          }, `${entry.surfaceCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${chip(contentBulkPatchFilePatchStatusLabel(entry.status, text))}
          ${chip(contentBulkPatchFilePatchOperationLabel(entry.operation, text))}
        </div>
      </div>
      <div class="editor-content-bulk-patch-draft-grid">
        ${balanceDetailChipBlock(text.domains || "Domains", entry.domainIds || [])}
        ${balanceDetailChipBlock(text.anchorHints || "Anchor hints", entry.anchorHints || [])}
        ${balanceDetailChipBlock(text.patchBlocks || "Patch blocks", blockLabels)}
        ${balanceDetailChipBlock(text.postApplyChecks || "Post apply checks", (entry.postApplyChecks || []).map((step) => contentBulkPatchFilePatchStepLabel(step, text)))}
      </div>
    </article>
  `;
}

function contentBulkPatchFilePatchStatusLabel(statusId, text = {}) {
  return text.statusLabels?.[statusId] || statusId || "unknown";
}

function contentBulkPatchFilePatchStepLabel(stepId, text = {}) {
  return text.stepLabels?.[stepId] || stepId || "unknown";
}

function contentBulkPatchFilePatchOperationLabel(operationId, text = {}) {
  return text.operationLabels?.[operationId] || operationId || "unknown";
}

function renderContentBulkPatchFilePatchDraftExport(exportPreview, detailText = {}) {
  const text = detailText.contentBulkPatchFilePatchDraftExport || {};
  const summary = exportPreview.summary || {};
  const metrics = [
    [text.exportedFiles || "Exported files", `${summary.exportedFileCount || 0}`],
    [text.exportedBlocks || "Exported blocks", `${summary.exportedBlockCount || 0}`],
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount || 0}`],
    [text.updateDrafts || "Update drafts", `${summary.updateDraftCount || 0}`],
    [text.blockedDrafts || "Blocked drafts", `${summary.blockedDraftCount || 0}`],
    [text.preApplyReviewItems || "Pre-apply review", `${summary.preApplyReviewItemCount || 0}`],
    [text.preApplyBlockedItems || "Blocked pre-apply", `${summary.preApplyBlockedReviewItemCount || 0}`],
    [text.writes || "Writes", exportPreview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-patch-draft-export" data-readonly="${exportPreview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Draft Export")}">
      <div class="editor-content-bulk-patch-draft-export-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Draft Export")}</h4>
          <p class="muted">${escapeHtml(text.description || "Download a read-only file patch draft for review.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchFilePatchDraftExport.version", {
          version: exportPreview.version || "-"
        }, exportPreview.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-patch-draft-export-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-patch-draft-export-grid">
        ${balanceDetailChipBlock(text.preApplyReview || "Pre-apply review", contentBulkPatchPreApplyReviewChips(exportPreview.preApplyReview?.checklist, text))}
      </div>
      <div class="editor-content-bulk-patch-draft-export-actions">
        <div>
          <strong>${escapeHtml(text.source || "Source")}</strong>
          <span>${escapeHtml(summary.sourceName || "-")}</span>
        </div>
        <button type="button" data-content-bulk-file-patch-export>
          ${escapeHtml(text.download || "Download patch draft")}
        </button>
      </div>
    </section>
  `;
}

function renderContentBulkPatchApplyGatePlan(plan, detailText = {}) {
  const text = detailText.contentBulkPatchApplyGatePlan || {};
  const summary = plan.summary || {};
  const metrics = [
    [text.targetFiles || "Target files", `${summary.targetFileCount || 0}`],
    [text.patchBlocks || "Patch blocks", `${summary.patchBlockCount || 0}`],
    [text.gates || "Gates", `${summary.gateCount || 0}`],
    [text.rollbackSteps || "Rollback", `${summary.rollbackStepCount || 0}`],
    [text.validationSteps || "Validation", `${summary.validationStepCount || 0}`],
    [text.reviewItems || "Review items", `${summary.reviewItemCount || 0}`],
    [text.blockedReviewItems || "Blocked review", `${summary.blockedReviewItemCount || 0}`],
    [text.warningReviewItems || "Review warnings", `${summary.warningReviewItemCount || 0}`],
    [text.applyState || "Apply", plan.applyEnabled ? (text.enabled || "Enabled") : (text.disabled || "Disabled")],
  ];
  return `
    <section class="editor-content-bulk-apply-gate" data-state="${escapeAttribute(plan.status || "unknown")}" aria-label="${escapeAttribute(text.title || "Content Bulk Apply Gate")}">
      <div class="editor-content-bulk-apply-gate-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Apply Gate")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only apply gate plan. Live writer is disabled.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchApplyGatePlan.version", {
          version: plan.version || "-"
        }, plan.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-apply-gate-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${renderContentBulkIssueSummary(plan.issueSummary, text)}
      <div class="editor-content-bulk-apply-gate-grid">
        ${balanceDetailChipBlock(text.reviewChecklist || "Review checklist", (plan.reviewChecklist || []).map((item) =>
          `${contentBulkPatchApplyGateLabel(item.id, text.reviewLabels)} - ${contentBulkPatchApplyGateLabel(item.state, text.stateLabels)} - ${item.detail || "-"}`
        ))}
        ${balanceDetailChipBlock(text.blockedReasons || "Blocked reasons", (plan.blockedReasons || []).map((reason) => contentBulkPatchApplyGateLabel(reason, text.blockedReasonLabels)))}
        ${balanceDetailChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(plan.issueSummary?.blockingIssueCodes, text))}
        ${balanceDetailChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(plan.issueSummary?.warningIssueCodes, text))}
        ${balanceDetailChipBlock(text.gateList || "Gate list", (plan.gates || []).map((gate) => `${contentBulkPatchApplyGateLabel(gate.id, text.gateLabels)} - ${contentBulkPatchApplyGateLabel(gate.state, text.stateLabels)}`))}
        ${balanceDetailChipBlock(text.rollbackPlan || "Rollback plan", (plan.rollbackSteps || []).map((step) => contentBulkPatchApplyGateLabel(step, text.rollbackLabels)))}
        ${balanceDetailChipBlock(text.validationPlan || "Validation plan", (plan.validationSteps || []).map((step) => contentBulkPatchApplyGateLabel(step, text.validationLabels)))}
      </div>
    </section>
  `;
}

function contentBulkPatchApplyGateLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function renderContentBulkPatchBackupPlan(plan, detailText = {}) {
  const text = detailText.contentBulkPatchBackupPlan || {};
  const summary = plan.summary || {};
  const artifacts = plan.artifactNames || {};
  const metrics = [
    [text.targetFiles || "Target files", `${summary.targetFileCount || 0}`],
    [text.patchBlocks || "Patch blocks", `${summary.patchBlockCount || 0}`],
    [text.pendingBackups || "Pending backups", `${summary.pendingBackupCount || 0}`],
    [text.backupSteps || "Backup steps", `${summary.backupStepCount || 0}`],
    [text.restoreSteps || "Restore steps", `${summary.restoreStepCount || 0}`],
    [text.preApplyReviewItems || "Pre-apply review", `${summary.preApplyReviewItemCount || 0}`],
    [text.preApplyBlockedItems || "Blocked pre-apply", `${summary.preApplyBlockedReviewItemCount || 0}`],
    [text.backupState || "Backup", plan.backupEnabled ? (text.enabled || "Enabled") : (text.disabled || "Disabled")],
  ];
  const fileRows = (plan.fileBackups || []).slice(0, 6).map((file) => `
    <article class="editor-content-bulk-backup-plan-file">
      <div>
        <strong>${escapeHtml(file.file || "-")}</strong>
        <span>${escapeHtml((file.domainIds || []).join(", ") || "-")}</span>
      </div>
      <small>${escapeHtml(contentBulkPatchBackupPlanLabel(file.backupState, text.stateLabels))} / ${escapeHtml(contentBulkPatchBackupPlanLabel(file.restoreState, text.stateLabels))}</small>
      <div class="editor-chip-list">${(file.reviewBlockerCodes || []).map((code) => chip(contentBulkPatchBackupPlanLabel(code, text.fileReviewBlockerLabels))).join("")}</div>
    </article>
  `).join("");

  return `
    <section class="editor-content-bulk-backup-plan" data-state="${escapeAttribute(plan.status || "unknown")}" aria-label="${escapeAttribute(text.title || "Content Bulk Backup Plan")}">
      <div class="editor-content-bulk-backup-plan-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Backup Plan")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only backup snapshot plan. Backup writer is disabled.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchBackupPlan.version", {
          version: plan.version || "-"
        }, plan.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-backup-plan-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-backup-plan-artifacts">
        <span><small>${escapeHtml(text.backupArchive || "Backup archive")}</small><b>${escapeHtml(artifacts.backupArchive || "-")}</b></span>
        <span><small>${escapeHtml(text.snapshotManifest || "Snapshot manifest")}</small><b>${escapeHtml(artifacts.snapshotManifest || "-")}</b></span>
        <span><small>${escapeHtml(text.restoreReport || "Restore report")}</small><b>${escapeHtml(artifacts.restoreReport || "-")}</b></span>
      </div>
      <div class="editor-content-bulk-backup-plan-grid">
        ${balanceDetailChipBlock(text.preApplyReview || "Pre-apply review", contentBulkPatchPreApplyReviewChips(plan.preApplyReviewItems, text))}
        ${balanceDetailChipBlock(text.blockedReasons || "Blocked reasons", (plan.blockedReasons || []).map((reason) => contentBulkPatchBackupPlanLabel(reason, text.blockedReasonLabels)))}
        ${balanceDetailChipBlock(text.backupPlan || "Backup plan", (plan.backupSteps || []).map((step) => contentBulkPatchBackupPlanLabel(step, text.backupStepLabels)))}
        ${balanceDetailChipBlock(text.restorePlan || "Restore plan", (plan.restoreSteps || []).map((step) => contentBulkPatchBackupPlanLabel(step, text.restoreStepLabels)))}
      </div>
      <div class="editor-content-bulk-backup-plan-files">
        <strong>${escapeHtml(text.targetFilePreview || "Target file preview")}</strong>
        ${fileRows || `<p class="muted">${escapeHtml(text.emptyFiles || "No target files.")}</p>`}
      </div>
    </section>
  `;
}

function contentBulkPatchBackupPlanLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function renderContentBulkPatchRestoreRehearsal(rehearsal, detailText = {}) {
  const text = detailText.contentBulkPatchRestoreRehearsal || {};
  const summary = rehearsal.summary || {};
  const metrics = [
    [text.targetFiles || "Target files", `${summary.targetFileCount || 0}`],
    [text.mappedRestores || "Mapped restores", `${summary.mappedRestoreCount || 0}`],
    [text.missingRestores || "Missing restores", `${summary.missingRestoreCount || 0}`],
    [text.restoreSteps || "Restore steps", `${summary.restoreStepCount || 0}`],
    [text.validationSteps || "Validation", `${summary.validationStepCount || 0}`],
    [text.preApplyReviewItems || "Pre-apply review", `${rehearsal.preApplyReviewSummary?.reviewItemCount || 0}`],
    [text.preApplyBlockedItems || "Blocked pre-apply", `${rehearsal.preApplyReviewSummary?.blockedReviewItemCount || 0}`],
    [text.restoreState || "Restore", rehearsal.restoreEnabled ? (text.enabled || "Enabled") : (text.disabled || "Disabled")],
  ];
  const restoreRows = (rehearsal.restoreActions || []).slice(0, 6).map((action) => `
    <article class="editor-content-bulk-restore-rehearsal-file">
      <div>
        <strong>${escapeHtml(action.file || "-")}</strong>
        <span>${escapeHtml((action.domainIds || []).join(", ") || "-")}</span>
      </div>
      <small>${escapeHtml(contentBulkPatchRestoreRehearsalLabel(action.restoreState, text.stateLabels))} / ${escapeHtml(contentBulkPatchRestoreRehearsalLabel(action.checkState, text.stateLabels))}</small>
      <div class="editor-chip-list">${(action.rehearsalBlockerCodes || []).map((code) => chip(contentBulkPatchRestoreRehearsalLabel(code, text.fileRehearsalBlockerLabels))).join("")}</div>
    </article>
  `).join("");

  return `
    <section class="editor-content-bulk-restore-rehearsal" data-state="${escapeAttribute(rehearsal.status || "unknown")}" aria-label="${escapeAttribute(text.title || "Content Bulk Restore Rehearsal")}">
      <div class="editor-content-bulk-restore-rehearsal-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Restore Rehearsal")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only restore rehearsal. Restore writer is disabled.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchRestoreRehearsal.version", {
          version: rehearsal.version || "-"
        }, rehearsal.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-restore-rehearsal-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-content-bulk-restore-rehearsal-grid">
        ${balanceDetailChipBlock(text.preApplyReview || "Pre-apply review", contentBulkPatchPreApplyReviewChips(rehearsal.preApplyReviewItems, text))}
        ${balanceDetailChipBlock(text.blockedReasons || "Blocked reasons", (rehearsal.blockedReasons || []).map((reason) => contentBulkPatchRestoreRehearsalLabel(reason, text.blockedReasonLabels)))}
        ${balanceDetailChipBlock(text.validationPlan || "Validation plan", (rehearsal.validationSteps || []).map((step) => contentBulkPatchRestoreRehearsalLabel(step, text.validationLabels)))}
      </div>
      <div class="editor-content-bulk-restore-rehearsal-files">
        <strong>${escapeHtml(text.restoreFilePreview || "Restore file preview")}</strong>
        ${restoreRows || `<p class="muted">${escapeHtml(text.emptyFiles || "No restore actions.")}</p>`}
      </div>
    </section>
  `;
}

function contentBulkPatchRestoreRehearsalLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function contentBulkPatchPreApplyReviewChips(items = [], text = {}) {
  return (items || []).map((item) =>
    `${contentBulkPatchPreApplyReviewLabel(item.id, text.preApplyReviewLabels)} - ${contentBulkPatchPreApplyReviewLabel(item.state, text.preApplyStateLabels)} - ${item.detail || "-"}`
  );
}

function contentBulkPatchPreApplyReviewLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function renderBalanceGroupRow(group, detailText = {}) {
  const preview = BALANCE_TUNING_PREVIEW_BY_ID.get(group.id);
  return `
    <article class="editor-balance-row">
      <div class="editor-balance-row-head">
        <div>
          <h4>${escapeHtml(group.id)}</h4>
          <span>${escapeHtml(group.scope)}</span>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.exportCount", { count: group.exports.length }, `${group.exports.length}`))}</strong>
      </div>
      ${balanceDetailChipBlock(detailText.files || "Files", group.files)}
      ${balanceDetailChipBlock(detailText.exports || "Exports", group.exports)}
      ${balanceDetailChipBlock(detailText.affects || "Affects", group.affects)}
      ${balanceDetailPreviewBlock(detailText.preview || "Preview", preview?.items || [], detailText)}
    </article>
  `;
}

function renderBalanceFilterControls(detailText = {}, visibleCount = 0, totalCount = 0) {
  const filterSummary = balanceFilterSummary(detailText);
  return `
    <div class="editor-balance-controls">
      <label class="editor-balance-search">
        <span>${escapeHtml(detailText.searchLabel || "Search")}</span>
        <input type="search" data-balance-search value="${escapeAttribute(balanceDetailFilter.query)}" placeholder="${escapeAttribute(detailText.searchPlaceholder || "")}" />
      </label>
      <div class="editor-balance-filter-buttons" role="group" aria-label="${escapeAttribute(detailText.scopeFilter || "Scope Filter")}">
        ${balanceScopeButton("all", detailText.allScopes || "All")}
        ${balanceScopeButton("engine-balance", "engine-balance")}
        ${balanceScopeButton("content-balance", "content-balance")}
      </div>
      <button class="editor-balance-reset" type="button" data-balance-reset>
        ${escapeHtml(detailText.reset || "Reset")}
      </button>
      <span class="editor-balance-count">
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.visibleCount", {
          visible: visibleCount,
          total: totalCount
        }, `${visibleCount}/${totalCount}`))}</strong>
        ${filterSummary ? `<small>${escapeHtml(filterSummary)}</small>` : ""}
      </span>
    </div>
  `;
}

function renderBalanceRelatedChecks(checks = [], detailText = {}) {
  if (!checks.length) return "";
  const rows = checks.map((check) => {
    const guards = Array.isArray(check.guards) ? check.guards : [];
    return `
      <article class="editor-balance-check">
        <div>
          <h4>${escapeHtml(check.label || check.id || "")}</h4>
          <span>${escapeHtml(check.script || "")}</span>
        </div>
        ${balanceDetailChipBlock(detailText.guards || "Guards", guards)}
      </article>
    `;
  }).join("");
  return `
    <div class="editor-balance-check-list" aria-label="${escapeAttribute(detailText.relatedChecks || "Related checks")}">
      <strong>${escapeHtml(detailText.relatedChecks || "")}</strong>
      ${rows}
    </div>
  `;
}

function balanceDetailChipBlock(title, values = []) {
  return `
    <div class="editor-balance-chip-block">
      <span>${escapeHtml(title)}</span>
      <div class="editor-chip-list">${values.map((value) => chip(value)).join("")}</div>
    </div>
  `;
}

function balanceDetailPreviewBlock(title, items = [], detailText = {}) {
  if (!items.length) return "";
  return `
    <div class="editor-balance-preview-block">
      <span>${escapeHtml(title)}</span>
      <div class="editor-chip-list">
        ${items.map((item) => chip(`${item.exportName}: ${formatBalancePreviewSummary(item, detailText)}`)).join("")}
      </div>
    </div>
  `;
}

function formatBalancePreviewSummary(item, detailText = {}) {
  const sample = Array.isArray(item.sample) ? item.sample.join(", ") : "";
  if (item.type === "array") {
    return tf("editorPrep.balanceTuningDetail.previewArray", {
      count: item.count || 0,
      sample: sample || "-"
    }, `${item.count || 0}`);
  }
  if (item.type === "object") {
    return tf("editorPrep.balanceTuningDetail.previewObject", {
      count: item.count || 0,
      sample: sample || "-"
    }, `${item.count || 0}`);
  }
  if (item.type === "missing") {
    return detailText.previewMissing || "Missing";
  }
  return tf("editorPrep.balanceTuningDetail.previewValue", {
    value: item.value || ""
  }, item.value || "");
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

function balanceScopeButton(scope, label) {
  const active = normalizeBalanceScope(balanceDetailFilter.scope) === scope;
  return `
    <button class="editor-balance-filter${active ? " is-active" : ""}" type="button" data-balance-scope="${escapeAttribute(scope)}" aria-pressed="${active ? "true" : "false"}">
      ${escapeHtml(label)}
    </button>
  `;
}

function balanceFilterSummary(detailText = {}) {
  const scope = normalizeBalanceScope(balanceDetailFilter.scope);
  const query = String(balanceDetailFilter.query || "").trim();
  const candidateLabel = String(balanceDetailFilter.candidateLabel || "").trim();

  if (candidateLabel) {
    return tf("editorPrep.balanceTuningDetail.activeCandidate", {
      candidate: candidateLabel
    }, candidateLabel);
  }

  if (scope !== "all" && query) {
    return tf("editorPrep.balanceTuningDetail.activeFilterAndSearch", {
      filter: scope,
      query
    }, `${scope} · ${query}`);
  }

  if (scope !== "all") {
    return tf("editorPrep.balanceTuningDetail.activeFilter", {
      filter: scope
    }, scope);
  }

  if (query) {
    return tf("editorPrep.balanceTuningDetail.activeSearch", {
      query
    }, query);
  }

  return "";
}

function emptyBalanceRows(detailText = {}) {
  const query = String(balanceDetailFilter.query || "").trim();
  const scope = normalizeBalanceScope(balanceDetailFilter.scope);
  const candidateLabel = String(balanceDetailFilter.candidateLabel || "").trim();
  let message = detailText.empty || "";
  if (candidateLabel) {
    message = tf("editorPrep.balanceTuningDetail.emptyByCandidate", {
      candidate: candidateLabel
    }, message);
  } else if (scope !== "all" && query) {
    message = tf("editorPrep.balanceTuningDetail.emptyByFilterAndSearch", {
      filter: scope,
      query
    }, message);
  } else if (scope !== "all") {
    message = tf("editorPrep.balanceTuningDetail.emptyByFilter", {
      filter: scope
    }, message);
  } else if (query) {
    message = tf("editorPrep.balanceTuningDetail.emptyBySearch", {
      query
    }, message);
  }

  return `
    <p class="editor-balance-empty">
      <span>${escapeHtml(message)}</span>
      <small>${escapeHtml(detailText.emptyResetHint || "")}</small>
    </p>
  `;
}

function renderRetargetPreviewDetail() {
  const preview = createMurimRetargetPreview();
  const detailText = EDITOR_TEXT.retargetDetail || {};
  const textEntries = preview.textOverrides
    .map((entry) => createRetargetTextRow(entry, detailText))
    .filter((entry) => matchesRetargetFilter(entry));
  const assetEntries = preview.assetOverrides
    .map((entry) => createRetargetAssetRow(entry, detailText))
    .filter((entry) => matchesRetargetFilter(entry));
  const textRows = textEntries.map((entry) => entry.html).join("");
  const assetRows = assetEntries.map((entry) => entry.html).join("");
  const visibleTextCount = textEntries.length;
  const visibleAssetCount = assetEntries.length;
  const visibleCount = visibleTextCount + visibleAssetCount;
  const totalCount = preview.counts.textOverrides + preview.counts.assetOverrides;
  const filterSummary = retargetFilterSummary(detailText);

  return `
    <section class="editor-retarget-detail" aria-label="${escapeAttribute(detailText.title || "Retarget Preview Detail")}">
      <div class="editor-retarget-head">
        <div>
          <h3>${escapeHtml(detailText.title || "")}</h3>
          <p class="muted">${escapeHtml(preview.description)}</p>
        </div>
        <span>${escapeHtml(preview.isComplete ? (detailText.ready || "") : (detailText.review || ""))}</span>
      </div>
      <div class="editor-retarget-summary">
        <strong>${escapeHtml(preview.title)}</strong>
        <span>${escapeHtml(tf("editorPrep.retargetDetail.route", {
          source: preview.sourceProfileId,
          target: preview.targetProfileId
        }, `${preview.sourceProfileId} -> ${preview.targetProfileId}`))}</span>
        <span>${escapeHtml(tf("editorPrep.retargetDetail.counts", {
          textCount: preview.counts.textOverrides,
          assetCount: preview.counts.assetOverrides,
          missingText: preview.counts.missingTextTargets,
          missingAssets: preview.counts.missingAssetTargets,
          mismatchedAssets: preview.counts.mismatchedAssetTargets
        }, ""))}</span>
      </div>
      <div class="editor-retarget-controls">
        <label class="editor-retarget-search">
          <span>${escapeHtml(detailText.searchLabel || "Search")}</span>
          <input type="search" data-retarget-search value="${escapeAttribute(retargetDetailFilter.query)}" placeholder="${escapeAttribute(detailText.searchPlaceholder || "")}" />
        </label>
        <div class="editor-retarget-filter-buttons" role="group" aria-label="${escapeAttribute(detailText.typeFilter || "Type Filter")}">
          ${retargetKindButton("all", detailText.all || "All")}
          ${retargetKindButton("text", detailText.textOnly || "Text")}
          ${retargetKindButton("asset", detailText.assetOnly || "Assets")}
        </div>
        <button class="editor-retarget-reset" type="button" data-retarget-reset>
          ${escapeHtml(detailText.reset || "Reset")}
        </button>
        <span class="editor-retarget-count">
          <strong>${escapeHtml(tf("editorPrep.retargetDetail.visibleCount", {
            visible: visibleCount,
            total: totalCount
          }, `${visibleCount}/${totalCount}`))}</strong>
          ${filterSummary ? `<small>${escapeHtml(filterSummary)}</small>` : ""}
        </span>
      </div>
      <div class="editor-retarget-grid">
        <section>
          <h4>${escapeHtml(tf("editorPrep.retargetDetail.textTitle", { count: preview.counts.textOverrides }, ""))}</h4>
          <div class="editor-retarget-list">${textRows || emptyRetargetRows(detailText, "text")}</div>
        </section>
        <section>
          <h4>${escapeHtml(tf("editorPrep.retargetDetail.assetTitle", { count: preview.counts.assetOverrides }, ""))}</h4>
          <div class="editor-retarget-list">${assetRows || emptyRetargetRows(detailText, "asset")}</div>
        </section>
      </div>
    </section>
  `;
}

function createRetargetTextRow(entry, detailText) {
  const rowId = `text:${entry.sourcePath}`;
  const expanded = expandedRetargetRows.has(rowId);
  const searchText = [
    "text",
    entry.sourcePath,
    entry.sourceText,
    entry.targetTextPath,
    entry.targetText
  ].join(" ").toLowerCase();
  return {
    kind: "text",
    searchText,
    html: `
      <article class="editor-retarget-row${expanded ? " is-expanded" : ""}" data-retarget-row-kind="text">
        ${retargetRowHeader(rowId, expanded, detailText)}
        <div class="editor-retarget-body">
          <div>
            <span>${escapeHtml(detailText.sourcePath || "Source")}</span>
            <code>${escapeHtml(entry.sourcePath)}</code>
          </div>
          <div>
            <span>${escapeHtml(detailText.targetTextPath || "Target")}</span>
            <code>${escapeHtml(entry.targetTextPath)}</code>
          </div>
          <p>${escapeHtml(entry.targetText || "")}</p>
        </div>
      </article>
    `
  };
}

function createRetargetAssetRow(entry, detailText) {
  const rowId = `asset:${entry.sourceAssetId}`;
  const expanded = expandedRetargetRows.has(rowId);
  const summary = tf("editorPrep.retargetDetail.assetSummary", {
    plannedFile: entry.plannedWebpFile || entry.plannedSourceFile || "-",
    mappedTarget: entry.mappedTargetAssetId || "-",
    slotCount: entry.slotPaths.length
  }, "");
  const searchText = [
    "asset",
    entry.sourceAssetId,
    entry.targetAssetId,
    entry.plannedSourceFile,
    entry.plannedWebpFile,
    entry.mappedTargetAssetId,
    ...entry.slotPaths
  ].join(" ").toLowerCase();
  return {
    kind: "asset",
    searchText,
    html: `
      <article class="editor-retarget-row${expanded ? " is-expanded" : ""}" data-retarget-row-kind="asset">
        ${retargetRowHeader(rowId, expanded, detailText)}
        <div class="editor-retarget-body">
          <div>
            <span>${escapeHtml(detailText.sourceAsset || "Source Asset")}</span>
            <code>${escapeHtml(entry.sourceAssetId)}</code>
          </div>
          <div>
            <span>${escapeHtml(detailText.targetAsset || "Target Asset")}</span>
            <code>${escapeHtml(entry.targetAssetId)}</code>
          </div>
          <p>${escapeHtml(summary)}</p>
          <div class="editor-chip-list">${entry.slotPaths.map((slotPath) => chip(slotPath)).join("")}</div>
        </div>
      </article>
    `
  };
}

function retargetRowHeader(rowId, expanded, detailText) {
  return `
    <div class="editor-retarget-row-head">
      <span>${escapeHtml(rowId.startsWith("asset:") ? (detailText.assetRow || "Asset") : (detailText.textRow || "Text"))}</span>
      <button class="editor-retarget-toggle" type="button" data-retarget-toggle="${escapeAttribute(rowId)}" aria-expanded="${expanded ? "true" : "false"}">
        ${escapeHtml(expanded ? (detailText.collapse || "Collapse") : (detailText.expand || "Expand"))}
      </button>
    </div>
  `;
}

function matchesRetargetFilter(entry) {
  const kind = retargetDetailFilter.kind || "all";
  const query = normalizeSearchText(retargetDetailFilter.query);
  if (kind !== "all" && entry.kind !== kind) return false;
  return !query || entry.searchText.includes(query);
}

function retargetKindButton(kind, label) {
  const active = (retargetDetailFilter.kind || "all") === kind;
  return `
    <button class="editor-retarget-filter${active ? " is-active" : ""}" type="button" data-retarget-kind="${escapeAttribute(kind)}" aria-pressed="${active ? "true" : "false"}">
      ${escapeHtml(label)}
    </button>
  `;
}

function retargetFilterSummary(detailText) {
  const filterKind = normalizeRetargetKind(retargetDetailFilter.kind);
  const query = String(retargetDetailFilter.query || "").trim();
  const filterLabel = filterKind === "asset" ? (detailText.assetOnly || "Assets") : (detailText.textOnly || "Text");

  if (filterKind !== "all" && query) {
    return tf("editorPrep.retargetDetail.activeFilterAndSearch", {
      filter: filterLabel,
      query
    }, `${filterLabel} · ${query}`);
  }

  if (filterKind !== "all") {
    return tf("editorPrep.retargetDetail.activeFilter", {
      filter: filterLabel
    }, filterLabel);
  }

  if (query) {
    return tf("editorPrep.retargetDetail.activeSearch", {
      query
    }, query);
  }

  return "";
}

function emptyRetargetRows(detailText, sectionKind) {
  const filterKind = normalizeRetargetKind(retargetDetailFilter.kind);
  const query = String(retargetDetailFilter.query || "").trim();
  const sectionLabel = sectionKind === "asset" ? (detailText.assetOnly || "Assets") : (detailText.textOnly || "Text");
  const filterLabel = filterKind === "asset" ? (detailText.assetOnly || "Assets") : (detailText.textOnly || "Text");
  let message = detailText.empty || "";
  let showResetHint = false;

  if (filterKind !== "all" && filterKind !== sectionKind) {
    message = tf("editorPrep.retargetDetail.emptyByType", {
      filter: filterLabel,
      section: sectionLabel
    }, message);
    showResetHint = true;
  } else if (query) {
    message = tf("editorPrep.retargetDetail.emptyBySearch", {
      query
    }, message);
    showResetHint = true;
  }

  return `
    <p class="editor-retarget-empty">
      <span>${escapeHtml(message)}</span>
      ${showResetHint ? `<small>${escapeHtml(detailText.emptyResetHint || "")}</small>` : ""}
    </p>
  `;
}

function renderAssets() {
  const imageSlots = manifest.assetSlots?.image || [];
  const audioSlots = manifest.assetSlots?.audio || [];
  elements.assetGrid.innerHTML = [
    assetSection(EDITOR_TEXT.assetTypes.image, imageSlots),
    assetSection(EDITOR_TEXT.assetTypes.audio, audioSlots)
  ].join("");
}

function renderSaveKeys() {
  const summary = createSaveSummary();
  elements.saveGrid.innerHTML = summary.keys.map((item) => `
    <article class="editor-save-card">
      <strong>${escapeHtml(item.key)}</strong>
      <span>${item.exists ? EDITOR_TEXT.save.saved : EDITOR_TEXT.save.empty}</span>
      <small>${escapeHtml(item.detail)}</small>
    </article>
  `).join("");
}

function renderBacklog() {
  const items = backlog.items || [];
  elements.backlogList.innerHTML = items.map((item) => `
    <article class="editor-backlog-card" data-status="${escapeAttribute(item.status || "planned")}">
      <div class="editor-backlog-head">
        <div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.summary || "")}</p>
        </div>
        <span>${escapeHtml(statusLabel(item.status))}</span>
      </div>
      <div class="editor-chip-list">${(item.editorHooks || []).map((hook) => chip(hook)).join("")}</div>
    </article>
  `).join("");
}

function renderPrototypeList() {
  const items = manifest.prototypeListMemory || [];
  elements.prototypeList.innerHTML = items.map((item) => `
    <article class="editor-backlog-card">
      <div class="editor-backlog-head">
        <div>
          <h3>${escapeHtml(item.label)}</h3>
          <p>${escapeHtml(item.id)}</p>
        </div>
        <span>${escapeHtml(tf("editorPrep.save.count", { count: (item.keepForEditor || []).length }))}</span>
      </div>
      <div class="editor-chip-list">${(item.keepForEditor || []).map((value) => chip(value)).join("")}</div>
    </article>
  `).join("");
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

function assetSection(title, slots = []) {
  return `
    <section class="editor-asset-section">
      <h3>${escapeHtml(tf("editorPrep.assetTypes.slotTitle", { title }))}</h3>
      ${slots.map((slot) => `
        <article class="editor-asset-card">
          <div>
            <strong>${escapeHtml(slot.label)}</strong>
            <span>${escapeHtml(slot.slotId)}</span>
          </div>
          <code>${escapeHtml(slot.folder || "")}${escapeHtml(slot.expectedFileName || "")}</code>
          <small>${escapeHtml(slot.cropPreset || "audio")} · ${escapeHtml(slot.dataTarget || "")}</small>
        </article>
      `).join("")}
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



