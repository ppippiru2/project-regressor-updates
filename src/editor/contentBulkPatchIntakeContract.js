import { ITEM_BALANCE_DATA, LOOT_ITEM_BALANCE_DATA } from "../balance/itemBalanceData.js?v=519";
import { SKILL_BALANCE_DATA } from "../balance/skillBalanceData.js?v=519";
import {
  TUTORIAL_MONSTER_POOL_DATA,
  TUTORIAL_MONSTER_REWARD_LINKS,
} from "../balance/monsterCandidatePool.js?v=519";
import {
  CONTENT_BULK_PATCH_DOMAIN_DEFINITIONS,
  createContentBulkPatchAutomationPlan,
} from "./contentBulkPatchAutomationPlan.js?v=519";

export const CONTENT_BULK_PATCH_INTAKE_CONTRACT_VERSION = "content-bulk-patch-intake-contract-v1";

export const CONTENT_BULK_PATCH_BATCH_KEYS = Object.freeze(Object.fromEntries(
  CONTENT_BULK_PATCH_DOMAIN_DEFINITIONS.map((domain) => [domain.id, domain.batchKey]),
));

const CURRENT_ROWS_BY_DOMAIN = Object.freeze({
  monster: TUTORIAL_MONSTER_POOL_DATA,
  equipment_item: ITEM_BALANCE_DATA,
  loot_item: LOOT_ITEM_BALANCE_DATA,
  skill: SKILL_BALANCE_DATA,
  reward_link: TUTORIAL_MONSTER_REWARD_LINKS,
});

export function createContentBulkPatchIntakeContract() {
  const plan = createContentBulkPatchAutomationPlan();
  const domains = plan.domains.map((domain) => ({
    id: domain.id,
    batchKey: domain.batchKey,
    identityFields: domain.identityFields || ["id"],
    requiredInputFields: domain.requiredInputFields,
    checkScripts: domain.checkScripts,
    surfaces: domain.surfaces,
    currentRowCount: domain.currentRowCount,
    generatedSurfaceCount: domain.generatedSurfaceCount,
    intakeMode: "append-or-update-by-identity",
    coverageState: domain.coverageState,
  }));
  const uniqueCheckCount = new Set(domains.flatMap((domain) => domain.checkScripts)).size;

  return {
    version: CONTENT_BULK_PATCH_INTAKE_CONTRACT_VERSION,
    sourceVersion: plan.version,
    writesGameData: false,
    acceptsBatchImport: true,
    summary: {
      domainCount: domains.length,
      batchKeyCount: domains.filter((domain) => domain.batchKey).length,
      currentRowCount: plan.summary.currentRowCount,
      requiredFieldCount: domains.reduce((sum, domain) => sum + domain.requiredInputFields.length, 0),
      generatedSurfaceCount: plan.summary.generatedSurfaceCount,
      uniqueCheckCount,
      appendOrUpdateDomainCount: domains.filter((domain) => domain.intakeMode === "append-or-update-by-identity").length,
    },
    domains,
  };
}

export function createContentBulkPatchTemplate() {
  const contract = createContentBulkPatchIntakeContract();
  return {
    version: CONTENT_BULK_PATCH_INTAKE_CONTRACT_VERSION,
    ...Object.fromEntries(
      contract.domains.map((domain) => [domain.batchKey, [createTemplateRow(domain)]]),
    ),
  };
}

export function validateContentBulkPatchBatch(batch, options = {}) {
  const contract = options.contract || createContentBulkPatchIntakeContract();
  const warnOnExistingIds = options.warnOnExistingIds === true;
  const allowedKeys = new Set(["version", ...contract.domains.map((domain) => domain.batchKey)]);
  const issues = [];
  const domainResults = contract.domains.map((domain) => {
    const rows = batch && Object.hasOwn(batch, domain.batchKey) ? batch[domain.batchKey] : [];
    if (!Array.isArray(rows)) {
      issues.push(issue("error", domain.id, domain.batchKey, -1, "batch-key-must-be-array"));
      return { domainId: domain.id, batchKey: domain.batchKey, rowCount: 0, blockingIssueCount: 1, warningIssueCount: 0 };
    }

    return validateDomainRows(domain, rows, issues, { warnOnExistingIds });
  });

  for (const key of Object.keys(batch || {})) {
    if (!allowedKeys.has(key)) issues.push(issue("warning", "unknown", key, -1, "unknown-batch-key"));
  }

  const blockingIssueCount = issues.filter((entry) => entry.severity === "error").length;
  const warningIssueCount = issues.filter((entry) => entry.severity === "warning").length;
  return {
    valid: blockingIssueCount === 0,
    version: CONTENT_BULK_PATCH_INTAKE_CONTRACT_VERSION,
    summary: {
      domainCount: contract.domains.length,
      domainsWithRows: domainResults.filter((entry) => entry.rowCount > 0).length,
      rowCount: domainResults.reduce((sum, entry) => sum + entry.rowCount, 0),
      issueCount: issues.length,
      blockingIssueCount,
      warningIssueCount,
    },
    domainResults,
    issues,
  };
}

function validateDomainRows(domain, rows, issues, { warnOnExistingIds }) {
  const seenIdentities = new Set();
  const currentIdentities = warnOnExistingIds ? currentIdentitySetFor(domain) : new Set();
  let blockingIssueCount = 0;
  let warningIssueCount = 0;

  rows.forEach((row, index) => {
    if (!row || typeof row !== "object" || Array.isArray(row)) {
      issues.push(issue("error", domain.id, domain.batchKey, index, "row-must-be-object"));
      blockingIssueCount += 1;
      return;
    }

    for (const field of domain.requiredInputFields) {
      if (isMissingValue(row[field])) {
        issues.push(issue("error", domain.id, field, index, "missing-required-field"));
        blockingIssueCount += 1;
      }
    }

    const identity = identityFor(row, domain.identityFields);
    if (!identity) {
      issues.push(issue("error", domain.id, domain.identityFields.join("+"), index, "missing-identity"));
      blockingIssueCount += 1;
      return;
    }
    if (seenIdentities.has(identity)) {
      issues.push(issue("error", domain.id, identity, index, "duplicate-in-batch"));
      blockingIssueCount += 1;
      return;
    }

    seenIdentities.add(identity);
    if (currentIdentities.has(identity)) {
      issues.push(issue("warning", domain.id, identity, index, "already-exists-in-current-data"));
      warningIssueCount += 1;
    }
  });

  return {
    domainId: domain.id,
    batchKey: domain.batchKey,
    rowCount: rows.length,
    blockingIssueCount,
    warningIssueCount,
  };
}

function currentIdentitySetFor(domain) {
  return new Set((CURRENT_ROWS_BY_DOMAIN[domain.id] || [])
    .map((row) => identityFor(row, domain.identityFields))
    .filter(Boolean));
}

function identityFor(row, fields = []) {
  const parts = fields.map((field) => row?.[field]).filter((value) => !isMissingValue(value));
  return parts.length === fields.length ? parts.map(String).join("|") : "";
}

function isMissingValue(value) {
  if (value === null || value === undefined) return true;
  if (typeof value === "string") return value.trim() === "";
  return false;
}

function issue(severity, domainId, key, rowIndex, code) {
  return {
    severity,
    domainId,
    key,
    rowIndex,
    code,
  };
}

function createTemplateRow(domain) {
  return Object.fromEntries(domain.requiredInputFields.map((field) => [field, templateValueFor(domain.id, field)]));
}

function templateValueFor(domainId, field) {
  if (field === "id") return `${domainId}_sample_id`;
  if (field === "monsterId") return "monster_sample_id";
  if (field === "regionId") return "tutorial_shore";
  if (field === "level") return 1;
  if (field === "stats") return { STR: 1, AGI: 1, VIT: 1, INT: 0, WIS: 0, LUK: 0 };
  if (field === "tags") return ["sample"];
  if (field === "representativeMonsterId") return "shore_imp";
  if (field === "rewardLink") {
    return {
      codexFragmentId: "sample_codex_fragment",
      materialItemIds: ["sample_mana_fragment"],
      skillItemIds: ["sample_skill_fragment"],
    };
  }
  if (field === "slot") return "Weapon";
  if (field === "rarity") return "common";
  if (field === "attack" || field === "defense" || field === "shopPrice" || field === "mpCost" || field === "cooldown" || field === "multiplier" || field === "dropChance") return 1;
  if (field === "options") return {};
  if (field === "iconSlot") return "sample_icon";
  if (field === "type") return domainId === "loot_item" ? "codex_fragment" : "active";
  if (field === "stackable" || field === "stanceAllowed") return true;
  if (field === "recordTarget") return 5;
  if (field === "skillId") return "basic_attack";
  if (field === "dropSource") return "monster_sample_id";
  if (field === "damageType") return "physical";
  if (field === "effectType") return "slash";
  if (field === "codexFragmentId") return "sample_codex_fragment";
  if (field === "materialItemIds") return ["sample_mana_fragment"];
  if (field === "skillItemIds") return ["sample_skill_fragment"];
  return "sample";
}


