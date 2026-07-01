import { t, tf } from "../localization/index.js?v=678";
import {
  REGRESSION_CARD_DRAW_TEST_PRESETS,
  createRegressionCardCandidateSlots,
  createRegressionCardDrawTestSnapshot,
  normalizeRegressionCardDrawTestState,
} from "../state/regressionCardDraw.js?v=678";
import {
  FATE_CARD_RENDER_MODES,
  getFateCardHintLevel,
} from "../state/fateCardRoller.js?v=678";
import { renderFateCardButton } from "./fateCardRenderer.js?v=678";

export function renderRegressionCardDrawTest(testState = {}, cards = []) {
  const container = document.getElementById("regression-card-draw-test");
  if (!container) return;

  const state = normalizeRegressionCardDrawTestState(testState);
  const snapshot = createRegressionCardDrawTestSnapshot(state);
  const slots = createRegressionCardCandidateSlots(cards, snapshot, {
    seed: state.seed + snapshot.regressionCount,
    projectFallbackGrades: true,
  });
  const selectedSlot = slots.find((slot) => slot.index === state.selectedSlotIndex) || null;

  container.innerHTML = `
    <div class="card-draw-test-head">
      <div>
        <span class="eyebrow">${escapeHtml(t("cardDrawTest.eyebrow"))}</span>
        <h4>${escapeHtml(t("cardDrawTest.title"))}</h4>
        <p class="muted">${escapeHtml(t("cardDrawTest.description"))}</p>
        <p class="muted">${escapeHtml(t("cardDrawTest.progressiveHintNotice"))}</p>
      </div>
      <button class="secondary-button" type="button" data-card-draw-test-action="${state.open ? "close" : "open"}">
        ${escapeHtml(state.open ? t("cardDrawTest.close") : t("cardDrawTest.open"))}
      </button>
    </div>
    ${state.open ? renderBody(state, snapshot, slots, selectedSlot) : ""}
  `;
}

function renderBody(state, snapshot, slots, selectedSlot) {
  return `
    <div class="card-draw-test-body">
      <div class="card-draw-test-presets" aria-label="${escapeAttr(t("cardDrawTest.presetAria"))}">
        ${REGRESSION_CARD_DRAW_TEST_PRESETS.map((preset) => renderPresetButton(preset, state.presetId)).join("")}
      </div>
      <div class="regression-card-meta card-draw-test-meta">
        <span>${escapeHtml(tf("cardDrawTest.run", { run: snapshot.regressionCount }))}</span>
        <span>${escapeHtml(tf("cardDrawTest.karma", { karma: snapshot.karmaValue }))}</span>
        <span>${escapeHtml(tf("regressionCardResync.candidateCount", { count: snapshot.cardCandidateCount }))}</span>
        <span>${escapeHtml(snapshot.cardGradeWeightSummary)}</span>
      </div>
      <div class="regression-card-list card-draw-test-card-list">
        ${slots.map((slot) => renderCardSlot(slot, selectedSlot?.index === slot.index, snapshot)).join("")}
      </div>
      <div class="card-draw-test-actions">
        <button class="ghost-button" type="button" data-card-draw-test-action="shuffle">${escapeHtml(t("cardDrawTest.shuffle"))}</button>
        <span>${escapeHtml(t("cardDrawTest.noSaveImpact"))}</span>
      </div>
      ${renderSelectedResult(selectedSlot)}
    </div>
  `;
}

function renderPresetButton(preset, activePresetId) {
  const label = t(`cardDrawTest.presets.${preset.id}`);
  const active = preset.id === activePresetId;
  return `<button class="ghost-button ${active ? "is-active" : ""}" type="button" data-card-draw-test-preset="${escapeAttr(preset.id)}" aria-pressed="${active ? "true" : "false"}">${escapeHtml(label)}</button>`;
}

function renderCardSlot(slot, selected, snapshot) {
  const hintLevel = getFateCardHintLevel({
    regressionCount: snapshot.regressionCount,
    karmaValue: snapshot.karmaValue,
  });
  return renderFateCardButton(slot, {
    mode: FATE_CARD_RENDER_MODES.productionProgressiveHint,
    hintLevel,
    selected,
    revealed: selected,
    className: "regression-card-option card-draw-test-card",
    attributes: {
      "data-card-draw-test-slot": slot.index,
    },
    hiddenTitle: tf("cardDrawTest.hiddenCard", { number: slot.index + 1 }),
    hiddenHint: selected ? t("cardDrawTest.revealed") : t("cardDrawTest.pick"),
    revealedHint: selected ? t("cardDrawTest.revealed") : t("cardDrawTest.pick"),
  });
}

function renderSelectedResult(selectedSlot) {
  if (!selectedSlot?.card) {
    return `<div class="card-draw-test-result">
      <strong>${escapeHtml(t("cardDrawTest.resultWaiting"))}</strong>
      <small>${escapeHtml(t("cardDrawTest.resultWaitingDetail"))}</small>
    </div>`;
  }
  const card = selectedSlot.card;
  return `<div class="card-draw-test-result">
    <strong>${escapeHtml(card.card || card.name || card.id)}</strong>
    <small>${escapeHtml(tf("cardDrawTest.resultTrait", { trait: card.trait || card.traitName || "-" }))}</small>
    <small>${escapeHtml(tf("cardDrawTest.resultSkill", { skill: card.skill || card.skillName || "-" }))}</small>
    <small>${escapeHtml(t("cardDrawTest.resultNoWrite"))}</small>
  </div>`;
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
