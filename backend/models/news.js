const mongoose = require("mongoose");

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String }, 
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("news", newsSchema);
