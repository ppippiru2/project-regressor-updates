export function applyOutgoingDamageTestOption(result, { options = {}, targetHp = 1 } = {}) {
  if (!options.outgoingDamageInfinite) return result;
  const safeTargetHp = Math.max(1, Number(targetHp) || 1);
  return {
    ...result,
    missed: false,
    damage: Math.max(safeTargetHp, Number(result.damage) || 0),
    critical: true,
  };
}

export function applyIncomingDamageTestOption(result, { options = {} } = {}) {
  if (!options.incomingDamageZero || result.evaded) return result;
  return {
    ...result,
    damage: 0,
    critical: false,
  };
}
