import { MONSTER_RUNTIME_INTEGRATION_PACK_VERSION } from "./monsterRuntimeIntegrationPresets.js?v=565";

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
    slashHeight: "34%",
    expandedSlashWidth: 190,
    expandedSlashHeight: "44%",
  },
});

const MONSTER_EFFECT_PLACEMENTS_BY_SFX = Object.freeze({
  short_claw: {
    offsetX: -3,
    offsetY: -9,
    textOffsetY: -5,
    slashWidth: 118,
    slashHeight: "25%",
    expandedSlashWidth: 170,
    expandedSlashHeight: "35%",
  },
  bite_swipe: {
    offsetX: 2,
    offsetY: -3,
    textOffsetY: -2,
    slashWidth: 148,
    slashHeight: "30%",
    expandedSlashWidth: 190,
    expandedSlashHeight: "40%",
  },
  stone_impact: {
    offsetX: 0,
    offsetY: 4,
    textOffsetY: 2,
    slashWidth: 132,
    slashHeight: "36%",
    expandedSlashWidth: 180,
    expandedSlashHeight: "48%",
  },
  heavy_impact: {
    offsetX: 0,
    offsetY: 7,
    textOffsetY: 4,
    slashWidth: 164,
    slashHeight: "42%",
    expandedSlashWidth: 215,
    expandedSlashHeight: "54%",
  },
  dark_slash: {
    offsetX: 3,
    offsetY: -6,
    textOffsetY: -3,
    slashWidth: 156,
    slashHeight: "38%",
    expandedSlashWidth: 205,
    expandedSlashHeight: "50%",
  },
  dark_burst: {
    offsetX: 0,
    offsetY: -1,
    textOffsetY: 0,
    slashWidth: 184,
    slashHeight: "46%",
    expandedSlashWidth: 230,
    expandedSlashHeight: "58%",
  },
  impact_near: {
    offsetX: 0,
    offsetY: 0,
    textOffsetY: 0,
    slashWidth: 136,
    slashHeight: "34%",
    expandedSlashWidth: 190,
    expandedSlashHeight: "44%",
  },
});

export const MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE = Object.freeze({
  default_enemy_runtime: MONSTER_EFFECT_PLACEMENTS_BY_SFX.impact_near,
  small_fiend_runtime: {
    offsetX: -4,
    offsetY: -11,
    textOffsetY: -6,
    slashWidth: 112,
    slashHeight: "24%",
    expandedSlashWidth: 165,
    expandedSlashHeight: "34%",
  },
  slime_drift_runtime: {
    offsetX: -2,
    offsetY: -6,
    textOffsetY: -3,
    slashWidth: 126,
    slashHeight: "29%",
    expandedSlashWidth: 175,
    expandedSlashHeight: "38%",
  },
  shell_guard_runtime: {
    offsetX: -5,
    offsetY: -7,
    textOffsetY: -4,
    slashWidth: 124,
    slashHeight: "27%",
    expandedSlashWidth: 170,
    expandedSlashHeight: "36%",
  },
  beast_lunge_runtime: {
    offsetX: 4,
    offsetY: -4,
    textOffsetY: -3,
    slashWidth: 152,
    slashHeight: "30%",
    expandedSlashWidth: 195,
    expandedSlashHeight: "40%",
  },
  goblin_scout_runtime: {
    offsetX: 2,
    offsetY: -6,
    textOffsetY: -3,
    slashWidth: 138,
    slashHeight: "28%",
    expandedSlashWidth: 180,
    expandedSlashHeight: "37%",
  },
  alpha_beast_runtime: {
    offsetX: 6,
    offsetY: -8,
    textOffsetY: -4,
    slashWidth: 168,
    slashHeight: "32%",
    expandedSlashWidth: 215,
    expandedSlashHeight: "44%",
  },
  construct_slam_runtime: {
    offsetX: 0,
    offsetY: 5,
    textOffsetY: 2,
    slashWidth: 136,
    slashHeight: "36%",
    expandedSlashWidth: 185,
    expandedSlashHeight: "49%",
  },
  rune_construct_runtime: {
    offsetX: 1,
    offsetY: 1,
    textOffsetY: 0,
    slashWidth: 144,
    slashHeight: "35%",
    expandedSlashWidth: 195,
    expandedSlashHeight: "47%",
  },
  crystal_bug_runtime: {
    offsetX: -2,
    offsetY: -5,
    textOffsetY: -2,
    slashWidth: 128,
    slashHeight: "29%",
    expandedSlashWidth: 175,
    expandedSlashHeight: "39%",
  },
  heavy_golem_runtime: {
    offsetX: 0,
    offsetY: 8,
    textOffsetY: 5,
    slashWidth: 168,
    slashHeight: "43%",
    expandedSlashWidth: 220,
    expandedSlashHeight: "55%",
  },
  core_golem_runtime: {
    offsetX: 1,
    offsetY: 4,
    textOffsetY: 2,
    slashWidth: 178,
    slashHeight: "45%",
    expandedSlashWidth: 230,
    expandedSlashHeight: "58%",
  },
  rift_squire_runtime: {
    offsetX: 6,
    offsetY: -5,
    textOffsetY: -3,
    slashWidth: 154,
    slashHeight: "37%",
    expandedSlashWidth: 205,
    expandedSlashHeight: "49%",
  },
  rift_guard_runtime: {
    offsetX: 2,
    offsetY: 0,
    textOffsetY: 0,
    slashWidth: 166,
    slashHeight: "40%",
    expandedSlashWidth: 215,
    expandedSlashHeight: "52%",
  },
  rift_knight_runtime: {
    offsetX: 5,
    offsetY: -7,
    textOffsetY: -4,
    slashWidth: 160,
    slashHeight: "38%",
    expandedSlashWidth: 210,
    expandedSlashHeight: "50%",
  },
  boss_warden_runtime: {
    offsetX: 0,
    offsetY: -3,
    textOffsetY: -1,
    slashWidth: 190,
    slashHeight: "48%",
    expandedSlashWidth: 245,
    expandedSlashHeight: "60%",
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
  shell_guard_runtime: {
    slash: { offsetX: -4, offsetY: -2, textOffsetY: -1, slashWidthMultiplier: 0.98, expandedSlashWidthMultiplier: 0.98 },
    impact: { offsetX: -2, offsetY: 1, textOffsetY: 0, slashWidthMultiplier: 1.02, expandedSlashWidthMultiplier: 1.02 },
    dark: { offsetX: -3, offsetY: -5, textOffsetY: -3, slashWidthMultiplier: 1.07, expandedSlashWidthMultiplier: 1.06 },
  },
  beast_lunge_runtime: {
    pierce: { offsetX: 7, offsetY: -2, textOffsetY: -1, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.07 },
    slash: { offsetX: 3, offsetY: -3, slashWidthMultiplier: 1.03, expandedSlashWidthMultiplier: 1.03 },
    dark: { offsetX: 5, offsetY: -6, textOffsetY: -3, slashWidthMultiplier: 1.1, expandedSlashWidthMultiplier: 1.08 },
  },
  goblin_scout_runtime: {
    slash: { offsetX: 2, offsetY: -2, textOffsetY: -1, slashWidthMultiplier: 1.02, expandedSlashWidthMultiplier: 1.02 },
    pierce: { offsetX: 5, offsetY: -1, slashWidthMultiplier: 1.04, expandedSlashWidthMultiplier: 1.04 },
    dark: { offsetX: 3, offsetY: -6, textOffsetY: -3, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.07 },
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
  crystal_bug_runtime: {
    slash: { offsetX: -2, offsetY: -2, textOffsetY: -1, slashWidthMultiplier: 0.98, expandedSlashWidthMultiplier: 0.98 },
    magic: { offsetX: 0, offsetY: -3, textOffsetY: -1, slashWidthMultiplier: 1.07, expandedSlashWidthMultiplier: 1.06 },
    dark: { offsetX: -1, offsetY: -6, textOffsetY: -3, slashWidthMultiplier: 1.08, expandedSlashWidthMultiplier: 1.07 },
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
    externalMonsterIds: ["rift_imp_lv1"],
    runtimeIntegrationPack: MONSTER_RUNTIME_INTEGRATION_PACK_VERSION,
    sourceInitialScale: 0.62,
    cardSlot: "enemy",
    pivot: "foot_center",
    cutoffPolicy: "minor_tail_or_claw_allowed",
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
  shore_claw_crab: {
    monsterId: "shore_claw_crab",
    classId: "enemy_shore_crab",
    motionProfile: "shell_guard_runtime",
    sfxProfile: "short_claw",
    defaultScale: 0.94,
    offsetX: 0,
    offsetY: 3,
    pivotX: 0.5,
    pivotY: 0.98,
    motionSafeMargin: { x: 0.11, y: 0.09 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.shell_guard_runtime,
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
  forest_goblin_scout: {
    monsterId: "forest_goblin_scout",
    classId: "enemy_goblin_scout",
    motionProfile: "goblin_scout_runtime",
    sfxProfile: "short_claw",
    defaultScale: 0.96,
    offsetX: 0,
    offsetY: 2,
    pivotX: 0.5,
    pivotY: 0.98,
    motionSafeMargin: { x: 0.11, y: 0.08 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.goblin_scout_runtime,
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
  mine_crystal_bug: {
    monsterId: "mine_crystal_bug",
    classId: "enemy_crystal_bug",
    motionProfile: "crystal_bug_runtime",
    sfxProfile: "short_claw",
    defaultScale: 0.9,
    offsetX: 0,
    offsetY: 4,
    pivotX: 0.5,
    pivotY: 0.97,
    motionSafeMargin: { x: 0.12, y: 0.09 },
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.crystal_bug_runtime,
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
    expandedSlashWidth: boundedNumber(placement.expandedSlashWidth, 150, 320, 190),
  };
}

function boundedNumber(value, min, max, fallback) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return fallback;
  return Math.min(max, Math.max(min, numeric));
}


