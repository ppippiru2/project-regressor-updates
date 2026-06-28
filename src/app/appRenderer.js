import { COMBAT_VIEW_OPTIONS, FEEDBACK_OPTIONS } from "../config/helpText.js?v=513";
import { renderCombatEffects } from "../combat/combatEffects.js?v=513";
import { createCombatFormationState } from "../combat/combatFormation.js?v=513";
import { rankFromPower } from "../combat/combatFormula.js";
import { renderInventory } from "../ui/renderInventory.js?v=513";
import { renderShop } from "../ui/renderShop.js?v=513";
import { renderProfile, renderResistances, renderStats } from "../ui/renderStatus.js?v=513";
import { renderGateMap, renderRegions } from "../ui/renderRegion.js?v=513";
import {
  renderCharacterCreation,
  renderAudioSettings,
  renderCombatViewSettings,
  renderDeveloperSettings,
  renderFeedbackSettings,
  renderLog,
  renderProfileEditSettings,
  renderSaveSlots,
} from "../ui/renderCommon.js?v=513";
import { renderCombatSkillsIfNeeded } from "../ui/renderCombatActions.js?v=513";
import { renderCombatControls } from "../ui/renderCombatControls.js?v=513";
import { renderHitCounter, updateCombatPulseClasses } from "../ui/renderCombatPulse.js?v=513";
import { renderCombatVitals } from "../ui/renderCombatVitals.js?v=513";
import { renderSystemWindow } from "../ui/systemWindow.js?v=513";
import { createGrowthObjective } from "../state/growthObjective.js?v=513";
import { renderGrowthObjective } from "../ui/renderGrowthObjective.js?v=513";
import { renderDropPreview } from "../ui/renderDropPreview.js?v=513";
import { createCombatReadiness } from "../state/combatReadiness.js?v=513";
import { renderCombatReadiness } from "../ui/renderCombatReadiness.js?v=513";
import { renderBuildInfo } from "../ui/renderBuildInfo.js?v=513";
import { DEVELOPER_MULTIPLIER_OPTIONS } from "../state/developerOptions.js?v=513";
import { resolvePlayerBattleSpritePreset } from "../config/playerBattleSprites.js?v=513";
import { resolveMonsterBattleSpritePreset } from "../config/monsterBattleSpritePresets.js?v=513";
import { syncBattleSpriteMotions } from "../ui/battleSpriteMotion.js?v=513";

export function renderAppFrame(context) {
  const now = Date.now();
  const combatFrame = context.options?.combatFrame === true;
  const shouldRenderSlow = !combatFrame || !context.state.inCombat || now >= context.nextSlowRenderAt;
  const nextSlowRenderAt = shouldRenderSlow ? now + context.slowRenderIntervalMs : context.nextSlowRenderAt;

  context.ensureResources();
  const region = context.getRegion();
  const player = context.derivePlayer();
  const defeatedTargetPreview = resolveVisibleDefeatedTarget(context.state, context.combatRuntime, now);
  const targetMonster = context.state.target
    ? context.getMonster(context.state.target.monsterId)
    : defeatedTargetPreview?.monsterId
    ? context.getMonster(defeatedTargetPreview.monsterId)
    : context.resolveRegionMonster?.(region)?.monster || context.getMonster(region.monsterId);
  const targetStats = targetMonster ? context.getMonsterStats(targetMonster) : null;
  const bossMonster = region.bossId ? context.getMonster(region.bossId) : null;
  const bossStats = bossMonster ? context.getMonsterStats(bossMonster) : null;
  const formation = createCombatFormationState(context.state);
  const playerBattleSprite = resolvePlayerBattleSpritePreset(context.state.playerProfile);
  const enemyBattleSprite = resolveMonsterBattleSpritePreset(targetMonster);

  const { enemyHp } = renderCombatVitals({
    state: context.state,
    region,
    player,
    targetMonster,
    targetStats,
    combatRuntime: context.combatRuntime,
    rankLabel: rankFromPower(player.power),
    battleBackgroundPath: context.resolveRegionBattleBackgroundPath?.(region, context.assetRegistry) || "",
    playerSpritePath: playerBattleSprite.path || context.resolvePlayerCombatSpritePath?.(context.assetRegistry) || "",
    playerSpritePlacement: playerBattleSprite,
    enemySpritePath: context.resolveMonsterCombatSpritePath?.(targetMonster, context.assetRegistry) || "",
    enemySpritePlacement: enemyBattleSprite,
    formation,
  });
  renderHitCounter(context.state);
  renderCombatSkillsIfNeeded(player, context.getCombatActionRenderContext());
  updateCombatPulseClasses({
    state: context.state,
    combatRuntime: context.combatRuntime,
    player,
    enemyHp,
    enemyMaxHp: targetStats?.maxHp || 1,
    hypMax: context.hypMax,
  });
  syncBattleSpriteMotions(context.combatRuntime, now);

  renderCombatControls({ state: context.state, region, targetMonster });
  renderCombatReadiness(
    createCombatReadiness({
      region,
      regions: context.regions,
      playerState: context.state.player,
      player,
      bossMonster,
      bossStats,
      expToNext: context.expToNext,
      rankFromPower,
    })
  );
  renderDropPreview(targetMonster, context.getItem, context.state.equipment);
  renderSystemWindow({
    log: context.state.log,
    player: context.state.player,
    playerProfile: context.state.playerProfile,
    region,
    inCombat: context.state.inCombat,
  });
  renderGrowthObjective(
    createGrowthObjective(context.regions, context.state.player, context.expToNext, {
      log: context.state.log,
      now,
      regionId: context.state.regionId,
      completedRegions: context.state.completedRegions,
      rotation: {
        mode: context.uiState.objectiveRotationMode,
        index: context.uiState.objectiveRotationIndex,
      },
    }),
    context.uiState,
    {
      onToggleObjective: context.onToggleObjective,
      onToggleObjectiveRotationMode: context.onToggleObjectiveRotationMode,
      onStepObjective: context.onStepObjective,
      onObjectiveAction: context.onObjectiveAction,
    }
  );

  if (shouldRenderSlow) {
    renderSlowAppSections(context, { region, player });
  }

  context.state.effects = renderCombatEffects(context.state.effects, context.state.settings.combatFeedback);
  return nextSlowRenderAt;
}

function resolveVisibleDefeatedTarget(state, combatRuntime, now = Date.now()) {
  const defeatedTarget = combatRuntime?.lastDefeatedTarget;
  if (state.inCombat || !defeatedTarget?.monsterId) return null;
  if (defeatedTarget.visibleUntil && defeatedTarget.visibleUntil < now) return null;
  return defeatedTarget;
}

export function renderAppRegionList(context) {
  renderRegions(context.regions, {
    selectedRegionId: context.uiState.selectedRegionId,
    regionId: context.state.regionId,
    completedRegions: context.state.completedRegions,
    playerLevel: context.state.player.level,
    playerExp: context.state.player.exp,
    expToNext: context.expToNext,
    getRegionImagePath: (region) => context.resolveRegionCardImagePath(region, context.assetRegistry),
    getRegionMoveBlock: context.getRegionMoveBlock,
  });
}

function renderSlowAppSections(context, { region, player }) {
  renderStats(
    player,
    context.state.player,
    context.primaryStats,
    context.displayName,
    context.expToNext,
    rankFromPower(player.power),
    context.state.playerProfile
  );
  renderProfile(
    context.state.playerProfile,
    context.state.player.level,
    resolvePlayerBattleSpritePreset(context.state.playerProfile).path ||
      context.resolvePlayerCombatSpritePath?.(context.assetRegistry) ||
      ""
  );
  renderResistances(player);
  renderInventory(
    context.state.equipment,
    context.state.inventory,
    context.slots,
    context.displayName,
    context.getItem,
    context.optionText,
    (item) => context.resolveItemIconPath?.(item, context.assetRegistry) || ""
  );
  renderShop({
    state: context.state,
    catalog: context.shopCatalog,
    categories: context.shopCategories,
    getItem: context.getItem,
    displayName: context.displayName,
    optionText: context.optionText,
    getItemIconPath: (item) => context.resolveItemIconPath?.(item, context.assetRegistry) || "",
  });
  renderAppRegionList(context);
  const previewRegion =
    context.regions.find((entry) => entry.id === context.uiState.selectedRegionId) || region;
  renderGateMap(previewRegion, context.getGateMap, context.ensureGateProgress, {
    getNodeMapImagePath: (region) => context.resolveRegionNodeMapImagePath?.(region, context.assetRegistry) || "",
    nodeTypeColors: context.state.settings.combatView.nodeTypeColors !== false,
  });
  renderFeedbackSettings(FEEDBACK_OPTIONS, context.state.settings.combatFeedback);
  renderCombatViewSettings(COMBAT_VIEW_OPTIONS, context.state.settings.combatView);
  renderDeveloperSettings(DEVELOPER_MULTIPLIER_OPTIONS, context.state.settings.developer);
  renderSaveSlots(context.saveSlotEntries, context.activeSaveSlotId);
  renderProfileEditSettings(context.state.playerProfile);
  renderAudioSettings(context.state.settings.audio);
  renderBuildInfo();
  renderCharacterCreation(context.state.playerProfile);
  renderLog(context.state.log, context.state.settings.combatView);
}



