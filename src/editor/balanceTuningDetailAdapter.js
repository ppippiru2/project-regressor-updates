import { renderBalanceTuningDetailView } from "./balanceTuningDetailView.js?v=681";

export function createBalanceTuningDetailRenderer() {
  return function renderBalanceTuningDetailSection(options = {}) {
    return renderBalanceTuningDetailView(options);
  };
}
