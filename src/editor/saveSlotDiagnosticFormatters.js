export function createSaveSlotDiagnosticFormatters(options = {}) {
  const text = options.text || {};
  const locale = options.locale || undefined;

  function emptyValue() {
    return text.emptyValue || "-";
  }

  return Object.freeze({
    statusLabel(status) {
      const labels = text.statusLabels || {};
      return labels[status] || status;
    },
    formatNumber(value) {
      const number = Number(value);
      if (!Number.isFinite(number)) return emptyValue();
      return number.toLocaleString(locale);
    },
    formatValue(value) {
      const normalized = String(value ?? "").trim();
      return normalized || emptyValue();
    },
    emptyValue,
  });
}
