export const MONSTER_COMBAT_POSES = ["idle", "attack", "hit", "dead"];

export const MONSTER_DEFAULT_SPRITE_SLOT_BY_POSE = {
  idle: "defaultIdle",
  attack: "defaultAttack",
  hit: "defaultHit",
  dead: "defaultDead",
};

export function monsterSpriteSlotKeyForPose(pose = "idle") {
  return MONSTER_DEFAULT_SPRITE_SLOT_BY_POSE[pose] || MONSTER_DEFAULT_SPRITE_SLOT_BY_POSE.idle;
}

export function monsterCombatDisplayTier(monster) {
  return monster?.isBoss ? "boss" : "normal";
}
