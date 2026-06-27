const DEFAULT_CODEX_RECORD_TARGET = 5;

export function buildCodexRecordProgress(inventory = [], getItem = () => null) {
  return inventory
    .map((entry) => {
      const item = getItem(entry.itemId);
      if (!item || item.type !== "codex_fragment") return null;
      const count = Math.max(0, Number(entry.count) || 0);
      const target = Math.max(1, Number(item.recordTarget) || DEFAULT_CODEX_RECORD_TARGET);
      return {
        item,
        count,
        target,
        percent: Math.min(100, Math.round((count / target) * 100)),
        isReady: count >= target,
      };
    })
    .filter(Boolean)
    .sort((left, right) => right.percent - left.percent || left.item.name.localeCompare(right.item.name, "ko"));
}

