import { formatText, getLocaleText } from "../localization/index.js?v=681";

export const TUTORIAL_DIALOGUE_VERSION = "v2.6.3_FINAL";

export const TUTORIAL_DIALOGUE_REQUIRED_PLACEHOLDERS = Object.freeze([
  "playerName",
  "age",
  "gender",
  "country",
  "profileImage",
  "statSummary",
  "statTotal",
  "statusGrade",
  "LUK",
  "dispositionName",
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
]);

export const TUTORIAL_DIALOGUE_DYNAMIC_PLACEHOLDERS = Object.freeze([
  ...TUTORIAL_DIALOGUE_REQUIRED_PLACEHOLDERS,
  "STR",
  "AGI",
  "VIT",
  "INT",
  "WIS",
  "savedTime",
  "clearTime",
  "timeDiff",
  "itemName",
  "count",
  "target",
  "remaining",
]);

export const TUTORIAL_DIALOGUE_FALLBACK_VALUE = "unknown";

export const TUTORIAL_DIALOGUE_PLACEHOLDER_FALLBACKS = Object.freeze(
  Object.fromEntries(
    TUTORIAL_DIALOGUE_DYNAMIC_PLACEHOLDERS.map((placeholder) => [placeholder, TUTORIAL_DIALOGUE_FALLBACK_VALUE]),
  ),
);

export const TUTORIAL_SELF_DESCRIBING_VERSION = "v2.9.1_CODEX_SELF_DESCRIBING";
export const TUTORIAL_PROTAGONIST_VOICE_POLISH_VERSION = "v2.9.4_FINAL_PROTAGONIST_VOICE_POLISH";

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

export const TUTORIAL_BOSS_EVALUATION_DISCLOSURE = Object.freeze({
  beforeBattle: "hideExactThresholds",
  duringBattle: "showMinimumConditionOnlyWhenReached",
  afterClear: Object.freeze([
    Object.freeze({ thresholdPercent: 20, label: "C\uAE09 \uD3C9\uAC00" }),
    Object.freeze({ thresholdPercent: 50, label: "B\uAE09 \uD3C9\uAC00" }),
    Object.freeze({ thresholdPercent: 80, label: "A\uAE09 \uD3C9\uAC00" }),
    Object.freeze({ thresholdPercent: 100, label: "S\uAE09 \uD3C9\uAC00" }),
  ]),
});

export const TUTORIAL_HELP_POPUP_EVENT_IDS = Object.freeze([
  "tutorial_1st_mine_01_entry",
  "tutorial_1st_gate_04_warden_intro",
]);

export const TUTORIAL_EVALUATION_GRADE_RULES = Object.freeze({
  scope: "tutorial_only_private_grade",
  separateFromHunterAssociationRank: true,
  thresholds: Object.freeze({
    "20_percent_or_more": "C\uAE09",
    "50_percent_or_more": "B\uAE09",
    "80_percent_or_more": "A\uAE09",
    "100_percent": "S\uAE09",
  }),
  visibility: "player_only",
});

export const TUTORIAL_PROTAGONIST_VOICE_RULES = Object.freeze({
  avoid: Object.freeze(["~\uAD70", "~\uB2E4", "~\uAC83\uC774\uB2E4", "\uCD08\uAE30\uAC12", "\uB3C4\uAD6C\uC57C", "\uD6C4\uBCF4\uB97C \uBC14\uAFD4", "\uC555\uCD95\uD558\uACE0", "\uD504\uB9AC\uC14B \uACE0\uC815 \uD655\uC778"]),
  prefer: Object.freeze(["~\uC774\uC57C", "~\uD588\uC5B4", "~\uD558\uC790", "~\uD574\uBCF4\uC790", "~\uD558\uACE0 \uC788\uC5B4", "~\uBCF4\uC774\uAE30 \uC2DC\uC791\uD588\uC5B4", "~\uACA0\uC9C0"]),
  systemTerminologySpeakers: Object.freeze(["\uC2DC\uC2A4\uD15C", "\uD68C\uADC0\uC790\uC758 \uAE30\uB85D", "\uB3C4\uAC10", "\uC2A4\uD06C\uB7A9\uBD81"]),
  protagonistRole: "\uC2DC\uC2A4\uD15C \uC6A9\uC5B4\uB97C \uC790\uC5F0\uC2A4\uB7FD\uAC8C \uBC1B\uC544\uB4E4\uC774\uB294 \uC0AC\uB78C \uB9D0\uD22C",
});

export const TUTORIAL_PROTAGONIST_VOICE_CORRECTIONS = Object.freeze([
  Object.freeze({ from: "\uC9C4\uC9DC \uD604\uC2E4\uB85C \uB3CC\uC544\uC628 \uAC70\uC57C…….", to: "\uC815\uB9D0 \uD604\uC2E4\uB85C \uB3CC\uC544\uC628 \uAC70\uC57C……." }),
  Object.freeze({ from: "\uB098\uBCF4\uB2E4 \uBA3C\uC800 \uB3CC\uC544\uC628 \uC0AC\uB78C\uB4E4\uC774 \uC788\uC5C8\uB358 \uAC70\uC57C?", to: "\uB098\uBCF4\uB2E4 \uBA3C\uC800 \uB3CC\uC544\uC628 \uC0AC\uB78C\uB4E4\uC774 \uC788\uC5C8\uB2E4\uB2C8." }),
  Object.freeze({ from: "\uC774\uC81C \uC774\uB7F0 \uCC28\uC774\uB97C \uD558\uB098\uC529 \uC313\uC544\uAC00\uB294 \uAC70\uC57C.", to: "\uC774\uC81C\uBD80\uD130 \uC774\uB7F0 \uCC28\uC774\uB97C \uD558\uB098\uC529 \uC313\uC544\uAC00\uB294 \uAC70\uC57C." }),
  Object.freeze({ from: "\uC774\uAC74 \uCE74\uB4DC \uC120\uD0DD\uC9C0\uAC00 \uC544\uB2C8\uB77C, \uC774 \uC12C\uC5D0 \uC228\uACA8\uC838 \uC788\uB358 \uBCF4\uC0C1\uC774\uC57C.", to: "\uC774\uAC74 \uCC98\uC74C \uC120\uD0DD\uD588\uB358 \uD2B9\uC131 \uCE74\uB4DC\uAC00 \uC544\uB2C8\uB77C, \uC774 \uC12C\uC5D0 \uC228\uACA8\uC838 \uC788\uB358 \uBCF4\uC0C1\uC774\uC57C." }),
  Object.freeze({ from: "\uC774\uC81C \uC774\uACF3\uC744 \uBCF4\uACE0 \uB180\uB77C\uC9C4 \uC54A\uC544.", to: "\uC774\uC81C \uC774\uACF3\uC758 \uD48D\uACBD\uB3C4 \uC775\uC219\uD574\uC9C0\uACE0 \uC788\uC5B4." }),
  Object.freeze({ from: "\uD558\uC9C0\uB9CC \uC775\uC219\uD574\uC84C\uB2E4\uACE0 \uAC00\uBCBC\uC6CC\uC9C0\uB294 \uAC74 \uC544\uB2C8\uC57C.", to: "\uD558\uC9C0\uB9CC \uC775\uC219\uD574\uC84C\uB2E4\uACE0 \uC808\uB300 \uBC29\uC2EC\uD574\uC120 \uC548 \uB418\uACA0\uC9C0." }),
  Object.freeze({ from: "\uD558\uC9C0\uB9CC \uC9C0\uAE08\uC740 \uCE74\uB974\uB9C8\uC640 \uAE30\uB85D\uC774 \uD6C4\uBCF4\uB97C \uBC14\uAFD4.", to: "\uD558\uC9C0\uB9CC \uC9C0\uAE08\uC740 \uCE74\uB974\uB9C8\uC640 \uAE30\uB85D\uC774 \uC601\uD5A5\uC744 \uB07C\uCE58\uACE0 \uC788\uC5B4." }),
  Object.freeze({ from: "\uCC98\uC74C\uC5D4 \uBCF4\uC774\uC9C0 \uC54A\uC558\uB358 \uD2C8\uC774 \uBCF4\uC5EC.", to: "\uCC98\uC74C\uC5D4 \uBCF4\uC774\uC9C0 \uC54A\uC558\uB358 \uD2C8\uC774 \uBCF4\uC774\uACE0 \uC788\uC5B4." }),
  Object.freeze({ from: "\uC544\uC9C1 \uC4F0\uB7EC\uB728\uB9AC\uC9C4 \uBABB\uD588\uC5B4.", to: "\uC544\uC9C1 \uC4F0\uB7EC\uB728\uB9AC\uC9C4 \uBABB\uD588\uC9C0\uB9CC." }),
  Object.freeze({ from: "\uD558\uC9C0\uB9CC \uBCBD\uC758 \uB192\uC774\uB294 \uC774\uC81C \uBCF4\uC5EC.", to: "\uC774\uC81C \uBCBD\uC758 \uB192\uC774\uAC00 \uBCF4\uC774\uAE30 \uC2DC\uC791\uD588\uC5B4." }),
  Object.freeze({ from: "\uC774\uC81C \uD29C\uD1A0\uB9AC\uC5BC\uC740 \uC644\uC804\uD788 \uB0AF\uC120 \uACF3\uC740 \uC544\uB2C8\uC57C.", to: "\uC774\uC81C \uD29C\uD1A0\uB9AC\uC5BC\uB3C4 \uB0AF\uC124\uC9C0 \uC54A\uB124." }),
  Object.freeze({ from: "\uD558\uC9C0\uB9CC \uCE74\uB4DC\uB294 \uB2E4\uC2DC \uD3BC\uCCD0\uC838.", to: "\uD558\uC9C0\uB9CC \uCE74\uB4DC\uB294 \uB2E4\uC2DC \uC120\uD0DD\uD560 \uC218 \uC788\uC5B4." }),
  Object.freeze({ from: "\uD68C\uADC0\uD560\uC218\uB85D \uB0B4\uAC00 \uAC00\uC838\uAC08 \uCD9C\uBC1C\uC810\uB3C4 \uB2EC\uB77C\uC838.", to: "\uD68C\uADC0\uD560\uC218\uB85D \uB098\uC758 \uCD9C\uBC1C\uC120\uB3C4 \uB2EC\uB77C\uC9C0\uACE0 \uC788\uC5B4." }),
  Object.freeze({ from: "\uADF8\uB798\uC11C \uB354 \uC808\uCC28\uB300\uB85C \uAC00\uC790.", to: "\uADF8\uB7EC\uB2C8\uAE4C \uC11C\uB450\uB974\uC9C0 \uB9D0\uACE0 \uC21C\uC11C\uB300\uB85C \uC9C4\uD589\uD558\uC790." }),
  Object.freeze({ from: "\uCC98\uC74C\uC758 \uAFC8\uC740 \uBB38\uC774\uC5C8\uC5B4.", to: "\uCC98\uC74C\uC5D0\uB294 \uB098\uD55C\uD14C \uBB34\uC2A8 \uC77C\uC774 \uC77C\uC5B4\uB09C \uAC74\uC9C0 \uBAB0\uB790\uC9C0\uB9CC." }),
  Object.freeze({ from: "\uC774\uC81C \uCE74\uB4DC\uC640 \uAE30\uB85D\uC740 \uB9E4 \uD68C\uCC28\uC758 \uCD08\uAE30\uAC12\uC744 \uC870\uC815\uD558\uB294 \uB3C4\uAD6C\uC57C.", to: "\uC774\uC81C\uB294 \uCE74\uB4DC \uC120\uD0DD\uACFC \uAE30\uB85D\uC774 \uC2DC\uC791\uC744 \uC704\uD55C \uC900\uBE44 \uACFC\uC815\uC774\uB780 \uAC78 \uC54C\uACA0\uC5B4." }),
  Object.freeze({ from: "\uADF8\uB7FC \uD29C\uD1A0\uB9AC\uC5BC\uC740 \uBE60\uB974\uAC8C \uC555\uCD95\uD558\uACE0, \uD604\uC2E4 \uC815\uBCF4\uB9DD\uC744 \uD655\uC778\uD558\uC790.", to: "\uADF8\uB7FC \uC774\uC81C \uD29C\uD1A0\uB9AC\uC5BC\uC740 \uBE60\uB974\uAC8C \uC9C4\uD589\uD558\uACE0 \uBC14\uB85C \uD604\uC2E4\uB85C \uB3CC\uC544\uAC00\uC790." }),
  Object.freeze({ from: "\uCE74\uB4DC \uD6C4\uBCF4\uB294 \uC870\uAE08\uC529 \uB2EC\uB77C\uC9C0\uACE0, \uB4DC\uB78D\uB3C4 \uD754\uB4E4\uB824.", to: "\uCE74\uB4DC\uB4E4\uB3C4 \uB2E4\uC591\uD574\uC9C0\uACE0 \uCE74\uB4DC \uB4F1\uAE09\uB4E4\uB3C4 \uBCC0\uD654\uD558\uACE0 \uC788\uC5B4." }),
]);

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

export const TUTORIAL_DIALOGUE_SPEAKER_TYPES = Object.freeze([
  "system",
  "protagonist",
  "narration",
  "unknownVoice",
  "regressorRecord",
  "codex",
  "scrapbook",
]);

export const TUTORIAL_DIALOGUE_NEW_GAME_EVENT_BLOCKS = Object.freeze([
  {
    id: "prologue_dream_01_falling_consciousness",
    phase: "system_initialization",
    run: 1,
    policy: "dream_prologue",
    speakerType: "unknownVoice",
    textKey: "prologueFallingConsciousness",
  },
  {
    id: "prologue_dream_02_profile_record",
    phase: "system_initialization",
    run: 1,
    policy: "profile_record",
    speakerType: "system",
    textKey: "prologueProfileRecord",
  },
  {
    id: "prologue_dream_03_initial_stat_sync",
    phase: "system_initialization",
    run: 1,
    policy: "initial_stat_sync",
    speakerType: "system",
    textKey: "prologueInitialStatSync",
  },
  {
    id: "prologue_dream_04_abyss_questions_start",
    phase: "system_initialization",
    run: 1,
    policy: "abyss_questions_start",
    speakerType: "unknownVoice",
    textKey: "prologueAbyssQuestionsStart",
  },
  {
    id: "prologue_card_01_show_cards",
    phase: "starter_card_selection",
    run: 1,
    policy: "starter_card_candidates",
    speakerType: "system",
    textKey: "prologueCardShowCards",
  },
  {
    id: "prologue_transfer_to_tutorial",
    phase: "starter_card_selection",
    run: 1,
    policy: "tutorial_transfer",
    speakerType: "system",
    textKey: "prologueTransferToTutorial",
  },
  {
    id: "tutorial_1st_shore_wake_after_dream",
    phase: "tutorial_shore_run1",
    run: 1,
    policy: "wake_after_dream",
    speakerType: "protagonist",
    textKey: "shoreWakeAfterDream",
  },
  {
    id: "tutorial_1st_shore_status_after_dream",
    phase: "tutorial_shore_run1",
    run: 1,
    policy: "status_after_dream",
    speakerType: "system",
    textKey: "shoreStatusAfterDream",
  },
]);

export const TUTORIAL_DIALOGUE_KEY_EVENTS = Object.freeze([
  ...TUTORIAL_DIALOGUE_NEW_GAME_EVENT_BLOCKS,
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
    id: "tutorial_1st_mine_01_entry",
    phase: "mana_mine_run1",
    run: 1,
    policy: "tutorial_help_popup",
    textKey: "mineEnvironmentalRisk",
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
    textKey: "gateWardenIntro",
  },
  {
    id: "tutorial_1st_gate_06_warden_20_clear",
    phase: "rift_gate_run1",
    run: 1,
    policy: "damage_threshold_pass",
    textKey: "wardenMinimumPass",
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
    textKey: "wardenGoodPass",
  },
  {
    id: "tutorial_3rd_warden_80",
    phase: "tutorial_run3_4",
    run: 3,
    policy: "damage_threshold_semi_ranker",
    textKey: "wardenSemiRanker",
  },
  {
    id: "tutorial_4th_warden_100",
    phase: "tutorial_run3_4",
    run: 4,
    policy: "final_warden_clear",
    textKey: "wardenFullClear",
  },
]);

export const TUTORIAL_DIALOGUE_EVENT_ALIASES = Object.freeze({
  tutorial_2nd_01_wake_record_restored: "tutorial_2nd_01_regressor_record",
});

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
  const safeTemplateValues = createTutorialDialogueTemplateValues(templateValues, { localeText });
  const messages = [];

  if (disposition?.log) {
    messages.push(
      formatTutorialText(text.introLog.disposition, {
        disposition: disposition.name,
        reaction: formatTutorialText(disposition.log, safeTemplateValues, { localeText }),
      }, { localeText }),
    );
  }

  if (starterCard?.log) {
    messages.push(
      formatTutorialText(text.introLog.starterCard, {
        cardName: starterCard.cardName,
        reaction: formatTutorialText(starterCard.log, safeTemplateValues, { localeText }),
      }, { localeText }),
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

export function resolveTutorialDialogueEventId(eventId) {
  return TUTORIAL_DIALOGUE_EVENT_ALIASES[eventId] || eventId;
}

export function resolveTutorialKeyEventDialogue(
  eventId,
  { localeText = getLocaleText(), templateValues = {} } = {},
) {
  const canonicalEventId = resolveTutorialDialogueEventId(eventId);
  const event = TUTORIAL_DIALOGUE_KEY_EVENTS.find((entry) => entry.id === canonicalEventId);
  if (!event?.textKey) return null;

  const detail = localeText.story?.tutorialDialogue?.keyEventDetails?.[event.textKey];
  if (!detail) return null;

  return {
    event,
    eventId,
    canonicalEventId,
    aliasOf: canonicalEventId !== eventId ? canonicalEventId : null,
    textKey: event.textKey,
    speakerType: event.speakerType || "system",
    title: formatTextValue(detail.title, templateValues, { localeText }),
    detail: formatTextValue(detail, templateValues, { localeText }),
  };
}

export function renderTutorialDialogueTemplate(template, templateValues = {}, options = {}) {
  return formatTutorialText(template, templateValues, options);
}

export function createTutorialDialogueTemplateValues(templateValues = {}, { localeText = getLocaleText(), fallbackValue } = {}) {
  const source = templateValues && typeof templateValues === "object" ? templateValues : {};
  const resolvedFallbackValue = resolveTutorialDialogueFallbackValue({ localeText, fallbackValue });
  const safeValues = Object.fromEntries(
    TUTORIAL_DIALOGUE_DYNAMIC_PLACEHOLDERS.map((placeholder) => [placeholder, resolvedFallbackValue]),
  );

  for (const [key, value] of Object.entries(source)) {
    safeValues[key] = normalizeTutorialTemplateValue(value, resolvedFallbackValue);
  }

  return safeValues;
}

export function buildTutorialDialogueCoverageReport({ implementedEventIds = [] } = {}) {
  const implemented = new Set([
    ...TUTORIAL_DIALOGUE_KEY_EVENTS.map((event) => event.id),
    ...implementedEventIds,
  ]);
  for (const [aliasId, canonicalEventId] of Object.entries(TUTORIAL_DIALOGUE_EVENT_ALIASES)) {
    if (implemented.has(canonicalEventId)) implemented.add(aliasId);
  }

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
    protagonistVoicePolishVersion: TUTORIAL_PROTAGONIST_VOICE_POLISH_VERSION,
    newGameFlow: TUTORIAL_FINAL_NEW_GAME_FLOW,
    phases: TUTORIAL_DIALOGUE_PHASES,
    speakerTypes: TUTORIAL_DIALOGUE_SPEAKER_TYPES,
    requiredPlaceholders: TUTORIAL_DIALOGUE_REQUIRED_PLACEHOLDERS,
    dynamicPlaceholders: TUTORIAL_DIALOGUE_DYNAMIC_PLACEHOLDERS,
    placeholderFallbackValue: TUTORIAL_DIALOGUE_FALLBACK_VALUE,
    placeholderFallbacks: TUTORIAL_DIALOGUE_PLACEHOLDER_FALLBACKS,
    preRealityForbiddenTermKeys: TUTORIAL_DIALOGUE_PRE_REALITY_FORBIDDEN_TERM_KEYS,
    keyFlags: TUTORIAL_FINAL_KEY_FLAGS,
    keyEvents: TUTORIAL_DIALOGUE_KEY_EVENTS,
    newGameEventBlocks: TUTORIAL_DIALOGUE_NEW_GAME_EVENT_BLOCKS,
    eventAliases: TUTORIAL_DIALOGUE_EVENT_ALIASES,
    loopDialogue: {
      startRun: TUTORIAL_LOOP_START_RUN,
      variants: TUTORIAL_LOOP_DIALOGUE_VARIANTS,
    },
    starterSkillAliases: TUTORIAL_FINAL_STARTER_SKILL_ALIASES,
    protagonistVoicePolish: {
      version: TUTORIAL_PROTAGONIST_VOICE_POLISH_VERSION,
      rules: TUTORIAL_PROTAGONIST_VOICE_RULES,
      corrections: TUTORIAL_PROTAGONIST_VOICE_CORRECTIONS,
      bossEvaluationDisclosure: TUTORIAL_BOSS_EVALUATION_DISCLOSURE,
      tutorialHelpPopupEventIds: TUTORIAL_HELP_POPUP_EVENT_IDS,
      tutorialEvaluationGrade: TUTORIAL_EVALUATION_GRADE_RULES,
    },
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

function formatTextValue(value, templateValues, options = {}) {
  if (typeof value === "string") return formatTutorialText(value, templateValues, options);
  if (Array.isArray(value)) return value.map((entry) => formatTextValue(entry, templateValues, options));
  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value).map(([key, entry]) => [key, formatTextValue(entry, templateValues, options)]),
    );
  }
  return value;
}

function formatTutorialText(template, templateValues = {}, options = {}) {
  const fallbackValue = resolveTutorialDialogueFallbackValue(options);
  const safeValues = createTutorialDialogueTemplateValues(templateValues, {
    ...options,
    fallbackValue,
  });
  const rendered = formatText(template, safeValues);
  return replaceUnresolvedTutorialPlaceholders(rendered, fallbackValue);
}

function normalizeTutorialTemplateValue(value, fallbackValue) {
  if (value === null || value === undefined) return fallbackValue;
  if (typeof value === "string" && value.trim() === "") return fallbackValue;
  return value;
}

function replaceUnresolvedTutorialPlaceholders(text, fallbackValue) {
  return String(text)
    .replace(/\{\{(\w+)\}\}/g, fallbackValue)
    .replace(/\{(\w+)\}/g, fallbackValue);
}

function resolveTutorialDialogueFallbackValue({ localeText = getLocaleText(), fallbackValue } = {}) {
  if (typeof fallbackValue === "string" && fallbackValue.trim()) return fallbackValue;
  const localizedFallback = localeText?.story?.tutorialDialogue?.rules?.placeholderFallback;
  if (typeof localizedFallback === "string" && localizedFallback.trim()) return localizedFallback;
  return TUTORIAL_DIALOGUE_FALLBACK_VALUE;
}
