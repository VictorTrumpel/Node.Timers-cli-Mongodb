require("dotenv").config({ path: "../.env" });
const router = require("./router/router");
const express = require("express");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(router);

app.listen(3000);

module.exports = app;
