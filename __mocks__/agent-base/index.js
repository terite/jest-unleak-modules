if (!global.agent_base_module) {
  throw new Error("Must set agent-base-module before requiring agent-base");
}
module.exports = require(global.agent_base_module);
