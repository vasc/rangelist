/**
 * Throws an error is the passed range is not valid.
 * @param {Array<number>} range - Range value to validate, must be a 2 number tupple where the
 * 1st member represents the beginning of the range and the second member represents the end of the range
 */
module.exports = function validateRange(range) {
  if (range.length !== 2)
    throw new Error("A range must be a tuple of 2 values");
  if (range[1] < range[0])
    throw new Error(
      "The end value of the range must be equal or larger than the start value"
    );
};
