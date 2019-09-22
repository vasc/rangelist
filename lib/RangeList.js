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
    RangeList.validateRange(newRange);

    // Adding an empty range in the form of [x, x) is allowed but has no effect
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
   * Prints out the list of ranges in the range list
   */
  print() {
    console.log(this);
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
