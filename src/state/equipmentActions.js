import { addInventoryItem, consumeInventoryItem } from "./inventory.js";
import { t, tf } from "../localization/index.js?v=681";

const OFFHAND_SLOT = "OffHand";
const MAINHAND_SLOT = "Weapon";
const TWO_HANDED = "twoHanded";

export function equipInventoryItem({
  equipmentState,
  inventory,
  itemId,
  item,
  slot,
  getItem = () => null,
  getItemName = (id) => getItem(id)?.name || id,
}) {
  const inventoryEntry = inventory.find((entry) => entry.itemId === itemId);
  if (!item || !inventoryEntry || !slot) return { equipped: false, inventory, message: "" };
  if (slot === OFFHAND_SLOT && !canEquipOffHand({ equipmentState, offHandItem: item, getItem })) {
    return {
      equipped: false,
      inventory,
      message: t("equipmentActions.offHandBlocked"),
    };
  }

  let nextInventory = inventory;
  const messages = [];
  if (slot === MAINHAND_SLOT && disablesOffHandSlot(item) && equipmentState[OFFHAND_SLOT]) {
    const offHandItemId = equipmentState[OFFHAND_SLOT].itemId;
    nextInventory = addInventoryItem(nextInventory, offHandItemId);
    equipmentState[OFFHAND_SLOT] = null;
    messages.push(tf("equipmentActions.offHandAutoUnequipped", { itemName: getItemName(offHandItemId) }));
  }
  if (equipmentState[slot]) nextInventory = addInventoryItem(nextInventory, equipmentState[slot].itemId);
  equipmentState[slot] = { itemId };
  nextInventory = consumeInventoryItem(nextInventory, itemId);
  messages.unshift(tf("equipmentActions.equipped", { itemName: item.name }));

  return { equipped: true, inventory: nextInventory, message: messages.join(" ") };
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

export function canEquipOffHand({ equipmentState, offHandItem, getItem = () => null }) {
  if (!offHandItem) return true;
  if (offHandItem.slot !== OFFHAND_SLOT) return false;

  const mainWeapon = getEquippedItem(equipmentState, MAINHAND_SLOT, getItem);
  if (!mainWeapon) return false;
  if (disablesOffHandSlot(mainWeapon)) return false;

  return isAllowedOffHandPair(mainWeapon, offHandItem);
}

export function isOffHandSlotDisabled(equipmentState, getItem = () => null) {
  return disablesOffHandSlot(getEquippedItem(equipmentState, MAINHAND_SLOT, getItem));
}

export function disablesOffHandSlot(item) {
  return item?.handType === TWO_HANDED || item?.disablesOffHand === true;
}

export function isAllowedOffHandPair(mainWeapon, offHandItem) {
  const mainWeaponType = String(mainWeapon?.weaponType || "");
  const offHandType = String(offHandItem?.offHandType || "");

  if (["shield", "small_buckler"].includes(offHandType)) {
    return ["sword", "mace", "axe", "wand"].includes(mainWeaponType);
  }
  if (["grimoire", "orb", "focus", "catalyst"].includes(offHandType)) {
    return ["wand", "staff_onehand"].includes(mainWeaponType);
  }
  if (["dagger", "secondary_weapon"].includes(offHandType)) {
    return ["dagger", "sword"].includes(mainWeaponType);
  }
  return false;
}

function getEquippedItem(equipmentState, slot, getItem) {
  const itemId = equipmentState?.[slot]?.itemId;
  return itemId ? getItem(itemId) : null;
}
