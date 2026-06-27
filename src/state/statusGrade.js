import {
  INITIAL_CREATION_STAT_BALANCE,
  PLAYER_INITIAL_STATS,
  STATUS_GRADE_ORDER,
} from "../balance/playerGrowthBalance.js?v=426";

export const STATUS_GRADE_BASELINE_TOTAL = INITIAL_CREATION_STAT_BALANCE.total;
export const STATUS_GRADE_STAT_KEYS = Object.freeze(Object.keys(PLAYER_INITIAL_STATS));

export function combinedStatusStats(stats = {}, bonusStats = {}) {
  return Object.fromEntries(
    STATUS_GRADE_STAT_KEYS.map((stat) => [
      stat,
      safeNumber(stats?.[stat], PLAYER_INITIAL_STATS[stat] || 0) + safeNumber(bonusStats?.[stat], 0),
    ]),
  );
}

export function statusStatTotal(stats = {}, bonusStats = {}) {
  const totalStats = combinedStatusStats(stats, bonusStats);
  return STATUS_GRADE_STAT_KEYS.reduce((total, stat) => total + totalStats[stat], 0);
}

export function statusGradeFromStatTotal(statTotal, { baselineTotal = STATUS_GRADE_BASELINE_TOTAL } = {}) {
  const total = Math.floor(Number(statTotal));
  if (!Number.isFinite(total)) return "F";

  const delta = total - baselineTotal;
  if (delta < 0) return "F-";
  if (delta === 0) return "F";
  if (delta <= 2) return "F+";

  const earlyIndex = STATUS_GRADE_ORDER.indexOf("E-");
  const gradeIndex = earlyIndex + Math.floor((delta - 3) / 2);
  return STATUS_GRADE_ORDER[Math.min(STATUS_GRADE_ORDER.length - 1, Math.max(earlyIndex, gradeIndex))] || "E-";
}

export function statusGradeFromStats(stats = {}, { bonusStats = {} } = {}) {
  return statusGradeFromStatTotal(statusStatTotal(stats, bonusStats));
}

export function statusStatSummary(stats = {}, bonusStats = {}) {
  const totalStats = combinedStatusStats(stats, bonusStats);
  return STATUS_GRADE_STAT_KEYS.map((stat) => `${stat} ${totalStats[stat]}`).join(" / ");
}

export function statusGradeTemplateValues(stats = {}, { bonusStats = {}, starterSkillName = "" } = {}) {
  const totalStats = combinedStatusStats(stats, bonusStats);
  const statTotal = statusStatTotal(stats, bonusStats);
  return {
    ...totalStats,
    statSummary: statusStatSummary(stats, bonusStats),
    statTotal,
    baselineStatTotal: STATUS_GRADE_BASELINE_TOTAL,
    statusGrade: statusGradeFromStatTotal(statTotal),
    starterSkillName,
  };
}

function safeNumber(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}
