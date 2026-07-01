import { tf } from "../localization/index.js?v=681";
import { editorChip, editorChipBlock } from "./editorChipBlockView.js?v=681";
import { editorFallbackLabel } from "./editorLabelFormatters.js?v=681";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=681";

export const MONSTER_CANDIDATE_LIVE_PROMOTION_VIEW_VERSION = "monster-candidate-live-promotion-view-v1";
const MONSTER_CANDIDATE_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderMonsterCandidateLivePromotionPlan(plan, detailText = {}) {
  const text = detailText.monsterCandidateLivePromotion || {};
  const summary = plan.summary || {};
  const metrics = [
    [text.candidates || "Candidates", `${summary.candidateCount || 0}`],
    [text.phases || "Phases", `${summary.phaseCount || 0}`],
    [text.regions || "Regions", `${summary.regionCount || 0}`],
    [text.deferred || "Deferred", `${summary.deferredCandidateCount || 0}`],
    [text.writes || "Writes", plan.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];

  return `
    <section class="editor-monster-candidate-live-promotion" data-readonly="${plan.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Monster Candidate Live Promotion Plan")}">
      <div class="editor-monster-candidate-live-promotion-head">
        <div>
          <h4>${escapeHtml(text.title || "Monster Candidate Live Promotion Plan")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only live-data promotion phases for complete reward candidates.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateLivePromotion.version", {
          version: plan.version || "-"
        }, plan.version || "-"))}</strong>
      </div>
      <div class="editor-monster-candidate-live-promotion-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      <div class="editor-monster-candidate-live-promotion-phases">
        ${(plan.phases || []).map((phase) => renderMonsterCandidateLivePromotionPhase(phase, text, detailText)).join("") || `<p class="muted">${escapeHtml(text.noRows || "No promotion-ready candidates.")}</p>`}
      </div>
      ${renderMonsterCandidateLivePromotionDeferred(plan.deferredRows || [], text, detailText)}
    </section>
  `;
}

function renderMonsterCandidateLivePromotionPhase(phase, text = {}, detailText = {}) {
  return `
    <article class="editor-monster-candidate-live-promotion-phase" data-phase="${escapeAttribute(phase.id || "")}">
      <div class="editor-monster-candidate-live-promotion-phase-head">
        <div>
          <h5>${escapeHtml(monsterCandidateLivePromotionPhaseTitle(phase, text))}</h5>
          <p>${escapeHtml(editorFallbackLabel(phase.priority, text.priorityLabels, ""))}</p>
        </div>
        <span>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateLivePromotion.phaseCandidateCount", {
          count: phase.candidateCount || 0
        }, `${phase.candidateCount || 0}`))}</span>
      </div>
      <div class="editor-monster-candidate-live-promotion-row-list">
        ${(phase.rows || []).map((row) => renderMonsterCandidateLivePromotionRow(row, text, detailText)).join("")}
      </div>
    </article>
  `;
}

function renderMonsterCandidateLivePromotionRow(row, text = {}, detailText = {}) {
  const promotionText = detailTextForPromotion(detailText, text);
  const roles = [
    editorFallbackLabel(row.planState, text.stateLabels),
    editorFallbackLabel(row.promotionStageId, promotionText.stageLabels),
    row.regionName || row.regionId || "",
  ].filter(Boolean);
  const actionLabels = (row.nextActionIds || []).map((actionId) => editorFallbackLabel(actionId, promotionText.actionLabels, ""));

  return `
    <article class="editor-monster-candidate-live-promotion-row" data-state="${escapeAttribute(row.planState || "unknown")}">
      <div class="editor-monster-candidate-live-promotion-row-head">
        <div>
          <h6>${escapeHtml(row.name || row.id || "")}</h6>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateLivePromotion.rowMeta", {
            level: row.level || 0,
            source: row.sourceMonsterName || row.sourceMonsterId || "-"
          }, `Level ${row.level || 0} / source ${row.sourceMonsterName || row.sourceMonsterId || "-"}`))}</p>
        </div>
        <div class="editor-chip-list">${roles.map((role) => editorChip(role, MONSTER_CANDIDATE_CHIP_OPTIONS)).join("")}</div>
      </div>
      <div class="editor-monster-candidate-live-promotion-grid">
        ${editorChipBlock(text.rewardLinks || "Reward links", row.rewardItemIds?.length ? row.rewardItemIds : [text.emptyReward || "None"], MONSTER_CANDIDATE_CHIP_OPTIONS)}
        ${editorChipBlock(text.targetFiles || "Target files", row.targetFiles || [], MONSTER_CANDIDATE_CHIP_OPTIONS)}
        ${editorChipBlock(text.nextActions || "Next actions", actionLabels, MONSTER_CANDIDATE_CHIP_OPTIONS)}
      </div>
    </article>
  `;
}

function renderMonsterCandidateLivePromotionDeferred(rows = [], text = {}, detailText = {}) {
  if (!rows.length) {
    return `<p class="muted">${escapeHtml(text.noDeferred || "No deferred candidates.")}</p>`;
  }
  return `
    <div class="editor-monster-candidate-live-promotion-deferred">
      <div>
        <strong>${escapeHtml(text.deferredTitle || "Deferred candidates")}</strong>
        <p>${escapeHtml(text.deferredDescription || "Candidates with partial reward links stay outside live-data promotion.")}</p>
      </div>
      <div class="editor-monster-candidate-live-promotion-row-list">
        ${rows.map((row) => renderMonsterCandidateLivePromotionDeferredRow(row, text, detailText)).join("")}
      </div>
    </div>
  `;
}

function renderMonsterCandidateLivePromotionDeferredRow(row, text = {}, detailText = {}) {
  const promotionText = detailTextForPromotion(detailText, text);
  const roles = [
    editorFallbackLabel(row.planState, text.stateLabels),
    editorFallbackLabel(row.promotionStageId, promotionText.stageLabels),
  ].filter(Boolean);
  const missingLabels = (row.missingRewardTypes || []).map((type) => text.rewardTypeLabels?.[type] || type);

  return `
    <article class="editor-monster-candidate-live-promotion-row" data-state="${escapeAttribute(row.planState || "deferred")}">
      <div class="editor-monster-candidate-live-promotion-row-head">
        <div>
          <h6>${escapeHtml(row.name || row.id || "")}</h6>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateLivePromotion.rowMeta", {
            level: row.level || 0,
            source: row.sourceMonsterName || row.sourceMonsterId || "-"
          }, `Level ${row.level || 0} / source ${row.sourceMonsterName || row.sourceMonsterId || "-"}`))}</p>
        </div>
        <div class="editor-chip-list">${roles.map((role) => editorChip(role, MONSTER_CANDIDATE_CHIP_OPTIONS)).join("")}</div>
      </div>
      <div class="editor-monster-candidate-live-promotion-grid">
        ${editorChipBlock(text.rewardLinks || "Reward links", row.rewardItemIds?.length ? row.rewardItemIds : [text.emptyReward || "None"], MONSTER_CANDIDATE_CHIP_OPTIONS)}
        ${editorChipBlock(text.deferredMissing || "Missing reward links", missingLabels.length ? missingLabels : [text.noMissing || "None"], MONSTER_CANDIDATE_CHIP_OPTIONS)}
      </div>
    </article>
  `;
}

function monsterCandidateLivePromotionPhaseTitle(phase, text = {}) {
  return text.phaseLabels?.[phase.id] || tf("editorPrep.balanceTuningDetail.monsterCandidateLivePromotion.phaseLabel", {
    order: phase.order || 0
  }, `Phase ${phase.order || 0}`);
}

function detailTextForPromotion(detailText = {}, text = {}) {
  return {
    ...(detailText.monsterCandidatePromotion || {}),
    ...(text.promotionLabels || {}),
  };
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
