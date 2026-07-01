import { createSaveSummaryModel } from "./saveSummaryModel.js?v=678";

export function createEditorSaveSummary(options = {}) {
  return createSaveSummaryModel({
    keys: options.keys || [],
    text: options.saveText || {},
    locale: options.locale,
    translate: options.translate,
    editorVersion: options.editorVersion,
    storage: options.storage,
    now: options.now,
  });
}
