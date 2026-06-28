import { t, tf } from "../localization/index.js?v=481";

const byId = (id) => document.getElementById(id);
const battleBackgroundImageSizeCache = new Map();
let lastClearSpriteFrameBackgroundPath = "";
let clearSpriteFrameResizeBound = false;

function clampValue(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

export function renderCombatVitals({
  state,
  region,
  player,
  targetMonster,
  targetStats,
  combatRuntime,
  rankLabel,
  battleBackgroundPath = "",
  playerSpritePath = "",
  playerSpritePlacement = null,
  enemySpritePath = "",
  enemySpritePlacement = null,
  formation,
}) {
  renderBattlefieldBackground(battleBackgroundPath, formation);
  renderCombatViewMode(state.settings?.combatView);
  renderActorSprite("player-portrait", playerSpritePath, playerSpritePlacement);
  renderActorSprite("enemy-portrait", enemySpritePath, enemySpritePlacement);
  syncClearSpriteFrameBackground(battleBackgroundPath);
  byId("region-title").textContent = region.name;
  byId("region-lore").textContent = region.description;
  byId("player-level").textContent = state.player.level;
  byId("gold").textContent = state.player.gold.toLocaleString();
  byId("power").textContent = player.power.toLocaleString();
  byId("hunter-rank").textContent = rankLabel;
  byId("player-name").textContent = state.playerProfile.name;
  const useResourcePercent = state.settings?.combatView?.resourcePercentText === true;
  byId("player-hp-bar").style.width = `${Math.max(0, (state.player.hp / player.maxHp) * 100)}%`;
  byId("player-hp-text").textContent = formatResourceText(state.player.hp, player.maxHp, useResourcePercent, "ceil");
  byId("player-mp-bar").style.width = `${Math.max(0, ((state.player.mp || 0) / player.maxMp) * 100)}%`;
  byId("player-mp-text").textContent = formatResourceText(state.player.mp || 0, player.maxMp, useResourcePercent, "floor");
  byId("player-action-bar").style.width = `${state.inCombat ? combatRuntime.playerAction : 0}%`;
  byId("player-action-text").textContent = state.inCombat ? `${Math.floor(combatRuntime.playerAction)}%` : t("combatVitals.waiting");

  document.querySelectorAll("[data-stance]").forEach((button) => {
    button.classList.toggle("active", button.dataset.stance === state.stance);
  });

  const defeatedTarget = getVisibleDefeatedTarget(state, targetMonster, combatRuntime);
  byId("enemy-name").textContent = targetMonster.name;
  byId("enemy-level").textContent = tf("combatVitals.enemyLevel", { level: targetMonster.level, name: targetMonster.name });
  const enemyHp = defeatedTarget
    ? clampValue(defeatedTarget.hp ?? 0, 0, targetStats.maxHp)
    : state.target
    ? Math.max(0, state.target.hp)
    : targetStats.maxHp;
  const enemyMp = defeatedTarget
    ? clampValue(defeatedTarget.mp ?? 0, 0, targetStats.maxMp)
    : state.target
    ? clampValue(state.target.mp ?? targetStats.maxMp, 0, targetStats.maxMp)
    : targetStats.maxMp;
  byId("enemy-hp-bar").style.width = `${Math.max(0, (enemyHp / targetStats.maxHp) * 100)}%`;
  byId("enemy-hp-text").textContent = formatResourceText(enemyHp, targetStats.maxHp, useResourcePercent, "ceil");
  byId("enemy-mp-bar").style.width = `${Math.max(0, (enemyMp / targetStats.maxMp) * 100)}%`;
  byId("enemy-mp-text").textContent = formatResourceText(enemyMp, targetStats.maxMp, useResourcePercent, "floor");
  byId("enemy-action-bar").style.width = `${state.inCombat ? combatRuntime.enemyAction : 0}%`;
  byId("enemy-action-text").textContent = state.inCombat
    ? `${Math.floor(combatRuntime.enemyAction)}%`
    : defeatedTarget
    ? t("combatVitals.defeated")
    : t("combatVitals.waiting");

  return { enemyHp, enemyMp };
}

function getVisibleDefeatedTarget(state, targetMonster, combatRuntime) {
  const defeatedTarget = combatRuntime?.lastDefeatedTarget;
  if (state.inCombat || !targetMonster || !defeatedTarget) return null;
  if (defeatedTarget.monsterId !== targetMonster.id) return null;
  if (defeatedTarget.visibleUntil && defeatedTarget.visibleUntil < Date.now()) return null;
  return defeatedTarget;
}

function formatResourceText(current, max, usePercent, rounding = "floor") {
  const safeMax = Math.max(0, Number(max) || 0);
  const safeCurrent = clampValue(Number(current) || 0, 0, safeMax || 0);
  if (usePercent) {
    const percent = safeMax > 0 ? Math.round((safeCurrent / safeMax) * 100) : 0;
    return `${percent}%`;
  }

  const visibleCurrent = rounding === "ceil" ? Math.ceil(safeCurrent) : Math.floor(safeCurrent);
  return `${visibleCurrent} / ${safeMax}`;
}

function renderCombatViewMode(combatView = {}) {
  const battlefield = byId("combat-battlefield");
  if (!battlefield) return;
  battlefield.dataset.cardLayout = combatView.stageCards === false ? "classic" : "stage";
  battlefield.dataset.attackEffectFrame = combatView.expandedAttackEffects === false ? "portrait" : "expanded";
  battlefield.dataset.spriteFramePreview = usesClearSpriteFrame() ? "clear" : "default";
}

function renderActorSprite(portraitId, spritePath, placement = null) {
  const portrait = byId(portraitId);
  if (!portrait) return;

  portrait.classList.toggle("has-sprite", Boolean(spritePath));
  if (spritePath) {
    portrait.style.setProperty("--actor-sprite-image", cssUrl(spritePath));
  } else {
    portrait.style.removeProperty("--actor-sprite-image");
  }
  renderActorSpritePlacement(portrait, placement);
}

function renderActorSpritePlacement(portrait, placement) {
  const combatant = portrait.closest(".combatant");
  if (!placement) {
    portrait.style.removeProperty("--actor-sprite-scale");
    portrait.style.removeProperty("--actor-sprite-offset-x");
    portrait.style.removeProperty("--actor-sprite-offset-y");
    portrait.style.removeProperty("--actor-sprite-transform-origin");
    combatant?.removeAttribute("data-runtime-sprite-class");
    combatant?.removeAttribute("data-runtime-sprite-gender");
    combatant?.removeAttribute("data-runtime-sprite-profile");
    combatant?.removeAttribute("data-runtime-sprite-sfx-profile");
    combatant?.removeAttribute("data-runtime-sprite-safe-x");
    combatant?.removeAttribute("data-runtime-sprite-safe-y");
    return;
  }

  const pivotX = clampValue(Number(placement.pivotX) || 0.5, 0, 1);
  const pivotY = clampValue(Number(placement.pivotY) || 1, 0, 1);
  portrait.style.setProperty("--actor-sprite-scale", String(Number(placement.defaultScale) || 1));
  portrait.style.setProperty("--actor-sprite-offset-x", `${Number(placement.offsetX) || 0}%`);
  portrait.style.setProperty("--actor-sprite-offset-y", `${Number(placement.offsetY) || 0}%`);
  portrait.style.setProperty("--actor-sprite-transform-origin", `${(pivotX * 100).toFixed(2)}% ${(pivotY * 100).toFixed(2)}%`);
  combatant?.setAttribute("data-runtime-sprite-class", placement.classId || "");
  combatant?.setAttribute("data-runtime-sprite-gender", placement.gender || "");
  if (placement.motionProfile) combatant?.setAttribute("data-runtime-sprite-profile", placement.motionProfile);
  if (placement.sfxProfile) combatant?.setAttribute("data-runtime-sprite-sfx-profile", placement.sfxProfile);
  if (placement.motionSafeMargin) {
    combatant?.setAttribute("data-runtime-sprite-safe-x", String(Number(placement.motionSafeMargin.x) || 0));
    combatant?.setAttribute("data-runtime-sprite-safe-y", String(Number(placement.motionSafeMargin.y) || 0));
  }
}

function renderBattlefieldBackground(battleBackgroundPath, formation) {
  const battlefield = byId("combat-battlefield");
  const duel = byId("combat-duel");
  if (!battlefield) return;

  battlefield.classList.toggle("has-battle-background", Boolean(battleBackgroundPath));
  if (battleBackgroundPath) {
    battlefield.style.setProperty("--battle-bg-image", cssUrl(battleBackgroundPath));
  } else {
    battlefield.style.removeProperty("--battle-bg-image");
  }

  if (formation) {
    battlefield.dataset.formation = formation.layout;
    battlefield.dataset.visibleActorsPerSide = String(formation.visibleActorsPerSide);
    battlefield.dataset.compressedActorsPerSide = String(formation.compressedActorsPerSide);
  }

  if (duel && formation) {
    duel.dataset.formation = formation.layout;
    duel.dataset.playerSlots = String(formation.playerSlots);
    duel.dataset.enemySlots = String(formation.enemySlots);
  }
}

function syncClearSpriteFrameBackground(battleBackgroundPath = "") {
  const battlefield = byId("combat-battlefield");
  const scene = battlefield?.querySelector(".battle-scene");
  const combatants = battlefield?.querySelectorAll(".combatant");
  if (!battlefield || !scene || !combatants?.length) return;

  lastClearSpriteFrameBackgroundPath = battleBackgroundPath;
  if (!usesClearSpriteFrame() || !battleBackgroundPath) {
    combatants.forEach(clearActorBackgroundPosition);
    return;
  }

  bindClearSpriteFrameResizeHandler();
  const imageSize = getBattleBackgroundImageSize(battleBackgroundPath);
  if (!imageSize) return;

  window.requestAnimationFrame(() => {
    const sceneRect = scene.getBoundingClientRect();
    if (!sceneRect.width || !sceneRect.height) return;

    const scale = Math.max(sceneRect.width / imageSize.width, sceneRect.height / imageSize.height);
    const backgroundWidth = imageSize.width * scale;
    const backgroundHeight = imageSize.height * scale;
    const backgroundLeft = (sceneRect.width - backgroundWidth) * 0.5;
    const backgroundTop = (sceneRect.height - backgroundHeight) * 0.62;

    combatants.forEach((combatant) => {
      const combatantRect = combatant.getBoundingClientRect();
      const offsetX = backgroundLeft - (combatantRect.left - sceneRect.left);
      const offsetY = backgroundTop - (combatantRect.top - sceneRect.top);
      combatant.style.setProperty("--actor-bg-width", `${backgroundWidth}px`);
      combatant.style.setProperty("--actor-bg-height", `${backgroundHeight}px`);
      combatant.style.setProperty("--actor-bg-x", `${offsetX}px`);
      combatant.style.setProperty("--actor-bg-y", `${offsetY}px`);
    });
  });
}

function getBattleBackgroundImageSize(path) {
  const cached = battleBackgroundImageSizeCache.get(path);
  if (cached?.loaded) return cached;
  if (cached) return null;

  const entry = { loaded: false, width: 0, height: 0 };
  battleBackgroundImageSizeCache.set(path, entry);
  const image = new Image();
  image.addEventListener("load", () => {
    entry.loaded = true;
    entry.width = image.naturalWidth || 1;
    entry.height = image.naturalHeight || 1;
    syncClearSpriteFrameBackground(path);
  });
  image.addEventListener("error", () => {
    battleBackgroundImageSizeCache.delete(path);
  });
  image.src = path;
  return null;
}

function bindClearSpriteFrameResizeHandler() {
  if (clearSpriteFrameResizeBound) return;
  clearSpriteFrameResizeBound = true;
  window.addEventListener("resize", () => {
    if (lastClearSpriteFrameBackgroundPath) {
      syncClearSpriteFrameBackground(lastClearSpriteFrameBackgroundPath);
    }
  });
}

function clearActorBackgroundPosition(combatant) {
  combatant.style.removeProperty("--actor-bg-width");
  combatant.style.removeProperty("--actor-bg-height");
  combatant.style.removeProperty("--actor-bg-x");
  combatant.style.removeProperty("--actor-bg-y");
}

function cssUrl(path) {
  return `url("${String(path).replace(/"/g, '\\"')}")`;
}

function usesClearSpriteFrame() {
  const params = new URLSearchParams(window.location.search);
  return params.get("spriteFramePreview") !== "default";
}



