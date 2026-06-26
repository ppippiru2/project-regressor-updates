export const SHOP_PRICE_BALANCE = {
  raritySellBase: {
    common: 12,
    uncommon: 24,
    rare: 48,
    heroic: 96,
    legendary: 180,
  },
  sellValueWeights: {
    stat: 9,
    resistance: 4,
    attack: 6,
    defense: 5,
  },
  minimumSellPrice: 5,
  minimumBuyPrice: 10,
  fallbackBuyMultiplier: 3,
};

export const EQUIPMENT_SCORE_BALANCE = {
  optionWeights: {
    STR: 4,
    AGI: 3,
    VIT: 3,
    INT: 3,
    WIS: 3,
    LUK: 2,
  },
  fallbackOptionWeight: 2,
  attackWeight: 12,
  defenseWeight: 8,
};
