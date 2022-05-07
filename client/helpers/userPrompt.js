const inquirer = require("inquirer");

const UsernamePrompt = {
  name: "username",
  message: "Username",
};

const PasswordPrompt = {
  type: "password",
  name: "password",
  message: "Password",
};

const userPrompt = inquirer.prompt.bind(inquirer, [UsernamePrompt, PasswordPrompt]);

module.exports.userPrompt = userPrompt;
