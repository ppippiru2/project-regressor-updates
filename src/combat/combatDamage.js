import { clamp, rankCombatModifier } from "./combatFormula.js";
import { ENEMY_DAMAGE_BALANCE, PLAYER_DAMAGE_BALANCE } from "../balance/damageBalance.js?v=390";

export function resolvePlayerAttack(player, enemy, action, hyperActive, random = Math.random) {
  const rankModifier = rankCombatModifier(player.power, enemy.power);
  const b = PLAYER_DAMAGE_BALANCE;
  const accuracy = clamp(player.accuracy + rankModifier.accuracyBonus, b.accuracyMin, b.accuracyMax);
  const critChance = clamp(player.critRate + rankModifier.critBonus, b.critChanceMin, b.critChanceMax);
  const missed = random() * 100 > accuracy;

  if (missed) {
    return { missed: true, critical: false, damage: 0 };
  }

  const critical = random() * 100 < critChance;
  const hyperBonus = hyperActive ? b.hyperDamageMultiplier : b.normalDamageMultiplier;
  const rawDamage =
    (player.attack * action.multiplier * hyperBonus * rankModifier.damageMultiplier - enemy.defense * b.enemyDefenseMitigation) *
    (critical ? player.critDamage / 100 : 1);

  return {
    missed: false,
    critical,
    damage: Math.max(b.minDamage, Math.floor(rawDamage)),
  };
}

export function resolveEnemyAttack(enemy, player, enemyHyperActive, random = Math.random) {
  const rankModifier = rankCombatModifier(enemy.power, player.power);
  const b = ENEMY_DAMAGE_BALANCE;
  const hyperAccuracyPressure = enemyHyperActive ? b.hyperAccuracyPressure : 0;
  const playerEvade = clamp(player.evade - rankModifier.accuracyBonus - hyperAccuracyPressure, b.evadeMin, b.evadeMax);
  const evaded = random() * 100 < playerEvade;

  if (evaded) {
    return { evaded: true, critical: false, damage: 0 };
  }

  const critical =
    random() * 100 <
    clamp(
      enemy.critRate + rankModifier.critBonus + (enemyHyperActive ? b.hyperCritBonus : 0),
      b.critChanceMin,
      b.critChanceMax
    );
  const enemyHyperDamage = enemyHyperActive ? b.hyperDamageMultiplier : b.normalDamageMultiplier;
  const damage = Math.max(
    b.minDamage,
    Math.floor(
      (enemy.attack * enemyHyperDamage * rankModifier.damageMultiplier - player.defense * b.playerDefenseMitigation) *
        (critical ? b.criticalDamageMultiplier : 1)
    )
  );

  return { evaded: false, critical, damage };
}
