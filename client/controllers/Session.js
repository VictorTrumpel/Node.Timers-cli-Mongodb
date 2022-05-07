const os = require("os");
const path = require("path");
const fs = require("fs");

class Session {
  #homeDir = os.homedir();
  #isWindows = os.type().match(/windows/i);
  #sessionName = "";
  #sessionFilePath = "";

  constructor(sessionName) {
    this.#sessionName = sessionName;
    this.#sessionFilePath = path.join(this.#homeDir, `${this.#isWindows ? "_" : "."}${this.#sessionName}`);
  }

  readSession() {
    try {
      return fs.readFileSync(this.#sessionFilePath, "utf-8");
    } catch (e) {
      throw new Error("Session not found");
    }
  }

  createSession(data) {
    try {
      fs.writeFileSync(this.#sessionFilePath, data);
    } catch (e) {
      throw new Error("Cannot create session!");
    }
  }

  deleteSession() {
    try {
      fs.unlinkSync(this.#sessionFilePath);
    } catch (e) {
      console.log(e);
    }
  }
}

const session = new Session("sb-timers-session");

module.exports.session = session;
