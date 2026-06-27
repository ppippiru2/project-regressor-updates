import {
  FALLBACK_PAGES_URL,
  FALLBACK_REPOSITORY_URL,
} from "../app/deploymentUpdate.js?v=396";
import { t, tf } from "../localization/index.js?v=396";

export function renderDeploymentUpdate(info, updateState, actions = {}) {
  const grid = document.querySelector(".build-info-grid");
  if (!grid) return;

  let panel = document.getElementById("deployment-update-line");
  if (!panel) {
    panel = document.createElement("div");
    panel.id = "deployment-update-line";
    panel.className = "build-info-line wide deployment-update-line";
    grid.appendChild(panel);
  }

  const latest = updateState.manifest;
  const latestVersion = Number(latest?.versionCode || 0);
  const currentVersion = Number(info.screenVersion || 0);
  const hasUpdate = latestVersion > currentVersion;
  const statusText = deploymentStatusText(updateState.status, hasUpdate, latest, info);
  const openUrl = latest?.pagesUrl || FALLBACK_PAGES_URL;
  const repoUrl = latest?.repositoryUrl || FALLBACK_REPOSITORY_URL;
  const apkUrl = latest?.androidApkUrl || latest?.downloads?.androidDebugApk || "";

  panel.innerHTML = `
    <span>${t("deploymentUpdate.title")}</span>
    <strong class="deployment-update-status">${statusText}</strong>
    <div class="deployment-update-actions">
      <button class="secondary-button" type="button" data-update-check>${t("deploymentUpdate.check")}</button>
      <button class="ghost-button" type="button" data-update-apply ${hasUpdate ? "" : "disabled"}>${t("deploymentUpdate.apply")}</button>
      <a class="editor-link-button" href="${openUrl}" target="_blank" rel="noopener">${t("deploymentUpdate.openPages")}</a>
      ${apkUrl ? `<a class="editor-link-button" href="${apkUrl}" target="_blank" rel="noopener">APK</a>` : ""}
      <a class="editor-link-button" href="${repoUrl}" target="_blank" rel="noopener">${t("deploymentUpdate.openRepo")}</a>
    </div>
  `;

  panel.querySelector("[data-update-check]")?.addEventListener("click", actions.onCheck);
  panel.querySelector("[data-update-apply]")?.addEventListener("click", () => actions.onApply?.(latest));
}

function deploymentStatusText(status, hasUpdate, manifest, info) {
  if (status === "checking") return t("deploymentUpdate.checking");
  if (status === "error") {
    return t("deploymentUpdate.error");
  }
  if (!manifest) return tf("deploymentUpdate.preparing", { displayVersion: info.displayVersion });
  if (hasUpdate) return tf("deploymentUpdate.available", { displayVersion: manifest.displayVersion || `v${manifest.versionCode}` });
  return tf("deploymentUpdate.current", { displayVersion: manifest.displayVersion || info.displayVersion });
}
