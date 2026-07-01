export const FATE_CARD_VISUAL_DATA_VERSION = "fate-card-visual-v1";
export const FATE_CARD_VISUAL_FAMILY = "project_regressor_fate_tarot_v1";
export const FATE_CARD_BACK_IMAGE = "assets/cards/fate/backs/fate_card_back.png";
export const FATE_CARD_FLIP_BASE_SPRITE = "assets/cards/fate/reveal_base/fate_card_flip_base.png";
export const FATE_CARD_FLIP_FRAME_DATA = "assets/cards/fate/reveal_base/fate_card_flip_frames.json";
export const FATE_CARD_FINAL_REVEAL_FRAME = Object.freeze({
  name: "sprite8",
  fillMode: "match-reference-card-frame",
  referenceFrameName: "sprite1",
});

export const FATE_CARD_EFFECT_IDS = Object.freeze({
  bfx: Object.freeze({
    paleBlueAura: "card_bfx_aura_pale_blue_loop",
    blueAura: "card_bfx_aura_blue_loop",
    violetBlueAura: "card_bfx_aura_violet_blue_loop",
    purpleAura: "card_bfx_aura_purple_loop",
    orangeRedAura: "card_bfx_aura_orange_red_loop",
    goldAura: "card_bfx_aura_gold_loop",
    whiteGoldAura: "card_bfx_aura_white_gold_loop",
    blueWhiteAura: "card_bfx_aura_blue_white_loop",
  }),
  vfx: Object.freeze({
    flipFlash: "card_vfx_flip_flash",
    revealBurst: "card_vfx_reveal_burst",
    selectedPulse: "card_vfx_selected_pulse",
  }),
  sfx: Object.freeze({
    flip: "card_sfx_flip",
    reveal: "card_sfx_reveal",
    select: "card_sfx_select",
    goldReveal: "card_sfx_gold_reveal",
  }),
});

export const FATE_CARD_VISUALS = freezeRecord({
  mobility_step: visual(1, "mobility_step", "Swift Step", "blue", "card_bfx_aura_blue_loop"),
  mana_sensitivity: visual(2, "mana_sensitivity", "Magic Sense", "purple", "card_bfx_aura_purple_loop"),
  presence_suppression: visual(3, "presence_suppression", "Moon Veil", "violet_blue", "card_bfx_aura_violet_blue_loop"),
  survival_instinct: visual(4, "survival_instinct", "Iron Body", "pale_blue", "card_bfx_aura_pale_blue_loop"),
  regression_trace: visual(5, "regression_trace", "Regression Trace", "blue_white", "card_bfx_aura_blue_white_loop"),
  hidden_piece: visual(6, "hidden_piece", "Hidden Piece", "gold", "card_bfx_aura_gold_loop"),
  fate_compass: visual(7, "fate_compass", "Fate Compass", "gold", "card_bfx_aura_gold_loop"),
  nameless_record: visual(8, "nameless_record", "Nameless Record", "white_gold", "card_bfx_aura_white_gold_loop"),
  luck_variance: visual(9, "luck_variance", "Lucky Thread", "gold", "card_bfx_aura_gold_loop"),
  observation_insight: visual(10, "observation_insight", "Keen Sight", "violet_blue", "card_bfx_aura_violet_blue_loop"),
  weapon_sense: visual(11, "weapon_sense", "Blade Instinct", "blue", "card_bfx_aura_blue_loop"),
  focused_will: visual(12, "focused_will", "Stone Heart", "pale_blue", "card_bfx_aura_pale_blue_loop"),
  tracking_sense: visual(13, "tracking_sense", "Silent Hunter", "violet_blue", "card_bfx_aura_violet_blue_loop"),
  defense_stance: visual(14, "defense_stance", "Sacred Guard", "white_gold", "card_bfx_aura_white_gold_loop"),
  deep_resonance: visual(15, "deep_resonance", "Deep Resonance", "purple", "card_bfx_aura_purple_loop"),
  battle_instinct: visual(16, "battle_instinct", "Blood Surge", "purple", "card_bfx_aura_purple_loop"),
});

export const FATE_CARD_VISUAL_SLUG_BY_CARD_ID = freezeRecord({
  starter_weapon_sense: "weapon_sense",
  starter_light_step: "mobility_step",
  starter_enduring_body: "survival_instinct",
  starter_faint_mana: "mana_sensitivity",
  fate_guardian_shell: "defense_stance",
  fate_second_wind: "survival_instinct",
  fate_anchor_breath: "defense_stance",
  fate_threaded_footwork: "mobility_step",
  fate_spark_memory: "mana_sensitivity",
  fate_mana_thread: "mana_sensitivity",
  fate_rift_edge: "weapon_sense",
  fate_hunter_instinct: "tracking_sense",
  fate_still_water_mind: "focused_will",
  fate_lucky_variance: "luck_variance",
  fate_full_power_oath: "battle_instinct",
  fate_moon_veil_step: "presence_suppression",
  fate_mana_overflow: "deep_resonance",
  fate_blade_rehearsal: "weapon_sense",
  fate_berserker_loop: "battle_instinct",
  fate_record_compass: "fate_compass",
  fate_zero_hour_stride: "mobility_step",
  fate_record_reader: "observation_insight",
  fate_abyss_witness: "nameless_record",
  fate_return_key: "regression_trace",
  fate_worldline_suture: "regression_trace",
  fate_last_gate_key: "hidden_piece",
});

export function resolveFateCardVisualSlug(card = {}) {
  const directSlug = String(card.visualSlug || "").trim();
  if (directSlug && FATE_CARD_VISUALS[directSlug]) return directSlug;
  const mappedSlug = FATE_CARD_VISUAL_SLUG_BY_CARD_ID[card.id];
  if (mappedSlug) return mappedSlug;
  return inferVisualSlugFromCard(card);
}

export function resolveFateCardVisual(card = {}) {
  return FATE_CARD_VISUALS[resolveFateCardVisualSlug(card)] || null;
}

export function listFateCardVisuals() {
  return Object.values(FATE_CARD_VISUALS);
}

function visual(index, visualSlug, nameEn, auraKey, defaultBfx) {
  const padded = String(index).padStart(2, "0");
  return Object.freeze({
    index,
    visualSlug,
    assetId: `fate_card_front_${visualSlug}`,
    nameKey: `fateCardVisuals.items.${visualSlug}`,
    nameEn,
    frontImage: `assets/cards/fate/fronts/fate_front_${padded}_${visualSlug}.png`,
    revealSprite: `assets/cards/fate/reveal_sprites/fate_reveal_${padded}_${visualSlug}.png`,
    defaultBfx,
    auraKey,
    visualFamily: FATE_CARD_VISUAL_FAMILY,
  });
}

function inferVisualSlugFromCard(card = {}) {
  const text = [
    card.id,
    card.card,
    card.name,
    card.trait,
    card.traitName,
    card.skill,
    card.skillName,
    card.actionId,
    card.archetype,
  ].filter(Boolean).join(" ").toLowerCase();
  if (text.includes("step") || text.includes("stride") || text.includes("footwork") || text.includes("\uAE30\uB3D9") || text.includes("\uBC1C")) return "mobility_step";
  if (text.includes("mana") || text.includes("magic") || text.includes("\uB9C8\uB825")) return "mana_sensitivity";
  if (text.includes("track") || text.includes("hunter") || text.includes("\uCD94\uC801") || text.includes("\uC0AC\uB0E5")) return "tracking_sense";
  if (text.includes("shield") || text.includes("guard") || text.includes("\uBC29\uC5B4") || text.includes("\uC218\uD638")) return "defense_stance";
  if (text.includes("survival") || text.includes("enduring") || text.includes("\uC0DD\uC874") || text.includes("\uBC84\uD2F0")) return "survival_instinct";
  if (text.includes("weapon") || text.includes("blade") || text.includes("slash") || text.includes("\uBB34\uAE30") || text.includes("\uCE7C")) return "weapon_sense";
  if (text.includes("record") || text.includes("\uAE30\uB85D")) return "nameless_record";
  if (text.includes("fate") || text.includes("compass") || text.includes("\uC6B4\uBA85")) return "fate_compass";
  if (text.includes("regression") || text.includes("worldline") || text.includes("\uD68C\uADC0") || text.includes("\uC138\uACC4\uC120")) return "regression_trace";
  return "focused_will";
}

function freezeRecord(record) {
  return Object.freeze(Object.fromEntries(Object.entries(record).map(([key, value]) => [key, Object.freeze(value)])));
}
