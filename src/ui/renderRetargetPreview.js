import {
  CONTENT_PROFILE_TEMPLATES,
  CONTENT_RETARGET_MAPPING_TEMPLATES,
} from "../content/contentProfile.js?v=374";
import { buildContentRetargetPreview, createDictionaryTextResolver } from "../content/contentRetargetPreview.js?v=374";
import {
  MURIM_ASSET_RETARGET_SAMPLE,
  MURIM_RETARGET_SAMPLE_PROFILE,
  MURIM_TEXT_RETARGET_SAMPLE,
} from "../content/murimRetargetSample.js?v=374";
import { getLocaleText, t, tf } from "../localization/index.js?v=374";

export function renderRetargetPreviewSummary() {
  const grid = document.querySelector(".build-info-grid");
  if (!grid) return;

  let panel = document.getElementById("retarget-preview-line");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "retarget-preview-line";
    panel.className = "build-info-line wide retarget-preview-line";
    grid.appendChild(panel);
  }

  const preview = createMurimRetargetPreview();
  panel.innerHTML = `
    <span>${escapeHtml(t("retargetPreview.title"))}</span>
    <strong>${escapeHtml(tf("retargetPreview.summary", {
      title: preview.title,
      textCount: preview.counts.textOverrides,
      assetCount: preview.counts.assetOverrides,
    }))}</strong>
    <div class="retarget-preview-meta">
      <span>${escapeHtml(tf("retargetPreview.profileRoute", {
        source: preview.sourceProfileId,
        target: preview.targetProfileId,
      }))}</span>
      <span>${escapeHtml(preview.isComplete
        ? t("retargetPreview.ready")
        : tf("retargetPreview.needsReview", {
            missingText: preview.counts.missingTextTargets,
            missingAssets: preview.counts.missingAssetTargets,
            mismatchedAssets: preview.counts.mismatchedAssetTargets,
          }))}</span>
    </div>
  `;
}

export function createMurimRetargetPreview(dictionary = getLocaleText()) {
  return buildContentRetargetPreview({
    sampleProfile: MURIM_RETARGET_SAMPLE_PROFILE,
    textSample: MURIM_TEXT_RETARGET_SAMPLE,
    assetSample: MURIM_ASSET_RETARGET_SAMPLE,
    sourceProfile: CONTENT_PROFILE_TEMPLATES.projectRegressorHunter,
    targetProfile: CONTENT_PROFILE_TEMPLATES.koreanFantasyMurimTemplate,
    mappingTemplate: CONTENT_RETARGET_MAPPING_TEMPLATES.koreanFantasyMurim,
    resolveText: createDictionaryTextResolver(dictionary),
  });
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
