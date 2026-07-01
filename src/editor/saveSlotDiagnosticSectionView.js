export function renderSaveSlotDiagnosticSections(sectionDefinitions = [], options = {}) {
  const diagnostics = options.diagnostics || {};
  return sectionDefinitions.map((definition) =>
    renderSaveSlotDiagnosticSection(definition.id, () => definition.render(diagnostics), options),
  );
}

export function renderSaveSlotDiagnosticSection(id, renderSection, options = {}) {
  try {
    return renderSection();
  } catch (error) {
    return renderSaveSlotDiagnosticError(id, error, options);
  }
}

function renderSaveSlotDiagnosticError(id, error, options = {}) {
  const statusLabel = options.statusLabel || ((status) => status || "");
  return `
    <section class="editor-save-diagnostics-error" data-save-diagnostics-error="${escapeAttribute(id)}" data-status="blocked">
      <h4>${escapeHtml(statusLabel("blocked"))}</h4>
      <p>${escapeHtml(error?.message || id)}</p>
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
