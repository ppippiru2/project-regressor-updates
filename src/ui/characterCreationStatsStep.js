import { getLocaleText, tf } from "../localization/index.js?v=676";
import { INITIAL_CREATION_STAT_BALANCE } from "../balance/playerGrowthBalance.js?v=676";
import { renderDiceSprite } from "./diceSpriteRenderer.js?v=676";

const TEXT = getLocaleText();
const CREATION_TEXT = TEXT.characterCreation;
const COMMON_TEXT = TEXT.common;
const STAT_KEYS = ["STR", "AGI", "VIT", "INT", "WIS", "LUK"];
const STAT_LABELS = CREATION_TEXT.statLabels;
const INITIAL_STAT_TOTAL = INITIAL_CREATION_STAT_BALANCE.total;

export function renderCreationStatsStep(draft) {
  const total = statTotal(draft.stats);
  return `<div class="creation-body">
    <div class="creation-dice-panel">
      <div class="creation-dice-visual" aria-hidden="true">
        ${renderDiceSprite(draft, { size: 92 })}
      </div>
      <button class="secondary-button creation-dice-button" type="button" data-roll-stats>
        <span class="creation-dice-button-inner">
          <span>${escapeHtml(CREATION_TEXT.stats.rollDice)}</span>
        </span>
      </button>
      <strong class="${draft.statRolled ? "creation-result-ready" : "creation-result-wait"}">
        ${escapeHtml(draft.statRolled ? CREATION_TEXT.stats.complete : CREATION_TEXT.stats.waiting)}
      </strong>
      <small>${escapeHtml(tf("characterCreation.stats.totalWithBaseline", {
        total,
        baseline: INITIAL_STAT_TOTAL,
      }))}</small>
    </div>
    <div class="creation-stat-grid">
      ${STAT_KEYS.map((stat) => `<div class="creation-stat-line">
        <span>${escapeHtml(STAT_LABELS[stat])}</span>
        <strong>${draft.stats[stat]}</strong>
      </div>`).join("")}
    </div>
    <div class="creation-actions creation-actions-split">
      <button class="ghost-button" type="button" data-creation-back>${escapeHtml(COMMON_TEXT.previous)}</button>
      <button class="primary-button" type="button" data-confirm-stats ${draft.statRolled ? "" : "disabled"}>${escapeHtml(CREATION_TEXT.stats.confirmNext)}</button>
    </div>
  </div>`;
}

function statTotal(stats) {
  return STAT_KEYS.reduce((total, stat) => total + (Number(stats?.[stat]) || 0), 0);
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}
