import { createCombatVfxPlacementDetailRenderer, formatCombatVfxPlacement } from "./combatVfxPlacementAdapter.js?v=677";
import {
  COMBAT_VFX_CLASS_LABELS,
  COMBAT_VFX_EFFECT_LABELS,
  COMBAT_VFX_GENDER_LABELS,
  COMBAT_VFX_SIGNAL_LABELS,
} from "./combatVfxPlacementText.js?v=677";
import {
  combatVfxMonsterSearchText,
  combatVfxPlayerSearchText,
  matchesCombatVfxFilter,
} from "./combatVfxFilterModel.js?v=677";

export function createEditorCombatVfxDetailRenderer(options = {}) {
  const renderDetailSection = options.renderDetailSection || createCombatVfxPlacementDetailRenderer();
  return function renderEditorCombatVfxDetail() {
    const detailText = {
      ...(options.baseText || {}),
      ...(options.getText?.() || {}),
    };
    const preview = options.getPreview?.() || {};
    const filter = options.getFilter?.() || {};
    const playerRows = preview.playerRows || [];
    const monsterRows = preview.monsterRows || [];
    const searchContext = { formatPlacement: formatCombatVfxPlacement };
    const visiblePlayerRows = playerRows.filter((row) =>
      matchesCombatVfxFilter(filter, "player", combatVfxPlayerSearchText(row, searchContext))
    );
    const visibleMonsterRows = monsterRows.filter((row) =>
      matchesCombatVfxFilter(filter, "monster", combatVfxMonsterSearchText(row, searchContext))
    );
    return renderDetailSection({
      preview,
      visiblePlayerRows,
      visibleMonsterRows,
      detailText,
      filter,
      labels: {
        classLabels: {
          ...COMBAT_VFX_CLASS_LABELS,
          ...(detailText.classLabels || {}),
        },
        genderLabels: {
          ...COMBAT_VFX_GENDER_LABELS,
          ...(detailText.genderLabels || {}),
        },
        effectLabels: {
          ...COMBAT_VFX_EFFECT_LABELS,
          ...(detailText.effectLabels || {}),
        },
        signalLabels: {
          ...COMBAT_VFX_SIGNAL_LABELS,
          ...(detailText.signalLabels || {}),
        },
      },
    });
  };
}
