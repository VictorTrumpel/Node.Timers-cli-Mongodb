const { Router } = require("express");
const { timersRouter } = require("./timersRouter");
const { userRouter } = require("./userRouter");
const { connectToDb } = require("./middleware/connectToDb");
const { auth } = require("./middleware/auth");

const router = Router();

router.use(connectToDb);
router.use(auth);

router.use("/api/timers", timersRouter);
router.use(userRouter);

module.exports = router;
