const mongoose = require("mongoose");

const CancelledStalls = mongoose.model(
  "CancelledStalls",
  new mongoose.Schema({
      location:String,
      address:String,
      stallName: String,
      stallPrice: Number,
      bookedBy: String,
      bookedAt: String,
      cancelledAt:String,
      stallNo:Number,
      isBooked:Boolean
  })
);

module.exports = CancelledStalls;