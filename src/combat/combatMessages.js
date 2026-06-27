import { t, tf } from "../localization/index.js?v=400";

export function combatStartMessage(monster) {
  return tf("combatMessages.start", { monsterName: monster.name });
}

export function combatStopMessage() {
  return t("combatMessages.stop");
}

export function playerHealMessage(action) {
  return tf("combatMessages.heal", { skillName: action.skill.name, amount: Math.floor(action.amount) });
}

export function playerMissMessage(action) {
  return tf("combatMessages.miss", { actionName: actionName(action) });
}

export function playerHitMessage(result, action, monster) {
  const name = actionName(action);
  return tf("combatMessages.hit", {
    criticalText: result.critical ? t("combatMessages.criticalPrefix") : "",
    actionName: name,
    actionParticle: instrumentalParticle(name),
    monsterName: monster.name,
    damage: result.damage,
  });
}

export function enemyEvadeMessage(monster) {
  return tf("combatMessages.enemyEvade", { monsterName: monster.name });
}

export function enemyAttackMessage(monster, result, enemyHyperActive) {
  return tf("combatMessages.enemyAttack", {
    monsterName: monster.name,
    attackName: enemyHyperActive ? t("combatMessages.enemyHyperAttack") : t("combatMessages.enemyCounter"),
    damage: result.damage,
  });
}

export function bossBreakMessage() {
  return t("combatMessages.bossBreak");
}

function actionName(action) {
  return action.skill ? action.skill.name : t("combatMessages.basicAttack");
}

function instrumentalParticle(value) {
  const text = String(value || "").trim();
  const last = [...text].pop();
  if (!last) return t("combatMessages.actionParticleDefault");

  const code = last.charCodeAt(0);
  if (code < 0xac00 || code > 0xd7a3) return t("combatMessages.actionParticleVowel");

  const hasFinalConsonant = (code - 0xac00) % 28 !== 0;
  return hasFinalConsonant ? t("combatMessages.actionParticleConsonant") : t("combatMessages.actionParticleVowel");
}
