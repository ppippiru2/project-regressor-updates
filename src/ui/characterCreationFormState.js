export function selectedStarterCard(draft = {}, options = {}) {
  const starterCards = Array.isArray(options.starterCards) ? options.starterCards : [];
  const emptyStarterCard = options.emptyStarterCard || {};
  if (!draft?.starterCardId) return emptyStarterCard;
  return starterCards.find((card) => card.id === draft.starterCardId) || emptyStarterCard;
}

export function starterCardFormValues(draft = {}, options = {}) {
  const card = selectedStarterCard(draft, options);
  return {
    starterCardId: card.id,
    starterCardName: card.card,
    starterTraitId: card.traitId || "",
    starterTrait: card.trait,
    starterSkill: card.skill,
    starterSkillActionId: card.actionId || "",
  };
}

export function renderCreationHiddenFields(draft = {}, options = {}) {
  const questions = Array.isArray(options.questions) ? options.questions : [];
  const statKeys = Array.isArray(options.statKeys) ? options.statKeys : [];
  const profileImageBridgeId = options.profileImageBridgeId || "";
  const portraitFrame = draft.portraitFrame || {};
  return `
    <input type="hidden" name="name" value="${escapeAttr(draft.name)}" />
    <input type="hidden" name="age" value="${escapeAttr(draft.age)}" />
    <input type="hidden" name="gender" value="${escapeAttr(draft.gender)}" />
    <input type="hidden" name="country" value="${escapeAttr(draft.country)}" />
    <input type="hidden" name="portraitDataUrl" value="${escapeAttr(draft.portraitDataUrl)}" />
    <input type="hidden" name="profileImageBridgeId" value="${escapeAttr(profileImageBridgeId)}" />
    <input type="hidden" name="portraitFrameX" value="${escapeAttr(portraitFrame.x)}" />
    <input type="hidden" name="portraitFrameY" value="${escapeAttr(portraitFrame.y)}" />
    <input type="hidden" name="portraitFrameScale" value="${escapeAttr(portraitFrame.scale)}" />
    ${renderStarterCardHiddenFields(draft, options)}
    ${questions.map((question) => `<input type="hidden" name="${escapeAttr(question.id)}" value="${escapeAttr(draft.answers?.[question.id] || "")}" />`).join("")}
    ${statKeys.map((stat) => `<input type="hidden" name="stat_${escapeAttr(stat)}" value="${escapeAttr(draft.stats?.[stat])}" />`).join("")}
  `;
}

export function syncCreationHiddenFields(form, draft = {}, options = {}) {
  if (!form) return;
  const questions = Array.isArray(options.questions) ? options.questions : [];
  const statKeys = Array.isArray(options.statKeys) ? options.statKeys : [];
  const profileImageBridgeId = options.profileImageBridgeId || "";
  const portraitFrame = draft.portraitFrame || {};

  for (const [name, value] of Object.entries({
    name: draft.name,
    age: draft.age,
    gender: draft.gender,
    country: draft.country,
    portraitDataUrl: draft.portraitDataUrl,
    profileImageBridgeId,
    portraitFrameX: portraitFrame.x,
    portraitFrameY: portraitFrame.y,
    portraitFrameScale: portraitFrame.scale,
    ...starterCardFormValues(draft, options),
  })) {
    setHiddenValue(form, name, value);
  }
  for (const question of questions) {
    setHiddenValue(form, question.id, draft.answers?.[question.id] || "");
  }
  for (const stat of statKeys) {
    setHiddenValue(form, `stat_${stat}`, draft.stats?.[stat]);
  }
}

function renderStarterCardHiddenFields(draft, options = {}) {
  return Object.entries(starterCardFormValues(draft, options))
    .map(([name, value]) => `<input type="hidden" name="${escapeAttr(name)}" value="${escapeAttr(value)}" />`)
    .join("");
}

function setHiddenValue(form, name, value) {
  let input = form.querySelector(`input[type="hidden"][name="${name}"]`);
  if (!input) {
    input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    form.appendChild(input);
  }
  input.value = value ?? "";
}

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    '"': "&quot;",
    "'": "&#39;",
  })[char]);
}

function escapeAttr(value) {
  return escapeHtml(value);
}
