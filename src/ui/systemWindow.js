import { t } from "../localization/index.js?v=681";
import { createSystemNotice, playerMeta, systemStatusText } from "./systemNotice.js?v=681";

let lastSignature = "";

export { createSystemNotice } from "./systemNotice.js?v=681";

export function renderSystemWindow({ log, dialogueRecords, player, playerProfile, region, inCombat }) {
  const windowElement = document.getElementById("system-window");
  if (!windowElement) return;

  const notice = createSystemNotice({ log, dialogueRecords, player, playerProfile, region, inCombat });
  const statusText = systemStatusText(inCombat);
  const displayName = playerProfile?.name || player?.name || t("systemWindow.fallbackName");
  const meta = notice.meta || [playerMeta(displayName, player?.level || 1), region?.name || t("systemWindow.unknownRegion"), statusText];
  const targetView = notice.targetView || "";
  const signature = [notice.type, notice.label, targetView, notice.message, ...meta].join("|");
  if (signature === lastSignature) return;
  lastSignature = signature;

  windowElement.dataset.systemType = notice.type;
  windowElement.dataset.systemLabel = notice.label;
  setOptionalDataset(windowElement, "dialogueEventId", notice.dialogueEventId);
  setOptionalDataset(windowElement, "dialogueTitle", notice.dialogueTitle);
  setOptionalDataset(windowElement, "dialogueOutputChannel", notice.dialogueOutputChannel);
  setOptionalDataset(windowElement, "dialogueLineType", notice.dialogueLineType);
  if (targetView) {
    windowElement.dataset.systemTargetView = targetView;
    windowElement.setAttribute("role", "button");
    windowElement.setAttribute("tabindex", "0");
    windowElement.setAttribute("aria-label", `${notice.label}: ${notice.message}`);
  } else {
    delete windowElement.dataset.systemTargetView;
    windowElement.removeAttribute("role");
    windowElement.removeAttribute("tabindex");
    windowElement.removeAttribute("aria-label");
  }
  setText("system-window-message", notice.message);

  const metaElement = document.getElementById("system-window-meta");
  if (metaElement) {
    const targetAttribute = targetView ? ` data-system-target-view="${escapeHtml(targetView)}"` : "";
    metaElement.innerHTML = meta.map((line) => `<span${targetAttribute}>${escapeHtml(line)}</span>`).join("");
  }
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

function setOptionalDataset(element, key, value) {
  if (value) {
    element.dataset[key] = value;
  } else {
    delete element.dataset[key];
  }
}

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });
}
