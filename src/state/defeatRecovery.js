import { t } from "../localization/index.js?v=280";

export function applyPlayerDefeatRecovery(state, player, monster) {
  const shouldAutoRecover = state.autoHunt && !monster.isBoss;
  state.player.hp = Math.max(1, Math.floor(player.maxHp * 0.35));

  return {
    shouldAutoRecover,
    message: t("stateMessages.defeatRecovered"),
  };
}
