import { createMurimRetargetPreview } from "../ui/renderRetargetPreview.js?v=679";
import { renderEditorSummaryMetrics } from "./editorSummaryMetrics.js?v=679";
import { setElementText } from "./editorDomText.js?v=679";

export function renderEditorSummaryPanel(elements, options = {}) {
  const text = options.text || {};
  const createRetargetPreview = options.createRetargetPreview || createMurimRetargetPreview;
  const renderMetrics = options.renderMetrics || renderEditorSummaryMetrics;
  const retargetPreview = createRetargetPreview();

  setElementText(elements?.summaryTitle, text.summaryTitle);
  setElementText(elements?.summaryCopy, text.summaryCopy);

  if (!elements?.metrics) return "";
  const html = renderMetrics({
    manifest: options.manifest || {},
    backlog: options.backlog || {},
    text,
    translate: options.translate,
    retargetPreview,
    balanceGroups: options.balanceGroups || [],
    combatVfxPreview: options.combatVfxPreview || {},
    combatVfxText: options.combatVfxText || {},
  });
  elements.metrics.innerHTML = html;
  return html;
}
