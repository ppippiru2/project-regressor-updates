export const UPDATE_MANIFEST_URL = "https://ppippiru2.github.io/project-regressor-updates/data/update-manifest.json";
export const FALLBACK_PAGES_URL = "https://ppippiru2.github.io/project-regressor-updates/";
export const FALLBACK_REPOSITORY_URL = "https://github.com/ppippiru2/project-regressor-updates";

let deploymentUpdateState = {
  status: "idle",
  checkedAt: 0,
  manifest: null,
  error: "",
};

export function getDeploymentUpdateState() {
  return deploymentUpdateState;
}

export async function checkDeploymentUpdate() {
  deploymentUpdateState = {
    ...deploymentUpdateState,
    status: "checking",
    error: "",
  };

  try {
    const response = await fetch(`${UPDATE_MANIFEST_URL}?t=${Date.now()}`, { cache: "no-store" });
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    const manifest = await response.json();
    deploymentUpdateState = {
      status: "done",
      checkedAt: Date.now(),
      manifest,
      error: "",
    };
  } catch (error) {
    deploymentUpdateState = {
      status: "error",
      checkedAt: Date.now(),
      manifest: null,
      error: error?.message || String(error),
    };
  }

  return deploymentUpdateState;
}

export async function applyDeploymentUpdate(manifest) {
  const action = resolveDeploymentUpdateAction(manifest);
  if (action.kind === "apk") {
    window.location.href = action.targetUrl;
    return;
  }

  try {
    if ("caches" in window) {
      const keys = await caches.keys();
      await Promise.all(
        keys
          .filter((key) => key.startsWith("project-regressor"))
          .map((key) => caches.delete(key))
      );
    }
    const registration = await navigator.serviceWorker?.getRegistration?.();
    await registration?.update?.();
  } catch {
    // Cache cleanup is best-effort. Navigation still moves the player to the hosted build.
  }
  window.location.href = action.targetUrl;
}

export function resolveDeploymentUpdateAction(
  manifest,
  locationRef = globalThis.location,
  navigatorRef = globalThis.navigator,
) {
  const apkUrl = manifest?.androidApkUrl || manifest?.downloads?.androidDebugApk || "";
  if (apkUrl && isAndroidAppShell(locationRef, navigatorRef)) {
    return { kind: "apk", targetUrl: apkUrl };
  }
  return { kind: "web", targetUrl: manifest?.launchUrl || FALLBACK_PAGES_URL };
}

export function isAndroidAppShell(locationRef = globalThis.location, navigatorRef = globalThis.navigator) {
  const hostname = String(locationRef?.hostname || "").toLowerCase();
  const protocol = String(locationRef?.protocol || "").toLowerCase();
  const userAgent = String(navigatorRef?.userAgent || "");
  return protocol === "https:" && hostname === "localhost" && /Android/i.test(userAgent);
}
