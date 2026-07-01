import { tf } from "../localization/index.js?v=678";
import {
  CONTENT_BULK_ROW_TARGET_SCOPES,
  createContentBulkRowTargetId,
} from "./contentBulkPackageOverview.js?v=678";
import { contentBulkChipBlock } from "./contentBulkChipBlockView.js?v=678";
import { contentBulkFallbackLabel } from "./contentBulkFilterModel.js?v=678";
import { contentBulkIssueList } from "./contentBulkIssueSummaryView.js?v=678";
import { renderContentBulkRowContractReviewChip } from "./contentBulkRowContractReviewView.js?v=678";
import { renderContentBulkStagedContractSummary } from "./contentBulkStagedContractSummaryView.js?v=678";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=678";

export const MONSTER_RUNTIME_BULK_INTAKE_VIEW_VERSION = "monster-runtime-bulk-intake-view-v1";

export function renderMonsterRuntimeBulkIntakePreview(preview, detailText = {}, options = {}) {
  const text = detailText.monsterRuntimeBulkIntakePreview || {};
  const summary = preview.summary || {};
  const stateLabels = text.stateLabels || {};
  const matchesFilterRow = typeof options.matchesFilterRow === "function"
    ? options.matchesFilterRow
    : () => true;
  const visibleRows = (preview.rows || []).filter((row) => matchesFilterRow(row.runtimeState, [
    row,
    contentBulkFallbackLabel(row.runtimeState, stateLabels),
    contentBulkFallbackLabel(row.bulkState, stateLabels),
  ], ["monster", "monster_runtime"]));
  const metrics = [
    [text.runtimePresets || "Runtime presets", `${summary.runtimePresetCount || 0}`],
    [text.packageRows || "Package rows", `${summary.packageRowCount || 0}`],
    [text.recognizedRows || "Recognized rows", `${summary.recognizedRuntimeRows || 0}`],
    [text.updateCandidates || "Update candidates", `${summary.updateCandidateCount || 0}`],
    [text.missingSprites || "Missing sprites", `${summary.missingSpriteFileCount || 0}`],
    [text.blockedRows || "Blocked rows", `${summary.blockedRuntimeRowCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section id="monster-runtime-bulk-intake" class="editor-monster-runtime-bulk-intake" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Monster runtime bulk intake")}">
      <div class="editor-monster-runtime-bulk-intake-head">
        <div>
          <h4>${escapeHtml(text.title || "Monster runtime bulk intake")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only bridge from monster runtime package presets into the bulk intake contract.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterRuntimeBulkIntakePreview.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-monster-runtime-bulk-intake-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      ${renderContentBulkStagedContractSummary(preview.stagedContract, text)}
      <div class="editor-monster-runtime-bulk-intake-list">
        ${visibleRows.map((row) => renderMonsterRuntimeBulkIntakeRow(row, text)).join("") || `<p class="muted">${escapeHtml(text.noFilteredRows || text.noRows || "No runtime package rows.")}</p>`}
      </div>
    </section>
  `;
}

function renderMonsterRuntimeBulkIntakeRow(row, text = {}) {
  const stateLabels = text.stateLabels || {};
  const motionLabels = (row.motions || []).map((motion) => `${motion.phase}: ${motion.runtimeMotionId || motion.externalMotionId}`);
  const actionLabels = (row.actions || []).map((action) => `${action.id}${action.optional ? ` (${text.optional || "optional"})` : ""}`);
  return `
    <article id="${escapeAttribute(createContentBulkRowTargetId(CONTENT_BULK_ROW_TARGET_SCOPES.monsterRuntime, row.liveMonsterId || row.externalMonsterId || row.packageIdentity))}" class="editor-monster-runtime-bulk-intake-row" data-state="${escapeAttribute(row.runtimeState || "unknown")}">
      <div class="editor-monster-runtime-bulk-intake-row-head">
        <div>
          <h5>${escapeHtml(row.externalMonsterId || "-")} - ${escapeHtml(row.liveMonsterId || "-")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterRuntimeBulkIntakePreview.rowMeta", {
            key: row.acceptedAliasKey || "-",
            domain: row.targetDomainId || "-",
            state: contentBulkFallbackLabel(row.bulkState, stateLabels),
          }, `${row.acceptedAliasKey || "-"} / ${row.targetDomainId || "-"}`))}</p>
        </div>
        <span>${escapeHtml(contentBulkFallbackLabel(row.runtimeState, stateLabels))}</span>
      </div>
      <div class="editor-monster-runtime-bulk-intake-grid">
        ${contentBulkChipBlock(text.motions || "Motions", motionLabels)}
        ${contentBulkChipBlock(text.actions || "Actions", actionLabels)}
        ${contentBulkChipBlock(text.missingSpriteFiles || "Missing sprite files", row.missingSpriteFiles || [])}
        ${contentBulkChipBlock(text.sourcePreview || "Source preview", [row.sourcePreviewFile].filter(Boolean))}
        ${renderContentBulkRowContractReviewChip(row.contractReview, text)}
        ${contentBulkChipBlock(text.targetSurfaces || "Target surfaces", [`${row.targetSurfaceCount || 0}`])}
        ${contentBulkChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(row.blockingIssueCodes, text))}
        ${contentBulkChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(row.warningIssueCodes, text))}
      </div>
    </article>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value);
}
