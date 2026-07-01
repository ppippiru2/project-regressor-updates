import { renderRetargetPreviewDetailView } from "./retargetPreviewDetailView.js?v=678";

export function createRetargetPreviewDetailRenderer(options = {}) {
  const createPreview = typeof options.createPreview === "function" ? options.createPreview : () => ({});

  return function renderRetargetPreviewDetailSection({
    detailText = {},
    filter = {},
    expandedRows = new Set(),
  } = {}) {
    return renderRetargetPreviewDetailView({
      preview: createPreview(),
      detailText,
      filter,
      expandedRows,
    });
  };
}
