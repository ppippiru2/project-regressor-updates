import { getLocaleText } from "../localization/index.js?v=280";

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

export const skills = [
  {
    id: "power_slash",
    name: SKILL_TEXT.power_slash.name,
    type: "Active",
    mpCost: 2,
    cooldown: 4,
    damageType: "physical",
    element: "physical",
    multiplier: 1.35,
    effectType: "slash",
    breakPower: 1,
    stanceAllowed: ["power", "berserk"],
    triggerCondition: "always",
    description: SKILL_TEXT.power_slash.description,
  },
  {
    id: "mana_bolt",
    name: SKILL_TEXT.mana_bolt.name,
    type: "Active",
    mpCost: 3,
    cooldown: 5,
    damageType: "magic",
    element: "neutral",
    multiplier: 1.45,
    effectType: "magic",
    breakPower: 1,
    stanceAllowed: ["power", "berserk"],
    triggerCondition: "always",
    description: SKILL_TEXT.mana_bolt.description,
  },
  {
    id: "emergency_recovery",
    name: SKILL_TEXT.emergency_recovery.name,
    type: "Active",
    mpCost: 4,
    cooldown: 12,
    damageType: "support",
    element: "light",
    multiplier: 0,
    effectType: "holy",
    breakPower: 0,
    stanceAllowed: ["conserve", "power", "berserk", "break_wait"],
    triggerCondition: "playerHpBelow30",
    description: SKILL_TEXT.emergency_recovery.description,
  },
];
