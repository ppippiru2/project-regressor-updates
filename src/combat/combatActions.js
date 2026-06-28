import { t, tf } from "../localization/index.js?v=461";

export function choosePlayerAction(player, state, skills, getSkill, hypMax) {
  const hpRate = state.player.hp / player.maxHp;
  const recovery = skills.find((skill) => (
    skill.damageType === "support"
    && Number.isFinite(skill.triggerHpRatio)
    && hpRate <= skill.triggerHpRatio
    && state.player.mp >= skill.mpCost
    && skill.stanceAllowed.includes(state.stance)
  ));
  if (recovery) {
    return { kind: "heal", skill: recovery, amount: skillHealAmount(recovery, player) };
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
  if (skill.damageType === "support" && Number.isFinite(skill.triggerHpRatio) && state.player.hp / player.maxHp > skill.triggerHpRatio) {
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

function skillHealAmount(skill, player) {
  const heal = skill.heal || {};
  return player.maxHp * (heal.maxHpRatio || 0) + player.total.WIS * (heal.wisScale || 0);
}

