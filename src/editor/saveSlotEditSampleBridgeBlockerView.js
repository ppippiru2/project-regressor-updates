export function renderSaveSlotEditSampleBridgeBlockerView(options = {}) {
  const summary = options.summary || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const blockers = Array.isArray(summary.blockers) ? summary.blockers : [];
  const readyValue = options.readyValue || `${summary.readyComparisonCount || 0}`;
  const blockerValue = options.blockerValue || `${summary.blockerCount || 0}`;

  return `
    <section class="editor-save-edit-sample-bridge" data-save-edit-sample-bridge-blocker-summary data-status="${escapeAttribute(summary.status)}" data-mode="${escapeAttribute(summary.mode)}" data-apply="${escapeAttribute(summary.apply)}">
      <div class="editor-save-edit-sample-bridge-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit sample bridge blocker summary")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(summary.status)}">
          ${escapeHtml(statusLabel(summary.status))}
        </span>
      </div>
      <div class="editor-save-edit-sample-bridge-metrics">
        ${metricCard(text.readyMetric || "Ready comparisons", readyValue, text.readyHint || "")}
        ${metricCard(text.blockerMetric || "Blockers", blockerValue, text.blockerHint || "")}
        ${metricCard(text.bridgeMetric || "Bridge", summary.bridge?.status, text.bridgeHint || "")}
        ${metricCard(text.applyMetric || "Apply", summary.apply, text.applyHint || "")}
      </div>
      <div class="editor-save-edit-sample-bridge-grid">
        ${blockers.map((blocker) => renderSaveEditSampleBridgeBlockerView(blocker, text, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-sample-bridge-code"><code>${escapeHtml(JSON.stringify(summary.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditSampleBridgeBlockerView(blocker = {}, text = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-sample-bridge-card" data-save-edit-sample-bridge-blocker="${escapeAttribute(blocker.id)}" data-status="${escapeAttribute(blocker.status)}">
      <div>
        <strong>${escapeHtml(text.blockerLabels?.[blocker.id] || blocker.id)}</strong>
        <span>${escapeHtml(statusLabel(blocker.status))}</span>
      </div>
      ${blocker.blocker ? chip(blockerFormatter(blocker.blocker)) : ""}
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
