export const EDITOR_CHIP_BLOCK_VIEW_VERSION = "editor-chip-block-view-v1";

export function editorChip(value, options = {}) {
  const chipClass = options.chipClass ? ` class="${escapeAttribute(options.chipClass)}"` : "";
  return `<span${chipClass}>${escapeHtml(value)}</span>`;
}

export function editorChipBlock(title, values = [], options = {}) {
  const blockClass = Object.hasOwn(options, "blockClass") ? options.blockClass : "editor-balance-chip-block";
  const blockClassAttribute = blockClass ? ` class="${escapeAttribute(blockClass)}"` : "";
  const titleTag = options.titleTag || "span";
  const rawValues = Array.isArray(values) ? values : [values];
  const normalizedValues = options.filterEmpty
    ? rawValues.filter((value) => value !== undefined && value !== null && value !== "")
    : rawValues;
  if (options.hideWhenEmpty && normalizedValues.length <= 0) return "";
  const emptyChip = Object.hasOwn(options, "emptyValue")
    ? editorChip(options.emptyValue, options)
    : "";
  return `
    <div${blockClassAttribute}>
      <${titleTag}>${escapeHtml(title)}</${titleTag}>
      <div class="editor-chip-list">${normalizedValues.length ? normalizedValues.map((value) => editorChip(value, options)).join("") : emptyChip}</div>
    </div>
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
  return escapeHtml(value);
}
