import { editorChip } from "./editorChipBlockView.js?v=679";

const SAVE_RECOVERY_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotRecoveryRehearsalView(options = {}) {
  const rehearsal = options.rehearsal || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => formatBlocker(blocker, text));
  const routeActionFormatter = options.routeActionFormatter || ((action) => formatRouteAction(action, text));
  const snapshotKeys = Array.isArray(rehearsal.snapshotKeys) ? rehearsal.snapshotKeys : [];
  const steps = Array.isArray(rehearsal.steps) ? rehearsal.steps : [];
  const failureRoutes = Array.isArray(rehearsal.failureRoutes) ? rehearsal.failureRoutes : [];
  const keyValue = options.keyValue || `${rehearsal.readableKeys || 0}/${snapshotKeys.length}`;
  const stepValue = options.stepValue || `${steps.length}`;
  const blockedValue = options.blockedValue || `${rehearsal.blockedSteps || 0}`;
  const routeValue = options.routeValue || `${failureRoutes.length}`;

  return `
    <section class="editor-save-recovery" data-save-recovery-rehearsal>
      <div class="editor-save-recovery-head">
        <div>
          <h4>${escapeHtml(text.title || "Save recovery rehearsal")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(rehearsal.status)}">
          ${escapeHtml(statusLabel(rehearsal.status))}
        </span>
      </div>
      <div class="editor-save-recovery-metrics">
        ${metricCard(text.keyMetric || "Snapshot keys", keyValue, text.keyHint || "")}
        ${metricCard(text.stepMetric || "Steps", stepValue, text.stepHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
        ${metricCard(text.routeMetric || "Failure routes", routeValue, text.routeHint || "")}
      </div>
      <div class="editor-save-recovery-grid">
        ${snapshotKeys.map((item) => renderSaveRecoveryKeyView(item, statusLabel)).join("")}
      </div>
      <div class="editor-save-recovery-steps">
        ${steps.map((step) => renderSaveRecoveryStepView(step, statusLabel, blockerFormatter)).join("")}
      </div>
      <div class="editor-save-recovery-routes">
        ${failureRoutes.map((route) => renderSaveRecoveryRouteView(route, routeActionFormatter)).join("")}
      </div>
    </section>
  `;
}

function renderSaveRecoveryKeyView(item = {}, statusLabel = (status) => status || "") {
  return `
    <article class="editor-save-recovery-key" data-save-recovery-key="${escapeAttribute(item.key)}" data-status="${escapeAttribute(item.status)}">
      <div>
        <strong>${escapeHtml(item.label)}</strong>
        <span>${escapeHtml(statusLabel(item.status))}</span>
      </div>
      <code>${escapeHtml(item.key)}</code>
      ${item.detail ? `<p>${escapeHtml(item.detail)}</p>` : ""}
    </article>
  `;
}

function renderSaveRecoveryStepView(step = {}, statusLabel = (status) => status || "", blockerFormatter = null) {
  return `
    <article class="editor-save-recovery-step" data-save-recovery-step="${escapeAttribute(step.id)}" data-status="${escapeAttribute(step.status)}">
      <div>
        <strong>${escapeHtml(step.label)}</strong>
        <span>${escapeHtml(statusLabel(step.status))}</span>
      </div>
      ${step.detail ? `<p>${escapeHtml(step.detail)}</p>` : ""}
      ${step.blocker ? editorChip(blockerFormatter ? blockerFormatter(step.blocker) : step.blocker, SAVE_RECOVERY_CHIP_OPTIONS) : ""}
    </article>
  `;
}

function renderSaveRecoveryRouteView(route = {}, routeActionFormatter = (action) => action || "") {
  return `
    <article class="editor-save-recovery-route" data-save-recovery-route="${escapeAttribute(route.id)}">
      <strong>${escapeHtml(route.label)}</strong>
      <p>${escapeHtml(route.detail)}</p>
      ${editorChip(routeActionFormatter(route.action), SAVE_RECOVERY_CHIP_OPTIONS)}
    </article>
  `;
}

function formatBlocker(blocker, text = {}) {
  const label = text.blockerLabel || "Blocker";
  return `${label}: ${blocker}`;
}

function formatRouteAction(action, text = {}) {
  const label = text.routeActionLabel || "Action";
  return `${label}: ${action}`;
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
