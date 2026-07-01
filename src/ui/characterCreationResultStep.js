import { getLocaleText, tf } from "../localization/index.js?v=681";
import { resolveDispositionResult } from "../state/profile.js?v=681";
import { statusGradeFromStats } from "../state/statusGrade.js?v=681";
import { creationStatTotal, CREATION_STAT_KEYS } from "../state/characterCreationStats.js?v=681";

const TEXT = getLocaleText();
const CREATION_TEXT = TEXT.characterCreation;
const STAT_KEYS = CREATION_STAT_KEYS;
const STAT_LABELS = CREATION_TEXT.statLabels;
const EMPTY_STARTER_CARD = Object.freeze({
  id: "",
  card: "",
  trait: "",
  skill: "",
  glow: "",
  unlock: "",
});

export function renderCreationResultStep(draft, options = {}) {
  const disposition = resolveDispositionResult(Object.values(draft.answers));
  const alignment = disposition.name;
  const selectedCard = options.selectedCard || EMPTY_STARTER_CARD;
  const statusGrade = statusGradeFromStats(draft.stats);
  return `<div class="creation-body creation-result-panel">
    <strong class="creation-result-title">${escapeHtml(CREATION_TEXT.result.analysisComplete)}</strong>
    <p>${tf("characterCreation.result.systemAlignment", { alignment: `<b>${escapeHtml(alignment)}</b>` })}</p>
    <p class="muted">${escapeHtml(CREATION_TEXT.result.completionMessage)}</p>
    <div class="creation-summary-grid">
      <div><span>${escapeHtml(CREATION_TEXT.result.name)}</span><strong>${escapeHtml(draft.name)}</strong></div>
      <div><span>${escapeHtml(CREATION_TEXT.result.alignment)}</span><strong>${escapeHtml(alignment)}</strong></div>
      <div><span>${escapeHtml(CREATION_TEXT.result.statTotal)}</span><strong>${creationStatTotal(draft.stats)}</strong></div>
      <div><span>${escapeHtml(CREATION_TEXT.result.statusGrade)}</span><strong>${escapeHtml(statusGrade)}</strong></div>
      <div><span>${escapeHtml(CREATION_TEXT.result.starterCard)}</span><strong>${escapeHtml(selectedCard.card)}</strong></div>
      <div><span>${escapeHtml(CREATION_TEXT.result.starterTrait)}</span><strong>${escapeHtml(selectedCard.trait)}</strong></div>
      <div><span>${escapeHtml(CREATION_TEXT.result.starterSkill)}</span><strong>${escapeHtml(selectedCard.skill)}</strong></div>
      <div><span>${escapeHtml(CREATION_TEXT.result.startRegion)}</span><strong>${escapeHtml(CREATION_TEXT.result.tutorialIsland)}</strong></div>
      <div><span>${escapeHtml(CREATION_TEXT.result.dispositionScore)}</span><strong>${escapeHtml(dispositionScoreSummary(disposition))}</strong></div>
    </div>
    <div class="creation-stat-grid compact">
      ${STAT_KEYS.map((stat) => `<div class="creation-stat-line">
        <span>${escapeHtml(STAT_LABELS[stat])}</span>
        <strong>${draft.stats[stat]}</strong>
      </div>`).join("")}
    </div>
    <div class="creation-actions creation-actions-split">
      <button class="ghost-button" type="button" data-creation-back>${escapeHtml(CREATION_TEXT.questions.replay)}</button>
      <button class="primary-button" type="button" data-submit-creation>${escapeHtml(CREATION_TEXT.result.awakeningStart)}</button>
    </div>
  </div>`;
}

function dispositionScoreSummary(disposition) {
  const entries = (disposition?.scoreEntries || []).filter((entry) => entry.score > 0);
  const visibleEntries = entries.length ? entries : disposition?.scoreEntries || [];
  return visibleEntries.map((entry) => `${entry.name} ${entry.score}`).join(" / ");
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
