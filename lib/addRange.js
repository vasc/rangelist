const validateRange = require("./validateRange");
const overlaps = require("./overlaps");

/**
 * Adds a new range to an existing range list
 *
 * @param {Array<Array<number>>} ranges Array of ranges, expected to be normalized, i.e. ordered
 * and non-overlaping. You can use the normalize function on a regular list of ranges.
 * @param {Array<number>} newRange Array of two numbers that specify beginning and end of range.
 * @returns {Array<Array<number>>} Returns the new range list with the new range added.
 * This method is not destructive
 */
module.exports = function addRange(ranges, newRange) {
  // adds new ranges to the list using an algorithm optimized for readability and simplicity
  // this is about 3 times more costly that a straightforward iteration over the existing ranges
  // however it's simpler to understand and maintain

  validateRange(newRange);

  // adding an empty range in the form of [x, x) is allowed but has no effect
  if (newRange[0] === newRange[1]) return ranges;

  // take all the ranges that do not overlap with the new range and that come before it
  const rangesBefore = ranges.filter(range => range[1] < newRange[0]);

  // take all the ranges that do not overlap with the new range and that come after it
  const rangesAfter = ranges.filter(range => newRange[1] < range[0]);

  // take all ranges that overlap with the new one
  const rangesOverlap = ranges.filter(range => overlaps(range, newRange));

  // all overlaping ranges will become one, where the start is the minimum of
  // the overlpaing ranges, including the new one, and the end is the maximum
  const overlapStart = Math.min(newRange[0], ...rangesOverlap.map(r => r[0]));
  const overlapEnd = Math.max(newRange[1], ...rangesOverlap.map(r => r[1]));

  // after adding a new range, the new ordered range list is the concatenation of all ranges
  // that come before it, the new central range made out of the overlaping ones, and all that come after it
  return [...rangesBefore, [overlapStart, overlapEnd], ...rangesAfter];
};
