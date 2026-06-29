export const TUTORIAL_FORGOTTEN_REMNANT_EVENT_ID = "tutorial_1st_mine_06_forgotten_god_remnant";

export const TUTORIAL_UNLOCK_ACCESS = Object.freeze({
  locked: "locked",
  damagedPartial: "damaged_partial",
  unlocked: "unlocked",
});

export function createTutorialUnlockState(state = {}) {
  const flags = normalizeObject(state.tutorialFlags);
  const regressionCount = normalizeRunCount(
    state.regressionCount ?? state.tutorialRun ?? flags.regressionCount ?? flags.tutorialRun ?? 1,
  );
  const run2Plus = regressionCount >= 2;
  const forgottenGodRemnantContacted =
    state.forgottenGodRemnantContacted === true ||
    flags.forgottenGodRemnantContacted === true ||
    flags.forgottenRemnantContacted === true ||
    hasEventId(flags.shownTutorialEventIds, TUTORIAL_FORGOTTEN_REMNANT_EVENT_ID) ||
    hasEventId(flags.resolvedTutorialEventIds, TUTORIAL_FORGOTTEN_REMNANT_EVENT_ID);
  const codexAccess = run2Plus
    ? TUTORIAL_UNLOCK_ACCESS.unlocked
    : forgottenGodRemnantContacted
      ? TUTORIAL_UNLOCK_ACCESS.damagedPartial
      : TUTORIAL_UNLOCK_ACCESS.locked;

  return {
    regressionCount,
    run2Plus,
    forgottenGodRemnantContacted,
    damagedRecordVisible: forgottenGodRemnantContacted,
    codexAccess,
    codexProgressReadable: codexAccess !== TUTORIAL_UNLOCK_ACCESS.locked,
    codexUnlocked: codexAccess === TUTORIAL_UNLOCK_ACCESS.unlocked,
    scrapbookUnlocked: run2Plus,
    regressorRecordUnlocked: run2Plus,
    regressorRecordNameVisible: run2Plus,
    traitCardResyncAvailable: run2Plus,
    goldenCardKnown: run2Plus,
    goldenCardObtained: run2Plus && Boolean(state.goldenCardObtained || flags.goldenCardObtained),
  };
}

export function canReadCodexProgress(state = {}) {
  return createTutorialUnlockState(state).codexProgressReadable;
}

export function canOpenScrapbook(state = {}) {
  return createTutorialUnlockState(state).scrapbookUnlocked;
}

export function canShowRegressorRecord(state = {}) {
  return createTutorialUnlockState(state).regressorRecordUnlocked;
}

function normalizeObject(value) {
  return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}

function normalizeRunCount(value) {
  const numericValue = Math.floor(Number(value));
  if (!Number.isFinite(numericValue)) return 1;
  return Math.max(1, numericValue);
}

function hasEventId(value, eventId) {
  if (!Array.isArray(value)) return false;
  return value.includes(eventId);
}

