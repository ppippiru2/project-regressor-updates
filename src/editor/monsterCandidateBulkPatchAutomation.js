import { STATIC_ASSET_REGISTRY } from "../assets/assetRegistry.js?v=459";
import {
  MONSTER_BATTLE_SPRITE_PRESETS,
  MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE,
  MONSTER_EFFECT_TYPE_PLACEMENT_MODIFIERS_BY_MOTION_PROFILE,
  resolveMonsterBattleSpritePreset,
} from "../config/monsterBattleSpritePresets.js?v=459";
import { MONSTER_COMBAT_POSES } from "../config/monsterCombatDisplay.js?v=459";
import { MONSTER_BALANCE_DATA } from "../balance/monsterBalanceData.js?v=459";
import {
  candidateMonsterRewardLinkFor,
  TUTORIAL_MONSTER_POOL_DATA,
  TUTORIAL_MONSTER_POOL_REGIONS,
  TUTORIAL_MONSTER_POOL_VERSION,
} from "../balance/monsterCandidatePool.js?v=459";
import { monsters, regions } from "../data/worldData.js?v=459";

export const MONSTER_CANDIDATE_BULK_PATCH_AUTOMATION_VERSION = "monster-candidate-bulk-patch-automation-v1";

export const MONSTER_CANDIDATE_BULK_PATCH_SURFACES = Object.freeze([
  {
    id: "monster-balance-entry",
    file: "src/balance/monsterBalanceData.js",
    output: "monsterBalanceEntry",
  },
  {
    id: "region-monster-pool",
    file: "src/data/worldData.js",
    output: "worldDataPatch",
  },
  {
    id: "monster-sprite-slot-bucket",
    file: "data/asset-slots.json",
    output: "spriteSlotBucketPatch",
  },
  {
    id: "monster-asset-data-bucket",
    file: "src/assets/assetData.js",
    output: "assetDataMonsterBucket",
  },
  {
    id: "monster-runtime-preset",
    file: "src/config/monsterBattleSpritePresets.js",
    output: "battleSpritePresetDraft",
  },
  {
    id: "monster-runtime-css",
    file: "styles.css",
    output: "runtimeCssSelector",
  },
  {
    id: "editor-manifest-counts",
    file: "data/editor-manifest.json",
    output: "manifestCountPatch",
  },
]);

export function createMonsterCandidateBulkPatchAutomationPreview() {
  const liveMonsterById = new Map(monsters.map((monster) => [monster.id, monster]));
  const liveBalanceById = new Map(MONSTER_BALANCE_DATA.map((monster) => [monster.id, monster]));
  const regionById = new Map(regions.map((region) => [region.id, region]));
  const candidateRegionById = new Map(TUTORIAL_MONSTER_POOL_REGIONS.map((pool) => [pool.regionId, pool]));
  const rows = TUTORIAL_MONSTER_POOL_DATA.map((candidate) =>
    createBulkAutomationRow({
      candidate,
      liveMonster: liveMonsterById.get(candidate.id) || null,
      liveBalance: liveBalanceById.get(candidate.id) || null,
      region: regionById.get(candidate.regionId) || null,
      candidateRegion: candidateRegionById.get(candidate.regionId) || null,
    }),
  );
  const coveredSurfaceCount = rows.reduce((sum, row) => sum + row.surfaces.filter((surface) => surface.state === "covered").length, 0);
  const totalSurfaceCount = rows.length * MONSTER_CANDIDATE_BULK_PATCH_SURFACES.length;

  return {
    version: MONSTER_CANDIDATE_BULK_PATCH_AUTOMATION_VERSION,
    sourceVersion: TUTORIAL_MONSTER_POOL_VERSION,
    writesGameData: false,
    templateInputFields: [
      "id",
      "regionId",
      "level",
      "stats",
      "tags",
      "representativeMonsterId",
      "rewardLink",
    ],
    surfaces: MONSTER_CANDIDATE_BULK_PATCH_SURFACES,
    summary: {
      candidateCount: rows.length,
      liveCoveredCount: rows.filter((row) => row.isLive).length,
      pendingCandidateCount: rows.filter((row) => !row.isLive).length,
      surfaceCount: MONSTER_CANDIDATE_BULK_PATCH_SURFACES.length,
      generatedSurfaceCount: totalSurfaceCount,
      coveredSurfaceCount,
      draftSurfaceCount: totalSurfaceCount - coveredSurfaceCount,
      fullyCoveredCount: rows.filter((row) => row.coverageState === "fully-covered").length,
      needsDraftCount: rows.filter((row) => row.coverageState !== "fully-covered").length,
    },
    rows,
  };
}

function createBulkAutomationRow({ candidate, liveMonster, liveBalance, region, candidateRegion }) {
  const rewardLink = candidateMonsterRewardLinkFor(candidate.id);
  const representativeMonster = MONSTER_BALANCE_DATA.find((monster) => monster.id === candidate.representativeMonsterId);
  const liveOrDraftMonster = liveMonster || {
    id: candidate.id,
    name: candidate.id,
    regionId: candidate.regionId,
    level: candidate.level,
    stats: candidate.stats,
    exp: scaleReward(representativeMonster?.exp, representativeMonster?.level, candidate.level, 0.35),
    gold: scaleReward(representativeMonster?.gold, representativeMonster?.level, candidate.level, 0.25),
  };
  const preset = MONSTER_BATTLE_SPRITE_PRESETS[candidate.id] || null;
  const sourcePreset = resolveMonsterBattleSpritePreset({ id: candidate.representativeMonsterId });
  const spriteBucket = STATIC_ASSET_REGISTRY?.slots?.slots?.monster?.byMonsterId?.[candidate.id] || null;
  const proposedMonsterPool = proposedMonsterPoolFor(region, candidate, candidateRegion);
  const battleSpritePresetDraft = createBattleSpritePresetDraft(candidate, preset, sourcePreset);
  const surfaces = [
    surfaceState("monster-balance-entry", Boolean(liveBalance), liveBalance ? "covered" : "draft-ready"),
    surfaceState("region-monster-pool", isCandidateInRegionPool(region, candidate.id), region ? "draft-ready" : "blocked"),
    surfaceState("monster-sprite-slot-bucket", Boolean(spriteBucket), "draft-ready"),
    surfaceState("monster-asset-data-bucket", Boolean(spriteBucket), "draft-ready"),
    surfaceState("monster-runtime-preset", Boolean(preset), "draft-ready"),
    surfaceState("monster-runtime-css", Boolean(preset), "draft-ready"),
    surfaceState("editor-manifest-counts", Boolean(liveMonster), "draft-ready"),
  ];
  const coverageState = surfaces.every((surface) => surface.state === "covered") ? "fully-covered" : "needs-draft";

  return {
    id: candidate.id,
    name: liveMonster?.name || candidate.id,
    regionId: candidate.regionId,
    representativeMonsterId: candidate.representativeMonsterId,
    isLive: Boolean(liveMonster),
    isBoss: Boolean(candidate.isBoss),
    coverageState,
    input: {
      level: candidate.level,
      stats: candidate.stats,
      tags: candidate.tags || [],
      rewardLink,
    },
    monsterBalanceEntry: {
      id: candidate.id,
      regionId: candidate.regionId,
      level: candidate.level,
      stats: candidate.stats,
      exp: liveOrDraftMonster.exp,
      gold: liveOrDraftMonster.gold,
      dropTable: liveMonster?.dropTable || createRewardLinkDropTable(rewardLink),
    },
    worldDataPatch: {
      action: candidate.isBoss ? "keep-boss-field" : "add-alternate-encounter-pool",
      regionId: candidate.regionId,
      keepsRepresentativeMonsterId: region?.monsterId || candidate.representativeMonsterId,
      keepsBossMonsterId: region?.bossId || "",
      proposedMonsterPool,
    },
    spriteSlotBucketPatch: {
      path: `slots.monster.byMonsterId.${candidate.id}`,
      value: spriteBucket || {},
      poseKeys: [...MONSTER_COMBAT_POSES],
    },
    assetDataMonsterBucket: {
      path: `ASSET_SLOTS.slots.monster.byMonsterId.${candidate.id}`,
      value: spriteBucket || {},
    },
    battleSpritePresetDraft,
    runtimeCssSelector: `.combatant.enemy[data-runtime-sprite-class="${battleSpritePresetDraft.classId}"]`,
    manifestCountPatch: {
      liveMonsterCountDelta: liveMonster ? 0 : 1,
      spriteSlotDelta: liveMonster ? 0 : MONSTER_COMBAT_POSES.length,
      vfxMotionProfileDelta: preset ? 0 : 1,
    },
    surfaces,
  };
}

function createBattleSpritePresetDraft(candidate, preset, sourcePreset) {
  const classId = preset?.classId || `enemy_${candidate.id.replaceAll("-", "_")}`;
  const motionProfile = preset?.motionProfile || sourcePreset.motionProfile || "default_enemy_runtime";
  return {
    monsterId: candidate.id,
    classId,
    motionProfile,
    sfxProfile: preset?.sfxProfile || sourcePreset.sfxProfile || "impact_near",
    defaultScale: preset?.defaultScale ?? 0.96,
    offsetX: preset?.offsetX ?? 0,
    offsetY: preset?.offsetY ?? 0,
    pivotX: preset?.pivotX ?? 0.5,
    pivotY: preset?.pivotY ?? 1,
    motionSafeMargin: preset?.motionSafeMargin || { x: 0.1, y: 0.08 },
    effectPlacementSource: Object.hasOwn(MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE, motionProfile) ? motionProfile : "default_enemy_runtime",
    effectModifierReady: Object.hasOwn(MONSTER_EFFECT_TYPE_PLACEMENT_MODIFIERS_BY_MOTION_PROFILE, motionProfile),
  };
}

function createRewardLinkDropTable(rewardLink) {
  if (!rewardLink) return [];
  return [
    rewardLink.codexFragmentId ? { itemId: rewardLink.codexFragmentId, chance: 0.08 } : null,
    ...(rewardLink.materialItemIds || []).map((itemId) => ({ itemId, chance: 0.04 })),
    ...(rewardLink.skillItemIds || []).map((itemId) => ({ itemId, chance: 0.025 })),
  ].filter(Boolean);
}

function proposedMonsterPoolFor(region, candidate, candidateRegion) {
  if (candidate?.isBoss) return Array.isArray(region?.monsterPool) ? region.monsterPool : [];
  return [...new Set([
    region?.monsterId,
    ...(Array.isArray(region?.monsterPool) ? region.monsterPool : []),
    ...(Array.isArray(candidateRegion?.monsterIds) ? candidateRegion.monsterIds.filter((monsterId) => monsterId !== candidateRegion.bossMonsterId) : []),
    candidate?.id,
  ].filter(Boolean))];
}

function isCandidateInRegionPool(region, candidateId) {
  if (!region) return false;
  return region.monsterId === candidateId || region.bossId === candidateId || (region.monsterPool || []).includes(candidateId);
}

function surfaceState(id, covered, draftState) {
  return {
    id,
    state: covered ? "covered" : draftState,
  };
}

function scaleReward(value, sourceLevel, candidateLevel, weight) {
  const baseValue = Number(value || 1);
  const levelDelta = Math.max(0, Number(candidateLevel || 0) - Number(sourceLevel || 0));
  return Math.max(1, Math.round(baseValue * (1 + levelDelta * weight)));
}
