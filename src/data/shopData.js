import { getLocaleText } from "../localization/index.js?v=411";

const SHOP_TEXT = getLocaleText().data;
const SHOP_CATEGORIES = SHOP_TEXT.shopCategories;
const SHOP_NOTES = SHOP_TEXT.shopCatalogNotes;

export const shopCategories = [
  {
    id: "starter",
    name: SHOP_CATEGORIES.starter.name,
    description: SHOP_CATEGORIES.starter.description,
  },
  {
    id: "ruins",
    name: SHOP_CATEGORIES.ruins.name,
    description: SHOP_CATEGORIES.ruins.description,
  },
  {
    id: "regressor",
    name: SHOP_CATEGORIES.regressor.name,
    description: SHOP_CATEGORIES.regressor.description,
  },
];

export const shopCatalog = [
  {
    id: "shop_rusty_sword",
    itemId: "rusty_sword",
    category: "starter",
    price: 45,
    note: SHOP_NOTES.shop_rusty_sword,
  },
  {
    id: "shop_worn_gloves",
    itemId: "worn_gloves",
    category: "starter",
    price: 38,
    note: SHOP_NOTES.shop_worn_gloves,
  },
  {
    id: "shop_novice_helmet",
    itemId: "novice_helmet",
    category: "starter",
    price: 42,
    note: SHOP_NOTES.shop_novice_helmet,
  },
  {
    id: "shop_wolf_leather_armor",
    itemId: "wolf_leather_armor",
    category: "ruins",
    price: 120,
    note: SHOP_NOTES.shop_wolf_leather_armor,
  },
  {
    id: "shop_swift_boots",
    itemId: "swift_boots",
    category: "ruins",
    price: 145,
    note: SHOP_NOTES.shop_swift_boots,
  },
  {
    id: "shop_mana_necklace",
    itemId: "mana_necklace",
    category: "ruins",
    price: 180,
    note: SHOP_NOTES.shop_mana_necklace,
  },
  {
    id: "shop_lucky_ring",
    itemId: "lucky_ring",
    category: "regressor",
    price: 260,
    note: SHOP_NOTES.shop_lucky_ring,
  },
  {
    id: "shop_regressor_charm",
    itemId: "regressor_charm",
    category: "regressor",
    price: 620,
    note: SHOP_NOTES.shop_regressor_charm,
  },
];
