import { PASSIVE_RECOVERY_BALANCE } from "../balance/recoveryBalance.js?v=522";

export const IDLE_RECOVERY_FRAME_MS = PASSIVE_RECOVERY_BALANCE.idleFrameMs;

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}

export function enterRestMode(state) {
  state.resting = true;
  state.inCombat = false;
  state.target = null;
}

export function leaveRestMode(state) {
  if (!state.resting) return false;
  state.resting = false;
  return true;
}

export function applyPassiveRecovery(player, derivedStats, elapsedSeconds, options = {}) {
  const maxHp = derivedStats.maxHp;
  const maxMp = derivedStats.maxMp;
  const beforeHp = Number.isFinite(player.hp) ? player.hp : maxHp;
  const beforeMp = Number.isFinite(player.mp) ? player.mp : maxMp;
  const multiplier = options.resting
    ? PASSIVE_RECOVERY_BALANCE.restMultiplier
    : PASSIVE_RECOVERY_BALANCE.idleMultiplier;

  const hpGain = Math.max(0, derivedStats.hpRegen || 0) * multiplier * elapsedSeconds;
  const mpGain = Math.max(0, derivedStats.mpRegen || 0) * multiplier * elapsedSeconds;
  const afterHp = clamp(beforeHp + hpGain, 0, maxHp);
  const afterMp = clamp(beforeMp + mpGain, 0, maxMp);

  player.hp = afterHp;
  player.mp = afterMp;

  return {
    changed: afterHp !== beforeHp || afterMp !== beforeMp,
    displayChanged: Math.floor(afterHp) !== Math.floor(beforeHp) || Math.floor(afterMp) !== Math.floor(beforeMp),
    full: afterHp >= maxHp && afterMp >= maxMp,
  };
}

export function passiveRecoveryElapsedSeconds(lastFrameAt, now = Date.now()) {
  const elapsedSeconds = (now - lastFrameAt) / 1000;
  return clamp(
    elapsedSeconds,
    PASSIVE_RECOVERY_BALANCE.minElapsedSeconds,
    PASSIVE_RECOVERY_BALANCE.maxElapsedSeconds
  );
}



