import { editorChip } from "./editorChipBlockView.js?v=678";

const SAVE_EDIT_PRODUCED_BRIDGE_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditProducedResultBridgeView(options = {}) {
  const contract = options.contract || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const routes = Array.isArray(contract.routes) ? contract.routes : [];
  const resultValue = options.resultValue || `${contract.resultCount || 0}`;
  const routeValue = options.routeValue || `${contract.routeCount || 0}`;
  const blockerValue = options.blockerValue || `${contract.blockerCount || 0}`;

  return `
    <section class="editor-save-edit-produced-bridge" data-save-edit-produced-result-bridge-contract data-status="${escapeAttribute(contract.status)}" data-mode="${escapeAttribute(contract.mode)}" data-apply="${escapeAttribute(contract.apply)}">
      <div class="editor-save-edit-produced-bridge-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit produced result bridge contract")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(contract.status)}">
          ${escapeHtml(statusLabel(contract.status))}
        </span>
      </div>
      <div class="editor-save-edit-produced-bridge-metrics">
        ${metricCard(text.resultMetric || "Results", resultValue, text.resultHint || "")}
        ${metricCard(text.routeMetric || "Routes", routeValue, text.routeHint || "")}
        ${metricCard(text.blockerMetric || "Blockers", blockerValue, text.blockerHint || "")}
        ${metricCard(text.adapterMetric || "Adapter", contract.adapter?.status, text.adapterHint || "")}
      </div>
      <div class="editor-save-edit-produced-bridge-grid">
        ${routes.map((route) => renderSaveEditProducedResultBridgeRouteView(route, text, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-produced-bridge-code"><code>${escapeHtml(JSON.stringify(contract.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditProducedResultBridgeRouteView(route = {}, text = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-produced-bridge-route" data-save-edit-produced-result-bridge-route="${escapeAttribute(route.id)}" data-status="${escapeAttribute(route.status)}">
      <div>
        <strong>${escapeHtml(text.routeLabels?.[route.id] || route.id)}</strong>
        <span>${escapeHtml(statusLabel(route.status))}</span>
      </div>
      ${route.blocker ? editorChip(blockerFormatter(route.blocker), SAVE_EDIT_PRODUCED_BRIDGE_CHIP_OPTIONS) : ""}
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
