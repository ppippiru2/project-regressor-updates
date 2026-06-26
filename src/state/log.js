export function addLogEntry(log, message, maxLines) {
  return [message, ...log].slice(0, maxLines);
}
