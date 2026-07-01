import { tf } from "../localization/index.js?v=680";
import { editorChip, editorChipBlock } from "./editorChipBlockView.js?v=680";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=680";

export const BALANCE_REGISTRY_DETAIL_VIEW_VERSION = "balance-registry-detail-view-v1";
const BALANCE_DETAIL_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderBalancePacingSnapshot(snapshot, detailText = {}) {
  const metrics = [
    [detailText.pacingKills || "Kills", `${snapshot.totalKills}`],
    [detailText.pacingRequiredKillSeconds || "Required Avg", `${snapshot.requiredAverageKillSeconds}s`],
    [detailText.pacingPowerSlashMinutes || "Power Slash", `${snapshot.noGearPowerSlashMinutes}min`],
    [detailText.pacingGold || "Gold", `${snapshot.totalGold} G`],
  ];
  return `
    <section class="editor-balance-pacing" data-valid="${snapshot.isValid ? "true" : "false"}" aria-label="${escapeAttribute(detailText.pacingTitle || "Tutorial pacing")}">
      <div class="editor-balance-pacing-head">
        <div>
          <h4>${escapeHtml(detailText.pacingTitle || "")}</h4>
          <p class="muted">${escapeHtml(detailText.pacingDescription || "")}</p>
        </div>
        <strong>${escapeHtml(snapshot.isValid ? (detailText.pacingStatusOk || "") : (detailText.pacingStatusReview || ""))}</strong>
      </div>
      <div class="editor-balance-pacing-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      ${snapshot.isValid ? "" : `<p class="editor-balance-pacing-error">${escapeHtml((snapshot.errors || []).slice(0, 2).join(" / "))}</p>`}
    </section>
  `;
}

export function renderBalanceGroupRow(group, detailText = {}, options = {}) {
  const preview = options.previewById?.get?.(group.id);
  return `
    <article class="editor-balance-row">
      <div class="editor-balance-row-head">
        <div>
          <h4>${escapeHtml(group.id)}</h4>
          <span>${escapeHtml(group.scope)}</span>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.exportCount", { count: group.exports.length }, `${group.exports.length}`))}</strong>
      </div>
      ${editorChipBlock(detailText.files || "Files", group.files, BALANCE_DETAIL_CHIP_OPTIONS)}
      ${editorChipBlock(detailText.exports || "Exports", group.exports, BALANCE_DETAIL_CHIP_OPTIONS)}
      ${editorChipBlock(detailText.affects || "Affects", group.affects, BALANCE_DETAIL_CHIP_OPTIONS)}
      ${balanceDetailPreviewBlock(detailText.preview || "Preview", preview?.items || [], detailText)}
    </article>
  `;
}

export function renderBalanceRelatedChecks(checks = [], detailText = {}) {
  if (!checks.length) return "";
  const rows = checks.map((check) => {
    const guards = Array.isArray(check.guards) ? check.guards : [];
    return `
      <article class="editor-balance-check">
        <div>
          <h4>${escapeHtml(check.label || check.id || "")}</h4>
          <span>${escapeHtml(check.script || "")}</span>
        </div>
        ${editorChipBlock(detailText.guards || "Guards", guards, BALANCE_DETAIL_CHIP_OPTIONS)}
      </article>
    `;
  }).join("");
  return `
    <div class="editor-balance-check-list" aria-label="${escapeAttribute(detailText.relatedChecks || "Related checks")}">
      <strong>${escapeHtml(detailText.relatedChecks || "")}</strong>
      ${rows}
    </div>
  `;
}

function balanceDetailPreviewBlock(title, items = [], detailText = {}) {
  if (!items.length) return "";
  return `
    <div class="editor-balance-preview-block">
      <span>${escapeHtml(title)}</span>
      <div class="editor-chip-list">
        ${items.map((item) => editorChip(`${item.exportName}: ${formatBalancePreviewSummary(item, detailText)}`, BALANCE_DETAIL_CHIP_OPTIONS)).join("")}
      </div>
    </div>
  `;
}

function formatBalancePreviewSummary(item, detailText = {}) {
  const sample = Array.isArray(item.sample) ? item.sample.join(", ") : "";
  if (item.type === "array") {
    return tf("editorPrep.balanceTuningDetail.previewArray", {
      count: item.count || 0,
      sample: sample || "-"
    }, `${item.count || 0}`);
  }
  if (item.type === "object") {
    return tf("editorPrep.balanceTuningDetail.previewObject", {
      count: item.count || 0,
      sample: sample || "-"
    }, `${item.count || 0}`);
  }
  if (item.type === "missing") {
    return detailText.previewMissing || "Missing";
  }
  return tf("editorPrep.balanceTuningDetail.previewValue", {
    value: item.value || ""
  }, item.value || "");
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
