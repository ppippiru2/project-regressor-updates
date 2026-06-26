import { getLocaleText } from "../localization/index.js?v=351";
import { ITEM_BALANCE_DATA } from "../balance/itemBalanceData.js?v=351";

const EQUIPMENT_NAMES = getLocaleText().data.equipmentNames;

export const equipment = ITEM_BALANCE_DATA.map((item) => ({
  ...item,
  name: EQUIPMENT_NAMES[item.id],
}));
