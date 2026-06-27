import { DEFEAT_RECOVERY_BALANCE } from "../balance/recoveryBalance.js?v=431";
import { t } from "../localization/index.js?v=431";

export function applyPlayerDefeatRecovery(state, player, monster) {
  const shouldAutoRecover = state.autoHunt && !monster.isBoss;
  state.player.hp = Math.max(1, Math.floor(player.maxHp * DEFEAT_RECOVERY_BALANCE.hpRatio));

  return {
    shouldAutoRecover,
    message: t("stateMessages.defeatRecovered"),
  };
}
