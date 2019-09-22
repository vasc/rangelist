const { RangeList } = require("../lib/RangeList");

let rl;
beforeEach(() => {
  rl = new RangeList();
});

test("empty range list is empty", () => {
  expect(rl.toString()).toBe("[)");
});

