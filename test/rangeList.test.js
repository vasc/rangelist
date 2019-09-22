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

test("removing invalid ranges throws an error", () => {
  expect(() => rl.remove([])).toThrow();
  expect(() => rl.remove([5, 2])).toThrow();
});

test("removing the same range from a range list makes the list empty", () => {
  rl.add([1, 5]);
  rl.remove([1, 5]);
  expect(rl.toString()).toBe("[)");
});

test("removing a range from the left shortens the range", () => {
  rl.add([1, 5]);
  rl.remove([1, 3]);
  expect(rl.toString()).toBe("[3, 5)");
});

test("removing a range from the right shortens the range", () => {
  rl.add([1, 5]);
  rl.remove([3, 5]);
  expect(rl.toString()).toBe("[1, 3)");
});

test("removing an empty range has no effect", () => {
  rl.add([1, 5]);
  rl.remove([3, 3]);
  expect(rl.toString()).toBe("[1, 5)");
});

test("removing a range overlapping all existing ranges makes the list empty", () => {
  rl.add([1, 5]);
  rl.add([10, 20]);
  rl.remove([0, 100]);

  expect(rl.toString()).toBe("[)");
});

test("removing a range in the middle of an existing range splits the existing one in 2", () => {
  rl.add([1, 10]);
  rl.remove([3, 5]);

  expect(rl.toString()).toBe("[1, 3) [5, 10)");
});

test("calling RangeList::print will print the list representation to the console", () => {
  const spy = jest.spyOn(console, "log").mockImplementation();

  rl.add([1, 5]);
  rl.print();

  expect(spy).toHaveBeenCalledTimes(1);
  expect(spy).toHaveBeenLastCalledWith("[1, 5)");

  spy.mockRestore();
});

test("task examples execute correctly", () => {
  expect(rl.ranges).toStrictEqual([]);

  rl.add([1, 5]);
  expect(rl.toString()).toBe("[1, 5)");

  rl.add([10, 20]);
  expect(rl.toString()).toBe("[1, 5) [10, 20)");

  rl.add([20, 20]);
  expect(rl.toString()).toBe("[1, 5) [10, 20)");

  rl.add([20, 21]);
  expect(rl.toString()).toBe("[1, 5) [10, 21)");

  rl.add([2, 4]);
  expect(rl.toString()).toBe("[1, 5) [10, 21)");

  rl.add([3, 8]);
  expect(rl.toString()).toBe("[1, 8) [10, 21)");

  rl.remove([10, 10]);
  expect(rl.toString()).toBe("[1, 8) [10, 21)");

  rl.remove([10, 11]);
  expect(rl.toString()).toBe("[1, 8) [11, 21)");

  rl.remove([15, 17]);
  expect(rl.toString()).toBe("[1, 8) [11, 15) [17, 21)");

  rl.remove([3, 19]);
  expect(rl.toString()).toBe("[1, 3) [19, 21)");
});
