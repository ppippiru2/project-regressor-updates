import { getLocaleText } from "../localization/index.js?v=487";

const RESISTANCE_LABELS = getLocaleText().resistances.labels;

export const RESISTANCE_STATS = [
  { key: "physical", optionType: "RES_PHYSICAL", label: RESISTANCE_LABELS.physical },
  { key: "fire", optionType: "RES_FIRE", label: RESISTANCE_LABELS.fire },
  { key: "cold", optionType: "RES_COLD", label: RESISTANCE_LABELS.cold },
  { key: "lightning", optionType: "RES_LIGHTNING", label: RESISTANCE_LABELS.lightning },
  { key: "wind", optionType: "RES_WIND", label: RESISTANCE_LABELS.wind },
  { key: "earth", optionType: "RES_EARTH", label: RESISTANCE_LABELS.earth },
  { key: "poison", optionType: "RES_POISON", label: RESISTANCE_LABELS.poison },
  { key: "light", optionType: "RES_LIGHT", label: RESISTANCE_LABELS.light },
  { key: "dark", optionType: "RES_DARK", label: RESISTANCE_LABELS.dark },
  { key: "holy", optionType: "RES_HOLY", label: RESISTANCE_LABELS.holy },
];

const RESISTANCE_OPTION_KEY = Object.fromEntries(
  RESISTANCE_STATS.map((entry) => [entry.optionType, entry.key])
);

export function createEmptyResistances() {
  return Object.fromEntries(RESISTANCE_STATS.map(({ key }) => [key, 0]));
}

export function applyResistanceOption(resistances, optionType, value) {
  const key = RESISTANCE_OPTION_KEY[optionType];
  if (!key || !Object.hasOwn(resistances, key)) return false;
  resistances[key] += Number(value) || 0;
  return true;
}



