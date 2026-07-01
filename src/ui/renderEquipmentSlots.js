import { t, tf } from "../localization/index.js?v=675";
import { byId, escapeHtml, itemIconSlot, itemInfoAttrs } from "./inventoryRenderHelpers.js?v=675";
import { isOffHandSlotDisabled } from "../state/equipmentActions.js?v=675";

export function renderEquipmentSlots(
  equipmentState,
  slots,
  displayName,
  getItem,
  optionText,
  getItemIconPath = () => "",
) {
  const slotsElement = byId("equipment-slots");
  if (!slotsElement) return;

  slotsElement.innerHTML = slots
    .map((slot) => {
      const entry = equipmentState[slot];
      const item = entry ? getItem(entry.itemId) : null;
      const iconPath = getItemIconPath(item);
      const offHandDisabled = slot === "OffHand" && isOffHandSlotDisabled(equipmentState, getItem);
      return `<div class="slot ${item ? "is-equipped" : "is-empty"}${offHandDisabled ? " is-disabled" : ""}">
        ${itemIconSlot({
          item,
          iconPath,
          label: item
            ? tf("inventoryUi.itemIcon", { name: item.name })
            : tf("inventoryUi.emptyItemIcon", { name: displayName(slot) }),
        })}
        <div class="slot-main">
          <strong class="slot-name info-term" tabindex="0" role="button" data-info-key="slot:${slot}">${displayName(slot)}</strong>
          <div class="muted">${
            item
              ? `<span class="rarity-${item.rarity} info-term" tabindex="0" role="button" ${itemInfoAttrs(item, displayName, optionText)}>${escapeHtml(item.name)}</span>`
              : offHandDisabled
                ? t("inventoryUi.offHandDisabledReason")
                : t("inventoryUi.emptyEquipped")
          }</div>
        </div>
        <div class="slot-actions">
          <span class="slot-state">${offHandDisabled ? t("inventoryUi.disabled") : item ? t("inventoryUi.equipped") : t("inventoryUi.emptySlot")}</span>
          ${
            item
              ? `<button class="inventory-action-button inventory-action-button-unequip" data-unequip="${slot}" aria-label="${escapeHtml(tf("inventoryUi.unequipAria", { name: displayName(slot) }))}">${escapeHtml(t("inventoryUi.unequip"))}</button>`
              : ""
          }
        </div>
      </div>`;
    })
    .join("");
}
