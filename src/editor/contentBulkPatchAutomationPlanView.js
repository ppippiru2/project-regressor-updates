import { tf } from "../localization/index.js?v=675";
import { contentBulkChipBlock } from "./contentBulkChipBlockView.js?v=675";
import { contentBulkFallbackLabel, contentBulkPatchDomainLabel } from "./contentBulkFilterModel.js?v=675";
import { editorChip } from "./editorChipBlockView.js?v=675";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=675";

export const CONTENT_BULK_PATCH_AUTOMATION_PLAN_VIEW_VERSION = "content-bulk-patch-automation-plan-view-v1";
const CONTENT_BULK_AUTOMATION_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderContentBulkPatchAutomationPlan(plan, detailText = {}) {
  const text = detailText.contentBulkPatchAutomationPlan || {};
  const summary = plan.summary || {};
  const metrics = [
    [text.domains || "Domains", `${summary.domainCount || 0}`],
    [text.currentRows || "Current rows", `${summary.currentRowCount || 0}`],
    [text.surfaceTemplates || "Surface templates", `${summary.surfaceTemplateCount || 0}`],
    [text.generatedSurfaces || "Generated surfaces", `${summary.generatedSurfaceCount || 0}`],
    [text.contractReady || "Contract ready", `${summary.contractReadyDomainCount || 0}`],
    [text.writes || "Writes", plan.writesGameData === false ? (text.readOnly || "Read-only") : "Live"],
  ];
  return `
    <section class="editor-content-bulk-automation" data-readonly="${plan.writesGameData === false ? "true" : "false"}" aria-label="${escapeAttribute(text.title || "Content Bulk Patch Automation Plan")}">
      <div class="editor-content-bulk-automation-head">
        <div>
          <h4>${escapeHtml(text.title || "Content Bulk Patch Automation Plan")}</h4>
          <p class="muted">${escapeHtml(text.description || "Read-only content batch expansion contract.")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchAutomationPlan.version", {
          version: plan.version || "-"
        }, plan.version || "-"))}</strong>
      </div>
      <div class="editor-content-bulk-automation-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      <div class="editor-content-bulk-automation-list">
        ${(plan.domains || []).map((domain) => renderContentBulkPatchAutomationDomain(domain, text)).join("") || `<p class="muted">${escapeHtml(text.noDomains || "No domains.")}</p>`}
      </div>
    </section>
  `;
}

function renderContentBulkPatchAutomationDomain(domain, text = {}) {
  return `
    <article class="editor-content-bulk-automation-domain" data-state="${escapeAttribute(domain.coverageState || "unknown")}">
      <div class="editor-content-bulk-automation-domain-head">
        <div>
          <h5>${escapeHtml(contentBulkPatchDomainLabel(domain.id, text))}</h5>
          <p>${escapeHtml(tf("editorPrep.balanceTuningDetail.contentBulkPatchAutomationPlan.domainMeta", {
            rows: domain.currentRowCount || 0,
            surfaces: domain.surfaceTemplateCount || 0,
            generated: domain.generatedSurfaceCount || 0
          }, `${domain.currentRowCount || 0} / ${domain.surfaceTemplateCount || 0}`))}</p>
        </div>
        <div class="editor-chip-list">
          ${editorChip(contentBulkFallbackLabel(domain.coverageState, text.stateLabels), CONTENT_BULK_AUTOMATION_CHIP_OPTIONS)}
        </div>
      </div>
      <div class="editor-content-bulk-automation-grid">
        ${contentBulkChipBlock(text.requiredInputs || "Required inputs", domain.requiredInputFields || [], { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.batchIdentity || "Batch identity", [domain.batchKey, ...(domain.identityFields || [])].filter(Boolean), { chipClass: "editor-chip" })}
        ${contentBulkChipBlock(text.targetSurfaces || "Target surfaces", domain.surfaces || [], { chipClass: "editor-chip" })}
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
