import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";

export const ExchangeRateData = ({ exchangeRates }) => {
  return (
    <>
      <Box m={10} p={3} alignItems="center">
        {exchangeRates?.map((exchangeRate) => (
          <Box key={exchangeRate.source} display="flex">
            {/* <Typography variant="h7" m={2}>
              Exchange rate: {exchangeRate.exchange_rate}
            </Typography>
            <Typography variant="h7" m={2}>Source: {exchangeRate.source}</Typography> */}
          </Box>
        ))}
      </Box>
    </>
  );
};
