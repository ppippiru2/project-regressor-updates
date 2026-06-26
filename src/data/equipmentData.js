import { getLocaleText } from "../localization/index.js?v=280";

const EQUIPMENT_NAMES = getLocaleText().data.equipmentNames;

export const equipment = [
  { id: "rusty_sword", name: EQUIPMENT_NAMES.rusty_sword, slot: "Weapon", rarity: "common", attack: 1, defaultEffectType: "slash", options: [{ type: "STR", value: 1 }] },
  { id: "hunter_bow", name: EQUIPMENT_NAMES.hunter_bow, slot: "Weapon", rarity: "uncommon", attack: 2, defaultEffectType: "projectile", options: [{ type: "AGI", value: 2 }] },
  { id: "golem_fist", name: EQUIPMENT_NAMES.golem_fist, slot: "Weapon", rarity: "rare", attack: 4, defaultEffectType: "impact", options: [{ type: "VIT", value: 2 }] },
  { id: "rift_blade", name: EQUIPMENT_NAMES.rift_blade, slot: "Weapon", rarity: "heroic", attack: 7, defaultEffectType: "slash", options: [{ type: "STR", value: 3 }, { type: "LUK", value: 1 }] },
  { id: "worn_gloves", name: EQUIPMENT_NAMES.worn_gloves, slot: "Gloves", rarity: "common", defense: 1, options: [{ type: "AGI", value: 1 }] },
  { id: "wolf_leather_armor", name: EQUIPMENT_NAMES.wolf_leather_armor, slot: "Armor", rarity: "uncommon", defense: 2, options: [{ type: "VIT", value: 2 }] },
  { id: "swift_boots", name: EQUIPMENT_NAMES.swift_boots, slot: "Boots", rarity: "uncommon", defense: 1, options: [{ type: "AGI", value: 2 }] },
  { id: "sentinel_helmet", name: EQUIPMENT_NAMES.sentinel_helmet, slot: "Helmet", rarity: "rare", defense: 1, options: [{ type: "WIS", value: 2 }] },
  { id: "tower_shield_armor", name: EQUIPMENT_NAMES.tower_shield_armor, slot: "Armor", rarity: "rare", defense: 4, options: [{ type: "VIT", value: 3 }] },
  { id: "mana_necklace", name: EQUIPMENT_NAMES.mana_necklace, slot: "Necklace", rarity: "rare", defense: 1, options: [{ type: "INT", value: 2 }, { type: "WIS", value: 2 }] },
  { id: "ore_plate", name: EQUIPMENT_NAMES.ore_plate, slot: "Armor", rarity: "heroic", defense: 6, options: [{ type: "VIT", value: 4 }] },
  { id: "lucky_ring", name: EQUIPMENT_NAMES.lucky_ring, slot: "Ring", rarity: "rare", defense: 0, options: [{ type: "LUK", value: 3 }] },
  { id: "shore_ring", name: EQUIPMENT_NAMES.shore_ring, slot: "Ring", rarity: "common", defense: 0, options: [{ type: "WIS", value: 1 }] },
  { id: "rift_gauntlets", name: EQUIPMENT_NAMES.rift_gauntlets, slot: "Gloves", rarity: "heroic", defense: 2, options: [{ type: "STR", value: 2 }, { type: "AGI", value: 2 }] },
  { id: "regressor_charm", name: EQUIPMENT_NAMES.regressor_charm, slot: "Necklace", rarity: "legendary", defense: 2, options: [{ type: "LUK", value: 4 }, { type: "WIS", value: 3 }] },
  { id: "warden_crown", name: EQUIPMENT_NAMES.warden_crown, slot: "Helmet", rarity: "legendary", defense: 5, options: [{ type: "INT", value: 4 }, { type: "WIS", value: 4 }] },
  { id: "perfect_timeline_ring", name: EQUIPMENT_NAMES.perfect_timeline_ring, slot: "Ring", rarity: "legendary", defense: 1, options: [{ type: "STR", value: 3 }, { type: "AGI", value: 3 }, { type: "LUK", value: 3 }] },
  { id: "ash_boots", name: EQUIPMENT_NAMES.ash_boots, slot: "Boots", rarity: "rare", defense: 2, options: [{ type: "AGI", value: 3 }] },
  { id: "iron_gloves", name: EQUIPMENT_NAMES.iron_gloves, slot: "Gloves", rarity: "common", defense: 1, options: [{ type: "STR", value: 1 }] },
  { id: "novice_helmet", name: EQUIPMENT_NAMES.novice_helmet, slot: "Helmet", rarity: "common", defense: 1, options: [{ type: "VIT", value: 1 }] },
];
