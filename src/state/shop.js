import { addInventoryItem, consumeInventoryItem } from "./inventory.js";
import { t, tf } from "../localization/index.js?v=420";
import { SHOP_PRICE_BALANCE } from "../balance/equipmentValueBalance.js?v=420";

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
  return Math.max(
    SHOP_PRICE_BALANCE.minimumBuyPrice,
    Math.floor(itemSellPrice(item) * SHOP_PRICE_BALANCE.fallbackBuyMultiplier),
  );
}

export function itemSellPrice(item) {
  if (!item) return 0;
  const rarityBase = SHOP_PRICE_BALANCE.raritySellBase[item.rarity] || SHOP_PRICE_BALANCE.raritySellBase.common;
  const statValue = Object.values(item.stats || {}).reduce((sum, value) => sum + Math.max(0, Number(value) || 0), 0);
  const resistanceValue = Object.values(item.resistances || {}).reduce(
    (sum, value) => sum + Math.max(0, Number(value) || 0),
    0
  );
  const attackValue = Math.max(0, Number(item.attack || 0) + Number(item.magicAttack || 0));
  const defenseValue = Math.max(0, Number(item.defense || 0));
  const weights = SHOP_PRICE_BALANCE.sellValueWeights;
  return Math.max(
    SHOP_PRICE_BALANCE.minimumSellPrice,
    Math.floor(
      rarityBase
        + statValue * weights.stat
        + resistanceValue * weights.resistance
        + attackValue * weights.attack
        + defenseValue * weights.defense,
    ),
  );
}
