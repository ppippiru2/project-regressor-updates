import { getLocaleText, tf } from "../localization/index.js?v=675";
import { createHiddenCardSlots } from "../state/starterCardDraw.js?v=675";
import { FATE_CARD_RENDER_MODES } from "../state/fateCardRoller.js?v=675";
import { renderFateCardButton } from "./fateCardRenderer.js?v=675";

const TEXT = getLocaleText();
const CREATION_TEXT = TEXT.characterCreation;
const COMMON_TEXT = TEXT.common;
const STARTER_CARDS = CREATION_TEXT.starterCards.items;
const EMPTY_STARTER_CARD = Object.freeze({
  id: "",
  card: "",
  trait: "",
  skill: "",
  glow: "",
  unlock: "",
});

export function renderCreationStarterCardStep(draft, options = {}) {
  const revealed = options.revealed === true;
  const selectedCard = revealed ? options.selectedCard || EMPTY_STARTER_CARD : EMPTY_STARTER_CARD;
  const cardSlots = createHiddenCardSlots(STARTER_CARDS);
  return `<div class="creation-body creation-starter-body">
    <p class="muted creation-starter-brief">${escapeHtml(CREATION_TEXT.starterCards.brief)}</p>
    <div class="creation-starter-card-list">
      ${cardSlots.map((slot) => renderStarterCardSlot(slot, draft, { revealed, selectedCard })).join("")}
    </div>
    <div class="creation-summary-grid creation-card-result" ${revealed ? "" : "hidden"}>
      <div><span>${escapeHtml(CREATION_TEXT.starterCards.selectedCard)}</span><strong>${escapeHtml(revealed ? selectedCard.card : CREATION_TEXT.starterCards.hiddenSelection)}</strong></div>
      <div><span>${escapeHtml(CREATION_TEXT.starterCards.selectedTrait)}</span><strong>${escapeHtml(revealed ? selectedCard.trait : CREATION_TEXT.starterCards.hiddenSelection)}</strong></div>
      <div><span>${escapeHtml(CREATION_TEXT.starterCards.selectedSkill)}</span><strong>${escapeHtml(revealed ? selectedCard.skill : CREATION_TEXT.starterCards.hiddenSelection)}</strong></div>
    </div>
    <div class="creation-actions creation-actions-split">
      <button class="ghost-button" type="button" data-creation-back>${escapeHtml(COMMON_TEXT.previous)}</button>
      <button class="primary-button" type="button" data-confirm-starter-card ${revealed ? "" : "disabled"}>${escapeHtml(CREATION_TEXT.starterCards.confirmNext)}</button>
    </div>
  </div>`;
}

function renderStarterCardSlot(slot, draft, { revealed, selectedCard }) {
  const selected = revealed && draft.starterCardSlotIndex === slot.index;
  const slotCard = selected ? selectedCard : null;
  return renderFateCardButton({
    ...slot,
    card: slotCard,
    cardId: slotCard?.id || "",
    cardName: slotCard?.card || "",
    traitName: slotCard?.trait || "",
    skillName: slotCard?.skill || "",
    grade: slotCard?.grade || slotCard?.rarity || slotCard?.glow || "D",
    auraCard: slotCard || {},
  }, {
    mode: FATE_CARD_RENDER_MODES.productionProgressiveHint,
    hintLevel: 0,
    selected,
    revealed: selected,
    disabled: revealed,
    className: "creation-starter-card",
    attributes: {
      "data-starter-card-slot": slot.index,
    },
    hiddenTitle: tf("characterCreation.starterCards.hiddenCard", { number: slot.index + 1 }),
    hiddenGlow: CREATION_TEXT.starterCards.hiddenGlow,
    hiddenHint: selected ? CREATION_TEXT.starterCards.revealedHint : CREATION_TEXT.starterCards.hiddenHint,
    revealedHint: CREATION_TEXT.starterCards.revealedHint,
    showIdentityDetails: false,
  });
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}
