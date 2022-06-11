const axios = require("axios");

const currencyUrl = "https://api.currencyapi.com/v3/historical";
const apiKey = "gsT6tt5iHcOCF2JFi7i50HMhwzlh5bI9ySPVoAdx";

const getRates = () => {
  return axios
    .get(currencyUrl, {
      params: {
        apiKey,
        date: "2022-01-04",
        base_currency: "USD",
        currencies: "AUD",
      },
    })
    .then((res) => console.log(res.data.data))
    .catch((err) => console.log(err.message));
};

module.exports = getRates;
