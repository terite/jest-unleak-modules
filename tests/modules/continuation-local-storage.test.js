require("../../index").fixContinuationLocalStorage();

test("continuation-local-storage", () => {
  const cls = require("continuation-local-storage");
  expect(cls).not.toBeUndefined();
});
