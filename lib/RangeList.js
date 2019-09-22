class RangeList {
  constructor() {
    this.ranges = [];
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
