import { tf } from "../localization/index.js?v=680";
import { editorChipBlock } from "./editorChipBlockView.js?v=680";
import { renderEditorSummaryCard } from "./editorMetricView.js?v=680";

export const BALANCE_CANDIDATE_SUMMARY_VIEW_VERSION = "balance-candidate-summary-view-v1";
const BALANCE_DETAIL_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderActiveBalanceCandidateSummary(detailText = {}, relatedChecks = [], candidates = [], visibleGroups = [], options = {}) {
  const candidate = options.activeCandidate || null;
  const context = createBalanceCandidateRenderContext(options);
  if (!candidate) {
    const overview = balanceCandidateOverviewSummary(candidates, relatedChecks, context);
    return `
      <section class="editor-balance-active-candidate" data-balance-active-summary data-state="overview" aria-label="${escapeAttribute(detailText.candidatePinnedOverview || "Tuning candidate summary")}">
        <div class="editor-balance-active-candidate-head">
          <div>
            <span>${escapeHtml(detailText.candidatePinnedOverview || "")}</span>
            <h4>${escapeHtml(tf("editorPrep.balanceTuningDetail.candidateOverviewCount", {
              count: overview.candidateCount
            }, `${overview.candidateCount}`))}</h4>
            <p>${escapeHtml(detailText.candidatePinnedOverviewDescription || "")}</p>
          </div>
          <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.candidatePriorityValue", {
            priority: overview.topPriority || "-"
          }, `#${overview.topPriority || "-"}`))}</strong>
        </div>
        <div class="editor-balance-active-candidate-metrics">
          ${balanceActiveCandidateMetric(detailText.candidatePriority || "Priority", tf("editorPrep.balanceTuningDetail.candidateOverviewPriority", {
            priority: overview.topPriority || "-"
          }, `#${overview.topPriority || "-"}`))}
          ${balanceActiveCandidateMetric(detailText.candidateGroups || "Groups", tf("editorPrep.balanceTuningDetail.candidateOverviewGroups", {
            count: overview.groupCount
          }, `${overview.groupCount}`))}
          ${balanceActiveCandidateMetric(detailText.candidateChecks || "Checks", tf("editorPrep.balanceTuningDetail.candidateOverviewChecks", {
            count: overview.checkCount
          }, `${overview.checkCount}`))}
        </div>
        ${editorChipBlock(detailText.candidateSignals || "Signals", overview.signals, BALANCE_DETAIL_CHIP_OPTIONS)}
      </section>
    `;
  }
  const impact = balanceCandidateImpactSummary(candidate, context);
  const visibleImpact = balanceGroupCollectionSummary(visibleGroups);
  const valueRanges = balanceCandidateValueRangeLabels(candidate, detailText, context);
  const checkLabels = balanceCandidateCheckLabels(candidate, relatedChecks);
  return `
    <section class="editor-balance-active-candidate" data-balance-active-summary data-state="selected" aria-label="${escapeAttribute(detailText.activeCandidateSummary || "Selected tuning candidate")}">
      <div class="editor-balance-active-candidate-head">
        <div>
          <span>${escapeHtml(detailText.activeCandidateSummary || "")}</span>
          <h4>${escapeHtml(candidate.label || candidate.id || "")}</h4>
          <p>${escapeHtml(candidate.purpose || "")}</p>
        </div>
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.candidatePriorityValue", {
          priority: candidate.priority || "-"
        }, `#${candidate.priority || "-"}`))}</strong>
      </div>
      <div class="editor-balance-active-candidate-metrics">
        ${balanceActiveCandidateMetric(detailText.candidateImpact || "Impact", tf("editorPrep.balanceTuningDetail.candidateImpactSummary", {
          groups: impact.groupCount,
          files: impact.fileCount,
          exports: impact.exportCount
        }, `${impact.groupCount} · ${impact.fileCount} · ${impact.exportCount}`))}
        ${balanceActiveCandidateMetric(detailText.candidateVisibleGroups || "Visible groups", tf("editorPrep.balanceTuningDetail.candidateVisibleGroupSummary", {
          visible: visibleImpact.groupCount,
          total: impact.groupCount,
          files: visibleImpact.fileCount,
          exports: visibleImpact.exportCount
        }, `${visibleImpact.groupCount}/${impact.groupCount}`))}
        ${balanceActiveCandidateMetric(detailText.candidateValueRanges || "Value Ranges", valueRanges.join(" / "))}
        ${balanceActiveCandidateMetric(detailText.candidateChecks || "Checks", checkLabels.join(" / ") || "-")}
      </div>
      ${editorChipBlock(detailText.candidateSignals || "Signals", candidate.signals || [], BALANCE_DETAIL_CHIP_OPTIONS)}
      ${editorChipBlock(detailText.candidateGroups || "Groups", candidate.groups || [], BALANCE_DETAIL_CHIP_OPTIONS)}
    </section>
  `;
}

export function renderBalanceDomainSummaries(domains = [], detailText = {}, relatedChecks = [], options = {}) {
  if (!domains.length) return "";
  const labels = detailText.domainLabels || {};
  const descriptions = detailText.domainDescriptions || {};
  const context = createBalanceCandidateRenderContext(options);
  return `
    <section class="editor-balance-domain-list" aria-label="${escapeAttribute(detailText.domainSummaries || "Balance domains")}">
      <strong>${escapeHtml(detailText.domainSummaries || "")}</strong>
      ${domains.map((domain) => {
        const summary = balanceDomainImpactSummary(domain, context);
        return `
          <article class="editor-balance-domain">
            <div class="editor-balance-domain-head">
              <div>
                <h4>${escapeHtml(labels[domain.id] || domain.id || "")}</h4>
                <p>${escapeHtml(descriptions[domain.id] || "")}</p>
              </div>
              <span>${escapeHtml(domain.scope || "")}</span>
            </div>
            <div class="editor-balance-domain-impact">
              <span>${escapeHtml(detailText.domainImpact || "Impact")}</span>
              <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.domainImpactSummary", {
                groups: summary.groupCount,
                files: summary.fileCount,
                exports: summary.exportCount
              }, `${summary.groupCount} · ${summary.fileCount} · ${summary.exportCount}`))}</strong>
            </div>
            <div class="editor-balance-domain-impact">
              <span>${escapeHtml(detailText.domainPriority || "Priority")}</span>
              <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.domainPriorityValue", {
                priority: domain.priority || "-"
              }, `#${domain.priority || "-"}`))}</strong>
            </div>
            ${editorChipBlock(detailText.domainGroups || "Groups", domain.groups || [], BALANCE_DETAIL_CHIP_OPTIONS)}
            ${editorChipBlock(detailText.domainExports || "Exports", balanceDomainExportNames(domain, context), BALANCE_DETAIL_CHIP_OPTIONS)}
            ${editorChipBlock(detailText.domainValueShapes || "Value Shapes", balanceDomainValueShapeLabels(domain, detailText, context), BALANCE_DETAIL_CHIP_OPTIONS)}
            ${editorChipBlock(detailText.domainValueRanges || "Value Ranges", balanceDomainValueRangeLabels(domain, detailText, context), BALANCE_DETAIL_CHIP_OPTIONS)}
            ${editorChipBlock(detailText.domainChecks || "Checks", balanceDomainCheckLabels(domain, relatedChecks), BALANCE_DETAIL_CHIP_OPTIONS)}
            ${editorChipBlock(detailText.domainSignals || "Signals", balanceDomainSignalLabels(domain, detailText), BALANCE_DETAIL_CHIP_OPTIONS)}
            ${editorChipBlock(detailText.domainWatch || "Watch", domain.watch || [], BALANCE_DETAIL_CHIP_OPTIONS)}
          </article>
        `;
      }).join("")}
    </section>
  `;
}

export function renderBalanceTuningCandidates(candidates = [], detailText = {}, relatedChecks = [], options = {}) {
  if (!candidates.length) return "";
  const context = createBalanceCandidateRenderContext(options);
  const activeCandidateId = options.activeCandidateId || "";
  return `
    <section class="editor-balance-candidate-list" aria-label="${escapeAttribute(detailText.tuningCandidates || "Tuning candidates")}">
      <strong>${escapeHtml(detailText.tuningCandidates || "")}</strong>
      ${candidates.map((candidate) => `
        <button class="editor-balance-candidate${activeCandidateId === candidate.id ? " is-active" : ""}" type="button" data-balance-candidate="${escapeAttribute(candidate.id || "")}" aria-pressed="${activeCandidateId === candidate.id ? "true" : "false"}">
          <div>
            <h4>${escapeHtml(candidate.label || candidate.id || "")}</h4>
            <p>${escapeHtml(candidate.purpose || "")}</p>
          </div>
          ${balanceCandidatePriorityBlock(candidate, detailText)}
          ${balanceCandidateImpactBlock(balanceCandidateImpactSummary(candidate, context), detailText)}
          ${editorChipBlock(detailText.candidateSignals || "Signals", candidate.signals || [], BALANCE_DETAIL_CHIP_OPTIONS)}
          ${editorChipBlock(detailText.candidateValueRanges || "Value Ranges", balanceCandidateValueRangeLabels(candidate, detailText, context), BALANCE_DETAIL_CHIP_OPTIONS)}
          ${editorChipBlock(detailText.candidateGroups || "Groups", candidate.groups || [], BALANCE_DETAIL_CHIP_OPTIONS)}
          ${editorChipBlock(detailText.candidateChecks || "Checks", balanceCandidateCheckLabels(candidate, relatedChecks), BALANCE_DETAIL_CHIP_OPTIONS)}
        </button>
      `).join("")}
    </section>
  `;
}

function createBalanceCandidateRenderContext(options = {}) {
  const groups = Array.isArray(options.groups) ? options.groups : [];
  const previewById = options.previewById instanceof Map ? options.previewById : new Map();
  return { groups, previewById };
}

function balanceCandidateOverviewSummary(candidates = [], relatedChecks = [], context = createBalanceCandidateRenderContext()) {
  const candidateList = Array.isArray(candidates) ? candidates : [];
  const groups = new Set(candidateList.flatMap((candidate) => normalizeBalanceCandidateGroups(candidate.groups, context)));
  const checkIds = new Set((relatedChecks || []).map((check) => check.id));
  const checks = new Set();
  const signals = new Set();
  const priorities = [];
  for (const candidate of candidateList) {
    if (Number.isFinite(Number(candidate.priority))) priorities.push(Number(candidate.priority));
    for (const checkId of candidate.checks || []) {
      if (!checkIds.size || checkIds.has(checkId)) checks.add(checkId);
    }
    for (const signal of candidate.signals || []) {
      signals.add(signal);
    }
  }
  return {
    candidateCount: candidateList.length,
    groupCount: groups.size,
    checkCount: checks.size,
    signalCount: signals.size,
    topPriority: priorities.length ? Math.min(...priorities) : 0,
    signals: [...signals].slice(0, 6)
  };
}

function balanceActiveCandidateMetric(label, value) {
  return renderEditorSummaryCard(label, value || "-");
}

function balanceDomainImpactSummary(domain = {}, context = createBalanceCandidateRenderContext()) {
  return balanceLinkedGroupSummary(domain.groups || [], context);
}

function balanceDomainExportNames(domain = {}, context = createBalanceCandidateRenderContext()) {
  const groupIds = new Set(domain.groups || []);
  return [...new Set(context.groups
    .filter((group) => groupIds.has(group.id))
    .flatMap((group) => group.exports || []))];
}

function balanceDomainValueShapeLabels(domain = {}, detailText = {}, context = createBalanceCandidateRenderContext()) {
  const groupIds = new Set(domain.groups || []);
  const counts = new Map();
  for (const group of context.groups.filter((entry) => groupIds.has(entry.id))) {
    const preview = context.previewById.get(group.id);
    for (const item of preview?.items || []) {
      const type = item.type || "unknown";
      counts.set(type, (counts.get(type) || 0) + 1);
    }
  }
  return [...counts.entries()]
    .sort(([leftType], [rightType]) => leftType.localeCompare(rightType))
    .map(([type, count]) => tf("editorPrep.balanceTuningDetail.domainValueShapeItem", {
      type: balanceValueTypeLabel(type, detailText),
      count
    }, `${type} ${count}`));
}

function balanceDomainValueRangeLabels(domain = {}, detailText = {}, context = createBalanceCandidateRenderContext()) {
  return balanceGroupValueRangeLabels(domain.groups || [], detailText, context);
}

function balanceGroupValueRangeLabels(groupLinks = [], detailText = {}, context = createBalanceCandidateRenderContext()) {
  const groupIds = new Set(groupLinks || []);
  const numericValues = [];
  let objectFieldCount = 0;
  let arrayItemCount = 0;
  for (const group of context.groups.filter((entry) => groupIds.has(entry.id))) {
    const preview = context.previewById.get(group.id);
    for (const item of preview?.items || []) {
      if (item.type === "number") {
        const value = Number(item.value);
        if (Number.isFinite(value)) numericValues.push(value);
      }
      if (item.type === "object") objectFieldCount += Number(item.count || 0);
      if (item.type === "array") arrayItemCount += Number(item.count || 0);
    }
  }
  const labels = [];
  if (numericValues.length) {
    labels.push(tf("editorPrep.balanceTuningDetail.domainValueRangeNumber", {
      min: Math.min(...numericValues),
      max: Math.max(...numericValues)
    }, `${Math.min(...numericValues)}~${Math.max(...numericValues)}`));
  }
  if (objectFieldCount) {
    labels.push(tf("editorPrep.balanceTuningDetail.domainValueRangeObject", { count: objectFieldCount }, `${objectFieldCount} fields`));
  }
  if (arrayItemCount) {
    labels.push(tf("editorPrep.balanceTuningDetail.domainValueRangeArray", { count: arrayItemCount }, `${arrayItemCount} items`));
  }
  return labels.length ? labels : [detailText.domainValueRangeEmpty || "No range"];
}

function balanceDomainCheckLabels(domain = {}, relatedChecks = []) {
  return balanceCheckLabels(domain.checks || [], relatedChecks);
}

function balanceDomainSignalLabels(domain = {}, detailText = {}) {
  const labels = detailText.domainSignalLabels || {};
  return (domain.signals || []).map((signal) => labels[signal] || signal);
}

function balanceValueTypeLabel(type, detailText = {}) {
  return detailText.valueTypeLabels?.[type] || type;
}

function balanceCandidatePriorityBlock(candidate = {}, detailText = {}) {
  return `
    <div class="editor-balance-candidate-impact">
      <span>${escapeHtml(detailText.candidatePriority || "Priority")}</span>
      <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.candidatePriorityValue", {
        priority: candidate.priority || "-"
      }, `#${candidate.priority || "-"}`))}</strong>
    </div>
  `;
}

function balanceCandidateCheckLabels(candidate = {}, relatedChecks = []) {
  return balanceCheckLabels(candidate.checks || [], relatedChecks);
}

function balanceCandidateValueRangeLabels(candidate = {}, detailText = {}, context = createBalanceCandidateRenderContext()) {
  return balanceGroupValueRangeLabels(normalizeBalanceCandidateGroups(candidate.groups, context), detailText, context);
}

function balanceCheckLabels(checkIds = [], relatedChecks = []) {
  const checkLabels = new Map((relatedChecks || []).map((check) => [check.id, check.label || check.id]));
  return (checkIds || []).map((checkId) => checkLabels.get(checkId) || checkId);
}

function balanceCandidateImpactBlock(summary, detailText = {}) {
  return `
    <div class="editor-balance-candidate-impact">
      <span>${escapeHtml(detailText.candidateImpact || "Impact")}</span>
      <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.candidateImpactSummary", {
        groups: summary.groupCount,
        files: summary.fileCount,
        exports: summary.exportCount
      }, `${summary.groupCount} · ${summary.fileCount} · ${summary.exportCount}`))}</strong>
    </div>
  `;
}

function balanceCandidateImpactSummary(candidate = {}, context = createBalanceCandidateRenderContext()) {
  return balanceLinkedGroupSummary(normalizeBalanceCandidateGroups(candidate.groups, context), context);
}

function balanceLinkedGroupSummary(groupLinks = [], context = createBalanceCandidateRenderContext()) {
  const groupIds = new Set(groupLinks);
  const linkedGroups = context.groups.filter((group) => groupIds.has(group.id));
  return balanceGroupCollectionSummary(linkedGroups);
}

function balanceGroupCollectionSummary(groups = []) {
  const linkedGroups = Array.isArray(groups) ? groups : [];
  const files = new Set(linkedGroups.flatMap((group) => group.files || []));
  const exports = new Set(linkedGroups.flatMap((group) => group.exports || []));
  return {
    groupCount: linkedGroups.length,
    fileCount: files.size,
    exportCount: exports.size
  };
}

function normalizeBalanceCandidateGroups(value, context = createBalanceCandidateRenderContext()) {
  if (!Array.isArray(value)) return [];
  const groupIds = new Set(context.groups.map((group) => group.id));
  return value.filter((groupId) => typeof groupId === "string" && groupIds.has(groupId));
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
