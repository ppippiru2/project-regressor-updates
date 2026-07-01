import { getLocaleText, t, tf } from "../localization/index.js?v=678";

export const INVENTORY_TEXT = getLocaleText().inventoryUi;

export const byId = (id) => document.getElementById(id);

export function itemIconSlot({ item, iconPath, label }) {
  const image = iconPath
    ? `<img src="${escapeHtml(iconPath)}" alt="" loading="lazy" decoding="async" />`
    : `<span class="item-icon-empty-mark" aria-hidden="true">${item ? itemTypeMark(item) : ""}</span>`;
  return `<span class="item-icon-slot ${item ? `rarity-frame-${item.rarity}` : "is-empty"}" aria-label="${escapeHtml(label)}">${image}</span>`;
}

export function itemInfoAttrs(item, displayName, optionText) {
  const title = item.name;
  const rarity = rarityLabel(item.rarity);
  const bodyParts = item.slot
    ? [
        tf("inventoryUi.itemInfoSummary", { rarity, slotName: displayName(item.slot) }),
        optionText(item) ? tf("inventoryUi.itemInfoEffect", { effect: optionText(item) }) : "",
        item.description || t("inventoryUi.itemInfoFallback"),
      ]
    : [
        tf("inventoryUi.lootItemInfoSummary", { rarity, type: item.typeLabel || t("inventoryUi.lootItem") }),
        item.description || t("inventoryUi.lootItemInfoFallback"),
      ];
  return `data-info-title="${escapeHtml(title)}" data-info-body="${escapeHtml(bodyParts.join(" "))}"`;
}

export function rarityLabel(rarity) {
  return INVENTORY_TEXT.rarityLabels?.[rarity] || rarity || t("inventoryUi.equipmentFallback");
}

export function escapeHtml(value) {
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

function itemTypeMark(item) {
  const marks = INVENTORY_TEXT.slotMarks || {};
  return marks[item?.slot] || marks[item?.type] || "";
}
