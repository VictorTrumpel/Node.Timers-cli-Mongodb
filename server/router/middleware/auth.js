async function auth(req, res, next) {
  const sessionId = req.headers["sessionid"];

  if (!sessionId) {
    req.user = null;
    return next();
  }

  const session = await req.sessionsCollection.findOne({ sessionId });

  if (session) {
    req.user = await req.usersCollection.findOne({ _id: session.userId });
    req.sessionId = sessionId;
  }

  return next();
}

module.exports.auth = auth;
