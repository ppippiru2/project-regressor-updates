import { t, tf } from "../localization/index.js?v=681";

const PLAYER_BUFF_STATUS_META = Object.freeze({
  preserve_guard: {
    labelKey: "combatBuffStatus.preserve.label",
    summaryKey: "combatBuffStatus.preserve.summary",
    detailKey: "combatBuffStatus.preserve.detail",
    fallbackLabel: "Guard",
    fallbackSummary: "Damage down",
    fallbackDetail: "Next damage x0.5",
    tone: "guard",
    type: "defense",
  },
  full_power: {
    labelKey: "combatBuffStatus.fullPower.label",
    summaryKey: "combatBuffStatus.fullPower.summary",
    detailKey: "combatBuffStatus.fullPower.detail",
    fallbackLabel: "Full Power",
    fallbackSummary: "Attack up",
    fallbackDetail: "Attack x1.25",
    tone: "power",
    type: "attack",
  },
  rampage: {
    labelKey: "combatBuffStatus.rampage.label",
    summaryKey: "combatBuffStatus.rampage.summary",
    detailKey: "combatBuffStatus.rampage.detail",
    fallbackLabel: "Rampage",
    fallbackSummary: "Attack up / risk",
    fallbackDetail: "Attack x1.45 / damage x1.2",
    tone: "risk",
    type: "risk",
  },
});

export function renderPlayerBuffStrip(combatRuntime) {
  const strip = document.getElementById("player-buff-strip");
  if (!strip) return;

  const buffs = activePlayerBuffsForUi(combatRuntime);
  if (!buffs.length) {
    strip.hidden = true;
    strip.innerHTML = "";
    delete strip.dataset.activeBuffCount;
    return;
  }

  strip.hidden = false;
  strip.dataset.activeBuffCount = String(buffs.length);
  strip.innerHTML = buffs.map(playerBuffChipMarkup).join("");
}

export function activePlayerBuffsForUi(combatRuntime) {
  const buffs = Array.isArray(combatRuntime?.playerBuffs) ? combatRuntime.playerBuffs : [];
  return buffs
    .map((buff) => ({
      ...buff,
      remainingTurns: Math.max(0, Math.floor(Number(buff?.remainingTurns || 0))),
    }))
    .filter((buff) => buff.remainingTurns > 0);
}

export function playerBuffStatusMeta(buff) {
  return PLAYER_BUFF_STATUS_META[buff?.id] || {
    labelKey: "",
    summaryKey: "",
    detailKey: "",
    fallbackLabel: buff?.label || buff?.id || t("combatBuffStatus.fallbackLabel", "Buff"),
    fallbackSummary: t("combatBuffStatus.fallbackSummary", "Status up"),
    fallbackDetail: t("combatBuffStatus.fallbackDetail", "Combat status enhanced"),
    tone: "default",
    type: "support",
  };
}

function playerBuffChipMarkup(buff) {
  const meta = playerBuffStatusMeta(buff);
  const remaining = Math.max(0, Number(buff.remainingTurns || 0));
  const remainingText = tf("combatBuffStatus.remainingTurns", { count: remaining }, `${remaining}x`);
  const label = t(meta.labelKey, meta.fallbackLabel);
  const summary = t(meta.summaryKey, meta.fallbackSummary);
  const detail = t(meta.detailKey, meta.fallbackDetail);
  const title = `${label} - ${detail} - ${remainingText}`;
  const className = `combat-buff-chip combat-buff-chip--${meta.tone}`;

  return `<span class="${className}" data-combat-buff-id="${escapeHtml(buff.id)}" data-combat-buff-remaining="${remaining}" data-combat-buff-type="${escapeHtml(meta.type)}" title="${escapeHtml(title)}" aria-label="${escapeHtml(title)}">
    <span class="combat-buff-chip-label">${escapeHtml(label)}</span>
    <small>${escapeHtml(summary)}</small>
    <b>${escapeHtml(remainingText)}</b>
  </span>`;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
