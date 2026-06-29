import { renderTutorialDialogueTemplate } from "./tutorialDialogueEvents.js?v=571";

export const DIALOGUE_EVENT_DATA_VERSION = "v1.2";

export const DIALOGUE_EVENT_REQUIRED_IDS = Object.freeze([
  "prologue_dream_02_profile_record",
  "tutorial_1st_shore_status_after_dream",
  "regression_2nd_pre_shore_card_resync",
  "regression_3rd_pre_shore_card_resync",
  "regression_4th_pre_shore_card_resync",
  "tutorial_loop_common_pre_shore_card_resync",
  "tutorial_1st_mine_06_forgotten_god_remnant",
  "tutorial_1st_gate_06_warden_20_clear",
  "tutorial_2nd_03_golden_card",
]);

export const DIALOGUE_EVENT_PHASES = Object.freeze([
  "prologue",
  "tutorial_run1",
  "post_tutorial_run1",
  "regression_pre_shore",
  "tutorial_run2",
  "tutorial_run3",
  "tutorial_run4",
  "tutorial_loop",
  "reality_after_regression",
]);

export const DIALOGUE_LINE_SPEAKERS = Object.freeze([
  "\uB098\uB808\uC774\uC158",
  "\uC815\uCCB4\uBD88\uBA85\uC758 \uBAA9\uC18C\uB9AC",
  "\uC2DC\uC2A4\uD15C",
  "\uD29C\uD1A0\uB9AC\uC5BC \uB3C4\uC6C0\uB9D0 \uD31D\uC5C5",
  "\uC804\uD22C \uB85C\uADF8",
  "\uD68C\uADC0\uC790\uC758 \uAE30\uB85D",
  "\uC190\uC0C1\uB41C \uAE30\uB85D",
  "\uB3C4\uAC10",
  "\uC2A4\uD06C\uB7A9\uBD81",
  "UI",
  "\uC8FC\uC778\uACF5",
  "\uB274\uC2A4 \uC575\uCEE4",
  "\uD5CC\uD130 \uB274\uC2A4",
  "\uD5CC\uD130 \uC790\uC720\uAC8C\uC2DC\uD310",
  "\uD611\uD68C \uC9C1\uC6D0",
  "\uAC80\uC740 \uAD00\uBB38\uC758 \uD30C\uC218\uAFBC",
]);

export const DIALOGUE_LINE_TYPES = Object.freeze([
  "dialogue",
  "system",
  "popup",
  "combatLog",
  "choice",
  "branch",
  "stateEffect",
]);

export const DIALOGUE_OUTPUT_CHANNELS = Object.freeze({
  dialogue: "dialogue",
  system: "systemWindow",
  popup: "tutorialPopup",
  combatLog: "combatLog",
  choice: "choice",
  branch: "branch",
  stateEffect: "stateEffect",
});

export function normalizeDialogueEvents(rawEvents = []) {
  return (Array.isArray(rawEvents) ? rawEvents : []).map((event) => ({
    ...event,
    lines: Array.isArray(event.lines) ? event.lines.map((line) => ({ lineType: "dialogue", ...line })) : [],
  }));
}

export function createDialogueEventMap(rawEvents = []) {
  return new Map(normalizeDialogueEvents(rawEvents).map((event) => [event.id, event]));
}

export function getDialogueEventById(rawEvents = [], eventId) {
  return createDialogueEventMap(rawEvents).get(eventId) || null;
}

export function resolveDialogueEvent(eventId, {
  events = [],
  run = 1,
  state = {},
  flags,
  items,
  skills,
  templateValues = {},
} = {}) {
  const event = getDialogueEventById(events, eventId);
  if (!event) return null;
  const context = { run, state, flags, items, skills };
  if (!isDialogueRunAllowed(event, run)) return null;
  if (!areDialoguePreconditionsMet(event, context)) return null;
  const lines = renderDialogueEventLines(event, { templateValues });
  return {
    event,
    lines,
    channels: groupDialogueLinesByChannel(lines),
    stateEffects: event.stateEffects || {},
  };
}

export function isDialogueRunAllowed(event, run = 1) {
  const requirement = event?.runRequirement;
  if (!requirement) return true;
  const currentRun = Number(run) || 1;
  if (requirement.exactRun !== null && requirement.exactRun !== undefined) {
    return currentRun === requirement.exactRun;
  }
  if (requirement.minRun !== undefined && currentRun < requirement.minRun) return false;
  if (requirement.maxRun !== null && requirement.maxRun !== undefined && currentRun > requirement.maxRun) return false;
  return true;
}

export function areDialoguePreconditionsMet(event, context = {}) {
  const preconditions = event?.preconditions;
  if (!preconditions) return true;
  const flags = collectDialogueValues(context.flags ?? context.state?.flags ?? context.state?.tutorialFlags);
  const items = collectDialogueValues(context.items ?? context.state?.items ?? context.state?.inventory);
  const skills = collectDialogueValues(context.skills ?? context.state?.skills ?? context.state?.skillLoadout);

  return includesAll(flags, preconditions.flagsTrue)
    && excludesAll(flags, preconditions.flagsFalse)
    && includesAll(items, preconditions.itemsRequired)
    && includesAll(skills, preconditions.skillsRequired);
}

export function renderDialogueEventLines(event, { templateValues = {} } = {}) {
  return (event?.lines || []).map((line) => ({
    ...line,
    lineType: line.lineType || "dialogue",
    outputChannel: dialogueOutputChannel(line),
    text: renderTutorialDialogueTemplate(line.text, templateValues),
  }));
}

export function dialogueOutputChannel(line) {
  return DIALOGUE_OUTPUT_CHANNELS[line?.lineType || "dialogue"] || "dialogue";
}

export function groupDialogueLinesByChannel(lines = []) {
  return lines.reduce((channels, line) => {
    const channel = line.outputChannel || dialogueOutputChannel(line);
    if (!channels[channel]) channels[channel] = [];
    channels[channel].push(line);
    return channels;
  }, {});
}

export function applyDialogueStateEffects(targetState, eventOrEffects) {
  const effects = eventOrEffects?.stateEffects || eventOrEffects || {};
  if (!targetState || typeof targetState !== "object") return targetState;

  const flags = ensureArrayContainer(targetState, "flags");
  for (const flag of effects.setFlags || []) addUnique(flags, flag);
  for (const flag of effects.unsetFlags || []) removeValue(flags, flag);

  const items = ensureArrayContainer(targetState, "items");
  for (const item of effects.grantItems || []) addUnique(items, item);

  const skills = ensureArrayContainer(targetState, "skills");
  for (const skill of effects.grantSkills || []) addUnique(skills, skill);

  const traits = ensureArrayContainer(targetState, "traits");
  for (const trait of effects.grantTraits || []) addUnique(traits, trait);

  const records = ensureArrayContainer(targetState, "recordEntries");
  for (const entry of effects.recordEntries || []) addUnique(records, entry);

  return targetState;
}

function collectDialogueValues(value) {
  if (!value) return new Set();
  if (value instanceof Set) return value;
  if (Array.isArray(value)) return new Set(value.filter(Boolean));
  if (typeof value === "object") {
    return new Set(
      Object.entries(value)
        .filter(([, entry]) => Boolean(entry))
        .map(([key]) => key),
    );
  }
  return new Set();
}

function includesAll(values, required = []) {
  return (required || []).every((value) => values.has(value));
}

function excludesAll(values, forbidden = []) {
  return (forbidden || []).every((value) => !values.has(value));
}

function ensureArrayContainer(target, key) {
  if (!Array.isArray(target[key])) target[key] = [];
  return target[key];
}

function addUnique(values, value) {
  if (!value || values.includes(value)) return;
  values.push(value);
}

function removeValue(values, value) {
  const index = values.indexOf(value);
  if (index >= 0) values.splice(index, 1);
}
