import { INFO_TEXT } from "../config/infoText.js?v=426";

const INFO_SELECTOR = "[data-info-key], [data-info-title]";

export function bindInfoTooltipEvents({
  root = document.body,
  isInfoTooltipEnabled = () => true,
} = {}) {
  let tooltip = null;
  let pinnedTarget = null;

  root.addEventListener("mouseover", (event) => {
    const target = findInfoTarget(event.target);
    if (!target || pinnedTarget || !isInfoTooltipEnabled()) return;
    showTooltip(target);
  });

  root.addEventListener("mouseout", (event) => {
    const target = findInfoTarget(event.target);
    if (!target || pinnedTarget) return;
    if (!target.contains(event.relatedTarget)) hideTooltip();
  });

  root.addEventListener("focusin", (event) => {
    const target = findInfoTarget(event.target);
    if (!target || !isInfoTooltipEnabled()) return;
    showTooltip(target);
  });

  root.addEventListener("focusout", (event) => {
    const target = findInfoTarget(event.target);
    if (!target || pinnedTarget) return;
    if (!target.contains(event.relatedTarget)) hideTooltip();
  });

  root.addEventListener("click", (event) => {
    const target = findInfoTarget(event.target);
    if (!target) {
      if (pinnedTarget) {
        pinnedTarget = null;
        hideTooltip();
      }
      return;
    }
    if (!isInfoTooltipEnabled()) return;
    event.preventDefault();
    if (pinnedTarget === target) {
      pinnedTarget = null;
      hideTooltip();
      return;
    }
    pinnedTarget = target;
    showTooltip(target, true);
  });

  root.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    pinnedTarget = null;
    hideTooltip();
  });

  window.addEventListener("scroll", () => {
    if (!pinnedTarget) hideTooltip();
  }, true);
  window.addEventListener("resize", () => {
    if (pinnedTarget) showTooltip(pinnedTarget, true);
    else hideTooltip();
  });

  function showTooltip(target, pinned = false) {
    const info = resolveInfo(target);
    if (!info) return;
    const node = ensureTooltip();
    node.classList.toggle("is-pinned", pinned);
    node.innerHTML = `<strong>${escapeHtml(info.title)}</strong><span>${escapeHtml(info.body)}</span>`;
    node.hidden = false;
    positionTooltip(node, target);
  }

  function hideTooltip() {
    if (!tooltip) return;
    tooltip.hidden = true;
    tooltip.classList.remove("is-pinned");
  }

  function ensureTooltip() {
    if (tooltip) return tooltip;
    tooltip = document.createElement("aside");
    tooltip.className = "field-info-tooltip";
    tooltip.hidden = true;
    tooltip.setAttribute("role", "tooltip");
    document.body.appendChild(tooltip);
    return tooltip;
  }
}

function findInfoTarget(target) {
  return target?.closest?.(INFO_SELECTOR) || null;
}

function resolveInfo(target) {
  const title = target.dataset.infoTitle;
  const body = target.dataset.infoBody;
  if (title && body) return { title, body };

  const entry = INFO_TEXT[target.dataset.infoKey];
  if (!entry) return null;
  return { title: entry[0], body: entry[1] };
}

function positionTooltip(tooltip, target) {
  const rect = target.getBoundingClientRect();
  const margin = 12;
  const width = Math.min(320, window.innerWidth - margin * 2);
  tooltip.style.maxWidth = `${width}px`;

  const tooltipRect = tooltip.getBoundingClientRect();
  const left = clamp(rect.left, margin, window.innerWidth - tooltipRect.width - margin);
  const below = rect.bottom + margin;
  const above = rect.top - tooltipRect.height - margin;
  const top = below + tooltipRect.height <= window.innerHeight - margin ? below : Math.max(margin, above);

  tooltip.style.left = `${left}px`;
  tooltip.style.top = `${top}px`;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}
