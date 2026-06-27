import { applyDomLocalization } from "../localization/domText.js?v=364";
import { getLocaleText, tf } from "../localization/index.js?v=364";
import { createMurimRetargetPreview } from "../ui/renderRetargetPreview.js?v=364";
import { BALANCE_TUNING_GROUPS } from "../balance/balanceTuningRegistry.js?v=364";
import { createBalanceTuningPreviewRows } from "./balanceTuningPreview.js?v=364";

const EDITOR_VERSION = "364";
const MANIFEST_URL = `data/editor-manifest.json?v=${EDITOR_VERSION}`;
const BACKLOG_URL = `data/editor-backlog.json?v=${EDITOR_VERSION}`;
const EDITOR_TEXT = getLocaleText().editorPrep;
const BALANCE_TUNING_PREVIEW_BY_ID = new Map(
  createBalanceTuningPreviewRows(BALANCE_TUNING_GROUPS).map((row) => [row.id, row])
);

const SAVE_KEYS = [
  "project_regressor_mvp_save",
  "project_regressor_save_slots",
  "project_regressor_active_save_slot",
  "project_regressor_ui_state",
  "project_regressor_editor_retarget_filter",
  "project_regressor_editor_balance_filter"
];
const RETARGET_FILTER_STORAGE_KEY = "project_regressor_editor_retarget_filter";
const BALANCE_FILTER_STORAGE_KEY = "project_regressor_editor_balance_filter";

let manifest = null;
let backlog = null;
let activePanelId = "";
const storedRetargetDetailFilter = loadRetargetDetailFilter();
let retargetDetailFilter = storedRetargetDetailFilter.filter;
const expandedRetargetRows = new Set(storedRetargetDetailFilter.expandedRows);
let balanceDetailFilter = loadBalanceDetailFilter();

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
        query: balanceInput.value
      };
      persistBalanceDetailFilter();
      renderPanelDetail();
      const nextInput = elements.panelDetail.querySelector("[data-balance-search]");
      if (nextInput) {
        nextInput.focus();
        nextInput.setSelectionRange(cursor, cursor);
      }
    }
  });
  elements.panelDetail?.addEventListener("click", (event) => {
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
        scope: normalizeBalanceScope(balanceScopeButton.dataset.balanceScope)
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
    balanceRegistryMetricCard()
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
  `;
}

function renderBalanceTuningDetail() {
  const detailText = EDITOR_TEXT.balanceTuningDetail || {};
  const registryMeta = manifest.balanceTuningRegistry || {};
  const relatedChecks = Array.isArray(registryMeta.relatedChecks) ? registryMeta.relatedChecks : [];
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
      ${renderBalanceRelatedChecks(relatedChecks, detailText)}
      <div class="editor-balance-list">
        ${rows || emptyBalanceRows(detailText)}
      </div>
    </section>
  `;
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
  if (scope !== "all" && group.scope !== scope) return false;
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
  let message = detailText.empty || "";
  if (scope !== "all" && query) {
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

function loadBalanceDetailFilter() {
  try {
    const raw = window.localStorage.getItem(BALANCE_FILTER_STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : null;
    return {
      scope: normalizeBalanceScope(parsed?.scope),
      query: typeof parsed?.query === "string" ? parsed.query : ""
    };
  } catch {
    return {
      scope: "all",
      query: ""
    };
  }
}

function persistBalanceDetailFilter() {
  try {
    window.localStorage.setItem(BALANCE_FILTER_STORAGE_KEY, JSON.stringify({
      scope: normalizeBalanceScope(balanceDetailFilter.scope),
      query: String(balanceDetailFilter.query || "")
    }));
  } catch {
    // Editor convenience state is optional; failed persistence should not block the read-only screen.
  }
}

function resetBalanceDetailFilter() {
  balanceDetailFilter = {
    scope: "all",
    query: ""
  };
  try {
    window.localStorage.removeItem(BALANCE_FILTER_STORAGE_KEY);
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
