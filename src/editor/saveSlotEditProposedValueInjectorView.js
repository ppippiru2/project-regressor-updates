export function renderSaveSlotEditProposedValueInjectorView(options = {}) {
  const preview = options.preview || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const fields = Array.isArray(preview.fields) ? preview.fields : [];
  const fieldValue = options.fieldValue || `${preview.fieldCount || 0}`;
  const validValue = options.validValue || `${preview.validSampleCount || 0}`;
  const invalidValue = options.invalidValue || `${preview.invalidSampleCount || 0}`;

  return `
    <section class="editor-save-edit-proposed-values" data-save-edit-proposed-value-injector data-status="${escapeAttribute(preview.status)}" data-mode="${escapeAttribute(preview.mode)}" data-injector="${escapeAttribute(preview.injector)}" data-apply="${escapeAttribute(preview.apply)}">
      <div class="editor-save-edit-proposed-values-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit proposed value injector")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(preview.status)}">
          ${escapeHtml(statusLabel(preview.status))}
        </span>
      </div>
      <div class="editor-save-edit-proposed-values-metrics">
        ${metricCard(text.fieldMetric || "Fields", fieldValue, text.fieldHint || "")}
        ${metricCard(text.validMetric || "Valid samples", validValue, text.validHint || "")}
        ${metricCard(text.invalidMetric || "Invalid samples", invalidValue, text.invalidHint || "")}
        ${metricCard(text.injectorMetric || "Injector", preview.injector, text.injectorHint || "")}
      </div>
      <div class="editor-save-edit-proposed-values-grid">
        ${fields.map((field) => renderSaveEditProposedValueInjectorFieldView(field, text)).join("")}
      </div>
      <pre class="editor-save-edit-proposed-values-code"><code>${escapeHtml(JSON.stringify(preview.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditProposedValueInjectorFieldView(field = {}, text = {}) {
  return `
    <article class="editor-save-edit-proposed-values-field" data-save-edit-proposed-value-field="${escapeAttribute(field.path)}" data-status="${escapeAttribute(field.inputStatus)}">
      <div>
        <strong>${escapeHtml(field.path)}</strong>
        <span>${escapeHtml(field.inputStatus)}</span>
      </div>
      <dl>
        <div>
          <dt>${escapeHtml(text.ruleId || "Rule")}</dt>
          <dd>${escapeHtml(field.validationRule)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.validSample || "Valid sample")}</dt>
          <dd>${escapeHtml(`${field.validSample} -> ${field.validResult}`)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.invalidSample || "Invalid sample")}</dt>
          <dd>${escapeHtml(`${field.invalidSample} -> ${field.invalidResult}`)}</dd>
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
