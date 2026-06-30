export const FATE_CARD_POOL_DATA_VERSION = "fate-card-pool-v2";

export const REGRESSION_FATE_CARD_POOL_DATA = Object.freeze([
  fateCard("fate_guardian_shell", "B", "survival", "preserve", "mid-regression"),
  fateCard("fate_second_wind", "B", "mobility", "emergency_recovery", "mid-regression"),
  fateCard("fate_anchor_breath", "B", "survival", "guard_stance", "mid-regression"),
  fateCard("fate_threaded_footwork", "B", "mobility", "quick_step", "mid-regression"),
  fateCard("fate_spark_memory", "B", "magic", "mana_ignite", "mid-regression"),
  fateCard("fate_mana_thread", "A", "magic", "mana_bolt", "mid-regression"),
  fateCard("fate_rift_edge", "A", "attack", "power_slash", "mid-regression"),
  fateCard("fate_hunter_instinct", "A", "attack", "quick_step", "mid-regression"),
  fateCard("fate_still_water_mind", "A", "utility", "emergency_recovery", "mid-regression"),
  fateCard("fate_full_power_oath", "S", "attack", "full_power", "high-karma"),
  fateCard("fate_mana_overflow", "S", "magic", "mana_ignite", "high-karma"),
  fateCard("fate_blade_rehearsal", "S", "attack", "power_slash", "high-karma"),
  fateCard("fate_berserker_loop", "SS", "attack", "rampage", "high-risk"),
  fateCard("fate_record_compass", "SS", "record", "preserve", "record-insight"),
  fateCard("fate_zero_hour_stride", "SS", "mobility", "quick_step", "high-karma"),
  fateCard("fate_record_reader", "SSS", "record", "preserve", "record-insight"),
  fateCard("fate_abyss_witness", "SSS", "record", "mana_bolt", "record-insight"),
  fateCard("fate_return_key", "EX", "record", "full_power", "rare-loop"),
  fateCard("fate_worldline_suture", "EX", "utility", "emergency_recovery", "rare-loop"),
  fateCard("fate_last_gate_key", "EX", "record", "full_power", "rare-loop"),
]);

function fateCard(id, grade, archetype, actionId, tier) {
  return Object.freeze({
    id,
    grade,
    rarity: grade,
    archetype,
    actionId,
    tier,
    unlock: "regression_resync",
  });
}
