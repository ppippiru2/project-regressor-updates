import { equipmentScoreDelta } from "../state/equipmentScore.js?v=407";
import { getLocaleText, t, tf } from "../localization/index.js?v=407";

const byId = (id) => document.getElementById(id);
const INVENTORY_TEXT = getLocaleText().inventoryUi;
const RARITY_ORDER = {
  legendary: 5,
  heroic: 4,
  rare: 3,
  uncommon: 2,
  common: 1,
};

export function renderInventory(equipmentState, inventory, slots, displayName, getItem, optionText, getItemIconPath = () => "") {
  const equippedCount = slots.reduce((count, slot) => count + (equipmentState[slot] ? 1 : 0), 0);
  const inventoryRows = inventory
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
      const actionLabel = isEquipment && isFilledTargetSlot(item, equipmentState) ? t("inventoryUi.replace") : t("inventoryUi.equip");
      return { entry, item, isEquipment, scoreDelta, scoreClass, scoreText, rarityScore, actionLabel };
    })
    .filter(Boolean);
  const totalInventoryCount = inventoryRows.reduce((sum, row) => sum + row.entry.count, 0);
  const upgradeCount = inventoryRows.reduce(
    (count, row) => count + (row.isEquipment && row.scoreDelta > 0 ? row.entry.count : 0),
    0
  );

  const equipmentSummary = byId("equipment-summary");
  if (equipmentSummary) {
    equipmentSummary.textContent = tf("inventoryUi.equippedSummary", {
      equipped: equippedCount,
      total: slots.length,
    });
  }

  const inventorySummary = byId("inventory-summary");
  if (inventorySummary) {
    inventorySummary.textContent =
      totalInventoryCount > 0
        ? tf("inventoryUi.inventorySummary", {
            types: inventoryRows.length,
            total: totalInventoryCount,
            recommendedText:
              upgradeCount > 0
                ? tf("inventoryUi.recommendedCount", { count: upgradeCount })
                : t("inventoryUi.noRecommended"),
          })
        : t("inventoryUi.noAcquiredEquipment");
  }

  const recommendButton = byId("equip-recommended-button");
  if (recommendButton) {
    recommendButton.disabled = upgradeCount === 0;
    recommendButton.textContent =
      upgradeCount > 0 ? tf("inventoryUi.recommendEquipCount", { count: upgradeCount }) : t("inventoryUi.recommendEquip");
  }

  byId("equipment-slots").innerHTML = slots
    .map((slot) => {
      const entry = equipmentState[slot];
      const item = entry ? getItem(entry.itemId) : null;
      const iconPath = getItemIconPath(item);
      return `<div class="slot ${item ? "is-equipped" : "is-empty"}">
        ${itemIconSlot({
          item,
          iconPath,
          label: item
            ? tf("inventoryUi.itemIcon", { name: item.name })
            : tf("inventoryUi.emptyItemIcon", { name: displayName(slot) }),
        })}
        <div class="slot-main">
          <strong class="slot-name info-term" tabindex="0" role="button" data-info-key="slot:${slot}">${displayName(slot)}</strong>
          <div class="muted">${
            item
              ? `<span class="rarity-${item.rarity} info-term" tabindex="0" role="button" ${itemInfoAttrs(item, displayName, optionText)}>${escapeHtml(item.name)}</span>`
              : t("inventoryUi.emptyEquipped")
          }</div>
        </div>
        <div class="slot-actions">
          <span class="slot-state">${item ? t("inventoryUi.equipped") : t("inventoryUi.emptySlot")}</span>
          ${
            item
              ? `<button class="inventory-action-button inventory-action-button-unequip" data-unequip="${slot}" aria-label="${escapeHtml(tf("inventoryUi.unequipAria", { name: displayName(slot) }))}">${escapeHtml(t("inventoryUi.unequip"))}</button>`
              : ""
          }
        </div>
      </div>`;
    })
    .join("");

  if (inventoryRows.length === 0) {
    byId("inventory-list").innerHTML = `<p class="muted empty-list">${escapeHtml(t("inventoryUi.emptyEquipmentList"))}</p>`;
    return;
  }

  byId("inventory-list").innerHTML = inventoryRows
    .sort(
      (left, right) =>
        right.scoreDelta - left.scoreDelta ||
        right.rarityScore - left.rarityScore ||
        left.item.name.localeCompare(right.item.name, "ko")
    )
    .map(({ entry, item, isEquipment, scoreClass, scoreText, actionLabel }) => {
      const iconPath = getItemIconPath(item);
      const metaText = isEquipment
        ? `${displayName(item.slot)}${t("inventoryUi.separator")}${optionText(item)}`
        : `${item.typeLabel || t("inventoryUi.lootItem")}${item.description ? `${t("inventoryUi.separator")}${item.description}` : ""}`;
      return `<div class="item ${scoreClass}">
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
          ${isEquipment ? `<button class="inventory-action-button inventory-action-button-equip" data-equip="${item.id}">${escapeHtml(actionLabel)}</button>` : ""}
        </div>
      </div>`;
    })
    .join("");
}

function itemIconSlot({ item, iconPath, label }) {
  const image = iconPath
    ? `<img src="${escapeHtml(iconPath)}" alt="" loading="lazy" decoding="async" />`
    : `<span class="item-icon-empty-mark" aria-hidden="true">${item ? itemTypeMark(item) : ""}</span>`;
  return `<span class="item-icon-slot ${item ? `rarity-frame-${item.rarity}` : "is-empty"}" aria-label="${escapeHtml(label)}">${image}</span>`;
}

function itemTypeMark(item) {
  const marks = INVENTORY_TEXT.slotMarks || {};
  return marks[item?.slot] || marks[item?.type] || "";
}

function isFilledTargetSlot(item, equipmentState) {
  if (!item || !equipmentState) return false;
  if (item.slot !== "Ring") return Boolean(equipmentState[item.slot]);
  return Boolean(equipmentState.Ring1 && equipmentState.Ring2);
}

function itemInfoAttrs(item, displayName, optionText) {
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
