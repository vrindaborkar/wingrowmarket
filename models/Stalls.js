const mongoose = require("mongoose");

const Stalls = mongoose.model(
  "Stalls",
  new mongoose.Schema({
      location:String,
      address:String,
      stallName: String,
      stallPrice: Number,
      stallNo:Number
  })
);

module.exports = Stalls;