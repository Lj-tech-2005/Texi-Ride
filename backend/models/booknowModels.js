const mongoose = require("mongoose");

const booknowSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  phoneNumber: {
    type: String,
    required: true,
    // Supports international & local numbers: "+91 9509086103", "95090 86103", "(282) 424-9698"
    match: /^[+\d]?(?:[\d\s().-]*)$/,
  },

  pickupPoint: {
    type: String,
    required: true,
  },

  dropOffPoint: {
    type: String,
    required: true,
  },

  passengerCount: {
    type: Number,
    required: true,
    min: 1,
  },

  date: {
    type: String,
    required: true,
    // Supports both "YYYY-MM-DD" and "DD-MM-YYYY"
    match: /^(\d{4}-\d{2}-\d{2}|\d{2}-\d{2}-\d{4})$/,
  },

  time: {
    type: String,
    required: true,
    // 24-hour format: "13:40", "07:36"
    match: /^([01]\d|2[0-3]):([0-5]\d)$/,
  },

  message: {
    type: String,
    default: "",
  },
  status: {
    type: Boolean,
    default:false, // true = active, false = inactive
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const BooknowModel = mongoose.model("Booknow", booknowSchema);

module.exports = BooknowModel;
