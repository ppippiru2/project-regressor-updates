import {
  renderEditorNavigationGroups,
  renderEditorPanelDetailShell,
} from "./editorShellView.js?v=678&cachebust=678";

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
