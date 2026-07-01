export function handleEditorSearchInputEvent(event, options = {}) {
  const selector = options.selector || "";
  const input = selector ? event?.target?.closest?.(selector) : null;
  if (!input) return false;

  const value = String(input.value || "");
  const cursor = input.selectionStart ?? value.length;
  const update = typeof options.update === "function" ? options.update : () => {};
  const render = typeof options.render === "function" ? options.render : () => {};
  const container = options.container || null;

  update(value, input);
  render();
  restoreEditorSearchInputCursor(container, selector, cursor);
  return true;
}

export function restoreEditorSearchInputCursor(container, selector, cursor) {
  if (!container || !selector) return false;
  const input = container.querySelector(selector);
  if (!input) return false;
  input.focus();
  if (typeof input.setSelectionRange === "function") {
    input.setSelectionRange(cursor, cursor);
  }
  return true;
}
