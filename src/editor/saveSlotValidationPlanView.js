export function renderSaveSlotValidationPlanView(options = {}) {
  const plan = options.plan || {};
  const text = options.text || {};
  const statusLabel = options.statusLabel || ((status) => status || "");
  const metricCard = options.metricCard || (() => "");
  const readyCheckValue = options.readyCheckValue || `${plan.readyChecks || 0}/${plan.totalChecks || 0}`;
  const checks = Array.isArray(plan.checks) ? plan.checks : [];

  return `
    <section class="editor-save-validation" data-save-validation-plan>
      <div class="editor-save-validation-head">
        <div>
          <h4>${escapeHtml(text.title || "Save validation plan")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(plan.applyStatus)}">
          ${escapeHtml(statusLabel(plan.applyStatus))}
        </span>
      </div>
      <div class="editor-save-validation-metrics">
        ${metricCard(
          text.readyCheckMetric || "Ready checks",
          readyCheckValue,
          text.readyCheckHint || "",
        )}
        ${metricCard(
          text.rollbackMetric || "Rollback",
          statusLabel(plan.rollbackStatus),
          text.rollbackHint || "",
        )}
        ${metricCard(
          text.applyMetric || "Apply",
          statusLabel(plan.applyStatus),
          text.applyHint || "",
        )}
      </div>
      <div class="editor-save-validation-grid">
        ${checks.map((check) => renderSaveValidationCheckView(check, text, statusLabel)).join("")}
      </div>
    </section>
  `;
}

function renderSaveValidationCheckView(check = {}, text = {}, statusLabel = (status) => status || "") {
  return `
    <article class="editor-save-validation-check" data-save-validation-check="${escapeAttribute(check.id)}" data-status="${escapeAttribute(check.status)}">
      <div>
        <strong>${escapeHtml(check.label)}</strong>
        <span>${escapeHtml(statusLabel(check.status))}</span>
      </div>
      ${check.detail ? `<p>${escapeHtml(check.detail)}</p>` : ""}
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
