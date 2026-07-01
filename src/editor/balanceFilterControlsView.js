import { tf } from "../localization/index.js?v=678";

export const BALANCE_FILTER_CONTROLS_VIEW_VERSION = "balance-filter-controls-view-v1";

export function renderBalanceFilterControls(detailText = {}, visibleCount = 0, totalCount = 0, options = {}) {
  const filter = normalizeBalanceFilter(options.filter);
  const filterSummary = balanceFilterSummary(detailText, filter);
  return `
    <div class="editor-balance-controls">
      <label class="editor-balance-search">
        <span>${escapeHtml(detailText.searchLabel || "Search")}</span>
        <input type="search" data-balance-search value="${escapeAttribute(filter.query)}" placeholder="${escapeAttribute(detailText.searchPlaceholder || "")}" />
      </label>
      <div class="editor-balance-filter-buttons" role="group" aria-label="${escapeAttribute(detailText.scopeFilter || "Scope Filter")}">
        ${balanceScopeButton("all", detailText.allScopes || "All", filter)}
        ${balanceScopeButton("engine-balance", "engine-balance", filter)}
        ${balanceScopeButton("content-balance", "content-balance", filter)}
      </div>
      <button class="editor-balance-reset" type="button" data-balance-reset>
        ${escapeHtml(detailText.reset || "Reset")}
      </button>
      <span class="editor-balance-count">
        <strong>${escapeHtml(tf("editorPrep.balanceTuningDetail.visibleCount", {
          visible: visibleCount,
          total: totalCount
        }, `${visibleCount}/${totalCount}`))}</strong>
        ${filterSummary ? `<small>${escapeHtml(filterSummary)}</small>` : ""}
      </span>
    </div>
  `;
}

export function renderEmptyBalanceRows(detailText = {}, options = {}) {
  const filter = normalizeBalanceFilter(options.filter);
  const query = String(filter.query || "").trim();
  const scope = normalizeBalanceScope(filter.scope);
  const candidateLabel = String(filter.candidateLabel || "").trim();
  let message = detailText.empty || "";
  if (candidateLabel) {
    message = tf("editorPrep.balanceTuningDetail.emptyByCandidate", {
      candidate: candidateLabel
    }, message);
  } else if (scope !== "all" && query) {
    message = tf("editorPrep.balanceTuningDetail.emptyByFilterAndSearch", {
      filter: scope,
      query
    }, message);
  } else if (scope !== "all") {
    message = tf("editorPrep.balanceTuningDetail.emptyByFilter", {
      filter: scope
    }, message);
  } else if (query) {
    message = tf("editorPrep.balanceTuningDetail.emptyBySearch", {
      query
    }, message);
  }

  return `
    <p class="editor-balance-empty">
      <span>${escapeHtml(message)}</span>
      <small>${escapeHtml(detailText.emptyResetHint || "")}</small>
    </p>
  `;
}

function balanceScopeButton(scope, label, filter = {}) {
  const active = normalizeBalanceScope(filter.scope) === scope;
  return `
    <button class="editor-balance-filter${active ? " is-active" : ""}" type="button" data-balance-scope="${escapeAttribute(scope)}" aria-pressed="${active ? "true" : "false"}">
      ${escapeHtml(label)}
    </button>
  `;
}

function balanceFilterSummary(detailText = {}, filter = {}) {
  const scope = normalizeBalanceScope(filter.scope);
  const query = String(filter.query || "").trim();
  const candidateLabel = String(filter.candidateLabel || "").trim();

  if (candidateLabel) {
    return tf("editorPrep.balanceTuningDetail.activeCandidate", {
      candidate: candidateLabel
    }, candidateLabel);
  }

  if (scope !== "all" && query) {
    return tf("editorPrep.balanceTuningDetail.activeFilterAndSearch", {
      filter: scope,
      query
    }, `${scope} · ${query}`);
  }

  if (scope !== "all") {
    return tf("editorPrep.balanceTuningDetail.activeFilter", {
      filter: scope
    }, scope);
  }

  if (query) {
    return tf("editorPrep.balanceTuningDetail.activeSearch", {
      query
    }, query);
  }

  return "";
}

function normalizeBalanceFilter(filter = {}) {
  return {
    scope: normalizeBalanceScope(filter.scope),
    query: String(filter.query || ""),
    candidateLabel: String(filter.candidateLabel || ""),
  };
}

function normalizeBalanceScope(value) {
  return ["all", "engine-balance", "content-balance"].includes(value) ? value : "all";
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
