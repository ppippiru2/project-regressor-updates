export function latestCodexDialogueRecord(records = []) {
  return [...records].reverse().find((record) => {
    if (!record?.eventId) return false;
    const searchable = [record.eventId, ...(record.recordEntries || [])].join(" ");
    return /codex|scrap|nameless/iu.test(searchable);
  }) || null;
}

export function isCodexProgressLinkedRow(item, record) {
  if (!item || !record) return false;
  const searchable = [
    record.text,
    record.eventId,
    record.triggerTargetId,
    ...(record.recordEntries || []),
  ].filter(Boolean).join(" ").toLocaleLowerCase("ko-KR");
  const itemId = String(item.id || "").toLocaleLowerCase("ko-KR");
  const itemName = String(item.name || "").toLocaleLowerCase("ko-KR");
  return Boolean(
    (itemName && searchable.includes(itemName)) ||
    (itemId && searchable.includes(itemId)) ||
    (record.triggerTargetId && itemId.includes(String(record.triggerTargetId).toLocaleLowerCase("ko-KR")))
  );
}
