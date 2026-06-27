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
