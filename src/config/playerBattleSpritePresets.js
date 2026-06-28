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
  slashHeight: "34%",
  expandedSlashWidth: 190,
  expandedSlashHeight: "44%",
});

const PLAYER_ATTACK_EFFECT_PLACEMENTS_BY_CLASS = Object.freeze({
  warrior: {
    offsetX: 0,
    offsetY: -2,
    textOffsetY: -2,
    slashWidth: 162,
    slashHeight: "36%",
    expandedSlashWidth: 205,
    expandedSlashHeight: "48%",
  },
  assassin: {
    offsetX: 4,
    offsetY: -8,
    textOffsetY: -5,
    slashWidth: 128,
    slashHeight: "27%",
    expandedSlashWidth: 170,
    expandedSlashHeight: "38%",
  },
  fighter: {
    offsetX: -1,
    offsetY: 3,
    textOffsetY: 1,
    slashWidth: 150,
    slashHeight: "38%",
    expandedSlashWidth: 195,
    expandedSlashHeight: "50%",
  },
  archer: {
    offsetX: -3,
    offsetY: -11,
    textOffsetY: -6,
    slashWidth: 176,
    slashHeight: "18%",
    expandedSlashWidth: 215,
    expandedSlashHeight: "28%",
  },
  mage_wandbook: {
    offsetX: 0,
    offsetY: -7,
    textOffsetY: -4,
    slashWidth: 178,
    slashHeight: "38%",
    expandedSlashWidth: 220,
    expandedSlashHeight: "50%",
  },
  mage_staff: {
    offsetX: 2,
    offsetY: -9,
    textOffsetY: -5,
    slashWidth: 188,
    slashHeight: "40%",
    expandedSlashWidth: 230,
    expandedSlashHeight: "54%",
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
