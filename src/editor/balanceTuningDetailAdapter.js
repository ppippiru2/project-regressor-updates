import { renderBalanceTuningDetailView } from "./balanceTuningDetailView.js?v=678";

export function createBalanceTuningDetailRenderer() {
  return function renderBalanceTuningDetailSection(options = {}) {
    return renderBalanceTuningDetailView(options);
  };
}
