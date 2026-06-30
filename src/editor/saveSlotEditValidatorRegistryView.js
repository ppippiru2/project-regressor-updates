export function renderSaveSlotEditValidatorRegistryView(options = {}) {
  const contract = options.contract || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const validators = Array.isArray(contract.validators) ? contract.validators : [];
  const ruleValue = options.ruleValue || `${contract.ruleCount || 0}`;
  const validatorValue = options.validatorValue || `${contract.validatorCount || 0}`;
  const missingValue = options.missingValue || `${contract.missingValidatorCount || 0}`;

  return `
    <section class="editor-save-edit-validator-registry" data-save-edit-validator-registry>
      <div class="editor-save-edit-validator-registry-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit validator registry contract")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(contract.status)}">
          ${escapeHtml(statusLabel(contract.status))}
        </span>
      </div>
      <div class="editor-save-edit-validator-registry-metrics">
        ${metricCard(text.ruleMetric || "Rules", ruleValue, text.ruleHint || "")}
        ${metricCard(text.validatorMetric || "Validators", validatorValue, text.validatorHint || "")}
        ${metricCard(text.missingMetric || "Missing", missingValue, text.missingHint || "")}
        ${metricCard(text.contractMetric || "Contract", contract.contractVersion, text.contractHint || "")}
      </div>
      <div class="editor-save-edit-validator-registry-grid">
        ${validators.map((validator) => renderSaveEditValidatorRegistryCardView(validator, text)).join("")}
      </div>
    </section>
  `;
}

function renderSaveEditValidatorRegistryCardView(validator = {}, text = {}) {
  const inputs = Array.isArray(validator.inputs) ? validator.inputs : [];
  const outputs = Array.isArray(validator.outputs) ? validator.outputs : [];

  return `
    <article class="editor-save-edit-validator-card" data-save-edit-validator="${escapeAttribute(validator.ruleId)}" data-status="${escapeAttribute(validator.status)}">
      <div>
        <strong>${escapeHtml(validator.label)}</strong>
        <span>${escapeHtml(validator.status)}</span>
      </div>
      <code>${escapeHtml(validator.functionName)}</code>
      <dl>
        <div>
          <dt>${escapeHtml(text.fieldCount || "Fields")}</dt>
          <dd>${escapeHtml(String(validator.fieldCount))}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.mode || "Mode")}</dt>
          <dd>${escapeHtml(validator.mode)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.inputs || "Inputs")}</dt>
          <dd>${escapeHtml(inputs.join(", "))}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.outputs || "Outputs")}</dt>
          <dd>${escapeHtml(outputs.join(", "))}</dd>
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
