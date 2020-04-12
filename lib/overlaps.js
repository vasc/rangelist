/**
 * Tests if 2 ranges overlap
 * @param {Array<number>} range1
 * @param {Array<number>} range2
 */
module.exports = function overlaps([startA, endA], [startB, endB]) {
  if (startB > endA) return false;
  if (endB < startA) return false;

  return true;
};
