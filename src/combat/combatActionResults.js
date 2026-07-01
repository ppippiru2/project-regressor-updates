import { HYPER_CHARGE_BALANCE } from "../balance/combatBalance.js?v=680";

export function applyHealAction(playerState, playerStats, action, clampValue) {
  playerState.hp = clampValue(playerState.hp + action.amount, 1, playerStats.maxHp);
  spendActionMp(playerState, action);
}

export function applyBuffAction(playerState, playerStats, action, clampValue) {
  spendActionMp(playerState, action);
  const hpCost = Math.max(0, Math.floor(playerStats.maxHp * Number(action.selfHpCostRatio || 0)));
  if (hpCost > 0) {
    playerState.hp = clampValue((playerState.hp || 0) - hpCost, 1, playerStats.maxHp);
  }
  return { hpCost };
}

export function spendActionMp(playerState, action) {
  if (action.skill) {
    playerState.mp = Math.max(0, (playerState.mp || 0) - Number(action.skill.mpCost || 0));
  }
}

export function applyTargetDamage(targetState, damage) {
  targetState.hp = Math.max(0, targetState.hp - damage);
  return targetState.hp <= 0;
}

export function applyPlayerDamage(playerState, damage) {
  playerState.hp = Math.max(0, playerState.hp - damage);
  return playerState.hp <= 0;
}

export function applyResolvedPlayerAttack({ playerState, targetState, action, result, monster }) {
  spendActionMp(playerState, action);

  if (result.missed) {
    return {
      missed: true,
      monsterDefeated: false,
      enemyHyperCharge: 0,
    };
  }

  return {
    missed: false,
    monsterDefeated: applyTargetDamage(targetState, result.damage),
    enemyHyperCharge: enemyHyperChargeFromPlayerHit(monster, result.critical),
  };
}

export function applyResolvedEnemyAttack({ playerState, result, monster }) {
  if (result.evaded) {
    return {
      evaded: true,
      playerDefeated: false,
      playerHyperCharge: 0,
      enemyHyperCharge: 0,
    };
  }

  return {
    evaded: false,
    playerDefeated: applyPlayerDamage(playerState, result.damage),
    playerHyperCharge: playerHyperChargeFromEnemyHit(monster),
    enemyHyperCharge: enemyHyperChargeFromEnemyHit(monster),
  };
}

export function enemyHyperChargeFromPlayerHit(monster, critical) {
  if (monster.isBoss) {
    return critical ? HYPER_CHARGE_BALANCE.enemyFromPlayerHit.bossCritical : HYPER_CHARGE_BALANCE.enemyFromPlayerHit.boss;
  }
  return critical ? HYPER_CHARGE_BALANCE.enemyFromPlayerHit.normalCritical : HYPER_CHARGE_BALANCE.enemyFromPlayerHit.normal;
}

export function playerHyperChargeFromEnemyHit(monster) {
  return monster.isBoss ? HYPER_CHARGE_BALANCE.playerFromEnemyHit.boss : HYPER_CHARGE_BALANCE.playerFromEnemyHit.normal;
}

export function enemyHyperChargeFromEnemyHit(monster) {
  return monster.isBoss ? HYPER_CHARGE_BALANCE.enemyFromEnemyHit.boss : HYPER_CHARGE_BALANCE.enemyFromEnemyHit.normal;
}
