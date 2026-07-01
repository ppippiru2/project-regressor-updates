import {
  formatCombatVfxPlacement,
  renderCombatVfxPlacementDetailView,
} from "./combatVfxPlacementView.js?v=676";

export { formatCombatVfxPlacement };

export function createCombatVfxPlacementDetailRenderer() {
  return function renderCombatVfxPlacementDetailSection(options = {}) {
    return renderCombatVfxPlacementDetailView(options);
  };
}
