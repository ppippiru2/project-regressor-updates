import { t } from "../localization/index.js?v=497";

const byId = (id) => document.getElementById(id);
const COMPACT_COMBAT_BUTTON_LABELS = true;

export function renderCombatControls({ state, region }) {
  const huntButton = byId("hunt-button");
  if (huntButton) {
    const huntLabel = state.inCombat ? t("combatControls.huntStop") : t("combatControls.huntStart");
    huntButton.textContent = COMPACT_COMBAT_BUTTON_LABELS ? t("combatControls.huntShort") : huntLabel;
    huntButton.disabled = false;
    huntButton.classList.toggle("is-stop", state.inCombat);
    huntButton.setAttribute("aria-label", huntLabel);
  }

  const bossButton = byId("boss-button");
  if (bossButton) {
    const hasRegionBoss = Boolean(region.bossId);
    bossButton.disabled = state.inCombat || !hasRegionBoss;
    bossButton.hidden = !hasRegionBoss;

    const bossActions = bossButton.closest(".battle-actions");
    if (bossActions) bossActions.hidden = !hasRegionBoss;
  }

  const autoButton = byId("auto-toggle-button");
  if (autoButton) {
    const autoLabel = state.autoHunt ? t("combatControls.autoOn") : t("combatControls.autoOff");
    autoButton.textContent = t("combatControls.autoShort");
    autoButton.classList.toggle("is-off", !state.autoHunt);
    autoButton.setAttribute("aria-pressed", String(state.autoHunt));
    autoButton.setAttribute("aria-label", autoLabel);
    autoButton.title = autoLabel;
  }

  const restButton = byId("rest-button");
  if (restButton) {
    const restActive = Boolean(state.resting);
    restButton.textContent = restActive ? t("combatControls.restActive") : t("combatControls.restStart");
    restButton.classList.toggle("is-active", restActive);
    restButton.setAttribute("aria-pressed", String(restActive));
    restButton.setAttribute("aria-label", restActive ? t("combatControls.restStopAria") : t("combatControls.restStartAria"));
    restButton.title = restActive ? t("combatControls.restStopTitle") : t("combatControls.restStartTitle");
  }

  const battleState = byId("battle-state");
  if (battleState) {
    const status = state.inCombat && state.autoHunt ? "combat" : state.resting ? "rest" : state.autoHunt ? "auto" : "manual";
    battleState.textContent =
      status === "combat"
        ? t("combatControls.statusCombat")
        : status === "rest"
          ? t("combatControls.statusRest")
          : status === "auto"
            ? t("combatControls.statusAuto")
            : t("combatControls.statusManual");
    battleState.dataset.status = status;
  }
}
