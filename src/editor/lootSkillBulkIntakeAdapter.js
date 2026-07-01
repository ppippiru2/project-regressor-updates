import { renderLootSkillBulkIntakePreview } from "./lootSkillBulkIntakeView.js?v=676";

export function createLootSkillBulkIntakeRenderer(options = {}) {
  return function renderLootSkillBulkIntake(preview, detailText = {}) {
    const getFilter = typeof options.getFilter === "function" ? options.getFilter : () => null;
    const matchesFilterRow = typeof options.matchesFilterRow === "function"
      ? options.matchesFilterRow
      : () => true;

    return renderLootSkillBulkIntakePreview(preview, detailText, {
      matchesFilterRow: (state, values, domains) => matchesFilterRow(getFilter(), state, values, domains),
    });
  };
}
