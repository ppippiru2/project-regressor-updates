import {
  COMBAT_VFX_PREVIEW_EFFECT_TYPES,
  createCombatVfxPlacementPreview,
} from "./combatVfxPlacementPreview.js?v=560";
import {
  MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE,
  MONSTER_EFFECT_TYPE_PLACEMENT_MODIFIERS_BY_MOTION_PROFILE,
} from "../config/monsterBattleSpritePresets.js?v=560";
import { createStagedContractSummary } from "./contentBulkStagedContractSummary.js?v=560";

export const RUNTIME_VFX_BULK_INTAKE_PREVIEW_VERSION = "runtime-vfx-bulk-intake-preview-v1";

export const RUNTIME_VFX_BULK_INTAKE_ALIASES = Object.freeze([
  "runtimeVfxPlacements",
  "vfxPlacements",
  "monsterVfxPlacements",
  "monsterEffectPlacements",
  "motionProfileVfxPlacements",
  "effectPlacementPresets",
]);

const PACKAGE_ROOT_KEYS = Object.freeze(["content", "data", "payload", "batch"]);

const REQUIRED_CHECKS = Object.freeze([
  "build-scripts/check-combat-vfx-placement-preview.mjs",
  "build-scripts/check-monster-combat-display-slots.mjs",
]);

const DEFAULT_PROFILE_PLACEMENT = Object.freeze({
  offsetX: 0,
  offsetY: 0,
  textOffsetY: 0,
  slashWidth: 136,
  slashHeight: "34%",
  expandedSlashWidth: 190,
  expandedSlashHeight: "44%",
});

const DEFAULT_MODIFIER = Object.freeze({
  offsetX: 0,
  offsetY: 0,
  textOffsetY: 0,
  slashWidthMultiplier: 1,
  expandedSlashWidthMultiplier: 1,
});

export function createRuntimeVfxBulkIntakeTemplate() {
  return {
    version: RUNTIME_VFX_BULK_INTAKE_PREVIEW_VERSION,
    runtimeVfxPlacements: [
      {
        motionProfile: "small_fiend_runtime",
        sourceMonsterId: "shore_imp",
        placement: {
          offsetX: -4,
          offsetY: -11,
          textOffsetY: -6,
          slashWidth: 112,
          slashHeight: "24%",
          expandedSlashWidth: 165,
          expandedSlashHeight: "34%",
        },
      },
      {
        motionProfile: "small_fiend_runtime",
        effectType: "dark",
        sourceMonsterId: "shore_imp",
        modifier: {
          offsetX: -1,
          offsetY: -5,
          textOffsetY: -2,
          slashWidthMultiplier: 1.08,
          expandedSlashWidthMultiplier: 1.07,
        },
      },
    ],
  };
}

export function createRuntimeVfxBulkIntakePreview(
  packageData = createRuntimeVfxBulkIntakeTemplate(),
  combatPreview = createCombatVfxPlacementPreview(),
) {
  const collected = collectRuntimeVfxRows(packageData);
  const rows = collected.rows.map((row, index) => createRuntimeVfxPreviewRow(row, index, combatPreview));
  const readyRows = rows.filter((row) => row.intakeState.startsWith("ready-"));
  const blockedRows = rows.filter((row) => row.intakeState.startsWith("blocked-"));
  const warningRows = rows.filter((row) => row.intakeState.startsWith("review-"));
  const profileRows = rows.filter((row) => row.kind === "profile-placement");
  const modifierRows = rows.filter((row) => row.kind === "effect-modifier");
  const stagedContract = createStagedContractSummary(createRuntimeVfxStagedContractAdapter(rows), ["runtime_vfx"]);

  return {
    version: RUNTIME_VFX_BULK_INTAKE_PREVIEW_VERSION,
    writesGameData: false,
    requiresExplicitApply: true,
    requiresManualReview: true,
    packageKeys: RUNTIME_VFX_BULK_INTAKE_ALIASES,
    requiredChecks: [...REQUIRED_CHECKS],
    sourceKeys: collected.sourceKeys,
    summary: {
      sourceKeyCount: collected.sourceKeys.length,
      packageRowCount: rows.length,
      profilePlacementRowCount: profileRows.length,
      effectModifierRowCount: modifierRows.length,
      updateCandidateCount: rows.filter((row) => row.bulkState === "staged-update").length,
      appendCandidateCount: rows.filter((row) => row.bulkState === "staged-append").length,
      readyRowCount: readyRows.length,
      warningRowCount: warningRows.length,
      blockedRowCount: blockedRows.length,
      contractStagedRowCount: stagedContract.summary.stagedRowCount,
      contractBlockedRowCount: stagedContract.summary.blockedRowCount,
      contractWarningRowCount: stagedContract.summary.warningRowCount,
      contractTargetSurfaceCount: stagedContract.summary.targetSurfaceCount,
      tuningSignalRowCount: rows.filter((row) => row.signals.length).length,
      currentMotionProfileCount: Object.keys(MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE).length,
      currentModifierProfileCount: Object.keys(MONSTER_EFFECT_TYPE_PLACEMENT_MODIFIERS_BY_MOTION_PROFILE).length,
      requiredCheckCount: REQUIRED_CHECKS.length,
    },
    rows,
    stagedContract,
    guard: {
      actualWritesDisabled: true,
      appliesAfterExplicitReview: true,
      keepsRuntimeSpritesSeparate: true,
      validatesPlacementBeforePatch: true,
    },
  };
}

function createRuntimeVfxStagedContractAdapter(rows = []) {
  const contractRows = rows.map((row) => ({
    state: row.blockingIssueCodes?.length ? "withheld-blocked" : row.bulkState,
    identity: row.effectType ? `${row.motionProfile}:${row.effectType}` : row.motionProfile,
    targetSurface: row.targetSurface,
    targetSurfaceCount: Number(row.targetSurfaceCount || 0),
    blockingIssueCodes: Array.from(row.blockingIssueCodes || []),
    warningIssueCodes: Array.from(row.warningIssueCodes || []),
  }));
  const blockedRows = contractRows.filter((row) => row.state === "withheld-blocked");
  const stagedRows = contractRows.filter((row) => String(row.state || "").startsWith("staged-"));
  const warningRows = contractRows.filter((row) => row.warningIssueCodes.length);

  return {
    stagedImport: {
      version: RUNTIME_VFX_BULK_INTAKE_PREVIEW_VERSION,
      sourceVersion: RUNTIME_VFX_BULK_INTAKE_PREVIEW_VERSION,
      requiresExplicitApply: true,
      domains: [
        {
          id: "runtime_vfx",
          batchKey: "runtime_vfx",
          state: runtimeVfxContractDomainState({ rows: contractRows, blockedRows, stagedRows, warningRows }),
          rows: contractRows,
          generatedSurfaceCount: 0,
          checkScripts: REQUIRED_CHECKS,
        },
      ],
    },
  };
}

function runtimeVfxContractDomainState({ rows, blockedRows, stagedRows, warningRows }) {
  if (!rows.length) return "empty";
  if (blockedRows.length && stagedRows.length) return "partial";
  if (blockedRows.length) return "blocked";
  if (warningRows.length) return "ready-with-warnings";
  return "ready";
}

function collectRuntimeVfxRows(packageData = {}) {
  const roots = collectSourceRoots(packageData);
  const sourceKeys = new Set();
  const rows = [];
  for (const root of roots) {
    for (const alias of RUNTIME_VFX_BULK_INTAKE_ALIASES) {
      if (!Array.isArray(root?.[alias])) continue;
      sourceKeys.add(alias);
      rows.push(...root[alias].flatMap((row) => expandRuntimeVfxRow(row, alias)));
    }
  }
  return {
    sourceKeys: [...sourceKeys],
    rows,
  };
}

function expandRuntimeVfxRow(row, sourceKey) {
  if (!row || typeof row !== "object" || Array.isArray(row)) return [{ __sourceKey: sourceKey }];
  const hasBasePlacement = isObjectRecord(row.placement) || isObjectRecord(row.effectPlacement) || isObjectRecord(row.basePlacement);
  const hasExplicitEffect = Boolean(firstValue(row.effectType, row.effect, row.effectId));
  const hasModifierMap = isObjectRecord(row.modifiers);
  const expanded = hasBasePlacement || hasExplicitEffect || !hasModifierMap
    ? [{ ...row, __sourceKey: sourceKey }]
    : [];
  if (row.modifiers && typeof row.modifiers === "object" && !Array.isArray(row.modifiers)) {
    for (const [effectType, modifier] of Object.entries(row.modifiers)) {
      expanded.push({
        ...row,
        placement: undefined,
        modifier,
        modifiers: undefined,
        effectType,
        __sourceKey: sourceKey,
      });
    }
  }
  return expanded;
}

function createRuntimeVfxPreviewRow(row, rowIndex, combatPreview) {
  const motionProfile = firstValue(row.motionProfile, row.profileId, row.runtimeMotionProfile, row.id);
  const effectType = normalizeEffectType(firstValue(row.effectType, row.effect, row.effectId));
  const kind = effectType ? "effect-modifier" : "profile-placement";
  const currentProfilePlacement = MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE[motionProfile];
  const currentModifier = MONSTER_EFFECT_TYPE_PLACEMENT_MODIFIERS_BY_MOTION_PROFILE[motionProfile]?.[effectType];
  const placement = kind === "profile-placement"
    ? normalizePlacement(firstObject(row.placement, row.effectPlacement, row.basePlacement, row), currentProfilePlacement || DEFAULT_PROFILE_PLACEMENT)
    : null;
  const modifier = kind === "effect-modifier"
    ? normalizeModifier(firstObject(row.modifier, row.effectModifier, row), currentModifier || DEFAULT_MODIFIER)
    : null;
  const issues = [
    ...identityIssues({ motionProfile, effectType, kind }),
    ...(kind === "profile-placement" ? placementIssues(placement) : modifierIssues(modifier)),
  ];
  const signals = kind === "profile-placement" ? placementTuningSignals(placement) : modifierTuningSignals(modifier);
  const existing = kind === "profile-placement" ? Boolean(currentProfilePlacement) : Boolean(currentModifier);
  const profileMonsterCount = countMonstersForMotionProfile(combatPreview, motionProfile);
  const blockingIssueCodes = Array.from(issues);
  const warningIssueCodes = runtimeVfxWarningIssueCodes({ kind, existing, signals, blockingIssueCodes });

  return {
    rowIndex,
    sourceKey: row.__sourceKey || "",
    motionProfile,
    effectType,
    kind,
    sourceMonsterId: firstValue(row.sourceMonsterId, row.monsterId, row.enemyId),
    targetSurface: kind === "profile-placement"
      ? `MONSTER_EFFECT_PLACEMENTS_BY_MOTION_PROFILE.${motionProfile || "unknown"}`
      : `MONSTER_EFFECT_TYPE_PLACEMENT_MODIFIERS_BY_MOTION_PROFILE.${motionProfile || "unknown"}.${effectType || "unknown"}`,
    placement,
    modifier,
    currentPlacement: summarizeCurrentPlacement(currentProfilePlacement),
    currentModifier: summarizeCurrentModifier(currentModifier),
    profileMonsterCount,
    bulkState: existing ? "staged-update" : "staged-append",
    targetSurfaceCount: blockingIssueCodes.length ? 0 : 1,
    blockingIssueCodes,
    warningIssueCodes,
    intakeState: runtimeVfxIntakeState({ motionProfile, effectType, kind, issues, existing, signals }),
    issues,
    signals,
  };
}

function collectSourceRoots(packageData) {
  const roots = [packageData].filter(isObjectRecord);
  for (const key of PACKAGE_ROOT_KEYS) {
    if (isObjectRecord(packageData?.[key])) roots.push(packageData[key]);
  }
  return roots;
}

function identityIssues({ motionProfile, effectType, kind }) {
  const issues = [];
  if (!motionProfile) issues.push("missing-motion-profile");
  if (kind === "effect-modifier" && !effectType) issues.push("missing-effect-type");
  if (effectType && !COMBAT_VFX_PREVIEW_EFFECT_TYPES.includes(effectType)) issues.push("unknown-effect-type");
  return issues;
}

function placementIssues(placement = {}) {
  const issues = [];
  for (const key of ["offsetX", "offsetY", "textOffsetY", "slashWidth", "expandedSlashWidth"]) {
    if (!Number.isFinite(Number(placement[key]))) issues.push(`${key}-not-finite`);
  }
  if (Number(placement.slashWidth) < 80 || Number(placement.slashWidth) > 260) issues.push("slash-width-out-of-range");
  if (Number(placement.expandedSlashWidth) < 150 || Number(placement.expandedSlashWidth) > 320) issues.push("expanded-slash-width-out-of-range");
  if (!isCardPercentLength(placement.slashHeight)) issues.push("slash-height-must-use-card-percent");
  if (!isCardPercentLength(placement.expandedSlashHeight)) issues.push("expanded-slash-height-must-use-card-percent");
  return issues;
}

function modifierIssues(modifier = {}) {
  const issues = [];
  for (const key of ["offsetX", "offsetY", "textOffsetY", "slashWidthMultiplier", "expandedSlashWidthMultiplier"]) {
    if (!Number.isFinite(Number(modifier[key]))) issues.push(`${key}-not-finite`);
  }
  if (Math.abs(Number(modifier.offsetX || 0)) > 18) issues.push("modifier-offset-x-too-large");
  if (Math.abs(Number(modifier.offsetY || 0)) > 18) issues.push("modifier-offset-y-too-large");
  if (Math.abs(Number(modifier.textOffsetY || 0)) > 12) issues.push("modifier-text-offset-too-large");
  if (Number(modifier.slashWidthMultiplier || 0) < 0.75 || Number(modifier.slashWidthMultiplier || 0) > 1.3) issues.push("slash-multiplier-out-of-range");
  if (Number(modifier.expandedSlashWidthMultiplier || 0) < 0.75 || Number(modifier.expandedSlashWidthMultiplier || 0) > 1.3) issues.push("expanded-slash-multiplier-out-of-range");
  return issues;
}

function runtimeVfxIntakeState({ motionProfile, effectType, kind, issues, existing, signals }) {
  if (!motionProfile) return "blocked-missing-motion-profile";
  if (effectType && !COMBAT_VFX_PREVIEW_EFFECT_TYPES.includes(effectType)) return "blocked-unknown-effect-type";
  if (issues.length) return "blocked-invalid-placement";
  if (!existing && kind === "profile-placement") return "review-new-motion-profile";
  if (!existing && kind === "effect-modifier") return "review-new-effect-modifier";
  if (signals.length) return "review-tuning-signal";
  return kind === "profile-placement" ? "ready-profile-update" : "ready-effect-modifier-update";
}

function runtimeVfxWarningIssueCodes({ kind, existing, signals, blockingIssueCodes }) {
  if (blockingIssueCodes.length) return [];
  const warnings = Array.from(signals || []);
  if (!existing && kind === "profile-placement") warnings.unshift("review-new-motion-profile");
  if (!existing && kind === "effect-modifier") warnings.unshift("review-new-effect-modifier");
  return Array.from(new Set(warnings.filter(Boolean)));
}

function normalizePlacement(value = {}, fallback = DEFAULT_PROFILE_PLACEMENT) {
  return {
    offsetX: numericValue(value.offsetX, fallback.offsetX, 0),
    offsetY: numericValue(value.offsetY, fallback.offsetY, 0),
    textOffsetY: numericValue(value.textOffsetY, fallback.textOffsetY, 0),
    slashWidth: numericValue(value.slashWidth, fallback.slashWidth, DEFAULT_PROFILE_PLACEMENT.slashWidth),
    slashHeight: firstValue(value.slashHeight, fallback.slashHeight, DEFAULT_PROFILE_PLACEMENT.slashHeight),
    expandedSlashWidth: numericValue(value.expandedSlashWidth, fallback.expandedSlashWidth, DEFAULT_PROFILE_PLACEMENT.expandedSlashWidth),
    expandedSlashHeight: firstValue(value.expandedSlashHeight, fallback.expandedSlashHeight, DEFAULT_PROFILE_PLACEMENT.expandedSlashHeight),
  };
}

function normalizeModifier(value = {}, fallback = DEFAULT_MODIFIER) {
  return {
    offsetX: numericValue(value.offsetX, fallback.offsetX, 0),
    offsetY: numericValue(value.offsetY, fallback.offsetY, 0),
    textOffsetY: numericValue(value.textOffsetY, fallback.textOffsetY, 0),
    slashWidthMultiplier: numericValue(value.slashWidthMultiplier, value.slashMultiplier, fallback.slashWidthMultiplier, 1),
    expandedSlashWidthMultiplier: numericValue(value.expandedSlashWidthMultiplier, value.expandedSlashMultiplier, fallback.expandedSlashWidthMultiplier, 1),
  };
}

function summarizeCurrentPlacement(placement) {
  return placement ? normalizePlacement(placement, DEFAULT_PROFILE_PLACEMENT) : null;
}

function summarizeCurrentModifier(modifier) {
  return modifier ? normalizeModifier(modifier, DEFAULT_MODIFIER) : null;
}

function placementTuningSignals(placement = {}) {
  const signals = [];
  if (Number(placement.expandedSlashWidth || 0) >= 400) signals.push("expanded-width-critical");
  else if (Number(placement.expandedSlashWidth || 0) >= 380) signals.push("expanded-width-wide");
  if (Number(placement.slashWidth || 0) >= 230) signals.push("slash-width-wide");
  if (Math.abs(Number(placement.offsetY || 0)) >= 12) signals.push("vertical-offset-high");
  if (Math.abs(Number(placement.offsetX || 0)) >= 12) signals.push("horizontal-offset-high");
  if (Math.abs(Number(placement.textOffsetY || 0)) >= 8) signals.push("text-offset-high");
  return signals;
}

function modifierTuningSignals(modifier = {}) {
  const signals = [];
  if (Math.abs(Number(modifier.offsetY || 0)) >= 8) signals.push("vertical-offset-high");
  if (Math.abs(Number(modifier.offsetX || 0)) >= 8) signals.push("horizontal-offset-high");
  if (Math.abs(Number(modifier.textOffsetY || 0)) >= 5) signals.push("text-offset-high");
  if (Number(modifier.slashWidthMultiplier || 1) >= 1.15) signals.push("slash-width-wide");
  if (Number(modifier.expandedSlashWidthMultiplier || 1) >= 1.15) signals.push("expanded-width-wide");
  return signals;
}

function countMonstersForMotionProfile(combatPreview, motionProfile) {
  if (!motionProfile) return 0;
  const profileRow = (combatPreview?.monsterMotionProfileRows || []).find((row) => row.motionProfile === motionProfile);
  return Number(profileRow?.monsterCount || 0);
}

function normalizeEffectType(effectType) {
  return String(effectType || "").trim();
}

function firstObject(...values) {
  for (const value of values) {
    if (isObjectRecord(value)) return value;
  }
  return {};
}

function firstValue(...values) {
  for (const value of values) {
    if (value === null || value === undefined) continue;
    if (typeof value === "string" && value.trim() === "") continue;
    return value;
  }
  return "";
}

function numericValue(...values) {
  for (const value of values) {
    if (typeof value === "number" && Number.isFinite(value)) return value;
    if (typeof value === "string" && value.trim() !== "" && Number.isFinite(Number(value))) return Number(value);
  }
  return 0;
}

function isCardPercentLength(value) {
  return /^-?\d*\.?\d+%$/.test(String(value || "").trim());
}

function isObjectRecord(value) {
  return Boolean(value) && typeof value === "object" && !Array.isArray(value);
}


