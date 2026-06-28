import { monsters } from "../data/worldData.js?v=504";
import {
  MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE,
  MONSTER_EFFECT_TYPE_PLACEMENT_MODIFIERS_BY_MOTION_PROFILE,
  monsterAttackEffectPlacement,
  monsterAttackEffectType,
  resolveMonsterBattleSpritePreset,
} from "../config/monsterBattleSpritePresets.js?v=504";
import {
  PLAYER_BATTLE_SPRITE_CLASSES,
  PLAYER_BATTLE_SPRITE_GENDERS,
  PLAYER_BATTLE_SPRITE_PRESETS,
} from "../config/playerBattleSpritePresets.js?v=504";
import { resolvePlayerAttackEffectPlacement } from "../config/playerBattleSprites.js?v=504";

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
  const monsterMotionProfileRows = createMonsterMotionProfileRows(monsterRows);
  const tuningCandidates = createCombatVfxTuningCandidates(playerRows, monsterRows);
  return {
    version: 1,
    playerRows,
    monsterRows,
    monsterMotionProfileRows,
    tuningCandidates,
    totals: {
      playerRows: playerRows.length,
      monsterRows: monsterRows.length,
      playerClasses: PLAYER_BATTLE_SPRITE_CLASSES.length,
      playerGenders: PLAYER_BATTLE_SPRITE_GENDERS.length,
      monsterMotionProfiles: monsterMotionProfileRows.length,
      monsterProfileTuningRows: monsterMotionProfileRows.filter((row) => row.signals.length).length,
      monsterEffectModifierProfiles: Object.keys(MONSTER_EFFECT_TYPE_PLACEMENT_MODIFIERS_BY_MOTION_PROFILE).length,
      effectTypes: COMBAT_VFX_PREVIEW_EFFECT_TYPES.length,
      tuningCandidates: tuningCandidates.length,
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
    const effectType = monsterAttackEffectType(monster);
    const profileModifiers = MONSTER_EFFECT_TYPE_PLACEMENT_MODIFIERS_BY_MOTION_PROFILE[preset.motionProfile] || {};
    const effects = Object.fromEntries(
      COMBAT_VFX_PREVIEW_EFFECT_TYPES.map((previewEffectType) => [
        previewEffectType,
        summarizePlacement(monsterAttackEffectPlacement(monster, { effectType: previewEffectType })),
      ]),
    );
    return {
      id: monster.id,
      name: monster.name,
      classId: preset.classId,
      motionProfile: preset.motionProfile,
      sfxProfile: preset.sfxProfile,
      effectType,
      effectModifiers: Object.keys(profileModifiers),
      profilePlacement: summarizePlacement(MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE[preset.motionProfile] || preset.effectPlacement),
      basePlacement: summarizePlacement(monsterAttackEffectPlacement(monster, { effectType })),
      hyperPlacement: summarizePlacement(monsterAttackEffectPlacement(monster, { effectType: "dark", hyperActive: true })),
      effects,
    };
  });
}

function createMonsterMotionProfileRows(monsterRows) {
  const profileGroups = new Map();
  for (const row of monsterRows) {
    const motionProfile = row.motionProfile || "unknown";
    const group = profileGroups.get(motionProfile) || [];
    group.push(row);
    profileGroups.set(motionProfile, group);
  }

  return [...profileGroups.entries()]
    .map(([motionProfile, rows]) => {
      const effectRanges = Object.fromEntries(
        COMBAT_VFX_PREVIEW_EFFECT_TYPES.map((effectType) => [
          effectType,
          summarizePlacementRange(rows.map((row) => row.effects?.[effectType])),
        ]),
      );
      const signals = uniqueValues(rows.flatMap((row) => placementTuningSignals(row.hyperPlacement)));
      return {
        id: motionProfile,
        motionProfile,
        monsterCount: rows.length,
        monsterIds: rows.map((row) => row.id),
        monsterNames: rows.map((row) => row.name || row.id),
        classIds: uniqueValues(rows.map((row) => row.classId)),
        sfxProfiles: uniqueValues(rows.map((row) => row.sfxProfile)),
        defaultEffectTypes: uniqueValues(rows.map((row) => row.effectType)),
        effectModifiers: uniqueValues(rows.flatMap((row) => row.effectModifiers || [])),
        profileRange: summarizePlacementRange(rows.map((row) => row.profilePlacement)),
        baseRange: summarizePlacementRange(rows.map((row) => row.basePlacement)),
        hyperRange: summarizePlacementRange(rows.map((row) => row.hyperPlacement)),
        effectRanges,
        signals,
        priority: signals.length ? tuningPriority(signals) : 0,
      };
    })
    .sort((left, right) => left.motionProfile.localeCompare(right.motionProfile));
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

function summarizePlacementRange(placements = []) {
  const validPlacements = placements.filter((placement) => placement && typeof placement === "object");
  const numbers = (key) => validPlacements.map((placement) => Number(placement[key] || 0)).filter(Number.isFinite);
  const strings = (key) => uniqueValues(validPlacements.map((placement) => String(placement[key] || "")).filter(Boolean));
  return {
    offsetX: numericRange(numbers("offsetX")),
    offsetY: numericRange(numbers("offsetY")),
    textOffsetY: numericRange(numbers("textOffsetY")),
    slashWidth: numericRange(numbers("slashWidth")),
    expandedSlashWidth: numericRange(numbers("expandedSlashWidth")),
    slashHeight: strings("slashHeight"),
    expandedSlashHeight: strings("expandedSlashHeight"),
  };
}

function numericRange(values = []) {
  if (!values.length) return { min: 0, max: 0 };
  return {
    min: Math.min(...values),
    max: Math.max(...values),
  };
}

function uniqueValues(values = []) {
  return [...new Set(values.filter((value) => value !== undefined && value !== null && String(value).length > 0))];
}

function createCombatVfxTuningCandidates(playerRows, monsterRows) {
  const playerCandidates = playerRows
    .map((row) => createTuningCandidate("player", row.id, row.id, "hyper", row.hyperPlacement))
    .filter(Boolean);
  const monsterCandidates = monsterRows
    .map((row) => createTuningCandidate("monster", row.id, row.name || row.id, "hyper", row.hyperPlacement))
    .filter(Boolean);
  return [...playerCandidates, ...monsterCandidates]
    .sort((left, right) => left.priority - right.priority || right.signals.length - left.signals.length || left.id.localeCompare(right.id))
    .slice(0, 8);
}

function createTuningCandidate(kind, targetId, label, stage, placement = {}) {
  const signals = placementTuningSignals(placement);
  if (!signals.length) return null;
  return {
    id: `${kind}:${targetId}:${stage}`,
    kind,
    targetId,
    label,
    stage,
    priority: tuningPriority(signals),
    signals,
    placement: summarizePlacement(placement),
  };
}

function placementTuningSignals(placement = {}) {
  const signals = [];
  if (Number(placement.expandedSlashWidth || 0) >= 400) signals.push("expanded-width-critical");
  else if (Number(placement.expandedSlashWidth || 0) >= 380) signals.push("expanded-width-wide");
  if (Number(placement.slashWidth || 0) >= 230) signals.push("slash-width-wide");
  if (Math.abs(Number(placement.offsetY || 0)) >= 12) signals.push("vertical-offset-high");
  if (Math.abs(Number(placement.offsetX || 0)) >= 12) signals.push("horizontal-offset-high");
  if (Math.abs(Number(placement.textOffsetY || 0)) >= 8) signals.push("text-offset-high");
  return signals;
}

function tuningPriority(signals = []) {
  if (signals.includes("expanded-width-critical")) return 1;
  if (signals.length >= 2) return 2;
  return 3;
}



