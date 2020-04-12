module.exports = function format(rangeList) {
  if (!rangeList.length) return "[)";

  const displayRanges = rangeList.map(range => `[${range[0]}, ${range[1]})`);
  return displayRanges.join(" ");
};
