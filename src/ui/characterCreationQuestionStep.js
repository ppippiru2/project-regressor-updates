import { getLocaleText } from "../localization/index.js?v=681";

const TEXT = getLocaleText();
const CREATION_TEXT = TEXT.characterCreation;
const COMMON_TEXT = TEXT.common;
const QUESTIONS = CREATION_TEXT.questions.items;

export function renderCreationQuestionStep(draft) {
  const question = QUESTIONS[draft.questionIndex];
  return `<div class="creation-body creation-question-body">
    <div class="creation-question-count">${draft.questionIndex + 1} / ${QUESTIONS.length}</div>
    <h3>${escapeHtml(question.question)}</h3>
    <div class="creation-answer-list">
      ${question.options.map(([value, label]) => `<button class="creation-answer-button" type="button" data-question-answer="${value}">
        ${escapeHtml(label)}
      </button>`).join("")}
    </div>
    <div class="creation-actions creation-actions-split">
      <button class="ghost-button" type="button" data-creation-back>${escapeHtml(COMMON_TEXT.previous)}</button>
    </div>
  </div>`;
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
