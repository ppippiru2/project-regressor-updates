import { tf } from "../localization/index.js?v=677";
import {
  CONTENT_BULK_ROW_TARGET_SCOPES,
  createContentBulkRowTargetId,
} from "./contentBulkPackageOverview.js?v=677";
import { contentBulkChipBlock } from "./contentBulkChipBlockView.js?v=677";
import { contentBulkFallbackLabel } from "./contentBulkFilterModel.js?v=677";
import { contentBulkIssueList } from "./contentBulkIssueSummaryView.js?v=677";
import { renderContentBulkRowContractReviewChip } from "./contentBulkRowContractReviewView.js?v=677";
import { renderContentBulkStagedContractSummary } from "./contentBulkStagedContractSummaryView.js?v=677";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=677";

export const RUNTIME_VFX_BULK_INTAKE_VIEW_VERSION = "runtime-vfx-bulk-intake-view-v1";

export function renderRuntimeVfxBulkIntakePreview(preview, detailText = {}, options = {}) {
  const text = detailText.runtimeVfxBulkIntakePreview || {};
  const summary = preview.summary || {};
  const stateLabels = text.stateLabels || {};
  const kindLabels = text.kindLabels || {};
  const bulkLabels = text.bulkStateLabels || {};
  const matchesFilterRow = typeof options.matchesFilterRow === "function"
    ? options.matchesFilterRow
    : () => true;
  const formatPlacement = typeof options.formatPlacement === "function"
    ? options.formatPlacement
    : runtimeVfxFallbackPlacementSummary;
  const visibleRows = (preview.rows || []).filter((row) => matchesFilterRow(row.intakeState, [
    row,
    contentBulkFallbackLabel(row.intakeState, stateLabels),
    contentBulkFallbackLabel(row.kind, kindLabels),
    contentBulkFallbackLabel(row.bulkState, bulkLabels),
  ], ["runtime_vfx"]));
  const metrics = [
    [text.packageRows || "Package rows", `${summary.packageRowCount || 0}`],
    [text.profileRows || "Profile rows", `${summary.profilePlacementRowCount || 0}`],
    [text.modifierRows || "Modifier rows", `${summary.effectModifierRowCount || 0}`],
    [text.updateCandidates || "Updates", `${summary.updateCandidateCount || 0}`],
    [text.appendCandidates || "Append", `${summary.appendCandidateCount || 0}`],
    [text.readyRows || "Ready", `${summary.readyRowCount || 0}`],
    [text.warningRows || "Review", `${summary.warningRowCount || 0}`],
    [text.blockedRows || "Blocked", `${summary.blockedRowCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section id="runtime-vfx-bulk-intake" class="editor-runtime-vfx-bulk-intake" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Runtime VFX bulk intake")}">
      <div class="editor-runtime-vfx-bulk-intake-head">
        <div>
          <h4>${escapeHtml(text.title || "Runtime VFX bulk intake")}</h4>
          <p class="muted">${escapeHtml(text.description || "Reviews monster motion-profile VFX placement rows before any live patch.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.runtimeVfxBulkIntakePreview.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-runtime-vfx-bulk-intake-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      ${renderContentBulkStagedContractSummary(preview.stagedContract, text)}
      <div class="editor-runtime-vfx-bulk-intake-list">
        ${visibleRows.map((row) => renderRuntimeVfxBulkIntakeRow(row, text, { formatPlacement })).join("") || `<p class="muted">${escapeHtml(text.noFilteredRows || text.noRows || "No runtime VFX rows.")}</p>`}
      </div>
    </section>
  `;
}

function renderRuntimeVfxBulkIntakeRow(row, text = {}, options = {}) {
  const stateLabels = text.stateLabels || {};
  const kindLabels = text.kindLabels || {};
  const bulkLabels = text.bulkStateLabels || {};
  const formatPlacement = typeof options.formatPlacement === "function"
    ? options.formatPlacement
    : runtimeVfxFallbackPlacementSummary;
  return `
    <article id="${escapeAttribute(createContentBulkRowTargetId(CONTENT_BULK_ROW_TARGET_SCOPES.runtimeVfx, row.rowIndex, row.motionProfile, row.effectType || row.kind))}" class="editor-runtime-vfx-bulk-intake-row" data-state="${escapeAttribute(row.intakeState || "unknown")}">
      <div class="editor-runtime-vfx-bulk-intake-row-head">
        <div>
          <h5>${escapeHtml(row.motionProfile || "-")}${row.effectType ? ` - ${escapeHtml(row.effectType)}` : ""}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.runtimeVfxBulkIntakePreview.rowMeta", {
            key: row.sourceKey || "-",
            kind: contentBulkFallbackLabel(row.kind, kindLabels),
            state: contentBulkFallbackLabel(row.bulkState, bulkLabels),
          }, `${row.sourceKey || "-"} / ${row.kind || "-"}`))}</p>
        </div>
        <span>${escapeHtml(contentBulkFallbackLabel(row.intakeState, stateLabels))}</span>
      </div>
      <div class="editor-runtime-vfx-bulk-intake-grid">
        ${contentBulkChipBlock(text.targetSurface || "Target", [row.targetSurface || "-"])}
        ${contentBulkChipBlock(text.sourceMonster || "Source monster", [row.sourceMonsterId || (text.none || "None")])}
        ${contentBulkChipBlock(text.profileMonsterCount || "Current monsters", [`${row.profileMonsterCount || 0}`])}
        ${renderContentBulkRowContractReviewChip(row.contractReview, text)}
        ${contentBulkChipBlock(text.targetSurfaces || "Target surfaces", [`${row.targetSurfaceCount || 0}`])}
        ${contentBulkChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(row.blockingIssueCodes, text))}
        ${contentBulkChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(row.warningIssueCodes, text))}
        ${contentBulkChipBlock(text.signals || "Signals", row.signals || [])}
        ${contentBulkChipBlock(text.issues || "Issues", row.issues || [])}
        ${contentBulkChipBlock(text.placement || "Placement", [row.placement ? formatPlacement(row.placement) : runtimeVfxModifierSummary(row.modifier)])}
      </div>
    </article>
  `;
}

function runtimeVfxModifierSummary(modifier = {}) {
  if (!modifier) return "-";
  return `x ${Number(modifier.offsetX || 0)} / y ${Number(modifier.offsetY || 0)} / txt ${Number(modifier.textOffsetY || 0)} / mul ${Number(modifier.slashWidthMultiplier || 1)}/${Number(modifier.expandedSlashWidthMultiplier || 1)}`;
}

function runtimeVfxFallbackPlacementSummary(placement = {}) {
  return `x ${Number(placement.x || 0)} / y ${Number(placement.y || 0)} / w ${Number(placement.width || 0)} / h ${Number(placement.height || 0)}`;
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
