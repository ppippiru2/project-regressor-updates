import { gateNodeTypeLabel } from "../config/gateNodeTypes.js?v=517";
import { t, tf } from "../localization/index.js?v=517";

const COMBAT_NODE_TYPES = new Set(["battle", "elite", "hidden_boss"]);
const TREASURE_NODE_TYPES = new Set(["treasure", "hidden_treasure"]);
const SCENE_NODE_TYPES = new Set(["event", "mystery", "hidden", "hidden_piece"]);

export function resolveGateNodeOutcome(node) {
  if (!node) return { type: "none" };

  if (COMBAT_NODE_TYPES.has(node.type)) {
    return {
      type: "combat",
      monsterId: node.monsterPool?.[0] || node.bossId || null,
      nodeType: node.type,
    };
  }

  if (node.type === "boss") {
    if (!node.bossId) return { type: "inspect", nodeType: node.type };

    return {
      type: "combat",
      monsterId: node.bossId || null,
      nodeType: node.type,
    };
  }

  if (TREASURE_NODE_TYPES.has(node.type)) {
    return {
      type: "treasure",
      itemId: node.rewardTable?.[0] || null,
      nodeType: node.type,
    };
  }

  if (node.type === "merchant") {
    return {
      type: "merchant",
      shopId: node.shopId || null,
      nodeType: node.type,
    };
  }

  if (node.type === "rest") {
    return {
      type: "rest",
      nodeType: node.type,
    };
  }

  if (SCENE_NODE_TYPES.has(node.type)) {
    return {
      type: "scene",
      sceneType: node.type,
      eventId: node.eventId || null,
      hiddenPieceId: node.hiddenPieceId || null,
      nodeType: node.type,
    };
  }

  return {
    type: "inspect",
    nodeType: node.type,
  };
}

export function createGateNodeResolution(outcome, options = {}) {
  if (outcome.type === "combat") {
    return {
      type: "combat",
      monsterId: outcome.monsterId || null,
      itemId: null,
      message: "",
    };
  }

  if (outcome.type === "treasure") {
    const itemId = outcome.itemId || null;
    return {
      type: "treasure",
      monsterId: null,
      itemId,
      message: itemId ? tf("gateNodeActions.treasure", { itemName: options.getItemName?.(itemId) || itemId }) : "",
    };
  }

  if (outcome.type === "rest") {
    return {
      type: "rest",
      monsterId: null,
      itemId: null,
      message: t("gateNodeActions.rest"),
    };
  }

  if (outcome.type === "merchant") {
    return {
      type: "merchant",
      monsterId: null,
      itemId: null,
      message: t("gateNodeActions.merchant"),
    };
  }

  if (outcome.type === "scene") {
    const label = gateNodeTypeLabel(outcome.nodeType);
    return {
      type: "scene",
      monsterId: null,
      itemId: null,
      message: tf("gateNodeActions.scene", { label }),
    };
  }

  return {
    type: "inspect",
    monsterId: null,
    itemId: null,
    message: tf("gateNodeActions.inspect", { nodeLabel: options.nodeLabel || t("gateNodeActions.unknownNode") }),
  };
}



