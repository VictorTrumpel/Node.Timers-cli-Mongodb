const { Router } = require("express");
const bodyParser = require("body-parser");
const UserController = require("../controllers/UserController");

const userController = new UserController();

const userRouter = Router();

userRouter.post("/login", userController.logIn.bind(userController));
userRouter.post("/signup", userController.singUp.bind(userController));
userRouter.get("/logout", userController.logOut.bind(userController));

module.exports.userRouter = userRouter;
