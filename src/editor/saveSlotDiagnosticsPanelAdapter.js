import { renderSaveDiagnosticCardView } from "./saveSlotDiagnosticCardView.js?v=680";
import { createSaveSlotDiagnosticsModel } from "./saveSlotDiagnosticsModel.js?v=680";
import { renderSaveSlotDiagnosticsPanel } from "./saveSlotDiagnosticsPanel.js?v=680";

export function createSaveSlotDiagnosticsPanelRenderer(options = {}) {
  return function renderSaveSlotDiagnostics() {
    const formatters = normalizeFormatters(options.formatters);
    const translate = normalizeTranslate(options.translate);
    const diagnostics = createSaveSlotDiagnostics(options);
    const text = options.text || {};
    const activeSlotValue = diagnostics.activeSlot.raw || text.emptyValue || "";
    return renderSaveSlotDiagnosticsPanel({
      diagnostics,
      text,
      keys: options.keys || {},
      activeSlotValue,
      slotCountText: translate("editorPrep.saveDiagnostics.slotCountValue", {
        filled: diagnostics.slotCounts.filled,
        total: diagnostics.slotCounts.total,
        invalid: diagnostics.slotCounts.invalid,
      }, `${diagnostics.slotCounts.filled}/${diagnostics.slotCounts.total}`),
      renderMetricCard: options.renderMetricCard,
      renderDiagnosticCard: (card) => renderSaveDiagnosticCard(card, options),
      statusLabel: formatters.statusLabel,
      sectionRenderers: options.sectionRenderers,
    });
  };
}

export function createSaveSlotDiagnostics(options = {}) {
  const formatters = normalizeFormatters(options.formatters);
  return createSaveSlotDiagnosticsModel({
    keys: options.keys || {},
    slotIds: options.slotIds || [],
    noActiveSlot: options.noActiveSlot || "",
    text: options.text || {},
    locale: options.locale,
    translate: normalizeTranslate(options.translate),
    storage: options.storage,
    formatNumber: formatters.formatNumber,
    formatValue: formatters.formatValue,
    emptyValue: formatters.emptyValue,
  });
}

export function renderSaveDiagnosticCard(card, options = {}) {
  const formatters = normalizeFormatters(options.formatters);
  return renderSaveDiagnosticCardView({
    card,
    text: options.text || {},
    statusLabel: formatters.statusLabel,
    formatNumber: formatters.formatNumber,
    formatValue: formatters.formatValue,
  });
}

function normalizeFormatters(formatters = {}) {
  return {
    statusLabel: typeof formatters.statusLabel === "function" ? formatters.statusLabel : (status) => status || "",
    formatNumber: typeof formatters.formatNumber === "function" ? formatters.formatNumber : (value) => value,
    formatValue: typeof formatters.formatValue === "function" ? formatters.formatValue : (value) => value ?? "",
    emptyValue: typeof formatters.emptyValue === "function" ? formatters.emptyValue : () => "",
  };
}

function normalizeTranslate(translate) {
  return typeof translate === "function" ? translate : (_path, _values, fallback) => fallback;
}
