import { normalizePortraitFrame } from "../state/portraitFrame.js?v=485";

export function applyPortraitFrameToElement(element, frame) {
  if (!element) return normalizePortraitFrame(frame);
  const normalized = normalizePortraitFrame(frame);
  element.style.setProperty("--portrait-frame-x", `${normalized.x}%`);
  element.style.setProperty("--portrait-frame-y", `${normalized.y}%`);
  element.style.setProperty("--portrait-frame-scale", normalized.scale);
  element.dataset.portraitFrameX = String(normalized.x);
  element.dataset.portraitFrameY = String(normalized.y);
  element.dataset.portraitFrameScale = String(normalized.scale);
  return normalized;
}

export function readPortraitFrameFromElement(element) {
  return normalizePortraitFrame({
    x: element?.dataset.portraitFrameX,
    y: element?.dataset.portraitFrameY,
    scale: element?.dataset.portraitFrameScale,
  });
}

export function renderPortraitImagePreview(element, image, frame, { label = "" } = {}) {
  if (!element) return;
  element.querySelectorAll(".portrait-crop-image").forEach((imageElement) => imageElement.remove());
  const normalized = applyPortraitFrameToElement(element, frame);
  element.classList.toggle("has-image", Boolean(image));
  if (!image) return;

  const imageElement = document.createElement("img");
  imageElement.className = "portrait-crop-image";
  imageElement.src = image;
  imageElement.alt = label;
  imageElement.draggable = false;
  element.prepend(imageElement);
  return normalized;
}

export function portraitFrameInlineStyle(frame) {
  const normalized = normalizePortraitFrame(frame);
  return `--portrait-frame-x:${normalized.x}%;--portrait-frame-y:${normalized.y}%;--portrait-frame-scale:${normalized.scale};`;
}

export function portraitCropImageHtml(image, label = "") {
  if (!image) return "";
  return `<img class="portrait-crop-image" src="${escapeAttr(image)}" alt="${escapeAttr(label)}" draggable="false" />`;
}

export function portraitFrameFromElementOrDefault(element) {
  return readPortraitFrameFromElement(element);
}

function escapeAttr(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}



