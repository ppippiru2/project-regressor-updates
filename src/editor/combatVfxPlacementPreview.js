import { monsters } from "../data/worldData.js?v=407";
import {
  monsterAttackEffectPlacement,
  monsterAttackEffectType,
  resolveMonsterBattleSpritePreset,
} from "../config/monsterBattleSpritePresets.js?v=407";
import {
  PLAYER_BATTLE_SPRITE_CLASSES,
  PLAYER_BATTLE_SPRITE_GENDERS,
  PLAYER_BATTLE_SPRITE_PRESETS,
} from "../config/playerBattleSpritePresets.js?v=407";
import { resolvePlayerAttackEffectPlacement } from "../config/playerBattleSprites.js?v=407";

export const COMBAT_VFX_PREVIEW_EFFECT_TYPES = Object.freeze([
  "slash",
  "impact",
  "pierce",
  "projectile",
  "magic",
  "holy",
  "dark",
  "explosion",
]);

export function createCombatVfxPlacementPreview() {
  const playerRows = createPlayerVfxRows();
  const monsterRows = createMonsterVfxRows();
  return {
    version: 1,
    playerRows,
    monsterRows,
    totals: {
      playerRows: playerRows.length,
      monsterRows: monsterRows.length,
      playerClasses: PLAYER_BATTLE_SPRITE_CLASSES.length,
      playerGenders: PLAYER_BATTLE_SPRITE_GENDERS.length,
      effectTypes: COMBAT_VFX_PREVIEW_EFFECT_TYPES.length,
    },
  };
}

function createPlayerVfxRows() {
  return PLAYER_BATTLE_SPRITE_CLASSES.flatMap((classId) =>
    PLAYER_BATTLE_SPRITE_GENDERS.map((gender) => {
      const preset = PLAYER_BATTLE_SPRITE_PRESETS[classId]?.[gender];
      const effects = Object.fromEntries(
        COMBAT_VFX_PREVIEW_EFFECT_TYPES.map((effectType) => [
          effectType,
          summarizePlacement(resolvePlayerAttackEffectPlacement({ classId, gender }, { effectType })),
        ]),
      );
      return {
        id: `${classId}:${gender}`,
        classId,
        gender,
        spritePath: preset?.path || "",
        basePlacement: summarizePlacement(preset?.attackEffectPlacement),
        hyperPlacement: summarizePlacement(resolvePlayerAttackEffectPlacement({ classId, gender }, { effectType: "dark", hyperActive: true })),
        effects,
      };
    }),
  );
}

function createMonsterVfxRows() {
  return monsters.map((monster) => {
    const preset = resolveMonsterBattleSpritePreset(monster);
    return {
      id: monster.id,
      name: monster.name,
      classId: preset.classId,
      motionProfile: preset.motionProfile,
      sfxProfile: preset.sfxProfile,
      effectType: monsterAttackEffectType(monster),
      basePlacement: summarizePlacement(monsterAttackEffectPlacement(monster)),
      hyperPlacement: summarizePlacement(monsterAttackEffectPlacement(monster, { hyperActive: true })),
    };
  });
}

function summarizePlacement(placement = {}) {
  return {
    offsetX: Number(placement.offsetX || 0),
    offsetY: Number(placement.offsetY || 0),
    textOffsetY: Number(placement.textOffsetY || 0),
    slashWidth: Number(placement.slashWidth || 0),
    slashHeight: String(placement.slashHeight || ""),
    expandedSlashWidth: Number(placement.expandedSlashWidth || 0),
    expandedSlashHeight: String(placement.expandedSlashHeight || ""),
  };
}
