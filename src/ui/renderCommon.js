import { t } from "../localization/index.js?v=435";
import { renderCombatLogLine } from "./combatLogFormatter.js?v=435";
import { renderPortraitImagePreview } from "./portraitFrameView.js?v=435";

export function renderCharacterCreation(playerProfile) {
  const screen = document.getElementById("character-creation");
  if (!screen) return;
  screen.classList.toggle("is-hidden", playerProfile.created);
}

export function renderFeedbackSettings(feedbackOptions, combatFeedback) {
  const container = document.getElementById("feedback-settings");
  if (!container) return;
  container.innerHTML = feedbackOptions
    .map(
      ([key, label]) => `<label class="setting-row">
        <span>${label}</span>
        <input type="checkbox" data-feedback-option="${key}" ${combatFeedback[key] ? "checked" : ""} />
      </label>`
    )
    .join("");
}

export function renderCombatViewSettings(viewOptions, combatView) {
  const container = document.getElementById("combat-view-settings");
  document.body.dataset.infoTooltips = combatView.fieldInfoTooltips === false ? "off" : "on";
  if (!container) return;
  container.innerHTML = viewOptions
    .map(
      ([key, label, description]) => `<label class="setting-row">
        <span>
          <strong>${label}</strong>
          <small>${description}</small>
        </span>
        <input type="checkbox" data-combat-view-option="${key}" ${combatView[key] ? "checked" : ""} />
      </label>`
    )
    .join("");
}

export function renderDeveloperSettings(multiplierOptions = [], developerSettings = {}) {
  const container = document.getElementById("developer-settings");
  if (!container) return;
  const options = multiplierOptions.length ? multiplierOptions : [1, 2, 3, 5, 10, 25, 50, 100];
  const multiplierSelect = (key, label, description) => {
    const selectedValue = Number(developerSettings[key] ?? 1);
    return `<label class="setting-row developer-setting-row">
      <span>
        <strong>${escapeHtml(label)}</strong>
        <small>${escapeHtml(description)}</small>
      </span>
      <select data-developer-option="${key}">
        ${options
          .map(
            (value) =>
              `<option value="${value}" ${Number(value) === selectedValue ? "selected" : ""}>x${value}</option>`
          )
          .join("")}
      </select>
    </label>`;
  };

  const toggleRow = (key, label, description) => `<label class="setting-row developer-setting-row">
    <span>
      <strong>${escapeHtml(label)}</strong>
      <small>${escapeHtml(description)}</small>
    </span>
    <input type="checkbox" data-developer-option="${key}" ${developerSettings[key] ? "checked" : ""} />
  </label>`;

  container.innerHTML = [
    multiplierSelect(
      "expMultiplier",
      t("developerSettings.expMultiplier.label"),
      t("developerSettings.expMultiplier.description")
    ),
    toggleRow(
      "outgoingDamageInfinite",
      t("developerSettings.outgoingDamageInfinite.label"),
      t("developerSettings.outgoingDamageInfinite.description")
    ),
    toggleRow(
      "incomingDamageZero",
      t("developerSettings.incomingDamageZero.label"),
      t("developerSettings.incomingDamageZero.description")
    ),
    multiplierSelect(
      "itemDropMultiplier",
      t("developerSettings.itemDropMultiplier.label"),
      t("developerSettings.itemDropMultiplier.description")
    ),
    multiplierSelect(
      "goldDropMultiplier",
      t("developerSettings.goldDropMultiplier.label"),
      t("developerSettings.goldDropMultiplier.description")
    ),
    `<div class="setting-row developer-setting-row developer-action-row">
      <span>
        <strong>${escapeHtml(t("developerSettings.skipRegion.label"))}</strong>
        <small>${escapeHtml(t("developerSettings.skipRegion.description"))}</small>
      </span>
      <button class="secondary-button" type="button" data-developer-action="skip-region">${escapeHtml(t("developerSettings.skipRegion.button"))}</button>
    </div>`,
  ].join("");
}

export function renderSaveSlots(slotEntries = [], activeSlotId = "") {
  const container = document.getElementById("save-slot-list");
  if (!container) return;
  container.innerHTML = slotEntries
    .map((entry) => {
      const snapshot = entry.snapshot;
      const summary = snapshot?.summary || {};
      const isActive = entry.id === activeSlotId;
      const title = snapshot ? summary.name || t("saveSlots.fallbackName") : t("saveSlots.emptySlot");
      const meta = snapshot
        ? [
            `${t("saveSlots.levelPrefix")} ${summary.level || 1}`,
            `${Number(summary.gold || 0).toLocaleString()} G`,
            summary.regionName || t("saveSlots.unknownRegion"),
          ].join(" · ")
        : t("saveSlots.noSaveRecord");
      const actionButtons = snapshot
        ? `
          <button class="secondary-button" type="button" data-save-slot="${entry.id}">${escapeHtml(t("saveSlots.save"))}</button>
          <button class="ghost-button" type="button" data-load-slot="${entry.id}">${escapeHtml(t("saveSlots.load"))}</button>
          <button class="danger-button" type="button" data-clear-slot="${entry.id}">${escapeHtml(t("saveSlots.clear"))}</button>`
        : `<button class="secondary-button" type="button" data-new-slot="${entry.id}">${escapeHtml(t("saveSlots.newGame"))}</button>`;
      return `<article class="save-slot-card ${snapshot ? "" : "is-empty"} ${isActive ? "is-active" : ""}">
        <div class="save-slot-main">
          <span class="eyebrow">${escapeHtml(`${t("saveSlots.slot")} ${entry.label}`)}</span>
          <h4>${escapeHtml(title)}</h4>
          <p>${escapeHtml(meta)}</p>
          <small>${snapshot ? `${escapeHtml(t("saveSlots.lastSync"))} ${escapeHtml(formatSlotSavedAt(snapshot.savedAt))}` : escapeHtml(t("saveSlots.emptyHint"))}</small>
        </div>
        <div class="save-slot-actions">
          ${isActive ? `<span class="save-slot-badge">${escapeHtml(t("saveSlots.active"))}</span>` : ""}
          ${actionButtons}
        </div>
      </article>`;
    })
    .join("");
}

export function renderProfileEditSettings(playerProfile = {}) {
  const nameInput = document.getElementById("profile-edit-name");
  if (nameInput && document.activeElement !== nameInput) {
    nameInput.value = playerProfile.name || t("saveSlots.fallbackName");
  }

  const preview = document.getElementById("profile-edit-preview");
  if (preview && preview.dataset.profileDraftActive !== "true") {
    const image = playerProfile.portraitDataUrl || "";
    renderPortraitImagePreview(preview, image, playerProfile.portraitFrame, {
      label: playerProfile.name || t("saveSlots.fallbackName"),
    });
  }

  const cropControls = document.getElementById("profile-edit-crop-controls");
  const cropToggle = document.getElementById("profile-edit-crop-toggle");
  const editor = preview?.closest(".profile-edit-image-editor");
  const hasImage = Boolean(preview?.classList.contains("has-image"));
  const cropControlsOpen = hasImage && editor?.dataset.profileCropOpen === "true";
  if (!hasImage && editor) editor.dataset.profileCropOpen = "false";
  if (cropToggle) {
    cropToggle.hidden = !hasImage;
    cropToggle.setAttribute("aria-expanded", cropControlsOpen ? "true" : "false");
  }
  if (cropControls) {
    cropControls.hidden = !cropControlsOpen;
  }

  const fileName = document.getElementById("profile-edit-image-name");
  if (fileName && document.activeElement?.id !== "profile-edit-image-input") {
    fileName.textContent = playerProfile.portraitDataUrl
      ? t("saveSlots.storedImage")
      : t("saveSlots.defaultAwakenerImage");
  }
}

export function renderAudioSettings(audioSettings = {}) {
  const values = {
    bgmVolume: Number.isFinite(Number(audioSettings.bgmVolume)) ? Number(audioSettings.bgmVolume) : 50,
    sfxVolume: Number.isFinite(Number(audioSettings.sfxVolume)) ? Number(audioSettings.sfxVolume) : 70,
  };
  for (const [key, value] of Object.entries(values)) {
    const input = document.querySelector(`[data-audio-volume="${key}"]`);
    const output = document.getElementById(`audio-${key}-value`);
    if (input && document.activeElement !== input) input.value = value;
    if (output) output.textContent = `${value}%`;
  }
}

export function renderLog(log, combatView = {}) {
  const container = document.getElementById("combat-log");
  if (!container) return;
  const useColors = combatView.combatLogColors !== false;
  container.dataset.colorMode = useColors ? "rich" : "plain";
  container.innerHTML = log.map((line) => renderCombatLogLine(line, useColors)).join("");
}

function formatSlotSavedAt(value) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return t("saveSlots.timeUnknown");
  return date.toLocaleString("ko-KR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
  });
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
