global.agent_base_module = "agent-base4";

require("../../index").fixAgentBase();

test("agent-base v4", () => {
  expect(require("agent-base")).not.toBeUndefined();
});
