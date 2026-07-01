export const EDITOR_STATUS_LABELS_VERSION = "editor-status-labels-v1";

export function createEditorStatusLabelFormatter(options = {}) {
  const labels = options.labels || {};
  return function formatEditorStatusLabel(status = "planned") {
    return labels[status] || status;
  };
}
