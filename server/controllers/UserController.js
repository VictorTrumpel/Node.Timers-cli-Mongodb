const _ = require("lodash");
const { nanoid } = require("nanoid");
const bcrypt = require("bcrypt");
const tryCatchCRUD = require("../helpers/tryCatch");

class UserController {
  async logIn(req, res) {
    await tryCatchCRUD(res, async () => {
      const { username, password } = _.pick(req.body, "username", "password");
      const user = await req.usersCollection.findOne({ username });

      if (!user) throw new Error("Username is missing");
      if (!password) throw new Error("Password is missing");

      const isPassword = await bcrypt.compare(password, user.password);

      if (!isPassword) throw new Error("Auth error");

      const sessionId = await createSession(req.sessionsCollection, user._id);
      return res.json({ sessionId });
    });
  }

  async logOut(req, res) {
    await tryCatchCRUD(res, async () => {
      if (!req.user) throw new Error("Unknown user");
      if (!req.sessionId) throw new Error("Session expired");

      await deleteSession(req.sessionsCollection, req.sessionId);
      res.status(200).json({ message: "Success logout" });
    });
  }

  async singUp(req, res) {
    await tryCatchCRUD(res, async () => {
      const { username, password } = _.pick(req.body, "username", "password");
      const isUserExists = await req.usersCollection.findOne({ username });

      if (isUserExists || !password || !username) {
        const errMessage = isUserExists
          ? "Name is already taken"
          : !password
          ? "Password is missing"
          : !username
          ? "Username is missing"
          : "Unexpected registration error";
        throw new Error(errMessage);
      }

      const hashPassword = await bcrypt.hash(password, 5);

      await req.usersCollection.insertOne({ username, password: hashPassword });
      return res.status(200).json({ message: "Successful registration" });
    });
  }
}

async function createSession(sessionsCollection, userId) {
  const session = await sessionsCollection.findOne({ userId });
  const sessionId = session ? session.sessionId : nanoid();

  if (!session) {
    await sessionsCollection.insertOne({ sessionId, userId });
  }

  return sessionId;
}

const deleteSession = async (sessionsCollection, sessionId) => {
  await sessionsCollection.deleteOne({ sessionId });
};

module.exports = UserController;
