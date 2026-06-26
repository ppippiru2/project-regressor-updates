import { equipmentScoreDelta } from "../state/equipmentScore.js?v=337";
import { t, tf } from "../localization/index.js?v=337";

export function renderDropPreview(monster, getItem, equipmentState) {
  const container = document.getElementById("drop-preview-list");
  if (!container) return;

  const drops = (monster?.dropTable || [])
    .map((drop) => ({ ...drop, item: getItem(drop.itemId) }))
    .filter((drop) => drop.item);

  if (drops.length === 0) {
    container.innerHTML = `<span class="muted">${t("dropPreview.empty")}</span>`;
    return;
  }

  container.innerHTML = drops
    .map((drop) => {
      const delta = equipmentScoreDelta(drop.item, equipmentState, getItem);
      const upgradeText = delta > 0 ? tf("dropPreview.valueUpgrade", { delta }) : "";
      return `<span class="drop-chip${delta > 0 ? " is-upgrade" : ""}">
        <strong class="rarity-${drop.item.rarity}">${drop.item.name}</strong>
        <small>${Math.round(drop.chance * 1000) / 10}%${upgradeText}</small>
      </span>`;
    })
    .join("");
}
