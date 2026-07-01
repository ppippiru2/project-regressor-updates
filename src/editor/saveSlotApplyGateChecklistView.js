import { editorChip } from "./editorChipBlockView.js?v=675";

const SAVE_APPLY_GATE_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotApplyGateChecklistView(options = {}) {
  const gate = options.gate || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => formatBlocker(blocker, text));
  const readyValue = options.readyValue || `${gate.readyChecks || 0}/${gate.totalChecks || 0}`;
  const blockedValue = options.blockedValue || `${gate.blockedChecks || 0}`;
  const targetValue = options.targetValue || `${gate.targetCount || 0}`;
  const diffRowValue = options.diffRowValue || `${gate.diffRowCount || 0}`;
  const recoveryValue = options.recoveryValue || `${gate.recoveryBlockedSteps || 0}`;
  const checks = Array.isArray(gate.checks) ? gate.checks : [];

  return `
    <section class="editor-save-apply-gate" data-save-apply-gate data-recovery-status="${escapeAttribute(gate.recoveryStatus)}" data-recovery-blockers="${escapeAttribute(String(gate.recoveryBlockedSteps || 0))}">
      <div class="editor-save-apply-gate-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit apply gate")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(gate.applyStatus)}">
          ${escapeHtml(statusLabel(gate.applyStatus))}
        </span>
      </div>
      <div class="editor-save-apply-gate-metrics">
        ${metricCard(text.readyMetric || "Ready", readyValue, text.readyHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
        ${metricCard(text.targetMetric || "Targets", targetValue, text.targetHint || "")}
        ${metricCard(text.diffRowMetric || "Diff rows", diffRowValue, text.diffRowHint || "")}
        ${metricCard(text.recoveryMetric || "Recovery", recoveryValue, text.recoveryHint || "")}
      </div>
      <div class="editor-save-apply-gate-grid">
        ${checks.map((check) => renderSaveApplyGateCheckView(check, text, statusLabel, blockerFormatter)).join("")}
      </div>
      <div class="editor-save-apply-gate-confirmation" data-save-apply-gate-confirmation>
        <strong>${escapeHtml(text.confirmationTitle || "Required confirmation")}</strong>
        <p>${escapeHtml(text.confirmationDescription || "")}</p>
        <code>${escapeHtml(gate.confirmationPhrase)}</code>
      </div>
    </section>
  `;
}

function renderSaveApplyGateCheckView(check = {}, text = {}, statusLabel = (status) => status || "", blockerFormatter = null) {
  return `
    <article class="editor-save-apply-gate-check" data-save-apply-gate-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.detail ? `<p>${escapeHtml(check.detail)}</p>` : ""}
      ${check.blocker ? editorChip(blockerFormatter ? blockerFormatter(check.blocker) : formatBlocker(check.blocker, text), SAVE_APPLY_GATE_CHIP_OPTIONS) : ""}
    </article>
  `;
}

function formatBlocker(blocker, text = {}) {
  const label = text.blockerLabel || "Blocker";
  return `${label}: ${blocker}`;
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
