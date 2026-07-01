import { renderInitialPlayerSetupPreviewView } from "./initialPlayerSetupPreviewView.js?v=680";

export function createInitialPlayerSetupPreviewRenderer(options = {}) {
  return function renderInitialPlayerSetupPreviewSection(text = {}) {
    const getPreview = typeof options.getPreview === "function" ? options.getPreview : () => ({});
    return renderInitialPlayerSetupPreviewView(getPreview(), text);
  };
}
