import { equipmentScoreDelta } from "./equipmentScore.js?v=508";
import { t, tf } from "../localization/index.js?v=508";

export function droppedEquipmentInsight(item, equipmentState, getItem) {
  if (!item || !equipmentState || typeof getItem !== "function") return null;

  const delta = equipmentScoreDelta(item, equipmentState, getItem);
  if (delta <= 0) return null;

  return {
    delta,
    message: tf("stateMessages.lootInsight", {
      itemName: item.name || item.id || t("stateMessages.fallbackEquipment"),
      delta,
    }),
  };
}



