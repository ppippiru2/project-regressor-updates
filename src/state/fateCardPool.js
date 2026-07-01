import { getLocaleText, t } from "../localization/index.js?v=678";
import { REGRESSION_FATE_CARD_POOL_DATA } from "../data/fateCardPoolData.js?v=678";
import { resolveFateCardVisual, resolveFateCardVisualSlug } from "../data/fateCardVisualData.js?v=678";
import { resolveFateCardAuraTier } from "./fateCardRoller.js?v=678";

export function createRegressionFateCardCatalog(starterCards = [], localeText = getLocaleText()) {
  const starter = Array.isArray(starterCards) ? starterCards.filter((card) => card?.id) : [];
  return uniqueCardsById([
    ...starter.map((card) => normalizeCatalogCard(card, localeText, "starter")),
    ...REGRESSION_FATE_CARD_POOL_DATA.map((card) => normalizeCatalogCard(card, localeText, "regression")),
  ]);
}

export function createRegressionOnlyFateCardCatalog(localeText = getLocaleText()) {
  return REGRESSION_FATE_CARD_POOL_DATA.map((card) => normalizeCatalogCard(card, localeText, "regression"));
}

function normalizeCatalogCard(card, localeText, source) {
  const text = localeText?.fateCardPool?.items?.[card.id] || {};
  const grade = card.grade || card.rarity || "D";
  const auraTier = resolveFateCardAuraTier(grade);
  const visualSlug = resolveFateCardVisualSlug(card);
  const visual = resolveFateCardVisual({ ...card, visualSlug });
  return {
    ...card,
    card: text.card || card.card || card.name || card.id,
    name: text.card || card.name || card.card || card.id,
    traitId: card.traitId || `${card.id}_trait`,
    trait: text.trait || card.trait || "",
    traitName: text.trait || card.traitName || card.trait || "",
    skill: text.skill || card.skill || "",
    skillName: text.skill || card.skillName || card.skill || "",
    description: text.description || card.description || "",
    grade,
    rarity: card.rarity || grade,
    glow: text.glow || t(`fateCardHints.aura.${auraTier}`),
    visualSlug,
    frontImage: visual?.frontImage || "",
    revealSprite: visual?.revealSprite || "",
    defaultBfx: visual?.defaultBfx || "",
    poolSource: source,
  };
}

function uniqueCardsById(cards) {
  const seen = new Set();
  return cards.filter((card) => {
    if (!card?.id || seen.has(card.id)) return false;
    seen.add(card.id);
    return true;
  });
}
