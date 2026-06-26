export const ENGINE_PROFILE = {
  id: "idle-growth-rpg-engine",
  reusableFor: ["korean-fantasy-hunter", "korean-fantasy-murim"],
  commonSystems: [
    "app-shell",
    "combat-runtime",
    "growth",
    "inventory",
    "equipment",
    "regions",
    "save-load",
    "offline-reward",
  ],
};

export const CONTENT_SWAP_BOUNDARIES = {
  text: ["src/localization/ko-KR.js"],
  contentData: [
    "src/balance/itemBalanceData.js",
    "src/balance/monsterBalanceData.js",
    "src/balance/skillBalanceData.js",
    "src/data/worldData.js",
    "src/data/shopData.js",
  ],
  balanceTuning: [
    "src/balance/playerStatBalance.js",
    "src/balance/playerGrowthBalance.js",
    "src/balance/damageBalance.js",
    "src/balance/equipmentValueBalance.js",
    "src/balance/monsterStatBalance.js",
    "src/balance/combatBalance.js",
    "src/balance/rewardBalance.js",
    "src/balance/recoveryBalance.js",
  ],
  assets: ["assets/characters", "assets/optimized/regions", "assets/source/regions"],
  staticShell: ["index.html", "manifest.json", "data/update-manifest.json"],
};

export const CONTENT_THEME_TERMS = {
  koreanFantasyHunter: {
    playerArchetype: "regressor-awakener",
    powerSystem: "awakening-and-mana",
    regionFrame: "gate-and-rift",
    organizationFrame: "hunter-association-and-guild",
    prestigeFrame: "rank-and-tower",
    hiddenKnowledgeFrame: "regression-knowledge-and-hidden-pieces",
    lateGameThreatFrame: "constellations-and-outer-gods",
  },
  koreanFantasyMurim: {
    playerArchetype: "regressor-martial-artist",
    powerSystem: "martial-arts-and-qi",
    regionFrame: "sect-territory-and-jianghu-route",
    organizationFrame: "sects-clans-and-alliances",
    prestigeFrame: "realm-and-reputation",
    hiddenKnowledgeFrame: "regression-knowledge-and-secret-manuals",
    lateGameThreatFrame: "demonic-cult-and-heavenly-tribulation",
  },
};

export const CONTENT_ID_RETARGET_CANDIDATES = {
  equipment: [
    { id: "hunter_bow", reason: "hunter profession item" },
    { id: "rift_blade", reason: "rift-region item" },
    { id: "tower_shield_armor", reason: "tower-prestige item" },
    { id: "mana_necklace", reason: "mana-system item" },
    { id: "rift_gauntlets", reason: "rift-region item" },
    { id: "regressor_charm", reason: "regression-frame item" },
    { id: "perfect_timeline_ring", reason: "timeline/regression-frame item" },
  ],
  skills: [
    { id: "mana_bolt", reason: "mana-system skill" },
  ],
  monsters: [
    { id: "mine_golem", reason: "mana-mine arc monster" },
    { id: "rift_knight", reason: "rift enemy faction" },
    { id: "rift_warden", reason: "rift boss faction" },
  ],
  regions: [
    { id: "mana_mine", reason: "mana-system region" },
    { id: "rift_gate", reason: "gate/rift region" },
  ],
  gateMaps: [
    { id: "gate_tutorial_ruins_01", reason: "gate-frame node map" },
  ],
  gateMapMemoryKeys: [
    { id: "tutorial_ruins_gate", reason: "gate-frame memory key" },
  ],
  gateNodeOutcomeIds: [
    { id: "old_altar_event", field: "eventId", reason: "setting-specific event" },
    { id: "tutorial_ruins_merchant", field: "shopId", reason: "setting-specific merchant" },
    { id: "broken_mana_core", field: "hiddenPieceId", reason: "mana-system hidden piece" },
    { id: "found_broken_mana_core", field: "unlockCondition", reason: "mana-system hidden piece unlock" },
  ],
  shopCategories: [
    { id: "regressor", reason: "regression-frame shop category" },
  ],
  shopCatalog: [
    { id: "shop_regressor_charm", reason: "regression-frame shop listing" },
  ],
  assetIds: [
    { id: "player_regressor_spear_idle_v1", reason: "regressor player combat sprite" },
    { id: "region_mana_mine_card_v54_actual", reason: "mana-system region card" },
    { id: "region_mana_mine_node_map_v54_actual", reason: "mana-system region map" },
    { id: "region_rift_gate_card_v54_actual", reason: "gate/rift region card" },
    { id: "region_rift_gate_node_map_v54_actual", reason: "gate/rift region map" },
  ],
};

export const CONTENT_RETARGET_MAPPING_TEMPLATES = {
  koreanFantasyMurim: {
    id: "hunter-to-murim-id-map-v1",
    sourceProfileId: "project-regressor-hunter",
    targetProfileId: "korean-fantasy-murim-template",
    maps: {
      equipment: {
        hunter_bow: "wandering_archer_bow",
        rift_blade: "demonic_saber",
        tower_shield_armor: "sect_guard_armor",
        mana_necklace: "qi_flow_necklace",
        rift_gauntlets: "iron_qi_gauntlets",
        regressor_charm: "returner_jade_talisman",
        perfect_timeline_ring: "heavenly_cycle_ring",
      },
      skills: {
        mana_bolt: "qi_burst",
      },
      monsters: {
        mine_golem: "ore_qi_puppet",
        rift_knight: "demonic_cult_swordsman",
        rift_warden: "demonic_cult_warden",
      },
      regions: {
        mana_mine: "spirit_stone_mine",
        rift_gate: "demonic_sect_gate",
      },
      gateMaps: {
        gate_tutorial_ruins_01: "sect_ruins_trial_01",
      },
      gateMapMemoryKeys: {
        tutorial_ruins_gate: "tutorial_ruins_trial",
      },
      gateNodeOutcomeIds: {
        old_altar_event: "old_shrine_event",
        tutorial_ruins_merchant: "sect_ruins_merchant",
        broken_mana_core: "cracked_spirit_core",
        found_broken_mana_core: "found_cracked_spirit_core",
      },
      shopCategories: {
        regressor: "returner",
      },
      shopCatalog: {
        shop_regressor_charm: "shop_returner_jade_talisman",
      },
      assetIds: {
        player_regressor_spear_idle_v1: "player_returner_spear_idle_v1",
        region_mana_mine_card_v54_actual: "region_spirit_stone_mine_card_v1",
        region_mana_mine_node_map_v54_actual: "region_spirit_stone_mine_node_map_v1",
        region_rift_gate_card_v54_actual: "region_demonic_sect_gate_card_v1",
        region_rift_gate_node_map_v54_actual: "region_demonic_sect_gate_node_map_v1",
      },
    },
  },
};

export const CONTENT_PROFILE_TEMPLATES = {
  projectRegressorHunter: {
    id: "project-regressor-hunter",
    title: "Project Regressor",
    shortTitle: "Regressor",
    titleKey: "contentProfile.projectRegressorHunter.title",
    description: "Korean fantasy hunter idle RPG",
    descriptionKey: "contentProfile.projectRegressorHunter.description",
    setting: {
      genre: "korean-fantasy-hunter",
      protagonistRole: "regressor-awakener",
      progressionFrame: "gate-and-region-climb",
    },
    themeTerms: CONTENT_THEME_TERMS.koreanFantasyHunter,
    swapBoundaries: CONTENT_SWAP_BOUNDARIES,
  },
  koreanFantasyMurimTemplate: {
    id: "korean-fantasy-murim-template",
    title: "Korean Fantasy Murim Idle RPG",
    shortTitle: "Murim",
    titleKey: "contentProfile.koreanFantasyMurimTemplate.title",
    description: "Korean fantasy murim idle RPG template",
    descriptionKey: "contentProfile.koreanFantasyMurimTemplate.description",
    setting: {
      genre: "korean-fantasy-murim",
      protagonistRole: "regressor-martial-artist",
      progressionFrame: "sect-and-region-climb",
    },
    themeTerms: CONTENT_THEME_TERMS.koreanFantasyMurim,
    swapBoundaries: CONTENT_SWAP_BOUNDARIES,
  },
};

export const CONTENT_PROFILE = CONTENT_PROFILE_TEMPLATES.projectRegressorHunter;

export function applyContentProfileToDocument(
  documentRef = globalThis.document,
  profile = CONTENT_PROFILE,
  engine = ENGINE_PROFILE,
) {
  if (!documentRef) return;
  documentRef.title = profile.title;
  documentRef.documentElement?.setAttribute("data-content-profile", profile.id);
  documentRef.documentElement?.setAttribute("data-engine-profile", engine.id);
  const description = documentRef.querySelector?.('meta[name="description"]');
  if (description) description.setAttribute("content", profile.description);
}

export function exposeContentProfile(windowRef = globalThis.window, profile = CONTENT_PROFILE, engine = ENGINE_PROFILE) {
  if (!windowRef) return;
  windowRef.__PROJECT_REGRESSOR_CONTENT_PROFILE__ = profile;
  windowRef.__PROJECT_REGRESSOR_ENGINE_PROFILE__ = engine;
}
