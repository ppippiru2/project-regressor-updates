import { editorChip } from "./editorChipBlockView.js?v=676";

const SAVE_EDIT_SELECTED_SOURCE_HANDOFF_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditSelectedSourceHandoffView(options = {}) {
  const contract = options.contract || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const checks = Array.isArray(contract.checks) ? contract.checks : [];
  const fieldValue = options.fieldValue || `${contract.fieldCount || 0}`;
  const checkValue = options.checkValue || `${contract.checkCount || 0}`;
  const blockedValue = options.blockedValue || `${contract.blockedCheckCount || 0}`;

  return `
    <section class="editor-save-edit-source-handoff" data-save-edit-selected-source-handoff-contract data-status="${escapeAttribute(contract.status)}" data-mode="${escapeAttribute(contract.mode)}" data-apply="${escapeAttribute(contract.apply)}">
      <div class="editor-save-edit-source-handoff-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit selected source handoff contract")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(contract.status)}">
          ${escapeHtml(statusLabel(contract.status))}
        </span>
      </div>
      <div class="editor-save-edit-source-handoff-metrics">
        ${metricCard(text.sourceMetric || "Source", contract.selectedSource, text.sourceHint || "")}
        ${metricCard(text.fieldMetric || "Payload fields", fieldValue, text.fieldHint || "")}
        ${metricCard(text.checkMetric || "Checks", checkValue, text.checkHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-source-handoff-grid">
        ${checks.map((check) => renderSaveEditSelectedSourceHandoffCheckView(check, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-source-handoff-code"><code>${escapeHtml(JSON.stringify(contract.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditSelectedSourceHandoffCheckView(check = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-source-handoff-check" data-save-edit-selected-source-handoff-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.blocker ? editorChip(blockerFormatter(check.blocker), SAVE_EDIT_SELECTED_SOURCE_HANDOFF_CHIP_OPTIONS) : ""}
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
