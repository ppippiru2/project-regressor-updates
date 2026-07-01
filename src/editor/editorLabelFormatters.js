export const EDITOR_LABEL_FORMATTERS_VERSION = "editor-label-formatters-v1";

export function editorFallbackLabel(id, labels = {}, fallback = "unknown") {
  return labels?.[id] || id || fallback;
}
