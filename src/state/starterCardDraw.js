export const STARTER_CARD_DISPOSITION_WEIGHTS = Object.freeze({
  starter_weapon_sense: Object.freeze({ coldCalculation: 20, practicalBalance: 10 }),
  starter_light_step: Object.freeze({ freeSurvival: 20, practicalBalance: 10 }),
  starter_enduring_body: Object.freeze({ devotedOrder: 20, practicalBalance: 10 }),
  starter_faint_mana: Object.freeze({ inquiryRecord: 20, practicalBalance: 10 }),
});

const BASE_STARTER_CARD_WEIGHT = 100;

export function createWeightedStarterCards(cards = [], dispositionId = "") {
  return cards
    .map((card, index) => ({
      card,
      weight: BASE_STARTER_CARD_WEIGHT + (STARTER_CARD_DISPOSITION_WEIGHTS[card?.id]?.[dispositionId] || 0),
      index,
    }))
    .filter((entry) => entry.card?.id)
    .sort((left, right) => right.weight - left.weight || left.index - right.index);
}

export function resolveRecommendedStarterCardDraw(cards = [], dispositionId = "") {
  const weightedCards = createWeightedStarterCards(cards, dispositionId);
  const totalWeight = weightedCards.reduce((sum, entry) => sum + entry.weight, 0);
  if (!weightedCards.length || totalWeight <= 0) {
    return { card: null, weight: 0, index: -1, totalWeight: 0 };
  }
  return { ...weightedCards[0], totalWeight };
}

export function createHiddenCardSlots(cards = [], count = cards.length) {
  const slotCount = Math.max(0, Math.min(cards.length, Math.floor(Number(count)) || cards.length));
  return Array.from({ length: slotCount }, (_, index) => ({
    index,
    id: `hidden-card-slot-${index + 1}`,
  }));
}
