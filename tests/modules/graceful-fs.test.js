require("../../index").fixGracefulFs();

test("graceful-fs", () => {
  expect(require("graceful-fs")).not.toBeUndefined();
});
