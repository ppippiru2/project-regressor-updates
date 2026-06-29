export const CARD_GRADE_AURA_CLASSES = Object.freeze({
  blue: "card-aura-blue",
  rare: "card-aura-rare",
  purple: "card-aura-purple",
  epic: "card-aura-epic",
  orange: "card-aura-orange",
  legendary: "card-aura-legendary",
  gold: "card-aura-gold",
});

export function resolveCardGradeAuraClass(card = {}) {
  const grade = normalizeGrade(card.grade || card.rarity || card.glow || card.cardGrade);
  return CARD_GRADE_AURA_CLASSES[grade] || CARD_GRADE_AURA_CLASSES.blue;
}

function normalizeGrade(value) {
  const text = String(value || "").toLowerCase();
  if (text === "ex" || text === "sss" || text.includes("gold") || text.includes("\uAE08\uBE5B")) return "gold";
  if (text.includes("legend") || text.includes("\uC804\uC124")) return "legendary";
  if (text === "ss" || text === "s" || text.includes("orange") || text.includes("red") || text.includes("\uC8FC\uD669") || text.includes("\uBD89")) return "orange";
  if (text.includes("epic") || text.includes("\uC601\uC6C5")) return "epic";
  if (text === "a" || text === "b" || text.includes("purple") || text.includes("\uBCF4\uB78F")) return "purple";
  if (text.includes("rare") || text.includes("\uD76C\uADC0")) return "rare";
  return "blue";
}
