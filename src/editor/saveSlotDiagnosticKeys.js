export const ACTIVE_SAVE_STORAGE_KEY = "project_regressor_mvp_save";
export const SAVE_SLOT_STORE_STORAGE_KEY = "project_regressor_save_slots";
export const ACTIVE_SAVE_SLOT_STORAGE_KEY = "project_regressor_active_save_slot";
export const UI_STATE_STORAGE_KEY = "project_regressor_ui_state";
export const RETARGET_FILTER_STORAGE_KEY = "project_regressor_editor_retarget_filter";
export const BALANCE_FILTER_STORAGE_KEY = "project_regressor_editor_balance_filter";
export const COMBAT_VFX_FILTER_STORAGE_KEY = "project_regressor_editor_combat_vfx_filter";
export const CONTENT_BULK_FILTER_STORAGE_KEY = "project_regressor_editor_content_bulk_filter";
export const CONTENT_BULK_PACKAGE_INPUT_STORAGE_KEY = "project_regressor_editor_content_bulk_package_input";

export const EDITOR_SAVE_KEYS = Object.freeze([
  ACTIVE_SAVE_STORAGE_KEY,
  SAVE_SLOT_STORE_STORAGE_KEY,
  ACTIVE_SAVE_SLOT_STORAGE_KEY,
  UI_STATE_STORAGE_KEY,
  RETARGET_FILTER_STORAGE_KEY,
  BALANCE_FILTER_STORAGE_KEY,
  COMBAT_VFX_FILTER_STORAGE_KEY,
  CONTENT_BULK_FILTER_STORAGE_KEY,
  CONTENT_BULK_PACKAGE_INPUT_STORAGE_KEY,
]);

export const SAVE_SLOT_DIAGNOSTIC_KEYS = Object.freeze({
  activeSave: ACTIVE_SAVE_STORAGE_KEY,
  slotStore: SAVE_SLOT_STORE_STORAGE_KEY,
  activeSlot: ACTIVE_SAVE_SLOT_STORAGE_KEY,
  uiState: UI_STATE_STORAGE_KEY,
});

export const SAVE_SLOT_DIAGNOSTIC_SLOT_IDS = Object.freeze(["slot1", "slot2", "slot3", "slot4", "slot5"]);
export const SAVE_SLOT_DIAGNOSTIC_NO_ACTIVE = "__none__";
