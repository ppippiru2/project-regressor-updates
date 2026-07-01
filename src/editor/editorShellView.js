import { editorChipBlock } from "./editorChipBlockView.js?v=676";
import {
  editorNavGroupId,
  isEditorNavGroupCollapsed,
} from "./editorNavGroupState.js?v=676&cachebust=676";

const EDITOR_SHELL_DETAIL_BLOCK_OPTIONS = {
  blockClass: "editor-detail-block",
  chipClass: "editor-chip",
  titleTag: "h3",
};
const EDITOR_SHELL_CHIP_SECTION_OPTIONS = {
  blockClass: "editor-chip-section",
  chipClass: "editor-chip",
  titleTag: "strong",
};

export function renderEditorNavigationGroups(options = {}) {
  const groups = Array.isArray(options.groups) ? options.groups : [];
  const panels = Array.isArray(options.panels) ? options.panels : [];
  const panelsById = new Map(panels.map((panel) => [panel.id, panel]));
  return groups.map((group, index) => {
    const groupId = editorNavGroupId(group, index);
    const groupLabel = group.label || groupId;
    const collapsed = isEditorNavGroupCollapsed(groupId, options.collapsedGroupIds);
    const toggleLabel = navigationGroupToggleLabel(groupLabel, collapsed, options.collapseLabels);
    const listId = `editor-nav-group-${index}-list`;
    const buttons = (group.panels || [])
      .map((id) => panelsById.get(id))
      .filter(Boolean)
      .map((panel) => renderPanelButton(panel, options))
      .join("");
    return `
      <section class="editor-nav-group${collapsed ? " is-collapsed" : ""}" data-editor-nav-group-id="${escapeAttribute(groupId)}">
        <div class="editor-nav-group-header">
          <h3>${escapeHtml(groupLabel)}</h3>
          <button
            class="collapse-toggle editor-nav-collapse-toggle"
            type="button"
            data-editor-nav-group-toggle="${escapeAttribute(groupId)}"
            aria-controls="${escapeAttribute(listId)}"
            aria-expanded="${collapsed ? "false" : "true"}"
            aria-label="${escapeAttribute(toggleLabel)}"
            title="${escapeAttribute(toggleLabel)}"
          >${collapsed ? "+" : "-"}</button>
        </div>
        <div class="editor-nav-group-list" id="${escapeAttribute(listId)}"${collapsed ? " hidden" : ""}>
          ${buttons}
        </div>
      </section>
    `;
  }).join("");
}

export function renderEditorPanelDetailShell(options = {}) {
  const panel = options.panel;
  if (!panel) {
    return `<p class="muted">${escapeHtml(options.noPanelText || "")}</p>`;
  }
  const detailTitles = options.detailTitles || {};
  const contentSections = Array.isArray(options.contentSections) ? options.contentSections : [];
  const emptyValue = options.emptyValue || "-";
  return `
    <div class="editor-detail-header">
      <div>
        <h2>${escapeHtml(panel.label)}</h2>
        <p class="muted">${escapeHtml(panel.purpose || "")}</p>
      </div>
      <span class="editor-status-pill" data-status="${escapeAttribute(panel.status || "planned")}">${escapeHtml(statusLabel(panel.status, options))}</span>
    </div>
    <div class="editor-detail-grid">
      ${renderDetailBlock(detailTitles.dataTargets, panel.primaryDataTargets, emptyValue)}
      ${renderDetailBlock(detailTitles.assetSlots, panel.assetSlots, emptyValue)}
      ${renderDetailBlock(detailTitles.editorFields, panel.editorFields, emptyValue)}
      ${renderDetailBlock(detailTitles.futureControls, panel.futureControls, emptyValue)}
    </div>
    ${panel.nodeTypes ? renderChipSection(detailTitles.nodeTypes, panel.nodeTypes) : ""}
    ${contentSections.join("")}
  `;
}

function renderPanelButton(panel, options = {}) {
  const activeClass = panel.id === options.activePanelId ? " is-active" : "";
  return `
    <button class="editor-panel-button${activeClass}" type="button" data-panel-id="${escapeAttribute(panel.id)}">
      <span>${escapeHtml(panel.label)}</span>
      <small>${escapeHtml(statusLabel(panel.status, options))}</small>
    </button>
  `;
}

function renderDetailBlock(title, values = [], emptyValue = "-") {
  return editorChipBlock(title, values, {
    ...EDITOR_SHELL_DETAIL_BLOCK_OPTIONS,
    emptyValue,
  });
}

function renderChipSection(title, values = []) {
  return editorChipBlock(title, values, EDITOR_SHELL_CHIP_SECTION_OPTIONS);
}

function statusLabel(status = "planned", options = {}) {
  const formatStatusLabel = options.statusLabel || ((value) => value || "");
  return formatStatusLabel(status);
}

function navigationGroupToggleLabel(title, collapsed, labels = {}) {
  const key = collapsed ? "expandLabel" : "collapseLabel";
  const fallback = collapsed ? "Expand {title}" : "Collapse {title}";
  return String(labels[key] || fallback).replaceAll("{title}", title || "");
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
