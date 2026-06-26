export function buildContentRetargetPreview({
  sampleProfile,
  textSample,
  assetSample,
  sourceProfile,
  targetProfile,
  mappingTemplate,
  resolveText = defaultResolveText,
} = {}) {
  const textOverrides = Object.entries(textSample || {}).map(([sourcePath, targetTextPath]) => {
    const sourceText = resolveText(sourcePath, "");
    const targetText = resolveText(targetTextPath, "");
    return {
      sourcePath,
      sourceText,
      targetTextPath,
      targetText,
      hasSourceText: sourceText.length > 0,
      hasTargetText: targetText.length > 0,
    };
  });

  const assetOverrides = Object.entries(assetSample || {}).map(([sourceAssetId, sample]) => ({
    sourceAssetId,
    targetAssetId: sample?.targetAssetId || "",
    plannedSourceFile: sample?.plannedSourceFile || "",
    plannedWebpFile: sample?.plannedWebpFile || null,
    slotPaths: Array.isArray(sample?.slotPaths) ? [...sample.slotPaths] : [],
    mappedTargetAssetId: mappingTemplate?.maps?.assetIds?.[sourceAssetId] || "",
  }));

  const missingTextTargets = textOverrides.filter((entry) => !entry.hasTargetText).map((entry) => entry.targetTextPath);
  const missingAssetTargets = assetOverrides.filter((entry) => !entry.targetAssetId).map((entry) => entry.sourceAssetId);
  const mismatchedAssetTargets = assetOverrides
    .filter((entry) => entry.mappedTargetAssetId && entry.targetAssetId !== entry.mappedTargetAssetId)
    .map((entry) => entry.sourceAssetId);

  return {
    id: sampleProfile?.id || "",
    sourceProfileId: sampleProfile?.sourceProfileId || sourceProfile?.id || "",
    targetProfileId: sampleProfile?.targetProfileId || targetProfile?.id || "",
    sourceProfileTitle: sourceProfile?.title || "",
    targetProfileTitle: targetProfile?.title || "",
    mappingTemplateId: mappingTemplate?.id || "",
    titleTextPath: sampleProfile?.titleTextPath || "",
    title: resolveText(sampleProfile?.titleTextPath, sampleProfile?.id || ""),
    descriptionTextPath: sampleProfile?.descriptionTextPath || "",
    description: resolveText(sampleProfile?.descriptionTextPath, ""),
    counts: {
      textOverrides: textOverrides.length,
      assetOverrides: assetOverrides.length,
      missingTextTargets: missingTextTargets.length,
      missingAssetTargets: missingAssetTargets.length,
      mismatchedAssetTargets: mismatchedAssetTargets.length,
    },
    isComplete: missingTextTargets.length === 0 && missingAssetTargets.length === 0 && mismatchedAssetTargets.length === 0,
    missingTextTargets,
    missingAssetTargets,
    mismatchedAssetTargets,
    textOverrides,
    assetOverrides,
  };
}

export function createDictionaryTextResolver(dictionary) {
  return (path, fallback = "") => {
    const value = valueAtPath(dictionary, path);
    return typeof value === "string" ? value : fallback;
  };
}

export function valueAtPath(source, pathValue) {
  return String(pathValue || "")
    .split(".")
    .reduce((current, key) => {
      if (!current || typeof current !== "object") return undefined;
      return current[key];
    }, source);
}

function defaultResolveText(path, fallback = "") {
  return fallback;
}
