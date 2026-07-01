import { editorChip } from "./editorChipBlockView.js?v=679";

const SAVE_EDIT_ADAPTER_PREFLIGHT_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditAdapterRunnerPreflightView(options = {}) {
  const preflight = options.preflight || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const checks = Array.isArray(preflight.checks) ? preflight.checks : [];
  const payloadValue = options.payloadValue || `${preflight.payloadFieldCount || 0}`;
  const gateValue = options.gateValue || `${preflight.gateBlockerCount || 0}`;
  const checkValue = options.checkValue || `${preflight.checkCount || 0}`;
  const blockedValue = options.blockedValue || `${preflight.blockedCheckCount || 0}`;

  return `
    <section class="editor-save-edit-adapter-preflight" data-save-edit-adapter-runner-preflight data-status="${escapeAttribute(preflight.status)}" data-mode="${escapeAttribute(preflight.mode)}" data-apply="${escapeAttribute(preflight.apply)}">
      <div class="editor-save-edit-adapter-preflight-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit adapter runner preflight")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(preflight.status)}">
          ${escapeHtml(statusLabel(preflight.status))}
        </span>
      </div>
      <div class="editor-save-edit-adapter-preflight-metrics">
        ${metricCard(text.payloadMetric || "Payload", payloadValue, text.payloadHint || "")}
        ${metricCard(text.gateMetric || "Gate blockers", gateValue, text.gateHint || "")}
        ${metricCard(text.checkMetric || "Checks", checkValue, text.checkHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-adapter-preflight-grid">
        ${checks.map((check) => renderSaveEditAdapterRunnerPreflightCheckView(check, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-adapter-preflight-code"><code>${escapeHtml(JSON.stringify(preflight.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditAdapterRunnerPreflightCheckView(check = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-adapter-preflight-check" data-save-edit-adapter-runner-preflight-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.blocker ? editorChip(blockerFormatter(check.blocker), SAVE_EDIT_ADAPTER_PREFLIGHT_CHIP_OPTIONS) : ""}
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
