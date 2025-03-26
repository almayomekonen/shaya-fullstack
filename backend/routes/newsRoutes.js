const express = require("express");

const { guard } = require("../guard");
const { articles } = require("../controllers/articles");

const routes = express.Router();

routes.get("/articles", guard, articles);

module.exports = routes;
