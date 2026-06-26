export function setSaveStatus(message, root = document) {
  root.querySelectorAll(".save-status").forEach((status) => {
    status.textContent = message;
  });
}
