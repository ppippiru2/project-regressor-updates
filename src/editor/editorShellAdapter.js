import {
  renderEditorNavigationGroups,
  renderEditorPanelDetailShell,
} from "./editorShellView.js?v=677&cachebust=677";

export function createEditorNavigationGroupsRenderer() {
  return function renderEditorNavigationGroupsSection(options = {}) {
    return renderEditorNavigationGroups(options);
  };
}

export function createEditorPanelDetailShellRenderer() {
  return function renderEditorPanelDetailShellSection(options = {}) {
    return renderEditorPanelDetailShell(options);
  };
}
