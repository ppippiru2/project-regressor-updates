import { weaknessAutoHuntSkillScore } from "../combat/combatActions.js?v=678";
import { calculateWeaknessSkillDamageMultiplier } from "../combat/combatHitResults.js?v=678";
import { COMBAT_STYLE_ACTION_IDS, isCombatStyleActive } from "../combat/combatStyleActions.js?v=678";
import { t, tf } from "../localization/index.js?v=678";

let lastCombatSkillsRenderKey = "";
const COMBAT_SKILL_SLOT_COUNT = 4;

export function renderCombatSkillInfo(player, context) {
  const container = document.getElementById("combat-skills");
  const infoSlot = document.getElementById("combat-skill-info");
  if (!container) return;

  if (!infoSlot) {
    renderCombatSkills(player, context);
    return;
  }

  const visibleAction = context.combatRuntime.visibleActionInfoId
    ? context.getCombatAction(context.combatRuntime.visibleActionInfoId)
    : null;
  container.querySelectorAll("[data-action-info]").forEach((button) => {
    const selected = visibleAction && button.dataset.actionInfo === visibleAction.id;
    button.classList.toggle("is-selected", Boolean(selected));
    button.setAttribute("aria-pressed", String(Boolean(selected)));
  });
  renderCombatStyles(player, context);
  infoSlot.innerHTML = combatSkillInfoMarkup(player, context);
}

export function renderCombatSkillsIfNeeded(player, context) {
  const now = Date.now();
  const flashActionId =
    now < context.combatRuntime.actionFlashUntil
      ? `${context.combatRuntime.lastActionId || ""}:${context.combatRuntime.actionFlashUntil || 0}`
      : "";
  const inputLocked = context.combatRuntime.inputLocked === true;
  const weaknessUiKey = combatWeaknessSkillUiKey(context.state, now);
  const availabilityKey = context
    .combatActionList()
    .map((action) => {
      const availability = context.skillAvailability(action, player, false);
      return `${action.id}:${availability.available ? 1 : 0}:${availability.reason}:${actionCooldownRenderKey(action, context, now)}`;
    })
    .join("|");
  const styleAvailabilityKey = COMBAT_STYLE_ACTION_IDS
    .map((actionId) => {
      const action = context.getCombatAction(actionId);
      if (!action || action.id !== actionId) return `${actionId}:missing`;
      const availability = context.skillAvailability(action, player, false);
      return [
        actionId,
        availability.available ? 1 : 0,
        availability.reason,
        actionCooldownRenderKey(action, context, now),
        isCombatStyleActive(actionId, context.combatRuntime) ? 1 : 0,
      ].join(":");
    })
    .join("|");
  const loadoutKey = (context.skillLoadouts?.() || [])
    .map((loadout) => `${loadout.id}:${loadout.name}:${loadout.actionIds.join(",")}`)
    .join("|");
  const key = [
    context.state.stance,
    context.state.inCombat ? 1 : 0,
    Math.floor(context.state.player.mp || 0),
    context.combatRuntime.visibleActionInfoId || "",
    context.combatRuntime.visibleCombatHelpId || "",
    inputLocked ? "locked" : "ready",
    context.combatRuntime.battlePhase || "",
    context.activeSkillLoadoutId?.() || "",
    loadoutKey,
    flashActionId,
    availabilityKey,
    styleAvailabilityKey,
    weaknessUiKey,
  ].join(";");

  if (key === lastCombatSkillsRenderKey) return;
  lastCombatSkillsRenderKey = key;
  renderCombatSkills(player, context);
}

function renderCombatSkills(player, context) {
  const container = document.getElementById("combat-skills");
  if (!container) return;

  const now = Date.now();
  const inputLocked = context.combatRuntime.inputLocked === true;
  const visibleAction = context.combatRuntime.visibleActionInfoId
    ? context.getCombatAction(context.combatRuntime.visibleActionInfoId)
    : null;

  const actionEntries = context
    .combatActionList()
    .slice(0, COMBAT_SKILL_SLOT_COUNT)
    .map((action) => ({
      action,
      availability: context.skillAvailability(action, player, false),
    }));
  const weaknessPriorityActionId = combatWeaknessPriorityActionId(actionEntries, context.state, now);
  const buttons = actionEntries
    .map(({ action, availability }) => {
      const selected = visibleAction && action.id === visibleAction.id;
      const lastUsed = context.combatRuntime.lastActionId === action.id;
      const flashing = lastUsed && now < context.combatRuntime.actionFlashUntil;
      const weaknessPriority = action.id === weaknessPriorityActionId;
      const weaknessPriorityLabel = weaknessPriority ? t("combatActions.weaknessPriority") : "";
      const infoParts = actionInfoParts(action, context, availability, now);
      const buttonMeta = actionButtonMeta(action, context, availability, now);
      const cooldownRemainingMs = actionCooldownRemainingMs(action, context, now);
      const usable = availability.available && !inputLocked;
      const classes = [
        "skill-button",
        usable ? "is-usable" : "is-locked",
        inputLocked ? "is-input-locked" : "",
        selected ? "is-selected" : "",
        lastUsed ? "is-last-used" : "",
        flashing ? "is-flashing" : "",
        weaknessPriority ? "is-weakness-priority" : "",
      ]
        .filter(Boolean)
        .join(" ");
      const ariaLabel = `${action.name}. ${action.description}. ${infoParts.join(" · ")}${weaknessPriorityLabel ? ` · ${weaknessPriorityLabel}` : ""}`;

      return `<button type="button" class="${classes}" data-action-info="${escapeHtml(action.id)}" data-combat-action="${escapeHtml(action.id)}" data-last-used="${lastUsed}" data-cooldown-remaining-ms="${Math.ceil(cooldownRemainingMs)}" data-weakness-priority="${weaknessPriority ? "true" : "false"}" data-flash-key="${flashing ? context.combatRuntime.actionFlashUntil : ""}" aria-label="${escapeHtml(ariaLabel)}" aria-pressed="${selected}" aria-disabled="${usable ? "false" : "true"}" ${inputLocked ? "disabled" : ""}>
        <span class="skill-button-name">${escapeHtml(action.name)}</span>
        <small class="skill-button-meta">${escapeHtml(buttonMeta.meta)}</small>
        <small class="skill-button-state ${availability.available ? "is-ready" : "is-blocked"}">${escapeHtml(buttonMeta.state)}</small>
        ${weaknessPriorityLabel ? `<span class="skill-button-weakness" aria-hidden="true">${escapeHtml(weaknessPriorityLabel)}</span>` : ""}
      </button>`;
    })
    .join("");

  container.innerHTML = `${skillLoadoutTabsMarkup(context)}<div class="skill-buttons">${buttons}</div>`;
  renderCombatStyles(player, context, { now, visibleAction, inputLocked });
  const infoSlot = document.getElementById("combat-skill-info");
  if (infoSlot) infoSlot.innerHTML = combatSkillInfoMarkup(player, context);
}

function renderCombatStyles(player, context, options = {}) {
  const container = document.getElementById("combat-style-actions");
  if (!container) return;

  const now = options.now ?? Date.now();
  const inputLocked = options.inputLocked ?? context.combatRuntime.inputLocked === true;
  const visibleAction = options.visibleAction ?? (
    context.combatRuntime.visibleActionInfoId
      ? context.getCombatAction(context.combatRuntime.visibleActionInfoId)
      : null
  );
  const buttons = COMBAT_STYLE_ACTION_IDS
    .map((actionId) => context.getCombatAction(actionId))
    .filter((action, index) => action && action.id === COMBAT_STYLE_ACTION_IDS[index])
    .map((action) => {
      const active = isCombatStyleActive(action.id, context.combatRuntime);
      const availability = context.skillAvailability(action, player, false);
      const selected = visibleAction && action.id === visibleAction.id;
      const lastUsed = context.combatRuntime.lastActionId === action.id;
      const flashing = lastUsed && now < context.combatRuntime.actionFlashUntil;
      const cooldownRemainingMs = actionCooldownRemainingMs(action, context, now);
      const buttonMeta = actionButtonMeta(action, context, availability, now);
      const stateText = active ? t("combatActions.styleActive", "활성") : buttonMeta.state;
      const usable = availability.available && !inputLocked && !active;
      const classes = [
        "combat-style-action",
        usable ? "is-usable" : "is-locked",
        active ? "is-active" : "",
        inputLocked ? "is-input-locked" : "",
        selected ? "is-selected" : "",
        lastUsed ? "is-last-used" : "",
        flashing ? "is-flashing" : "",
      ]
        .filter(Boolean)
        .join(" ");
      const infoParts = actionInfoParts(action, context, availability, now);
      const activeText = t("combatActions.styleActive", "활성");
      const ariaLabel = `${action.name}. ${action.description}. ${infoParts.join(" · ")}${active ? ` · ${activeText}` : ""}`;

      return `<button type="button" class="${classes}" data-action-info="${escapeHtml(action.id)}" data-combat-style-action="${escapeHtml(action.id)}" data-combat-style-active="${active ? "true" : "false"}" data-combat-style-cooldown-ms="${Math.ceil(cooldownRemainingMs)}" data-last-used="${lastUsed}" data-flash-key="${flashing ? context.combatRuntime.actionFlashUntil : ""}" aria-label="${escapeHtml(ariaLabel)}" aria-pressed="${selected}" aria-disabled="${usable ? "false" : "true"}" ${usable ? "" : "disabled"}>
        <span class="combat-style-action-name">${escapeHtml(action.name)}</span>
        <small class="combat-style-action-meta">${escapeHtml(buttonMeta.meta)}</small>
        <small class="combat-style-action-state ${active ? "is-active" : availability.available ? "is-ready" : "is-blocked"}">${escapeHtml(stateText)}</small>
      </button>`;
    })
    .join("");

  container.innerHTML = buttons;
}

function skillLoadoutTabsMarkup(context) {
  const loadouts = context.skillLoadouts?.() || [];
  if (loadouts.length <= 1) return "";

  const activeId = context.activeSkillLoadoutId?.();
  const tabs = loadouts
    .map((loadout) => {
      const active = loadout.id === activeId;
      return `<button type="button" class="skill-loadout-tab ${active ? "is-active" : ""}" data-skill-loadout="${escapeHtml(loadout.id)}" aria-pressed="${active}">
        ${escapeHtml(loadout.name)}
      </button>`;
    })
    .join("");

  return `<div class="skill-loadout-tabs" aria-label="${escapeHtml(t("combatActions.skillLoadoutTabsLabel"))}">${tabs}</div>`;
}

function combatSkillInfoMarkup(player, context) {
  const visibleAction = context.combatRuntime.visibleActionInfoId
    ? context.getCombatAction(context.combatRuntime.visibleActionInfoId)
    : null;
  const visibleAvailability = visibleAction ? context.skillAvailability(visibleAction, player, false) : null;
  const visibleHelp = context.combatRuntime.visibleCombatHelpId ? context.helpText[context.combatRuntime.visibleCombatHelpId] : null;

  if (visibleHelp) {
    return `<div class="skill-info">
      <strong>${escapeHtml(visibleHelp[0])}</strong>
      <span>${escapeHtml(visibleHelp[1])}</span>
      <em>${escapeHtml(context.hideHint)}</em>
    </div>`;
  }

  if (!visibleAction) return "";
  const infoParts = actionInfoParts(visibleAction, context, visibleAvailability);

  return `<div class="skill-info">
    <strong>${escapeHtml(visibleAction.name)}</strong>
    <span>${escapeHtml(visibleAction.description)}</span>
    <em>${escapeHtml(infoParts.join(" · "))}</em>
  </div>`;
}

function actionInfoParts(action, context, availability, now = Date.now()) {
  const cooldownStatus = actionCooldownStatusText(action, context, now);
  return [
    actionCostText(action),
    actionCooldownText(action),
    actionBuffEffectText(action),
    cooldownStatus,
    weaknessActionInfoText(action, context),
    context.actionTriggerText(action),
    !cooldownStatus && availability?.reason ? tf("combatActions.unavailableReason", { reason: availability.reason }) : "",
  ].filter(Boolean);
}

function actionButtonMeta(action, context, availability, now = Date.now()) {
  const meta = [actionCostText(action), actionCooldownText(action)].filter(Boolean).join(" · ");
  const cooldownStatus = actionCooldownStatusText(action, context, now);
  const state = cooldownStatus || (availability?.available ? t("combatActions.ready") : availability?.reason || t("combatActions.unavailable"));
  return {
    meta,
    state,
  };
}

function combatWeaknessPriorityActionId(actionEntries, state, now = Date.now()) {
  if (combatWeaknessSkillUiKey(state, now) === "weakness:idle") return "";
  const best = actionEntries
    .map(({ action, availability }, index) => ({
      action,
      index,
        score: availability?.available && action?.id !== "basic_attack" && action?.damageType !== "support" && action?.damageType !== "buff"
        ? weaknessAutoHuntSkillScore(action)
        : -Infinity,
    }))
    .filter((entry) => Number.isFinite(entry.score))
    .sort((left, right) => right.score - left.score || left.index - right.index)[0];
  return best?.action?.id || "";
}

function combatWeaknessSkillUiKey(state, now = Date.now()) {
  const weaknessUntil = Number(state?.target?.weaknessUntil || 0);
  if (!state?.inCombat || !weaknessUntil || weaknessUntil <= now) return "weakness:idle";
  return `weakness:${Math.floor(weaknessUntil)}:${Number(state.target.weaknessStrikeCount || 0)}`;
}

function weaknessActionInfoText(action, context, now = Date.now()) {
  if (!action || action.id === "basic_attack" || action.damageType === "support" || action.damageType === "buff") return "";
  const weaknessInfo = calculateWeaknessSkillDamageMultiplier(action, context.state?.target, now);
  if (!weaknessInfo.active) return "";
  return tf("combatActions.weaknessBonus", {
    multiplier: weaknessInfo.multiplier.toFixed(2),
    count: weaknessInfo.strikeIndex,
  });
}

function actionCostText(action) {
  const hpCostRatio = Number(action?.selfHpCostRatio ?? action?.skill?.selfHpCostRatio ?? 0);
  if (Number.isFinite(hpCostRatio) && hpCostRatio > 0) {
    const percent = Math.round(hpCostRatio * 100);
    return tf("combatActions.hpCostPercent", { percent }, `HP ${percent}%`);
  }
  const mpCost = Number(action?.mpCost ?? action?.skill?.mpCost ?? 0);
  return tf("combatActions.mpCost", { mp: Number.isFinite(mpCost) ? Math.max(0, mpCost) : 0 });
}

function actionCooldownText(action) {
  const cooldown = Number(action?.cooldown ?? action?.skill?.cooldown ?? 0);
  if (!Number.isFinite(cooldown) || cooldown <= 0) return t("combatActions.noCooldown");
  return tf("combatActions.cooldown", { cooldown });
}

function actionBuffEffectText(action) {
  const buffId = action?.buff?.id || "";
  if (buffId === "preserve_guard") return t("combatBuffStatus.preserve.detail", "Next damage x0.5");
  if (buffId === "full_power") return t("combatBuffStatus.fullPower.detail", "Attack x1.25");
  if (buffId === "rampage") return t("combatBuffStatus.rampage.detail", "Attack x1.45 / damage x1.2");
  return "";
}

function actionCooldownStatusText(action, context, now = Date.now()) {
  const remainingMs = actionCooldownRemainingMs(action, context, now);
  if (remainingMs <= 0) return "";
  return tf("combatActions.cooldownRemainingShort", {
    seconds: formatCooldownSeconds(remainingMs),
  }, `CD ${formatCooldownSeconds(remainingMs)}s`);
}

function actionCooldownRenderKey(action, context, now = Date.now()) {
  const remainingMs = actionCooldownRemainingMs(action, context, now);
  if (remainingMs <= 0) return "ready";
  return `cooldown:${Math.ceil(remainingMs / 100)}`;
}

function actionCooldownRemainingMs(action, context, now = Date.now()) {
  const actionId = action?.id || action?.skill?.id || "";
  if (!actionId) return 0;
  const cooldownUntil = Number(context?.combatRuntime?.actionCooldowns?.[actionId] || 0);
  if (!Number.isFinite(cooldownUntil) || cooldownUntil <= now) return 0;
  return Math.max(0, cooldownUntil - now);
}

function formatCooldownSeconds(remainingMs) {
  return Math.max(0.1, remainingMs / 1000).toFixed(1);
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
