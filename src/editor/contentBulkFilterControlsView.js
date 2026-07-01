import {
  contentBulkDomainLabel,
  contentBulkFilterLabel,
} from "./contentBulkFilterModel.js?v=675";

export const CONTENT_BULK_FILTER_CONTROLS_VIEW_VERSION = "content-bulk-filter-controls-view-v1";

export function renderContentBulkFilterControls(text = {}, counts = {}, options = {}) {
  const filters = ["all", "blocked", "review", "ready", "active", "empty"];
  const domainFilters = Array.isArray(options.domainFilters) && options.domainFilters.length
    ? options.domainFilters
    : ["all"];
  const filter = options.filter || {};
  const activeState = normalizeContentBulkFilterState(filter.state);
  const activeDomain = normalizeContentBulkFilterDomain(filter.domain, domainFilters);
  const query = normalizeContentBulkSearchQuery(filter.query);
  const stateCounts = counts.states || counts;
  const domainCounts = counts.domains || {};
  return `
    <div class="editor-content-bulk-filter" role="group" aria-label="${escapeAttribute(text.stateFilter || "Bulk row filter")}">
      <label class="editor-content-bulk-search">
        <span>${escapeHtml(text.searchLabel || "Search")}</span>
        <input type="search" data-content-bulk-search value="${escapeAttribute(query)}" placeholder="${escapeAttribute(text.searchPlaceholder || "Monster, item, skill, file")}" />
      </label>
      <button class="editor-content-bulk-search-reset" type="button" data-content-bulk-search-reset ${query ? "" : "disabled"}>
        ${escapeHtml(text.resetSearch || "Reset")}
      </button>
      <div class="editor-content-bulk-filter-buttons">
        ${filters.map((state) => {
          const active = activeState === state;
          const label = contentBulkFilterLabel(state, text.filterLabels);
          const count = state === "all" ? stateCounts.all : stateCounts[state];
          return `
            <button class="editor-content-bulk-filter-button${active ? " is-active" : ""}" type="button" data-content-bulk-filter="${escapeAttribute(state)}" aria-pressed="${active ? "true" : "false"}">
              <span>${escapeHtml(label)}</span>
              <b>${escapeHtml(String(count || 0))}</b>
            </button>
          `;
        }).join("")}
      </div>
      <div class="editor-content-bulk-domain-filter" role="group" aria-label="${escapeAttribute(text.domainFilter || "Bulk domain filter")}">
        ${domainFilters.map((domain) => {
          const active = activeDomain === domain;
          const label = contentBulkDomainLabel(domain, text.domainLabels);
          const count = domain === "all" ? domainCounts.all : domainCounts[domain];
          return `
            <button class="editor-content-bulk-filter-button${active ? " is-active" : ""}" type="button" data-content-bulk-domain="${escapeAttribute(domain)}" aria-pressed="${active ? "true" : "false"}">
              <span>${escapeHtml(label)}</span>
              <b>${escapeHtml(String(count || 0))}</b>
            </button>
          `;
        }).join("")}
      </div>
    </div>
  `;
}

function normalizeContentBulkFilterState(state) {
  return ["all", "blocked", "review", "ready", "active", "empty"].includes(state) ? state : "all";
}

function normalizeContentBulkFilterDomain(domain, domainFilters = ["all"]) {
  return domainFilters.includes(domain) ? domain : "all";
}

function normalizeContentBulkSearchQuery(query) {
  return String(query || "").trim().toLowerCase();
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
