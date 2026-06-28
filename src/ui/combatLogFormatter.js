import { getLocaleText } from "../localization/index.js?v=521";

const COMBAT_LOG_TEXT = getLocaleText().combatLogFormatter;
const CLASS_PATTERNS = COMBAT_LOG_TEXT.classPatterns;
const TOKEN_PATTERNS = COMBAT_LOG_TEXT.tokenPatterns;

export function renderCombatLogLine(line, useColors = true) {
  const className = useColors ? combatLogClass(line) : "log-plain";
  const content = useColors ? formatCombatLogLine(line) : escapeHtml(line);
  return `<li class="${className}"><span class="log-line">${content}</span></li>`;
}

export function combatLogClass(line) {
  const text = String(line);
  if (regex(CLASS_PATTERNS.luckyNeedle).test(text) && regex(CLASS_PATTERNS.luckyReward).test(text)) return "log-lucky";
  if (regex(CLASS_PATTERNS.critical).test(text)) return "log-critical";
  if (regex(CLASS_PATTERNS.poisonNeedle).test(text) && regex(CLASS_PATTERNS.damageNeedle).test(text)) return "log-poison";
  if (regex(CLASS_PATTERNS.magicNeedle).test(text) && regex(CLASS_PATTERNS.damageNeedle).test(text)) return "log-magic";
  if (regex(CLASS_PATTERNS.lootItem).test(text)) return "log-loot";
  if (regex(CLASS_PATTERNS.reward).test(text)) return "log-reward";
  if (regex(CLASS_PATTERNS.defeat).test(text)) return "log-defeat";
  if (regex(CLASS_PATTERNS.growth).test(text)) return "log-growth";
  if (regex(CLASS_PATTERNS.physical).test(text)) return "log-physical";
  if (regex(CLASS_PATTERNS.warning).test(text)) return "log-warning";
  return "log-notice";
}

export function formatCombatLogLine(line) {
  const category = combatLogClass(line);
  return highlightCombatLogTokens(escapeHtml(line), category);
}

function highlightCombatLogTokens(value, category) {
  const damageClass =
    category === "log-critical"
      ? "log-token-critical-damage"
      : category === "log-magic"
        ? "log-token-magic"
        : category === "log-poison"
          ? "log-token-poison"
          : "log-token-physical";

  const highlighted = value
    .replace(
      regex(TOKEN_PATTERNS.lootItemAcquired, "u"),
      '<span class="log-token-system">$1</span><span class="log-token-system">$2</span>$3<span class="log-token-item">$4</span>$5'
    )
    .replace(
      regex(TOKEN_PATTERNS.itemQuantity, "gu"),
      '$1<span class="log-token-item">$2</span> <span class="log-token-quantity">$3</span>'
    )
    .replace(
      regex(TOKEN_PATTERNS.gateRewardItem, "u"),
      '$1<span class="log-token-item">$2</span><span class="log-token-system">$3</span>'
    )
    .replace(regex(TOKEN_PATTERNS.itemAcquired, "u"), '<span class="log-token-item">$1</span><span class="log-token-system">$2</span>')
    .replace(regex(TOKEN_PATTERNS.battleStart, "u"), '<span class="log-token-monster">$1</span>$2')
    .replace(regex(TOKEN_PATTERNS.defeated, "u"), '<span class="log-token-monster">$1</span>$2')
    .replace(regex(TOKEN_PATTERNS.enemyAction, "u"), '<span class="log-token-monster">$1</span>$2')
    .replace(regex(TOKEN_PATTERNS.targetName, "gu"), '$1<span class="log-token-monster">$2</span>$3')
    .replace(
      regex(TOKEN_PATTERNS.systemTokens, "gu"),
      (match) => wrapCombatLogToken("log-token-system", match)
    )
    .replace(regex(TOKEN_PATTERNS.skillTokens, "gu"), (match) => wrapCombatLogToken("log-token-skill", match))
    .replace(regex(TOKEN_PATTERNS.criticalToken, "gu"), (match) => wrapCombatLogToken("log-token-critical", match))
    .replace(regex(TOKEN_PATTERNS.damage, "gu"), `<span class="${damageClass}">$1</span>`)
    .replace(regex(TOKEN_PATTERNS.heal, "gu"), '<span class="log-token-heal">$1</span>')
    .replace(regex(TOKEN_PATTERNS.exp, "gu"), '<span class="log-token-exp">$1</span>')
    .replace(regex(TOKEN_PATTERNS.gold, "gu"), '<span class="log-token-gold">$1</span>')
    .replace(regex(TOKEN_PATTERNS.stat, "gu"), '<span class="log-token-stat">$1</span>')
    .replace(regex(TOKEN_PATTERNS.growth, "gu"), '<span class="log-token-growth">$1</span>');

  if (category !== "log-notice" && !/<span class="log-token-/.test(highlighted)) {
    return `<span class="${fallbackCombatLogTokenClass(category)}">${highlighted}</span>`;
  }

  return highlighted;
}

function wrapCombatLogToken(className, value) {
  return `<span class="${className}">${value}</span>`;
}

function fallbackCombatLogTokenClass(category) {
  if (category === "log-reward") return "log-token-system";
  if (category === "log-loot") return "log-token-item";
  if (category === "log-growth") return "log-token-growth";
  if (category === "log-lucky") return "log-token-gold";
  if (category === "log-critical") return "log-token-critical";
  if (category === "log-magic") return "log-token-magic";
  if (category === "log-poison") return "log-token-poison";
  if (category === "log-physical") return "log-token-physical";
  if (category === "log-defeat") return "log-token-monster";
  if (category === "log-warning") return "log-token-critical";
  return "log-token-system";
}

function regex(pattern, flags = "u") {
  return new RegExp(pattern, flags);
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



