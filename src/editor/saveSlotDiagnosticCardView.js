export function renderSaveDiagnosticCardView(options = {}) {
  const card = options.card || {};
  const text = options.text || {};
  const labels = text.labels || {};
  const statusLabel = options.statusLabel || ((status) => status || "");
  const formatNumber = options.formatNumber || ((value) => value);
  const formatValue = options.formatValue || ((value) => value ?? "");
  const summary = card.summary || {};
  const fields = [
    [labels.key || "Key", card.key],
    [labels.status || "Status", statusLabel(card.status)],
    [labels.name || "Name", summary.name],
    [labels.level || "Level", summary.level],
    [labels.gold || "Gold", summary.gold],
    [labels.region || "Region", summary.regionId],
    [labels.inventory || "Inventory", summary.inventoryCount],
    [labels.equipment || "Equipment", summary.equipmentCount],
    [labels.savedAt || "Saved at", summary.savedAt],
    [labels.bytes || "Bytes", formatNumber(card.rawLength)],
  ];
  return `
    <article class="editor-save-diagnostic-card" data-save-slot-id="${escapeAttribute(card.id)}" data-status="${escapeAttribute(card.status)}">
      <div class="editor-save-diagnostic-card-head">
        <strong>${escapeHtml(card.label)}</strong>
        <span>${escapeHtml(statusLabel(card.status))}</span>
      </div>
      <dl>
        ${fields.map(([label, value]) => `
          <div>
            <dt>${escapeHtml(label)}</dt>
            <dd>${escapeHtml(formatValue(value))}</dd>
          </div>
        `).join("")}
      </dl>
      ${card.hint ? `<p>${escapeHtml(card.hint)}</p>` : ""}
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
