import { useEffect, useState } from "react";

export const ConvertedValues = ({ fromCurrency, toCurrency, amount }) => {
  const [maxValue, setMaxValue] = useState(null);
  const [minValue, setMinValue] = useState(null);

  useEffect(() => {
    fetch(`/convert?from=${fromCurrency}&to=${toCurrency}&amount`);
  });

  return (
    <>

    </>
  );
};
