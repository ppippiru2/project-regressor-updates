import { bindCharacterCreationEvents } from "../ui/characterCreationEvents.js?v=531";
import { bindCombatControlEvents } from "../ui/combatControlEvents.js?v=531";
import { bindCombatInfoEvents } from "../ui/combatInfoEvents.js?v=531";
import { bindDelegatedClickEvents } from "../ui/delegatedClickEvents.js?v=531";
import { bindInfoTooltipEvents } from "../ui/infoTooltipEvents.js?v=531";
import { bindNavigationEvents } from "../ui/navigationEvents.js?v=531";
import { bindSaveLoadEvents } from "../ui/saveLoadEvents.js?v=531";

export function bindAppEvents(handlers) {
  bindCharacterCreationEvents(handlers.onCreateCharacter, handlers.onCancelCharacterCreation);
  bindNavigationEvents({ onViewChange: handlers.onViewChange });

  bindCombatControlEvents({
    onToggleCombat: handlers.onToggleCombat,
    onToggleAutoHunt: handlers.onToggleAutoHunt,
    onRest: handlers.onRest,
    onStartBoss: handlers.onStartBoss,
    onClearLog: handlers.onClearLog,
  });

  bindDelegatedClickEvents({
    onEquip: handlers.onEquip,
    onEquipRecommended: handlers.onEquipRecommended,
    onUnequip: handlers.onUnequip,
    onSelectRegion: handlers.onSelectRegion,
    onPreviewRegion: handlers.onPreviewRegion,
    onAllocateStat: handlers.onAllocateStat,
    onAllocateStatBatch: handlers.onAllocateStatBatch,
    onAllocateRecommendedStats: handlers.onAllocateRecommendedStats,
    onDeallocateStat: handlers.onDeallocateStat,
    onDeallocateStatBatch: handlers.onDeallocateStatBatch,
    onResetFreeStats: handlers.onResetFreeStats,
    onConfirmFreeStats: handlers.onConfirmFreeStats,
    onSelectStance: handlers.onSelectStance,
    onSelectSkillLoadout: handlers.onSelectSkillLoadout,
    onMoveGateNode: handlers.onMoveGateNode,
    onActivateHyper: handlers.onActivateHyper,
    onCombatFeedbackChange: handlers.onCombatFeedbackChange,
    onCombatViewChange: handlers.onCombatViewChange,
    onBuyShopItem: handlers.onBuyShopItem,
    onSellShopItem: handlers.onSellShopItem,
    onDeveloperAction: handlers.onDeveloperAction,
    onDeveloperOptionChange: handlers.onDeveloperOptionChange,
    onNavigateToView: handlers.onNavigateToView,
    onCombatAction: handlers.onCombatAction,
  });

  bindCombatInfoEvents({
    showCombatInfoFromElement: handlers.onShowCombatInfoFromElement,
    hideCombatInfo: handlers.onHideCombatInfo,
    isTouchDoubleTapMode: handlers.isTouchDoubleTapMode,
  });
  bindInfoTooltipEvents({
    isInfoTooltipEnabled: handlers.isInfoTooltipEnabled,
  });
  bindSaveLoadEvents({
    onExportSave: handlers.onExportSave,
    onImportSaveText: handlers.onImportSaveText,
    onSaveSlot: handlers.onSaveSlot,
    onLoadSlot: handlers.onLoadSlot,
    onClearSlot: handlers.onClearSlot,
    onNewSlot: handlers.onNewSlot,
    onUpdateProfileSettings: handlers.onUpdateProfileSettings,
    onProfileImageError: handlers.onProfileImageError,
    onAudioVolumeChange: handlers.onAudioVolumeChange,
  });
}



