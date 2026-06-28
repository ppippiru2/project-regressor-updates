import { getLocaleText } from "../localization/index.js?v=453";
import { LOOT_ITEM_BALANCE_DATA } from "../balance/itemBalanceData.js?v=453";
import { equipment } from "./equipmentData.js?v=453";

const ITEM_TEXT = getLocaleText().data;
const ITEM_NAMES = ITEM_TEXT.itemNames || {};
const ITEM_DESCRIPTIONS = ITEM_TEXT.itemDescriptions || {};
const ITEM_TYPE_LABELS = ITEM_TEXT.itemTypeLabels || {};
const LOOT_TYPE_SORT_ORDER = Object.freeze({
  codex_fragment: 10,
  mana_crystal: 20,
  skill_fragment: 30,
  skill_rune: 40,
});

export const lootItems = LOOT_ITEM_BALANCE_DATA.map((item) => ({
  ...item,
  isLootItem: true,
  lootCategory: item.type,
  lootSortOrder: LOOT_TYPE_SORT_ORDER[item.type] || 99,
  name: ITEM_NAMES[item.id] || item.id,
  description: ITEM_DESCRIPTIONS[item.id] || "",
  typeLabel: ITEM_TYPE_LABELS[item.type] || item.type,
}));

export const items = [...equipment, ...lootItems];

export function isEquipmentItem(item) {
  return Boolean(item?.slot);
}

