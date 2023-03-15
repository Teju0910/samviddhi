const axios = require("axios");
const express = require("express");

const app = express();
const cors=require("cors");
const corsOptions ={
   origin:'*', 
   credentials:true,            //access-control-allow-credentials:true
   optionSuccessStatus:200,
}

app.use(cors(corsOptions)) 

// Define the currency exchange route
app.get("/currency-exchange", async (req, res) => {
  const { from, to } = req.query;
  const sources = [
    {
      name: "x-rates",
      url: `https://www.x-rates.com/calculator/?from=${from}&to=${to}&amount=1`,
    },
    {
      name: "xe",
      url: `https://www.xe.com/currencyconverter/convert/?Amount=1&From=${from}&To=${to}`,
    },
    {
      name: "oanda",
      url: `https://www.oanda.com/currency/converter/#converter|${from}|${to}|1`,
    },
    { name: "google", url: `https://www.google.com/search?q=${from}+to+${to}` },
  ];

  const exchangeRates = [];
  for (const source of sources) {
    try {
      const response = await axios.get(source.url);
      let exchangeRate;

      console.log(response.data.match(
        /class="ccOutputTrail">(.+?)<\/span>/
      )[1],"-response")

      switch (source.name) {
        case "x-rates":
          exchangeRate = response.data.match(
            /class="ccOutputTrail">(.+?)<\/span>/
          )[1];
          break;
        case "xe":
          exchangeRate = response.data.match(
            /class="uccResultAmount">(.+?)<\/span>/
          )[1];
          break;
        case "oanda":
          exchangeRate = response.data.match(
            /class="currency_converter_result">\s*(.+?)\s*</
          )[1];
          break;
        case "google":
          exchangeRate = response.data.match(
            /<div class="BNeawe iBp4i AP7Wnd">(.+?)<\/div>/
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
});

app.get("/convert", async (req, res) => {
  const { from, to, amount } = req.query;

  // Fetch exchange rates for the given currencies
  const exchangeRates = await fetchExchangeRates(from, to);
 
  // Calculate maximum and minimum converted values
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
    {
      name: "oanda",
      url: `https://www.oanda.com/currency/converter/#converter|${from}|${to}|1`,
    },
    { name: "google", url: `https://www.google.com/search?q=${from}+to+${to}` },
  ];

  const exchangeRates = [];
  for (const source of sources) {
    try {
      const response = await axios.get(source.url);
      console.log(response.data.match(
        /class="ccOutputTrail">(.+?)<\/span>/
      )[1],"-response")
      let exchangeRate;
      switch (source.name) {
        case "x-rates":
          exchangeRate = response.data.match(
            /class="ccOutputTrail">(.+?)<\/span>/
          )[1];
          break;
        case "xe":
          exchangeRate = response.data.match(
            /class="uccResultAmount">(.+?)<\/span>/
          )[1];
          break;
        case "oanda":
          exchangeRate = response.data.match(
            /class="currency_converter_result">\s*(.+?)\s*</
          )[1];
          break;
        case "google":
          exchangeRate = response.data.match(
            /<div class="BNeawe iBp4i AP7Wnd">(.+?)<\/div>/
          )[1];
          break;
      }
      console.log(exchangeRate, "exchangeRates");
      const pattern = /[0-9]+\.[0-9]+/;
      const match = exchangeRate.match(pattern);
      const result = match ? match[0] : exchangeRate;
      exchangeRates.push({ exchange_rate: result, source: source.url });

      
     
    } catch (err) {
      console.error(err);
    }
    console.log(exchangeRates, "exchangeRa--------tes");
    return exchangeRates;
  }
}

function parseExchangeRate(html, source) {
  // Implement parsing logic to extract exchange rate from HTML
  const exchangeRate = 80.05; // Replace with actual exchange rate

  return { exchange_rate: exchangeRate, source: source };
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
