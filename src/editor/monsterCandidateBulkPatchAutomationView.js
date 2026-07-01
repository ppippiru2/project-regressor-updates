import { tf } from "../localization/index.js?v=675";
import { editorChip, editorChipBlock } from "./editorChipBlockView.js?v=675";
import { editorFallbackLabel } from "./editorLabelFormatters.js?v=675";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=675";

export const MONSTER_CANDIDATE_BULK_PATCH_AUTOMATION_VIEW_VERSION = "monster-candidate-bulk-patch-automation-view-v1";
const MONSTER_CANDIDATE_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderMonsterCandidateBulkPatchAutomation(preview, detailText = {}) {
  const text = detailText.monsterCandidateBulkPatchAutomation || {};
  const summary = preview.summary || {};
  const metrics = [
    [text.candidates || "Candidates", `${summary.candidateCount || 0}`],
    [text.liveCovered || "Live covered", `${summary.liveCoveredCount || 0}`],
    [text.surfaces || "Surfaces", `${summary.surfaceCount || 0}`],
    [text.coveredSurfaces || "Covered", `${summary.coveredSurfaceCount || 0}/${summary.generatedSurfaceCount || 0}`],
    [text.needsDraft || "Needs draft", `${summary.needsDraftCount || 0}`],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-monster-candidate-bulk-automation" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Monster Candidate Bulk Patch Automation")}">
      <div class="editor-monster-candidate-bulk-automation-head">
        <div>
          <h4>${escapeHtml(text.title || "Monster Candidate Bulk Patch Automation")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only automation surface for bulk monster live promotion.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateBulkPatchAutomation.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-monster-candidate-bulk-automation-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      ${editorChipBlock(text.inputFields || "Input fields", preview.templateInputFields || [], MONSTER_CANDIDATE_CHIP_OPTIONS)}
      ${editorChipBlock(text.targetSurfaces || "Target surfaces", (preview.surfaces || []).map((surface) => `${surface.output}: ${surface.file}`), MONSTER_CANDIDATE_CHIP_OPTIONS)}
      <div class="editor-monster-candidate-bulk-automation-list">
        ${(preview.rows || []).map((row) => renderMonsterCandidateBulkPatchAutomationRow(row, text)).join("") || `<p class="muted">${escapeHtml(text.noRows || "No automation rows.")}</p>`}
      </div>
    </section>
  `;
}

function renderMonsterCandidateBulkPatchAutomationRow(row, text = {}) {
  const surfaceLabels = (row.surfaces || []).map((surface) => `${editorFallbackLabel(surface.id, text.surfaceLabels)}: ${editorFallbackLabel(surface.state, text.stateLabels)}`);
  const patchValues = [
    `${text.balance || "Balance"}: ${row.monsterBalanceEntry?.id || row.id}`,
    `${text.world || "World"}: ${row.worldDataPatch?.action || "-"}`,
    `${text.spriteSlots || "Sprite slots"}: ${(row.spriteSlotBucketPatch?.poseKeys || []).join(" / ") || "-"}`,
    `${text.runtimePreset || "Runtime preset"}: ${row.battleSpritePresetDraft?.classId || "-"}`,
    `${text.cssSelector || "CSS selector"}: ${row.runtimeCssSelector || "-"}`,
  ];
  return `
    <article class="editor-monster-candidate-bulk-automation-row" data-state="${escapeAttribute(row.coverageState || "unknown")}">
      <div class="editor-monster-candidate-bulk-automation-row-head">
        <div>
          <h5>${escapeHtml(row.name || row.id || "")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateBulkPatchAutomation.rowMeta", {
            region: row.regionId || "-",
            representative: row.representativeMonsterId || "-"
          }, `${row.regionId || "-"} / ${row.representativeMonsterId || "-"}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${editorChip(editorFallbackLabel(row.coverageState, text.stateLabels), MONSTER_CANDIDATE_CHIP_OPTIONS)}
          ${editorChip(row.isLive ? (text.live || "Live") : (text.pending || "Pending"), MONSTER_CANDIDATE_CHIP_OPTIONS)}
        </div>
      </div>
      <div class="editor-monster-candidate-bulk-automation-grid">
        ${editorChipBlock(text.inputSummary || "Input summary", [
          `${text.level || "Level"} ${row.input?.level || 0}`,
          ...(row.input?.tags || []),
          row.input?.rewardLink?.codexFragmentId || "",
        ].filter(Boolean), MONSTER_CANDIDATE_CHIP_OPTIONS)}
        ${editorChipBlock(text.surfaceStates || "Surface states", surfaceLabels, MONSTER_CANDIDATE_CHIP_OPTIONS)}
        ${editorChipBlock(text.generatedPatches || "Generated patches", patchValues, MONSTER_CANDIDATE_CHIP_OPTIONS)}
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
  return escapeHtml(value).replaceAll("`", "&#096;");
}
