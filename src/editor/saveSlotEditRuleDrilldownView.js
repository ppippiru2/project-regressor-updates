import { editorChip } from "./editorChipBlockView.js?v=679";

const SAVE_EDIT_RULE_DRILLDOWN_CHIP_OPTIONS = { chipClass: "editor-chip" };

export function renderSaveSlotEditRuleDrilldownView(options = {}) {
  const drilldown = options.drilldown || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const rules = Array.isArray(drilldown.rules) ? drilldown.rules : [];
  const ruleValue = options.ruleValue || `${drilldown.ruleCount || 0}`;
  const fieldValue = options.fieldValue || `${drilldown.fieldCount || 0}`;
  const checkValue = options.checkValue || `${drilldown.checkCount || 0}`;
  const blockedValue = options.blockedValue || `${drilldown.blockedCheckCount || 0}`;

  return `
    <section class="editor-save-edit-rule-drilldown" data-save-edit-rule-drilldown>
      <div class="editor-save-edit-rule-drilldown-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit validation rule drilldown")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(drilldown.status)}">
          ${escapeHtml(statusLabel(drilldown.status))}
        </span>
      </div>
      <div class="editor-save-edit-rule-drilldown-metrics">
        ${metricCard(text.ruleMetric || "Rules", ruleValue, text.ruleHint || "")}
        ${metricCard(text.fieldMetric || "Fields", fieldValue, text.fieldHint || "")}
        ${metricCard(text.checkMetric || "Checks", checkValue, text.checkHint || "")}
        ${metricCard(text.blockedMetric || "Blocked", blockedValue, text.blockedHint || "")}
      </div>
      <div class="editor-save-edit-rule-drilldown-grid">
        ${rules.map((rule) => renderSaveEditValidationRuleCardView(rule, text, statusLabel)).join("")}
      </div>
    </section>
  `;
}

function renderSaveEditValidationRuleCardView(rule = {}, text = {}, statusLabel = (status) => status || "") {
  const paths = Array.isArray(rule.paths) ? rule.paths : [];
  const inputKinds = Array.isArray(rule.inputKinds) ? rule.inputKinds : [];
  const blockers = Array.isArray(rule.blockers) ? rule.blockers : [];
  const checks = Array.isArray(rule.checks) ? rule.checks : [];

  return `
    <article class="editor-save-edit-rule-card" data-save-edit-validation-rule="${escapeAttribute(rule.id)}" data-status="${escapeAttribute(rule.status)}" data-check-count="${escapeAttribute(String(rule.checkCount || 0))}">
      <div class="editor-save-edit-rule-card-head">
        <div>
          <strong>${escapeHtml(rule.label)}</strong>
          <code>${escapeHtml(rule.id)}</code>
        </div>
        <span>${escapeHtml(statusLabel(rule.status))}</span>
      </div>
      <dl class="editor-save-edit-rule-card-meta">
        <div>
          <dt>${escapeHtml(text.fieldCount || "Fields")}</dt>
          <dd>${escapeHtml(String(rule.fieldCount || 0))}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.targetCount || "Targets")}</dt>
          <dd>${escapeHtml(String(rule.targetCount || 0))}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.blockedChecks || "Blocked checks")}</dt>
          <dd>${escapeHtml(String(rule.blockedCheckCount || 0))}</dd>
        </div>
      </dl>
      <div class="editor-save-edit-rule-chip-block">
        <span>${escapeHtml(text.paths || "Paths")}</span>
        <div class="editor-chip-list">
          ${paths.map((path) => editorChip(path, SAVE_EDIT_RULE_DRILLDOWN_CHIP_OPTIONS)).join("")}
        </div>
      </div>
      <div class="editor-save-edit-rule-chip-block">
        <span>${escapeHtml(text.inputKinds || "Input kinds")}</span>
        <div class="editor-chip-list">
          ${inputKinds.map((kind) => editorChip(kind, SAVE_EDIT_RULE_DRILLDOWN_CHIP_OPTIONS)).join("")}
          ${blockers.map((blocker) => editorChip(blocker, SAVE_EDIT_RULE_DRILLDOWN_CHIP_OPTIONS)).join("")}
        </div>
      </div>
      <div class="editor-save-edit-rule-checks">
        ${checks.map((check) => renderSaveEditValidationRuleCheckView(check, statusLabel)).join("")}
      </div>
    </article>
  `;
}

function renderSaveEditValidationRuleCheckView(check = {}, statusLabel = (status) => status || "") {
  return `
    <div class="editor-save-edit-rule-check" data-save-edit-rule-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.detail ? `<p>${escapeHtml(check.detail)}</p>` : ""}
    </div>
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
