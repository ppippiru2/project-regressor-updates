export const SAVE_EDIT_VALIDATOR_EXECUTORS = Object.freeze({
  "min:1": validateSaveEdit_min_1,
  "min:0": validateSaveEdit_min_0,
  "known-region-id": validateSaveEdit_known_region_id,
  "known-region-id-list": validateSaveEdit_known_region_id_list,
  "gate-map-shape": validateSaveEdit_gate_map_shape,
  "known-item-id-list": validateSaveEdit_known_item_id_list,
  "known-equipment-slot-map": validateSaveEdit_known_equipment_slot_map,
  "profile-text-limit": validateSaveEdit_profile_text_limit,
  "portrait-frame-shape": validateSaveEdit_portrait_frame_shape,
});

export function saveEditValidatorFunctionName(ruleId) {
  return `validateSaveEdit_${ruleId.replace(/[^a-z0-9]+/gi, "_").replace(/^_+|_+$/g, "")}`;
}

export function validateSaveEdit_min_1(context) {
  return validateSaveEditIntegerMinimum(context, 1);
}

export function validateSaveEdit_min_0(context) {
  return validateSaveEditIntegerMinimum(context, 0);
}

export function validateSaveEdit_known_region_id(context) {
  return validateSaveEditStringValue(context, { allowEmpty: false });
}

export function validateSaveEdit_known_region_id_list(context) {
  return validateSaveEditArrayValue(context);
}

export function validateSaveEdit_gate_map_shape(context) {
  return validateSaveEditObjectValue(context);
}

export function validateSaveEdit_known_item_id_list(context) {
  return validateSaveEditArrayValue(context);
}

export function validateSaveEdit_known_equipment_slot_map(context) {
  return validateSaveEditObjectValue(context);
}

export function validateSaveEdit_profile_text_limit(context) {
  if (saveEditHasMissingProposedValue(context.proposedValue)) {
    return saveEditValidatorDryRunResult("profile-text-limit", context.targetPath, "not-produced", "not-produced", "proposed-values-missing", []);
  }
  if (typeof context.proposedValue !== "string") {
    return saveEditValidatorDryRunResult("profile-text-limit", context.targetPath, "invalid", String(context.proposedValue), "validation-failed", ["expected-string"]);
  }
  const normalizedValue = context.proposedValue.trim().slice(0, 32);
  const isValid = normalizedValue.length > 0 && context.proposedValue.length <= 32;
  return saveEditValidatorDryRunResult("profile-text-limit", context.targetPath, isValid ? "valid" : "invalid", normalizedValue, isValid ? "" : "validation-failed", isValid ? [] : ["profile-text-limit"]);
}

export function validateSaveEdit_portrait_frame_shape(context) {
  return validateSaveEditObjectValue(context);
}

export function saveEditValidatorDryRunResult(ruleId, targetPath, resultStatus, normalizedValue, blocker, warnings) {
  return {
    ruleId,
    targetPath,
    resultStatus,
    normalizedValue,
    blocker,
    warnings,
  };
}

function validateSaveEditIntegerMinimum(context, minimum) {
  if (saveEditHasMissingProposedValue(context.proposedValue)) {
    return saveEditValidatorDryRunResult(`min:${minimum}`, context.targetPath, "not-produced", "not-produced", "proposed-values-missing", []);
  }
  const numericValue = Number(context.proposedValue);
  const isValid = Number.isInteger(numericValue) && numericValue >= minimum;
  return saveEditValidatorDryRunResult(`min:${minimum}`, context.targetPath, isValid ? "valid" : "invalid", Number.isFinite(numericValue) ? String(numericValue) : "invalid-number", isValid ? "" : "validation-failed", isValid ? [] : [`min:${minimum}`]);
}

function validateSaveEditStringValue(context, options = {}) {
  if (saveEditHasMissingProposedValue(context.proposedValue)) {
    return saveEditValidatorDryRunResult("string", context.targetPath, "not-produced", "not-produced", "proposed-values-missing", []);
  }
  const isString = typeof context.proposedValue === "string";
  const normalizedValue = isString ? context.proposedValue.trim() : String(context.proposedValue);
  const isValid = isString && (options.allowEmpty || normalizedValue.length > 0);
  return saveEditValidatorDryRunResult("string", context.targetPath, isValid ? "valid" : "invalid", normalizedValue, isValid ? "" : "validation-failed", isValid ? [] : ["expected-string"]);
}

function validateSaveEditArrayValue(context) {
  if (saveEditHasMissingProposedValue(context.proposedValue)) {
    return saveEditValidatorDryRunResult("array", context.targetPath, "not-produced", "not-produced", "proposed-values-missing", []);
  }
  const isValid = Array.isArray(context.proposedValue);
  return saveEditValidatorDryRunResult("array", context.targetPath, isValid ? "valid" : "invalid", isValid ? `${context.proposedValue.length} entries` : "not-array", isValid ? "" : "validation-failed", isValid ? [] : ["expected-array"]);
}

function validateSaveEditObjectValue(context) {
  if (saveEditHasMissingProposedValue(context.proposedValue)) {
    return saveEditValidatorDryRunResult("object", context.targetPath, "not-produced", "not-produced", "proposed-values-missing", []);
  }
  const isValid = Boolean(context.proposedValue) && typeof context.proposedValue === "object" && !Array.isArray(context.proposedValue);
  return saveEditValidatorDryRunResult("object", context.targetPath, isValid ? "valid" : "invalid", isValid ? "object" : "not-object", isValid ? "" : "validation-failed", isValid ? [] : ["expected-object"]);
}

function saveEditHasMissingProposedValue(value) {
  return value === "pending-input" || typeof value === "undefined";
}
