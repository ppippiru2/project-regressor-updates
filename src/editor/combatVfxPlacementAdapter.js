import {
  formatCombatVfxPlacement,
  renderCombatVfxPlacementDetailView,
} from "./combatVfxPlacementView.js?v=680";

export { formatCombatVfxPlacement };

export function createCombatVfxPlacementDetailRenderer() {
  return function renderCombatVfxPlacementDetailSection(options = {}) {
    return renderCombatVfxPlacementDetailView(options);
  };
}
