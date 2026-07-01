import { t, tf } from "../localization/index.js?v=680";
import { FATE_CARD_BACK_IMAGE, resolveFateCardVisual } from "../data/fateCardVisualData.js?v=680";
import { resolveCardGradeAuraClass } from "../state/cardGradeDisplay.js?v=680";
import {
  FATE_CARD_RENDER_MODES,
  resolveFateCardAuraTier,
} from "../state/fateCardRoller.js?v=680";

export function resolveFateCardRenderState(slot = {}, options = {}) {
  const mode = options.mode || FATE_CARD_RENDER_MODES.productionProgressiveHint;
  const hintLevel = normalizeHintLevel(options.hintLevel);
  const selected = options.selected === true;
  const revealed = selected || options.revealed === true || slot.isRevealed === true;
  const showIdentity = mode === FATE_CARD_RENDER_MODES.devPreview || revealed;
  const auraVisible = shouldShowAura(slot, { mode, hintLevel, revealed });
  const auraClass = auraVisible ? resolveCardGradeAuraClass(slot.auraCard || slot.card || { grade: slot.grade }) : "card-aura-hidden";
  const auraTier = resolveFateCardAuraTier(slot.grade || slot.auraCard?.grade || slot.card?.grade || slot.card?.glow);
  const visual = resolveSlotVisual(slot);

  return {
    mode,
    hintLevel,
    selected,
    revealed,
    showIdentity,
    auraVisible,
    auraTier,
    auraClass,
    bfxId: auraVisible ? visual?.defaultBfx || "" : "",
    hintClass: `fate-card-hint-level-${hintLevel}`,
    title: showIdentity ? cardName(slot) : options.hiddenTitle,
    glow: showIdentity ? cardGlow(slot) : hiddenGlowLabel(auraTier, hintLevel, mode),
    primaryHint: showIdentity ? options.revealedHint : options.hiddenHint,
    archetypeHint: !showIdentity && hintLevel >= 4 ? archetypeHint(slot.archetype) : "",
    visual,
    showFrontImage: showIdentity && Boolean(visual?.frontImage),
    revealSprite: showIdentity ? visual?.revealSprite || "" : "",
    backImage: FATE_CARD_BACK_IMAGE,
  };
}

export function renderFateCardButton(slot = {}, options = {}) {
  const renderState = resolveFateCardRenderState(slot, options);
  const attrs = renderAttributes({
    ...(options.attributes || {}),
    "data-card-bfx": renderState.bfxId,
    "data-card-visual": renderState.showFrontImage ? renderState.visual?.visualSlug : "",
    "data-card-reveal-sprite": renderState.revealSprite,
  });
  const buttonClass = [
    options.className || "fate-card-button",
    renderState.auraClass,
    renderState.hintClass,
    renderState.selected ? "selected" : "",
    renderState.showIdentity ? "is-revealed" : "is-hidden-card",
    renderState.auraVisible ? "has-progressive-aura" : "",
  ].filter(Boolean).join(" ");
  const disabled = options.disabled ? " disabled" : "";
  const title = renderState.title || tf(options.hiddenTitleKey || "fateCardHints.hiddenCard", { number: (slot.index ?? 0) + 1 });
  const primaryHint = renderState.primaryHint || t("fateCardHints.hiddenHint");
  const extraLines = Array.isArray(options.extraLines) ? options.extraLines.filter(Boolean) : [];
  const revealLines = renderState.showIdentity ? identityLines(slot, options) : [];
  const progressiveLines = renderState.archetypeHint ? [`<small class="fate-card-archetype-hint">${escapeHtml(renderState.archetypeHint)}</small>`] : [];

  return `<button class="${escapeAttr(buttonClass)}" type="button" ${attrs} aria-pressed="${renderState.selected ? "true" : "false"}"${disabled}>
    ${renderFateCardVisual(renderState, title)}
    <span class="creation-starter-card-glow">${escapeHtml(renderState.glow || t("fateCardHints.hiddenGlow"))}</span>
    <strong>${escapeHtml(title)}</strong>
    <small>${escapeHtml(primaryHint)}</small>
    ${revealLines.join("")}
    ${extraLines.map((line) => `<small>${escapeHtml(line)}</small>`).join("")}
    ${progressiveLines.join("")}
  </button>`;
}

function renderFateCardVisual(renderState, title) {
  if (renderState.showFrontImage) {
    return `<span class="fate-card-visual fate-card-visual-front" aria-hidden="true">
      <img src="${escapeAttr(renderState.visual.frontImage)}" alt="" loading="lazy" decoding="async" />
    </span>`;
  }
  return `<span class="fate-card-visual fate-card-visual-back" aria-hidden="true">
    <img src="${escapeAttr(renderState.backImage)}" alt="${escapeAttr(title)}" loading="lazy" decoding="async" />
  </span>`;
}

function shouldShowAura(slot, { mode, hintLevel, revealed }) {
  if (mode === FATE_CARD_RENDER_MODES.devPreview || revealed) return true;
  if (hintLevel <= 0) return false;
  const auraTier = resolveFateCardAuraTier(slot.grade || slot.auraCard?.grade || slot.card?.grade || slot.card?.glow);
  if (hintLevel === 1) return auraTier !== "blue";
  if (hintLevel === 2) return auraTier === "purple" || auraTier === "orange" || auraTier === "gold";
  return true;
}

function hiddenGlowLabel(auraTier, hintLevel, mode) {
  if (mode === FATE_CARD_RENDER_MODES.devPreview) return t(`fateCardHints.aura.${auraTier}`);
  if (hintLevel <= 0) return t("fateCardHints.hiddenGlow");
  if (hintLevel === 1) return t("fateCardHints.subtlePresence");
  if (hintLevel === 2) return auraTier === "blue" ? t("fateCardHints.subtlePresence") : t("fateCardHints.faintAura");
  return t("fateCardHints.unreadableAura");
}

function archetypeHint(archetype) {
  const key = String(archetype || "utility");
  return t(`fateCardHints.archetypes.${key}`) || "";
}

function identityLines(slot, options) {
  if (options.showIdentityDetails === false) return [];
  const trait = slot.traitName || slot.card?.trait || slot.card?.traitName || "";
  const skill = slot.skillName || slot.card?.skill || slot.card?.skillName || "";
  return [
    trait ? `<small>${escapeHtml(tf("fateCardHints.traitLine", { trait }))}</small>` : "",
    skill ? `<small>${escapeHtml(tf("fateCardHints.skillLine", { skill }))}</small>` : "",
  ].filter(Boolean);
}

function cardName(slot) {
  return slot.cardName || slot.card?.card || slot.card?.name || slot.cardId || "";
}

function cardGlow(slot) {
  const auraTier = resolveFateCardAuraTier(slot.grade || slot.auraCard?.grade || slot.card?.grade || slot.card?.glow);
  return t(`fateCardHints.aura.${auraTier}`) || slot.card?.glow;
}

function resolveSlotVisual(slot = {}) {
  return resolveFateCardVisual({
    ...(slot.card || {}),
    id: slot.card?.id || slot.cardId,
    visualSlug: slot.card?.visualSlug || slot.visualSlug,
  });
}

function renderAttributes(attributes) {
  return Object.entries(attributes)
    .filter(([, value]) => value !== undefined && value !== null && value !== false)
    .map(([name, value]) => `${name}="${escapeAttr(value)}"`)
    .join(" ");
}

function normalizeHintLevel(value) {
  const level = Math.floor(Number(value));
  if (!Number.isFinite(level)) return 0;
  return Math.max(0, Math.min(4, level));
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => {
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

function escapeAttr(value) {
  return escapeHtml(value);
}
