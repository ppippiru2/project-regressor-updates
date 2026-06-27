export const LEVEL_UP_FREE_POINTS = 2;

export const PLAYER_INITIAL_STATS = {
  STR: 2,
  AGI: 2,
  VIT: 2,
  INT: 2,
  WIS: 2,
  LUK: 1,
};

export const PLAYER_BASE_STAT_VALUES = { ...PLAYER_INITIAL_STATS };

export const PLAYER_BASE_STAT_VALUE = 2;

export const INITIAL_CREATION_STAT_BALANCE = {
  total: 11,
  fallbackValue: PLAYER_BASE_STAT_VALUE,
  startingStats: { ...PLAYER_INITIAL_STATS },
  minValues: { ...PLAYER_INITIAL_STATS },
};

export const STARTER_TRAIT_BONUSES = {
  lower_weapon_mastery: {
    stats: { STR: 1 },
  },
  lower_mobility_sense: {
    stats: { AGI: 1 },
  },
  lower_survival_sense: {
    stats: { VIT: 1 },
  },
  lower_mana_sense: {
    stats: { INT: 1 },
  },
};

export const BULK_STAT_DEALLOCATE_AMOUNT = 10;
