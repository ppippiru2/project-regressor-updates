export function renderSaveSlotEditPostWriteRestoreContractView(options = {}) {
  const contract = options.contract || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const routeValue = options.routeValue || `${contract.routeCount || 0}`;
  const blockerValue = options.blockerValue || `${contract.blockerCount || 0}`;
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const routes = Array.isArray(contract.routes) ? contract.routes : [];

  return `
    <section class="editor-save-edit-postwrite-restore" data-save-edit-postwrite-restore-contract data-status="${escapeAttribute(contract.status)}" data-mode="${escapeAttribute(contract.mode)}" data-apply="${escapeAttribute(contract.apply)}">
      <div class="editor-save-edit-postwrite-restore-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit post-write restore contract")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(contract.status)}">
          ${escapeHtml(statusLabel(contract.status))}
        </span>
      </div>
      <div class="editor-save-edit-postwrite-restore-metrics">
        ${metricCard(text.validationMetric || "Validation", contract.postWriteValidation?.status, text.validationHint || "")}
        ${metricCard(text.routeMetric || "Routes", routeValue, text.routeHint || "")}
        ${metricCard(text.blockerMetric || "Blockers", blockerValue, text.blockerHint || "")}
        ${metricCard(text.restoreMetric || "Restore", contract.restoreRunner?.status, text.restoreHint || "")}
      </div>
      <div class="editor-save-edit-postwrite-restore-grid">
        ${routes.map((route) => renderSaveEditPostWriteRestoreRouteView(route, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-postwrite-restore-code"><code>${escapeHtml(JSON.stringify(contract.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditPostWriteRestoreRouteView(route = {}, blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-postwrite-restore-route" data-save-edit-postwrite-restore-route="${escapeAttribute(route.id)}" data-status="${escapeAttribute(route.status)}">
      <div>
        <strong>${escapeHtml(route.label)}</strong>
        <span>${escapeHtml(route.status)}</span>
      </div>
      ${route.blocker ? chip(blockerFormatter(route.blocker)) : ""}
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
