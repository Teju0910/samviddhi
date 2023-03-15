import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import { Input, MenuItem, Select, Box, Typography } from "@mui/material";
import { ConvertedValues } from "./convertedValues";
import { ExchangeRateData } from "./currancyExchangeRates";

export const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState("INR");
  const [toCurrency, setToCurrency] = useState("USD");
  const [amount, setAmount] = useState("");
  const [exchangeRates, setExchangeRates] = useState([]);

  console.log(exchangeRates, "exchangeRates");
  // useEffect(() => {
  //   // https://prussian-blue-dugong-boot.cyclic.app/currency-exchange?from=GBP&to=INR
  //   // fetch("/currency-exchange?from=INR&to=USD")
  // }, []);

  const handelConvert = () => {
    fetch(
      `https://prussian-blue-dugong-boot.cyclic.app/currency-exchange?from=${fromCurrency}&to=${toCurrency}`
    )
      .then((response) => response.json())
      .then((data) => {
        setExchangeRates(data);
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
      <Box border="1px solid teal" m={10} p={3} alignItems="center">
        <Typography variant="h4">Currency Converter</Typography>
        <Box ml={50} width="50%">
          <Box p={4}>
            <label variant="h5">From : </label>
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
          <Box>
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
          <Box p={6}>
            <label variant="h5">Amount : </label>
            <Input
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
      </Box>
      {exchangeRates && exchangeRates.length > 0 && (
        <ExchangeRateData exchangeRates={exchangeRates} />
      )}
      <ConvertedValues
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        amount={amount}
      />
    </Box>
  );
};
