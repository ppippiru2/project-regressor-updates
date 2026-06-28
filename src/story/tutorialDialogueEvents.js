import { formatText, getLocaleText } from "../localization/index.js?v=490";

export const TUTORIAL_DIALOGUE_VERSION = "v2.6.3_FINAL";

export const TUTORIAL_DIALOGUE_DYNAMIC_PLACEHOLDERS = Object.freeze([
  "playerName",
  "age",
  "gender",
  "country",
  "profileImage",
  "dispositionName",
  "statSummary",
  "statTotal",
  "statusGrade",
  "STR",
  "AGI",
  "VIT",
  "INT",
  "WIS",
  "LUK",
  "starterCardName",
  "starterTraitName",
  "starterSkillName",
  "karmaValue",
  "cardCandidateCount",
  "cardGradeWeightSummary",
  "selectedCardName",
  "selectedTraitName",
  "selectedSkillName",
  "nextCalamityName",
  "savedTime",
  "clearTime",
  "timeDiff",
  "itemName",
  "count",
  "target",
  "remaining",
]);

export const TUTORIAL_SELF_DESCRIBING_VERSION = "v2.9.1_CODEX_SELF_DESCRIBING";

export const TUTORIAL_SELF_DESCRIBING_REQUIRED_SYSTEMS = Object.freeze([
  "eventIdDialogueLoader",
  "placeholderRenderer",
  "newGamePrologueSystem",
  "abyssQuestionDispositionSystem",
  "starterCardSelectionUi",
  "regressionCardResyncSystem",
  "karmaSettlementStub",
  "codexScrapbookLockBeforeForgottenRemnant",
  "hiddenNodeState",
  "eliteState",
  "bossDamageEvaluation",
  "postRealityReturnWorldUnlock",
  "loopDialogueRotationAfterRun5",
  "coverageTests",
]);

export const TUTORIAL_SELF_DESCRIBING_MINIMUM_STATE_KEYS = Object.freeze([
  "profile",
  "initialSync",
  "disposition",
  "starterCard",
  "regressionCard",
  "tutorialFlags",
  "tutorialRun",
]);

export const TUTORIAL_SELF_DESCRIBING_COVERAGE_REQUIRED = Object.freeze({
  shore: Object.freeze([
    "tutorial_1st_shore_03_shore_imp",
    "tutorial_1st_shore_04_claw_crab",
    "tutorial_1st_shore_05_drift_slime_mana_variant",
    "tutorial_1st_shore_06_nameless_scrap",
    "tutorial_1st_shore_07_buried_cache_hint",
    "tutorial_1st_shore_08_rest_point",
  ]),
  forest: Object.freeze([
    "tutorial_1st_forest_01_entry",
    "tutorial_1st_forest_02_shadow_wolf",
    "tutorial_1st_forest_03_goblin_scout",
    "tutorial_1st_forest_04_north_rock_gold_card_hint",
    "tutorial_1st_forest_05_alpha_wolf_elite",
    "tutorial_1st_forest_06_hidden_herb_field",
  ]),
  ruins: Object.freeze([
    "tutorial_1st_ruins_01_entry",
    "tutorial_1st_ruins_02_mock_gate_node_map",
    "tutorial_1st_ruins_03_sentinel",
    "tutorial_1st_ruins_04_rune_doll",
    "tutorial_1st_ruins_05_hidden_stair_locked",
    "tutorial_1st_ruins_06_hidden_treasure_hint",
  ]),
  mine: Object.freeze([
    "tutorial_1st_mine_01_entry",
    "tutorial_1st_mine_02_crystal_bug",
    "tutorial_1st_mine_03_mine_golem",
    "tutorial_1st_mine_04_sealed_box_locked",
    "tutorial_1st_mine_05_core_golem_hidden_elite",
    "tutorial_1st_mine_06_forgotten_god_remnant",
  ]),
  gate: Object.freeze([
    "tutorial_1st_gate_01_rift_squire",
    "tutorial_1st_gate_02_shieldbearer",
    "tutorial_1st_gate_03_rift_knight",
    "tutorial_1st_gate_04_warden_intro",
    "tutorial_1st_gate_05_warden_appears",
    "tutorial_1st_gate_06_warden_20_clear",
  ]),
});

export const TUTORIAL_SELF_DESCRIBING_NEW_GAME_EVENT_FLOW = Object.freeze([
  "prologue_dream_01_falling_consciousness",
  "prologue_dream_02_profile_record",
  "prologue_dream_03_initial_stat_sync",
  "prologue_dream_04_abyss_questions_start",
  "prologue_result_{dispositionId}",
  "prologue_card_01_show_cards",
  "prologue_card_{starterCardId}",
  "prologue_transfer_to_tutorial",
  "tutorial_1st_shore_wake_after_dream",
  "tutorial_1st_shore_status_after_dream",
]);

export const TUTORIAL_SELF_DESCRIBING_REGRESSION_FLOW = Object.freeze({
  profileAndAbyssQuestionsRepeat: false,
  traitCardResyncRepeats: true,
  eventIds: Object.freeze([
    "regression_2nd_pre_shore_card_resync",
    "regression_3rd_pre_shore_card_resync",
    "regression_4th_pre_shore_card_resync",
    "tutorial_loop_common_pre_shore_card_resync",
  ]),
  loopStartRun: 5,
  loopVariantFormula: "(regressionCount - 5) % 4",
});

export const TUTORIAL_SELF_DESCRIBING_UNLOCK_STAGES = Object.freeze({
  beforeForgottenRemnant: Object.freeze({
    codex: false,
    scrapbook: false,
    regressorRecordName: false,
    allowedPanels: Object.freeze(["basicStatus", "systemHelp", "combatLog", "warning"]),
  }),
  afterForgottenRemnantRun1: Object.freeze({
    damagedRecord: true,
    codex: "damaged_partial",
    scrapbook: false,
    regressorRecordName: false,
  }),
  run2Plus: Object.freeze({
    codex: true,
    scrapbook: true,
    regressorRecordName: true,
  }),
});

export const TUTORIAL_DIALOGUE_PRE_REALITY_FORBIDDEN_TERM_KEYS = Object.freeze([
  "hunterAssociation",
  "hunterAssociationSpaced",
  "hunterRegistrationName",
  "hunterGrade",
  "guildAffiliation",
  "guildMaster",
  "hunterFreeBoard",
]);

export const TUTORIAL_FINAL_NEW_GAME_FLOW = Object.freeze([
  "system_sync_profile",
  "initial_stat_assignment",
  "abyss_questions",
  "starter_card_draw",
  "sync_complete_summon_tutorial",
  "tutorial_shore_start",
]);

export const TUTORIAL_FINAL_KEY_FLAGS = Object.freeze([
  "regressionCount",
  "hasCorruptedRecordTrait",
  "hasRegressorRecord",
  "hasSeenGoldenCardNews",
  "hasGoldenCard",
  "hasOpenedShoreCache",
  "hasFoundNorthRockHint",
  "hasOpenedGoldenCardSpace",
  "hasFoundMineSealedBoxHint",
  "hasOpenedMineSealedBox",
  "guardianPatternProgress",
  "tutorialBossBestDamageRate",
]);

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
  "tutorial_loop_5_plus",
]);

export const TUTORIAL_DIALOGUE_KEY_EVENTS = Object.freeze([
  {
    id: "tutorial_1st_shore_02_status_help",
    phase: "tutorial_shore_run1",
    run: 1,
    policy: "dynamic_status_recheck",
    textKey: "shoreStatusHelp",
  },
  {
    id: "tutorial_1st_shore_05_drift_slime_mana_variant",
    phase: "tutorial_shore_run1",
    run: 1,
    policy: "generic_weapon_sense",
    textKey: "driftSlimeManaVariant",
  },
  {
    id: "tutorial_1st_shore_06_nameless_scrap",
    phase: "tutorial_shore_run1",
    run: 1,
    policy: "first_run_material",
    textKey: "firstCodexRecord",
  },
  {
    id: "tutorial_1st_shore_07_buried_cache_hint",
    phase: "tutorial_shore_run1",
    run: 1,
    policy: "hint_only",
  },
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
    id: "tutorial_1st_ruins_02_mock_gate_node_map",
    phase: "broken_ruins_run1",
    run: 1,
    policy: "tutorial_node_map",
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
    id: "tutorial_1st_gate_04_warden_intro",
    phase: "rift_gate_run1",
    run: 1,
    policy: "damage_threshold_intro",
  },
  {
    id: "tutorial_1st_gate_06_warden_20_clear",
    phase: "rift_gate_run1",
    run: 1,
    policy: "damage_threshold_pass",
  },
  {
    id: "tutorial_2nd_01_regressor_record",
    phase: "tutorial_run2",
    run: 2,
    policy: "regressor_record_unlock",
  },
  {
    id: "tutorial_2nd_02_buried_cache_return",
    phase: "tutorial_run2",
    run: 2,
    policy: "record_compare_return",
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
    id: "tutorial_2nd_05_warden_50",
    phase: "tutorial_run2",
    run: 2,
    policy: "damage_threshold_good",
  },
  {
    id: "tutorial_3rd_warden_80",
    phase: "tutorial_run3_4",
    run: 3,
    policy: "damage_threshold_semi_ranker",
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

export const TUTORIAL_FINAL_STARTER_SKILL_ALIASES = Object.freeze({
  starter_weapon_sense: {
    packageSkillId: "power_slash",
    runtimeSkillId: "power_slash",
  },
  starter_light_step: {
    packageSkillId: "quick_step_basic",
    runtimeSkillId: "quick_step",
  },
  starter_enduring_body: {
    packageSkillId: "guard_stance",
    runtimeSkillId: "guard_stance",
  },
  starter_faint_mana: {
    packageSkillId: "mana_spark",
    runtimeSkillId: "mana_ignite",
  },
});

export const TUTORIAL_LOOP_START_RUN = 5;

export const TUTORIAL_LOOP_DIALOGUE_VARIANTS = Object.freeze([
  { id: "A_optimization", textKey: "optimization" },
  { id: "B_fatigue", textKey: "fatigue" },
  { id: "C_records", textKey: "records" },
  { id: "D_variables", textKey: "variables" },
]);

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

export function buildTutorialIntroDialogueLogs(profile, { localeText = getLocaleText(), templateValues = {} } = {}) {
  const text = localeText.story?.tutorialDialogue;
  if (!text?.introLog) return [];

  const disposition = resolveTutorialDispositionDialogue(profile, { localeText });
  const starterCard = resolveTutorialStarterCardDialogue(profile, { localeText });
  const messages = [];

  if (disposition?.log) {
    messages.push(
      formatText(text.introLog.disposition, {
        disposition: disposition.name,
        reaction: formatText(disposition.log, templateValues),
      }),
    );
  }

  if (starterCard?.log) {
    messages.push(
      formatText(text.introLog.starterCard, {
        cardName: starterCard.cardName,
        reaction: formatText(starterCard.log, templateValues),
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

export function resolveTutorialLoopDialogue(regressionCount, { scene = "wake", localeText = getLocaleText() } = {}) {
  const numericCount = Math.floor(Number(regressionCount));
  if (!Number.isFinite(numericCount) || numericCount < TUTORIAL_LOOP_START_RUN) return null;

  const index = (numericCount - TUTORIAL_LOOP_START_RUN) % TUTORIAL_LOOP_DIALOGUE_VARIANTS.length;
  const variant = TUTORIAL_LOOP_DIALOGUE_VARIANTS[index];
  const text = localeText.story?.tutorialDialogue?.loop5Plus?.[variant.textKey] || {};
  const lines = Array.isArray(text[scene]) ? text[scene] : [];
  return {
    index,
    id: variant.id,
    name: text.name || variant.id,
    scene,
    lines,
  };
}

export function resolveTutorialKeyEventDialogue(
  eventId,
  { localeText = getLocaleText(), templateValues = {} } = {},
) {
  const event = TUTORIAL_DIALOGUE_KEY_EVENTS.find((entry) => entry.id === eventId);
  if (!event?.textKey) return null;

  const detail = localeText.story?.tutorialDialogue?.keyEventDetails?.[event.textKey];
  if (!detail) return null;

  return {
    event,
    textKey: event.textKey,
    title: formatTextValue(detail.title, templateValues),
    detail: formatTextValue(detail, templateValues),
  };
}

export function renderTutorialDialogueTemplate(template, templateValues = {}) {
  return formatText(template, templateValues);
}

export function buildTutorialDialogueCoverageReport({ implementedEventIds = [] } = {}) {
  const implemented = new Set([
    ...TUTORIAL_DIALOGUE_KEY_EVENTS.map((event) => event.id),
    ...implementedEventIds,
  ]);

  return Object.entries(TUTORIAL_SELF_DESCRIBING_COVERAGE_REQUIRED).flatMap(([regionKey, eventIds]) =>
    eventIds.map((eventId) => ({
      regionKey,
      eventId,
      state: implemented.has(eventId) ? "wired" : "planned",
      isImplemented: implemented.has(eventId),
    })),
  );
}

export function getTutorialDialogueEventCatalog() {
  return {
    version: TUTORIAL_DIALOGUE_VERSION,
    selfDescribingVersion: TUTORIAL_SELF_DESCRIBING_VERSION,
    newGameFlow: TUTORIAL_FINAL_NEW_GAME_FLOW,
    phases: TUTORIAL_DIALOGUE_PHASES,
    dynamicPlaceholders: TUTORIAL_DIALOGUE_DYNAMIC_PLACEHOLDERS,
    preRealityForbiddenTermKeys: TUTORIAL_DIALOGUE_PRE_REALITY_FORBIDDEN_TERM_KEYS,
    keyFlags: TUTORIAL_FINAL_KEY_FLAGS,
    keyEvents: TUTORIAL_DIALOGUE_KEY_EVENTS,
    loopDialogue: {
      startRun: TUTORIAL_LOOP_START_RUN,
      variants: TUTORIAL_LOOP_DIALOGUE_VARIANTS,
    },
    starterSkillAliases: TUTORIAL_FINAL_STARTER_SKILL_ALIASES,
    selfDescribing: {
      version: TUTORIAL_SELF_DESCRIBING_VERSION,
      requiredSystems: TUTORIAL_SELF_DESCRIBING_REQUIRED_SYSTEMS,
      minimumStateKeys: TUTORIAL_SELF_DESCRIBING_MINIMUM_STATE_KEYS,
      coverageRequired: TUTORIAL_SELF_DESCRIBING_COVERAGE_REQUIRED,
      coverageReport: buildTutorialDialogueCoverageReport(),
      newGameEventFlow: TUTORIAL_SELF_DESCRIBING_NEW_GAME_EVENT_FLOW,
      regressionFlow: TUTORIAL_SELF_DESCRIBING_REGRESSION_FLOW,
      unlockStages: TUTORIAL_SELF_DESCRIBING_UNLOCK_STAGES,
    },
  };
}

function formatTextValue(value, templateValues) {
  if (typeof value === "string") return formatText(value, templateValues);
  if (Array.isArray(value)) return value.map((entry) => formatTextValue(entry, templateValues));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, formatTextValue(entry, templateValues)]),
    );
  }
  return value;
}



