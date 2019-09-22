const { RangeList } = require("../lib/RangeList");

let rl;
beforeEach(() => {
  rl = new RangeList();
});

test("empty range list is empty", () => {
  expect(rl.toString()).toBe("[)");
});

test("adding invalid ranges throws an error", () => {
  expect(() => rl.add([])).toThrow();
  expect(() => rl.add([5, 2])).toThrow();
});

test("adding a single range to the list displays that range", () => {
  rl.add([1, 5]);
  expect(rl.toString()).toBe("[1, 5)");
});

test("adding a 2nd range to a list shows a list with 2 ranges", () => {
  rl.add([1, 5]);
  rl.add([10, 20]);
  expect(rl.toString()).toBe("[1, 5) [10, 20)");
});

test("adding overlapping ranges returns 1 range", () => {
  rl.add([1, 5]);
  rl.add([5, 10]);
  expect(rl.toString()).toBe("[1, 10)");
});

test("adding an overlaping range to the right, extends the range", () => {
  rl.add([1, 5]);
  rl.add([5, 7]);
  expect(rl.toString()).toBe("[1, 7)");
});

test("adding an overlaping range to the left, extends the range", () => {
  rl.add([1, 5]);
  rl.add([-4, 1]);
  expect(rl.toString()).toBe("[-4, 5)");
});

test("adding an empty range has no effect", () => {
  rl.add([1, 5]);
  rl.add([10, 10]);
  expect(rl.toString()).toBe("[1, 5)");
});

