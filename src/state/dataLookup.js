import { t } from "../localization/index.js?v=382";

export function findById(collection, id) {
  return collection.find((item) => item.id === id);
}

export function displayNameFor(displayNames, key) {
  return displayNames[key] || key;
}

export function itemOptionText(item, displayName) {
  const options = item.options?.map((option) => `${displayName(option.type)} +${option.value}`).join(", ");
  const base = [];
  if (item.attack) base.push(`${t("equipmentActions.attack")} +${item.attack}`);
  if (item.defense) base.push(`${t("equipmentActions.defense")} +${item.defense}`);
  if (options) base.push(options);
  return base.join(" / ");
}

export function equippedItemList(equipmentState, equipmentData) {
  return Object.values(equipmentState)
    .filter(Boolean)
    .map((entry) => findById(equipmentData, entry.itemId))
    .filter(Boolean);
}
