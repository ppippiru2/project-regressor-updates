export function renderSaveSlotEditBridgeTransitionView(options = {}) {
  const checklist = options.checklist || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const checks = Array.isArray(checklist.checks) ? checklist.checks : [];
  const checkValue = options.checkValue || `${checklist.checkCount || 0}`;
  const blockedValue = options.blockedValue || `${checklist.blockedCheckCount || 0}`;

  return `
    <section class="editor-save-edit-bridge-transition" data-save-edit-produced-result-bridge-transition-checklist data-status="${escapeAttribute(checklist.status)}" data-mode="${escapeAttribute(checklist.mode)}" data-apply="${escapeAttribute(checklist.apply)}">
      <div class="editor-save-edit-bridge-transition-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit bridge transition checklist")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(checklist.status)}">
          ${escapeHtml(statusLabel(checklist.status))}
        </span>
      </div>
      <div class="editor-save-edit-bridge-transition-metrics">
        ${metricCard(text.producedMetric || "Produced", checklist.producedVersion, text.producedHint || "")}
        ${metricCard(text.legacyMetric || "Legacy bridge", checklist.legacyBridgeVersion, text.legacyHint || "")}
        ${metricCard(text.checkMetric || "Checks", checkValue, text.checkHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-bridge-transition-grid">
        ${checks.map((check) => renderSaveEditProducedResultBridgeTransitionCheckView(check, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-bridge-transition-code"><code>${escapeHtml(JSON.stringify(checklist.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditProducedResultBridgeTransitionCheckView(check = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-bridge-transition-check" data-save-edit-produced-result-bridge-transition-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
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
