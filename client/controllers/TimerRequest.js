const Request = require("./Request");
const { session } = require("../controllers/Session");

class TimerRequest extends Request {
  constructor(url) {
    const sessionId = session.readSession();
    super(`/api/timers${url ? url : ""}`, { sessionId });
  }
}

module.exports = TimerRequest;
