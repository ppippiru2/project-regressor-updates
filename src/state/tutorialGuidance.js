import { t } from "../localization/index.js?v=386";

export const DEFAULT_TUTORIAL_FLAGS = Object.freeze({
  firstCombatGuideShown: false,
});

export function createTutorialFlags(overrides = {}) {
  return {
    ...DEFAULT_TUTORIAL_FLAGS,
    ...validTutorialFlagOverrides(overrides),
  };
}

export function normalizeTutorialFlags(savedFlags, { assumeSeen = false } = {}) {
  if (!savedFlags || typeof savedFlags !== "object" || Array.isArray(savedFlags)) {
    return createTutorialFlags({ firstCombatGuideShown: assumeSeen });
  }
  return createTutorialFlags(savedFlags);
}

export function claimFirstCombatGuide(state, { regionId = "", firstRegionId = "" } = {}) {
  state.tutorialFlags = normalizeTutorialFlags(state.tutorialFlags);
  if (state.tutorialFlags.firstCombatGuideShown) return [];

  state.tutorialFlags.firstCombatGuideShown = true;
  if (firstRegionId && regionId && regionId !== firstRegionId) return [];

  return [
    t("stateMessages.firstCombatWarning"),
    t("stateMessages.firstCombatBasicGuide"),
    t("stateMessages.firstCombatSkillGuide"),
  ];
}

function validTutorialFlagOverrides(source) {
  return Object.fromEntries(
    Object.entries(DEFAULT_TUTORIAL_FLAGS).map(([key, fallback]) => [
      key,
      typeof source[key] === "boolean" ? source[key] : fallback,
    ])
  );
}
