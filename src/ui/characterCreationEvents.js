import { getLocaleText, tf } from "../localization/index.js?v=573";
import {
  PROFILE_IMAGE_CUSTOMIZATION_BRIDGE_ID,
  resolveAlignment,
  resolveDispositionResult,
} from "../state/profile.js?v=573";
import {
  DEFAULT_PORTRAIT_FRAME,
  dragPortraitFrame,
  nudgePortraitFrame,
  normalizePortraitFrame,
} from "../state/portraitFrame.js?v=573";
import {
  applyPortraitFrameToElement,
  portraitCropImageHtml,
  portraitFrameInlineStyle,
} from "./portraitFrameView.js?v=573";
import {
  diceFaceFromStats,
  diceRollDuration,
  initialDiceFace,
  loadSystemDiceSprite,
  renderDiceSprite,
} from "./diceSpriteRenderer.js?v=573";
import { INITIAL_CREATION_STAT_BALANCE } from "../balance/playerGrowthBalance.js?v=573";
import { statusGradeFromStats } from "../state/statusGrade.js?v=573";
import {
  createHiddenCardSlots,
  createWeightedStarterCards,
  resolveRecommendedStarterCardDraw,
} from "../state/starterCardDraw.js?v=573";
import { FATE_CARD_RENDER_MODES } from "../state/fateCardRoller.js?v=573";
import { renderFateCardButton } from "./fateCardRenderer.js?v=573";
import {
  renderTutorialDialogueTemplate,
  resolveTutorialDispositionDialogue,
  resolveTutorialKeyEventDialogue,
  resolveTutorialStarterCardDialogue,
  TUTORIAL_SELF_DESCRIBING_NEW_GAME_EVENT_FLOW,
} from "../story/tutorialDialogueEvents.js?v=573";

const TEXT = getLocaleText();
const CREATION_TEXT = TEXT.characterCreation;
const COMMON_TEXT = TEXT.common;
const STAT_KEYS = ["STR", "AGI", "VIT", "INT", "WIS", "LUK"];
const STAT_LABELS = CREATION_TEXT.statLabels;
const GENDER_OPTIONS = CREATION_TEXT.profile.genderOptions;
const COUNTRY_OPTIONS = CREATION_TEXT.profile.countryOptions;
const QUESTIONS = CREATION_TEXT.questions.items;
const STARTER_CARDS = CREATION_TEXT.starterCards.items;
const EMPTY_STARTER_CARD = Object.freeze({
  id: "",
  card: "",
  trait: "",
  skill: "",
  glow: "",
  unlock: "",
});
const INITIAL_STAT_TOTAL = INITIAL_CREATION_STAT_BALANCE.total;
const INITIAL_STAT_TOTAL_RANGE = INITIAL_CREATION_STAT_BALANCE.totalRange || {
  min: INITIAL_STAT_TOTAL,
  max: INITIAL_STAT_TOTAL,
};
const INITIAL_STAT_VALUES = INITIAL_CREATION_STAT_BALANCE.startingStats;
const MIN_STAT_VALUES = INITIAL_CREATION_STAT_BALANCE.minValues || INITIAL_STAT_VALUES;
const MAX_STAT_VALUE = 10;
const MAX_PROFILE_IMAGE_BYTES = 1200000;
const CREATION_PROLOGUE_EVENT_STEPS = Object.freeze({
  prologue_dream_01_falling_consciousness: "profile",
  prologue_dream_02_profile_record: "profile",
  prologue_dream_03_initial_stat_sync: "stats",
  prologue_dream_04_abyss_questions_start: "questions",
  "prologue_result_{dispositionId}": "starterCards",
  prologue_card_01_show_cards: "starterCards",
  "prologue_card_{starterCardId}": "starterCards",
  prologue_transfer_to_tutorial: "result",
});
export function bindCharacterCreationEvents(onCreateCharacter, onCancelCreation) {
  const form = document.getElementById("character-create-form");
  if (!form) return;

  let draft = createInitialDraft();
  let creationDragState = null;
  renderCreationWizard(form, draft);
  loadCreationDiceSprite(form, draft);

  document.addEventListener("project-regressor:reset-character-creation", () => {
    draft = createInitialDraft();
    renderCreationWizard(form, draft);
    loadCreationDiceSprite(form, draft);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (draft.step === "result") {
      syncHiddenFields(form, draft);
      onCreateCharacter(event.currentTarget);
    }
  });

  form.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;

    if (button.dataset.cancelCreation !== undefined) {
      event.preventDefault();
      onCancelCreation?.();
      return;
    }

    if (button.dataset.creationCropMove) {
      event.preventDefault();
      updateCreationFrame(nudgePortraitFrame(draft.portraitFrame, button.dataset.creationCropMove));
      return;
    }

    if (button.dataset.creationCropZoom) {
      event.preventDefault();
      updateCreationFrame(nudgePortraitFrame(draft.portraitFrame, button.dataset.creationCropZoom));
      return;
    }

    if (button.dataset.creationCropReset !== undefined) {
      event.preventDefault();
      updateCreationFrame(nudgePortraitFrame(draft.portraitFrame, "reset"));
      return;
    }

    if (button.dataset.creationNext === "stats") {
      event.preventDefault();
      readProfileFields(form, draft);
      draft.step = "stats";
      renderCreationWizard(form, draft);
      return;
    }

    if (button.dataset.creationBack !== undefined) {
      event.preventDefault();
      moveBack(draft);
      renderCreationWizard(form, draft);
      return;
    }

    if (button.dataset.rollStats !== undefined) {
      event.preventDefault();
      draft.stats = rollInitialStats();
      draft.statRolled = true;
      draft.diceFace = diceFaceFromStats(draft.stats);
      draft.diceRollSequence += 1;
      draft.diceRollingUntil = Date.now() + diceRollDuration();
      renderCreationWizard(form, draft);
      window.setTimeout(() => {
        if (Date.now() < draft.diceRollingUntil) return;
        draft.diceRollingUntil = 0;
        renderCreationWizard(form, draft);
      }, diceRollDuration() + 40);
      return;
    }

    if (button.dataset.confirmStats !== undefined) {
      event.preventDefault();
      if (!draft.statRolled) return;
      draft.step = "questions";
      draft.questionIndex = 0;
      renderCreationWizard(form, draft);
      return;
    }

    if (button.dataset.questionAnswer) {
      event.preventDefault();
      answerQuestion(draft, button.dataset.questionAnswer);
      renderCreationWizard(form, draft);
      return;
    }

    if (button.dataset.starterCardSlot) {
      event.preventDefault();
      revealStarterCard(draft, Number(button.dataset.starterCardSlot));
      renderCreationWizard(form, draft);
      return;
    }

    if (button.dataset.confirmStarterCard !== undefined) {
      event.preventDefault();
      if (!isStarterCardRevealed(draft)) return;
      draft.step = "result";
      renderCreationWizard(form, draft);
      return;
    }

    if (button.dataset.submitCreation !== undefined) {
      event.preventDefault();
      syncHiddenFields(form, draft);
      onCreateCharacter(form);
    }
  });

  form.addEventListener("change", async (event) => {
    if (event.target.id !== "creation-profile-image-input") return;
    readProfileFields(form, draft);
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith("image/") || file.size > MAX_PROFILE_IMAGE_BYTES) {
      draft.portraitDataUrl = "";
      draft.portraitFileName = CREATION_TEXT.profile.imageTooLarge;
      event.target.value = "";
      renderCreationWizard(form, draft);
      return;
    }
    draft.portraitDataUrl = await readFileAsDataUrl(file);
    draft.portraitFileName = file.name;
    draft.portraitFrame = normalizePortraitFrame(DEFAULT_PORTRAIT_FRAME);
    renderCreationWizard(form, draft);
  });

  form.addEventListener("pointerdown", (event) => {
    const preview = event.target.closest(".creation-profile-preview.has-image");
    if (!preview) return;
    const rect = preview.getBoundingClientRect();
    creationDragState = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      rect,
      frame: normalizePortraitFrame(draft.portraitFrame),
    };
    preview.setPointerCapture?.(event.pointerId);
    event.preventDefault();
  });

  form.addEventListener("pointermove", (event) => {
    if (!creationDragState || event.pointerId !== creationDragState.pointerId) return;
    const deltaXPercent = ((event.clientX - creationDragState.startX) / Math.max(1, creationDragState.rect.width)) * 100;
    const deltaYPercent = ((event.clientY - creationDragState.startY) / Math.max(1, creationDragState.rect.height)) * 100;
    updateCreationFrame(dragPortraitFrame(creationDragState.frame, deltaXPercent, deltaYPercent), false);
    event.preventDefault();
  });

  const endCreationDrag = (event) => {
    if (!creationDragState || event.pointerId !== creationDragState.pointerId) return;
    creationDragState = null;
  };
  form.addEventListener("pointerup", endCreationDrag);
  form.addEventListener("pointercancel", endCreationDrag);

  function updateCreationFrame(frame, shouldRender = true) {
    draft.portraitFrame = normalizePortraitFrame(frame);
    const preview = form.querySelector(".creation-profile-preview");
    if (preview) applyPortraitFrameToElement(preview, draft.portraitFrame);
    if (shouldRender) renderCreationWizard(form, draft);
  }
}

function createInitialDraft() {
  const queryDefaults = readCreationQueryDefaults();
  return {
    step: "profile",
    name: queryDefaults.name || CREATION_TEXT.profile.defaultName,
    age: queryDefaults.age,
    gender: queryDefaults.gender,
    country: queryDefaults.country,
    portraitDataUrl: "",
    portraitFileName: CREATION_TEXT.profile.emptyImage,
    portraitFrame: normalizePortraitFrame(DEFAULT_PORTRAIT_FRAME),
    stats: createBalancedStats(),
    statRolled: false,
    diceFace: initialDiceFace(),
    diceRollingUntil: 0,
    diceRollSequence: 0,
    questionIndex: 0,
    answers: {},
    starterCardId: "",
    starterCardRevealed: false,
    starterCardSlotIndex: -1,
  };
}

function loadCreationDiceSprite(form, draft) {
  loadSystemDiceSprite().then(() => {
    draft.diceFace = draft.diceFace || initialDiceFace();
    renderCreationWizard(form, draft);
  });
}

function readCreationQueryDefaults() {
  const params = new URLSearchParams(window.location.search);
  return {
    name: String(params.get("name") || "").trim().slice(0, 12),
    age: clampNumber(Number(params.get("age")), 14, 99, 20),
    gender: normalizeChoice(params.get("gender"), GENDER_OPTIONS, GENDER_OPTIONS[0]),
    country: normalizeChoice(params.get("country"), COUNTRY_OPTIONS, COUNTRY_OPTIONS[0]),
  };
}

function renderCreationWizard(form, draft) {
  form.innerHTML = `
    ${renderHiddenFields(draft)}
    ${renderStepHeader(draft)}
    ${renderStepBody(draft)}
  `;
}

function renderStepHeader(draft) {
  const stepText = {
    profile: CREATION_TEXT.profile,
    stats: CREATION_TEXT.stats,
    questions: CREATION_TEXT.questions,
    starterCards: CREATION_TEXT.starterCards,
    result: CREATION_TEXT.result,
  }[draft.step];

  return `<div class="creation-step-header">
    <span class="eyebrow">${escapeHtml(COMMON_TEXT.systemInitialization)}</span>
    <h2>[ ${escapeHtml(stepText.title)} ]</h2>
    <p class="muted">${escapeHtml(stepText.description)}</p>
    ${renderCreationProloguePanel(draft)}
  </div>`;
}

function renderStepBody(draft) {
  if (draft.step === "stats") return renderStatsStep(draft);
  if (draft.step === "questions") return renderQuestionStep(draft);
  if (draft.step === "starterCards") return renderStarterCardStep(draft);
  if (draft.step === "result") return renderResultStep(draft);
  return renderProfileStep(draft);
}

function renderCreationProloguePanel(draft) {
  const eventIds = creationPrologueEventIdsForStep(draft.step);
  if (!eventIds.length) return "";

  const templateValues = creationPrologueTemplateValues(draft);
  const events = eventIds
    .map((eventId) => resolveCreationPrologueEvent(eventId, draft, templateValues))
    .filter(Boolean);
  if (!events.length) return "";

  return `<div class="creation-prologue-panel" data-creation-prologue-step="${escapeAttr(draft.step)}">
    ${events.map(renderCreationPrologueEvent).join("")}
  </div>`;
}

function creationPrologueEventIdsForStep(step) {
  return TUTORIAL_SELF_DESCRIBING_NEW_GAME_EVENT_FLOW
    .filter((eventId) => CREATION_PROLOGUE_EVENT_STEPS[eventId] === step);
}

function resolveCreationPrologueEvent(eventId, draft, templateValues) {
  if (eventId === "prologue_result_{dispositionId}") return resolveCreationDispositionEvent(draft, templateValues);
  if (eventId === "prologue_card_{starterCardId}") return resolveCreationStarterCardEvent(draft, templateValues);
  return resolveTutorialKeyEventDialogue(eventId, { localeText: TEXT, templateValues });
}

function resolveCreationDispositionEvent(draft, templateValues) {
  const disposition = resolveDispositionResult(Object.values(draft.answers || {}));
  const resolved = resolveTutorialDispositionDialogue({ alignment: disposition.name }, { localeText: TEXT });
  if (!resolved) return null;
  const introTemplate = TEXT.story?.tutorialDialogue?.introLog?.disposition || "{disposition}. {reaction}";
  const reaction = renderTutorialDialogueTemplate(resolved.log || "", templateValues, { localeText: TEXT });
  return {
    eventId: `prologue_result_${resolved.id || disposition.id}`,
    speakerType: "system",
    title: resolved.name || disposition.name,
    detail: {
      systemLines: [
        renderTutorialDialogueTemplate(introTemplate, {
          ...templateValues,
          disposition: resolved.name || disposition.name,
          reaction,
        }, { localeText: TEXT }),
      ],
    },
  };
}

function resolveCreationStarterCardEvent(draft, templateValues) {
  if (!isStarterCardRevealed(draft)) return null;
  const selectedCard = selectedStarterCard(draft);
  const resolved = resolveTutorialStarterCardDialogue({ starterCardId: selectedCard.id }, { localeText: TEXT });
  if (!resolved) return null;
  const introTemplate = TEXT.story?.tutorialDialogue?.introLog?.starterCard || "{cardName}. {reaction}";
  const reaction = renderTutorialDialogueTemplate(resolved.log || "", templateValues, { localeText: TEXT });
  return {
    eventId: `prologue_card_${selectedCard.id}`,
    speakerType: "system",
    title: resolved.cardName || selectedCard.card,
    detail: {
      systemLines: [
        renderTutorialDialogueTemplate(introTemplate, {
          ...templateValues,
          cardName: resolved.cardName || selectedCard.card,
          reaction,
        }, { localeText: TEXT }),
      ],
    },
  };
}

function renderCreationPrologueEvent(event) {
  const lines = prologueLinesFromDetail(event.detail).slice(0, 4);
  return `<div class="creation-prologue-event" data-creation-event-id="${escapeAttr(event.eventId)}" data-speaker-type="${escapeAttr(event.speakerType || "system")}">
    <strong>${escapeHtml(event.title || event.eventId)}</strong>
    <div class="creation-prologue-lines">
      ${lines.map((line) => `<span>${escapeHtml(compactStarterCardLine(event.eventId, line))}</span>`).join("")}
    </div>
  </div>`;
}

function compactStarterCardLine(eventId, line) {
  if (eventId !== "prologue_card_01_show_cards") return line;
  if (line.includes(CREATION_TEXT.starterCards.basicAttackKeyword)) return CREATION_TEXT.starterCards.basicAttackGuaranteed;
  if (line.includes(CREATION_TEXT.starterCards.candidateKeyword)) {
    return tf("regressionCardResync.candidateCount", { count: STARTER_CARDS.length });
  }
  if (line.includes(CREATION_TEXT.starterCards.dispositionKeyword)) return CREATION_TEXT.starterCards.weightSummary;
  return line;
}

function creationPrologueTemplateValues(draft) {
  const selectedCard = selectedStarterCard(draft);
  const alignment = resolveAlignment(Object.values(draft.answers || {}));
  const total = statTotal(draft.stats);
  const statusGrade = statusGradeFromStats(draft.stats);
  return {
    playerName: draft.name,
    age: draft.age,
    gender: draft.gender,
    country: draft.country,
    profileImage: draft.portraitFileName || CREATION_TEXT.profile.emptyImage,
    statSummary: STAT_KEYS.map((stat) => `${STAT_LABELS[stat]} ${draft.stats[stat] ?? 0}`).join(" / "),
    statTotal: total,
    statusGrade,
    STR: draft.stats.STR ?? 0,
    AGI: draft.stats.AGI ?? 0,
    VIT: draft.stats.VIT ?? 0,
    INT: draft.stats.INT ?? 0,
    WIS: draft.stats.WIS ?? 0,
    LUK: draft.stats.LUK ?? 0,
    dispositionName: alignment,
    starterCardName: selectedCard.card,
    starterTraitName: selectedCard.trait,
    starterSkillName: selectedCard.skill,
    karmaValue: 0,
    cardCandidateCount: STARTER_CARDS.length,
    cardGradeWeightSummary: CREATION_TEXT.starterCards.weightSummary,
    selectedCardName: selectedCard.card,
    selectedTraitName: selectedCard.trait,
    selectedSkillName: selectedCard.skill,
    nextCalamityName: CREATION_TEXT.result.tutorialIsland,
  };
}

function prologueLinesFromDetail(detail) {
  const lines = [];
  collectPrologueLines(detail, lines);
  return lines.filter(Boolean);
}

function collectPrologueLines(value, lines, key = "") {
  if (!value) return;
  if (key === "title" || key === "displayMode" || key === "speakerType" || key === "afterClearReveal") return;
  if (typeof value === "string") {
    lines.push(value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((entry) => collectPrologueLines(entry, lines));
    return;
  }
  if (typeof value === "object") {
    Object.entries(value).forEach(([entryKey, entry]) => collectPrologueLines(entry, lines, entryKey));
  }
}

function renderProfileStep(draft) {
  const canCancel = canCancelCreation();
  return `<div class="creation-body">
    <div class="creation-grid creation-grid-profile">
      <label>
        ${escapeHtml(CREATION_TEXT.profile.hunterName)}
        <input name="draft-name" type="text" value="${escapeAttr(draft.name)}" maxlength="12" autocomplete="off" required />
      </label>
      <label>
        ${escapeHtml(CREATION_TEXT.profile.age)}
        <input name="draft-age" type="number" value="${escapeAttr(draft.age)}" min="14" max="99" required />
      </label>
      <label>
        ${escapeHtml(CREATION_TEXT.profile.gender)}
        <select name="draft-gender">
          ${GENDER_OPTIONS.map((value) => option(value, draft.gender)).join("")}
        </select>
      </label>
      <label>
        ${escapeHtml(CREATION_TEXT.profile.country)}
        <select name="draft-country">
          ${COUNTRY_OPTIONS.map((value) => option(value, draft.country)).join("")}
        </select>
      </label>
    </div>
    <div class="creation-image-row" data-customization-bridge="${escapeAttr(PROFILE_IMAGE_CUSTOMIZATION_BRIDGE_ID)}">
      <span>
        <strong>${escapeHtml(CREATION_TEXT.profile.profileImage)}</strong>
        <small>${escapeHtml(draft.portraitFileName)}</small>
      </span>
      <label class="secondary-button creation-file-button">
        ${escapeHtml(CREATION_TEXT.profile.chooseImage)}
        <input id="creation-profile-image-input" type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-customization-bridge="${escapeAttr(PROFILE_IMAGE_CUSTOMIZATION_BRIDGE_ID)}" hidden />
      </label>
    </div>
    ${renderCreationPortraitAdjuster(draft)}
    <div class="creation-actions ${canCancel ? "creation-actions-split" : ""}">
      ${canCancel ? `<button class="ghost-button" type="button" data-cancel-creation>${escapeHtml(COMMON_TEXT.cancel)}</button>` : ""}
      <button class="primary-button" type="button" data-creation-next="stats">${escapeHtml(CREATION_TEXT.profile.nextStep)}</button>
    </div>
  </div>`;
}

function renderCreationPortraitAdjuster(draft) {
  if (!draft.portraitDataUrl) return "";
  return `<div class="creation-profile-editor">
    <div class="creation-profile-preview has-image" style="${portraitFrameInlineStyle(draft.portraitFrame)}" aria-label="${escapeAttr(CREATION_TEXT.profile.profileImage)}">
      ${portraitCropImageHtml(draft.portraitDataUrl, draft.name)}
      <span>${escapeHtml(draft.name || CREATION_TEXT.profile.defaultName)}</span>
    </div>
    <div class="profile-crop-controls creation-crop-controls">
      <small>${escapeHtml(CREATION_TEXT.profile.adjustImageHint)}</small>
      <div class="profile-crop-pad" aria-label="${escapeAttr(CREATION_TEXT.profile.adjustImage)}">
        <button class="ghost-button" type="button" data-creation-crop-move="up">${escapeHtml(CREATION_TEXT.profile.moveUp)}</button>
        <button class="ghost-button" type="button" data-creation-crop-move="left">${escapeHtml(CREATION_TEXT.profile.moveLeft)}</button>
        <button class="ghost-button" type="button" data-creation-crop-move="right">${escapeHtml(CREATION_TEXT.profile.moveRight)}</button>
        <button class="ghost-button" type="button" data-creation-crop-move="down">${escapeHtml(CREATION_TEXT.profile.moveDown)}</button>
      </div>
      <div class="profile-crop-zoom">
        <button class="ghost-button" type="button" data-creation-crop-zoom="zoomOut">${escapeHtml(CREATION_TEXT.profile.zoomOut)}</button>
        <button class="ghost-button" type="button" data-creation-crop-reset>${escapeHtml(CREATION_TEXT.profile.resetImageFrame)}</button>
        <button class="ghost-button" type="button" data-creation-crop-zoom="zoomIn">${escapeHtml(CREATION_TEXT.profile.zoomIn)}</button>
      </div>
    </div>
  </div>`;
}

function canCancelCreation() {
  return document.getElementById("character-creation")?.dataset.canCancel === "true";
}

function renderStatsStep(draft) {
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

function renderQuestionStep(draft) {
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

function renderStarterCardStep(draft) {
  const revealed = isStarterCardRevealed(draft);
  const selectedCard = revealed ? selectedStarterCard(draft) : EMPTY_STARTER_CARD;
  const cardSlots = createHiddenCardSlots(STARTER_CARDS);
  return `<div class="creation-body creation-starter-body">
    <p class="muted creation-starter-brief">${escapeHtml(CREATION_TEXT.starterCards.brief)}</p>
    <div class="creation-starter-card-list">
      ${cardSlots.map((slot) => {
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
      }).join("")}
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

function renderResultStep(draft) {
  const disposition = resolveDispositionResult(Object.values(draft.answers));
  const alignment = disposition.name;
  const selectedCard = selectedStarterCard(draft);
  const statusGrade = statusGradeFromStats(draft.stats);
  return `<div class="creation-body creation-result-panel">
    <strong class="creation-result-title">${escapeHtml(CREATION_TEXT.result.analysisComplete)}</strong>
    <p>${tf("characterCreation.result.systemAlignment", { alignment: `<b>${escapeHtml(alignment)}</b>` })}</p>
    <p class="muted">${escapeHtml(CREATION_TEXT.result.completionMessage)}</p>
    <div class="creation-summary-grid">
      <div><span>${escapeHtml(CREATION_TEXT.result.name)}</span><strong>${escapeHtml(draft.name)}</strong></div>
      <div><span>${escapeHtml(CREATION_TEXT.result.alignment)}</span><strong>${escapeHtml(alignment)}</strong></div>
      <div><span>${escapeHtml(CREATION_TEXT.result.statTotal)}</span><strong>${statTotal(draft.stats)}</strong></div>
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

function readProfileFields(form, draft) {
  const formData = new FormData(form);
  draft.name =
    String(formData.get("draft-name") || draft.name || CREATION_TEXT.profile.defaultName).trim() ||
    CREATION_TEXT.profile.defaultName;
  draft.age = clampNumber(Number(formData.get("draft-age")), 14, 99, 20);
  draft.gender = String(formData.get("draft-gender") || draft.gender || GENDER_OPTIONS[0]);
  draft.country = String(formData.get("draft-country") || draft.country || COUNTRY_OPTIONS[0]);
}

function answerQuestion(draft, value) {
  const question = QUESTIONS[draft.questionIndex];
  draft.answers[question.id] = value;
  if (draft.questionIndex >= QUESTIONS.length - 1) {
    draft.step = "starterCards";
    clearStarterCardReveal(draft);
    return;
  }
  draft.questionIndex += 1;
}

function moveBack(draft) {
  if (draft.step === "stats") {
    draft.step = "profile";
    return;
  }
  if (draft.step === "questions") {
    if (draft.questionIndex > 0) {
      draft.questionIndex -= 1;
    } else {
      draft.step = "stats";
    }
    return;
  }
  if (draft.step === "starterCards") {
    clearStarterCardReveal(draft);
    draft.step = "questions";
    draft.questionIndex = QUESTIONS.length - 1;
    return;
  }
  if (draft.step === "result") {
    draft.step = "starterCards";
  }
}

function renderHiddenFields(draft) {
  return `
    <input type="hidden" name="name" value="${escapeAttr(draft.name)}" />
    <input type="hidden" name="age" value="${escapeAttr(draft.age)}" />
    <input type="hidden" name="gender" value="${escapeAttr(draft.gender)}" />
    <input type="hidden" name="country" value="${escapeAttr(draft.country)}" />
    <input type="hidden" name="portraitDataUrl" value="${escapeAttr(draft.portraitDataUrl)}" />
    <input type="hidden" name="profileImageBridgeId" value="${escapeAttr(PROFILE_IMAGE_CUSTOMIZATION_BRIDGE_ID)}" />
    <input type="hidden" name="portraitFrameX" value="${escapeAttr(draft.portraitFrame.x)}" />
    <input type="hidden" name="portraitFrameY" value="${escapeAttr(draft.portraitFrame.y)}" />
    <input type="hidden" name="portraitFrameScale" value="${escapeAttr(draft.portraitFrame.scale)}" />
    ${renderStarterCardHiddenFields(draft)}
    ${QUESTIONS.map((question) => `<input type="hidden" name="${question.id}" value="${escapeAttr(draft.answers[question.id] || "")}" />`).join("")}
    ${STAT_KEYS.map((stat) => `<input type="hidden" name="stat_${stat}" value="${draft.stats[stat]}" />`).join("")}
  `;
}

function syncHiddenFields(form, draft) {
  readProfileFields(form, draft);
  for (const [name, value] of Object.entries({
    name: draft.name,
    age: draft.age,
    gender: draft.gender,
    country: draft.country,
    portraitDataUrl: draft.portraitDataUrl,
    profileImageBridgeId: PROFILE_IMAGE_CUSTOMIZATION_BRIDGE_ID,
    portraitFrameX: draft.portraitFrame.x,
    portraitFrameY: draft.portraitFrame.y,
    portraitFrameScale: draft.portraitFrame.scale,
    ...starterCardFormValues(draft),
  })) {
    setHiddenValue(form, name, value);
  }
  for (const question of QUESTIONS) {
    setHiddenValue(form, question.id, draft.answers[question.id] || "");
  }
  for (const stat of STAT_KEYS) {
    setHiddenValue(form, `stat_${stat}`, draft.stats[stat]);
  }
}

function selectedStarterCard(draft) {
  if (!draft?.starterCardId) return EMPTY_STARTER_CARD;
  return STARTER_CARDS.find((card) => card.id === draft.starterCardId) || EMPTY_STARTER_CARD;
}

function weightedStarterCards(draft) {
  const disposition = resolveDispositionResult(Object.values(draft.answers || {}));
  return createWeightedStarterCards(STARTER_CARDS, disposition.id);
}

function revealStarterCard(draft, slotIndex) {
  if (isStarterCardRevealed(draft)) return;
  const normalizedSlot = Math.max(0, Math.min(STARTER_CARDS.length - 1, Math.floor(Number(slotIndex)) || 0));
  const disposition = resolveDispositionResult(Object.values(draft.answers || {}));
  const draw = resolveRecommendedStarterCardDraw(STARTER_CARDS, disposition.id);
  draft.starterCardId = draw.card?.id || STARTER_CARDS[0]?.id || "";
  draft.starterCardRevealed = Boolean(draft.starterCardId);
  draft.starterCardSlotIndex = normalizedSlot;
}

function clearStarterCardReveal(draft) {
  draft.starterCardId = "";
  draft.starterCardRevealed = false;
  draft.starterCardSlotIndex = -1;
}

function isStarterCardRevealed(draft) {
  return Boolean(draft?.starterCardRevealed && draft.starterCardId);
}

function dispositionScoreSummary(disposition) {
  const entries = (disposition?.scoreEntries || []).filter((entry) => entry.score > 0);
  const visibleEntries = entries.length ? entries : disposition?.scoreEntries || [];
  return visibleEntries.map((entry) => `${entry.name} ${entry.score}`).join(" / ");
}

function starterCardFormValues(draft) {
  const card = selectedStarterCard(draft);
  return {
    starterCardId: card.id,
    starterCardName: card.card,
    starterTraitId: card.traitId || "",
    starterTrait: card.trait,
    starterSkill: card.skill,
    starterSkillActionId: card.actionId || "",
  };
}

function renderStarterCardHiddenFields(draft) {
  return Object.entries(starterCardFormValues(draft))
    .map(([name, value]) => `<input type="hidden" name="${name}" value="${escapeAttr(value)}" />`)
    .join("");
}

function setHiddenValue(form, name, value) {
  let input = form.querySelector(`input[type="hidden"][name="${name}"]`);
  if (!input) {
    input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    form.appendChild(input);
  }
  input.value = value;
}

function createBalancedStats() {
  return Object.fromEntries(STAT_KEYS.map((stat) => [stat, INITIAL_STAT_VALUES?.[stat] ?? 1]));
}

function rollInitialStats() {
  const stats = Object.fromEntries(STAT_KEYS.map((stat) => [stat, MIN_STAT_VALUES?.[stat] ?? 1]));
  const targetTotal = randomInitialStatTotal();
  let remaining = targetTotal - statTotal(stats);
  while (remaining > 0) {
    const candidates = STAT_KEYS.filter((stat) => stats[stat] < MAX_STAT_VALUE);
    if (!candidates.length) break;
    const stat = candidates[Math.floor(Math.random() * candidates.length)];
    stats[stat] += 1;
    remaining -= 1;
  }
  return stats;
}

function randomInitialStatTotal() {
  const min = Math.max(statTotal(MIN_STAT_VALUES), Math.floor(Number(INITIAL_STAT_TOTAL_RANGE.min) || INITIAL_STAT_TOTAL));
  const max = Math.max(min, Math.floor(Number(INITIAL_STAT_TOTAL_RANGE.max) || INITIAL_STAT_TOTAL));
  return min + Math.floor(Math.random() * (max - min + 1));
}

function statTotal(stats) {
  return STAT_KEYS.reduce((total, stat) => total + (Number(stats[stat]) || 0), 0);
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

function option(value, selected) {
  return `<option value="${escapeAttr(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(value)}</option>`;
}

function clampNumber(value, min, max, fallback) {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, Math.round(value)));
}

function normalizeChoice(value, choices, fallback) {
  const normalized = String(value || "").trim();
  return choices.includes(normalized) ? normalized : fallback;
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

function escapeAttr(value) {
  return escapeHtml(value);
}



