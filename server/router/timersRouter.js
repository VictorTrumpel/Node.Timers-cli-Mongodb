const { Router } = require("express");
const TimersController = require("../controllers/TimersController");

const timerController = new TimersController();

const timersRouter = Router();

timersRouter.get("/", timerController.getTimerList.bind(timerController));
timersRouter.get("/:id", timerController.getTimerById.bind(timerController));

timersRouter.post("/", timerController.createTimer.bind(timerController));
timersRouter.post("/:id/stop", timerController.stopTimer.bind(timerController));

module.exports.timersRouter = timersRouter;
