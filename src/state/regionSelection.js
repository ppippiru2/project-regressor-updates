import { tf } from "../localization/index.js?v=481";

export function selectRegionState(state, uiState, regionId) {
  state.regionId = regionId;
  uiState.selectedRegionId = regionId;
}

export function applyRegionSelection(state, uiState, region) {
  if (!region) {
    return { changed: false, message: "" };
  }
  selectRegionState(state, uiState, region.id);
  const riskText =
    state.player.level < region.recommendedLevel
      ? tf("stateMessages.regionRisk", { level: region.recommendedLevel })
      : "";
  return {
    changed: true,
    message: tf("stateMessages.regionMoved", { regionName: region.name, riskText }),
  };
}

export function previewRegionState(regions, uiState, regionId) {
  if (!regions.some((region) => region.id === regionId)) return false;
  uiState.selectedRegionId = regionId;
  return true;
}

export function newlyUnlockedRegions(regions, beforeLevel, afterLevel) {
  if (afterLevel <= beforeLevel) return [];
  return regions.filter(
    (region) => region.recommendedLevel > beforeLevel && region.recommendedLevel <= afterLevel
  );
}



