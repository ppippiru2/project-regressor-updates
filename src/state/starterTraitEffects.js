import { STARTER_TRAIT_BONUSES } from "../balance/playerGrowthBalance.js?v=385";

const STARTER_CARD_TRAIT_IDS = {
  starter_weapon_sense: "lower_weapon_mastery",
  starter_light_step: "lower_mobility_sense",
  starter_enduring_body: "lower_survival_sense",
  starter_faint_mana: "lower_mana_sense",
};

export function starterTraitStatBonuses(playerProfile = {}) {
  const traitId = playerProfile.starterTraitId || STARTER_CARD_TRAIT_IDS[playerProfile.starterCardId] || "";
  const bonus = STARTER_TRAIT_BONUSES[traitId]?.stats || {};
  return Object.fromEntries(
    Object.entries(bonus).filter(([, value]) => Number.isFinite(value) && value !== 0)
  );
}
