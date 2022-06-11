const express = require("express");
const router = express.Router();
const RatesArray = require("../models/ratesArray");
const getRates = require("../utils/fetchRates");

// Find rate
router.get("/", async (req, res) => {
  const { start_date, end_date, baseCurrency, currencies } = req.headers;
  try {
    const test = await getRates();
    console.log(test);
    const rates = await RatesArray.findOne({
      startDate: start_date,
      endDate: end_date,
      baseCurrency,
      currencies,
    });
    res.json(rates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create rate
router.post("/", async (req, res) => {
  const { start_date, end_date, baseCurrency, currencies } = req.headers;
  const { rates } = req.body;

  try {
    const entry = await RatesArray.find({
      startDate: start_date,
      endDate: end_date,
      baseCurrency,
      currencies,
    });

    if (entry?.length > 0) {
      return res.status(409).json({
        message:
          "The requested currency pair rates data already exists for the selected date range",
      });
    }
    const ratesArray = new RatesArray({
      startDate: start_date,
      endDate: end_date,
      baseCurrency,
      currencies,
      rates,
    });

    const newRatesArray = await ratesArray.save();
    res.status(201).json(newRatesArray);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
