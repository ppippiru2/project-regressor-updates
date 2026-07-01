import { ITEM_BALANCE_DATA, LOOT_ITEM_BALANCE_DATA } from "../balance/itemBalanceData.js?v=679";
import { SKILL_BALANCE_DATA } from "../balance/skillBalanceData.js?v=679";
import {
  TUTORIAL_MONSTER_POOL_DATA,
  TUTORIAL_MONSTER_REWARD_LINKS,
} from "../balance/monsterCandidatePool.js?v=679";
import { createMonsterCandidateBulkPatchAutomationPreview } from "./monsterCandidateBulkPatchAutomation.js?v=679";

export const CONTENT_BULK_PATCH_AUTOMATION_PLAN_VERSION = "content-bulk-patch-automation-plan-v1";

export const CONTENT_BULK_PATCH_DOMAIN_DEFINITIONS = Object.freeze([
  {
    id: "monster",
    batchKey: "monsters",
    identityFields: ["id"],
    requiredInputFields: ["id", "regionId", "level", "stats", "tags", "representativeMonsterId", "rewardLink"],
    checkScripts: [
      "build-scripts/check-monster-candidate-pool.mjs",
      "build-scripts/check-region-monster-pool-runtime.mjs",
      "build-scripts/check-monster-combat-display-slots.mjs",
    ],
    surfaces: [
      "src/balance/monsterBalanceData.js:MONSTER_BALANCE_DATA",
      "src/data/worldData.js:regions.monsterPool",
      "src/balance/monsterCandidatePool.js:TUTORIAL_MONSTER_REWARD_LINKS",
      "data/asset-slots.json:slots.monster.byMonsterId",
      "src/assets/assetData.js:ASSET_SLOTS.slots.monster",
      "src/config/monsterBattleSpritePresets.js:MONSTER_BATTLE_SPRITE_PRESETS",
      "styles.css:runtime monster sprite selector",
    ],
  },
  {
    id: "equipment_item",
    batchKey: "equipmentItems",
    identityFields: ["id"],
    requiredInputFields: ["id", "slot", "rarity", "attack", "defense", "options", "shopPrice", "iconSlot"],
    checkScripts: [
      "build-scripts/check-equipment-value-balance.mjs",
      "build-scripts/check-loot-item-catalog.mjs",
      "build-scripts/check-content-id-retarget-candidates.mjs",
    ],
    surfaces: [
      "src/balance/itemBalanceData.js:ITEM_BALANCE_DATA",
      "src/data/equipmentData.js:equipment",
      "src/balance/equipmentValueBalance.js",
      "src/localization/ko-KR.js:data.equipmentNames",
      "data/asset-slots.json:slots.item.icons",
      "src/data/shopData.js:shopCatalog",
      "src/ui/renderInventory.js",
    ],
  },
  {
    id: "loot_item",
    batchKey: "lootItems",
    identityFields: ["id"],
    requiredInputFields: ["id", "type", "rarity", "stackable", "recordTarget", "skillId", "dropSource"],
    checkScripts: [
      "build-scripts/check-loot-item-catalog.mjs",
      "build-scripts/check-codex-record-progress.mjs",
      "build-scripts/check-monster-candidate-pool.mjs",
    ],
    surfaces: [
      "src/balance/itemBalanceData.js:LOOT_ITEM_BALANCE_DATA",
      "src/data/itemData.js:lootItems",
      "src/localization/ko-KR.js:data.itemNames",
      "src/localization/ko-KR.js:data.itemDescriptions",
      "src/state/combatRewards.js:loot acquisition",
      "src/state/codexProgress.js",
    ],
  },
  {
    id: "skill",
    batchKey: "skills",
    identityFields: ["id"],
    requiredInputFields: ["id", "type", "mpCost", "cooldown", "damageType", "multiplier", "effectType", "stanceAllowed"],
    checkScripts: [
      "build-scripts/check-final-package-contract.mjs",
      "build-scripts/check-combat-vfx-placement-preview.mjs",
      "build-scripts/check-content-id-retarget-candidates.mjs",
    ],
    surfaces: [
      "src/balance/skillBalanceData.js:SKILL_BALANCE_DATA",
      "src/data/coreData.js:skills",
      "src/localization/ko-KR.js:data.skills",
      "src/ui/renderCombatActions.js",
      "src/combat/combatActions.js",
      "src/combat/combatEffects.js:effectType",
      "src/state/skillLoadout.js",
    ],
  },
  {
    id: "reward_link",
    batchKey: "rewardLinks",
    identityFields: ["monsterId"],
    requiredInputFields: ["monsterId", "codexFragmentId", "materialItemIds", "skillItemIds", "dropChance"],
    checkScripts: [
      "build-scripts/check-monster-candidate-pool.mjs",
      "build-scripts/check-loot-item-catalog.mjs",
      "build-scripts/check-system-window-notices.mjs",
    ],
    surfaces: [
      "src/balance/monsterCandidatePool.js:TUTORIAL_MONSTER_REWARD_LINKS",
      "src/balance/monsterBalanceData.js:dropTable",
      "src/state/combatRewards.js",
      "src/ui/renderDropPreview.js",
      "src/state/codexProgress.js",
      "src/ui/systemWindow.js",
    ],
  },
]);

export function createContentBulkPatchAutomationPlan() {
  const monsterBulkPreview = createMonsterCandidateBulkPatchAutomationPreview();
  const rowCounts = {
    monster: TUTORIAL_MONSTER_POOL_DATA.length,
    equipment_item: ITEM_BALANCE_DATA.length,
    loot_item: LOOT_ITEM_BALANCE_DATA.length,
    skill: SKILL_BALANCE_DATA.length,
    reward_link: TUTORIAL_MONSTER_REWARD_LINKS.length,
  };

  const domains = CONTENT_BULK_PATCH_DOMAIN_DEFINITIONS.map((definition) => {
    const currentRowCount = rowCounts[definition.id] || 0;
    const generatedSurfaceCount = definition.id === "monster"
      ? monsterBulkPreview.summary.generatedSurfaceCount
      : currentRowCount * definition.surfaces.length;
    const coverageState = definition.id === "monster" && monsterBulkPreview.summary.needsDraftCount === 0
      ? "covered-currently"
      : "contract-ready";
    return {
      ...definition,
      currentRowCount,
      surfaceTemplateCount: definition.surfaces.length,
      generatedSurfaceCount,
      coverageState,
    };
  });

  const surfaceTemplateCount = domains.reduce((sum, domain) => sum + domain.surfaceTemplateCount, 0);
  const generatedSurfaceCount = domains.reduce((sum, domain) => sum + domain.generatedSurfaceCount, 0);
  const currentRowCount = domains.reduce((sum, domain) => sum + domain.currentRowCount, 0);

  return {
    version: CONTENT_BULK_PATCH_AUTOMATION_PLAN_VERSION,
    writesGameData: false,
    sourceVersion: monsterBulkPreview.version,
    summary: {
      domainCount: domains.length,
      currentRowCount,
      surfaceTemplateCount,
      generatedSurfaceCount,
      contractReadyDomainCount: domains.filter((domain) => domain.coverageState === "contract-ready").length,
      coveredCurrentDomainCount: domains.filter((domain) => domain.coverageState === "covered-currently").length,
    },
    domains,
  };
}
