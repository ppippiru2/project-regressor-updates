import { t, tf } from "../localization/index.js?v=335";

export function renderGrowthObjective(objective, uiState = {}, handlers = {}) {
  const container = document.getElementById("growth-objective");
  if (!container) return;
  if (!objective) {
    container.hidden = true;
    return;
  }

  const hasAction = Boolean(objective.action?.view);
  container.hidden = false;
  container.dataset.objectiveState = objective.state;
  container.dataset.objectiveId = objective.id || objective.state;
  container.dataset.navView = objective.action?.view || "";
  container.dataset.navRegion = objective.action?.regionId || "";
  container.dataset.rotationTotal = String(objective.rotationTotal || 1);
  container.classList.toggle("is-actionable", hasAction);

  const collapsed = isObjectiveCollapsed(objective, uiState);
  container.classList.toggle("is-collapsed", collapsed);
  container.classList.toggle("is-manual-rotation", objective.rotationMode === "manual");
  container.tabIndex = hasAction ? 0 : -1;
  container.setAttribute("role", hasAction ? "button" : "region");
  container.setAttribute("aria-label", hasAction ? `${objective.title}. ${objective.detail}` : objective.title);

  setText("growth-objective-eyebrow", objectiveEyebrow(objective));
  setText("growth-objective-title", objective.title);
  setText("growth-objective-detail", objective.detail);

  const bar = document.getElementById("growth-objective-bar");
  const hasMeter = objective.showMeter !== false && Number.isFinite(objective.progress);
  container.classList.toggle("has-objective-meter", hasMeter);
  const meter = bar?.closest(".growth-objective-meter");
  if (meter) meter.hidden = !hasMeter;
  if (bar) bar.style.width = hasMeter ? `${Math.round(objective.progress)}%` : "0%";

  renderObjectiveToggle(objective, collapsed, handlers.onToggleObjective);
  renderObjectiveRotationControls(objective, collapsed, handlers);
  bindObjectiveNavigation(container, objective.action, handlers.onObjectiveAction);
}

function objectiveEyebrow(objective) {
  const total = objective.rotationTotal || 1;
  if (total <= 1) return t("growthObjective.eyebrowDefault");
  return tf("growthObjective.eyebrowIndexed", {
    current: Number(objective.rotationIndex || 0) + 1,
    total,
  });
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function renderObjectiveToggle(objective, collapsed, onToggleObjective) {
  const button = document.getElementById("growth-objective-toggle");
  if (!button) return;

  button.hidden = false;
  button.textContent = collapsed ? "+" : "−";
  button.setAttribute("aria-expanded", String(!collapsed));
  button.setAttribute(
    "aria-label",
    collapsed
      ? tf("growthObjective.expandLabel", { title: objective.title })
      : tf("growthObjective.collapseLabel", { title: objective.title }),
  );
  button.onclick = (event) => {
    event.stopPropagation();
    onToggleObjective?.(objective.id || objective.state);
  };
}

function renderObjectiveRotationControls(objective, collapsed, handlers = {}) {
  const controls = document.getElementById("growth-objective-rotation-controls");
  const prevButton = document.getElementById("growth-objective-prev");
  const nextButton = document.getElementById("growth-objective-next");
  const modeButton = document.getElementById("growth-objective-mode");
  const total = Number(objective.rotationTotal || 1);
  const currentIndex = Number(objective.rotationIndex || 0);
  const hasControls = total > 1 && !collapsed;

  if (controls) controls.hidden = !hasControls;
  if (!hasControls) return;

  if (prevButton) {
    prevButton.onclick = (event) => {
      event.stopPropagation();
      handlers.onStepObjective?.(-1, currentIndex, total);
    };
  }

  if (nextButton) {
    nextButton.onclick = (event) => {
      event.stopPropagation();
      handlers.onStepObjective?.(1, currentIndex, total);
    };
  }

  if (modeButton) {
    const isManual = objective.rotationMode === "manual";
    modeButton.textContent = isManual ? t("growthObjective.manual") : t("growthObjective.automatic");
    modeButton.setAttribute("aria-pressed", String(isManual));
    modeButton.setAttribute(
      "aria-label",
      isManual ? t("growthObjective.enableAutoRotation") : t("growthObjective.switchToManual"),
    );
    modeButton.onclick = (event) => {
      event.stopPropagation();
      handlers.onToggleObjectiveRotationMode?.(currentIndex, total);
    };
  }
}

function bindObjectiveNavigation(container, action, onObjectiveAction) {
  if (!action?.view) {
    container.onclick = null;
    container.onkeydown = null;
    return;
  }

  container.onclick = (event) => {
    if (event.target.closest("button")) return;
    navigateToAction(action, onObjectiveAction);
  };
  container.onkeydown = (event) => {
    if (!["Enter", " "].includes(event.key)) return;
    if (event.target.closest("button")) return;
    event.preventDefault();
    navigateToAction(action, onObjectiveAction);
  };
}

function navigateToAction(action, onObjectiveAction) {
  if (!action?.view) return;
  if (onObjectiveAction?.(action) === true) return;

  const navButton = [...document.querySelectorAll(".nav-button")].find((item) => item.dataset.view === action.view);
  navButton?.click();
}

function isObjectiveCollapsed(objective, uiState) {
  const key = objective?.id || objective?.state;
  return Boolean(key && uiState.collapsedObjectives?.includes(key));
}
