import { renderEditorMetricCard } from "./editorMetricView.js?v=681";

export function renderEditorSummaryMetrics(options = {}) {
  const manifest = options.manifest || {};
  const backlog = options.backlog || {};
  const text = options.text || {};
  const metrics = text.metrics || {};
  const translate = typeof options.translate === "function" ? options.translate : defaultTranslate;
  const retargetPreview = options.retargetPreview || { counts: {} };
  const balanceGroups = Array.isArray(options.balanceGroups) ? options.balanceGroups : [];
  const combatVfxPreview = options.combatVfxPreview || {};
  const combatVfxText = options.combatVfxText || {};

  return [
    localizedMetricCard("panel", manifest.panels?.length || 0, { metrics, translate }),
    localizedMetricCard("imageSlot", manifest.assetSlots?.image?.length || 0, { metrics, translate }),
    localizedMetricCard("audioSlot", manifest.assetSlots?.audio?.length || 0, { metrics, translate }),
    localizedMetricCard("backlog", backlog.items?.length || 0, { metrics, translate }),
    retargetPreviewMetricCard(retargetPreview, { manifest, metrics, translate }),
    balanceRegistryMetricCard({ manifest, metrics, translate, balanceGroups }),
    combatVfxPlacementMetricCard({ manifest, metrics, translate, combatVfxPreview, combatVfxText }),
  ].join("");
}

function localizedMetricCard(key, count, options = {}) {
  const metric = options.metrics[key] || {};
  return renderEditorMetricCard(
    metric.label || key,
    options.translate(`editorPrep.metrics.${key}.value`, { count }, String(count)),
    metric.hint || ""
  );
}

function retargetPreviewMetricCard(preview, options = {}) {
  const metric = options.metrics.themeRetargetPreview || {};
  const manifestPreview = options.manifest.themeRetargetPreview || {};
  const expectedText = Number(manifestPreview.expectedTextOverrides || 0);
  const expectedAssets = Number(manifestPreview.expectedAssetOverrides || 0);
  const expectedMatches =
    (!expectedText || expectedText === preview.counts.textOverrides) &&
    (!expectedAssets || expectedAssets === preview.counts.assetOverrides);
  const ready = preview.isComplete && expectedMatches;
  return renderEditorMetricCard(
    metric.label || "Theme Preview",
    options.translate("editorPrep.metrics.themeRetargetPreview.value", {
      textCount: preview.counts.textOverrides,
      assetCount: preview.counts.assetOverrides,
    }, `${preview.counts.textOverrides}/${preview.counts.assetOverrides}`),
    ready
      ? (metric.readyHint || "")
      : options.translate("editorPrep.metrics.themeRetargetPreview.reviewHint", {
          missingText: preview.counts.missingTextTargets,
          missingAssets: preview.counts.missingAssetTargets,
          mismatchedAssets: preview.counts.mismatchedAssetTargets,
        }, metric.hint || "")
  );
}

function balanceRegistryMetricCard(options = {}) {
  const metric = options.metrics.balanceTuningRegistry || {};
  const manifestRegistry = options.manifest.balanceTuningRegistry || {};
  const balanceGroups = options.balanceGroups || [];
  const groupCount = balanceGroups.length;
  const fileCount = new Set(balanceGroups.flatMap((group) => group.files)).size;
  const exportCount = balanceGroups.reduce((sum, group) => sum + group.exports.length, 0);
  const expectedMatches =
    (!manifestRegistry.expectedGroupCount || manifestRegistry.expectedGroupCount === groupCount) &&
    (!manifestRegistry.expectedFileCount || manifestRegistry.expectedFileCount === fileCount) &&
    (!manifestRegistry.expectedExportCount || manifestRegistry.expectedExportCount === exportCount);
  return renderEditorMetricCard(
    metric.label || "Balance Registry",
    options.translate("editorPrep.metrics.balanceTuningRegistry.value", {
      groupCount,
      fileCount,
    }, `${groupCount}/${fileCount}`),
    expectedMatches
      ? options.translate("editorPrep.metrics.balanceTuningRegistry.readyHint", {
          exportCount,
        }, metric.readyHint || "")
      : options.translate("editorPrep.metrics.balanceTuningRegistry.reviewHint", {
          exportCount,
        }, metric.hint || "")
  );
}

function combatVfxPlacementMetricCard(options = {}) {
  const metric = options.metrics?.combatVfxPlacementPreview || {};
  const manifestPreview = options.manifest.combatVfxPlacementPreview || {};
  const totals = options.combatVfxPreview.totals || {};
  const playerRows = Number(totals.playerRows || 0);
  const monsterRows = Number(totals.monsterRows || 0);
  const effectTypes = Number(totals.effectTypes || 0);
  const monsterMotionProfiles = Number(totals.monsterMotionProfiles || 0);
  const expectedMatches =
    (!manifestPreview.expectedPlayerRows || manifestPreview.expectedPlayerRows === playerRows) &&
    (!manifestPreview.expectedMonsterRows || manifestPreview.expectedMonsterRows === monsterRows) &&
    (!manifestPreview.expectedEffectTypes || manifestPreview.expectedEffectTypes === effectTypes) &&
    (!manifestPreview.expectedMonsterMotionProfiles || manifestPreview.expectedMonsterMotionProfiles === monsterMotionProfiles);
  return renderEditorMetricCard(
    metric.label || options.combatVfxText.metricLabel,
    options.translate("editorPrep.metrics.combatVfxPlacementPreview.value", {
      playerRows,
      monsterRows,
    }, options.combatVfxText.metricValue),
    expectedMatches
      ? (metric.readyHint || options.combatVfxText.metricHint)
      : options.translate("editorPrep.metrics.combatVfxPlacementPreview.reviewHint", {
          effectTypes,
        }, metric.hint || "")
  );
}

function defaultTranslate(_key, _values, fallback = "") {
  return fallback;
}
