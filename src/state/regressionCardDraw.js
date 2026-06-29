import {
  getCardCandidateCountByKarma,
  getCardGradeWeightSummary,
} from "./regressionCardState.js?v=572";

export const MAX_REGRESSION_CARD_CANDIDATES = 6;

export const REGRESSION_CARD_DRAW_TEST_PRESETS = Object.freeze([
  Object.freeze({ id: "run2_karma0", regressionCount: 2, karmaValue: 0 }),
  Object.freeze({ id: "run2_karma20", regressionCount: 2, karmaValue: 20 }),
  Object.freeze({ id: "run3_karma35", regressionCount: 3, karmaValue: 35 }),
  Object.freeze({ id: "run5_karma60", regressionCount: 5, karmaValue: 60 }),
]);

export function createRegressionCardCandidateSlots(cards = [], snapshot = {}, options = {}) {
  const sourceCards = Array.isArray(cards) ? cards.filter((card) => card?.id) : [];
  const count = normalizeCandidateCount(snapshot.cardCandidateCount ?? getCardCandidateCountByKarma(snapshot.karmaValue));
  const seed = normalizeInteger(options.seed ?? snapshot.karmaValue ?? 0);
  const offset = sourceCards.length ? seed % sourceCards.length : 0;

  return Array.from({ length: count }, (_, index) => {
    const card = sourceCards.length ? sourceCards[(index + offset) % sourceCards.length] : null;
    const fallbackGrade = options.projectFallbackGrades
      ? resolveProjectedRegressionCardGrade(snapshot.karmaValue, index, count)
      : "";
    const grade = card?.grade || card?.rarity || fallbackGrade || card?.glow || "blue";
    return {
      index,
      slotId: `regression-card-candidate-${index + 1}`,
      card,
      cardId: card?.id || "",
      grade,
      auraCard: { ...(card || {}), grade },
    };
  });
}

export function createDefaultRegressionCardDrawTestState() {
  return normalizeRegressionCardDrawTestState({
    open: false,
    presetId: REGRESSION_CARD_DRAW_TEST_PRESETS[0].id,
    seed: 0,
    selectedSlotIndex: -1,
  });
}

export function normalizeRegressionCardDrawTestState(raw = {}) {
  const source = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const preset = findRegressionCardDrawTestPreset(source.presetId) || REGRESSION_CARD_DRAW_TEST_PRESETS[0];
  return {
    open: source.open === true,
    presetId: preset.id,
    regressionCount: normalizeRunCount(source.regressionCount ?? preset.regressionCount),
    karmaValue: normalizeInteger(source.karmaValue ?? preset.karmaValue),
    seed: normalizeInteger(source.seed),
    selectedSlotIndex: normalizeSelectedSlot(source.selectedSlotIndex),
  };
}

export function createRegressionCardDrawTestSnapshot(testState = {}) {
  const normalized = normalizeRegressionCardDrawTestState(testState);
  return {
    regressionCount: normalized.regressionCount,
    karmaValue: normalized.karmaValue,
    cardCandidateCount: getCardCandidateCountByKarma(normalized.karmaValue),
    cardGradeWeightSummary: getCardGradeWeightSummary(normalized.karmaValue),
  };
}

export function updateRegressionCardDrawTestAction(testState = {}, action = "") {
  const current = normalizeRegressionCardDrawTestState(testState);
  if (action === "open") return { ...current, open: true };
  if (action === "close") return { ...current, open: false, selectedSlotIndex: -1 };
  if (action === "toggle") return { ...current, open: !current.open, selectedSlotIndex: -1 };
  if (action === "shuffle") return { ...current, open: true, seed: current.seed + 1, selectedSlotIndex: -1 };
  return current;
}

export function updateRegressionCardDrawTestPreset(testState = {}, presetId = "") {
  const current = normalizeRegressionCardDrawTestState(testState);
  const preset = findRegressionCardDrawTestPreset(presetId);
  if (!preset) return current;
  return {
    ...current,
    open: true,
    presetId: preset.id,
    regressionCount: preset.regressionCount,
    karmaValue: preset.karmaValue,
    seed: current.seed + 1,
    selectedSlotIndex: -1,
  };
}

export function selectRegressionCardDrawTestSlot(testState = {}, slotIndex = -1) {
  const current = normalizeRegressionCardDrawTestState(testState);
  return {
    ...current,
    open: true,
    selectedSlotIndex: normalizeSelectedSlot(slotIndex),
  };
}

export function findRegressionCardDrawTestPreset(presetId = "") {
  return REGRESSION_CARD_DRAW_TEST_PRESETS.find((preset) => preset.id === presetId) || null;
}

function resolveProjectedRegressionCardGrade(karmaValue, index, count) {
  const karma = normalizeInteger(karmaValue);
  if (karma >= 60 && count >= 6 && index === count - 1) return "epic";
  if (karma >= 50 && index >= Math.max(0, count - 2)) return "purple";
  if (karma >= 30 && index >= Math.max(0, count - 2)) return "rare";
  if (karma >= 20 && index === count - 1) return "rare";
  return "blue";
}

function normalizeCandidateCount(value) {
  const count = normalizeInteger(value);
  if (count <= 0) return 0;
  return Math.min(MAX_REGRESSION_CARD_CANDIDATES, count);
}

function normalizeRunCount(value) {
  const run = normalizeInteger(value);
  return run >= 2 ? run : 2;
}

function normalizeSelectedSlot(value) {
  const index = Math.floor(Number(value));
  return Number.isFinite(index) && index >= 0 ? index : -1;
}

function normalizeInteger(value) {
  const number = Math.floor(Number(value));
  return Number.isFinite(number) && number >= 0 ? number : 0;
}
