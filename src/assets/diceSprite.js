export const FALLBACK_DICE_SPRITE = {
  id: "fate_dice_roll_fallback",
  version: 1,
  type: "css-sprite",
  size: 34,
  idleFace: 6,
  motion: {
    durationMs: 820,
    frameStepMs: 68,
    timing: "linear",
  },
  frames: [
    { face: 1, x: -3, y: 1, rotate: -22, scale: 0.92 },
    { face: 4, x: 2, y: -2, rotate: 18, scale: 1.03 },
    { face: 2, x: 4, y: 1, rotate: 42, scale: 0.98 },
    { face: 5, x: -2, y: -1, rotate: -39, scale: 1.08 },
    { face: 3, x: 1, y: 3, rotate: 66, scale: 1.02 },
    { face: 6, x: -4, y: -2, rotate: -72, scale: 0.96 },
    { face: 2, x: 3, y: 1, rotate: 104, scale: 1.06 },
    { face: 5, x: -1, y: 0, rotate: 132, scale: 1.01 },
    { face: 4, x: 2, y: -1, rotate: 178, scale: 0.97 },
    { face: 6, x: 0, y: 0, rotate: 216, scale: 1.04 },
    { face: 3, x: -2, y: 2, rotate: 254, scale: 1 },
    { face: 1, x: 0, y: 0, rotate: 292, scale: 0.95 },
  ],
};

const DEFAULT_SHEET_IMAGE = "./assets/ui/system_dice_roll_sheet.png";
const DEFAULT_SHEET_SIZE = { width: 1448, height: 1086 };
const IMAGE_LOAD_TIMEOUT_MS = 2200;

export async function loadDiceSpriteDefinition() {
  try {
    const response = await fetch("./data/dice-sprite.json?v=474", { cache: "no-store" });
    if (!response.ok) return FALLBACK_DICE_SPRITE;
    const definition = await response.json();
    const normalized = normalizeDiceSpriteDefinition(definition);
    return ensureSpriteImageReady(normalized);
  } catch {
    return FALLBACK_DICE_SPRITE;
  }
}

function normalizeDiceSpriteDefinition(definition) {
  if (Array.isArray(definition)) {
    return normalizeSheetDefinition({
      id: "fate_dice_roll",
      version: 1,
      type: "image-sprite-sheet",
      image: DEFAULT_SHEET_IMAGE,
      sheet: DEFAULT_SHEET_SIZE,
      size: 44,
      idleFrame: definition[0]?.name || "",
      motion: {
        durationMs: 860,
        frameStepMs: 72,
        timing: "linear",
      },
      frames: definition,
    });
  }
  if (!definition || typeof definition !== "object") return FALLBACK_DICE_SPRITE;
  if (definition.type === "image-sprite-sheet" || definition.image) return normalizeSheetDefinition(definition);
  const fallback = FALLBACK_DICE_SPRITE;
  const motion = definition.motion && typeof definition.motion === "object" ? definition.motion : fallback.motion;
  const frames = Array.isArray(definition.frames) && definition.frames.length
    ? definition.frames.map(normalizeFrame).filter(Boolean)
    : fallback.frames;

  return {
    ...fallback,
    ...definition,
    size: clampNumber(Number(definition.size), 24, 72, fallback.size),
    idleFace: clampFace(definition.idleFace ?? fallback.idleFace),
    motion: {
      ...fallback.motion,
      ...motion,
      durationMs: clampNumber(Number(motion.durationMs), 180, 2000, fallback.motion.durationMs),
      frameStepMs: clampNumber(Number(motion.frameStepMs), 30, 160, fallback.motion.frameStepMs),
    },
    frames: frames.length ? frames : fallback.frames,
  };
}

function normalizeSheetDefinition(definition) {
  const fallbackMotion = {
    durationMs: 860,
    frameStepMs: 72,
    timing: "linear",
  };
  const motion = definition.motion && typeof definition.motion === "object" ? definition.motion : fallbackMotion;
  const sheet = definition.sheet && typeof definition.sheet === "object" ? definition.sheet : DEFAULT_SHEET_SIZE;
  const frames = Array.isArray(definition.frames)
    ? definition.frames.map(normalizeSheetFrame).filter(Boolean)
    : [];
  if (!frames.length) return FALLBACK_DICE_SPRITE;

  return {
    id: String(definition.id || "fate_dice_roll"),
    version: Number(definition.version) || 1,
    type: "image-sprite-sheet",
    description: definition.description || "",
    target: definition.target || "",
    image: String(definition.image || DEFAULT_SHEET_IMAGE),
    sheet: {
      width: clampNumber(Number(sheet.width), 1, 4096, DEFAULT_SHEET_SIZE.width),
      height: clampNumber(Number(sheet.height), 1, 4096, DEFAULT_SHEET_SIZE.height),
    },
    size: clampNumber(Number(definition.size), 28, 96, 44),
    idleFrame: String(definition.idleFrame || frames[0]?.name || ""),
    motion: {
      ...fallbackMotion,
      ...motion,
      durationMs: clampNumber(Number(motion.durationMs), 180, 2400, fallbackMotion.durationMs),
      frameStepMs: clampNumber(Number(motion.frameStepMs), 30, 180, fallbackMotion.frameStepMs),
    },
    frames,
    editorHints: definition.editorHints || {},
  };
}

function normalizeSheetFrame(frame, index) {
  if (!frame || typeof frame !== "object") return null;
  return {
    name: String(frame.name || `sprite${index + 1}`),
    x: clampNumber(Number(frame.x), 0, 4096, 0),
    y: clampNumber(Number(frame.y), 0, 4096, 0),
    width: clampNumber(Number(frame.width), 1, 1024, 1),
    height: clampNumber(Number(frame.height), 1, 1024, 1),
  };
}

function normalizeFrame(frame) {
  if (!frame || typeof frame !== "object") return null;
  return {
    face: clampFace(frame.face),
    x: clampNumber(Number(frame.x), -24, 24, 0),
    y: clampNumber(Number(frame.y), -24, 24, 0),
    rotate: clampNumber(Number(frame.rotate), -720, 720, 0),
    scale: clampNumber(Number(frame.scale), 0.6, 1.5, 1),
  };
}

async function ensureSpriteImageReady(definition) {
  if (!definition || definition.type !== "image-sprite-sheet" || !definition.image) return definition;
  const image = resolveRuntimeUrl(definition.image);
  const canRenderImage = await canLoadImage(image);
  if (!canRenderImage) {
    // Some Android WebViews reject this preflight while the CSS background still loads.
    return { ...definition, image, imageLoadUnchecked: true };
  }
  return { ...definition, image };
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

function canLoadImage(src) {
  if (!src || typeof globalThis.Image !== "function") return Promise.resolve(Boolean(src));
  return new Promise((resolve) => {
    const image = new globalThis.Image();
    let settled = false;
    const finish = (result) => {
      if (settled) return;
      settled = true;
      clearTimeout(timer);
      image.onload = null;
      image.onerror = null;
      resolve(result);
    };
    const timer = setTimeout(() => finish(false), IMAGE_LOAD_TIMEOUT_MS);
    image.onload = () => finish(true);
    image.onerror = () => finish(false);
    image.src = src;
    if (image.complete && image.naturalWidth > 0) finish(true);
  });
}

function clampFace(value) {
  return clampNumber(Number(value), 1, 6, FALLBACK_DICE_SPRITE.idleFace);
}

function clampNumber(value, min, max, fallback) {
  if (!Number.isFinite(value)) return fallback;
  return Math.max(min, Math.min(max, value));
}

