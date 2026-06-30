export function renderSaveSlotEditValidatorResultSourceAdapterView(options = {}) {
  const plan = options.plan || {};
  const text = options.text || {};
  const metricCard = options.metricCard || (() => "");
  const statusLabel = options.statusLabel || ((status) => status || "");
  const candidates = Array.isArray(plan.candidates) ? plan.candidates : [];
  const candidateValue = options.candidateValue || `${plan.candidateCount || 0}`;
  const readyValue = options.readyValue || `${plan.readyCandidateCount || 0}`;

  return `
    <section class="editor-save-edit-result-source-adapter" data-save-edit-validator-result-source-adapter-plan data-status="${escapeAttribute(plan.status)}" data-mode="${escapeAttribute(plan.mode)}" data-apply="${escapeAttribute(plan.apply)}">
      <div class="editor-save-edit-result-source-adapter-head">
        <div>
          <h4>${escapeHtml(text.title || "Save edit validator result source adapter plan")}</h4>
          <p class="muted">${escapeHtml(text.description || "")}</p>
        </div>
        <span data-status="${escapeAttribute(plan.status)}">
          ${escapeHtml(statusLabel(plan.status))}
        </span>
      </div>
      <div class="editor-save-edit-result-source-adapter-metrics">
        ${metricCard(text.candidateMetric || "Candidates", candidateValue, text.candidateHint || "")}
        ${metricCard(text.readyMetric || "Ready", readyValue, text.readyHint || "")}
        ${metricCard(text.selectedMetric || "Selected", plan.selectedSource, text.selectedHint || "")}
        ${metricCard(text.adapterMetric || "Adapter", plan.adapter?.status, text.adapterHint || "")}
      </div>
      <div class="editor-save-edit-result-source-adapter-grid">
        ${candidates.map((candidate) => renderSaveEditValidatorResultSourceAdapterCandidateView(candidate, text, statusLabel)).join("")}
      </div>
      <pre class="editor-save-edit-result-source-adapter-code"><code>${escapeHtml(JSON.stringify(plan.payloadShape, null, 2))}</code></pre>
    </section>
  `;
}

function renderSaveEditValidatorResultSourceAdapterCandidateView(candidate = {}, text = {}, statusLabel = (status) => status || "") {
  return `
    <article class="editor-save-edit-result-source-adapter-candidate" data-save-edit-validator-result-source-adapter-candidate="${escapeAttribute(candidate.id)}" data-status="${escapeAttribute(candidate.status)}">
      <div>
        <strong>${escapeHtml(text.candidateLabels?.[candidate.id] || candidate.id)}</strong>
        <span>${escapeHtml(statusLabel(candidate.status))}</span>
      </div>
      <dl>
        <div>
          <dt>${escapeHtml(text.sourceVersion || "Source")}</dt>
          <dd>${escapeHtml(candidate.sourceVersion)}</dd>
        </div>
        <div>
          <dt>${escapeHtml(text.sourceBlocker || "Blocker")}</dt>
          <dd>${escapeHtml(candidate.blocker || text.noBlocker || "none")}</dd>
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
