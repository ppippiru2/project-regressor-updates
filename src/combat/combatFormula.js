import {
  ENEMY_HYPER_BASE_COOLDOWN_SECONDS,
  ENEMY_HYPER_BASE_DURATION_SECONDS,
  HYPER_SCALING_BALANCE,
  PLAYER_HYPER_BASE_COOLDOWN_SECONDS,
  PLAYER_HYPER_BASE_DURATION_SECONDS,
  RANK_ACCURACY_BONUS_PER_GAP,
  RANK_COMBAT_GAP_MAX,
  RANK_COMBAT_GAP_MIN,
  RANK_CRIT_BONUS_PER_GAP,
  RANK_DAMAGE_MULTIPLIER_MAX,
  RANK_DAMAGE_MULTIPLIER_MIN,
  RANK_DAMAGE_MULTIPLIER_PER_GAP,
  RANK_ORDER,
  RANK_POWER_THRESHOLDS,
} from "../balance/combatBalance.js?v=414";
import { MONSTER_POWER_WEIGHTS, MONSTER_STAT_FORMULA } from "../balance/monsterStatBalance.js?v=414";

export function expToNext(level) {
  return Math.floor(60 * Math.pow(level, 1.45));
}

export function rankFromPower(power) {
  return RANK_POWER_THRESHOLDS.find((threshold) => power < threshold.maxPower)?.rank ?? "EX";
}

export function rankCombatModifier(attackerPower, defenderPower) {
  const gap = clamp(
    rankIndexFromPower(attackerPower) - rankIndexFromPower(defenderPower),
    RANK_COMBAT_GAP_MIN,
    RANK_COMBAT_GAP_MAX
  );
  return {
    gap,
    damageMultiplier: clamp(
      1 + gap * RANK_DAMAGE_MULTIPLIER_PER_GAP,
      RANK_DAMAGE_MULTIPLIER_MIN,
      RANK_DAMAGE_MULTIPLIER_MAX
    ),
    accuracyBonus: gap * RANK_ACCURACY_BONUS_PER_GAP,
    critBonus: gap * RANK_CRIT_BONUS_PER_GAP,
  };
}

export function monsterStats(monster) {
  const total = monster.stats;
  const f = MONSTER_STAT_FORMULA;
  const maxHp = Math.max(f.maxHp.min, Math.floor(f.maxHp.base + total.VIT * f.maxHp.vit + monster.level * f.maxHp.level));
  const maxMp = Math.max(
    f.maxMp.min,
    Math.floor(f.maxMp.base + total.WIS * f.maxMp.wis + total.INT * f.maxMp.int + monster.level * f.maxMp.level)
  );
  const mpRegen = Number((f.mpRegen.base + total.WIS * f.mpRegen.wis + monster.level * f.mpRegen.level).toFixed(f.mpRegen.precision));
  const attack = Number((f.attack.base + total.STR * f.attack.str + total.INT * f.attack.int + monster.level * f.attack.level).toFixed(f.attack.precision));
  const defense = Number((total.VIT * f.defense.vit + total.WIS * f.defense.wis).toFixed(f.defense.precision));
  const critRate = Math.min(f.critRate.max, f.critRate.base + total.LUK * f.critRate.luk);
  const attackSpeed = clamp(
    f.attackSpeed.base + total.AGI * f.attackSpeed.agi + monster.level * f.attackSpeed.level,
    f.attackSpeed.min,
    f.attackSpeed.max
  );
  const power = Math.floor(
    maxHp * MONSTER_POWER_WEIGHTS.maxHp +
      maxMp * MONSTER_POWER_WEIGHTS.maxMp +
      attack * MONSTER_POWER_WEIGHTS.attack +
      defense * MONSTER_POWER_WEIGHTS.defense +
      critRate * MONSTER_POWER_WEIGHTS.critRate
  );
  return { maxHp, maxMp, mpRegen, attack, defense, critRate, attackSpeed, power };
}

export function hyperChargeMultiplier(player) {
  const b = HYPER_SCALING_BALANCE.playerCharge;
  const bonus = player.total.WIS * b.wis + player.total.LUK * b.luk + player.total.AGI * b.agi;
  return 1 + Math.min(b.maxBonus, bonus);
}

export function hyperDurationSeconds(player) {
  const b = HYPER_SCALING_BALANCE.playerDuration;
  return PLAYER_HYPER_BASE_DURATION_SECONDS + Math.min(b.maxBonusSeconds, player.total.WIS * b.wis + player.total.AGI * b.agi);
}

export function hyperCooldownSeconds(player) {
  const b = HYPER_SCALING_BALANCE.playerCooldown;
  return Math.max(
    b.minSeconds,
    PLAYER_HYPER_BASE_COOLDOWN_SECONDS - Math.min(b.maxReductionSeconds, player.total.WIS * b.wis + player.total.LUK * b.luk)
  );
}

export function enemyHyperChargeMultiplier(monster) {
  const b = HYPER_SCALING_BALANCE.enemyCharge;
  const stats = monster.stats;
  const bossBonus = monster.isBoss ? b.bossBonus : 0;
  const bonus = monster.level * b.level + stats.AGI * b.agi + stats.WIS * b.wis + stats.LUK * b.luk + bossBonus;
  return 1 + Math.min(b.maxBonus, bonus);
}

export function enemyHyperDurationSeconds(monster) {
  const b = HYPER_SCALING_BALANCE.enemyDuration;
  const stats = monster.stats;
  const bossBonus = monster.isBoss ? b.bossBonus : 0;
  return (
    ENEMY_HYPER_BASE_DURATION_SECONDS +
    Math.min(b.maxBonusSeconds, stats.WIS * b.wis + stats.VIT * b.vit + monster.level * b.level) +
    bossBonus
  );
}

export function enemyHyperCooldownSeconds(monster) {
  const b = HYPER_SCALING_BALANCE.enemyCooldown;
  const stats = monster.stats;
  const reduction = Math.min(b.maxReductionSeconds, stats.WIS * b.wis + stats.LUK * b.luk + stats.AGI * b.agi);
  return Math.max(b.minSeconds, ENEMY_HYPER_BASE_COOLDOWN_SECONDS - reduction);
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function rankIndexFromPower(power) {
  return RANK_ORDER.indexOf(rankFromPower(power));
}
