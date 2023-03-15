import { useEffect, useState } from "react";

export const ExchangeRateData = ({exchangeRates}) => {

  return (
    <>
      {exchangeRates.map((exchangeRate) => (
        <div key={exchangeRate.source}>
          <p>Exchange rate: {exchangeRate.exchange_rate}</p>
          <p>Source: {exchangeRate.source}</p>
        </div>
      ))}
    </>
  );
};
