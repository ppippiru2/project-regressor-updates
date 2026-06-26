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
