import { itemSellPrice, shopBuyPrice } from "../state/shop.js?v=353";
import { getLocaleText, t, tf } from "../localization/index.js?v=353";

const byId = (id) => document.getElementById(id);
const INVENTORY_TEXT = getLocaleText().inventoryUi;

export function renderShop({
  state,
  catalog = [],
  categories = [],
  getItem,
  displayName,
  optionText,
  getItemIconPath = () => "",
}) {
  const gold = Number(state?.player?.gold) || 0;
  const summary = byId("shop-summary");
  if (summary) summary.textContent = tf("inventoryUi.shopGoldSummary", { gold: gold.toLocaleString() });

  renderShopStock({
    catalog,
    categories,
    gold,
    getItem,
    displayName,
    optionText,
    getItemIconPath,
  });
  renderShopSellList({
    inventory: state?.inventory || [],
    getItem,
    displayName,
    optionText,
    getItemIconPath,
  });
}

function renderShopStock({ catalog, categories, gold, getItem, displayName, optionText, getItemIconPath }) {
  const container = byId("shop-stock-list");
  if (!container) return;

  const categoryOrder = new Map(categories.map((category, index) => [category.id, index]));
  const rows = catalog
    .map((entry) => {
      const item = getItem(entry.itemId);
      if (!item) return null;
      const price = shopBuyPrice(entry, item);
      const category = categories.find((candidate) => candidate.id === entry.category);
      return { entry, item, price, category, categoryIndex: categoryOrder.get(entry.category) ?? 999 };
    })
    .filter(Boolean)
    .sort((left, right) => left.categoryIndex - right.categoryIndex || left.price - right.price);

  if (!rows.length) {
    container.innerHTML = `<p class="muted empty-list">${escapeHtml(t("inventoryUi.emptyShopStock"))}</p>`;
    return;
  }

  container.innerHTML = rows
    .map(({ entry, item, price, category }) => {
      const disabled = gold < price;
      const iconPath = getItemIconPath(item);
      return `<article class="item shop-card ${disabled ? "is-unaffordable" : ""}">
        ${itemIconSlot({ item, iconPath, label: tf("inventoryUi.itemIcon", { name: item.name }) })}
        <div class="item-main">
          <div class="item-title-row">
            <strong class="rarity-${item.rarity} info-term" tabindex="0" role="button" ${itemInfoAttrs(item, displayName, optionText)}>${escapeHtml(item.name)}</strong>
            <span class="shop-category">${escapeHtml(category?.name || t("inventoryUi.shopFallbackCategory"))}</span>
          </div>
          <div class="muted">${displayName(item.slot)}${t("inventoryUi.separator")}${optionText(item)}</div>
          <small>${escapeHtml(entry.note || category?.description || t("inventoryUi.shopFallbackNote"))}</small>
        </div>
        <div class="item-actions">
          <span class="shop-price">${price.toLocaleString()} G</span>
          <button class="inventory-action-button inventory-action-button-equip" data-shop-buy="${entry.id}" ${disabled ? "disabled" : ""}>${escapeHtml(t("inventoryUi.buy"))}</button>
        </div>
      </article>`;
    })
    .join("");
}

function renderShopSellList({ inventory, getItem, displayName, optionText, getItemIconPath }) {
  const container = byId("shop-sell-list");
  if (!container) return;

  const rows = inventory
    .map((entry) => {
      const item = getItem(entry.itemId);
      if (!item) return null;
      return { entry, item, price: itemSellPrice(item) };
    })
    .filter(Boolean)
    .sort((left, right) => right.price - left.price || left.item.name.localeCompare(right.item.name, "ko"));

  if (!rows.length) {
    container.innerHTML = `<p class="muted empty-list">${escapeHtml(t("inventoryUi.emptySellList"))}</p>`;
    return;
  }

  container.innerHTML = rows
    .map(({ entry, item, price }) => {
      const iconPath = getItemIconPath(item);
      return `<article class="item shop-card">
        ${itemIconSlot({ item, iconPath, label: tf("inventoryUi.itemIcon", { name: item.name }) })}
        <div class="item-main">
          <div class="item-title-row">
            <strong class="rarity-${item.rarity} info-term" tabindex="0" role="button" ${itemInfoAttrs(item, displayName, optionText)}>${escapeHtml(item.name)}</strong>
            <span class="item-count">x${entry.count}</span>
          </div>
          <div class="muted">${displayName(item.slot)}${t("inventoryUi.separator")}${optionText(item)}</div>
        </div>
        <div class="item-actions">
          <span class="shop-price">${price.toLocaleString()} G</span>
          <button class="inventory-action-button inventory-action-button-unequip" data-shop-sell="${item.id}">${escapeHtml(t("inventoryUi.sell"))}</button>
        </div>
      </article>`;
    })
    .join("");
}

function itemIconSlot({ item, iconPath, label }) {
  const image = iconPath
    ? `<img src="${escapeHtml(iconPath)}" alt="" loading="lazy" decoding="async" />`
    : `<span class="item-icon-empty-mark" aria-hidden="true">${itemTypeMark(item)}</span>`;
  return `<span class="item-icon-slot rarity-frame-${item.rarity}" aria-label="${escapeHtml(label)}">${image}</span>`;
}

function itemTypeMark(item) {
  const marks = INVENTORY_TEXT.slotMarks || {};
  return marks[item?.slot] || "";
}

function itemInfoAttrs(item, displayName, optionText) {
  const rarity = rarityLabel(item.rarity);
  const bodyParts = [
    tf("inventoryUi.itemInfoSummary", { rarity, slotName: displayName(item.slot) }),
    optionText(item) ? tf("inventoryUi.itemInfoEffect", { effect: optionText(item) }) : "",
    item.description || t("inventoryUi.shopItemInfoFallback"),
  ].filter(Boolean);
  return `data-info-title="${escapeHtml(item.name)}" data-info-body="${escapeHtml(bodyParts.join(" "))}"`;
}

function rarityLabel(rarity) {
  return INVENTORY_TEXT.rarityLabels?.[rarity] || rarity || t("inventoryUi.equipmentFallback");
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}
