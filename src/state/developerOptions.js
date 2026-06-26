import { t } from "../localization/index.js?v=328";

export const DEFAULT_DEVELOPER_OPTIONS = {
  expMultiplier: 1,
  outgoingDamageInfinite: false,
  incomingDamageZero: false,
  itemDropMultiplier: 1,
  goldDropMultiplier: 1,
};

export const DEVELOPER_MULTIPLIER_OPTIONS = [1, 2, 3, 5, 10, 25, 50, 100];

const DEVELOPER_OPTION_LABEL_KEYS = {
  expMultiplier: "developerSettings.expMultiplier.label",
  outgoingDamageInfinite: "developerSettings.outgoingDamageInfinite.label",
  incomingDamageZero: "developerSettings.incomingDamageZero.label",
  itemDropMultiplier: "developerSettings.itemDropMultiplier.label",
  goldDropMultiplier: "developerSettings.goldDropMultiplier.label",
};

export function normalizeDeveloperOptions(options = {}) {
  const source = options && typeof options === "object" && !Array.isArray(options) ? options : {};
  return {
    expMultiplier: normalizeMultiplier(source.expMultiplier),
    outgoingDamageInfinite: Boolean(source.outgoingDamageInfinite),
    incomingDamageZero: Boolean(source.incomingDamageZero),
    itemDropMultiplier: normalizeMultiplier(source.itemDropMultiplier),
    goldDropMultiplier: normalizeMultiplier(source.goldDropMultiplier),
  };
}

export function normalizeDeveloperOptionValue(key, value) {
  if (key === "outgoingDamageInfinite" || key === "incomingDamageZero") {
    return value === true || value === "true" || value === "on";
  }
  return normalizeMultiplier(value);
}

export function developerOptionsActive(options = {}) {
  const normalized = normalizeDeveloperOptions(options);
  return (
    normalized.expMultiplier !== 1 ||
    normalized.outgoingDamageInfinite ||
    normalized.incomingDamageZero ||
    normalized.itemDropMultiplier !== 1 ||
    normalized.goldDropMultiplier !== 1
  );
}

export function developerOptionLabel(key) {
  return DEVELOPER_OPTION_LABEL_KEYS[key] ? t(DEVELOPER_OPTION_LABEL_KEYS[key]) : key;
}

function normalizeMultiplier(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 1;
  return Math.max(0, Math.min(100, Math.round(number * 10) / 10));
}
