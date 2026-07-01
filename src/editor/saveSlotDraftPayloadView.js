import { editorChip } from "./editorChipBlockView.js?v=678";

const SAVE_DRAFT_PAYLOAD_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotDraftPayloadView(options = {}) {
  const preview = options.preview || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const targetValue = options.targetValue || String(preview.targetCount || 0);
  const fieldGroupValue = options.fieldGroupValue || String(preview.fieldGroups?.length || 0);
  const operationValue = options.operationValue || String(preview.operationCount || 0);
  const fieldGroups = Array.isArray(preview.fieldGroups) ? preview.fieldGroups : [];

  return `
    <section class="editor-save-draft" data-save-draft-payload>
      <div class="editor-save-draft-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit draft payload")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(preview.applyStatus)}">
          ${escapeHtml(statusLabel(preview.applyStatus))}
        </span>
      </div>
      <div class="editor-save-draft-metrics">
        ${metricCard(
          text.targetMetric || "Targets",
          targetValue,
          text.targetHint || "",
        )}
        ${metricCard(
          text.fieldGroupMetric || "Field groups",
          fieldGroupValue,
          text.fieldGroupHint || "",
        )}
        ${metricCard(
          text.operationMetric || "Operations",
          operationValue,
          text.operationHint || "",
        )}
      </div>
      <div class="editor-save-draft-grid">
        ${fieldGroups.map((group) => renderSaveDraftFieldGroupView(group)).join("")}
      </div>
      <pre class="editor-save-draft-code"><code>${escapeHtml(JSON.stringify(preview.payloadShape || {}, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveDraftFieldGroupView(group = {}) {
  const fields = Array.isArray(group.fields) ? group.fields : [];
  return `
    <article class="editor-save-draft-group" data-save-draft-group="${escapeAttribute(group.id)}">
      <strong>${escapeHtml(group.label)}</strong>
      <div class="editor-chip-list">
        ${fields.map((field) => editorChip(`${field.path} · ${field.valueType} · ${field.guard}`, SAVE_DRAFT_PAYLOAD_CHIP_OPTIONS)).join("")}
      </div>
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
