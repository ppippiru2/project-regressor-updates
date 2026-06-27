const EFFECT_TTL_MS = 1800;
const HIT_SHAKE_MS = 260;

export function renderCombatEffects(effects, combatFeedback) {
  const now = Date.now();
  const activeEffects = (effects || []).filter((effect) => now - (effect.createdAt || 0) < EFFECT_TTL_MS);

  syncEffectLayer("player", activeEffects, combatFeedback);
  syncEffectLayer("enemy", activeEffects, combatFeedback);
  applyHitShake("player", activeEffects, combatFeedback, now);
  applyHitShake("enemy", activeEffects, combatFeedback, now);

  return activeEffects;
}

export function clearCombatEffectLayers() {
  ["player", "enemy"].forEach((target) => {
    const layer = document.getElementById(`${target}-effect-layer`);
    if (layer) layer.innerHTML = "";
  });

  document.querySelectorAll(".combatant.is-hit").forEach((node) => node.classList.remove("is-hit"));
  document.body.classList.remove("combat-action-flash");
}

function syncEffectLayer(target, effects, combatFeedback) {
  const layer = document.getElementById(`${target}-effect-layer`);
  if (!layer) return;

  const activeEffects = effects.filter((effect) => effect.target === target);
  const activeIds = new Set(activeEffects.map((effect) => effect.id));

  [...layer.querySelectorAll("[data-effect-id]")].forEach((node) => {
    if (!activeIds.has(node.dataset.effectId)) node.remove();
  });

  for (const effect of activeEffects) {
    const alreadyRendered = [...layer.querySelectorAll("[data-effect-id]")].some((node) => node.dataset.effectId === effect.id);
    if (!alreadyRendered) layer.insertAdjacentHTML("beforeend", renderEffect(effect, combatFeedback));
  }
}

function renderEffect(effect, combatFeedback) {
  const style = effectPlacementStyle(effect);
  const slash =
    shouldRenderSlash(effect, combatFeedback)
      ? `<span class="${slashEffectClass(effect)}" data-effect-id="${effect.id}"${style} aria-hidden="true"></span>`
      : "";
  return `${slash}<span class="damage-pop ${combatEffectClass(effect, combatFeedback)} type-${effect.type} ${effect.critical ? "critical" : ""}" data-effect-id="${effect.id}"${style}>
    ${combatTextValue(effect)}
  </span>`;
}

function shouldRenderSlash(effect, combatFeedback) {
  return combatFeedback.attackEffect && (effect.type === "damage" || effect.type === "miss");
}

function slashEffectClass(effect) {
  return [
    "slash-effect",
    `effect-${effect.effectType}`,
    effect.type === "miss" ? "is-miss" : "",
    effect.critical ? "is-critical" : "",
    effect.hyper ? "is-hyper" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

function combatEffectClass(effect, combatFeedback) {
  if (!combatFeedback.attackEffect && effect.type === "damage") return "effect-text-only";
  return `effect-${effect.effectType}`;
}

function combatTextValue(effect) {
  if (effect.type === "critical" || effect.type === "miss" || effect.type === "break") return effect.value;
  if (effect.type === "heal") return `+${effect.value}`;
  return effect.value;
}

function effectPlacementStyle(effect) {
  const placement = effect.placement;
  if (!placement || typeof placement !== "object") return "";

  const declarations = [];
  appendPercentDeclaration(declarations, "--combat-effect-offset-x", placement.offsetX);
  appendPercentDeclaration(declarations, "--combat-effect-offset-y", placement.offsetY);
  appendPercentDeclaration(declarations, "--combat-effect-text-offset-y", placement.textOffsetY);
  appendPercentDeclaration(declarations, "--combat-effect-slash-width", placement.slashWidth);
  appendPercentDeclaration(declarations, "--combat-effect-slash-width-expanded", placement.expandedSlashWidth);
  appendCssLengthDeclaration(declarations, "--combat-effect-slash-height", placement.slashHeight);
  appendCssLengthDeclaration(declarations, "--combat-effect-slash-height-expanded", placement.expandedSlashHeight);

  return declarations.length ? ` style="${declarations.join("; ")}"` : "";
}

function appendPercentDeclaration(declarations, name, value) {
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return;
  declarations.push(`${name}: ${numeric}%`);
}

function appendCssLengthDeclaration(declarations, name, value) {
  if (typeof value !== "string" || !/^[a-z0-9().,%\s+-]+$/i.test(value)) return;
  declarations.push(`${name}: ${value}`);
}

function applyHitShake(target, effects, combatFeedback, now) {
  const combatant = document.querySelector(`.combatant.${target === "player" ? "player" : "enemy"}`);
  if (!combatant) return;

  const shouldShake =
    combatFeedback.shake &&
    effects.some((effect) => effect.target === target && effect.type !== "critical" && now - effect.createdAt < HIT_SHAKE_MS);
  combatant.classList.toggle("is-hit", shouldShake);
}
