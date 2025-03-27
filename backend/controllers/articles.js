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

exports.getArticleById = async (req, res) => {
  try {
    const article = await Article.findById(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({
      ...article.toObject(),
      id: article._id,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.createArticle = async (req, res) => {
  try {
    const { title, createdAt, publishedAt, views } = req.body;

    const article = new Article({
      title,
      createdAt: createdAt || new Date(),
      publishedAt,
      views: views || 0,
    });

    const savedArticle = await article.save();

    res.status(201).json({
      ...savedArticle.toObject(),
      id: savedArticle._id,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.updateArticle = async (req, res) => {
  try {
    const { title, createdAt, publishedAt, views } = req.body;

    const updatedArticle = await Article.findByIdAndUpdate(
      req.params.id,
      { title, createdAt, publishedAt, views },
      { new: true }
    );

    if (!updatedArticle) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({
      ...updatedArticle.toObject(),
      id: updatedArticle._id,
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.deleteArticle = async (req, res) => {
  try {
    const article = await Article.findByIdAndDelete(req.params.id);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    res.json({ message: "Article deleted successfully" });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
