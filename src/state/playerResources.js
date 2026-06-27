import { t } from "../localization/index.js?v=423";

function defaultClamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

function finiteOrDefault(value, fallback) {
  return Number.isFinite(value) ? value : fallback;
}

export function restorePlayerResources(player, derivedStats) {
  player.hp = derivedStats.maxHp;
  player.mp = derivedStats.maxMp;
}

export function applyRestRecovery(player, derivedStats) {
  restorePlayerResources(player, derivedStats);
  return t("stateMessages.restRecovered");
}

export function normalizePlayerResources(player, derivedStats, options = {}) {
  const clampValue = options.clampValue || defaultClamp;
  const playerHp = finiteOrDefault(player.hp, derivedStats.maxHp);
  player.hp = clampValue(playerHp, 0, derivedStats.maxHp);
  if (!options.inCombat && player.hp <= 0) {
    player.hp = derivedStats.maxHp;
  }

  const playerMp = finiteOrDefault(player.mp, derivedStats.maxMp);
  player.mp = clampValue(playerMp, 0, derivedStats.maxMp);
  if (!options.inCombat && player.mp <= 0) {
    player.mp = derivedStats.maxMp;
  }
}

export function normalizeTargetResources(target, targetStats, options = {}) {
  const clampValue = options.clampValue || defaultClamp;
  const targetHp = finiteOrDefault(target.hp, targetStats.maxHp);
  const targetMp = finiteOrDefault(target.mp, targetStats.maxMp);
  target.hp = clampValue(targetHp, 0, targetStats.maxHp);
  target.mp = clampValue(targetMp, 0, targetStats.maxMp);
}

export function normalizeHyperRuntime(state, options = {}) {
  const clampValue = options.clampValue || defaultClamp;
  state.hyp = clampValue(state.hyp || 0, 0, options.hypMax);
  state.hyperActiveTicks = Math.max(0, state.hyperActiveTicks || 0);
  state.hyperDuration = Math.max(0, state.hyperDuration || 0);
  state.hyperCooldown = Math.max(0, state.hyperCooldown || 0);
}

export function shouldResetHitCombo(state, options = {}) {
  const now = options.now || Date.now();
  return now - (state.lastHitAt || 0) > options.hitResetMs && state.hitCount > 0;
}
