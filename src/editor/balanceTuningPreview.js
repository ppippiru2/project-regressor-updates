import * as combatBalance from "../balance/combatBalance.js?v=441";
import * as damageBalance from "../balance/damageBalance.js?v=441";
import * as equipmentValueBalance from "../balance/equipmentValueBalance.js?v=441";
import * as itemBalanceData from "../balance/itemBalanceData.js?v=441";
import * as monsterBalanceData from "../balance/monsterBalanceData.js?v=441";
import * as monsterCandidatePool from "../balance/monsterCandidatePool.js?v=441";
import * as monsterStatBalance from "../balance/monsterStatBalance.js?v=441";
import * as playerGrowthBalance from "../balance/playerGrowthBalance.js?v=441";
import * as playerStatBalance from "../balance/playerStatBalance.js?v=441";
import * as recoveryBalance from "../balance/recoveryBalance.js?v=441";
import * as rewardBalance from "../balance/rewardBalance.js?v=441";
import * as skillBalanceData from "../balance/skillBalanceData.js?v=441";

const BALANCE_MODULE_BY_FILE = new Map([
  ["src/balance/combatBalance.js", combatBalance],
  ["src/balance/damageBalance.js", damageBalance],
  ["src/balance/equipmentValueBalance.js", equipmentValueBalance],
  ["src/balance/itemBalanceData.js", itemBalanceData],
  ["src/balance/monsterBalanceData.js", monsterBalanceData],
  ["src/balance/monsterCandidatePool.js", monsterCandidatePool],
  ["src/balance/monsterStatBalance.js", monsterStatBalance],
  ["src/balance/playerGrowthBalance.js", playerGrowthBalance],
  ["src/balance/playerStatBalance.js", playerStatBalance],
  ["src/balance/recoveryBalance.js", recoveryBalance],
  ["src/balance/rewardBalance.js", rewardBalance],
  ["src/balance/skillBalanceData.js", skillBalanceData],
]);

export function createBalanceTuningPreviewRows(groups = []) {
  return groups.map((group) => ({
    id: group.id,
    scope: group.scope,
    items: group.exports.map((exportName) => createExportPreview(group.files, exportName)),
  }));
}

function createExportPreview(files = [], exportName) {
  const value = resolveBalanceExport(files, exportName);
  return {
    exportName,
    ...summarizeBalanceExportValue(value),
  };
}

function resolveBalanceExport(files = [], exportName) {
  for (const file of files) {
    const sourceModule = BALANCE_MODULE_BY_FILE.get(file);
    if (sourceModule && Object.hasOwn(sourceModule, exportName)) {
      return sourceModule[exportName];
    }
  }
  return undefined;
}

export function summarizeBalanceExportValue(value) {
  if (value === undefined) return { type: "missing", value: "" };
  if (value === null) return { type: "null", value: "null" };
  if (Array.isArray(value)) {
    return {
      type: "array",
      count: value.length,
      sample: value.slice(0, 3).map(sampleArrayItem).filter(Boolean),
    };
  }
  if (typeof value === "object") {
    const keys = Object.keys(value);
    return {
      type: "object",
      count: keys.length,
      sample: keys.slice(0, 3),
    };
  }
  return {
    type: typeof value,
    value: String(value),
  };
}

function sampleArrayItem(item) {
  if (item && typeof item === "object") {
    return item.id || item.rank || item.slot || Object.keys(item)[0] || "";
  }
  return String(item ?? "");
}

