import { applyDomLocalization } from "../localization/domText.js?v=327";
import { getLocaleText, tf } from "../localization/index.js?v=327";

const EDITOR_VERSION = "250";
const MANIFEST_URL = `data/editor-manifest.json?v=${EDITOR_VERSION}`;
const BACKLOG_URL = `data/editor-backlog.json?v=${EDITOR_VERSION}`;
const EDITOR_TEXT = getLocaleText().editorPrep;

const SAVE_KEYS = [
  "project_regressor_mvp_save",
  "project_regressor_save_slots",
  "project_regressor_active_save_slot",
  "project_regressor_ui_state"
];

let manifest = null;
let backlog = null;
let activePanelId = "";

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

  setText(elements.summaryTitle, EDITOR_TEXT.summaryTitle);
  setText(elements.summaryCopy, EDITOR_TEXT.summaryCopy);

  elements.metrics.innerHTML = [
    localizedMetricCard("panel", panelCount),
    localizedMetricCard("imageSlot", imageCount),
    localizedMetricCard("audioSlot", audioCount),
    localizedMetricCard("backlog", backlogCount)
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
