export function renderSaveSlotEditValidatorDryRunView(options = {}) {
  const plan = options.plan || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const stages = Array.isArray(plan.stages) ? plan.stages : [];
  const rules = Array.isArray(plan.rules) ? plan.rules : [];
  const stageValue = options.stageValue || `${plan.stageCount || 0}`;
  const ruleValue = options.ruleValue || `${plan.ruleCount || 0}`;
  const blockedStageValue = options.blockedStageValue || `${plan.blockedStageCount || 0}`;
  const blockedRuleValue = options.blockedRuleValue || `${plan.blockedRuleCount || 0}`;

  return `
    <section class="editor-save-edit-dry-run" data-save-edit-validator-dry-run>
      <div class="editor-save-edit-dry-run-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit validator dry-run plan")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(plan.status)}">
          ${escapeHtml(statusLabel(plan.status))}
        </span>
      </div>
      <div class="editor-save-edit-dry-run-metrics">
        ${metricCard(text.stageMetric || "Stages", stageValue, text.stageHint || "")}
        ${metricCard(text.ruleMetric || "Rules", ruleValue, text.ruleHint || "")}
        ${metricCard(text.blockedStageMetric || "Blocked stages", blockedStageValue, text.blockedStageHint || "")}
        ${metricCard(text.blockedRuleMetric || "Blocked rules", blockedRuleValue, text.blockedRuleHint || "")}
      </div>
      <div class="editor-save-edit-dry-run-stages">
        ${stages.map((stage) => renderSaveEditDryRunStageView(stage, statusLabel)).join("")}
      </div>
      <div class="editor-save-edit-dry-run-rules">
        ${rules.map((rule) => renderSaveEditDryRunRuleView(rule, text, statusLabel)).join("")}
      </div>
    </section>
  `;
}

function renderSaveEditDryRunStageView(stage = {}, statusLabel = (status) => status || "") {
  return `
    <article class="editor-save-edit-dry-run-stage" data-save-edit-dry-run-stage="${escapeAttribute(stage.id)}" data-status="${escapeAttribute(stage.status)}">
      <div>
        <strong>${escapeHtml(stage.label)}</strong>
        <span>${escapeHtml(statusLabel(stage.status))}</span>
      </div>
      ${stage.detail ? `<p>${escapeHtml(stage.detail)}</p>` : ""}
    </article>
  `;
}

function renderSaveEditDryRunRuleView(rule = {}, text = {}, statusLabel = (status) => status || "") {
  return `
    <article class="editor-save-edit-dry-run-rule" data-save-edit-dry-run-rule="${escapeAttribute(rule.id)}" data-status="${escapeAttribute(rule.status)}">
      <div>
        <strong>${escapeHtml(rule.label)}</strong>
        <span>${escapeHtml(statusLabel(rule.status))}</span>
      </div>
      <dl>
        <div>
          <dt>${escapeHtml(text.fieldCount || "Fields")}</dt>
          <dd>${escapeHtml(String(rule.fieldCount))}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.mode || "Mode")}</dt>
          <dd>${escapeHtml(rule.mode)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.blocker || "Blocker")}</dt>
          <dd>${escapeHtml(rule.blocker)}</dd>
        </div>
      </dl>
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
