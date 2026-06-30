export function renderSaveSlotDiagnosticsShell(options = {}) {
  const diagnostics = options.diagnostics || {};
  const text = options.text || {};
  const keys = options.keys || {};
  const renderMetricCard = options.renderMetricCard || (() => "");
  const renderDiagnosticCard = options.renderDiagnosticCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const sections = Array.isArray(options.sections) ? options.sections : [];
  const activeSlotValue = options.activeSlotValue || text.emptyValue || "";
  const slotCountText = options.slotCountText || "";
  const slots = Array.isArray(diagnostics.slots) ? diagnostics.slots : [];
  const writeMode = diagnostics.writeMode || {};
  const activeSave = diagnostics.activeSave || {};
  const slotStore = diagnostics.slotStore || {};
  const activeSlot = diagnostics.activeSlot || {};
  const slotCounts = diagnostics.slotCounts || {};

  return `
    <section class="editor-save-diagnostics" data-save-slot-diagnostics>
      <div class="editor-save-diagnostics-head">
        <div>
          <h3>${escapeHtml(text.title || "Save slot diagnostics")}</h3>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(writeMode.status)}">
          ${escapeHtml(statusLabel(writeMode.status))}
        </span>
      </div>
      <div class="editor-save-diagnostics-metrics">
        ${renderMetricCard(
          text.activeSaveMetric || "Active save",
          statusLabel(activeSave.status),
          activeSave.hint || "",
        )}
        ${renderMetricCard(
          text.slotStoreMetric || "Save slots",
          slotCountText || `${slotCounts.filled || 0}/${slotCounts.total || 0}`,
          slotStore.hint || "",
        )}
        ${renderMetricCard(
          text.activeSlotMetric || "Active slot",
          `${statusLabel(activeSlot.status)} · ${activeSlotValue}`,
          activeSlot.hint || "",
        )}
        ${renderMetricCard(
          text.writeModeMetric || "Write mode",
          statusLabel(writeMode.status),
          writeMode.hint || "",
        )}
      </div>
      <div class="editor-save-diagnostics-grid">
        ${renderDiagnosticCard({
          id: "active-save",
          label: text.activeSaveCard || "Active save",
          status: activeSave.status,
          summary: activeSave.summary,
          rawLength: activeSave.rawLength,
          key: keys.activeSave,
        })}
        ${slots.map((slot) => renderDiagnosticCard(slot)).join("")}
      </div>
      ${sections.join("")}
    </section>
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
