export function bindDelegatedClickEvents({
  root = document.body,
  onEquip,
  onEquipRecommended,
  onUnequip,
  onSelectRegion,
  onPreviewRegion,
  onAllocateStat,
  onAllocateStatBatch,
  onAllocateRecommendedStats,
  onDeallocateStat,
  onDeallocateStatBatch,
  onResetFreeStats,
  onConfirmFreeStats,
  onSelectStance,
  onSelectSkillLoadout,
  onMoveGateNode,
  onActivateHyper,
  onCombatFeedbackChange,
  onCombatViewChange,
  onBuyShopItem,
  onSellShopItem,
  onDeveloperAction,
  onDeveloperOptionChange,
  onCardDrawTestAction,
  onCardDrawTestPreset,
  onCardDrawTestSlot,
  onNavigateToView,
  onCombatAction,
  onCombatStyleAction,
  onRegressionCardSelect,
} = {}) {
  root.addEventListener("click", (event) => {
    const combatStyleAction = event.target.closest("[data-combat-style-action]");
    const combatAction = event.target.closest("[data-combat-action]");
    const regressionCard = event.target.closest("[data-regression-card]");
    const regressionCardSlot = event.target.closest("[data-regression-card-slot]");
    const equip = event.target.closest("[data-equip]");
    const equipRecommended = event.target.closest("[data-equip-recommended]");
    const unequip = event.target.closest("[data-unequip]");
    const region = event.target.closest("[data-region]");
    const regionPreview = event.target.closest("[data-region-preview]");
    const allocate = event.target.closest("[data-allocate]");
    const allocateBatch = event.target.closest("[data-allocate-batch]");
    const allocateRecommended = event.target.closest("[data-allocate-recommended]");
    const deallocate = event.target.closest("[data-deallocate]");
    const deallocateBatch = event.target.closest("[data-deallocate-batch]");
    const resetFreeStats = event.target.closest("[data-reset-free-stats]");
    const confirmFreeStats = event.target.closest("[data-confirm-free-stats]");
    const stance = event.target.closest("[data-stance]");
    const skillLoadout = event.target.closest("[data-skill-loadout]");
    const gateNode = event.target.closest("[data-gate-node]");
    const feedbackOption = event.target.closest("[data-feedback-option]");
    const combatViewOption = event.target.closest("[data-combat-view-option]");
    const hyperTrigger = event.target.closest("[data-hyper-trigger]");
    const shopBuy = event.target.closest("[data-shop-buy]");
    const shopSell = event.target.closest("[data-shop-sell]");
    const developerAction = event.target.closest("[data-developer-action]");
    const cardDrawTestAction = event.target.closest("[data-card-draw-test-action]");
    const cardDrawTestPreset = event.target.closest("[data-card-draw-test-preset]");
    const cardDrawTestSlot = event.target.closest("[data-card-draw-test-slot]");
    const systemTarget = event.target.closest("[data-system-target-view]");

    if (cardDrawTestAction) {
      event.preventDefault();
      onCardDrawTestAction?.(cardDrawTestAction.dataset.cardDrawTestAction);
      return;
    }

    if (cardDrawTestPreset) {
      event.preventDefault();
      onCardDrawTestPreset?.(cardDrawTestPreset.dataset.cardDrawTestPreset);
      return;
    }

    if (cardDrawTestSlot) {
      event.preventDefault();
      onCardDrawTestSlot?.(cardDrawTestSlot.dataset.cardDrawTestSlot);
      return;
    }

    if (combatStyleAction) {
      event.preventDefault();
      onCombatStyleAction?.(combatStyleAction.dataset.combatStyleAction);
      return;
    }

    if (combatAction) {
      event.preventDefault();
      onCombatAction?.(combatAction.dataset.combatAction);
      return;
    }

    if (regressionCardSlot) {
      event.preventDefault();
      onRegressionCardSelect?.(regressionCardSlot.dataset.regressionCardSlot);
      return;
    }

    if (regressionCard) {
      event.preventDefault();
      onRegressionCardSelect?.(regressionCard.dataset.regressionCard);
      return;
    }

    if (systemTarget && !event.target.closest(".collapse-toggle")) {
      onNavigateToView?.(systemTarget.dataset.systemTargetView);
    }
    if (equip) onEquip(equip.dataset.equip);
    if (equipRecommended) onEquipRecommended();
    if (unequip) onUnequip(unequip.dataset.unequip);
    if (region) {
      onSelectRegion(region.dataset.region);
    } else if (regionPreview) {
      onPreviewRegion(regionPreview.dataset.regionPreview);
    }
    if (allocate) onAllocateStat(allocate.dataset.allocate);
    if (allocateBatch) onAllocateStatBatch(allocateBatch.dataset.allocateBatch);
    if (allocateRecommended) onAllocateRecommendedStats();
    if (deallocate) onDeallocateStat(deallocate.dataset.deallocate);
    if (deallocateBatch) onDeallocateStatBatch(deallocateBatch.dataset.deallocateBatch);
    if (resetFreeStats) onResetFreeStats();
    if (confirmFreeStats) onConfirmFreeStats();
    if (stance) onSelectStance(stance.dataset.stance);
    if (skillLoadout) onSelectSkillLoadout(skillLoadout.dataset.skillLoadout);
    if (gateNode) onMoveGateNode(gateNode.dataset.gateNode);
    if (hyperTrigger) onActivateHyper();
    if (feedbackOption) {
      onCombatFeedbackChange(feedbackOption.dataset.feedbackOption, feedbackOption.checked);
    }
    if (combatViewOption) {
      onCombatViewChange(combatViewOption.dataset.combatViewOption, combatViewOption.checked);
    }
    if (shopBuy) onBuyShopItem(shopBuy.dataset.shopBuy);
    if (shopSell) onSellShopItem(shopSell.dataset.shopSell);
    if (developerAction) onDeveloperAction(developerAction.dataset.developerAction);
  });

  root.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    const systemTarget = event.target.closest("[data-system-target-view]");
    if (!systemTarget || event.target.closest(".collapse-toggle")) return;
    event.preventDefault();
    onNavigateToView?.(systemTarget.dataset.systemTargetView);
  });

  root.addEventListener("change", (event) => {
    const developerOption = event.target.closest("[data-developer-option]");
    if (!developerOption) return;
    const key = developerOption.dataset.developerOption;
    const value = developerOption.type === "checkbox" ? developerOption.checked : developerOption.value;
    onDeveloperOptionChange(key, value);
  });
}
