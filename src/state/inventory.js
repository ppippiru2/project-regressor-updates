export function addInventoryItem(inventory, itemId) {
  const existing = inventory.find((entry) => entry.itemId === itemId);
  if (existing) existing.count += 1;
  else inventory.push({ itemId, count: 1 });
  return inventory;
}

export function consumeInventoryItem(inventory, itemId, amount = 1) {
  const entry = inventory.find((item) => item.itemId === itemId);
  if (!entry) return inventory;
  entry.count -= amount;
  return inventory.filter((item) => item.count > 0);
}
