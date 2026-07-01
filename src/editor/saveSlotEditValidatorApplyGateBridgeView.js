import { editorChip } from "./editorChipBlockView.js?v=679";

const SAVE_EDIT_VALIDATOR_APPLY_BRIDGE_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditValidatorApplyGateBridgeView(options = {}) {
  const bridge = options.bridge || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const gateBlockerFormatter = options.gateBlockerFormatter || ((item = {}) => `${item.id}: ${item.blocker}`);
  const gateBlockers = Array.isArray(bridge.gateBlockers) ? bridge.gateBlockers : [];
  const steps = Array.isArray(bridge.steps) ? bridge.steps : [];
  const resultValue = options.resultValue || `${bridge.resultCount || 0}`;
  const gateValue = options.gateValue || `${bridge.gateBlockedChecks || 0}`;
  const stepValue = options.stepValue || `${bridge.stepCount || 0}`;
  const blockedValue = options.blockedValue || `${bridge.blockedStepCount || 0}`;

  return `
    <section class="editor-save-edit-validator-bridge" data-save-edit-validator-apply-bridge data-status="${escapeAttribute(bridge.status)}" data-mode="${escapeAttribute(bridge.mode)}" data-apply="${escapeAttribute(bridge.apply)}">
      <div class="editor-save-edit-validator-bridge-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit validator apply bridge")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(bridge.status)}">
          ${escapeHtml(statusLabel(bridge.status))}
        </span>
      </div>
      <div class="editor-save-edit-validator-bridge-metrics">
        ${metricCard(text.resultMetric || "Results", resultValue, text.resultHint || "")}
        ${metricCard(text.gateMetric || "Gate blockers", gateValue, text.gateHint || "")}
        ${metricCard(text.stepMetric || "Bridge steps", stepValue, text.stepHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-validator-bridge-blockers">
        <strong>${escapeHtml(text.blockerList || "Bridge blockers")}</strong>
        <div class="editor-chip-list">
          ${gateBlockers.map((item) => editorChip(gateBlockerFormatter(item), SAVE_EDIT_VALIDATOR_APPLY_BRIDGE_CHIP_OPTIONS)).join("")}
        </div>
      </div>
      <div class="editor-save-edit-validator-bridge-grid">
        ${steps.map((step) => renderSaveEditValidatorApplyGateBridgeStepView(step, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-validator-bridge-code"><code>${escapeHtml(JSON.stringify(bridge.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditValidatorApplyGateBridgeStepView(step = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-validator-bridge-step" data-save-edit-validator-apply-bridge-step="${escapeAttribute(step.id)}" data-status="${escapeAttribute(step.status)}">
      <div>
        <strong>${escapeHtml(step.label)}</strong>
        <span>${escapeHtml(statusLabel(step.status))}</span>
      </div>
      ${step.detail ? `<p>${escapeHtml(step.detail)}</p>` : ""}
      ${step.blocker ? editorChip(blockerFormatter(step.blocker), SAVE_EDIT_VALIDATOR_APPLY_BRIDGE_CHIP_OPTIONS) : ""}
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
