import { tf } from "../localization/index.js?v=675";

export const MONSTER_CANDIDATE_PROMOTION_VIEW_VERSION = "monster-candidate-promotion-view-v1";

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
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
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
            <b>${escapeHtml(monsterCandidatePromotionActionLabel(action.id, text))}</b>
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
    monsterCandidatePromotionStageLabel(row.promotionStageId, text),
    row.isBoss ? (text.boss || "Boss") : "",
  ].filter(Boolean);
  const actionLabels = (row.requiredActionIds || []).map((actionId) => monsterCandidatePromotionActionLabel(actionId, text));
  const riskLabels = (row.riskSignalIds || []).map((signalId) => monsterCandidatePromotionRiskLabel(signalId, text));

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
        <div class="editor-chip-list">${roles.map((role) => chip(role)).join("")}</div>
      </div>
      <div class="editor-monster-candidate-promotion-grid">
        ${monsterCandidatePromotionChipBlock(text.promotionStage || "Promotion stage", [monsterCandidatePromotionStageLabel(row.promotionStageId, text)])}
        ${monsterCandidatePromotionChipBlock(text.actionPlan || "Actions", actionLabels)}
        ${monsterCandidatePromotionChipBlock(text.rewardLinks || "Reward links", row.rewardItemIds?.length ? row.rewardItemIds : [text.emptyReward || "None"])}
        ${monsterCandidatePromotionChipBlock(text.rewardCoverage || "Reward coverage", monsterCandidatePromotionRewardCoverageValues(row, text))}
        ${monsterCandidatePromotionChipBlock(text.codexRecord || "Codex record", monsterCandidatePromotionCodexRecordValues(row, text))}
        ${monsterCandidatePromotionChipBlock(text.risks || "Signals", riskLabels.length ? riskLabels : [text.noRisks || "No blocking signals"])}
      </div>
    </article>
  `;
}

function monsterCandidatePromotionActionLabel(actionId, text = {}) {
  return text.actionLabels?.[actionId] || actionId;
}

function monsterCandidatePromotionRiskLabel(signalId, text = {}) {
  return text.riskLabels?.[signalId] || signalId;
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

function monsterCandidatePromotionStageLabel(stageId, text = {}) {
  return text.stageLabels?.[stageId] || stageId || "unknown";
}

function monsterCandidatePromotionChipBlock(title, values = []) {
  return `
    <div class="editor-balance-chip-block">
      <span>${escapeHtml(title)}</span>
      <div class="editor-chip-list">${values.map((value) => chip(value)).join("")}</div>
    </div>
  `;
}

function chip(value) {
  return `<span class="editor-chip">${escapeHtml(String(value))}</span>`;
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
