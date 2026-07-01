import {
  CONTENT_BULK_PACKAGE_TEMPLATE_FILE_NAME,
  createContentBulkPatchFilePatchDraftExportFromPackageInput,
  createContentBulkPatchPackageAppliedInput,
  createContentBulkPatchPackageDraftInput,
  createContentBulkPatchPackageFileInput,
  createContentBulkPatchPackagePreviewFromInput,
  createContentBulkPatchPackageReadErrorInput,
  createContentBulkPatchPackageSampleInput,
  createContentBulkPatchPackageTemplatePayload,
} from "./contentBulkPatchPackageInputActions.js?v=679";
import { normalizeContentBulkPatchPackageInput } from "./contentBulkPatchPackageInputStore.js?v=679";

export {
  CONTENT_BULK_PACKAGE_TEMPLATE_FILE_NAME,
  createContentBulkPatchPackageTemplatePayload,
};

export function createContentBulkPatchPackageInputController(options = {}) {
  const store = options.store;
  let input = normalizeContentBulkPatchPackageInput((store?.load ? store.load() : null) || {});
  let parseError = "";
  let adapterPreview = {};
  let filePatchDraftExport = {};

  refreshPreviewState();

  return Object.freeze({
    getState,
    updateDraft,
    applyDraft,
    applySample,
    applyFile,
    applyReadError,
    reset,
    refresh,
  });

  function getState() {
    return {
      input,
      parseError,
      adapterPreview,
      filePatchDraftExport,
    };
  }

  function updateDraft(draftText = "") {
    input = createContentBulkPatchPackageDraftInput(input, draftText);
    persistInput();
  }

  function applyDraft(draftText = "") {
    input = createContentBulkPatchPackageAppliedInput(input, draftText);
    persistInput();
    refreshPreviewState();
  }

  function applySample() {
    input = createContentBulkPatchPackageSampleInput();
    persistInput();
    refreshPreviewState();
  }

  function applyFile(text = "", fileName = "") {
    input = createContentBulkPatchPackageFileInput(text, fileName);
    persistInput();
    refreshPreviewState();
  }

  function applyReadError(error = null) {
    input = createContentBulkPatchPackageReadErrorInput(input, error);
    parseError = "";
    persistInput();
  }

  function reset() {
    input = normalizeContentBulkPatchPackageInput(store?.reset ? store.reset() : {});
    parseError = "";
    refreshPreviewState();
  }

  function refresh() {
    refreshPreviewState();
  }

  function refreshPreviewState() {
    const result = createContentBulkPatchPackagePreviewFromInput(input);
    parseError = result.parseError;
    adapterPreview = result.preview;
    filePatchDraftExport = createContentBulkPatchFilePatchDraftExportFromPackageInput(input, adapterPreview);
  }

  function persistInput() {
    if (!store?.persist) return;
    store.persist(input);
  }
}
