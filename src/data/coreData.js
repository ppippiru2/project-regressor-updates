import { getLocaleText } from "../localization/index.js?v=352";
import { SKILL_BALANCE_DATA } from "../balance/skillBalanceData.js?v=352";

const DATA_TEXT = getLocaleText().data;
const SKILL_TEXT = DATA_TEXT.skills;

export const primaryStats = ["STR", "AGI", "VIT", "INT", "WIS", "LUK"];

export const displayNames = DATA_TEXT.displayNames;

export const slots = [
  "Weapon",
  "Helmet",
  "Armor",
  "Gloves",
  "Boots",
  "Necklace",
  "Ring1",
  "Ring2",
];

export const skills = SKILL_BALANCE_DATA.map((skill) => ({
  ...skill,
  name: SKILL_TEXT[skill.id].name,
  description: SKILL_TEXT[skill.id].description,
}));
