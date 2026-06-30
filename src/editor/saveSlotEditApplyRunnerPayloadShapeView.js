export function renderSaveSlotEditApplyRunnerPayloadShapeView(options = {}) {
  const preview = options.preview || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const fields = Array.isArray(preview.fields) ? preview.fields : [];
  const checks = Array.isArray(preview.checks) ? preview.checks : [];
  const fieldValue = options.fieldValue || `${preview.fieldCount || 0}`;
  const checkValue = options.checkValue || `${preview.checkCount || 0}`;
  const blockedValue = options.blockedValue || `${preview.blockedCheckCount || 0}`;

  return `
    <section class="editor-save-edit-apply-runner-payload" data-save-edit-apply-runner-payload-shape data-status="${escapeAttribute(preview.status)}" data-mode="${escapeAttribute(preview.mode)}" data-runner="${escapeAttribute(preview.applyRunner)}" data-apply="${escapeAttribute(preview.apply)}">
      <div class="editor-save-edit-apply-runner-payload-head">
        <div>
          <span class="eyebrow">${escapeHtml(preview.version)}</span>
          <h4>${escapeHtml(text.title || "Save edit apply runner payload shape")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only payload shape before any apply runner is created.")}</p>
        </div>
        ${chip(statusLabel(preview.status))}
      </div>
      <div class="editor-save-edit-apply-runner-payload-metrics">
        ${metricCard(text.fieldMetric || "Fields", fieldValue, text.fieldHint || "")}
        ${metricCard(text.checkMetric || "Checks", checkValue, text.checkHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
        ${metricCard(text.runnerMetric || "Runner", preview.applyRunner, text.runnerHint || "")}
      </div>
      <div class="editor-save-edit-apply-runner-payload-grid">
        ${fields.map((field) => renderSaveEditApplyRunnerPayloadFieldView(field, text, statusLabel, blockerFormatter)).join("")}
        ${checks.map((check) => renderSaveEditApplyRunnerPayloadCheckView(check, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-apply-runner-payload-code"><code>${escapeHtml(JSON.stringify(preview.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditApplyRunnerPayloadFieldView(field = {}, text = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-apply-runner-payload-card" data-save-edit-apply-runner-payload-field="${escapeAttribute(field.id)}" data-status="${escapeAttribute(field.status)}">
      <div>
        <strong>${escapeHtml(field.label)}</strong>
        <span>${escapeHtml(statusLabel(field.status))}</span>
      </div>
      <dl>
        <div>
          <dt>${escapeHtml(text.fieldKind || "Kind")}</dt>
          <dd>${escapeHtml(field.kind)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.fieldValueLabel || "Value")}</dt>
          <dd>${escapeHtml(`${field.value}`)}</dd>
        </div>
      </dl>
      ${field.blocker ? chip(blockerFormatter(field.blocker)) : ""}
    </article>
  `;
}

function renderSaveEditApplyRunnerPayloadCheckView(check = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-apply-runner-payload-card" data-save-edit-apply-runner-payload-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.blocker ? chip(blockerFormatter(check.blocker)) : ""}
    </article>
  `;
}

function chip(value) {
  return `<span class="editor-chip">${escapeHtml(String(value))}</span>`;
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
