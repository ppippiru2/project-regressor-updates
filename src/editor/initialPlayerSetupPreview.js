import { INITIAL_CREATION_STAT_BALANCE } from "../balance/playerGrowthBalance.js?v=681";
import {
  createBalancedCreationStats,
  CREATION_STAT_KEYS,
  creationStatTotal,
} from "../state/characterCreationStats.js?v=681";
import {
  PROFILE_IMAGE_CUSTOMIZATION_BRIDGE_ID,
  resolveDispositionResult,
} from "../state/profile.js?v=681";
import {
  createHiddenCardSlots,
  createWeightedStarterCards,
  resolveRecommendedStarterCardDraw,
  STARTER_CARD_DISPOSITION_WEIGHTS,
} from "../state/starterCardDraw.js?v=681";
import { CREATION_PROLOGUE_EVENT_STEPS } from "../ui/characterCreationProloguePanel.js?v=681";
import { TUTORIAL_SELF_DESCRIBING_NEW_GAME_EVENT_FLOW } from "../story/tutorialDialogueEvents.js?v=681";
import { getLocaleText } from "../localization/index.js?v=681";

export function createInitialPlayerSetupPreview({ localeText = getLocaleText() } = {}) {
  const creationText = localeText.characterCreation || {};
  const profileText = creationText.profile || {};
  const questionItems = Array.isArray(creationText.questions?.items) ? creationText.questions.items : [];
  const starterCards = Array.isArray(creationText.starterCards?.items) ? creationText.starterCards.items : [];
  const balancedStats = createBalancedCreationStats();
  const dispositionResult = resolveDispositionResult([], { localeText });
  const dispositions = Array.isArray(dispositionResult.scoreEntries) ? dispositionResult.scoreEntries : [];
  const hiddenSlots = createHiddenCardSlots(starterCards);

  return {
    version: 1,
    mode: "read-only-preview",
    status: "partial",
    apply: "disabled",
    profile: {
      defaultName: profileText.defaultName || "",
      defaultAge: 20,
      minAge: 14,
      maxAge: 99,
      genderOptionCount: Array.isArray(profileText.genderOptions) ? profileText.genderOptions.length : 0,
      countryOptionCount: Array.isArray(profileText.countryOptions) ? profileText.countryOptions.length : 0,
      profileImageBridgeId: PROFILE_IMAGE_CUSTOMIZATION_BRIDGE_ID,
    },
    stats: {
      keys: [...CREATION_STAT_KEYS],
      startingStats: balancedStats,
      startingTotal: creationStatTotal(balancedStats),
      targetTotal: INITIAL_CREATION_STAT_BALANCE.total,
      totalRange: INITIAL_CREATION_STAT_BALANCE.totalRange || {
        min: INITIAL_CREATION_STAT_BALANCE.total,
        max: INITIAL_CREATION_STAT_BALANCE.total,
      },
      minValues: INITIAL_CREATION_STAT_BALANCE.minValues || INITIAL_CREATION_STAT_BALANCE.startingStats || {},
      maxValue: 10,
    },
    questions: {
      count: questionItems.length,
      optionCount: questionItems.reduce((sum, question) => sum + (Array.isArray(question.options) ? question.options.length : 0), 0),
      dispositionCount: dispositions.length,
      dispositions: dispositions.map((entry) => ({
        id: entry.id,
        name: entry.name,
        score: entry.score,
      })),
    },
    starterCards: {
      count: starterCards.length,
      hiddenSlotCount: hiddenSlots.length,
      weightedDispositionCount: Object.keys(STARTER_CARD_DISPOSITION_WEIGHTS).length,
      recommendations: dispositions.map((disposition) => starterRecommendationForDisposition(starterCards, disposition)),
    },
    prologueFlow: {
      eventCount: TUTORIAL_SELF_DESCRIBING_NEW_GAME_EVENT_FLOW.length,
      stepCount: new Set(Object.values(CREATION_PROLOGUE_EVENT_STEPS)).size,
      steps: createPrologueStepRows(),
    },
  };
}

function starterRecommendationForDisposition(starterCards, disposition) {
  const recommended = resolveRecommendedStarterCardDraw(starterCards, disposition.id);
  const weightedCards = createWeightedStarterCards(starterCards, disposition.id);
  return {
    dispositionId: disposition.id,
    dispositionName: disposition.name,
    cardId: recommended.card?.id || "",
    cardName: recommended.card?.card || "",
    traitName: recommended.card?.trait || "",
    skillName: recommended.card?.skill || "",
    weight: recommended.weight || 0,
    totalWeight: recommended.totalWeight || 0,
    candidateCount: weightedCards.length,
  };
}

function createPrologueStepRows() {
  const counts = new Map();
  for (const eventId of TUTORIAL_SELF_DESCRIBING_NEW_GAME_EVENT_FLOW) {
    const step = CREATION_PROLOGUE_EVENT_STEPS[eventId] || "unmapped";
    counts.set(step, (counts.get(step) || 0) + 1);
  }
  return [...counts.entries()].map(([step, count]) => ({ step, count }));
}
