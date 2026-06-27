import { activateView, keepActiveTabInView } from "./viewNavigation.js?v=433";

export function bindNavigationEvents({ onViewChange } = {}) {
  const buttons = [...document.querySelectorAll(".nav-button")];
  if (!buttons.length) return;

  const activateButton = (button) => {
    if (!button) return;
    const result = activateView(button.dataset.view, { scrollActiveTab: true });
    if (result.changed) onViewChange?.({ previousView: result.previousView, nextView: result.nextView });
  };

  const stepTab = (direction) => {
    const activeIndex = Math.max(0, buttons.findIndex((button) => button.classList.contains("active")));
    const nextIndex = (activeIndex + direction + buttons.length) % buttons.length;
    activateButton(buttons[nextIndex]);
  };

  buttons.forEach((button) => {
    button.addEventListener("click", () => activateButton(button));
  });

  document.querySelectorAll("[data-nav-step]").forEach((button) => {
    button.addEventListener("click", () => stepTab(Number(button.dataset.navStep) || 1));
  });

  bindNavSwipe(stepTab);
  keepActiveTabInView(document.querySelector(".nav-button.active"));
}

function bindNavSwipe(stepTab) {
  const surfaces = [
    document.querySelector("[data-nav-shell]"),
  ].filter(Boolean);
  if (!surfaces.length) return;

  let gesture = null;
  const startGesture = (event) => {
    if (!isTouchLikePointer(event) || shouldIgnoreSwipeTarget(event.target)) return;
    gesture = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      moved: false,
    };
  };
  const moveGesture = (event) => {
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    if (Math.abs(event.clientX - gesture.startX) > 12 || Math.abs(event.clientY - gesture.startY) > 12) {
      gesture.moved = true;
    }
  };
  const endGesture = (event) => {
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    const deltaX = event.clientX - gesture.startX;
    const deltaY = event.clientY - gesture.startY;
    gesture = null;
    if (Math.abs(deltaX) < 64 || Math.abs(deltaX) < Math.abs(deltaY) * 1.35) return;
    stepTab(deltaX < 0 ? 1 : -1);
  };
  const cancelGesture = () => {
    gesture = null;
  };

  surfaces.forEach((surface) => {
    surface.addEventListener("pointerdown", startGesture, { passive: true });
    surface.addEventListener("pointermove", moveGesture, { passive: true });
    surface.addEventListener("pointerup", endGesture, { passive: true });
    surface.addEventListener("pointercancel", cancelGesture, { passive: true });
  });
}

function isTouchLikePointer(event) {
  if (!isMobileTabMode()) return false;
  if (event.pointerType === "touch" || event.pointerType === "pen") return true;
  return (
    event.pointerType === "mouse" &&
    event.buttons === 1
  );
}

function isMobileTabMode() {
  return window.matchMedia("(max-width: 700px)").matches;
}

function shouldIgnoreSwipeTarget(target) {
  if (!(target instanceof Element)) return false;
  if (target.closest("[data-nav-shell]")) {
    return Boolean(target.closest("[data-nav-step]"));
  }
  return Boolean(
    target.closest(
      [
        "button",
        "a",
        "input",
        "select",
        "textarea",
        "[role='button']",
        ".battle-scene",
        ".gate-map",
        ".region-list",
        ".inventory-layout",
        ".shop-layout",
        ".save-slot-card",
        ".profile-portrait-editor",
        ".profile-edit-image-editor",
        ".profile-edit-preview",
        ".profile-crop-controls",
        ".portrait-crop-image",
      ].join(",")
    )
  );
}
