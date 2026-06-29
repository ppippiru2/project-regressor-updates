import { getLocaleText, t, tf } from "../localization/index.js?v=572";
import {
  createRegressionCardResyncState,
  shouldShowRegressionCardResync,
} from "../state/regressionCardState.js?v=572";
import { createRegressionCardCandidateSlots } from "../state/regressionCardDraw.js?v=572";
import { resolveCardGradeAuraClass } from "../state/cardGradeDisplay.js?v=572";

export function regressionStarterCards(localeText = getLocaleText()) {
  return Array.isArray(localeText.characterCreation?.starterCards?.items)
    ? localeText.characterCreation.starterCards.items
    : [];
}

export function renderRegressionCardResync(state, cards = regressionStarterCards()) {
  const container = document.getElementById("regression-card-resync");
  if (!container) return;

  const visible = shouldShowRegressionCardResync(state);
  container.hidden = !visible;
  container.dataset.resyncState = visible ? "available" : "hidden";
  if (!visible) {
    container.innerHTML = "";
    return;
  }

  const run = Math.max(2, Math.floor(Number(state?.regressionCount ?? state?.tutorialRun ?? 2)) || 2);
  const snapshot = createRegressionCardResyncState(state);
  const availableCards = Array.isArray(cards) ? cards.filter((card) => card?.id) : [];
  const visibleCards = createRegressionCardCandidateSlots(availableCards, snapshot, {
    seed: run + snapshot.karmaValue,
  });
  const selectedName = snapshot.selectedCardName || state?.playerProfile?.starterCardName || t("regressionCardResync.emptySelection");

  container.innerHTML = `
    <div class="regression-card-heading">
      <div>
        <span class="eyebrow">${escapeHtml(t("regressionCardResync.eyebrow"))}</span>
        <h3>${escapeHtml(tf("regressionCardResync.title", { run }))}</h3>
        <p>${escapeHtml(t("regressionCardResync.description"))}</p>
      </div>
      <div class="regression-card-karmabar" aria-label="${escapeAttr(t("regressionCardResync.karmaLabel"))}">
        <span>${escapeHtml(t("regressionCardResync.karmaLabel"))}</span>
        <strong>${snapshot.karmaValue}</strong>
      </div>
    </div>
    <div class="regression-card-meta">
      <span>${escapeHtml(tf("regressionCardResync.candidateCount", { count: snapshot.cardCandidateCount }))}</span>
      <span>${escapeHtml(snapshot.cardGradeWeightSummary)}</span>
      <span>${escapeHtml(tf("regressionCardResync.currentSelection", { card: selectedName }))}</span>
    </div>
    <div class="regression-card-list">
      ${visibleCards.map((slot) => renderCardButton(slot, snapshot)).join("")}
    </div>
  `;
}

function renderCardButton(slot, snapshot) {
  const card = slot.card || {};
  const selected = card.card === snapshot.selectedCardName;
  const auraClass = resolveCardGradeAuraClass(slot.auraCard);
  return `<button class="regression-card-option is-hidden-card ${auraClass} ${selected ? "selected" : ""}" type="button" data-regression-card="${escapeAttr(card.id)}" aria-pressed="${selected ? "true" : "false"}">
    <span class="creation-starter-card-glow">${escapeHtml(t("regressionCardResync.hiddenGlow"))}</span>
    <strong>${escapeHtml(tf("regressionCardResync.hiddenCard", { number: slot.index + 1 }))}</strong>
    <small>${escapeHtml(t("regressionCardResync.hiddenHint"))}</small>
    <small>${escapeHtml(t("regressionCardResync.karmaHint"))}</small>
  </button>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
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

function escapeAttr(value) {
  return escapeHtml(value);
}
