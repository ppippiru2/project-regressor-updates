import {
  createEquipmentAttachmentPlan,
  resolveMotionDurationMs,
  resolveMotionFrame,
  resolveMotionFrameAtElapsed,
} from "./equipmentAttachmentRenderer.js?v=675";
import { resolveAssetPath } from "./assetRegistry.js?v=675";

export const PLAYER_EQUIPMENT_ATTACHMENT_RUNTIME_VERSION = "1.0.0";

const SOURCE_CANVAS_SIZE = Object.freeze([1254, 1254]);

const ATTACHMENT_CONTRACT = Object.freeze({
  coordinateConvention: {
    canvas: SOURCE_CANVAS_SIZE,
    origin: "top_left",
    x: "increases_right",
    y: "increases_down",
    unit: "source_pixel",
    sideRule: "ScreenLeft and ScreenRight are screen-space labels, not anatomical labels.",
  },
  renderLayers: [
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
  ],
  attachmentProfiles: [
    {
      profileId: "weapon.one_hand.mainhand.v1",
      slotId: "mainhand",
      itemCategory: "one_hand_weapon",
      requiredItemAnchors: ["grip", "tip", "guard_center", "bounds"],
      attachTo: "Hand_ScreenLeft_Grip",
      rotationVector: ["Elbow_ScreenLeft", "Hand_ScreenLeft_Grip"],
      scaleBasis: ["Elbow_ScreenLeft", "Hand_ScreenLeft_Grip"],
      defaultLayer: "mainhand_weapon",
    },
    {
      profileId: "shield.offhand.round.v1",
      slotId: "offhand",
      itemCategory: "shield",
      requiredItemAnchors: ["grip", "shield_center", "rim_top", "rim_bottom", "bounds"],
      attachTo: "Hand_ScreenRight_Grip",
      rotationVector: ["Elbow_ScreenRight", "Hand_ScreenRight_Grip"],
      defaultLayers: ["offhand_back", "offhand_front"],
    },
    {
      profileId: "armor.helmet.v1",
      slotId: "head",
      itemCategory: "helmet",
      requiredItemAnchors: ["crown", "brow", "neck_back", "bounds"],
      attachTo: ["Head_Top", "Face_Center", "Neck_Base"],
      defaultLayers: ["head_back", "head_front"],
    },
    {
      profileId: "armor.torso.v1",
      slotId: "torso",
      itemCategory: "armor_torso",
      requiredItemAnchors: ["neck_opening", "chest_center", "waist_center", "shoulder_left", "shoulder_right", "bounds"],
      attachTo: ["Neck_Base", "Chest_Center", "Hip_Center", "Shoulder_ScreenLeft", "Shoulder_ScreenRight"],
      defaultLayer: "armor_torso",
    },
    {
      profileId: "handwear.gauntlet.v1",
      slotId: "hand_left",
      itemCategory: "gauntlet",
      requiredItemAnchors: ["wrist_lock", "knuckle_center", "forearm_cover_bounds", "bounds"],
      attachToBySlot: {
        hand_left: ["Wrist_ScreenLeft", "Hand_ScreenLeft_Grip", "Forearm_ScreenLeft_Outer"],
        hand_right: ["Wrist_ScreenRight", "Hand_ScreenRight_Grip", "Forearm_ScreenRight_Outer"],
      },
      rotationVectorBySlot: {
        hand_left: ["Wrist_ScreenLeft", "Hand_ScreenLeft_Grip"],
        hand_right: ["Wrist_ScreenRight", "Hand_ScreenRight_Grip"],
      },
      defaultLayer: "handwear",
    },
    {
      profileId: "boots.pair.v1",
      slotId: "foot_left",
      itemCategory: "boots",
      requiredItemAnchors: ["ankle_lock", "toe_tip", "heel", "bounds"],
      attachToBySlot: {
        foot_left: ["Foot_ScreenLeft_Baseline", "Knee_ScreenLeft"],
        foot_right: ["Foot_ScreenRight_Baseline", "Knee_ScreenRight"],
      },
      rotationVectorBySlot: {
        foot_left: ["Knee_ScreenLeft", "Foot_ScreenLeft_Baseline"],
        foot_right: ["Knee_ScreenRight", "Foot_ScreenRight_Baseline"],
      },
      defaultLayer: "boots",
    },
    {
      profileId: "back.cloak.v1",
      slotId: "back",
      itemCategory: "cloak",
      requiredItemAnchors: ["neck_lock", "chest_fall", "hem_center", "bounds"],
      attachTo: ["Neck_Base", "Chest_Center", "Hip_Center"],
      rotationVector: ["Neck_Base", "Hip_Center"],
      defaultLayer: "back_cloak",
    },
  ],
  poseTemplates: [
    {
      poseTemplateId: "idle_default",
      compatibleProfiles: [
        "weapon.one_hand.mainhand.v1",
        "shield.offhand.round.v1",
        "armor.helmet.v1",
        "armor.torso.v1",
        "handwear.gauntlet.v1",
        "boots.pair.v1",
        "back.cloak.v1",
      ],
    },
  ],
});

const APPEARANCE_CATALOG = Object.freeze({
  appearances: [
    {
      appearanceId: "appearance.weapon.rusty_sword.v1",
      category: "one_hand_weapon",
      slotId: "mainhand",
      attachmentProfileId: "weapon.one_hand.mainhand.v1",
      assetId: "equipment_attachment_rusty_sword_proxy_v1",
      cleanFile: "assets/weapons/transparent/rusty_sword_rgba.png",
      itemAnchors: {
        grip: [42, 146],
        guard_center: [42, 112],
        tip: [42, 8],
        back_end: [42, 178],
        bounds: [0, 0, 84, 186],
      },
      defaultLayer: "mainhand_weapon",
      compatiblePoseTemplates: ["idle_default"],
    },
    {
      appearanceId: "appearance.helmet.novice_iron.v1",
      category: "helmet",
      slotId: "head",
      attachmentProfileId: "armor.helmet.v1",
      assetId: "equipment_attachment_novice_iron_helmet_proxy_v1",
      cleanFile: "assets/appearances/transparent/novice_iron_helmet_rgba.png",
      itemAnchors: {
        crown: [64, 8],
        brow: [64, 62],
        neck_back: [64, 126],
        bounds: [0, 0, 128, 140],
      },
      defaultLayers: ["head_back", "head_front"],
      compatiblePoseTemplates: ["idle_default"],
    },
    {
      appearanceId: "appearance.shield.round_wood.v1",
      category: "shield",
      slotId: "offhand",
      attachmentProfileId: "shield.offhand.round.v1",
      assetId: "equipment_attachment_round_wood_shield_proxy_v1",
      cleanFile: "assets/shields/transparent/round_wood_shield_rgba.png",
      itemAnchors: {
        grip: [58, 88],
        shield_center: [84, 88],
        rim_top: [84, 8],
        rim_bottom: [84, 168],
        bounds: [0, 0, 168, 176],
      },
      defaultLayers: ["offhand_back", "offhand_front"],
      compatiblePoseTemplates: ["idle_default"],
    },
    {
      appearanceId: "appearance.armor.leather_chest.v1",
      category: "armor_torso",
      slotId: "torso",
      attachmentProfileId: "armor.torso.v1",
      assetId: "equipment_attachment_leather_chest_armor_proxy_v1",
      cleanFile: "assets/appearances/transparent/leather_chest_armor_rgba.png",
      itemAnchors: {
        neck_opening: [128, 18],
        chest_center: [128, 104],
        waist_center: [128, 238],
        shoulder_left: [32, 52],
        shoulder_right: [224, 52],
        bounds: [0, 0, 256, 270],
      },
      defaultLayer: "armor_torso",
      compatiblePoseTemplates: ["idle_default"],
    },
    {
      appearanceId: "appearance.handwear.iron_gauntlets.v1",
      category: "gauntlet_pair",
      slotIds: ["hand_left", "hand_right"],
      attachmentProfileId: "handwear.gauntlet.v1",
      assetId: "equipment_attachment_iron_gauntlets_proxy_v1",
      cleanFile: "assets/appearances/transparent/iron_gauntlets_rgba.png",
      itemAnchors: {
        left: {
          wrist_lock: [48, 24],
          knuckle_center: [48, 82],
          forearm_cover_bounds: [8, 0, 88, 96],
          bounds: [0, 0, 96, 110],
        },
        right: {
          wrist_lock: [48, 24],
          knuckle_center: [48, 82],
          forearm_cover_bounds: [8, 0, 88, 96],
          bounds: [0, 0, 96, 110],
        },
      },
      defaultLayer: "handwear",
      compatiblePoseTemplates: ["idle_default"],
    },
    {
      appearanceId: "appearance.boots.swift.v1",
      category: "boots_pair",
      slotIds: ["foot_left", "foot_right"],
      attachmentProfileId: "boots.pair.v1",
      assetId: "equipment_attachment_swift_boots_proxy_v1",
      cleanFile: "assets/appearances/transparent/swift_boots_rgba.png",
      itemAnchors: {
        left: {
          ankle_lock: [48, 48],
          toe_tip: [62, 104],
          heel: [24, 92],
          bounds: [0, 0, 96, 120],
        },
        right: {
          ankle_lock: [48, 48],
          toe_tip: [62, 104],
          heel: [24, 92],
          bounds: [0, 0, 96, 120],
        },
      },
      defaultLayer: "boots",
      compatiblePoseTemplates: ["idle_default"],
    },
    {
      appearanceId: "appearance.cloak.traveler.v1",
      category: "cloak",
      slotId: "back",
      attachmentProfileId: "back.cloak.v1",
      assetId: "equipment_attachment_traveler_cloak_proxy_v1",
      cleanFile: "assets/appearances/transparent/traveler_cloak_rgba.png",
      itemAnchors: {
        neck_lock: [110, 20],
        chest_fall: [110, 132],
        hem_center: [110, 334],
        bounds: [0, 0, 220, 360],
      },
      defaultLayer: "back_cloak",
      compatiblePoseTemplates: ["idle_default"],
    },
  ],
});

const MOTION_CATALOG = Object.freeze({
  motions: [
    {
      motionId: "idle_loop_v1",
      defaultPoseTemplateId: "idle_default",
      frames: [
        {
          frameId: "idle_low",
          durationMs: 360,
          anchorOffsets: {
            Chest_Center: [0, 0],
            Neck_Base: [0, 0],
            Shoulder_ScreenLeft: [0, 0],
            Shoulder_ScreenRight: [0, 0],
            Wrist_ScreenLeft: [0, 0],
            Wrist_ScreenRight: [0, 0],
            Hand_ScreenLeft_Grip: [0, 0],
            Hand_ScreenRight_Grip: [0, 0],
          },
          eventTags: [],
        },
        {
          frameId: "idle_breathe_up",
          durationMs: 420,
          anchorOffsets: {
            Chest_Center: [0, -3],
            Neck_Base: [0, -2],
            Shoulder_ScreenLeft: [0, -2],
            Shoulder_ScreenRight: [0, -2],
            Wrist_ScreenLeft: [0, -1],
            Wrist_ScreenRight: [0, -1],
            Forearm_ScreenLeft_Outer: [0, -1],
            Forearm_ScreenRight_Outer: [0, -1],
            Hand_ScreenLeft_Grip: [0, -1],
            Hand_ScreenRight_Grip: [0, -1],
          },
          eventTags: [],
        },
        {
          frameId: "idle_return",
          durationMs: 360,
          anchorOffsets: {
            Chest_Center: [0, 0],
            Neck_Base: [0, 0],
            Shoulder_ScreenLeft: [0, 0],
            Shoulder_ScreenRight: [0, 0],
            Wrist_ScreenLeft: [0, 0],
            Wrist_ScreenRight: [0, 0],
            Hand_ScreenLeft_Grip: [0, 0],
            Hand_ScreenRight_Grip: [0, 0],
          },
          eventTags: [],
        },
      ],
    },
    {
      motionId: "basic_attack_one_hand_v1",
      defaultPoseTemplateId: "idle_default",
      frames: [
        {
          frameId: "attack_ready",
          durationMs: 140,
          anchorOffsets: {
            Shoulder_ScreenLeft: [-4, -3],
            Elbow_ScreenLeft: [-14, -12],
            Wrist_ScreenLeft: [-18, -16],
            Forearm_ScreenLeft_Outer: [-12, -10],
            Hand_ScreenLeft_Grip: [-22, -18],
            Chest_Center: [-2, 0],
            Hip_Center: [0, 0],
          },
          eventTags: ["windup"],
        },
        {
          frameId: "attack_hit",
          durationMs: 120,
          anchorOffsets: {
            Shoulder_ScreenLeft: [8, 2],
            Elbow_ScreenLeft: [34, 4],
            Wrist_ScreenLeft: [48, 3],
            Forearm_ScreenLeft_Outer: [30, 4],
            Hand_ScreenLeft_Grip: [58, 2],
            Chest_Center: [8, 0],
            Hip_Center: [3, 0],
          },
          eventTags: ["damage_window"],
        },
        {
          frameId: "attack_recover",
          durationMs: 220,
          anchorOffsets: {
            Shoulder_ScreenLeft: [0, 0],
            Elbow_ScreenLeft: [0, 0],
            Wrist_ScreenLeft: [0, 0],
            Forearm_ScreenLeft_Outer: [0, 0],
            Hand_ScreenLeft_Grip: [0, 0],
            Chest_Center: [0, 0],
            Hip_Center: [0, 0],
          },
          eventTags: ["recover"],
        },
      ],
    },
    {
      motionId: "hit_reaction_v1",
      defaultPoseTemplateId: "idle_default",
      frames: [
        {
          frameId: "hit_back",
          durationMs: 120,
          actorRootOffset: [-10, 0],
          anchorOffsets: {
            Head_Top: [-4, 0],
            Neck_Base: [-5, 1],
            Chest_Center: [-8, 2],
            Hip_Center: [-5, 1],
            Wrist_ScreenLeft: [-8, 2],
            Wrist_ScreenRight: [-8, 2],
            Forearm_ScreenLeft_Outer: [-8, 2],
            Forearm_ScreenRight_Outer: [-8, 2],
            Hand_ScreenLeft_Grip: [-8, 2],
            Hand_ScreenRight_Grip: [-8, 2],
            Foot_ScreenLeft_Baseline: [10, 0],
            Foot_ScreenRight_Baseline: [10, 0],
          },
          eventTags: ["hit_flash"],
        },
        {
          frameId: "hit_return",
          durationMs: 180,
          actorRootOffset: [0, 0],
          anchorOffsets: {
            Head_Top: [0, 0],
            Neck_Base: [0, 0],
            Chest_Center: [0, 0],
            Hip_Center: [0, 0],
            Wrist_ScreenLeft: [0, 0],
            Wrist_ScreenRight: [0, 0],
            Forearm_ScreenLeft_Outer: [0, 0],
            Forearm_ScreenRight_Outer: [0, 0],
            Hand_ScreenLeft_Grip: [0, 0],
            Hand_ScreenRight_Grip: [0, 0],
          },
          eventTags: [],
        },
      ],
    },
  ],
});

export const PLAYER_BODY_ANCHORS_BY_GENDER = Object.freeze({
  male: Object.freeze({
    Head_Top: [629, 142],
    Face_Center: [646, 222],
    Neck_Base: [621, 290],
    Shoulder_ScreenLeft: [522, 314],
    Shoulder_ScreenRight: [715, 307],
    Chest_Center: [620, 382],
    Hip_Center: [613, 596],
    Elbow_ScreenLeft: [470, 476],
    Elbow_ScreenRight: [777, 463],
    Wrist_ScreenLeft: [452, 590],
    Wrist_ScreenRight: [781, 584],
    Forearm_ScreenLeft_Outer: [431, 540],
    Forearm_ScreenRight_Outer: [807, 532],
    Hand_ScreenLeft_Grip: [445, 620],
    Hand_ScreenRight_Grip: [789, 613],
    Knee_ScreenLeft: [506, 798],
    Knee_ScreenRight: [708, 797],
    Foot_ScreenLeft_Baseline: [399, 1072],
    Foot_ScreenRight_Baseline: [786, 1104],
  }),
  female: Object.freeze({
    Head_Top: [620, 144],
    Face_Center: [633, 225],
    Neck_Base: [606, 293],
    Shoulder_ScreenLeft: [530, 315],
    Shoulder_ScreenRight: [695, 310],
    Chest_Center: [603, 378],
    Hip_Center: [611, 596],
    Elbow_ScreenLeft: [473, 476],
    Elbow_ScreenRight: [762, 472],
    Wrist_ScreenLeft: [454, 593],
    Wrist_ScreenRight: [767, 591],
    Forearm_ScreenLeft_Outer: [433, 542],
    Forearm_ScreenRight_Outer: [790, 540],
    Hand_ScreenLeft_Grip: [447, 623],
    Hand_ScreenRight_Grip: [775, 620],
    Knee_ScreenLeft: [510, 797],
    Knee_ScreenRight: [705, 793],
    Foot_ScreenLeft_Baseline: [401, 1090],
    Foot_ScreenRight_Baseline: [769, 1118],
  }),
});

const ITEM_APPEARANCE_BY_ID = Object.freeze({
  rusty_sword: "appearance.weapon.rusty_sword.v1",
  rift_blade: "appearance.weapon.rusty_sword.v1",
  round_wood_shield: "appearance.shield.round_wood.v1",
  novice_helmet: "appearance.helmet.novice_iron.v1",
  sentinel_helmet: "appearance.helmet.novice_iron.v1",
  warden_crown: "appearance.helmet.novice_iron.v1",
  wolf_leather_armor: "appearance.armor.leather_chest.v1",
  tower_shield_armor: "appearance.armor.leather_chest.v1",
  ore_plate: "appearance.armor.leather_chest.v1",
  worn_gloves: "appearance.handwear.iron_gauntlets.v1",
  rift_gauntlets: "appearance.handwear.iron_gauntlets.v1",
  swift_boots: "appearance.boots.swift.v1",
  traveler_cloak: "appearance.cloak.traveler.v1",
  regressor_cloak: "appearance.cloak.traveler.v1",
});

const VISUAL_SLOT_BY_EQUIPMENT_SLOT = Object.freeze({
  Weapon: "mainhand",
  OffHand: "offhand",
  Offhand: "offhand",
  Helmet: "head",
  Armor: "torso",
  Back: "back",
});

export function createPlayerEquipmentAttachmentPlan({
  equipmentState,
  getItem,
  playerProfile = {},
  combatRuntime = null,
  now = Date.now(),
  previewMode = "off",
  assetRegistry = null,
} = {}) {
  const gender = resolvePlayerAttachmentGender(playerProfile);
  const bodyAnchors = PLAYER_BODY_ANCHORS_BY_GENDER[gender] || PLAYER_BODY_ANCHORS_BY_GENDER.male;
  const resolvedEquipmentState =
    previewMode === "sample" && !hasMappedAttachmentEquipment(equipmentState)
      ? sampleEquipmentAttachmentState()
      : equipmentState;
  const equippedAppearances = [];
  const warnings = [];

  for (const [sourceSlot, entry] of Object.entries(resolvedEquipmentState || {})) {
    const itemId = entry?.itemId || "";
    if (!itemId) continue;
    const item = typeof getItem === "function" ? getItem(itemId) : null;
    const appearanceId = item?.appearanceId || ITEM_APPEARANCE_BY_ID[itemId] || "";
    const slotId = VISUAL_SLOT_BY_EQUIPMENT_SLOT[sourceSlot] || "";
    const appearance = findRuntimeAppearance(appearanceId);
    if (!appearanceId || (!slotId && !appearance?.slotIds?.length)) {
      warnings.push(`No attachment appearance mapping for ${itemId || sourceSlot}.`);
      continue;
    }
    equippedAppearances.push({ appearanceId, itemId, sourceSlot, slotId });
  }

  const motionSelection = resolveRuntimeMotionFrame(combatRuntime, now);
  const plan = createEquipmentAttachmentPlan({
    attachmentContract: ATTACHMENT_CONTRACT,
    appearanceCatalog: resolveAppearanceCatalog(assetRegistry),
    equippedAppearances,
    bodyAnchors,
    poseTemplateId: "idle_default",
    motionFrame: motionSelection.frame,
  });

  return {
    ...plan,
    runtimeVersion: PLAYER_EQUIPMENT_ATTACHMENT_RUNTIME_VERSION,
    gender,
    canvas: SOURCE_CANVAS_SIZE,
    motionId: motionSelection.motionId,
    frameId: motionSelection.frame?.frameId || "",
    motionElapsedMs: motionSelection.elapsedMs,
    previewMode,
    warnings: [...warnings, ...(plan.warnings || [])],
  };
}

function resolveAppearanceCatalog(assetRegistry) {
  if (!assetRegistry?.manifest?.assets?.length) return APPEARANCE_CATALOG;
  return {
    ...APPEARANCE_CATALOG,
    appearances: APPEARANCE_CATALOG.appearances.map((appearance) => {
      const assetPath = resolveAssetPath(appearance.assetId, assetRegistry);
      if (!assetPath) return appearance;
      return {
        ...appearance,
        cleanFile: assetPath,
        sourceFile: assetPath,
      };
    }),
  };
}

function hasMappedAttachmentEquipment(equipmentState) {
  return Object.entries(equipmentState || {}).some(([sourceSlot, entry]) => {
    const itemId = entry?.itemId || "";
    return Boolean(itemId && VISUAL_SLOT_BY_EQUIPMENT_SLOT[sourceSlot] && ITEM_APPEARANCE_BY_ID[itemId]);
  });
}

function sampleEquipmentAttachmentState() {
  return {
    Weapon: { itemId: "rusty_sword" },
    Offhand: { itemId: "round_wood_shield" },
    Helmet: { itemId: "novice_helmet" },
    Armor: { itemId: "wolf_leather_armor" },
    Gloves: { itemId: "worn_gloves" },
    Boots: { itemId: "swift_boots" },
    Back: { itemId: "traveler_cloak" },
  };
}

function findRuntimeAppearance(appearanceId) {
  return APPEARANCE_CATALOG.appearances.find((appearance) => appearance.appearanceId === appearanceId) || null;
}

function resolveRuntimeMotionFrame(combatRuntime, now) {
  const activeMotionId = combatRuntime?.playerSpriteMotionId;
  const activeUntil = Number(combatRuntime?.playerSpriteMotionUntil || 0);
  if (!activeMotionId || now >= activeUntil) {
    const idleFrame = resolveMotionFrameAtElapsed(MOTION_CATALOG, "idle_loop_v1", now, { loop: true });
    return {
      motionId: "idle_loop_v1",
      frame: idleFrame || resolveMotionFrame(MOTION_CATALOG, "idle_loop_v1", "idle_low"),
      elapsedMs: now,
    };
  }

  if (activeMotionId === "basic_attack_v1") {
    const frame = resolveActiveMotionFrame(combatRuntime, now, "basic_attack_one_hand_v1");
    return {
      motionId: "basic_attack_one_hand_v1",
      frame: frame.frame,
      elapsedMs: frame.elapsedMs,
    };
  }

  if (activeMotionId === "hit_reaction_v1") {
    const frame = resolveActiveMotionFrame(combatRuntime, now, "hit_reaction_v1");
    return {
      motionId: "hit_reaction_v1",
      frame: frame.frame,
      elapsedMs: frame.elapsedMs,
    };
  }

  const idleFrame = resolveMotionFrameAtElapsed(MOTION_CATALOG, "idle_loop_v1", now, { loop: true });
  return {
    motionId: "idle_loop_v1",
    frame: idleFrame || resolveMotionFrame(MOTION_CATALOG, "idle_loop_v1", "idle_low"),
    elapsedMs: now,
  };
}

function resolveActiveMotionFrame(combatRuntime, now, catalogMotionId) {
  const durationMs = resolveMotionDurationMs(MOTION_CATALOG, catalogMotionId);
  const activeUntil = Number(combatRuntime?.playerSpriteMotionUntil || 0);
  const activeStartedAt = Number(combatRuntime?.playerSpriteMotionStartedAt || 0);
  const inferredStartedAt = activeStartedAt || (activeUntil && durationMs ? activeUntil - durationMs : now);
  const elapsedMs = Math.max(0, now - inferredStartedAt);
  return {
    frame: resolveMotionFrameAtElapsed(MOTION_CATALOG, catalogMotionId, elapsedMs) || resolveMotionFrame(MOTION_CATALOG, catalogMotionId),
    elapsedMs: Math.round(elapsedMs),
  };
}

function resolvePlayerAttachmentGender(playerProfile) {
  return String(playerProfile?.gender || "").toLowerCase() === "female" ? "female" : "male";
}
