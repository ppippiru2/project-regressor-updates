import { resolveDispositionResult } from "./profile.js?v=676";
import { resolveRecommendedStarterCardDraw } from "./starterCardDraw.js?v=676";

export function resolveStarterCardRevealDraw(cards = [], answers = {}, slotIndex = 0) {
  const sourceCards = Array.isArray(cards) ? cards.filter((card) => card?.id) : [];
  const disposition = resolveDispositionResult(answerValues(answers));
  const draw = resolveRecommendedStarterCardDraw(sourceCards, disposition.id);
  return {
    ...draw,
    dispositionId: disposition.id,
    slotIndex: normalizeStarterCardSlot(slotIndex, sourceCards.length),
  };
}

export function applyStarterCardRevealDraft(draft, draw = {}, cards = []) {
  if (!draft || isStarterCardRevealComplete(draft)) return false;
  const fallbackCard = Array.isArray(cards) ? cards.find((card) => card?.id) : null;
  const cardId = draw.card?.id || fallbackCard?.id || "";
  draft.starterCardId = cardId;
  draft.starterCardRevealed = Boolean(cardId);
  draft.starterCardRevealPending = false;
  draft.starterCardSlotIndex = normalizeStarterCardSlot(draw.slotIndex, cards.length);
  return draft.starterCardRevealed;
}

export function clearStarterCardRevealDraft(draft) {
  if (!draft) return;
  draft.starterCardId = "";
  draft.starterCardRevealed = false;
  draft.starterCardRevealPending = false;
  draft.starterCardSlotIndex = -1;
}

export function isStarterCardRevealComplete(draft) {
  return Boolean(draft?.starterCardRevealed && draft.starterCardId);
}

function answerValues(answers) {
  if (Array.isArray(answers)) return answers;
  if (answers && typeof answers === "object") return Object.values(answers);
  return [];
}

function normalizeStarterCardSlot(slotIndex, cardCount) {
  const maxSlot = Math.max(0, Math.floor(Number(cardCount)) - 1);
  const index = Math.floor(Number(slotIndex));
  if (!Number.isFinite(index)) return 0;
  return Math.max(0, Math.min(maxSlot, index));
}
