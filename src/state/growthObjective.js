import { MAX_NOTICE_DETAIL_LENGTH, OBJECTIVE_ROTATE_MS } from "./growthObjectiveConfig.js?v=400";
import { t, tf } from "../localization/index.js?v=400";

export function createGrowthObjective(regions, player, expToNext, options = {}) {
  const objectives = createGrowthObjectives(regions, player, expToNext, options);
  if (!objectives.length) return null;

  const now = Number.isFinite(options.now) ? options.now : Date.now();
  const rotation = normalizeObjectiveRotation(options.rotation, objectives.length, now);
  const index =
    rotation.mode === "manual" ? rotation.index : Math.floor(now / OBJECTIVE_ROTATE_MS) % objectives.length;
  return {
    ...objectives[index],
    rotationIndex: index,
    rotationTotal: objectives.length,
    rotationIntervalMs: OBJECTIVE_ROTATE_MS,
    rotationMode: rotation.mode,
  };
}

export function createGrowthObjectives(regions, player, expToNext, options = {}) {
  const objectives = [];

  if (player.freePoints > 0) {
    objectives.push({
      id: "stat-points",
      state: "growth",
      title: t("growthObjectiveMessages.statPointsTitle"),
      detail: tf("growthObjectiveMessages.statPointsDetail", { points: player.freePoints }),
      progress: null,
      showMeter: false,
      action: { label: t("growthObjectiveMessages.statusAction"), view: "status" },
    });
  }

  const tutorialStartObjective = createTutorialStartObjective(regions, player, options);
  if (tutorialStartObjective) objectives.push(tutorialStartObjective);

  const progressionObjective = createProgressionObjective(regions, player, expToNext);
  if (progressionObjective) objectives.push(progressionObjective);

  const recentNotice = createRecentNoticeObjective(options.log);
  if (recentNotice && !objectives.some((objective) => objective.id === recentNotice.id)) {
    objectives.push(recentNotice);
  }

  return objectives;
}

function createTutorialStartObjective(regions, player, options = {}) {
  const firstRegion = regions[0];
  if (!firstRegion) return null;
  if (options.regionId && options.regionId !== firstRegion.id) return null;
  if (Array.isArray(options.completedRegions) && options.completedRegions.length > 0) return null;
  if (Number(player.level || 1) > 1) return null;
  if (Number(player.exp || 0) > 0) return null;

  return {
    id: "tutorial-start",
    state: "notice",
    title: t("growthObjectiveMessages.tutorialStartTitle"),
    detail: t("growthObjectiveMessages.tutorialStartDetail"),
    progress: null,
    showMeter: false,
    action: { label: t("growthObjectiveMessages.combatAction"), view: "combat" },
  };
}

function createProgressionObjective(regions, player, expToNext) {
  const nextRegion = [...regions]
    .sort((left, right) => left.recommendedLevel - right.recommendedLevel)
    .find((region) => region.recommendedLevel > player.level);

  if (!nextRegion) {
    return {
      id: "final-gate",
      state: "final",
      title: t("growthObjectiveMessages.finalGateTitle"),
      detail: t("growthObjectiveMessages.finalGateDetail"),
      progress: 100,
      action: { label: t("growthObjectiveMessages.regionAction"), view: "regions", regionId: finalGateRegionId(regions) },
    };
  }

  const targetLevel = nextRegion.recommendedLevel;
  const totalNeeded = expNeededToReachLevel(player.level, 0, targetLevel, expToNext);
  const remaining = expNeededToReachLevel(player.level, player.exp, targetLevel, expToNext);
  const progress = totalNeeded <= 0 ? 100 : Math.min(100, Math.max(0, ((totalNeeded - remaining) / totalNeeded) * 100));

  return {
    id: "next-region",
    state: "locked",
    title: tf("growthObjectiveMessages.nextRegionTitle", { regionName: nextRegion.name }),
    detail: tf("growthObjectiveMessages.nextRegionDetail", {
      targetLevel,
      remaining: remaining.toLocaleString(),
    }),
    progress,
    action: { label: t("growthObjectiveMessages.regionAction"), view: "regions", regionId: nextRegion.id },
  };
}

function createRecentNoticeObjective(log = []) {
  const entry = [...log].reverse().find((line) => classifyNotice(line));
  const notice = classifyNotice(entry);
  if (!notice) return null;

  return {
    id: `notice-${notice.id}`,
    state: notice.state,
    title: notice.title,
    detail: trimNoticeDetail(entry),
    progress: null,
    showMeter: false,
    action: notice.view ? { label: notice.label, view: notice.view } : null,
  };
}

function classifyNotice(line) {
  if (!line) return null;
  if (line.includes(t("growthObjectiveMessages.tokens.newRegion")) || line.includes(t("growthObjectiveMessages.tokens.unlocked"))) {
    return {
      id: "region",
      state: "notice",
      title: t("growthObjectiveMessages.notices.region.title"),
      label: t("growthObjectiveMessages.regionAction"),
      view: "regions",
    };
  }
  if (line.includes(t("growthObjectiveMessages.tokens.equipment")) || line.includes(t("growthObjectiveMessages.tokens.recommendedEquip"))) {
    return {
      id: "equipment",
      state: "notice",
      title: t("growthObjectiveMessages.notices.equipment.title"),
      label: t("growthObjectiveMessages.inventoryAction"),
      view: "inventory",
    };
  }
  if (line.includes(t("growthObjectiveMessages.tokens.level")) || line.includes(t("growthObjectiveMessages.tokens.stat"))) {
    return {
      id: "level",
      state: "growth",
      title: t("growthObjectiveMessages.notices.level.title"),
      label: t("growthObjectiveMessages.statusAction"),
      view: "status",
    };
  }
  if (line.includes(t("growthObjectiveMessages.tokens.offlineReward"))) {
    return { id: "offline", state: "notice", title: t("growthObjectiveMessages.notices.offline.title") };
  }
  if (line.includes(t("growthObjectiveMessages.tokens.combatStop")) || line.includes(t("growthObjectiveMessages.tokens.combatStart"))) {
    return {
      id: "combat",
      state: "notice",
      title: t("growthObjectiveMessages.notices.combat.title"),
      label: t("growthObjectiveMessages.combatAction"),
      view: "combat",
    };
  }
  return null;
}

function trimNoticeDetail(line) {
  const text = String(line || "").replace(/^\[[^\]]+\]\s*/, "").trim();
  if (text.length <= MAX_NOTICE_DETAIL_LENGTH) return text;
  return `${text.slice(0, MAX_NOTICE_DETAIL_LENGTH - 1)}…`;
}

function expNeededToReachLevel(currentLevel, currentExp, targetLevel, expToNext) {
  let remaining = Math.max(0, expToNext(currentLevel) - currentExp);
  for (let level = currentLevel + 1; level < targetLevel; level += 1) {
    remaining += expToNext(level);
  }
  return Math.max(0, remaining);
}

function finalGateRegionId(regions) {
  if (regions.some((region) => region.id === "rift_gate")) return "rift_gate";
  const [lastRegion] = [...regions].sort((left, right) => right.recommendedLevel - left.recommendedLevel);
  return lastRegion?.id || null;
}

function normalizeObjectiveRotation(rotation = {}, total = 1, now = Date.now()) {
  if (total <= 1) return { mode: "auto", index: 0 };

  const mode = rotation.mode === "manual" ? "manual" : "auto";
  if (mode === "auto") {
    return {
      mode,
      index: Math.floor(now / OBJECTIVE_ROTATE_MS) % total,
    };
  }

  const rawIndex = Number(rotation.index);
  const index = Number.isFinite(rawIndex) ? Math.floor(rawIndex) : 0;
  return {
    mode,
    index: ((index % total) + total) % total,
  };
}
