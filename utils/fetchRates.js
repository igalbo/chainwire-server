const axios = require("axios");

// const currencyUrl = "https://api.currencyapi.com/v3/historical";
// const apiKey = "2IIZTzDoEhjUAaOgdwFBRfgglha3zcB5coJtIfPZ";
const jsonBinMasterKey =
  "$2b$10$q0XlGTZAerViDzQmObR3h..iVQfbdFf63evAbaAHo6k9PDMSopKNS";

// const getRatesApi = (
//   date = "2022-01-02",
//   base_currency = "USD",
//   currencies = "GBP"
// ) => {
//   return axios
//     .get(currencyUrl, {
//       params: {
//         apiKey,
//         date,
//         base_currency,
//         currencies,
//       },
//     })
//     .then((res) => console.log(res.data.data[currencies].value))
//     .catch((err) => console.log(err.message));
// };

const getRates = async (
  start_date = "June 14, 2021",
  days = 5,
  base_currency = "USD",
  currency = "GBP"
) => {
  let pairAddress;
  const ratesArray = [];

  if (base_currency === "EUR" && currency === "USD") {
    pairAddress = "62a49a2305f31f68b3bd3f12";
  }
  if (base_currency === "USD" && currency === "GBP") {
    pairAddress = "62a49a3a449a1f382104c836";
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

    const index = data.findIndex((item) => item?.date === start_date);
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
