import { addInventoryItem } from "./inventory.js";
import { rollMonsterDrops } from "./rewards.js";
import { tf } from "../localization/index.js?v=280";

const MIN_OFFLINE_MS = 60 * 1000;
const MAX_OFFLINE_MS = 30 * 60 * 1000;
const OFFLINE_KILL_MS = 45 * 1000;
const OFFLINE_DROP_RATE_MULTIPLIER = 0.35;

export function stampLastSeen(state, now = Date.now()) {
  state.lastSeenAt = now;
  const engagedAt = Number(state.offlineAutoHuntEngagedAt);
  if (state.playerProfile?.created === false || !state.autoHunt || !Number.isFinite(engagedAt) || engagedAt <= 0) {
    state.offlineAutoHuntEligible = false;
    if (state.playerProfile?.created === false || !state.autoHunt) state.offlineAutoHuntEngagedAt = 0;
  }
}

export function calculateOfflineReward({ state, region, monster, now = Date.now() }) {
  if (state.playerProfile?.created === false) return null;
  if (!state.autoHunt || state.offlineAutoHuntEligible === false || !region || !monster) return null;
  if (!Number.isFinite(Number(state.offlineAutoHuntEngagedAt)) || Number(state.offlineAutoHuntEngagedAt) <= 0) return null;
  if (state.player.level < region.recommendedLevel) return null;

  const lastSeenAt = Number(state.lastSeenAt);
  if (!Number.isFinite(lastSeenAt)) return null;

  const elapsedMs = now - lastSeenAt;
  if (elapsedMs < MIN_OFFLINE_MS) return null;

  const rewardedMs = Math.min(elapsedMs, MAX_OFFLINE_MS);
  const kills = Math.floor(rewardedMs / OFFLINE_KILL_MS);
  if (kills <= 0) return null;

  return {
    elapsedMs,
    rewardedMs,
    kills,
    exp: monster.exp * kills,
    gold: monster.gold * kills,
  };
}

export function applyOfflineReward(player, reward) {
  player.exp += reward.exp;
  player.gold += reward.gold;
}

export function claimOfflineAutoHuntReward({
  state,
  region,
  monster,
  player,
  developerOptions = {},
  getItemName = (itemId) => itemId,
  now = Date.now(),
  random = Math.random,
}) {
  const reward = calculateOfflineReward({ state, region, monster, now });
  stampLastSeen(state, now);
  if (!reward) return null;

  const adjustedReward = {
    ...reward,
    exp: Math.floor(reward.exp * normalizeMultiplier(developerOptions.expMultiplier)),
    gold: Math.floor(reward.gold * normalizeMultiplier(developerOptions.goldDropMultiplier)),
  };
  const dropMultiplier = normalizeMultiplier(developerOptions.itemDropMultiplier);

  applyOfflineReward(state.player, adjustedReward);
  const drops = rollOfflineDrops({
    dropTable: monster.dropTable,
    kills: adjustedReward.kills,
    dropRate: (player?.dropRate || 1) * dropMultiplier,
    random,
  });

  for (const itemId of drops) {
    state.inventory = addInventoryItem(state.inventory, itemId);
  }

  return {
    reward: adjustedReward,
    drops,
    messages: [offlineRewardSummary(adjustedReward), ...offlineDropMessages(drops, getItemName)],
  };
}

export function offlineRewardSummary(reward) {
  const minutes = Math.max(1, Math.floor(reward.rewardedMs / 60000));
  return tf("stateMessages.offlineReward", {
    minutes,
    kills: reward.kills,
    exp: reward.exp,
    gold: reward.gold,
  });
}

function rollOfflineDrops({ dropTable = [], kills = 0, dropRate = 1, random = Math.random }) {
  const drops = [];
  const adjustedDropRate = dropRate * OFFLINE_DROP_RATE_MULTIPLIER;
  for (let index = 0; index < kills; index += 1) {
    drops.push(...rollMonsterDrops(dropTable, adjustedDropRate, random));
  }
  return drops;
}

function normalizeMultiplier(value) {
  const number = Number(value);
  if (!Number.isFinite(number)) return 1;
  return Math.max(0, Math.min(100, number));
}

function offlineDropMessages(drops, getItemName) {
  if (!drops.length) return [];

  const counts = new Map();
  for (const itemId of drops) counts.set(itemId, (counts.get(itemId) || 0) + 1);
  const summary = [...counts]
    .map(([itemId, count]) => `${getItemName(itemId)} x${count}`)
    .join(", ");

  return [tf("stateMessages.offlineExtraLoot", { summary })];
}
