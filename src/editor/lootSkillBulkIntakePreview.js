import { LOOT_ITEM_BALANCE_DATA } from "../balance/itemBalanceData.js?v=477";
import { SKILL_BALANCE_DATA } from "../balance/skillBalanceData.js?v=477";
import { createContentBulkPatchPackageAdapterPreview } from "./contentBulkPatchPackageAdapter.js?v=477";

export const LOOT_SKILL_BULK_INTAKE_PREVIEW_VERSION = "loot-skill-bulk-intake-preview-v1";

const CURRENT_LOOT_IDS = new Set(LOOT_ITEM_BALANCE_DATA.map((item) => item.id));
const CURRENT_SKILL_IDS = new Set(SKILL_BALANCE_DATA.map((skill) => skill.id));

const TRACKED_LOOT_TYPES = Object.freeze([
  "codex_fragment",
  "mana_crystal",
  "skill_fragment",
  "skill_rune",
]);

export function createLootSkillBulkIntakePreview(
  adapterPreview = createContentBulkPatchPackageAdapterPreview(),
) {
  const lootRows = Array.isArray(adapterPreview?.normalized?.batch?.lootItems)
    ? adapterPreview.normalized.batch.lootItems
    : [];
  const skillRows = Array.isArray(adapterPreview?.normalized?.batch?.skills)
    ? adapterPreview.normalized.batch.skills
    : [];
  const rewardLinks = Array.isArray(adapterPreview?.normalized?.batch?.rewardLinks)
    ? adapterPreview.normalized.batch.rewardLinks
    : [];
  const packageSkillIds = new Set(skillRows.map((row) => row.id).filter(Boolean));
  const rewardItemIds = collectRewardItemIds(rewardLinks);
  const lootPreviewRows = lootRows.map((row) => createLootPreviewRow(row, {
    packageSkillIds,
    rewardItemIds,
  }));
  const skillPreviewRows = skillRows.map(createSkillPreviewRow);
  const categoryCounts = createCategoryCounts(lootPreviewRows);
  const rowsMissingSkillDefinitions = lootPreviewRows.filter((row) => row.requiresSkillDefinition && !row.hasSkillDefinition);
  const rowsLinkedToRewards = lootPreviewRows.filter((row) => row.rewardLinked);
  const rowsWithCodexTargets = lootPreviewRows.filter((row) => row.type === "codex_fragment" && row.recordTarget > 0);

  return {
    version: LOOT_SKILL_BULK_INTAKE_PREVIEW_VERSION,
    sourceVersion: adapterPreview?.version || "",
    writesGameData: false,
    requiresExplicitApply: true,
    summary: {
      lootRowCount: lootPreviewRows.length,
      skillRowCount: skillPreviewRows.length,
      codexFragmentCount: categoryCounts.codex_fragment,
      manaCrystalCount: categoryCounts.mana_crystal,
      skillFragmentCount: categoryCounts.skill_fragment,
      skillRuneCount: categoryCounts.skill_rune,
      otherLootCount: categoryCounts.other,
      appendLootCount: lootPreviewRows.filter((row) => row.bulkState === "staged-append").length,
      updateLootCount: lootPreviewRows.filter((row) => row.bulkState === "staged-update").length,
      appendSkillCount: skillPreviewRows.filter((row) => row.bulkState === "staged-append").length,
      updateSkillCount: skillPreviewRows.filter((row) => row.bulkState === "staged-update").length,
      rewardLinkedLootCount: rowsLinkedToRewards.length,
      codexRecordTargetCount: rowsWithCodexTargets.length,
      missingSkillDefinitionCount: rowsMissingSkillDefinitions.length,
      requiredCheckCount: requiredCheckCountFor(adapterPreview, ["loot_item", "skill", "reward_link"]),
    },
    lootRows: lootPreviewRows,
    skillRows: skillPreviewRows,
    rewardLinks: rewardLinks.map((link) => ({
      monsterId: link.monsterId || "",
      codexFragmentId: link.codexFragmentId || "",
      materialItemIds: arrayValue(link.materialItemIds),
      skillItemIds: arrayValue(link.skillItemIds),
      dropChance: Number(link.dropChance) || 0,
    })),
    categoryCounts,
    guard: {
      codexFragmentsRemainReadOnly: true,
      skillLootRequiresSkillDefinition: true,
      rewardLinksSeparateFromEquipmentCandidates: true,
      actualWritesDisabled: true,
    },
  };
}

function createLootPreviewRow(row, { packageSkillIds, rewardItemIds }) {
  const id = row.id || "";
  const type = normalizeLootType(row.type);
  const skillId = row.skillId && row.skillId !== "none" ? row.skillId : "";
  const requiresSkillDefinition = type === "skill_fragment" || type === "skill_rune";
  const hasSkillDefinition = !requiresSkillDefinition || CURRENT_SKILL_IDS.has(skillId) || packageSkillIds.has(skillId);
  return {
    id,
    type,
    rarity: row.rarity || "common",
    stackable: row.stackable !== false,
    recordTarget: Math.max(0, Number(row.recordTarget) || 0),
    skillId,
    dropSource: row.dropSource || "",
    bulkState: CURRENT_LOOT_IDS.has(id) ? "staged-update" : "staged-append",
    rewardLinked: rewardItemIds.has(id),
    requiresSkillDefinition,
    hasSkillDefinition,
    intakeState: lootIntakeState({
      type,
      requiresSkillDefinition,
      hasSkillDefinition,
      rewardLinked: rewardItemIds.has(id),
    }),
  };
}

function createSkillPreviewRow(row) {
  const id = row.id || "";
  return {
    id,
    type: row.type || "Active",
    mpCost: Number(row.mpCost) || 0,
    cooldown: Number(row.cooldown) || 0,
    damageType: row.damageType || "",
    effectType: row.effectType || "",
    stanceAllowed: arrayValue(row.stanceAllowed),
    bulkState: CURRENT_SKILL_IDS.has(id) ? "staged-update" : "staged-append",
  };
}

function createCategoryCounts(rows) {
  const counts = {
    codex_fragment: 0,
    mana_crystal: 0,
    skill_fragment: 0,
    skill_rune: 0,
    other: 0,
  };
  for (const row of rows) {
    if (TRACKED_LOOT_TYPES.includes(row.type)) counts[row.type] += 1;
    else counts.other += 1;
  }
  return counts;
}

function collectRewardItemIds(rewardLinks = []) {
  const ids = new Set();
  for (const link of rewardLinks) {
    if (link?.codexFragmentId) ids.add(link.codexFragmentId);
    for (const id of arrayValue(link?.materialItemIds)) ids.add(id);
    for (const id of arrayValue(link?.skillItemIds)) ids.add(id);
  }
  return ids;
}

function requiredCheckCountFor(adapterPreview, domainIds) {
  const checks = new Set();
  for (const mapping of adapterPreview?.mappings || []) {
    if (!domainIds.includes(mapping.domainId) || mapping.rowCount <= 0) continue;
    const dryRunDomain = adapterPreview?.stagedImport?.dryRun?.domains
      ?.find((domain) => domain.id === mapping.domainId);
    for (const check of dryRunDomain?.checkScripts || []) checks.add(check);
  }
  return checks.size;
}

function normalizeLootType(type) {
  if (type === "codex" || type === "codex_card" || type === "card_fragment") return "codex_fragment";
  if (type === "mana" || type === "magic_stone" || type === "magic_stone_fragment") return "mana_crystal";
  if (type === "rune") return "skill_rune";
  return type || "material";
}

function lootIntakeState({ type, requiresSkillDefinition, hasSkillDefinition, rewardLinked }) {
  if (requiresSkillDefinition && !hasSkillDefinition) return "blocked-missing-skill";
  if (type === "codex_fragment") return rewardLinked ? "codex-record-linked" : "codex-record-unlinked";
  if (type === "mana_crystal") return rewardLinked ? "material-linked" : "material-unlinked";
  if (requiresSkillDefinition) return rewardLinked ? "skill-loot-linked" : "skill-loot-unlinked";
  return rewardLinked ? "loot-linked" : "loot-unlinked";
}

function arrayValue(value) {
  if (Array.isArray(value)) return value.filter(Boolean);
  if (typeof value === "string" && value.trim()) {
    return value.split(",").map((entry) => entry.trim()).filter(Boolean);
  }
  return [];
}

