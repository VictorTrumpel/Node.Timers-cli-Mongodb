require("dotenv").config();
const { start } = require("./commands/start");
const { logout } = require("./commands/logout");
const { status } = require("./commands/status");
const { stop } = require("./commands/stop");
const { auth, SIGNUP, LOGIN } = require("./commands/auth");

const commandBundle = {
  signup: auth.bind(null, SIGNUP),
  login: auth.bind(null, LOGIN),
  logout,
  status,
  start,
  stop,
};

commandBundle[process.argv[2]]();
