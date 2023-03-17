import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Input, MenuItem, Select, Box, Typography } from "@mui/material";
import { ConvertedValues } from "./convertedValues";
import { ExchangeRateData } from "./currancyExchangeRates";

export const CurrencyConverter = () => {
  const [loading, setLoading] = useState(false);
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [exchangeRates, setExchangeRates] = useState([]);
  const [getCurrency, setGetCurrency] = useState(false);
  const [maxValue, setMaxValue] = useState(null);
  const [minValue, setMinValue] = useState(null);

  const handelConvert = async () => {
    setLoading(true);
    fetch(
      `http://localhost:4000/currency-exchange?from=${fromCurrency}&to=${toCurrency}`
      // `https://pleasant-tick-garb.cyclic.app/currency-exchange?from=${fromCurrency}&to=${toCurrency}`
    )
      .then((response) => response.json())
      .then((data) => {
        setExchangeRates(data);
        setGetCurrency(true);
      })
      .then(async () => {
        await fetch(
          `http://localhost:4000/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
          // `https://pleasant-tick-garb.cyclic.app/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`
        )
          .then((response) => response.json())
          .then((data) => {
            console.log(data);
            setMaxValue(data.max_value);
            setMinValue(data.min_value);
            setLoading(false);
          });
      });
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
  };

  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(event.target.value);
  };

  return (
    <Box>
      <Box
        border="3px solid red"
        m={10}
        borderRadius={10}
        p={3}
        bgcolor={"#fafafa"}
        alignItems="center"
        display="flex"
      >
        <Box ml={"20%"} width="50%">
          <Typography variant="h4">Currency Converter</Typography>
          <Box display="flex">
            <Box m={4}>
              <label htmlFor="to-currency">From : </label>
              <Select
                mr={6}
                id="from-currency"
                value={fromCurrency}
                onChange={handleFromCurrencyChange}
              >
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="KRW">KRW</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="CNY">CNY</MenuItem>
              </Select>
            </Box>
            <Box m={4}>
              <label htmlFor="to-currency">To : </label>
              <Select
                labelId="demo-simple-select-label"
                id="to-currency"
                value={toCurrency}
                mr={6}
                onChange={handleToCurrencyChange}
              >
                <MenuItem value="INR">INR</MenuItem>
                <MenuItem value="KRW">KRW</MenuItem>
                <MenuItem value="USD">USD</MenuItem>
                <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="CNY">CNY</MenuItem>
              </Select>
            </Box>
          </Box>
          <Box m={10}>
            <label variant="h5">Amount : </label>
            <Input
              // mr={6}
              type="number"
              id="amount"
              variant="filled"
              value={amount}
              onChange={handleAmountChange}
            />
          </Box>
          <Button variant="contained" onClick={handelConvert}>
            {" "}
            Convert
          </Button>
        </Box>
        {!loading ? (
          <ConvertedValues maxValue={maxValue} minValue={minValue} />
        ) : (
          <Typography variant="h4">Loading...</Typography>
        )}
      </Box>
      <ExchangeRateData exchangeRates={exchangeRates} />
    </Box>
  );
};
