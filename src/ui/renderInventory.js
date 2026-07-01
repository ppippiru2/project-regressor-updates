import { t, tf } from "../localization/index.js?v=681";
import { renderCodexProgress } from "./renderCodexProgress.js?v=681";
import { renderEquipmentSlots } from "./renderEquipmentSlots.js?v=681";
import { byId } from "./inventoryRenderHelpers.js?v=681";
import { createInventoryListRows, inventoryListSummary, renderInventoryList } from "./renderInventoryList.js?v=681";

export function renderInventory(
  equipmentState,
  inventory,
  slots,
  displayName,
  getItem,
  optionText,
  getItemIconPath = () => "",
  options = {},
) {
  const equippedCount = slots.reduce((count, slot) => count + (equipmentState[slot] ? 1 : 0), 0);
  const inventoryRows = createInventoryListRows(inventory, equipmentState, getItem, displayName, optionText);
  const { totalInventoryCount, upgradeCount } = inventoryListSummary(inventoryRows);
  renderCodexProgress(inventory, getItem, options.tutorialUnlockState, options.dialogueRecords);

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

  renderEquipmentSlots(equipmentState, slots, displayName, getItem, optionText, getItemIconPath);

  renderInventoryList(inventoryRows, displayName, optionText, getItemIconPath);
}
