import { equipmentScoreDelta } from "../state/equipmentScore.js?v=675";
import { canEquipOffHand } from "../state/equipmentActions.js?v=675";
import { t, tf } from "../localization/index.js?v=675";
import { byId, escapeHtml, itemIconSlot, itemInfoAttrs } from "./inventoryRenderHelpers.js?v=675";

const RARITY_ORDER = {
  legendary: 5,
  heroic: 4,
  rare: 3,
  uncommon: 2,
  common: 1,
};

export function createInventoryListRows(inventory, equipmentState, getItem, displayName, optionText) {
  return inventory
    .map((entry) => {
      const item = getItem(entry.itemId);
      if (!item) return null;
      const isEquipment = Boolean(item.slot);
      const scoreDelta = isEquipment ? equipmentScoreDelta(item, equipmentState, getItem) : 0;
      const scoreClass = scoreDelta > 0 ? "is-upgrade" : scoreDelta < 0 ? "is-downgrade" : "is-sidegrade";
      const scoreText =
        !isEquipment
          ? (item.typeLabel || t("inventoryUi.lootItem"))
          : scoreDelta > 0
          ? tf("inventoryUi.valuePositive", { value: scoreDelta })
          : scoreDelta < 0
            ? tf("inventoryUi.valueNegative", { value: scoreDelta })
            : t("inventoryUi.sameValue");
      const rarityScore = RARITY_ORDER[item.rarity] || 0;
      const blockedReason = isEquipment ? equipmentBlockedReason(item, equipmentState, getItem) : "";
      const actionLabel = blockedReason
        ? t("inventoryUi.disabled")
        : isEquipment && isFilledTargetSlot(item, equipmentState)
          ? t("inventoryUi.replace")
          : t("inventoryUi.equip");
      return { entry, item, isEquipment, scoreDelta, scoreClass, scoreText, rarityScore, actionLabel, blockedReason, displayName, optionText };
    })
    .filter(Boolean);
}

export function inventoryListSummary(rows = []) {
  return {
    totalInventoryCount: rows.reduce((sum, row) => sum + row.entry.count, 0),
    upgradeCount: rows.reduce(
      (count, row) => count + (row.isEquipment && row.scoreDelta > 0 ? row.entry.count : 0),
      0,
    ),
  };
}

export function renderInventoryList(rows = [], displayName, optionText, getItemIconPath = () => "") {
  const listElement = byId("inventory-list");
  if (!listElement) return;

  if (rows.length === 0) {
    listElement.innerHTML = `<p class="muted empty-list">${escapeHtml(t("inventoryUi.emptyEquipmentList"))}</p>`;
    return;
  }

  listElement.innerHTML = rows
    .sort(
      (left, right) =>
        right.scoreDelta - left.scoreDelta ||
        Number(right.isEquipment) - Number(left.isEquipment) ||
        lootSortOrder(left.item) - lootSortOrder(right.item) ||
        right.rarityScore - left.rarityScore ||
        left.item.name.localeCompare(right.item.name, "ko"),
    )
    .map(({ entry, item, isEquipment, scoreClass, scoreText, actionLabel, blockedReason }) => {
      const iconPath = getItemIconPath(item);
      const metaText = isEquipment
        ? `${displayName(item.slot)}${t("inventoryUi.separator")}${optionText(item)}`
        : `${item.typeLabel || t("inventoryUi.lootItem")}${item.description ? `${t("inventoryUi.separator")}${item.description}` : ""}`;
      return `<div class="item ${scoreClass}${isEquipment ? " is-equipment-item" : ` is-loot-item ${lootTypeClass(item)}`}">
        ${itemIconSlot({ item, iconPath, label: tf("inventoryUi.itemIcon", { name: item.name }) })}
        <div class="item-main">
          <div class="item-title-row">
            <strong class="rarity-${item.rarity} info-term" tabindex="0" role="button" ${itemInfoAttrs(item, displayName, optionText)}>${escapeHtml(item.name)}</strong>
            <span class="item-count">x${entry.count}</span>
          </div>
          <div class="muted">${escapeHtml(metaText)}</div>
        </div>
        <div class="item-actions">
          <span class="item-score">${escapeHtml(scoreText)}</span>
          ${isEquipment ? `<button class="inventory-action-button inventory-action-button-equip" data-equip="${item.id}"${blockedReason ? " disabled" : ""}${blockedReason ? ` title="${escapeHtml(blockedReason)}"` : ""}>${escapeHtml(actionLabel)}</button>` : ""}
        </div>
      </div>`;
    })
    .join("");
}

function lootSortOrder(item) {
  return Number.isFinite(item?.lootSortOrder) ? item.lootSortOrder : 99;
}

function lootTypeClass(item) {
  const type = String(item?.lootCategory || item?.type || "unknown").replace(/[^a-z0-9_-]/gi, "-");
  return `is-loot-type-${type}`;
}

function isFilledTargetSlot(item, equipmentState) {
  if (!item || !equipmentState) return false;
  if (item.slot !== "Ring") return Boolean(equipmentState[item.slot]);
  return Boolean(equipmentState.Ring1 && equipmentState.Ring2);
}

function equipmentBlockedReason(item, equipmentState, getItem) {
  if (item?.slot !== "OffHand") return "";
  return canEquipOffHand({ equipmentState, offHandItem: item, getItem })
    ? ""
    : t("inventoryUi.offHandUnavailable");
}
