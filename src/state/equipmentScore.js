const OPTION_SCORE = {
  STR: 4,
  AGI: 3,
  VIT: 3,
  INT: 3,
  WIS: 3,
  LUK: 2,
};

export function equipmentScore(item) {
  if (!item) return 0;
  const optionScore = (item.options || []).reduce(
    (sum, option) => sum + (OPTION_SCORE[option.type] || 2) * option.value,
    0
  );
  return Math.round((item.attack || 0) * 12 + (item.defense || 0) * 8 + optionScore);
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
