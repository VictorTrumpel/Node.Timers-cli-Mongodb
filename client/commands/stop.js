const TimerRequest = require("../controllers/TimerRequest");
const chalk = require("chalk");

const stop = async () => {
  const timerId = process.argv[3];

  const request = new TimerRequest(`/${timerId}/stop`);
  const { response, data } = await request.post();

  if (!response.ok) {
    console.log(chalk.red(data.message));
    return;
  }

  console.log(chalk.cyan(`Timer ${timerId} stopped`));
};

module.exports.stop = stop;
