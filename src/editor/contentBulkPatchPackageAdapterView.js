import { tf } from "../localization/index.js?v=677";
import { contentBulkChipBlock } from "./contentBulkChipBlockView.js?v=677";
import { contentBulkPatchDomainLabel } from "./contentBulkFilterModel.js?v=677";
import { editorChip } from "./editorChipBlockView.js?v=677";
import {
  CONTENT_BULK_ROW_TARGET_SCOPES,
  createContentBulkRowTargetId,
} from "./contentBulkPackageOverview.js?v=677";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=677";

export const CONTENT_BULK_PATCH_PACKAGE_ADAPTER_VIEW_VERSION = "content-bulk-patch-package-adapter-view-v1";
const CONTENT_BULK_PACKAGE_ADAPTER_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderContentBulkPatchPackageAdapterPreview(preview, detailText = {}, options = {}) {
  const text = detailText.contentBulkPatchPackageAdapter || {};
  const summary = preview.summary || {};
  const input = options.input || {};
  const parseError = String(options.parseError || "");
  const visibleMappings = (preview.mappings || []).filter((mapping) => {
    if (typeof options.isMappingVisible !== "function") return true;
    return options.isMappingVisible(mapping, text);
  });
  const draftText = input.draftText || "";
  const hasAppliedInput = Boolean(String(input.appliedText || "").trim());
  const message = parseError || input.parseError || "";
  const inputState = message ? "error" : (hasAppliedInput ? "ready" : "template");
  const sourceName = input.sourceName
    || (hasAppliedInput ? (text.pasteSource || "Pasted JSON") : (text.templateSource || "Template preview"));
  const statusLabel = message
    ? (text.errorStatus || "JSON error")
    : (hasAppliedInput ? (text.readyStatus || "Preview ready") : (text.templateStatus || "Template preview"));
  const metrics = [
    [text.sourceKeys || "Source keys", `${summary.sourceKeyCount || 0}`],
    [text.recognizedKeys || "Recognized", `${summary.recognizedSourceKeyCount || 0}`],
    [text.unmappedKeys || "Unmapped", `${summary.unmappedArrayKeyCount || 0}`],
    [text.normalizedRows || "Normalized rows", `${summary.normalizedRowCount || 0}`],
    [text.stagedRows || "Staged rows", `${summary.stagedRowCount || 0}`],
    [text.withheldRows || "Withheld", `${summary.withheldRowCount || 0}`],
    [text.requiredChecks || "Checks", `${summary.requiredCheckCount || 0}`],
    [text.writes || "Writes", preview.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section id="content-bulk-package-adapter" class="editor-content-bulk-package" data-readonly="${preview.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Package Adapter")}">
      <div class="editor-content-bulk-package-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Package Adapter")}</h4>
          <p class="muted">${escapeHtml(text.description || "Normalizes external package aliases into the shared batch contract.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchPackageAdapter.version", {
          version: preview.version || "-"
        }, preview.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-package-input" data-state="${escapeAttribute(inputState)}">
        <div class="editor-content-bulk-package-input-head">
          <div>
            <h5>${escapeHtml(text.inputTitle || "Package JSON input")}</h5>
            <p>${escapeHtml(text.inputDescription || "Paste or load one external package JSON, then preview normalized rows before applying anything.")}</p>
          </div>
          <span>${escapeHtml(statusLabel)}</span>
        </div>
        <textarea data-content-bulk-package-json spellcheck="false" placeholder="${escapeAttribute(text.inputPlaceholder || "")}">${escapeHtml(draftText)}</textarea>
        <div class="editor-content-bulk-package-actions">
          <label class="editor-content-bulk-package-file">
            <span>${escapeHtml(text.loadFile || "Load file")}</span>
            <input type="file" accept=".json,application/json" data-content-bulk-package-file />
          </label>
          <button type="button" data-content-bulk-package-apply>${escapeHtml(text.applyPreview || "Preview input")}</button>
          <button type="button" data-content-bulk-package-sample>${escapeHtml(text.useSample || "Use sample")}</button>
          <button type="button" data-content-bulk-package-template>${escapeHtml(text.downloadTemplate || "Download template")}</button>
          <button type="button" data-content-bulk-package-reset>${escapeHtml(text.resetInput || "Reset")}</button>
        </div>
        <p class="editor-content-bulk-package-message">
          ${escapeHtml(message || tf("editorPrep.balanceTuningDetail.contentBulkPatchPackageAdapter.inputSource", {
            source: sourceName
          }, sourceName))}
        </p>
      </div>
      <div class="editor-content-bulk-package-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      <div class="editor-content-bulk-package-list">
        ${visibleMappings.map((mapping) => renderContentBulkPatchPackageMapping(mapping, text)).join("") || `<p class="muted">${escapeHtml(text.noFilteredRows || text.noMappings || "No package mappings.")}</p>`}
      </div>
      <div class="editor-content-bulk-package-grid">
        ${contentBulkChipBlock(text.unmappedArrayKeys || "Unmapped array keys", preview.normalized?.unmappedArrayKeys || [], { chipClass: "editor-chip" })}
      </div>
    </section>
  `;
}

export function renderContentBulkPatchPackageMapping(mapping, text = {}) {
  return `
    <article id="${escapeAttribute(createContentBulkRowTargetId(CONTENT_BULK_ROW_TARGET_SCOPES.packageDomain, mapping.domainId || mapping.batchKey))}" class="editor-content-bulk-package-domain" data-active="${mapping.rowCount > 0 ? "true" : "false"}">
      <div class="editor-content-bulk-package-domain-head">
        <div>
          <h5>${escapeHtml(contentBulkPatchDomainLabel(mapping.domainId, text))}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchPackageAdapter.domainMeta", {
            batchKey: mapping.batchKey || "-",
            rows: mapping.rowCount || 0,
            aliases: (mapping.aliases || []).length,
          }, `${mapping.batchKey || "-"} / ${mapping.rowCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${editorChip(mapping.rowCount > 0 ? (text.active || "Active") : (text.empty || "Empty"), CONTENT_BULK_PACKAGE_ADAPTER_CHIP_OPTIONS)}
        </div>
      </div>
      <div class="editor-content-bulk-package-grid">
        ${contentBulkChipBlock(text.sourceKeysForDomain || "Source keys", mapping.sourceKeys || [], { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.acceptedAliases || "Accepted aliases", mapping.aliases || [], { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.requiredInputs || "Required inputs", mapping.requiredInputFields || [], { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.identityFields || "Identity", mapping.identityFields || [], { chipClass: "editor-chip" })}
      </div>
    </article>
  `;
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
