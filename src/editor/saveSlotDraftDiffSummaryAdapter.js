import { renderSaveSlotDraftDiffSummaryView } from "./saveSlotDraftDiffSummaryView.js?v=681";

export function createSaveSlotDraftDiffSummaryRenderer(options = {}) {
  return function renderSaveSlotDraftDiffSummary(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createDiff = typeof options.createDiff === "function" ? options.createDiff : () => ({});
    const diff = createDiff(diagnostics);
    const groups = Array.isArray(diff.groups) ? diff.groups : [];
    const viewDiff = {
      ...diff,
      groups: groups.map((group) => ({
        ...group,
        rowValue: translate("editorPrep.saveDraftDiff.groupRowValue", { count: group.rowCount }, `${group.rowCount}`),
        comparableValue: translate(
          "editorPrep.saveDraftDiff.groupComparableValue",
          { count: group.comparableRows },
          `${group.comparableRows}`,
        ),
        missingValue: translate(
          "editorPrep.saveDraftDiff.groupMissingValue",
          { count: group.missingRows },
          `${group.missingRows}`,
        ),
        blockedValue: translate(
          "editorPrep.saveDraftDiff.groupBlockedValue",
          { count: group.blockedRows },
          `${group.blockedRows}`,
        ),
      })),
    };

    return renderSaveSlotDraftDiffSummaryView({
      diff: viewDiff,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      targetValue: `${diff.targetCount}`,
      fieldValue: `${diff.fieldCount}`,
      comparableValue: `${diff.comparableRows}`,
      blockedValue: `${diff.blockedRows}`,
    });
  };
}
