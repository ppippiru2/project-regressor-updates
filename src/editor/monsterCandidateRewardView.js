import { tf } from "../localization/index.js?v=675";
import { editorChip, editorChipBlock } from "./editorChipBlockView.js?v=675";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=675";

export const MONSTER_CANDIDATE_REWARD_VIEW_VERSION = "monster-candidate-reward-view-v1";
const MONSTER_CANDIDATE_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderMonsterCandidateRewardPreview(preview, detailText = {}) {
  const text = detailText.monsterCandidateRewards || {};
  const summary = preview.summary || {};
  const metrics = [
    [text.candidates || "Candidates", `${summary.candidateCount || 0}`],
    [text.livePending || "Live/Pending", `${summary.liveCandidateCount || 0}/${summary.pendingCandidateCount || 0}`],
    [text.codex || "Codex", `${summary.codexFragmentCount || 0}`],
    [text.materials || "Materials", `${summary.materialItemCount || 0}`],
    [text.skills || "Skills/Runes", `${summary.skillFragmentCount || 0}/${summary.skillRuneCount || 0}`],
  ];
  const unresolved = Array.isArray(preview.unresolvedItemIds) ? preview.unresolvedItemIds : [];

  return `
    <section class="editor-monster-candidate-rewards" data-valid="${unresolved.length ? "false" : "true"}" aria-label="${escapeAttribute(text.title || "Monster Candidate Reward Preview")}">
      <div class="editor-monster-candidate-rewards-head">
        <div>
          <h4>${escapeHtml(text.title || "Monster Candidate Reward Preview")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only reward links for candidate monsters.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateRewards.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-monster-candidate-reward-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      ${unresolved.length ? `<p class="editor-monster-candidate-reward-warning">${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateRewards.unresolved", {
        items: unresolved.join(", ")
      }, `Missing items ${unresolved.join(", ")}`))}</p>` : ""}
      <div class="editor-monster-candidate-reward-groups">
        ${(preview.groups || []).map((group) => renderMonsterCandidateRewardGroup(group, text)).join("")}
      </div>
    </section>
  `;
}

function renderMonsterCandidateRewardGroup(group, text = {}) {
  return `
    <article class="editor-monster-candidate-reward-group">
      <div class="editor-monster-candidate-reward-group-head">
        <div>
          <h5>${escapeHtml(group.regionName || group.regionId || "")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateRewards.representative", {
            monster: group.representativeMonsterName || group.representativeMonsterId || "-"
          }, `Representative ${group.representativeMonsterName || group.representativeMonsterId || "-"}`))}</p>
        </div>
        <span>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateRewards.groupSummary", {
          live: group.liveCount || 0,
          pending: group.pendingCount || 0
        }, `${group.liveCount || 0}/${group.pendingCount || 0}`))}</span>
      </div>
      <div class="editor-monster-candidate-reward-row-list">
        ${(group.rows || []).map((row) => renderMonsterCandidateRewardRow(row, text)).join("")}
      </div>
    </article>
  `;
}

function renderMonsterCandidateRewardRow(row, text = {}) {
  const roles = [
    row.isLive ? (text.live || "Live") : (text.pending || "Pending"),
    row.isRepresentative ? (text.representativeRole || "Representative") : "",
    row.isBoss ? (text.boss || "Boss") : "",
  ].filter(Boolean);
  const materialItems = row.materialItems?.length ? row.materialItems : [];
  const skillItems = row.skillItems?.length ? row.skillItems : [];

  return `
    <article class="editor-monster-candidate-reward-row" data-state="${row.isLive ? "live" : "pending"}">
      <div class="editor-monster-candidate-reward-row-head">
        <div>
          <h6>${escapeHtml(row.name || row.id || "")}</h6>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateRewards.rowMeta", {
            level: row.level || 0,
            source: row.sourceMonsterName || row.sourceMonsterId || "-"
          }, `Level ${row.level || 0} / source ${row.sourceMonsterName || row.sourceMonsterId || "-"}`))}</p>
        </div>
        <div class="editor-chip-list">${roles.map((role) => editorChip(role, MONSTER_CANDIDATE_CHIP_OPTIONS)).join("")}</div>
      </div>
      <div class="editor-monster-candidate-reward-item-grid">
        ${renderMonsterCandidateRewardItemBlock(text.codex || "Codex", [row.codexFragment].filter(Boolean), text)}
        ${renderMonsterCandidateRewardItemBlock(text.materials || "Materials", materialItems, text)}
        ${renderMonsterCandidateRewardItemBlock(text.skills || "Skills/Runes", skillItems, text)}
      </div>
      <div class="editor-monster-candidate-reward-coverage">
        <span>${escapeHtml(text.dropCoverage || "Live drops")}</span>
        <strong>${escapeHtml(monsterCandidateDropCoverageLabel(row, text))}</strong>
      </div>
    </article>
  `;
}

function renderMonsterCandidateRewardItemBlock(label, items = [], text = {}) {
  const values = items.length
    ? items.map((item) => `${item.typeLabel || item.type || "-"} · ${item.name || item.id || "-"}`)
    : [text.emptyReward || "None"];
  return editorChipBlock(label, values, MONSTER_CANDIDATE_CHIP_OPTIONS);
}

function monsterCandidateDropCoverageLabel(row, text = {}) {
  if (!row.isLive) return text.pendingDropCoverage || "Candidate rewards only";
  const materialTotal = row.materialItems?.length || 0;
  const skillTotal = row.skillItems?.length || 0;
  return tf("editorPrep.balanceTuningDetail.monsterCandidateRewards.dropCoverageValue", {
    codex: row.liveDropCoverage?.codex ? (text.connected || "Connected") : (text.candidateOnly || "Candidate"),
    material: `${row.liveDropCoverage?.materialCount || 0}/${materialTotal}`,
    skill: `${row.liveDropCoverage?.skillCount || 0}/${skillTotal}`,
  }, `${row.liveDropCoverage?.codex ? "Connected" : "Candidate"} / ${row.liveDropCoverage?.materialCount || 0}/${materialTotal} / ${row.liveDropCoverage?.skillCount || 0}/${skillTotal}`);
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
