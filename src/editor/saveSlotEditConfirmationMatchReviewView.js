import { editorChip } from "./editorChipBlockView.js?v=678";

const SAVE_EDIT_CONFIRMATION_MATCH_REVIEW_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditConfirmationMatchReviewView(options = {}) {
  const summary = options.summary || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const reviews = Array.isArray(summary.reviews) ? summary.reviews : [];
  const checks = Array.isArray(summary.checks) ? summary.checks : [];
  const reviewValue = options.reviewValue || `${summary.reviewCount || 0}`;
  const checkValue = options.checkValue || `${summary.checkCount || 0}`;
  const blockedValue = options.blockedValue || `${summary.blockedCheckCount || 0}`;

  return `
    <section class="editor-save-edit-confirm-match-review" data-save-edit-confirmation-match-review-summary data-status="${escapeAttribute(summary.status)}" data-mode="${escapeAttribute(summary.mode)}" data-apply="${escapeAttribute(summary.apply)}">
      <div class="editor-save-edit-confirm-match-review-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit confirmation match review summary")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(summary.status)}">
          ${escapeHtml(statusLabel(summary.status))}
        </span>
      </div>
      <div class="editor-save-edit-confirm-match-review-metrics">
        ${metricCard(text.reviewMetric || "Review rows", reviewValue, text.reviewHint || "")}
        ${metricCard(text.sourceMetric || "Result source", summary.resultSource, text.sourceHint || "")}
        ${metricCard(text.checkMetric || "Checks", checkValue, text.checkHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-confirm-match-review-grid">
        ${reviews.map((review) => renderSaveEditConfirmationMatchReviewRowView(review, text, statusLabel, blockerFormatter)).join("")}
      </div>
      <div class="editor-save-edit-confirm-match-review-grid">
        ${checks.map((check) => renderSaveEditConfirmationMatchReviewCheckView(check, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-confirm-match-review-code"><code>${escapeHtml(JSON.stringify(summary.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditConfirmationMatchReviewRowView(review = {}, text = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-confirm-match-review-card" data-save-edit-confirmation-match-review-row="${escapeAttribute(review.id)}" data-status="${escapeAttribute(review.status)}">
      <div>
        <strong>${escapeHtml(review.label)}</strong>
        <span>${escapeHtml(statusLabel(review.status))}</span>
      </div>
      <dl>
        <div>
          <dt>${escapeHtml(text.reviewValueLabel || "Value")}</dt>
          <dd>${escapeHtml(`${review.value}`)}</dd>
        </div>
      </dl>
      ${review.blocker ? editorChip(blockerFormatter(review.blocker), SAVE_EDIT_CONFIRMATION_MATCH_REVIEW_CHIP_OPTIONS) : ""}
    </article>
  `;
}

function renderSaveEditConfirmationMatchReviewCheckView(check = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-confirm-match-review-card" data-save-edit-confirmation-match-review-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.blocker ? editorChip(blockerFormatter(check.blocker), SAVE_EDIT_CONFIRMATION_MATCH_REVIEW_CHIP_OPTIONS) : ""}
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
