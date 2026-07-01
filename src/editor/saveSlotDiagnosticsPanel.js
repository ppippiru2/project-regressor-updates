import { renderSaveSlotDiagnosticSections } from "./saveSlotDiagnosticSectionView.js?v=681";
import { renderSaveSlotDiagnosticsShell } from "./saveSlotDiagnosticsView.js?v=681";

export const SAVE_SLOT_DIAGNOSTIC_SECTION_ORDER = Object.freeze([
  "validation-plan",
  "draft-payload",
  "draft-diff",
  "apply-gate",
  "recovery-rehearsal",
  "edit-input-schema",
  "validation-matrix",
  "rule-drilldown",
  "sample-payload",
  "validator-dry-run",
  "validator-registry",
  "validator-result-schema",
  "validator-executable-dry-run",
  "proposed-value-injector",
  "dry-run-sample-comparator",
  "sample-bridge-blocker",
  "produced-result-bridge",
  "bridge-transition",
  "validator-source-adapter",
  "selected-source-handoff",
  "adapter-runner-preflight",
  "confirmation-source-selection",
  "confirmation-input-shell",
  "confirmation-match-review",
  "submit-runner-blocker",
  "final-apply-runner-handoff",
  "apply-runner-payload",
  "payload-bridge-compatibility",
  "validator-apply-gate-bridge",
  "compatibility-confirmation-rollup",
  "validator-confirmation-preflight",
  "confirmation-input-contract",
  "confirmation-runner-handoff",
  "writer-payload-checkpoint",
  "postwrite-restore",
  "writer-enablement-risk",
]);

export function renderSaveSlotDiagnosticsPanel(options = {}) {
  const diagnostics = options.diagnostics || {};
  const sectionRenderers = options.sectionRenderers || {};
  const sections = renderSaveSlotDiagnosticSections(
    SAVE_SLOT_DIAGNOSTIC_SECTION_ORDER.map((id) => ({
      id,
      render: requireSectionRenderer(sectionRenderers, id),
    })),
    {
      diagnostics,
      statusLabel: options.statusLabel,
    },
  );

  return renderSaveSlotDiagnosticsShell({
    diagnostics,
    text: options.text || {},
    keys: options.keys || {},
    activeSlotValue: options.activeSlotValue || "",
    slotCountText: options.slotCountText || "",
    renderMetricCard: options.renderMetricCard,
    renderDiagnosticCard: options.renderDiagnosticCard,
    statusLabel: options.statusLabel,
    sections,
  });
}

function requireSectionRenderer(sectionRenderers, id) {
  const renderer = sectionRenderers?.[id];
  if (typeof renderer === "function") return renderer;
  return () => {
    throw new Error(`Missing save diagnostics section renderer: ${id}`);
  };
}
