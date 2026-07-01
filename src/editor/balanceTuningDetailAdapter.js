import { renderBalanceTuningDetailView } from "./balanceTuningDetailView.js?v=680";

export function createBalanceTuningDetailRenderer() {
  return function renderBalanceTuningDetailSection(options = {}) {
    return renderBalanceTuningDetailView(options);
  };
}
