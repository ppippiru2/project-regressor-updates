import {
  ACTION_TRIGGER_TEXT,
  BASIC_ATTACK_ACTION,
  COMBAT_INFO_HIDE_HINT,
  HELP_TEXT,
} from "./config/helpText.js?v=424";
import { bindAppEvents } from "./app/appEvents.js?v=424";
import { renderAppFrame, renderAppRegionList } from "./app/appRenderer.js?v=424";
import { handleObjectiveActionNavigation } from "./app/objectiveActionNavigation.js?v=424";
import {
  ACTIVE_SLOT_SYNC_INTERVAL_MS,
  MAX_LOG_LINES,
  OBJECTIVE_TICKER_INTERVAL_MS,
  SLOW_RENDER_INTERVAL_MS,
} from "./app/appRuntimeConfig.js?v=424";
import { finalizeSaveSessionTransition } from "./app/saveSessionFlow.js?v=424";
import { registerServiceWorker } from "./app/serviceWorkerRegistration.js";
import * as assetRegistryApi from "./assets/assetRegistry.js?v=424";
import { applyDomLocalization } from "./localization/domText.js?v=424";
import { t, tf } from "./localization/index.js?v=424";
import { clearCombatEffectLayers } from "./combat/combatEffects.js?v=424";
import { BULK_STAT_DEALLOCATE_AMOUNT } from "./balance/playerGrowthBalance.js?v=424";
import { CONTENT_PROFILE, applyContentProfileToDocument, exposeContentProfile } from "./content/contentProfile.js?v=424";
import {
  clamp,
  enemyHyperChargeMultiplier,
  enemyHyperCooldownSeconds,
  enemyHyperDurationSeconds,
  expToNext,
  hyperChargeMultiplier,
  hyperCooldownSeconds,
  hyperDurationSeconds,
  monsterStats,
  rankCombatModifier,
} from "./combat/combatFormula.js";
import {
  choosePlayerAction as chooseCombatPlayerAction,
  skillAvailability as getCombatSkillAvailability,
  stanceName,
} from "./combat/combatActions.js?v=424";
import {
  attackEffectType,
  buildCombatActionList,
  combatActionTriggerText,
  equippedWeapon,
  findCombatAction,
} from "./combat/combatActionDisplay.js";
import { queueCombatTextEffect } from "./combat/combatFeedbackState.js?v=424";
import { resolveEnemyAttack, resolvePlayerAttack } from "./combat/combatDamage.js";
import { createDefeatedTargetPreview } from "./combat/combatDefeatPreview.js?v=424";
import {
  applyHealAction,
  applyResolvedEnemyAttack,
  applyResolvedPlayerAttack,
} from "./combat/combatActionResults.js?v=424";
import {
  advanceHitCombo,
  applySkillBreakDamage,
  playerHyperChargeFromSuccessfulHit,
  resetHitComboState,
} from "./combat/combatHitResults.js?v=424";
import {
  AUTO_RESTART_DELAY_MS,
  COMBAT_FRAME_MS,
  HIT_RESET_MS,
  HYP_MAX,
  createCombatRuntime,
  resetCombatRuntime,
} from "./combat/combatState.js?v=424";
import {
  bossBreakMessage,
  combatStartMessage,
  combatStopMessage,
  enemyAttackMessage,
  enemyEvadeMessage,
  playerHealMessage,
  playerHitMessage,
  playerMissMessage,
} from "./combat/combatMessages.js";
import {
  canChargePlayerHyper,
  chargeEnemyHyper,
  chargePlayerHyper,
} from "./combat/hyperState.js";
import {
  advanceCombatFrameRuntime,
  consumeReadyEnemyAction,
  consumeReadyPlayerAction,
} from "./combat/combatTick.js?v=424";
import { clearIntervalTimer, clearTimeoutTimer, restartIntervalTimer, restartTimeoutTimer } from "./combat/combatTimers.js?v=424";
import {
  applyIncomingDamageTestOption,
  applyOutgoingDamageTestOption,
} from "./combat/combatTestOptions.js?v=424";
import {
  displayNames,
  equipment,
  gateMaps,
  items,
  monsters,
  primaryStats,
  regions,
  shopCatalog,
  shopCategories,
  skills,
  slots,
} from "./data.js?v=424";
import {
  DEFAULT_ACTIVE_SKILL_LOADOUT_ID,
  DEFAULT_COMBAT_FEEDBACK,
  DEFAULT_COMBAT_VIEW,
  DEFAULT_DEVELOPER_OPTIONS,
  DEFAULT_PLAYER_PROFILE,
  DEFAULT_SKILL_LOADOUTS,
  MAX_SKILL_LOADOUT_ACTIONS,
  loadState,
  loadUiState,
  normalizeUiState,
  saveState as saveStoredState,
  saveUiState as saveStoredUiState,
} from "./state/save.js?v=424";
import {
  developerOptionLabel,
  normalizeDeveloperOptionValue,
  normalizeDeveloperOptions,
} from "./state/developerOptions.js?v=424";
import { createInitialState } from "./state/initialState.js?v=424";
import { applyImportedUiState, exportSavePayloadSnapshot, importSavePayloadText } from "./state/saveLoadActions.js?v=424";
import { playerStats } from "./state/progression.js?v=424";
import { starterTraitStatBonuses } from "./state/starterTraitEffects.js?v=424";
import { addInventoryItem } from "./state/inventory.js";
import { equipInventoryItem, resolveEquipmentSlot, unequipEquipmentSlot } from "./state/equipmentActions.js?v=424";
import { equipRecommendedItems } from "./state/recommendedEquipment.js?v=424";
import {
  beginGateReplay,
  ensureGateProgress as ensureGateProgressState,
  isGateProgressComplete,
  moveGateProgress,
} from "./state/regionProgress.js?v=424";
import {
  applyCharacterProfile,
  applyInitialCreationStats,
  characterIntroLogMessages,
  createCharacterProfile,
  updatePlayerProfileSettings,
} from "./state/profileActions.js?v=424";
import {
  DEFAULT_SAVE_SLOT_ID,
  clearSaveSlot,
  loadActiveSaveSlotId,
  loadSaveSlot,
  readSaveSlotEntries,
  saveActiveSaveSlotId,
  saveCurrentToSlot,
  saveSlotLabel,
} from "./state/saveSlots.js?v=424";
import {
  createPendingSlotCreationSnapshot,
  restorePendingSlotCreationSnapshot,
} from "./state/saveSlotSession.js?v=424";

import { createGateNodeResolution, resolveGateNodeOutcome } from "./state/gateNodeActions.js?v=424";
import {
  shouldContinueAutoHunt,
  shouldRestartAutoHunt,
  startCombatSession,
  stopCombatSession,
  toggleAutoHuntState,
} from "./state/combatSession.js?v=424";
import {
  IDLE_RECOVERY_FRAME_MS,
  applyPassiveRecovery,
  enterRestMode,
  leaveRestMode,
  passiveRecoveryElapsedSeconds,
} from "./state/passiveRecovery.js?v=424";
import { applyMonsterDefeatRewards } from "./state/combatRewards.js?v=424";
import { applyPendingLevelProgression } from "./state/levelUpActions.js?v=424";
import { applyPlayerDefeatRecovery } from "./state/defeatRecovery.js";
import {
  activateEnemyHyperMode,
  activatePlayerHyperMode,
  endEnemyHyperMode as endEnemyHyperModeAction,
  endPlayerHyperMode as endPlayerHyperModeAction,
} from "./state/hyperActions.js?v=424";
import {
  hideCombatInfoIfAllowed,
  markCombatActionUsed,
  showCombatActionInfo,
  showCombatHelpInfo,
  triggerCombatActionFlash,
} from "./state/combatRuntimeUi.js?v=424";
import {
  BATTLE_SPRITE_MOTION_IDS,
  clearBattleSpriteMotions,
  triggerBattleSpriteMotion,
} from "./ui/battleSpriteMotion.js?v=424";
import {
  monsterAttackEffectPlacement,
  monsterAttackEffectType,
  resolveMonsterBattleSpritePreset,
} from "./config/monsterBattleSpritePresets.js?v=424";
import { resolvePlayerAttackEffectPlacement } from "./config/playerBattleSprites.js?v=424";
import { displayNameFor, equippedItemList, findById, itemOptionText } from "./state/dataLookup.js";
import { addLogEntry } from "./state/log.js";
import { buyShopItem, sellInventoryItem } from "./state/shop.js?v=424";
import { applyStanceSelection } from "./state/stance.js?v=424";
import {
  allocatePlayerStat,
  allocateRecommendedStats,
  confirmAllocatedStats,
  deallocatePlayerStat,
  resetAllocatedStats,
} from "./state/statAllocation.js?v=424";
import { applyRegionSelection, previewRegionState } from "./state/regionSelection.js?v=424";
import {
  stepObjectiveRotationState,
  toggleObjectiveAlertState,
  toggleObjectiveRotationModeState,
} from "./state/objectiveUiState.js?v=424";
import {
  normalizeHyperRuntime,
  normalizePlayerResources,
  normalizeTargetResources,
  restorePlayerResources,
  shouldResetHitCombo,
} from "./state/playerResources.js?v=424";
import {
  hasSkillLoadout,
  resolveActiveLoadoutActions,
  resolveActiveLoadoutSkills,
  resolveActiveSkillLoadout,
} from "./state/skillLoadout.js?v=424";
import {
  claimFirstCombatGuide,
  claimRegionCoreEventGuide,
  createTutorialFlags,
} from "./state/tutorialGuidance.js?v=424";
import { claimOfflineAutoHuntReward, stampLastSeen } from "./state/offlineReward.js?v=424";
import { nodeName } from "./ui/renderRegion.js?v=424";
import { renderLog } from "./ui/renderCommon.js?v=424";
import { renderCombatSkillInfo } from "./ui/renderCombatActions.js?v=424";
import { renderHitCounter } from "./ui/renderCombatPulse.js?v=424";
import { setupCollapsiblePanels } from "./ui/panels.js?v=424";
import { setSaveStatus } from "./ui/saveSlotStatus.js?v=424";
import {
  activeViewId,
  activateView,
  resetCharacterCreationWizard,
  setCreationCancelMode,
} from "./ui/viewNavigation.js?v=424";

const $ = (selector) => document.querySelector(selector);
const { loadAssetRegistry, resolveRegionCardImagePath } = assetRegistryApi;

const localizedContentProfile = {
  ...CONTENT_PROFILE,
  title: t(CONTENT_PROFILE.titleKey, CONTENT_PROFILE.title),
  description: t(CONTENT_PROFILE.descriptionKey, CONTENT_PROFILE.description),
};
applyContentProfileToDocument(document, localizedContentProfile);
exposeContentProfile(window, localizedContentProfile);

const initialState = () =>
  createInitialState({
    slots,
    regions,
    defaultCombatFeedback: DEFAULT_COMBAT_FEEDBACK,
    defaultCombatView: DEFAULT_COMBAT_VIEW,
    defaultDeveloperOptions: DEFAULT_DEVELOPER_OPTIONS,
    defaultPlayerProfile: DEFAULT_PLAYER_PROFILE,
    defaultSkillLoadouts: DEFAULT_SKILL_LOADOUTS,
    defaultActiveSkillLoadoutId: DEFAULT_ACTIVE_SKILL_LOADOUT_ID,
  });

let state = loadState(initialState);
let uiState = loadUiState();
const storedActiveSaveSlotId = loadActiveSaveSlotId();
let activeSaveSlotId = storedActiveSaveSlotId === null ? DEFAULT_SAVE_SLOT_ID : storedActiveSaveSlotId;
let combatTimer = null;
let autoRestartTimer = null;
let objectiveTickerTimer = null;
let recoveryTimer = null;
let recoveryLastFrameAt = Date.now();
let nextSlowRenderAt = 0;
let nextActiveSlotSyncAt = 0;
let combatRuntime = createCombatRuntime();
let assetRegistry = assetRegistryApi.STATIC_ASSET_REGISTRY;
let pendingNewSlotCreation = null;

function getItem(itemId) {
  return findById(items, itemId);
}

function getRegion(regionId = state.regionId) {
  return findById(regions, regionId);
}

function getMonster(monsterId) {
  return findById(monsters, monsterId);
}

function getSkill(skillId) {
  return findById(skills, skillId);
}

function allCombatActions() {
  return buildCombatActionList(BASIC_ATTACK_ACTION, skills);
}

function developerSettings() {
  return normalizeDeveloperOptions(state.settings?.developer);
}

function activeSkillLoadout() {
  return resolveActiveSkillLoadout(state.skillLoadouts, state.activeSkillLoadoutId);
}

function activeLoadoutActions() {
  return resolveActiveLoadoutActions(activeSkillLoadout(), allCombatActions(), BASIC_ATTACK_ACTION);
}

function activeLoadoutSkills() {
  return resolveActiveLoadoutSkills(activeLoadoutActions(), skills);
}

function resetSkillLoadoutsForNewCharacter(profile) {
  state.skillLoadouts = DEFAULT_SKILL_LOADOUTS.map((loadout) => ({
    ...loadout,
    actionIds: [...loadout.actionIds],
  }));
  state.activeSkillLoadoutId = DEFAULT_ACTIVE_SKILL_LOADOUT_ID;

  const starterActionId = profile?.starterSkillActionId || "";
  if (!starterActionId || !getSkill(starterActionId)) return;
  const loadout = activeSkillLoadout();
  if (!loadout || loadout.actionIds.includes(starterActionId)) return;
  if (loadout.actionIds.length >= MAX_SKILL_LOADOUT_ACTIONS) return;
  loadout.actionIds.push(starterActionId);
}

function getGateMap(mapId) {
  return findById(gateMaps, mapId);
}

function optionText(item) {
  return itemOptionText(item, displayName);
}

function displayName(key) {
  return displayNameFor(displayNames, key);
}

function getEquippedItems() {
  return equippedItemList(state.equipment, equipment);
}

function derivedPlayer() {
  return playerStats(state.player, getEquippedItems(), starterTraitStatBonuses(state.playerProfile));
}

function addLog(message) {
  state.log = addLogEntry(state.log, message, MAX_LOG_LINES);
}

function saveUiState() {
  saveStoredUiState(uiState);
}

function toggleObjectiveAlert(objectiveId) {
  if (!objectiveId) return;
  toggleObjectiveAlertState(uiState, objectiveId);
  saveUiState();
  render();
}

function toggleObjectiveRotationMode(currentIndex = 0, total = 1) {
  toggleObjectiveRotationModeState(uiState, currentIndex, total);
  saveUiState();
  render();
}

function stepObjective(direction, currentIndex = 0, total = 1) {
  stepObjectiveRotationState(uiState, direction, currentIndex, total);
  saveUiState();
  render();
}

function saveState() {
  stampLastSeen(state);
  saveStoredState(state);
  syncActiveSaveSlot();
}

function syncActiveSaveSlot({ force = false } = {}) {
  if (!activeSaveSlotId) return;
  if (state.playerProfile?.created === false) return;
  const now = Date.now();
  if (!force && now < nextActiveSlotSyncAt) return;
  saveCurrentToSlot(activeSaveSlotId, state, uiState, { regionName: getRegion()?.name || "" });
  nextActiveSlotSyncAt = now + ACTIVE_SLOT_SYNC_INTERVAL_MS;
}

function ensureHp() {
  const derived = derivedPlayer();
  normalizePlayerResources(state.player, derived, { inCombat: state.inCombat, clampValue: clamp });
  normalizeHyperRuntime(state, { hypMax: HYP_MAX, clampValue: clamp });
  if (shouldResetHitCombo(state, { hitResetMs: HIT_RESET_MS })) {
    resetHitCombo("timeout");
  }
  if (state.target?.monsterId) {
    const monster = getMonster(state.target.monsterId);
    if (monster) {
      const targetStats = monsterStats(monster);
      normalizeTargetResources(state.target, targetStats, { clampValue: clamp });
    }
  }
}

function startCombat(monsterId = getRegion().monsterId) {
  if (state.inCombat) return;
  clearAutoRestart();
  leaveRestMode(state);
  const monster = getMonster(monsterId);
  const stats = monsterStats(monster);
  if (!startCombatSession(state, monster, stats)) return;
  resetActionGauges();
  ensureHp();
  addLog(combatStartMessage(monster));
  for (const message of claimRegionCoreEventGuide(state, getRegion())) {
    addLog(message);
  }
  for (const message of claimFirstCombatGuide(state, { regionId: state.regionId, firstRegionId: regions[0]?.id || "" })) {
    addLog(message);
  }
  startLoop();
  render({ combatFrame: true });
}

function stopCombat(reason = "combat_stop") {
  stopCombatSession(state);
  resetHitCombo(reason);
  combatTimer = clearIntervalTimer(combatTimer);
  resetActionGauges({ preserveActionMarker: true });
}

function toggleCombat() {
  if (state.inCombat) {
    clearAutoRestart();
    stopCombat("manual_combat_stop");
    addLog(combatStopMessage());
    saveState();
    render();
    return;
  }
  startCombat();
}

function startLoop() {
  combatRuntime.lastFrameAt = Date.now();
  combatTimer = restartIntervalTimer(combatTimer, combatTick, COMBAT_FRAME_MS);
}

function clearAutoRestart() {
  autoRestartTimer = clearTimeoutTimer(autoRestartTimer);
}

function scheduleAutoRestart(delayMs, beforeRestart) {
  autoRestartTimer = restartTimeoutTimer(autoRestartTimer, () => {
    if (!shouldRestartAutoHunt(state)) return;
    beforeRestart?.();
    startCombat();
  }, delayMs);
}

function combatTick() {
  if (!state.inCombat || !state.target) return;

  const player = derivedPlayer();
  const monster = getMonster(state.target.monsterId);
  const enemy = monsterStats(monster);
  const frame = advanceCombatFrameRuntime({ state, combatRuntime, player, enemy });

  if (frame.playerHyperEnded) {
    endHyperMode(player);
  }

  if (frame.enemyHyperEnded) {
    endEnemyHyperMode(monster);
  }

  if (consumeReadyPlayerAction(combatRuntime)) {
    performPlayerAction(player, monster, enemy);
  }

  if (state.inCombat && state.target && consumeReadyEnemyAction(combatRuntime)) {
    performEnemyAction(monster, enemy, player);
  }

  render();
}

function resetActionGauges({ preserveActionMarker = false } = {}) {
  const lastActionId = combatRuntime.lastActionId;
  const actionFlashUntil = combatRuntime.actionFlashUntil;
  combatRuntime = resetCombatRuntime();
  if (preserveActionMarker && actionFlashUntil > Date.now()) {
    combatRuntime.lastActionId = lastActionId;
    combatRuntime.actionFlashUntil = actionFlashUntil;
  }
}

function clearCombatVisualFeedback() {
  state.effects = [];
  combatRuntime.flashUntil = 0;
  combatRuntime.actionFlashUntil = 0;
  combatRuntime.hyperEndFlashUntil = 0;
  combatRuntime.enemyHyperEndFlashUntil = 0;
  clearBattleSpriteMotions(combatRuntime);
  clearCombatEffectLayers();
}

function triggerActionFlash() {
  triggerCombatActionFlash(combatRuntime);
}

function canChargeHyper() {
  return canChargePlayerHyper(state);
}

function addHyperCharge(amount, player = derivedPlayer()) {
  chargePlayerHyper(state, amount, hyperChargeMultiplier(player), HYP_MAX);
}

function addEnemyHyperCharge(amount, monster) {
  if (!state.inCombat) return;
  if (chargeEnemyHyper(combatRuntime, amount, enemyHyperChargeMultiplier(monster), HYP_MAX)) activateEnemyHyper(monster);
}

function endHyperMode(player = derivedPlayer()) {
  addLog(endPlayerHyperModeAction(state, combatRuntime, hyperCooldownSeconds(player)));
}

function activateEnemyHyper(monster) {
  addLog(activateEnemyHyperMode(combatRuntime, monster, enemyHyperDurationSeconds(monster), HYP_MAX));
}

function endEnemyHyperMode(monster) {
  addLog(endEnemyHyperModeAction(combatRuntime, monster, enemyHyperCooldownSeconds(monster)));
}

function performPlayerAction(player, monster, enemy) {
  const action = choosePlayerAction(player);
  markPlayerActionUsed(action.skill);
  triggerActionFlash();
  triggerPlayerSpriteAction(action);

  if (action.kind === "heal") {
    applyHealAction(state.player, player, action, clamp);
    addLog(playerHealMessage(action));
    showCombatText("heal", Math.floor(action.amount), "player", action.skill.effectType);
    saveState();
    return;
  }

  const effectType = getAttackEffectType(action.skill);
  const result = applyOutgoingDamageTestOption(resolvePlayerAttack(player, enemy, action, state.hyperActiveTicks > 0), {
    options: developerSettings(),
    targetHp: state.target?.hp,
  });
  const applied = applyResolvedPlayerAttack({
    playerState: state.player,
    targetState: state.target,
    action,
    result,
    monster,
  });

  if (applied.missed) {
    showCombatText("miss", t("combat.text.miss"), "enemy");
    addLog(playerMissMessage(action));
    saveState();
    return;
  }

  addEnemyHyperCharge(applied.enemyHyperCharge, monster);
  registerPlayerHit(result.damage, result.critical, effectType, action.skill);
  addLog(playerHitMessage(result, action, monster));

  if (applied.monsterDefeated) {
    defeatMonster(monster);
    return;
  }

  saveState();
}

function performEnemyAction(monster, enemy, player) {
  triggerActionFlash();
  const monsterSpritePreset = resolveMonsterBattleSpritePreset(monster);
  triggerBattleSpriteMotion(combatRuntime, "enemy", BATTLE_SPRITE_MOTION_IDS.basicAttack, {
    sfxId: monsterSpritePreset.sfxProfile,
  });

  const enemyHyperActive = combatRuntime.enemyHyperActiveTicks > 0;
  const result = applyIncomingDamageTestOption(resolveEnemyAttack(enemy, player, enemyHyperActive), {
    options: developerSettings(),
  });
  const applied = applyResolvedEnemyAttack({
    playerState: state.player,
    result,
    monster,
  });

  if (applied.evaded) {
    showCombatText("miss", t("combat.text.miss"), "player");
    addLog(enemyEvadeMessage(monster));
    saveState();
    return;
  }

  addHyperCharge(applied.playerHyperCharge, player);
  addEnemyHyperCharge(applied.enemyHyperCharge, monster);
  triggerBattleSpriteMotion(combatRuntime, "player", BATTLE_SPRITE_MOTION_IDS.hitReaction);
  const enemyEffectContext = { hyperActive: enemyHyperActive };
  const enemyEffectPlacement = monsterAttackEffectPlacement(monster, enemyEffectContext);
  showCombatText(
    "damage",
    result.damage,
    "player",
    monsterAttackEffectType(monster, enemyEffectContext),
    result.critical,
    enemyEffectPlacement,
  );
  if (result.critical) showCombatText("critical", t("combat.text.critical"), "player", "impact", false, enemyEffectPlacement);
  addLog(enemyAttackMessage(monster, result, enemyHyperActive));

  if (applied.playerDefeated) {
    const recovery = applyPlayerDefeatRecovery(state, player, monster);
    stopCombat("player_death");
    triggerBattleSpriteMotion(combatRuntime, "player", BATTLE_SPRITE_MOTION_IDS.downPlaceholder);
    addLog(recovery.message);
    if (recovery.shouldAutoRecover) {
      scheduleAutoRestart(AUTO_RESTART_DELAY_MS * 2, () => {
        state.player.hp = derivedPlayer().maxHp;
        state.player.mp = derivedPlayer().maxMp;
        addLog(t("combat.log.autoRestartAfterRecovery"));
      });
    }
  }

  saveState();
}

function choosePlayerAction(player) {
  return chooseCombatPlayerAction(player, state, activeLoadoutSkills(), getSkill, HYP_MAX);
}

function skillAvailability(skill, player = derivedPlayer(), requireCombat = false) {
  return getCombatSkillAvailability(skill, player, state, requireCombat, HYP_MAX);
}

function markPlayerActionUsed(skill) {
  markCombatActionUsed(combatRuntime, skill);
}

function selectActionInfo(actionId) {
  showCombatActionInfo(combatRuntime, actionId);
  renderCombatSkillInfo(derivedPlayer(), combatActionRenderContext());
}

function selectSkillLoadout(loadoutId) {
  if (!hasSkillLoadout(state.skillLoadouts, loadoutId)) return;
  state.activeSkillLoadoutId = loadoutId;
  const visibleActionIds = new Set(combatActionList().map((action) => action.id));
  if (combatRuntime.visibleActionInfoId && !visibleActionIds.has(combatRuntime.visibleActionInfoId)) {
    combatRuntime.visibleActionInfoId = null;
  }
  saveState();
  render();
}

function selectCombatHelp(helpId) {
  if (!HELP_TEXT[helpId]) return;
  showCombatHelpInfo(combatRuntime, helpId);
  renderCombatSkillInfo(derivedPlayer(), combatActionRenderContext());
}

function hideCombatInfo() {
  if (!hideCombatInfoIfAllowed(combatRuntime)) return;
  renderCombatSkillInfo(derivedPlayer(), combatActionRenderContext());
}

function showCombatInfoFromElement(element) {
  if (!element) return;
  if (element.dataset.actionInfo) {
    selectActionInfo(element.dataset.actionInfo);
    return;
  }
  if (element.dataset.combatHelp) selectCombatHelp(element.dataset.combatHelp);
}

function isTouchDoubleTapMode() {
  return state.settings.combatView.touchDoubleTapActions === true;
}

function isInfoTooltipEnabled() {
  return state.settings.combatView.fieldInfoTooltips !== false;
}

function combatInfoHint() {
  if (isTouchDoubleTapMode()) {
    return t("combat.info.touchDoubleTapHint");
  }
  return COMBAT_INFO_HIDE_HINT;
}

function combatActionList() {
  return activeLoadoutActions();
}

function getCombatAction(actionId) {
  return findCombatAction(actionId, allCombatActions());
}

function actionTriggerText(action) {
  return combatActionTriggerText(action, {
    basicAttackAction: BASIC_ATTACK_ACTION,
    triggerText: ACTION_TRIGGER_TEXT,
    stanceLabel: stanceName(state.stance),
  });
}

function getAttackEffectType(skill) {
  return attackEffectType(skill, getEquippedWeapon());
}

function triggerPlayerSpriteAction(action) {
  const isSkill = Boolean(action?.skill);
  const motionId = isSkill ? BATTLE_SPRITE_MOTION_IDS.skillCast : BATTLE_SPRITE_MOTION_IDS.basicAttack;
  triggerBattleSpriteMotion(combatRuntime, "player", motionId, {
    sfxId: action?.skill?.effectType || "basic_attack_runtime",
  });
}

function getEquippedWeapon() {
  return equippedWeapon(state.equipment, getItem);
}

function registerPlayerHit(damage, critical, effectType, skill) {
  advanceHitCombo(state);
  addHyperCharge(playerHyperChargeFromSuccessfulHit(critical));
  triggerBattleSpriteMotion(combatRuntime, "enemy", BATTLE_SPRITE_MOTION_IDS.hitReaction);
  const playerEffectPlacement = resolvePlayerAttackEffectPlacement(state.playerProfile, {
    effectType,
    hyperActive: state.hyperActiveTicks > 0,
  });
  showCombatText("damage", damage, "enemy", effectType, critical, playerEffectPlacement);
  if (critical) showCombatText("critical", t("combat.text.critical"), "enemy", "impact", false, playerEffectPlacement);

  const breakResult = applySkillBreakDamage(state.target, skill, clamp);
  if (breakResult.triggered) {
    addHyperCharge(10);
    addLog(bossBreakMessage());
    showCombatText("break", "BREAK!", "enemy", "explosion");
  }
}

function activateHyper() {
  const result = activatePlayerHyperMode(state, hyperDurationSeconds(derivedPlayer()), HYP_MAX);
  if (!result.activated) return;
  addLog(result.message);
  saveState();
  render();
}

function showCombatText(type, value, target, effectType = "impact", critical = false, placement = null) {
  state.effects = queueCombatTextEffect(state.effects, state.settings.combatFeedback, state, {
    type,
    target,
    effectType,
    value,
    critical,
    placement,
  });
}

function resetHitCombo(reason = "manual") {
  if (!resetHitComboState(state)) return;
  renderHitCounter(state);
}

function defeatMonster(monster) {
  const defeatedTargetPreview = createDefeatedTargetPreview({
    monster,
    stats: monsterStats(monster),
    targetState: state.target,
  });
  const player = derivedPlayer();
  const shouldContinue = shouldContinueAutoHunt(state, monster);
  for (const message of applyMonsterDefeatRewards(state, monster, {
    player,
    region: getRegion(),
    getItemName: (itemId) => getItem(itemId)?.name || itemId,
    getItem,
    equipmentState: state.equipment,
    developerOptions: state.settings.developer,
  })) {
    addLog(message);
  }

  levelUpIfNeeded();
  stopCombat("combat_end");
  triggerBattleSpriteMotion(combatRuntime, "enemy", BATTLE_SPRITE_MOTION_IDS.downPlaceholder);
  combatRuntime.lastDefeatedTarget = defeatedTargetPreview;
  saveState();

  if (shouldContinue) {
    scheduleAutoRestart(AUTO_RESTART_DELAY_MS);
  }
}

function levelUpIfNeeded() {
  const messages = applyPendingLevelProgression({
    player: state.player,
    regions,
    expToNext,
    getResourceCaps: () => {
      const player = derivedPlayer();
      return { maxHp: player.maxHp, maxMp: player.maxMp };
    },
  });
  for (const message of messages) addLog(message);
}

function addItem(itemId) {
  state.inventory = addInventoryItem(state.inventory, itemId);
}

function equipItem(itemId) {
  const item = getItem(itemId);
  if (!item) return;

  const result = equipInventoryItem({
    equipmentState: state.equipment,
    inventory: state.inventory,
    itemId,
    item,
    slot: resolveEquipmentSlot(item, state.equipment),
  });
  if (!result.equipped) return;
  state.inventory = result.inventory;
  ensureHp();
  addLog(result.message);
  saveState();
  render();
}

function equipRecommended() {
  const result = equipRecommendedItems({
    equipmentState: state.equipment,
    inventory: state.inventory,
    getItem,
  });
  state.inventory = result.inventory;
  if (result.changed) ensureHp();
  addLog(result.message);
  saveState();
  render();
}

function unequipSlot(slot) {
  const result = unequipEquipmentSlot({
    equipmentState: state.equipment,
    inventory: state.inventory,
    slot,
    getItemName: (itemId) => getItem(itemId)?.name || itemId,
  });
  if (!result.unequipped) return;
  state.inventory = result.inventory;
  addLog(result.message);
  saveState();
  render();
}

function buyShopEntry(entryId) {
  const entry = shopCatalog.find((candidate) => candidate.id === entryId);
  const item = entry ? getItem(entry.itemId) : null;
  const result = buyShopItem({ state, entry, item });
  addLog(result.message);
  if (result.ok) ensureHp();
  saveState();
  render();
}

function sellShopEntry(itemId) {
  const item = getItem(itemId);
  const result = sellInventoryItem({ state, itemId, item });
  addLog(result.message);
  if (result.ok) ensureHp();
  saveState();
  render();
}

function updateDeveloperOption(key, value) {
  state.settings.developer = normalizeDeveloperOptions({
    ...state.settings.developer,
    [key]: normalizeDeveloperOptionValue(key, value),
  });
  addLog(tf("developerLog.optionChanged", { label: developerOptionLabel(key) }));
  saveState();
  render();
}

function runDeveloperAction(action) {
  if (action === "skip-region") {
    skipCurrentRegionForDevelopment();
  }
}

function skipCurrentRegionForDevelopment() {
  const currentRegion = getRegion();
  if (!currentRegion) return;
  clearAutoRestart();
  leaveRestMode(state);
  stopCombat("developer_skip_region");
  if (!state.completedRegions.includes(currentRegion.id)) {
    state.completedRegions.push(currentRegion.id);
  }

  const currentIndex = regions.findIndex((region) => region.id === currentRegion.id);
  const nextRegion = regions[currentIndex + 1] || null;
  if (nextRegion) {
    state.regionId = nextRegion.id;
    uiState.selectedRegionId = nextRegion.id;
    state.target = null;
    addLog(tf("developerLog.regionSkippedToNext", {
      currentRegion: currentRegion.name,
      nextRegion: nextRegion.name,
    }));
  } else {
    addLog(tf("developerLog.regionSkippedNoNext", { currentRegion: currentRegion.name }));
  }

  restorePlayerResources(state.player, derivedPlayer());
  saveUiState();
  saveState();
  render();
}

function allocateStat(stat) {
  if (!allocatePlayerStat(state.player, stat)) return;
  ensureHp();
  saveState();
  render();
}

function allocateStatBatch(stat) {
  let changed = false;
  for (let index = 0; index < 10; index += 1) {
    changed = allocatePlayerStat(state.player, stat) || changed;
  }
  if (!changed) return;
  ensureHp();
  saveState();
  render();
}

function allocateRecommendedStatBatch() {
  const result = allocateRecommendedStats(state.player, primaryStats);
  if (!result.changed) return;
  const details = Object.entries(result.allocated)
    .map(([stat, value]) => `${displayName(stat)} +${value}`)
    .join(", ");
  addLog(tf("statLog.recommendedAllocated", { details }));
  ensureHp();
  saveState();
  render();
}

function deallocateStat(stat) {
  const result = deallocatePlayerStat(state.player, stat, 1);
  if (!result.changed) return;
  ensureHp();
  saveState();
  render();
}

function deallocateStatBatch(stat) {
  const result = deallocatePlayerStat(state.player, stat, BULK_STAT_DEALLOCATE_AMOUNT);
  if (!result.changed) return;
  ensureHp();
  saveState();
  render();
}

function resetFreeStats() {
  const result = resetAllocatedStats(state.player, primaryStats);
  if (!result.changed) return;
  addLog(tf("statLog.freeStatsReset", { points: result.total }));
  ensureHp();
  saveState();
  render();
}

function confirmFreeStats() {
  const result = confirmAllocatedStats(state.player, primaryStats);
  if (!result.changed) return;
  addLog(tf("statLog.freeStatsConfirmed", { points: result.total }));
  saveState();
  render();
}

function selectRegion(regionId) {
  const targetRegion = getRegion(regionId);
  const moveBlock = regionMoveBlock(targetRegion);
  if (moveBlock) {
    addLog(moveBlock);
    saveState();
    render();
    return;
  }

  const result = applyRegionSelection(state, uiState, targetRegion);
  if (!result.changed) {
    if (result.message) {
      addLog(result.message);
      saveState();
      render();
    }
    return;
  }
  saveUiState();
  clearAutoRestart();
  leaveRestMode(state);
  stopCombat("region_change");
  addLog(result.message);
  for (const message of claimRegionCoreEventGuide(state, targetRegion)) {
    addLog(message);
  }
  if (beginCompletedGateReplay(targetRegion)) {
    addLog(tf("gameLog.completedGateReplay", { regionName: targetRegion.name }));
  }
  saveState();
  render();
}

function previewRegion(regionId) {
  if (!previewRegionState(regions, uiState, regionId)) return;
  saveUiState();
  renderRegionList();
}

function handleObjectiveAction(action) {
  return handleObjectiveActionNavigation(action, {
    regions,
    uiState,
    previewRegionState,
    saveUiState,
    renderRegionList,
  });
}

function selectStance(stance) {
  const result = applyStanceSelection(state, stance, stanceName(stance));
  if (!result.changed) return;
  addLog(result.message);
  saveState();
  render();
}

function toggleRest() {
  clearAutoRestart();
  if (state.resting && !state.inCombat) {
    leaveRestMode(state);
    addLog(t("gameLog.restFinished"));
  } else {
    stopCombat("rest_start");
    enterRestMode(state);
    addLog(t("gameLog.restStarted"));
  }
  recoveryLastFrameAt = Date.now();
  saveState();
  render();
}

function createCharacter(form) {
  const formData = new FormData(form);
  const profile = createCharacterProfile(formData, DEFAULT_PLAYER_PROFILE);
  const shouldEnterMainView = Boolean(pendingNewSlotCreation) || state.playerProfile?.created === false;
  applyInitialCreationStats(state, formData, primaryStats);
  state.regionId = regions[0]?.id || state.regionId;
  state.target = null;
  state.inCombat = false;
  state.resting = false;
  state.autoHunt = false;
  state.offlineAutoHuntEligible = false;
  state.offlineAutoHuntEngagedAt = 0;
  state.lastSeenAt = Date.now();
  state.stance = "power";
  state.hitCount = 0;
  state.hyp = 0;
  state.hyperActiveTicks = 0;
  state.effects = [];
  state.tutorialFlags = createTutorialFlags();
  resetSkillLoadoutsForNewCharacter(profile);
  combatRuntime = resetCombatRuntime();
  addLog(applyCharacterProfile(state, profile));
  addLog(t("gameLog.characterCreated"));
  for (const message of characterIntroLogMessages(profile, {
    regionName: getRegion()?.name || "",
    stats: state.player.stats,
  })) {
    addLog(message);
  }
  ensureHp();
  pendingNewSlotCreation = null;
  setCreationCancelMode(false);
  saveState();
  syncActiveSaveSlot({ force: true });
  render();
  if (shouldEnterMainView) {
    activateView("combat");
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }
}

function createCharacterFromUrlParams() {
  return false;
}

function exportSaveFile() {
  const result = exportSavePayloadSnapshot(state, uiState);
  addLog(result.message);
  setSaveStatus(result.message);
  saveState();
  renderLog(state.log, state.settings.combatView);
}

function importSaveText(text) {
  const result = importSavePayloadText(text, initialState);
  if (!result.ok) {
    addLog(result.message);
    setSaveStatus(result.message);
    renderLog(state.log, state.settings.combatView);
    return;
  }

  cleanupRuntimeTimers();
  state = result.state;
  applyImportedUiState(uiState, result.uiState);
  setActiveSaveSlot(activeSaveSlotId || DEFAULT_SAVE_SLOT_ID);
  combatRuntime = resetCombatRuntime();
  ensureHp();
  addLog(result.message);
  finalizeSaveSessionTransition({
    message: result.message,
    persist: () => {
      saveState();
      saveUiState();
    },
    setupPanels: () => setupCollapsiblePanels(uiState, saveUiState),
    render,
    startObjectiveTicker,
    startRecoveryLoop,
    setSaveStatus,
    resumeSavedCombatLoop,
  });
}

function saveSlot(slotId) {
  if (!saveCurrentToSlot(slotId, state, uiState, { regionName: getRegion()?.name || "" })) {
    setSaveStatus(t("saveSlots.messages.missingSlot"));
    return;
  }
  setActiveSaveSlot(slotId);
  const message = tf("saveSlots.messages.saved", { slotLabel: saveSlotLabel(slotId) });
  addLog(message);
  saveState();
  setSaveStatus(message);
  render();
}

function loadSlot(slotId) {
  const loaded = loadSaveSlot(slotId, initialState);
  if (!loaded) {
    setSaveStatus(tf("saveSlots.messages.noRecord", { slotLabel: saveSlotLabel(slotId) }));
    return;
  }

  cleanupRuntimeTimers();
  state = loaded.state;
  applyImportedUiState(uiState, loaded.uiState);
  setActiveSaveSlot(slotId);
  combatRuntime = resetCombatRuntime();
  ensureHp();
  const message = tf("saveSlots.messages.loaded", { slotLabel: saveSlotLabel(slotId) });
  addLog(message);
  finalizeSaveSessionTransition({
    message,
    persist: () => {
      saveState();
      saveUiState();
    },
    setupPanels: () => setupCollapsiblePanels(uiState, saveUiState),
    render,
    startObjectiveTicker,
    startRecoveryLoop,
    setSaveStatus,
    resumeSavedCombatLoop,
  });
}

function clearSlot(slotId) {
  const clearingActiveSlot = activeSaveSlotId === slotId;
  if (!clearSaveSlot(slotId)) {
    setSaveStatus(tf("saveSlots.messages.empty", { slotLabel: saveSlotLabel(slotId) }));
    return;
  }
  if (clearingActiveSlot) {
    setActiveSaveSlot("");
  }
  if (pendingNewSlotCreation) {
    pendingNewSlotCreation = null;
    setCreationCancelMode(false);
  }
  const message = tf("saveSlots.messages.cleared", { slotLabel: saveSlotLabel(slotId) });
  setSaveStatus(message);
  render();
}

function startNewSlot(slotId) {
  if (loadSaveSlot(slotId, initialState)) {
    setSaveStatus(tf("saveSlots.messages.alreadyExists", { slotLabel: saveSlotLabel(slotId) }));
    render();
    return;
  }
  if (state.playerProfile?.created && activeSaveSlotId) {
    saveCurrentToSlot(activeSaveSlotId, state, uiState, { regionName: getRegion()?.name || "" });
  }
  pendingNewSlotCreation = createPendingSlotCreationSnapshot({
    state,
    uiState,
    activeSaveSlotId,
    viewId: activeViewId(),
  });
  clearSaveSlot(slotId);
  resetCurrentGameToSlot(slotId, tf("saveSlots.messages.startNew", { slotLabel: saveSlotLabel(slotId) }), {
    allowCancelCreation: true,
  });
}

function resetCurrentGameToSlot(slotId = DEFAULT_SAVE_SLOT_ID, statusMessage = "", options = {}) {
  combatTimer = clearIntervalTimer(combatTimer);
  objectiveTickerTimer = clearIntervalTimer(objectiveTickerTimer);
  recoveryTimer = clearIntervalTimer(recoveryTimer);
  clearAutoRestart();

  state = initialState();
  uiState = normalizeUiState(null);
  setActiveSaveSlot(slotId);
  combatRuntime = resetCombatRuntime();
  ensureHp();

  const message = statusMessage || tf("saveSlots.messages.initialized", { slotLabel: saveSlotLabel(slotId) });
  addLog(message);
  setCreationCancelMode(Boolean(options.allowCancelCreation));
  finalizeSaveSessionTransition({
    message,
    persist: () => {
      saveStoredState(state);
      saveStoredUiState(uiState);
    },
    setupPanels: () => setupCollapsiblePanels(uiState, saveUiState),
    render,
    afterRender: () => resetCharacterCreationWizard(Boolean(options.allowCancelCreation)),
    startObjectiveTicker,
    startRecoveryLoop,
    setSaveStatus,
  });
}

function cancelCharacterCreation() {
  if (!pendingNewSlotCreation) return;

  combatTimer = clearIntervalTimer(combatTimer);
  objectiveTickerTimer = clearIntervalTimer(objectiveTickerTimer);
  recoveryTimer = clearIntervalTimer(recoveryTimer);
  clearAutoRestart();

  const previous = restorePendingSlotCreationSnapshot(pendingNewSlotCreation);
  pendingNewSlotCreation = null;
  state = previous.state;
  uiState = previous.uiState;
  setActiveSaveSlot(previous.activeSaveSlotId || "");
  setCreationCancelMode(false);
  combatRuntime = resetCombatRuntime();
  ensureHp();

  const message = t("saveSlots.messages.cancelled");
  finalizeSaveSessionTransition({
    message,
    persist: () => {
      saveStoredState(state);
      saveStoredUiState(uiState);
    },
    setupPanels: () => setupCollapsiblePanels(uiState, saveUiState),
    render,
    afterRender: () => activateView(previous.viewId || "settings"),
    startObjectiveTicker,
    startRecoveryLoop,
    setSaveStatus,
    resumeSavedCombatLoop,
  });
}

function updateProfileSettings(payload) {
  const message = updatePlayerProfileSettings(state, payload);
  addLog(message);
  saveState();
  setSaveStatus(message);
  render();
}

function updateAudioVolume(key, value) {
  if (!["bgmVolume", "sfxVolume"].includes(key)) return;
  const safeValue = clamp(Math.round(Number(value) || 0), 0, 100);
  state.settings.audio = { ...(state.settings.audio || {}), [key]: safeValue };
  saveState();
}

function setActiveSaveSlot(slotId) {
  activeSaveSlotId = slotId || "";
  nextActiveSlotSyncAt = 0;
  saveActiveSaveSlotId(activeSaveSlotId);
}

function claimOfflineReward() {
  const now = Date.now();
  const region = getRegion();
  const monster = getMonster(region?.monsterId);
  const result = claimOfflineAutoHuntReward({
    state,
    region,
    monster,
    player: derivedPlayer(),
    developerOptions: state.settings.developer,
    getItemName: (itemId) => getItem(itemId)?.name || itemId,
    now,
  });
  if (!result) return;

  for (const message of result.messages || [result.message]) {
    if (message) addLog(message);
  }
  levelUpIfNeeded();
  saveState();
}

function render(options = {}) {
  nextSlowRenderAt = renderAppFrame(appRenderContext(options));
}

function startObjectiveTicker() {
  objectiveTickerTimer = restartIntervalTimer(objectiveTickerTimer, () => {
    if (uiState.objectiveRotationMode === "manual") return;
    render({ objectiveFrame: true });
  }, OBJECTIVE_TICKER_INTERVAL_MS);
}

function startRecoveryLoop() {
  recoveryLastFrameAt = Date.now();
  recoveryTimer = restartIntervalTimer(recoveryTimer, passiveRecoveryTick, IDLE_RECOVERY_FRAME_MS);
}

function passiveRecoveryTick() {
  if (state.inCombat) {
    recoveryLastFrameAt = Date.now();
    return;
  }

  const now = Date.now();
  const elapsedSeconds = passiveRecoveryElapsedSeconds(recoveryLastFrameAt, now);
  recoveryLastFrameAt = now;
  const result = applyPassiveRecovery(state.player, derivedPlayer(), elapsedSeconds, { resting: state.resting });
  if (!result.changed) return;

  if (result.displayChanged || state.resting) {
    saveState();
    render({ combatFrame: true });
  }
}

function renderRegionList() {
  renderAppRegionList(appRenderContext());
}

function appRenderContext(options = {}) {
  return {
    options,
    state,
    uiState,
    saveSlotEntries: readSaveSlotEntries(),
    activeSaveSlotId,
    combatRuntime,
    assetRegistry,
    regions,
    shopCatalog,
    shopCategories,
    slots,
    primaryStats,
    slowRenderIntervalMs: SLOW_RENDER_INTERVAL_MS,
    nextSlowRenderAt,
    hypMax: HYP_MAX,
    expToNext,
    ensureResources: ensureHp,
    derivePlayer: derivedPlayer,
    getRegion,
    getMonster,
    getMonsterStats: monsterStats,
    getItem,
    getGateMap,
    ensureGateProgress,
    getRegionMoveBlock: regionMoveBlock,
    displayName,
    optionText,
    getCombatActionRenderContext: combatActionRenderContext,
    resolveRegionCardImagePath,
    resolveRegionNodeMapImagePath: assetRegistryApi.resolveRegionNodeMapImagePath,
    resolveRegionBattleBackgroundPath: assetRegistryApi.resolveRegionBattleBackgroundPath,
    resolvePlayerCombatSpritePath: assetRegistryApi.resolvePlayerCombatSpritePath,
    resolveMonsterCombatSpritePath: assetRegistryApi.resolveMonsterCombatSpritePath,
    resolveItemIconPath: assetRegistryApi.resolveItemIconPath,
    onToggleObjective: toggleObjectiveAlert,
    onToggleObjectiveRotationMode: toggleObjectiveRotationMode,
    onStepObjective: stepObjective,
    onObjectiveAction: handleObjectiveAction,
  };
}

function combatActionRenderContext() {
  return {
    state,
    combatRuntime,
    helpText: HELP_TEXT,
    hideHint: combatInfoHint(),
    combatActionList,
    getCombatAction,
    skillLoadouts: () => state.skillLoadouts,
    activeSkillLoadoutId: () => state.activeSkillLoadoutId,
    skillAvailability,
    actionTriggerText,
  };
}

function ensureGateProgress(map) {
  return ensureGateProgressState(state.gateProgress, map);
}

function regionMoveBlock(targetRegion) {
  if (!targetRegion) return t("regionMove.notFound");
  if (state.inCombat) return t("regionMove.blockedInCombat");
  const currentRegion = getRegion();
  if (!currentRegion || currentRegion.id === targetRegion.id) return "";
  const map = getGateMap(currentRegion.nodeMapId);
  if (!map) return "";
  const progress = ensureGateProgress(map);
  if (isGateProgressComplete(progress, map)) return "";
  return tf("regionMove.gateIncomplete", { regionName: currentRegion.name });
}

function beginCompletedGateReplay(region) {
  const map = getGateMap(region?.nodeMapId);
  if (!map) return false;
  const progress = ensureGateProgress(map);
  return beginGateReplay(progress, map);
}

function moveGateNode(nodeId) {
  const map = getGateMap(getRegion().nodeMapId);
  if (!map) return;
  const progress = ensureGateProgress(map);
  const next = moveGateProgress(progress, map, nodeId);
  if (!next) return;
  resolveGateNode(next);
  saveState();
  render();
}

function resolveGateNode(node) {
  const outcome = resolveGateNodeOutcome(node);
  const resolution = createGateNodeResolution(outcome, {
    nodeLabel: nodeName(node),
    getItemName: (itemId) => getItem(itemId)?.name || itemId,
  });

  if (resolution.type === "combat") {
    if (resolution.monsterId) startCombat(resolution.monsterId);
    return;
  }
  if (resolution.type === "treasure") {
    if (resolution.itemId) {
      addItem(resolution.itemId);
      addLog(resolution.message);
    }
    return;
  }
  if (resolution.type === "rest") {
    restorePlayerResources(state.player, derivedPlayer());
    addLog(resolution.message);
    return;
  }
  if (resolution.type === "merchant" || resolution.type === "scene") {
    addLog(resolution.message);
    return;
  }
  addLog(resolution.message);
}

function bindEvents() {
  bindAppEvents({
    onCreateCharacter: createCharacter,
    onToggleCombat: toggleCombat,
    onToggleAutoHunt: () => {
      const result = toggleAutoHuntState(state);
      if (!result.enabled) clearAutoRestart();
      addLog(result.message);
      saveState();
      render();
    },
    onRest: toggleRest,
    onViewChange: ({ previousView, nextView }) => {
      if (previousView === "combat" || nextView === "combat") clearCombatVisualFeedback();
    },
    onStartBoss: () => {
      const bossId = getRegion().bossId;
      if (bossId) startCombat(bossId);
    },
    onClearLog: () => {
      state.log = [];
      renderLog(state.log, state.settings.combatView);
    },
    onEquip: equipItem,
    onEquipRecommended: equipRecommended,
    onUnequip: unequipSlot,
    onSelectRegion: selectRegion,
    onPreviewRegion: previewRegion,
    onAllocateStat: allocateStat,
    onAllocateStatBatch: allocateStatBatch,
    onAllocateRecommendedStats: allocateRecommendedStatBatch,
    onDeallocateStat: deallocateStat,
    onDeallocateStatBatch: deallocateStatBatch,
    onResetFreeStats: resetFreeStats,
    onConfirmFreeStats: confirmFreeStats,
    onSelectStance: selectStance,
    onSelectSkillLoadout: selectSkillLoadout,
    onMoveGateNode: moveGateNode,
    onActivateHyper: activateHyper,
    onCombatFeedbackChange: (feedbackId, checked) => {
      state.settings.combatFeedback[feedbackId] = checked;
      saveState();
      render();
    },
    onCombatViewChange: (viewId, checked) => {
      state.settings.combatView[viewId] = checked;
      saveState();
      render();
    },
    onBuyShopItem: buyShopEntry,
    onSellShopItem: sellShopEntry,
    onDeveloperOptionChange: updateDeveloperOption,
    onDeveloperAction: runDeveloperAction,
    onShowCombatInfoFromElement: showCombatInfoFromElement,
    onHideCombatInfo: hideCombatInfo,
    isTouchDoubleTapMode,
    isInfoTooltipEnabled,
    onExportSave: exportSaveFile,
    onImportSaveText: importSaveText,
    onCancelCharacterCreation: cancelCharacterCreation,
    onSaveSlot: saveSlot,
    onLoadSlot: loadSlot,
    onClearSlot: clearSlot,
    onNewSlot: startNewSlot,
    onUpdateProfileSettings: updateProfileSettings,
    onProfileImageError: setSaveStatus,
    onAudioVolumeChange: updateAudioVolume,
  });
}

function cleanupRuntimeTimers() {
  saveState();
  combatTimer = clearIntervalTimer(combatTimer);
  objectiveTickerTimer = clearIntervalTimer(objectiveTickerTimer);
  recoveryTimer = clearIntervalTimer(recoveryTimer);
  clearAutoRestart();
}

function resumeSavedCombatLoop() {
  if (!state.inCombat) return;
  if (!state.target?.monsterId || !getMonster(state.target.monsterId)) {
    state.inCombat = false;
    state.target = null;
    return;
  }
  startLoop();
}

applyDomLocalization(document);
createCharacterFromUrlParams();
saveActiveSaveSlotId(activeSaveSlotId);
ensureHp();
claimOfflineReward();
syncActiveSaveSlot({ force: true });
setupCollapsiblePanels(uiState, saveUiState);
bindEvents();
render();
startObjectiveTicker();
startRecoveryLoop();
loadAssetRegistry().then((registry) => {
  assetRegistry = registry;
  render();
});
resumeSavedCombatLoop();
registerServiceWorker();
window.addEventListener("pagehide", cleanupRuntimeTimers);
window.addEventListener("beforeunload", cleanupRuntimeTimers);
