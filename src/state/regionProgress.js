export function ensureGateProgress(gateProgress, map) {
  if (!gateProgress[map.id]) {
    const start = map.nodes.find((node) => node.revealedByDefault) || map.nodes[0];
    gateProgress[map.id] = {
      currentNodeId: start.id,
      collapseTurn: map.collapseTurn,
      revealed: map.nodes.filter((node) => node.revealedByDefault).map((node) => node.id),
      visitedPath: [start.id],
      completed: false,
      completedPath: [],
      replayMode: false,
      replayIndex: 0,
    };
  }
  normalizeGateProgress(gateProgress[map.id], map);
  return gateProgress[map.id];
}

export function moveGateProgress(progress, map, nodeId) {
  const current = map.nodes.find((node) => node.id === progress.currentNodeId);
  if (!gateProgressNextNodeIds(progress, current).includes(nodeId) || progress.collapseTurn <= 0) return null;

  progress.currentNodeId = nodeId;
  progress.collapseTurn -= 1;
  if (!progress.revealed.includes(nodeId)) progress.revealed.push(nodeId);

  const next = map.nodes.find((node) => node.id === nodeId);
  if (progress.replayMode) {
    progress.replayIndex = Math.min((progress.replayIndex || 0) + 1, Math.max(0, progress.completedPath.length - 1));
  } else {
    if (progress.visitedPath[progress.visitedPath.length - 1] !== nodeId) {
      progress.visitedPath.push(nodeId);
    }
    if (isGateTerminalNode(next)) {
      progress.completed = true;
      progress.completedPath = [...progress.visitedPath];
    }
  }

  return next || null;
}

export function gateProgressNextNodeIds(progress, currentNode) {
  if (!currentNode || progress?.collapseTurn <= 0) return [];
  if (progress?.replayMode && Array.isArray(progress.completedPath) && progress.completedPath.length > 1) {
    const nextId = progress.completedPath[(progress.replayIndex || 0) + 1];
    return nextId && currentNode.connected.includes(nextId) ? [nextId] : [];
  }
  return Array.isArray(currentNode.connected) ? currentNode.connected : [];
}

export function beginGateReplay(progress, map) {
  normalizeGateProgress(progress, map);
  if (!progress.completed || !Array.isArray(progress.completedPath) || progress.completedPath.length < 2) {
    return false;
  }
  const startId = progress.completedPath[0];
  progress.currentNodeId = startId;
  progress.collapseTurn = map.collapseTurn;
  progress.replayMode = true;
  progress.replayIndex = 0;
  for (const nodeId of progress.completedPath) {
    if (!progress.revealed.includes(nodeId)) progress.revealed.push(nodeId);
  }
  return true;
}

export function isGateProgressComplete(progress, map) {
  normalizeGateProgress(progress, map);
  return Boolean(progress.completed);
}

function normalizeGateProgress(progress, map) {
  const start = map.nodes.find((node) => node.revealedByDefault) || map.nodes[0];
  if (!Array.isArray(progress.revealed)) progress.revealed = start ? [start.id] : [];
  if (start && !progress.revealed.includes(start.id)) progress.revealed.unshift(start.id);
  if (typeof progress.collapseTurn !== "number") progress.collapseTurn = map.collapseTurn;
  if (!map.nodes.some((node) => node.id === progress.currentNodeId)) {
    progress.currentNodeId = start?.id;
  }

  if (!Array.isArray(progress.visitedPath) || !progress.visitedPath.length) {
    progress.visitedPath = findGatePath(map, start?.id, progress.currentNodeId) || (start ? [start.id] : []);
  }
  if (!Array.isArray(progress.completedPath)) progress.completedPath = [];
  const current = map.nodes.find((node) => node.id === progress.currentNodeId);
  if (progress.completed !== true && isGateTerminalNode(current)) progress.completed = true;
  if (progress.completed && progress.completedPath.length < 2) {
    progress.completedPath = [...progress.visitedPath];
  }
  progress.replayMode = Boolean(progress.replayMode);
  progress.replayIndex = Number.isFinite(progress.replayIndex) ? Math.max(0, Math.floor(progress.replayIndex)) : 0;
}

function isGateTerminalNode(node) {
  return Boolean(node && (!Array.isArray(node.connected) || node.connected.length === 0));
}

function findGatePath(map, startId, targetId) {
  if (!startId || !targetId) return null;
  const queue = [[startId]];
  const visited = new Set([startId]);
  while (queue.length) {
    const path = queue.shift();
    const currentId = path[path.length - 1];
    if (currentId === targetId) return path;
    const current = map.nodes.find((node) => node.id === currentId);
    for (const nextId of current?.connected || []) {
      if (visited.has(nextId)) continue;
      visited.add(nextId);
      queue.push([...path, nextId]);
    }
  }
  return null;
}
