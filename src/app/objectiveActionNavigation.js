function resolveDocument(context) {
  return context.documentRef ?? globalThis.document;
}

function resolveWindow(context) {
  return context.windowRef ?? globalThis.window;
}

export function handleObjectiveActionNavigation(action, context = {}) {
  if (!action?.view) return false;

  openAppView(action.view, context);

  if (action.regionId) {
    const previewed = context.previewRegionState?.(context.regions || [], context.uiState, action.regionId);
    if (previewed) {
      context.saveUiState?.();
      context.renderRegionList?.();
      focusObjectiveTargetRegion(action.regionId, context);
    }
  }

  return true;
}

export function openAppView(view, context = {}) {
  const documentRef = resolveDocument(context);
  if (!documentRef) return;

  const navView = view === "region" ? "regions" : view;
  const navButton = [...documentRef.querySelectorAll(".nav-button")].find((button) => button.dataset.view === navView);
  navButton?.click();
}

export function focusObjectiveTargetRegion(regionId, context = {}) {
  const documentRef = resolveDocument(context);
  const windowRef = resolveWindow(context);
  if (!documentRef) return;

  const focusTarget = () => {
    const card = [...documentRef.querySelectorAll("[data-region-preview]")].find(
      (element) => element.dataset.regionPreview === regionId
    );
    if (!card) return;

    card.classList.add("is-objective-target");
    card.scrollIntoView({ block: "center", inline: "nearest", behavior: "smooth" });
    if (typeof card.focus === "function") card.focus({ preventScroll: true });
    windowRef?.setTimeout?.(() => card.classList.remove("is-objective-target"), 2200);
  };

  focusTarget();
  windowRef?.requestAnimationFrame?.(focusTarget);
}
