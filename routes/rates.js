const express = require("express");
const router = express.Router();
const RatesArray = require("../models/ratesArray");
const getRates = require("../utils/fetchRates");

// Find rate
router.get("/", async (req, res) => {
  const { start_date, days, base_currency, currency } = req.headers;
  try {
    let entry = await RatesArray.findOne({
      start_date,
      days,
      base_currency,
      currency,
    });

    entry && console.log("Entry found in database:\n", entry);

    if (!entry) {
      console.log("Entry does not exist in the database, fetching...");

      const rates = await getRates(start_date, days, base_currency, currency);

      const ratesArray = new RatesArray({
        start_date,
        days,
        base_currency,
        currency,
        rates,
      });

      entry = await ratesArray.save();
    }

    res.json(entry.rates);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create rate - in case we want to add rates manually
router.post("/", async (req, res) => {
  const { start_date, days, base_currency, currency } = req.headers;
  const { rates } = req.body;

  try {
    const entry = await RatesArray.find({
      start_date,
      days,
      base_currency,
      currency,
    });

    if (entry?.length > 0) {
      return res.status(409).json({
        message:
          "The requested currency pair rates data already exists for the selected date range",
      });
    }
    const ratesArray = new RatesArray({
      start_date,
      days,
      base_currency,
      currency,
      rates,
    });

    const newRatesArray = await ratesArray.save();
    res.status(201).json(newRatesArray);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
