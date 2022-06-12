const mongoose = require("mongoose");

const ratesArraySchema = new mongoose.Schema({
  start_date: {
    type: Date,
    required: true,
  },
  end_date: {
    type: Date,
    required: true,
  },
  base_currency: {
    type: String,
    required: true,
    default: "USD",
  },
  currency: {
    type: String,
    required: true,
    default: "EUR",
  },
  rates: {
    type: Array,
    required: false,
  },
});

module.exports = mongoose.model("ratesArray", ratesArraySchema);
