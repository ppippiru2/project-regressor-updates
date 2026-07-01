import { tf } from "../localization/index.js?v=678";

export const BALANCE_TUNING_DETAIL_VIEW_VERSION = "balance-tuning-detail-view-v1";

export function renderBalanceTuningDetailView({
  detailText = {},
  groupCount = 0,
  fileCount = 0,
  exportCount = 0,
  sections = [],
  rowsHtml = "",
} = {}) {
  return `
    <section class="editor-balance-detail" aria-label="${escapeAttribute(detailText.title || "Balance Tuning Detail")}">
      <div class="editor-balance-head">
        <div>
          <h3>${escapeHtml(detailText.title || "")}</h3>
          <p class="muted">${escapeHtml(detailText.description || "")}</p>
        </div>
        <span>${escapeHtml(tf("editorPrep.balanceTuningDetail.summary", {
          groupCount,
          fileCount,
          exportCount
        }, ""))}</span>
      </div>
      ${sections.filter(Boolean).join("")}
      <div class="editor-balance-list">
        ${rowsHtml}
      </div>
    </section>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replace(/`/g, "&#096;");
}
