import { t, tf } from "../localization/index.js?v=506";

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
  infoSlot.innerHTML = combatSkillInfoMarkup(player, context);
}

export function renderCombatSkillsIfNeeded(player, context) {
  const now = Date.now();
  const flashActionId =
    now < context.combatRuntime.actionFlashUntil
      ? `${context.combatRuntime.lastActionId || ""}:${context.combatRuntime.actionFlashUntil || 0}`
      : "";
  const inputLocked = context.combatRuntime.inputLocked === true;
  const availabilityKey = context
    .combatActionList()
    .map((action) => {
      const availability = context.skillAvailability(action, player, false);
      return `${action.id}:${availability.available ? 1 : 0}:${availability.reason}`;
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

  const buttons = context
    .combatActionList()
    .slice(0, COMBAT_SKILL_SLOT_COUNT)
    .map((action) => {
      const availability = context.skillAvailability(action, player, false);
      const selected = visibleAction && action.id === visibleAction.id;
      const lastUsed = context.combatRuntime.lastActionId === action.id;
      const flashing = lastUsed && now < context.combatRuntime.actionFlashUntil;
      const infoParts = actionInfoParts(action, context, availability);
      const buttonMeta = actionButtonMeta(action, availability);
      const usable = availability.available && !inputLocked;
      const classes = [
        "skill-button",
        usable ? "is-usable" : "is-locked",
        inputLocked ? "is-input-locked" : "",
        selected ? "is-selected" : "",
        lastUsed ? "is-last-used" : "",
        flashing ? "is-flashing" : "",
      ]
        .filter(Boolean)
        .join(" ");
      const ariaLabel = `${action.name}. ${action.description}. ${infoParts.join(" · ")}`;

      return `<button type="button" class="${classes}" data-action-info="${escapeHtml(action.id)}" data-combat-action="${escapeHtml(action.id)}" data-last-used="${lastUsed}" data-flash-key="${flashing ? context.combatRuntime.actionFlashUntil : ""}" aria-label="${escapeHtml(ariaLabel)}" aria-pressed="${selected}" aria-disabled="${usable ? "false" : "true"}" ${inputLocked ? "disabled" : ""}>
        <span class="skill-button-name">${escapeHtml(action.name)}</span>
        <small class="skill-button-meta">${escapeHtml(buttonMeta.meta)}</small>
        <small class="skill-button-state ${availability.available ? "is-ready" : "is-blocked"}">${escapeHtml(buttonMeta.state)}</small>
      </button>`;
    })
    .join("");

  container.innerHTML = `${skillLoadoutTabsMarkup(context)}<div class="skill-buttons">${buttons}</div>`;
  const infoSlot = document.getElementById("combat-skill-info");
  if (infoSlot) infoSlot.innerHTML = combatSkillInfoMarkup(player, context);
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

function actionInfoParts(action, context, availability) {
  return [
    actionCostText(action),
    actionCooldownText(action),
    context.actionTriggerText(action),
    availability?.reason ? tf("combatActions.unavailableReason", { reason: availability.reason }) : "",
  ].filter(Boolean);
}

function actionButtonMeta(action, availability) {
  const meta = [actionCostText(action), actionCooldownText(action)].filter(Boolean).join(" · ");
  const state = availability?.available ? t("combatActions.ready") : availability?.reason || t("combatActions.unavailable");
  return {
    meta,
    state,
  };
}

function actionCostText(action) {
  const mpCost = Number(action?.mpCost ?? action?.skill?.mpCost ?? 0);
  return tf("combatActions.mpCost", { mp: Number.isFinite(mpCost) ? Math.max(0, mpCost) : 0 });
}

function actionCooldownText(action) {
  const cooldown = Number(action?.cooldown ?? action?.skill?.cooldown ?? 0);
  if (!Number.isFinite(cooldown) || cooldown <= 0) return t("combatActions.noCooldown");
  return tf("combatActions.cooldown", { cooldown });
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}



