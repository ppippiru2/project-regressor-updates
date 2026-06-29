import {
  ACTION_TRIGGER_TEXT,
  BASIC_ATTACK_ACTION,
  COMBAT_INFO_HIDE_HINT,
  HELP_TEXT,
} from "./config/helpText.js?v=560";
import { bindAppEvents } from "./app/appEvents.js?v=560";
import { renderAppFrame, renderAppRegionList } from "./app/appRenderer.js?v=560";
import { handleObjectiveActionNavigation } from "./app/objectiveActionNavigation.js?v=560";
import {
  ACTIVE_SLOT_SYNC_INTERVAL_MS,
  MAX_LOG_LINES,
  OBJECTIVE_TICKER_INTERVAL_MS,
  SLOW_RENDER_INTERVAL_MS,
} from "./app/appRuntimeConfig.js?v=560";
import { finalizeSaveSessionTransition } from "./app/saveSessionFlow.js?v=560";
import { registerServiceWorker } from "./app/serviceWorkerRegistration.js";
import * as assetRegistryApi from "./assets/assetRegistry.js?v=560";
import { applyDomLocalization } from "./localization/domText.js?v=560";
import { t, tf } from "./localization/index.js?v=560";
import { clearCombatEffectLayers } from "./combat/combatEffects.js?v=560";
import { BULK_STAT_DEALLOCATE_AMOUNT } from "./balance/playerGrowthBalance.js?v=560";
import { CONTENT_PROFILE, applyContentProfileToDocument, exposeContentProfile } from "./content/contentProfile.js?v=560";
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
  createPlayerCombatAction,
  skillAvailability as getCombatSkillAvailability,
  stanceName,
} from "./combat/combatActions.js?v=560";
import {
  attackEffectType,
  buildCombatActionList,
  combatActionTriggerText,
  equippedWeapon,
  findCombatAction,
} from "./combat/combatActionDisplay.js";
import { queueCombatTextEffect } from "./combat/combatFeedbackState.js?v=560";
import { resolveEnemyAttack, resolvePlayerAttack } from "./combat/combatDamage.js";
import { createDefeatedTargetPreview } from "./combat/combatDefeatPreview.js?v=560";
import {
  applyBuffAction,
  applyHealAction,
  applyResolvedEnemyAttack,
  applyResolvedPlayerAttack,
} from "./combat/combatActionResults.js?v=560";
import {
  activateTargetWeakness,
  advanceHitCombo,
  applyWeaknessSkillDamageBonus,
  applySkillBreakDamage,
  playerHyperChargeFromSuccessfulHit,
  resetHitComboState,
} from "./combat/combatHitResults.js?v=560";
import {
  AUTO_RESTART_DELAY_MS,
  COMBAT_FRAME_MS,
  HIT_RESET_MS,
  HYP_MAX,
  createCombatRuntime,
  resetCombatRuntime,
} from "./combat/combatState.js?v=560";
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
  advanceActionCooldowns,
  advanceCombatFrameRuntime,
  consumeReadyEnemyAction,
  consumeReadyPlayerAction,
  shouldAdvanceAutoCombatActions,
} from "./combat/combatTick.js?v=560";
import { clearIntervalTimer, clearTimeoutTimer, restartIntervalTimer, restartTimeoutTimer } from "./combat/combatTimers.js?v=560";
import {
  applyIncomingDamageTestOption,
  applyOutgoingDamageTestOption,
} from "./combat/combatTestOptions.js?v=560";
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
} from "./data.js?v=560";
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
} from "./state/save.js?v=560";
import {
  developerOptionLabel,
  normalizeDeveloperOptionValue,
  normalizeDeveloperOptions,
} from "./state/developerOptions.js?v=560";
import { createInitialState } from "./state/initialState.js?v=560";
import { applyImportedUiState, exportSavePayloadSnapshot, importSavePayloadText } from "./state/saveLoadActions.js?v=560";
import { playerStats } from "./state/progression.js?v=560";
import { starterTraitStatBonuses } from "./state/starterTraitEffects.js?v=560";
import { addInventoryItem } from "./state/inventory.js";
import { equipInventoryItem, resolveEquipmentSlot, unequipEquipmentSlot } from "./state/equipmentActions.js?v=560";
import { equipRecommendedItems } from "./state/recommendedEquipment.js?v=560";
import {
  beginGateReplay,
  ensureGateProgress as ensureGateProgressState,
  isGateProgressComplete,
  moveGateProgress,
} from "./state/regionProgress.js?v=560";
import {
  applyCharacterProfile,
  applyInitialCreationStats,
  characterIntroLogMessages,
  createCharacterProfile,
  updatePlayerProfileSettings,
} from "./state/profileActions.js?v=560";
import {
  DEFAULT_SAVE_SLOT_ID,
  clearSaveSlot,
  loadActiveSaveSlotId,
  loadSaveSlot,
  readSaveSlotEntries,
  saveActiveSaveSlotId,
  saveCurrentToSlot,
  saveSlotLabel,
} from "./state/saveSlots.js?v=560";
import {
  createPendingSlotCreationSnapshot,
  restorePendingSlotCreationSnapshot,
} from "./state/saveSlotSession.js?v=560";

import { createGateNodeResolution, resolveGateNodeOutcome } from "./state/gateNodeActions.js?v=560";
import {
  shouldContinueAutoHunt,
  shouldRestartAutoHunt,
  startCombatSession,
  stopCombatSession,
  toggleAutoHuntState,
} from "./state/combatSession.js?v=560";
import {
  IDLE_RECOVERY_FRAME_MS,
  applyPassiveRecovery,
  enterRestMode,
  leaveRestMode,
  passiveRecoveryElapsedSeconds,
} from "./state/passiveRecovery.js?v=560";
import { applyMonsterDefeatRewards } from "./state/combatRewards.js?v=560";
import { applyPendingLevelProgression } from "./state/levelUpActions.js?v=560";
import { applyPlayerDefeatRecovery } from "./state/defeatRecovery.js";
import {
  activateEnemyHyperMode,
  activatePlayerHyperMode,
  endEnemyHyperMode as endEnemyHyperModeAction,
  endPlayerHyperMode as endPlayerHyperModeAction,
} from "./state/hyperActions.js?v=560";
import {
  hideCombatInfoIfAllowed,
  markCombatActionUsed,
  showCombatActionInfo,
  showCombatHelpInfo,
  triggerCombatActionFlash,
} from "./state/combatRuntimeUi.js?v=560";
import {
  BATTLE_SPRITE_MOTION_IDS,
  clearBattleSpriteMotions,
  triggerBattleSpriteMotion,
} from "./ui/battleSpriteMotion.js?v=560";
import {
  monsterAttackEffectPlacement,
  monsterAttackEffectType,
  resolveMonsterBattleSpritePreset,
} from "./config/monsterBattleSpritePresets.js?v=560";
import { resolveMonsterRuntimeAction } from "./config/monsterRuntimeIntegrationPresets.js?v=560";
import { resolvePlayerAttackEffectPlacement } from "./config/playerBattleSprites.js?v=560";
import { displayNameFor, equippedItemList, findById, itemOptionText } from "./state/dataLookup.js";
import { addLogEntry } from "./state/log.js";
import { buyShopItem, sellInventoryItem } from "./state/shop.js?v=560";
import { applyStanceSelection } from "./state/stance.js?v=560";
import {
  allocatePlayerStat,
  allocateRecommendedStats,
  confirmAllocatedStats,
  deallocatePlayerStat,
  resetAllocatedStats,
} from "./state/statAllocation.js?v=560";
import { applyRegionSelection, previewRegionState } from "./state/regionSelection.js?v=560";
import {
  advanceRegionMonsterEncounter,
  regionMonsterEncounterSeed,
  resolveRegionMonster,
} from "./state/regionMonsterPool.js?v=560";
import {
  stepObjectiveRotationState,
  toggleObjectiveAlertState,
  toggleObjectiveRotationModeState,
} from "./state/objectiveUiState.js?v=560";
import {
  normalizeHyperRuntime,
  normalizePlayerResources,
  normalizeTargetResources,
  restorePlayerResources,
  shouldResetHitCombo,
} from "./state/playerResources.js?v=560";
import {
  hasSkillLoadout,
  resolveActiveLoadoutActions,
  resolveActiveLoadoutSkills,
  resolveActiveSkillLoadout,
} from "./state/skillLoadout.js?v=560";
import {
  claimFirstCombatGuide,
  claimRegionCoreEventGuide,
  createTutorialFlags,
} from "./state/tutorialGuidance.js?v=560";
import { claimOfflineAutoHuntReward, stampLastSeen } from "./state/offlineReward.js?v=560";
import { nodeName } from "./ui/renderRegion.js?v=560";
import { renderLog } from "./ui/renderCommon.js?v=560";
import { renderCombatSkillInfo } from "./ui/renderCombatActions.js?v=560";
import { renderHitCounter } from "./ui/renderCombatPulse.js?v=560";
import { setupCollapsiblePanels } from "./ui/panels.js?v=560";
import { setSaveStatus } from "./ui/saveSlotStatus.js?v=560";
import {
  activeViewId,
  activateView,
  resetCharacterCreationWizard,
  setCreationCancelMode,
} from "./ui/viewNavigation.js?v=560";

const $ = (selector) => document.querySelector(selector);
const { loadAssetRegistry, resolveRegionCardImagePath } = assetRegistryApi;
const BATTLE_LOOP_TIMING_MS = Object.freeze({
  playerImpact: 260,
  playerMotion: 520,
  enemyHitReaction: 300,
  enemyCounterDelay: 400,
  enemyImpact: 260,
  enemyMotion: 520,
});

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
let defeatedPreviewTimer = null;
let combatCooldownRenderTimer = null;
let objectiveTickerTimer = null;
let recoveryTimer = null;
let recoveryLastFrameAt = Date.now();
let nextSlowRenderAt = 0;
let nextActiveSlotSyncAt = 0;
let combatRuntime = createCombatRuntime();
let assetRegistry = assetRegistryApi.STATIC_ASSET_REGISTRY;
let pendingNewSlotCreation = null;
let manualBattleLoopSequence = 0;

function getItem(itemId) {
  return findById(items, itemId);
}

function getRegion(regionId = state.regionId) {
  return findById(regions, regionId);
}

function getMonster(monsterId) {
  return findById(monsters, monsterId);
}

function resolveRegionEncounter(region = getRegion()) {
  return resolveRegionMonster(region, getMonster, {
    seed: regionMonsterEncounterSeed(state, region?.id),
  });
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
  if (loadout.actionIds.length >= MAX_SKILL_LOADOUT_ACTIONS) {
    loadout.actionIds[MAX_SKILL_LOADOUT_ACTIONS - 1] = starterActionId;
    return;
  }
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

function startCombat(monsterId = "") {
  if (state.inCombat) return;
  clearAutoRestart();
  clearDefeatedPreviewTimer();
  leaveRestMode(state);
  const region = getRegion();
  const explicitMonsterId = typeof monsterId === "string" && monsterId ? monsterId : "";
  const encounter = explicitMonsterId ? null : resolveRegionEncounter(region);
  const monster = explicitMonsterId ? getMonster(explicitMonsterId) : encounter?.monster;
  if (!monster) return;
  const stats = monsterStats(monster);
  if (!startCombatSession(state, monster, stats)) return;
  if (!explicitMonsterId) advanceRegionMonsterEncounter(state, region);
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
  cancelManualBattleLoop();
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

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, Math.max(0, Number(ms) || 0)));
}

function nextManualBattleLoopSequence() {
  manualBattleLoopSequence += 1;
  return manualBattleLoopSequence;
}

function lockBattleInput(phase, sequence) {
  combatRuntime.inputLocked = true;
  combatRuntime.battlePhase = phase;
  combatRuntime.battleLoopSequence = sequence;
  combatRuntime.playerAction = 0;
  combatRuntime.enemyAction = 0;
}

function setBattlePhase(phase) {
  combatRuntime.battlePhase = phase;
}

function isManualBattleLoopCurrent(sequence) {
  return (
    combatRuntime.inputLocked === true &&
    combatRuntime.battleLoopSequence === sequence &&
    state.inCombat &&
    Boolean(state.target)
  );
}

function unlockBattleInput(sequence) {
  if (combatRuntime.battleLoopSequence !== sequence) return;
  combatRuntime.inputLocked = false;
  combatRuntime.battlePhase = "idle";
  combatRuntime.battleLoopSequence = 0;
  combatRuntime.playerAction = 0;
  combatRuntime.enemyAction = 0;
}

function cancelManualBattleLoop() {
  manualBattleLoopSequence += 1;
  if (!combatRuntime) return;
  combatRuntime.inputLocked = false;
  combatRuntime.battlePhase = "idle";
  combatRuntime.battleLoopSequence = 0;
}

function clearAutoRestart() {
  autoRestartTimer = clearTimeoutTimer(autoRestartTimer);
}

function clearDefeatedPreviewTimer() {
  defeatedPreviewTimer = clearTimeoutTimer(defeatedPreviewTimer);
}

function scheduleCombatCooldownRender() {
  combatCooldownRenderTimer = clearTimeoutTimer(combatCooldownRenderTimer);
  const cooldownUntilValues = Object.values(combatRuntime.actionCooldowns || {})
    .map((value) => Number(value || 0))
    .filter((value) => Number.isFinite(value) && value > Date.now());
  if (!cooldownUntilValues.length) return;
  const nextCooldownMs = Math.min(...cooldownUntilValues) - Date.now();
  const delayMs = Math.max(80, Math.min(250, nextCooldownMs + 40));
  combatCooldownRenderTimer = restartTimeoutTimer(combatCooldownRenderTimer, () => {
    advanceActionCooldowns(combatRuntime);
    render({ combatFrame: true });
    scheduleCombatCooldownRender();
  }, delayMs);
}

function scheduleAutoRestart(delayMs, beforeRestart) {
  autoRestartTimer = restartTimeoutTimer(autoRestartTimer, () => {
    if (!shouldRestartAutoHunt(state)) return;
    beforeRestart?.();
    startCombat();
  }, delayMs);
}

function scheduleDefeatedPreviewClear(defeatedTargetPreview) {
  clearDefeatedPreviewTimer();
  const delayMs = Math.max(0, Number(defeatedTargetPreview?.visibleUntil || 0) - Date.now() + 16);
  defeatedPreviewTimer = restartTimeoutTimer(defeatedPreviewTimer, () => {
    if (state.inCombat) return;
    const current = combatRuntime.lastDefeatedTarget;
    if (
      current?.monsterId === defeatedTargetPreview?.monsterId &&
      current?.visibleUntil === defeatedTargetPreview?.visibleUntil
    ) {
      combatRuntime.lastDefeatedTarget = null;
    }
    render({ combatFrame: true });
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

  const shouldRunAutoActions = shouldAdvanceAutoCombatActions(state, combatRuntime);
  if (shouldRunAutoActions && consumeReadyPlayerAction(combatRuntime)) {
    performPlayerAction(player, monster, enemy);
  }

  if (state.inCombat && state.target && shouldRunAutoActions && consumeReadyEnemyAction(combatRuntime)) {
    performEnemyAction(monster, enemy, player);
  }

  render();
}

function resetActionGauges({ preserveActionMarker = false } = {}) {
  const lastActionId = combatRuntime.lastActionId;
  const actionFlashUntil = combatRuntime.actionFlashUntil;
  const actionCooldowns = { ...(combatRuntime.actionCooldowns || {}) };
  combatRuntime = resetCombatRuntime();
  combatRuntime.actionCooldowns = actionCooldowns;
  if (preserveActionMarker && actionFlashUntil > Date.now()) {
    combatRuntime.lastActionId = lastActionId;
    combatRuntime.actionFlashUntil = actionFlashUntil;
  }
}

function clearCombatVisualFeedback() {
  cancelManualBattleLoop();
  clearDefeatedPreviewTimer();
  state.effects = [];
  combatRuntime.flashUntil = 0;
  combatRuntime.actionFlashUntil = 0;
  combatRuntime.hyperEndFlashUntil = 0;
  combatRuntime.enemyHyperEndFlashUntil = 0;
  combatRuntime.lastDefeatedTarget = null;
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
  combatRuntime.turnCount = (Number(combatRuntime.turnCount) || 0) + 1;
  markPlayerActionUsed(action.skill);
  triggerActionFlash();
  triggerPlayerSpriteAction(action);
  announceAutoWeaknessPriority(action);
  resolveAndApplyPlayerAction(action, player, monster, enemy);
}

function announceAutoWeaknessPriority(action) {
  if (!state.autoHunt || action?.autoPriority?.type !== "weakness" || !action.skill || !state.target) return;
  const priorityKey = `${state.target.monsterId}:${Number(state.target.weaknessUntil || 0)}:${action.skill.id}`;
  if (combatRuntime.lastAutoWeaknessPriorityKey === priorityKey) return;
  combatRuntime.lastAutoWeaknessPriorityKey = priorityKey;
  addLog(tf("combatMessages.autoWeaknessPriority", { skillName: action.skill.name }));
  showCombatText("weakness", t("combat.text.weaknessAutoPriority"), "enemy", "spark");
}

function resolveAndApplyPlayerAction(action, player, monster, enemy) {
  if (action.kind === "buff") {
    const applied = applyPlayerBuffAction(action, player);
    saveState();
    return { kind: "buff", playerTurnCompleted: true, hpCost: applied.hpCost };
  }

  if (action.kind === "heal") {
    applyHealAction(state.player, player, action, clamp);
    addLog(playerHealMessage(action));
    showCombatText("heal", Math.floor(action.amount), "player", action.skill.effectType);
    saveState();
    return { kind: "heal", playerTurnCompleted: true };
  }

  const resolvedAction = applyOutgoingPlayerBuffs(action);
  const effectType = getAttackEffectType(resolvedAction.skill);
  const result = applyOutgoingDamageTestOption(resolvePlayerAttack(player, enemy, resolvedAction, state.hyperActiveTicks > 0), {
    options: developerSettings(),
    targetHp: state.target?.hp,
  });
  const weaknessBonus = applyWeaknessSkillDamageBonus(result, resolvedAction.skill, state.target);
  const finalResult = weaknessBonus.result;
  combatRuntime.lastDamage = finalResult.damage || 0;
  const applied = applyResolvedPlayerAttack({
    playerState: state.player,
    targetState: state.target,
    action: resolvedAction,
    result: finalResult,
    monster,
  });

  if (applied.missed) {
    consumeOutgoingPlayerBuffTurn(resolvedAction);
    showCombatText("miss", t("combat.text.miss"), "enemy");
    addLog(playerMissMessage(resolvedAction));
    saveState();
    return { kind: "attack", missed: true, monsterDefeated: false };
  }

  addEnemyHyperCharge(applied.enemyHyperCharge, monster);
  registerPlayerHit(finalResult.damage, finalResult.critical, effectType, resolvedAction.skill, {
    monster,
    monsterDefeated: applied.monsterDefeated,
    weaknessApplied: weaknessBonus.applied,
    weaknessStrikeCount: finalResult.weaknessStrikeCount,
  });
  addLog(playerHitMessage(finalResult, resolvedAction, monster));
  if (weaknessBonus.applied) {
    addLog(tf("combatMessages.weaknessHit", {
      skillName: resolvedAction.skill.name,
      count: finalResult.weaknessStrikeCount || 1,
    }));
  }
  consumeOutgoingPlayerBuffTurn(resolvedAction);

  if (applied.monsterDefeated) {
    defeatMonster(monster);
    return { kind: "attack", missed: false, monsterDefeated: true };
  }

  saveState();
  return { kind: "attack", missed: false, monsterDefeated: false };
}

function applyPlayerBuffAction(action, player) {
  combatRuntime.lastDamage = 0;
  const applied = applyBuffAction(state.player, player, action, clamp);
  const buff = createPlayerCombatBuff(action);
  if (buff) upsertPlayerCombatBuff(buff);
  addLog(tf("combatMessages.buffApplied", {
    skillName: action.skill?.name || "",
    effectText: playerBuffEffectText(action.skill),
  }));
  if (applied.hpCost > 0) addLog(tf("combatMessages.selfHpCost", { amount: applied.hpCost }));
  showCombatText("buff", t("combat.text.buff"), "player", action.skill?.effectType || "holy");
  return applied;
}

function createPlayerCombatBuff(action) {
  const source = action?.skill || {};
  const buff = action?.buff || source.buff;
  if (!buff || typeof buff !== "object") return null;
  const remainingTurns = Math.max(1, Math.floor(Number(buff.duration || buff.remainingTurns || 1)));
  return {
    id: buff.id || source.id,
    label: source.name || buff.id || source.id,
    remainingTurns,
    outgoingDamageMultiplier: positiveMultiplier(buff.outgoingDamageMultiplier),
    incomingDamageMultiplier: positiveMultiplier(buff.incomingDamageMultiplier),
    consumeOnHit: Boolean(buff.consumeOnHit),
    sourceActionId: source.id || buff.id,
  };
}

function positiveMultiplier(value) {
  const numeric = Number(value);
  return Number.isFinite(numeric) && numeric > 0 ? numeric : undefined;
}

function upsertPlayerCombatBuff(buff) {
  const buffs = activePlayerBuffs().filter((entry) => entry.id !== buff.id);
  combatRuntime.playerBuffs = [...buffs, buff];
}

function activePlayerBuffs() {
  const buffs = Array.isArray(combatRuntime.playerBuffs) ? combatRuntime.playerBuffs : [];
  combatRuntime.playerBuffs = buffs.filter((buff) => Number(buff?.remainingTurns || 0) > 0);
  return combatRuntime.playerBuffs;
}

function applyOutgoingPlayerBuffs(action) {
  if (action.kind !== "attack") return action;
  const multiplier = activePlayerBuffs().reduce((total, buff) => (
    buff.outgoingDamageMultiplier ? total * buff.outgoingDamageMultiplier : total
  ), 1);
  if (multiplier === 1) return action;
  return {
    ...action,
    multiplier: Number(action.multiplier || 1) * multiplier,
    outgoingBuffMultiplier: multiplier,
  };
}

function consumeOutgoingPlayerBuffTurn(action) {
  if (action.kind !== "attack" || !action.outgoingBuffMultiplier || action.outgoingBuffMultiplier === 1) return;
  for (const buff of activePlayerBuffs()) {
    if (buff.outgoingDamageMultiplier) buff.remainingTurns = Math.max(0, Number(buff.remainingTurns || 0) - 1);
  }
  activePlayerBuffs();
}

function applyIncomingPlayerBuffs(result) {
  if (!result || result.evaded || !Number.isFinite(result.damage) || result.damage <= 0) return result;
  const buffs = activePlayerBuffs();
  const incomingBuffs = buffs.filter((buff) => buff.incomingDamageMultiplier);
  if (!incomingBuffs.length) return result;

  const multiplier = incomingBuffs.reduce((total, buff) => total * buff.incomingDamageMultiplier, 1);
  const adjustedDamage = Math.max(1, Math.floor(result.damage * multiplier));
  const adjustedResult = {
    ...result,
    damage: adjustedDamage,
    incomingBuffMultiplier: multiplier,
  };

  const consumedNames = [];
  for (const buff of incomingBuffs) {
    if (!buff.consumeOnHit) continue;
    consumedNames.push(buff.label);
    buff.remainingTurns = 0;
  }
  activePlayerBuffs();
  addLog(tf("combatMessages.incomingBuffAdjusted", {
    buffName: playerBuffNames(incomingBuffs),
    damage: adjustedDamage,
  }));
  if (consumedNames.length) {
    addLog(tf("combatMessages.buffConsumed", { buffName: consumedNames.join(", ") }));
  }
  return adjustedResult;
}

function playerBuffNames(buffs) {
  return buffs.map((buff) => buff.label).filter(Boolean).join(", ") || t("combatMessages.buffFallbackName");
}

function playerBuffEffectText(skill) {
  if (skill?.id === "preserve") return t("combatMessages.preserveEffect");
  if (skill?.id === "full_power") return t("combatMessages.fullPowerEffect");
  if (skill?.id === "rampage") return t("combatMessages.rampageEffect");
  return t("combatMessages.buffEffect");
}

function performEnemyAction(monster, enemy, player) {
  triggerActionFlash();
  const enemyHyperActive = combatRuntime.enemyHyperActiveTicks > 0;
  const runtimeAction = resolveMonsterRuntimeAction(monster, { enemyHyperActive });
  const monsterSpritePreset = resolveMonsterBattleSpritePreset(monster);
  triggerBattleSpriteMotion(combatRuntime, "enemy", runtimeAction?.motion || BATTLE_SPRITE_MOTION_IDS.basicAttack, {
    sfxId: runtimeAction?.sfxProfile || monsterSpritePreset.sfxProfile,
  });
  resolveAndApplyEnemyAction(monster, enemy, player, runtimeAction, enemyHyperActive);
}

function resolveAndApplyEnemyAction(monster, enemy, player, runtimeAction, enemyHyperActive) {
  let result = applyIncomingDamageTestOption(resolveEnemyAttack(enemy, player, enemyHyperActive), {
    options: developerSettings(),
  });
  result = applyIncomingPlayerBuffs(result);
  combatRuntime.lastDamage = result.damage || 0;
  const applied = applyResolvedEnemyAttack({
    playerState: state.player,
    result,
    monster,
  });

  if (applied.evaded) {
    showCombatText("miss", t("combat.text.miss"), "player");
    addLog(enemyEvadeMessage(monster));
    saveState();
    return { evaded: true, playerDefeated: false };
  }

  addHyperCharge(applied.playerHyperCharge, player);
  addEnemyHyperCharge(applied.enemyHyperCharge, monster);
  triggerBattleSpriteMotion(combatRuntime, "player", BATTLE_SPRITE_MOTION_IDS.hitReaction);
  const enemyEffectContext = { hyperActive: enemyHyperActive };
  const enemyEffectType = runtimeAction?.effectType || monsterAttackEffectType(monster, enemyEffectContext);
  const enemyEffectPlacement = monsterAttackEffectPlacement(monster, {
    ...enemyEffectContext,
    effectType: enemyEffectType,
  });
  showCombatText(
    "damage",
    result.damage,
    "player",
    enemyEffectType,
    result.critical,
    enemyEffectPlacement,
  );
  if (result.critical) showCombatText("critical", t("combat.text.critical"), "player", "impact", false, enemyEffectPlacement);
  addLog(enemyAttackMessage(monster, result, enemyHyperActive, runtimeAction));

  if (applied.playerDefeated) {
    const recovery = applyPlayerDefeatRecovery(state, player, monster);
    stopCombat("player_death");
    combatRuntime.battlePhase = "defeat";
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
  return { evaded: false, playerDefeated: applied.playerDefeated };
}

async function runManualCombatAction(actionId = BASIC_ATTACK_ACTION.id) {
  if (combatRuntime.inputLocked) return;
  const requestedAction = getCombatAction(actionId) || BASIC_ATTACK_ACTION;
  const preCombatAvailability = skillAvailability(requestedAction, derivedPlayer(), false);
  if (!preCombatAvailability.available) {
    selectActionInfo(requestedAction.id);
    return;
  }

  if (!state.inCombat) startCombat();
  if (!state.inCombat || !state.target) return;

  const combatAction = getCombatAction(requestedAction.id) || requestedAction;
  const player = derivedPlayer();
  const availability = skillAvailability(combatAction, player, true);
  if (!availability.available) {
    selectActionInfo(combatAction.id);
    return;
  }

  const sequence = nextManualBattleLoopSequence();
  const action = createPlayerCombatAction(combatAction, player);
  lockBattleInput("player_attack", sequence);
  combatRuntime.turnCount = (Number(combatRuntime.turnCount) || 0) + 1;
  markPlayerActionUsed(action.skill);
  triggerActionFlash();
  triggerPlayerSpriteAction(action);
  render({ combatFrame: true });

  try {
    await delay(BATTLE_LOOP_TIMING_MS.playerImpact);
    if (!isManualBattleLoopCurrent(sequence)) return;

    const monster = getMonster(state.target.monsterId);
    if (!monster) return;
    setBattlePhase(action.kind === "attack" ? "enemy_hit" : "player_ready");
    const playerOutcome = resolveAndApplyPlayerAction(action, derivedPlayer(), monster, monsterStats(monster));
    render({ combatFrame: true });
    if (!isManualBattleLoopCurrent(sequence) || playerOutcome?.monsterDefeated) return;

    await delay(postPlayerImpactDelay(playerOutcome));
    if (!isManualBattleLoopCurrent(sequence)) return;

    await runManualEnemyCounter(sequence);
    if (!isManualBattleLoopCurrent(sequence)) return;

    unlockBattleInput(sequence);
    saveState();
    render({ combatFrame: true });
  } finally {
    if (isManualBattleLoopCurrent(sequence)) {
      unlockBattleInput(sequence);
      saveState();
      render({ combatFrame: true });
    }
  }
}

function postPlayerImpactDelay(playerOutcome) {
  const remainingPlayerMotion = Math.max(0, BATTLE_LOOP_TIMING_MS.playerMotion - BATTLE_LOOP_TIMING_MS.playerImpact);
  const needsHitReactionDelay = playerOutcome?.kind === "attack" && !playerOutcome.missed;
  const reactionDelay = needsHitReactionDelay
    ? Math.max(remainingPlayerMotion, BATTLE_LOOP_TIMING_MS.enemyHitReaction)
    : remainingPlayerMotion;
  return reactionDelay + BATTLE_LOOP_TIMING_MS.enemyCounterDelay;
}

async function runManualEnemyCounter(sequence) {
  if (!isManualBattleLoopCurrent(sequence)) return;
  const monster = getMonster(state.target.monsterId);
  if (!monster) return;

  const enemyHyperActive = combatRuntime.enemyHyperActiveTicks > 0;
  const runtimeAction = resolveMonsterRuntimeAction(monster, { enemyHyperActive });
  const monsterSpritePreset = resolveMonsterBattleSpritePreset(monster);
  setBattlePhase("enemy_attack");
  triggerActionFlash();
  triggerBattleSpriteMotion(combatRuntime, "enemy", runtimeAction?.motion || BATTLE_SPRITE_MOTION_IDS.basicAttack, {
    sfxId: runtimeAction?.sfxProfile || monsterSpritePreset.sfxProfile,
  });
  render({ combatFrame: true });

  await delay(BATTLE_LOOP_TIMING_MS.enemyImpact);
  if (!isManualBattleLoopCurrent(sequence)) return;

  setBattlePhase("player_hit");
  resolveAndApplyEnemyAction(monster, monsterStats(monster), derivedPlayer(), runtimeAction, enemyHyperActive);
  render({ combatFrame: true });

  await delay(Math.max(0, BATTLE_LOOP_TIMING_MS.enemyMotion - BATTLE_LOOP_TIMING_MS.enemyImpact));
}

function choosePlayerAction(player) {
  return chooseCombatPlayerAction(player, state, activeLoadoutSkills(), getSkill, HYP_MAX, combatRuntime.actionCooldowns);
}

function skillAvailability(skill, player = derivedPlayer(), requireCombat = false) {
  return getCombatSkillAvailability(skill, player, state, requireCombat, HYP_MAX, combatRuntime.actionCooldowns);
}

function markPlayerActionUsed(skill) {
  markCombatActionUsed(combatRuntime, skill);
  if (!skill?.id) return;
  const cooldown = Number(skill.cooldown || 0);
  if (!Number.isFinite(cooldown) || cooldown <= 0) return;
  combatRuntime.actionCooldowns[skill.id] = Date.now() + cooldown * 1000;
  scheduleCombatCooldownRender();
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

function registerPlayerHit(damage, critical, effectType, skill, context = {}) {
  advanceHitCombo(state);
  addHyperCharge(playerHyperChargeFromSuccessfulHit(critical));
  triggerBattleSpriteMotion(combatRuntime, "enemy", BATTLE_SPRITE_MOTION_IDS.hitReaction);
  const playerEffectPlacement = resolvePlayerAttackEffectPlacement(state.playerProfile, {
    effectType,
    hyperActive: state.hyperActiveTicks > 0,
  });
  showCombatText("damage", damage, "enemy", effectType, critical, playerEffectPlacement);
  if (critical) showCombatText("critical", t("combat.text.critical"), "enemy", "impact", false, playerEffectPlacement);
  if (context.weaknessApplied) {
    showCombatText("weakness", t("combat.text.weaknessHit"), "enemy", "spark", false, playerEffectPlacement);
  }

  const breakResult = applySkillBreakDamage(state.target, skill, clamp);
  if (breakResult.triggered && !context.monsterDefeated) {
    activateTargetWeakness(state.target);
    addHyperCharge(10);
    addLog(context.monster ? tf("combatMessages.weaknessExposed", { monsterName: context.monster.name }) : bossBreakMessage());
    showCombatText("break", t("combat.text.weaknessExposed"), "enemy", "spark");
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
  combatRuntime.battlePhase = "victory";
  triggerBattleSpriteMotion(combatRuntime, "enemy", BATTLE_SPRITE_MOTION_IDS.downPlaceholder);
  combatRuntime.lastDefeatedTarget = defeatedTargetPreview;
  saveState();

  if (shouldContinue) {
    scheduleAutoRestart(AUTO_RESTART_DELAY_MS);
  } else {
    scheduleDefeatedPreviewClear(defeatedTargetPreview);
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
  const monster = resolveRegionEncounter(region).monster;
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
    resolveRegionMonster: resolveRegionEncounter,
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

function navigateToView(viewId) {
  const result = activateView(viewId, { scrollActiveTab: true });
  if (result.changed && (result.previousView === "combat" || result.nextView === "combat")) {
    clearCombatVisualFeedback();
  }
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
    onNavigateToView: navigateToView,
    onCombatAction: runManualCombatAction,
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
  cancelManualBattleLoop();
  combatTimer = clearIntervalTimer(combatTimer);
  objectiveTickerTimer = clearIntervalTimer(objectiveTickerTimer);
  recoveryTimer = clearIntervalTimer(recoveryTimer);
  clearAutoRestart();
  clearDefeatedPreviewTimer();
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
