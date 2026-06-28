import { getLocaleText } from "../localization/index.js?v=491";
import { MONSTER_BALANCE_DATA } from "../balance/monsterBalanceData.js?v=491";

const WORLD_TEXT = getLocaleText().data;
const MONSTER_NAMES = WORLD_TEXT.monsters;
const REGION_TEXT = WORLD_TEXT.regions;
const GATE_MAP_TEXT = WORLD_TEXT.gateMaps;

export const monsters = MONSTER_BALANCE_DATA.map((monster) => ({
  ...monster,
  name: MONSTER_NAMES[monster.id],
}));

export const regions = [
  {
    id: "tutorial_shore",
    image: "",
    imagePosition: "center",
    name: REGION_TEXT.tutorial_shore.name,
    recommendedLevel: 1,
    monsterId: "shore_imp",
    monsterPool: ["shore_imp", "shore_claw_crab", "shore_drift_slime"],
    description: REGION_TEXT.tutorial_shore.description,
  },
  {
    id: "tutorial_forest",
    image: "",
    imagePosition: "center",
    name: REGION_TEXT.tutorial_forest.name,
    recommendedLevel: 2,
    monsterId: "forest_wolf",
    monsterPool: ["forest_wolf", "forest_goblin_scout", "forest_alpha_wolf"],
    description: REGION_TEXT.tutorial_forest.description,
  },
  {
    id: "broken_ruins",
    image: "",
    imagePosition: "center",
    name: REGION_TEXT.broken_ruins.name,
    recommendedLevel: 4,
    monsterId: "ruin_sentinel",
    monsterPool: ["ruin_sentinel", "ruin_rune_doll"],
    nodeMapId: "gate_tutorial_ruins_01",
    description: REGION_TEXT.broken_ruins.description,
  },
  {
    id: "mana_mine",
    image: "",
    imagePosition: "center",
    name: REGION_TEXT.mana_mine.name,
    recommendedLevel: 6,
    monsterId: "mine_golem",
    monsterPool: ["mine_golem", "mine_crystal_bug", "mine_core_golem"],
    description: REGION_TEXT.mana_mine.description,
  },
  {
    id: "rift_gate",
    image: "",
    imagePosition: "center",
    name: REGION_TEXT.rift_gate.name,
    recommendedLevel: 8,
    monsterId: "rift_knight",
    monsterPool: ["rift_knight", "rift_squire", "rift_shieldbearer"],
    bossId: "rift_warden",
    bossMode: "damage_threshold",
    bossDamageThresholdPercent: 20,
    description: REGION_TEXT.rift_gate.description,
  },
];

export const gateMaps = [
  {
    id: "gate_tutorial_ruins_01",
    name: GATE_MAP_TEXT.gate_tutorial_ruins_01.name,
    type: "Gate",
    rank: "D",
    collapseTurn: 20,
    memoryKey: "tutorial_ruins_gate",
    editor: {
      coordinateMode: "manual-grid",
      coordinateBounds: { xMin: -2, xMax: 2, yMin: 0, yMax: 5 },
      note: "Editor-ready: tune x/y, connected, type, and outcome fields against the selected background image.",
      nodeTypeBudgets: {
        start: { min: 1, max: 1 },
        battle: { min: 1, max: 6 },
        elite: { min: 0, max: 3 },
        boss: { min: 1, max: 1 },
        hidden_boss: { min: 0, max: 1 },
        treasure: { min: 0, max: 3 },
        hidden_treasure: { min: 0, max: 2 },
        merchant: { min: 0, max: 2 },
        rest: { min: 0, max: 2 },
        event: { min: 0, max: 4 },
        mystery: { min: 0, max: 4 },
        hidden_piece: { min: 0, max: 3 },
      },
    },
    nodes: [
      { id: "start_01", type: "start", x: 0, y: 0, connected: ["battle_01", "event_01"], revealedByDefault: true },
      { id: "battle_01", type: "battle", x: -1, y: 1, monsterPool: ["ruin_sentinel"], connected: ["elite_01", "treasure_01", "rest_01"] },
      { id: "event_01", type: "event", x: 1, y: 1, eventId: "old_altar_event", connected: ["hidden_piece_01", "merchant_01"] },
      { id: "elite_01", type: "elite", x: -1.35, y: 2, monsterPool: ["rift_knight"], connected: ["boss_01"] },
      { id: "treasure_01", type: "treasure", x: -0.25, y: 2, rewardTable: ["rusty_sword", "shore_ring"], connected: ["boss_01"] },
      { id: "rest_01", type: "rest", x: -0.9, y: 3, connected: ["boss_01"] },
      { id: "merchant_01", type: "merchant", x: 1.35, y: 2, shopId: "tutorial_ruins_merchant", connected: ["boss_01"] },
      { id: "hidden_piece_01", type: "hidden_piece", x: 0.75, y: 2, hiddenPieceId: "broken_mana_core", unlockCondition: "hp_below_30_percent", connected: ["hidden_treasure_01", "hidden_boss_01"] },
      { id: "hidden_treasure_01", type: "hidden_treasure", x: 0.45, y: 3, rewardTable: ["mana_necklace", "lucky_ring"], connected: ["boss_01"] },
      { id: "hidden_boss_01", type: "hidden_boss", x: 1.35, y: 3, bossId: "rift_warden", unlockCondition: "found_broken_mana_core", connected: ["boss_01"] },
      { id: "boss_01", type: "boss", x: 0, y: 4, bossId: "rift_warden", connected: [] },
    ],
  },
];



