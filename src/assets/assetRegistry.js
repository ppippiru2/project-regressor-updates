import { ASSET_MANIFEST, ASSET_SLOTS } from "./assetData.js?v=409";
import { monsterSpriteSlotKeyForPose } from "../config/monsterCombatDisplay.js?v=409";

const ASSET_DATA_VERSION = "236";

export const STATIC_ASSET_REGISTRY = {
  manifest: ASSET_MANIFEST,
  slots: ASSET_SLOTS,
};

export async function loadAssetRegistry(fetcher = globalThis.fetch) {
  if (typeof fetcher !== "function") return STATIC_ASSET_REGISTRY;

  try {
    const [manifest, slots] = await Promise.all([
      fetchJson(fetcher, `data/asset-manifest.json?v=${ASSET_DATA_VERSION}`),
      fetchJson(fetcher, `data/asset-slots.json?v=${ASSET_DATA_VERSION}`),
    ]);
    const registry = { manifest, slots };
    return hasRegionVisualSlots(registry) ? registry : STATIC_ASSET_REGISTRY;
  } catch {
    return STATIC_ASSET_REGISTRY;
  }
}

export function resolveAssetPath(assetId, registry) {
  if (!assetId || !registry?.manifest?.assets) return "";
  const asset = registry.manifest.assets.find((entry) => entry.assetId === assetId);
  return asset?.webpFile || asset?.cleanFile || asset?.sourceFile || "";
}

export function resolveRegionCardImagePath(region, registry) {
  const assetId = registry?.slots?.slots?.region?.cardImages?.[region.id];
  return resolveAssetPath(assetId, registry) || region.image || "";
}

export function resolveRegionNodeMapImagePath(region, registry) {
  const assetId = registry?.slots?.slots?.region?.nodeMapImages?.[region.id];
  return resolveAssetPath(assetId, registry);
}

export function resolveRegionBattleBackgroundPath(region, registry) {
  const assetId = registry?.slots?.slots?.region?.battleBackgrounds?.[region.id];
  return resolveAssetPath(assetId, registry);
}

export function resolvePlayerCombatSpritePath(registry, pose = "combatIdle") {
  const assetId = registry?.slots?.slots?.player?.[pose];
  return resolveAssetPath(assetId, registry);
}

export function resolveMonsterCombatSpritePath(monster, registry, pose = "idle") {
  const monsterSlots = registry?.slots?.slots?.monster || {};
  const actorAssetId = monsterSlots.byMonsterId?.[monster?.id]?.[pose];
  const defaultAssetId = monsterSlots[monsterSpriteSlotKeyForPose(pose)];
  return resolveAssetPath(actorAssetId || defaultAssetId, registry);
}

export function resolveItemIconPath(item, registry) {
  const assetId = registry?.slots?.slots?.item?.icons?.[item?.id];
  return resolveAssetPath(assetId, registry) || item?.icon || item?.image || "";
}

function hasRegionVisualSlots(registry) {
  return Boolean(
    registry?.manifest?.assets?.length &&
      registry?.slots?.slots?.region?.cardImages &&
      registry?.slots?.slots?.region?.nodeMapImages
  );
}

async function fetchJson(fetcher, path) {
  const response = await fetcher(path);
  if (!response.ok) throw new Error(`Failed to load ${path}`);
  return response.json();
}
