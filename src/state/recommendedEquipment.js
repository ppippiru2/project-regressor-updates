import { equipInventoryItem } from "./equipmentActions.js?v=400";
import { equipmentScore } from "./equipmentScore.js?v=400";
import { t, tf } from "../localization/index.js?v=400";

export function equipRecommendedItems({ equipmentState, inventory, getItem }) {
  let nextInventory = inventory;
  const equipped = [];
  const maxSteps = inventory.reduce((sum, entry) => sum + entry.count, 0);

  for (let step = 0; step < maxSteps; step += 1) {
    const candidate = bestEquipmentCandidate(nextInventory, equipmentState, getItem);
    if (!candidate) break;

    const result = equipInventoryItem({
      equipmentState,
      inventory: nextInventory,
      itemId: candidate.item.id,
      item: candidate.item,
      slot: candidate.slot,
    });
    if (!result.equipped) break;

    nextInventory = result.inventory;
    equipped.push({ name: candidate.item.name, delta: candidate.delta });
  }

  if (equipped.length === 0) {
    return {
      changed: false,
      inventory,
      message: t("stateMessages.noRecommendedEquipment"),
    };
  }

  const names = equipped.slice(0, 4).map((item) => `${item.name} +${item.delta}`);
  const suffix = equipped.length > 4 ? tf("stateMessages.recommendedEquipmentMore", { count: equipped.length - 4 }) : "";
  return {
    changed: true,
    inventory: nextInventory,
    message: tf("stateMessages.recommendedEquipmentDone", { items: names.join(", "), suffix }),
  };
}

function bestEquipmentCandidate(inventory, equipmentState, getItem) {
  return inventory
    .map((entry) => {
      const item = getItem(entry.itemId);
      const slot = resolveRecommendedSlot(item, equipmentState, getItem);
      const equippedItem = slot ? getItem(equipmentState[slot]?.itemId) : null;
      const delta = equipmentScore(item) - equipmentScore(equippedItem);
      return { item, slot, delta };
    })
    .filter((candidate) => candidate.item && candidate.slot && candidate.delta > 0)
    .sort((left, right) => right.delta - left.delta)[0];
}

function resolveRecommendedSlot(item, equipmentState, getItem) {
  if (!item) return null;
  if (item.slot !== "Ring") return item.slot;
  if (!equipmentState.Ring1) return "Ring1";
  if (!equipmentState.Ring2) return "Ring2";

  const ringScores = ["Ring1", "Ring2"].map((slot) => ({
    slot,
    score: equipmentScore(getItem(equipmentState[slot]?.itemId)),
  }));
  return ringScores.sort((left, right) => left.score - right.score)[0].slot;
}
