import { SAVE_SLOT_DIAGNOSTIC_KEYS } from "./saveSlotDiagnosticKeys.js?v=675";

export function createSaveSlotDraftPayloadPreview(diagnostics = {}, text = {}) {
  const slots = Array.isArray(diagnostics.slots) ? diagnostics.slots : [];
  const filledSlotIds = slots
    .filter((slot) => ["ready", "warning"].includes(slot.status))
    .map((slot) => slot.id);
  const fieldGroups = [
    saveDraftFieldGroup("player-core", text.fieldGroupLabels?.playerCore, [
      saveDraftField("player.level", "integer", "min:1"),
      saveDraftField("player.gold", "integer", "min:0"),
      saveDraftField("player.freePoints", "integer", "min:0"),
    ]),
    saveDraftFieldGroup("region", text.fieldGroupLabels?.region, [
      saveDraftField("regionId", "string", "known-region-id"),
      saveDraftField("completedRegions", "string[]", "known-region-id-list"),
      saveDraftField("gateProgress", "object", "gate-map-shape"),
    ]),
    saveDraftFieldGroup("inventory-equipment", text.fieldGroupLabels?.inventoryEquipment, [
      saveDraftField("inventory", "item-id[]", "known-item-id-list"),
      saveDraftField("equipment", "slot-map", "known-equipment-slot-map"),
    ]),
    saveDraftFieldGroup("profile", text.fieldGroupLabels?.profile, [
      saveDraftField("playerProfile.name", "string", "profile-text-limit"),
      saveDraftField("playerProfile.title", "string", "profile-text-limit"),
      saveDraftField("playerProfile.portraitFrame", "object", "portrait-frame-shape"),
    ]),
  ];
  const operationCount = fieldGroups.reduce((sum, group) => sum + group.fields.length, 0);
  const payloadShape = {
    version: "save-slot-edit-draft-v1",
    mode: "read-only-preview",
    target: {
      type: "activeSave|saveSlot",
      ids: ["activeSave", ...filledSlotIds],
    },
    operations: fieldGroups.flatMap((group) =>
      group.fields.map((field) => ({
        group: group.id,
        path: field.path,
        valueType: field.valueType,
        guard: field.guard,
      }))
    ),
    validationChecks: [
      "active-save-readable",
      "slot-store-readable",
      "active-slot-safe",
      "rollback-snapshot-ready",
      "explicit-confirmation-required",
    ],
    rollback: {
      strategy: "localStorage-snapshot",
      keys: Object.values(SAVE_SLOT_DIAGNOSTIC_KEYS),
    },
    apply: "disabled",
  };
  return {
    applyStatus: "blocked",
    targetCount: payloadShape.target.ids.length,
    fieldGroups,
    operationCount,
    payloadShape,
  };
}

export function saveDraftFieldGroup(id, label, fields) {
  return {
    id,
    label: label || id,
    fields,
  };
}

export function saveDraftField(path, valueType, guard) {
  return { path, valueType, guard };
}
