import { applyDomLocalization } from "../localization/domText.js?v=437";
import { getLocaleText, tf } from "../localization/index.js?v=437";
import { createMurimRetargetPreview } from "../ui/renderRetargetPreview.js?v=437";
import { BALANCE_TUNING_DOMAIN_SUMMARIES, BALANCE_TUNING_GROUPS } from "../balance/balanceTuningRegistry.js?v=437";
import { createBalanceTuningPreviewRows } from "./balanceTuningPreview.js?v=437";
import { createTutorialIslandPacingSnapshot } from "./tutorialIslandPacingPreview.js?v=437";
import { createCombatVfxPlacementPreview } from "./combatVfxPlacementPreview.js?v=437";
import { createMonsterCandidateRewardPreview } from "./monsterCandidateRewardPreview.js?v=437";
import { createMonsterCandidatePromotionChecklist } from "./monsterCandidatePromotionChecklist.js?v=437";
import {
  createMonsterSpriteReadyConnectionPatchPlan,
  createMonsterSpriteReadyConnectionReview,
  createMonsterSpriteSlotReport,
} from "./monsterSpriteSlotReport.js?v=437";

const EDITOR_VERSION = "437";
const MANIFEST_URL = `data/editor-manifest.json?v=${EDITOR_VERSION}`;
const BACKLOG_URL = `data/editor-backlog.json?v=${EDITOR_VERSION}`;
const EDITOR_TEXT = getLocaleText().editorPrep;
const BALANCE_TUNING_PREVIEW_BY_ID = new Map(
  createBalanceTuningPreviewRows(BALANCE_TUNING_GROUPS).map((row) => [row.id, row])
);
const MONSTER_CANDIDATE_REWARD_PREVIEW = createMonsterCandidateRewardPreview();
const MONSTER_CANDIDATE_PROMOTION_CHECKLIST = createMonsterCandidatePromotionChecklist(MONSTER_CANDIDATE_REWARD_PREVIEW);
const COMBAT_VFX_PLACEMENT_PREVIEW = createCombatVfxPlacementPreview();
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
  effectMetric: "Effect Types",
  tuningMetric: "Tuning Signals",
  tuningTitle: "Tuning Signal Summary",
  tuningDescription: "Review wide or offset-heavy placements first before manual VFX tuning.",
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
  "project_regressor_editor_combat_vfx_filter"
];
const RETARGET_FILTER_STORAGE_KEY = "project_regressor_editor_retarget_filter";
const BALANCE_FILTER_STORAGE_KEY = "project_regressor_editor_balance_filter";
const COMBAT_VFX_FILTER_STORAGE_KEY = "project_regressor_editor_combat_vfx_filter";

let manifest = null;
let backlog = null;
let activePanelId = "";
const storedRetargetDetailFilter = loadRetargetDetailFilter();
let retargetDetailFilter = storedRetargetDetailFilter.filter;
const expandedRetargetRows = new Set(storedRetargetDetailFilter.expandedRows);
let balanceDetailFilter = loadBalanceDetailFilter();
let combatVfxDetailFilter = loadCombatVfxDetailFilter();
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
    }
  });
  elements.panelDetail?.addEventListener("click", (event) => {
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
        ${combatVfxSummaryCard(detailText.effectMetric, String(totals.effectTypes || 0))}
        ${combatVfxSummaryCard(detailText.tuningMetric, String(totals.tuningCandidates || tuningCandidates.length))}
      </div>
      ${renderCombatVfxTuningSignals(tuningCandidates, detailText)}
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
      ${renderActiveBalanceCandidateSummary(detailText, relatedChecks)}
      ${renderBalanceDomainSummaries(BALANCE_TUNING_DOMAIN_SUMMARIES, detailText, relatedChecks)}
      ${renderBalancePacingSnapshot(pacingSnapshot, detailText)}
      ${renderMonsterCandidateRewardPreview(MONSTER_CANDIDATE_REWARD_PREVIEW, detailText)}
      ${renderMonsterCandidatePromotionChecklist(MONSTER_CANDIDATE_PROMOTION_CHECKLIST, detailText)}
      ${renderBalanceTuningCandidates(tuningCandidates, detailText, relatedChecks)}
      ${renderBalanceRelatedChecks(relatedChecks, detailText)}
      <div class="editor-balance-list">
        ${rows || emptyBalanceRows(detailText)}
      </div>
    </section>
  `;
}

function renderActiveBalanceCandidateSummary(detailText = {}, relatedChecks = []) {
  const candidate = selectedBalanceTuningCandidate();
  if (!candidate) return "";
  const impact = balanceCandidateImpactSummary(candidate);
  const valueRanges = balanceCandidateValueRangeLabels(candidate, detailText);
  const checkLabels = balanceCandidateCheckLabels(candidate, relatedChecks);
  return `
    <section class="editor-balance-active-candidate" aria-label="${escapeAttribute(detailText.activeCandidateSummary || "Selected tuning candidate")}">
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

function balanceActiveCandidateMetric(label, value) {
  return `
    <span>
      <small>${escapeHtml(label)}</small>
      <b>${escapeHtml(value || "-")}</b>
    </span>
  `;
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
    row.isBoss ? (text.boss || "Boss") : "",
  ].filter(Boolean);
  const actionLabels = (row.requiredActionIds || []).map((actionId) => monsterCandidatePromotionActionLabel(actionId, text));
  const riskLabels = (row.riskSignalIds || []).map((signalId) => monsterCandidatePromotionRiskLabel(signalId, text));

  return `
    <article class="editor-monster-candidate-promotion-row" data-state="${row.readyForReview ? "ready" : "blocked"}">
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
        ${balanceDetailChipBlock(text.actionPlan || "Actions", actionLabels)}
        ${balanceDetailChipBlock(text.rewardLinks || "Reward links", row.rewardItemIds?.length ? row.rewardItemIds : [text.emptyReward || "None"])}
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
