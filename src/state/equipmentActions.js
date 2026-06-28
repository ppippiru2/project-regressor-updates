import { addInventoryItem, consumeInventoryItem } from "./inventory.js";
import { tf } from "../localization/index.js?v=487";

export function equipInventoryItem({ equipmentState, inventory, itemId, item, slot }) {
  const inventoryEntry = inventory.find((entry) => entry.itemId === itemId);
  if (!item || !inventoryEntry || !slot) return { equipped: false, inventory, message: "" };

  let nextInventory = inventory;
  if (equipmentState[slot]) nextInventory = addInventoryItem(nextInventory, equipmentState[slot].itemId);
  equipmentState[slot] = { itemId };
  nextInventory = consumeInventoryItem(nextInventory, itemId);

  return { equipped: true, inventory: nextInventory, message: tf("equipmentActions.equipped", { itemName: item.name }) };
}

export function unequipEquipmentSlot({ equipmentState, inventory, slot, getItemName = (itemId) => itemId }) {
  const entry = equipmentState[slot];
  if (!entry) return { unequipped: false, inventory, itemId: null, message: "" };

  const nextInventory = addInventoryItem(inventory, entry.itemId);
  equipmentState[slot] = null;

  return {
    unequipped: true,
    inventory: nextInventory,
    itemId: entry.itemId,
    message: tf("equipmentActions.unequipped", { itemName: getItemName(entry.itemId) }),
  };
}

export function resolveEquipmentSlot(item, equipped) {
  if (item.slot !== "Ring") return item.slot;
  if (!equipped.Ring1) return "Ring1";
  if (!equipped.Ring2) return "Ring2";
  return "Ring1";
}



