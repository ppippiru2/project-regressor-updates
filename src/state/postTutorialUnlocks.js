export const POST_TUTORIAL_WORLD_UNLOCK_FLAGS = Object.freeze([
  "tutorialClearedRun1",
  "postTutorialWorldUnlocked",
  "realityReturned",
  "hunterAssociationUnlocked",
  "hunterRegistrationUnlocked",
  "fourMajorGuildsNewsSeen",
  "hunterBoardUnlocked",
  "goldenCardNewsUnlocked",
  "marketRecordsUnlocked",
  "towerUnlocked",
  "gateUnlocked",
  "firstCalamityDeathForecastUnlocked",
]);

export function createPostTutorialWorldUnlockState(state = {}) {
  const flags = state.tutorialFlags && typeof state.tutorialFlags === "object" ? state.tutorialFlags : {};
  return {
    tutorialClearedRun1: readFlag(state, flags, "tutorialClearedRun1"),
    postTutorialWorldUnlocked: readFlag(state, flags, "postTutorialWorldUnlocked"),
    realityReturned: readFlag(state, flags, "realityReturned"),
    hunterAssociationUnlocked: readFlag(state, flags, "hunterAssociationUnlocked"),
    hunterRegistrationUnlocked: readFlag(state, flags, "hunterRegistrationUnlocked"),
    fourMajorGuildsNewsSeen: readFlag(state, flags, "fourMajorGuildsNewsSeen"),
    hunterBoardUnlocked: readFlag(state, flags, "hunterBoardUnlocked"),
    goldenCardNewsUnlocked: readFlag(state, flags, "goldenCardNewsUnlocked"),
    marketRecordsUnlocked: readFlag(state, flags, "marketRecordsUnlocked"),
    towerUnlocked: readFlag(state, flags, "towerUnlocked"),
    gateUnlocked: readFlag(state, flags, "gateUnlocked"),
    firstCalamityDeathForecastUnlocked: readFlag(state, flags, "firstCalamityDeathForecastUnlocked"),
  };
}

function readFlag(state, flags, key) {
  return state?.[key] === true || flags?.[key] === true;
}
