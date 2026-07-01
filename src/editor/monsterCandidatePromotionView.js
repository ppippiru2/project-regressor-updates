import { tf } from "../localization/index.js?v=675";
import { editorChip, editorChipBlock } from "./editorChipBlockView.js?v=675";
import { editorFallbackLabel } from "./editorLabelFormatters.js?v=675";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=675";

export const MONSTER_CANDIDATE_PROMOTION_VIEW_VERSION = "monster-candidate-promotion-view-v1";
const MONSTER_CANDIDATE_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderMonsterCandidatePromotionChecklist(checklist, detailText = {}) {
  const text = detailText.monsterCandidatePromotion || {};
  const summary = checklist.summary || {};
  const metrics = [
    [text.pending || "Pending", `${summary.pendingCandidateCount || 0}`],
    [text.ready || "Ready", `${summary.readyReviewCount || 0}`],
    [text.actions || "Actions", `${summary.requiredActionCount || 0}`],
    [text.rewardLinks || "Reward links", `${summary.uniqueRewardItemCount || 0}`],
    [text.codexRecord || "Codex record", `${summary.codexRecordTargetCount || 0}`],
    [text.fullRewardLinks || "Full links", `${summary.fullRewardLinkCount || 0}`],
    [text.partialRewardLinks || "Partial links", `${summary.partialRewardLinkCount || 0}`],
    [text.risks || "Signals", `${summary.riskSignalCount || 0}`],
  ];

  return `
    <section class="editor-monster-candidate-promotion" data-readonly="${checklist.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Monster Candidate Promotion Checklist")}">
      <div class="editor-monster-candidate-promotion-head">
        <div>
          <h4>${escapeHtml(text.title || "Monster Candidate Promotion Checklist")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only checklist before moving pending candidates into live drops.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidatePromotion.version", {
          version: checklist.version || "-"
        }, checklist.version || "-"))}</strong>
      </div>
      <div class="editor-monster-candidate-promotion-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      ${renderMonsterCandidatePromotionActions(checklist.requiredActions || [], text)}
      <div class="editor-monster-candidate-promotion-groups">
        ${(checklist.groups || []).map((group) => renderMonsterCandidatePromotionGroup(group, text)).join("") || `<p class="muted">${escapeHtml(text.empty || "No pending candidates.")}</p>`}
      </div>
    </section>
  `;
}

function renderMonsterCandidatePromotionActions(actions = [], text = {}) {
  if (!actions.length) return "";
  return `
    <div class="editor-monster-candidate-promotion-actions">
      <strong>${escapeHtml(text.actionPlan || "Promotion action plan")}</strong>
      <div>
        ${actions.map((action) => `
          <span>
            <b>${escapeHtml(editorFallbackLabel(action.id, text.actionLabels, ""))}</b>
            <small>${escapeHtml(action.file || "")}</small>
          </span>
        `).join("")}
      </div>
    </div>
  `;
}

function renderMonsterCandidatePromotionGroup(group, text = {}) {
  return `
    <article class="editor-monster-candidate-promotion-group">
      <div class="editor-monster-candidate-promotion-group-head">
        <div>
          <h5>${escapeHtml(group.regionName || group.regionId || "")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidatePromotion.representative", {
            monster: group.representativeMonsterName || group.representativeMonsterId || "-"
          }, `Representative ${group.representativeMonsterName || group.representativeMonsterId || "-"}`))}</p>
        </div>
        <span>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidatePromotion.groupSummary", {
          pending: group.pendingCount || 0,
          ready: group.readyReviewCount || 0
        }, `${group.readyReviewCount || 0}/${group.pendingCount || 0}`))}</span>
      </div>
      <div class="editor-monster-candidate-promotion-row-list">
        ${(group.rows || []).map((row) => renderMonsterCandidatePromotionRow(row, text)).join("")}
      </div>
    </article>
  `;
}

function renderMonsterCandidatePromotionRow(row, text = {}) {
  const roles = [
    row.readyForReview ? (text.readyForReview || "Ready for review") : (text.blocked || "Blocked"),
    editorFallbackLabel(row.promotionStageId, text.stageLabels),
    row.isBoss ? (text.boss || "Boss") : "",
  ].filter(Boolean);
  const actionLabels = (row.requiredActionIds || []).map((actionId) => editorFallbackLabel(actionId, text.actionLabels, ""));
  const riskLabels = (row.riskSignalIds || []).map((signalId) => editorFallbackLabel(signalId, text.riskLabels, ""));

  return `
    <article class="editor-monster-candidate-promotion-row" data-state="${row.readyForReview ? "ready" : "blocked"}" data-stage="${escapeAttribute(row.promotionStageId || "unknown")}">
      <div class="editor-monster-candidate-promotion-row-head">
        <div>
          <h6>${escapeHtml(row.name || row.id || "")}</h6>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidatePromotion.rowMeta", {
            level: row.level || 0,
            source: row.sourceMonsterName || row.sourceMonsterId || "-"
          }, `Level ${row.level || 0} / source ${row.sourceMonsterName || row.sourceMonsterId || "-"}`))}</p>
        </div>
        <div class="editor-chip-list">${roles.map((role) => editorChip(role, MONSTER_CANDIDATE_CHIP_OPTIONS)).join("")}</div>
      </div>
      <div class="editor-monster-candidate-promotion-grid">
        ${editorChipBlock(text.promotionStage || "Promotion stage", [editorFallbackLabel(row.promotionStageId, text.stageLabels)], MONSTER_CANDIDATE_CHIP_OPTIONS)}
        ${editorChipBlock(text.actionPlan || "Actions", actionLabels, MONSTER_CANDIDATE_CHIP_OPTIONS)}
        ${editorChipBlock(text.rewardLinks || "Reward links", row.rewardItemIds?.length ? row.rewardItemIds : [text.emptyReward || "None"], MONSTER_CANDIDATE_CHIP_OPTIONS)}
        ${editorChipBlock(text.rewardCoverage || "Reward coverage", monsterCandidatePromotionRewardCoverageValues(row, text), MONSTER_CANDIDATE_CHIP_OPTIONS)}
        ${editorChipBlock(text.codexRecord || "Codex record", monsterCandidatePromotionCodexRecordValues(row, text), MONSTER_CANDIDATE_CHIP_OPTIONS)}
        ${editorChipBlock(text.risks || "Signals", riskLabels.length ? riskLabels : [text.noRisks || "No blocking signals"], MONSTER_CANDIDATE_CHIP_OPTIONS)}
      </div>
    </article>
  `;
}

function monsterCandidatePromotionCodexRecordValues(row, text = {}) {
  if (!row.codexRecord) return [text.codexRecordMissing || "No codex record target"];
  return [
    tf("editorPrep.balanceTuningDetail.monsterCandidatePromotion.codexRecordTarget", {
      item: row.codexRecord.itemName || row.codexRecord.itemId || "-",
      target: row.codexRecord.target || 0
    }, `${row.codexRecord.itemName || row.codexRecord.itemId || "-"} / ${row.codexRecord.target || 0}`),
  ];
}

function monsterCandidatePromotionRewardCoverageValues(row, text = {}) {
  const coverage = row.rewardCoverage || {};
  const labels = text.coverageLabels || {};
  return [
    `${labels.codex || "Codex"}: ${coverage.codex ? (labels.connected || "Connected") : (labels.missing || "Missing")}`,
    `${labels.material || "Material"}: ${coverage.material ? (labels.connected || "Connected") : (labels.missing || "Missing")}`,
    `${labels.skill || "Skill"}: ${coverage.skill ? (labels.connected || "Connected") : (labels.missing || "Missing")}`,
  ];
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
