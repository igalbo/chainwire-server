const express = require("express");
const router = express.Router();
const RatesArray = require("../models/ratesArray");
const getRates = require("../utils/fetchRates");

// Find rates
router.get("/", async (req, res) => {
  const start_date = new Date(req.headers.start_date);
  const end_date = new Date(req.headers.end_date);
  const { base_currency, currency } = req.headers;
  try {
    let entry = await RatesArray.findOne({
      start_date,
      end_date,
      base_currency,
      currency,
    });

    entry && console.log("Entry found in database:\n", entry);

    if (!entry) {
      entry = await RatesArray.findOne({
        start_date: { $lte: start_date },
        end_date: { $gte: end_date },
        base_currency,
        currency,
      });

      const days =
        Math.ceil(
          (end_date.getTime() - start_date.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;

      if (entry) {
        console.log(
          "Found an existing entry in the database that includes the requested range"
        );

        let ratesSubArray = [];

        const offset = Math.ceil(
          (start_date.getTime() - entry.start_date.getTime()) /
            (1000 * 60 * 60 * 24)
        );

        for (let i = offset; i < days + offset; i++) {
          ratesSubArray.push(entry.rates[i]);
        }

        return res.json({ data: ratesSubArray });
      }

      console.log("Selected rqnge was not found in the database, fetching...");

      const rates = await getRates(start_date, days, base_currency, currency);

      if (rates.length != days) {
        return res
          .status(500)
          .json({ message: "Can't fetch data for selected range" });
      }

      const ratesArray = new RatesArray({
        start_date,
        end_date,
        base_currency,
        currency,
        rates,
      });

      entry = await ratesArray.save();
    }

    res.json({ data: entry.rates });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create rate array - in case we want to add rates manually
router.post("/", async (req, res) => {
  const start_date = new Date(req.headers.start_date);
  const end_date = new Date(req.headers.end_date);
  const { base_currency, currency } = req.headers;
  const { rates } = req.body;

  try {
    const entry = await RatesArray.find({
      start_date: { $lte: start_date },
      end_date: { $gte: end_date },
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
      start_date: new Date(start_date),
      end_date: new Date(end_date),
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
