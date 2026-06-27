import {
  DEFAULT_DEVELOPER_OPTIONS,
  normalizeDeveloperOptions,
} from "./developerOptions.js?v=376";
import { DEFAULT_PORTRAIT_FRAME, normalizePortraitFrame } from "./portraitFrame.js?v=376";
import { t, tf } from "../localization/index.js?v=376";

export { DEFAULT_DEVELOPER_OPTIONS } from "./developerOptions.js?v=376";

const STORAGE_KEY = "project_regressor_mvp_save";
const UI_STORAGE_KEY = "project_regressor_ui_state";

export class SavePayloadError extends Error {
  constructor(message) {
    super(message);
    this.name = "SavePayloadError";
  }
}

export const DEFAULT_COMBAT_FEEDBACK = {
  hit: true,
  damage: true,
  critical: true,
  miss: true,
  shake: true,
  attackEffect: true,
};

export const DEFAULT_COMBAT_VIEW = {
  stageCards: true,
  expandedAttackEffects: true,
  combatLogColors: true,
  resourcePercentText: false,
  nodeTypeColors: true,
  touchDoubleTapActions: false,
  fieldInfoTooltips: true,
};

export const DEFAULT_AUDIO_SETTINGS = {
  bgmVolume: 50,
  sfxVolume: 70,
};

export const DEFAULT_PLAYER_PROFILE = {
  created: false,
  name: t("saveDefaults.playerName"),
  age: 20,
  gender: t("saveDefaults.gender"),
  country: t("saveDefaults.country"),
  height: 175,
  weight: 70,
  job: t("saveDefaults.job"),
  title: t("saveDefaults.title"),
  organization: t("saveDefaults.organization"),
  alignment: t("saveDefaults.alignment"),
  portraitDataUrl: "",
  portraitFrame: { ...DEFAULT_PORTRAIT_FRAME },
};

export const DEFAULT_ACTIVE_SKILL_LOADOUT_ID = "slot1";
export const MAX_SKILL_LOADOUTS = 10;
export const MAX_SKILL_LOADOUT_ACTIONS = 4;

export const DEFAULT_SKILL_LOADOUTS = [
  {
    id: "slot1",
    name: t("saveDefaults.skillLoadouts.slot1"),
    actionIds: ["basic_attack", "power_slash", "mana_bolt", "emergency_recovery"],
  },
  {
    id: "slot2",
    name: t("saveDefaults.skillLoadouts.slot2"),
    actionIds: ["basic_attack", "mana_bolt", "emergency_recovery", "power_slash"],
  },
];

export function saveState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (error) {
    console.warn("Save skipped. Browser storage may be full.", error);
  }
}

export function loadState(createInitialState) {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (!saved) return createInitialState();
    return normalizeSavedState(saved, createInitialState);
  } catch {
    return createInitialState();
  }
}

export function normalizeSavedState(saved, createInitialState) {
  const base = createInitialState();
  const savedState = saved && typeof saved === "object" && !Array.isArray(saved) ? saved : {};
  const skillLoadouts = normalizeSkillLoadouts(savedState.skillLoadouts, base.skillLoadouts);
  const activeSkillLoadoutId = normalizeActiveSkillLoadoutId(savedState.activeSkillLoadoutId, skillLoadouts);
  return {
    ...base,
    ...savedState,
    player: {
      ...base.player,
      ...savedState.player,
      stats: { ...base.player.stats, ...savedState.player?.stats },
      pendingStatAllocations: normalizePendingStatAllocations(
        savedState.player?.pendingStatAllocations,
        base.player.stats
      ),
    },
    playerProfile: normalizePlayerProfile(savedState.playerProfile, savedState.player?.name || base.player.name),
    equipment: { ...base.equipment, ...savedState.equipment },
    inventory: Array.isArray(savedState.inventory) ? savedState.inventory : base.inventory,
    completedRegions: Array.isArray(savedState.completedRegions) ? savedState.completedRegions : base.completedRegions,
    resting: Boolean(savedState.resting ?? base.resting),
    autoHunt: Boolean(savedState.autoHunt ?? base.autoHunt),
    offlineAutoHuntEligible: Boolean(savedState.offlineAutoHuntEligible ?? base.offlineAutoHuntEligible),
    offlineAutoHuntEngagedAt: normalizeTimestamp(savedState.offlineAutoHuntEngagedAt, base.offlineAutoHuntEngagedAt),
    skillLoadouts,
    activeSkillLoadoutId,
    effects: Array.isArray(savedState.effects) ? savedState.effects : base.effects,
    settings: {
      ...base.settings,
      ...savedState.settings,
      combatFeedback: {
        ...DEFAULT_COMBAT_FEEDBACK,
        ...savedState.settings?.combatFeedback,
      },
      combatView: {
        ...DEFAULT_COMBAT_VIEW,
        ...savedState.settings?.combatView,
      },
      audio: normalizeAudioSettings(savedState.settings?.audio),
      developer: normalizeDeveloperOptions(savedState.settings?.developer),
    },
    gateProgress:
      savedState.gateProgress && typeof savedState.gateProgress === "object" ? savedState.gateProgress : base.gateProgress,
  };
}

function normalizeSkillLoadouts(savedLoadouts, fallbackLoadouts = DEFAULT_SKILL_LOADOUTS) {
  const source = Array.isArray(savedLoadouts) && savedLoadouts.length ? savedLoadouts : fallbackLoadouts;
  const normalized = source
    .map((loadout, index) => {
      const fallback = fallbackLoadouts[index] || DEFAULT_SKILL_LOADOUTS[index] || DEFAULT_SKILL_LOADOUTS[0];
      const rawIds = Array.isArray(loadout?.actionIds) ? loadout.actionIds : fallback.actionIds;
      const actionIds = [...new Set(rawIds.filter((id) => typeof id === "string"))].slice(0, MAX_SKILL_LOADOUT_ACTIONS);
      return {
        id: typeof loadout?.id === "string" && loadout.id ? loadout.id : fallback.id || `slot${index + 1}`,
        name: typeof loadout?.name === "string" && loadout.name
          ? loadout.name
          : fallback.name || tf("saveDefaults.slotName", { number: index + 1 }),
        actionIds: actionIds.length ? actionIds : [...fallback.actionIds],
      };
    })
    .filter((loadout) => loadout.actionIds.length)
    .slice(0, MAX_SKILL_LOADOUTS);

  return normalized.length ? normalized : DEFAULT_SKILL_LOADOUTS.map((loadout) => ({ ...loadout }));
}

function normalizeActiveSkillLoadoutId(savedLoadoutId, skillLoadouts) {
  if (skillLoadouts.some((loadout) => loadout.id === savedLoadoutId)) return savedLoadoutId;
  return skillLoadouts[0]?.id || DEFAULT_ACTIVE_SKILL_LOADOUT_ID;
}

function normalizePendingStatAllocations(savedPending, statShape) {
  const source = savedPending && typeof savedPending === "object" && !Array.isArray(savedPending) ? savedPending : {};
  return Object.fromEntries(
    Object.keys(statShape).map((stat) => {
      const value = Number(source[stat]);
      return [stat, Number.isFinite(value) && value > 0 ? Math.floor(value) : 0];
    })
  );
}

export function normalizePlayerProfile(savedProfile, fallbackName = t("saveDefaults.playerName")) {
  const profile = { ...DEFAULT_PLAYER_PROFILE, ...(savedProfile || {}) };
  profile.name = sanitizeProfileText(profile.name || fallbackName, t("saveDefaults.playerName"), 12);
  profile.age = clampNumber(profile.age, 14, 99, 20);
  profile.gender = sanitizeProfileText(profile.gender, t("saveDefaults.gender"), 8);
  profile.country = sanitizeProfileText(profile.country, t("saveDefaults.country"), 12);
  profile.height = clampNumber(profile.height, 120, 230, 175);
  profile.weight = clampNumber(profile.weight, 30, 180, 70);
  profile.job = sanitizeProfileText(profile.job, t("saveDefaults.job"), 12);
  profile.title = sanitizeProfileText(profile.title, t("saveDefaults.title"), 16);
  profile.organization = sanitizeProfileText(profile.organization, t("saveDefaults.organization"), 16);
  profile.alignment = sanitizeProfileText(profile.alignment, t("saveDefaults.alignment"), 12);
  profile.portraitDataUrl = sanitizeImageDataUrl(profile.portraitDataUrl);
  profile.portraitFrame = normalizePortraitFrame(profile.portraitFrame);
  profile.created = Boolean(profile.created);
  return profile;
}

export function loadUiState() {
  try {
    const saved = JSON.parse(localStorage.getItem(UI_STORAGE_KEY) || "null");
    return normalizeUiState(saved);
  } catch {
    return createEmptyUiState();
  }
}

export function normalizeUiState(saved) {
  if (!saved || typeof saved !== "object" || Array.isArray(saved)) {
    return createEmptyUiState();
  }

  return {
    collapsedPanels: Array.isArray(saved.collapsedPanels)
      ? saved.collapsedPanels.filter((id) => typeof id === "string")
      : [],
    collapsedObjectives: Array.isArray(saved.collapsedObjectives)
      ? saved.collapsedObjectives.filter((id) => typeof id === "string")
      : [],
    expandedDefaultPanels: Array.isArray(saved.expandedDefaultPanels)
      ? saved.expandedDefaultPanels.filter((id) => typeof id === "string")
      : [],
    selectedRegionId: typeof saved.selectedRegionId === "string" ? saved.selectedRegionId : null,
    objectiveRotationMode: saved.objectiveRotationMode === "manual" ? "manual" : "auto",
    objectiveRotationIndex: normalizeObjectiveRotationIndex(saved.objectiveRotationIndex),
  };
}

function createEmptyUiState() {
  return {
    collapsedPanels: [],
    collapsedObjectives: [],
    expandedDefaultPanels: [],
    selectedRegionId: null,
    objectiveRotationMode: "auto",
    objectiveRotationIndex: 0,
  };
}

function normalizeObjectiveRotationIndex(value) {
  const number = Number(value);
  return Number.isFinite(number) && number >= 0 ? Math.floor(number) : 0;
}

function normalizeTimestamp(value, fallback = 0) {
  const number = Number(value);
  return Number.isFinite(number) && number > 0 ? Math.floor(number) : fallback;
}

export function saveUiState(uiState) {
  try {
    localStorage.setItem(UI_STORAGE_KEY, JSON.stringify(uiState));
  } catch (error) {
    console.warn("UI preferences were not saved.", error);
  }
}

export function serializeSavePayload(state, uiState) {
  return JSON.stringify({
    version: 1,
    exportedAt: new Date().toISOString(),
    state,
    uiState,
  }, null, 2);
}

export function parseSavePayload(text, createInitialState) {
  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new SavePayloadError(t("saveDefaults.errors.invalidJson"));
  }

  if (!payload || typeof payload !== "object" || Array.isArray(payload)) {
    throw new SavePayloadError(t("saveDefaults.errors.missingGameData"));
  }

  const hasWrappedState = Object.prototype.hasOwnProperty.call(payload, "state");
  const rawState = hasWrappedState ? payload.state : payload;
  if (!rawState || typeof rawState !== "object" || Array.isArray(rawState)) {
    throw new SavePayloadError(t("saveDefaults.errors.missingGameData"));
  }

  const hasUiState = Object.prototype.hasOwnProperty.call(payload, "uiState");
  return {
    state: normalizeSavedState(rawState, createInitialState),
    uiState: hasUiState ? normalizeUiState(payload.uiState) : null,
  };
}

function sanitizeProfileText(value, fallback, maxLength) {
  const text = String(value || "").trim();
  return (text || fallback).slice(0, maxLength);
}

function sanitizeImageDataUrl(value) {
  const text = String(value || "");
  if (!text) return "";
  if (!/^data:image\/(?:png|jpe?g|webp|gif);base64,[a-z0-9+/=]+$/i.test(text)) return "";
  return text.length <= 1600000 ? text : "";
}

function normalizeAudioSettings(savedAudio) {
  const source = savedAudio && typeof savedAudio === "object" && !Array.isArray(savedAudio) ? savedAudio : {};
  return {
    bgmVolume: clampNumber(source.bgmVolume, 0, 100, DEFAULT_AUDIO_SETTINGS.bgmVolume),
    sfxVolume: clampNumber(source.sfxVolume, 0, 100, DEFAULT_AUDIO_SETTINGS.sfxVolume),
  };
}

function clampNumber(value, min, max, fallback) {
  const number = Number(value);
  if (!Number.isFinite(number)) return fallback;
  return Math.min(max, Math.max(min, Math.round(number)));
}
