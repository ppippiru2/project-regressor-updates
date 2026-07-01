import { renderBalanceTuningDetailView } from "./balanceTuningDetailView.js?v=676";

export function createBalanceTuningDetailRenderer() {
  return function renderBalanceTuningDetailSection(options = {}) {
    return renderBalanceTuningDetailView(options);
  };
}
