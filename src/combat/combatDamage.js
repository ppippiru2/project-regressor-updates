import { clamp, rankCombatModifier } from "./combatFormula.js";

export function resolvePlayerAttack(player, enemy, action, hyperActive, random = Math.random) {
  const rankModifier = rankCombatModifier(player.power, enemy.power);
  const accuracy = clamp(player.accuracy + rankModifier.accuracyBonus, 55, 99);
  const critChance = clamp(player.critRate + rankModifier.critBonus, 0, 60);
  const missed = random() * 100 > accuracy;

  if (missed) {
    return { missed: true, critical: false, damage: 0 };
  }

  const critical = random() * 100 < critChance;
  const hyperBonus = hyperActive ? 2 : 1;
  const rawDamage =
    (player.attack * action.multiplier * hyperBonus * rankModifier.damageMultiplier - enemy.defense * 0.45) *
    (critical ? player.critDamage / 100 : 1);

  return {
    missed: false,
    critical,
    damage: Math.max(1, Math.floor(rawDamage)),
  };
}

export function resolveEnemyAttack(enemy, player, enemyHyperActive, random = Math.random) {
  const rankModifier = rankCombatModifier(enemy.power, player.power);
  const hyperAccuracyPressure = enemyHyperActive ? 8 : 0;
  const playerEvade = clamp(player.evade - rankModifier.accuracyBonus - hyperAccuracyPressure, 0, 65);
  const evaded = random() * 100 < playerEvade;

  if (evaded) {
    return { evaded: true, critical: false, damage: 0 };
  }

  const critical = random() * 100 < clamp(enemy.critRate + rankModifier.critBonus + (enemyHyperActive ? 10 : 0), 0, 55);
  const enemyHyperDamage = enemyHyperActive ? 2 : 1;
  const damage = Math.max(
    1,
    Math.floor((enemy.attack * enemyHyperDamage * rankModifier.damageMultiplier - player.defense * 0.38) * (critical ? 1.5 : 1))
  );

  return { evaded: false, critical, damage };
}
