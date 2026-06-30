import { tf } from "../localization/index.js?v=675";

export const MONSTER_CANDIDATE_LIVE_PATCH_DRAFT_VIEW_VERSION = "monster-candidate-live-patch-draft-view-v1";

export function renderMonsterCandidateLivePatchDraft(draft, detailText = {}) {
  const text = detailText.monsterCandidateLivePatchDraft || {};
  const summary = draft.summary || {};
  const metrics = [
    [text.drafts || "Drafts", `${summary.draftCount || 0}`],
    [text.phase || "Phase", summary.targetPhaseId || "-"],
    [text.regions || "Regions", `${summary.targetRegionCount || 0}`],
    [text.files || "Files", `${summary.targetFileCount || 0}`],
    [text.writes || "Writes", draft.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];

  return `
    <section class="editor-monster-candidate-live-patch-draft" data-readonly="${draft.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Monster Candidate Live Patch Draft")}">
      <div class="editor-monster-candidate-live-patch-draft-head">
        <div>
          <h4>${escapeHtml(text.title || "Monster Candidate Live Patch Draft")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only patch draft before writing live monster data.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateLivePatchDraft.version", {
          version: draft.version || "-"
        }, draft.version || "-"))}</strong>
      </div>
      <div class="editor-monster-candidate-live-patch-draft-metrics">
        ${metrics.map(([label, value]) => `
          <span>
            <small>${escapeHtml(label)}</small>
            <b>${escapeHtml(value)}</b>
          </span>
        `).join("")}
      </div>
      <div class="editor-monster-candidate-live-patch-draft-list">
        ${(draft.rows || []).map((row) => renderMonsterCandidateLivePatchDraftRow(row, text)).join("") || `<p class="muted">${escapeHtml(text.noRows || "No patch draft rows.")}</p>`}
      </div>
    </section>
  `;
}

function renderMonsterCandidateLivePatchDraftRow(row, text = {}) {
  const entry = row.monsterBalanceEntry || {};
  const worldPatch = row.worldDataPatch || {};
  const roles = [
    monsterCandidatePatchDraftStateLabel(row.planState, text),
    row.regionName || row.regionId || "",
  ].filter(Boolean);
  const statValues = entry.stats
    ? Object.entries(entry.stats).map(([key, value]) => `${key} ${value}`)
    : [];
  const dropValues = (entry.dropTable || []).map((drop) => `${drop.itemId} ${formatPatchDraftChance(drop.chance)}`);
  const worldValues = [
    `${text.worldPatchAction || "Action"}: ${monsterCandidatePatchDraftActionLabel(worldPatch.action, text)}`,
    `${text.representative || "Representative"}: ${worldPatch.keepsRepresentativeMonsterId || "-"}`,
    `${text.proposedPool || "Pool"}: ${(worldPatch.proposedMonsterPool || []).join(" / ") || "-"}`,
  ];
  const blockingSignals = (row.blockingSignalIds || []).map((signalId) => monsterCandidatePatchDraftSignalLabel(signalId, text));

  return `
    <article class="editor-monster-candidate-live-patch-draft-row" data-state="${escapeAttribute(row.planState || "unknown")}">
      <div class="editor-monster-candidate-live-patch-draft-row-head">
        <div>
          <h5>${escapeHtml(row.name || row.id || "")}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.monsterCandidateLivePatchDraft.rowMeta", {
            source: row.sourceMonsterName || row.sourceMonsterId || "-",
            level: entry.level || 0,
            exp: entry.exp || 0,
            gold: entry.gold || 0
          }, `Level ${entry.level || 0} / exp ${entry.exp || 0} / gold ${entry.gold || 0}`))}</p>
        </div>
        <div class="editor-chip-list">${roles.map((role) => chip(role)).join("")}</div>
      </div>
      <div class="editor-monster-candidate-live-patch-draft-grid">
        ${monsterCandidateLivePatchDraftChipBlock(text.stats || "Stats", statValues)}
        ${monsterCandidateLivePatchDraftChipBlock(text.dropTable || "Drop table", dropValues)}
        ${monsterCandidateLivePatchDraftChipBlock(text.worldPatch || "World patch", worldValues)}
        ${monsterCandidateLivePatchDraftChipBlock(text.targetFiles || "Target files", row.targetFiles || [])}
        ${monsterCandidateLivePatchDraftChipBlock(text.rewardLinks || "Reward links", patchDraftRewardValues(row))}
        ${monsterCandidateLivePatchDraftChipBlock(text.blockingSignals || "Blocking signals", blockingSignals.length ? blockingSignals : [text.noBlockingSignals || "No blocking signals"])}
      </div>
    </article>
  `;
}

function patchDraftRewardValues(row) {
  const link = row.rewardLink || {};
  return [
    link.codexFragmentId,
    ...(link.materialItemIds || []),
    ...(link.skillItemIds || []),
  ].filter(Boolean);
}

function monsterCandidatePatchDraftStateLabel(stateId, text = {}) {
  return text.stateLabels?.[stateId] || stateId || "unknown";
}

function monsterCandidatePatchDraftActionLabel(actionId, text = {}) {
  return text.actionLabels?.[actionId] || actionId || "unknown";
}

function monsterCandidatePatchDraftSignalLabel(signalId, text = {}) {
  return text.signalLabels?.[signalId] || signalId;
}

function formatPatchDraftChance(chance) {
  const value = Number(chance || 0) * 100;
  return `${Number(value.toFixed(1))}%`;
}

function monsterCandidateLivePatchDraftChipBlock(title, values = []) {
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
