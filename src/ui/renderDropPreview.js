import { equipmentScoreDelta } from "../state/equipmentScore.js?v=410";
import { t, tf } from "../localization/index.js?v=410";

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
      const delta = drop.item.slot ? equipmentScoreDelta(drop.item, equipmentState, getItem) : 0;
      const upgradeText = delta > 0 ? tf("dropPreview.valueUpgrade", { delta }) : "";
      const typeText = drop.item.slot ? "" : tf("dropPreview.lootType", { type: drop.item.typeLabel || t("inventoryUi.lootItem") });
      return `<span class="drop-chip${delta > 0 ? " is-upgrade" : ""}">
        <strong class="rarity-${drop.item.rarity}">${drop.item.name}</strong>
        <small>${Math.round(drop.chance * 1000) / 10}%${upgradeText}${typeText}</small>
      </span>`;
    })
    .join("");
}
