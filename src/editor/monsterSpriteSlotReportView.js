import { editorChipBlock } from "./editorChipBlockView.js?v=681";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=681";

export const MONSTER_SPRITE_SLOT_REPORT_VIEW_VERSION = "monster-sprite-slot-report-view-v1";
const MONSTER_SPRITE_SLOT_CHIP_OPTIONS = {
  blockClass: "editor-combat-vfx-chip-block",
  chipClass: "editor-chip",
  filterEmpty: true,
};

export function renderMonsterSpriteSlotReportView({
  report = {},
  readiness = {},
  plan = {},
  review = {},
  detailText = {},
} = {}) {
  const totals = report.totals || {};
  const statusLabels = detailText.statusLabels || {};
  const fileStatusLabels = detailText.fileStatusLabels || {};
  const title = detailText.title || "Monster Battle Sprite Slot Readiness";
  const description = detailText.description || "";

  return `
    <section class="editor-monster-sprite-report" aria-label="${escapeAttribute(title)}">
      <div class="editor-monster-sprite-head">
        <div>
          <h3>${escapeHtml(title)}</h3>
          <p class="muted">${escapeHtml(description)}</p>
        </div>
        <span>${escapeHtml(`${totals.monsters || 0} monsters / ${totals.poses || 0} poses`)}</span>
      </div>
      <div class="editor-monster-sprite-summary">
        ${renderEditorSummaryCard(detailText.slotMetric, String(totals.slots || 0))}
        ${renderEditorSummaryCard(detailText.assignedMetric, String(totals.assignedSlots || 0))}
        ${renderEditorSummaryCard(detailText.connectableMetric, String(totals.connectableSlots || 0))}
        ${renderEditorSummaryCard(detailText.missingMetric, String(totals.missingSlots || 0))}
        ${renderEditorSummaryCard(detailText.fileScanMetric, String(totals.fileReadySlots || 0))}
        ${renderEditorSummaryCard(detailText.fallbackMetric, String(totals.cssPlaceholderSlots || 0))}
        ${renderEditorSummaryCard(detailText.brokenMetric, String(totals.brokenSlots || 0))}
      </div>
      ${renderMonsterSpriteConnectionPlan(readiness, detailText, { plan, review })}
      ${renderMonsterSpriteFallbackSummary(report, detailText)}
      <div class="editor-monster-sprite-list">
        ${(report.byMonster || []).map((group) => renderMonsterSpriteSlotGroup(group, detailText, statusLabels, fileStatusLabels)).join("")}
      </div>
    </section>
  `;
}

export function renderMonsterSpriteConnectionPlan(readiness = {}, detailText = {}, options = {}) {
  const plan = options.plan || {};
  const review = options.review || {};
  const readySlotPatches = numberOrFallback(readiness.readyAssetSlotPatchEntries, plan.assetSlotPatches?.length || 0);
  const readyManifestEntries = numberOrFallback(readiness.readyAssetManifestPatchEntries, plan.assetManifestEntries?.length || 0);
  const readyFiles = numberOrFallback(readiness.fileReadySlots, plan.summary?.fileReadySlots || 0);
  const missingFiles = numberOrFallback(readiness.fileMissingSlots, plan.summary?.fileMissingSlots || 0);
  const applyMode = readiness.readyConnectionApplyMode || plan.applyMode || "file-ready-only";
  const status = readiness.readyConnectionReviewStatus || review.status || "waiting-for-monster-files";
  const statusLabel = detailText.statusLabels?.[status] || status;
  const nextStepKey = review.nextStep || "add-monster-files";
  const nextStepLabel = detailText.nextStepLabels?.[nextStepKey] || nextStepKey;

  return `
    <div class="editor-monster-sprite-plan" data-ready-patches="${escapeAttribute(String(readySlotPatches))}" data-review-status="${escapeAttribute(status)}">
      <div class="editor-monster-sprite-plan-copy">
        <strong>${escapeHtml(detailText.connectionPlanTitle || "Ready Connection Plan")}</strong>
        <span>${escapeHtml(detailText.connectionPlanDescription || "")}</span>
      </div>
      <div class="editor-monster-sprite-plan-state">
        <span>${escapeHtml(detailText.reviewStatusMetric || "Review status")}</span>
        <strong>${escapeHtml(statusLabel)}</strong>
      </div>
      <p class="editor-monster-sprite-plan-next">${escapeHtml(nextStepLabel)}</p>
      <div class="editor-monster-sprite-plan-grid">
        ${renderEditorSummaryCard(detailText.readyPatchMetric || "Ready patches", String(readySlotPatches))}
        ${renderEditorSummaryCard(detailText.readyManifestMetric || "Manifest entries", String(readyManifestEntries))}
        ${renderEditorSummaryCard(detailText.readyFileMetric || "Ready files", String(readyFiles))}
        ${renderEditorSummaryCard(detailText.missingFileMetric || "Missing files", String(missingFiles))}
        ${renderEditorSummaryCard(detailText.applyModeMetric || "Apply mode", applyMode)}
      </div>
      ${renderMonsterSpriteReviewChecks(review, detailText)}
      ${renderMonsterSpriteApplyPreview(readiness, detailText)}
      ${renderMonsterSpriteMissingFileHandoff(readiness, detailText)}
    </div>
  `;
}

function numberOrFallback(value, fallback) {
  const number = Number(value);
  return Number.isFinite(number) ? number : fallback;
}

function renderMonsterSpriteReviewChecks(review = {}, detailText = {}) {
  const checks = Array.isArray(review.checks) ? review.checks : [];
  if (!checks.length) return "";
  const passedLabel = detailText.reviewCheckPassed || "OK";
  const pendingLabel = detailText.reviewCheckPending || "Pending";

  return `
    <div class="editor-monster-sprite-review">
      <strong>${escapeHtml(detailText.reviewChecklistTitle || "Review gate")}</strong>
      <div class="editor-monster-sprite-review-list">
        ${checks.map((check) => {
          const label = detailText.reviewCheckLabels?.[check.id] || check.id;
          return `
            <span data-passed="${escapeAttribute(check.passed ? "true" : "false")}">
              ${escapeHtml(label)}
              <b>${escapeHtml(check.passed ? passedLabel : pendingLabel)}</b>
            </span>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

export function renderMonsterSpriteMissingFileHandoff(readiness = {}, detailText = {}) {
  if (!readiness.missingFileHandoffArtifact) return "";
  return `
    <div class="editor-monster-sprite-handoff">
      <div class="editor-monster-sprite-handoff-copy">
        <strong>${escapeHtml(detailText.handoffTitle || "Missing File Handoff")}</strong>
        <span>${escapeHtml(detailText.handoffDescription || "")}</span>
      </div>
      <div class="editor-monster-sprite-handoff-grid">
        ${editorChipBlock(detailText.handoffArtifactMetric || "Artifact", [readiness.missingFileHandoffArtifact], MONSTER_SPRITE_SLOT_CHIP_OPTIONS)}
        ${editorChipBlock(detailText.handoffScriptMetric || "Script", [readiness.missingFileHandoffExportScript || "-"], MONSTER_SPRITE_SLOT_CHIP_OPTIONS)}
        ${editorChipBlock(detailText.handoffMissingMetric || "Missing files", [String(readiness.missingFileHandoffMissingFiles ?? "-")], MONSTER_SPRITE_SLOT_CHIP_OPTIONS)}
        ${editorChipBlock(detailText.handoffGroupsMetric || "Monster groups", [String(readiness.missingFileHandoffMonsterGroups ?? "-")], MONSTER_SPRITE_SLOT_CHIP_OPTIONS)}
      </div>
    </div>
  `;
}

export function renderMonsterSpriteApplyPreview(readiness = {}, detailText = {}) {
  if (!readiness.applyPreviewArtifact) return "";
  const status = readiness.applyPreviewStatus || "waiting-for-monster-files";
  const statusLabel = detailText.statusLabels?.[status] || status;
  const manualReviewLabel = readiness.applyPreviewManualReviewRequired
    ? detailText.applyPreviewManualReviewRequired || "Manual review"
    : detailText.applyPreviewManualReviewOptional || "Optional";
  const compareLabel = readiness.applyPreviewComparesMissingFileHandoff
    ? detailText.applyPreviewCompareEnabled || "Compared"
    : detailText.applyPreviewCompareDisabled || "Not compared";

  return `
    <div class="editor-monster-sprite-apply-preview" data-apply-preview-status="${escapeAttribute(status)}">
      <div class="editor-monster-sprite-apply-preview-copy">
        <strong>${escapeHtml(detailText.applyPreviewTitle || "Apply Preview")}</strong>
        <span>${escapeHtml(detailText.applyPreviewDescription || "")}</span>
      </div>
      <div class="editor-monster-sprite-apply-preview-grid">
        ${editorChipBlock(detailText.applyPreviewArtifactMetric || "Artifact", [readiness.applyPreviewArtifact], MONSTER_SPRITE_SLOT_CHIP_OPTIONS)}
        ${editorChipBlock(detailText.applyPreviewScriptMetric || "Script", [readiness.applyPreviewExportScript || "-"], MONSTER_SPRITE_SLOT_CHIP_OPTIONS)}
        ${editorChipBlock(detailText.applyPreviewStatusMetric || "Status", [statusLabel], MONSTER_SPRITE_SLOT_CHIP_OPTIONS)}
        ${editorChipBlock(detailText.applyPreviewReadyPatchMetric || "Ready patches", [String(readiness.applyPreviewReadyPatchCount ?? "-")], MONSTER_SPRITE_SLOT_CHIP_OPTIONS)}
        ${editorChipBlock(detailText.applyPreviewPolicyMetric || "Policy", [manualReviewLabel, compareLabel], MONSTER_SPRITE_SLOT_CHIP_OPTIONS)}
      </div>
    </div>
  `;
}

function renderMonsterSpriteSlotGroup(group, detailText, statusLabels, fileStatusLabels) {
  return `
    <article class="editor-monster-sprite-group" data-fallback-mode="${escapeAttribute(group.dominantFallbackMode || "")}">
      <div class="editor-monster-sprite-group-head">
        <div>
          <h4>${escapeHtml(group.monsterName || group.monsterId)}</h4>
          <span>${escapeHtml(group.monsterId)}</span>
        </div>
        <strong>${escapeHtml(`${group.assignedSlots}/${group.rows.length}`)}</strong>
      </div>
      ${renderMonsterSpriteFallbackChips(group.fallbackModeSummary, detailText, "editor-monster-sprite-group-modes")}
      <div class="editor-monster-sprite-pose-grid">
        ${group.rows.map((row) => renderMonsterSpriteSlotPose(row, detailText, statusLabels, fileStatusLabels)).join("")}
      </div>
    </article>
  `;
}

function renderMonsterSpriteFallbackSummary(report = {}, detailText = {}) {
  const summary = report.fallbackModeSummary || [];
  if (!summary.length) return "";
  return `
    <div class="editor-monster-sprite-fallback-summary">
      <div>
        <strong>${escapeHtml(detailText.fallbackSummaryTitle || "Fallback summary")}</strong>
        <span>${escapeHtml(detailText.fallbackSummaryDescription || "")}</span>
      </div>
      ${renderMonsterSpriteFallbackChips(summary, detailText, "editor-monster-sprite-fallback-chips")}
    </div>
  `;
}

function renderMonsterSpriteFallbackChips(summary = [], detailText = {}, className = "editor-monster-sprite-fallback-chips") {
  const labels = detailText.fallbackModeLabels || {};
  return `
    <div class="${escapeAttribute(className)}">
      ${summary.map((entry) => `
        <span data-fallback-mode="${escapeAttribute(entry.mode)}" data-count="${escapeAttribute(String(entry.count || 0))}">
          <b>${escapeHtml(labels[entry.mode] || entry.mode)}</b>
          <em>${escapeHtml(String(entry.count || 0))}</em>
        </span>
      `).join("")}
    </div>
  `;
}

function renderMonsterSpriteSlotPose(row, detailText, statusLabels, fileStatusLabels) {
  const status = statusLabels[row.status] || row.status;
  const fileStatus = fileStatusLabels[row.fileStatus] || row.fileStatus;
  const fallbackMode = detailText.fallbackModeLabels?.[row.runtimeFallbackMode] || row.runtimeFallbackMode;
  const assetValue = row.assetId || "-";
  const runtimePath = row.resolvedPath || "-";
  const runtimePreviewPath = row.runtimePreviewPath || "-";
  return `
    <div class="editor-monster-sprite-pose" data-status="${escapeAttribute(row.status)}">
      <div>
        <strong>${escapeHtml(row.pose)}</strong>
        <span>${escapeHtml(status)}</span>
      </div>
      ${editorChipBlock(detailText.expectedPath, [row.expectedPath], MONSTER_SPRITE_SLOT_CHIP_OPTIONS)}
      ${editorChipBlock(detailText.fileStatus, [fileStatus], MONSTER_SPRITE_SLOT_CHIP_OPTIONS)}
      ${editorChipBlock(detailText.fallbackMode || "Fallback", [fallbackMode], MONSTER_SPRITE_SLOT_CHIP_OPTIONS)}
      ${editorChipBlock(detailText.assignedAsset, [assetValue], MONSTER_SPRITE_SLOT_CHIP_OPTIONS)}
      ${!row.assetId ? editorChipBlock(detailText.suggestedAsset, [row.draftAssetId], MONSTER_SPRITE_SLOT_CHIP_OPTIONS) : ""}
      ${!row.assetId ? editorChipBlock(detailText.defaultSlot || "Default slot", [row.defaultSlotKey || "-"], MONSTER_SPRITE_SLOT_CHIP_OPTIONS) : ""}
      ${!row.assetId ? editorChipBlock(detailText.slotPatch, [row.slotPatchPath], MONSTER_SPRITE_SLOT_CHIP_OPTIONS) : ""}
      ${row.runtimePreviewPath ? editorChipBlock(detailText.runtimePreview || "Runtime preview", [runtimePreviewPath], MONSTER_SPRITE_SLOT_CHIP_OPTIONS) : ""}
      ${row.resolvedPath ? editorChipBlock(detailText.runtimePath, [runtimePath], MONSTER_SPRITE_SLOT_CHIP_OPTIONS) : ""}
    </div>
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
  return escapeHtml(value).replaceAll("`", "&#096;");
}
