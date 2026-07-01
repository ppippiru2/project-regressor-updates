import { getLocaleText } from "../localization/index.js?v=677";
import { PROFILE_IMAGE_CUSTOMIZATION_BRIDGE_ID } from "../state/profile.js?v=677";
import {
  portraitCropImageHtml,
  portraitFrameInlineStyle,
} from "./portraitFrameView.js?v=677";

const TEXT = getLocaleText();
const CREATION_TEXT = TEXT.characterCreation;
const COMMON_TEXT = TEXT.common;
const GENDER_OPTIONS = CREATION_TEXT.profile.genderOptions;
const COUNTRY_OPTIONS = CREATION_TEXT.profile.countryOptions;

export function renderCreationProfileStep(draft) {
  const canCancel = canCancelCreation();
  return `<div class="creation-body">
    <div class="creation-grid creation-grid-profile">
      <label>
        ${escapeHtml(CREATION_TEXT.profile.hunterName)}
        <input name="draft-name" type="text" value="${escapeAttr(draft.name)}" maxlength="12" autocomplete="off" required />
      </label>
      <label>
        ${escapeHtml(CREATION_TEXT.profile.age)}
        <input name="draft-age" type="number" value="${escapeAttr(draft.age)}" min="14" max="99" required />
      </label>
      <label>
        ${escapeHtml(CREATION_TEXT.profile.gender)}
        <select name="draft-gender">
          ${GENDER_OPTIONS.map((value) => option(value, draft.gender)).join("")}
        </select>
      </label>
      <label>
        ${escapeHtml(CREATION_TEXT.profile.country)}
        <select name="draft-country">
          ${COUNTRY_OPTIONS.map((value) => option(value, draft.country)).join("")}
        </select>
      </label>
    </div>
    <div class="creation-image-row" data-customization-bridge="${escapeAttr(PROFILE_IMAGE_CUSTOMIZATION_BRIDGE_ID)}">
      <span>
        <strong>${escapeHtml(CREATION_TEXT.profile.profileImage)}</strong>
        <small>${escapeHtml(draft.portraitFileName)}</small>
      </span>
      <label class="secondary-button creation-file-button">
        ${escapeHtml(CREATION_TEXT.profile.chooseImage)}
        <input id="creation-profile-image-input" type="file" accept="image/png,image/jpeg,image/webp,image/gif" data-customization-bridge="${escapeAttr(PROFILE_IMAGE_CUSTOMIZATION_BRIDGE_ID)}" hidden />
      </label>
    </div>
    ${renderCreationPortraitAdjuster(draft)}
    <div class="creation-actions ${canCancel ? "creation-actions-split" : ""}">
      ${canCancel ? `<button class="ghost-button" type="button" data-cancel-creation>${escapeHtml(COMMON_TEXT.cancel)}</button>` : ""}
      <button class="primary-button" type="button" data-creation-next="stats">${escapeHtml(CREATION_TEXT.profile.nextStep)}</button>
    </div>
  </div>`;
}

function renderCreationPortraitAdjuster(draft) {
  if (!draft.portraitDataUrl) return "";
  return `<div class="creation-profile-editor">
    <div class="creation-profile-preview has-image" style="${portraitFrameInlineStyle(draft.portraitFrame)}" aria-label="${escapeAttr(CREATION_TEXT.profile.profileImage)}">
      ${portraitCropImageHtml(draft.portraitDataUrl, draft.name)}
      <span>${escapeHtml(draft.name || CREATION_TEXT.profile.defaultName)}</span>
    </div>
    <div class="profile-crop-controls creation-crop-controls">
      <small>${escapeHtml(CREATION_TEXT.profile.adjustImageHint)}</small>
      <div class="profile-crop-pad" aria-label="${escapeAttr(CREATION_TEXT.profile.adjustImage)}">
        <button class="ghost-button" type="button" data-creation-crop-move="up">${escapeHtml(CREATION_TEXT.profile.moveUp)}</button>
        <button class="ghost-button" type="button" data-creation-crop-move="left">${escapeHtml(CREATION_TEXT.profile.moveLeft)}</button>
        <button class="ghost-button" type="button" data-creation-crop-move="right">${escapeHtml(CREATION_TEXT.profile.moveRight)}</button>
        <button class="ghost-button" type="button" data-creation-crop-move="down">${escapeHtml(CREATION_TEXT.profile.moveDown)}</button>
      </div>
      <div class="profile-crop-zoom">
        <button class="ghost-button" type="button" data-creation-crop-zoom="zoomOut">${escapeHtml(CREATION_TEXT.profile.zoomOut)}</button>
        <button class="ghost-button" type="button" data-creation-crop-reset>${escapeHtml(CREATION_TEXT.profile.resetImageFrame)}</button>
        <button class="ghost-button" type="button" data-creation-crop-zoom="zoomIn">${escapeHtml(CREATION_TEXT.profile.zoomIn)}</button>
      </div>
    </div>
  </div>`;
}

function canCancelCreation() {
  return document.getElementById("character-creation")?.dataset.canCancel === "true";
}

function option(value, selected) {
  return `<option value="${escapeAttr(value)}" ${value === selected ? "selected" : ""}>${escapeHtml(value)}</option>`;
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function escapeAttr(value) {
  return escapeHtml(value);
}
