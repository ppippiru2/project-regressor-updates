import {
  GATE_NODE_TYPES,
  gateNodeTypeClass,
  gateNodeTypeIcon,
  gateNodeTypeIconKey,
  gateNodeTypeLabel,
} from "../config/gateNodeTypes.js?v=457";
import { t, tf } from "../localization/index.js?v=457";
import { buildRegionCoreEventProgress } from "../story/coreEventCatalog.js?v=457";

const stableHtmlCache = new WeakMap();

export function renderRegions(regions, context) {
  const container = document.getElementById("region-list");
  if (!container) return;

  renderRegionSummary(regions, context);
  renderRegionCoreEventProgress(regions, context);

  const selectedRegionId = regions.some((region) => region.id === context.selectedRegionId)
    ? context.selectedRegionId
    : context.regionId;

  const nextHtml = regions
    .map((region) => {
      const current = region.id === context.regionId;
      const selected = region.id === selectedRegionId;
      const cleared = context.completedRegions.includes(region.id);
      const imagePath = getRegionImagePath(region, context);
      const hasImage = Boolean(imagePath);
      const moveBlock = !current ? context.getRegionMoveBlock?.(region) || "" : "";
      const belowRecommended = context.playerLevel < region.recommendedLevel;
      const locked = Boolean(moveBlock);
      const known = current || cleared || !locked;
      const imageClass = hasImage ? `has-image ${known ? "is-known" : "is-unknown"}` : "";
      const imageStyle = hasImage
        ? ` style="--region-image: url('${escapeCssUrl(imagePath)}'); --region-image-position: ${getRegionImagePosition(region)}"`
        : "";
      const requirementText = regionRequirementText(region, context, { current, cleared, locked, belowRecommended, moveBlock });
      const canMove = !current && !locked;
      const cardTag = canMove ? "button" : "div";
      const moveAttributes = canMove ? ` type="button" data-region="${region.id}" aria-label="${tf("regionUi.moveAria", { regionName: region.name })}"` : "";
      const currentAttribute = current ? ` aria-current="location"` : "";
      return `<${cardTag} class="region-card ${canMove ? "is-clickable" : ""} ${selected ? "is-selected" : ""} ${current ? "is-current" : ""} ${cleared ? "is-cleared" : ""} ${locked ? "is-locked" : ""} ${belowRecommended && !current ? "is-dangerous" : ""} ${imageClass}" data-region-preview="${region.id}" aria-pressed="${selected}"${currentAttribute}${moveAttributes}${imageStyle}>
        <div>
          <strong>${region.name}</strong>
          <div class="muted">${tf("regionUi.recommendedLine", { level: region.recommendedLevel, description: region.description })}</div>
          <div class="region-requirement">${requirementText}</div>
        </div>
      </${cardTag}>`;
    })
    .join("");
  setStableInnerHtml(container, nextHtml);
}

function renderRegionSummary(regions, context) {
  const summary = document.getElementById("region-summary");
  if (!summary) return;

  const clearedCount = regions.filter((region) => context.completedRegions.includes(region.id)).length;
  const blockedRegions = regions.filter((region) => region.id !== context.regionId && context.getRegionMoveBlock?.(region));
  const highRiskRegions = regions
    .filter((region) => region.id !== context.regionId && context.playerLevel < region.recommendedLevel)
    .sort((left, right) => left.recommendedLevel - right.recommendedLevel);

  if (blockedRegions.length) {
    summary.textContent = tf("regionUi.summaryBlocked", {
      open: regions.length,
      total: regions.length,
      cleared: clearedCount,
    });
    return;
  }
  if (highRiskRegions.length) {
    summary.textContent = tf("regionUi.summaryHighRisk", {
      open: regions.length,
      total: regions.length,
      cleared: clearedCount,
      regionName: highRiskRegions[0].name,
    });
    return;
  }
  summary.textContent = tf("regionUi.summaryReady", {
    open: regions.length,
    total: regions.length,
    cleared: clearedCount,
  });
}

function renderRegionCoreEventProgress(regions, context) {
  const container = document.getElementById("region-core-event-progress");
  if (!container) return;

  const rows = buildRegionCoreEventProgress(regions, context.completedRegions, {
    currentRegionId: context.regionId,
  });
  if (!rows.length) {
    setStableInnerHtml(container, `<p class="muted">${escapeHtml(t("regionUi.coreEventNoRows"))}</p>`);
    return;
  }

  const completedCount = rows.filter((row) => row.isCompleted).length;
  const nextRow = rows.find((row) => row.state !== "completed") || rows[rows.length - 1];
  const nextTitle = nextRow?.title || t("regionUi.coreEventFallbackTitle");
  setStableInnerHtml(container, `
    <div class="region-core-event-progress-head">
      <div>
        <span class="eyebrow">${escapeHtml(t("regionUi.coreEventEyebrow"))}</span>
        <h4>${escapeHtml(t("regionUi.coreEventTitle"))}</h4>
      </div>
      <strong>${escapeHtml(tf("regionUi.coreEventSummary", {
        completed: completedCount,
        total: rows.length,
      }))}</strong>
    </div>
    <p class="region-core-event-current">${escapeHtml(tf("regionUi.coreEventNext", { title: nextTitle }))}</p>
    <div class="region-core-event-list">
      ${rows.map((row) => renderRegionCoreEventProgressRow(row)).join("")}
    </div>
  `);
}

function renderRegionCoreEventProgressRow(row) {
  return `
    <article class="region-core-event-row" data-state="${escapeHtml(row.state)}">
      <div>
        <strong>${escapeHtml(row.title)}</strong>
        <span>${escapeHtml(row.regionName)}</span>
      </div>
      <p>${escapeHtml(row.isCompleted && row.completionLog ? row.completionLog : row.log)}</p>
      <em>${escapeHtml(regionCoreEventStateLabel(row.state))}</em>
    </article>
  `;
}

function regionCoreEventStateLabel(state) {
  if (state === "completed") return t("regionUi.coreEventCompleted");
  if (state === "active") return t("regionUi.coreEventActive");
  return t("regionUi.coreEventPending");
}

export function renderGateMap(region, getGateMap, ensureGateProgress, context = {}) {
  const map = getGateMap(region.nodeMapId);
  const title = document.getElementById("gate-map-title");
  const state = document.getElementById("gate-map-state");
  const mapContainer = document.getElementById("gate-map");
  const actions = document.getElementById("gate-actions");
  if (!title || !state || !mapContainer || !actions) return;
  const imagePath = getNodeMapImagePath(region, context);
  const useNodeTypeColors = context.nodeTypeColors !== false;

  if (!map) {
    setGateMapBackground(mapContainer, imagePath);
    title.textContent = imagePath
      ? tf("regionUi.nodeMapTitle", { regionName: region.name })
      : t("regionUi.nodeMapWaiting");
    state.textContent = imagePath
      ? t("regionUi.nodeMapPreview")
      : t("regionUi.nodeMapRegionOnly");
    setStableInnerHtml(mapContainer, "");
    setStableInnerHtml(actions, "");
    return;
  }

  setGateMapBackground(mapContainer, imagePath);
  mapContainer.dataset.nodeColors = useNodeTypeColors ? "on" : "off";
  state.dataset.nodeColors = useNodeTypeColors ? "on" : "off";

  const progress = ensureGateProgress(map);
  const current = map.nodes.find((node) => node.id === progress.currentNodeId) || map.nodes[0];
  const revealedCount = progress.revealed.length;
  const exploration = Math.round((revealedCount / map.nodes.length) * 100);

  title.textContent = map.name;
  state.innerHTML = renderGateMapState(progress, exploration, current, map.nodes, { useNodeTypeColors });
  const nextNodeIds = currentGateNextNodeIds(progress, current);
  setStableInnerHtml(
    mapContainer,
    `${renderGateEdges(map.nodes, progress, current, { nextNodeIds })}${map.nodes
      .map((node) => renderGateNode(node, progress, current, { useNodeTypeColors, nextNodeIds }))
      .join("")}`
  );
  const actionHtml = nextNodeIds.length
    ? nextNodeIds
        .map((nodeId, index) => {
          const node = map.nodes.find((entry) => entry.id === nodeId);
          return `<button type="button" data-gate-node="${nodeId}">${visibleNodeName(node, progress, tf("regionUi.unknownWithIndex", { index: index + 1 }))}</button>`;
        })
        .join("")
    : `<span class="muted">${t("regionUi.noMoreNodes")}</span>`;
  setStableInnerHtml(actions, actionHtml);
}

export function nodeName(node) {
  return gateNodeTypeLabel(node?.type);
}

function getRegionImagePath(region, context) {
  const resolved = context.getRegionImagePath?.(region);
  return typeof resolved === "string" && resolved.trim()
    ? resolved.trim()
    : typeof region.image === "string"
      ? region.image.trim()
      : "";
}

function getNodeMapImagePath(region, context) {
  const resolved = context.getNodeMapImagePath?.(region);
  return typeof resolved === "string" ? resolved.trim() : "";
}

function setGateMapBackground(container, imagePath) {
  container.classList.toggle("has-image", Boolean(imagePath));
  if (imagePath) {
    container.style.setProperty("--gate-map-image", `url('${escapeCssUrl(imagePath)}')`);
    return;
  }
  container.style.removeProperty("--gate-map-image");
}

function escapeCssUrl(value) {
  return value.replace(/\\/g, "/").replace(/'/g, "%27").replace(/\)/g, "%29");
}

function getRegionImagePosition(region) {
  const allowed = new Set(["center", "top", "bottom", "left", "right"]);
  return allowed.has(region.imagePosition) ? region.imagePosition : "center";
}

function regionRequirementText(region, context, state) {
  if (state.current) return t("regionUi.currentExploration");
  if (state.cleared) return t("regionUi.purified");
  if (state.locked) return state.moveBlock || t("regionUi.routeRequired");
  if (state.belowRecommended) return tf("regionUi.highRiskMove", { level: region.recommendedLevel });
  return t("regionUi.movable");
}

function renderGateNode(node, progress, currentNode, options = {}) {
  const revealed = isNodeInfoRevealed(node, progress);
  const current = progress.currentNodeId === node.id;
  const reachable = !current && progress.collapseTurn > 0 && (options.nextNodeIds || currentNode?.connected || []).includes(node.id);
  const visibleName = visibleNodeName(node, progress);
  const visibleType = revealed ? node.type : "undiscovered";
  const nodeClass = options.useNodeTypeColors === false && revealed ? "type-neutral" : gateNodeTypeClass(visibleType);
  const icon = revealed ? gateNodeTypeIcon(node.type) : "?";
  const iconKey = revealed ? gateNodeTypeIconKey(node.type) : "unknown";
  const disabled = reachable ? "" : ` aria-disabled="true" tabindex="-1"`;
  const moveAttribute = reachable ? ` data-gate-node="${node.id}"` : "";
  return `<button type="button" class="gate-node ${nodeClass} ${revealed ? "revealed" : "fog"} ${reachable ? "reachable" : ""} ${current ? "current" : ""}" data-node-type="${escapeHtml(visibleType || "mystery")}" data-node-actual-type="${escapeHtml(revealed ? node.type || "mystery" : "unknown")}" data-node-icon-key="${escapeHtml(iconKey)}" data-node-label="${escapeHtml(visibleName)}" style="--node-x:${node.x}; --node-y:${node.y}" title="${escapeHtml(visibleName)}" aria-label="${escapeHtml(tf("regionUi.nodeAria", { nodeName: visibleName }))}"${moveAttribute}${disabled}>
    <span class="gate-node-icon">${escapeHtml(icon)}</span>
    <span class="gate-node-label">${escapeHtml(visibleName)}</span>
  </button>`;
}

function renderGateEdges(nodes = [], progress, currentNode, options = {}) {
  const nodeMap = new Map(nodes.map((node) => [node.id, node]));
  const pathEdges = gatePathEdges(progress.replayMode ? progress.completedPath : progress.visitedPath);
  const nextNodeIds = new Set(options.nextNodeIds || []);
  const lines = [];

  for (const node of nodes) {
    for (const targetId of node.connected || []) {
      const target = nodeMap.get(targetId);
      if (!target) continue;
      const from = gateNodePoint(node);
      const to = gateNodePoint(target);
      const edgeId = `${node.id}->${target.id}`;
      const traversed = pathEdges.has(edgeId);
      const reachable = progress.currentNodeId === node.id && nextNodeIds.has(target.id);
      const visible = isNodeInfoRevealed(node, progress) || isNodeInfoRevealed(target, progress) || reachable || traversed;
      lines.push(`<line class="gate-edge ${visible ? "visible" : "fog"} ${traversed ? "traversed" : ""} ${reachable ? "reachable" : ""}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" />`);
    }
  }

  return `<svg class="gate-edge-layer" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">${lines.join("")}</svg>`;
}

function renderGateMapState(progress, exploration, currentNode, nodes, options = {}) {
  return `<span class="gate-state-line">${escapeHtml(tf("regionUi.stateLine", {
    turn: progress.collapseTurn,
    exploration,
    nodeName: nodeName(currentNode),
  }))}</span>
    <span class="gate-node-legend" aria-label="${escapeHtml(t("regionUi.legendAria"))}">${renderGateNodeLegend(nodes, progress, options)}</span>`;
}

function renderGateNodeLegend(nodes = [], progress, options = {}) {
  const counts = new Map();
  for (const node of nodes) {
    const type = isNodeInfoRevealed(node, progress) ? node?.type || "mystery" : "undiscovered";
    counts.set(type, (counts.get(type) || 0) + 1);
  }

  return ["undiscovered", ...Object.keys(GATE_NODE_TYPES)]
    .filter((type) => counts.has(type))
    .map((type) => {
      const label = type === "undiscovered" ? t("regionUi.undiscovered") : gateNodeTypeLabel(type);
      const typeClass = options.useNodeTypeColors === false && type !== "undiscovered" ? "type-neutral" : gateNodeTypeClass(type);
      return `<span class="gate-node-legend-chip ${typeClass}" data-node-type="${escapeHtml(type)}" title="${escapeHtml(label)}">
        <span class="gate-node-legend-dot" aria-hidden="true"></span>
        <span>${escapeHtml(label)} ${counts.get(type)}</span>
      </span>`;
    })
    .join("");
}

function isNodeInfoRevealed(node, progress) {
  return Boolean(node && (progress?.revealed || []).includes(node.id));
}

function visibleNodeName(node, progress, fallback = t("regionUi.undiscovered")) {
  return isNodeInfoRevealed(node, progress) ? nodeName(node) : fallback;
}

function currentGateNextNodeIds(progress, currentNode) {
  if (!currentNode || progress?.collapseTurn <= 0) return [];
  if (progress?.replayMode && Array.isArray(progress.completedPath) && progress.completedPath.length > 1) {
    const nextId = progress.completedPath[(progress.replayIndex || 0) + 1];
    return nextId && currentNode.connected.includes(nextId) ? [nextId] : [];
  }
  return Array.isArray(currentNode.connected) ? currentNode.connected : [];
}

function gatePathEdges(path = []) {
  const edges = new Set();
  for (let index = 0; index < path.length - 1; index += 1) {
    edges.add(`${path[index]}->${path[index + 1]}`);
  }
  return edges;
}

function gateNodePoint(node) {
  return {
    x: clampPercent(50 + Number(node.x || 0) * 22),
    y: clampPercent(12 + Number(node.y || 0) * 18.5),
  };
}

function clampPercent(value) {
  return Math.max(3, Math.min(97, value));
}

function escapeHtml(value) {
  return String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function setStableInnerHtml(element, nextHtml) {
  if (!element) return;
  if (stableHtmlCache.get(element) === nextHtml) return;
  element.innerHTML = nextHtml;
  stableHtmlCache.set(element, nextHtml);
}

