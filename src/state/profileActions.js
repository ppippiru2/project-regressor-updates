import { normalizePlayerProfile } from "./save.js";
import { buildPlayerProfileInput } from "./profile.js?v=280";
import { DEFAULT_PORTRAIT_FRAME, normalizePortraitFrame } from "./portraitFrame.js?v=280";
import { t, tf } from "../localization/index.js?v=280";

export function createCharacterProfile(formData, defaultPlayerProfile) {
  return normalizePlayerProfile(
    buildPlayerProfileInput(formData, defaultPlayerProfile),
    defaultPlayerProfile.name
  );
}

export function applyCharacterProfile(state, profile) {
  state.playerProfile = profile;
  state.player.name = profile.name;
  return tf("stateMessages.firstSync", { name: profile.name, alignment: profile.alignment });
}

export function updatePlayerProfileSettings(state, { name, portraitDataUrl, portraitFrame, clearPortrait = false } = {}) {
  const currentProfile = state.playerProfile || {};
  const nextProfile = normalizePlayerProfile(
    {
      ...currentProfile,
      created: true,
      name: name ?? currentProfile.name,
      portraitDataUrl: clearPortrait ? "" : portraitDataUrl ?? currentProfile.portraitDataUrl,
      portraitFrame: clearPortrait
        ? DEFAULT_PORTRAIT_FRAME
        : portraitFrame
          ? normalizePortraitFrame(portraitFrame)
          : currentProfile.portraitFrame,
    },
    currentProfile.name || state.player?.name || t("saveSlots.fallbackName")
  );
  state.playerProfile = nextProfile;
  state.player.name = nextProfile.name;
  return t("stateMessages.profileUpdated");
}
