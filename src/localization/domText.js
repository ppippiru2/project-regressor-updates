import { t } from "./index.js?v=527";

export function applyDomLocalization(root = document) {
  if (!root || typeof root.querySelectorAll !== "function") return;
  localizeTextNodes(root);
  localizeValueNodes(root);
  localizeAttributeNodes(root);
}

function localizeTextNodes(root) {
  collectNodes(root, "[data-i18n]").forEach((node) => {
    const key = node.getAttribute("data-i18n");
    if (!key) return;
    node.textContent = t(key, node.textContent || "");
  });
}

function localizeValueNodes(root) {
  collectNodes(root, "[data-i18n-value]").forEach((node) => {
    const key = node.getAttribute("data-i18n-value");
    if (!key) return;
    node.value = t(key, node.value || "");
  });
}

function localizeAttributeNodes(root) {
  collectNodes(root, "[data-i18n-attr]").forEach((node) => {
    parseAttributeMap(node.getAttribute("data-i18n-attr")).forEach(({ attribute, key }) => {
      if (!attribute || !key) return;
      node.setAttribute(attribute, t(key, node.getAttribute(attribute) || ""));
    });
  });
}

function collectNodes(root, selector) {
  const nodes = Array.from(root.querySelectorAll(selector));
  if (typeof root.matches === "function" && root.matches(selector)) nodes.unshift(root);
  return nodes;
}

function parseAttributeMap(value) {
  return String(value || "")
    .split(";")
    .map((entry) => {
      const [attribute, key] = entry.split(":");
      return {
        attribute: String(attribute || "").trim(),
        key: String(key || "").trim(),
      };
    })
    .filter((entry) => entry.attribute && entry.key);
}



