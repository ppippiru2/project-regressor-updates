export function activeViewId(fallbackViewId = "combat") {
  return document.querySelector(".nav-button.active")?.dataset.view || fallbackViewId;
}

export function activateView(viewId = "combat", { scrollActiveTab = false } = {}) {
  const button = document.querySelector(`.nav-button[data-view="${viewId}"]`);
  const view = document.getElementById(`view-${viewId}`);
  const previousView = activeViewId(null);
  if (!button || !view || !viewId) {
    return { changed: false, previousView, nextView: previousView };
  }

  if (previousView === viewId) {
    if (scrollActiveTab) keepActiveTabInView(button);
    return { changed: false, previousView, nextView: viewId };
  }

  document.querySelectorAll(".nav-button").forEach((item) => item.classList.remove("active"));
  document.querySelectorAll(".view").forEach((item) => item.classList.remove("active"));
  button.classList.add("active");
  view.classList.add("active");
  if (scrollActiveTab) keepActiveTabInView(button);
  return { changed: true, previousView, nextView: viewId };
}

export function keepActiveTabInView(button = document.querySelector(".nav-button.active")) {
  if (!button) return;
  button.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
}

export function setCreationCancelMode(canCancel = false) {
  const screen = document.getElementById("character-creation");
  if (!screen) return;
  screen.dataset.canCancel = canCancel ? "true" : "false";
}

export function resetCharacterCreationWizard(canCancel = false) {
  setCreationCancelMode(canCancel);
  document.dispatchEvent(
    new CustomEvent("project-regressor:reset-character-creation", {
      detail: { canCancel },
    })
  );
}
