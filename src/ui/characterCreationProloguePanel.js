import { getLocaleText, tf } from "../localization/index.js?v=675";
import { resolveAlignment, resolveDispositionResult } from "../state/profile.js?v=675";
import { statusGradeFromStats } from "../state/statusGrade.js?v=675";
import {
  renderTutorialDialogueTemplate,
  resolveTutorialDispositionDialogue,
  resolveTutorialKeyEventDialogue,
  resolveTutorialStarterCardDialogue,
  TUTORIAL_SELF_DESCRIBING_NEW_GAME_EVENT_FLOW,
} from "../story/tutorialDialogueEvents.js?v=675";

const TEXT = getLocaleText();
const CREATION_TEXT = TEXT.characterCreation;
const STAT_KEYS = ["STR", "AGI", "VIT", "INT", "WIS", "LUK"];
const STAT_LABELS = CREATION_TEXT.statLabels;
const STARTER_CARDS = CREATION_TEXT.starterCards.items;
const EMPTY_STARTER_CARD = Object.freeze({
  id: "",
  card: "",
  trait: "",
  skill: "",
  glow: "",
  unlock: "",
});

export const CREATION_PROLOGUE_EVENT_STEPS = Object.freeze({
  prologue_dream_01_falling_consciousness: "profile",
  prologue_dream_02_profile_record: "profile",
  prologue_dream_03_initial_stat_sync: "stats",
  prologue_dream_04_abyss_questions_start: "questions",
  "prologue_result_{dispositionId}": "starterCards",
  prologue_card_01_show_cards: "starterCards",
  "prologue_card_{starterCardId}": "starterCards",
  prologue_transfer_to_tutorial: "result",
});

export function renderCreationProloguePanel(draft) {
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

function selectedStarterCard(draft) {
  if (!draft?.starterCardId) return EMPTY_STARTER_CARD;
  return STARTER_CARDS.find((card) => card.id === draft.starterCardId) || EMPTY_STARTER_CARD;
}

function isStarterCardRevealed(draft) {
  return Boolean(draft?.starterCardRevealed && draft.starterCardId);
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

function escapeAttr(value) {
  return escapeHtml(value);
}
