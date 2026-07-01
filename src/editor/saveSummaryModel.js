export function createSaveSummaryModel(options = {}) {
  const keys = Array.isArray(options.keys) ? options.keys : [];
  const text = options.text || {};
  const locale = options.locale || "ko-KR";
  const translate = typeof options.translate === "function" ? options.translate : defaultTranslate;
  const storage = options.storage || getEditorStorage();
  const now = typeof options.now === "function" ? options.now : () => new Date();
  const exportedAtDate = now();

  return {
    exportedAt: toIsoString(exportedAtDate),
    editorVersion: String(options.editorVersion || ""),
    keys: keys.map((key) => createSaveKeySummary(key, {
      storage,
      text,
      locale,
      translate,
    })),
  };
}

export function createSaveKeySummary(key, options = {}) {
  const text = options.text || {};
  const locale = options.locale || "ko-KR";
  const translate = typeof options.translate === "function" ? options.translate : defaultTranslate;
  const raw = readSaveSummaryStorageText(key, options.storage);
  let detail = text.noValue || "";

  if (raw) {
    detail = translate("editorPrep.save.chars", {
      count: raw.length.toLocaleString(locale),
    }, `${raw.length}`);
    try {
      detail = `${detail} · ${summarizeSaveSummaryJson(JSON.parse(raw), { text, translate })}`;
    } catch {
      detail = `${detail} · ${text.string || "string"}`;
    }
  }

  return {
    key,
    exists: Boolean(raw),
    detail,
  };
}

export function summarizeSaveSummaryJson(value, options = {}) {
  const text = options.text || {};
  const translate = typeof options.translate === "function" ? options.translate : defaultTranslate;
  if (!value || typeof value !== "object") return typeof value;
  if (Array.isArray(value)) return translate("editorPrep.save.array", { count: value.length }, `array ${value.length}`);
  const keys = Object.keys(value);
  const details = [translate("editorPrep.save.fields", { count: keys.length }, `fields ${keys.length}`)];
  if (keys.includes("player")) details.push(text.includesPlayer || "player");
  if (keys.includes("slots")) details.push(text.includesSlots || "slots");
  return details.join(" · ");
}

export function readSaveSummaryStorageText(key, storage = getEditorStorage()) {
  try {
    if (!storage || typeof storage.getItem !== "function") return "";
    return storage.getItem(key) || "";
  } catch {
    return "";
  }
}

function toIsoString(value) {
  if (value && typeof value.toISOString === "function") return value.toISOString();
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? new Date(0).toISOString() : date.toISOString();
}

function getEditorStorage() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  return window.localStorage;
}

function defaultTranslate(_key, _values, fallback = "") {
  return fallback;
}
