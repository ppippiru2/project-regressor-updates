export function editorNavGroupId(group, index = 0) {
  return String(group?.id || group?.label || `group-${index}`);
}

export function createInitialCollapsedEditorNavGroupIds(groups = []) {
  return new Set((Array.isArray(groups) ? groups : [])
    .map((group, index) => editorNavGroupId(group, index))
    .filter(Boolean));
}

export function isEditorNavGroupCollapsed(groupId, collapsedGroupIds) {
  if (collapsedGroupIds instanceof Set) return collapsedGroupIds.has(groupId);
  if (Array.isArray(collapsedGroupIds)) return collapsedGroupIds.includes(groupId);
  if (collapsedGroupIds && typeof collapsedGroupIds === "object") return Boolean(collapsedGroupIds[groupId]);
  return false;
}

export function toggleEditorNavGroupCollapsed(collapsedGroupIds, groupId) {
  const nextGroupIds = new Set(collapsedGroupIds instanceof Set ? collapsedGroupIds : []);
  if (!groupId) return nextGroupIds;
  if (nextGroupIds.has(groupId)) {
    nextGroupIds.delete(groupId);
    return nextGroupIds;
  }
  nextGroupIds.add(groupId);
  return nextGroupIds;
}
