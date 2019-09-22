/**
 * Tests if 2 ranges overlap
 * @param {Array<number>} range1
 * @param {Array<number>} range2
 */
const overlaps = ([startA, endA], [startB, endB]) => {
  if (startB > endA) return false;
  if (endB < startA) return false;

  return true;
};

/**
 * Tests if the 1st range fully contains the seconde range
 * @param {*} containingRange - The larger range
 * @param {*} subRange - The smaller range that is contained in the larger range
 */
const containsRange = ([startA, endA], [startB, endB]) =>
  startA <= startB && endA >= endB;

/**
 * Represent a list of ranges. A pair of integers define a range, for example: [1, 5). This range includes integers: 1, 2, 3, and 4.
 * A range list is an aggregate of these ranges: [1, 5), [10, 11), [100, 201)
 */
class RangeList {
  constructor() {
    this.ranges = [];
  }

  /**
   * Throws an error is the passed range is not valid.
   * @param {Array<number>} range - Range value to validate, must be a 2 number tupple where the
   * 1st member represents the beginning of the range and the second member represents the end of the range
   */
  static validateRange(range) {
    if (range.length !== 2)
      throw new Error("A range must be a tuple of 2 values");
    if (range[1] < range[0])
      throw new Error(
        "The end value of the range must be equal or larger than the start value"
      );
  }

  /**
   * Adds a range to the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  add(newRange) {
    // adds new ranges to the list using an algoright optimized for readability and simplicity
    // this is about 3 times more costly that an straightforward iteration over the existing ranges
    // however it's simpler to understand and maintain

    RangeList.validateRange(newRange);

    // adding an empty range in the form of [x, x) is allowed but has no effect
    if (newRange[0] === newRange[1]) return;

    // take all the ranges that do not overlap with the new range and that come before it
    const rangesBefore = this.ranges.filter(range => range[1] < newRange[0]);

    // take all the ranges that do not overlap with the new range and that come after it
    const rangesAfter = this.ranges.filter(range => newRange[1] < range[0]);

    // take all ranges that overlap with the new one
    const rangesOverlap = this.ranges.filter(range =>
      overlaps(range, newRange)
    );

    // all overlaping ranges will become one, where the start is the minimum of
    // the overlpaing ranges, including the new one, and the end is the maximum
    const overlapStart = Math.min(newRange[0], ...rangesOverlap.map(r => r[0]));
    const overlapEnd = Math.max(newRange[1], ...rangesOverlap.map(r => r[1]));

    // after adding a new range, the new ordered range list is the concatenation of all ranges
    // that come before it, the new central range made out of the overlaping ones, and all that come after it
    this.ranges = [...rangesBefore, [overlapStart, overlapEnd], ...rangesAfter];
  }

  /**
   * Removes a range from the list
   * @param {Array<number>} range - Array of two integers that specify beginning and end of range.
   */
  remove(deletedRange) {
    RangeList.validateRange(deletedRange);

    // deleting an empty range in the form of [x, x) is allowed but has no effect
    if (deletedRange[0] === deletedRange[1]) return;

    // recreates the range list without the deleted range by iterating over the ranges
    // in the existing list. Non overlaping ranges are kept as is, ranges that are completely
    // contained are deleted, and the remaining ones are recreated without the deleted parts
    let newRanges = this.ranges.reduce((acc, range) => {
      // if the deleted range does not touch the current range, pass it through
      if (!overlaps(deletedRange, range)) return [...acc, range];

      // if the deleted range contains the current range, swallow the current range
      if (containsRange(deletedRange, range)) return acc;

      // if the current range contains the deleted range, split it in 2
      if (containsRange(range, deletedRange))
        return [
          ...acc,
          [range[0], deletedRange[0]],
          [deletedRange[1], range[1]]
        ];

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

    this.ranges = newRanges;
  }

  /**
   * Prints out the list of ranges in the range list
   */
  print() {
    console.log(this.toString());
  }

  toString() {
    if (!this.ranges.length) return "[)";

    const displayRanges = this.ranges.map(
      range => `[${range[0]}, ${range[1]})`
    );
    return displayRanges.join(" ");
  }
}

module.exports = { RangeList };
