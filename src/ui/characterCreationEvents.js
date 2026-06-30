import { getLocaleText } from "../localization/index.js?v=675";
import {
  PROFILE_IMAGE_CUSTOMIZATION_BRIDGE_ID,
  resolveAlignment,
  resolveDispositionResult,
} from "../state/profile.js?v=675";
import {
  DEFAULT_PORTRAIT_FRAME,
  dragPortraitFrame,
  nudgePortraitFrame,
  normalizePortraitFrame,
} from "../state/portraitFrame.js?v=675";
import { applyPortraitFrameToElement } from "./portraitFrameView.js?v=675";
import {
  diceFaceFromStats,
  diceRollDuration,
  initialDiceFace,
  loadSystemDiceSprite,
} from "./diceSpriteRenderer.js?v=675";
import {
  createBalancedCreationStats,
  CREATION_STAT_KEYS,
  rollInitialCreationStats,
} from "../state/characterCreationStats.js?v=675";
import {
  createWeightedStarterCards,
  resolveRecommendedStarterCardDraw,
} from "../state/starterCardDraw.js?v=675";
import { renderCreationProloguePanel } from "./characterCreationProloguePanel.js?v=675";
import { renderCreationProfileStep } from "./characterCreationProfileStep.js?v=675";
import { renderCreationStatsStep } from "./characterCreationStatsStep.js?v=675";
import { renderCreationStarterCardStep } from "./characterCreationStarterCardStep.js?v=675";
import { renderCreationQuestionStep } from "./characterCreationQuestionStep.js?v=675";
import { renderCreationResultStep } from "./characterCreationResultStep.js?v=675";

const TEXT = getLocaleText();
const CREATION_TEXT = TEXT.characterCreation;
const COMMON_TEXT = TEXT.common;
const STAT_KEYS = CREATION_STAT_KEYS;
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
const MAX_PROFILE_IMAGE_BYTES = 1200000;
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
      draft.stats = rollInitialCreationStats();
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
    stats: createBalancedCreationStats(),
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
  if (draft.step === "stats") return renderCreationStatsStep(draft);
  if (draft.step === "questions") return renderCreationQuestionStep(draft);
  if (draft.step === "starterCards") {
    const revealed = isStarterCardRevealed(draft);
    return renderCreationStarterCardStep(draft, {
      revealed,
      selectedCard: revealed ? selectedStarterCard(draft) : EMPTY_STARTER_CARD,
    });
  }
  if (draft.step === "result") return renderCreationResultStep(draft, { selectedCard: selectedStarterCard(draft) });
  return renderCreationProfileStep(draft);
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

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
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
