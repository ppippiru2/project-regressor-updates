export const COMBAT_FRAME_MS = 100;
export const AUTO_RESTART_DELAY_MS = 900;
export const HIT_RESET_MS = 3000;
export const HYP_MAX = 100;

export function createCombatRuntime() {
  return {
    playerAction: 0,
    enemyAction: 0,
    enemyHyp: 0,
    enemyHyperActiveTicks: 0,
    enemyHyperDuration: 0,
    enemyHyperCooldown: 0,
    lastActionId: null,
    actionFlashUntil: 0,
    visibleActionInfoId: null,
    visibleCombatHelpId: null,
    suppressCombatInfoHideUntil: 0,
    lastDefeatedTarget: null,
    lastFrameAt: 0,
    flashUntil: 0,
    hyperEndFlashUntil: 0,
    enemyHyperEndFlashUntil: 0,
  };
}

export function resetCombatRuntime(now = Date.now()) {
  const runtime = createCombatRuntime();
  runtime.lastFrameAt = now;
  return runtime;
}

export function createCombatTarget(monster, stats) {
  return {
    monsterId: monster.id,
    hp: stats.maxHp,
    mp: stats.maxMp,
    isBoss: Boolean(monster.isBoss),
    breakGauge: monster.isBoss ? 100 : 0,
  };
}
