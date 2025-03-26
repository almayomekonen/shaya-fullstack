const express = require("express");
const { signup, login } = require("../controllers/auth");

const routes = express.Router();

routes.post("/signup", signup);
routes.post("/login", login);

module.exports = routes;
