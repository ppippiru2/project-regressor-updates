import { parseSavePayload, serializeSavePayload } from "./save.js";
import { downloadSavePayload } from "./saveDownload.js";
import { t } from "../localization/index.js?v=322";

const EXPORT_SAVE_MESSAGE = t("saveLoad.exportMessage");
const IMPORT_SAVE_MESSAGE = t("saveLoad.importMessage");
const IMPORT_SAVE_FALLBACK_ERROR_MESSAGE = t("saveLoad.importFallbackError");

export function exportSavePayloadSnapshot(state, uiState, { download = downloadSavePayload } = {}) {
  download(serializeSavePayload(state, uiState));
  return { message: EXPORT_SAVE_MESSAGE };
}

export function importSavePayloadText(text, createInitialState) {
  try {
    const imported = parseSavePayload(text, createInitialState);
    return {
      ok: true,
      state: imported.state,
      uiState: imported.uiState,
      message: IMPORT_SAVE_MESSAGE,
    };
  } catch (error) {
    const message = error?.name === "SavePayloadError" ? error.message : IMPORT_SAVE_FALLBACK_ERROR_MESSAGE;
    return { ok: false, message, error };
  }
}

export function applyImportedUiState(uiState, importedUiState) {
  if (!importedUiState) return false;
  uiState.collapsedPanels = importedUiState.collapsedPanels;
  uiState.collapsedObjectives = importedUiState.collapsedObjectives;
  uiState.selectedRegionId = importedUiState.selectedRegionId;
  return true;
}
