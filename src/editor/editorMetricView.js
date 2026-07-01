export function renderEditorMetricCard(label, value, hint) {
  return `
    <article class="editor-metric-card">
      <span>${escapeHtml(label)}</span>
      <strong>${escapeHtml(value)}</strong>
      <small>${escapeHtml(hint)}</small>
    </article>
  `;
}

export function renderEditorSummaryCard(label, value) {
  return `
    <span>
      <small>${escapeHtml(label || "")}</small>
      <b>${escapeHtml(value)}</b>
    </span>
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
