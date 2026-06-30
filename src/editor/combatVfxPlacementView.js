import { tf } from "../localization/index.js?v=675";

export const COMBAT_VFX_PLACEMENT_VIEW_VERSION = "combat-vfx-placement-view-v1";

export function renderCombatVfxPlacementDetailView({
  preview = {},
  visiblePlayerRows = [],
  visibleMonsterRows = [],
  detailText = {},
  filter = {},
  labels = {},
} = {}) {
  const totals = preview.totals || {};
  const playerRows = preview.playerRows || [];
  const monsterRows = preview.monsterRows || [];
  const monsterMotionProfileRows = preview.monsterMotionProfileRows || [];
  const tuningCandidates = preview.tuningCandidates || [];
  const visibleCount = visiblePlayerRows.length + visibleMonsterRows.length;
  const totalCount = playerRows.length + monsterRows.length;
  const title = detailText.title || "Combat VFX Placement";
  const description = detailText.description || "";

  return `
    <section class="editor-combat-vfx-detail" aria-label="${escapeAttribute(title)}">
      <div class="editor-combat-vfx-head">
        <div>
          <h3>${escapeHtml(title)}</h3>
          <p class="muted">${escapeHtml(description)}</p>
        </div>
        <span>${escapeHtml(tf("editorPrep.combatVfxPlacementDetail.summary", {
          playerRows: totals.playerRows || playerRows.length,
          monsterRows: totals.monsterRows || monsterRows.length,
          effectTypes: totals.effectTypes || 0
        }, detailText.summary))}</span>
      </div>
      <div class="editor-combat-vfx-summary">
        ${combatVfxSummaryCard(detailText.playerMetric, String(totals.playerRows || playerRows.length))}
        ${combatVfxSummaryCard(detailText.monsterMetric, String(totals.monsterRows || monsterRows.length))}
        ${combatVfxSummaryCard(detailText.profileMetric || "Motion Profiles", String(totals.monsterMotionProfiles || monsterMotionProfileRows.length))}
        ${combatVfxSummaryCard(detailText.profileTuningMetric || "Profile Signals", String(totals.monsterProfileTuningRows || 0))}
        ${combatVfxSummaryCard(detailText.effectMetric, String(totals.effectTypes || 0))}
        ${combatVfxSummaryCard(detailText.tuningMetric, String(totals.tuningCandidates || tuningCandidates.length))}
      </div>
      ${renderCombatVfxTuningSignals(tuningCandidates, detailText, labels.signalLabels)}
      ${renderMonsterMotionProfileSummary(monsterMotionProfileRows, detailText, labels)}
      ${renderCombatVfxFilterControls(detailText, visibleCount, totalCount, filter)}
      <div class="editor-combat-vfx-grid">
        <section>
          <h4>${escapeHtml(detailText.playerTitle)}</h4>
          <div class="editor-combat-vfx-list">
            ${visiblePlayerRows.map((row) => renderPlayerVfxPreviewRow(row, detailText, labels)).join("") || emptyCombatVfxRows(detailText, "player", filter)}
          </div>
        </section>
        <section>
          <h4>${escapeHtml(detailText.monsterTitle)}</h4>
          <div class="editor-combat-vfx-list">
            ${visibleMonsterRows.map((row) => renderMonsterVfxPreviewRow(row, detailText, labels)).join("") || emptyCombatVfxRows(detailText, "monster", filter)}
          </div>
        </section>
      </div>
    </section>
  `;
}

function renderCombatVfxTuningSignals(candidates = [], detailText = {}, signalLabels = {}) {
  return `
    <section class="editor-combat-vfx-tuning" aria-label="${escapeAttribute(detailText.tuningTitle || "Tuning Signals")}">
      <div class="editor-combat-vfx-tuning-head">
        <div>
          <h4>${escapeHtml(detailText.tuningTitle || "Tuning Signals")}</h4>
          <p class="muted">${escapeHtml(detailText.tuningDescription || "")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.combatVfxPlacementDetail.candidateCount", {
          count: candidates.length
        }, `${candidates.length}`))}</strong>
      </div>
      <div class="editor-combat-vfx-tuning-list">
        ${candidates.map((candidate) => renderCombatVfxTuningCandidate(candidate, detailText, signalLabels)).join("") || `<p class="editor-combat-vfx-empty"><span>${escapeHtml(detailText.noTuningCandidates || "No tuning signals")}</span></p>`}
      </div>
    </section>
  `;
}

function renderCombatVfxTuningCandidate(candidate = {}, detailText = {}, signalLabels = {}) {
  const kindLabel = candidate.kind === "monster" ? (detailText.monsterOnly || "Monster") : (detailText.playerOnly || "Player");
  const signalChips = (candidate.signals || []).map((signal) => chip(signalLabels[signal] || signal)).join("");
  return `
    <article class="editor-combat-vfx-tuning-card" data-priority="${escapeAttribute(String(candidate.priority || 3))}">
      <div>
        <strong>${escapeHtml(`${kindLabel} - ${candidate.label || candidate.targetId || ""}`)}</strong>
        <span>${escapeHtml(tf("editorPrep.combatVfxPlacementDetail.candidatePriority", {
          priority: candidate.priority || "-"
        }, `Priority ${candidate.priority || "-"}`))}</span>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.candidateSignals || "Signals")}</span>
        <div class="editor-chip-list">${signalChips}</div>
      </div>
      ${combatVfxFieldBlock(detailText.candidatePlacement || "Placement", [formatCombatVfxPlacement(candidate.placement)])}
    </article>
  `;
}

function renderMonsterMotionProfileSummary(rows = [], detailText = {}, labels = {}) {
  return `
    <section class="editor-combat-vfx-profile-summary" aria-label="${escapeAttribute(detailText.profileTitle || "Monster Motion Profile Summary")}">
      <div class="editor-combat-vfx-profile-head">
        <div>
          <h4>${escapeHtml(detailText.profileTitle || "Monster Motion Profile Summary")}</h4>
          <p class="muted">${escapeHtml(detailText.profileDescription || "")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.combatVfxPlacementDetail.profileCount", {
          count: rows.length
        }, `${rows.length}`))}</strong>
      </div>
      <div class="editor-combat-vfx-profile-list">
        ${rows.map((row) => renderMonsterMotionProfileCard(row, detailText, labels)).join("") || `<p class="editor-combat-vfx-empty"><span>${escapeHtml(detailText.empty || "No rows")}</span></p>`}
      </div>
    </section>
  `;
}

function renderMonsterMotionProfileCard(row = {}, detailText = {}, labels = {}) {
  const effectLabels = labels.effectLabels || {};
  const signalLabels = labels.signalLabels || {};
  const monsterChips = (row.monsterNames || []).map((name) => chip(name)).join("");
  const classChips = (row.classIds || []).map((classId) => chip(classId)).join("");
  const sfxChips = (row.sfxProfiles || []).map((sfxProfile) => chip(sfxProfile)).join("");
  const defaultEffectChips = (row.defaultEffectTypes || []).map((effectType) => chip(effectLabels[effectType] || effectType)).join("");
  const modifierChips = (row.effectModifiers || []).map((effectType) => chip(effectLabels[effectType] || effectType)).join("");
  const signalChips = (row.signals || []).length
    ? row.signals.map((signal) => chip(signalLabels[signal] || signal)).join("")
    : chip(detailText.noProfileSignals || "Stable range");
  const effectRangeChips = Object.entries(row.effectRanges || {})
    .map(([effectType, range]) => chip(`${effectLabels[effectType] || effectType}: ${formatCombatVfxPlacementRange(range)}`))
    .join("");
  return `
    <article class="editor-combat-vfx-profile-card" data-priority="${escapeAttribute(String(row.priority || 0))}">
      <div class="editor-combat-vfx-profile-card-head">
        <div>
          <h4>${escapeHtml(row.motionProfile || row.id || "")}</h4>
          <span>${escapeHtml(tf("editorPrep.combatVfxPlacementDetail.profileMonsterCount", {
            count: row.monsterCount || 0
          }, `${row.monsterCount || 0}`))}</span>
        </div>
        <strong>${escapeHtml(row.id || "")}</strong>
      </div>
      ${combatVfxFieldBlock(detailText.profileBaseRange || "Base range", [formatCombatVfxPlacementRange(row.baseRange)])}
      ${combatVfxFieldBlock(detailText.profileHyperRange || "Hyper range", [formatCombatVfxPlacementRange(row.hyperRange)])}
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.monsterOnly || "Monster")}</span>
        <div class="editor-chip-list">${monsterChips}</div>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.sprite || "Sprite")}</span>
        <div class="editor-chip-list">${classChips}</div>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.sfx || "SFX")}</span>
        <div class="editor-chip-list">${sfxChips}</div>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.profileDefaultEffects || "Default effects")}</span>
        <div class="editor-chip-list">${defaultEffectChips}</div>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.profileModifiers || "Profile modifiers")}</span>
        <div class="editor-chip-list">${modifierChips}</div>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.profileSignals || "Profile signals")}</span>
        <div class="editor-chip-list">${signalChips}</div>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.profileEffects || "Effect ranges")}</span>
        <div class="editor-chip-list">${effectRangeChips}</div>
      </div>
    </article>
  `;
}

function renderCombatVfxFilterControls(detailText = {}, visibleCount = 0, totalCount = 0, filter = {}) {
  const filterSummary = combatVfxFilterSummary(detailText, filter);
  return `
    <div class="editor-combat-vfx-controls">
      <label class="editor-combat-vfx-search">
        <span>${escapeHtml(detailText.searchLabel || "Search")}</span>
        <input type="search" data-combat-vfx-search value="${escapeAttribute(filter.query || "")}" placeholder="${escapeAttribute(detailText.searchPlaceholder || "")}" />
      </label>
      <div class="editor-combat-vfx-filter-buttons" role="group" aria-label="${escapeAttribute(detailText.kindFilter || "Kind Filter")}">
        ${combatVfxKindButton("all", detailText.all || "All", filter)}
        ${combatVfxKindButton("player", detailText.playerOnly || "Player", filter)}
        ${combatVfxKindButton("monster", detailText.monsterOnly || "Monster", filter)}
      </div>
      <button class="editor-combat-vfx-reset" type="button" data-combat-vfx-reset>
        ${escapeHtml(detailText.reset || "Reset")}
      </button>
      <span class="editor-combat-vfx-count">
        <strong>${escapeHtml(tf("editorPrep.combatVfxPlacementDetail.visibleCount", {
          visible: visibleCount,
          total: totalCount
        }, `${visibleCount}/${totalCount}`))}</strong>
        ${filterSummary ? `<small>${escapeHtml(filterSummary)}</small>` : ""}
      </span>
    </div>
  `;
}

function combatVfxKindButton(kind, label, filter = {}) {
  const active = normalizeCombatVfxKind(filter.kind) === kind;
  return `
    <button class="editor-combat-vfx-filter${active ? " is-active" : ""}" type="button" data-combat-vfx-kind="${escapeAttribute(kind)}" aria-pressed="${active ? "true" : "false"}">
      ${escapeHtml(label)}
    </button>
  `;
}

function combatVfxFilterSummary(detailText = {}, filter = {}) {
  const kind = normalizeCombatVfxKind(filter.kind);
  const query = String(filter.query || "").trim();
  const filterLabel = kind === "player"
    ? (detailText.playerOnly || "Player")
    : kind === "monster"
      ? (detailText.monsterOnly || "Monster")
      : "";

  if (kind !== "all" && query) {
    return tf("editorPrep.combatVfxPlacementDetail.activeFilterAndSearch", {
      filter: filterLabel,
      query
    }, `${filterLabel} / ${query}`);
  }
  if (kind !== "all") {
    return tf("editorPrep.combatVfxPlacementDetail.activeFilter", {
      filter: filterLabel
    }, filterLabel);
  }
  if (query) {
    return tf("editorPrep.combatVfxPlacementDetail.activeSearch", {
      query
    }, query);
  }
  return "";
}

function emptyCombatVfxRows(detailText = {}, sectionKind = "player", filter = {}) {
  const kind = normalizeCombatVfxKind(filter.kind);
  const query = String(filter.query || "").trim();
  const sectionLabel = sectionKind === "monster" ? (detailText.monsterOnly || "Monster") : (detailText.playerOnly || "Player");
  const filterLabel = kind === "monster" ? (detailText.monsterOnly || "Monster") : (detailText.playerOnly || "Player");
  let message = detailText.empty || "No rows";
  let showResetHint = false;
  if (kind !== "all" && kind !== sectionKind) {
    message = tf("editorPrep.combatVfxPlacementDetail.emptyByType", {
      filter: filterLabel,
      section: sectionLabel
    }, message);
    showResetHint = true;
  } else if (query) {
    message = tf("editorPrep.combatVfxPlacementDetail.emptyBySearch", {
      query
    }, message);
    showResetHint = true;
  }
  return `
    <p class="editor-combat-vfx-empty">
      <span>${escapeHtml(message)}</span>
      ${showResetHint ? `<small>${escapeHtml(detailText.emptyResetHint || "")}</small>` : ""}
    </p>
  `;
}

function renderPlayerVfxPreviewRow(row, detailText = {}, labels = {}) {
  const classLabels = labels.classLabels || {};
  const genderLabels = labels.genderLabels || {};
  const effectLabels = labels.effectLabels || {};
  const classLabel = classLabels[row.classId] || row.classId;
  const genderLabel = genderLabels[row.gender] || row.gender;
  const effectChips = Object.entries(row.effects || {})
    .map(([effectType, placement]) => chip(`${effectLabels[effectType] || effectType}: ${formatCombatVfxPlacement(placement)}`))
    .join("");
  return `
    <article class="editor-combat-vfx-row">
      <div class="editor-combat-vfx-row-head">
        <div>
          <h4>${escapeHtml(`${classLabel} / ${genderLabel}`)}</h4>
          <span>${escapeHtml(row.spritePath || "")}</span>
        </div>
        <strong>${escapeHtml(row.id)}</strong>
      </div>
      ${combatVfxFieldBlock(detailText.base, [formatCombatVfxPlacement(row.basePlacement)])}
      ${combatVfxFieldBlock(detailText.hyper, [formatCombatVfxPlacement(row.hyperPlacement)])}
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.effects)}</span>
        <div class="editor-chip-list">${effectChips}</div>
      </div>
    </article>
  `;
}

function renderMonsterVfxPreviewRow(row, detailText = {}, labels = {}) {
  const effectLabels = labels.effectLabels || {};
  const effectLabel = effectLabels[row.effectType] || row.effectType || "";
  const effectChips = Object.entries(row.effects || {})
    .map(([effectType, placement]) => chip(`${effectLabels[effectType] || effectType}: ${formatCombatVfxPlacement(placement)}`))
    .join("");
  const modifierChips = (row.effectModifiers || []).map((effectType) => chip(effectLabels[effectType] || effectType)).join("");
  return `
    <article class="editor-combat-vfx-row">
      <div class="editor-combat-vfx-row-head">
        <div>
          <h4>${escapeHtml(row.name || row.id)}</h4>
          <span>${escapeHtml(`${row.classId || ""} / ${effectLabel}`)}</span>
        </div>
        <strong>${escapeHtml(row.id)}</strong>
      </div>
      ${combatVfxFieldBlock(detailText.motion, [row.motionProfile])}
      ${combatVfxFieldBlock(detailText.sfx, [row.sfxProfile])}
      ${combatVfxFieldBlock(detailText.motionBase || "Motion base", [formatCombatVfxPlacement(row.profilePlacement)])}
      ${combatVfxFieldBlock(detailText.base, [formatCombatVfxPlacement(row.basePlacement)])}
      ${combatVfxFieldBlock(detailText.hyper, [formatCombatVfxPlacement(row.hyperPlacement)])}
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.motionModifiers || "Motion modifiers")}</span>
        <div class="editor-chip-list">${modifierChips}</div>
      </div>
      <div class="editor-combat-vfx-chip-block">
        <span>${escapeHtml(detailText.effects)}</span>
        <div class="editor-chip-list">${effectChips}</div>
      </div>
    </article>
  `;
}

function combatVfxSummaryCard(label, value) {
  return `
    <span>
      <small>${escapeHtml(label || "")}</small>
      <b>${escapeHtml(value)}</b>
    </span>
  `;
}

function combatVfxFieldBlock(title, values = []) {
  return `
    <div class="editor-combat-vfx-chip-block">
      <span>${escapeHtml(title || "")}</span>
      <div class="editor-chip-list">${values.filter(Boolean).map((value) => chip(value)).join("")}</div>
    </div>
  `;
}

export function formatCombatVfxPlacement(placement = {}) {
  return `x ${Number(placement.offsetX || 0)} / y ${Number(placement.offsetY || 0)} / txt ${Number(placement.textOffsetY || 0)} / slash ${Number(placement.slashWidth || 0)}/${Number(placement.expandedSlashWidth || 0)}`;
}

function formatCombatVfxPlacementRange(range = {}) {
  const rangeValue = (entry = {}) => {
    const min = Number(entry.min || 0);
    const max = Number(entry.max || 0);
    return min === max ? String(min) : `${min}..${max}`;
  };
  return `x ${rangeValue(range.offsetX)} / y ${rangeValue(range.offsetY)} / txt ${rangeValue(range.textOffsetY)} / slash ${rangeValue(range.slashWidth)}/${rangeValue(range.expandedSlashWidth)}`;
}

function chip(value) {
  return `<span class="editor-chip">${escapeHtml(value)}</span>`;
}

function normalizeCombatVfxKind(kind) {
  return kind === "player" || kind === "monster" ? kind : "all";
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
