export function renderSaveSlotEditValidatorExecutableDryRunView(options = {}) {
  const preview = options.preview || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const results = Array.isArray(preview.results) ? preview.results : [];
  const validatorValue = options.validatorValue || `${preview.validatorCount || 0}`;
  const implementedValue = options.implementedValue || `${preview.implementedValidatorCount || 0}`;
  const resultValue = options.resultValue || `${preview.resultCount || 0}`;
  const blockedValue = options.blockedValue || `${preview.blockedResultCount || 0}`;

  return `
    <section class="editor-save-edit-validator-execution" data-save-edit-validator-executable-dry-run data-status="${escapeAttribute(preview.status)}" data-mode="${escapeAttribute(preview.mode)}" data-apply="${escapeAttribute(preview.apply)}">
      <div class="editor-save-edit-validator-execution-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit validator executable dry-run")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(preview.status)}">
          ${escapeHtml(statusLabel(preview.status))}
        </span>
      </div>
      <div class="editor-save-edit-validator-execution-metrics">
        ${metricCard(text.validatorMetric || "Validators", validatorValue, text.validatorHint || "")}
        ${metricCard(text.implementedMetric || "Implemented", implementedValue, text.implementedHint || "")}
        ${metricCard(text.resultMetric || "Results", resultValue, text.resultHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-validator-execution-grid">
        ${results.map((result) => renderSaveEditValidatorExecutableDryRunResultView(result, text, statusLabel)).join("")}
      </div>
      <pre class="editor-save-edit-validator-execution-code"><code>${escapeHtml(JSON.stringify(preview.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditValidatorExecutableDryRunResultView(result = {}, text = {}, statusLabel = (status) => status || "") {
  return `
    <article class="editor-save-edit-validator-execution-result" data-save-edit-validator-executable-result="${escapeAttribute(result.path)}" data-status="${escapeAttribute(result.status)}">
      <div>
        <strong>${escapeHtml(result.path)}</strong>
        <span>${escapeHtml(statusLabel(result.status))}</span>
      </div>
      <code>${escapeHtml(result.functionName)}</code>
      <dl>
        <div>
          <dt>${escapeHtml(text.ruleId || "Rule")}</dt>
          <dd>${escapeHtml(result.ruleId)}</dd>
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
          <dd>${escapeHtml(result.blocker || "")}</dd>
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
