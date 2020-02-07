global.agent_base_module = "agent-base5";

require("../../index").fixAgentBase();

test("agent-base v5", () => {
  expect(require("agent-base")).not.toBeUndefined();
});
