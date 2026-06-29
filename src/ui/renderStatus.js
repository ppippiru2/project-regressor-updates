import { RESISTANCE_STATS } from "../state/resistanceCatalog.js?v=572";
import { allocatedFreeStatPoints } from "../state/statAllocation.js?v=572";
import { statusGradeFromStats } from "../state/statusGrade.js?v=572";
import { t, tf } from "../localization/index.js?v=572";
import { renderPortraitImagePreview } from "./portraitFrameView.js?v=572";

const PROFILE_FIELDS = [
  ["statusUi.profileFields.name", "name", "profile:name"],
  ["statusUi.profileFields.level", "level", "profile:level"],
  ["statusUi.profileFields.job", "job", "profile:job"],
  ["statusUi.profileFields.title", "title", "profile:title"],
  ["statusUi.profileFields.ageGender", "ageGender", "profile:ageGender"],
  ["statusUi.profileFields.country", "country", "profile:country"],
  ["statusUi.profileFields.organization", "organization", "profile:organization"],
  ["statusUi.profileFields.alignment", "alignment", "profile:alignment"],
  ["statusUi.profileFields.starterCard", "starterCard", "profile:starterCard"],
  ["statusUi.profileFields.starterSkill", "starterSkill", "profile:starterSkill"],
];

const byId = (id) => document.getElementById(id);

export function renderProfile(playerProfile, playerLevel, playerSpritePath = "") {
  byId("profile-name-title").textContent = playerProfile.name;
  const values = {
    name: playerProfile.name,
    level: playerLevel,
    job: playerProfile.job,
    title: playerProfile.title,
    ageGender: tf("statusUi.ageGenderValue", { age: playerProfile.age, gender: playerProfile.gender }),
    country: playerProfile.country,
    organization: playerProfile.organization,
    alignment: playerProfile.alignment,
    starterCard: playerProfile.starterCardName || t("statusUi.noStarterCard"),
    starterSkill: playerProfile.starterSkill || t("statusUi.noStarterSkill"),
  };

  byId("profile-lines").innerHTML = PROFILE_FIELDS.map(
    ([labelKey, key, infoKey]) => `<div class="profile-line">
      <span>${infoTerm(t(labelKey), infoKey)}</span>
      <strong>${values[key]}</strong>
    </div>`
  ).join("");
  renderProfilePortrait(playerProfile, playerSpritePath);
}

function renderProfilePortrait(playerProfile, playerSpritePath) {
  const portrait = byId("player-profile-portrait");
  if (!portrait) return;

  const customPortrait = playerProfile?.portraitDataUrl || "";
  const portraitImage = customPortrait || playerSpritePath;
  const hasSprite = Boolean(portraitImage);
  const portraitEditor = portrait.closest(".profile-portrait-editor");
  const cropToggle = byId("profile-status-crop-toggle");
  const cropControls = byId("profile-status-crop-controls");
  const cropControlsOpen = hasSprite && portraitEditor?.dataset.statusCropOpen === "true";
  portrait.classList.toggle("has-sprite", hasSprite);
  portrait.classList.toggle("has-custom-portrait", Boolean(customPortrait));
  portrait.setAttribute("aria-label", tf("statusUi.portraitAria", {
    name: playerProfile?.name || t("statusUi.fallbackPortraitName"),
  }));
  if (!hasSprite && portraitEditor) portraitEditor.dataset.statusCropOpen = "false";
  if (cropToggle) {
    cropToggle.hidden = !hasSprite;
    cropToggle.setAttribute("aria-expanded", cropControlsOpen ? "true" : "false");
  }
  if (cropControls) cropControls.hidden = !cropControlsOpen;

  if (hasSprite) {
    portrait.style.removeProperty("--profile-sprite-image");
    renderPortraitImagePreview(portrait, portraitImage, playerProfile?.portraitFrame, {
      label: playerProfile?.name || t("statusUi.fallbackPortraitName"),
    });
  } else {
    portrait.querySelectorAll(".portrait-crop-image").forEach((imageElement) => imageElement.remove());
    portrait.style.removeProperty("--profile-sprite-image");
  }
}

export function renderStats(player, statePlayer, primaryStats, displayName, expToNext, rankLabel, playerProfile) {
  byId("primary-stats").innerHTML = primaryStats
    .map((stat) => {
      const removable = allocatedFreeStatPoints(statePlayer, stat);
      const showMinus = removable > 0 || statePlayer.freePoints > 0;
      const showBatchMinus = removable >= 10 || statePlayer.freePoints >= 10;
      const batchMinusButton = removable >= 10
        ? `<button class="stat-plus-button stat-minus-button stat-batch-button" type="button" data-deallocate-batch="${stat}">-10</button>`
        : `<button class="stat-plus-button stat-minus-button stat-batch-button" type="button" title="${t("statusUi.statBatchMinusTitle")}" disabled>-10</button>`;
      const minusButton = removable > 0
        ? `<button class="stat-plus-button stat-minus-button" type="button" data-deallocate="${stat}">-</button>`
        : `<button class="stat-plus-button stat-minus-button" type="button" title="${t("statusUi.statMinusTitle")}" disabled>-</button>`;
      return `<div class="stat-line primary-stat-line">
        <span>${infoTerm(displayName(stat), `stat:${stat}`)}</span>
        <div class="stat-value-action">
          ${showBatchMinus ? batchMinusButton : ""}
          ${showMinus ? minusButton : ""}
          <strong>${player.total[stat]}</strong>
          ${statePlayer.freePoints > 0 ? `<button class="stat-plus-button" type="button" data-allocate="${stat}">+</button>` : ""}
          ${statePlayer.freePoints >= 10 ? `<button class="stat-plus-button stat-batch-button" type="button" data-allocate-batch="${stat}">+10</button>` : ""}
        </div>
      </div>`;
    })
    .join("");

  byId("derived-stats").innerHTML = [
    ["HP", "derived:hp", player.maxHp],
    ["MP", "derived:mp", player.maxMp],
    [t("statusUi.derivedLabels.hpRegen"), "derived:hpRegen", tf("statusUi.perSecond", { value: player.hpRegen.toFixed(1) })],
    [t("statusUi.derivedLabels.mpRegen"), "derived:mpRegen", tf("statusUi.perSecond", { value: player.mpRegen.toFixed(1) })],
    [t("statusUi.derivedLabels.attack"), "derived:attack", Math.floor(player.attack)],
    [t("statusUi.derivedLabels.magicAttack"), "derived:magicAttack", Math.floor(player.magicAttack)],
    [t("statusUi.derivedLabels.defense"), "derived:defense", Math.floor(player.defense)],
    [t("statusUi.derivedLabels.critRate"), "derived:critRate", tf("statusUi.percent", { value: player.critRate.toFixed(1) })],
    [t("statusUi.derivedLabels.critDamage"), "derived:critDamage", tf("statusUi.percent", { value: player.critDamage })],
    [t("statusUi.derivedLabels.attackSpeed"), "derived:attackSpeed", tf("statusUi.perSecondCount", { value: player.attackSpeed.toFixed(2) })],
    [t("statusUi.derivedLabels.evade"), "derived:evade", tf("statusUi.percent", { value: player.evade.toFixed(1) })],
    [t("statusUi.derivedLabels.accuracy"), "derived:accuracy", tf("statusUi.percent", { value: player.accuracy.toFixed(1) })],
    [t("statusUi.derivedLabels.statusResist"), "derived:statusResist", tf("statusUi.percent", { value: player.statusResist.toFixed(1) })],
    [t("statusUi.derivedLabels.dropRate"), "derived:dropRate", tf("statusUi.percent", { value: Math.round(player.dropRate * 100) })],
  ]
    .map(([label, infoKey, value]) => `<div class="stat-line"><span>${infoTerm(label, infoKey)}</span><strong>${value}</strong></div>`)
    .join("");

  const expNeed = expToNext(statePlayer.level);
  byId("exp-text").textContent = `${statePlayer.exp} / ${expNeed}`;
  byId("exp-bar").style.width = `${Math.min(100, (statePlayer.exp / expNeed) * 100)}%`;
  byId("free-points").textContent = statePlayer.freePoints;
  const removableTotal = primaryStats.reduce((total, stat) => total + allocatedFreeStatPoints(statePlayer, stat), 0);
  renderStatAllocationButtons(statePlayer.freePoints, removableTotal);
  renderStatusSummary(player, statePlayer, expNeed, rankLabel, playerProfile);
}

function renderStatusSummary(player, statePlayer, expNeed, rankLabel, playerProfile) {
  const summaryName = byId("status-summary-name");
  if (!summaryName) return;

  summaryName.textContent = tf("statusUi.statusWindow", {
    name: playerProfile?.name || statePlayer.name || t("saveDefaults.playerName"),
  });
  byId("status-summary-level").textContent = tf("statusUi.level", { level: statePlayer.level });
  byId("status-summary-rank").textContent = tf("statusUi.statusGrade", {
    grade: statusGradeFromStats(player?.total || statePlayer?.stats || {}),
  });
  byId("status-summary-power").textContent = Math.floor(player.power).toLocaleString();
  byId("status-summary-exp").textContent = `${statePlayer.exp} / ${expNeed}`;
  byId("status-summary-points").textContent = statePlayer.freePoints;
}

export function renderResistances(player) {
  const resistanceValues = player.resistances || {};

  byId("resistance-stats").innerHTML = RESISTANCE_STATS
    .map(({ key, label }) => {
      const value = Number.isFinite(resistanceValues[key]) ? resistanceValues[key] : 0;
      return `<div class="stat-line" data-resistance-key="${key}">
        <span>${infoTerm(label, `resistance:${key}`)}</span>
        <strong>${value.toFixed(1)}%</strong>
      </div>`;
    })
    .join("");
}

function renderStatAllocationButtons(freePoints, removableTotal) {
  const button = byId("allocate-recommended-button");
  if (button) {
    button.hidden = freePoints <= 0;
    button.disabled = false;
    button.textContent = freePoints > 0
      ? tf("statusUi.recommendedAllocationCount", { count: freePoints })
      : t("statusUi.recommendedAllocation");
  }

  const resetButton = byId("reset-free-stats-button");
  if (resetButton) {
    resetButton.hidden = removableTotal <= 0;
    resetButton.disabled = false;
    resetButton.textContent = removableTotal > 0
      ? tf("statusUi.freeStatsResetCount", { count: removableTotal })
      : t("statusUi.freeStatsReset");
  }

  const confirmButton = byId("confirm-free-stats-button");
  if (!confirmButton) return;
  confirmButton.hidden = removableTotal <= 0;
  confirmButton.disabled = false;
  confirmButton.textContent = removableTotal > 0
    ? tf("statusUi.freeStatsConfirmCount", { count: removableTotal })
    : t("statusUi.freeStatsConfirm");
}

function infoTerm(label, infoKey) {
  return `<span class="info-term" tabindex="0" role="button" data-info-key="${escapeHtml(infoKey)}">${escapeHtml(label)}</span>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}



