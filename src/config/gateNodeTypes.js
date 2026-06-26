import { getLocaleText } from "../localization/index.js?v=346";

const NODE_TEXT = getLocaleText().gateNodeTypes;

export const GATE_NODE_TYPES = {
  start: {
    label: NODE_TEXT.start.label,
    icon: NODE_TEXT.start.icon,
    editorGroup: "route",
    description: NODE_TEXT.start.description,
  },
  battle: {
    label: NODE_TEXT.battle.label,
    icon: NODE_TEXT.battle.icon,
    editorGroup: "combat",
    description: NODE_TEXT.battle.description,
  },
  elite: {
    label: NODE_TEXT.elite.label,
    icon: NODE_TEXT.elite.icon,
    editorGroup: "combat",
    description: NODE_TEXT.elite.description,
  },
  boss: {
    label: NODE_TEXT.boss.label,
    icon: NODE_TEXT.boss.icon,
    editorGroup: "combat",
    description: NODE_TEXT.boss.description,
  },
  hidden_boss: {
    label: NODE_TEXT.hidden_boss.label,
    icon: NODE_TEXT.hidden_boss.icon,
    editorGroup: "hidden",
    description: NODE_TEXT.hidden_boss.description,
  },
  treasure: {
    label: NODE_TEXT.treasure.label,
    icon: NODE_TEXT.treasure.icon,
    editorGroup: "reward",
    description: NODE_TEXT.treasure.description,
  },
  hidden_treasure: {
    label: NODE_TEXT.hidden_treasure.label,
    icon: NODE_TEXT.hidden_treasure.icon,
    editorGroup: "hidden",
    description: NODE_TEXT.hidden_treasure.description,
  },
  merchant: {
    label: NODE_TEXT.merchant.label,
    icon: NODE_TEXT.merchant.icon,
    editorGroup: "support",
    description: NODE_TEXT.merchant.description,
  },
  rest: {
    label: NODE_TEXT.rest.label,
    icon: NODE_TEXT.rest.icon,
    editorGroup: "support",
    description: NODE_TEXT.rest.description,
  },
  event: {
    label: NODE_TEXT.event.label,
    icon: NODE_TEXT.event.icon,
    editorGroup: "scene",
    description: NODE_TEXT.event.description,
  },
  mystery: {
    label: NODE_TEXT.mystery.label,
    icon: NODE_TEXT.mystery.icon,
    editorGroup: "scene",
    description: NODE_TEXT.mystery.description,
  },
  hidden_piece: {
    label: NODE_TEXT.hidden_piece.label,
    icon: NODE_TEXT.hidden_piece.icon,
    editorGroup: "hidden",
    description: NODE_TEXT.hidden_piece.description,
  },
  hidden: {
    label: NODE_TEXT.hidden.label,
    icon: NODE_TEXT.hidden.icon,
    editorGroup: "hidden",
    description: NODE_TEXT.hidden.description,
  },
};

export const GATE_NODE_EDITOR_DEFAULTS = {
  coordinateMode: "manual-grid",
  coordinateBounds: { xMin: -2, xMax: 2, yMin: 0, yMax: 5 },
  editableFields: ["id", "type", "x", "y", "connected", "monsterPool", "bossId", "rewardTable", "eventId", "hiddenPieceId", "unlockCondition"],
  nodeTypeBudgets: {
    start: { min: 1, max: 1 },
    boss: { min: 1, max: 1 },
    hidden_boss: { min: 0, max: 1 },
    elite: { min: 0, max: 3 },
    treasure: { min: 0, max: 3 },
    hidden_treasure: { min: 0, max: 2 },
    merchant: { min: 0, max: 2 },
    rest: { min: 0, max: 2 },
    event: { min: 0, max: 4 },
    mystery: { min: 0, max: 4 },
    hidden_piece: { min: 0, max: 3 },
  },
};

export function gateNodeTypeMeta(type) {
  return GATE_NODE_TYPES[type] || GATE_NODE_TYPES.mystery;
}

export function gateNodeTypeLabel(type) {
  return gateNodeTypeMeta(type).label;
}

export function gateNodeTypeIcon(type) {
  return gateNodeTypeMeta(type).icon;
}

export function gateNodeTypeIconKey(type) {
  return String(gateNodeTypeMeta(type).iconKey || type || "mystery");
}

export function gateNodeTypeClass(type) {
  return `type-${String(type || "mystery").replace(/[^a-z0-9_-]/gi, "-")}`;
}

export function gateNodeTypeSummary(nodes = []) {
  const counts = new Map();
  for (const node of nodes) {
    const type = node?.type || "mystery";
    counts.set(type, (counts.get(type) || 0) + 1);
  }

  return [...counts.entries()]
    .map(([type, count]) => `${gateNodeTypeLabel(type)} ${count}`)
    .join(" · ");
}
