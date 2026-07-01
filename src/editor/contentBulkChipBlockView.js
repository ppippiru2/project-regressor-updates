import { editorChipBlock } from "./editorChipBlockView.js?v=679";

export const CONTENT_BULK_CHIP_BLOCK_VIEW_VERSION = "content-bulk-chip-block-view-v1";

export function contentBulkChipBlock(title, values = [], options = {}) {
  return editorChipBlock(title, values, options);
}
