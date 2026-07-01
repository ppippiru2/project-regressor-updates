import { renderSaveSlotEditWriterPayloadCheckpointView } from "./saveSlotEditWriterPayloadCheckpointView.js?v=675";

export function createSaveSlotEditWriterPayloadCheckpointRenderer(options = {}) {
  return function renderSaveSlotEditWriterPayloadCheckpointPreview(diagnostics) {
    const text = options.text || {};
    const translate = typeof options.translate === "function" ? options.translate : (_path, _values, fallback) => fallback;
    const createReview = typeof options.createReview === "function" ? options.createReview : () => ({});
    const review = createReview(diagnostics);
    return renderSaveSlotEditWriterPayloadCheckpointView({
      review,
      text,
      metricCard: options.metricCard,
      statusLabel: options.statusLabel,
      targetValue: translate(
        "editorPrep.saveEditWriterPayloadCheckpoint.targetValue",
        { count: review.targetCount },
        `${review.targetCount}`,
      ),
      checkValue: translate(
        "editorPrep.saveEditWriterPayloadCheckpoint.checkValue",
        { count: review.checkCount },
        `${review.checkCount}`,
      ),
      blockedValue: translate(
        "editorPrep.saveEditWriterPayloadCheckpoint.blockedValue",
        { count: review.blockedCheckCount },
        `${review.blockedCheckCount}`,
      ),
      blockerFormatter: (blocker) => translate(
        "editorPrep.saveEditWriterPayloadCheckpoint.blockerText",
        { blocker },
        `${text.blocker || "Blocker"}: ${blocker}`,
      ),
    });
  };
}
