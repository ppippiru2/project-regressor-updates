import {
  applyDeploymentUpdate,
  checkDeploymentUpdate,
  getDeploymentUpdateState,
} from "../app/deploymentUpdate.js?v=455";
import { t, tf } from "../localization/index.js?v=455";
import { renderDeploymentUpdate } from "./renderDeploymentUpdate.js?v=455";
import { renderRetargetPreviewSummary } from "./renderRetargetPreview.js?v=455";

export function renderBuildInfo() {
  const info = createBuildInfo();
  setText("build-version-label", info.displayVersion);
  setText("build-cache-label", info.cacheVersion);
  setText("build-address-label", info.currentAddress);
  setText("build-mobile-label", info.mobileAddress);
  renderDeploymentUpdate(info, getDeploymentUpdateState(), {
    onCheck: async () => {
      await checkDeploymentUpdate();
      renderBuildInfo();
    },
    onApply: applyDeploymentUpdate,
  });
  renderRetargetPreviewSummary();
}

export function formatScreenVersion(version) {
  const numeric = Number(version);
  if (!Number.isInteger(numeric) || numeric <= 0) return version ? `v${version}` : "v?.??";
  const major = Math.floor(numeric / 100);
  const minor = String(numeric % 100).padStart(2, "0");
  return `v${major}.${minor}`;
}

function createBuildInfo() {
  const screenVersion = readScreenVersion();
  const currentAddress = screenVersion ? `${window.location.origin}${window.location.pathname}?v=${screenVersion}` : window.location.href;
  return {
    screenVersion,
    displayVersion: formatScreenVersion(screenVersion),
    cacheVersion: screenVersion ? tf("buildInfo.cacheVersion", { version: screenVersion }) : t("buildInfo.cacheCheckNeeded"),
    currentAddress,
    mobileAddress: mobileAddressLabel(screenVersion),
  };
}

function readScreenVersion() {
  const mainScript = [...document.scripts].find((script) => /src\/main\.js\?v=/.test(script.getAttribute("src") || ""));
  const version = mainScript?.getAttribute("src")?.match(/[?&]v=(\d+)/)?.[1];
  return version || new URLSearchParams(window.location.search).get("v") || "";
}

function mobileAddressLabel(screenVersion) {
  const suffix = screenVersion ? `/?v=${screenVersion}` : "/";
  if (["127.0.0.1", "localhost", "::1"].includes(window.location.hostname)) {
    return `PC LAN IP:5173${suffix}`;
  }
  return `${window.location.origin}${window.location.pathname}${screenVersion ? `?v=${screenVersion}` : ""}`;
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}

