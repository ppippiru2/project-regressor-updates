export const PLAYER_BATTLE_SPRITE_CLASSES = [
  "warrior",
  "assassin",
  "fighter",
  "archer",
  "mage_wandbook",
  "mage_staff",
];

export const PLAYER_BATTLE_SPRITE_GENDERS = ["male", "female"];

export const DEFAULT_PLAYER_ATTACK_EFFECT_PLACEMENT = Object.freeze({
  offsetX: 0,
  offsetY: -3,
  textOffsetY: -2,
  slashWidth: 150,
  slashHeight: "clamp(3.2rem, 28vw, 6.4rem)",
  expandedSlashWidth: 278,
  expandedSlashHeight: "clamp(4.4rem, 36vw, 8.2rem)",
});

const PLAYER_ATTACK_EFFECT_PLACEMENTS_BY_CLASS = Object.freeze({
  warrior: {
    offsetX: 0,
    offsetY: -2,
    textOffsetY: -2,
    slashWidth: 162,
    slashHeight: "clamp(3.6rem, 30vw, 6.9rem)",
    expandedSlashWidth: 302,
    expandedSlashHeight: "clamp(4.8rem, 39vw, 9rem)",
  },
  assassin: {
    offsetX: 4,
    offsetY: -8,
    textOffsetY: -5,
    slashWidth: 128,
    slashHeight: "clamp(2.6rem, 23vw, 5.2rem)",
    expandedSlashWidth: 244,
    expandedSlashHeight: "clamp(3.7rem, 32vw, 7.2rem)",
  },
  fighter: {
    offsetX: -1,
    offsetY: 3,
    textOffsetY: 1,
    slashWidth: 150,
    slashHeight: "clamp(3.8rem, 32vw, 7.2rem)",
    expandedSlashWidth: 284,
    expandedSlashHeight: "clamp(5rem, 42vw, 9.4rem)",
  },
  archer: {
    offsetX: -3,
    offsetY: -11,
    textOffsetY: -6,
    slashWidth: 176,
    slashHeight: "clamp(1.8rem, 17vw, 4rem)",
    expandedSlashWidth: 316,
    expandedSlashHeight: "clamp(2.8rem, 26vw, 5.8rem)",
  },
  mage_wandbook: {
    offsetX: 0,
    offsetY: -7,
    textOffsetY: -4,
    slashWidth: 178,
    slashHeight: "clamp(3.9rem, 32vw, 7.2rem)",
    expandedSlashWidth: 320,
    expandedSlashHeight: "clamp(5rem, 42vw, 9.6rem)",
  },
  mage_staff: {
    offsetX: 2,
    offsetY: -9,
    textOffsetY: -5,
    slashWidth: 188,
    slashHeight: "clamp(4.2rem, 35vw, 7.8rem)",
    expandedSlashWidth: 338,
    expandedSlashHeight: "clamp(5.4rem, 45vw, 10.2rem)",
  },
});

export const PLAYER_BATTLE_SPRITE_PRESETS = {
  warrior: {
    male: createPreset("warrior", "male", "warrior_male_sprite.png", 0.98, 0, -1, 0.8373, 0.9743),
    female: createPreset("warrior", "female", "warrior_female_sprite.png", 0.98, 0, -1, 0.7787, 0.9734),
  },
  assassin: {
    male: createPreset("assassin", "male", "assassin_male_sprite.png", 1.02, 0, -1, 0.8008, 0.9722),
    female: createPreset("assassin", "female", "assassin_female_sprite.png", 1.02, 0, -1, 0.7672, 0.9715),
  },
  fighter: {
    male: createPreset("fighter", "male", "fighter_male_sprite.png", 1.04, 0, -1, 0.8764, 0.9729),
    female: createPreset("fighter", "female", "fighter_female_sprite.png", 1.04, 0, -1, 0.8917, 0.9716),
  },
  archer: {
    male: createPreset("archer", "male", "archer_male_sprite.png", 0.94, -1, -1, 0.7487, 0.9721),
    female: createPreset("archer", "female", "archer_female_sprite.png", 0.94, -1, -1, 0.7172, 0.971),
  },
  mage_wandbook: {
    male: createPreset("mage_wandbook", "male", "mage_wandbook_male_sprite.png", 0.98, 0, -1, 0.7224, 0.9723),
    female: createPreset("mage_wandbook", "female", "mage_wandbook_female_sprite.png", 0.98, 0, -1, 0.7107, 0.971),
  },
  mage_staff: {
    male: createPreset("mage_staff", "male", "mage_staff_male_sprite.png", 0.88, 1, 0, 0.761, 0.9743),
    female: createPreset("mage_staff", "female", "mage_staff_female_sprite.png", 0.88, 1, 0, 0.7081, 0.9739),
  },
};

function createPreset(classId, gender, filename, defaultScale, offsetX, offsetY, pivotX, pivotY) {
  return {
    classId,
    gender,
    path: `assets/characters/player/classes/${filename}`,
    defaultScale,
    offsetX,
    offsetY,
    pivotX,
    pivotY,
    attackEffectPlacement: PLAYER_ATTACK_EFFECT_PLACEMENTS_BY_CLASS[classId] || DEFAULT_PLAYER_ATTACK_EFFECT_PLACEMENT,
  };
}
