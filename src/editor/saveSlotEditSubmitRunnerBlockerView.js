import { editorChip } from "./editorChipBlockView.js?v=677";

const SAVE_EDIT_SUBMIT_RUNNER_BLOCKER_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditSubmitRunnerBlockerView(options = {}) {
  const contract = options.contract || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const blockerFormatter = options.blockerFormatter || ((blocker) => `${text.blocker || "Blocker"}: ${blocker}`);
  const blockerChipFormatter = options.blockerChipFormatter || ((blocker) => blocker);
  const checks = Array.isArray(contract.checks) ? contract.checks : [];
  const blockers = Array.isArray(contract.blockers) ? contract.blockers : [];
  const blockerValue = options.blockerValue || `${contract.blockerCount || 0}`;
  const checkValue = options.checkValue || `${contract.checkCount || 0}`;
  const blockedValue = options.blockedValue || `${contract.blockedCheckCount || 0}`;

  return `
    <section class="editor-save-edit-submit-runner-blocker" data-save-edit-submit-runner-blocker-contract data-status="${escapeAttribute(contract.status)}" data-mode="${escapeAttribute(contract.mode)}" data-apply="${escapeAttribute(contract.apply)}">
      <div class="editor-save-edit-submit-runner-blocker-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit submit runner blocker contract")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(contract.status)}">
          ${escapeHtml(statusLabel(contract.status))}
        </span>
      </div>
      <div class="editor-save-edit-submit-runner-blocker-metrics">
        ${metricCard(text.runnerMetric || "Runner", contract.submitRunner, text.runnerHint || "")}
        ${metricCard(text.blockerMetric || "Blockers", blockerValue, text.blockerHint || "")}
        ${metricCard(text.checkMetric || "Checks", checkValue, text.checkHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-submit-runner-blocker-list">
        <strong>${escapeHtml(text.blockerList || "Submit runner blockers")}</strong>
        <div class="editor-chip-list">
          ${blockers.map((blocker) => editorChip(blockerChipFormatter(blocker), SAVE_EDIT_SUBMIT_RUNNER_BLOCKER_CHIP_OPTIONS)).join("")}
        </div>
      </div>
      <div class="editor-save-edit-submit-runner-blocker-grid">
        ${checks.map((check) => renderSaveEditSubmitRunnerBlockerCheckView(check, statusLabel, blockerFormatter)).join("")}
      </div>
      <pre class="editor-save-edit-submit-runner-blocker-code"><code>${escapeHtml(JSON.stringify(contract.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditSubmitRunnerBlockerCheckView(check = {}, statusLabel = (status) => status || "", blockerFormatter = (value) => value) {
  return `
    <article class="editor-save-edit-submit-runner-blocker-check" data-save-edit-submit-runner-blocker-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.blocker ? editorChip(blockerFormatter(check.blocker), SAVE_EDIT_SUBMIT_RUNNER_BLOCKER_CHIP_OPTIONS) : ""}
    </article>
  `;
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function escapeAttribute(value) {
  return escapeHtml(value).replaceAll("`", "&#096;");
}
