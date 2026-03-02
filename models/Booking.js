const mongoose = require("mongoose");

const BookingSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: true
  },
  campground: {
    type: mongoose.Schema.ObjectId,
    ref: "Campground",
    required: true
  },
  checkInDate: {
    type: Date,
    required: true
  },
  nights: {
    type: Number,
    required: true,
    max: 3   // จำกัด 3 คืน
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Booking", BookingSchema);