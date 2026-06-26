export function restartIntervalTimer(currentTimer, callback, intervalMs) {
  if (currentTimer) clearInterval(currentTimer);
  return setInterval(callback, intervalMs);
}

export function restartTimeoutTimer(currentTimer, callback, delayMs) {
  if (currentTimer) clearTimeout(currentTimer);
  return setTimeout(callback, delayMs);
}

export function clearIntervalTimer(timer) {
  if (timer) clearInterval(timer);
  return null;
}

export function clearTimeoutTimer(timer) {
  if (timer) clearTimeout(timer);
  return null;
}
