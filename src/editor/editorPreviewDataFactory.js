import { createContentBulkPatchAutomationPlan } from "./contentBulkPatchAutomationPlan.js?v=681";
import { createContentBulkPatchDiffExport } from "./contentBulkPatchDiffExport.js?v=681";
import { createContentBulkPatchDryRunPreview } from "./contentBulkPatchDryRunImporter.js?v=681";
import { createContentBulkPatchFilePatchDraft } from "./contentBulkPatchFilePatchDraft.js?v=681";
import { createContentBulkPatchIntakeContract } from "./contentBulkPatchIntakeContract.js?v=681";
import { createContentBulkPatchManualApplyChecklist } from "./contentBulkPatchManualApplyChecklist.js?v=681";
import { createContentBulkPatchStagedImportPreview } from "./contentBulkPatchStagedImportPreview.js?v=681";
import { createCombatVfxPlacementPreview } from "./combatVfxPlacementPreview.js?v=681";
import { createInitialPlayerSetupPreview } from "./initialPlayerSetupPreview.js?v=681";
import { createMonsterCandidateBulkPatchAutomationPreview } from "./monsterCandidateBulkPatchAutomation.js?v=681";
import { createMonsterCandidateLivePatchDraft } from "./monsterCandidateLivePatchDraft.js?v=681";
import { createMonsterCandidateLivePromotionPlan } from "./monsterCandidateLivePromotionPlan.js?v=681";
import { createMonsterCandidatePromotionChecklist } from "./monsterCandidatePromotionChecklist.js?v=681";
import { createMonsterCandidateRewardPreview } from "./monsterCandidateRewardPreview.js?v=681";
import { createMonsterRuntimeBulkIntakePreview } from "./monsterRuntimeBulkIntakePreview.js?v=681";
import { createMonsterRuntimeIntegrationPreview } from "./monsterRuntimeIntegrationPreview.js?v=681";
import {
  createMonsterSpriteReadyConnectionPatchPlan,
  createMonsterSpriteReadyConnectionReview,
  createMonsterSpriteSlotReport,
} from "./monsterSpriteSlotReport.js?v=681";

export function createEditorPreviewDataBundle() {
  const monsterCandidateRewardPreview = createMonsterCandidateRewardPreview();
  const monsterCandidatePromotionChecklist = createMonsterCandidatePromotionChecklist(monsterCandidateRewardPreview);
  const monsterCandidateLivePromotionPlan = createMonsterCandidateLivePromotionPlan(monsterCandidatePromotionChecklist);
  const monsterCandidateLivePatchDraft = createMonsterCandidateLivePatchDraft(monsterCandidateLivePromotionPlan);
  const monsterRuntimeIntegrationPreview = createMonsterRuntimeIntegrationPreview();
  const monsterSpriteSlotReport = createMonsterSpriteSlotReport();
  const monsterSpriteReadyConnectionPlan = createMonsterSpriteReadyConnectionPatchPlan(monsterSpriteSlotReport);

  return {
    contentBulkPatchAutomationPlan: createContentBulkPatchAutomationPlan(),
    contentBulkPatchIntakeContract: createContentBulkPatchIntakeContract(),
    contentBulkPatchDryRunPreview: createContentBulkPatchDryRunPreview(),
    contentBulkPatchStagedImportPreview: createContentBulkPatchStagedImportPreview(),
    contentBulkPatchDiffExport: createContentBulkPatchDiffExport(),
    contentBulkPatchManualApplyChecklist: createContentBulkPatchManualApplyChecklist(),
    contentBulkPatchFilePatchDraft: createContentBulkPatchFilePatchDraft(),
    monsterCandidateRewardPreview,
    monsterCandidatePromotionChecklist,
    monsterCandidateLivePromotionPlan,
    monsterCandidateLivePatchDraft,
    monsterCandidateBulkPatchAutomation: createMonsterCandidateBulkPatchAutomationPreview(),
    combatVfxPlacementPreview: createCombatVfxPlacementPreview(),
    initialPlayerSetupPreview: createInitialPlayerSetupPreview(),
    monsterRuntimeIntegrationPreview,
    monsterRuntimeBulkIntakePreview: createMonsterRuntimeBulkIntakePreview(monsterRuntimeIntegrationPreview),
    monsterSpriteSlotReport,
    monsterSpriteReadyConnectionPlan,
    monsterSpriteReadyConnectionReview: createMonsterSpriteReadyConnectionReview(
      monsterSpriteSlotReport,
      monsterSpriteReadyConnectionPlan,
    ),
  };
}
