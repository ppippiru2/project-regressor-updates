import { setElementText } from "./editorDomText.js?v=676";

export function renderEditorErrorPanel(elements, options = {}) {
  const text = options.text || {};
  const error = options.error;
  setElementText(elements?.summaryTitle, text.errorTitle);
  setElementText(elements?.summaryCopy, error?.message || text.unknownError);
  if (elements?.metrics) elements.metrics.innerHTML = "";
}
