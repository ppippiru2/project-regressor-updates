import {
  createFateCardCandidateSlots,
  getCardCandidateCountByKarma,
  getCardGradeWeightSummary,
  normalizeFateCardCandidateCount,
} from "./fateCardRoller.js?v=680";

export const REGRESSION_CARD_DRAW_TEST_PRESETS = Object.freeze([
  Object.freeze({ id: "run2_karma0", regressionCount: 2, karmaValue: 0 }),
  Object.freeze({ id: "run3_karma20", regressionCount: 3, karmaValue: 20 }),
  Object.freeze({ id: "run4_karma35", regressionCount: 4, karmaValue: 35 }),
  Object.freeze({ id: "run6_karma70", regressionCount: 6, karmaValue: 70 }),
  Object.freeze({ id: "run8_karma90", regressionCount: 8, karmaValue: 90 }),
]);

export function createRegressionCardCandidateSlots(cards = [], snapshot = {}, options = {}) {
  const count = normalizeFateCardCandidateCount(snapshot.cardCandidateCount ?? getCardCandidateCountByKarma(snapshot.karmaValue));
  return createFateCardCandidateSlots(cards, {
    ...snapshot,
    cardCandidateCount: count,
  }, {
    seed: options.seed ?? snapshot.karmaValue ?? 0,
    projectFallbackGrades: options.projectFallbackGrades,
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
