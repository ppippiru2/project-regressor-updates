const HYPER_BASE_DURATION = 6;
const HYPER_BASE_COOLDOWN = 5;
const ENEMY_HYPER_BASE_DURATION = 4.5;
const ENEMY_HYPER_BASE_COOLDOWN = 7;
const RANK_ORDER = ["F-", "F", "F+", "E", "D", "C", "B", "A", "S", "EX"];

export function expToNext(level) {
  return Math.floor(60 * Math.pow(level, 1.45));
}

export function rankFromPower(power) {
  if (power < 90) return "F-";
  if (power < 140) return "F";
  if (power < 210) return "F+";
  if (power < 320) return "E";
  if (power < 500) return "D";
  if (power < 760) return "C";
  if (power < 1120) return "B";
  if (power < 1640) return "A";
  if (power < 2350) return "S";
  return "EX";
}

export function rankCombatModifier(attackerPower, defenderPower) {
  const gap = clamp(rankIndexFromPower(attackerPower) - rankIndexFromPower(defenderPower), -5, 5);
  return {
    gap,
    damageMultiplier: clamp(1 + gap * 0.08, 0.58, 1.42),
    accuracyBonus: gap * 2.5,
    critBonus: gap * 1.2,
  };
}

export function monsterStats(monster) {
  const total = monster.stats;
  const maxHp = Math.max(1, Math.floor(4 + total.VIT * 1 + monster.level * 1));
  const maxMp = Math.max(1, Math.floor(3 + total.WIS * 0.8 + total.INT * 0.4 + monster.level * 0.8));
  const mpRegen = Number((0.02 + total.WIS * 0.01 + monster.level * 0.004).toFixed(2));
  const attack = Number((0.7 + total.STR * 0.25 + total.INT * 0.08 + monster.level * 0.25).toFixed(1));
  const defense = Number((total.VIT * 0.12 + total.WIS * 0.08).toFixed(1));
  const critRate = Math.min(35, 3 + total.LUK * 0.35);
  const attackSpeed = clamp(0.21 + total.AGI * 0.0045 + monster.level * 0.0018, 0.2, 1.45);
  const power = Math.floor(maxHp * 2 + maxMp * 1.2 + attack * 13 + defense * 8 + critRate * 4);
  return { maxHp, maxMp, mpRegen, attack, defense, critRate, attackSpeed, power };
}

export function hyperChargeMultiplier(player) {
  const bonus = player.total.WIS * 0.006 + player.total.LUK * 0.004 + player.total.AGI * 0.002;
  return 1 + Math.min(0.55, bonus);
}

export function hyperDurationSeconds(player) {
  return HYPER_BASE_DURATION + Math.min(4, player.total.WIS * 0.04 + player.total.AGI * 0.02);
}

export function hyperCooldownSeconds(player) {
  return Math.max(2, HYPER_BASE_COOLDOWN - Math.min(2.5, player.total.WIS * 0.04 + player.total.LUK * 0.03));
}

export function enemyHyperChargeMultiplier(monster) {
  const stats = monster.stats;
  const bossBonus = monster.isBoss ? 0.2 : 0;
  const bonus = monster.level * 0.01 + stats.AGI * 0.004 + stats.WIS * 0.005 + stats.LUK * 0.006 + bossBonus;
  return 1 + Math.min(0.45, bonus);
}

export function enemyHyperDurationSeconds(monster) {
  const stats = monster.stats;
  const bossBonus = monster.isBoss ? 1.1 : 0;
  return ENEMY_HYPER_BASE_DURATION + Math.min(3.2, stats.WIS * 0.045 + stats.VIT * 0.012 + monster.level * 0.025) + bossBonus;
}

export function enemyHyperCooldownSeconds(monster) {
  const stats = monster.stats;
  const reduction = Math.min(3.2, stats.WIS * 0.045 + stats.LUK * 0.08 + stats.AGI * 0.022);
  return Math.max(3.8, ENEMY_HYPER_BASE_COOLDOWN - reduction);
}

export function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function rankIndexFromPower(power) {
  return RANK_ORDER.indexOf(rankFromPower(power));
}
