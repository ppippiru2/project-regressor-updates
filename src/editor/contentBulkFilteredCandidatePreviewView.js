import { contentBulkChipBlock } from "./contentBulkChipBlockView.js?v=676";
import { createContentBulkFilteredCandidateStageGateReasonCodesFromPreview } from "./contentBulkFilteredCandidateStageGate.js?v=676";
import { contentBulkIssueList } from "./contentBulkIssueSummaryView.js?v=676";
import { contentBulkStageGateReasonLabels } from "./contentBulkStageGatePreviewLabels.js?v=676";
import { renderContentBulkRowContractReviewChip } from "./contentBulkRowContractReviewView.js?v=676";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=676";

const DETAIL_CHIP_OPTIONS = {
  blockClass: "",
  titleTag: "small",
  filterEmpty: true,
};

export function renderContentBulkFilteredCandidatePreview(preview = {}, detailText = {}) {
  const text = detailText.contentBulkFilteredCandidatePreview || {};
  const domainText = detailText.contentBulkDomainApplyReadiness || {};
  const rows = preview.limitedRows || [];
  const summary = preview.summary || {};
  const metrics = [
    [text.totalCandidates || "Total candidates", summary.totalRowCount || 0],
    [text.visibleCandidates || "Visible candidates", summary.visibleRowCount || 0],
    [text.blockingCandidates || "Blocking", summary.blockingRowCount || 0],
    [text.warningCandidates || "Review", summary.warningRowCount || 0],
    [text.readyCandidates || "Ready", summary.readyRowCount || 0],
    [text.targetSurfaces || "Target surfaces", summary.targetSurfaceCount || 0],
    [text.contractReadyRows || "Contract ready", summary.contractReadyRowCount || 0],
    [text.contractBlockedRows || "Contract blocked", summary.contractBlockedRowCount || 0],
    [text.stageGateReadyRows || "Stage ready", summary.stageGateReadyRowCount || 0],
    [text.stageGateBlockedRows || "Stage blocked", summary.stageGateBlockedRowCount || 0],
    [text.stageGateReviewRows || "Stage review", summary.stageGateReviewRowCount || 0],
  ];
  return `
    <section class="editor-content-bulk-contract-summary editor-content-bulk-filtered-candidates" data-content-bulk-filtered-candidates>
      <div>
        <strong>${escapeHtml(text.title || "Filtered candidate preview")}</strong>
        <p class="muted">${escapeHtml(text.description || "Read-only rows currently matched by the content bulk filter before dry-run or staged apply.")}</p>
      </div>
      <div class="editor-content-bulk-contract-metrics">
        ${metrics.map(([label, value]) => renderEditorSummaryCard(label, value)).join("")}
      </div>
      <div class="editor-content-bulk-contract-issues">
        ${contentBulkChipBlock(text.activeFilter || "Active filter", [
          activeFilterLabel(preview.activeFilter, text, domainText),
        ], detailChipOptions())}
        ${contentBulkChipBlock(text.sourceTypes || "Sources", sourceLabels(preview.visibleRows || [], text), detailChipOptions())}
        ${contentBulkChipBlock(text.stageGateReasons || "Stage gate reasons", stageGateReasonSummaryLabels(preview, text), detailChipOptions(text.noIssues))}
        ${contentBulkChipBlock(text.blockingIssues || "Blocking issues", issueLabels(preview.visibleRows || [], "blockingIssueCodes", text), detailChipOptions())}
        ${contentBulkChipBlock(text.warningIssues || "Warning issues", issueLabels(preview.visibleRows || [], "warningIssueCodes", text), detailChipOptions())}
      </div>
      <div class="editor-content-bulk-patch-draft-list">
        ${rows.map((row) => renderFilteredCandidateRow(row, text, domainText)).join("") || `<p class="muted">${escapeHtml(text.noCandidates || "No candidates match the current filter.")}</p>`}
      </div>
      ${summary.hiddenByLimitCount > 0 ? `<p class="muted">${escapeHtml((text.moreRows || "{count} more candidates hidden by preview limit.").replace("{count}", String(summary.hiddenByLimitCount)))}</p>` : ""}
    </section>
  `;
}

function renderFilteredCandidateRow(row = {}, text = {}, domainText = {}) {
  const stateLabels = {
    ...(domainText.filterLabels || {}),
    ...(domainText.stateLabels || {}),
    ...(text.stateLabels || {}),
  };
  return `
    <article class="editor-content-bulk-patch-draft-file editor-content-bulk-filtered-candidate" data-state="${escapeAttribute(row.bucket || row.state || "unknown")}" data-source="${escapeAttribute(row.source || "unknown")}">
      <div class="editor-content-bulk-patch-draft-file-head">
        <div>
          <h5>${escapeHtml(row.title || row.id || "candidate")}</h5>
          <p>${escapeHtml(row.sourceLabel || row.source || "source")} · ${escapeHtml(domainLabels(row.domains, text, domainText).join(" / "))}</p>
        </div>
        <span>${escapeHtml(stateLabels[row.bucket] || stateLabels[row.state] || row.state || "unknown")}</span>
      </div>
      <div class="editor-content-bulk-patch-draft-grid">
        ${contentBulkChipBlock(text.summary || "Summary", row.summaryParts || [], detailChipOptions())}
        ${contentBulkChipBlock(text.domains || "Domains", domainLabels(row.domains, text, domainText), detailChipOptions())}
        ${contentBulkChipBlock(text.targetSurfaces || "Target surfaces", [String(row.targetSurfaceCount || 0)], detailChipOptions())}
        ${renderContentBulkRowContractReviewChip(row.contractReview, text)}
        ${contentBulkChipBlock(text.stageGate || "Stage gate", stageGateLabels(row.stageGate, text), detailChipOptions())}
        ${contentBulkChipBlock(text.blockingIssues || "Blocking issues", contentBulkIssueList(row.blockingIssueCodes || [], text), detailChipOptions(text.noIssues))}
        ${contentBulkChipBlock(text.warningIssues || "Warning issues", contentBulkIssueList(row.warningIssueCodes || [], text), detailChipOptions(text.noIssues))}
      </div>
    </article>
  `;
}

function activeFilterLabel(activeFilter = {}, text = {}, domainText = {}) {
  const stateLabels = {
    ...(domainText.filterLabels || {}),
    ...(text.stateLabels || {}),
  };
  const domainLabelsById = {
    ...(domainText.domainLabels || {}),
    ...(text.domainLabels || {}),
  };
  const state = stateLabels[activeFilter.state] || activeFilter.state || "all";
  const domain = domainLabelsById[activeFilter.domain] || activeFilter.domain || "all";
  const query = activeFilter.query || text.noQuery || "none";
  return (text.activeFilterSummary || "{state} / {domain} / {query}")
    .replace("{state}", state)
    .replace("{domain}", domain)
    .replace("{query}", query);
}

function sourceLabels(rows = [], text = {}) {
  const labels = text.sourceLabels || {};
  const sources = Array.from(new Set(rows.map((row) => row.source).filter(Boolean)));
  return sources.length ? sources.map((source) => labels[source] || source) : [text.noIssues || "None"];
}

function issueLabels(rows = [], key, text = {}) {
  const issues = Array.from(new Set(rows.flatMap((row) => row[key] || []).filter(Boolean)));
  return contentBulkIssueList(issues, text);
}

function stageGateReasonSummaryLabels(preview = {}, text = {}) {
  const reasonCodes = createContentBulkFilteredCandidateStageGateReasonCodesFromPreview(preview);
  return contentBulkStageGateReasonLabels(reasonCodes, text.stageGateReasonLabels || {}, text);
}

function stageGateLabels(stageGate = {}, text = {}) {
  if (!stageGate?.version) return [text.noIssues || "None"];
  const statusLabels = text.stageGateStatusLabels || {};
  const status = statusLabels[stageGate.status] || stageGate.status || "unknown";
  const apply = stageGate.requiresExplicitApply ? (text.explicitApplyRequired || "Explicit apply required") : (text.explicitApplyNotRequired || "No apply required");
  const write = stageGate.writesGameData ? (text.writeEnabled || "Write enabled") : (text.readOnlyNoWrite || "Read-only");
  const summary = (text.stageGateSummary || "{status} / {apply} / {write}")
    .replace("{status}", status)
    .replace("{apply}", apply)
    .replace("{write}", write);
  const reasons = contentBulkStageGateReasonLabels(stageGate.reasonCodes || [], text.stageGateReasonLabels || {}, text);
  return [summary, ...reasons];
}

function domainLabels(domains = [], text = {}, domainText = {}) {
  const labels = {
    ...(domainText.domainLabels || {}),
    ...(text.domainLabels || {}),
  };
  const list = Array.isArray(domains) ? domains.filter(Boolean) : [];
  return list.length ? list.map((domain) => labels[domain] || domain) : [text.unknownDomain || "unknown"];
}

function detailChipOptions(emptyValue = "None") {
  return {
    ...DETAIL_CHIP_OPTIONS,
    emptyValue,
  };
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
  return escapeHtml(value);
}
