import { t } from "../localization/index.js?v=475";
import { PLAYER_INITIAL_STATS } from "../balance/playerGrowthBalance.js?v=475";
import { createTutorialFlags } from "./tutorialGuidance.js?v=475";

export function createInitialState({
  slots,
  regions,
  defaultCombatFeedback,
  defaultCombatView,
  defaultDeveloperOptions,
  defaultPlayerProfile,
  defaultSkillLoadouts,
  defaultActiveSkillLoadoutId,
}) {
  return {
    player: {
      name: t("saveSlots.fallbackName"),
      level: 1,
      exp: 0,
      gold: 0,
      freePoints: 0,
      pendingStatAllocations: {},
      stats: { ...PLAYER_INITIAL_STATS },
      hp: 0,
      mp: null,
    },
    playerProfile: { ...defaultPlayerProfile },
    equipment: Object.fromEntries(slots.map((slot) => [slot, null])),
    inventory: [],
    regionId: regions[0].id,
    completedRegions: [],
    regionEncounterCounts: {},
    skillLoadouts: defaultSkillLoadouts.map((loadout) => ({ ...loadout, actionIds: [...loadout.actionIds] })),
    activeSkillLoadoutId: defaultActiveSkillLoadoutId,
    target: null,
    inCombat: false,
    resting: false,
    autoHunt: false,
    stance: "power",
    hitCount: 0,
    hyp: 0,
    hyperActiveTicks: 0,
    hyperDuration: 0,
    hyperCooldown: 0,
    lastHitAt: 0,
    effects: [],
    settings: {
      combatFeedback: { ...defaultCombatFeedback },
      combatView: { ...defaultCombatView },
      developer: { ...defaultDeveloperOptions },
    },
    gateProgress: {},
    tutorialFlags: createTutorialFlags(),
    log: [t("stateMessages.initialLog")],
    lastSeenAt: Date.now(),
    offlineAutoHuntEligible: false,
    offlineAutoHuntEngagedAt: 0,
  };
}

