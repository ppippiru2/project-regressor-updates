import { renderBalanceTuningDetailView } from "./balanceTuningDetailView.js?v=675";

export function createBalanceTuningDetailRenderer() {
  return function renderBalanceTuningDetailSection(options = {}) {
    return renderBalanceTuningDetailView(options);
  };
}
