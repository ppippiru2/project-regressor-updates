import { renderBalanceTuningDetailView } from "./balanceTuningDetailView.js?v=677";

export function createBalanceTuningDetailRenderer() {
  return function renderBalanceTuningDetailSection(options = {}) {
    return renderBalanceTuningDetailView(options);
  };
}
