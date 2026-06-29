export const DEFAULT_KARMA_STATE = Object.freeze({
  value: 0,
  lifetimeEarned: 0,
  lifetimeSpent: 0,
  history: Object.freeze([]),
});

const MAX_KARMA_HISTORY_ENTRIES = 50;

export function normalizeKarmaState(raw) {
  const source = raw && typeof raw === "object" && !Array.isArray(raw) ? raw : {};
  const value = normalizeKarmaAmount(source.value);
  const lifetimeEarned = normalizeKarmaAmount(source.lifetimeEarned);
  const lifetimeSpent = normalizeKarmaAmount(source.lifetimeSpent);
  const history = Array.isArray(source.history)
    ? source.history.map(normalizeKarmaHistoryEntry).filter(Boolean).slice(-MAX_KARMA_HISTORY_ENTRIES)
    : [];

  return {
    value,
    lifetimeEarned,
    lifetimeSpent,
    history,
  };
}

export function ensureKarmaState(state) {
  if (!state || typeof state !== "object") return normalizeKarmaState(null);
  state.karma = normalizeKarmaState(state.karma);
  return state.karma;
}

export function karmaValue(state) {
  return normalizeKarmaAmount(state?.karma?.value ?? state?.karmaValue ?? 0);
}

export function calculateRegressionKarmaGain(state = {}, cause = "regression") {
  let gain = 3;
  if (cause === "first_calamity") gain += 7;
  if (state.tutorialFlags?.goldenCardObtained || state.goldenCardObtained) gain += 2;

  const damageRate = Number(state.tutorialBossDamageRate ?? state.tutorialFlags?.tutorialBossDamageRate ?? 0);
  if (Number.isFinite(damageRate)) {
    if (damageRate >= 0.5) gain += 2;
    if (damageRate >= 0.8) gain += 3;
    if (damageRate >= 1.0) gain += 5;
  }

  return Math.max(0, Math.floor(gain));
}

export function awardRegressionKarma(state, { cause = "regression", reason = cause, createdAt = Date.now() } = {}) {
  const karma = ensureKarmaState(state);
  const amount = calculateRegressionKarmaGain(state, cause);
  if (amount <= 0) {
    return { awarded: false, amount: 0, value: karma.value };
  }

  karma.value += amount;
  karma.lifetimeEarned += amount;
  karma.history.push({
    regressionCount: normalizeRegressionCount(state?.regressionCount ?? state?.tutorialRun ?? 1),
    reason: String(reason || cause || "regression"),
    amount,
    createdAt: normalizeTimestamp(createdAt),
  });
  karma.history = karma.history.slice(-MAX_KARMA_HISTORY_ENTRIES);
  state.karmaValue = karma.value;
  return { awarded: true, amount, value: karma.value };
}

export function canSpendKarma(state, amount) {
  return karmaValue(state) >= normalizeKarmaAmount(amount);
}

export function spendKarma(state, amount, reason = "karma_spend", createdAt = Date.now()) {
  const cost = normalizeKarmaAmount(amount);
  if (cost <= 0) return true;
  if (!canSpendKarma(state, cost)) return false;

  const karma = ensureKarmaState(state);
  karma.value -= cost;
  karma.lifetimeSpent += cost;
  karma.history.push({
    regressionCount: normalizeRegressionCount(state?.regressionCount ?? state?.tutorialRun ?? 1),
    reason: String(reason || "karma_spend"),
    amount: -cost,
    createdAt: normalizeTimestamp(createdAt),
  });
  karma.history = karma.history.slice(-MAX_KARMA_HISTORY_ENTRIES);
  state.karmaValue = karma.value;
  return true;
}

function normalizeKarmaHistoryEntry(entry) {
  if (!entry || typeof entry !== "object" || Array.isArray(entry)) return null;
  const amount = Number(entry.amount);
  return {
    regressionCount: normalizeRegressionCount(entry.regressionCount),
    reason: String(entry.reason || "unknown").slice(0, 80),
    amount: Number.isFinite(amount) ? Math.trunc(amount) : 0,
    createdAt: normalizeTimestamp(entry.createdAt),
  };
}

function normalizeKarmaAmount(value) {
  const amount = Number(value);
  return Number.isFinite(amount) && amount > 0 ? Math.floor(amount) : 0;
}

function normalizeRegressionCount(value) {
  const run = Math.floor(Number(value));
  return Number.isFinite(run) && run > 0 ? run : 1;
}

function normalizeTimestamp(value) {
  const timestamp = Number(value);
  return Number.isFinite(timestamp) && timestamp > 0 ? Math.floor(timestamp) : Date.now();
}
