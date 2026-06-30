export function renderSaveSlotEditDryRunSampleComparatorView(options = {}) {
  const preview = options.preview || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const comparisons = Array.isArray(preview.comparisons) ? preview.comparisons : [];
  const fieldValue = options.fieldValue || `${preview.fieldCount || 0}`;
  const comparableValue = options.comparableValue || `${preview.comparableCount || 0}`;
  const readyValue = options.readyValue || `${preview.readyComparisonCount || 0}`;
  const blockerValue = options.blockerValue || `${preview.blockerCount || 0}`;

  return `
    <section class="editor-save-edit-sample-comparator" data-save-edit-dry-run-sample-comparator data-status="${escapeAttribute(preview.status)}" data-mode="${escapeAttribute(preview.mode)}" data-apply="${escapeAttribute(preview.apply)}">
      <div class="editor-save-edit-sample-comparator-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit dry-run sample comparator")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(preview.status)}">
          ${escapeHtml(statusLabel(preview.status))}
        </span>
      </div>
      <div class="editor-save-edit-sample-comparator-metrics">
        ${metricCard(text.fieldMetric || "Fields", fieldValue, text.fieldHint || "")}
        ${metricCard(text.comparableMetric || "Comparable", comparableValue, text.comparableHint || "")}
        ${metricCard(text.readyMetric || "Ready", readyValue, text.readyHint || "")}
        ${metricCard(text.blockerMetric || "Blockers", blockerValue, text.blockerHint || "")}
      </div>
      <div class="editor-save-edit-sample-comparator-grid">
        ${comparisons.map((comparison) => renderSaveEditDryRunSampleComparisonView(comparison, text, statusLabel)).join("")}
      </div>
      <pre class="editor-save-edit-sample-comparator-code"><code>${escapeHtml(JSON.stringify(preview.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditDryRunSampleComparisonView(comparison = {}, text = {}, statusLabel = (status) => status || "") {
  return `
    <article class="editor-save-edit-sample-comparator-card" data-save-edit-dry-run-sample-comparison="${escapeAttribute(comparison.path)}" data-status="${escapeAttribute(comparison.status)}">
      <div>
        <strong>${escapeHtml(comparison.path)}</strong>
        <span>${escapeHtml(statusLabel(comparison.status))}</span>
      </div>
      <dl>
        <div>
          <dt>${escapeHtml(text.ruleId || "Rule")}</dt>
          <dd>${escapeHtml(comparison.ruleId)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.missingResult || "Missing")}</dt>
          <dd>${escapeHtml(`${comparison.missingResult} / ${comparison.missingBlocker}`)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.validResult || "Valid")}</dt>
          <dd>${escapeHtml(comparison.validResult)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.invalidResult || "Invalid")}</dt>
          <dd>${escapeHtml(comparison.invalidResult)}</dd>
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
