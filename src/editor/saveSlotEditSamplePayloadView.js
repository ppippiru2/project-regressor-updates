import { editorChip } from "./editorChipBlockView.js?v=681";

const SAVE_EDIT_SAMPLE_PAYLOAD_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditSamplePayloadView(options = {}) {
  const preview = options.preview || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const groupFieldFormatter = options.groupFieldFormatter || ((group) => `${group.fieldCount || 0}`);
  const fieldChipFormatter = options.fieldChipFormatter || defaultFieldChip;
  const groups = Array.isArray(preview.groups) ? preview.groups : [];
  const groupValue = options.groupValue || `${preview.groupCount || 0}`;
  const fieldValue = options.fieldValue || `${preview.fieldCount || 0}`;
  const ruleValue = options.ruleValue || `${preview.ruleCount || 0}`;
  const blockedValue = options.blockedValue || `${preview.blockedFieldCount || 0}`;

  return `
    <section class="editor-save-edit-sample-payload" data-save-edit-sample-payload>
      <div class="editor-save-edit-sample-payload-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit sample payload")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(preview.status)}">
          ${escapeHtml(statusLabel(preview.status))}
        </span>
      </div>
      <div class="editor-save-edit-sample-payload-metrics">
        ${metricCard(text.groupMetric || "Groups", groupValue, text.groupHint || "")}
        ${metricCard(text.fieldMetric || "Fields", fieldValue, text.fieldHint || "")}
        ${metricCard(text.ruleMetric || "Rules", ruleValue, text.ruleHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-sample-payload-grid">
        ${groups.map((group) => renderSaveEditSamplePayloadGroupView(group, text, groupFieldFormatter, fieldChipFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-sample-payload-code"><code>${escapeHtml(JSON.stringify(preview.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditSamplePayloadGroupView(group = {}, text = {}, groupFieldFormatter, fieldChipFormatter) {
  const fields = Array.isArray(group.fields) ? group.fields : [];
  return `
    <article class="editor-save-edit-sample-payload-group" data-save-edit-sample-payload-group="${escapeAttribute(group.id)}">
      <div>
        <strong>${escapeHtml(group.label)}</strong>
        <span>${escapeHtml(groupFieldFormatter(group))}</span>
      </div>
      <div class="editor-chip-list">
        ${fields.map((field) => editorChip(fieldChipFormatter(field, text), SAVE_EDIT_SAMPLE_PAYLOAD_CHIP_OPTIONS)).join("")}
      </div>
    </article>
  `;
}

function defaultFieldChip(field = {}, text = {}) {
  return `${field.path || ""} · ${field.inputKind || ""} · ${text.pendingInput || field.proposedValue || ""}`;
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
