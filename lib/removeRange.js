const validateRange = require("./validateRange");
const overlaps = require("./overlaps");
const containsRange = require("./containsRange");

/**
 * Removes a range from a range list
 *
 * @param {Array<Array<number>>} ranges Array of ranges, expected to be normalized, i.e. ordered
 * and non-overlaping. You can use the normalize function on a regular list of ranges.
 * @param {Array<number>} deletedRange Array of two numbers that specify beginning and end of range.
 * @returns {Array<Array<number>>} Returns the new range list with the range deleted. This method is not destructive
 */
module.exports = function removeRange(ranges, deletedRange) {
  validateRange(deletedRange);

  // deleting an empty range in the form of [x, x) is allowed but has no effect
  if (deletedRange[0] === deletedRange[1]) return ranges;

  // recreates the range list without the deleted range by iterating over the ranges
  // in the existing list. Non overlaping ranges are kept as is, ranges that are completely
  // contained are deleted, and the remaining ones are recreated without the deleted parts
  let newRanges = ranges.reduce((acc, range) => {
    // if the deleted range does not touch the current range, pass it through
    if (!overlaps(deletedRange, range)) return [...acc, range];

    // if the deleted range contains the current range, swallow the current range
    if (containsRange(deletedRange, range)) return acc;

    // if the current range contains the deleted range, split it in 2
    if (containsRange(range, deletedRange))
      return [...acc, [range[0], deletedRange[0]], [deletedRange[1], range[1]]];

    // if none of the above is true and the deleted range overlaps the beginning
    // of the current range, keep the end of the current range
    if (deletedRange[0] < range[0])
      return [...acc, [deletedRange[1], range[1]]];

    // if nothing else is true, then the deleted range must overlap with the end
    // of the current range, so we only keep the beginning
    return [...acc, [range[0], deletedRange[0]]];
  }, []);

  // to simplify the algorithm above we may get some meaningless ranges in the form
  // of [x, x); lets delete all of those
  newRanges = newRanges.filter(range => range[0] !== range[1]);

  return newRanges;
};
