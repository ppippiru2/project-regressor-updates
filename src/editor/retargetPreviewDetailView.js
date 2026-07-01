import { tf } from "../localization/index.js?v=679";
import {
  createRetargetAssetSearchText,
  createRetargetTextSearchText,
  matchesRetargetFilter,
  normalizeRetargetKind,
} from "./retargetFilterModel.js?v=679";
import { editorChip } from "./editorChipBlockView.js?v=679";

export const RETARGET_PREVIEW_DETAIL_VIEW_VERSION = "retarget-preview-detail-view-v1";
const RETARGET_DETAIL_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderRetargetPreviewDetailView({
  preview = {},
  detailText = {},
  filter = {},
  expandedRows = new Set(),
} = {}) {
  const expandedSet = expandedRows instanceof Set ? expandedRows : new Set(expandedRows || []);
  const textEntries = (preview.textOverrides || [])
    .map((entry) => createRetargetTextRow(entry, detailText, expandedSet))
    .filter((entry) => matchesRetargetFilter(entry, filter));
  const assetEntries = (preview.assetOverrides || [])
    .map((entry) => createRetargetAssetRow(entry, detailText, expandedSet))
    .filter((entry) => matchesRetargetFilter(entry, filter));
  const textRows = textEntries.map((entry) => entry.html).join("");
  const assetRows = assetEntries.map((entry) => entry.html).join("");
  const visibleCount = textEntries.length + assetEntries.length;
  const totalCount = Number(preview.counts?.textOverrides || 0) + Number(preview.counts?.assetOverrides || 0);
  const filterSummary = retargetFilterSummary(detailText, filter);

  return `
    <section class="editor-retarget-detail" aria-label="${escapeAttribute(detailText.title || "Retarget Preview Detail")}">
      <div class="editor-retarget-head">
        <div>
          <h3>${escapeHtml(detailText.title || "")}</h3>
          <p class="muted">${escapeHtml(preview.description || "")}</p>
        </div>
        <span>${escapeHtml(preview.isComplete ? (detailText.ready || "") : (detailText.review || ""))}</span>
      </div>
      <div class="editor-retarget-summary">
        <strong>${escapeHtml(preview.title || "")}</strong>
        <span>${escapeHtml(tf("editorPrep.retargetDetail.route", {
          source: preview.sourceProfileId,
          target: preview.targetProfileId
        }, `${preview.sourceProfileId || ""} -> ${preview.targetProfileId || ""}`))}</span>
        <span>${escapeHtml(tf("editorPrep.retargetDetail.counts", {
          textCount: preview.counts?.textOverrides || 0,
          assetCount: preview.counts?.assetOverrides || 0,
          missingText: preview.counts?.missingTextTargets || 0,
          missingAssets: preview.counts?.missingAssetTargets || 0,
          mismatchedAssets: preview.counts?.mismatchedAssetTargets || 0
        }, ""))}</span>
      </div>
      <div class="editor-retarget-controls">
        <label class="editor-retarget-search">
          <span>${escapeHtml(detailText.searchLabel || "Search")}</span>
          <input type="search" data-retarget-search value="${escapeAttribute(filter.query || "")}" placeholder="${escapeAttribute(detailText.searchPlaceholder || "")}" />
        </label>
        <div class="editor-retarget-filter-buttons" role="group" aria-label="${escapeAttribute(detailText.typeFilter || "Type Filter")}">
          ${retargetKindButton("all", detailText.all || "All", filter)}
          ${retargetKindButton("text", detailText.textOnly || "Text", filter)}
          ${retargetKindButton("asset", detailText.assetOnly || "Assets", filter)}
        </div>
        <button class="editor-retarget-reset" type="button" data-retarget-reset>
          ${escapeHtml(detailText.reset || "Reset")}
        </button>
        <span class="editor-retarget-count">
          <strong>${escapeHtml(tf("editorPrep.retargetDetail.visibleCount", {
            visible: visibleCount,
            total: totalCount
          }, `${visibleCount}/${totalCount}`))}</strong>
          ${filterSummary ? `<small>${escapeHtml(filterSummary)}</small>` : ""}
        </span>
      </div>
      <div class="editor-retarget-grid">
        <section>
          <h4>${escapeHtml(tf("editorPrep.retargetDetail.textTitle", { count: preview.counts?.textOverrides || 0 }, ""))}</h4>
          <div class="editor-retarget-list">${textRows || emptyRetargetRows(detailText, "text", filter)}</div>
        </section>
        <section>
          <h4>${escapeHtml(tf("editorPrep.retargetDetail.assetTitle", { count: preview.counts?.assetOverrides || 0 }, ""))}</h4>
          <div class="editor-retarget-list">${assetRows || emptyRetargetRows(detailText, "asset", filter)}</div>
        </section>
      </div>
    </section>
  `;
}

function createRetargetTextRow(entry, detailText, expandedRows) {
  const rowId = `text:${entry.sourcePath}`;
  const expanded = expandedRows.has(rowId);
  const searchText = createRetargetTextSearchText(entry);
  return {
    kind: "text",
    searchText,
    html: `
      <article class="editor-retarget-row${expanded ? " is-expanded" : ""}" data-retarget-row-kind="text">
        ${retargetRowHeader(rowId, expanded, detailText)}
        <div class="editor-retarget-body">
          <div>
            <span>${escapeHtml(detailText.sourcePath || "Source")}</span>
            <code>${escapeHtml(entry.sourcePath)}</code>
          </div>
          <div>
            <span>${escapeHtml(detailText.targetTextPath || "Target")}</span>
            <code>${escapeHtml(entry.targetTextPath)}</code>
          </div>
          <p>${escapeHtml(entry.targetText || "")}</p>
        </div>
      </article>
    `
  };
}

function createRetargetAssetRow(entry, detailText, expandedRows) {
  const rowId = `asset:${entry.sourceAssetId}`;
  const expanded = expandedRows.has(rowId);
  const summary = tf("editorPrep.retargetDetail.assetSummary", {
    plannedFile: entry.plannedWebpFile || entry.plannedSourceFile || "-",
    mappedTarget: entry.mappedTargetAssetId || "-",
    slotCount: entry.slotPaths.length
  }, "");
  const searchText = createRetargetAssetSearchText(entry);
  return {
    kind: "asset",
    searchText,
    html: `
      <article class="editor-retarget-row${expanded ? " is-expanded" : ""}" data-retarget-row-kind="asset">
        ${retargetRowHeader(rowId, expanded, detailText)}
        <div class="editor-retarget-body">
          <div>
            <span>${escapeHtml(detailText.sourceAsset || "Source Asset")}</span>
            <code>${escapeHtml(entry.sourceAssetId)}</code>
          </div>
          <div>
            <span>${escapeHtml(detailText.targetAsset || "Target Asset")}</span>
            <code>${escapeHtml(entry.targetAssetId)}</code>
          </div>
          <p>${escapeHtml(summary)}</p>
          <div class="editor-chip-list">${entry.slotPaths.map((slotPath) => editorChip(slotPath, RETARGET_DETAIL_CHIP_OPTIONS)).join("")}</div>
        </div>
      </article>
    `
  };
}

function retargetRowHeader(rowId, expanded, detailText) {
  return `
    <div class="editor-retarget-row-head">
      <span>${escapeHtml(rowId.startsWith("asset:") ? (detailText.assetRow || "Asset") : (detailText.textRow || "Text"))}</span>
      <button class="editor-retarget-toggle" type="button" data-retarget-toggle="${escapeAttribute(rowId)}" aria-expanded="${expanded ? "true" : "false"}">
        ${escapeHtml(expanded ? (detailText.collapse || "Collapse") : (detailText.expand || "Expand"))}
      </button>
    </div>
  `;
}

function retargetKindButton(kind, label, filter = {}) {
  const active = normalizeRetargetKind(filter.kind) === kind;
  return `
    <button class="editor-retarget-filter${active ? " is-active" : ""}" type="button" data-retarget-kind="${escapeAttribute(kind)}" aria-pressed="${active ? "true" : "false"}">
      ${escapeHtml(label)}
    </button>
  `;
}

function retargetFilterSummary(detailText, filter = {}) {
  const filterKind = normalizeRetargetKind(filter.kind);
  const query = String(filter.query || "").trim();
  const filterLabel = filterKind === "asset" ? (detailText.assetOnly || "Assets") : (detailText.textOnly || "Text");

  if (filterKind !== "all" && query) {
    return tf("editorPrep.retargetDetail.activeFilterAndSearch", {
      filter: filterLabel,
      query
    }, `${filterLabel} - ${query}`);
  }

  if (filterKind !== "all") {
    return tf("editorPrep.retargetDetail.activeFilter", {
      filter: filterLabel
    }, filterLabel);
  }

  if (query) {
    return tf("editorPrep.retargetDetail.activeSearch", {
      query
    }, query);
  }

  return "";
}

function emptyRetargetRows(detailText, sectionKind, filter = {}) {
  const filterKind = normalizeRetargetKind(filter.kind);
  const query = String(filter.query || "").trim();
  const sectionLabel = sectionKind === "asset" ? (detailText.assetOnly || "Assets") : (detailText.textOnly || "Text");
  const filterLabel = filterKind === "asset" ? (detailText.assetOnly || "Assets") : (detailText.textOnly || "Text");
  let message = detailText.empty || "";
  let showResetHint = false;

  if (filterKind !== "all" && filterKind !== sectionKind) {
    message = tf("editorPrep.retargetDetail.emptyByType", {
      filter: filterLabel,
      section: sectionLabel
    }, message);
    showResetHint = true;
  } else if (query) {
    message = tf("editorPrep.retargetDetail.emptyBySearch", {
      query
    }, message);
    showResetHint = true;
  }

  return `
    <p class="editor-retarget-empty">
      <span>${escapeHtml(message)}</span>
      ${showResetHint ? `<small>${escapeHtml(detailText.emptyResetHint || "")}</small>` : ""}
    </p>
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
