export function resetWorldProgressForRegression(state, firstRegionId) {
  if (!state || !firstRegionId) return { reset: false };

  state.regionId = firstRegionId;
  state.completedRegions = [];
  state.regionEncounterCounts = {};
  state.gateProgress = {};
  state.target = null;
  state.inCombat = false;
  state.resting = false;
  state.autoHunt = false;

  return {
    reset: true,
    regionId: firstRegionId,
  };
}
