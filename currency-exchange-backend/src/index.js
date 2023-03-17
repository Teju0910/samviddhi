const axios = require("axios");
const express = require("express");

const app = express();
const cors = require("cors");
app.use(cors());

app.get("/currency-exchange", async (req, res) => {
  const { from, to } = req.query;
  const exchangeRates = await fetchExchangeRates(from, to);
  res.json(exchangeRates);
});

app.get("/convert", async (req, res) => {
  const { from, to, amount } = req.query;

  const exchangeRates = await fetchExchangeRates(from, to);
  const maxRate = Math.max(...exchangeRates.map((rate) => rate.exchange_rate));
  const minRate = Math.min(...exchangeRates.map((rate) => rate.exchange_rate));
  const maxValue = maxRate * amount;
  const minValue = minRate * amount;

  // Send response
  res.json({ max_value: maxValue, min_value: minValue });
});

async function fetchExchangeRates(from, to) {
  const sources = [
    {
      name: "x-rates",
      url: `https://www.x-rates.com/calculator/?from=${from}&to=${to}&amount=1`,
    },
    {
      name: "xe",
      url: `https://www.xe.com/currencyconverter/convert/?Amount=1&From=${from}&To=${to}`,
    },
    { name: "google", url: `https://www.google.com/search?q=${from}+to+${to}` },
  ];
  const exchangeRates = [];
  for (const source of sources) {
    try {
      const response = await axios.get(source.url);

      let exchangeRate;
      switch (source.name) {
        case "x-rates":
          exchangeRate = response.data.match(
            /class="ccOutputRslt">(.+?)<\/span>/
          )[1];
          break;
        case "xe":
          exchangeRate = response.data.match(
            /class="result__BigRate-sc-1bsijpp-1 iGrAod">(.+?)<\/span>/
          )[1];
          break;
        case "google":
          exchangeRate = response.data.match(
            /<div class="DFlfde SwHCTb">(.+?)<\/div>/
          )[1];
          break;
      }
      const pattern = /[0-9]+\.[0-9]+/;
      const match = exchangeRate.match(pattern);
      const result = match ? match[0] : exchangeRate;
      exchangeRates.push({ exchange_rate: result, source: source.url });
    } catch (err) {
      console.error(err);
    }
  }
  return exchangeRates;
}

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
