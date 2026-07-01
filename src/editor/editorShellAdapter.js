import {
  renderEditorNavigationGroups,
  renderEditorPanelDetailShell,
} from "./editorShellView.js?v=680&cachebust=680";

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
