const axios = require("axios");

const getExchangePrice = async (price) => {
  const apiKey = process.env.API_KEY;
  const from = "KRW";
  const to = "USD";
  const requestUrl = `https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${price}`;
  const response = await axios({
    method: "GET",
    url: requestUrl,
    headers: {
      apiKey: apiKey,
    },
  });
  const result = response.data.result.toFixed(2);
  return result;
};

module.exports = getExchangePrice;
