import { editorChip } from "./editorChipBlockView.js?v=677";

const SAVE_EDIT_CONFIRMATION_CONTRACT_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditConfirmationInputContractView(options = {}) {
  const contract = options.contract || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const fields = Array.isArray(contract.fields) ? contract.fields : [];
  const applyRunner = contract.applyRunner || {};
  const runnerRequires = Array.isArray(applyRunner.requires) ? applyRunner.requires : [];
  const runnerBlockers = Array.isArray(applyRunner.blockers) ? applyRunner.blockers : [];
  const fieldValue = options.fieldValue || `${contract.fieldCount || 0}`;
  const guardValue = options.guardValue || `${contract.guardCount || 0}`;
  const blockerValue = options.blockerValue || `${contract.blockerCount || 0}`;

  return `
    <section class="editor-save-edit-confirmation-contract" data-save-edit-confirmation-input-contract data-status="${escapeAttribute(contract.status)}" data-mode="${escapeAttribute(contract.mode)}" data-apply="${escapeAttribute(contract.apply)}">
      <div class="editor-save-edit-confirmation-contract-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit confirmation input contract")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(contract.status)}">
          ${escapeHtml(statusLabel(contract.status))}
        </span>
      </div>
      <div class="editor-save-edit-confirmation-contract-metrics">
        ${metricCard(text.fieldMetric || "Fields", fieldValue, text.fieldHint || "")}
        ${metricCard(text.guardMetric || "Guards", guardValue, text.guardHint || "")}
        ${metricCard(text.blockerMetric || "Blockers", blockerValue, text.blockerHint || "")}
        ${metricCard(text.runnerMetric || "Runner", applyRunner.status, text.runnerHint || "")}
      </div>
      <div class="editor-save-edit-confirmation-contract-grid">
        ${fields.map((field) => renderSaveEditConfirmationInputContractFieldView(field, text)).join("")}
      </div>
      <div class="editor-save-edit-confirmation-runner" data-save-edit-apply-runner-contract data-status="${escapeAttribute(applyRunner.status)}">
        <div>
          <strong>${escapeHtml(text.runnerTitle || "Apply runner contract")}</strong>
          <span>${escapeHtml(applyRunner.status)}</span>
        </div>
        <div class="editor-chip-list">
          ${runnerRequires.map((item) => editorChip(item, SAVE_EDIT_CONFIRMATION_CONTRACT_CHIP_OPTIONS)).join("")}
          ${runnerBlockers.map((item) => editorChip(item, SAVE_EDIT_CONFIRMATION_CONTRACT_CHIP_OPTIONS)).join("")}
        </div>
      </div>
      <pre class="editor-save-edit-confirmation-contract-code"><code>${escapeHtml(JSON.stringify(contract.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditConfirmationInputContractFieldView(field = {}, text = {}) {
  return `
    <article class="editor-save-edit-confirmation-contract-field" data-save-edit-confirmation-input-field="${escapeAttribute(field.id)}" data-status="${escapeAttribute(field.status)}">
      <div>
        <strong>${escapeHtml(field.label)}</strong>
        <span>${escapeHtml(field.status)}</span>
      </div>
      <dl>
        <div>
          <dt>${escapeHtml(text.inputKind || "Input kind")}</dt>
          <dd>${escapeHtml(field.inputKind)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.previewValue || "Preview")}</dt>
          <dd>${escapeHtml(field.previewValue)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.blocker || "Blocker")}</dt>
          <dd>${escapeHtml(field.blocker)}</dd>
        </div>
      </dl>
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
