export const TUTORIAL_BOSS_EVALUATION_RULES = Object.freeze([
  Object.freeze({ grade: "S", minDamageRate: 1, flag: "tutorialEvaluationGradeS", damageFlag: "tutorialBossDamageRate100Reached" }),
  Object.freeze({ grade: "A", minDamageRate: 0.8, flag: "tutorialEvaluationGradeA", damageFlag: "tutorialBossDamageRate80Reached" }),
  Object.freeze({ grade: "B", minDamageRate: 0.5, flag: "tutorialEvaluationGradeB", damageFlag: "tutorialBossDamageRate50Reached" }),
  Object.freeze({ grade: "C", minDamageRate: 0.2, flag: "tutorialEvaluationGradeC", damageFlag: "tutorialBossDamageRate20Reached" }),
]);

export function resolveTutorialBossEvaluation(damageRate) {
  const normalizedDamageRate = normalizeDamageRate(damageRate);
  const rule = TUTORIAL_BOSS_EVALUATION_RULES.find((entry) => normalizedDamageRate >= entry.minDamageRate) || null;
  return {
    damageRate: normalizedDamageRate,
    grade: rule?.grade || "",
    reachedFlags: TUTORIAL_BOSS_EVALUATION_RULES
      .filter((entry) => normalizedDamageRate >= entry.minDamageRate)
      .flatMap((entry) => [entry.flag, entry.damageFlag]),
  };
}

export function recordTutorialBossEvaluation(state, { region, monster, targetState, targetStats } = {}) {
  if (!state || !monster?.isBoss || !isDamageEvaluationRegion(region)) {
    return { recorded: false, damageRate: 0, grade: "" };
  }

  const maxHp = Number(targetStats?.maxHp || targetState?.maxHp || 0);
  if (!Number.isFinite(maxHp) || maxHp <= 0) {
    return { recorded: false, damageRate: 0, grade: "" };
  }

  const currentHp = clamp(Number(targetState?.hp ?? maxHp), 0, maxHp);
  const currentDamageRate = normalizeDamageRate((maxHp - currentHp) / maxHp);
  const bestDamageRate = Math.max(
    normalizeDamageRate(state.tutorialBossBestDamageRate ?? state.tutorialBossDamageRate),
    currentDamageRate,
  );
  const evaluation = resolveTutorialBossEvaluation(bestDamageRate);

  state.tutorialBossDamageRate = evaluation.damageRate;
  state.tutorialBossBestDamageRate = evaluation.damageRate;
  state.tutorialEvaluationGrade = evaluation.grade;

  if (!state.tutorialFlags || typeof state.tutorialFlags !== "object" || Array.isArray(state.tutorialFlags)) {
    state.tutorialFlags = {};
  }
  state.tutorialFlags.tutorialBossDamageRate = evaluation.damageRate;
  state.tutorialFlags.tutorialBossBestDamageRate = evaluation.damageRate;
  for (const flag of evaluation.reachedFlags) state.tutorialFlags[flag] = true;
  for (const flag of evaluation.reachedFlags) state[flag] = true;

  return {
    recorded: true,
    damageRate: evaluation.damageRate,
    grade: evaluation.grade,
  };
}

function isDamageEvaluationRegion(region) {
  const threshold = Number(region?.bossDamageThresholdPercent || 0);
  return Number.isFinite(threshold) && threshold > 0;
}

function normalizeDamageRate(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 0;
  return clamp(number, 0, 1);
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
