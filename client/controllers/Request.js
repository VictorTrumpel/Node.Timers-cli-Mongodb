const fetch = require("node-fetch");

class Request {
  #headers = { "Content-Type": "application/json", Accept: "application/json" };
  #serverUrl = process.env.SERVER_URL;
  #url = "";

  constructor(url, headers) {
    this.#url = url;
    this.#headers = headers ? { ...this.#headers, ...headers } : this.#headers;
  }

  async request(method, options) {
    try {
      const response = await fetch(`${this.#serverUrl}${this.#url}`, {
        method: method,
        headers: this.#headers,
        body: JSON.stringify(options),
      });

      const data = await response.json();

      return { response, data };
    } catch (e) {
      return { response: { ok: false }, data: { message: "Bad request" } };
    }
  }

  async post(data) {
    return await this.request("POST", data);
  }

  async get(data) {
    return await this.request("GET", data);
  }
}

module.exports = Request;
