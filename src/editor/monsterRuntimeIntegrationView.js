import { t } from "../localization/index.js?v=677";
import { editorChipBlock } from "./editorChipBlockView.js?v=677";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=677";

export const MONSTER_RUNTIME_INTEGRATION_VIEW_VERSION = "monster-runtime-integration-view-v1";
const MONSTER_RUNTIME_CHIP_OPTIONS = {
  blockClass: "editor-combat-vfx-chip-block",
  chipClass: "editor-chip",
  filterEmpty: true,
};

export function renderMonsterRuntimeIntegrationView(preview, detailText = {}) {
  const summary = preview?.summary || {};
  return `
    <section class="editor-monster-runtime-preview" aria-label="${escapeAttribute(detailText.title || "Monster runtime integration")}">
      <div class="editor-monster-runtime-head">
        <div>
          <h3>${escapeHtml(detailText.title || "Monster runtime integration")}</h3>
          <p class="muted">${escapeHtml(detailText.description || "")}</p>
        </div>
        <span>${escapeHtml(preview?.sourcePack || "")}</span>
      </div>
      <div class="editor-monster-sprite-summary">
        ${renderEditorSummaryCard(detailText.presetMetric || "Runtime presets", String(summary.runtimePresets || 0))}
        ${renderEditorSummaryCard(detailText.mappedMetric || "Mapped monsters", String(summary.mappedMonsters || 0))}
        ${renderEditorSummaryCard(detailText.actionMetric || "Action patterns", String(summary.actionPatterns || 0))}
        ${renderEditorSummaryCard(detailText.waitingFileMetric || "Waiting files", String(summary.waitingSpriteFiles || 0))}
      </div>
      <div class="editor-monster-runtime-list">
        ${(preview?.rows || []).map((row) => renderMonsterRuntimeIntegrationRow(row, detailText)).join("")}
      </div>
    </section>
  `;
}

function renderMonsterRuntimeIntegrationRow(row, detailText = {}) {
  const noMissingLabel = detailText.noMissingFiles || "Transparent sprite files connectable";
  return `
    <article class="editor-monster-runtime-row" data-status="${escapeAttribute(row.mappingStatus)}" data-sprite-status="${escapeAttribute(row.spriteStatus)}">
      <div>
        <strong>${escapeHtml(row.liveMonsterName)}</strong>
        <span>${escapeHtml(row.externalMonsterId)} -> ${escapeHtml(row.liveMonsterId)}</span>
      </div>
      <div class="editor-monster-runtime-grid">
        ${editorChipBlock(detailText.cardMetric || "Battle card", [row.cardSlot, row.runtimeClass, row.pivot], MONSTER_RUNTIME_CHIP_OPTIONS)}
        ${editorChipBlock(detailText.scaleMetric || "Scale", [
          `${detailText.packScaleLabel || "Pack"} ${row.sourceInitialScale}`,
          `${detailText.currentScaleLabel || "Current"} ${row.currentRuntimeScale}`,
        ], MONSTER_RUNTIME_CHIP_OPTIONS)}
        ${editorChipBlock(detailText.motionMetric || "Motion", (row.motions || []).map((motion) => `${motion.phase}: ${motion.externalMotionId} -> ${motion.runtimeMotionId}`), MONSTER_RUNTIME_CHIP_OPTIONS)}
        ${editorChipBlock(detailText.actionListMetric || "Actions", (row.actions || []).map((action) => {
          const label = action.nameKey ? t(action.nameKey, action.id) : action.id;
          const optionalLabel = action.optional ? ` ${detailText.optionalTag || "optional"}` : "";
          return `${label} - ${action.effectType}${optionalLabel}`;
        }), MONSTER_RUNTIME_CHIP_OPTIONS)}
        ${editorChipBlock(detailText.waitingFileListMetric || "Waiting files", row.missingSpriteFiles?.length ? row.missingSpriteFiles : [noMissingLabel], MONSTER_RUNTIME_CHIP_OPTIONS)}
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
