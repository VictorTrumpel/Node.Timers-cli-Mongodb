const _ = require("lodash");
const { ObjectId } = require("mongodb");
const tryCatchCRUD = require("../helpers/tryCatch");
const booleanFromString = require("../helpers/booleanFromString");

class TimersController {
  async getTimerList(req, res) {
    await tryCatchCRUD(res, async () => {
      const isActive = booleanFromString(req.query.isActive);

      if (!req.user) throw new Error("Not authorized!");

      const bdQuery = _.omitBy(
        { ...req.query, isActive, userId: req.user._id },
        _.isUndefined
      );

      const timers = (await req.timersCollection.find(bdQuery).toArray()).map(
        (timer) => {
          const endTimerDate = timer.end || new Date();
          const progress = Number(endTimerDate - timer.start);
          return { ...timer, progress };
        }
      );

      res.json(timers);
    });
  }

  async getTimerById(req, res) {
    await tryCatchCRUD(res, async () => {
      const id = req.params.id;

      const timer = await req.timersCollection.findOne({ _id: ObjectId(id) });

      if (!timer) throw new Error("timer not found");

      const endTimerDate = timer.end || new Date();
      const progress = Number(endTimerDate - timer.start);

      res.json({ ...timer, progress });
    });
  }

  async createTimer(req, res) {
    await tryCatchCRUD(res, async () => {
      if (!req.user) throw new Error("Not authorized!");

      const { insertedId } = await req.timersCollection.insertOne({
        start: new Date(),
        userId: req.user._id,
        description: req.body.description,
        isActive: true,
      });

      res.status(200).json(insertedId);
    });
  }

  async stopTimer(req, res) {
    await tryCatchCRUD(res, async () => {
      const timerId = req.path.split("/")[1];
      const findOptions = { _id: ObjectId(timerId) };
      const updateDoc = { $set: { isActive: false, end: new Date() } };

      await req.timersCollection.updateOne(findOptions, updateDoc);
      res.status(200).json({});
    });
  }
}

module.exports = TimersController;
