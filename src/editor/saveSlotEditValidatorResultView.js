export function renderSaveSlotEditValidatorResultView(options = {}) {
  const schema = options.schema || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const results = Array.isArray(schema.results) ? schema.results : [];
  const validatorValue = options.validatorValue || `${schema.validatorCount || 0}`;
  const fieldValue = options.fieldValue || `${schema.fieldCount || 0}`;
  const resultValue = options.resultValue || `${schema.resultCount || 0}`;
  const blockedValue = options.blockedValue || `${schema.blockedResultCount || 0}`;

  return `
    <section class="editor-save-edit-validator-result" data-save-edit-validator-result-schema>
      <div class="editor-save-edit-validator-result-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit validator result schema")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(schema.status)}">
          ${escapeHtml(statusLabel(schema.status))}
        </span>
      </div>
      <div class="editor-save-edit-validator-result-metrics">
        ${metricCard(text.validatorMetric || "Validators", validatorValue, text.validatorHint || "")}
        ${metricCard(text.fieldMetric || "Fields", fieldValue, text.fieldHint || "")}
        ${metricCard(text.resultMetric || "Results", resultValue, text.resultHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-validator-result-grid">
        ${results.map((result) => renderSaveEditValidatorResultCardView(result, text, statusLabel)).join("")}
      </div>
      <pre class="editor-save-edit-validator-result-code"><code>${escapeHtml(JSON.stringify(schema.resultShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditValidatorResultCardView(result = {}, text = {}, statusLabel = (status) => status || "") {
  return `
    <article class="editor-save-edit-validator-result-card" data-save-edit-validator-result="${escapeAttribute(result.ruleId)}" data-status="${escapeAttribute(result.status)}">
      <div>
        <strong>${escapeHtml(result.ruleId)}</strong>
        <span>${escapeHtml(statusLabel(result.status))}</span>
      </div>
      <code>${escapeHtml(result.functionName)}</code>
      <dl>
        <div>
          <dt>${escapeHtml(text.fieldCount || "Fields")}</dt>
          <dd>${escapeHtml(String(result.fieldCount))}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.resultStatus || "Result")}</dt>
          <dd>${escapeHtml(result.resultStatus)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.normalizedValue || "Normalized")}</dt>
          <dd>${escapeHtml(result.normalizedValue)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.blocker || "Blocker")}</dt>
          <dd>${escapeHtml(result.blocker)}</dd>
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
