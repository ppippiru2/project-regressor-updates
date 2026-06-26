export function applyHealAction(playerState, playerStats, action, clampValue) {
  playerState.hp = clampValue(playerState.hp + action.amount, 1, playerStats.maxHp);
  playerState.mp -= action.skill.mpCost;
}

export function spendActionMp(playerState, action) {
  if (action.skill) {
    playerState.mp -= action.skill.mpCost;
  }
}

export function applyTargetDamage(targetState, damage) {
  targetState.hp -= damage;
  return targetState.hp <= 0;
}

export function applyPlayerDamage(playerState, damage) {
  playerState.hp -= damage;
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
    return critical ? 6 : 4;
  }
  return critical ? 4 : 2;
}

export function playerHyperChargeFromEnemyHit(monster) {
  return monster.isBoss ? 2 : 1;
}

export function enemyHyperChargeFromEnemyHit(monster) {
  return monster.isBoss ? 7 : 4;
}
