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
      profileId: "weapon.two_hand.heavy.v1",
      slotId: "mainhand",
      itemCategory: "two_hand_weapon",
      requiredItemAnchors: ["lower_grip", "upper_grip", "tip", "back_end", "mass_center", "bounds"],
      attachTo: ["TwoHand_LowerGrip", "TwoHand_UpperGrip"],
      rotationVector: ["TwoHand_LowerGrip", "TwoHand_UpperGrip"],
      itemRotationVector: ["lower_grip", "upper_grip"],
      defaultLayer: "mainhand_weapon",
    },
    {
      profileId: "weapon.bow.v1",
      slotId: "mainhand",
      itemCategory: "bow",
      requiredItemAnchors: ["bow_grip", "upper_limb", "lower_limb", "string_top", "string_bottom", "arrow_nock", "arrow_tip", "bounds"],
      attachTo: ["Bow_Grip", "Draw_Hand", "Arrow_Nock", "Arrow_Tip", "Bow_String_Top", "Bow_String_Bottom"],
      rotationVector: ["Arrow_Nock", "Arrow_Tip"],
      itemRotationVector: ["arrow_nock", "arrow_tip"],
      defaultLayer: "mainhand_weapon",
    },
    {
      profileId: "weapon.staff.v1",
      slotId: "mainhand",
      itemCategory: "staff",
      requiredItemAnchors: ["staff_grip", "staff_top", "staff_base", "bounds"],
      attachTo: ["Staff_Grip", "Staff_Top", "Staff_Base", "Cast_Hand"],
      rotationVector: ["Staff_Base", "Staff_Top"],
      itemRotationVector: ["staff_base", "staff_top"],
      defaultLayer: "mainhand_weapon",
    },
    {
      profileId: "weapon.wand.v1",
      slotId: "mainhand",
      itemCategory: "wand",
      requiredItemAnchors: ["grip", "tip", "focus", "bounds"],
      attachTo: ["Cast_Hand", "Wand_Tip"],
      rotationVector: ["Cast_Hand", "Wand_Tip"],
      itemRotationVector: ["grip", "tip"],
      defaultLayer: "mainhand_weapon",
    },
    {
      profileId: "offhand.book.v1",
      slotId: "offhand",
      itemCategory: "grimoire",
      requiredItemAnchors: ["grip", "book_center", "spine_top", "spine_bottom", "bounds"],
      attachTo: ["Book_Grip", "Book_Center", "Book_Top", "Book_Bottom"],
      rotationVector: ["Book_Grip", "Book_Center"],
      itemRotationVector: ["grip", "book_center"],
      defaultLayer: "offhand_front",
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
      profileId: "armor.legs.v1",
      slotId: "leg_left",
      itemCategory: "armor_legs",
      requiredItemAnchors: ["knee_lock", "hip_lock", "ankle_lock", "side_outer", "bounds"],
      attachToBySlot: {
        leg_left: ["Knee_ScreenLeft", "Hip_Center", "Foot_ScreenLeft_Baseline"],
        leg_right: ["Knee_ScreenRight", "Hip_Center", "Foot_ScreenRight_Baseline"],
      },
      rotationVectorBySlot: {
        leg_left: ["Knee_ScreenLeft", "Foot_ScreenLeft_Baseline"],
        leg_right: ["Knee_ScreenRight", "Foot_ScreenRight_Baseline"],
      },
      itemRotationVector: ["knee_lock", "ankle_lock"],
      defaultLayer: "legwear_front",
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
        "armor.legs.v1",
        "handwear.gauntlet.v1",
        "boots.pair.v1",
        "back.cloak.v1",
      ],
    },
    {
      poseTemplateId: "great_weapon_guard",
      compatibleProfiles: [
        "weapon.two_hand.heavy.v1",
        "armor.helmet.v1",
        "armor.torso.v1",
        "armor.legs.v1",
        "handwear.gauntlet.v1",
        "boots.pair.v1",
        "back.cloak.v1",
      ],
    },
    {
      poseTemplateId: "bow_draw",
      compatibleProfiles: [
        "weapon.bow.v1",
        "armor.helmet.v1",
        "armor.torso.v1",
        "armor.legs.v1",
        "handwear.gauntlet.v1",
        "boots.pair.v1",
        "back.cloak.v1",
      ],
    },
    {
      poseTemplateId: "staff_stand",
      compatibleProfiles: [
        "weapon.staff.v1",
        "armor.helmet.v1",
        "armor.torso.v1",
        "armor.legs.v1",
        "handwear.gauntlet.v1",
        "boots.pair.v1",
        "back.cloak.v1",
      ],
    },
    {
      poseTemplateId: "fist_guard_idle",
      compatibleProfiles: [
        "armor.helmet.v1",
        "armor.torso.v1",
        "armor.legs.v1",
        "handwear.gauntlet.v1",
        "boots.pair.v1",
        "back.cloak.v1",
      ],
    },
    {
      poseTemplateId: "wand_book_cast",
      compatibleProfiles: [
        "weapon.wand.v1",
        "offhand.book.v1",
        "armor.helmet.v1",
        "armor.torso.v1",
        "armor.legs.v1",
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
      compatiblePoseTemplates: ["idle_default", "great_weapon_guard", "bow_draw", "staff_stand", "fist_guard_idle", "wand_book_cast"],
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
      appearanceId: "appearance.weapon.training_greatsword.v1",
      category: "two_hand_weapon",
      slotId: "mainhand",
      attachmentProfileId: "weapon.two_hand.heavy.v1",
      assetId: "equipment_attachment_training_greatsword_proxy_v1",
      cleanFile: "assets/weapons/transparent/training_greatsword_rgba.png",
      itemAnchors: {
        lower_grip: [64, 300],
        upper_grip: [64, 240],
        tip: [64, 8],
        back_end: [64, 408],
        mass_center: [64, 130],
        bounds: [0, 0, 128, 420],
      },
      defaultLayer: "mainhand_weapon",
      compatiblePoseTemplates: ["great_weapon_guard"],
    },
    {
      appearanceId: "appearance.weapon.training_bow.v1",
      category: "bow",
      slotId: "mainhand",
      attachmentProfileId: "weapon.bow.v1",
      assetId: "equipment_attachment_training_bow_proxy_v1",
      cleanFile: "assets/weapons/transparent/training_bow_rgba.png",
      itemAnchors: {
        bow_grip: [96, 160],
        upper_limb: [116, 8],
        lower_limb: [116, 312],
        string_top: [40, 12],
        string_bottom: [40, 308],
        arrow_nock: [52, 160],
        arrow_tip: [232, 160],
        bounds: [0, 0, 256, 320],
      },
      defaultLayer: "mainhand_weapon",
      compatiblePoseTemplates: ["bow_draw"],
    },
    {
      appearanceId: "appearance.weapon.training_staff.v1",
      category: "staff",
      slotId: "mainhand",
      attachmentProfileId: "weapon.staff.v1",
      assetId: "equipment_attachment_training_staff_proxy_v1",
      cleanFile: "assets/weapons/transparent/training_staff_rgba.png",
      itemAnchors: {
        staff_grip: [32, 220],
        staff_top: [32, 8],
        staff_base: [32, 420],
        bounds: [0, 0, 64, 432],
      },
      defaultLayer: "mainhand_weapon",
      compatiblePoseTemplates: ["staff_stand"],
    },
    {
      appearanceId: "appearance.weapon.apprentice_wand.v1",
      category: "wand",
      slotId: "mainhand",
      attachmentProfileId: "weapon.wand.v1",
      assetId: "equipment_attachment_apprentice_wand_proxy_v1",
      cleanFile: "assets/weapons/transparent/apprentice_wand_rgba.png",
      itemAnchors: {
        grip: [24, 122],
        tip: [24, 10],
        focus: [24, 28],
        bounds: [0, 0, 48, 166],
      },
      defaultLayer: "mainhand_weapon",
      compatiblePoseTemplates: ["wand_book_cast"],
    },
    {
      appearanceId: "appearance.offhand.apprentice_grimoire.v1",
      category: "grimoire",
      slotId: "offhand",
      attachmentProfileId: "offhand.book.v1",
      assetId: "equipment_attachment_apprentice_grimoire_proxy_v1",
      cleanFile: "assets/offhands/transparent/apprentice_grimoire_rgba.png",
      itemAnchors: {
        grip: [24, 86],
        book_center: [72, 74],
        spine_top: [24, 16],
        spine_bottom: [24, 132],
        bounds: [0, 0, 132, 148],
      },
      defaultLayer: "offhand_front",
      compatiblePoseTemplates: ["wand_book_cast"],
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
      compatiblePoseTemplates: ["idle_default", "great_weapon_guard", "bow_draw", "staff_stand", "fist_guard_idle", "wand_book_cast"],
    },
    {
      appearanceId: "appearance.legwear.leather_greaves.v1",
      category: "armor_legs_pair",
      slotIds: ["leg_left", "leg_right"],
      attachmentProfileId: "armor.legs.v1",
      assetId: "equipment_attachment_leather_leg_armor_proxy_v1",
      cleanFile: "assets/appearances/transparent/leather_leg_armor_rgba.png",
      itemAnchors: {
        left: {
          knee_lock: [48, 126],
          hip_lock: [48, 20],
          ankle_lock: [48, 248],
          side_outer: [24, 136],
          bounds: [0, 0, 96, 270],
        },
        right: {
          knee_lock: [48, 126],
          hip_lock: [48, 20],
          ankle_lock: [48, 248],
          side_outer: [72, 136],
          bounds: [0, 0, 96, 270],
        },
      },
      defaultLayer: "legwear_front",
      compatiblePoseTemplates: ["idle_default", "great_weapon_guard", "bow_draw", "staff_stand", "fist_guard_idle", "wand_book_cast"],
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
      compatiblePoseTemplates: ["idle_default", "great_weapon_guard", "bow_draw", "staff_stand", "fist_guard_idle", "wand_book_cast"],
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
      compatiblePoseTemplates: ["idle_default", "great_weapon_guard", "bow_draw", "staff_stand", "fist_guard_idle", "wand_book_cast"],
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
      compatiblePoseTemplates: ["idle_default", "great_weapon_guard", "bow_draw", "staff_stand", "fist_guard_idle", "wand_book_cast"],
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
      motionId: "basic_attack_two_hand_heavy_v1",
      defaultPoseTemplateId: "great_weapon_guard",
      frames: [
        {
          frameId: "attack_ready",
          durationMs: 180,
          anchorOffsets: {
            TwoHand_LowerGrip: [-24, 20],
            TwoHand_UpperGrip: [-18, -20],
            Weapon_Tip: [-30, -28],
            Weapon_Back_End: [-20, 22],
            Mass_Center: [-20, 0],
          },
          eventTags: ["windup", "weight_shift"],
        },
        {
          frameId: "attack_hit",
          durationMs: 150,
          anchorOffsets: {
            TwoHand_LowerGrip: [18, -8],
            TwoHand_UpperGrip: [52, -10],
            Weapon_Tip: [84, 12],
            Weapon_Back_End: [8, -6],
            Mass_Center: [28, -7],
          },
          eventTags: ["damage_window"],
        },
        {
          frameId: "attack_recover",
          durationMs: 260,
          anchorOffsets: {
            TwoHand_LowerGrip: [0, 0],
            TwoHand_UpperGrip: [0, 0],
            Weapon_Tip: [0, 0],
            Weapon_Back_End: [0, 0],
            Mass_Center: [0, 0],
          },
          eventTags: ["recover"],
        },
      ],
    },
    {
      motionId: "bow_release_v1",
      defaultPoseTemplateId: "bow_draw",
      frames: [
        {
          frameId: "attack_ready",
          durationMs: 170,
          anchorOffsets: {
            Bow_Grip: [-6, 0],
            Draw_Hand: [-36, 0],
            Arrow_Nock: [-32, 0],
            Arrow_Tip: [-4, 0],
            Bow_String_Top: [-12, 0],
            Bow_String_Bottom: [-12, 0],
          },
          eventTags: ["windup", "string_draw"],
        },
        {
          frameId: "attack_hit",
          durationMs: 90,
          anchorOffsets: {
            Bow_Grip: [4, 0],
            Draw_Hand: [18, 0],
            Arrow_Nock: [44, 0],
            Arrow_Tip: [82, 0],
            Bow_String_Top: [0, 0],
            Bow_String_Bottom: [0, 0],
          },
          eventTags: ["damage_window", "projectile_spawn.arrow"],
        },
        {
          frameId: "attack_recover",
          durationMs: 190,
          anchorOffsets: {
            Bow_Grip: [0, 0],
            Draw_Hand: [0, 0],
            Arrow_Nock: [0, 0],
            Arrow_Tip: [0, 0],
            Bow_String_Top: [0, 0],
            Bow_String_Bottom: [0, 0],
          },
          eventTags: ["recover"],
        },
      ],
    },
    {
      motionId: "staff_cast_v1",
      defaultPoseTemplateId: "staff_stand",
      frames: [
        {
          frameId: "attack_ready",
          durationMs: 170,
          anchorOffsets: {
            Cast_Hand: [-18, -18],
            Staff_Top: [0, -8],
            Staff_Grip: [0, 0],
            Staff_Base: [0, 0],
          },
          eventTags: ["windup", "mana_gather"],
        },
        {
          frameId: "attack_hit",
          durationMs: 130,
          anchorOffsets: {
            Cast_Hand: [20, -34],
            Staff_Top: [10, -34],
            Staff_Grip: [4, -6],
            Staff_Base: [0, 0],
          },
          eventTags: ["damage_window", "vfx_spawn.staff_bolt"],
        },
        {
          frameId: "attack_recover",
          durationMs: 210,
          anchorOffsets: {
            Cast_Hand: [0, 0],
            Staff_Top: [0, 0],
            Staff_Grip: [0, 0],
            Staff_Base: [0, 0],
          },
          eventTags: ["recover"],
        },
      ],
    },
    {
      motionId: "fist_combo_v1",
      defaultPoseTemplateId: "fist_guard_idle",
      frames: [
        {
          frameId: "attack_ready",
          durationMs: 110,
          anchorOffsets: {
            Fist_ScreenLeft: [-38, -12],
            Fist_ScreenRight: [-10, -8],
            Guard_Center: [-12, -10],
            Wrist_ScreenLeft: [-18, -8],
            Wrist_ScreenRight: [-6, -4],
          },
          eventTags: ["windup"],
        },
        {
          frameId: "attack_hit",
          durationMs: 90,
          anchorOffsets: {
            Fist_ScreenLeft: [72, 0],
            Fist_ScreenRight: [22, -4],
            Guard_Center: [30, -2],
            Wrist_ScreenLeft: [48, 0],
            Wrist_ScreenRight: [12, -4],
          },
          eventTags: ["damage_window", "vfx_spawn.fist_impact", "sfx.fist_hit"],
        },
        {
          frameId: "attack_recover",
          durationMs: 150,
          anchorOffsets: {
            Fist_ScreenLeft: [0, 0],
            Fist_ScreenRight: [0, 0],
            Guard_Center: [0, 0],
            Wrist_ScreenLeft: [0, 0],
            Wrist_ScreenRight: [0, 0],
          },
          eventTags: ["recover"],
        },
      ],
    },
    {
      motionId: "wand_book_cast_v1",
      defaultPoseTemplateId: "wand_book_cast",
      frames: [
        {
          frameId: "attack_ready",
          durationMs: 150,
          anchorOffsets: {
            Cast_Hand: [-16, -20],
            Wand_Tip: [-10, -28],
            Book_Grip: [-4, -4],
            Book_Center: [-4, -8],
            Book_Top: [-4, -10],
            Book_Bottom: [-4, -4],
          },
          eventTags: ["windup", "mana_gather"],
        },
        {
          frameId: "attack_hit",
          durationMs: 140,
          anchorOffsets: {
            Cast_Hand: [36, -30],
            Wand_Tip: [62, -60],
            Book_Grip: [0, -10],
            Book_Center: [0, -16],
            Book_Top: [0, -18],
            Book_Bottom: [0, -8],
          },
          eventTags: ["damage_window", "vfx_spawn.mana_bolt", "sfx.magic_cast"],
        },
        {
          frameId: "attack_recover",
          durationMs: 210,
          anchorOffsets: {
            Cast_Hand: [0, 0],
            Wand_Tip: [0, 0],
            Book_Grip: [0, 0],
            Book_Center: [0, 0],
            Book_Top: [0, 0],
            Book_Bottom: [0, 0],
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
  training_greatsword: "appearance.weapon.training_greatsword.v1",
  hunter_bow: "appearance.weapon.training_bow.v1",
  apprentice_staff: "appearance.weapon.training_staff.v1",
  apprentice_wand: "appearance.weapon.apprentice_wand.v1",
  round_wood_shield: "appearance.shield.round_wood.v1",
  apprentice_grimoire: "appearance.offhand.apprentice_grimoire.v1",
  novice_helmet: "appearance.helmet.novice_iron.v1",
  sentinel_helmet: "appearance.helmet.novice_iron.v1",
  warden_crown: "appearance.helmet.novice_iron.v1",
  wolf_leather_armor: "appearance.armor.leather_chest.v1",
  tower_shield_armor: "appearance.armor.leather_chest.v1",
  ore_plate: "appearance.armor.leather_chest.v1",
  wolf_leather_greaves: "appearance.legwear.leather_greaves.v1",
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

  const poseTemplateId = resolveRuntimePoseTemplateId(equippedAppearances);
  const poseAnchors = resolveRuntimePoseTemplateAnchors(poseTemplateId, bodyAnchors);
  const motionSelection = resolveRuntimeMotionFrame(combatRuntime, now, poseTemplateId);
  const plan = createEquipmentAttachmentPlan({
    attachmentContract: ATTACHMENT_CONTRACT,
    appearanceCatalog: resolveAppearanceCatalog(assetRegistry),
    equippedAppearances,
    bodyAnchors: poseAnchors,
    poseTemplateId,
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
    const appearanceId = ITEM_APPEARANCE_BY_ID[itemId] || "";
    const appearance = findRuntimeAppearance(appearanceId);
    return Boolean(
      itemId
        && appearanceId
        && (VISUAL_SLOT_BY_EQUIPMENT_SLOT[sourceSlot] || appearance?.slotIds?.length),
    );
  });
}

function sampleEquipmentAttachmentState() {
  return {
    Weapon: { itemId: "rusty_sword" },
    Offhand: { itemId: "round_wood_shield" },
    Helmet: { itemId: "novice_helmet" },
    Armor: { itemId: "wolf_leather_armor" },
    LegArmor: { itemId: "wolf_leather_greaves" },
    Gloves: { itemId: "worn_gloves" },
    Boots: { itemId: "swift_boots" },
    Back: { itemId: "traveler_cloak" },
  };
}

function findRuntimeAppearance(appearanceId) {
  return APPEARANCE_CATALOG.appearances.find((appearance) => appearance.appearanceId === appearanceId) || null;
}

function resolveRuntimePoseTemplateId(equippedAppearances) {
  let hasMainhandWeapon = false;
  let hasGauntlet = false;
  let hasWand = false;
  let hasBook = false;
  for (const equipped of equippedAppearances || []) {
    const appearance = findRuntimeAppearance(equipped.appearanceId);
    if (appearance?.attachmentProfileId === "weapon.two_hand.heavy.v1") return "great_weapon_guard";
    if (appearance?.attachmentProfileId === "weapon.bow.v1") return "bow_draw";
    if (appearance?.attachmentProfileId === "weapon.staff.v1") return "staff_stand";
    if (appearance?.attachmentProfileId === "weapon.wand.v1") {
      hasWand = true;
    }
    if (appearance?.attachmentProfileId === "offhand.book.v1") {
      hasBook = true;
    }
    if (appearance?.attachmentProfileId?.startsWith("weapon.") || appearance?.slotId === "mainhand") {
      hasMainhandWeapon = true;
    }
    if (appearance?.attachmentProfileId === "handwear.gauntlet.v1") {
      hasGauntlet = true;
    }
  }
  if (hasWand || (!hasMainhandWeapon && hasBook)) return "wand_book_cast";
  if (!hasMainhandWeapon && hasGauntlet) return "fist_guard_idle";
  return "idle_default";
}

function resolveRuntimePoseTemplateAnchors(poseTemplateId, baseAnchors) {
  const anchors = cloneAnchors(baseAnchors);

  if (poseTemplateId === "great_weapon_guard") {
    anchors.TwoHand_LowerGrip = roundPoint(
      lerpPoint(baseAnchors.Hand_ScreenLeft_Grip, baseAnchors.Hand_ScreenRight_Grip, 0.42, [0, -8]),
    );
    anchors.TwoHand_UpperGrip = roundPoint(
      lerpPoint(baseAnchors.Chest_Center, baseAnchors.Shoulder_ScreenRight, 0.46, [18, -22]),
    );
    anchors.Weapon_Tip = [anchors.TwoHand_UpperGrip[0] + 84, baseAnchors.Head_Top[1] + 18];
    anchors.Weapon_Back_End = [anchors.TwoHand_LowerGrip[0] - 66, baseAnchors.Hip_Center[1] + 178];
    anchors.Mass_Center = roundPoint(lerpPoint(anchors.TwoHand_UpperGrip, anchors.TwoHand_LowerGrip, 0.5));
  }

  if (poseTemplateId === "bow_draw") {
    anchors.Bow_Grip = [baseAnchors.Shoulder_ScreenRight[0] + 95, baseAnchors.Chest_Center[1] + 6];
    anchors.Draw_Hand = [baseAnchors.Shoulder_ScreenLeft[0] - 35, baseAnchors.Chest_Center[1] + 2];
    anchors.Arrow_Nock = [anchors.Draw_Hand[0] + 18, anchors.Draw_Hand[1]];
    anchors.Arrow_Tip = [anchors.Bow_Grip[0] + 124, anchors.Bow_Grip[1] - 1];
    anchors.Bow_String_Top = [anchors.Bow_Grip[0] - 38, baseAnchors.Head_Top[1] + 54];
    anchors.Bow_String_Bottom = [anchors.Bow_Grip[0] - 36, baseAnchors.Hip_Center[1] - 6];
  }

  if (poseTemplateId === "staff_stand") {
    anchors.Staff_Grip = [baseAnchors.Hand_ScreenLeft_Grip[0] - 20, baseAnchors.Chest_Center[1] + 168];
    anchors.Staff_Top = [anchors.Staff_Grip[0] + 18, Math.max(38, baseAnchors.Head_Top[1] - 82)];
    anchors.Staff_Base = [anchors.Staff_Grip[0] - 14, baseAnchors.Foot_ScreenLeft_Baseline[1] + 18];
    anchors.Cast_Hand = [baseAnchors.Hand_ScreenRight_Grip[0] - 10, baseAnchors.Chest_Center[1] - 12];
  }

  if (poseTemplateId === "fist_guard_idle") {
    const centerX = Math.round((baseAnchors.Shoulder_ScreenLeft[0] + baseAnchors.Shoulder_ScreenRight[0]) / 2);
    anchors.Fist_ScreenLeft = [baseAnchors.Wrist_ScreenLeft[0] + 24, baseAnchors.Chest_Center[1] + 92];
    anchors.Fist_ScreenRight = [baseAnchors.Wrist_ScreenRight[0] - 24, baseAnchors.Chest_Center[1] + 86];
    anchors.Guard_Center = [centerX, baseAnchors.Chest_Center[1] + 88];
  }

  if (poseTemplateId === "wand_book_cast") {
    anchors.Cast_Hand = [baseAnchors.Hand_ScreenLeft_Grip[0] - 18, baseAnchors.Chest_Center[1] + 18];
    anchors.Wand_Tip = [anchors.Cast_Hand[0] + 58, anchors.Cast_Hand[1] - 96];
    anchors.Book_Grip = [baseAnchors.Hand_ScreenRight_Grip[0] - 18, baseAnchors.Chest_Center[1] + 52];
    anchors.Book_Center = [anchors.Book_Grip[0] + 46, anchors.Book_Grip[1] - 18];
    anchors.Book_Top = [anchors.Book_Center[0], anchors.Book_Center[1] - 58];
    anchors.Book_Bottom = [anchors.Book_Center[0], anchors.Book_Center[1] + 58];
  }

  return anchors;
}

function resolveRuntimeMotionFrame(combatRuntime, now, poseTemplateId = "idle_default") {
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
    const runtimeMotionId = resolveAttackRuntimeMotionId(poseTemplateId);
    const frame = resolveActiveMotionFrame(combatRuntime, now, runtimeMotionId);
    return {
      motionId: runtimeMotionId,
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

function resolveAttackRuntimeMotionId(poseTemplateId) {
  if (poseTemplateId === "great_weapon_guard") return "basic_attack_two_hand_heavy_v1";
  if (poseTemplateId === "bow_draw") return "bow_release_v1";
  if (poseTemplateId === "staff_stand") return "staff_cast_v1";
  if (poseTemplateId === "fist_guard_idle") return "fist_combo_v1";
  if (poseTemplateId === "wand_book_cast") return "wand_book_cast_v1";
  return "basic_attack_one_hand_v1";
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

function cloneAnchors(anchors) {
  return Object.fromEntries(Object.entries(anchors || {}).map(([key, point]) => [key, Array.isArray(point) ? [...point] : point]));
}

function lerpPoint(a, b, t, offset = [0, 0]) {
  return [
    Number(a[0]) + (Number(b[0]) - Number(a[0])) * t + Number(offset[0] || 0),
    Number(a[1]) + (Number(b[1]) - Number(a[1])) * t + Number(offset[1] || 0),
  ];
}

function roundPoint(point) {
  return [Math.round(Number(point[0])), Math.round(Number(point[1]))];
}
