import { editorChip } from "./editorChipBlockView.js?v=677";

const SAVE_EDIT_WRITER_RISK_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditWriterEnablementRiskView(options = {}) {
  const summary = options.summary || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const checkValue = options.checkValue || `${summary.checkCount || 0}`;
  const blockerValue = options.blockerValue || `${summary.blockerCount || 0}`;
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const checklist = Array.isArray(summary.checklist) ? summary.checklist : [];
  const manualUnlock = summary.manualUnlock || {};
  const requiredReview = Array.isArray(manualUnlock.requiredReview) ? manualUnlock.requiredReview : [];
  const manualBlockers = Array.isArray(manualUnlock.blockers) ? manualUnlock.blockers : [];

  return `
    <section class="editor-save-edit-writer-unlock" data-save-edit-writer-enable-risk-summary data-status="${escapeAttribute(summary.status)}" data-mode="${escapeAttribute(summary.mode)}" data-apply="${escapeAttribute(summary.apply)}" data-unlock="${escapeAttribute(manualUnlock.status)}">
      <div class="editor-save-edit-writer-unlock-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit writer enablement risk")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(summary.status)}">
          ${escapeHtml(statusLabel(summary.status))}
        </span>
      </div>
      <div class="editor-save-edit-writer-unlock-metrics">
        ${metricCard(text.riskMetric || "Risk", summary.riskLevel, text.riskHint || "")}
        ${metricCard(text.checkMetric || "Checklist", checkValue, text.checkHint || "")}
        ${metricCard(text.blockerMetric || "Blockers", blockerValue, text.blockerHint || "")}
        ${metricCard(text.unlockMetric || "Manual unlock", manualUnlock.status, text.unlockHint || "")}
      </div>
      <div class="editor-save-edit-writer-unlock-grid">
        ${checklist.map((check) => renderSaveEditWriterEnablementRiskCheckView(check, statusLabel, blockerFormatter)).join("")}
      </div>
      <div class="editor-save-edit-writer-unlock-manual" data-save-edit-manual-unlock-checklist data-status="${escapeAttribute(manualUnlock.status)}">
        <div>
          <strong>${escapeHtml(text.manualTitle || "Manual unlock checklist")}</strong>
          <span>${escapeHtml(manualUnlock.status)}</span>
        </div>
        <div class="editor-chip-list">
          ${requiredReview.map((item) => editorChip(item, SAVE_EDIT_WRITER_RISK_CHIP_OPTIONS)).join("")}
          ${manualBlockers.map((item) => editorChip(item, SAVE_EDIT_WRITER_RISK_CHIP_OPTIONS)).join("")}
        </div>
      </div>
      <pre class="editor-save-edit-writer-unlock-code"><code>${escapeHtml(JSON.stringify(summary.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditWriterEnablementRiskCheckView(check = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-writer-unlock-check" data-save-edit-writer-unlock-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.detail ? `<p>${escapeHtml(check.detail)}</p>` : ""}
      ${check.blocker ? editorChip(blockerFormatter(check.blocker), SAVE_EDIT_WRITER_RISK_CHIP_OPTIONS) : ""}
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
