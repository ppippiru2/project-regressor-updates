import { BALANCE_TUNING_DOMAIN_SUMMARIES, BALANCE_TUNING_GROUPS } from "../balance/balanceTuningRegistry.js?v=678";
import { createBalanceTuningPreviewRows } from "./balanceTuningPreview.js?v=678";
import {
  matchesBalanceDetailFilter,
  selectedBalanceTuningCandidate,
} from "./balanceFilterModel.js?v=678";
import { createEditorContentBulkRuntimePreviewContext } from "./editorContentBulkRuntimePreviewContext.js?v=678";
import { createTutorialIslandPacingSnapshot } from "./tutorialIslandPacingPreview.js?v=678";

export function createEditorBalanceTuningDetailRenderer(options = {}) {
  const renderers = options.renderers || {};
  const CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE = options.packageRuntimeState;
  const renderBalanceTuningDetailSection = requiredRenderer(renderers.balanceTuningDetail, "balanceTuningDetail");
  const renderEmptyBalanceRowsSection = requiredRenderer(renderers.emptyBalanceRows, "emptyBalanceRows");
  const renderBalanceGroupRowSection = requiredRenderer(renderers.balanceGroupRow, "balanceGroupRow");
  const renderBalanceFilterControlsSection = optionalRenderer(renderers.balanceFilterControls);
  const renderActiveBalanceCandidateSummarySection = optionalRenderer(renderers.activeBalanceCandidateSummary);
  const renderBalanceDomainSummariesSection = optionalRenderer(renderers.balanceDomainSummaries);
  const renderBalancePacingSnapshotSection = optionalRenderer(renderers.balancePacingSnapshot);
  const renderMonsterCandidateRewardSection = optionalRenderer(renderers.monsterCandidateReward);
  const renderMonsterCandidatePromotionChecklistSection = optionalRenderer(renderers.monsterCandidatePromotionChecklist);
  const renderMonsterCandidateLivePromotionPlanSection = optionalRenderer(renderers.monsterCandidateLivePromotionPlan);
  const renderMonsterCandidateLivePatchDraftSection = optionalRenderer(renderers.monsterCandidateLivePatchDraft);
  const renderMonsterCandidateBulkPatchAutomationSection = optionalRenderer(renderers.monsterCandidateBulkPatchAutomation);
  const renderContentBulkPatchAutomationPlanSection = optionalRenderer(renderers.contentBulkPatchAutomationPlan);
  const renderContentBulkPatchIntakeContractSection = optionalRenderer(renderers.contentBulkPatchIntakeContract);
  const renderContentBulkPackageOverviewSection = optionalRenderer(renderers.contentBulkPackageOverview);
  const renderContentBulkPatchPackageAdapterPreviewSection = optionalRenderer(renderers.contentBulkPatchPackageAdapterPreview);
  const renderLootSkillBulkIntakeSection = optionalRenderer(renderers.lootSkillBulkIntake);
  const renderMonsterRuntimeBulkIntakeSection = optionalRenderer(renderers.monsterRuntimeBulkIntake);
  const renderRuntimeVfxBulkIntakeSection = optionalRenderer(renderers.runtimeVfxBulkIntake);
  const renderContentBulkMassApplyReadinessSection = optionalRenderer(renderers.contentBulkMassApplyReadiness);
  const renderContentBulkStagedApplyRehearsalSection = optionalRenderer(renderers.contentBulkStagedApplyRehearsal);
  const renderContentBulkDomainApplyReadinessSection = optionalRenderer(renderers.contentBulkDomainApplyReadiness);
  const renderContentBulkFilteredCandidatePreviewSection = optionalRenderer(renderers.contentBulkFilteredCandidatePreview);
  const renderContentBulkPatchDryRunSection = optionalRenderer(renderers.contentBulkPatchDryRun);
  const renderContentBulkPatchStagedImportSection = optionalRenderer(renderers.contentBulkPatchStagedImport);
  const renderContentBulkPatchDiffExportSection = optionalRenderer(renderers.contentBulkPatchDiffExport);
  const renderContentBulkPatchManualApplyChecklistSection = optionalRenderer(renderers.contentBulkPatchManualApplyChecklist);
  const renderContentBulkPatchFilePatchDraftSection = optionalRenderer(renderers.contentBulkPatchFilePatchDraft);
  const renderContentBulkPatchFilePatchDraftExportSection = optionalRenderer(renderers.contentBulkPatchFilePatchDraftExport);
  const renderContentBulkPatchApplyGatePlanSection = optionalRenderer(renderers.contentBulkPatchApplyGatePlan);
  const renderContentBulkPatchBackupPlanSection = optionalRenderer(renderers.contentBulkPatchBackupPlan);
  const renderContentBulkPatchRestoreRehearsalSection = optionalRenderer(renderers.contentBulkPatchRestoreRehearsal);
  const renderBalanceTuningCandidatesSection = optionalRenderer(renderers.balanceTuningCandidates);
  const renderBalanceRelatedChecksSection = optionalRenderer(renderers.balanceRelatedChecks);
  const previewById = new Map(
    createBalanceTuningPreviewRows(BALANCE_TUNING_GROUPS).map((row) => [row.id, row]),
  );
  const fileCount = new Set(BALANCE_TUNING_GROUPS.flatMap((group) => group.files)).size;
  const exportCount = BALANCE_TUNING_GROUPS.reduce((sum, group) => sum + group.exports.length, 0);

  return function renderEditorBalanceTuningDetail() {
    const manifest = callGetter(options.getManifest) || {};
    const detailText = callGetter(options.getDetailText) || {};
    const balanceDetailFilter = callGetter(options.getBalanceDetailFilter) || {};
    const contentBulkDetailFilter = callGetter(options.getContentBulkDetailFilter) || {};
    const registryMeta = manifest.balanceTuningRegistry || {};
    const relatedChecks = Array.isArray(registryMeta.relatedChecks) ? registryMeta.relatedChecks : [];
    const tuningCandidates = Array.isArray(registryMeta.tuningCandidates) ? registryMeta.tuningCandidates : [];
    const visibleGroups = BALANCE_TUNING_GROUPS.filter((group) => (
      matchesBalanceDetailFilter(balanceDetailFilter, group, BALANCE_TUNING_GROUPS)
    ));
    const rows = visibleGroups.map((group) => renderBalanceGroupRowSection(group, detailText, {
      previewById,
    })).join("");
    const contentBulkRuntimePreviewContext = createEditorContentBulkRuntimePreviewContext({
      packageRuntimeState: CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE,
      monsterRuntimePreview: resolveValue(options.monsterRuntimePreview),
      placementPreview: resolveValue(options.placementPreview),
      filter: contentBulkDetailFilter,
      limit: 12,
    });
    const {
      lootSkillBulkIntakePreview,
      runtimeVfxBulkIntakePreview,
      contentBulkPackageOverview,
      contentBulkFilterCounts,
      contentBulkFilteredCandidatePreview,
    } = contentBulkRuntimePreviewContext;

    return renderBalanceTuningDetailSection({
      detailText,
      groupCount: BALANCE_TUNING_GROUPS.length,
      fileCount,
      exportCount,
      sections: [
        renderBalanceFilterControlsSection(detailText, visibleGroups.length, BALANCE_TUNING_GROUPS.length, {
          filter: balanceDetailFilter,
        }),
        renderActiveBalanceCandidateSummarySection(detailText, relatedChecks, tuningCandidates, visibleGroups, {
          activeCandidate: selectedBalanceTuningCandidate(balanceDetailFilter, tuningCandidates),
          groups: BALANCE_TUNING_GROUPS,
          previewById,
        }),
        renderBalanceDomainSummariesSection(BALANCE_TUNING_DOMAIN_SUMMARIES, detailText, relatedChecks, {
          groups: BALANCE_TUNING_GROUPS,
          previewById,
        }),
        renderBalancePacingSnapshotSection(createTutorialIslandPacingSnapshot(), detailText),
        renderMonsterCandidateRewardSection(detailText),
        renderMonsterCandidatePromotionChecklistSection(detailText),
        renderMonsterCandidateLivePromotionPlanSection(detailText),
        renderMonsterCandidateLivePatchDraftSection(detailText),
        renderMonsterCandidateBulkPatchAutomationSection(detailText),
        renderContentBulkPatchAutomationPlanSection(detailText),
        renderContentBulkPatchIntakeContractSection(detailText),
        renderContentBulkPackageOverviewSection(contentBulkPackageOverview, detailText, contentBulkFilterCounts),
        renderContentBulkPatchPackageAdapterPreviewSection(CONTENT_BULK_PATCH_PACKAGE_RUNTIME_STATE.getAdapterPreview(), detailText),
        renderLootSkillBulkIntakeSection(lootSkillBulkIntakePreview, detailText),
        renderMonsterRuntimeBulkIntakeSection(resolveValue(options.monsterRuntimePreview), detailText),
        renderRuntimeVfxBulkIntakeSection(runtimeVfxBulkIntakePreview, detailText),
        renderContentBulkMassApplyReadinessSection(contentBulkFilteredCandidatePreview, detailText),
        renderContentBulkStagedApplyRehearsalSection(contentBulkFilteredCandidatePreview, detailText),
        renderContentBulkDomainApplyReadinessSection({
          filterCounts: contentBulkFilterCounts,
          filteredCandidatePreview: contentBulkFilteredCandidatePreview,
        }),
        renderContentBulkFilteredCandidatePreviewSection(contentBulkFilteredCandidatePreview, detailText),
        renderContentBulkPatchDryRunSection(detailText),
        renderContentBulkPatchStagedImportSection(detailText),
        renderContentBulkPatchDiffExportSection(detailText),
        renderContentBulkPatchManualApplyChecklistSection(detailText),
        renderContentBulkPatchFilePatchDraftSection(detailText),
        renderContentBulkPatchFilePatchDraftExportSection(detailText),
        renderContentBulkPatchApplyGatePlanSection(contentBulkFilteredCandidatePreview, detailText),
        renderContentBulkPatchBackupPlanSection(detailText),
        renderContentBulkPatchRestoreRehearsalSection(detailText),
        renderBalanceTuningCandidatesSection(tuningCandidates, detailText, relatedChecks, {
          activeCandidateId: balanceDetailFilter.candidateId,
          groups: BALANCE_TUNING_GROUPS,
          previewById,
        }),
        renderBalanceRelatedChecksSection(relatedChecks, detailText),
      ],
      rowsHtml: rows || renderEmptyBalanceRowsSection(detailText, {
        filter: balanceDetailFilter,
      }),
    });
  };
}

function requiredRenderer(renderer, name) {
  if (typeof renderer === "function") return renderer;
  throw new Error(`Missing editor balance tuning detail renderer: ${name}`);
}

function optionalRenderer(renderer) {
  return typeof renderer === "function" ? renderer : () => "";
}

function callGetter(getter) {
  return typeof getter === "function" ? getter() : undefined;
}

function resolveValue(value) {
  return typeof value === "function" ? value() : value;
}
