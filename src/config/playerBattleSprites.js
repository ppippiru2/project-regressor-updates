import {
  PLAYER_BATTLE_SPRITE_CLASSES,
  PLAYER_BATTLE_SPRITE_GENDERS,
  PLAYER_BATTLE_SPRITE_PRESETS,
  DEFAULT_PLAYER_ATTACK_EFFECT_PLACEMENT,
} from "./playerBattleSpritePresets.js?v=447";

export { PLAYER_BATTLE_SPRITE_CLASSES, PLAYER_BATTLE_SPRITE_GENDERS, PLAYER_BATTLE_SPRITE_PRESETS };

const PLAYER_EFFECT_TYPE_PLACEMENT_TUNING = Object.freeze({
  slash: { slashWidth: 1.02, expandedSlashWidth: 1.02, offsetY: -1 },
  impact: { slashWidth: 1.06, expandedSlashWidth: 1.05, offsetY: 2 },
  pierce: { slashWidth: 1.08, expandedSlashWidth: 1.08, slashHeight: 0.72, expandedSlashHeight: 0.76, offsetY: -3 },
  projectile: { slashWidth: 1.1, expandedSlashWidth: 1.1, slashHeight: 0.7, expandedSlashHeight: 0.74, offsetY: -4 },
  magic: { slashWidth: 1.12, expandedSlashWidth: 1.1, slashHeight: 1.08, expandedSlashHeight: 1.08, offsetY: -2 },
  holy: { slashWidth: 1.1, expandedSlashWidth: 1.08, slashHeight: 1.06, expandedSlashHeight: 1.06, offsetY: -2 },
  dark: { slashWidth: 1.14, expandedSlashWidth: 1.12, slashHeight: 1.1, expandedSlashHeight: 1.1, offsetY: -2 },
  explosion: { slashWidth: 1.18, expandedSlashWidth: 1.16, slashHeight: 1.16, expandedSlashHeight: 1.16, offsetY: 2 },
});

export function resolvePlayerBattleSpritePreset(playerProfile = {}) {
  const params = getSearchParams();
  const classId = normalizeSpriteClass(
    params?.get("spriteClass") || params?.get("battleClass") || playerProfile.classId || playerProfile.combatClass
  );
  const gender = normalizeSpriteGender(params?.get("spriteGender") || playerProfile.gender);
  return PLAYER_BATTLE_SPRITE_PRESETS[classId]?.[gender] || PLAYER_BATTLE_SPRITE_PRESETS.warrior.male;
}

export function resolvePlayerAttackEffectPlacement(playerProfile = {}, { effectType = "impact", hyperActive = false } = {}) {
  const preset = resolvePlayerBattleSpritePreset(playerProfile);
  const basePlacement = preset.attackEffectPlacement || DEFAULT_PLAYER_ATTACK_EFFECT_PLACEMENT;
  const tuning = PLAYER_EFFECT_TYPE_PLACEMENT_TUNING[effectType] || PLAYER_EFFECT_TYPE_PLACEMENT_TUNING.impact;
  const tunedPlacement = {
    ...basePlacement,
    offsetY: Number(basePlacement.offsetY || 0) + Number(tuning.offsetY || 0),
    slashWidth: Math.round(Number(basePlacement.slashWidth || 150) * Number(tuning.slashWidth || 1)),
    expandedSlashWidth: Math.round(Number(basePlacement.expandedSlashWidth || 278) * Number(tuning.expandedSlashWidth || 1)),
    slashHeight: scaleClampLength(basePlacement.slashHeight, Number(tuning.slashHeight || 1)),
    expandedSlashHeight: scaleClampLength(basePlacement.expandedSlashHeight, Number(tuning.expandedSlashHeight || 1)),
  };
  if (!hyperActive) return tunedPlacement;
  return {
    ...tunedPlacement,
    textOffsetY: Number(tunedPlacement.textOffsetY || 0) - 2,
    slashWidth: Math.round(Number(tunedPlacement.slashWidth || 150) * 1.14),
    expandedSlashWidth: Math.round(Number(tunedPlacement.expandedSlashWidth || 278) * 1.1),
  };
}

function normalizeSpriteClass(value) {
  const normalized = String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[-\s]+/g, "_")
    .replace("wand_book", "wandbook");
  return PLAYER_BATTLE_SPRITE_CLASSES.includes(normalized) ? normalized : "warrior";
}

function normalizeSpriteGender(value) {
  const normalized = String(value || "").trim().toLowerCase();
  return PLAYER_BATTLE_SPRITE_GENDERS.includes(normalized) ? normalized : "male";
}

function getSearchParams() {
  if (typeof window === "undefined") return null;
  return new URLSearchParams(window.location.search);
}

function scaleClampLength(value, multiplier) {
  if (!Number.isFinite(multiplier) || multiplier === 1) return value;
  if (typeof value !== "string") return value;
  return value.replace(/(-?\d*\.?\d+)(rem|vw|cqw)/g, (_match, amount, unit) => {
    const scaled = Number(amount) * multiplier;
    const rounded = Math.round(scaled * 100) / 100;
    return `${rounded}${unit}`;
  });
}

