const axios = require("axios");

const jsonBinMasterKey = process.env.JSONBIN_MASTER_KEY;

const getRates = async (
  start_date = new Date("June 14, 2021"),
  days = 5,
  base_currency = "USD",
  currency = "GBP"
) => {
  let pairAddress;
  const ratesArray = [];

  if (base_currency === "EUR" && currency === "USD") {
    pairAddress = "62a49a2305f31f68b3bd3f12/1";
  }
  if (base_currency === "USD" && currency === "GBP") {
    pairAddress = "62a49a3a449a1f382104c836/4";
  }
  try {
    const response = await axios.get(
      `https://api.jsonbin.io/v3/b/${pairAddress}`,
      {
        headers: {
          "X-Master-Key": jsonBinMasterKey,
        },
      }
    );

    const data = response.data?.record["rates"];
    const formattedDate = start_date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    const index = data.findIndex((item) => item?.date === formattedDate);
    for (let i = index; i < index + Number(days); i++) {
      data[i] && ratesArray.push(data[i].value);
    }

    return ratesArray;
  } catch (err) {
    console.error(err);
    return err;
  }
};

module.exports = getRates;
