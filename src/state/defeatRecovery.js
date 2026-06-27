import { DEFEAT_RECOVERY_BALANCE } from "../balance/recoveryBalance.js?v=389";
import { t } from "../localization/index.js?v=389";

export function applyPlayerDefeatRecovery(state, player, monster) {
  const shouldAutoRecover = state.autoHunt && !monster.isBoss;
  state.player.hp = Math.max(1, Math.floor(player.maxHp * DEFEAT_RECOVERY_BALANCE.hpRatio));

  return {
    shouldAutoRecover,
    message: t("stateMessages.defeatRecovered"),
  };
}
