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
  totalRange: {
    min: 10,
    max: 13,
  },
  fallbackValue: PLAYER_BASE_STAT_VALUE,
  startingStats: { ...PLAYER_INITIAL_STATS },
  minValues: {
    STR: 1,
    AGI: 1,
    VIT: 1,
    INT: 1,
    WIS: 1,
    LUK: 1,
  },
};

export const STATUS_GRADE_ORDER = [
  "F-",
  "F",
  "F+",
  "E-",
  "E",
  "E+",
  "D-",
  "D",
  "D+",
  "C-",
  "C",
  "C+",
  "B-",
  "B",
  "B+",
  "A-",
  "A",
  "A+",
  "S-",
  "S",
  "S+",
  "SS-",
  "SS",
  "SS+",
  "SSS-",
  "SSS",
  "SSS+",
  "EX",
  "\uCD08\uC6D4",
  "God",
];

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
