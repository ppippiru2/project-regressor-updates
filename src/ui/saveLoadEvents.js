import { t, tf } from "../localization/index.js?v=331";
import { saveSlotLabel } from "../state/saveSlots.js?v=331";
import {
  DEFAULT_PORTRAIT_FRAME,
  dragPortraitFrame,
  nudgePortraitFrame,
  normalizePortraitFrame,
} from "../state/portraitFrame.js?v=331";
import {
  applyPortraitFrameToElement,
  readPortraitFrameFromElement,
  renderPortraitImagePreview,
} from "./portraitFrameView.js?v=331";

const MAX_PROFILE_IMAGE_BYTES = 1200000;
const CLEAR_SLOT_HOLD_MS = 5000;
let clearSlotConfirmCleanup = null;

export function bindSaveLoadEvents({
  onExportSave,
  onImportSaveText,
  onSaveSlot,
  onLoadSlot,
  onClearSlot,
  onNewSlot,
  onUpdateProfileSettings,
  onProfileImageError,
  onAudioVolumeChange,
}) {
  const exportButton = document.getElementById("export-save-button");
  const importButton = document.getElementById("import-save-button");
  const importInput = document.getElementById("import-save-input");
  const profileImageButton = document.getElementById("profile-edit-image-button");
  const profileImageInput = document.getElementById("profile-edit-image-input");
  const profileImageClear = document.getElementById("profile-edit-image-clear");
  const profileSaveButton = document.getElementById("profile-edit-save");
  const profileEditPreview = document.getElementById("profile-edit-preview");
  const profileCropControls = document.getElementById("profile-edit-crop-controls");
  let pendingProfileImageDataUrl = null;
  let pendingProfileImageFrame = null;
  let clearProfileImage = false;
  let profileDragState = null;

  if (exportButton) exportButton.addEventListener("click", onExportSave);

  if (importButton && importInput) {
    importButton.addEventListener("click", () => importInput.click());
    importInput.addEventListener("change", async () => {
      const file = importInput.files?.[0];
      if (!file) return;
      try {
        await onImportSaveText(await file.text());
      } finally {
        importInput.value = "";
      }
    });
  }

  document.body.addEventListener("click", (event) => {
    const saveSlot = event.target.closest("[data-save-slot]");
    const loadSlot = event.target.closest("[data-load-slot]");
    const clearSlot = event.target.closest("[data-clear-slot]");
    const newSlot = event.target.closest("[data-new-slot]");
    if (saveSlot) return onSaveSlot?.(saveSlot.dataset.saveSlot);
    if (loadSlot) return onLoadSlot?.(loadSlot.dataset.loadSlot);
    if (clearSlot) {
      event.preventDefault();
      return openClearSlotConfirm(clearSlot.dataset.clearSlot, onClearSlot);
    }
    if (newSlot) return onNewSlot?.(newSlot.dataset.newSlot);
  });

  if (profileImageButton && profileImageInput) {
    profileImageButton.addEventListener("click", () => profileImageInput.click());
    profileImageInput.addEventListener("change", async () => {
      const file = profileImageInput.files?.[0];
      if (!file) return;
      if (!file.type.startsWith("image/") || file.size > MAX_PROFILE_IMAGE_BYTES) {
        profileImageInput.value = "";
        onProfileImageError?.(t("saveSlots.imageTooLarge"));
        return;
      }
      pendingProfileImageDataUrl = await fileToDataUrl(file);
      pendingProfileImageFrame = normalizePortraitFrame(DEFAULT_PORTRAIT_FRAME);
      clearProfileImage = false;
      updateProfileImageDraft(file.name, pendingProfileImageDataUrl, pendingProfileImageFrame);
      profileImageInput.value = "";
    });
  }

  if (profileImageClear) {
    profileImageClear.addEventListener("click", () => {
      pendingProfileImageDataUrl = null;
      pendingProfileImageFrame = normalizePortraitFrame(DEFAULT_PORTRAIT_FRAME);
      clearProfileImage = true;
      updateProfileImageDraft(t("saveSlots.defaultAwakenerImage"), "", pendingProfileImageFrame);
    });
  }

  if (profileSaveButton) {
    profileSaveButton.addEventListener("click", () => {
      const previewFrame = profileEditPreview ? readPortraitFrameFromElement(profileEditPreview) : pendingProfileImageFrame;
      onUpdateProfileSettings?.({
        name: document.getElementById("profile-edit-name")?.value || "",
        portraitDataUrl: pendingProfileImageDataUrl,
        portraitFrame: clearProfileImage ? undefined : pendingProfileImageFrame || previewFrame,
        clearPortrait: clearProfileImage,
      });
      pendingProfileImageDataUrl = null;
      pendingProfileImageFrame = null;
      clearProfileImage = false;
      if (profileEditPreview) delete profileEditPreview.dataset.profileDraftActive;
    });
  }

  if (profileCropControls) {
    profileCropControls.addEventListener("click", (event) => {
      const button = event.target.closest("[data-profile-crop-move], [data-profile-crop-zoom], [data-profile-crop-reset]");
      if (!button || !profileEditPreview?.classList.contains("has-image")) return;
      event.preventDefault();
      const action = button.dataset.profileCropMove || button.dataset.profileCropZoom || "reset";
      updateProfileFrameDraft(nudgePortraitFrame(readProfileEditFrame(), action));
    });
  }

  if (profileEditPreview) {
    profileEditPreview.addEventListener("pointerdown", (event) => {
      if (!profileEditPreview.classList.contains("has-image")) return;
      const rect = profileEditPreview.getBoundingClientRect();
      profileDragState = {
        pointerId: event.pointerId,
        startX: event.clientX,
        startY: event.clientY,
        rect,
        frame: readProfileEditFrame(),
      };
      profileEditPreview.setPointerCapture?.(event.pointerId);
      event.preventDefault();
    });

    profileEditPreview.addEventListener("pointermove", (event) => {
      if (!profileDragState || event.pointerId !== profileDragState.pointerId) return;
      const deltaXPercent = ((event.clientX - profileDragState.startX) / Math.max(1, profileDragState.rect.width)) * 100;
      const deltaYPercent = ((event.clientY - profileDragState.startY) / Math.max(1, profileDragState.rect.height)) * 100;
      updateProfileFrameDraft(dragPortraitFrame(profileDragState.frame, deltaXPercent, deltaYPercent));
      event.preventDefault();
    });

    const endProfileDrag = (event) => {
      if (!profileDragState || event.pointerId !== profileDragState.pointerId) return;
      profileDragState = null;
    };
    profileEditPreview.addEventListener("pointerup", endProfileDrag);
    profileEditPreview.addEventListener("pointercancel", endProfileDrag);
  }

  document.body.addEventListener("input", (event) => {
    const volumeInput = event.target.closest("[data-audio-volume]");
    if (!volumeInput) return;
    const key = volumeInput.dataset.audioVolume;
    const value = Number(volumeInput.value);
    const output = document.getElementById(`audio-${key}-value`);
    if (output) output.textContent = `${value}%`;
    onAudioVolumeChange?.(key, value);
  });
  function readProfileEditFrame() {
    return pendingProfileImageFrame || readPortraitFrameFromElement(profileEditPreview);
  }

  function updateProfileFrameDraft(frame) {
    if (!profileEditPreview) return;
    pendingProfileImageFrame = applyPortraitFrameToElement(profileEditPreview, frame);
    profileEditPreview.dataset.profileDraftActive = "true";
  }
}

function openClearSlotConfirm(slotId, onClearSlot) {
  if (!slotId) return;
  closeClearSlotConfirm();

  const slotLabel = saveSlotLabel(slotId, { prefixKey: "saveSlots.slot" });
  const overlay = document.createElement("div");
  overlay.className = "save-clear-confirm";
  overlay.setAttribute("role", "dialog");
  overlay.setAttribute("aria-modal", "true");
  overlay.innerHTML = `
    <div class="save-clear-confirm-panel">
      <strong>${escapeHtml(t("saveSlots.clearTitle"))}</strong>
      <p>${escapeHtml(tf("saveSlots.clearQuestion", { slotLabel }))}</p>
      <small>${escapeHtml(t("saveSlots.clearWarning"))}</small>
      <div class="save-clear-confirm-actions">
        <button class="ghost-button" type="button" data-cancel-clear-slot>${escapeHtml(t("common.cancel"))}</button>
        <button class="danger-button save-clear-hold-button" type="button" data-confirm-clear-slot>
          <span class="save-clear-hold-progress" aria-hidden="true"></span>
          <span class="save-clear-hold-label">${escapeHtml(t("saveSlots.clearHoldConfirm"))}</span>
        </button>
      </div>
    </div>`;

  document.body.append(overlay);

  const holdButton = overlay.querySelector("[data-confirm-clear-slot]");
  const cancelButton = overlay.querySelector("[data-cancel-clear-slot]");
  const progress = overlay.querySelector(".save-clear-hold-progress");
  let holdTimer = null;
  let progressTimer = null;
  let holdStartedAt = 0;
  let completed = false;
  let activePointerId = null;
  let mouseFallbackActive = false;
  let touchFallbackActive = false;

  const stopHold = () => {
    window.clearTimeout(holdTimer);
    window.clearInterval(progressTimer);
    holdTimer = null;
    progressTimer = null;
    activePointerId = null;
    mouseFallbackActive = false;
    touchFallbackActive = false;
    holdButton?.classList.remove("is-holding");
    if (progress && !completed) progress.style.transform = "scaleX(0)";
  };

  const finishHold = () => {
    completed = true;
    stopHold();
    closeClearSlotConfirm();
    onClearSlot?.(slotId);
  };

  const startHold = (event) => {
    event?.preventDefault?.();
    if (holdTimer || completed) return;
    holdStartedAt = performance.now();
    holdButton?.classList.add("is-holding");
    if (progress) progress.style.transform = "scaleX(0)";
    progressTimer = window.setInterval(() => {
      const elapsed = performance.now() - holdStartedAt;
      const ratio = Math.min(1, elapsed / CLEAR_SLOT_HOLD_MS);
      if (progress) progress.style.transform = `scaleX(${ratio})`;
    }, 40);
    holdTimer = window.setTimeout(finishHold, CLEAR_SLOT_HOLD_MS);
  };

  const startPointerHold = (event) => {
    activePointerId = event.pointerId;
    holdButton?.setPointerCapture?.(event.pointerId);
    startHold(event);
  };

  const stopPointerHold = (event) => {
    if (activePointerId !== null && event?.pointerId !== activePointerId) return;
    stopHold();
  };

  const startMouseFallbackHold = (event) => {
    if (holdTimer || completed) return;
    mouseFallbackActive = true;
    startHold(event);
  };

  const stopMouseFallbackHold = () => {
    if (!mouseFallbackActive) return;
    stopHold();
  };

  const startTouchFallbackHold = (event) => {
    if (holdTimer || completed) return;
    touchFallbackActive = true;
    startHold(event);
  };

  const stopTouchFallbackHold = () => {
    if (!touchFallbackActive) return;
    stopHold();
  };

  clearSlotConfirmCleanup = () => {
    stopHold();
    window.removeEventListener("keydown", closeClearSlotConfirmOnEscape);
    window.removeEventListener("mouseup", stopMouseFallbackHold);
    window.removeEventListener("touchend", stopTouchFallbackHold);
    window.removeEventListener("touchcancel", stopTouchFallbackHold);
    clearSlotConfirmCleanup = null;
  };

  holdButton?.addEventListener("pointerdown", startPointerHold);
  holdButton?.addEventListener("pointerup", stopPointerHold);
  holdButton?.addEventListener("pointercancel", stopPointerHold);
  holdButton?.addEventListener("pointerleave", stopPointerHold);
  holdButton?.addEventListener("mousedown", startMouseFallbackHold);
  holdButton?.addEventListener("mouseleave", stopMouseFallbackHold);
  holdButton?.addEventListener("touchstart", startTouchFallbackHold, { passive: false });
  window.addEventListener("mouseup", stopMouseFallbackHold);
  window.addEventListener("touchend", stopTouchFallbackHold);
  window.addEventListener("touchcancel", stopTouchFallbackHold);
  holdButton?.addEventListener("click", (event) => event.preventDefault());
  holdButton?.addEventListener("keydown", (event) => {
    if (event.key !== " " && event.key !== "Enter") return;
    startHold(event);
  });
  holdButton?.addEventListener("keyup", (event) => {
    if (event.key === " " || event.key === "Enter") stopHold();
  });

  cancelButton?.addEventListener("click", closeClearSlotConfirm);
  overlay.addEventListener("click", (event) => {
    if (event.target === overlay) closeClearSlotConfirm();
  });
  window.addEventListener("keydown", closeClearSlotConfirmOnEscape);
  holdButton?.focus();
}

function closeClearSlotConfirmOnEscape(event) {
  if (event.key === "Escape") closeClearSlotConfirm();
}

function closeClearSlotConfirm() {
  clearSlotConfirmCleanup?.();
  document.querySelector(".save-clear-confirm")?.remove();
  window.removeEventListener("keydown", closeClearSlotConfirmOnEscape);
}

function updateProfileImageDraft(label, dataUrl, frame = DEFAULT_PORTRAIT_FRAME) {
  const fileName = document.getElementById("profile-edit-image-name");
  if (fileName) fileName.textContent = label || t("saveSlots.noImageSelected");
  const preview = document.getElementById("profile-edit-preview");
  if (!preview) return;
  preview.dataset.profileDraftActive = "true";
  renderPortraitImagePreview(preview, dataUrl, frame, { label });
  const cropControls = document.getElementById("profile-edit-crop-controls");
  if (cropControls) cropControls.hidden = !dataUrl;
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(String(reader.result || "")));
    reader.addEventListener("error", reject);
    reader.readAsDataURL(file);
  });
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
