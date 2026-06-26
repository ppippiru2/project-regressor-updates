const COMBAT_INFO_SELECTOR = "[data-action-info], [data-combat-help]";
const EXECUTABLE_COMBAT_INFO_SELECTOR = "[data-combat-help]";
const DOUBLE_TAP_WINDOW_MS = 900;
const TOUCH_CLICK_GRACE_MS = 750;
const TOUCH_POINTER_TYPES = new Set(["touch", "pen"]);

export function bindCombatInfoEvents({
  root = document.body,
  showCombatInfoFromElement,
  hideCombatInfo,
  isTouchDoubleTapMode = () => false,
} = {}) {
  let actionInfoPressTimer = null;
  let lastPointerType = "";
  let lastTouchPointerAt = 0;
  let pendingTouchAction = null;

  root.addEventListener("mouseover", (event) => {
    const combatInfo = event.target.closest(COMBAT_INFO_SELECTOR);
    if (combatInfo) showCombatInfoFromElement(combatInfo);
  });

  root.addEventListener("mouseout", (event) => {
    const combatInfo = event.target.closest(COMBAT_INFO_SELECTOR);
    if (combatInfo && !combatInfo.contains(event.relatedTarget)) hideCombatInfo();
  });

  root.addEventListener("focusin", (event) => {
    const combatInfo = event.target.closest(COMBAT_INFO_SELECTOR);
    if (combatInfo) showCombatInfoFromElement(combatInfo);
  });

  root.addEventListener("focusout", (event) => {
    const combatInfo = event.target.closest(COMBAT_INFO_SELECTOR);
    if (combatInfo && !combatInfo.contains(event.relatedTarget)) hideCombatInfo();
  });

  root.addEventListener("pointerdown", (event) => {
    const combatInfo = event.target.closest(COMBAT_INFO_SELECTOR);
    lastPointerType = event.pointerType || "";
    lastTouchPointerAt = isTouchPointer(event) ? Date.now() : 0;
    if (!combatInfo) {
      clearTimeout(actionInfoPressTimer);
      if (isTouchPointer(event) && isTouchDoubleTapMode()) pendingTouchAction = null;
      return;
    }
    clearTimeout(actionInfoPressTimer);
    if (isTouchPointer(event) && isTouchDoubleTapMode()) {
      showCombatInfoFromElement(combatInfo);
      return;
    }
    actionInfoPressTimer = setTimeout(() => showCombatInfoFromElement(combatInfo), 420);
  });

  root.addEventListener(
    "click",
    (event) => {
      const isRecentTouchClick =
        TOUCH_POINTER_TYPES.has(lastPointerType) && Date.now() - lastTouchPointerAt <= TOUCH_CLICK_GRACE_MS;
      if (!isTouchDoubleTapMode() || !isRecentTouchClick) return;

      const combatInfo = event.target.closest(COMBAT_INFO_SELECTOR);
      if (!combatInfo) {
        pendingTouchAction = null;
        hideCombatInfo();
        return;
      }

      showCombatInfoFromElement(combatInfo);
      const executable = combatInfo.closest(EXECUTABLE_COMBAT_INFO_SELECTOR);
      if (!executable) return;

      const now = Date.now();
      const samePending = pendingTouchAction?.element === executable && pendingTouchAction.expiresAt >= now;
      if (samePending) {
        pendingTouchAction = null;
        return;
      }

      pendingTouchAction = { element: executable, expiresAt: now + DOUBLE_TAP_WINDOW_MS };
      event.preventDefault();
      event.stopImmediatePropagation();
    },
    true
  );

  ["pointerup", "pointercancel", "pointerleave"].forEach((eventName) => {
    root.addEventListener(eventName, (event) => {
      clearTimeout(actionInfoPressTimer);
      if (isTouchPointer(event) && isTouchDoubleTapMode()) return;
      hideCombatInfo();
    });
  });
}

function isTouchPointer(event) {
  return TOUCH_POINTER_TYPES.has(event.pointerType);
}
