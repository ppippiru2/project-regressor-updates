export function createJsonDownloadText(data) {
  return JSON.stringify(data, null, 2);
}

export function downloadJson(fileName, data, options = {}) {
  const documentRef = options.documentRef || document;
  const urlApi = options.urlApi || URL;
  const BlobCtor = options.BlobCtor || Blob;
  const text = createJsonDownloadText(data);
  const blob = new BlobCtor([text], { type: "application/json" });
  const url = urlApi.createObjectURL(blob);
  const link = documentRef.createElement("a");
  link.href = url;
  link.download = fileName;
  documentRef.body.appendChild(link);
  link.click();
  link.remove();
  urlApi.revokeObjectURL(url);
  return { fileName, text, url };
}
