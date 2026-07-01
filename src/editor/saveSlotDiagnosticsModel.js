export function createSaveSlotDiagnosticsModel(options = {}) {
  const text = options.text || {};
  const keys = options.keys || {};
  const slotIds = Array.isArray(options.slotIds) ? options.slotIds : [];
  const noActiveSlot = options.noActiveSlot || "__none__";
  const locale = options.locale || "ko-KR";
  const translate = typeof options.translate === "function" ? options.translate : defaultTranslate;
  const formatNumber = typeof options.formatNumber === "function" ? options.formatNumber : defaultFormatNumber;
  const formatValue = typeof options.formatValue === "function" ? options.formatValue : defaultFormatValue;
  const emptyValue = typeof options.emptyValue === "function" ? options.emptyValue : defaultEmptyValue;
  const storage = options.storage || getEditorStorage();

  const activeSave = readEditorDiagnosticStorageJson(keys.activeSave, { expectObject: true, storage });
  activeSave.summary = activeSave.status === "ready" ? summarizeSaveStateForDiagnostics(activeSave.value, { formatNumber, formatValue, emptyValue }) : null;
  activeSave.hint = saveDiagnosticStorageHint(activeSave, { text, locale, translate });

  const slotStore = readEditorDiagnosticStorageJson(keys.slotStore, { expectObject: true, storage });
  slotStore.hint = saveDiagnosticStorageHint(slotStore, { text, locale, translate });
  const slots = slotIds.map((slotId, index) => createSaveSlotDiagnostic(slotId, index, slotStore, {
    text,
    translate,
    formatNumber,
    formatValue,
    emptyValue,
  }));

  const activeSlot = readEditorDiagnosticStorageText(keys.activeSlot, { storage });
  activeSlot.status = normalizeActiveSaveSlotDiagnosticStatus(activeSlot.raw, { noActiveSlot, slotIds });
  activeSlot.hint = text.activeSlotHint || "";

  const uiState = readEditorDiagnosticStorageJson(keys.uiState, { expectObject: true, storage });
  const writeMode = {
    status: "blocked",
    hint: text.writeModeHint || "",
  };

  return {
    activeSave,
    slotStore,
    activeSlot,
    uiState,
    writeMode,
    slotCounts: {
      total: slots.length,
      filled: slots.filter((slot) => ["ready", "warning"].includes(slot.status)).length,
      invalid: slots.filter((slot) => ["invalid", "unavailable"].includes(slot.status)).length,
    },
    slots,
  };
}

export function createSaveSlotDiagnostic(slotId, index, slotStore, options = {}) {
  const text = options.text || {};
  const translate = typeof options.translate === "function" ? options.translate : defaultTranslate;
  const label = translate("editorPrep.saveDiagnostics.slotLabel", { number: index + 1 }, `Slot ${index + 1}`);
  const base = {
    id: slotId,
    key: slotId,
    label,
    rawLength: 0,
    summary: null,
    saveState: null,
    warnings: [],
  };
  if (slotStore.status !== "ready") {
    return {
      ...base,
      status: "unavailable",
      hint: text.slotStoreUnavailable || "",
    };
  }
  const snapshot = slotStore.value?.[slotId];
  if (!snapshot) {
    return {
      ...base,
      status: "empty",
      hint: text.emptySlotHint || "",
    };
  }

  const rawLength = safeJsonSize(snapshot);
  if (!isPlainObject(snapshot) || !isPlainObject(snapshot.state)) {
    return {
      ...base,
      rawLength,
      status: "invalid",
      hint: text.invalidSlotHint || "",
    };
  }

  const warnings = [];
  if (snapshot.slotId && snapshot.slotId !== slotId) {
    warnings.push(translate("editorPrep.saveDiagnostics.slotIdMismatch", {
      expected: slotId,
      actual: snapshot.slotId,
    }, `${slotId}/${snapshot.slotId}`));
  }

  return {
    ...base,
    rawLength,
    status: warnings.length ? "warning" : "ready",
    summary: {
      ...summarizeSaveStateForDiagnostics(snapshot.state, options),
      ...summarizeSaveSlotMeta(snapshot, options),
    },
    saveState: snapshot.state,
    warnings,
    hint: warnings.length ? warnings.join(" / ") : (text.readySlotHint || ""),
  };
}

export function readEditorDiagnosticStorageJson(key, options = {}) {
  const entry = readEditorDiagnosticStorageText(key, options);
  if (entry.status !== "ready") return { ...entry, value: null };
  try {
    const parsed = JSON.parse(entry.raw);
    if (options.expectObject && !isPlainObject(parsed)) {
      return {
        ...entry,
        status: "invalid",
        value: parsed,
      };
    }
    return {
      ...entry,
      value: parsed,
    };
  } catch (error) {
    return {
      ...entry,
      status: "invalid",
      value: null,
      error: error?.message || "",
    };
  }
}

export function readEditorDiagnosticStorageText(key, options = {}) {
  const storage = options.storage || getEditorStorage();
  try {
    if (!storage || typeof storage.getItem !== "function") throw new Error("localStorage unavailable");
    const raw = storage.getItem(key);
    return {
      key,
      raw,
      rawLength: raw ? raw.length : 0,
      status: raw ? "ready" : "empty",
      error: "",
    };
  } catch (error) {
    return {
      key,
      raw: "",
      rawLength: 0,
      status: "invalid",
      error: error?.message || "",
    };
  }
}

function normalizeActiveSaveSlotDiagnosticStatus(value, options = {}) {
  if (!value) return "empty";
  if (value === options.noActiveSlot) return "none";
  return (options.slotIds || []).includes(value) ? "ready" : "invalid";
}

function saveDiagnosticStorageHint(entry, options = {}) {
  const text = options.text || {};
  const translate = typeof options.translate === "function" ? options.translate : defaultTranslate;
  if (entry.status === "ready") {
    return translate("editorPrep.saveDiagnostics.storageHint", {
      chars: entry.rawLength.toLocaleString(options.locale || "ko-KR"),
    }, `${entry.rawLength}`);
  }
  if (entry.status === "empty") return text.emptyStorageHint || "";
  return entry.error || text.invalidStorageHint || "";
}

function summarizeSaveSlotMeta(snapshot, options = {}) {
  const summary = isPlainObject(snapshot.summary) ? snapshot.summary : {};
  const formatNumber = typeof options.formatNumber === "function" ? options.formatNumber : defaultFormatNumber;
  const formatValue = typeof options.formatValue === "function" ? options.formatValue : defaultFormatValue;
  return {
    name: formatValue(summary.name),
    level: formatNumber(summary.level),
    gold: formatNumber(summary.gold),
    regionId: formatValue(summary.regionName || summary.regionId),
    savedAt: formatValue(snapshot.savedAt || summary.savedAt),
  };
}

function summarizeSaveStateForDiagnostics(state, options = {}) {
  const player = isPlainObject(state?.player) ? state.player : {};
  const profile = isPlainObject(state?.playerProfile) ? state.playerProfile : {};
  const equipment = isPlainObject(state?.equipment) ? state.equipment : {};
  const formatNumber = typeof options.formatNumber === "function" ? options.formatNumber : defaultFormatNumber;
  const formatValue = typeof options.formatValue === "function" ? options.formatValue : defaultFormatValue;
  const emptyValue = typeof options.emptyValue === "function" ? options.emptyValue : defaultEmptyValue;
  return {
    name: formatValue(profile.name || player.name),
    level: formatNumber(player.level),
    gold: formatNumber(player.gold),
    regionId: formatValue(state?.regionId),
    inventoryCount: Array.isArray(state?.inventory) ? formatNumber(state.inventory.length) : emptyValue(),
    equipmentCount: formatNumber(Object.values(equipment).filter(Boolean).length),
  };
}

function safeJsonSize(value) {
  try {
    return JSON.stringify(value).length;
  } catch {
    return 0;
  }
}

function isPlainObject(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}

function getEditorStorage() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  return window.localStorage;
}

function defaultTranslate(_key, _values, fallback = "") {
  return fallback;
}

function defaultFormatNumber(value) {
  const number = Number(value);
  return Number.isFinite(number) ? String(number) : defaultEmptyValue();
}

function defaultFormatValue(value) {
  const text = String(value ?? "").trim();
  return text || defaultEmptyValue();
}

function defaultEmptyValue() {
  return "-";
}
