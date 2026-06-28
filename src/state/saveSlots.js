import { normalizeSavedState, normalizeUiState } from "./save.js";
import { t } from "../localization/index.js?v=479";

const SAVE_SLOTS_KEY = "project_regressor_save_slots";
const ACTIVE_SAVE_SLOT_KEY = "project_regressor_active_save_slot";
const NO_ACTIVE_SAVE_SLOT = "__none__";
const SLOT_COUNT = 5;

export const SAVE_SLOT_IDS = Array.from({ length: SLOT_COUNT }, (_, index) => `slot${index + 1}`);
export const DEFAULT_SAVE_SLOT_ID = SAVE_SLOT_IDS[0];

export function loadActiveSaveSlotId(storage = localStorage) {
  try {
    const slotId = storage.getItem(ACTIVE_SAVE_SLOT_KEY);
    if (slotId === NO_ACTIVE_SAVE_SLOT) return "";
    return isSaveSlotId(slotId) ? slotId : null;
  } catch {
    return null;
  }
}

export function saveActiveSaveSlotId(slotId, storage = localStorage) {
  try {
    if (isSaveSlotId(slotId)) {
      storage.setItem(ACTIVE_SAVE_SLOT_KEY, slotId);
    } else if (slotId === "") {
      storage.setItem(ACTIVE_SAVE_SLOT_KEY, NO_ACTIVE_SAVE_SLOT);
    } else {
      storage.removeItem(ACTIVE_SAVE_SLOT_KEY);
    }
  } catch {
    // Slot selection is a convenience layer. The main save remains authoritative.
  }
}

export function readSaveSlotEntries(storage = localStorage) {
  const slots = readSaveSlotStore(storage);
  return SAVE_SLOT_IDS.map((slotId, index) => ({
    id: slotId,
    index,
    label: saveSlotLabel(slotId),
    snapshot: normalizeSaveSlotSnapshot(slots[slotId]),
  }));
}

export function saveCurrentToSlot(slotId, state, uiState, { regionName = "" } = {}, storage = localStorage) {
  if (!isSaveSlotId(slotId)) return null;
  const slots = readSaveSlotStore(storage);
  const snapshot = createSaveSlotSnapshot(slotId, state, uiState, { regionName });
  slots[slotId] = snapshot;
  writeSaveSlotStore(slots, storage);
  return snapshot;
}

export function loadSaveSlot(slotId, createInitialState, storage = localStorage) {
  if (!isSaveSlotId(slotId)) return null;
  const snapshot = normalizeSaveSlotSnapshot(readSaveSlotStore(storage)[slotId]);
  if (!snapshot) return null;
  return {
    state: normalizeSavedState(snapshot.state, createInitialState),
    uiState: snapshot.uiState ? normalizeUiState(snapshot.uiState) : null,
    summary: snapshot.summary,
    savedAt: snapshot.savedAt,
  };
}

export function clearSaveSlot(slotId, storage = localStorage) {
  if (!isSaveSlotId(slotId)) return false;
  const slots = readSaveSlotStore(storage);
  if (!slots[slotId]) return false;
  delete slots[slotId];
  writeSaveSlotStore(slots, storage);
  return true;
}

export function isSaveSlotId(slotId) {
  return SAVE_SLOT_IDS.includes(slotId);
}

export function saveSlotLabel(slotId, { prefixKey = "saveSlots.slotShort" } = {}) {
  const index = SAVE_SLOT_IDS.indexOf(slotId);
  return index >= 0 ? `${t(prefixKey)} ${index + 1}` : t("saveSlots.fallbackSlot");
}

function createSaveSlotSnapshot(slotId, state, uiState, { regionName = "" } = {}) {
  const savedAt = new Date().toISOString();
  return {
    version: 1,
    slotId,
    savedAt,
    state: cloneJson(state),
    uiState: cloneJson(uiState),
    summary: createSaveSlotSummary(state, { regionName, savedAt }),
  };
}

function createSaveSlotSummary(state, { regionName = "", savedAt = "" } = {}) {
  return {
    name: state.playerProfile?.name || state.player?.name || t("saveSlots.fallbackName"),
    level: Number(state.player?.level) || 1,
    gold: Number(state.player?.gold) || 0,
    freePoints: Number(state.player?.freePoints) || 0,
    regionId: state.regionId || "",
    regionName,
    savedAt,
  };
}

function normalizeSaveSlotSnapshot(snapshot) {
  if (!snapshot || typeof snapshot !== "object" || Array.isArray(snapshot)) return null;
  if (!snapshot.state || typeof snapshot.state !== "object" || Array.isArray(snapshot.state)) return null;
  return {
    version: Number(snapshot.version) || 1,
    slotId: isSaveSlotId(snapshot.slotId) ? snapshot.slotId : "",
    savedAt: typeof snapshot.savedAt === "string" ? snapshot.savedAt : "",
    state: snapshot.state,
    uiState: snapshot.uiState && typeof snapshot.uiState === "object" ? snapshot.uiState : null,
    summary:
      snapshot.summary && typeof snapshot.summary === "object" && !Array.isArray(snapshot.summary)
        ? snapshot.summary
        : createSaveSlotSummary(snapshot.state, { savedAt: snapshot.savedAt }),
  };
}

function readSaveSlotStore(storage) {
  try {
    const parsed = JSON.parse(storage.getItem(SAVE_SLOTS_KEY) || "{}");
    return parsed && typeof parsed === "object" && !Array.isArray(parsed) ? parsed : {};
  } catch {
    return {};
  }
}

function writeSaveSlotStore(slots, storage) {
  storage.setItem(SAVE_SLOTS_KEY, JSON.stringify(slots));
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}



