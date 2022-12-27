const mongoose = require("mongoose");

const Feedback = mongoose.model(
  "Feedback",
  new mongoose.Schema({
    stars: Number,
    message: String,
  })
);

module.exports = Feedback;
