const express = require("express");
const News =require("../models/news")
const router = express.Router();

// Add News
router.post("/", async (req, res) => {
  try {
    const { title, description, imageUrl } = req.body;
    const newNews = new News({ title, description, imageUrl });
    await newNews.save();
    res.status(201).json(newNews);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All News
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ date: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete News
router.delete("/:id", async (req, res) => {
  try {
    await News.findByIdAndDelete(req.params.id);
    res.json({ message: "News deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
