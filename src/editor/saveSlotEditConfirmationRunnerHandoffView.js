import { editorChip } from "./editorChipBlockView.js?v=678";

const SAVE_EDIT_CONFIRMATION_RUNNER_HANDOFF_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditConfirmationRunnerHandoffView(options = {}) {
  const summary = options.summary || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const rows = Array.isArray(summary.rows) ? summary.rows : [];
  const checks = Array.isArray(summary.checks) ? summary.checks : [];
  const rowValue = options.rowValue || `${summary.rowCount || 0}`;
  const blockerValue = options.blockerValue || `${summary.blockerCount || 0}`;
  const checkValue = options.checkValue || `${summary.checkCount || 0}`;
  const blockedValue = options.blockedValue || `${summary.blockedCheckCount || 0}`;

  return `
    <section class="editor-save-edit-confirm-runner-handoff" data-save-edit-confirmation-runner-handoff-summary data-status="${escapeAttribute(summary.status)}" data-mode="${escapeAttribute(summary.mode)}" data-apply="${escapeAttribute(summary.apply)}">
      <div class="editor-save-edit-confirm-runner-handoff-head">
        <div>
          <span class="eyebrow">${escapeHtml(summary.version)}</span>
          <h4>${escapeHtml(text.title || "Save edit confirmation to runner handoff")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only blocker summary before confirmation input can hand off to an apply runner.")}</p>
        </div>
        ${editorChip(statusLabel(summary.status), SAVE_EDIT_CONFIRMATION_RUNNER_HANDOFF_CHIP_OPTIONS)}
      </div>
      <div class="editor-save-edit-confirm-runner-handoff-metrics">
        ${metricCard(text.rowMetric || "Rows", rowValue, text.rowHint || "")}
        ${metricCard(text.blockerMetric || "Blockers", blockerValue, text.blockerHint || "")}
        ${metricCard(text.checkMetric || "Checks", checkValue, text.checkHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-confirm-runner-handoff-grid">
        ${rows.map((row) => renderSaveEditConfirmationRunnerHandoffRowView(row, text, statusLabel, blockerFormatter)).join("")}
      </div>
      <div class="editor-save-edit-confirm-runner-handoff-checks">
        ${checks.map((check) => renderSaveEditConfirmationRunnerHandoffCheckView(check, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-confirm-runner-handoff-code"><code>${escapeHtml(JSON.stringify(summary.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditConfirmationRunnerHandoffRowView(row = {}, text = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-confirm-runner-handoff-row" data-save-edit-confirmation-runner-handoff-row="${escapeAttribute(row.id)}" data-status="${escapeAttribute(row.status)}">
      <div>
        <strong>${escapeHtml(row.label)}</strong>
        <span>${escapeHtml(statusLabel(row.status))}</span>
      </div>
      <dl>
        <div>
          <dt>${escapeHtml(text.sourceValueLabel || "Source")}</dt>
          <dd>${escapeHtml(`${row.sourceValue}`)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.targetValueLabel || "Target")}</dt>
          <dd>${escapeHtml(`${row.targetValue}`)}</dd>
        </div>
      </dl>
      ${row.blocker ? editorChip(blockerFormatter(row.blocker), SAVE_EDIT_CONFIRMATION_RUNNER_HANDOFF_CHIP_OPTIONS) : ""}
    </article>
  `;
}

function renderSaveEditConfirmationRunnerHandoffCheckView(check = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-confirm-runner-handoff-check" data-save-edit-confirmation-runner-handoff-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.detail ? `<p>${escapeHtml(check.detail)}</p>` : ""}
      ${check.blocker ? editorChip(blockerFormatter(check.blocker), SAVE_EDIT_CONFIRMATION_RUNNER_HANDOFF_CHIP_OPTIONS) : ""}
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
