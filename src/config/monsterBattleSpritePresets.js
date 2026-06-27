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
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_SFX.short_claw,
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
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_SFX.bite_swipe,
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
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_SFX.stone_impact,
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
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_SFX.heavy_impact,
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
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_SFX.dark_slash,
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
    effectPlacement: MONSTER_EFFECT_PLACEMENTS_BY_SFX.dark_burst,
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

export function monsterAttackEffectPlacement(monster, { hyperActive = false } = {}) {
  const preset = resolveMonsterBattleSpritePreset(monster);
  const basePlacement =
    preset.effectPlacement ||
    MONSTER_EFFECT_PLACEMENTS_BY_SFX[preset.sfxProfile] ||
    DEFAULT_MONSTER_BATTLE_SPRITE_PRESET.effectPlacement;
  if (!hyperActive) return basePlacement;
  return {
    ...basePlacement,
    slashWidth: Math.round(Number(basePlacement.slashWidth || 136) * 1.18),
    expandedSlashWidth: Math.round(Number(basePlacement.expandedSlashWidth || 260) * 1.14),
    textOffsetY: Number(basePlacement.textOffsetY || 0) - 2,
  };
}
