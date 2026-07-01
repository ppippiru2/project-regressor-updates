import { formatText, getLocaleText } from "../localization/index.js?v=680";

export const TUTORIAL_CORE_EVENT_VERSION = "v2.5-region-core-events-v1";

export const TUTORIAL_REGION_CORE_EVENTS = Object.freeze([
  {
    id: "core_event_tutorial_shore_first_rift",
    regionId: "tutorial_shore",
    textKey: "tutorial_shore",
  },
  {
    id: "core_event_tutorial_forest_trace",
    regionId: "tutorial_forest",
    textKey: "tutorial_forest",
  },
  {
    id: "core_event_broken_ruins_gate_record",
    regionId: "broken_ruins",
    textKey: "broken_ruins",
  },
  {
    id: "core_event_mana_mine_crystal_trace",
    regionId: "mana_mine",
    textKey: "mana_mine",
  },
  {
    id: "core_event_rift_gate_warden_pattern",
    regionId: "rift_gate",
    textKey: "rift_gate",
  },
]);

export function resolveRegionCoreEvent(region, { localeText = getLocaleText() } = {}) {
  const event = TUTORIAL_REGION_CORE_EVENTS.find((entry) => entry.regionId === region?.id);
  if (!event) return null;

  const detail = localeText.story?.coreEvents?.regionRecords?.[event.textKey];
  if (!detail) return null;

  return {
    event,
    title: formatText(detail.title, { regionName: region.name }),
    log: formatText(detail.log, { regionName: region.name }),
    completionLog: detail.completionLog
      ? formatText(detail.completionLog, { regionName: region.name })
      : "",
  };
}

export function buildRegionCoreEventProgress(regions = [], completedRegionIds = [], options = {}) {
  const localeText = options.localeText || getLocaleText();
  const currentRegionId = options.currentRegionId || "";
  const completed = new Set(Array.isArray(completedRegionIds) ? completedRegionIds : []);
  const regionById = new Map((Array.isArray(regions) ? regions : []).map((region) => [region.id, region]));

  return TUTORIAL_REGION_CORE_EVENTS
    .map((event) => {
      const region = regionById.get(event.regionId);
      const resolved = resolveRegionCoreEvent(region, { localeText });
      if (!region || !resolved) return null;
      const isCompleted = completed.has(region.id);
      const isCurrent = region.id === currentRegionId;
      return {
        eventId: event.id,
        regionId: region.id,
        regionName: region.name,
        title: resolved.title,
        log: resolved.log,
        completionLog: resolved.completionLog,
        state: isCompleted ? "completed" : isCurrent ? "active" : "pending",
        isCompleted,
        isCurrent,
      };
    })
    .filter(Boolean);
}

export function getCoreEventCatalog() {
  return {
    version: TUTORIAL_CORE_EVENT_VERSION,
    regionEvents: TUTORIAL_REGION_CORE_EVENTS,
  };
}
