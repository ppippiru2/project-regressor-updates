import { getLocaleText } from "../localization/index.js?v=422";
import { LOOT_ITEM_BALANCE_DATA } from "../balance/itemBalanceData.js?v=422";
import { equipment } from "./equipmentData.js?v=422";

const ITEM_TEXT = getLocaleText().data;
const ITEM_NAMES = ITEM_TEXT.itemNames || {};
const ITEM_DESCRIPTIONS = ITEM_TEXT.itemDescriptions || {};
const ITEM_TYPE_LABELS = ITEM_TEXT.itemTypeLabels || {};

export const lootItems = LOOT_ITEM_BALANCE_DATA.map((item) => ({
  ...item,
  name: ITEM_NAMES[item.id] || item.id,
  description: ITEM_DESCRIPTIONS[item.id] || "",
  typeLabel: ITEM_TYPE_LABELS[item.type] || item.type,
}));

export const items = [...equipment, ...lootItems];

export function isEquipmentItem(item) {
  return Boolean(item?.slot);
}
