export function renderCombatReadiness(readiness) {
  const container = document.getElementById("readiness-panel");
  if (!container || !readiness) return;

  container.hidden = readiness.hidden === true;
  if (container.hidden) return;

  container.dataset.readinessState = readiness.state;
  container.dataset.readinessKind = readiness.kind || "default";
  setText("readiness-eyebrow", readiness.eyebrow);
  setText("readiness-title", readiness.title);
  setText("readiness-detail", readiness.detail);

  const bar = document.getElementById("readiness-bar");
  if (bar) bar.style.width = `${readiness.progress}%`;

  const meta = document.getElementById("readiness-meta");
  if (meta) {
    meta.innerHTML = readiness.meta.map((line) => `<span>${line}</span>`).join("");
  }
}

function setText(id, value) {
  const element = document.getElementById(id);
  if (element) element.textContent = value;
}
