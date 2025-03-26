const Article = require("../models/article");

exports.articles = async (req, res) => {
  try {
    let articles = await Article.find();

    articles = articles.map((article) => ({
      ...article.toObject(),
      id: article._id,
    }));

    res.json(articles);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
