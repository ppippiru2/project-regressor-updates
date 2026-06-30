export const MONSTER_SPRITE_SLOT_REPORT_VIEW_VERSION = "monster-sprite-slot-report-view-v1";

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
        ${monsterSpriteSummaryCard(detailText.slotMetric, String(totals.slots || 0))}
        ${monsterSpriteSummaryCard(detailText.assignedMetric, String(totals.assignedSlots || 0))}
        ${monsterSpriteSummaryCard(detailText.connectableMetric, String(totals.connectableSlots || 0))}
        ${monsterSpriteSummaryCard(detailText.missingMetric, String(totals.missingSlots || 0))}
        ${monsterSpriteSummaryCard(detailText.fileScanMetric, String(totals.fileReadySlots || 0))}
        ${monsterSpriteSummaryCard(detailText.fallbackMetric, String(totals.cssPlaceholderSlots || 0))}
        ${monsterSpriteSummaryCard(detailText.brokenMetric, String(totals.brokenSlots || 0))}
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
        ${monsterSpriteSummaryCard(detailText.readyPatchMetric || "Ready patches", String(readySlotPatches))}
        ${monsterSpriteSummaryCard(detailText.readyManifestMetric || "Manifest entries", String(readyManifestEntries))}
        ${monsterSpriteSummaryCard(detailText.readyFileMetric || "Ready files", String(readyFiles))}
        ${monsterSpriteSummaryCard(detailText.missingFileMetric || "Missing files", String(missingFiles))}
        ${monsterSpriteSummaryCard(detailText.applyModeMetric || "Apply mode", applyMode)}
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
        ${monsterSpriteFieldBlock(detailText.handoffArtifactMetric || "Artifact", [readiness.missingFileHandoffArtifact])}
        ${monsterSpriteFieldBlock(detailText.handoffScriptMetric || "Script", [readiness.missingFileHandoffExportScript || "-"])}
        ${monsterSpriteFieldBlock(detailText.handoffMissingMetric || "Missing files", [String(readiness.missingFileHandoffMissingFiles ?? "-")])}
        ${monsterSpriteFieldBlock(detailText.handoffGroupsMetric || "Monster groups", [String(readiness.missingFileHandoffMonsterGroups ?? "-")])}
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
        ${monsterSpriteFieldBlock(detailText.applyPreviewArtifactMetric || "Artifact", [readiness.applyPreviewArtifact])}
        ${monsterSpriteFieldBlock(detailText.applyPreviewScriptMetric || "Script", [readiness.applyPreviewExportScript || "-"])}
        ${monsterSpriteFieldBlock(detailText.applyPreviewStatusMetric || "Status", [statusLabel])}
        ${monsterSpriteFieldBlock(detailText.applyPreviewReadyPatchMetric || "Ready patches", [String(readiness.applyPreviewReadyPatchCount ?? "-")])}
        ${monsterSpriteFieldBlock(detailText.applyPreviewPolicyMetric || "Policy", [manualReviewLabel, compareLabel])}
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
      ${monsterSpriteFieldBlock(detailText.expectedPath, [row.expectedPath])}
      ${monsterSpriteFieldBlock(detailText.fileStatus, [fileStatus])}
      ${monsterSpriteFieldBlock(detailText.fallbackMode || "Fallback", [fallbackMode])}
      ${monsterSpriteFieldBlock(detailText.assignedAsset, [assetValue])}
      ${!row.assetId ? monsterSpriteFieldBlock(detailText.suggestedAsset, [row.draftAssetId]) : ""}
      ${!row.assetId ? monsterSpriteFieldBlock(detailText.defaultSlot || "Default slot", [row.defaultSlotKey || "-"]) : ""}
      ${!row.assetId ? monsterSpriteFieldBlock(detailText.slotPatch, [row.slotPatchPath]) : ""}
      ${row.runtimePreviewPath ? monsterSpriteFieldBlock(detailText.runtimePreview || "Runtime preview", [runtimePreviewPath]) : ""}
      ${row.resolvedPath ? monsterSpriteFieldBlock(detailText.runtimePath, [runtimePath]) : ""}
    </div>
  `;
}

function monsterSpriteSummaryCard(label, value) {
  return `
    <span>
      <small>${escapeHtml(label || "")}</small>
      <b>${escapeHtml(value)}</b>
    </span>
  `;
}

function monsterSpriteFieldBlock(title, values = []) {
  return `
    <div class="editor-combat-vfx-chip-block">
      <span>${escapeHtml(title || "")}</span>
      <div class="editor-chip-list">${values.filter(Boolean).map((value) => chip(value)).join("")}</div>
    </div>
  `;
}

function chip(value) {
  return `<span class="editor-chip">${escapeHtml(value)}</span>`;
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
