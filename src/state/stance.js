import { tf } from "../localization/index.js?v=371";

const ALLOWED_STANCES = new Set(["conserve", "power", "berserk", "break_wait"]);

export function isAllowedStance(stance) {
  return ALLOWED_STANCES.has(stance);
}

export function applyStanceSelection(state, stance, stanceLabel) {
  if (!isAllowedStance(stance)) {
    return { changed: false, message: "" };
  }

  state.stance = stance;
  return {
    changed: true,
    message: tf("equipmentActions.stanceChanged", { stanceLabel }),
  };
}
