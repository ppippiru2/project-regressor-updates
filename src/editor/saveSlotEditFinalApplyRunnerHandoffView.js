import { editorChip } from "./editorChipBlockView.js?v=681";

const SAVE_EDIT_FINAL_APPLY_HANDOFF_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditFinalApplyRunnerHandoffView(options = {}) {
  const checklist = options.checklist || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const checks = Array.isArray(checklist.checks) ? checklist.checks : [];
  const blockerValue = options.blockerValue || `${checklist.blockerCount || 0}`;
  const checkValue = options.checkValue || `${checklist.checkCount || 0}`;
  const blockedValue = options.blockedValue || `${checklist.blockedCheckCount || 0}`;

  return `
    <section class="editor-save-edit-apply-runner-handoff" data-save-edit-final-apply-runner-handoff-checklist data-status="${escapeAttribute(checklist.status)}" data-mode="${escapeAttribute(checklist.mode)}" data-apply="${escapeAttribute(checklist.apply)}">
      <div class="editor-save-edit-apply-runner-handoff-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit final apply runner handoff checklist")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(checklist.status)}">
          ${escapeHtml(statusLabel(checklist.status))}
        </span>
      </div>
      <div class="editor-save-edit-apply-runner-handoff-metrics">
        ${metricCard(text.handoffMetric || "Handoff", checklist.handoff, text.handoffHint || "")}
        ${metricCard(text.blockerMetric || "Blockers", blockerValue, text.blockerHint || "")}
        ${metricCard(text.checkMetric || "Checks", checkValue, text.checkHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-apply-runner-handoff-grid">
        ${checks.map((check) => renderSaveEditFinalApplyRunnerHandoffCheckView(check, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-apply-runner-handoff-code"><code>${escapeHtml(JSON.stringify(checklist.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditFinalApplyRunnerHandoffCheckView(check = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-apply-runner-handoff-check" data-save-edit-final-apply-runner-handoff-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.blocker ? editorChip(blockerFormatter(check.blocker), SAVE_EDIT_FINAL_APPLY_HANDOFF_CHIP_OPTIONS) : ""}
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
