require("dotenv").config({ path: "../.env" });
const inquirer = require("inquirer");

inquirer
  .prompt([
    {
      type: "input",
      message: "Pick",
      name: "username",
    },
  ])
  .then((answers) => {
    console.log(answers);
  })
  .catch((error) => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
