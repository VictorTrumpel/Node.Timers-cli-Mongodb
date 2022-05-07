const chalk = require("chalk");
const TimerRequest = require("../controllers/TimerRequest");

const start = async () => {
  const timerName = process.argv[3];

  if (!timerName) {
    console.log(chalk.red("Timer name is not specified!"));
    return;
  }

  const request = new TimerRequest();
  const { response, data: timerId } = await request.post({ description: timerName });

  if (!response.ok) {
    console.log(chalk.red("Failed to create"));
    return;
  }

  console.log(chalk.cyan(`Started timer ${timerName}, ID: ${timerId}`));
};

module.exports.start = start;
