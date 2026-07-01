import { tf } from "../localization/index.js?v=678";
import { contentBulkChipBlock } from "./contentBulkChipBlockView.js?v=678";
import { contentBulkPatchDomainLabel } from "./contentBulkFilterModel.js?v=678";
import { editorChip } from "./editorChipBlockView.js?v=678";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=678";

export const CONTENT_BULK_PATCH_INTAKE_CONTRACT_VIEW_VERSION = "content-bulk-patch-intake-contract-view-v1";
const CONTENT_BULK_INTAKE_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderContentBulkPatchIntakeContract(contract, detailText = {}) {
  const text = detailText.contentBulkPatchIntakeContract || {};
  const summary = contract.summary || {};
  const metrics = [
    [text.domains || "Domains", `${summary.domainCount || 0}`],
    [text.batchKeys || "Batch keys", `${summary.batchKeyCount || 0}`],
    [text.requiredFields || "Required fields", `${summary.requiredFieldCount || 0}`],
    [text.uniqueChecks || "Checks", `${summary.uniqueCheckCount || 0}`],
    [text.currentRows || "Current rows", `${summary.currentRowCount || 0}`],
    [text.writes || "Writes", contract.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-intake" data-readonly="${contract.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Intake Contract")}">
      <div class="editor-content-bulk-intake-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Intake Contract")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only batch input contract.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchIntakeContract.version", {
          version: contract.version || "-"
        }, contract.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-intake-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      <div class="editor-content-bulk-intake-list">
        ${(contract.domains || []).map((domain) => renderContentBulkPatchIntakeDomain(domain, text)).join("") || `<p class="muted">${escapeHtml(text.noDomains || "No domains.")}</p>`}
      </div>
    </section>
  `;
}

function renderContentBulkPatchIntakeDomain(domain, text = {}) {
  return `
    <article class="editor-content-bulk-intake-domain">
      <div class="editor-content-bulk-intake-domain-head">
        <div>
          <h5>${escapeHtml(contentBulkPatchDomainLabel(domain.id, text))}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchIntakeContract.domainMeta", {
            batchKey: domain.batchKey || "-",
            rows: domain.currentRowCount || 0,
            fields: (domain.requiredInputFields || []).length
          }, `${domain.batchKey || "-"} / ${domain.currentRowCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${editorChip(text.appendOrUpdate || "Append/update", CONTENT_BULK_INTAKE_CHIP_OPTIONS)}
        </div>
      </div>
      <div class="editor-content-bulk-intake-grid">
        ${contentBulkChipBlock(text.batchKey || "Batch key", [domain.batchKey].filter(Boolean), { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.identityFields || "Identity", domain.identityFields || [], { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.requiredInputs || "Required inputs", domain.requiredInputFields || [], { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.guardChecks || "Guard checks", domain.checkScripts || [], { chipClass: "editor-chip" })}
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
