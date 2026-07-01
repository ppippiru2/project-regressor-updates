import { createContentBulkFilterCounts } from "./contentBulkFilterModel.js?v=681";
import { createContentBulkFilteredCandidatePreview } from "./contentBulkFilteredCandidatePreview.js?v=681";
import { createContentBulkPackageOverview } from "./contentBulkPackageOverview.js?v=681";
import { createRuntimeVfxBulkIntakePreviewFromPackageInput } from "./contentBulkPatchPackageInputActions.js?v=681";
import { createLootSkillBulkIntakePreview } from "./lootSkillBulkIntakePreview.js?v=681";

export const CONTENT_BULK_RUNTIME_PREVIEW_BUNDLE_VERSION = "content-bulk-runtime-preview-bundle-v1";

export function createContentBulkRuntimePreviewBundle({
  adapterPreview = {},
  packageInput = {},
  monsterRuntimePreview = {},
  placementPreview = {},
  filter = {},
  limit = 12,
} = {}) {
  const lootSkillBulkIntakePreview = createLootSkillBulkIntakePreview(adapterPreview);
  const runtimeVfxBulkIntakePreview = createRuntimeVfxBulkIntakePreviewFromPackageInput(packageInput, placementPreview);
  const previewSources = {
    adapterPreview,
    lootSkillPreview: lootSkillBulkIntakePreview,
    monsterRuntimePreview,
    runtimeVfxPreview: runtimeVfxBulkIntakePreview,
  };

  const contentBulkPackageOverview = createContentBulkPackageOverview(previewSources);
  const contentBulkFilterCounts = createContentBulkFilterCounts({
    ...previewSources,
    filter,
  });
  const contentBulkFilteredCandidatePreview = createContentBulkFilteredCandidatePreview({
    ...previewSources,
    filter,
    limit,
  });

  return {
    version: CONTENT_BULK_RUNTIME_PREVIEW_BUNDLE_VERSION,
    writesGameData: false,
    requiresExplicitApply: true,
    lootSkillBulkIntakePreview,
    runtimeVfxBulkIntakePreview,
    contentBulkPackageOverview,
    contentBulkFilterCounts,
    contentBulkFilteredCandidatePreview,
  };
}
