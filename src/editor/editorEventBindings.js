import { handleEditorSearchInputEvent } from "./editorSearchInputHandlers.js?v=681&cachebust=681";

export function bindEditorEvents(options = {}) {
  const elements = options.elements || {};
  const actions = options.actions || {};
  const downloads = options.downloads || {};
  const renderPanelDetail = callback(actions.renderPanelDetail);
  const renderNav = callback(actions.renderNav);
  const scrollContentBulkPackageIntoView = callback(actions.scrollContentBulkPackageIntoView);

  elements.nav?.addEventListener("click", (event) => {
    const groupToggle = event.target.closest("[data-editor-nav-group-toggle]");
    if (groupToggle) {
      callback(actions.toggleCollapsedNavGroup)(groupToggle.dataset.editorNavGroupToggle);
      renderNav();
      return;
    }
    const button = event.target.closest("[data-panel-id]");
    if (!button) return;
    callback(actions.selectPanel)(button.dataset.panelId);
    renderNav();
    renderPanelDetail();
  });

  elements.refreshSaves?.addEventListener("click", callback(actions.renderSaveKeys));
  elements.exportSummary?.addEventListener("click", () => {
    callback(downloads.downloadJson)("project-regressor-save-summary.json", callback(downloads.createSaveSummary)());
  });
  elements.downloadManifest?.addEventListener("click", () => {
    callback(downloads.downloadJson)("project-regressor-editor-manifest.json", callback(downloads.getManifest)());
  });
  elements.downloadBacklog?.addEventListener("click", () => {
    callback(downloads.downloadJson)("project-regressor-editor-backlog.json", callback(downloads.getBacklog)());
  });

  elements.panelDetail?.addEventListener("input", (event) => {
    if (handleSearch(event, elements.panelDetail, "[data-retarget-search]", actions.updateRetargetQuery, renderPanelDetail)) return;
    if (handleSearch(event, elements.panelDetail, "[data-balance-search]", actions.updateBalanceQuery, renderPanelDetail)) return;
    if (handleSearch(event, elements.panelDetail, "[data-combat-vfx-search]", actions.updateCombatVfxQuery, renderPanelDetail)) return;
    if (handleSearch(event, elements.panelDetail, "[data-content-bulk-search]", actions.updateContentBulkQuery, renderPanelDetail)) return;
    const packageTextarea = event.target.closest("[data-content-bulk-package-json]");
    if (packageTextarea) {
      callback(actions.updateContentBulkPatchPackageDraft)(packageTextarea.value);
    }
  });

  elements.panelDetail?.addEventListener("change", async (event) => {
    const fileInput = event.target.closest("[data-content-bulk-package-file]");
    if (!fileInput) return;
    const file = fileInput.files?.[0];
    if (!file) return;
    try {
      const text = await file.text();
      callback(actions.applyContentBulkPatchPackageFile)(text, file.name);
      renderPanelDetail();
      scrollContentBulkPackageIntoView();
    } catch (error) {
      callback(actions.applyContentBulkPatchPackageReadError)(error);
      renderPanelDetail();
      scrollContentBulkPackageIntoView();
    }
  });

  elements.panelDetail?.addEventListener("click", (event) => {
    if (event.target.closest("[data-content-bulk-package-apply]")) {
      callback(actions.applyContentBulkPatchPackageInput)();
      renderPanelDetail();
      scrollContentBulkPackageIntoView();
      return;
    }
    if (event.target.closest("[data-content-bulk-package-sample]")) {
      callback(actions.applyContentBulkPatchPackageSample)();
      renderPanelDetail();
      scrollContentBulkPackageIntoView();
      return;
    }
    if (event.target.closest("[data-content-bulk-package-reset]")) {
      callback(actions.resetContentBulkPatchPackageInput)();
      callback(actions.refreshContentBulkPatchPackageAdapterPreview)();
      renderPanelDetail();
      scrollContentBulkPackageIntoView();
      return;
    }
    if (event.target.closest("[data-content-bulk-package-template]")) {
      callback(downloads.downloadJson)(
        downloads.contentBulkPackageTemplateFileName || "project-regressor-content-bulk-package-template.json",
        callback(downloads.createContentBulkPatchPackageTemplatePayload)(),
      );
      return;
    }
    if (event.target.closest("[data-content-bulk-file-patch-export]")) {
      const filePatchDraftExport = callback(downloads.getContentBulkPatchFilePatchDraftExport)();
      callback(downloads.downloadJson)(
        filePatchDraftExport.fileName || "project-regressor-content-bulk-file-patch-draft.json",
        filePatchDraftExport.payload || {},
      );
      return;
    }
    const contentBulkFilterButton = event.target.closest("[data-content-bulk-filter]");
    if (contentBulkFilterButton) {
      callback(actions.applyContentBulkStateFilter)(contentBulkFilterButton.dataset.contentBulkFilter);
      renderPanelDetail();
      return;
    }
    const contentBulkDomainButton = event.target.closest("[data-content-bulk-domain]");
    if (contentBulkDomainButton) {
      callback(actions.applyContentBulkDomainFilter)(contentBulkDomainButton.dataset.contentBulkDomain);
      renderPanelDetail();
      return;
    }
    if (event.target.closest("[data-content-bulk-search-reset]")) {
      callback(actions.clearContentBulkQueryFilter)();
      renderPanelDetail();
      return;
    }
    if (event.target.closest("[data-combat-vfx-reset]")) {
      callback(actions.resetCombatVfxDetailFilter)();
      renderPanelDetail();
      return;
    }
    const combatVfxKindButton = event.target.closest("[data-combat-vfx-kind]");
    if (combatVfxKindButton) {
      callback(actions.applyCombatVfxKindFilter)(combatVfxKindButton.dataset.combatVfxKind);
      renderPanelDetail();
      return;
    }
    const balanceCandidateButton = event.target.closest("[data-balance-candidate]");
    if (balanceCandidateButton) {
      callback(actions.applyBalanceCandidateFilter)(balanceCandidateButton.dataset.balanceCandidate);
      renderPanelDetail();
      callback(actions.scrollBalanceCandidateSummaryIntoView)();
      return;
    }
    if (event.target.closest("[data-balance-reset]")) {
      callback(actions.resetBalanceDetailFilter)();
      renderPanelDetail();
      return;
    }
    const balanceScopeButton = event.target.closest("[data-balance-scope]");
    if (balanceScopeButton) {
      callback(actions.applyBalanceScopeFilter)(balanceScopeButton.dataset.balanceScope);
      renderPanelDetail();
      return;
    }
    if (event.target.closest("[data-retarget-reset]")) {
      callback(actions.resetRetargetDetailFilter)();
      renderPanelDetail();
      return;
    }
    const retargetFilterButton = event.target.closest("[data-retarget-kind]");
    if (retargetFilterButton) {
      callback(actions.applyRetargetKindFilter)(retargetFilterButton.dataset.retargetKind);
      renderPanelDetail();
      return;
    }
    const toggleButton = event.target.closest("[data-retarget-toggle]");
    if (!toggleButton) return;
    const rowId = toggleButton.dataset.retargetToggle;
    if (!rowId) return;
    callback(actions.toggleRetargetRow)(rowId);
    renderPanelDetail();
  });
}

function handleSearch(event, container, selector, update, render) {
  return handleEditorSearchInputEvent(event, {
    selector,
    container,
    render,
    update: callback(update),
  });
}

function callback(fn) {
  return typeof fn === "function" ? fn : () => {};
}
