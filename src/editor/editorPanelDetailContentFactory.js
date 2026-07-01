export function createEditorPanelDetailContentRenderers({
  getText,
  getRetargetDetailFilter,
  getExpandedRetargetRows,
  monsterSpriteReportText = {},
  renderers = {},
} = {}) {
  return {
    retargetDetail() {
      const text = getText();
      return renderers.retargetPreviewDetail?.({
        detailText: text.retargetDetail || {},
        filter: getRetargetDetailFilter(),
        expandedRows: getExpandedRetargetRows(),
      }) || "";
    },
    balanceTuningDetail() {
      return renderers.balanceTuningDetail?.() || "";
    },
    combatVfxDetail() {
      return renderers.combatVfxDetail?.() || "";
    },
    initialPlayerSetup() {
      return renderers.initialPlayerSetup?.(getText().initialPlayerSetup || {}) || "";
    },
    monsterSpriteReport() {
      const text = getText();
      return renderers.monsterSpriteSlotReport?.({
        ...monsterSpriteReportText,
        ...(text.monsterSpriteSlotReport || {}),
      }) || "";
    },
    monsterRuntimePreview() {
      return renderers.monsterRuntimeIntegration?.(getText().monsterRuntimeIntegrationPreview || {}) || "";
    },
    saveSlotDiagnostics() {
      return renderers.saveSlotDiagnostics?.() || "";
    },
  };
}
