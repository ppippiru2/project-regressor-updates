export const FATE_CARD_POOL_DATA_VERSION = "fate-card-pool-v2";

export const REGRESSION_FATE_CARD_POOL_DATA = Object.freeze([
  fateCard("fate_guardian_shell", "B", "survival", "preserve", "mid-regression", "defense_stance"),
  fateCard("fate_second_wind", "B", "mobility", "emergency_recovery", "mid-regression", "survival_instinct"),
  fateCard("fate_anchor_breath", "B", "survival", "guard_stance", "mid-regression", "defense_stance"),
  fateCard("fate_threaded_footwork", "B", "mobility", "quick_step", "mid-regression", "mobility_step"),
  fateCard("fate_spark_memory", "B", "magic", "mana_ignite", "mid-regression", "mana_sensitivity"),
  fateCard("fate_mana_thread", "A", "magic", "mana_bolt", "mid-regression", "mana_sensitivity"),
  fateCard("fate_rift_edge", "A", "attack", "power_slash", "mid-regression", "weapon_sense"),
  fateCard("fate_hunter_instinct", "A", "attack", "quick_step", "mid-regression", "tracking_sense"),
  fateCard("fate_still_water_mind", "A", "utility", "emergency_recovery", "mid-regression", "focused_will"),
  fateCard("fate_lucky_variance", "A", "utility", "emergency_recovery", "mid-regression", "luck_variance"),
  fateCard("fate_full_power_oath", "S", "attack", "full_power", "high-karma", "battle_instinct"),
  fateCard("fate_moon_veil_step", "S", "mobility", "quick_step", "high-karma", "presence_suppression"),
  fateCard("fate_mana_overflow", "S", "magic", "mana_ignite", "high-karma", "deep_resonance"),
  fateCard("fate_blade_rehearsal", "S", "attack", "power_slash", "high-karma", "weapon_sense"),
  fateCard("fate_berserker_loop", "SS", "attack", "rampage", "high-risk", "battle_instinct"),
  fateCard("fate_record_compass", "SS", "record", "preserve", "record-insight", "fate_compass"),
  fateCard("fate_zero_hour_stride", "SS", "mobility", "quick_step", "high-karma", "mobility_step"),
  fateCard("fate_record_reader", "SSS", "record", "preserve", "record-insight", "observation_insight"),
  fateCard("fate_abyss_witness", "SSS", "record", "mana_bolt", "record-insight", "nameless_record"),
  fateCard("fate_return_key", "EX", "record", "full_power", "rare-loop", "regression_trace"),
  fateCard("fate_worldline_suture", "EX", "utility", "emergency_recovery", "rare-loop", "regression_trace"),
  fateCard("fate_last_gate_key", "EX", "record", "full_power", "rare-loop", "hidden_piece"),
]);

function fateCard(id, grade, archetype, actionId, tier, visualSlug) {
  return Object.freeze({
    id,
    grade,
    rarity: grade,
    archetype,
    actionId,
    tier,
    visualSlug,
    unlock: "regression_resync",
  });
}
