export const MONSTER_RUNTIME_INTEGRATION_PACK_VERSION = "monster_runtime_integration_pack_v1";

export const MONSTER_RUNTIME_ID_ALIASES = Object.freeze({
  rift_imp_lv1: "shore_imp",
});

export const MONSTER_RUNTIME_MOTION_ID_MAP = Object.freeze({
  enemy_idle_loop_v1: "idle_loop_v1",
  enemy_hit_reaction_v1: "hit_reaction_v1",
  enemy_basic_attack_v1: "basic_attack_v1",
  enemy_down_v1: "down_placeholder_v1",
});

export const MONSTER_RUNTIME_INTEGRATION_PRESETS = Object.freeze({
  shore_imp: Object.freeze({
    sourcePack: MONSTER_RUNTIME_INTEGRATION_PACK_VERSION,
    externalMonsterId: "rift_imp_lv1",
    monsterId: "shore_imp",
    displayNameKey: "monsterRuntimeIntegration.displayNames.riftImpLv1",
    role: "first tutorial enemy / beginner coast enemy",
    placement: Object.freeze({
      cardSlot: "enemy",
      pivot: "foot_center",
      initialScale: 0.62,
      offsetX: 0,
      offsetY: 0,
      cutoffPolicy: "minor_tail_or_claw_allowed",
      expectedRuntimeClass: "enemy_imp",
    }),
    motions: Object.freeze({
      idle: "enemy_idle_loop_v1",
      hit: "enemy_hit_reaction_v1",
      attack: "enemy_basic_attack_v1",
      down: "enemy_down_v1",
    }),
    actions: Object.freeze([
      Object.freeze({
        id: "claw_swipe",
        nameKey: "monsterRuntimeIntegration.actions.clawSwipe",
        type: "basic_attack",
        motion: MONSTER_RUNTIME_MOTION_ID_MAP.enemy_basic_attack_v1,
        target: "player",
        damageType: "physical",
        effectType: "slash",
        sfxProfile: "short_claw",
        primary: true,
      }),
      Object.freeze({
        id: "rift_spark",
        nameKey: "monsterRuntimeIntegration.actions.riftSpark",
        type: "minor_magic_attack",
        motion: MONSTER_RUNTIME_MOTION_ID_MAP.enemy_basic_attack_v1,
        target: "player",
        damageType: "rift",
        effectType: "dark",
        sfxProfile: "dark_slash",
        optional: true,
        useWhen: ["enemyHyperActive"],
      }),
    ]),
    spritePolicy: Object.freeze({
      sourceImageIsComposite: true,
      requiresTransparentSprite: true,
      expectedFolder: "assets/monsters/",
      expectedFiles: Object.freeze([
        "assets/monsters/shore_imp_idle.webp",
        "assets/monsters/shore_imp_attack.webp",
        "assets/monsters/shore_imp_hit.webp",
        "assets/monsters/shore_imp_dead.webp",
      ]),
      noSfxBakedIntoSprite: true,
    }),
    qaChecklist: Object.freeze([
      "transparent-sprite-required",
      "card-layer-fixed",
      "foot-center-pivot",
      "enemy-hit-flash-layer",
      "damage-number-layer",
      "no-sfx-baked-into-sprite",
    ]),
  }),
});

export function normalizeMonsterRuntimeId(monsterOrId) {
  const rawId = typeof monsterOrId === "string" ? monsterOrId : monsterOrId?.id || monsterOrId?.monsterId || "";
  return MONSTER_RUNTIME_ID_ALIASES[rawId] || rawId;
}

export function resolveMonsterRuntimeIntegrationPreset(monsterOrId) {
  return MONSTER_RUNTIME_INTEGRATION_PRESETS[normalizeMonsterRuntimeId(monsterOrId)] || null;
}

export function resolveMonsterRuntimeMotionId(monsterOrId, phase = "attack") {
  const preset = resolveMonsterRuntimeIntegrationPreset(monsterOrId);
  const externalMotionId = preset?.motions?.[phase];
  return MONSTER_RUNTIME_MOTION_ID_MAP[externalMotionId] || "";
}

export function resolveMonsterRuntimeAction(monsterOrId, options = {}) {
  const preset = resolveMonsterRuntimeIntegrationPreset(monsterOrId);
  const actions = preset?.actions || [];
  if (!actions.length) return null;

  if (options.enemyHyperActive) {
    const hyperAction = actions.find((action) => action.useWhen?.includes("enemyHyperActive"));
    if (hyperAction) return hyperAction;
  }

  return actions.find((action) => action.primary) || actions[0] || null;
}
