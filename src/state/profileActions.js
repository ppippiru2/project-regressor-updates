import { INITIAL_CREATION_STAT_BALANCE } from "../balance/playerGrowthBalance.js?v=336";
import { normalizePlayerProfile } from "./save.js";
import { buildPlayerProfileInput } from "./profile.js?v=336";
import { DEFAULT_PORTRAIT_FRAME, normalizePortraitFrame } from "./portraitFrame.js?v=336";
import { t, tf } from "../localization/index.js?v=336";

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

export function applyInitialCreationStats(
  state,
  formData,
  primaryStats,
  {
    initialStatTotal = INITIAL_CREATION_STAT_BALANCE.total,
    fallbackStatValue = INITIAL_CREATION_STAT_BALANCE.fallbackValue,
  } = {}
) {
  const parsedStats = Object.fromEntries(
    primaryStats.map((stat) => [stat, Math.floor(Number(formData.get(`stat_${stat}`)))])
  );
  const isValid =
    primaryStats.every((stat) => Number.isFinite(parsedStats[stat]) && parsedStats[stat] >= 1) &&
    primaryStats.reduce((total, stat) => total + parsedStats[stat], 0) === initialStatTotal;

  state.player.level = 1;
  state.player.exp = 0;
  state.player.freePoints = 0;
  state.player.pendingStatAllocations = {};
  state.player.stats = isValid
    ? parsedStats
    : Object.fromEntries(primaryStats.map((stat) => [stat, fallbackStatValue]));
  state.player.hp = 0;
  state.player.mp = null;
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
