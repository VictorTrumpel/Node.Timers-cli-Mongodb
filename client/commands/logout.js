const { session } = require("../controllers/Session");
const Request = require("../controllers/Request");
const chalk = require("chalk");

const logout = async () => {
  const sessionId = session.readSession();

  const request = new Request("/logout", { sessionId });
  const { response, data } = await request.get();

  const chalkLog = response.ok ? chalk.green : chalk.red;

  if (response.ok) {
    session.deleteSession();
  }

  console.log(chalkLog(data.message));
};

module.exports.logout = logout;
