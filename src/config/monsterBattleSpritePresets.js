const DEFAULT_MONSTER_BATTLE_SPRITE_PRESET = Object.freeze({
  monsterId: "default",
  classId: "enemy_default",
  motionProfile: "default_enemy_runtime",
  sfxProfile: "impact_near",
  defaultScale: 0.98,
  offsetX: 0,
  offsetY: 0,
  pivotX: 0.5,
  pivotY: 1,
  motionSafeMargin: { x: 0.08, y: 0.08 },
  effectPlacement: {
    offsetX: 0,
    offsetY: 0,
    textOffsetY: 0,
    slashWidth: 136,
    slashHeight: "clamp(3.2rem, 28vw, 6.25rem)",
    expandedSlashWidth: 260,
    expandedSlashHeight: "clamp(4.2rem, 34vw, 7.8rem)",
  },
});

const MONSTER_EFFECT_PLACEMENTS_BY_SFX = Object.freeze({
  short_claw: {
    offsetX: -3,
    offsetY: -9,
    textOffsetY: -5,
    slashWidth: 118,
    slashHeight: "clamp(2.4rem, 22vw, 4.8rem)",
    expandedSlashWidth: 218,
    expandedSlashHeight: "clamp(3.4rem, 30vw, 6.7rem)",
  },
  bite_swipe: {
    offsetX: 2,
    offsetY: -3,
    textOffsetY: -2,
    slashWidth: 148,
    slashHeight: "clamp(2.8rem, 25vw, 5.7rem)",
    expandedSlashWidth: 276,
    expandedSlashHeight: "clamp(3.9rem, 34vw, 7.6rem)",
  },
  stone_impact: {
    offsetX: 0,
    offsetY: 4,
    textOffsetY: 2,
    slashWidth: 132,
    slashHeight: "clamp(3.4rem, 29vw, 6.4rem)",
    expandedSlashWidth: 242,
    expandedSlashHeight: "clamp(4.6rem, 38vw, 8.6rem)",
  },
  heavy_impact: {
    offsetX: 0,
    offsetY: 7,
    textOffsetY: 4,
    slashWidth: 164,
    slashHeight: "clamp(4.2rem, 35vw, 7.6rem)",
    expandedSlashWidth: 308,
    expandedSlashHeight: "clamp(5.4rem, 45vw, 10rem)",
  },
  dark_slash: {
    offsetX: 3,
    offsetY: -6,
    textOffsetY: -3,
    slashWidth: 156,
    slashHeight: "clamp(3.6rem, 30vw, 6.9rem)",
    expandedSlashWidth: 292,
    expandedSlashHeight: "clamp(4.8rem, 40vw, 9.2rem)",
  },
  dark_burst: {
    offsetX: 0,
    offsetY: -1,
    textOffsetY: 0,
    slashWidth: 184,
    slashHeight: "clamp(4.6rem, 38vw, 8.4rem)",
    expandedSlashWidth: 336,
    expandedSlashHeight: "clamp(5.8rem, 49vw, 10.8rem)",
  },
  impact_near: {
    offsetX: 0,
    offsetY: 0,
    textOffsetY: 0,
    slashWidth: 136,
    slashHeight: "clamp(3.2rem, 28vw, 6.25rem)",
    expandedSlashWidth: 260,
    expandedSlashHeight: "clamp(4.2rem, 34vw, 7.8rem)",
  },
});

export const MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE = Object.freeze({
  default_enemy_runtime: MONSTER_EFFECT_PLACEMENTS_BY_SFX.impact_near,
  small_fiend_runtime: {
    offsetX: -4,
    offsetY: -11,
    textOffsetY: -6,
    slashWidth: 112,
    slashHeight: "clamp(2.35rem, 21vw, 4.55rem)",
    expandedSlashWidth: 208,
    expandedSlashHeight: "clamp(3.3rem, 29vw, 6.45rem)",
  },
  slime_drift_runtime: {
    offsetX: -2,
    offsetY: -6,
    textOffsetY: -3,
    slashWidth: 126,
    slashHeight: "clamp(2.75rem, 24vw, 5.35rem)",
    expandedSlashWidth: 232,
    expandedSlashHeight: "clamp(3.7rem, 32vw, 7.05rem)",
  },
  beast_lunge_runtime: {
    offsetX: 4,
    offsetY: -4,
    textOffsetY: -3,
    slashWidth: 152,
    slashHeight: "clamp(2.75rem, 25vw, 5.75rem)",
    expandedSlashWidth: 284,
    expandedSlashHeight: "clamp(3.9rem, 35vw, 7.7rem)",
  },
  alpha_beast_runtime: {
    offsetX: 6,
    offsetY: -8,
    textOffsetY: -4,
    slashWidth: 168,
    slashHeight: "clamp(3.05rem, 28vw, 6.15rem)",
    expandedSlashWidth: 312,
    expandedSlashHeight: "clamp(4.2rem, 38vw, 8.2rem)",
  },
  construct_slam_runtime: {
    offsetX: 0,
    offsetY: 5,
    textOffsetY: 2,
    slashWidth: 136,
    slashHeight: "clamp(3.45rem, 30vw, 6.55rem)",
    expandedSlashWidth: 250,
    expandedSlashHeight: "clamp(4.7rem, 39vw, 8.7rem)",
  },
  rune_construct_runtime: {
    offsetX: 1,
    offsetY: 1,
    textOffsetY: 0,
    slashWidth: 144,
    slashHeight: "clamp(3.35rem, 30vw, 6.35rem)",
    expandedSlashWidth: 268,
    expandedSlashHeight: "clamp(4.55rem, 38vw, 8.35rem)",
  },
  heavy_golem_runtime: {
    offsetX: 0,
    offsetY: 8,
    textOffsetY: 5,
    slashWidth: 168,
    slashHeight: "clamp(4.25rem, 36vw, 7.75rem)",
    expandedSlashWidth: 316,
    expandedSlashHeight: "clamp(5.5rem, 46vw, 10.1rem)",
  },
  core_golem_runtime: {
    offsetX: 1,
    offsetY: 4,
    textOffsetY: 2,
    slashWidth: 178,
    slashHeight: "clamp(4.45rem, 38vw, 8rem)",
    expandedSlashWidth: 328,
    expandedSlashHeight: "clamp(5.75rem, 48vw, 10.45rem)",
  },
  rift_squire_runtime: {
    offsetX: 6,
    offsetY: -5,
    textOffsetY: -3,
    slashWidth: 154,
    slashHeight: "clamp(3.55rem, 30vw, 6.75rem)",
    expandedSlashWidth: 292,
    expandedSlashHeight: "clamp(4.7rem, 39vw, 8.9rem)",
  },
  rift_guard_runtime: {
    offsetX: 2,
    offsetY: 0,
    textOffsetY: 0,
    slashWidth: 166,
    slashHeight: "clamp(3.95rem, 34vw, 7.4rem)",
    expandedSlashWidth: 306,
    expandedSlashHeight: "clamp(5.15rem, 43vw, 9.7rem)",
  },
  rift_knight_runtime: {
    offsetX: 5,
    offsetY: -7,
    textOffsetY: -4,
    slashWidth: 160,
    slashHeight: "clamp(3.7rem, 31vw, 7rem)",
    expandedSlashWidth: 300,
    expandedSlashHeight: "clamp(4.9rem, 41vw, 9.3rem)",
  },
  boss_warden_runtime: {
    offsetX: 0,
    offsetY: -3,
    textOffsetY: -1,
    slashWidth: 190,
    slashHeight: "clamp(4.8rem, 39vw, 8.6rem)",
    expandedSlashWidth: 350,
    expandedSlashHeight: "clamp(5.95rem, 50vw, 10.9rem)",
  },
});

export const MONSTER_EFFECT_TYPE_PLACEMENT_MODIFIERS_BY_MOTION_PROFILE = Object.freeze({
  default_enemy_runtime: {
    impact: { offsetY: 1, slashWidthMultiplier: 1.02, expandedSlashWidthMultiplier: 1.02 },
    slash: { offsetX: -2, offsetY: -2, textOffsetY: -1, slashWidthMultiplier: 0.96, expandedSlashWidthMultiplier: 0.97 },
    dark: { offsetY: -3, textOffsetY: -2, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.06 },
  },
  small_fiend_runtime: {
    slash: { offsetX: -3, offsetY: -2, textOffsetY: -1, slashWidthMultiplier: 0.96, expandedSlashWidthMultiplier: 0.96 },
    pierce: { offsetX: 2, offsetY: -1, slashWidthMultiplier: 0.98, expandedSlashWidthMultiplier: 0.98 },
    dark: { offsetX: -1, offsetY: -5, textOffsetY: -2, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.07 },
  },
  slime_drift_runtime: {
    impact: { offsetX: -1, offsetY: 1, textOffsetY: 0, slashWidthMultiplier: 1.01, expandedSlashWidthMultiplier: 1.01 },
    magic: { offsetX: 0, offsetY: -2, textOffsetY: -1, slashWidthMultiplier: 1.06, expandedSlashWidthMultiplier: 1.05 },
    dark: { offsetX: -1, offsetY: -4, textOffsetY: -2, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.06 },
  },
  beast_lunge_runtime: {
    pierce: { offsetX: 7, offsetY: -2, textOffsetY: -1, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.07 },
    slash: { offsetX: 3, offsetY: -3, slashWidthMultiplier: 1.03, expandedSlashWidthMultiplier: 1.03 },
    dark: { offsetX: 5, offsetY: -6, textOffsetY: -3, slashWidthMultiplier: 1.1, expandedSlashWidthMultiplier: 1.08 },
  },
  alpha_beast_runtime: {
    pierce: { offsetX: 8, offsetY: -3, textOffsetY: -2, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.07 },
    slash: { offsetX: 5, offsetY: -4, textOffsetY: -1, slashWidthMultiplier: 1.04, expandedSlashWidthMultiplier: 1.04 },
    dark: { offsetX: 7, offsetY: -8, textOffsetY: -4, slashWidthMultiplier: 1.1, expandedSlashWidthMultiplier: 1.08 },
  },
  construct_slam_runtime: {
    impact: { offsetY: 4, textOffsetY: 2, slashWidthMultiplier: 1.04, expandedSlashWidthMultiplier: 1.04 },
    explosion: { offsetY: 7, textOffsetY: 4, slashWidthMultiplier: 1.12, expandedSlashWidthMultiplier: 1.1 },
    dark: { offsetY: 2, textOffsetY: 1, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.08 },
  },
  rune_construct_runtime: {
    impact: { offsetY: 2, textOffsetY: 1, slashWidthMultiplier: 1.04, expandedSlashWidthMultiplier: 1.04 },
    magic: { offsetX: 1, offsetY: -1, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.06 },
    dark: { offsetY: -2, textOffsetY: -1, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.06 },
  },
  heavy_golem_runtime: {
    impact: { offsetY: 4, textOffsetY: 2, slashWidthMultiplier: 1.05, expandedSlashWidthMultiplier: 1.05 },
    explosion: { offsetY: 7, textOffsetY: 4, slashWidthMultiplier: 1.1, expandedSlashWidthMultiplier: 1.08 },
    dark: { offsetY: 2, textOffsetY: 1, slashWidthMultiplier: 1.07, expandedSlashWidthMultiplier: 1.06 },
  },
  core_golem_runtime: {
    impact: { offsetY: 3, textOffsetY: 1, slashWidthMultiplier: 1.05, expandedSlashWidthMultiplier: 1.05 },
    explosion: { offsetX: 1, offsetY: 6, textOffsetY: 3, slashWidthMultiplier: 1.11, expandedSlashWidthMultiplier: 1.09 },
    dark: { offsetY: 0, textOffsetY: -1, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.07 },
  },
  rift_squire_runtime: {
    slash: { offsetX: 6, offsetY: -4, textOffsetY: -2, slashWidthMultiplier: 1.05, expandedSlashWidthMultiplier: 1.04 },
    pierce: { offsetX: 8, offsetY: -3, textOffsetY: -1, slashWidthMultiplier: 1.07, expandedSlashWidthMultiplier: 1.06 },
    dark: { offsetX: 7, offsetY: -7, textOffsetY: -4, slashWidthMultiplier: 1.1, expandedSlashWidthMultiplier: 1.08 },
  },
  rift_guard_runtime: {
    impact: { offsetX: 2, offsetY: 2, textOffsetY: 1, slashWidthMultiplier: 1.05, expandedSlashWidthMultiplier: 1.04 },
    slash: { offsetX: 4, offsetY: -2, textOffsetY: -1, slashWidthMultiplier: 1.03, expandedSlashWidthMultiplier: 1.03 },
    dark: { offsetX: 3, offsetY: -4, textOffsetY: -2, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.07 },
  },
  rift_knight_runtime: {
    slash: { offsetX: 5, offsetY: -4, textOffsetY: -2, slashWidthMultiplier: 1.05, expandedSlashWidthMultiplier: 1.04 },
    pierce: { offsetX: 8, offsetY: -3, textOffsetY: -1, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.06 },
    dark: { offsetX: 6, offsetY: -7, textOffsetY: -4, slashWidthMultiplier: 1.1, expandedSlashWidthMultiplier: 1.08 },
  },
  boss_warden_runtime: {
    dark: { offsetY: -2, textOffsetY: -2, slashWidthMultiplier: 1.07, expandedSlashWidthMultiplier: 1.06 },
    explosion: { offsetY: 5, textOffsetY: 3, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.06 },
    impact: { offsetY: 2, textOffsetY: 1, slashWidthMultiplier: 1.04, expandedSlashWidthMultiplier: 1.04 },
  },
});

export const MONSTER_BATTLE_SPRITE_PRESETS = Object.freeze({
  shore_imp: {
    monsterId: "shore_imp",
    classId: "enemy_imp",
    motionProfile: "small_fiend_runtime",
    sfxProfile: "short_claw",
    defaultScale: 1.04,
    offsetX: 0,
    offsetY: 1,
    pivotX: 0.5,
    pivotY: 0.98,
    motionSafeMargin: { x: 0.1, y: 0.08 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.small_fiend_runtime,
  },
  shore_drift_slime: {
    monsterId: "shore_drift_slime",
    classId: "enemy_slime",
    motionProfile: "slime_drift_runtime",
    sfxProfile: "impact_near",
    defaultScale: 0.96,
    offsetX: 0,
    offsetY: 3,
    pivotX: 0.5,
    pivotY: 0.97,
    motionSafeMargin: { x: 0.12, y: 0.09 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.slime_drift_runtime,
  },
  forest_wolf: {
    monsterId: "forest_wolf",
    classId: "enemy_beast",
    motionProfile: "beast_lunge_runtime",
    sfxProfile: "bite_swipe",
    defaultScale: 0.98,
    offsetX: 0,
    offsetY: 2,
    pivotX: 0.5,
    pivotY: 0.96,
    motionSafeMargin: { x: 0.12, y: 0.08 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.beast_lunge_runtime,
  },
  forest_alpha_wolf: {
    monsterId: "forest_alpha_wolf",
    classId: "enemy_alpha_beast",
    motionProfile: "alpha_beast_runtime",
    sfxProfile: "bite_swipe",
    defaultScale: 1.02,
    offsetX: 0,
    offsetY: 1,
    pivotX: 0.5,
    pivotY: 0.96,
    motionSafeMargin: { x: 0.13, y: 0.08 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.alpha_beast_runtime,
  },
  ruin_sentinel: {
    monsterId: "ruin_sentinel",
    classId: "enemy_construct",
    motionProfile: "construct_slam_runtime",
    sfxProfile: "stone_impact",
    defaultScale: 0.94,
    offsetX: 0,
    offsetY: 0,
    pivotX: 0.5,
    pivotY: 1,
    motionSafeMargin: { x: 0.08, y: 0.1 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.construct_slam_runtime,
  },
  ruin_rune_doll: {
    monsterId: "ruin_rune_doll",
    classId: "enemy_rune_doll",
    motionProfile: "rune_construct_runtime",
    sfxProfile: "stone_impact",
    defaultScale: 0.92,
    offsetX: 0,
    offsetY: 1,
    pivotX: 0.5,
    pivotY: 1,
    motionSafeMargin: { x: 0.09, y: 0.1 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.rune_construct_runtime,
  },
  mine_golem: {
    monsterId: "mine_golem",
    classId: "enemy_heavy",
    motionProfile: "heavy_golem_runtime",
    sfxProfile: "heavy_impact",
    defaultScale: 0.9,
    offsetX: 0,
    offsetY: 0,
    pivotX: 0.5,
    pivotY: 1,
    motionSafeMargin: { x: 0.07, y: 0.1 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.heavy_golem_runtime,
  },
  mine_core_golem: {
    monsterId: "mine_core_golem",
    classId: "enemy_core_golem",
    motionProfile: "core_golem_runtime",
    sfxProfile: "heavy_impact",
    defaultScale: 0.88,
    offsetX: 0,
    offsetY: -1,
    pivotX: 0.5,
    pivotY: 1,
    motionSafeMargin: { x: 0.06, y: 0.11 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.core_golem_runtime,
  },
  rift_squire: {
    monsterId: "rift_squire",
    classId: "enemy_rift_squire",
    motionProfile: "rift_squire_runtime",
    sfxProfile: "dark_slash",
    defaultScale: 0.98,
    offsetX: 0,
    offsetY: 0,
    pivotX: 0.5,
    pivotY: 1,
    motionSafeMargin: { x: 0.09, y: 0.08 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.rift_squire_runtime,
  },
  rift_shieldbearer: {
    monsterId: "rift_shieldbearer",
    classId: "enemy_rift_shield",
    motionProfile: "rift_guard_runtime",
    sfxProfile: "stone_impact",
    defaultScale: 0.92,
    offsetX: 0,
    offsetY: 1,
    pivotX: 0.5,
    pivotY: 1,
    motionSafeMargin: { x: 0.07, y: 0.1 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.rift_guard_runtime,
  },
  rift_knight: {
    monsterId: "rift_knight",
    classId: "enemy_knight",
    motionProfile: "rift_knight_runtime",
    sfxProfile: "dark_slash",
    defaultScale: 0.98,
    offsetX: 0,
    offsetY: 0,
    pivotX: 0.5,
    pivotY: 1,
    motionSafeMargin: { x: 0.09, y: 0.08 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.rift_knight_runtime,
  },
  rift_warden: {
    monsterId: "rift_warden",
    classId: "enemy_boss",
    motionProfile: "boss_warden_runtime",
    sfxProfile: "dark_burst",
    defaultScale: 0.86,
    offsetX: 0,
    offsetY: -1,
    pivotX: 0.5,
    pivotY: 1,
    motionSafeMargin: { x: 0.06, y: 0.12 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.boss_warden_runtime,
  },
});

const MONSTER_SFX_EFFECT_TYPES = Object.freeze({
  short_claw: "slash",
  bite_swipe: "pierce",
  stone_impact: "impact",
  heavy_impact: "explosion",
  dark_slash: "dark",
  dark_burst: "dark",
  impact_near: "impact",
});

export function resolveMonsterBattleSpritePreset(monster) {
  const preset = MONSTER_BATTLE_SPRITE_PRESETS[monster?.id];
  return preset || {
    ...DEFAULT_MONSTER_BATTLE_SPRITE_PRESET,
    monsterId: monster?.id || DEFAULT_MONSTER_BATTLE_SPRITE_PRESET.monsterId,
  };
}

export function monsterAttackEffectType(monster, { hyperActive = false } = {}) {
  if (hyperActive) return "dark";
  const preset = resolveMonsterBattleSpritePreset(monster);
  return MONSTER_SFX_EFFECT_TYPES[preset.sfxProfile] || MONSTER_SFX_EFFECT_TYPES.impact_near;
}

export function monsterAttackEffectPlacement(monster, { hyperActive = false, effectType = "" } = {}) {
  const preset = resolveMonsterBattleSpritePreset(monster);
  const basePlacement =
    preset.effectPlacement ||
    MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE[preset.motionProfile] ||
    MONSTER_EFFECT_PLACEMENTS_BY_SFX[preset.sfxProfile] ||
    DEFAULT_MONSTER_BATTLE_SPRITE_PRESET.effectPlacement;
  const resolvedEffectType = effectType || monsterAttackEffectType(monster, { hyperActive });
  const profileModifiers = MONSTER_EFFECT_TYPE_PLACEMENT_MODIFIERS_BY_MOTION_PROFILE[preset.motionProfile] || {};
  const effectPlacement = applyEffectPlacementModifier(basePlacement, profileModifiers[resolvedEffectType]);
  if (!hyperActive) return effectPlacement;
  return normalizeEffectPlacement({
    ...effectPlacement,
    slashWidth: Math.round(Number(effectPlacement.slashWidth || 136) * 1.18),
    expandedSlashWidth: Math.round(Number(effectPlacement.expandedSlashWidth || 260) * 1.14),
    textOffsetY: Number(effectPlacement.textOffsetY || 0) - 2,
  });
}

function applyEffectPlacementModifier(basePlacement, modifier) {
  if (!modifier || typeof modifier !== "object") return normalizeEffectPlacement(basePlacement);
  return normalizeEffectPlacement({
    ...basePlacement,
    offsetX: Number(basePlacement.offsetX || 0) + Number(modifier.offsetX || 0),
    offsetY: Number(basePlacement.offsetY || 0) + Number(modifier.offsetY || 0),
    textOffsetY: Number(basePlacement.textOffsetY || 0) + Number(modifier.textOffsetY || 0),
    slashWidth: Math.round(Number(basePlacement.slashWidth || 136) * Number(modifier.slashWidthMultiplier || 1) + Number(modifier.slashWidthDelta || 0)),
    expandedSlashWidth: Math.round(
      Number(basePlacement.expandedSlashWidth || 260) * Number(modifier.expandedSlashWidthMultiplier || 1) +
        Number(modifier.expandedSlashWidthDelta || 0),
    ),
    slashHeight: modifier.slashHeight || basePlacement.slashHeight,
    expandedSlashHeight: modifier.expandedSlashHeight || basePlacement.expandedSlashHeight,
  });
}

function normalizeEffectPlacement(placement = {}) {
  return {
    ...placement,
    offsetX: boundedNumber(placement.offsetX, -18, 18, 0),
    offsetY: boundedNumber(placement.offsetY, -18, 18, 0),
    textOffsetY: boundedNumber(placement.textOffsetY, -12, 12, 0),
    slashWidth: boundedNumber(placement.slashWidth, 80, 260, 136),
    expandedSlashWidth: boundedNumber(placement.expandedSlashWidth, 170, 430, 260),
  };
}

function boundedNumber(value, min, max, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(max, Math.max(min, numeric));
}
