import { getLocaleText, t, tf } from "../localization/index.js?v=679";
import { latestCodexDialogueRecord } from "../state/codexDialogueLink.js?v=679";
import { resolveRegionCoreEvent } from "../story/coreEventCatalog.js?v=679";
import { resolveTutorialKeyEventDialogue } from "../story/tutorialDialogueEvents.js?v=679";

const SYSTEM_WINDOW_TEXT = getLocaleText().systemWindow;
const ROUTINE_SYSTEM_PATTERNS = SYSTEM_WINDOW_TEXT.routinePatterns.map((pattern) => new RegExp(pattern, "u"));
const SYSTEM_MATCHERS = SYSTEM_WINDOW_TEXT.matchers;

export function createSystemNotice({ log, dialogueRecords, player, playerProfile, region, inCombat }) {
  const displayName = playerProfile?.name || player?.name || t("systemWindow.fallbackName");
  const statusText = systemStatusText(inCombat);
  const baseMeta = [playerMeta(displayName, player?.level || 1), region?.name || t("systemWindow.unknownRegion"), statusText];
  const message = findImportantLog(log);
  const dialogueRecord = findDialogueRecordForMessage(dialogueRecords, message);

  if (!message) {
    return withDialogueRecord({
      type: inCombat ? "combat" : "notice",
      label: inCombat ? t("systemWindow.notices.combatLabel") : t("systemWindow.notices.idleLabel"),
      message: inCombat
        ? t("systemWindow.notices.combatMessage")
        : t("systemWindow.notices.idleMessage"),
      meta: baseMeta,
      targetView: "combat",
    }, null);
  }

  const tutorialHelpPopup = message.match(regex(SYSTEM_MATCHERS.tutorialHelpPopup));
  if (tutorialHelpPopup) {
    return withDialogueRecord({
      type: "help",
      label: t("systemWindow.notices.tutorialHelpLabel"),
      message: t("systemWindow.notices.tutorialHelpMessage"),
      meta: [
        tutorialHelpPopup[2] || tutorialHelpPopup[1],
        t("systemWindow.notices.tutorialHelpSeparatePopup"),
        statusText,
      ],
      targetView: "combat",
    }, dialogueRecord);
  }

  const combatAlert = message.match(regex(SYSTEM_MATCHERS.combatAlert));
  if (combatAlert) {
    return withDialogueRecord({
      type: "combat",
      label: t("systemWindow.notices.combatAlertLabel"),
      message: (combatAlert[1] || t("systemWindow.notices.combatAlertMessage")).replace(/\.$/u, ""),
      meta: [t("systemWindow.notices.minimumPassOnly"), region?.name || t("systemWindow.unknownRegion"), statusText],
      targetView: "combat",
    }, dialogueRecord);
  }

  if (regex(SYSTEM_MATCHERS.evaluationReveal).test(message)) {
    return withDialogueRecord({
      type: "growth",
      label: t("systemWindow.notices.evaluationRevealLabel"),
      message: t("systemWindow.notices.evaluationRevealMessage"),
      meta: [t("systemWindow.notices.afterClearDisclosure"), region?.name || t("systemWindow.unknownRegion"), statusText],
      targetView: "combat",
    }, dialogueRecord);
  }

  if (regex(SYSTEM_MATCHERS.tutorialStatus).test(message)) {
    return withDialogueRecord({
      type: "notice",
      label: t("systemWindow.notices.tutorialStatusLabel"),
      message: t("systemWindow.notices.tutorialStatusMessage"),
      meta: [
        t("systemWindow.notices.basicAttackReady"),
        t("systemWindow.notices.cardSkillReady"),
        statusText,
      ],
      targetView: "combat",
    }, dialogueRecord);
  }

  const tutorialLocation = message.match(regex(SYSTEM_MATCHERS.tutorialLocation));
  if (tutorialLocation) {
    return withDialogueRecord({
      type: "quest",
      label: t("systemWindow.notices.tutorialLocationLabel"),
      message: t("systemWindow.notices.tutorialLocationMessage"),
      meta: [tutorialLocation[1], t("systemWindow.notices.checkCombatTab"), statusText],
      targetView: "combat",
    }, dialogueRecord);
  }

  if (regex(SYSTEM_MATCHERS.tutorialTransfer).test(message)) {
    return withDialogueRecord({
      type: "notice",
      label: t("systemWindow.notices.tutorialTransferLabel"),
      message: t("systemWindow.notices.tutorialTransferMessage"),
      meta: baseMeta,
      targetView: "combat",
    }, dialogueRecord);
  }

  const levelUp = message.match(regex(SYSTEM_MATCHERS.levelUp));
  if (levelUp) {
    return withDialogueRecord({
      type: "growth",
      label: t("systemWindow.notices.growthLabel"),
      message: t("systemWindow.notices.levelUpMessage"),
      meta: [playerMeta("", levelUp[1]).replace(/^ · /, ""), t("systemWindow.notices.statUp"), t("systemWindow.notices.freeStatPlus")],
      targetView: "status",
    }, dialogueRecord);
  }

  const unlockedRegion = message.match(regex(SYSTEM_MATCHERS.unlockedRegion));
  if (unlockedRegion) {
    return withDialogueRecord({
      type: "quest",
      label: t("systemWindow.notices.routeLabel"),
      message: t("systemWindow.notices.routeMessage"),
      meta: [unlockedRegion[1], t("systemWindow.notices.checkRegionTab"), statusText],
      targetView: "regions",
    }, dialogueRecord);
  }

  const equipment = message.match(regex(SYSTEM_MATCHERS.equipment));
  if (equipment) {
    return withDialogueRecord({
      type: "reward",
      label: t("systemWindow.notices.lootCandidateLabel"),
      message: t("systemWindow.notices.lootCandidateMessage"),
      meta: [equipment[1], tf("systemWindow.notices.valuePlus", { value: equipment[2] }), t("systemWindow.notices.checkInventory")],
      targetView: "inventory",
    }, dialogueRecord);
  }

  const lootItem = message.match(regex(SYSTEM_MATCHERS.lootItem));
  if (lootItem) {
    return withDialogueRecord({
      type: "loot",
      label: t("systemWindow.notices.lootLabel"),
      message: t("systemWindow.notices.lootMessage"),
      meta: [lootItem[1], lootItem[2], t("systemWindow.notices.checkInventory")],
      targetView: "inventory",
    }, dialogueRecord);
  }

  const codexRecord = message.match(regex(SYSTEM_MATCHERS.codexRecord));
  if (codexRecord) {
    const progress = parseProgress(codexRecord[2]);
    const codexDialogueRecord = dialogueRecord || latestCodexDialogueRecord(dialogueRecords);
    const resolved = resolveTutorialKeyEventDialogue("tutorial_1st_shore_06_nameless_scrap", {
      templateValues: {
        itemName: codexRecord[1],
        count: progress.count,
        target: progress.target,
      },
    });
    return withDialogueRecord({
      type: "growth",
      label: t("systemWindow.notices.codexRecordLabel"),
      message: resolved?.title
        ? tf("systemWindow.notices.codexEventMessage", { title: resolved.title })
        : t("systemWindow.notices.codexRecordMessage"),
      meta: [codexRecord[1], codexRecord[2], t("systemWindow.notices.checkCodexProgress")],
      targetView: "inventory",
    }, codexDialogueRecord);
  }

  const regionRecord = message.match(regex(SYSTEM_MATCHERS.regionRecord));
  if (regionRecord) {
    const resolved = resolveRegionCoreEvent(region);
    return withDialogueRecord({
      type: "quest",
      label: t("systemWindow.notices.regionRecordLabel"),
      message: resolved?.title
        ? tf("systemWindow.notices.regionEventMessage", { title: resolved.title })
        : t("systemWindow.notices.regionRecordMessage"),
      meta: [regionRecord[1], regionRecord[2], t("systemWindow.notices.checkRegionProgress")],
      targetView: "regions",
    }, dialogueRecord);
  }

  const reward = message.match(regex(SYSTEM_MATCHERS.reward));
  if (reward) {
    return withDialogueRecord({
      type: "reward",
      label: t("systemWindow.notices.huntRewardLabel"),
      message: t("systemWindow.notices.huntRewardMessage"),
      meta: [
        reward[1],
        tf("systemWindow.notices.expMeta", { value: reward[2] }),
        tf("systemWindow.notices.goldMeta", { value: reward[3] }),
      ],
      targetView: "combat",
    }, dialogueRecord);
  }

  const item = message.match(regex(SYSTEM_MATCHERS.item));
  if (item) {
    return withDialogueRecord({
      type: "reward",
      label: t("systemWindow.notices.lootLabel"),
      message: t("systemWindow.notices.lootMessage"),
      meta: [item[1], region?.name || t("systemWindow.unknownRegion"), statusText],
      targetView: "inventory",
    }, dialogueRecord);
  }

  if (regex(SYSTEM_MATCHERS.bossClear).test(message)) {
    return withDialogueRecord({
      type: "growth",
      label: t("systemWindow.notices.clearLabel"),
      message: t("systemWindow.notices.clearMessage"),
      meta: [region?.name || t("systemWindow.currentRegion"), t("systemWindow.notices.riftWeakened"), statusText],
      targetView: "regions",
    }, dialogueRecord);
  }

  if (regex(SYSTEM_MATCHERS.warning).test(message)) {
    return withDialogueRecord({
      type: "warning",
      label: t("systemWindow.notices.warningLabel"),
      message,
      meta: baseMeta,
    }, dialogueRecord);
  }

  return withDialogueRecord({
    type: "notice",
    label: t("systemWindow.notices.systemLabel"),
    message,
    meta: baseMeta,
    targetView: "combat",
  }, dialogueRecord);
}

export function playerMeta(name, level) {
  return tf("systemWindow.playerMeta", { name, level });
}

export function systemStatusText(inCombat) {
  return inCombat ? t("systemWindow.statusCombat") : t("systemWindow.statusIdle");
}

function regex(pattern) {
  return new RegExp(pattern, "u");
}

function parseProgress(value) {
  const match = String(value || "").match(/^(\d+)\s*\/\s*(\d+)/u);
  return {
    count: match ? Number(match[1]) : 0,
    target: match ? Number(match[2]) : 0,
  };
}

function findImportantLog(log = []) {
  return log.find((line) => line && !ROUTINE_SYSTEM_PATTERNS.some((pattern) => pattern.test(line)));
}

function findDialogueRecordForMessage(records = [], message = "") {
  if (!message) return null;
  return [...records].reverse().find((record) => record?.text === message) || null;
}

function withDialogueRecord(notice, record) {
  if (!record?.eventId) return notice;
  return {
    ...notice,
    dialogueEventId: record.eventId,
    dialogueTitle: record.title || "",
    dialogueOutputChannel: record.outputChannel || "",
    dialogueLineType: record.lineType || "",
    dialogueRecordEntries: Array.isArray(record.recordEntries) ? [...record.recordEntries] : [],
  };
}
