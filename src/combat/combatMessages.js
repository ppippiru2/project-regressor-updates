import { t, tf } from "../localization/index.js?v=341";

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
  return tf("combatMessages.hit", {
    criticalText: result.critical ? t("combatMessages.criticalPrefix") : "",
    actionName: actionName(action),
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
