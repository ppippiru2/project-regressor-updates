export const PROLOGUE_STATIC_DIALOGUE_EVENT_IDS = Object.freeze([
  "prologue_dream_01_falling_consciousness",
  "prologue_dream_02_profile_record",
  "prologue_dream_03_initial_stat_sync",
  "prologue_dream_04_abyss_questions_start",
  "prologue_card_01_show_cards",
  "prologue_transfer_to_tutorial",
  "tutorial_1st_shore_wake_after_dream",
  "tutorial_1st_shore_status_after_dream",
]);

export const PROLOGUE_DISPOSITION_EVENT_IDS = Object.freeze([
  "prologue_result_devotedOrder",
  "prologue_result_practicalBalance",
  "prologue_result_coldCalculation",
  "prologue_result_freeSurvival",
  "prologue_result_inquiryRecord",
]);

export const PROLOGUE_STARTER_CARD_EVENT_IDS = Object.freeze([
  "prologue_card_starter_weapon_sense",
  "prologue_card_starter_light_step",
  "prologue_card_starter_enduring_body",
  "prologue_card_starter_faint_mana",
]);

export const PROLOGUE_DIALOGUE_EVENT_IDS = Object.freeze([
  ...PROLOGUE_STATIC_DIALOGUE_EVENT_IDS,
  ...PROLOGUE_DISPOSITION_EVENT_IDS,
  ...PROLOGUE_STARTER_CARD_EVENT_IDS,
]);
