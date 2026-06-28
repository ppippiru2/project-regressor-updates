import { BREAK_GAUGE_BALANCE, COMBAT_RUNTIME_BALANCE } from "../balance/combatBalance.js?v=523";

export const COMBAT_FRAME_MS = COMBAT_RUNTIME_BALANCE.frameMs;
export const AUTO_RESTART_DELAY_MS = COMBAT_RUNTIME_BALANCE.autoRestartDelayMs;
export const HIT_RESET_MS = COMBAT_RUNTIME_BALANCE.hitResetMs;
export const HYP_MAX = COMBAT_RUNTIME_BALANCE.hyperMax;

export function createCombatRuntime() {
  return {
    playerAction: 0,
    enemyAction: 0,
    battlePhase: "idle",
    inputLocked: false,
    turnCount: 0,
    lastDamage: 0,
    battleLoopSequence: 0,
    actionCooldowns: {},
    enemyHyp: 0,
    enemyHyperActiveTicks: 0,
    enemyHyperDuration: 0,
    enemyHyperCooldown: 0,
    lastActionId: null,
    actionFlashUntil: 0,
    lastAutoWeaknessPriorityKey: null,
    visibleActionInfoId: null,
    visibleCombatHelpId: null,
    suppressCombatInfoHideUntil: 0,
    lastDefeatedTarget: null,
    lastFrameAt: 0,
    flashUntil: 0,
    hyperEndFlashUntil: 0,
    enemyHyperEndFlashUntil: 0,
    playerSpriteMotionId: null,
    playerSpriteMotionUntil: 0,
    playerSpriteMotionSequence: 0,
    playerSpriteMotionSfx: null,
    enemySpriteMotionId: null,
    enemySpriteMotionUntil: 0,
    enemySpriteMotionSequence: 0,
    enemySpriteMotionSfx: null,
  };
}

export function resetCombatRuntime(now = Date.now()) {
  const runtime = createCombatRuntime();
  runtime.lastFrameAt = now;
  return runtime;
}

export function createCombatTarget(monster, stats) {
  const breakGauge = monster.isBoss ? BREAK_GAUGE_BALANCE.bossInitialGauge : BREAK_GAUGE_BALANCE.normalInitialGauge;
  return {
    monsterId: monster.id,
    hp: stats.maxHp,
    mp: stats.maxMp,
    isBoss: Boolean(monster.isBoss),
    breakGauge,
    breakGaugeMax: breakGauge,
    weaknessUntil: 0,
    weaknessStrikeCount: 0,
  };
}



