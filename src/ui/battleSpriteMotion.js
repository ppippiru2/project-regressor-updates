export const BATTLE_SPRITE_MOTION_IDS = Object.freeze({
  idle: "idle_loop_v1",
  basicAttack: "basic_attack_v1",
  hitReaction: "hit_reaction_v1",
  downPlaceholder: "down_placeholder_v1",
  skillCast: "skill_cast_v1",
});

const MOTION_DURATIONS_MS = Object.freeze({
  [BATTLE_SPRITE_MOTION_IDS.basicAttack]: 520,
  [BATTLE_SPRITE_MOTION_IDS.hitReaction]: 300,
  [BATTLE_SPRITE_MOTION_IDS.downPlaceholder]: 500,
  [BATTLE_SPRITE_MOTION_IDS.skillCast]: 560,
});

const MOTION_CLASS_PREFIX = "sprite-motion-";
const MOTION_SIDES = ["player", "enemy"];
const motionClassNames = Object.values(BATTLE_SPRITE_MOTION_IDS).map((id) => `${MOTION_CLASS_PREFIX}${cssSafeMotionId(id)}`);

export function triggerBattleSpriteMotion(combatRuntime, side, motionId, options = {}, now = Date.now()) {
  if (!combatRuntime || !MOTION_SIDES.includes(side)) return;
  const durationMs = MOTION_DURATIONS_MS[motionId];
  if (!durationMs) return;

  const keyPrefix = side === "player" ? "playerSpriteMotion" : "enemySpriteMotion";
  combatRuntime[`${keyPrefix}Id`] = motionId;
  combatRuntime[`${keyPrefix}StartedAt`] = now;
  combatRuntime[`${keyPrefix}Until`] = now + durationMs;
  combatRuntime[`${keyPrefix}Sequence`] = (Number(combatRuntime[`${keyPrefix}Sequence`]) || 0) + 1;
  combatRuntime[`${keyPrefix}Sfx`] = options.sfxId || null;
}

export function clearBattleSpriteMotions(combatRuntime) {
  if (combatRuntime) {
    for (const side of MOTION_SIDES) {
      const keyPrefix = side === "player" ? "playerSpriteMotion" : "enemySpriteMotion";
      combatRuntime[`${keyPrefix}Id`] = null;
      combatRuntime[`${keyPrefix}StartedAt`] = 0;
      combatRuntime[`${keyPrefix}Until`] = 0;
      combatRuntime[`${keyPrefix}Sfx`] = null;
    }
  }

  for (const side of MOTION_SIDES) {
    const combatant = combatantForSide(side);
    if (!combatant) continue;
    clearCombatantMotion(combatant);
  }
}

export function syncBattleSpriteMotions(combatRuntime, now = Date.now()) {
  for (const side of MOTION_SIDES) {
    syncBattleSpriteMotionSide(combatRuntime, side, now);
  }
}

function syncBattleSpriteMotionSide(combatRuntime, side, now) {
  const combatant = combatantForSide(side);
  if (!combatant || !combatRuntime) return;

  const keyPrefix = side === "player" ? "playerSpriteMotion" : "enemySpriteMotion";
  const motionId = combatRuntime[`${keyPrefix}Id`];
  const motionUntil = Number(combatRuntime[`${keyPrefix}Until`]) || 0;
  const motionSequence = String(Number(combatRuntime[`${keyPrefix}Sequence`]) || 0);
  const sfxId = combatRuntime[`${keyPrefix}Sfx`];

  if (!motionId || now >= motionUntil) {
    clearCombatantMotion(combatant);
    if (now >= motionUntil) {
      combatRuntime[`${keyPrefix}Id`] = null;
      combatRuntime[`${keyPrefix}StartedAt`] = 0;
      combatRuntime[`${keyPrefix}Sfx`] = null;
    }
    return;
  }

  const className = `${MOTION_CLASS_PREFIX}${cssSafeMotionId(motionId)}`;
  if (combatant.dataset.runtimeSpriteMotionSequence !== motionSequence) {
    combatant.classList.remove(...motionClassNames);
    combatant.dataset.runtimeSpriteMotion = motionId;
    combatant.dataset.runtimeSpriteMotionSequence = motionSequence;
    if (sfxId) {
      combatant.dataset.runtimeSpriteSfx = sfxId;
    } else {
      delete combatant.dataset.runtimeSpriteSfx;
    }
    void combatant.offsetWidth;
    combatant.classList.add(className);
    return;
  }

  combatant.dataset.runtimeSpriteMotion = motionId;
  combatant.classList.add(className);
}

function clearCombatantMotion(combatant) {
  combatant.classList.remove(...motionClassNames);
  delete combatant.dataset.runtimeSpriteMotion;
  delete combatant.dataset.runtimeSpriteMotionSequence;
  delete combatant.dataset.runtimeSpriteSfx;
}

function combatantForSide(side) {
  return document.querySelector(`.combatant.${side === "player" ? "player" : "enemy"}`);
}

function cssSafeMotionId(motionId) {
  return String(motionId || "").replace(/_/g, "-");
}
