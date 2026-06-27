import { formatText, getLocaleText } from "../localization/index.js?v=391";

export const TUTORIAL_DIALOGUE_VERSION = "v2.5";

export const TUTORIAL_DIALOGUE_PHASES = Object.freeze([
  "system_initialization",
  "disposition_result",
  "starter_card_selection",
  "tutorial_shore_run1",
  "tutorial_forest_run1",
  "broken_ruins_run1",
  "mana_mine_run1",
  "rift_gate_run1",
  "post_tutorial_reality",
  "tutorial_run2",
  "tutorial_run3_4",
]);

export const TUTORIAL_DIALOGUE_KEY_EVENTS = Object.freeze([
  {
    id: "tutorial_1st_forest_04_north_rock_gold_card_hint",
    phase: "tutorial_forest_run1",
    run: 1,
    policy: "hint_only",
  },
  {
    id: "tutorial_1st_forest_05_alpha_wolf_elite",
    phase: "tutorial_forest_run1",
    run: 1,
    policy: "elite_retry_or_avoid",
  },
  {
    id: "tutorial_1st_ruins_05_hidden_stair_locked",
    phase: "broken_ruins_run1",
    run: 1,
    policy: "condition_locked",
  },
  {
    id: "tutorial_1st_mine_04_sealed_box_locked",
    phase: "mana_mine_run1",
    run: 1,
    policy: "condition_locked",
  },
  {
    id: "tutorial_1st_mine_05_core_golem_hidden_elite",
    phase: "mana_mine_run1",
    run: 1,
    policy: "elite_retry_or_avoid",
  },
  {
    id: "tutorial_1st_mine_06_forgotten_god_remnant",
    phase: "mana_mine_run1",
    run: 1,
    policy: "regression_origin_hint",
  },
  {
    id: "tutorial_2nd_03_golden_card",
    phase: "tutorial_run2",
    run: 2,
    policy: "regressor_record_reward",
  },
  {
    id: "tutorial_2nd_04_sealed_box",
    phase: "tutorial_run2",
    run: 2,
    policy: "record_unlock",
  },
  {
    id: "tutorial_4th_warden_100",
    phase: "tutorial_run3_4",
    run: 4,
    policy: "final_warden_clear",
  },
]);

const STARTER_CARD_DIALOGUE_IDS = Object.freeze({
  starter_weapon_sense: "weaponSense",
  starter_light_step: "lightStep",
  starter_enduring_body: "enduringBody",
  starter_faint_mana: "faintMana",
});

const DISPOSITION_BY_ALIGNMENT_KEY = Object.freeze({
  neutral: "inquiryRecord",
  chaoticPragmatic: "freeSurvival",
  lawfulHero: "devotedOrder",
  heroLawful: "devotedOrder",
  vengefulChaotic: "coldCalculation",
  hero: "devotedOrder",
  pragmatic: "practicalBalance",
  vengeful: "coldCalculation",
  lawful: "devotedOrder",
  chaotic: "freeSurvival",
});

export function buildTutorialIntroDialogueLogs(profile, { localeText = getLocaleText() } = {}) {
  const text = localeText.story?.tutorialDialogue;
  if (!text?.introLog) return [];

  const disposition = resolveTutorialDispositionDialogue(profile, { localeText });
  const starterCard = resolveTutorialStarterCardDialogue(profile, { localeText });
  const messages = [];

  if (disposition?.log) {
    messages.push(
      formatText(text.introLog.disposition, {
        disposition: disposition.name,
        reaction: disposition.log,
      }),
    );
  }

  if (starterCard?.log) {
    messages.push(
      formatText(text.introLog.starterCard, {
        cardName: starterCard.cardName,
        reaction: starterCard.log,
      }),
    );
  }

  return messages.filter(Boolean);
}

export function resolveTutorialDispositionDialogue(profile, { localeText = getLocaleText() } = {}) {
  const dispositions = localeText.story?.tutorialDialogue?.dispositions;
  if (!dispositions) return null;

  const alignment = String(profile?.alignment || "");
  const directMatch = Object.entries(dispositions).find(([, entry]) => entry.name === alignment);
  if (directMatch) return { id: directMatch[0], ...directMatch[1] };

  const alignmentKey = Object.entries(localeText.profile?.alignments || {}).find(([, value]) => value === alignment)?.[0];
  const dispositionId = DISPOSITION_BY_ALIGNMENT_KEY[alignmentKey] || "practicalBalance";
  const entry = dispositions[dispositionId];
  return entry ? { id: dispositionId, ...entry } : null;
}

export function resolveTutorialStarterCardDialogue(profile, { localeText = getLocaleText() } = {}) {
  const starterCards = localeText.story?.tutorialDialogue?.starterCards;
  if (!starterCards) return null;

  const starterCardId = String(profile?.starterCardId || "");
  const dialogueId = STARTER_CARD_DIALOGUE_IDS[starterCardId] || "weaponSense";
  const entry = starterCards[dialogueId];
  return entry ? { id: dialogueId, ...entry } : null;
}

export function getTutorialDialogueEventCatalog() {
  return {
    version: TUTORIAL_DIALOGUE_VERSION,
    phases: TUTORIAL_DIALOGUE_PHASES,
    keyEvents: TUTORIAL_DIALOGUE_KEY_EVENTS,
  };
}
