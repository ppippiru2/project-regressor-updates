import { createContentBulkPatchStagedImportPreview } from "./contentBulkPatchStagedImportPreview.js?v=462";
import {
  CONTENT_BULK_PATCH_BATCH_KEYS,
  createContentBulkPatchIntakeContract,
} from "./contentBulkPatchIntakeContract.js?v=462";

export const CONTENT_BULK_PATCH_PACKAGE_ADAPTER_VERSION = "content-bulk-patch-package-adapter-v1";

export const CONTENT_BULK_PATCH_PACKAGE_ALIASES = Object.freeze({
  monster: Object.freeze([
    "monsters",
    "monsterCandidates",
    "monsterPool",
    "monster_candidate_pool",
    "enemyCandidates",
    "enemies",
  ]),
  equipment_item: Object.freeze([
    "equipmentItems",
    "equipment",
    "equipmentCandidates",
    "gearItems",
  ]),
  loot_item: Object.freeze([
    "lootItems",
    "loot",
    "materials",
    "nonEquipmentItems",
    "codexFragments",
    "manaCrystalFragments",
    "skillFragments",
    "skillRunes",
  ]),
  skill: Object.freeze([
    "skills",
    "skillCandidates",
    "skillDefinitions",
    "activeSkills",
  ]),
  reward_link: Object.freeze([
    "rewardLinks",
    "monsterRewardLinks",
    "dropLinks",
    "dropTables",
    "rewards",
  ]),
});

const PACKAGE_ROOT_KEYS = Object.freeze(["content", "data", "payload", "batch"]);

export function createContentBulkPatchPackageAdapterTemplate() {
  return {
    version: CONTENT_BULK_PATCH_PACKAGE_ADAPTER_VERSION,
    monsterCandidates: [
      {
        monsterId: "bulk_sample_imp",
        region: "tutorial_shore",
        lv: 1,
        STR: 1,
        AGI: 2,
        VIT: 2,
        tags: ["sample"],
        visualBaseId: "shore_imp",
        codexFragmentId: "bulk_sample_imp_codex_fragment",
        materialItemIds: ["low_mana_crystal_fragment"],
        skillItemIds: ["power_slash_skill_fragment"],
      },
    ],
    skillRunes: [
      {
        itemId: "bulk_sample_skill_rune",
        type: "skill_rune",
        rarity: "rare",
        skillId: "power_slash",
        dropSource: "bulk_sample_imp",
      },
    ],
    skillDefinitions: [
      {
        skillId: "bulk_sample_skill",
        type: "Active",
        mpCost: 2,
        cooldown: 4,
        damageType: "physical",
        multiplier: 1.25,
        effectType: "slash",
        stanceAllowed: ["power", "berserk"],
      },
    ],
    monsterRewardLinks: [
      {
        monsterId: "bulk_sample_imp",
        codexFragmentId: "bulk_sample_imp_codex_fragment",
        materialItemIds: ["low_mana_crystal_fragment"],
        skillItemIds: ["power_slash_skill_fragment"],
        dropChance: 1,
      },
    ],
  };
}

export function createContentBulkPatchPackageAdapterPreview(
  packageData = createContentBulkPatchPackageAdapterTemplate(),
  options = {},
) {
  const normalized = normalizeContentBulkPatchPackage(packageData, options);
  const stagedImport = createContentBulkPatchStagedImportPreview(normalized.batch);
  const activeMappings = normalized.mappings.filter((mapping) => mapping.rowCount > 0);

  return {
    version: CONTENT_BULK_PATCH_PACKAGE_ADAPTER_VERSION,
    writesGameData: false,
    sourceVersion: stagedImport.version,
    acceptsAliasPackage: true,
    requiresExplicitApply: true,
    normalized,
    stagedImport,
    summary: {
      domainCount: normalized.mappings.length,
      activeDomainCount: activeMappings.length,
      sourceKeyCount: normalized.summary.sourceKeyCount,
      recognizedSourceKeyCount: normalized.summary.recognizedSourceKeyCount,
      unmappedArrayKeyCount: normalized.summary.unmappedArrayKeyCount,
      normalizedRowCount: normalized.summary.normalizedRowCount,
      stagedRowCount: stagedImport.summary.stagedRowCount,
      withheldRowCount: stagedImport.summary.withheldRowCount,
      warningRowCount: stagedImport.summary.warningRowCount,
      requiredCheckCount: stagedImport.summary.requiredCheckCount,
    },
    mappings: normalized.mappings,
  };
}

export function normalizeContentBulkPatchPackage(packageData = {}, options = {}) {
  const contract = options.contract || createContentBulkPatchIntakeContract();
  const sourceRoots = collectSourceRoots(packageData);
  const sourceArrayKeys = collectSourceArrayKeys(sourceRoots);
  const recognizedSourceKeys = new Set();
  const batch = {
    version: CONTENT_BULK_PATCH_PACKAGE_ADAPTER_VERSION,
    ...Object.fromEntries(contract.domains.map((domain) => [domain.batchKey, []])),
  };

  const mappings = contract.domains.map((domain) => {
    const aliases = aliasesForDomain(domain);
    const sourceRows = collectDomainRows(sourceRoots, aliases, recognizedSourceKeys);
    const normalizedRows = sourceRows.map((row) => normalizeRowForDomain(domain.id, row, options));
    batch[domain.batchKey] = normalizedRows;
    return {
      domainId: domain.id,
      batchKey: domain.batchKey,
      aliases,
      sourceKeys: Array.from(new Set(sourceRows.map((entry) => entry.__sourceKey).filter(Boolean))),
      rowCount: normalizedRows.length,
      requiredInputFields: domain.requiredInputFields,
      identityFields: domain.identityFields,
    };
  });

  const unmappedArrayKeys = sourceArrayKeys.filter((key) => !recognizedSourceKeys.has(key));
  return {
    version: CONTENT_BULK_PATCH_PACKAGE_ADAPTER_VERSION,
    writesGameData: false,
    batch,
    mappings,
    summary: {
      sourceRootCount: sourceRoots.length,
      sourceKeyCount: sourceArrayKeys.length,
      recognizedSourceKeyCount: recognizedSourceKeys.size,
      unmappedArrayKeyCount: unmappedArrayKeys.length,
      normalizedRowCount: mappings.reduce((sum, mapping) => sum + mapping.rowCount, 0),
    },
    unmappedArrayKeys,
  };
}

function aliasesForDomain(domain) {
  return Array.from(new Set([
    domain.batchKey,
    ...(CONTENT_BULK_PATCH_PACKAGE_ALIASES[domain.id] || []),
    CONTENT_BULK_PATCH_BATCH_KEYS[domain.id],
  ].filter(Boolean)));
}

function collectSourceRoots(packageData) {
  const roots = [packageData].filter(isObjectRecord);
  for (const key of PACKAGE_ROOT_KEYS) {
    if (isObjectRecord(packageData?.[key])) roots.push(packageData[key]);
  }
  return roots;
}

function collectSourceArrayKeys(sourceRoots) {
  const keys = new Set();
  for (const root of sourceRoots) {
    for (const [key, value] of Object.entries(root)) {
      if (Array.isArray(value)) keys.add(key);
    }
  }
  return Array.from(keys);
}

function collectDomainRows(sourceRoots, aliases, recognizedSourceKeys) {
  const rows = [];
  for (const root of sourceRoots) {
    for (const alias of aliases) {
      if (!Array.isArray(root?.[alias])) continue;
      recognizedSourceKeys.add(alias);
      rows.push(...root[alias].map((row) => ({ ...row, __sourceKey: alias })));
    }
  }
  return rows;
}

function normalizeRowForDomain(domainId, row, options) {
  if (domainId === "monster") return normalizeMonsterRow(row, options);
  if (domainId === "equipment_item") return normalizeEquipmentItemRow(row);
  if (domainId === "loot_item") return normalizeLootItemRow(row, options);
  if (domainId === "skill") return normalizeSkillRow(row);
  if (domainId === "reward_link") return normalizeRewardLinkRow(row);
  return { ...row };
}

function normalizeMonsterRow(row, options) {
  const id = firstValue(row.id, row.monsterId, row.enemyId, row.key);
  const rewardLink = row.rewardLink || {
    codexFragmentId: row.codexFragmentId || `${id}_codex_fragment`,
    materialItemIds: arrayValue(row.materialItemIds, row.materials, row.manaCrystalIds),
    skillItemIds: arrayValue(row.skillItemIds, row.skillFragments, row.skillRunes),
  };
  return stripInternalSource({
    ...row,
    id,
    regionId: firstValue(row.regionId, row.region, row.areaId, options.defaultRegionId, "tutorial_shore"),
    level: numericValue(row.level, row.lv, row.recommendedLevel, 1),
    stats: statBlockValue(row.stats, row),
    tags: arrayValue(row.tags, row.traits, row.keywords),
    representativeMonsterId: firstValue(row.representativeMonsterId, row.repMonsterId, row.visualBaseId, row.spriteBaseId, id),
    rewardLink,
  });
}

function normalizeEquipmentItemRow(row) {
  const id = firstValue(row.id, row.itemId, row.equipmentId, row.key);
  return stripInternalSource({
    ...row,
    id,
    slot: firstValue(row.slot, row.equipSlot, row.equipmentSlot, "Weapon"),
    rarity: firstValue(row.rarity, row.grade, "common"),
    attack: numericValue(row.attack, row.atk, 0),
    defense: numericValue(row.defense, row.def, 0),
    options: row.options || row.statOptions || {},
    shopPrice: numericValue(row.shopPrice, row.price, row.value, 1),
    iconSlot: firstValue(row.iconSlot, row.icon, row.iconId, id),
  });
}

function normalizeLootItemRow(row, options) {
  const id = firstValue(row.id, row.itemId, row.lootId, row.fragmentId, row.key);
  const type = firstValue(row.type, row.itemType, row.category, "material");
  return stripInternalSource({
    ...row,
    id,
    type,
    rarity: firstValue(row.rarity, row.grade, "common"),
    stackable: row.stackable !== false,
    recordTarget: numericValue(row.recordTarget, row.codexTarget, type === "codex_fragment" ? 5 : 0),
    skillId: firstValue(row.skillId, row.unlocksSkillId, row.targetSkillId, "none"),
    dropSource: firstValue(row.dropSource, row.monsterId, row.sourceMonsterId, options.defaultDropSource, "global"),
  });
}

function normalizeSkillRow(row) {
  const id = firstValue(row.id, row.skillId, row.key);
  return stripInternalSource({
    ...row,
    id,
    type: firstValue(row.type, row.skillType, "Active"),
    mpCost: numericValue(row.mpCost, row.cost, 0),
    cooldown: numericValue(row.cooldown, row.coolTime, 0),
    damageType: firstValue(row.damageType, row.damageKind, "physical"),
    multiplier: numericValue(row.multiplier, row.powerMultiplier, row.power, 1),
    effectType: firstValue(row.effectType, row.vfx, "slash"),
    stanceAllowed: arrayValue(row.stanceAllowed, row.allowedStances, ["power", "berserk"]),
  });
}

function normalizeRewardLinkRow(row) {
  const monsterId = firstValue(row.monsterId, row.id, row.enemyId, row.sourceMonsterId);
  return stripInternalSource({
    ...row,
    monsterId,
    codexFragmentId: firstValue(row.codexFragmentId, row.codexId, `${monsterId}_codex_fragment`),
    materialItemIds: arrayValue(row.materialItemIds, row.materials, row.manaCrystalIds),
    skillItemIds: arrayValue(row.skillItemIds, row.skillFragments, row.skillRunes),
    dropChance: numericValue(row.dropChance, row.chance, 1),
  });
}

function stripInternalSource(row) {
  const { __sourceKey, ...cleanRow } = row;
  return cleanRow;
}

function statBlockValue(stats, row) {
  if (isObjectRecord(stats)) return stats;
  const block = {
    STR: numericValue(row.STR, row.str, 0),
    AGI: numericValue(row.AGI, row.agi, 0),
    VIT: numericValue(row.VIT, row.vit, 0),
    INT: numericValue(row.INT, row.int, 0),
    WIS: numericValue(row.WIS, row.wis, 0),
    LUK: numericValue(row.LUK, row.luk, 0),
  };
  return block;
}

function arrayValue(...values) {
  for (const value of values) {
    if (Array.isArray(value)) return value;
    if (typeof value === "string" && value.trim()) return value.split(",").map((entry) => entry.trim()).filter(Boolean);
  }
  return [];
}

function numericValue(...values) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) return Number(value);
  }
  return 0;
}

function firstValue(...values) {
  for (const value of values) {
    if (value === null || value === undefined) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    return value;
  }
  return "";
}

function isObjectRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}
