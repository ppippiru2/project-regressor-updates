import { getLocaleText } from "../localization/index.js?v=487";
import { ITEM_BALANCE_DATA } from "../balance/itemBalanceData.js?v=487";

const EQUIPMENT_NAMES = getLocaleText().data.equipmentNames;

export const equipment = ITEM_BALANCE_DATA.map((item) => ({
  ...item,
  name: EQUIPMENT_NAMES[item.id],
}));



