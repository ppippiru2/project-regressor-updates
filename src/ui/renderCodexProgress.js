import { buildCodexRecordProgress } from "../state/codexProgress.js?v=677";
import { isCodexProgressLinkedRow, latestCodexDialogueRecord } from "../state/codexDialogueLink.js?v=677";
import { t, tf } from "../localization/index.js?v=677";
import { byId, escapeHtml, itemIconSlot, itemInfoAttrs } from "./inventoryRenderHelpers.js?v=677";

export function renderCodexProgress(inventory = [], getItem = () => null, tutorialUnlockState = {}, dialogueRecords = []) {
  const summary = byId("codex-progress-summary");
  const list = byId("codex-progress-list");
  if (!summary || !list) return;

  const rows = buildCodexRecordProgress(inventory, getItem);
  const codexAccess = tutorialUnlockState?.codexAccess || "unlocked";
  const linkedRecord = latestCodexDialogueRecord(dialogueRecords);
  summary.dataset.codexAccess = codexAccess;
  list.dataset.codexAccess = codexAccess;
  setOptionalDataset(summary, "dialogueEventId", linkedRecord?.eventId);
  setOptionalDataset(summary, "dialogueTitle", linkedRecord?.title);
  setOptionalDataset(summary, "dialogueOutputChannel", linkedRecord?.outputChannel);
  setOptionalDataset(list, "dialogueEventId", linkedRecord?.eventId);
  setOptionalDataset(list, "dialogueTitle", linkedRecord?.title);
  setOptionalDataset(list, "dialogueRecordEntries", linkedRecord?.recordEntries?.join("|"));
  if (tutorialUnlockState?.codexProgressReadable === false || codexAccess === "locked") {
    summary.textContent = t("inventoryUi.codexProgressLockedSummary");
    list.innerHTML = `<p class="muted empty-list codex-progress-lock-note">${escapeHtml(t("inventoryUi.codexProgressLockedList"))}</p>`;
    return;
  }

  const damagedPartial = codexAccess === "damaged_partial";
  const totalCount = rows.reduce((sum, row) => sum + row.count, 0);
  const readyCount = rows.reduce((sum, row) => sum + (row.isReady ? 1 : 0), 0);
  summary.textContent =
    rows.length > 0
      ? tf(damagedPartial ? "inventoryUi.codexProgressPartialSummary" : "inventoryUi.codexProgressSummary", {
          types: rows.length,
          total: totalCount,
          ready: readyCount,
        })
      : t("inventoryUi.codexProgressEmptySummary");

  if (rows.length === 0) {
    list.innerHTML = `<p class="muted empty-list">${escapeHtml(t(damagedPartial ? "inventoryUi.codexProgressPartialEmptyList" : "inventoryUi.codexProgressEmptyList"))}</p>`;
    return;
  }

  const partialNotice = damagedPartial
    ? `<p class="codex-progress-lock-note">${escapeHtml(t("inventoryUi.codexProgressPartialNotice"))}</p>`
    : "";
  list.innerHTML = partialNotice + rows
    .map(({ item, count, target, remaining, percent, isReady, hintState }) => {
      const statusText = isReady ? t("inventoryUi.codexProgressReady") : t("inventoryUi.codexProgressRecording");
      const hintText = codexProgressHint({ remaining, hintState });
      const isRecentRecord = isCodexProgressLinkedRow(item, linkedRecord);
      const recentRecordTitle = isRecentRecord ? linkedRecord?.title || "" : "";
      const recentRecordLabel = recentRecordTitle
        ? tf("inventoryUi.codexProgressRecentWithTitle", { title: recentRecordTitle })
        : t("inventoryUi.codexProgressRecent");
      const recentRecordTitleAttr = recentRecordTitle ? ` data-dialogue-title="${escapeHtml(recentRecordTitle)}"` : "";
      return `<div class="item codex-progress-item ${isReady ? "is-upgrade" : "is-sidegrade"}${isRecentRecord ? " is-recent-record" : ""}" data-recent-record="${isRecentRecord ? "true" : "false"}"${recentRecordTitleAttr}>
        ${itemIconSlot({ item, iconPath: "", label: tf("inventoryUi.itemIcon", { name: item.name }) })}
        <div class="item-main">
          <div class="item-title-row">
            <strong class="rarity-${item.rarity} info-term" tabindex="0" role="button" ${itemInfoAttrs(item, (slot) => slot, () => "")}>${escapeHtml(item.name)}</strong>
            <span class="item-count">${escapeHtml(statusText)}</span>
          </div>
          <div class="codex-progress-meter" aria-hidden="true"><span style="width: ${percent}%"></span></div>
          <div class="muted">${escapeHtml(tf("inventoryUi.codexProgressDetail", { count, target }))}</div>
          <div class="codex-progress-hint">${escapeHtml(hintText)}</div>
          ${isRecentRecord ? `<div class="codex-progress-recent">${escapeHtml(recentRecordLabel)}</div>` : ""}
        </div>
        <div class="item-actions">
          <span class="item-score">${escapeHtml(t("inventoryUi.readOnly"))}</span>
        </div>
      </div>`;
    })
    .join("");
}

function codexProgressHint({ remaining = 0, hintState = "next" } = {}) {
  if (hintState === "ready") return t("inventoryUi.codexProgressReadyHint");
  if (hintState === "first") return tf("inventoryUi.codexProgressFirstHint", { remaining });
  return tf("inventoryUi.codexProgressNextHint", { remaining });
}

function setOptionalDataset(element, key, value) {
  if (value) {
    element.dataset[key] = value;
  } else {
    delete element.dataset[key];
  }
}
