import { COMBAT_FORMATION_LIMITS } from "./combatDisplayConfig.js?v=386";

export function createCombatFormationState(state) {
  return {
    layout: "1v1",
    playerSlots: 1,
    enemySlots: state.target?.monsterId ? 1 : 1,
    visibleActorsPerSide: COMBAT_FORMATION_LIMITS.visibleActorsPerSide,
    compressedActorsPerSide: COMBAT_FORMATION_LIMITS.compressedActorsPerSide,
  };
}
