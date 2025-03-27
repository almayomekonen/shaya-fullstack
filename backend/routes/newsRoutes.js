const express = require("express");
const { guard } = require("../guard");
const {
  articles,
  getArticleById,
  createArticle,
  updateArticle,
  deleteArticle,
} = require("../controllers/articles");

const routes = express.Router();

routes.get("/articles", guard, articles);
routes.get("/articles/:id", guard, getArticleById);
routes.post("/articles", guard, createArticle);
routes.put("/articles/:id", guard, updateArticle);
routes.delete("/articles/:id", guard, deleteArticle);

module.exports = routes;
