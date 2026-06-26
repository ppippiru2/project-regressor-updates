import { t, tf } from "../localization/index.js?v=280";

export function choosePlayerAction(player, state, skills, getSkill, hypMax) {
  const hpRate = state.player.hp / player.maxHp;
  const recovery = skills.find((skill) => skill.id === "emergency_recovery");
  if (recovery && hpRate <= 0.3 && state.player.mp >= recovery.mpCost) {
    return { kind: "heal", skill: recovery, amount: player.maxHp * 0.35 + player.total.WIS * 0.25 };
  }

  const candidates = skills.filter((skill) => {
    if (skill.damageType === "support") return false;
    if (!skill.stanceAllowed.includes(state.stance)) return false;
    if (state.player.mp < skill.mpCost) return false;
    if (state.stance === "berserk" && state.hyp < hypMax && state.hyperActiveTicks <= 0) return false;
    return true;
  });
  const skill = candidates[0] || null;
  return { kind: "attack", skill, multiplier: skill ? skill.multiplier : 1 };
}

export function skillAvailability(skill, player, state, requireCombat, hypMax) {
  if (skill.id === "basic_attack") return { available: true, reason: "" };
  if (requireCombat && !state.inCombat) return { available: false, reason: t("combatActionAvailability.onlyCombat") };
  if (state.player.mp < skill.mpCost) return { available: false, reason: t("combatActionAvailability.noMp") };
  if (!skill.stanceAllowed.includes(state.stance)) {
    return { available: false, reason: tf("combatActionAvailability.wrongStance", { stanceName: stanceName(state.stance) }) };
  }
  if (skill.damageType === "support" && skill.triggerCondition === "playerHpBelow30" && state.player.hp / player.maxHp > 0.3) {
    return { available: false, reason: t("combatActionAvailability.lowHp") };
  }
  if (state.stance === "berserk" && skill.damageType !== "support" && state.hyp < hypMax && state.hyperActiveTicks <= 0) {
    return { available: false, reason: t("combatActionAvailability.berserkNeedHyper") };
  }
  return { available: true, reason: "" };
}

export function stanceName(stance) {
  return t(`combatActionAvailability.stances.${stance}`, stance);
}
