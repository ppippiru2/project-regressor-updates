import { editorChip, editorChipBlock } from "./editorChipBlockView.js?v=680";

const SAVE_DIFF_DETAIL_CHIP_OPTIONS = {
  blockClass: "editor-detail-chip-block",
  chipClass: "editor-chip",
  filterEmpty: true,
  hideWhenEmpty: true,
};
const SAVE_DIFF_METRIC_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotDraftDiffSummaryView(options = {}) {
  const diff = options.diff || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const targetValue = options.targetValue || String(diff.targetCount || 0);
  const fieldValue = options.fieldValue || String(diff.fieldCount || 0);
  const comparableValue = options.comparableValue || String(diff.comparableRows || 0);
  const blockedValue = options.blockedValue || String(diff.blockedRows || 0);
  const groups = Array.isArray(diff.groups) ? diff.groups : [];
  const rows = Array.isArray(diff.rows) ? diff.rows.slice(0, 12) : [];

  return `
    <section class="editor-save-diff" data-save-draft-diff>
      <div class="editor-save-diff-head">
        <div>
          <h4>${escapeHtml(text.title || "Save draft diff summary")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(diff.applyStatus)}">
          ${escapeHtml(statusLabel(diff.applyStatus))}
        </span>
      </div>
      <div class="editor-save-diff-metrics">
        ${metricCard(text.targetMetric || "Targets", targetValue, text.targetHint || "")}
        ${metricCard(text.fieldMetric || "Fields", fieldValue, text.fieldHint || "")}
        ${metricCard(text.comparableMetric || "Comparable", comparableValue, text.comparableHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-diff-grid">
        ${groups.map((group) => renderSaveDraftDiffGroupView(group, text)).join("")}
      </div>
      <div class="editor-save-diff-row-list">
        ${rows.map((row) => renderSaveDraftDiffRowView(row, text)).join("") || `<p class="muted">${escapeHtml(text.noRows || "No diff rows.")}</p>`}
      </div>
    </section>
  `;
}

function renderSaveDraftDiffGroupView(group = {}, text = {}) {
  const paths = Array.isArray(group.paths) ? group.paths : [];
  const chips = [
    group.rowValue || String(group.rowCount || 0),
    group.comparableValue || String(group.comparableRows || 0),
    group.missingValue || String(group.missingRows || 0),
    group.blockedValue || String(group.blockedRows || 0),
  ];

  return `
    <article class="editor-save-diff-group" data-save-diff-group="${escapeAttribute(group.id)}">
      <strong>${escapeHtml(group.label)}</strong>
      <div class="editor-save-diff-group-metrics">
        ${chips.map((value) => editorChip(value, SAVE_DIFF_METRIC_CHIP_OPTIONS)).join("")}
      </div>
      ${renderDetailChips(text.paths || "Paths", paths)}
    </article>
  `;
}

function renderSaveDraftDiffRowView(row = {}, text = {}) {
  const labels = text.statusLabels || {};
  return `
    <article class="editor-save-diff-row" data-save-diff-row data-status="${escapeAttribute(row.status)}">
      <div>
        <strong>${escapeHtml(row.targetLabel)} / ${escapeHtml(row.path)}</strong>
        <span>${escapeHtml(labels[row.status] || row.status)}</span>
      </div>
      <dl>
        <div>
          <dt>${escapeHtml(text.currentValue || "Current")}</dt>
          <dd>${escapeHtml(row.currentPreview)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.proposedValue || "Proposed")}</dt>
          <dd>${escapeHtml(text.pendingInput || row.proposedPreview)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.blocker || "Blocker")}</dt>
          <dd>${escapeHtml(row.blocker)}</dd>
        </div>
      </dl>
    </article>
  `;
}

function renderDetailChips(label, values) {
  return editorChipBlock(label, Array.isArray(values) ? values : [], SAVE_DIFF_DETAIL_CHIP_OPTIONS);
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
