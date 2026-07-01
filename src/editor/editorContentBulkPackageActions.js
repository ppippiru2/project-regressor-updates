export function createEditorContentBulkPackageActions(options = {}) {
  const runtimeState = options.runtimeState;
  if (!runtimeState || typeof runtimeState.getInput !== "function") {
    throw new TypeError("Editor content bulk package actions require a runtime state.");
  }

  const getPanelDetail = typeof options.getPanelDetail === "function" ? options.getPanelDetail : () => null;

  return Object.freeze({
    applyInput,
    applySample,
    resetInput,
    refreshPreview,
    updateDraft,
    applyFile,
    applyReadError,
  });

  function applyInput() {
    runtimeState.applyDraft(resolveDraftText());
  }

  function applySample() {
    runtimeState.applySample();
  }

  function resetInput() {
    runtimeState.reset();
  }

  function refreshPreview() {
    runtimeState.refresh();
  }

  function updateDraft(draftText = "") {
    runtimeState.updateDraft(draftText);
  }

  function applyFile(text = "", fileName = "") {
    runtimeState.applyFile(text, fileName);
  }

  function applyReadError(error = null) {
    runtimeState.applyReadError(error);
  }

  function resolveDraftText() {
    const textarea = getPanelDetail()?.querySelector?.("[data-content-bulk-package-json]");
    if (textarea) return String(textarea.value || "");
    return String(runtimeState.getInput()?.draftText || "");
  }
}
