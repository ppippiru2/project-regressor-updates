import {
  createContentBulkPatchPackageAdapterPreview,
  createContentBulkPatchPackageAdapterTemplate,
} from "./contentBulkPatchPackageAdapter.js?v=677";
import { createContentBulkPatchFilePatchDraftExport } from "./contentBulkPatchFilePatchDraftExport.js?v=677";
import { normalizeContentBulkPatchPackageInput } from "./contentBulkPatchPackageInputStore.js?v=677";
import {
  createRuntimeVfxBulkIntakePreview,
  createRuntimeVfxBulkIntakeTemplate,
} from "./runtimeVfxBulkIntakePreview.js?v=677";

export const CONTENT_BULK_PACKAGE_TEMPLATE_FILE_NAME = "project-regressor-content-bulk-package-template.json";
export const CONTENT_BULK_PACKAGE_PASTED_SOURCE_NAME = "pasted-package.json";

export function createContentBulkPatchPackageTemplatePayload() {
  return createContentBulkPatchPackageAdapterTemplate();
}

export function createContentBulkPatchPackageDraftInput(currentInput = {}, draftText = "") {
  return normalizeContentBulkPatchPackageInput({
    ...currentInput,
    draftText: String(draftText || ""),
    parseError: "",
  });
}

export function createContentBulkPatchPackageAppliedInput(currentInput = {}, draftText = "") {
  const nextText = String(draftText || "");
  return normalizeContentBulkPatchPackageInput({
    ...currentInput,
    draftText: nextText,
    appliedText: nextText,
    sourceName: nextText.trim() ? CONTENT_BULK_PACKAGE_PASTED_SOURCE_NAME : "",
    parseError: "",
  });
}

export function createContentBulkPatchPackageSampleInput() {
  const sampleText = JSON.stringify(createContentBulkPatchPackageTemplatePayload(), null, 2);
  return normalizeContentBulkPatchPackageInput({
    draftText: sampleText,
    appliedText: sampleText,
    sourceName: CONTENT_BULK_PACKAGE_TEMPLATE_FILE_NAME,
    parseError: "",
  });
}

export function createContentBulkPatchPackageFileInput(text = "", fileName = "") {
  const fileText = String(text || "");
  return normalizeContentBulkPatchPackageInput({
    draftText: fileText,
    appliedText: fileText,
    sourceName: fileName || CONTENT_BULK_PACKAGE_PASTED_SOURCE_NAME,
    parseError: "",
  });
}

export function createContentBulkPatchPackageReadErrorInput(currentInput = {}, error = null) {
  return normalizeContentBulkPatchPackageInput({
    ...currentInput,
    parseError: error?.message || "File read failed",
  });
}

export function createContentBulkPatchPackagePreviewFromInput(input = {}) {
  const appliedText = String(input?.appliedText || "").trim();
  if (!appliedText) {
    return {
      preview: createContentBulkPatchPackageAdapterPreview(),
      parseError: "",
    };
  }
  try {
    return {
      preview: createContentBulkPatchPackageAdapterPreview(JSON.parse(appliedText)),
      parseError: "",
    };
  } catch (error) {
    return {
      preview: createContentBulkPatchPackageAdapterPreview(),
      parseError: error?.message || "JSON parse error",
    };
  }
}

export function createContentBulkPatchFilePatchDraftExportFromPackageInput(input = {}, adapterPreview = null) {
  const appliedText = String(input?.appliedText || "").trim();
  if (!appliedText) {
    return createContentBulkPatchFilePatchDraftExport(createContentBulkPatchPackageTemplatePayload(), {
      sourceName: CONTENT_BULK_PACKAGE_TEMPLATE_FILE_NAME,
      adapterPreview,
    });
  }
  try {
    return createContentBulkPatchFilePatchDraftExport(JSON.parse(appliedText), {
      sourceName: input.sourceName || CONTENT_BULK_PACKAGE_PASTED_SOURCE_NAME,
      adapterPreview,
    });
  } catch {
    return createContentBulkPatchFilePatchDraftExport(createContentBulkPatchPackageTemplatePayload(), {
      sourceName: CONTENT_BULK_PACKAGE_TEMPLATE_FILE_NAME,
    });
  }
}

export function createRuntimeVfxBulkIntakePreviewFromPackageInput(input = {}, placementPreview = {}) {
  const appliedText = String(input?.appliedText || "").trim();
  if (!appliedText) {
    return createRuntimeVfxBulkIntakePreview(createRuntimeVfxBulkIntakeTemplate(), placementPreview);
  }
  try {
    return createRuntimeVfxBulkIntakePreview(JSON.parse(appliedText), placementPreview);
  } catch {
    return createRuntimeVfxBulkIntakePreview(createRuntimeVfxBulkIntakeTemplate(), placementPreview);
  }
}
