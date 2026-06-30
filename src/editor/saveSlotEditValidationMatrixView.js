export function renderSaveSlotEditValidationMatrixView(options = {}) {
  const matrix = options.matrix || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const rows = Array.isArray(matrix.rows) ? matrix.rows : [];
  const fieldValue = options.fieldValue || `${matrix.fieldCount || 0}`;
  const targetValue = options.targetValue || `${matrix.targetCount || 0}`;
  const placeholderValue = options.placeholderValue || `${matrix.placeholderCount || 0}`;
  const blockedValue = options.blockedValue || `${matrix.blockedRows || 0}`;

  return `
    <section class="editor-save-edit-matrix" data-save-edit-validation-matrix>
      <div class="editor-save-edit-matrix-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit validation matrix")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(matrix.status)}">
          ${escapeHtml(statusLabel(matrix.status))}
        </span>
      </div>
      <div class="editor-save-edit-matrix-metrics">
        ${metricCard(text.fieldMetric || "Fields", fieldValue, text.fieldHint || "")}
        ${metricCard(text.targetMetric || "Targets", targetValue, text.targetHint || "")}
        ${metricCard(text.placeholderMetric || "Placeholders", placeholderValue, text.placeholderHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-matrix-rows">
        ${rows.map((row) => renderSaveEditValidationMatrixRowView(row, text, statusLabel)).join("")}
      </div>
    </section>
  `;
}

function renderSaveEditValidationMatrixRowView(row = {}, text = {}, statusLabel = (status) => status || "") {
  return `
    <article class="editor-save-edit-matrix-row" data-save-edit-validation-row="${escapeAttribute(row.path)}" data-status="${escapeAttribute(row.status)}">
      <div>
        <strong>${escapeHtml(row.path)}</strong>
        <span>${escapeHtml(statusLabel(row.status))}</span>
      </div>
      <dl>
        <div>
          <dt>${escapeHtml(text.proposedValue || "Proposed")}</dt>
          <dd>${escapeHtml(text.pendingInput || row.proposedValue)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.validationResult || "Validation")}</dt>
          <dd>${escapeHtml(row.validationResult)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.currentStatus || "Current")}</dt>
          <dd>${escapeHtml(row.currentStatus)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.targetCount || "Targets")}</dt>
          <dd>${escapeHtml(String(row.targetCount))}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.inputKind || "Input")}</dt>
          <dd>${escapeHtml(row.inputKind)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.blocker || "Blocker")}</dt>
          <dd>${escapeHtml(row.blocker)}</dd>
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
