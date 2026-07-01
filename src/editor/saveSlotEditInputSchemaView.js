import { editorChip } from "./editorChipBlockView.js?v=679";

const SAVE_EDIT_INPUT_SCHEMA_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditInputSchemaView(options = {}) {
  const schema = options.schema || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const groupFieldFormatter = options.groupFieldFormatter || ((group) => `${group.fieldCount || 0}`);
  const groupComparableFormatter = options.groupComparableFormatter || ((group) => `${group.comparableRows || 0}`);
  const groups = Array.isArray(schema.groups) ? schema.groups : [];
  const fields = Array.isArray(schema.fields) ? schema.fields : [];
  const groupValue = options.groupValue || `${groups.length}`;
  const fieldValue = options.fieldValue || `${schema.fieldCount || 0}`;
  const validationValue = options.validationValue || `${schema.validationRuleCount || 0}`;
  const blockedValue = options.blockedValue || `${schema.blockedFieldCount || 0}`;

  return `
    <section class="editor-save-input-schema" data-save-edit-input-schema>
      <div class="editor-save-input-schema-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit input schema")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(schema.status)}">
          ${escapeHtml(statusLabel(schema.status))}
        </span>
      </div>
      <div class="editor-save-input-schema-metrics">
        ${metricCard(text.groupMetric || "Groups", groupValue, text.groupHint || "")}
        ${metricCard(text.fieldMetric || "Fields", fieldValue, text.fieldHint || "")}
        ${metricCard(text.validationMetric || "Validation", validationValue, text.validationHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-input-schema-grid">
        ${groups.map((group) => renderSaveEditInputSchemaGroupView(group, groupFieldFormatter, groupComparableFormatter)).join("")}
      </div>
      <div class="editor-save-input-schema-fields">
        ${fields.map((field) => renderSaveEditInputSchemaFieldView(field, text, statusLabel)).join("")}
      </div>
    </section>
  `;
}

function renderSaveEditInputSchemaGroupView(group = {}, groupFieldFormatter, groupComparableFormatter) {
  return `
    <article class="editor-save-input-schema-group" data-save-edit-input-group="${escapeAttribute(group.id)}">
      <strong>${escapeHtml(group.label)}</strong>
      <div class="editor-chip-list">
        ${editorChip(groupFieldFormatter(group), SAVE_EDIT_INPUT_SCHEMA_CHIP_OPTIONS)}
        ${editorChip(groupComparableFormatter(group), SAVE_EDIT_INPUT_SCHEMA_CHIP_OPTIONS)}
      </div>
    </article>
  `;
}

function renderSaveEditInputSchemaFieldView(field = {}, text = {}, statusLabel = (status) => status || "") {
  return `
    <article class="editor-save-input-schema-field" data-save-edit-input-field="${escapeAttribute(field.path)}" data-status="${escapeAttribute(field.status)}">
      <div>
        <strong>${escapeHtml(field.path)}</strong>
        <span>${escapeHtml(statusLabel(field.status))}</span>
      </div>
      <dl>
        <div>
          <dt>${escapeHtml(text.inputKind || "Input")}</dt>
          <dd>${escapeHtml(field.inputKind)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.validationRule || "Validation")}</dt>
          <dd>${escapeHtml(field.validationRule)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.blocker || "Blocker")}</dt>
          <dd>${escapeHtml(field.blocker)}</dd>
        </div>
      </dl>
    </article>
  `;
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
