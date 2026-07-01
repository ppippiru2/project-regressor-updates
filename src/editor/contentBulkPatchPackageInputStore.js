const EMPTY_CONTENT_BULK_PACKAGE_INPUT = Object.freeze({
  draftText: "",
  appliedText: "",
  sourceName: "",
  parseError: "",
});

export function createContentBulkPatchPackageInputStore(options = {}) {
  const storageKey = options.storageKey || "";
  const readJson = typeof options.readJson === "function" ? options.readJson : () => null;
  const writeJson = typeof options.writeJson === "function" ? options.writeJson : () => {};
  const removeItem = typeof options.removeItem === "function" ? options.removeItem : () => {};

  return Object.freeze({
    load() {
      return normalizeContentBulkPatchPackageInput(readJson(storageKey));
    },
    persist(input) {
      writeJson(storageKey, normalizeContentBulkPatchPackageInput(input));
    },
    reset() {
      removeItem(storageKey);
      return createEmptyContentBulkPatchPackageInput();
    },
  });
}

export function createEmptyContentBulkPatchPackageInput() {
  return { ...EMPTY_CONTENT_BULK_PACKAGE_INPUT };
}

export function normalizeContentBulkPatchPackageInput(input = {}) {
  return {
    draftText: typeof input?.draftText === "string" ? input.draftText : "",
    appliedText: typeof input?.appliedText === "string" ? input.appliedText : "",
    sourceName: typeof input?.sourceName === "string" ? input.sourceName : "",
    parseError: typeof input?.parseError === "string" ? input.parseError : "",
  };
}
