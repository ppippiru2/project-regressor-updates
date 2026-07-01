import { editorChip } from "./editorChipBlockView.js?v=681";

const SAVE_EDIT_WRITER_CHECKPOINT_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditWriterPayloadCheckpointView(options = {}) {
  const review = options.review || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const targetValue = options.targetValue || `${review.targetCount || 0}`;
  const checkValue = options.checkValue || `${review.checkCount || 0}`;
  const blockedValue = options.blockedValue || `${review.blockedCheckCount || 0}`;
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const checks = Array.isArray(review.checks) ? review.checks : [];
  const rollbackCheckpoint = review.rollbackCheckpoint || {};
  const rollbackKeys = Array.isArray(rollbackCheckpoint.keys) ? rollbackCheckpoint.keys : [];
  const rollbackBlockers = Array.isArray(rollbackCheckpoint.blockers) ? rollbackCheckpoint.blockers : [];

  return `
    <section class="editor-save-edit-writer-checkpoint" data-save-edit-writer-payload-checkpoint data-status="${escapeAttribute(review.status)}" data-mode="${escapeAttribute(review.mode)}" data-apply="${escapeAttribute(review.apply)}">
      <div class="editor-save-edit-writer-checkpoint-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit writer payload checkpoint")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(review.status)}">
          ${escapeHtml(statusLabel(review.status))}
        </span>
      </div>
      <div class="editor-save-edit-writer-checkpoint-metrics">
        ${metricCard(text.targetMetric || "Targets", targetValue, text.targetHint || "")}
        ${metricCard(text.checkMetric || "Checks", checkValue, text.checkHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
        ${metricCard(text.checkpointMetric || "Checkpoint", rollbackCheckpoint.status, text.checkpointHint || "")}
      </div>
      <div class="editor-save-edit-writer-checkpoint-grid">
        ${checks.map((check) => renderSaveEditWriterPayloadCheckpointCheckView(check, statusLabel, blockerFormatter)).join("")}
      </div>
      <div class="editor-save-edit-writer-checkpoint-route" data-save-edit-rollback-checkpoint-contract data-status="${escapeAttribute(rollbackCheckpoint.status)}">
        <div>
          <strong>${escapeHtml(text.rollbackTitle || "Rollback checkpoint contract")}</strong>
          <span>${escapeHtml(rollbackCheckpoint.status)}</span>
        </div>
        <div class="editor-chip-list">
          ${rollbackKeys.map((item) => editorChip(item, SAVE_EDIT_WRITER_CHECKPOINT_CHIP_OPTIONS)).join("")}
          ${rollbackBlockers.map((item) => editorChip(item, SAVE_EDIT_WRITER_CHECKPOINT_CHIP_OPTIONS)).join("")}
        </div>
      </div>
      <pre class="editor-save-edit-writer-checkpoint-code"><code>${escapeHtml(JSON.stringify(review.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditWriterPayloadCheckpointCheckView(check = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-writer-checkpoint-check" data-save-edit-writer-payload-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.detail ? `<p>${escapeHtml(check.detail)}</p>` : ""}
      ${check.blocker ? editorChip(blockerFormatter(check.blocker), SAVE_EDIT_WRITER_CHECKPOINT_CHIP_OPTIONS) : ""}
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
