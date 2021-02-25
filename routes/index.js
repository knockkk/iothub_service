const device = require("./device");
const emqxWebHook = require("./emqxWebHook");
module.exports = (app) => {
  app.use("/device", device);
  app.use("/emqx_web_hook", emqxWebHook);
};
