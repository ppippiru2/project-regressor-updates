import { EQUIPMENT_SCORE_BALANCE } from "../balance/equipmentValueBalance.js?v=357";

export function equipmentScore(item) {
  if (!item) return 0;
  const optionScore = (item.options || []).reduce(
    (sum, option) =>
      sum
        + (EQUIPMENT_SCORE_BALANCE.optionWeights[option.type] || EQUIPMENT_SCORE_BALANCE.fallbackOptionWeight)
          * option.value,
    0
  );
  return Math.round(
    (item.attack || 0) * EQUIPMENT_SCORE_BALANCE.attackWeight
      + (item.defense || 0) * EQUIPMENT_SCORE_BALANCE.defenseWeight
      + optionScore,
  );
}

export function equipmentScoreDelta(item, equipmentState, getItem) {
  const candidateScore = equipmentScore(item);
  const baselineScore = equipmentScore(getComparisonItem(item, equipmentState, getItem));
  return candidateScore - baselineScore;
}

function getComparisonItem(item, equipmentState, getItem) {
  if (!item || !equipmentState || typeof getItem !== "function") return null;
  if (item.slot !== "Ring") return getItem(equipmentState[item.slot]?.itemId);

  const ringItems = ["Ring1", "Ring2"].map((slot) => getItem(equipmentState[slot]?.itemId)).filter(Boolean);
  if (ringItems.length < 2) return null;
  return ringItems.sort((left, right) => equipmentScore(left) - equipmentScore(right))[0];
}
