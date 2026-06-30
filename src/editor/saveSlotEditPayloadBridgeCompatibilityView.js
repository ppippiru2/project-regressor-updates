export function renderSaveSlotEditPayloadBridgeCompatibilityView(options = {}) {
  const summary = options.summary || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const rows = Array.isArray(summary.rows) ? summary.rows : [];
  const rowValue = options.rowValue || `${summary.rowCount || 0}`;
  const readyValue = options.readyValue || `${summary.readyRowCount || 0}`;
  const blockerValue = options.blockerValue || `${summary.blockerCount || 0}`;

  return `
    <section class="editor-save-edit-payload-bridge" data-save-edit-apply-runner-payload-bridge-summary data-status="${escapeAttribute(summary.status)}" data-mode="${escapeAttribute(summary.mode)}" data-apply="${escapeAttribute(summary.apply)}">
      <div class="editor-save-edit-payload-bridge-head">
        <div>
          <span class="eyebrow">${escapeHtml(summary.version)}</span>
          <h4>${escapeHtml(text.title || "Payload to bridge compatibility")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only compatibility blockers before the payload can feed the apply bridge.")}</p>
        </div>
        ${chip(statusLabel(summary.status))}
      </div>
      <div class="editor-save-edit-payload-bridge-metrics">
        ${metricCard(text.rowMetric || "Rows", rowValue, text.rowHint || "")}
        ${metricCard(text.readyMetric || "Ready", readyValue, text.readyHint || "")}
        ${metricCard(text.blockerMetric || "Blockers", blockerValue, text.blockerHint || "")}
        ${metricCard(text.bridgeMetric || "Bridge", summary.bridgeVersion, text.bridgeHint || "")}
      </div>
      <div class="editor-save-edit-payload-bridge-grid">
        ${rows.map((row) => renderSaveEditPayloadBridgeCompatibilityRowView(row, text, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-payload-bridge-code"><code>${escapeHtml(JSON.stringify(summary.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditPayloadBridgeCompatibilityRowView(row = {}, text = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-payload-bridge-row" data-save-edit-apply-runner-payload-bridge-row="${escapeAttribute(row.id)}" data-status="${escapeAttribute(row.status)}">
      <div>
        <strong>${escapeHtml(row.label)}</strong>
        <span>${escapeHtml(statusLabel(row.status))}</span>
      </div>
      <dl>
        <div>
          <dt>${escapeHtml(text.payloadValueLabel || "Payload")}</dt>
          <dd>${escapeHtml(`${row.payloadValue}`)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.bridgeValueLabel || "Bridge")}</dt>
          <dd>${escapeHtml(`${row.bridgeValue}`)}</dd>
        </div>
      </dl>
      ${row.blocker ? chip(blockerFormatter(row.blocker)) : ""}
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
