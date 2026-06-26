import { getLocaleText } from "../localization/index.js?v=334";
import { ITEM_BALANCE_DATA } from "../balance/itemBalanceData.js?v=334";

const EQUIPMENT_NAMES = getLocaleText().data.equipmentNames;

export const equipment = ITEM_BALANCE_DATA.map((item) => ({
  ...item,
  name: EQUIPMENT_NAMES[item.id],
}));
