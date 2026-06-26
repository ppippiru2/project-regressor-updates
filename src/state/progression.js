import { clamp } from "../combat/combatFormula.js";
import { applyResistanceOption, createEmptyResistances } from "./resistanceCatalog.js?v=280";

export function playerStats(player, equippedItems = []) {
  const total = { ...player.stats };
  const resistances = createEmptyResistances();
  let attackFromGear = 0;
  let defenseFromGear = 0;

  for (const item of equippedItems) {
    attackFromGear += item.attack || 0;
    defenseFromGear += (item.defense || 0) * 0.35;
    for (const option of item.options || []) {
      if (applyResistanceOption(resistances, option.type, option.value)) continue;
      if (Number.isFinite(total[option.type])) total[option.type] += option.value;
    }
  }

  const maxHp = Math.floor(4 + total.VIT * 1 + player.level * 1);
  const maxMp = Math.floor(2 + total.WIS * 0.35 + total.INT * 0.15 + player.level * 1.25);
  const hpRegen = Number((0.04 + total.VIT * 0.012 + player.level * 0.006).toFixed(2));
  const mpRegen = Number((0.03 + total.WIS * 0.01 + total.INT * 0.004 + player.level * 0.004).toFixed(2));
  const attack = Number((1 + total.STR * 0.35 + total.INT * 0.12 + attackFromGear + player.level * 0.4).toFixed(1));
  const magicAttack = Number((0.8 + total.INT * 0.36 + total.WIS * 0.08 + player.level * 0.35).toFixed(1));
  const defense = Number((total.VIT * 0.15 + total.WIS * 0.08 + defenseFromGear).toFixed(1));
  const critRate = Math.min(45, 5 + total.LUK * 0.45);
  const critDamage = 150 + Math.floor(total.LUK * 1.4);
  const attackSpeed = clamp(0.25 + total.AGI * 0.0055 + player.level * 0.0028, 0.23, 1.55);
  const evade = Math.min(45, 3 + total.AGI * 0.35);
  const accuracy = Math.min(98, 86 + total.AGI * 0.42 + total.LUK * 0.15);
  const statusResist = Math.min(75, total.WIS * 0.6 + total.VIT * 0.15);
  const dropRate = 1 + total.LUK * 0.01;
  const power = Math.floor(maxHp * 2 + maxMp * 1.5 + attack * 12 + magicAttack * 6 + defense * 8 + critRate * 4 + evade * 3);

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
