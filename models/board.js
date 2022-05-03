const mongoose = require("mongoose");
const boardSchema = new mongoose.Schema({
  boardName: String,
  articles: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Article",
  },
});

module.exports = mongoose.model("Board", boardSchema);
