import { renderBalanceTuningDetailView } from "./balanceTuningDetailView.js?v=679";

export function createBalanceTuningDetailRenderer() {
  return function renderBalanceTuningDetailSection(options = {}) {
    return renderBalanceTuningDetailView(options);
  };
}
