import { tf } from "../localization/index.js?v=675";
import {
  CONTENT_BULK_ROW_TARGET_SCOPES,
  createContentBulkRowTargetId,
} from "./contentBulkPackageOverview.js?v=675";
import { contentBulkIssueList } from "./contentBulkIssueSummaryView.js?v=675";
import { renderContentBulkRowContractReviewChip } from "./contentBulkRowContractReviewView.js?v=675";
import { renderContentBulkStagedContractSummary } from "./contentBulkStagedContractSummaryView.js?v=675";

export const LOOT_SKILL_BULK_INTAKE_VIEW_VERSION = "loot-skill-bulk-intake-view-v1";

export function renderLootSkillBulkIntakePreview(preview, detailText = {}, options = {}) {
  const text = detailText.lootSkillBulkIntakePreview || {};
  const summary = preview.summary || {};
  const typeLabels = text.typeLabels || {};
  const matchesFilterRow = typeof options.matchesFilterRow === "function"
    ? options.matchesFilterRow
    : () => true;
  const visibleLootRows = (preview.lootRows || []).filter((row) => matchesFilterRow(row.intakeState, [
    row,
    lootSkillBulkLabel(row.type, typeLabels),
  ], ["loot_item"]));
  const visibleSkillRows = (preview.skillRows || []).filter((row) => matchesFilterRow(row.bulkState, row, ["skill"]));
  const metrics = [
    [text.lootRows || "Loot rows", `${summary.lootRowCount || 0}`],
    [text.skillRows || "Skill rows", `${summary.skillRowCount || 0}`],
    [text.codexFragments || "Codex fragments", `${summary.codexFragmentCount || 0}`],
    [text.manaCrystals || "Mana crystals", `${summary.manaCrystalCount || 0}`],
    [text.skillFragments || "Skill fragments", `${summary.skillFragmentCount || 0}`],
    [text.skillRunes || "Skill runes", `${summary.skillRuneCount || 0}`],
    [text.rewardLinked || "Reward linked", `${summary.rewardLinkedLootCount || 0}`],
    [text.missingSkillDefinitions || "Missing skill defs", `${summary.missingSkillDefinitionCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section id="loot-skill-bulk-intake" class="editor-loot-skill-bulk-intake" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Loot and skill bulk intake")}">
      <div class="editor-loot-skill-bulk-intake-head">
        <div>
          <h4>${escapeHtml(text.title || "Loot and skill bulk intake")}</h4>
          <p class="muted">${escapeHtml(text.description || "Classifies non-equipment loot and skill rows from the shared bulk package preview.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.lootSkillBulkIntakePreview.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-loot-skill-bulk-intake-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      ${renderContentBulkStagedContractSummary(preview.stagedContract, text)}
      <div class="editor-loot-skill-bulk-intake-list">
        ${visibleLootRows.map((row) => renderLootSkillBulkLootRow(row, text)).join("") || `<p class="muted">${escapeHtml(text.noFilteredRows || text.noLootRows || "No loot rows.")}</p>`}
      </div>
      <div class="editor-loot-skill-bulk-intake-list">
        ${visibleSkillRows.map((row) => renderLootSkillBulkSkillRow(row, text)).join("") || `<p class="muted">${escapeHtml(text.noFilteredRows || text.noSkillRows || "No skill rows.")}</p>`}
      </div>
    </section>
  `;
}

function renderLootSkillBulkLootRow(row, text = {}) {
  const stateLabels = text.stateLabels || {};
  const typeLabels = text.typeLabels || {};
  const bulkLabels = text.bulkStateLabels || {};
  return `
    <article id="${escapeAttribute(createContentBulkRowTargetId(CONTENT_BULK_ROW_TARGET_SCOPES.loot, row.id || row.type))}" class="editor-loot-skill-bulk-intake-row" data-state="${escapeAttribute(row.intakeState || "unknown")}">
      <div class="editor-loot-skill-bulk-intake-row-head">
        <div>
          <h5>${escapeHtml(row.id || "-")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.lootSkillBulkIntakePreview.lootMeta", {
            type: lootSkillBulkLabel(row.type, typeLabels),
            rarity: row.rarity || "-",
            state: lootSkillBulkLabel(row.bulkState, bulkLabels),
          }, `${row.type || "-"} / ${row.rarity || "-"}`))}</p>
        </div>
        <span>${escapeHtml(lootSkillBulkLabel(row.intakeState, stateLabels))}</span>
      </div>
      <div class="editor-loot-skill-bulk-intake-grid">
        ${lootSkillBulkChipBlock(text.skillLink || "Skill link", [row.skillId || (text.none || "None")])}
        ${lootSkillBulkChipBlock(text.dropSource || "Drop source", [row.dropSource || (text.globalSource || "Global")])}
        ${lootSkillBulkChipBlock(text.codexRecordTarget || "Codex target", row.recordTarget > 0 ? [`${row.recordTarget}`] : [])}
        ${lootSkillBulkChipBlock(text.rewardLink || "Reward link", [row.rewardLinked ? (text.linked || "Linked") : (text.unlinked || "Unlinked")])}
        ${renderContentBulkRowContractReviewChip(row.contractReview, text)}
        ${lootSkillBulkChipBlock(text.targetSurfaces || "Target surfaces", [`${row.targetSurfaceCount || 0}`])}
        ${lootSkillBulkChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(row.blockingIssueCodes, text))}
        ${lootSkillBulkChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(row.warningIssueCodes, text))}
      </div>
    </article>
  `;
}

function renderLootSkillBulkSkillRow(row, text = {}) {
  const bulkLabels = text.bulkStateLabels || {};
  return `
    <article id="${escapeAttribute(createContentBulkRowTargetId(CONTENT_BULK_ROW_TARGET_SCOPES.skill, row.id || row.type))}" class="editor-loot-skill-bulk-intake-row" data-state="${escapeAttribute(row.bulkState || "unknown")}">
      <div class="editor-loot-skill-bulk-intake-row-head">
        <div>
          <h5>${escapeHtml(row.id || "-")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.lootSkillBulkIntakePreview.skillMeta", {
            type: row.type || "-",
            mp: row.mpCost || 0,
            cooldown: row.cooldown || 0,
            state: lootSkillBulkLabel(row.bulkState, bulkLabels),
          }, `${row.type || "-"} / ${row.mpCost || 0}`))}</p>
        </div>
        <span>${escapeHtml(lootSkillBulkLabel(row.bulkState, bulkLabels))}</span>
      </div>
      <div class="editor-loot-skill-bulk-intake-grid">
        ${lootSkillBulkChipBlock(text.damageType || "Damage", [row.damageType || "-"])}
        ${lootSkillBulkChipBlock(text.effectType || "Effect", [row.effectType || "-"])}
        ${lootSkillBulkChipBlock(text.stances || "Stances", row.stanceAllowed || [])}
        ${renderContentBulkRowContractReviewChip(row.contractReview, text)}
        ${lootSkillBulkChipBlock(text.targetSurfaces || "Target surfaces", [`${row.targetSurfaceCount || 0}`])}
        ${lootSkillBulkChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(row.blockingIssueCodes, text))}
        ${lootSkillBulkChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(row.warningIssueCodes, text))}
      </div>
    </article>
  `;
}

function lootSkillBulkLabel(id, labels = {}) {
  return labels?.[id] || id || "unknown";
}

function lootSkillBulkChipBlock(title, values = []) {
  return `
    <div class="editor-balance-chip-block">
      <span>${escapeHtml(title)}</span>
      <div class="editor-chip-list">${values.map((value) => `<span>${escapeHtml(value)}</span>`).join("")}</div>
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
  return escapeHtml(value);
}
