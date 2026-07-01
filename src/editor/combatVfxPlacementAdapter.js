import {
  formatCombatVfxPlacement,
  renderCombatVfxPlacementDetailView,
} from "./combatVfxPlacementView.js?v=677";

export { formatCombatVfxPlacement };

export function createCombatVfxPlacementDetailRenderer() {
  return function renderCombatVfxPlacementDetailSection(options = {}) {
    return renderCombatVfxPlacementDetailView(options);
  };
}
