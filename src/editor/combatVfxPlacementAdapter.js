import {
  formatCombatVfxPlacement,
  renderCombatVfxPlacementDetailView,
} from "./combatVfxPlacementView.js?v=678";

export { formatCombatVfxPlacement };

export function createCombatVfxPlacementDetailRenderer() {
  return function renderCombatVfxPlacementDetailSection(options = {}) {
    return renderCombatVfxPlacementDetailView(options);
  };
}
