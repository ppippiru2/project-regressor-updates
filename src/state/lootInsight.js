import { equipmentScoreDelta } from "./equipmentScore.js?v=410";
import { t, tf } from "../localization/index.js?v=410";

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
