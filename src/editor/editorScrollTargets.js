export const EDITOR_SCROLL_TARGETS = Object.freeze({
  balanceActiveSummary: "[data-balance-active-summary]",
  contentBulkPackage: ".editor-content-bulk-package",
});

export function scrollEditorTargetIntoView(root, selector, options = {}) {
  const scrollTarget = root?.querySelector?.(selector);
  if (!scrollTarget) return false;
  scheduleScroll(() => {
    scrollTarget.scrollIntoView({
      block: options.block || "start",
      behavior: options.behavior || "smooth",
    });
  }, options);
  return true;
}

export function scrollEditorBalanceCandidateSummaryIntoView(root, options = {}) {
  return scrollEditorTargetIntoView(root, EDITOR_SCROLL_TARGETS.balanceActiveSummary, options);
}

export function scrollEditorContentBulkPackageIntoView(root, options = {}) {
  return scrollEditorTargetIntoView(root, EDITOR_SCROLL_TARGETS.contentBulkPackage, options);
}

function scheduleScroll(callback, options = {}) {
  const requestFrame = options.requestAnimationFrame || getRequestAnimationFrame();
  if (typeof requestFrame === "function") {
    requestFrame(callback);
    return;
  }
  callback();
}

function getRequestAnimationFrame() {
  if (typeof window === "undefined") return null;
  return window.requestAnimationFrame?.bind(window) || null;
}
