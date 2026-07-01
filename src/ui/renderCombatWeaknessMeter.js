import { WEAKNESS_BALANCE } from "../balance/combatBalance.js?v=681";
import { t, tf } from "../localization/index.js?v=681";

export function renderEnemyWeaknessMeter(state, now = Date.now()) {
  const meter = document.getElementById("enemy-weakness-meter");
  const fill = document.getElementById("enemy-weakness-bar");
  const text = document.getElementById("enemy-weakness-text");
  if (!meter || !fill || !text) return;

  const target = state.inCombat ? state.target : null;
  if (!target || target.hp <= 0) {
    meter.dataset.weaknessState = "idle";
    fill.style.width = "0%";
    text.textContent = t("combatVitals.weaknessWaiting");
    return;
  }

  const weaknessUntil = Number(target.weaknessUntil || 0);
  if (weaknessUntil > now) {
    const remainingSeconds = Math.max(0, (weaknessUntil - now) / 1000);
    const duration = Math.max(0.1, Number(WEAKNESS_BALANCE.durationSeconds) || 0.1);
    const percent = clampValue((remainingSeconds / duration) * 100, 0, 100);
    meter.dataset.weaknessState = "active";
    fill.style.width = `${percent}%`;
    text.textContent = tf("combatVitals.weaknessActive", {
      seconds: Math.ceil(remainingSeconds),
      count: Number(target.weaknessStrikeCount || 0),
    });
    return;
  }

  const maxGauge = Math.max(0, Number(target.breakGaugeMax || 0));
  const currentGauge = clampValue(Number(target.breakGauge ?? maxGauge), 0, maxGauge);
  const progress = maxGauge > 0 ? clampValue(((maxGauge - currentGauge) / maxGauge) * 100, 0, 100) : 0;
  meter.dataset.weaknessState = progress > 0 ? "charging" : "idle";
  fill.style.width = `${progress}%`;
  text.textContent = tf("combatVitals.weaknessGauge", { percent: Math.floor(progress) });
}

function clampValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}
