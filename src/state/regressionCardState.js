import { t } from "../localization/index.js?v=678";
import { karmaValue } from "./karma.js?v=678";
import {
  getCardCandidateCountByKarma,
  getCardGradeWeightSummary,
  getFateCardHintLevel,
  normalizeFateCardCandidateCount,
} from "./fateCardRoller.js?v=678";

export const DEFAULT_REGRESSION_CARD_STATE = Object.freeze({
  karmaValue: 0,
  cardCandidateCount: 4,
  cardGradeWeightSummary: t("regressionCardResync.gradeWeightBlue"),
  selectedCardName: "",
  selectedTraitName: "",
  selectedSkillName: "",
  rerollCount: 0,
  lockedCards: Object.freeze([]),
  lastResyncRegressionCount: 0,
  hintLevel: 0,
});

export function normalizeRegressionCardState(raw, state = {}) {
  const source = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const currentKarma = normalizeCount(source.karmaValue ?? karmaValue(state));
  return {
    karmaValue: currentKarma,
    cardCandidateCount: normalizeCandidateCount(source.cardCandidateCount, currentKarma),
    cardGradeWeightSummary: sanitizeText(
      source.cardGradeWeightSummary,
      getCardGradeWeightSummary(currentKarma),
      80,
    ),
    selectedCardName: sanitizeText(source.selectedCardName ?? state.selectedCardName, "", 30),
    selectedTraitName: sanitizeText(source.selectedTraitName ?? state.selectedTraitName, "", 30),
    selectedSkillName: sanitizeText(source.selectedSkillName ?? state.selectedSkillName, "", 30),
    rerollCount: normalizeCount(source.rerollCount),
    lockedCards: Array.isArray(source.lockedCards)
      ? [...new Set(source.lockedCards.filter(Boolean).map(String))].slice(0, 20)
      : [],
    lastResyncRegressionCount: normalizeCount(source.lastResyncRegressionCount),
    hintLevel: normalizeHintLevel(source.hintLevel ?? getFateCardHintLevel(state)),
  };
}

export function shouldShowRegressionCardResync(state = {}) {
  const run = normalizeRunCount(state.regressionCount ?? state.tutorialRun ?? state.tutorialFlags?.regressionCount);
  const flags = state.tutorialFlags || {};
  const recordUnlocked = state.regressorRecordUnlocked === true || flags.regressorRecordUnlocked === true || run >= 2;
  const regressionCardState = normalizeRegressionCardState(state.regressionCardState, state);
  return run >= 2 && recordUnlocked && regressionCardState.lastResyncRegressionCount !== run;
}

export function createRegressionCardResyncState(state = {}) {
  const currentKarma = karmaValue(state);
  const normalized = normalizeRegressionCardState(state.regressionCardState, {
    ...state,
    karmaValue: currentKarma,
  });
  return {
    ...normalized,
    karmaValue: currentKarma,
    cardCandidateCount: getCardCandidateCountByKarma(currentKarma),
    cardGradeWeightSummary: getCardGradeWeightSummary(currentKarma),
    hintLevel: getFateCardHintLevel({
      ...state,
      karmaValue: currentKarma,
    }),
  };
}

export function applyRegressionCardSelection(state, selectedCard) {
  if (!state || !selectedCard?.id) return { selected: false };

  const run = normalizeRunCount(state.regressionCount ?? state.tutorialRun ?? 1);
  const snapshot = createRegressionCardResyncState(state);
  const cardName = sanitizeText(selectedCard.card || selectedCard.name || selectedCard.id, selectedCard.id, 30);
  const traitName = sanitizeText(selectedCard.trait || selectedCard.traitName, "", 30);
  const skillName = sanitizeText(selectedCard.skill || selectedCard.skillName, "", 30);

  state.regressionCardState = {
    ...snapshot,
    selectedCardName: cardName,
    selectedTraitName: traitName,
    selectedSkillName: skillName,
    lastResyncRegressionCount: run,
  };
  state.selectedCardName = cardName;
  state.selectedTraitName = traitName;
  state.selectedSkillName = skillName;
  state.cardCandidateCount = snapshot.cardCandidateCount;
  state.cardGradeWeightSummary = snapshot.cardGradeWeightSummary;

  state.playerProfile = {
    ...(state.playerProfile || {}),
    starterCardId: sanitizeText(selectedCard.id, "", 40),
    starterCardName: cardName,
    starterTraitId: sanitizeText(selectedCard.traitId, "", 40),
    starterTrait: traitName,
    starterSkill: skillName,
    starterSkillActionId: sanitizeText(selectedCard.actionId, "", 40),
  };

  return {
    selected: true,
    run,
    cardName,
    traitName,
    skillName,
    cardCandidateCount: snapshot.cardCandidateCount,
    cardGradeWeightSummary: snapshot.cardGradeWeightSummary,
  };
}

function normalizeCandidateCount(value, karma) {
  const count = normalizeCount(value);
  return normalizeFateCardCandidateCount(count > 0 ? count : getCardCandidateCountByKarma(karma));
}

function normalizeRunCount(value) {
  const run = Math.floor(Number(value));
  return Number.isFinite(run) && run > 0 ? run : 1;
}

function normalizeCount(value) {
  const count = Math.floor(Number(value));
  return Number.isFinite(count) && count > 0 ? count : 0;
}

function normalizeHintLevel(value) {
  const level = Math.floor(Number(value));
  if (!Number.isFinite(level)) return 0;
  return Math.max(0, Math.min(4, level));
}

function sanitizeText(value, fallback = "", maxLength = 40) {
  const text = String(value || "").trim();
  return (text || fallback).slice(0, maxLength);
}

export { getCardCandidateCountByKarma, getCardGradeWeightSummary };
