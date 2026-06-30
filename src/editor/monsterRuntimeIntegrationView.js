import { t } from "../localization/index.js?v=675";

export const MONSTER_RUNTIME_INTEGRATION_VIEW_VERSION = "monster-runtime-integration-view-v1";

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
        ${monsterRuntimeSummaryCard(detailText.presetMetric || "Runtime presets", String(summary.runtimePresets || 0))}
        ${monsterRuntimeSummaryCard(detailText.mappedMetric || "Mapped monsters", String(summary.mappedMonsters || 0))}
        ${monsterRuntimeSummaryCard(detailText.actionMetric || "Action patterns", String(summary.actionPatterns || 0))}
        ${monsterRuntimeSummaryCard(detailText.waitingFileMetric || "Waiting files", String(summary.waitingSpriteFiles || 0))}
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
        ${monsterRuntimeFieldBlock(detailText.cardMetric || "Battle card", [row.cardSlot, row.runtimeClass, row.pivot])}
        ${monsterRuntimeFieldBlock(detailText.scaleMetric || "Scale", [
          `${detailText.packScaleLabel || "Pack"} ${row.sourceInitialScale}`,
          `${detailText.currentScaleLabel || "Current"} ${row.currentRuntimeScale}`,
        ])}
        ${monsterRuntimeFieldBlock(detailText.motionMetric || "Motion", (row.motions || []).map((motion) => `${motion.phase}: ${motion.externalMotionId} -> ${motion.runtimeMotionId}`))}
        ${monsterRuntimeFieldBlock(detailText.actionListMetric || "Actions", (row.actions || []).map((action) => {
          const label = action.nameKey ? t(action.nameKey, action.id) : action.id;
          const optionalLabel = action.optional ? ` ${detailText.optionalTag || "optional"}` : "";
          return `${label} - ${action.effectType}${optionalLabel}`;
        }))}
        ${monsterRuntimeFieldBlock(detailText.waitingFileListMetric || "Waiting files", row.missingSpriteFiles?.length ? row.missingSpriteFiles : [noMissingLabel])}
      </div>
    </article>
  `;
}

function monsterRuntimeSummaryCard(label, value) {
  return `
    <span>
      <small>${escapeHtml(label)}</small>
      <b>${escapeHtml(value)}</b>
    </span>
  `;
}

function monsterRuntimeFieldBlock(title, values = []) {
  return `
    <div class="editor-combat-vfx-chip-block">
      <span>${escapeHtml(title)}</span>
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
