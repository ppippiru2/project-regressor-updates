import { getLocaleText, t, tf } from "../localization/index.js?v=409";

const SYSTEM_WINDOW_TEXT = getLocaleText().systemWindow;
const ROUTINE_SYSTEM_PATTERNS = SYSTEM_WINDOW_TEXT.routinePatterns.map((pattern) => new RegExp(pattern, "u"));
const SYSTEM_MATCHERS = SYSTEM_WINDOW_TEXT.matchers;

let lastSignature = "";

export function renderSystemWindow({ log, player, playerProfile, region, inCombat }) {
  const windowElement = document.getElementById("system-window");
  if (!windowElement) return;

  const notice = createSystemNotice({ log, player, playerProfile, region, inCombat });
  const statusText = systemStatusText(inCombat);
  const displayName = playerProfile?.name || player?.name || t("systemWindow.fallbackName");
  const meta = notice.meta || [playerMeta(displayName, player?.level || 1), region?.name || t("systemWindow.unknownRegion"), statusText];
  const signature = [notice.type, notice.label, notice.message, ...meta].join("|");
  if (signature === lastSignature) return;
  lastSignature = signature;

  windowElement.dataset.systemType = notice.type;
  setText("system-window-type", notice.label);
  setText("system-window-message", notice.message);

  const metaElement = document.getElementById("system-window-meta");
  if (metaElement) {
    metaElement.innerHTML = meta.map((line) => `<span>${escapeHtml(line)}</span>`).join("");
  }
}

export function createSystemNotice({ log, player, playerProfile, region, inCombat }) {
  const displayName = playerProfile?.name || player?.name || t("systemWindow.fallbackName");
  const statusText = systemStatusText(inCombat);
  const baseMeta = [playerMeta(displayName, player?.level || 1), region?.name || t("systemWindow.unknownRegion"), statusText];
  const message = findImportantLog(log);

  if (!message) {
    return {
      type: inCombat ? "combat" : "notice",
      label: inCombat ? t("systemWindow.notices.combatLabel") : t("systemWindow.notices.idleLabel"),
      message: inCombat
        ? t("systemWindow.notices.combatMessage")
        : t("systemWindow.notices.idleMessage"),
      meta: baseMeta,
    };
  }

  if (regex(SYSTEM_MATCHERS.tutorialStatus).test(message)) {
    return {
      type: "notice",
      label: t("systemWindow.notices.tutorialStatusLabel"),
      message: t("systemWindow.notices.tutorialStatusMessage"),
      meta: [
        t("systemWindow.notices.basicAttackReady"),
        t("systemWindow.notices.cardSkillReady"),
        statusText,
      ],
    };
  }

  const tutorialLocation = message.match(regex(SYSTEM_MATCHERS.tutorialLocation));
  if (tutorialLocation) {
    return {
      type: "quest",
      label: t("systemWindow.notices.tutorialLocationLabel"),
      message: t("systemWindow.notices.tutorialLocationMessage"),
      meta: [tutorialLocation[1], t("systemWindow.notices.checkCombatTab"), statusText],
    };
  }

  if (regex(SYSTEM_MATCHERS.tutorialTransfer).test(message)) {
    return {
      type: "notice",
      label: t("systemWindow.notices.tutorialTransferLabel"),
      message: t("systemWindow.notices.tutorialTransferMessage"),
      meta: baseMeta,
    };
  }

  const levelUp = message.match(regex(SYSTEM_MATCHERS.levelUp));
  if (levelUp) {
    return {
      type: "growth",
      label: t("systemWindow.notices.growthLabel"),
      message: t("systemWindow.notices.levelUpMessage"),
      meta: [playerMeta("", levelUp[1]).replace(/^ · /, ""), t("systemWindow.notices.statUp"), t("systemWindow.notices.freeStatPlus")],
    };
  }

  const unlockedRegion = message.match(regex(SYSTEM_MATCHERS.unlockedRegion));
  if (unlockedRegion) {
    return {
      type: "quest",
      label: t("systemWindow.notices.routeLabel"),
      message: t("systemWindow.notices.routeMessage"),
      meta: [unlockedRegion[1], t("systemWindow.notices.checkRegionTab"), statusText],
    };
  }

  const equipment = message.match(regex(SYSTEM_MATCHERS.equipment));
  if (equipment) {
    return {
      type: "reward",
      label: t("systemWindow.notices.lootCandidateLabel"),
      message: t("systemWindow.notices.lootCandidateMessage"),
      meta: [equipment[1], tf("systemWindow.notices.valuePlus", { value: equipment[2] }), t("systemWindow.notices.checkInventory")],
    };
  }

  const lootItem = message.match(regex(SYSTEM_MATCHERS.lootItem));
  if (lootItem) {
    return {
      type: "reward",
      label: t("systemWindow.notices.lootLabel"),
      message: t("systemWindow.notices.lootMessage"),
      meta: [lootItem[1], lootItem[2], t("systemWindow.notices.checkInventory")],
    };
  }

  const reward = message.match(regex(SYSTEM_MATCHERS.reward));
  if (reward) {
    return {
      type: "reward",
      label: t("systemWindow.notices.huntRewardLabel"),
      message: t("systemWindow.notices.huntRewardMessage"),
      meta: [
        reward[1],
        tf("systemWindow.notices.expMeta", { value: reward[2] }),
        tf("systemWindow.notices.goldMeta", { value: reward[3] }),
      ],
    };
  }

  const item = message.match(regex(SYSTEM_MATCHERS.item));
  if (item) {
    return {
      type: "reward",
      label: t("systemWindow.notices.lootLabel"),
      message: t("systemWindow.notices.lootMessage"),
      meta: [item[1], region?.name || t("systemWindow.unknownRegion"), statusText],
    };
  }

  if (regex(SYSTEM_MATCHERS.bossClear).test(message)) {
    return {
      type: "growth",
      label: t("systemWindow.notices.clearLabel"),
      message: t("systemWindow.notices.clearMessage"),
      meta: [region?.name || t("systemWindow.currentRegion"), t("systemWindow.notices.riftWeakened"), statusText],
    };
  }

  if (regex(SYSTEM_MATCHERS.warning).test(message)) {
    return {
      type: "warning",
      label: t("systemWindow.notices.warningLabel"),
      message,
      meta: baseMeta,
    };
  }

  return {
    type: "notice",
    label: t("systemWindow.notices.systemLabel"),
    message,
    meta: baseMeta,
  };
}

function playerMeta(name, level) {
  return tf("systemWindow.playerMeta", { name, level });
}

function systemStatusText(inCombat) {
  return inCombat ? t("systemWindow.statusCombat") : t("systemWindow.statusIdle");
}

function regex(pattern) {
  return new RegExp(pattern, "u");
}

function findImportantLog(log = []) {
  return log.find((line) => line && !ROUTINE_SYSTEM_PATTERNS.some((pattern) => pattern.test(line)));
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
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
