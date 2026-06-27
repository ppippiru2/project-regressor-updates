import { addInventoryItem } from "./inventory.js";
import { droppedEquipmentInsight } from "./lootInsight.js?v=448";
import { applyMonsterRewards, markRegionCompleted, regionExpMultiplier, rollMonsterDrops } from "./rewards.js?v=448";
import { claimFirstCodexRecordGuide } from "./tutorialGuidance.js?v=448";
import { t, tf } from "../localization/index.js?v=448";
import { resolveRegionCoreEvent } from "../story/coreEventCatalog.js?v=448";

export function applyMonsterDefeatRewards(state, monster, context) {
  const { player, region, getItemName, getItem, equipmentState, developerOptions = {} } = context;
  const messages = [];

  const regionMultiplier = region ? regionExpMultiplier(state.player.level, region.recommendedLevel) : 1;
  const expMultiplier = regionMultiplier * normalizeMultiplier(developerOptions.expMultiplier);
  const goldMultiplier = normalizeMultiplier(developerOptions.goldDropMultiplier);
  const dropMultiplier = normalizeMultiplier(developerOptions.itemDropMultiplier);
  const reward = applyMonsterRewards(state.player, monster, { expMultiplier, goldMultiplier });
  const expText = regionMultiplier < 1
    ? tf("combatRewards.expWithBase", { exp: reward.exp, baseExp: reward.baseExp })
    : tf("combatRewards.exp", { exp: reward.exp });
  const penaltyText = regionMultiplier < 1
    ? t("combatRewards.lowRiskPenalty")
    : "";
  const bonusText = reward.expMultiplier > regionMultiplier || reward.goldMultiplier > 1 || dropMultiplier > 1
    ? t("combatRewards.devMultiplierBonus")
    : "";
  messages.push(tf("combatRewards.monsterDefeated", {
    monsterName: monster.name,
    expText,
    gold: reward.gold,
    penaltyText,
    bonusText,
  }));

  for (const itemId of rollMonsterDrops(monster.dropTable, player.dropRate * dropMultiplier)) {
    const item = getItem?.(itemId);
    state.inventory = addInventoryItem(state.inventory, itemId);
    const inventoryEntry = state.inventory.find((entry) => entry.itemId === itemId);
    if (item && !item.slot) {
      messages.push(tf("combatRewards.lootItemAcquired", {
        itemName: item.name || getItemName(itemId),
        typeLabel: item.typeLabel || t("combatRewards.lootItemFallbackType"),
      }));
      messages.push(...claimFirstCodexRecordGuide(state, { item, count: inventoryEntry?.count || 1 }));
      continue;
    }

    messages.push(tf("combatRewards.itemAcquired", { itemName: item?.name || getItemName(itemId) }));
    const insight = item?.slot ? droppedEquipmentInsight(item, equipmentState, getItem) : null;
    if (insight) messages.push(insight.message);
  }

  if (monster.isBoss && region && markRegionCompleted(state.completedRegions, region.id)) {
    messages.push(tf("combatRewards.bossCleared", { regionName: region.name }));
    const resolved = resolveRegionCoreEvent(region);
    if (resolved?.completionLog) messages.push(resolved.completionLog);
  }

  return messages;
}

function normalizeMultiplier(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 1;
  return Math.max(0, Math.min(100, number));
}

