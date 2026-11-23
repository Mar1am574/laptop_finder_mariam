// Return true when the current value is the best one for this specification.
export function isBestValue(laptops, laptop, field, lowerIsBetter = false) {
  const values = laptops.map(item => Number(item[field]));
  const best = lowerIsBetter ? Math.min(...values) : Math.max(...values);
  return Number(laptop[field]) === best;
}
