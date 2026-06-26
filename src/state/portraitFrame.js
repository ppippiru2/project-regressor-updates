export const DEFAULT_PORTRAIT_FRAME = Object.freeze({
  x: 50,
  y: 35,
  scale: 1.3,
});

const ABSOLUTE_MIN_FRAME_POSITION = 0;
const ABSOLUTE_MAX_FRAME_POSITION = 100;
const MIN_FRAME_SCALE = 1;
const MAX_FRAME_SCALE = 2.4;
const MOVE_STEP = 5;
const SCALE_STEP = 0.1;

export function normalizePortraitFrame(frame = {}) {
  const source = frame && typeof frame === "object" && !Array.isArray(frame) ? frame : {};
  const scale = roundFrameNumber(clampNumber(Number(source.scale), MIN_FRAME_SCALE, MAX_FRAME_SCALE, DEFAULT_PORTRAIT_FRAME.scale));
  const { min, max } = positionBoundsForScale(scale);
  return {
    x: roundFrameNumber(clampNumber(Number(source.x), min, max, clampNumber(DEFAULT_PORTRAIT_FRAME.x, min, max, 50))),
    y: roundFrameNumber(clampNumber(Number(source.y), min, max, clampNumber(DEFAULT_PORTRAIT_FRAME.y, min, max, 50))),
    scale,
  };
}

export function portraitFrameFromFormData(formData) {
  return normalizePortraitFrame({
    x: formData.get("portraitFrameX"),
    y: formData.get("portraitFrameY"),
    scale: formData.get("portraitFrameScale"),
  });
}

export function nudgePortraitFrame(frame, action) {
  const current = normalizePortraitFrame(frame);
  if (action === "up") return normalizePortraitFrame({ ...current, y: current.y - MOVE_STEP });
  if (action === "down") return normalizePortraitFrame({ ...current, y: current.y + MOVE_STEP });
  if (action === "left") return normalizePortraitFrame({ ...current, x: current.x - MOVE_STEP });
  if (action === "right") return normalizePortraitFrame({ ...current, x: current.x + MOVE_STEP });
  if (action === "zoomIn") return normalizePortraitFrame({ ...current, scale: current.scale + SCALE_STEP });
  if (action === "zoomOut") return normalizePortraitFrame({ ...current, scale: current.scale - SCALE_STEP });
  if (action === "reset") return normalizePortraitFrame(DEFAULT_PORTRAIT_FRAME);
  return current;
}

export function dragPortraitFrame(frame, deltaXPercent, deltaYPercent) {
  const current = normalizePortraitFrame(frame);
  return normalizePortraitFrame({
    ...current,
    x: current.x + deltaXPercent,
    y: current.y + deltaYPercent,
  });
}

function clampNumber(value, min, max, fallback) {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, value));
}

function roundFrameNumber(value) {
  return Math.round(value * 100) / 100;
}

function positionBoundsForScale(scale) {
  const lower = 100 - 50 * scale;
  const upper = 50 * scale;
  return {
    min: Math.max(ABSOLUTE_MIN_FRAME_POSITION, lower),
    max: Math.min(ABSOLUTE_MAX_FRAME_POSITION, upper),
  };
}
