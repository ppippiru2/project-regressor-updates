import { resolveFateCardVisual } from "../data/fateCardVisualData.js?v=675";

const FATE_CARD_REVEAL_SHEET_WIDTH = 1536;
const FATE_CARD_REVEAL_SHEET_HEIGHT = 1024;
const FATE_CARD_REVEAL_FRAME_MS = 72;
const FATE_CARD_REVEAL_FINAL_MS = 220;

const FATE_CARD_REVEAL_SOURCE_FRAMES = Object.freeze([
  Object.freeze({ name: "sprite1", x: 100, y: 106, width: 230, height: 366 }),
  Object.freeze({ name: "sprite2", x: 468, y: 100, width: 188, height: 384 }),
  Object.freeze({ name: "sprite3", x: 896, y: 96, width: 80, height: 390 }),
  Object.freeze({ name: "sprite4", x: 1266, y: 104, width: 40, height: 384 }),
  Object.freeze({ name: "sprite5", x: 156, y: 576, width: 100, height: 362 }),
  Object.freeze({ name: "sprite6", x: 486, y: 574, width: 146, height: 360 }),
  Object.freeze({ name: "sprite7", x: 850, y: 582, width: 188, height: 340 }),
  Object.freeze({ name: "sprite8", x: 1220, y: 582, width: 204, height: 340 }),
]);

const FATE_CARD_REVEAL_REFERENCE_FRAME_NAME = "sprite1";
const FATE_CARD_REVEAL_FINAL_FRAME_NAME = "sprite8";

export const FATE_CARD_REVEAL_MOTION_FRAMES = Object.freeze(
  FATE_CARD_REVEAL_SOURCE_FRAMES.map((frame) => Object.freeze(expandFinalRevealFrame(frame))),
);

export const FATE_CARD_REVEAL_MOTION_DURATION_MS =
  (FATE_CARD_REVEAL_MOTION_FRAMES.length - 1) * FATE_CARD_REVEAL_FRAME_MS + FATE_CARD_REVEAL_FINAL_MS;

export function resolveFateCardRevealMotionVisual(card = {}) {
  return resolveFateCardVisual(card);
}

export function createFateCardRevealMotionFrameStyle(frame = {}, index = 0, revealSprite = "") {
  const width = Math.max(1, Number(frame.width) || 1);
  const height = Math.max(1, Number(frame.height) || 1);
  const x = Math.max(0, Number(frame.x) || 0);
  const y = Math.max(0, Number(frame.y) || 0);
  const backgroundX = FATE_CARD_REVEAL_SHEET_WIDTH === width
    ? 0
    : (x / Math.max(1, FATE_CARD_REVEAL_SHEET_WIDTH - width)) * 100;
  const backgroundY = FATE_CARD_REVEAL_SHEET_HEIGHT === height
    ? 0
    : (y / Math.max(1, FATE_CARD_REVEAL_SHEET_HEIGHT - height)) * 100;

  return {
    backgroundImage: revealSprite ? `url("${revealSprite}")` : "",
    backgroundSize: `${(FATE_CARD_REVEAL_SHEET_WIDTH / width) * 100}% ${(FATE_CARD_REVEAL_SHEET_HEIGHT / height) * 100}%`,
    backgroundPosition: `${backgroundX}% ${backgroundY}%`,
    delay: `${Math.max(0, index) * FATE_CARD_REVEAL_FRAME_MS}ms`,
    duration: index >= FATE_CARD_REVEAL_MOTION_FRAMES.length - 1 ? `${FATE_CARD_REVEAL_FINAL_MS}ms` : `${FATE_CARD_REVEAL_FRAME_MS}ms`,
  };
}

export function playFateCardRevealMotion(sourceElement, card = {}, options = {}) {
  const visual = resolveFateCardRevealMotionVisual(card);
  const revealSprite = visual?.revealSprite || card?.revealSprite || "";
  const documentRef = sourceElement?.ownerDocument || (typeof document !== "undefined" ? document : null);
  if (!documentRef || !revealSprite || prefersReducedMotion()) return Promise.resolve(false);

  const source = sourceElement?.querySelector?.(".fate-card-visual") || sourceElement;
  const rect = source?.getBoundingClientRect?.();
  if (!rect || rect.width <= 0 || rect.height <= 0) return Promise.resolve(false);
  const finalFrame = FATE_CARD_REVEAL_MOTION_FRAMES.at(-1) || {};
  const motionScaleX = Math.max(1, (Number(finalFrame.width) || 1) / Math.max(1, Number(finalFrame.sourceFrameWidth) || Number(finalFrame.width) || 1));
  const motionScaleY = Math.max(1, (Number(finalFrame.height) || 1) / Math.max(1, Number(finalFrame.sourceFrameHeight) || Number(finalFrame.height) || 1));
  const motionWidth = rect.width * motionScaleX;
  const motionHeight = rect.height * motionScaleY;

  const host = documentRef.createElement("div");
  host.className = "fate-card-reveal-motion";
  host.setAttribute("aria-hidden", "true");
  host.style.left = `${rect.left + rect.width / 2 - motionWidth / 2}px`;
  host.style.top = `${rect.top + rect.height / 2 - motionHeight / 2}px`;
  host.style.width = `${motionWidth}px`;
  host.style.height = `${motionHeight}px`;

  for (const [index, frame] of FATE_CARD_REVEAL_MOTION_FRAMES.entries()) {
    const frameElement = documentRef.createElement("span");
    const style = createFateCardRevealMotionFrameStyle(frame, index, revealSprite);
    frameElement.className = `fate-card-reveal-motion-frame ${index === FATE_CARD_REVEAL_MOTION_FRAMES.length - 1 ? "is-final" : ""}`;
    frameElement.dataset.fateCardRevealFrame = frame.name;
    frameElement.style.backgroundImage = style.backgroundImage;
    frameElement.style.backgroundSize = style.backgroundSize;
    frameElement.style.backgroundPosition = style.backgroundPosition;
    frameElement.style.animationDelay = style.delay;
    frameElement.style.animationDuration = style.duration;
    host.appendChild(frameElement);
  }

  documentRef.body.appendChild(host);
  const duration = Math.max(0, Number(options.durationMs) || FATE_CARD_REVEAL_MOTION_DURATION_MS);
  const windowRef = documentRef.defaultView || (typeof window !== "undefined" ? window : null);
  if (!windowRef) {
    host.remove();
    return Promise.resolve(false);
  }
  return new Promise((resolve) => {
    const timer = windowRef.setTimeout(() => {
      host.remove();
      resolve(true);
    }, duration + 80);
    host.addEventListener("animationcancel", () => {
      windowRef.clearTimeout(timer);
      host.remove();
      resolve(false);
    }, { once: true });
  });
}

function expandFinalRevealFrame(frame) {
  if (frame?.name !== FATE_CARD_REVEAL_FINAL_FRAME_NAME) return frame;
  const reference = FATE_CARD_REVEAL_SOURCE_FRAMES.find((sourceFrame) => sourceFrame.name === FATE_CARD_REVEAL_REFERENCE_FRAME_NAME);
  if (!reference) return frame;
  const centerX = Number(frame.x) + Number(frame.width) / 2;
  const centerY = Number(frame.y) + Number(frame.height) / 2;
  const width = Number(reference.width) || Number(frame.width) || 1;
  const height = Number(reference.height) || Number(frame.height) || 1;
  return {
    ...frame,
    x: Math.max(0, Math.round(centerX - width / 2)),
    y: Math.max(0, Math.round(centerY - height / 2)),
    width,
    height,
    sourceFrameWidth: frame.width,
    sourceFrameHeight: frame.height,
    referenceFrameName: reference.name,
  };
}

function prefersReducedMotion() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
