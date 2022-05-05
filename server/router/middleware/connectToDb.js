const tryCatch = require("../../helpers/tryCatch");
const { clientPromise } = require("../../helpers/clientPromise");

const Timers = "timers";
const Users = "users";
const Sessions = "sessions";

async function connectToDb(req, res, next) {
  await tryCatch(res, async () => {
    const client = await clientPromise;
    const db = client.db(process.env.DB_NAME);

    req.db = db;
    req.timersCollection = db.collection(Timers);
    req.usersCollection = db.collection(Users);
    req.sessionsCollection = db.collection(Sessions);

    next();
  });
}

module.exports.connectToDb = connectToDb;
