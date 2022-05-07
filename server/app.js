require("dotenv").config();
const express = require("express");
const router = require("./router/router");

const app = express();
app.use(express.json());
app.use(express.static("public"));
app.use(router);

app.listen(5000);

module.exports = app;
