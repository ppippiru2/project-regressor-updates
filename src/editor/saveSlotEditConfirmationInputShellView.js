import { editorChip } from "./editorChipBlockView.js?v=681";

const SAVE_EDIT_CONFIRMATION_INPUT_SHELL_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditConfirmationInputShellView(options = {}) {
  const contract = options.contract || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const fieldStatusLabel = options.fieldStatusLabel || ((field) => statusLabel(field?.status));
  const fields = Array.isArray(contract.fields) ? contract.fields : [];
  const checks = Array.isArray(contract.checks) ? contract.checks : [];
  const fieldValue = options.fieldValue || `${contract.fieldCount || 0}`;
  const checkValue = options.checkValue || `${contract.checkCount || 0}`;
  const blockedValue = options.blockedValue || `${contract.blockedCheckCount || 0}`;

  return `
    <section class="editor-save-edit-confirm-input-shell" data-save-edit-confirmation-input-shell-contract data-status="${escapeAttribute(contract.status)}" data-mode="${escapeAttribute(contract.mode)}" data-apply="${escapeAttribute(contract.apply)}">
      <div class="editor-save-edit-confirm-input-shell-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit confirmation input shell contract")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(contract.status)}">
          ${escapeHtml(statusLabel(contract.status))}
        </span>
      </div>
      <div class="editor-save-edit-confirm-input-shell-metrics">
        ${metricCard(text.fieldMetric || "Fields", fieldValue, text.fieldHint || "")}
        ${metricCard(text.phraseMetric || "Phrase", contract.requiredPhrase, text.phraseHint || "")}
        ${metricCard(text.checkMetric || "Checks", checkValue, text.checkHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-confirm-input-shell-grid">
        ${fields.map((field) => renderSaveEditConfirmationInputShellFieldView(field, text, fieldStatusLabel, blockerFormatter)).join("")}
      </div>
      <div class="editor-save-edit-confirm-input-shell-grid">
        ${checks.map((check) => renderSaveEditConfirmationInputShellCheckView(check, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-confirm-input-shell-code"><code>${escapeHtml(JSON.stringify(contract.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditConfirmationInputShellFieldView(field = {}, text = {}, fieldStatusLabel = (value) => value?.status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-confirm-input-shell-card" data-save-edit-confirmation-input-shell-field="${escapeAttribute(field.id)}" data-status="${escapeAttribute(field.status)}">
      <div>
        <strong>${escapeHtml(field.label)}</strong>
        <span>${escapeHtml(fieldStatusLabel(field))}</span>
      </div>
      <dl>
        <div>
          <dt>${escapeHtml(text.fieldKind || "Kind")}</dt>
          <dd>${escapeHtml(field.kind)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.fieldValueLabel || "Value")}</dt>
          <dd>${escapeHtml(`${field.value}`)}</dd>
        </div>
      </dl>
      ${field.blocker ? editorChip(blockerFormatter(field.blocker), SAVE_EDIT_CONFIRMATION_INPUT_SHELL_CHIP_OPTIONS) : ""}
    </article>
  `;
}

function renderSaveEditConfirmationInputShellCheckView(check = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-confirm-input-shell-card" data-save-edit-confirmation-input-shell-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.blocker ? editorChip(blockerFormatter(check.blocker), SAVE_EDIT_CONFIRMATION_INPUT_SHELL_CHIP_OPTIONS) : ""}
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
