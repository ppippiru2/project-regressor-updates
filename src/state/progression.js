import { clamp } from "../combat/combatFormula.js";
import {
  PLAYER_GEAR_BALANCE,
  PLAYER_POWER_WEIGHTS,
  PLAYER_STAT_FORMULA,
} from "../balance/playerStatBalance.js?v=400";
import { applyResistanceOption, createEmptyResistances } from "./resistanceCatalog.js?v=400";

export function playerStats(player, equippedItems = [], bonusStats = {}) {
  const total = { ...player.stats };
  const resistances = createEmptyResistances();
  let attackFromGear = 0;
  let defenseFromGear = 0;

  for (const [stat, value] of Object.entries(bonusStats || {})) {
    if (Number.isFinite(total[stat]) && Number.isFinite(value)) total[stat] += value;
  }

  for (const item of equippedItems) {
    attackFromGear += item.attack || 0;
    defenseFromGear += (item.defense || 0) * PLAYER_GEAR_BALANCE.defenseScale;
    for (const option of item.options || []) {
      if (applyResistanceOption(resistances, option.type, option.value)) continue;
      if (Number.isFinite(total[option.type])) total[option.type] += option.value;
    }
  }

  const f = PLAYER_STAT_FORMULA;
  const maxHp = Math.floor(f.maxHp.base + total.VIT * f.maxHp.vit + player.level * f.maxHp.level);
  const maxMp = Math.floor(f.maxMp.base + total.WIS * f.maxMp.wis + total.INT * f.maxMp.int + player.level * f.maxMp.level);
  const hpRegen = Number((f.hpRegen.base + total.VIT * f.hpRegen.vit + player.level * f.hpRegen.level).toFixed(f.hpRegen.precision));
  const mpRegen = Number((f.mpRegen.base + total.WIS * f.mpRegen.wis + total.INT * f.mpRegen.int + player.level * f.mpRegen.level).toFixed(f.mpRegen.precision));
  const attack = Number((f.attack.base + total.STR * f.attack.str + total.INT * f.attack.int + attackFromGear + player.level * f.attack.level).toFixed(f.attack.precision));
  const magicAttack = Number((f.magicAttack.base + total.INT * f.magicAttack.int + total.WIS * f.magicAttack.wis + player.level * f.magicAttack.level).toFixed(f.magicAttack.precision));
  const defense = Number((total.VIT * f.defense.vit + total.WIS * f.defense.wis + defenseFromGear).toFixed(f.defense.precision));
  const critRate = Math.min(f.critRate.max, f.critRate.base + total.LUK * f.critRate.luk);
  const critDamage = f.critDamage.base + Math.floor(total.LUK * f.critDamage.luk);
  const attackSpeed = clamp(
    f.attackSpeed.base + total.AGI * f.attackSpeed.agi + player.level * f.attackSpeed.level,
    f.attackSpeed.min,
    f.attackSpeed.max
  );
  const evade = Math.min(f.evade.max, f.evade.base + total.AGI * f.evade.agi);
  const accuracy = Math.min(f.accuracy.max, f.accuracy.base + total.AGI * f.accuracy.agi + total.LUK * f.accuracy.luk);
  const statusResist = Math.min(f.statusResist.max, total.WIS * f.statusResist.wis + total.VIT * f.statusResist.vit);
  const dropRate = f.dropRate.base + total.LUK * f.dropRate.luk;
  const power = Math.floor(
    maxHp * PLAYER_POWER_WEIGHTS.maxHp +
      maxMp * PLAYER_POWER_WEIGHTS.maxMp +
      attack * PLAYER_POWER_WEIGHTS.attack +
      magicAttack * PLAYER_POWER_WEIGHTS.magicAttack +
      defense * PLAYER_POWER_WEIGHTS.defense +
      critRate * PLAYER_POWER_WEIGHTS.critRate +
      evade * PLAYER_POWER_WEIGHTS.evade
  );

  return {
    total,
    maxHp,
    maxMp,
    hpRegen,
    mpRegen,
    attack,
    magicAttack,
    defense,
    critRate,
    critDamage,
    attackSpeed,
    evade,
    accuracy,
    statusResist,
    resistances,
    dropRate,
    power,
  };
}
