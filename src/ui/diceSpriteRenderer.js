import { FALLBACK_DICE_SPRITE, loadDiceSpriteDefinition } from "../assets/diceSprite.js?v=382";

const DEFAULT_STAT_KEYS = ["STR", "AGI", "VIT", "INT", "WIS", "LUK"];
const DICE_FACE_PIPS = {
  1: ["center"],
  2: ["top-right", "bottom-left"],
  3: ["top-right", "center", "bottom-left"],
  4: ["top-left", "top-right", "bottom-left", "bottom-right"],
  5: ["top-left", "top-right", "center", "bottom-left", "bottom-right"],
  6: ["top-left", "middle-left", "bottom-left", "top-right", "middle-right", "bottom-right"],
};

let diceSpriteDefinition = FALLBACK_DICE_SPRITE;
let diceSpritePromise = null;

export function initialDiceFace() {
  return diceSpriteDefinition.idleFace || 6;
}

export function loadSystemDiceSprite() {
  if (!diceSpritePromise) {
    diceSpritePromise = loadDiceSpriteDefinition()
      .then((definition) => {
        diceSpriteDefinition = definition || FALLBACK_DICE_SPRITE;
        return diceSpriteDefinition;
      })
      .catch(() => {
        diceSpriteDefinition = FALLBACK_DICE_SPRITE;
        return diceSpriteDefinition;
      });
  }
  return diceSpritePromise;
}

export function renderDiceSprite(draft = {}, options = {}) {
  const definition = diceSpriteDefinition || FALLBACK_DICE_SPRITE;
  const size = Math.round(Number(options.size ?? definition.size) || 34);
  const frames = Array.isArray(definition.frames) && definition.frames.length
    ? definition.frames
    : FALLBACK_DICE_SPRITE.frames;
  const animation = resolveDiceAnimation(definition, frames);
  const isRolling = Date.now() < (draft.diceRollingUntil || 0);
  if (definition.type === "image-sprite-sheet" && definition.image) {
    return renderImageDiceSprite({ definition, frames, draft, size, animation, isRolling });
  }
  const face = clampFace(draft.diceFace || definition.idleFace || 6);
  const style = [
    `--dice-size:${size}px`,
    `--dice-frame-step:${animation.frameStepMs}ms`,
    `--dice-roll-duration:${animation.durationMs}ms`,
  ].join(";");

  return `<span class="dice-sprite ${isRolling ? "is-rolling" : ""}" style="${style}" data-roll-sequence="${draft.diceRollSequence || 0}" aria-hidden="true">
    ${renderDiceFace(face, "dice-sprite-idle")}
    ${animation.frames.map((frame, index) => renderDiceFace(frame.face, "dice-sprite-frame", diceFrameStyle(frame, index))).join("")}
  </span>`;
}

export function diceFaceFromStats(stats, statKeys = DEFAULT_STAT_KEYS) {
  const weighted = statKeys.reduce((total, stat, index) => total + (Number(stats?.[stat]) || 0) * (index + 1), 0);
  return (weighted % 6) + 1;
}

export function diceRollDuration() {
  const definition = diceSpriteDefinition || FALLBACK_DICE_SPRITE;
  const frames = Array.isArray(definition.frames) && definition.frames.length
    ? definition.frames
    : FALLBACK_DICE_SPRITE.frames;
  return resolveDiceAnimation(definition, frames).durationMs;
}

function renderImageDiceSprite({ definition, frames, draft, size, animation, isRolling }) {
  const idleFrame = resolveDiceIdleFrame(definition, frames, draft);
  const sheet = definition.sheet || { width: 1, height: 1 };
  const style = [
    `--dice-size:${size}px`,
    `--dice-frame-step:${animation.frameStepMs}ms`,
    `--dice-roll-duration:${animation.durationMs}ms`,
    `--dice-sheet-image:${cssUrl(definition.image)}`,
    `--dice-sheet-width:${Math.round(Number(sheet.width) || 1)}px`,
    `--dice-sheet-height:${Math.round(Number(sheet.height) || 1)}px`,
  ].join(";");

  return `<span class="dice-sprite dice-sprite-sheet ${isRolling ? "is-rolling" : ""}" style="${style}" data-roll-sequence="${draft.diceRollSequence || 0}" aria-hidden="true">
    ${renderDiceSheetFrame(idleFrame, "dice-sprite-idle is-sheet", 0, size)}
    ${animation.frames.map((frame, index) => renderDiceSheetFrame(frame, "dice-sprite-frame is-sheet", index, size)).join("")}
  </span>`;
}

function resolveDiceIdleFrame(definition, frames, draft) {
  const rollIndex = Math.max(0, (Number(draft.diceRollSequence) || 0) - 1);
  const rolledFrame = frames[rollIndex % frames.length];
  const configuredFrame = frames.find((frame) => frame.name === definition.idleFrame);
  return draft.statRolled ? rolledFrame : configuredFrame || frames[0];
}

function renderDiceSheetFrame(frame, className, index, displaySize) {
  const width = Math.max(1, Number(frame.width) || 1);
  const height = Math.max(1, Number(frame.height) || 1);
  const fit = displaySize / Math.max(width, height);
  const motion = diceSheetMotion(index);
  const style = [
    `--dice-frame-index:${index}`,
    `--dice-frame-w:${Math.round(width)}px`,
    `--dice-frame-h:${Math.round(height)}px`,
    `--dice-frame-fit:${fit.toFixed(5)}`,
    `--dice-frame-final-scale:${(fit * motion.scale).toFixed(5)}`,
    `--dice-frame-delay:${motion.delayMs}ms`,
    `--dice-bg-x:${-Math.round(Number(frame.x) || 0)}px`,
    `--dice-bg-y:${-Math.round(Number(frame.y) || 0)}px`,
    `--dice-frame-x:${motion.x}px`,
    `--dice-frame-y:${motion.y}px`,
    `--dice-frame-rotate:${motion.rotate}deg`,
  ].join(";");
  return `<span class="${className}" style="${style}"></span>`;
}

function diceSheetMotion(index) {
  const frameStepMs = Math.max(30, Math.min(180, Math.round(Number((diceSpriteDefinition.motion || {}).frameStepMs) || FALLBACK_DICE_SPRITE.motion.frameStepMs)));
  const motions = [
    { x: -2, y: 1, rotate: -12, scale: 0.96 },
    { x: 1, y: -2, rotate: 18, scale: 1.08 },
    { x: 3, y: 1, rotate: -24, scale: 1.03 },
    { x: -1, y: -1, rotate: 31, scale: 1.1 },
    { x: -3, y: 2, rotate: -36, scale: 1.02 },
    { x: 2, y: -2, rotate: 42, scale: 1.08 },
    { x: 1, y: 1, rotate: -18, scale: 1.04 },
    { x: 0, y: 0, rotate: 0, scale: 1 },
  ];
  return {
    ...motions[index % motions.length],
    delayMs: index * frameStepMs,
  };
}

function renderDiceFace(face, className, style = "") {
  const pips = DICE_FACE_PIPS[clampFace(face)] || DICE_FACE_PIPS[6];
  return `<span class="${className}" ${style ? `style="${style}"` : ""}>
    ${pips.map((position) => `<i class="dice-pip dice-pip-${position}"></i>`).join("")}
  </span>`;
}

function diceFrameStyle(frame, index) {
  const safeFrame = frame && typeof frame === "object" ? frame : {};
  const frameStepMs = Math.max(30, Math.min(180, Math.round(Number((diceSpriteDefinition.motion || {}).frameStepMs) || FALLBACK_DICE_SPRITE.motion.frameStepMs)));
  return [
    `--dice-frame-index:${index}`,
    `--dice-frame-delay:${index * frameStepMs}ms`,
    `--dice-frame-x:${Number(safeFrame.x) || 0}px`,
    `--dice-frame-y:${Number(safeFrame.y) || 0}px`,
    `--dice-frame-rotate:${Number(safeFrame.rotate) || 0}deg`,
    `--dice-frame-scale:${Number(safeFrame.scale) || 1}`,
  ].join(";");
}

function resolveDiceAnimation(definition, frames) {
  const motion = definition.motion || FALLBACK_DICE_SPRITE.motion;
  const frameStepMs = Math.max(30, Math.min(180, Math.round(Number(motion.frameStepMs) || FALLBACK_DICE_SPRITE.motion.frameStepMs)));
  const cycles = Math.max(1, Math.min(6, Number(motion.cycles) || 2));
  const settleMs = Math.max(0, Math.min(500, Math.round(Number(motion.settleMs) || frameStepMs)));
  const baseFrames = Array.isArray(frames) && frames.length ? frames : FALLBACK_DICE_SPRITE.frames;
  const rollingFrames = [];
  const totalFrames = Math.max(baseFrames.length, Math.ceil(baseFrames.length * cycles));
  for (let frameIndex = 0; frameIndex < totalFrames; frameIndex += 1) {
    rollingFrames.push(baseFrames[frameIndex % baseFrames.length]);
  }
  const minimumDurationMs = rollingFrames.length * frameStepMs + settleMs;
  const configuredDurationMs = Math.round(Number(motion.durationMs) || 0);
  return {
    frameStepMs,
    durationMs: Math.max(configuredDurationMs, minimumDurationMs),
    frames: rollingFrames,
  };
}

function clampFace(value) {
  const face = Math.round(Number(value));
  if (!Number.isFinite(face)) return 6;
  return Math.max(1, Math.min(6, face));
}

function cssUrl(value) {
  return `url('${resolveRuntimeUrl(value).replace(/'/g, "%27")}')`;
}

function resolveRuntimeUrl(value) {
  const raw = String(value || "").trim();
  if (!raw) return raw;
  if (/^(data:|blob:|https?:|capacitor:|file:)/i.test(raw)) return raw;
  const base = globalThis.document?.baseURI || globalThis.location?.href || "";
  if (!base) return raw;
  try {
    return new URL(raw, base).href;
  } catch {
    return raw;
  }
}
