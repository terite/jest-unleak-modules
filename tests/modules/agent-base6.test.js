global.agent_base_module = "agent-base6";

require("../../index").fixAgentBase();

test("agent-base v6", () => {
  expect(require("agent-base")).not.toBeUndefined();
});
