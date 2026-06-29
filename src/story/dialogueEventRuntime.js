import {
  normalizeDialogueEvents,
  renderDialogueEventLines,
  resolveDialogueEvent,
} from "./dialogueEvents.js?v=573";
import { createTutorialDialogueTemplateValues } from "./tutorialDialogueEvents.js?v=573";
import { karmaValue } from "../state/karma.js?v=573";
import { createRegressionCardResyncState } from "../state/regressionCardState.js?v=573";

export const DIALOGUE_EVENT_RUNTIME_VERSION = "v1.0-live-json-bridge";

export const DIALOGUE_EVENT_TRIGGER_TYPES = Object.freeze([
  "auto",
  "onBossAppears",
  "onBossIntro",
  "onClear",
  "onDeath",
  "onDefeatMonster",
  "onDiscover",
  "onEliteSighted",
  "onEnterRegion",
  "onInteraction",
  "onLoot",
  "onOpenNodeMap",
  "onRegressionStart",
  "onRest",
]);

export const DIALOGUE_EVENT_RUNTIME_TARGET_ALIASES = Object.freeze({
  shore_drift_slime: Object.freeze(["drift_slime_mana_variant"]),
  forest_wolf: Object.freeze(["shadow_wolf"]),
  forest_goblin_scout: Object.freeze(["goblin_scout"]),
  forest_alpha_wolf: Object.freeze(["alpha_wolf"]),
  ruin_rune_doll: Object.freeze(["rune_doll"]),
  mine_crystal_bug: Object.freeze(["crystal_bug"]),
  rift_warden: Object.freeze(["rift_warden_intro"]),
  imp_codex_fragment: Object.freeze(["nameless_scrap"]),
  shore_claw_crab_codex_fragment: Object.freeze(["nameless_scrap"]),
  shore_drift_slime_codex_fragment: Object.freeze(["nameless_scrap"]),
  event_01: Object.freeze(["mock_gate_node_map"]),
  hidden_piece_01: Object.freeze(["hidden_stair"]),
  hidden_treasure_01: Object.freeze(["hidden_treasure_hint"]),
  treasure_01: Object.freeze(["buried_cache_hint"]),
});

const DIALOGUE_EVENT_RUNTIME_MIRRORED_FLAGS = Object.freeze([
  "firstDeathCauseRecorded",
  "regressorRecordUnlocked",
  "hasSeenGoldenCardNews",
  "traitCardResyncAvailable",
  "goldenCardObtained",
  "forgottenGodRemnantContacted",
]);

const DIALOGUE_EVENT_DATA_URL = new URL("../../data/dialogue-events.json", import.meta.url);

let runtimeDialogueEvents = [];
let runtimeLoadStatus = "pending";

export async function initializeDialogueEventRuntime({ fetchImpl = globalThis.fetch } = {}) {
  if (runtimeLoadStatus === "ready") return runtimeDialogueEvents;
  if (typeof fetchImpl !== "function") {
    runtimeLoadStatus = "unavailable";
    runtimeDialogueEvents = [];
    return runtimeDialogueEvents;
  }

  try {
    const response = await fetchImpl(DIALOGUE_EVENT_DATA_URL);
    if (!response?.ok) throw new Error(`dialogue-event-fetch-failed:${response?.status || "unknown"}`);
    setDialogueEventRuntimeData(await response.json());
    runtimeLoadStatus = "ready";
  } catch {
    runtimeDialogueEvents = [];
    runtimeLoadStatus = "failed";
  }
  return runtimeDialogueEvents;
}

export function setDialogueEventRuntimeData(rawEvents = []) {
  runtimeDialogueEvents = normalizeDialogueEvents(rawEvents);
  runtimeLoadStatus = "ready";
  return runtimeDialogueEvents;
}

export function getDialogueEventRuntimeStatus() {
  return {
    version: DIALOGUE_EVENT_RUNTIME_VERSION,
    status: runtimeLoadStatus,
    eventCount: runtimeDialogueEvents.length,
  };
}

export function claimDialogueEventById(state, eventId, options = {}) {
  if (!eventId) return [];
  const event = runtimeDialogueEvents.find((entry) => entry.id === eventId);
  if (!event) return [];
  return claimDialogueEvent(state, event, options);
}

export function claimDialogueEventsForTrigger(state, trigger = {}, options = {}) {
  const triggerType = String(trigger.type || "");
  if (!DIALOGUE_EVENT_TRIGGER_TYPES.includes(triggerType)) return [];

  const targetIds = dialogueRuntimeTargetIds(trigger);
  const regionId = trigger.regionId || options.region?.id || "";
  const matchingEvents = runtimeDialogueEvents.filter((event) => {
    if (event.trigger?.type !== triggerType) return false;
    if (regionId && event.locationId && event.locationId !== regionId) return false;
    if (!event.trigger?.targetId) return true;
    return targetIds.has(event.trigger.targetId);
  });

  return matchingEvents.flatMap((event) => claimDialogueEvent(state, event, options));
}

export function createDialogueRuntimeTemplateValues(state = {}, options = {}) {
  const player = state.player || {};
  const profile = state.playerProfile || {};
  const stats = player.stats || {};
  const regressionCardState = createRegressionCardResyncState(state);
  const currentKarmaValue = options.karmaValue ?? regressionCardState.karmaValue ?? karmaValue(state);
  const statSummary = options.statSummary
    || Object.entries(stats)
      .filter(([, value]) => Number.isFinite(Number(value)))
      .map(([key, value]) => `${key.toUpperCase()} ${value}`)
      .join(" / ");

  return createTutorialDialogueTemplateValues({
    playerName: profile.name || player.name || options.playerName || "",
    age: profile.age || options.age || "",
    gender: profile.gender || options.gender || "",
    country: profile.country || options.country || "",
    profileImage: profile.imageId || profile.profileImage || options.profileImage || "",
    statSummary,
    statTotal: Object.values(stats).reduce((total, value) => total + (Number(value) || 0), 0),
    statusGrade: options.statusGrade || "",
    LUK: stats.luk ?? stats.LUK ?? options.LUK ?? 0,
    dispositionName: profile.alignment || options.dispositionName || "",
    starterCardName: profile.starterCardName || options.starterCardName || "",
    starterTraitName: profile.starterTrait || options.starterTraitName || "",
    starterSkillName: profile.starterSkill || options.starterSkillName || "",
    karmaValue: currentKarmaValue,
    cardCandidateCount: options.cardCandidateCount ?? regressionCardState.cardCandidateCount,
    cardGradeWeightSummary: options.cardGradeWeightSummary || regressionCardState.cardGradeWeightSummary,
    selectedCardName: regressionCardState.selectedCardName || profile.starterCardName || options.selectedCardName || "",
    selectedTraitName: regressionCardState.selectedTraitName || profile.starterTrait || options.selectedTraitName || "",
    selectedSkillName: regressionCardState.selectedSkillName || profile.starterSkill || options.selectedSkillName || "",
    nextCalamityName: options.nextCalamityName || "",
    savedTime: options.savedTime || "",
    clearTime: options.clearTime || "",
    timeDiff: options.timeDiff || "",
    itemName: options.itemName || "",
    count: options.count ?? 0,
    target: options.target ?? 0,
    remaining: options.remaining ?? 0,
    ...(options.templateValues || {}),
  });
}

function claimDialogueEvent(state, event, options = {}) {
  if (!state || !event?.id) return [];
  const tutorialFlags = ensureTutorialFlags(state);
  if (hasShownDialogueEvent(tutorialFlags, event.id) && options.allowRepeat !== true) return [];

  const resolved = resolveDialogueEvent(event.id, {
    events: runtimeDialogueEvents,
    run: dialogueRunFromState(state, options),
    state: {
      ...state,
      flags: collectRuntimeFlags(state),
    },
    flags: collectRuntimeFlags(state),
    items: options.items,
    skills: options.skills,
    templateValues: createDialogueRuntimeTemplateValues(state, options),
  });
  if (!resolved) return [];

  applyDialogueEventRuntimeEffects(state, resolved.event);
  return renderDialogueEventLines(resolved.event, {
    templateValues: createDialogueRuntimeTemplateValues(state, options),
  })
    .map((line) => line.text)
    .filter(Boolean);
}

function applyDialogueEventRuntimeEffects(state, event) {
  const tutorialFlags = ensureTutorialFlags(state);
  const shownIds = new Set(tutorialFlags.shownTutorialEventIds || []);
  shownIds.add(event.id);
  tutorialFlags.shownTutorialEventIds = [...shownIds];

  const effects = event.stateEffects || {};
  for (const flag of effects.setFlags || []) {
    tutorialFlags[flag] = true;
    if (DIALOGUE_EVENT_RUNTIME_MIRRORED_FLAGS.includes(flag)) state[flag] = true;
  }
  for (const flag of effects.unsetFlags || []) {
    delete tutorialFlags[flag];
    if (DIALOGUE_EVENT_RUNTIME_MIRRORED_FLAGS.includes(flag)) delete state[flag];
  }

  const recordEntries = new Set(tutorialFlags.dialogueRecordEntries || []);
  for (const entry of effects.recordEntries || []) recordEntries.add(entry);
  tutorialFlags.dialogueRecordEntries = [...recordEntries];
}

function hasShownDialogueEvent(tutorialFlags, eventId) {
  return Array.isArray(tutorialFlags.shownTutorialEventIds) && tutorialFlags.shownTutorialEventIds.includes(eventId);
}

function ensureTutorialFlags(state) {
  if (!state.tutorialFlags || typeof state.tutorialFlags !== "object" || Array.isArray(state.tutorialFlags)) {
    state.tutorialFlags = {};
  }
  if (!Array.isArray(state.tutorialFlags.shownTutorialEventIds)) state.tutorialFlags.shownTutorialEventIds = [];
  if (!Array.isArray(state.tutorialFlags.dialogueRecordEntries)) state.tutorialFlags.dialogueRecordEntries = [];
  return state.tutorialFlags;
}

function collectRuntimeFlags(state = {}) {
  const tutorialFlags = state.tutorialFlags || {};
  const flags = new Set();
  for (const [key, value] of Object.entries(tutorialFlags)) {
    if (value === true) flags.add(key);
    if (Array.isArray(value)) {
      for (const entry of value) if (entry) flags.add(entry);
    }
  }
  for (const key of DIALOGUE_EVENT_RUNTIME_MIRRORED_FLAGS) {
    if (state[key] === true || tutorialFlags[key] === true) flags.add(key);
  }
  const run = dialogueRunFromState(state);
  if (run >= 2) {
    flags.add("regressorRecordUnlocked");
    flags.add("hasSeenGoldenCardNews");
  }
  return [...flags];
}

function dialogueRunFromState(state = {}, options = {}) {
  const value = options.run ?? state.regressionCount ?? state.tutorialRun ?? state.tutorialFlags?.regressionCount ?? 1;
  const number = Math.floor(Number(value));
  return Number.isFinite(number) ? Math.max(1, number) : 1;
}

function dialogueRuntimeTargetIds(trigger = {}) {
  const values = new Set([
    trigger.targetId,
    ...(Array.isArray(trigger.targetIds) ? trigger.targetIds : []),
  ].filter(Boolean).map(String));

  for (const targetId of [...values]) {
    for (const alias of DIALOGUE_EVENT_RUNTIME_TARGET_ALIASES[targetId] || []) values.add(alias);
  }
  return values;
}
