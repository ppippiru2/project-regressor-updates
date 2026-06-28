import { t, tf } from "../localization/index.js?v=533";

export function choosePlayerAction(player, state, skills, getSkill, hypMax, actionCooldowns = {}) {
  const hpRate = state.player.hp / player.maxHp;
  const recovery = skills.find((skill) => (
    skill.damageType === "support"
    && Number.isFinite(skill.triggerHpRatio)
    && hpRate <= skill.triggerHpRatio
    && state.player.mp >= skill.mpCost
    && !isSkillOnCooldown(skill, actionCooldowns)
    && skill.stanceAllowed.includes(state.stance)
  ));
  if (recovery) return createPlayerCombatAction(recovery, player);

  const candidates = skills.filter((skill) => {
    if (skill.damageType === "support") return false;
    if (!skill.stanceAllowed.includes(state.stance)) return false;
    if (state.player.mp < skill.mpCost) return false;
    if (isSkillOnCooldown(skill, actionCooldowns)) return false;
    if (state.stance === "berserk" && state.hyp < hypMax && state.hyperActiveTicks <= 0) return false;
    return true;
  });
  const selection = selectAutoHuntAttackSkillChoice(candidates, state);
  const action = createPlayerCombatAction(selection.skill, player);
  if (selection.priority) action.autoPriority = selection.priority;
  return action;
}

export function selectAutoHuntAttackSkill(candidates = [], state, now = Date.now()) {
  return selectAutoHuntAttackSkillChoice(candidates, state, now).skill;
}

export function selectAutoHuntAttackSkillChoice(candidates = [], state, now = Date.now()) {
  if (!Array.isArray(candidates) || candidates.length === 0) return { skill: null, priority: null };
  const defaultSkill = candidates[0] || null;
  if (!isTargetWeakForAutoHunt(state, now)) return { skill: defaultSkill, priority: null };
  const selectedSkill = candidates
    .map((skill, index) => ({ skill, index, score: weaknessAutoHuntSkillScore(skill) }))
    .sort((left, right) => right.score - left.score || left.index - right.index)[0]?.skill || null;
  const priority = selectedSkill?.id && defaultSkill?.id && selectedSkill.id !== defaultSkill.id
    ? {
      type: "weakness",
      selectedSkillId: selectedSkill.id,
      replacedSkillId: defaultSkill.id,
    }
    : null;
  return { skill: selectedSkill, priority };
}

export function weaknessAutoHuntSkillScore(skill) {
  if (!skill || skill.damageType === "support") return -Infinity;
  return (Number(skill.multiplier || 1) - 1) * 100 + Number(skill.breakPower || 0) * 10;
}

export function createPlayerCombatAction(action, player) {
  if (!action || action.id === "basic_attack") {
    return { kind: "attack", skill: null, multiplier: 1 };
  }
  if (action.damageType === "support") {
    return { kind: "heal", skill: action, amount: skillHealAmount(action, player) };
  }
  return { kind: "attack", skill: action, multiplier: action.multiplier || 1 };
}

export function skillAvailability(skill, player, state, requireCombat, hypMax, actionCooldowns = {}) {
  if (skill.id === "basic_attack") return { available: true, reason: "" };
  if (requireCombat && !state.inCombat) return { available: false, reason: t("combatActionAvailability.onlyCombat") };
  if (state.player.mp < skill.mpCost) return { available: false, reason: t("combatActionAvailability.noMp") };
  const cooldownRemaining = skillCooldownRemaining(skill, actionCooldowns);
  if (cooldownRemaining > 0) {
    return {
      available: false,
      reason: tf("combatActionAvailability.cooldownRemaining", { seconds: Math.ceil(cooldownRemaining) }),
    };
  }
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

function isSkillOnCooldown(skill, actionCooldowns) {
  return skillCooldownRemaining(skill, actionCooldowns) > 0;
}

function isTargetWeakForAutoHunt(state, now = Date.now()) {
  return Boolean(state?.target?.weaknessUntil && Number(state.target.weaknessUntil) > now);
}

function skillCooldownRemaining(skill, actionCooldowns, now = Date.now()) {
  if (!skill?.id || !actionCooldowns || typeof actionCooldowns !== "object") return 0;
  const cooldownUntil = Number(actionCooldowns[skill.id] || 0);
  if (!Number.isFinite(cooldownUntil)) return 0;
  return Math.max(0, (cooldownUntil - now) / 1000);
}



