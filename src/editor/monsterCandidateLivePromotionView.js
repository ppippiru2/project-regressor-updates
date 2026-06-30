import { tf } from "../localization/index.js?v=675";

export const MONSTER_CANDIDATE_LIVE_PROMOTION_VIEW_VERSION = "monster-candidate-live-promotion-view-v1";

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
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
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
          <p>${escapeHtml(monsterCandidateLivePromotionPriorityLabel(phase.priority, text))}</p>
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
    monsterCandidateLivePromotionStateLabel(row.planState, text),
    monsterCandidatePromotionStageLabel(row.promotionStageId, promotionText),
    row.regionName || row.regionId || "",
  ].filter(Boolean);
  const actionLabels = (row.nextActionIds || []).map((actionId) => monsterCandidatePromotionActionLabel(actionId, promotionText));

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
        <div class="editor-chip-list">${roles.map((role) => chip(role)).join("")}</div>
      </div>
      <div class="editor-monster-candidate-live-promotion-grid">
        ${monsterCandidateLivePromotionChipBlock(text.rewardLinks || "Reward links", row.rewardItemIds?.length ? row.rewardItemIds : [text.emptyReward || "None"])}
        ${monsterCandidateLivePromotionChipBlock(text.targetFiles || "Target files", row.targetFiles || [])}
        ${monsterCandidateLivePromotionChipBlock(text.nextActions || "Next actions", actionLabels)}
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
    monsterCandidateLivePromotionStateLabel(row.planState, text),
    monsterCandidatePromotionStageLabel(row.promotionStageId, promotionText),
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
        <div class="editor-chip-list">${roles.map((role) => chip(role)).join("")}</div>
      </div>
      <div class="editor-monster-candidate-live-promotion-grid">
        ${monsterCandidateLivePromotionChipBlock(text.rewardLinks || "Reward links", row.rewardItemIds?.length ? row.rewardItemIds : [text.emptyReward || "None"])}
        ${monsterCandidateLivePromotionChipBlock(text.deferredMissing || "Missing reward links", missingLabels.length ? missingLabels : [text.noMissing || "None"])}
      </div>
    </article>
  `;
}

function monsterCandidateLivePromotionPhaseTitle(phase, text = {}) {
  return text.phaseLabels?.[phase.id] || tf("editorPrep.balanceTuningDetail.monsterCandidateLivePromotion.phaseLabel", {
    order: phase.order || 0
  }, `Phase ${phase.order || 0}`);
}

function monsterCandidateLivePromotionPriorityLabel(priorityId, text = {}) {
  return text.priorityLabels?.[priorityId] || priorityId || "";
}

function monsterCandidateLivePromotionStateLabel(stateId, text = {}) {
  return text.stateLabels?.[stateId] || stateId || "unknown";
}

function detailTextForPromotion(detailText = {}, text = {}) {
  return {
    ...(detailText.monsterCandidatePromotion || {}),
    ...(text.promotionLabels || {}),
  };
}

function monsterCandidatePromotionActionLabel(actionId, text = {}) {
  return text.actionLabels?.[actionId] || actionId;
}

function monsterCandidatePromotionStageLabel(stageId, text = {}) {
  return text.stageLabels?.[stageId] || stageId || "unknown";
}

function monsterCandidateLivePromotionChipBlock(title, values = []) {
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
