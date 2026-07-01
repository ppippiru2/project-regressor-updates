export function renderInitialPlayerSetupPreviewView(preview, text = {}) {
  return `<section class="editor-initial-player-preview" data-initial-player-preview data-status="${escapeAttribute(preview.status)}">
    <div class="editor-initial-player-head">
      <div>
        <span data-status="${escapeAttribute(preview.status)}">${escapeHtml(text.statusPartial || preview.status)}</span>
        <h4>${escapeHtml(text.title || "Initial player setup")}</h4>
      </div>
      <p>${escapeHtml(text.description || "")}</p>
    </div>
    <div class="editor-initial-player-metrics">
      ${metricCard(text.profileMetric || "Profile", preview.profile.genderOptionCount + preview.profile.countryOptionCount, text.profileHint || "")}
      ${metricCard(text.statMetric || "Stats", preview.stats.startingTotal, text.statHint || "")}
      ${metricCard(text.questionMetric || "Questions", preview.questions.count, text.questionHint || "")}
      ${metricCard(text.cardMetric || "Starter cards", preview.starterCards.count, text.cardHint || "")}
      ${metricCard(text.prologueMetric || "Prologue events", preview.prologueFlow.eventCount, text.prologueHint || "")}
    </div>
    <div class="editor-initial-player-grid">
      ${sectionCard(text.profileTitle || "Profile defaults", [
        row(text.defaultName || "Default name", preview.profile.defaultName),
        row(text.ageRange || "Age range", `${preview.profile.minAge}-${preview.profile.maxAge} / ${preview.profile.defaultAge}`),
        row(text.profileOptions || "Options", `${preview.profile.genderOptionCount} / ${preview.profile.countryOptionCount}`),
        row(text.profileBridge || "Profile image bridge", preview.profile.profileImageBridgeId),
      ])}
      ${sectionCard(text.statTitle || "Stat dice", [
        row(text.statKeys || "Stats", preview.stats.keys.join(" / ")),
        row(text.statStartingTotal || "Starting total", preview.stats.startingTotal),
        row(text.statTargetTotal || "Target total", `${preview.stats.totalRange.min}-${preview.stats.totalRange.max}`),
        row(text.statMaxValue || "Max value", preview.stats.maxValue),
      ])}
      ${sectionCard(text.questionTitle || "Abyss questions", [
        row(text.questionCount || "Question count", preview.questions.count),
        row(text.questionOptions || "Option count", preview.questions.optionCount),
        row(text.dispositionCount || "Disposition routes", preview.questions.dispositionCount),
        row(text.dispositionList || "Disposition ids", preview.questions.dispositions.map((entry) => entry.id).join(" / ")),
      ])}
      ${sectionCard(text.cardTitle || "Hidden starter cards", [
        row(text.cardCount || "Card count", preview.starterCards.count),
        row(text.hiddenSlotCount || "Hidden slots", preview.starterCards.hiddenSlotCount),
        row(text.weightedDispositionCount || "Weighted cards", preview.starterCards.weightedDispositionCount),
        row(text.recommendationCount || "Recommendation rows", preview.starterCards.recommendations.length),
      ])}
      ${sectionCard(text.prologueTitle || "Prologue flow", [
        row(text.prologueEventCount || "Event count", preview.prologueFlow.eventCount),
        row(text.prologueStepCount || "Step count", preview.prologueFlow.stepCount),
        ...preview.prologueFlow.steps.map((step) => row(step.step, step.count)),
      ])}
    </div>
    <div class="editor-initial-player-recommendations">
      <h4>${escapeHtml(text.recommendationTitle || "Starter recommendations")}</h4>
      <div class="editor-initial-player-row-list">
        ${preview.starterCards.recommendations.map((entry) => recommendationRow(entry, text)).join("")}
      </div>
    </div>
  </section>`;
}

function metricCard(label, value, hint) {
  return `<article>
    <span>${escapeHtml(label)}</span>
    <strong>${escapeHtml(value)}</strong>
    <small>${escapeHtml(hint)}</small>
  </article>`;
}

function sectionCard(title, rows) {
  return `<article>
    <h4>${escapeHtml(title)}</h4>
    <dl>${rows.join("")}</dl>
  </article>`;
}

function row(label, value) {
  return `<div>
    <dt>${escapeHtml(label)}</dt>
    <dd>${escapeHtml(value)}</dd>
  </div>`;
}

function recommendationRow(entry, text) {
  return `<article data-disposition-id="${escapeAttribute(entry.dispositionId)}">
    <div>
      <span>${escapeHtml(entry.dispositionName || entry.dispositionId)}</span>
      <strong>${escapeHtml(entry.cardName || text.emptyValue || "-")}</strong>
    </div>
    <small>${escapeHtml(text.recommendationDetail || "Trait / skill")}: ${escapeHtml(entry.traitName || "-")} / ${escapeHtml(entry.skillName || "-")}</small>
    <code>${escapeHtml(entry.weight)} / ${escapeHtml(entry.totalWeight)} (${escapeHtml(entry.candidateCount)})</code>
  </article>`;
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
  return escapeHtml(value);
}
