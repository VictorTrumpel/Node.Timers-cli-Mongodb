const chalk = require("chalk");
const Request = require("../controllers/Request");
const { userPrompt } = require("../helpers/userPrompt");
const { session } = require("../controllers/Session");

const SIGNUP = "/signup";
const LOGIN = "/login";

const auth = async (requestUrl) => {
  const userData = await userPrompt();

  const { response, data } = await new Request(requestUrl).post(userData);
  const { message, sessionId } = data;
  const chalkLog = response.ok ? chalk.green : chalk.red;

  if (response.ok && sessionId) {
    session.createSession(sessionId);
  }

  console.log(chalkLog(message));
};

module.exports.auth = auth;
module.exports.SIGNUP = SIGNUP;
module.exports.LOGIN = LOGIN;
