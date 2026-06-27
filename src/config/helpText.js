import { getLocaleText } from "../localization/index.js?v=385";

const HELP_TEXT_CONFIG = getLocaleText().helpTextConfig;

export const FEEDBACK_OPTIONS = HELP_TEXT_CONFIG.feedbackOptions.map(({ id, label }) => [id, label]);

export const COMBAT_VIEW_OPTIONS = HELP_TEXT_CONFIG.combatViewOptions.map(({ id, label, description }) => [
  id,
  label,
  description,
]);

export const HELP_TEXT = HELP_TEXT_CONFIG.helpText;

export const BASIC_ATTACK_ACTION = { ...HELP_TEXT_CONFIG.basicAttackAction };

export const ACTION_TRIGGER_TEXT = HELP_TEXT_CONFIG.actionTriggerText;

export const COMBAT_INFO_HIDE_HINT = HELP_TEXT_CONFIG.combatInfoHideHint;
