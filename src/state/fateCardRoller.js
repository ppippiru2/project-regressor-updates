import { t } from "../localization/index.js?v=678";

export const FATE_CARD_RENDER_MODES = Object.freeze({
  devPreview: "devPreview",
  productionProgressiveHint: "productionProgressiveHint",
});

export const FATE_CARD_HINT_LEVELS = Object.freeze({
  blind: 0,
  subtle: 1,
  faintAura: 2,
  colorAura: 3,
  recordInsight: 4,
});

export const MIN_FATE_CARD_CANDIDATES = 4;
export const MAX_FATE_CARD_CANDIDATES = 8;

const DISPOSITION_ARCHETYPE_WEIGHTS = Object.freeze({
  devotedOrder: Object.freeze({ survival: 28, utility: 8 }),
  practicalBalance: Object.freeze({ mobility: 18, utility: 16, survival: 8 }),
  coldCalculation: Object.freeze({ attack: 24, record: 12 }),
  freeSurvival: Object.freeze({ mobility: 20, utility: 12 }),
  inquiryRecord: Object.freeze({ record: 24, magic: 12 }),
});

export function getFateCardHintLevel(state = {}) {
  const run = normalizeRunCount(state.regressionCount ?? state.tutorialRun ?? state.tutorialFlags?.regressionCount);
  const karma = normalizeCount(state.karmaValue ?? state.karma?.value ?? state.karmaState?.value);
  const recordTier = normalizeCount(
    state.regressorRecordTier
      ?? state.regressionRecordTier
      ?? (state.regressorRecordUnlocked || state.tutorialFlags?.regressorRecordUnlocked ? 1 : 0),
  );

  if (run <= 1) return FATE_CARD_HINT_LEVELS.blind;
  if (run === 2 && karma < 10 && recordTier <= 1) return FATE_CARD_HINT_LEVELS.blind;
  if (run <= 3 && karma < 20 && recordTier < 2) return FATE_CARD_HINT_LEVELS.subtle;
  if (run <= 4 && karma < 40 && recordTier < 3) return FATE_CARD_HINT_LEVELS.faintAura;
  if (run <= 6 && karma < 70 && recordTier < 4) return FATE_CARD_HINT_LEVELS.colorAura;
  return FATE_CARD_HINT_LEVELS.recordInsight;
}

export function getCardCandidateCountByKarma(value) {
  const currentKarma = normalizeCount(value);
  if (currentKarma >= 90) return 8;
  if (currentKarma >= 70) return 7;
  if (currentKarma >= 50) return 6;
  if (currentKarma >= 30) return 5;
  return 4;
}

export function getCardGradeWeightSummary(value) {
  const currentKarma = normalizeCount(value);
  if (currentKarma >= 70) return t("regressionCardResync.gradeWeightHigh");
  if (currentKarma >= 30) return t("regressionCardResync.gradeWeightMid");
  if (currentKarma >= 10) return t("regressionCardResync.gradeWeightLow");
  return t("regressionCardResync.gradeWeightBlue");
}

export function createFateCardCandidateSlots(cards = [], context = {}, options = {}) {
  const sourceCards = Array.isArray(cards) ? cards.filter((card) => card?.id) : [];
  const count = normalizeFateCardCandidateCount(context.cardCandidateCount ?? getCardCandidateCountByKarma(context.karmaValue));
  const seed = normalizeCount(options.seed ?? context.seed ?? context.karmaValue ?? 0);
  const orderedCards = orderCardsByFateWeight(sourceCards, context, seed);

  return Array.from({ length: count }, (_, index) => {
    const card = orderedCards.length ? orderedCards[index % orderedCards.length]?.card : null;
    const archetype = resolveFateCardArchetype(card);
    const fallbackGrade = options.projectFallbackGrades
      ? resolveProjectedFateCardGrade(context.karmaValue, index, count)
      : "";
    const grade = card?.grade || card?.rarity || fallbackGrade || card?.glow || "D";
    return {
      index,
      slotId: `fate-card-candidate-${index + 1}`,
      card,
      cardId: card?.id || "",
      cardName: card?.card || card?.name || "",
      traitName: card?.trait || card?.traitName || "",
      skillName: card?.skill || card?.skillName || "",
      grade,
      auraTier: resolveFateCardAuraTier(grade),
      archetype,
      isSelected: false,
      isRevealed: false,
      auraCard: { ...(card || {}), grade },
    };
  });
}

export function orderCardsByFateWeight(cards = [], context = {}, seed = 0) {
  const sourceCards = Array.isArray(cards) ? cards.filter((card) => card?.id) : [];
  const dispositionId = resolveFateDispositionId(context.dispositionId || context.alignmentId || context.alignment);
  const karma = normalizeCount(context.karmaValue);
  const run = normalizeRunCount(context.regressionCount ?? context.tutorialRun);
  const rng = createSeededRandom(`${seed}:${karma}:${run}:${dispositionId}:${sourceCards.length}`);

  const weightedCards = sourceCards.map((card, index) => {
    const archetype = resolveFateCardArchetype(card);
    return {
      card,
      archetype,
      index,
      weight: resolveFateCardRollWeight(card, {
        ...context,
        dispositionId,
        karmaValue: karma,
        regressionCount: run,
      }),
    };
  });

  const ordered = [];
  const pool = [...weightedCards];
  while (pool.length) {
    const pickedIndex = pickWeightedIndex(pool, rng);
    ordered.push(pool[pickedIndex]);
    pool.splice(pickedIndex, 1);
  }
  return ordered;
}

export function resolveFateCardAuraTier(value) {
  const text = String(value || "").toLowerCase();
  if (text === "ex" || text === "sss" || text.includes("gold") || text.includes("legend") || text.includes("\uAE08\uBE5B")) {
    return "gold";
  }
  if (text === "ss" || text === "s" || text.includes("orange") || text.includes("red") || text.includes("\uC8FC\uD669") || text.includes("\uBD89")) {
    return "orange";
  }
  if (text === "a" || text === "b" || text.includes("purple") || text.includes("rare") || text.includes("\uBCF4\uB78F") || text.includes("\uD76C\uADC0")) {
    return "purple";
  }
  return "blue";
}

export function resolveFateCardRollWeight(card = {}, context = {}) {
  const dispositionId = resolveFateDispositionId(context.dispositionId || context.alignmentId || context.alignment);
  const archetype = resolveFateCardArchetype(card);
  const dispositionWeight = DISPOSITION_ARCHETYPE_WEIGHTS[dispositionId]?.[archetype] || 0;
  const gradeWeight = resolveGradeWeight(resolveFateCardAuraTier(card?.grade || card?.rarity || card?.glow), context.karmaValue, context.regressionCount ?? context.tutorialRun);
  return 100 + dispositionWeight + gradeWeight;
}

export function resolveFateDispositionId(value) {
  const text = String(value || "").trim();
  if (DISPOSITION_ARCHETYPE_WEIGHTS[text]) return text;
  const compact = text.replace(/\s/g, "").toLowerCase();
  for (const id of Object.keys(DISPOSITION_ARCHETYPE_WEIGHTS)) {
    const localizedName = normalizeDispositionText(t(`story.tutorialDialogue.dispositions.${id}.name`));
    if (localizedName && compact.includes(localizedName)) return id;
  }
  if (compact.includes("devoted")) return "devotedOrder";
  if (compact.includes("practical")) return "practicalBalance";
  if (compact.includes("cold")) return "coldCalculation";
  if (compact.includes("free")) return "freeSurvival";
  if (compact.includes("inquiry")) return "inquiryRecord";
  return "";
}

export function resolveFateCardArchetype(card = {}) {
  const text = [
    card?.id,
    card?.card,
    card?.name,
    card?.trait,
    card?.traitName,
    card?.skill,
    card?.skillName,
    card?.actionId,
  ].filter(Boolean).join(" ").toLowerCase();

  if (text.includes("enduring") || text.includes("survival") || text.includes("guard") || text.includes("\uBC84\uD2F0") || text.includes("\uC0DD\uC874") || text.includes("\uBC29\uC5B4")) return "survival";
  if (text.includes("light") || text.includes("step") || text.includes("mobility") || text.includes("\uBC1C\uAC78\uC74C") || text.includes("\uAE30\uB3D9")) return "mobility";
  if (text.includes("weapon") || text.includes("slash") || text.includes("attack") || text.includes("\uBB34\uAE30") || text.includes("\uAC15\uD0C0") || text.includes("\uACF5\uACA9")) return "attack";
  if (text.includes("mana") || text.includes("magic") || text.includes("\uB9C8\uB825")) return "magic";
  if (text.includes("record") || text.includes("codex") || text.includes("\uAE30\uB85D") || text.includes("\uB3C4\uAC10")) return "record";
  return "utility";
}

function resolveGradeWeight(auraTier, karma, run) {
  const karmaBand = Math.floor(normalizeCount(karma) / 20);
  const runBand = Math.max(0, normalizeRunCount(run) - 1);
  if (auraTier === "gold") return karmaBand * 18 + runBand * 8;
  if (auraTier === "orange") return karmaBand * 12 + runBand * 5;
  if (auraTier === "purple") return karmaBand * 7 + runBand * 3;
  return 0;
}

function resolveProjectedFateCardGrade(karmaValue, index, count) {
  const karma = normalizeCount(karmaValue);
  if (karma >= 90 && count >= 8 && index === count - 1) return "EX";
  if (karma >= 90 && count >= 8 && index >= Math.max(0, count - 2)) return "SSS";
  if (karma >= 70 && count >= 7 && index === count - 1) return "SSS";
  if (karma >= 70 && index >= Math.max(0, count - 2)) return "S";
  if (karma >= 50 && index === count - 1) return "S";
  if (karma >= 40 && index >= Math.max(0, count - 2)) return "A";
  if (karma >= 30 && index === count - 1) return "B";
  return "D";
}

export function normalizeFateCardCandidateCount(value) {
  const count = normalizeCount(value);
  if (count <= 0) return MIN_FATE_CARD_CANDIDATES;
  return Math.max(MIN_FATE_CARD_CANDIDATES, Math.min(MAX_FATE_CARD_CANDIDATES, count));
}

function normalizeRunCount(value) {
  const run = Math.floor(Number(value));
  return Number.isFinite(run) && run > 0 ? run : 1;
}

function normalizeCount(value) {
  const count = Math.floor(Number(value));
  return Number.isFinite(count) && count > 0 ? count : 0;
}

function normalizeDispositionText(value) {
  return String(value || "").replace(/\s/g, "").toLowerCase();
}

function pickWeightedIndex(entries, rng) {
  const totalWeight = entries.reduce((sum, entry) => sum + Math.max(1, Number(entry.weight) || 1), 0);
  let roll = rng() * totalWeight;
  for (let index = 0; index < entries.length; index += 1) {
    roll -= Math.max(1, Number(entries[index].weight) || 1);
    if (roll <= 0) return index;
  }
  return Math.max(0, entries.length - 1);
}

function createSeededRandom(seedValue) {
  let seed = hashSeed(seedValue);
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}

function hashSeed(value) {
  const text = String(value || "0");
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) {
    hash ^= text.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return hash >>> 0;
}
