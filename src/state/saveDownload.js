export function downloadSavePayload(payloadText, { filename = saveFileName(), documentRef = document, urlApi = URL } = {}) {
  const blob = new Blob([payloadText], { type: "application/json" });
  const url = urlApi.createObjectURL(blob);
  const anchor = documentRef.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.hidden = true;
  documentRef.body.append(anchor);
  anchor.click();
  anchor.remove();
  setTimeout(() => urlApi.revokeObjectURL(url), 0);
  return filename;
}

export function saveFileName(now = new Date()) {
  return `project-regressor-save-${now.toISOString().slice(0, 10)}.json`;
}
