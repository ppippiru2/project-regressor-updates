export function readEditorLocalStorageJson(key, storage = getEditorLocalStorage()) {
  if (!storage || typeof storage.getItem !== "function") return null;
  try {
    const raw = storage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

export function writeEditorLocalStorageJson(key, value, storage = getEditorLocalStorage()) {
  if (!storage || typeof storage.setItem !== "function") return false;
  try {
    storage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

export function removeEditorLocalStorageItem(key, storage = getEditorLocalStorage()) {
  if (!storage || typeof storage.removeItem !== "function") return false;
  try {
    storage.removeItem(key);
    return true;
  } catch {
    return false;
  }
}

function getEditorLocalStorage() {
  if (typeof window === "undefined" || !window.localStorage) return null;
  return window.localStorage;
}
