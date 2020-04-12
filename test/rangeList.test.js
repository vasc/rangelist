const { addRange, removeRange, format } = require("../lib/index");

test("empty range list is empty", () => {
  expect(format([])).toBe("[)");
});

test("adding invalid ranges throws an error", () => {
  expect(() => addRange([], [])).toThrow();
  expect(() => addRange([], [5, 2])).toThrow();
});

test("adding a single range to the list displays that range", () => {
  const rl = addRange([], [1, 5]);
  expect(rl).toStrictEqual([[1, 5]]);
});

test("adding a 2nd range to a list shows a list with 2 ranges", () => {
  const rl = addRange([[1, 5]], [10, 20]);
  expect(rl).toStrictEqual([[1, 5], [10, 20]]);
});

test("adding overlapping ranges returns 1 range", () => {
  let rl = addRange([], [1, 5]);
  rl = addRange(rl, [5, 10]);
  expect(rl).toStrictEqual([[1, 10]]);
});

test("adding an overlaping range to the right, extends the range", () => {
  let rl = addRange([], [1, 5]);
  rl = addRange(rl, [5, 7]);
  expect(rl).toStrictEqual([[1, 7]]);
});

test("adding an overlaping range to the left, extends the range", () => {
  let rl = addRange([], [1, 5]);
  rl = addRange(rl, [-4, 1]);
  expect(rl).toStrictEqual([[-4, 5]]);
});

test("adding an empty range has no effect", () => {
  let rl = addRange([], [1, 5]);
  rl = addRange(rl, [10, 10]);
  expect(rl).toStrictEqual([[1, 5]]);
});

test("removing invalid ranges throws an error", () => {
  expect(() => removeRange([[0, 10]], [])).toThrow();
  expect(() => removeRange([[0, 10]], [5, 2])).toThrow();
});

test("removing the same range from a range list makes the list empty", () => {
  const rl = removeRange([[1, 5]], [1, 5]);
  expect(rl).toStrictEqual([]);
});

test("removing a range from the left shortens the range", () => {
  const rl = removeRange([[1, 5]], [1, 3]);
  expect(rl).toStrictEqual([[3, 5]]);
});

test("removing a range from the right shortens the range", () => {
  const rl = removeRange([[1, 5]], [3, 5]);

  expect(rl).toStrictEqual([[1, 3]]);
});

test("removing an empty range has no effect", () => {
  const rl = removeRange([[1, 5]], [3, 3]);
  expect(rl).toStrictEqual([[1, 5]]);
});

test("removing a range overlapping all existing ranges makes the list empty", () => {
  const rl = removeRange([[1, 5], [10, 20]], [0, 100]);

  // expect(rl.toString()).toBe("[)");
  expect(rl).toStrictEqual([]);
});

test("removing a range in the middle of an existing range splits the existing one in 2", () => {
  const rl = removeRange([[1, 10]], [3, 5]);

  expect(rl).toStrictEqual([[1, 3], [5, 10]]);
});

// test("task examples execute correctly", () => {
//   let rl = addRange([], [1, 5]);
//   expect(rl).toStrictEqual([[1, 5]]);

//   rl.add([10, 20]);
//   expect(rl.toString()).toBe("[1, 5) [10, 20)");

//   rl.add([20, 20]);
//   expect(rl.toString()).toBe("[1, 5) [10, 20)");

//   rl.add([20, 21]);
//   expect(rl.toString()).toBe("[1, 5) [10, 21)");

//   rl.add([2, 4]);
//   expect(rl.toString()).toBe("[1, 5) [10, 21)");

//   rl.add([3, 8]);
//   expect(rl.toString()).toBe("[1, 8) [10, 21)");

//   rl.remove([10, 10]);
//   expect(rl.toString()).toBe("[1, 8) [10, 21)");

//   rl.remove([10, 11]);
//   expect(rl.toString()).toBe("[1, 8) [11, 21)");

//   rl.remove([15, 17]);
//   expect(rl.toString()).toBe("[1, 8) [11, 15) [17, 21)");

//   rl.remove([3, 19]);
//   expect(rl.toString()).toBe("[1, 3) [19, 21)");
// });
