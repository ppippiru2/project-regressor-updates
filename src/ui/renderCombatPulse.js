import { clamp } from "../combat/combatFormula.js";
import { t, tf } from "../localization/index.js?v=465";

export function renderHitCounter(state) {
  const hitCounter = document.getElementById("hit-counter");
  if (!hitCounter) return;
  const hitCount = state.hitCount || 0;
  hitCounter.textContent = tf("combatPulse.hitCombo", { hitCount });
  hitCounter.classList.toggle("is-visible", state.settings.combatFeedback.hit && hitCount > 0);
  hitCounter.classList.toggle("is-hot", hitCount >= 10);
}

export function updateCombatPulseClasses({ state, combatRuntime, player, enemyHp, enemyMaxHp, hypMax }) {
  const now = Date.now();
  const playerHpRate = state.player.hp / player.maxHp;
  const enemyHpRate = enemyMaxHp > 0 ? enemyHp / enemyMaxHp : 1;
  const actionFlash = state.inCombat && now < combatRuntime.flashUntil;
  const hyperActive = state.hyperActiveTicks > 0;
  const hyperReady = state.hyp >= hypMax && !hyperActive && state.hyperCooldown <= 0;
  const hyperCooldown = state.hyperCooldown > 0;
  const hyperProgress = getHyperEdgeProgress(state, hypMax);
  const playerCard = document.getElementById("player-combatant");
  const enemyCard = document.getElementById("enemy-combatant");
  if (!playerCard || !enemyCard) return;

  const hyperLabel = hyperActive
    ? tf("combatPulse.hyperActive", { seconds: Math.ceil(state.hyperActiveTicks) })
    : hyperCooldown
      ? tf("combatPulse.hyperCooldown", { seconds: Math.ceil(state.hyperCooldown) })
      : hyperReady
        ? t("combatPulse.hyperReady")
        : tf("combatPulse.hyperPercent", { percent: Math.floor(state.hyp || 0) });

  document.body.classList.toggle("combat-action-flash", actionFlash);
  document.body.classList.toggle("player-low-hp", state.inCombat && playerHpRate <= 0.2);
  document.body.classList.toggle("enemy-low-hp", state.inCombat && enemyHpRate <= 0.2);

  playerCard.style.setProperty("--edge-progress", `${hyperProgress}%`);
  playerCard.classList.toggle("hyper-charging", hyperProgress > 0 && !hyperReady && !hyperActive && !hyperCooldown);
  playerCard.classList.toggle("hyper-ready", hyperReady);
  playerCard.classList.toggle("hyper-active", hyperActive);
  playerCard.classList.toggle("hyper-cooldown", hyperCooldown);
  playerCard.classList.toggle("hyper-end-flash", now < combatRuntime.hyperEndFlashUntil);
  playerCard.querySelectorAll("[data-hyper-trigger]").forEach((trigger) => {
    trigger.title = hyperLabel;
    trigger.disabled = !hyperReady;
    trigger.setAttribute("aria-label", hyperLabel);
  });

  const enemyHyperActive = combatRuntime.enemyHyperActiveTicks > 0;
  const enemyHyperReady = state.inCombat && combatRuntime.enemyHyp >= hypMax && !enemyHyperActive && combatRuntime.enemyHyperCooldown <= 0;
  const enemyHyperCooldown = combatRuntime.enemyHyperCooldown > 0;
  const enemyHyperProgress = state.inCombat ? getEnemyHyperEdgeProgress(combatRuntime, hypMax) : 0;

  enemyCard.style.setProperty("--edge-progress", `${enemyHyperProgress}%`);
  enemyCard.classList.toggle(
    "enemy-hyper-charging",
    enemyHyperProgress > 0 && !enemyHyperReady && !enemyHyperActive && !enemyHyperCooldown
  );
  enemyCard.classList.toggle("enemy-hyper-ready", enemyHyperReady);
  enemyCard.classList.toggle("enemy-hyper-active", enemyHyperActive);
  enemyCard.classList.toggle("enemy-hyper-cooldown", enemyHyperCooldown);
  enemyCard.classList.toggle("enemy-hyper-end-flash", now < combatRuntime.enemyHyperEndFlashUntil);
}

function getHyperEdgeProgress(state, hypMax) {
  if (state.hyperActiveTicks > 0 && state.hyperDuration > 0) {
    return clamp((state.hyperActiveTicks / state.hyperDuration) * 100, 0, 100);
  }
  if (state.hyperCooldown > 0) return 0;
  return clamp(state.hyp || 0, 0, hypMax);
}

function getEnemyHyperEdgeProgress(combatRuntime, hypMax) {
  if (combatRuntime.enemyHyperActiveTicks > 0 && combatRuntime.enemyHyperDuration > 0) {
    return clamp((combatRuntime.enemyHyperActiveTicks / combatRuntime.enemyHyperDuration) * 100, 0, 100);
  }
  if (combatRuntime.enemyHyperCooldown > 0) return 0;
  return clamp(combatRuntime.enemyHyp || 0, 0, hypMax);
}

