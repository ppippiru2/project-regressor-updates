import {
  PLAYER_BATTLE_SPRITE_CLASSES,
  PLAYER_BATTLE_SPRITE_GENDERS,
  PLAYER_BATTLE_SPRITE_PRESETS,
} from "./playerBattleSpritePresets.js?v=336";

export { PLAYER_BATTLE_SPRITE_CLASSES, PLAYER_BATTLE_SPRITE_GENDERS, PLAYER_BATTLE_SPRITE_PRESETS };

export function resolvePlayerBattleSpritePreset(playerProfile = {}) {
  const params = getSearchParams();
  const classId = normalizeSpriteClass(
    params?.get("spriteClass") || params?.get("battleClass") || playerProfile.classId || playerProfile.combatClass
  );
  const gender = normalizeSpriteGender(params?.get("spriteGender") || playerProfile.gender);
  return PLAYER_BATTLE_SPRITE_PRESETS[classId]?.[gender] || PLAYER_BATTLE_SPRITE_PRESETS.warrior.male;
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
