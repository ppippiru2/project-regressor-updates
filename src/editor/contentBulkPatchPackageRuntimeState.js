import { createContentBulkPatchReadinessPlanBundle } from "./contentBulkPatchReadinessPlanBundle.js?v=679&cachebust=679";

const EMPTY_PACKAGE_STATE = Object.freeze({
  input: {},
  parseError: "",
  adapterPreview: {},
  filePatchDraftExport: {},
});

export function createContentBulkPatchPackageRuntimeState(options = {}) {
  const controller = options.controller;
  if (!controller || typeof controller.getState !== "function") {
    throw new TypeError("Content bulk package runtime state requires an input controller.");
  }

  let packageState = normalizePackageState(controller.getState());
  let readinessPlanBundle = createReadinessPlanBundle(packageState.filePatchDraftExport);

  return Object.freeze({
    getInput,
    getParseError,
    getAdapterPreview,
    getFilePatchDraftExport,
    getApplyGatePlan,
    getBackupPlan,
    getRestoreRehearsal,
    updateDraft,
    applyDraft,
    applySample,
    applyFile,
    applyReadError,
    reset,
    refresh,
    refreshReadinessPlans,
  });

  function getInput() {
    return packageState.input;
  }

  function getParseError() {
    return packageState.parseError;
  }

  function getAdapterPreview() {
    return packageState.adapterPreview;
  }

  function getFilePatchDraftExport() {
    return packageState.filePatchDraftExport;
  }

  function getApplyGatePlan() {
    return readinessPlanBundle.applyGatePlan;
  }

  function getBackupPlan() {
    return readinessPlanBundle.backupPlan;
  }

  function getRestoreRehearsal() {
    return readinessPlanBundle.restoreRehearsal;
  }

  function updateDraft(draftText = "") {
    controller.updateDraft(draftText);
    syncPackageState();
  }

  function applyDraft(draftText = "") {
    controller.applyDraft(draftText);
    syncPackageState();
    refreshReadinessPlans();
  }

  function applySample() {
    controller.applySample();
    syncPackageState();
    refreshReadinessPlans();
  }

  function applyFile(text = "", fileName = "") {
    controller.applyFile(text, fileName);
    syncPackageState();
    refreshReadinessPlans();
  }

  function applyReadError(error = null) {
    controller.applyReadError(error);
    syncPackageState();
  }

  function reset() {
    controller.reset();
    syncPackageState();
  }

  function refresh() {
    controller.refresh();
    syncPackageState();
    refreshReadinessPlans();
  }

  function refreshReadinessPlans(filteredCandidatePreview = {}) {
    readinessPlanBundle = createReadinessPlanBundle(packageState.filePatchDraftExport, filteredCandidatePreview);
    return readinessPlanBundle;
  }

  function syncPackageState() {
    packageState = normalizePackageState(controller.getState());
  }
}

function createReadinessPlanBundle(filePatchDraftExport = {}, filteredCandidatePreview = {}) {
  return createContentBulkPatchReadinessPlanBundle({
    filePatchDraftExport,
    filteredCandidatePreview,
  });
}

function normalizePackageState(state = {}) {
  return {
    input: state.input || EMPTY_PACKAGE_STATE.input,
    parseError: typeof state.parseError === "string" ? state.parseError : EMPTY_PACKAGE_STATE.parseError,
    adapterPreview: state.adapterPreview || EMPTY_PACKAGE_STATE.adapterPreview,
    filePatchDraftExport: state.filePatchDraftExport || EMPTY_PACKAGE_STATE.filePatchDraftExport,
  };
}
