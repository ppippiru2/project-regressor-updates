import { tf } from "../localization/index.js?v=681";
import { editorChip } from "./editorChipBlockView.js?v=681";

export const EDITOR_OVERVIEW_LIST_VIEW_VERSION = "editor-overview-list-view-v1";
const EDITOR_OVERVIEW_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderEditorAssetSections({ assetTypes = {}, imageSlots = [], audioSlots = [] } = {}) {
  return [
    assetSection("image", assetTypes.image, imageSlots),
    assetSection("audio", assetTypes.audio, audioSlots),
  ].join("");
}

export function renderEditorSaveKeyCards(keys = [], text = {}) {
  return keys.map((item) => `
    <article class="editor-save-card">
      <strong>${escapeHtml(item.key)}</strong>
      <span>${item.exists ? escapeHtml(text.saved || "") : escapeHtml(text.empty || "")}</span>
      <small>${escapeHtml(item.detail)}</small>
    </article>
  `).join("");
}

export function renderEditorBacklogCards(items = [], options = {}) {
  const getStatusLabel = options.statusLabel || ((status) => status || "");
  return items.map((item) => `
    <article class="editor-backlog-card" data-status="${escapeAttribute(item.status || "planned")}">
      <div class="editor-backlog-head">
        <div>
          <h3>${escapeHtml(item.title)}</h3>
          <p>${escapeHtml(item.summary || "")}</p>
        </div>
        <span>${escapeHtml(getStatusLabel(item.status || "planned"))}</span>
      </div>
      <div class="editor-chip-list">${(item.editorHooks || []).map((hook) => editorChip(hook, EDITOR_OVERVIEW_CHIP_OPTIONS)).join("")}</div>
    </article>
  `).join("");
}

export function renderEditorPrototypeCards(items = []) {
  return items.map((item) => `
    <article class="editor-backlog-card">
      <div class="editor-backlog-head">
        <div>
          <h3>${escapeHtml(item.label)}</h3>
          <p>${escapeHtml(item.id)}</p>
        </div>
        <span>${escapeHtml(tf("editorPrep.save.count", { count: (item.keepForEditor || []).length }))}</span>
      </div>
      <div class="editor-chip-list">${(item.keepForEditor || []).map((value) => editorChip(value, EDITOR_OVERVIEW_CHIP_OPTIONS)).join("")}</div>
    </article>
  `).join("");
}

function assetSection(type, title, slots = []) {
  const sectionTitle = tf("editorPrep.assetTypes.slotTitle", { title });
  return `
    <details class="editor-asset-section" data-editor-asset-section="${escapeAttribute(type || "")}">
      <summary class="editor-asset-section-summary" aria-label="${escapeAttribute(sectionTitle)}">
        <div>
          <h3>${escapeHtml(sectionTitle)}</h3>
          <small>${escapeHtml(tf("editorPrep.save.count", { count: slots.length }))}</small>
        </div>
        <span class="collapse-toggle editor-asset-collapse-toggle" aria-hidden="true"></span>
      </summary>
      <div class="editor-asset-grid">
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
      </div>
    </details>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}
