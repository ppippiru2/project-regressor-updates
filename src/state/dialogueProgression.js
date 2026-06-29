import { normalizeTutorialFlags } from "./tutorialGuidance.js?v=572";

export function ensureDialogueRunState(state) {
  const run = normalizeRunCount(
    state?.regressionCount ??
      state?.tutorialRun ??
      state?.tutorialFlags?.regressionCount ??
      state?.tutorialFlags?.tutorialRun ??
      1,
  );
  setDialogueRunState(state, run);
  syncDialogueRunUnlockFlags(state);
  return run;
}

export function advanceDialogueRunAfterDefeat(state) {
  const previousRun = ensureDialogueRunState(state);
  const nextRun = Math.max(2, previousRun + 1);
  setDialogueRunState(state, nextRun);
  const flags = syncDialogueRunUnlockFlags(state);
  flags.firstDeathCauseRecorded = true;
  state.firstDeathCauseRecorded = true;
  return {
    previousRun,
    nextRun,
    firstDeath: previousRun <= 1,
  };
}

export function syncDialogueRunUnlockFlags(state) {
  if (!state) return {};
  state.tutorialFlags = normalizeTutorialFlags(state.tutorialFlags);
  const run = normalizeRunCount(
    state.regressionCount ??
      state.tutorialRun ??
      state.tutorialFlags.regressionCount ??
      state.tutorialFlags.tutorialRun ??
      1,
  );
  state.regressionCount = run;
  state.tutorialRun = run;
  state.tutorialFlags.regressionCount = run;
  state.tutorialFlags.tutorialRun = run;
  if (run >= 2) {
    state.tutorialFlags.regressorRecordUnlocked = true;
    state.tutorialFlags.hasSeenGoldenCardNews = true;
    state.regressorRecordUnlocked = true;
    state.hasSeenGoldenCardNews = true;
  }
  return state.tutorialFlags;
}

function setDialogueRunState(state, run) {
  if (!state) return;
  state.tutorialFlags = normalizeTutorialFlags(state.tutorialFlags);
  state.regressionCount = run;
  state.tutorialRun = run;
  state.tutorialFlags.regressionCount = run;
  state.tutorialFlags.tutorialRun = run;
}

function normalizeRunCount(value) {
  const numericValue = Math.floor(Number(value));
  if (!Number.isFinite(numericValue)) return 1;
  return Math.max(1, numericValue);
}
