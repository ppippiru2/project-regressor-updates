import { t, tf } from "../localization/index.js?v=455";
import { resolveRegionCoreEvent } from "../story/coreEventCatalog.js?v=455";
import { resolveTutorialKeyEventDialogue } from "../story/tutorialDialogueEvents.js?v=455";

export const DEFAULT_TUTORIAL_FLAGS = Object.freeze({
  firstCombatGuideShown: false,
  firstLootDropGuideShown: false,
  firstCodexRecordGuideShown: false,
  shownRegionCoreEventIds: [],
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

export function claimFirstCodexRecordGuide(state, { item, count = 0 } = {}) {
  state.tutorialFlags = normalizeTutorialFlags(state.tutorialFlags);
  if (state.tutorialFlags.firstCodexRecordGuideShown) return [];
  if (!item || item.type !== "codex_fragment") return [];

  state.tutorialFlags.firstCodexRecordGuideShown = true;
  const target = Math.max(1, Number(item.recordTarget) || 5);
  const currentCount = Math.max(0, Number(count) || 0);
  const resolved = resolveTutorialKeyEventDialogue("tutorial_1st_shore_06_nameless_scrap", {
    templateValues: {
      itemName: item.name,
      count: currentCount,
      target,
      remaining: Math.max(0, target - currentCount),
    },
  });
  return [resolved?.detail?.log || t("stateMessages.firstCodexRecordGuide")].filter(Boolean);
}

export function claimFirstLootDropGuide(state, { item, count = 0 } = {}) {
  state.tutorialFlags = normalizeTutorialFlags(state.tutorialFlags);
  if (state.tutorialFlags.firstLootDropGuideShown) return [];
  if (!item || item.slot) return [];

  state.tutorialFlags.firstLootDropGuideShown = true;
  return [
    tf("stateMessages.firstLootDropGuide", {
      itemName: item.name || item.id || t("combatRewards.lootItemFallbackType"),
      count: Math.max(1, Number(count) || 1),
    }),
  ];
}

export function claimRegionCoreEventGuide(state, region) {
  state.tutorialFlags = normalizeTutorialFlags(state.tutorialFlags);
  const resolved = resolveRegionCoreEvent(region);
  if (!resolved?.event?.id || !resolved.log) return [];

  const shownIds = new Set(state.tutorialFlags.shownRegionCoreEventIds || []);
  if (shownIds.has(resolved.event.id)) return [];

  shownIds.add(resolved.event.id);
  state.tutorialFlags.shownRegionCoreEventIds = [...shownIds];
  return [resolved.log];
}

function validTutorialFlagOverrides(source) {
  return Object.fromEntries(
    Object.entries(DEFAULT_TUTORIAL_FLAGS).map(([key, fallback]) => {
      if (Array.isArray(fallback)) {
        const values = Array.isArray(source[key]) ? source[key] : fallback;
        return [key, [...new Set(values.filter(Boolean).map(String))]];
      }
      return [key, typeof source[key] === "boolean" ? source[key] : fallback];
    })
  );
}

