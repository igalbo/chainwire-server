const mongoose = require("mongoose");

const ratesArraySchema = new mongoose.Schema({
  startDate: {
    type: Number,
    required: true,
  },
  endDate: {
    type: Number,
    required: true,
  },
  base_currency: {
    type: String,
    required: true,
    default: "USD",
  },
  currencies: {
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
