import { editorChip } from "./editorChipBlockView.js?v=680";

const SAVE_EDIT_COMPAT_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditCompatibilityConfirmationRollupView(options = {}) {
  const rollup = options.rollup || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const laneBlockerValueFormatter = options.laneBlockerValueFormatter || ((count) => `${count}`);
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const lanes = Array.isArray(rollup.lanes) ? rollup.lanes : [];
  const checks = Array.isArray(rollup.checks) ? rollup.checks : [];
  const laneValue = options.laneValue || `${rollup.laneCount || 0}`;
  const blockerValue = options.blockerValue || `${rollup.blockerCount || 0}`;
  const checkValue = options.checkValue || `${rollup.checkCount || 0}`;
  const blockedValue = options.blockedValue || `${rollup.blockedCheckCount || 0}`;

  return `
    <section class="editor-save-edit-compat-confirm-rollup" data-save-edit-compatibility-confirmation-rollup data-status="${escapeAttribute(rollup.status)}" data-mode="${escapeAttribute(rollup.mode)}" data-apply="${escapeAttribute(rollup.apply)}">
      <div class="editor-save-edit-compat-confirm-rollup-head">
        <div>
          <span class="eyebrow">${escapeHtml(rollup.version)}</span>
          <h4>${escapeHtml(text.title || "Save edit compatibility to confirmation rollup")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only blocker rollup before confirmation preflight can be converted into real controls.")}</p>
        </div>
        ${editorChip(statusLabel(rollup.status), SAVE_EDIT_COMPAT_CHIP_OPTIONS)}
      </div>
      <div class="editor-save-edit-compat-confirm-rollup-metrics">
        ${metricCard(text.laneMetric || "Lanes", laneValue, text.laneHint || "")}
        ${metricCard(text.blockerMetric || "Blockers", blockerValue, text.blockerHint || "")}
        ${metricCard(text.checkMetric || "Checks", checkValue, text.checkHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-compat-confirm-rollup-lanes">
        ${lanes.map((lane) => renderSaveEditCompatibilityConfirmationRollupLaneView(lane, text, statusLabel, laneBlockerValueFormatter)).join("")}
      </div>
      <div class="editor-save-edit-compat-confirm-rollup-grid">
        ${checks.map((check) => renderSaveEditCompatibilityConfirmationRollupCheckView(check, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-compat-confirm-rollup-code"><code>${escapeHtml(JSON.stringify(rollup.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditCompatibilityConfirmationRollupLaneView(lane = {}, text = {}, statusLabel = (status) => status || "", laneBlockerValueFormatter = (count) => `${count}`) {
  const blockers = Array.isArray(lane.blockers) ? lane.blockers : [];
  return `
    <article class="editor-save-edit-compat-confirm-rollup-lane" data-save-edit-compat-confirm-rollup-lane="${escapeAttribute(lane.id)}" data-status="${escapeAttribute(lane.status)}">
      <div>
        <strong>${escapeHtml(lane.label)}</strong>
        <span>${escapeHtml(statusLabel(lane.status))}</span>
      </div>
      <dl>
        <div>
          <dt>${escapeHtml(text.sourceLabel || "Source")}</dt>
          <dd>${escapeHtml(lane.source)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.laneBlockerLabel || "Blockers")}</dt>
          <dd>${escapeHtml(laneBlockerValueFormatter(lane.blockerCount || 0))}</dd>
        </div>
      </dl>
      <div class="editor-chip-list">
        ${blockers.map((blocker) => editorChip(blocker, SAVE_EDIT_COMPAT_CHIP_OPTIONS)).join("") || editorChip(text.noBlocker || "no-blocker", SAVE_EDIT_COMPAT_CHIP_OPTIONS)}
      </div>
    </article>
  `;
}

function renderSaveEditCompatibilityConfirmationRollupCheckView(check = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-compat-confirm-rollup-check" data-save-edit-compat-confirm-rollup-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.detail ? `<p>${escapeHtml(check.detail)}</p>` : ""}
      ${check.blocker ? editorChip(blockerFormatter(check.blocker), SAVE_EDIT_COMPAT_CHIP_OPTIONS) : ""}
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
