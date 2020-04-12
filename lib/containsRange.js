/**
 * Tests if the 1st range fully contains the seconde range
 * @param {*} containingRange - The larger range
 * @param {*} subRange - The smaller range that is contained in the larger range
 */
module.exports = function containsRange([startA, endA], [startB, endB]) {
  return startA <= startB && endA >= endB;
};
