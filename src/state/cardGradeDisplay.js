export const CARD_GRADE_AURA_CLASSES = Object.freeze({
  blue: "card-aura-blue",
  rare: "card-aura-rare",
  purple: "card-aura-purple",
  epic: "card-aura-epic",
  legendary: "card-aura-legendary",
});

export function resolveCardGradeAuraClass(card = {}) {
  const grade = normalizeGrade(card.grade || card.rarity || card.glow || card.cardGrade);
  return CARD_GRADE_AURA_CLASSES[grade] || CARD_GRADE_AURA_CLASSES.blue;
}

function normalizeGrade(value) {
  const text = String(value || "").toLowerCase();
  if (text.includes("legend") || text.includes("\uC804\uC124") || text.includes("\uAE08\uBE5B")) return "legendary";
  if (text.includes("epic") || text.includes("\uC601\uC6C5")) return "epic";
  if (text.includes("purple") || text.includes("\uBCF4\uB78F")) return "purple";
  if (text.includes("rare") || text.includes("\uD76C\uADC0")) return "rare";
  return "blue";
}
