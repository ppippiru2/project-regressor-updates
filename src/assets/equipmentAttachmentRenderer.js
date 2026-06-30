export const EQUIPMENT_ATTACHMENT_RENDERER_VERSION = "1.0.0";

export const DEFAULT_EQUIPMENT_LAYER_ORDER = Object.freeze([
  "back_weapon",
  "back_cloak",
  "body_base",
  "legwear_back",
  "boots",
  "legwear_front",
  "torso_under",
  "armor_torso",
  "shoulder_armor",
  "arm_back",
  "arm_front",
  "handwear",
  "offhand_back",
  "mainhand_weapon",
  "offhand_front",
  "neck_accessory",
  "head_back",
  "head_base",
  "head_front",
  "vfx",
]);

export function createEquipmentAttachmentPlan({
  attachmentContract,
  appearanceCatalog,
  equippedAppearances,
  bodyAnchors,
  poseTemplateId = "idle_default",
  motionFrame = null,
} = {}) {
  const contractIndex = indexAttachmentContract(attachmentContract);
  const appearanceIndex = indexAppearanceCatalog(appearanceCatalog);
  const resolvedAnchors = applyMotionAnchorOffsets(bodyAnchors, motionFrame);
  const layerOrder = attachmentContract?.renderLayers?.length
    ? attachmentContract.renderLayers
    : DEFAULT_EQUIPMENT_LAYER_ORDER;

  const layers = [];
  const warnings = [];

  for (const equipped of equippedAppearances || []) {
    const appearanceId = typeof equipped === "string" ? equipped : equipped?.appearanceId;
    const slotOverride = typeof equipped === "string" ? "" : equipped?.slotId || "";
    const itemId = typeof equipped === "string" ? "" : equipped?.itemId || "";
    const sourceSlot = typeof equipped === "string" ? "" : equipped?.sourceSlot || "";
    const appearance = appearanceIndex.appearances.get(appearanceId);
    if (!appearance) {
      warnings.push(`Missing appearance: ${appearanceId}`);
      continue;
    }

    const profile = contractIndex.profiles.get(appearance.attachmentProfileId);
    if (!profile) {
      warnings.push(`Missing attachment profile: ${appearance.attachmentProfileId}`);
      continue;
    }

    if (!isPoseCompatible(appearance, profile, poseTemplateId)) {
      warnings.push(`Pose ${poseTemplateId} is not declared compatible with ${appearance.appearanceId}`);
    }

    const slotIds = resolveAppearanceSlotIds(appearance, slotOverride);
    const defaultLayers = normalizeStringArray(appearance.defaultLayers || appearance.defaultLayer || profile.defaultLayers || profile.defaultLayer);
    const itemAnchorGroups = resolveItemAnchorGroups(appearance, slotIds);

    for (const slotId of slotIds) {
      const itemAnchors = itemAnchorGroups[slotId] || itemAnchorGroups.default || appearance.itemAnchors || {};
      const transform = resolveAttachmentTransform({
        appearance,
        profile,
        slotId,
        itemAnchors,
        bodyAnchors: resolvedAnchors,
      });

      const layerIds = defaultLayers.length ? defaultLayers : [profile.defaultLayer || "body_base"];
      for (const layerId of layerIds) {
        layers.push({
          appearanceId: appearance.appearanceId,
          itemId,
          sourceSlot,
          slotId,
          category: appearance.category || profile.itemCategory || "",
          attachmentProfileId: profile.profileId,
          layerId,
          layerIndex: layerOrder.indexOf(layerId) === -1 ? layerOrder.length : layerOrder.indexOf(layerId),
          cleanFile: appearance.cleanFile || "",
          sourceFile: appearance.sourceFile || "",
          poseTemplateId,
          transform,
        });
      }
    }
  }

  layers.sort((a, b) => a.layerIndex - b.layerIndex || a.appearanceId.localeCompare(b.appearanceId));

  return {
    version: EQUIPMENT_ATTACHMENT_RENDERER_VERSION,
    poseTemplateId,
    anchorSpace: attachmentContract?.coordinateConvention || null,
    layers,
    warnings,
  };
}

export function resolveAttachmentTransform({ appearance, profile, slotId = "", itemAnchors, bodyAnchors } = {}) {
  const attachNames = normalizeStringArray(slotScopedValue(profile?.attachToBySlot, slotId) || profile?.attachTo);
  const targetAnchors = {};
  for (const anchorName of attachNames) {
    if (bodyAnchors?.[anchorName]) targetAnchors[anchorName] = clonePoint(bodyAnchors[anchorName]);
  }

  const primaryTargetName = attachNames.find((anchorName) => bodyAnchors?.[anchorName]) || "";
  const primaryTarget = primaryTargetName ? bodyAnchors[primaryTargetName] : null;
  const primaryItemName = resolvePrimaryItemAnchorName(profile, itemAnchors);
  const primaryItem = primaryItemName ? itemAnchors?.[primaryItemName] : null;
  const translation = primaryTarget && primaryItem ? subtractPoints(primaryTarget, primaryItem) : [0, 0];

  const rotationVectorNames = normalizeStringArray(slotScopedValue(profile?.rotationVectorBySlot, slotId) || profile?.rotationVector);
  const targetRotationRadians = resolveBodyRotation(rotationVectorNames, bodyAnchors);
  const itemRotationRadians = resolveItemRotation(profile, itemAnchors);
  const rotationRadians = targetRotationRadians - itemRotationRadians;
  const scale = resolveAttachmentScale(profile, itemAnchors, bodyAnchors);

  return {
    attachTo: attachNames,
    primaryTargetAnchor: primaryTargetName,
    primaryItemAnchor: primaryItemName,
    translation: roundPoint(translation),
    rotationRadians: roundNumber(rotationRadians),
    rotationDegrees: roundNumber((rotationRadians * 180) / Math.PI),
    scale: roundNumber(scale),
    targetAnchors,
    itemAnchors: cloneAnchors(itemAnchors),
  };
}

export function applyMotionAnchorOffsets(bodyAnchors, motionFrame = null) {
  const actorRootOffset = motionFrame?.actorRootOffset || [0, 0];
  const anchorOffsets = motionFrame?.anchorOffsets || {};
  const resolved = {};

  for (const [anchorName, point] of Object.entries(bodyAnchors || {})) {
    const offset = anchorOffsets[anchorName] || [0, 0];
    resolved[anchorName] = roundPoint(addPoints(addPoints(point, offset), actorRootOffset));
  }

  return resolved;
}

export function resolveMotionFrame(motionCatalog, motionId, frameId) {
  const motion = (motionCatalog?.motions || []).find((entry) => entry.motionId === motionId);
  if (!motion) return null;
  if (!frameId) return motion.frames?.[0] || null;
  return (motion.frames || []).find((frame) => frame.frameId === frameId) || null;
}

export function resolveMotionFrameAtElapsed(motionCatalog, motionId, elapsedMs = 0, { loop = false } = {}) {
  const motion = (motionCatalog?.motions || []).find((entry) => entry.motionId === motionId);
  const frames = Array.isArray(motion?.frames) ? motion.frames : [];
  if (!frames.length) return null;

  const totalDuration = motionDurationFromFrames(frames);
  if (totalDuration <= 0) return frames[0] || null;

  const rawElapsed = Math.max(0, Number(elapsedMs) || 0);
  const normalizedElapsed = loop
    ? rawElapsed % totalDuration
    : Math.min(rawElapsed, Math.max(totalDuration - 1, 0));
  let cursor = 0;

  for (const frame of frames) {
    cursor += Math.max(0, Number(frame.durationMs) || 0);
    if (normalizedElapsed < cursor) return frame;
  }

  return frames[frames.length - 1] || null;
}

export function resolveMotionDurationMs(motionCatalog, motionId) {
  const motion = (motionCatalog?.motions || []).find((entry) => entry.motionId === motionId);
  return motionDurationFromFrames(Array.isArray(motion?.frames) ? motion.frames : []);
}

export function validateEquipmentAttachmentPlan(plan) {
  const failures = [];
  if (!plan || typeof plan !== "object") failures.push("Plan is missing.");
  if (!Array.isArray(plan?.layers)) failures.push("Plan layers must be an array.");

  for (const layer of plan?.layers || []) {
    if (!layer.appearanceId) failures.push("Layer is missing appearanceId.");
    if (!layer.slotId) failures.push(`Layer is missing slotId: ${layer.appearanceId}`);
    if (!layer.layerId) failures.push(`Layer is missing layerId: ${layer.appearanceId}`);
    if (!layer.transform?.primaryTargetAnchor) failures.push(`Layer is missing primary target anchor: ${layer.appearanceId}`);
    if (!Array.isArray(layer.transform?.translation)) failures.push(`Layer is missing translation: ${layer.appearanceId}`);
  }

  return {
    ok: failures.length === 0,
    failures,
  };
}

export function indexAttachmentContract(contract) {
  return {
    slots: new Map((contract?.slots || []).map((slot) => [slot.slotId, slot])),
    profiles: new Map((contract?.attachmentProfiles || []).map((profile) => [profile.profileId, profile])),
    poseTemplates: new Map((contract?.poseTemplates || []).map((pose) => [pose.poseTemplateId, pose])),
  };
}

export function indexAppearanceCatalog(catalog) {
  return {
    appearances: new Map((catalog?.appearances || []).map((appearance) => [appearance.appearanceId, appearance])),
  };
}

function resolveAppearanceSlotIds(appearance, slotOverride) {
  if (slotOverride) return [slotOverride];
  if (Array.isArray(appearance.slotIds)) return appearance.slotIds;
  if (appearance.slotId) return [appearance.slotId];
  return [];
}

function resolveItemAnchorGroups(appearance, slotIds) {
  const itemAnchors = appearance.itemAnchors || {};
  if (!appearance.slotIds?.length) return { default: itemAnchors };

  const groups = {};
  for (const slotId of slotIds) {
    const side = slotId.endsWith("_left") ? "left" : slotId.endsWith("_right") ? "right" : "";
    if (side && itemAnchors[side]) groups[slotId] = itemAnchors[side];
  }
  return groups;
}

function resolvePrimaryItemAnchorName(profile, itemAnchors) {
  const candidates = [
    "grip",
    "bow_grip",
    "lower_grip",
    "staff_grip",
    "wrist_lock",
    "crown",
    "neck_opening",
    "chest_center",
    "shield_center",
  ];
  const required = normalizeStringArray(profile?.requiredItemAnchors);
  const merged = [...candidates, ...required];
  return merged.find((anchorName) => isPoint(itemAnchors?.[anchorName])) || "";
}

function resolveBodyRotation(rotationVectorNames, bodyAnchors) {
  if (rotationVectorNames.length < 2) return 0;
  const [fromName, toName] = rotationVectorNames;
  const from = bodyAnchors?.[fromName];
  const to = bodyAnchors?.[toName];
  if (!isPoint(from) || !isPoint(to)) return 0;
  return Math.atan2(to[1] - from[1], to[0] - from[0]);
}

function resolveItemRotation(profile, itemAnchors) {
  const itemRotationVector = normalizeStringArray(profile?.itemRotationVector);
  if (itemRotationVector.length >= 2) {
    const [fromName, toName] = itemRotationVector;
    const from = itemAnchors?.[fromName];
    const to = itemAnchors?.[toName];
    if (isPoint(from) && isPoint(to)) return Math.atan2(to[1] - from[1], to[0] - from[0]);
  }

  const required = normalizeStringArray(profile?.requiredItemAnchors);
  const fromName = required.find((anchorName) => /grip|lock|crown|opening/.test(anchorName));
  const toName = required.find((anchorName) => /tip|center|brow|knuckle/.test(anchorName) && anchorName !== fromName);
  const from = itemAnchors?.[fromName];
  const to = itemAnchors?.[toName];
  if (!isPoint(from) || !isPoint(to)) return 0;
  return Math.atan2(to[1] - from[1], to[0] - from[0]);
}

function resolveAttachmentScale(profile, itemAnchors, bodyAnchors) {
  const scaleBasis = normalizeStringArray(profile?.scaleBasis);
  if (scaleBasis.length < 2) return 1;

  const [fromName, toName] = scaleBasis;
  const bodyFrom = bodyAnchors?.[fromName];
  const bodyTo = bodyAnchors?.[toName];
  if (!isPoint(bodyFrom) || !isPoint(bodyTo)) return 1;

  const itemFromName = resolvePrimaryItemAnchorName(profile, itemAnchors);
  const itemToName = normalizeStringArray(profile?.requiredItemAnchors).find(
    (anchorName) => anchorName !== itemFromName && isPoint(itemAnchors?.[anchorName]),
  );
  if (!itemFromName || !itemToName) return 1;

  const itemFrom = itemAnchors[itemFromName];
  const itemTo = itemAnchors[itemToName];
  const itemDistance = distance(itemFrom, itemTo);
  if (!itemDistance) return 1;
  return distance(bodyFrom, bodyTo) / itemDistance;
}

function slotScopedValue(map, slotId) {
  return map && slotId ? map[slotId] : null;
}

function motionDurationFromFrames(frames) {
  return frames.reduce((total, frame) => total + Math.max(0, Number(frame.durationMs) || 0), 0);
}

function isPoseCompatible(appearance, profile, poseTemplateId) {
  const appearancePoses = normalizeStringArray(appearance.compatiblePoseTemplates);
  const profilePoses = normalizeStringArray(profile.compatiblePoseTemplates);
  if (!appearancePoses.length && !profilePoses.length) return true;
  return appearancePoses.includes(poseTemplateId) || profilePoses.includes(poseTemplateId);
}

function normalizeStringArray(value) {
  if (Array.isArray(value)) return value.filter((entry) => typeof entry === "string" && entry);
  return typeof value === "string" && value ? [value] : [];
}

function cloneAnchors(anchors) {
  const cloned = {};
  for (const [key, value] of Object.entries(anchors || {})) {
    cloned[key] = Array.isArray(value) ? [...value] : value;
  }
  return cloned;
}

function clonePoint(point) {
  return [Number(point[0]), Number(point[1])];
}

function addPoints(a, b) {
  return [Number(a?.[0] || 0) + Number(b?.[0] || 0), Number(a?.[1] || 0) + Number(b?.[1] || 0)];
}

function subtractPoints(a, b) {
  return [Number(a?.[0] || 0) - Number(b?.[0] || 0), Number(a?.[1] || 0) - Number(b?.[1] || 0)];
}

function distance(a, b) {
  return Math.hypot(Number(a?.[0] || 0) - Number(b?.[0] || 0), Number(a?.[1] || 0) - Number(b?.[1] || 0));
}

function roundPoint(point) {
  return [roundNumber(point[0]), roundNumber(point[1])];
}

function roundNumber(value) {
  return Math.round(Number(value || 0) * 1000) / 1000;
}

function isPoint(value) {
  return Array.isArray(value) && value.length === 2 && value.every((entry) => Number.isFinite(Number(entry)));
}
