const chalk = require("chalk");
const TimerRequest = require("../controllers/TimerRequest");
const { printTimers } = require("../helpers/printTimers");

const status = async () => {
  const argument = process.argv[3];

  const requestUrl = argument ? (argument === "old" ? "?isActive=false" : `/${argument}`) : "?isActive=true";

  const request = new TimerRequest(requestUrl);
  const { response, data } = await request.get();

  if (!response.ok) {
    console.log(chalk.red(data.message));
    return;
  }

  const timers = data instanceof Array ? [...data] : [data];

  if (!timers?.length) {
    console.log(chalk.cyan(`You have no ${argument === "old" ? "old" : "active"} timers`));
    return;
  }

  printTimers(timers);
};

module.exports.status = status;
