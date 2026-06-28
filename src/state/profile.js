import { getLocaleText } from "../localization/index.js?v=535";
import { portraitFrameFromFormData } from "./portraitFrame.js?v=535";

export function buildPlayerProfileInput(formData, defaultProfile) {
  return {
    created: true,
    name: formData.get("name"),
    age: formData.get("age"),
    gender: formData.get("gender"),
    country: formData.get("country"),
    height: defaultProfile.height,
    weight: defaultProfile.weight,
    job: defaultProfile.job,
    title: defaultProfile.title,
    organization: defaultProfile.organization,
    alignment: resolveAlignment([...formData.entries()].filter(([key]) => key.startsWith("q")).map(([, value]) => value)),
    starterCardId: formData.get("starterCardId") || "",
    starterCardName: formData.get("starterCardName") || "",
    starterTraitId: formData.get("starterTraitId") || "",
    starterTrait: formData.get("starterTrait") || "",
    starterSkill: formData.get("starterSkill") || "",
    starterSkillActionId: formData.get("starterSkillActionId") || "",
    portraitDataUrl: formData.get("portraitDataUrl") || "",
    portraitFrame: portraitFrameFromFormData(formData),
  };
}

export function resolveAlignment(answers) {
  const alignmentText = getLocaleText().profile.alignments;
  const score = {
    hero: 0,
    pragmatic: 0,
    vengeful: 0,
    lawful: 0,
    chaotic: 0,
  };
  for (const answer of answers) {
    if (answer in score) score[answer] += 1;
  }

  const order = ["hero", "pragmatic", "vengeful", "lawful", "chaotic"];
  const best = order.reduce((winner, key) => (score[key] > score[winner] ? key : winner), "pragmatic");
  const second = order
    .filter((key) => key !== best)
    .sort((a, b) => score[b] - score[a])[0];

  if (score[best] === 0) return alignmentText.neutral;
  if (best === "chaotic" && second === "pragmatic" && score[second] > 0) return alignmentText.chaoticPragmatic;
  if (best === "lawful" && second === "hero" && score[second] > 0) return alignmentText.lawfulHero;
  if (best === "hero" && second === "lawful" && score[second] > 0) return alignmentText.heroLawful;
  if (best === "vengeful" && second === "chaotic" && score[second] > 0) return alignmentText.vengefulChaotic;

  return {
    hero: alignmentText.hero,
    pragmatic: alignmentText.pragmatic,
    vengeful: alignmentText.vengeful,
    lawful: alignmentText.lawful,
    chaotic: alignmentText.chaotic,
  }[best] || alignmentText.neutral;
}



