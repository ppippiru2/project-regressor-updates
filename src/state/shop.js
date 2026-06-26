import { addInventoryItem, consumeInventoryItem } from "./inventory.js";
import { t, tf } from "../localization/index.js?v=280";

const RARITY_SELL_BASE = {
  common: 12,
  uncommon: 24,
  rare: 48,
  heroic: 96,
  legendary: 180,
};

export function buyShopItem({ state, entry, item }) {
  if (!state || !entry || !item) {
    return { ok: false, message: t("shopMessages.itemMissing") };
  }

  const price = shopBuyPrice(entry, item);
  if (state.player.gold < price) {
    return {
      ok: false,
      message: tf("shopMessages.buyGoldMissing", { itemName: item.name, missingGold: price - state.player.gold }),
    };
  }

  state.player.gold -= price;
  state.inventory = addInventoryItem(state.inventory, item.id);
  return { ok: true, message: tf("shopMessages.buyDone", { itemName: item.name, price }) };
}

export function sellInventoryItem({ state, itemId, item }) {
  if (!state || !itemId || !item) {
    return { ok: false, message: t("shopMessages.sellItemMissing") };
  }

  const owned = state.inventory.find((entry) => entry.itemId === itemId);
  if (!owned || owned.count <= 0) {
    return { ok: false, message: tf("shopMessages.sellNoStock", { itemName: item.name }) };
  }

  const price = itemSellPrice(item);
  state.inventory = consumeInventoryItem(state.inventory, itemId, 1);
  state.player.gold += price;
  return { ok: true, message: tf("shopMessages.sellDone", { itemName: item.name, price }) };
}

export function shopBuyPrice(entry, item) {
  const explicitPrice = Number(entry?.price);
  if (Number.isFinite(explicitPrice) && explicitPrice >= 0) return Math.floor(explicitPrice);
  return Math.max(10, Math.floor(itemSellPrice(item) * 3));
}

export function itemSellPrice(item) {
  if (!item) return 0;
  const rarityBase = RARITY_SELL_BASE[item.rarity] || RARITY_SELL_BASE.common;
  const statValue = Object.values(item.stats || {}).reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
  const resistanceValue = Object.values(item.resistances || {}).reduce(
    (sum, value) => sum + Math.max(0, Number(value) || 0),
    0
  );
  const attackValue = Math.max(0, Number(item.attack || 0) + Number(item.magicAttack || 0));
  const defenseValue = Math.max(0, Number(item.defense || 0));
  return Math.max(5, Math.floor(rarityBase + statValue * 9 + resistanceValue * 4 + attackValue * 6 + defenseValue * 5));
}
