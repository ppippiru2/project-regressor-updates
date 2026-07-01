import { createContentBulkRuntimePreviewBundle } from "./contentBulkRuntimePreviewBundle.js?v=676&cachebust=676";

export function createEditorContentBulkRuntimePreviewContext(options = {}) {
  const packageRuntimeState = options.packageRuntimeState;
  if (!packageRuntimeState || typeof packageRuntimeState.getAdapterPreview !== "function") {
    throw new TypeError("Editor content bulk runtime preview context requires package runtime state.");
  }

  const bundle = createContentBulkRuntimePreviewBundle({
    adapterPreview: packageRuntimeState.getAdapterPreview(),
    packageInput: packageRuntimeState.getInput(),
    monsterRuntimePreview: options.monsterRuntimePreview,
    placementPreview: options.placementPreview,
    filter: options.filter,
    limit: options.limit,
  });

  if (typeof packageRuntimeState.refreshReadinessPlans === "function") {
    packageRuntimeState.refreshReadinessPlans(bundle.contentBulkFilteredCandidatePreview);
  }

  return bundle;
}
