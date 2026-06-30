export const TUTORIAL_ROUTE_STATE_FLAGS = Object.freeze([
  "buriedCacheReturnRecorded",
  "sealedBoxRecordUnlocked",
  "tutorialSecondWarden50Reached",
  "tutorialThirdPatternFocusSeen",
  "tutorialThirdWarden80Reached",
  "tutorialFourthFinalRouteSeen",
  "tutorialFourthWarden100Reached",
  "tutorialBossDamageRate20Reached",
  "tutorialBossDamageRate50Reached",
  "tutorialBossDamageRate80Reached",
  "tutorialBossDamageRate100Reached",
  "tutorialEvaluationGradeC",
  "tutorialEvaluationGradeB",
  "tutorialEvaluationGradeA",
  "tutorialEvaluationGradeS",
  "tutorialLoopVariantASeen",
  "tutorialLoopVariantBSeen",
  "tutorialLoopVariantCSeen",
  "tutorialLoopVariantDSeen",
]);

export function createTutorialRouteFlagState(state = {}) {
  const flags = state.tutorialFlags && typeof state.tutorialFlags === "object" ? state.tutorialFlags : {};
  return Object.fromEntries(TUTORIAL_ROUTE_STATE_FLAGS.map((key) => [key, state?.[key] === true || flags?.[key] === true]));
}
