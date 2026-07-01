import { editorChip } from "./editorChipBlockView.js?v=680";

const SAVE_EDIT_VALIDATOR_PREFLIGHT_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditValidatorConfirmationPreflightView(options = {}) {
  const preflight = options.preflight || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const groupBlockerValueFormatter = options.groupBlockerValueFormatter || ((count) => `${count}`);
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const groups = Array.isArray(preflight.groups) ? preflight.groups : [];
  const checks = Array.isArray(preflight.checks) ? preflight.checks : [];
  const blockerValue = options.blockerValue || `${preflight.blockerCount || 0}`;
  const checkValue = options.checkValue || `${preflight.checkCount || 0}`;
  const blockedValue = options.blockedValue || `${preflight.blockedCheckCount || 0}`;

  return `
    <section class="editor-save-edit-validator-preflight" data-save-edit-validator-confirmation-preflight data-status="${escapeAttribute(preflight.status)}" data-mode="${escapeAttribute(preflight.mode)}" data-apply="${escapeAttribute(preflight.apply)}">
      <div class="editor-save-edit-validator-preflight-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit validator confirmation preflight")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(preflight.status)}">
          ${escapeHtml(statusLabel(preflight.status))}
        </span>
      </div>
      <div class="editor-save-edit-validator-preflight-metrics">
        ${metricCard(text.blockerMetric || "Blockers", blockerValue, text.blockerHint || "")}
        ${metricCard(text.checkMetric || "Checks", checkValue, text.checkHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
        ${metricCard(text.phraseMetric || "Phrase", preflight.requiredPhrase, text.phraseHint || "")}
      </div>
      <div class="editor-save-edit-validator-preflight-groups">
        ${groups.map((group) => renderSaveEditValidatorConfirmationPreflightGroupView(group, text, groupBlockerValueFormatter)).join("")}
      </div>
      <div class="editor-save-edit-validator-preflight-grid">
        ${checks.map((check) => renderSaveEditValidatorConfirmationPreflightCheckView(check, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-validator-preflight-code"><code>${escapeHtml(JSON.stringify(preflight.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditValidatorConfirmationPreflightGroupView(group = {}, text = {}, groupBlockerValueFormatter = (count) => `${count}`) {
  const blockers = Array.isArray(group.blockers) ? group.blockers : [];
  return `
    <article class="editor-save-edit-validator-preflight-group" data-save-edit-validator-confirmation-preflight-group="${escapeAttribute(group.id)}">
      <div>
        <strong>${escapeHtml(group.label)}</strong>
        <span>${escapeHtml(groupBlockerValueFormatter(group.blockerCount || 0))}</span>
      </div>
      <div class="editor-chip-list">
        ${blockers.map((blocker) => editorChip(blocker, SAVE_EDIT_VALIDATOR_PREFLIGHT_CHIP_OPTIONS)).join("") || editorChip(text.noBlocker || "no-blocker", SAVE_EDIT_VALIDATOR_PREFLIGHT_CHIP_OPTIONS)}
      </div>
    </article>
  `;
}

function renderSaveEditValidatorConfirmationPreflightCheckView(check = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-validator-preflight-check" data-save-edit-validator-confirmation-preflight-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.detail ? `<p>${escapeHtml(check.detail)}</p>` : ""}
      ${check.blocker ? editorChip(blockerFormatter(check.blocker), SAVE_EDIT_VALIDATOR_PREFLIGHT_CHIP_OPTIONS) : ""}
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
