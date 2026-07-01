import { getLocaleText } from "../localization/index.js?v=678";
import { portraitFrameFromFormData } from "./portraitFrame.js?v=678";

export const PROFILE_IMAGE_CUSTOMIZATION_BRIDGE_ID = "character_customization_profile_image_v1";

const DISPOSITION_SCORE_KEYS = Object.freeze([
  "devotedOrder",
  "practicalBalance",
  "coldCalculation",
  "freeSurvival",
  "inquiryRecord",
]);

const ANSWER_DISPOSITION_WEIGHTS = Object.freeze({
  hero: Object.freeze({ devotedOrder: 2 }),
  lawful: Object.freeze({ devotedOrder: 2 }),
  pragmatic: Object.freeze({ practicalBalance: 2, inquiryRecord: 1 }),
  vengeful: Object.freeze({ coldCalculation: 2 }),
  chaotic: Object.freeze({ freeSurvival: 2 }),
});

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
    profileImageBridgeId: PROFILE_IMAGE_CUSTOMIZATION_BRIDGE_ID,
    portraitFrame: portraitFrameFromFormData(formData),
  };
}

export function resolveAlignment(answers) {
  return resolveDispositionResult(answers).name;
}

export function resolveDispositionResult(answers = [], { localeText = getLocaleText() } = {}) {
  const scores = Object.fromEntries(DISPOSITION_SCORE_KEYS.map((key) => [key, 0]));
  for (const answer of Array.isArray(answers) ? answers : []) {
    const weights = ANSWER_DISPOSITION_WEIGHTS[answer];
    if (!weights) continue;
    for (const [key, value] of Object.entries(weights)) {
      scores[key] = (scores[key] || 0) + value;
    }
  }

  const bestId = DISPOSITION_SCORE_KEYS.reduce(
    (winner, key) => (scores[key] > scores[winner] ? key : winner),
    "inquiryRecord",
  );
  const id = scores[bestId] > 0 ? bestId : "inquiryRecord";
  const dispositions = localeText.story?.tutorialDialogue?.dispositions || {};
  const name = dispositions[id]?.name || localeText.profile?.alignments?.neutral || id;

  return {
    id,
    name,
    scores,
    scoreEntries: DISPOSITION_SCORE_KEYS.map((key) => ({
      id: key,
      name: dispositions[key]?.name || key,
      score: scores[key] || 0,
    })),
  };
}
