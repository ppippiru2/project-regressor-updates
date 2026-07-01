import { tf } from "../localization/index.js?v=677";

export async function fetchEditorJson(url, options = {}) {
  const fetchRef = options.fetchRef || fetch;
  const response = await fetchRef(url, { cache: "no-store" });
  if (!response.ok) {
    throw new Error(tf("editorPrep.loadFailed", { url, status: response.status }));
  }
  return response.json();
}
